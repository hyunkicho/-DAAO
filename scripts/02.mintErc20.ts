const { ethers } = require("hardhat");

require("dotenv").config();

async function main() {
    const deployer = new ethers.Wallet(process.env.PK);
    const daoTokenAddress = "0xaFcAB3B22E92d925fBbF45ae6FA7d1aa85724487";
    const DaaoToken = await ethers.getContractAt("DaaoToken",daoTokenAddress);

    // const mintTx = await DaaoToken.mint("0x9784054a007F2c61D8Ac7680a81Ff0125a9EC532", "1000000000000000000000");
    // await mintTx.wait();

    // console.log("mintTx:", mintTx.hash);
    const delegate = await DaaoToken.delegate(deployer);
    await delegate.wait();

    const getVotesRes = await DaaoToken.getVotes(deployer);
    console.log("getVotesRes:", getVotesRes);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});