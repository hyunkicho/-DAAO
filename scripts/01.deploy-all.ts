const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const deployer = new ethers.Wallet(process.env.PK);
    console.log("deployer >>", deployer.address);
    const DaaoToken = await ethers.deployContract("DaaoToken");

    await DaaoToken.waitForDeployment();
    console.log("DaaoToken contract deployed to:", await DaaoToken.getAddress());
    const DaaoTokenAddress = await DaaoToken.getAddress();

    const minDelay = 60;
    const zeroAddress = ethers.zeroAddress;
    const timelockController = await ethers.deployContract("DaaoTimelock", [minDelay, [deployer.address], [deployer.address], deployer.address]);
    const timelockControllerAddress = await timelockController.getAddress();
    console.log("timelockControllerAddress contract deployed to:", timelockControllerAddress);

    const Daao = await ethers.deployContract("Daao",[DaaoTokenAddress, timelockControllerAddress]);
    await Daao.waitForDeployment();
    console.log("Daao contract deployed to:", await Daao.getAddress());

    const grantAllRoleToDaoTx = await timelockController.grantAllRole(await Daao.getAddress());
    await grantAllRoleToDaoTx.wait();

    const proposeTx = await Daao.propse(
        [],
        [],
        [],
        "We Should Add AI Governane model in here"
    );

    await proposeTx.wait();
    console.log("proposeTx:", proposeTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// DaaoToken contract deployed to: 0x57Edf82087620b3fbA6140ccf15aaDa8D37C928A
// timelockControllerAddress contract deployed to: 0xC46fC393cB81eEF15bfD41AAFacE80fAEacd2aC7
// Daao contract deployed to: 0x62bBf4570989e374C535F2fcE6a6A809a4D5cc43