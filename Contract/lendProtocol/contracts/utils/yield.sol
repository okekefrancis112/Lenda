//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/** @title Yield Contract
    @dev Contract used in incentivicing users
    - 0.4LND is minted per seconds which is shared among all farmers that locked their DMatic token
    - Farmers can check the possible amount of LND they will receive base on their DMatic locked
**/
contract YieldContract is ERC20("Lenda Token", "LND") {
    uint256 public constant FACTOR = 1e15;

/**
     * ===================================================
     * ----------------- Error Message -------------------
     * ===================================================
*/
    error mustApprove(string);

/**
     * ===================================================
     * ----------------- State Variables -----------------
     * ===================================================
*/
    IERC20 DTokenAddress;
    address admin;

    struct Farmer {
        uint256 daysToHarvest;
        uint256 daySow;
        uint256 amountToLock;
        uint256 interestAccrued;
    }

    mapping(address => Farmer) farmers;


    constructor(address _admin, address _DTokenAddress){
        admin = _admin;
        DTokenAddress = IERC20(_DTokenAddress);
    }


    function getInterestAccrued(uint256 _amountLock, uint256 _periodLocked) public view returns(uint256 getInterest){
        require(_amountLock > 10, "amount must be greater than 10");
        Farmer storage FM = farmers[msg.sender];
        getInterest = (_amountLock * 0.4 ether * FACTOR * _periodLocked)/ DTokenAddress.balanceOf(address(this));
    }

    function lockDTokenForLND(uint256 _amount,uint256 _days) public {
        require(_amount > 10, "amount must be greater than 10");
        if(DTokenAddress.allowance(msg.sender, address(this)) >= _amount) revert mustApprove("amount to lock must be approved");
        DTokenAddress.transferFrom(msg.sender, address(this), _amount);
        Farmer storage FM = farmers[msg.sender];
        if(FM.daysToHarvest > 0){
            uint256 getAmountLocked = FM.amountToLock;
            uint256 periodLocked = block.timestamp - FM.daySow;
            FM.interestAccrued += getInterestAccrued(getAmountLocked, periodLocked);
            FM.daysToHarvest = _days * 1 days;
            FM.amountToLock += _amount;
        } else{
            FM.daysToHarvest = _days * 1 days;
            FM.amountToLock += _amount;
        }
    }


    function getLNDAccrued() internal {
        Farmer storage FM = farmers[msg.sender];
        require(block.timestamp >= FM.daysToHarvest, "Wait till it's time to harvest");
        uint256 getAmountLocked = FM.amountToLock;
        uint256 periodLocked = FM.daysToHarvest - FM.daySow;
        FM.interestAccrued += getInterestAccrued(getAmountLocked, periodLocked);
        FM.daysToHarvest = 0;
        uint256 getInterest = (FM.interestAccrued * 1e18)/FACTOR;
        _mint(msg.sender, getInterest);
    }

    function withdrawLockedToken() public {
        getLNDAccrued();
        Farmer storage FM = farmers[msg.sender];
        uint256 getAmountSow = FM.amountToLock;
        FM.amountToLock = 0;
        DTokenAddress.transfer(msg.sender, getAmountSow);
    }


}