const { ethers } = require("hardhat");
const config = require("./frac_config.json");

async function main() {
    const [owner] = await ethers.getSigners();
    const nft = await ethers.getContractAt("MockNFT", config.nft, owner);

    console.log("Minting NFT ID 1 to owner...");
    await nft.mint(owner.address, 1);
    
    console.log("Minted!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
