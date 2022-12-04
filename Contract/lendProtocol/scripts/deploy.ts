import { ethers, network, run } from "hardhat";

async function main() {

  const maticCirculation = await ethers.utils.parseUnits("1000000000", 18);

  // //mocked matic cdeployment
  // const MATIC = await ethers.getContractFactory("mMatic");
  // const matic = await MATIC.deploy(maticCirculation);
  // await matic.deployed();


  // // Lendpool contract deployment

  // const LendPool = await ethers.getContractFactory("LendPool");
  // const lendpool = await LendPool.deploy(matic.address);
  // await lendpool.deployed();



  // // yield contract deployment

  // const Yield = await ethers.getContractFactory("YieldContract");
  // const yields = await Yield.deploy(lendpool.address);
  // await yields.deployed();

  // console.log(`Lendpool is deployed to ${lendpool.address}`);
  // console.log(`Yield Contract is deployed to ${yields.address}`);
  // console.log(`Matic contract address is deployed to ${matic.address}`);

  console.log(`Verifying all contracts deployed with on explorer`);

  console.log(`verifying for yield contract`);

  await run(`verify:verify`, {
    address: "0x3B6871FC9BfBf0b53eB7f4FDC78059b54c4e0525",
    constructorArguments: ["0x5e3886c7fbc5e06B1506357108cF8888d07B41a2"],
    contract: "contracts/utils/yield.sol:YieldContract"
  })

  console.log(`verifying for lendpool contract`);

  await run(`verify:verify`, {
    address: "0x5e3886c7fbc5e06B1506357108cF8888d07B41a2",
    constructorArguments: ["0x74d68b3c83ED72Da304dc4b7F8A25696CC11411a"],
    contract: "contracts/LendPool.sol:LendPool"
  })


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
