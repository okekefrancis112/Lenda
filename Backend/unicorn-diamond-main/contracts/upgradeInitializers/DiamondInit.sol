// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
*
* Implementation of a diamond.
/******************************************************************************/

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {LibAuctionFactory} from "../libraries/LibAuctionFactory.sol";
import {LibMarket} from "../libraries/LibMarket.sol";
import { IDiamondLoupe } from "../interfaces/IDiamondLoupe.sol";
import { IDiamondCut } from "../interfaces/IDiamondCut.sol";
import {LibSwap} from "../libraries/LibSwap.sol";
import { IERC173 } from "../interfaces/IERC173.sol";
import { IERC165 } from "../interfaces/IERC165.sol";
import { IERC20 } from "../interfaces/IERC20.sol";

// It is exapected that this contract is customized if you want to deploy your diamond
// with data from a deployment script. Use the init function to initialize state variables
// of your diamond. Add parameters to the init funciton if you need to.

contract DiamondInit {    

    // You can add parameters to this function in order to pass in 
    // data to set your own state variables
    function init(address _auctionImp, address protocolToken, address _listTo) external {
        // adding ERC165 data
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;

        // Init state varibles for the auction factory

        LibAuctionFactory.AuctionDiamondStorage storage as_ = LibAuctionFactory.diamondStorage();
        as_.implementation = _auctionImp;


        // Init for the swap facet

        LibSwap.SwapDiamondStorage storage ss = LibSwap.diamondStorage();
        ss.token = IERC20(protocolToken);

        // Init for the Marketplace facet 

        LibMarket.MarketDiamondStorage storage ms = LibMarket.diamondStorage();
        ms.listingPrice = 1 ether; // the listing price is one Matic
        ms.listTo = _listTo;
    }


}