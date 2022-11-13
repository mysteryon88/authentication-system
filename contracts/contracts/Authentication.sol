// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Access.sol";
import "./Passport.sol";
import "./IPassport.sol";

contract Authentication is Access {
    struct Human {
        bytes32 name;
        bytes32 surname;
        bytes32 hashPass;
        uint256 birthday;
    }

    mapping(address => Human) private humans;

    uint256 constant ADULT = 31556926 * 18;

    Passport pass;

    constructor() {
        pass = new Passport();
    }

    function registration(
        bytes32 name,
        bytes32 surname,
        bytes32 hashPass,
        uint256 birthday
    ) external onlyAdmin {}

    function createPass(address to, string memory uri) external onlyAdmin {
        pass.safeMintPass(to, uri);
    }

    function setupWallet(
        address newWallet,
        address oldWallet
    ) external onlyAdmin {
        require(
            newWallet == address(0) || oldWallet == address(0),
            "Zero address"
        );
        humans[newWallet] = humans[oldWallet];
        delete humans[oldWallet];
    }

    function verification(
        address wallet
    ) external view _isExist(wallet) returns (bool) {
        return true;
    }

    function ageVerification(
        address wallet
    ) external view _isExist(wallet) returns (bool) {
        return (block.timestamp - ADULT) > humans[wallet].birthday;
    }

    modifier _isExist(address wallet) {
        require(
            humans[wallet].birthday != 0,
            "There is no such person in the system"
        );
        _;
    }
}
