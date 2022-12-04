// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.8.9;

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
contract LendPool is LendaReserve, PriceOracle, BMatic{
/**
 *==================================
  -------- Error Message -----------
  ==================================
*/
  error amountExceeded(string);
  error alreadyExist(string);
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
*/
  struct Loan {
    IERC721 tokenAddress;
    uint256 tokenId;
    uint256 loanAmount;
    uint256 loanCompleteTime;
    uint256 amountToRepay;
    uint256 timeOfLoan;
    bool _onLoan;
  }

/**
 *==================================
  -------- State Variables ---------
  ==================================
*/

  mapping(address => Loan) public Loans;
  mapping(IERC721 => bool) public supportedNFTAddress;
  uint40 public interestRate;
  uint256 public FACTOR;
  uint256 public totalAmountBorrowed;
  uint256 public amountForLiquidity;
  uint256 public profitMade;



  constructor(IERC20 _maticContractAddress)
  LendaReserve(_maticContractAddress)
  ERC20Wrapper(_maticContractAddress)
  ERC20("Deposit Matic", "DMatic")
  {}


/**
 *==================================
  --------- FUNCTIONS --------------
  ==================================
*/

  function deposit(uint256 _amount, address _depositor) external {
    depositToReserve(_amount, _depositor);
  }

  function withdraw(uint256 _amount, address _depositor) external {
    withdrawFromReserve(_amount, _depositor);
  }

  /**
   * Enables an NFT owner to create a loan, specifying parameters
   * @param _tokenAddress NFT token address
   * @param _tokenId NFT token id
   * @param _loanCompleteTime time of loan completion
   * @param _amountToBorrow : amount a user wnats to borrow
   */
  function borrowLoan(
    IERC721 _tokenAddress,
    uint256 _tokenId,
    uint256 _loanCompleteTime,
    uint256 _amountToBorrow
  ) external{
    Loan storage loan = Loans[msg.sender];
    require(!loan._onLoan, "Pay your debt first");
    require(_loanCompleteTime * 1 days + block.timestamp < 30 days + block.timestamp, "Can't issue a loan beyond 30 days");
    assert(_loanCompleteTime * 1 days + block.timestamp > block.timestamp);
    require(supportedNFTAddress[_tokenAddress] == true, "NFT no supported");
    if(_amountToBorrow > availableToBorrow(_tokenAddress)) revert amountExceeded("exceeded available to borrow");
    loan.tokenAddress = _tokenAddress;
    loan.tokenId = _tokenId;
    loan.loanAmount = _amountToBorrow;
    loan.loanCompleteTime = _loanCompleteTime * 1 days + block.timestamp;
    loan.timeOfLoan = block.timestamp;
    uint256 getInterestAccrued = interestAccrued(_amountToBorrow, loan.loanCompleteTime, block.timestamp);
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
    burnBMatic(msg.sender, balanceOfBMatic(msg.sender));
    loan._onLoan = false;
    profitMade = loan.amountToRepay - loan.loanAmount;
  }



  function setInterestRate(uint40 _interestRate, uint256 _factor) external onlyOwner {
    interestRate = _interestRate;
    FACTOR = _factor;
  }

  function interestAccrued(uint256 _amountToBorrow, uint256 _loanCompletedTime, uint256 _timeOfLoan) internal view returns(uint256 interest) {
    uint256 getDuration = _loanCompletedTime - _timeOfLoan;
    interest = (_amountToBorrow * interestRate * getDuration)/FACTOR;
  }

  function getSupportedNFT(IERC721 _NFTAddress) external view returns(bool) {
    return supportedNFTAddress[_NFTAddress];
  }

  function setSupportedNFT(IERC721 _NFTAddress) public onlyOwner {
    if(supportedNFTAddress[_NFTAddress] == true) revert alreadyExist("NFTAddress already exist");
    supportedNFTAddress[_NFTAddress] = true;
  }



  function activeCollection(address _nftContractAddress) external view returns(uint256) {
    return CollateralStorage.valueInReserve(_nftContractAddress);
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

