require("dotenv").config({path: ".env"});
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";


const MUMBAI_RPC_URL = process.env.ALCHEMY_MUMBAI_RPC_URL;
const PRIVATE = process.env.PRIVATE_KEY;
const POLUGON_MAINNET_RPC_URL = process.env.ALCHEMY_POLYGON_RPC_URL;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;


module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      forking: {
        url: POLUGON_MAINNET_RPC_URL,
      }
    },
    polygon_mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  },
}
