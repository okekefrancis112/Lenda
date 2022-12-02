//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/** @title Collateral Storage contract
    @dev This contract is responsible for holding borrowers collateral
**/
library CollateralStorage{
/***==========================
    =   Error Message        =
    ==========================*/
    error mustApproved(string);


    function depositToStorage(address _depositor, uint256 _tokenId, IERC721 _nftContractAddress) internal {
        IERC721 nftContractAddress = _nftContractAddress;
        if(nftContractAddress.isApprovedForAll(_depositor, address(this)) != true) revert mustApproved("must approve to spend");
        nftContractAddress.transferFrom(_depositor, address(this), _tokenId);
    }

    function withdrawFromStorage(address _depositor, uint256 _tokenId, IERC721 _nftContractAddress) internal {
        _nftContractAddress.transferFrom(address(this), _depositor, _tokenId);
    }

    function valueInReserve(address _nftContractAddress) public view returns(uint256) {
        return IERC721(_nftContractAddress).balanceOf(address(this));
    }
}