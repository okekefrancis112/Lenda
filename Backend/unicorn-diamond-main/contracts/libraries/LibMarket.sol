// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IERC20} from "../interfaces/IERC20.sol";


/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
/******************************************************************************/

struct MarketItem {
    uint256 itemId;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint256 price;
    bool sold;
}

library LibMarket {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage.marketplace");


    struct MarketDiamondStorage {
        uint256 _itemIds;
        uint256 _itemsSold;
        // soliity creates a getter function that returns the listingPrice
        uint256 listingPrice;
        mapping(uint256 => MarketItem) marketItems;
        address listTo;
        
    }

    function diamondStorage() internal pure returns (MarketDiamondStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function updateListingPrice(address _addr) internal {
        MarketDiamondStorage storage ds = diamondStorage();
        ds.listTo = _addr;
    }
}
