//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ILendaReserve} from "../interfaces/ILendaReserve.sol";

/** @title Lenda Matic Reserve
    @dev This contract is responsible for holding matic deposit of depositors/lenders
**/
contract LendaReserve is ILendaReserve, ERC20Wrapper, Ownable{
/**
     * ===================================================
     * ----------------- Error Message -------------------
     * ===================================================
*/
    error mustApprove(string);
/**
     * ===================================================
     * ---------------- State Variables ------------------
     * ===================================================
*/
    IERC20 maticContractAddress;


    constructor(IERC20 _maticContractAddress)
    ERC20Wrapper(_maticContractAddress)
    ERC20("Depositor Matic", "DMatic")
    {
        maticContractAddress = _maticContractAddress;
    }

    function depositToReserve(uint256 _amount, address _depositor) public override {
        depositFor(_depositor, _amount);
    }

    function withdrawFromReserve(uint256 _amount, address _depositor) public override {
        withdrawTo(_depositor, _amount);
    }

    function movingGeneric(address _receiver, address _tokenContractAddress, uint256 _amount) external override onlyOwner{
        IERC20(_tokenContractAddress).transfer(_receiver, _amount);
    }

    function updateAdmin(address _newAdmin) external override onlyOwner{
        transferOwnership(_newAdmin);
    }

    //View functions

    function valueInReserve() external override view returns(uint256) {
        return maticContractAddress.balanceOf(address(this));
    }

}