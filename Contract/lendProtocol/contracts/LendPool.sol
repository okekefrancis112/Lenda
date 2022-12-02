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
    uint256 profitMade = loan.amountToRepay - loan.loanAmount;
  }



  function setInterestRate(uint40 _interestRate, uint256 _factor) external onlyOwner {
    interestRate = _interestRate;
    FACTOR = _factor;
  }

  function interestAccrued(uint256 _amountToBorrow, uint256 _loanCompletedTime, uint256 _timeOfLoan) internal view returns(uint256 interest) {
    uint256 getDuration = _loanCompletedTime - _timeOfLoan;
    interest = (_amountToBorrow * interestRate * getDuration)/FACTOR;
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


// deposit to reserve
//withdraw from reserve
// borrow loan
// repay loan
// auction
// send profit to LND liquidity pool
// calculate intrest
// calculate total intrest
// calculate repayement

