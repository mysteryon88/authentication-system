// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IPassport {
    function safeMintPass(address to, string memory uri) external;
}
