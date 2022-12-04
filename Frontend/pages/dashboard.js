import { MdPayments } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  LENDA_CONTRACT,
  mMATIC_CONTRACT,
  LENDPOOL_ADDRESS,
} from "../utils/index";
import { useRouter } from "next/router";
import React from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [repayAmount, setRepayAmount] = React.useState("");
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();
  const {
    data: totalBal,
    isError,
    isLoading,
  } = useContractRead({
    ...LENDA_CONTRACT,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: borrowedBal } = useContractRead({
    ...LENDA_CONTRACT,
    functionName: "balanceOfBMatic",
    args: [address],
    onSuccess(data) {
      console.log("Success", data);
      setRepayAmount(borrowedBal);
    },
  });

  const {
    data: approveTokenData,
    isLoading: approveLoading,
    isSuccess: approvalSuccess,
    write: approveRepay,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...mMATIC_CONTRACT,
    functionName: "approve",
    args: [
      LENDPOOL_ADDRESS,
      //   ethers.utils.parseEther(amount ? amount.toString() : "0"),
      ethers.utils.parseEther(repayAmount ? repayAmount.toString() : "0"),
    ],
  });

  const { isLoading: approvalWaitLoading } = useWaitForTransaction({
    hash: approveTokenData?.hash,
    onSuccess() {
      repay();
    },
    onError(data) {
      console.log(data);
    },
  });

  const {
    data,
    isLoading: loadingRepay,
    isSuccess: repaySuccess,
    write: repay,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...LENDA_CONTRACT,
    functionName: "repayLoan",
    onSuccess() {
      toast.success(`Successfully repaid load`, {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  console.log(totalBal?.toString());

  return (
    <div className="min-h-[70vh]">
      <div className="max-w-[800px] mx-auto mt-12 px-5">
        <h1 className="text-white text-2xl font-bold mb-5">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-5 text-white ">
          <div className="w-full md:w-1/2 bg-navyBlue p-5 rounded-md">
            <div className="flex gap-4">
              <GiMoneyStack color="white" fontSize={25} />
              <span className="font-bold">My Deposits</span>
            </div>
            <div>
              <p>
                Total Balance: <span>{totalBal?.toString() / 1e18} MATIC</span>
              </p>
            </div>
            <div className="flex gap-5 mt-8">
              <button
                className="w-1/2 bg-green px-3 py-2"
                onClick={() => router.push("/deposit")}
              >
                Deposit
              </button>
              <button
                className="w-1/2 bg-purple px-3 py-2"
                onClick={() => router.push("/withdraw")}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-navyBlue p-5 rounded-md">
            <div className="flex gap-4">
              <MdPayments color="white" fontSize={25} />
              <span className="font-bold">My Borrows</span>
            </div>
            <div>
              <p>
                Total Balance:{" "}
                <span>{borrowedBal?.toString() / 1e18} MATIC</span>
              </p>
            </div>
            <div className="flex gap-5 mt-8">
              <button
                className="w-full bg-purple px-3 py-2"
                onClick={() => {
                  approveRepay?.();
                }}
                disabled={
                  isDisconnected ||
                  isConnecting ||
                  loadingRepay ||
                  approvalWaitLoading ||
                  approveLoading
                }
              >
                Repay Loan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
