// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

  import "../interfaces/IERC20.sol";


contract sampleToken {

    address public token;

    constructor( address _token){
    token = _token;
    }

    uint public amountAllowed = 10000;
    //when you requestTokens address and blocktime+1 day is saved in Time Lock
    mapping(address => uint) public lockTime;

    //allow users to call the requestTokens function to mint tokens
    function requestTokens(address requester) payable external {
        
        //perform a few check to make sure function can execute
        require(block.timestamp > lockTime[msg.sender], "lock time has not expired. Please try again later");
        
        //mint tokens
        IERC20(token).transfer(requester, amountAllowed);

        //updates locktime 1 day from now
        lockTime[requester] = block.timestamp + 1 days;
    }
}