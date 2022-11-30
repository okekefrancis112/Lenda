//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ILendaReserve} from "../interfaces/ILendaReserve.sol";

/** @title Lenda Matic Reserve
    @dev This contract is responsible for holding matic deposit of depositors/lenders
**/
contract LendaReserve is ILendaReserve {
/***==========================
    =   Error Message        =
    ==========================*/
    error mustApprove(string);



    IERC20 maticContractAddress;
    address admin;


    modifier onlyOwner(){
        require(msg.sender == admin, "Only admin can call this function");

        _;
    }

    constructor(address _maticContractAddress){
        maticContractAddress = IERC20(_maticContractAddress);
    }

    function depositToReserve(uint256 _amount, address _depositor) external override{
        if(maticContractAddress.allowance(_depositor, address(this)) >= _amount) revert mustApprove("amount to deposit must be approved");
        maticContractAddress.transferFrom(_depositor, address(this), _amount);
    }

    function withdrawFromReserve(uint256 _amount, address _depositor) external override{
        maticContractAddress.transfer(_depositor, _amount);
    }

    function updateContractAddress(address _maticContractAddress) external override onlyOwner{
        maticContractAddress = IERC20(_maticContractAddress);
    }

    function movingGeneric(address _receiver, address _tokenContractAddress, uint256 _amount) external override onlyOwner{
        IERC20(_tokenContractAddress).transfer(_receiver, _amount);
    }

    function updateAdmin(address _newAdmin) external override onlyOwner{
        admin = _newAdmin;
    }

    //View functions

    function valueInReserve() external override view returns(uint256) {
        return maticContractAddress.balanceOf(address(this));
    }

}