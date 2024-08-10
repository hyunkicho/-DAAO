const { ethers } = require("hardhat");

require("dotenv").config();

async function main() {
    const deployer = new ethers.Wallet(process.env.PK);
    const daoAddress = "0x9bee222fdb28f6aedcd9ab349f0c9dcaffae9a97";
    const daaoContract = await ethers.getContractAt("Daao",daoAddress);

  // const proposeTx = await daaoContract.propse(
  //     [],
  //     [],
  //     [],
  //     "We Should Add AI Governane model in here"
  // );
  // await proposeTx.wait();
  // console.log("proposeTx:", proposeTx.hash);

    // const mintTx = await DaaoToken.mint("0x9784054a007F2c61D8Ac7680a81Ff0125a9EC532", "1000000000000000000000");
    // await mintTx.wait();

    // console.log("mintTx:", mintTx.hash);
    const castVoteTx = await daaoContract.castVote("109929371507095605752498243445141444270615708347123324266890688739869964123864",1);
    await castVoteTx.wait();
    console.log("castVoteTx:", castVoteTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});