const { ethers } = require("hardhat");

require("dotenv").config();

async function main() {
    const deployer = new ethers.Wallet(process.env.PK);
    const daoAddress = "0x9bee222fdb28f6aedcd9ab349f0c9dcaffae9a97";
    const daaoContract = await ethers.getContractAt("Daao",daoAddress);

    const castVoteTx = await daaoContract.checkAI("109929371507095605752498243445141444270615708347123324266890688739869964123864",1);
    await castVoteTx.wait();
    console.log("castVoteTx:", castVoteTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});