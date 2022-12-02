import { ethers } from "hardhat";

async function main() {

  //mocked matic cdeployment
  const MATIC = await ethers.getContractFactory("mMatic");
  const matic = await MATIC.deploy(1_000_000_000);
  await matic.deployed();

  // lenda token deployment

  const LENDA = await ethers.getContractFactory("LendaToken");
  const lenda = await LENDA.deploy(1_000_000_000);
  await lenda.deployed();


  // Lendpool contract deployment

  const LendPool = await ethers.getContractFactory("LendPool");
  const lendpool = await LendPool.deploy(matic.address);
  await lendpool.deployed();



  // yield contract deployment

  const Yield = await ethers.getContractFactory("YieldContract");
  const yields = await Yield.deploy(lendpool.address);
  await yields.deployed();

  console.log(`Lendpool is deployed to ${lendpool.address}`);
  console.log(`Yield Contract is deployed to ${yields.address}`);
  console.log(`Matic contract address is deployed to ${matic.address}`);
  console.log(`Lenda toke is deployed to ${lenda.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
