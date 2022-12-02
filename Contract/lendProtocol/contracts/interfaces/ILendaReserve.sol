// SPDX-License-Identifier: MIT


pragma solidity 0.8.9;

interface ILendaReserve {
    function depositToReserve(uint256 _amount, address _depositor) external;
    function withdrawFromReserve(uint256 _amount, address _depositor) external;
    function valueInReserve() external view returns(uint256);
    function movingGeneric(
        address _receiver,
        address _tokenContractAddress,
        uint256 _amount
    ) external;
    function updateAdmin(address _newAdmin) external;
}