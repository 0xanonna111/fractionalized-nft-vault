const { ethers } = require("hardhat");
const config = require("./frac_config.json");

async function main() {
    const [owner] = await ethers.getSigners();
    const nft = await ethers.getContractAt("MockNFT", config.nft, owner);
    const vault = await ethers.getContractAt("FractionalVault", config.vault, owner);

    console.log("Approving Vault to take NFT...");
    await nft.approve(config.vault, 1);

    console.log("Fractionalizing NFT into 1,000,000 shares...");
    // Initialize(Collection, ID, Supply)
    const tx = await vault.initialize(config.nft, 1, 1000000);
    await tx.wait();

    const bal = await vault.balanceOf(owner.address);
    console.log(`Success! Owner received ${ethers.formatEther(bal)} FRAC tokens.`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
