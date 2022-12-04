import { ethers, network, run } from "hardhat";

async function main() {

  const maticCirculation = await ethers.utils.parseUnits("1000000000", 18);

  // //mocked matic cdeployment
  // const MATIC = await ethers.getContractFactory("mMatic");
  // const matic = await MATIC.deploy(maticCirculation);
  // await matic.deployed();


  // Lendpool contract deployment

  const LendPool = await ethers.getContractFactory("LendPool");
  const lendpool = await LendPool.deploy("0x74d68b3c83ED72Da304dc4b7F8A25696CC11411a");
  await lendpool.deployed();

  // const LENDPOOL = await ethers.getContractAt("LendPool", "0x834810906804160649f0Bb04eCD400a9bd17EFcF");
  // const lendpools = await LENDPOOL.borrowLoan("0xB50285433aAda7261A8F518E25128Ee0ED1DFcA2", 1, 21, "10000000");

  // console.log(await lendpools.wait(), "result")





  // // yield contract deployment

  // const Yield = await ethers.getContractFactory("YieldContract");
  // const yields = await Yield.deploy(lendpool.address);
  // await yields.deployed();

  console.log(`Lendpool is deployed to ${lendpool.address}`);
  // console.log(`Yield Contract is deployed to ${yields.address}`);
  // console.log(`Matic contract address is deployed to ${matic.address}`);

  // console.log(`Verifying all contracts deployed with on explorer`);

  // console.log(`verifying for yield contract`);

  // await run(`verify:verify`, {
  //   address: "0x3B6871FC9BfBf0b53eB7f4FDC78059b54c4e0525",
  //   constructorArguments: ["0x5e3886c7fbc5e06B1506357108cF8888d07B41a2"],
  //   contract: "contracts/utils/yield.sol:YieldContract"
  // })

  console.log(`verifying for lendpool contract`);

  await run(`verify:verify`, {
    address: "0xD287cc4B99cA787c0d7F949deD9961531aEda71E",
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
