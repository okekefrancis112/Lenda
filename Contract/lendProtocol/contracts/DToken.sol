// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import { ERC20Permit } from "yield-utils-v2/token/ERC20Permit.sol";
import { IERC20 } from "yield-utils-v2/token/IERC20.sol";

/// @notice deposits made using "deposit", revert with this error
/// @dev this error is thrown in the case where "transferFrom" returns false.
/// however instead of throwing false, its possible  the IERC20 reverts,
/// for example when attempting to trasfer more than the allowance.
/// so not all failed deposits will throw this
error DepositFailed(address account, uint256 amount);

/// @notice withdrawals made using "burn", revert with this error
/// @dev if the amount is too low, or if the transfer fails,
/// similar to deposit, it is possible that transfers revert before this error is thrown.
/// see DepositFailed
error WithdrawFailed(address account, uint256 amount);

/// @title an erc20 wrapper for erc20 tokens
/// @author zeroth-oc
/// @notice this accepts prespecified erc20 and mints a a wrapped version of it back to the user,
/// which can be redeemed for the undelying erc20 token at anytime
contract ERC20wrapper is ERC20("DTOKEN", "DTKN", 18) {
  ///@notice the wrapped erc20 token
  IERC20 public immutable token;

  /// @notice initializes new wrapper token
  /// @param token address of token to be wrapped
  /// @param name name of wrapper token
  /// @param symbol symbol of wrapper token
  /// @param decimals number of decimals for wrapper token, same as underlying token
  constructor(
    address token_,
    string memory name,
    string memory symbol,
    uint8 decimals
  ) ERC20Permit(name, symbol, decimals) {
    token = IERC20(token_);
  }

  /// @notice this handles eth send into the contract and mints the equal amount back
  /// @param the amount of tokens to be wrapped
  /// @dev follows the Checks-Effects-Interactions Pattern
  /// @dev this function may revert by throwing DepositFailed,
  /// it may also fail if the token transfer fails
  function deposit(uint256 amount) public {
    _mint(msg.sender, amount);
    (bool successful, ) = token.transferFrom(msg.sender, address(this), amount);
    if (!successful) {
      revert DepositFailed(msg.sender, amount);
    }
  }

  /// @notice burns wrapped token and returns equal amount back
  /// @param amount of tokens to be burned
  /// @dev follows the Checks-Effects-Interactions Pattern
  /// @dev this function may revert by throwing WithdrawFailed
  function burn(uint256 amount) public {
    _burn(msg.sender, amount);

    (bool successful, ) = token.transfer(msg.sender, amount);
    if (!successful) {
      revert WithdrawFailed(msg.sender, amount);
    }
  }
}
