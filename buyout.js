const { ethers } = require("hardhat");
const config = require("./frac_config.json");

async function main() {
    const [owner, buyer] = await ethers.getSigners();
    const vault = await ethers.getContractAt("FractionalVault", config.vault, owner);

    // 1. Owner sets price (e.g. 10 ETH)
    console.log("Owner setting buyout price to 10 ETH...");
    await vault.setSalePrice(ethers.parseEther("10"));

    // 2. Buyer buys it
    console.log(`Buyer ${buyer.address} purchasing NFT...`);
    const vaultAsBuyer = vault.connect(buyer);
    
    const tx = await vaultAsBuyer.purchase({ value: ethers.parseEther("10") });
    await tx.wait();

    console.log("Buyout Complete! NFT transferred to Buyer.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
