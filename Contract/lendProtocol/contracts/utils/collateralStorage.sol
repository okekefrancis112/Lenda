//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ICollateralStorage} from "../interfaces/ICollateralStorage.sol";

/** @title Collateral Storage contract
    @dev This contract is responsible for holding borrowers collateral
**/
contract CollateralStorage is ICollateralStorage{
/***==========================
    =   Error Message        =
    ==========================*/
    error mustApprove(string);


    function depositToStorage(address _depositor, uint256 _tokenId, address _nftContractAddress) external override {
        IERC721 nftContractAddress = IERC721(_nftContractAddress);
        if(nftContractAddress.isApprovedForAll(_depositor, address(this)) != true) revert mustApprove("must approve to spend");
        nftContractAddress.transferFrom(_depositor, address(this), _tokenId);
    }

    function withdrawFromStorage(address _depositor, uint256 _tokenId, address _nftContractAddress) external override {
        IERC721(_nftContractAddress).transferFrom(address(this), _depositor, _tokenId);
    }

    function valueInReserve(address _nftContractAddress) external view override returns(uint256) {
        return IERC721(_nftContractAddress).balanceOf(address(this));
    }
}