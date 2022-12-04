import styles from "../styles/Borrow.module.css";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useContractWrite,
  useDisconnect,
  useContractRead,
  useWaitForTransaction,
} from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import { LENDA_CONTRACT, LENDPOOL_ADDRESS } from "../utils/index";
import axios from "axios";
import { toast } from "react-toastify";
import nftAbi from "../utils/abi/nftAbi.json";

const options = [
  { value: "0xB50285433aAda7261A8F518E25128Ee0ED1DFcA2", label: "Azuki" },
  { value: "0x6730E0C8910218d64DEf48Dc0434f41CAe2F3630", label: "BAYC " },
  { value: "0x2243DD81C21ad104DBe6D3e12CfC9e3db38A4932", label: "CloneX " },
  { value: "0xf150f26D794e3d1129dD4c2AF356Da1a76dDeDaE", label: "CoolCats" },
  {
    value: "0xB72705c99DF57aE0B4aedD0B20a69D809db9136E",
    label: "CryptoPunks ",
  },
  { value: "0xd17bFB32Fe23e731f4Aa23D87686aA29c01aCCC6", label: "Cryptoadz " },
  { value: "0xde0b1D6d5c39f9b64C439dB6B0F8B116Ea9F818f", label: "Doodles " },
  { value: "0xcEE4593b3Abd20D75B421F34D93e45F838311C28", label: "MAYC" },
  { value: "0x4a0039c8D8C54A25Ebc718e278613921E938720D", label: "VeeFriends" },
  {
    value: "0xE35546d6418f206DE55eC67b4BCEF010322B8C50",
    label: "World of Women",
  },
];

export default function BorrowPage() {
  const [selectedOption, setSelectedOption] = useState({});
  const [availableToBorrow, setAvailableToBorrow] = useState("");
  const [requestData, setRequestData] = useState({
    tokenAddress: "",
    tokenId: "",
    loanCompleteTime: "",
    amountToBorrow: "",
  });

  const { address, isConnected } = useAccount();
  const { data, isLoading, isSuccess, refetch } = useContractRead({
    ...LENDA_CONTRACT,
    functionName: "availableToBorrow",
    args: [selectedOption.value],
    onSuccess(data) {
      console.log("skjbjk");
      toast.success(
        `${data?.toString() / 1e18} matic available to be borrowed`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      setAvailableToBorrow(Number(data?.toString() / 1e18));
    },
  });

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const {
    data: borrowLoanData,
    isLoading: borrowLoading,
    isSuccess: borrowSuccess,
    write: writeBorrow,
    error,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...LENDA_CONTRACT,
    functionName: "borrowLoan",
    args: [
      requestData.tokenAddress,
      requestData.tokenId,
      requestData.loanCompleteTime,
      requestData.amountToBorrow,
    ],
    onError(error) {
      console.log("Error", error);
    },
  });

  const {
    data: approveNftData,
    isLoading: approveNftLoading,
    isSuccess: approveSuccess,
    write: approveNft,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: requestData.tokenAddress,
    abi: nftAbi,
    functionName: "approve",
    args: [LENDPOOL_ADDRESS, requestData.tokenId],
    onSuccess(data) {
      console.log("it was successful");
    },
  });

  const { isLoading: approvalWaitLoading } = useWaitForTransaction({
    hash: approveNftData?.hash,
    onSuccess() {
      writeBorrow();
      console.log("borrow called");
    },
    onError(data) {
      console.log(data);
    },
  });

  console.log(
    "approveal logs",
    approveNftData,
    approveNftLoading,
    approveSuccess
  );
  console.log(
    "borrow logs",
    borrowLoanData,
    borrowLoading,
    borrowSuccess,
    error
  );

  console.log("approvalWaitLoading", approvalWaitLoading);

  const fetchTokenId = async () => {
    try {
      const res = await axios.get(
        `https://polygon-mumbai.g.alchemy.com/nft/v2/HBGpARZ7rjn6Iot1A6UkBgFeDzn6IGYH/getNFTs/?owner=${address}&contractAddresses[]=${selectedOption?.value}`
      );
      // console.log(Number(res?.data?.ownedNfts[0]?.id?.tokenId));
      // console.log(res?.data?.ownedNfts[0]?.id?.tokenId);

      setRequestData({
        ...requestData,
        tokenId: res?.data?.ownedNfts[0]?.id?.tokenId
          ? Number(res?.data?.ownedNfts[0]?.id?.tokenId)
          : "",
        tokenAddress: selectedOption?.value,
      });

      const selectedNFT = options.filter(
        (nft) => nft.value === selectedOption?.value
      );
      // console.log(selectedNFT);

      if (res?.data?.ownedNfts[0]?.id?.tokenId === undefined) {
        toast.error(`You do not own any ${selectedNFT[0].label} NFT`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTokenId();
  }, [selectedOption]);

  // console.log(selectedOption.value);
  // console.log(data?.toString());
  // console.log(LENDA_CONTRACT);
  // console.log(isLoading, isSuccess);

  // console.log(selectedOption);
  // console.log(availableToBorrow);

  const handleBorrow = (e) => {
    e.preventDefault();
    // console.log(requestData);

    if (
      requestData.tokenAddress !== "" &&
      requestData.tokenId !== "" &&
      requestData.loanCompleteTime !== "" &&
      requestData.amountToBorrow !== ""
    ) {
      console.log("complete");
      approveNft();
    }

    // approveNft();
  };

  // console.log(borrowLoanData, borrowLoading, borrowSuccess);

  console.log(requestData);

  return (
    <div className="min-h-[70vh] px-5">
      <div className="max-w-[450px] mx-auto bg-navyBlue px-4 py-3 pb-10 mt-10 mb-20 rounded-xl">
        <form className={styles.form}>
          <h2 className="py-2 text-white text-2xl font-bold mb-2">Borrow</h2>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
          <span className="text-white">
            Available to borrow : {availableToBorrow}
          </span>
          <input
            type="number"
            className={styles.input}
            placeholder="Amount to borrow"
            value={requestData.amountToBorrow}
            onChange={(e) =>
              setRequestData({
                ...requestData,
                amountToBorrow: Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            className={styles.input}
            placeholder="Number of Days"
            value={requestData.loanCompleteTime}
            onChange={(e) =>
              setRequestData({
                ...requestData,
                loanCompleteTime: Number(e.target.value),
              })
            }
          />
          {isConnected ? (
            <button
              className="bg-[#7d5bd6] w-full font-bold py-3 rounded-md text-[20px] blur-[0.5px] brightness-125"
              onClick={(e) => handleBorrow(e)}
            >
              LEND
            </button>
          ) : (
            <button
              className="bg-[#7d5bd6] w-full font-bold py-3 rounded-md text-[20px] l"
              onClick={() => connect()}
            >
              Connect Wallet
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
