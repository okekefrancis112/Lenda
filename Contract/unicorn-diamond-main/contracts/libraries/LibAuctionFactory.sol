// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
/******************************************************************************/



library LibAuctionFactory {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage.auctionFactory");

    event EditedImplementedAddress(address indexed editor, address newImplementation);
    event AddedNewAuctionContract(address indexed updater, address newAuction);

    struct AuctionDiamondStorage {
        address implementation; // this is the address of the implementaion 
        mapping (address => address[]) auctions; // this is a mapping of a user to a auction contract arrays
    }

    function diamondStorage() internal pure returns (AuctionDiamondStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    
    function editImplemetationAddress(address _newImplemntation) internal {
        AuctionDiamondStorage storage ds = diamondStorage();
        ds.implementation = _newImplemntation;
        emit EditedImplementedAddress(msg.sender, _newImplemntation);
    }

    function updateWallets(address deployer, address _newAuction) internal {
        AuctionDiamondStorage storage ds = diamondStorage();
        ds.auctions[deployer].push(_newAuction);
        emit AddedNewAuctionContract(deployer, _newAuction);
    }

    function getUsersAuction(address deployer) internal view returns (address[] memory auctions) {
        AuctionDiamondStorage storage ds = diamondStorage();
        auctions = ds.auctions[deployer];
    }
}
