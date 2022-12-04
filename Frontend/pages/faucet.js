import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useContractWrite } from "wagmi";
import { FAUCET_CONTRACT } from "../utils/index";

export default function Faucet() {
  const [address, setAddress] = useState("");
  const { isDisconnected, isConnected } = useAccount();
  const {
    data: mintData,
    isLoading: mintLoading,
    isSuccess: mintSuccess,
    write: handleMint,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    ...FAUCET_CONTRACT,
    functionName: "requestTokens",
    args: [address],
    onSuccess(data) {
      console.log("Success", data);
      toast.success(`Successfully sent you some mMatic token`, {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  const handleRequest = () => {
    handleMint();
  };

  console.log(mintLoading, mintSuccess, address);
  return (
    <div className="min-h-[60vh] mt-10">
      <div className="px-5 max-w-[500px] mx-auto rounded-md">
        <p className="text-white mb-3 text-3xl"> mMatic Faucet</p>

        <div className="text-white px-5 py-5 bg-navyBlue">
          <div className="pt-2">
            <div className="flex justify-between">
              <p>Enter Address</p>
            </div>
            <input
              type="text"
              placeholder="Wallet address"
              className="bg-transparent w-full h-[60px] text-white border border-slate-300 rounded-md  placeholder:text-white outline-none px-4 mt-3"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>

          <button
            className="bg-green py-2 w-full rounded-md mt-5"
            onClick={() => handleRequest()}
            disabled={isDisconnected || address == "" || mintLoading}
          >
            {mintLoading ? "loading..." : "Send Me mMatic"}
          </button>
        </div>
      </div>
    </div>
  );
}
