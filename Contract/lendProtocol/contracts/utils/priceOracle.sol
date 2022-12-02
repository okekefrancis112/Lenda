//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** @title Price Oracle Contract
    @dev This contract aims to get the onchain data of NFT floor price across all NFT platforms
    - to deduce Lenda NFT worth
**/
contract PriceOracle is Ownable {
/**
    ==================================
    ------- State Variables ----------
    ==================================
*/

    mapping(IERC721 => uint256) setFloorPrice;

    // AggregatorV3Interface internal nftFloorPriceFeed;
    AggregatorV3Interface internal ethpriceFeed;
    uint256 public minRate = 50;

    constructor() {
        ethpriceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
    }

    /**
     * Returns the latest price
     */
    function getNFTLatestPrice(AggregatorV3Interface nftFloorPriceFeed) internal view returns (uint) {
        ( , int nftFloorPrice, , , ) = nftFloorPriceFeed.latestRoundData();
        return uint(nftFloorPrice);
    }

    function getPrice() internal view returns (uint)
    {
        ( , int price, , , ) = ethpriceFeed.latestRoundData();
        // ETH/USD rate in 18 digit
        return uint256(price * 10000000000);
    }


    // 1000000000
    // call it get fiatConversionRate, since it assumes something about decimals
    // It wouldn't work for every aggregator
    function getConversionRate(AggregatorV3Interface nftFloorPriceFeed) internal view returns (uint256) {

        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * getNFTLatestPrice(nftFloorPriceFeed)) / 1000000000000000000;

        // the actual ETH/USD conversation rate, after adjusting the extra 0s.
        return ethAmountInUsd;
    }

    function _amountLoanable(AggregatorV3Interface nftFloorPriceFeed) public view returns (uint256 loanable) {

        uint256 amount = getConversionRate(nftFloorPriceFeed);
        loanable = (amount * minRate) / 100;
    }

    function _setRate(uint256 newRate) internal onlyOwner {
        require(newRate != 0, "rate cannot be zero");
        minRate = newRate;
    }

    function setNFTFloorPrice(IERC721 _nftContractAddress, uint256 _amount) public onlyOwner{
        setFloorPrice[_nftContractAddress] = _amount;
    }

    function availableToBorrow(IERC721 _nftContractAddress) public view returns (uint256 loanable){
        uint256 getFloorPrice = setFloorPrice[_nftContractAddress];
        loanable = (getFloorPrice * minRate) / 100;
    }

}