// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.9;

import "abdk-libraries-solidity/ABDKMath64x64.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./utils/lendaReserve.sol";
import "./utils/priceOracle.sol";
import "./utils/BMatic.sol";
import {CollateralStorage} from "./libraries/collateralStorage.sol";

/**
 * @title LendPool contract
 * @dev Main point of interaction
 * - Users can:
 *   # Deposit
 *   # Withdraw
 *   # Borrow
 * @dev Completed loans are represented as tokenOwner = 0x0 to prevent
 *      errors w.r.t stack too deep (too large of a struct to include a bool)
 * @dev Unlike original spec., lenders are paid for only active duration (D')
 */
contract LendPool is PriceOracle, LendaReserve, BMatic{
/**
 *==================================
  -------- Error Message -----------
  ==================================
*/
  error amountExceeded(string);
/**
 *==================================
  ---------- EVENTS ----------------
  ==================================
*/
  event Borrow(
    uint256 _amountToBorrow,
    uint256 _loanCompleteTime,
    uint256 _amountToRepay,
    uint256 _tokenId
  );


/**
 *==================================
  ---------- STRUCTS ---------------
  ==================================
*/==
  struct Loan {
    address tokenAddress;
    uint256 tokenId;
    uint256 loanAmount;
    uint256 loanCompleteTime;
    uint256 amountToRepay
    uint256 timeOfLoan;
    bool _onLoan;
  }

/**
 *==================================
  -------- State Variables ---------
  ==================================
*/

  mapping(address => Loan) public Loans;
  IERC721[] supportedTokenAddress;
  uint40 public interestRate;
  uint256 public FACTOR;
  uint256 public totalAmountBorrowed;
  uint256 public amountForLiquidity;


/**
 *==================================
  --------- FUNCTIONS --------------
  ==================================
*/

  /**
   * Enables an NFT owner to create a loan, specifying parameters
   * @param _tokenAddress NFT token address
   * @param _tokenId NFT token id
   * @param _interestRate percentage fixed interest rate for period
   * @param _maxLoanAmount maximum allowed Ether bid
   * @param _loanCompleteTime time of loan completion
   * @return Loan id
   */
  function borrowLoan(
    IERC721 _tokenAddress,
    uint256 _tokenId,
    uint256 _loanCompleteTime,
    uint256 _amountToBorrow
  ) external returns (uint256) {
    Loan storage loan = Loans[msg.sender];
    require(!_onLoan, "Pay your debt first");
    require((_loanCompleteTime * 1 days) < 30 days, "Can't issue a loan beyond 30 days");
    assert((_loanCompleteTime * 1 days) > block.timestamp);
    require(checkIfNFTIsAvailable(_tokenAddress), "NFT not supported");
    if(_amountToBorrow > availableToBorrow(_tokenAddress)) revert amountExceeded("exceeded available to borrow");
    loan.tokenAddress = _tokenAddress;
    loan.tokenId = _tokenId;
    loan.loanAmount = _amountToBorrow;
    loan.loanCompleteTime = _loanCompleteTime * 1 days;
    loan.timeOfLoan = block.timestamp;
    uint256 getInterestAccrued = interestAccrued(_amountToBorrow, _loanCompleteTime, block.timestamp);
    uint256 payBack = _amountToBorrow + getInterestAccrued;
    loan.amountToRepay = payBack;
    CollateralStorage.depositToStorage(msg.sender, _tokenId, _tokenAddress);
    mintBMatic(msg.sender, payBack);
    _borrowFromReserve(msg.sender, _amountToBorrow);
    loan._onLoan = true;

    totalAmountBorrowed += _amountToBorrow;



    emit Borrow(_amountToBorrow, _loanCompleteTime, payBack, block.timestamp);

  }

  function repayLoan() external {
    Loan storage loan = Loans[msg.sender];
    require(loan._onLoan, "You don't have any loan avalable");
    repay(msg.sender, balanceOfBMatic(msg.sender));
    CollateralStorage.withdrawFromStorage(msg.sender, loan.tokenId, loan.tokenAddress);
    loan._onLoan = false;
  }

  function setInterestRate(uint40 _interestRate, uint256 _factor) external onlyOwner {
    interestRate = _interestRate;
    FACTOR = _factor;
  }

  function interestAccrued(uint256 _amountToBorrow, uint256 _loanCompletedTime, uint256 _timeOfLoan) internal view returns(uint256 interest) {
    uint256 getDuration = _loanCompletedTime - _timeOfLoan;
    interest = (_amountToBorrow * interestRate * getDuration)/FACTOR;
  }

  /**
   * Helper: Calculate required capital to repay loan
   * @param _loanId Loan id
   * @param _future allows calculating require payment in future
   * @return required loan repayment in Ether
   */
  function calculateRequiredRepayment(uint256 _loanId, uint256 _future)
    public
    view
    returns (uint256)
  {
    Loan memory loan = Loans[_loanId];

    // amount withdrawn + total interest to be paid
    return loan.loanAmountDrawn + calculateTotalInterest(_loanId, _future);
  }

  /**
   * Enables a lender/bidder to underwrite a loan, given it is the top bid
   * @param _loanId id of loan to underwrite
   * @dev Requires an unpaid loan, where currentBid < newBid <= maxBid
   */
  function underwriteLoan(uint256 _loanId) external payable {
    Loan storage loan = Loans[_loanId];
    // Prevent underwriting with 0 value
    require(msg.value > 0, "Can't underwrite with 0 Ether.");
    // Prevent underwriting a repaid loan
    require(loan.tokenOwner != address(0), "Can't underwrite a repaid loan.");
    // Prevent underwriting an expired loan
    require(
      loan.loanCompleteTime >= block.timestamp,
      "Can't underwrite expired loan."
    );

    // If loan has a previous bid:
    if (loan.firstBidTime != 0) {
      // Historic interest paid to previous top bidders + accrued interest to current bidder
      // As of current block (future = 0 seconds)
      uint256 _totalInterest = calculateTotalInterest(_loanId, 0);
      // Calculate total payout for previous bidder
      uint256 _bidPayout = loan.loanAmount + _totalInterest;

      // Prevent underwriting a loan with value < required payout
      require(_bidPayout < msg.value, "Can't underwrite < top lender.");
      // Prevent underwriting a loan with value greater than max bid + pending interest
      require(
        loan.maxLoanAmount + _totalInterest >= msg.value,
        "Can't underwrite > max loan."
      );

      // Buyout current top bidder
      (bool sent, ) = payable(loan.lender).call{ value: _bidPayout }("");
      require(sent == true, "Failed to buyout top bidder.");

      // Increment historic paid interest
      loan.historicInterest += _totalInterest;
      // Update new loan amount
      loan.loanAmount = msg.value - _totalInterest;
    } else {
      // Prevent underwriting a loan with value greater than max bid
      require(loan.maxLoanAmount >= msg.value, "Can't underwrite > max loan.");
      // If loan doesn't have a previous bid (to buyout), set first bid time
      loan.firstBidTime = block.timestamp;
      // Update new loan amount
      loan.loanAmount = msg.value;
    }

    // Update new lender address
    loan.lender = msg.sender;
    // Update last bid time
    loan.lastBidTime = block.timestamp;

    // Emit new underwriting event
    emit LoanUnderwritten(_loanId, msg.sender);
  }

  /**
   * Enables NFT owner to draw capital from top bid
   * @param _loanId id of loan to draw from
   */
  function drawLoan(uint256 _loanId) external {
    Loan storage loan = Loans[_loanId];
    // Prevent non-loan-owner from drawing
    require(loan.tokenOwner == msg.sender, "Must be NFT owner to draw.");
    // Prevent drawing from a loan with 0 available capital
    require(
      loan.loanAmountDrawn < loan.loanAmount,
      "Max draw capacity reached."
    );

    // Calculate capital to draw
    uint256 _availableCapital = loan.loanAmount - loan.loanAmountDrawn;
    // Update drawn amount to current loan capacity
    loan.loanAmountDrawn = loan.loanAmount;
    // Draw the maximum available loan capital
    (bool sent, ) = payable(msg.sender).call{ value: _availableCapital }("");
    require(sent, "Failed to draw capital.");

    // Emit draw event
    emit LoanDrawn(_loanId);
  }

  /**
   * Enables anyone to repay a loan on behalf of owner
   * @param _loanId id of loan to repay
   */
  function repayLoan(uint256 _loanId) external payable {
    Loan storage loan = Loans[_loanId];
    // Prevent repaying repaid loan
    require(loan.tokenOwner != address(0), "Can't repay paid loan.");
    // Prevent repaying loan without bids
    require(loan.firstBidTime != 0, "Can't repay loan with 0 bids.");
    // Prevent repaying loan after expiry
    require(
      loan.loanCompleteTime >= block.timestamp,
      "Can't repay expired loan."
    );

    // Add historic interest paid to previous top bidders + accrued interest to top bidder
    // As of current block (future = 0 seconds)
    uint256 _totalInterest = calculateTotalInterest(_loanId, 0);
    // Calculate additional capital required to process payout
    uint256 _additionalCapital = loan.loanAmountDrawn + _totalInterest;
    // Enforce additional required capital is passed to contract
    require(msg.value >= _additionalCapital, "Insufficient repayment.");

    // Payout current top bidder (loan amount + total pending interest)
    (bool sent, ) = payable(loan.lender).call{
      value: (loan.loanAmount + _totalInterest)
    }("");
    require(sent, "Failed to repay loan.");

    // Transfer NFT back to owner
    IERC721(loan.tokenAddress).transferFrom(
      address(this),
      loan.tokenOwner,
      loan.tokenId
    );

    // Toggle loan repayment (nullify tokenOwner)
    loan.tokenOwner = address(0);

    // Emit repayment event
    emit LoanRepayed(_loanId, loan.lender, msg.sender);
  }

  /**
   * Enables owner to cancel loan
   * @param _loanId id of loan to cancel
   * @dev requires no active bids to be placed (else, use repay)
   */
  function cancelLoan(uint256 _loanId) external {
    Loan storage loan = Loans[_loanId];
    // Enforce loan ownership
    require(loan.tokenOwner == msg.sender, "Must be NFT owner to cancel.");
    // Enforce loan has no bids
    require(loan.firstBidTime == 0, "Can't cancel loan with >0 bids.");

    // Return NFT to owner
    IERC721(loan.tokenAddress).transferFrom(
      address(this),
      msg.sender,
      loan.tokenId
    );

    // Nullify loan
    loan.tokenOwner = address(0);

    // Emit cancelleation event
    emit LoanCancelled(_loanId);
  }

  /**
   * Enables anyone to seize NFT, for lender, on loan default
   * @param _loanId id of loan to seize collateral
   */
  function seizeNFT(uint256 _loanId) external {
    Loan memory loan = Loans[_loanId];
    // Enforce loan is unpaid
    require(loan.tokenOwner != address(0), "Can't seize from repaid loan.");
    // Enforce loan is expired
    require(
      loan.loanCompleteTime < block.timestamp,
      "Can't seize before expiry."
    );

    // Transfer NFT to lender
    IERC721(loan.tokenAddress).transferFrom(
      address(this),
      loan.lender,
      loan.tokenId
    );

    // Emit seize event
    emit LoanSeized(_loanId, loan.lender, msg.sender);
  }

  function checkIfNFTIsAvailable(IERC721 _NFTAddress) internal view returns(bool result){
    for(uint256 i = 0; i < supportedTokenAddress.length; i++){
      if(supportedTokenAddress[i] == _NFTAddress) {
        result = true;
      }else {
        result = false;
      }
    }
  }


  function setSupportedNFT(IERC721 _NFTAddress) public onlyOwner{
    assert(!checkIfNFTIsAvailable());
    supportedTokenAddress.push(_NFTAddress)
  }
}

// create loan
// calculate intrest
// calculate total intrest
// calculate repayement
// underwrite loan
// draw loan
// repay loan
// cancel loan
// seize NFT
