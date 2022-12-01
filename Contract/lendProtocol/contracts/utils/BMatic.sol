//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

/** @title Borrower Token
    @dev this token is pegged to the amount a borrower borrowed with the interest accrued
    @dev Borrower must repay with an equal amount of Bmatic to acquire back their collateral
**/
contract BMatic {
    string public constant name = "Borrower Matic";
    string public constant symbol = "BMatic";
    uint8 public constant decimals = 18;

    mapping(address => uint256) userBalances;


    function mint(address _addr, uint256 _amount) internal {
        userBalances[_addr] += _amount;
    }

    function balanceOf(address _addr) public view returns(uint256){
        return userBalances[_addr];
    }

    function burn(address _addr, uint256 _amount) internal {
        userBalances[_addr] -= _amount;
    }
}