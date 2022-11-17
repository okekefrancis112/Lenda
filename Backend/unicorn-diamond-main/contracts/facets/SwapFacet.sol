// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import {IERC20} from "../interfaces/IERC20.sol";
import {LibSwap} from "../libraries/LibSwap.sol";
    


/// @title This is a swap contract for the NFT Market
/// @author team unicorn
/// @notice this contract would handle the swap of polygon matic for ERC20 tokens 
contract Swap {
    /**
     * ===================================================
     * ----------------- EVENTS --------------------------
     * ===================================================
     */

    event swapped(address indexed addr, uint indexed amount);
    event Rate(uint rate);



    /// @dev this function allows  users to swap their native tokens for ours to be able to perform transaction on our platform
    function swap() 
        public 
        payable 
    {
        LibSwap.SwapDiamondStorage storage ss = LibSwap.diamondStorage();

        require(msg.value > 0, "Not enough balance");
        require(msg.sender != address(0), "Cannot transfer to address zero");

        uint transferrable = msg.value * ss.rate;

        ss.token.transfer(msg.sender, transferrable);
        emit swapped(msg.sender, transferrable);
    }

    /// @dev this function allows it to be possible to change the exchange rate
    /// @param _rate: this is the swap's exchange rate
    function editRate(uint _rate) public {
        LibSwap.SwapDiamondStorage storage ss = LibSwap.diamondStorage();
        ss.rate = _rate;

        emit Rate(_rate);
    }

    receive() external payable{}
}