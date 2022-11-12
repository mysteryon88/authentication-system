// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Access {

    address public owner; 
    mapping(address => bool) public admins;

    constructor () { 
        admins[msg.sender] = true;
        owner = msg.sender;
    }

    function revokeAdmin(address oldAdmin) external onlyOwner {
        admins[oldAdmin] = false;
    }

    function setupAdmin(address newAdmin) external onlyOwner {
        admins[newAdmin] = true;
    }

    function setupOwner(address newOwner) external onlyOwner {
        owner = newOwner;
        admins[newOwner] = true;
        admins[msg.sender] = false;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not owner!");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "You are not admin!");
        _;
    }

}

