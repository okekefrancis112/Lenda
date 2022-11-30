//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/** @title Price Oracle Contract
    @dev This contract aims to get the onchain data of NFT floor price across all NFT platforms
    - to deduce Lenda NFT worth
**/
contract PriceOracle {

     AggregatorV3Interface internal nftFloorPriceFeed;

    /**
     * Network: Goerli
     * Aggregator: CryptoPunks
     * Address: 0x5c13b249846540F81c093Bc342b5d963a7518145
     */
    constructor() {
        nftFloorPriceFeed = AggregatorV3Interface(
            0x5c13b249846540F81c093Bc342b5d963a7518145
        );
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            ,
            /*uint80 roundID*/ 
            int nftFloorPrice 
            /*uint startedAt*/ 
            /*uint timeStamp*/ 
            /*uint80 answeredInRound*/,
            ,
            ,

        ) = nftFloorPriceFeed.latestRoundData();
        return nftFloorPrice;
    }

}