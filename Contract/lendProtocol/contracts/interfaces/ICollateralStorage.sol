// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;


interface ICollateralStorage{
    function depositToStorage(address _depositor, uint256 _tokenId, address _nftContractAddress) external;
    function withdrawFromStorage(address _depositor, uint256 _tokenId, address _nftContractAddress) external;
    function valueInReserve(address _nftContractAddress) external returns(uint256);
}