//SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import {IERC20} from "../interfaces/IERC20.sol";
import {IERC721} from "../interfaces/IERC721.sol";

/** @title Depositor Token
    @dev this token is pegged to the amount a lender deposit at a ratio 1:1
    @dev Depositor can then lock this DMatic token to yield some LND token (Lenda token) as an incentive for them
**/
contract DMatic {}