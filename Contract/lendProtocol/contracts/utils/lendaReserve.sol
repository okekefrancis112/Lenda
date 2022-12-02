//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** @title Lenda Matic Reserve
    @dev This contract is responsible for holding matic deposit of depositors/lenders
**/
abstract contract LendaReserve is ERC20Wrapper, Ownable{
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
    IERC20 public immutable maticContractAddress;


    constructor(IERC20 _maticContractAddress){
        maticContractAddress = _maticContractAddress;
    }

    function depositToReserve(uint256 _amount, address _depositor) internal {
        depositFor(_depositor, _amount);
    }

    function withdrawFromReserve(uint256 _amount, address _depositor) internal {
        withdrawTo(_depositor, _amount);
    }

    function _borrowFromReserve(address _borrower, uint256 _amount) internal {
        transfer(_borrower, _amount);
    }

    function repay(address _borrower, uint256 _amount) internal {
        require(maticContractAddress.allowance(_borrower, address(this)) >= _amount, "need to approve");
        maticContractAddress.transferFrom(_borrower, address(this), _amount);
    }

    function movingGeneric(address _receiver, address _tokenContractAddress, uint256 _amount) external onlyOwner{
        IERC20(_tokenContractAddress).transfer(_receiver, _amount);
    }

    function updateAdmin(address _newAdmin) external onlyOwner{
        transferOwnership(_newAdmin);
    }

    //View functions

    function valueInReserve() external view returns(uint256) {
        return maticContractAddress.balanceOf(address(this));
    }

}