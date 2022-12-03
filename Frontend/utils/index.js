import lendPool from "../utils/abi/lendpoolabi.json";
import mMaticToken from "../utils/abi/mMatic.json";

export const LENDPOOL_ADDRESS = "0x24F1D4ed95217C41639FB8C6951bf6aBd6cB5361";
export const mMATIC_ADDRESS = "0x74d68b3c83ED72Da304dc4b7F8A25696CC11411a";

export const LENDA_CONTRACT = {
  address: LENDPOOL_ADDRESS,
  abi: lendPool.abi,
};

export const mMATIC_CONTRACT = {
  address: mMATIC_ADDRESS,
  abi: mMaticToken.abi,
};
