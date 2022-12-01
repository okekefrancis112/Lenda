//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/** @title Price Oracle Contract
    @dev This contract aims to get the onchain data of NFT floor price across all NFT platforms
    - to deduce Lenda NFT worth
**/
contract PriceOracle {

    // AggregatorV3Interface internal nftFloorPriceFeed;
    AggregatorV3Interface internal ethpriceFeed;
    uint256 public minRate = 50;
    address owner;

    constructor() {
        owner = msg.sender;
        ethpriceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
        // nftFloorPriceFeed = AggregatorV3Interface(
        //     0x5c13b249846540F81c093Bc342b5d963a7518145
        // );
    }

    modifier onlyOwner(){
        require(owner == msg.sender, "only owner can call this function");
        _;
    }

    /**
     * Returns the latest price
     */
    function getNFTLatestPrice(AggregatorV3Interface nftFloorPriceFeed) private view returns (uint) {
        ( , int nftFloorPrice, , , ) = nftFloorPriceFeed.latestRoundData();
        return uint(nftFloorPrice);
    }

    function getPrice() private view returns (uint)
    {
        ( , int price, , , ) = ethpriceFeed.latestRoundData();
        // ETH/USD rate in 18 digit
        return uint256(price * 10000000000);
    }


    // 1000000000
    // call it get fiatConversionRate, since it assumes something about decimals
    // It wouldn't work for every aggregator
    function getConversionRate(AggregatorV3Interface nftFloorPriceFeed) private view returns (uint256) {

        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * getNFTLatestPrice(nftFloorPriceFeed)) / 1000000000000000000;

        // the actual ETH/USD conversation rate, after adjusting the extra 0s.
        return ethAmountInUsd;
    }

    function _amountLoanable(AggregatorV3Interface nftFloorPriceFeed) private view returns (uint256 loanable) {

        uint256 amount = getConversionRate(nftFloorPriceFeed);
        loanable = (amount * minRate) / 100;
    }

    function _setRate(uint256 newRate) private onlyOwner {
        require(newRate != 0, "rate cannot be zero");
        minRate = newRate;
    }

}