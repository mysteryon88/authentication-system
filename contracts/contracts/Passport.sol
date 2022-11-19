// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ERC721/ERC721.sol";
import "./ERC721/extensions/ERC721URIStorage.sol";

contract Passport is ERC721, ERC721URIStorage {
    address private owner;

    uint256 private idPass = 1;

    mapping(address => uint256) private passId;

    constructor() ERC721("Passport", "PASS") {
        owner = msg.sender;
    }

    function safeMintPass(address to, string memory uri) external onlyOwner {
        require(passId[to] == 0, "Already has a passport!");
        uint256 tokenId = idPass;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        passId[to] = tokenId;
        idPass++;
    }

    //надо подумать
    function getIdMyPass() external view returns (uint256) {
        return passId[msg.sender];
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not owner!");
        _;
    }
}
