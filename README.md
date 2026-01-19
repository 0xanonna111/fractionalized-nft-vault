# Fractionalized NFT Vault

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![ERC-20](https://img.shields.io/badge/shares-ERC20-yellow)
![ERC-721](https://img.shields.io/badge/asset-ERC721-orange)

## Overview

**Fractionalized NFT Vault** allows you to take a high-value NFT (e.g., a Bored Ape) and split it into 1,000,000 fungible tokens. This allows multiple people to own a "share" of the asset.

## Mechanics

1.  **Fractionalize**: Owner sends NFT to the Vault. Vault mints 100% of ERC-20 shares to the owner.
2.  **Trade**: Owner sells shares on Uniswap/SushiSwap (not included here, but possible).
3.  **Buyout**: An external buyer can offer ETH to buy the whole NFT.
4.  **Redeem**: If a buyout is accepted, share holders burn their tokens to claim their portion of the ETH.

## Usage

```bash
# 1. Install
npm install

# 2. Deploy Infrastructure
npx hardhat run deploy.js --network localhost

# 3. Mint a Mock NFT
node mint_nft.js

# 4. Lock NFT & Create Shares
node fractionalize.js

# 5. Execute Buyout (Whale buys the NFT)
node buyout.js

# 6. Shareholder Claims ETH
node claim_eth.js
