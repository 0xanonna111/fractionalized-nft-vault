// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FractionalVault is ERC20, ERC721Holder, Ownable {
    IERC721 public nftCollection;
    uint256 public nftId;
    bool public initialized;
    bool public forSale;
    uint256 public salePrice;
    bool public sold;

    constructor() ERC20("NFT Fraction", "FRAC") Ownable(msg.sender) {}

    // Step 1: Initialize the vault by locking an NFT
    function initialize(address _collection, uint256 _tokenId, uint256 _supply) external onlyOwner {
        require(!initialized, "Already initialized");
        require(_supply > 0, "Supply > 0");

        nftCollection = IERC721(_collection);
        nftId = _tokenId;
        
        // Transfer NFT to this contract
        nftCollection.safeTransferFrom(msg.sender, address(this), _tokenId);

        // Mint shares to the owner
        _mint(msg.sender, _supply * 10 ** decimals());
        
        initialized = true;
    }

    // Step 2: Enable buyout mode
    function setSalePrice(uint256 _price) external onlyOwner {
        require(!sold, "Already sold");
        salePrice = _price;
        forSale = true;
    }

    // Step 3: Someone buys the NFT
    function purchase() external payable {
        require(forSale, "Not for sale");
        require(msg.value >= salePrice, "Insufficient ETH");
        require(!sold, "Already sold");

        sold = true;
        
        // Transfer NFT to buyer
        nftCollection.safeTransferFrom(address(this), msg.sender, nftId);
    }

    // Step 4: Share holders claim ETH
    function claim() external {
        require(sold, "NFT not sold yet");
        
        uint256 shareBalance = balanceOf(msg.sender);
        require(shareBalance > 0, "No shares");

        // Calculate share of the ETH pool
        // Amount = (UserShares * ContractETHBalance) / TotalSharesSupply
        uint256 ethAmount = (shareBalance * address(this).balance) / totalSupply();

        _burn(msg.sender, shareBalance);
        
        (bool success, ) = msg.sender.call{value: ethAmount}("");
        require(success, "Transfer failed");
    }
    
    // Allow contract to receive ETH
    receive() external payable {}
}
