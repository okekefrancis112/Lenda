import { ethers, network, run } from "hardhat";

async function main() {


  // faucet contract deployment

  const SampleToken = await ethers.getContractFactory("sampleToken");
  const sampleToken = await SampleToken.deploy("0x74d68b3c83ED72Da304dc4b7F8A25696CC11411a");
 await sampleToken.deployed();

  console.log(`CryptoPunks is deployed to ${sampleToken.address}`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});