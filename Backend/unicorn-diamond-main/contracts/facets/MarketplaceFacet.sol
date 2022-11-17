// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IERC20 } from "../interfaces/IERC20.sol";
import { IERC721 } from "../interfaces/IERC721.sol";
import {LibMarket, MarketItem} from "../libraries/LibMarket.sol";


contract NFTMarketplace {

    /////////////////EVENT////////////////////////
    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event MarketItemSold(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // @dev create listing for ERC721 Assets
    // @params _nftcontract 
    // @params _tokenId
    // @price _price
    function ListItemForSale(
        address _nftcontract,
        uint256 _tokenId,
        uint256 _price
    ) public payable {
        require(_price > 0, "amount must be greater than zero");
        LibMarket.MarketDiamondStorage storage ds = LibMarket.diamondStorage();
        require(msg.value == ds.listingPrice, "not listing price");
        uint256 itemIds = ds._itemIds++;
        MarketItem storage _m = ds.marketItems[itemIds];
        _m.itemId = itemIds;
        _m.nftContract = _nftcontract;
        _m.tokenId = _tokenId;
        _m.seller = payable(msg.sender);
        _m.price = _price;
        _m.sold = false;

        IERC721(_nftcontract).transferFrom(msg.sender, address(this), _tokenId);

        emit MarketItemCreated(
            itemIds,
            _nftcontract,
            _tokenId,
            msg.sender,
            address(0),
            _price,
            false
        );
    }

    function buyAsset(address _nftcontract, uint256 itemId)
        public
        payable
    {
        LibMarket.MarketDiamondStorage storage ds = LibMarket.diamondStorage();

        uint256 price = ds.marketItems[itemId].price;
        uint256 tokenIds = ds.marketItems[itemId].tokenId;
        address seller = ds.marketItems[itemId].seller;
        require(msg.value == price, "amount not asking price");
        require(seller != msg.sender, "cannot buy asset listed");
        ds.marketItems[itemId].seller.transfer(msg.value);
        IERC721(_nftcontract).transferFrom(address(this), msg.sender, tokenIds);
        ds.marketItems[itemId].owner = payable(msg.sender);
        ds.marketItems[itemId].sold = true;
        ds._itemsSold++;


        emit MarketItemSold(
            itemId,
            _nftcontract,
            tokenIds,
            seller,
            ds.listTo,
            price,
            true
        );
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        LibMarket.MarketDiamondStorage storage ds = LibMarket.diamondStorage();
        uint256 itemCount = ds._itemIds;
        uint256 unsoldItemsCount = ds._itemIds - ds._itemsSold;
        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unsoldItemsCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (ds.marketItems[i + 1].owner == address(0)) {
                uint256 currentId = ds.marketItems[i + 1].itemId;
                MarketItem storage currentItem = ds.marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNfts() public view returns (MarketItem[] memory) {
        LibMarket.MarketDiamondStorage storage ds = LibMarket.diamondStorage();
        uint256 totalItemCount = ds._itemIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (ds.marketItems[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (ds.marketItems[i + 1].owner == msg.sender) {
                uint256 currentId = ds.marketItems[i + 1].itemId;
                MarketItem storage currentItem = ds.marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemListed() public view returns (MarketItem[] memory) {
        LibMarket.MarketDiamondStorage storage ds = LibMarket.diamondStorage();
        uint256 totalItemCount = ds._itemIds;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (ds.marketItems[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (ds.marketItems[i + 1].seller == msg.sender) {
                uint256 currentId = ds.marketItems[i + 1].itemId;
                MarketItem storage currentItem = ds.marketItems[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }
}