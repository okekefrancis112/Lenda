// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
* EIP-2535 Diamonds: https://eips.ethereum.org/EIPS/eip-2535
/******************************************************************************/


library LibNftFactory {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage.collectionFactory");


    struct CollectionDiamondStorage {
        mapping(address => address[]) collections;
    }

    function diamondStorage() internal pure returns (CollectionDiamondStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }

    function getCollections(address _addr) internal view returns(address[] memory cols) {
        CollectionDiamondStorage storage ds = diamondStorage();
        cols = ds.collections[_addr];
    }

    function addCollections(address _addr, address _newCollection) internal {
        CollectionDiamondStorage storage ds = diamondStorage();
        ds.collections[_addr].push(_newCollection);
    }
}
