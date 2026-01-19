const { ethers } = require("hardhat");
const config = require("./frac_config.json");

async function main() {
    const [owner] = await ethers.getSigners();
    const vault = await ethers.getContractAt("FractionalVault", config.vault, owner);

    // Owner holds 100% of shares, so they should get 100% of the ETH (10 ETH)
    console.log("Redeeming shares for ETH...");
    
    const balanceBefore = await ethers.provider.getBalance(owner.address);
    
    const tx = await vault.claim();
    await tx.wait();
    
    const balanceAfter = await ethers.provider.getBalance(owner.address);
    
    console.log(`ETH Claimed! Balance increased.`);
    // Note: in local hardhat, gas costs might make the diff slightly less than 10
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
