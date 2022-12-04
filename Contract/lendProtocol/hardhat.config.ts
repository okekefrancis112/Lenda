require("dotenv").config({path: ".env"});
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";


const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY 
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      // blockConfirmations: 6,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
      // blockConfirmations: 6,
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1,
      // blockConfirmations: 6,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  solidity: {
    compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
  },
};