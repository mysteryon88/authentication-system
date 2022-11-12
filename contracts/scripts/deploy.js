const hre = require("hardhat");

async function main() {

  const Authentication = await hre.ethers.getContractFactory("Authentication");
  const authentication = await Authentication.deploy();
  await authentication.deployed();
  console.log(`Authentication deployed to ${authentication.address}`);

  console.log(
    "owner =", 
    await ethers.provider.getStorageAt(authentication.address, 0)
  );

} 

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
