import { ethers } from "ethers";
import { useState } from "react";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { LENDA_CONTRACT } from "../utils/index";
import { toast } from "react-toastify";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const { address, isDisconnected, isConnected } = useAccount();

  const {
    data: totalBal,
    isError: balError,
    isLoading: totalBalLoading,
    refetch: refetchBal,
  } = useContractRead({
    ...LENDA_CONTRACT,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    data: withdrawData,
    isLoading: withdrawLoading,
    isSuccess: withdrawSuccess,
    write: withdrawMatic,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...LENDA_CONTRACT,
    functionName: "withdraw",
    args: [ethers.utils.parseEther(amount ? amount.toString() : "0"), address],
    onSuccess(data) {
      setAmount(0);
      toast.success(`${amount} mMATIC has been transferred to your wallet`, {
        position: toast.POSITION.TOP_CENTER,
      });
      refetchBal();
      console.log("hugiyutfdyr");
    },
  });

  const handleWithdrawal = () => {
    withdrawMatic();
  };

  return (
    <div className="min-h-[60vh] mt-10 px-5">
      <div className="max-w-[500px] mx-auto rounded-md">
        <p className="text-white mb-3 text-3xl">Withdraw mMatic</p>
        <div className="text-white px-5 py-5 bg-navyBlue mb-2">
          <p>Withdraw mMATIC</p>
          <p>
            Available to balance:
            <span className="ml-2">{totalBal?.toString() / 1e18} MATIC</span>
          </p>
        </div>
        <div className="text-white px-5 py-5 bg-navyBlue">
          <div className="border border-slate-300 rounded-md px-3 pt-2">
            <div className="flex justify-between">
              <p>Amount</p>
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
            onClick={() => handleWithdrawal()}
            disabled={isDisconnected || amount <= 0 || withdrawLoading}
          >
            {withdrawLoading ? "loading..." : "Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
}
