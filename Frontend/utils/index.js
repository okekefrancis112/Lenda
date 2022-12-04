import lendPool from "../utils/abi/lendpoolabi.json";
import mMaticToken from "../utils/abi/mMatic.json";
import yieldAbi from "./abi/yieldAbi.json";
import faucetAbi from "./abi/faucet.json";

export const LENDPOOL_ADDRESS = "0xD287cc4B99cA787c0d7F949deD9961531aEda71E";
// export const LENDPOOL_ADDRESS = "0xd98F2dE9949047bcf5647440f5A1c2114D315e94";
// export const LENDPOOL_ADDRESS = "0x5e3886c7fbc5e06B1506357108cF8888d07B41a2";
// export const LENDPOOL_ADDRESS = "0x24F1D4ed95217C41639FB8C6951bf6aBd6cB5361";
export const mMATIC_ADDRESS = "0x74d68b3c83ED72Da304dc4b7F8A25696CC11411a";
export const YIELDCONTRACT_ADDRESS =
  "0xCA3529CD293BF6B3d604193F36f9604f91D11d5c";

export const FAUCET_ADDRESS = "0x051203bD71519b80572fd7D5D659BbB6FEc802C0";
// export const FAUCET_ADDRESS = "0xCa4817608f3d5fcFd417bCAab43c51E2CEd6aDeD";

export const LENDA_CONTRACT = {
  address: LENDPOOL_ADDRESS,
  abi: lendPool,
};

export const mMATIC_CONTRACT = {
  address: mMATIC_ADDRESS,
  abi: mMaticToken.abi,
};

export const YIELD_ADDRESS = {
  address: YIELDCONTRACT_ADDRESS,
  abi: yieldAbi,
};

export const FAUCET_CONTRACT = {
  address: FAUCET_ADDRESS,
  abi: faucetAbi,
};
