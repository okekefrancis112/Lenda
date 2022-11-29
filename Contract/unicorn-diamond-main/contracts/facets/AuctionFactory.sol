// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {LibDiamond} from "../libraries/LibDiamond.sol";
import {LibAuctionFactory} from "../libraries/LibAuctionFactory.sol";
import {IERC20} from "../interfaces/IERC20.sol";

/// @dev This is interface of the implementation contract which would be used to call the initialize function of the implementation contract.
interface Implementation {
    function initialize(address _seller, IERC20 _protocol_token) external;
}

/// @title Auction Factory 
/// @dev this is the contract handling the cloning and storing the address of all the clone wallet
contract AuctionFactory {

    /**
     * ===================================================
     * ----------------- EVENTS --------------------------
     * ===================================================
     */


    event Cloned(address deployer, address newContract);


    /**
     * ===================================================
     * ----------------- CUSTOMER ERROR ------------------
     * ===================================================
     */
    

    error OnlyAdmin();
    error OwnersCannotBeEmpty();
    error ComfirmationMustBeGreaterThanZero();



    /// @notice this function would return the address of the implemetaion contract
    function getImplementationAddress() 
        external 
        view 
        returns (address implementation) 
    {
        LibAuctionFactory.AuctionDiamondStorage storage as_ = LibAuctionFactory.diamondStorage();
        implementation = as_.implementation;
    }


    /// @dev this function would change the address the implementation contract address
    /// @notice this function can only be called by the admin to change the implmentation address
    function editImplementationAddress(address _newImplemntation)
        external
    {
        LibDiamond.enforceIsContractOwner();
        LibAuctionFactory.editImplemetationAddress(_newImplemntation);
    }

    

    /**
     * @dev Deploys and returns the address of a clone that mimics the behaviour of `implementation`. (Implemented witht he create opcode)
     */
    function _clone(address _implementation) internal returns (address instance) {
        assembly {
            let ptr := mload(0x40)
            mstore(ptr, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
            mstore(add(ptr, 0x14), shl(0x60, _implementation))
            mstore(add(ptr, 0x28), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
            instance := create(0, ptr, 0x37)
        }
        require(instance != address(0), "ERC1167: create failed");
    }

    /// @dev this function would deploy the new proxy/clone using the minimal proxy
    function clone(address _seller, IERC20 _token) external returns (address ) {
        LibAuctionFactory.AuctionDiamondStorage storage as_ = LibAuctionFactory.diamondStorage();
        address newWallet = _clone(as_.implementation);

        // storing thely created wallet to the mapping 
        LibAuctionFactory.updateWallets(msg.sender, newWallet);

        Implementation(newWallet).initialize(_seller, _token);

        emit Cloned(msg.sender, newWallet);

        return newWallet;
    }



    function getWalletOwners(address _deployer) public view returns (address[] memory auctions) {
        auctions = LibAuctionFactory.getUsersAuction(_deployer);
    }
}