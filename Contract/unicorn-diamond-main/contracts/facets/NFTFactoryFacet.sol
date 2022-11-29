// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {LibNftFactory} from "../libraries/LibNftFactory.sol";
import {Collection} from "../utils/Collection.sol";



/// @title Auction Factory 
/// @dev this is the contract handling the cloning and storing the address of all the clone wallet
contract CollectionFactory {

    /**
     * ===================================================
     * ----------------- EVENTS --------------------------
     * ===================================================
     */


    event NewCollection(address deployer, address newContract);


    

    function createNewCollection(string  memory _name, string memory _symbol) external {
        Collection newCollection = new Collection(_name, _symbol);
        LibNftFactory.addCollections(msg.sender, address(newCollection));
        emit NewCollection(msg.sender, address(newCollection));
    }


    function getUserCollections(address _deployer) public view returns (address[] memory collections) {
        collections = LibNftFactory.getCollections(_deployer);
    }
}