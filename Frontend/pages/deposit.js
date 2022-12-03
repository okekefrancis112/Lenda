import { ethers } from "ethers";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useContractRead,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  mMATIC_CONTRACT,
  LENDA_CONTRACT,
  LENDPOOL_ADDRESS,
  mMATIC_ADDRESS,
} from "../utils/index";

export default function DepositPage() {
  const [amount, setAmount] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { address, isDisconnected, isConnected } = useAccount();

  const {
    data: walletBal,
    isError,
    isSuccess: walletBalSuccess,
    isLoading: loadingWalletBal,
  } = useContractRead({
    ...mMATIC_CONTRACT,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: approveTokenData,
    isLoading: approveLoading,
    isSuccess: approvalSuccess,
    write: approveMatic,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...mMATIC_CONTRACT,
    functionName: "approve",
    args: [
      LENDPOOL_ADDRESS,
      ethers.utils.parseEther(amount ? amount.toString() : "0"),
    ],
  });

  const { isLoading: approvalWaitLoading } = useWaitForTransaction({
    hash: approveTokenData?.hash,
    onSuccess() {
      depositMatic();
    },
    onError(data) {
      console.log(data);
    },
  });

  const {
    data,
    isLoading: loadingDeposit,
    isSuccess: depositSuccess,
    write: depositMatic,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...LENDA_CONTRACT,
    functionName: "depositFor",
    args: [address, ethers.utils.parseEther(amount ? amount.toString() : "0")],
  });

  console.log(approveTokenData, approvalSuccess);

  //   console.log(walletBalance?.value?.toNumber());
  //   console.log(walletBalance?.value?.toString());
  //   console.log(data?.toString());
  console.log(data, loadingWalletBal, depositSuccess);

  const handleDeposit = async () => {
    // depositMatic();
    approveMatic();

    console.log(amount, address);
    // try {
    //   setLoading(loadingDeposit);
    //   depositMatic();
    // } catch (err) {
    //   console.log(err);
    // } finally {
    //   setAmount(0);
    //   toast.success("mMATIC Deposited successfully", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    //   setLoading(false);
    // }
  };

  //   console.log(amount);

  return (
    <>
      <div className="min-h-[60vh] mt-10">
        <div className="max-w-[500px] mx-auto rounded-md">
          <p className="text-white mb-3">
            Deposit mMATIC to the pool to earn interest
          </p>
          <div className="text-white px-5 py-5 bg-navyBlue mb-2">
            <p>Deposit mMATIC</p>
            {/* <p>
              Available to deposit :
              <span className="ml-2">
                {isConnected && loadingWalletBal ? (
                  <span>N/A</span>
                ) : walletBalSuccess ? (
                  walletBal?.toString() / 1e18
                ) : (
                  ""
                )}
                mMATIC
              </span>
            </p> */}
          </div>
          <div className="text-white px-5 py-5 bg-navyBlue">
            <div className="border border-slate-300 rounded-md px-3 pt-2">
              <div className="flex justify-between">
                <p>Amount</p>
                {/* <p>
                  Available to deposit :
                  {isConnected && loadingWalletBal ? (
                    <span>N/A</span>
                  ) : walletBalSuccess ? (
                    walletBal?.toString() / 1e18
                  ) : (
                    ""
                  )}
                </p> */}
              </div>
              <input
                type="number"
                placeholder="0.00"
                className="bg-transparent w-full h-[60px] text-white placeholder:text-white outline-none"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>

            <button
              className="bg-green py-2 w-full rounded-md mt-5"
              onClick={() => handleDeposit()}
              disabled={isDisconnected || amount <= 0}
            >
              {loading ? "loading..." : "Deposit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
