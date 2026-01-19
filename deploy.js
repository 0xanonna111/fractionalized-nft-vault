const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    // 1. Deploy Mock NFT
    const NFT = await ethers.getContractFactory("MockNFT");
    const nft = await NFT.deploy();
    await nft.waitForDeployment();
    const nftAddr = await nft.getAddress();

    // 2. Deploy Vault
    const Vault = await ethers.getContractFactory("FractionalVault");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();
    const vaultAddr = await vault.getAddress();

    console.log(`NFT: ${nftAddr}`);
    console.log(`Vault: ${vaultAddr}`);

    // Save Config
    const config = { nft: nftAddr, vault: vaultAddr };
    fs.writeFileSync("frac_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
