import { useEffect, useState } from "react";
import styles from "../styles/Borrow.module.css";

import {
  useAccount,
  useConnect,
  useContractWrite,
  useDisconnect,
  useContractRead, useWaitForTransaction, usePrepareContractWrite,
} from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import {YIELD_ADDRESS, YIELDCONTRACT_ADDRESS} from "../utils/index";
import axios from "axios";
import {ethers} from "ethers";

export default function Yield() {
  const [ lockDmaticModal, setLockDmaticModal] = useState(false)

  const [tokenAmount, setTokenAmount] = useState()
  const [lockDays, setLockDays] = useState()
  const [loading, setLoading]  = useState()
  const { address, isDisconnected, isConnected } = useAccount()

  const { lockConfig } = usePrepareContractWrite(
      {
        addressOrName: YIELD_ADDRESS.address,
        contractInterface: YIELD_ADDRESS.abi,
        functionName: "lockDTokenForLND",
        args: [tokenAmount, lockDays],
      }
  )

  const {data, isLoading, isSuccess, write: lockDmatic} = useContractWrite({
    lockConfig
  });

  // const {
  //   data,
  //   isSuccess,
  //   isLoading,
  //   write: withdrawToken
  // } = useContractWrite({
  //       mode: "recklesslyUnprepared",
  //       ...YIELD_ADDRESS,
  //       functionName: "withdrawLockedToken",
  //       args:[]
  //     }
  //
  // )

  // const { isLoading: lockDtokenLoading } = useWaitForTransaction(
  //     hash: lockDtoken?.hash,
  //     onSuccess()
  // )

  const handleLock = async () =>{
    try{
      setLoading(true)
      lockDmatic()
    }catch (e) {
      console.log(e)
    }finally {
      setTokenAmount(0)
    }
  }

  return (
    <div>
      <div className="max-w-[1300px] mx-auto text-white px-10 mt-10">
        <div className="flex gap-10 mb-10">
          <div className="bg-[#7e5bd6] px-8 pt-6 pb-10 w-1/3 rounded-md">
            <p className="text-2xl font-bold">Total LND Locked</p>
            <span className="text-[20px]">0</span>
          </div>
          <div className="bg-[#cb2b83] px-8  pt-6 pb-10 w-1/3 rounded-md">
            <p className="text-2xl font-bold">Total LND Minted</p>
            <span className="text-[20px]">0</span>
          </div>
          <div className="bg-[#33315c] px-8 pt-6 pb-10 w-1/3 rounded-md">
            <p className="text-2xl font-bold">Min LockTime</p>
            <span className="text-[20px]">0</span>
          </div>
        </div>
        <div className="mb-20 max-w-[600px] mx-auto px-10 py-10 bg-[#33315c] rounded-md">
          <h3 className="font-bold text-2xl mb-4 text-white]">USER DETAILS</h3>
          <div className="flex gap-5">
            <div className="bg-[#cb2b83] w-1/2 px-6 pt-3 pb-10">
              <p className="font-bold"> My Locked Matic</p>
              <span>0</span>
            </div>
            <div className="bg-[#7e5bd6] w-1/2 px-6 pt-3 pb-10">
              <p className="font-bold"> Remaining time to yield</p>
              <span>1hr</span>
            </div>

            {/* <div className="w-1/3 bg-[#33315c] px-10 pt-3 pb-10">
              <p> Remaining time to yield</p>
              <span>1hr</span>
            </div> */}
          </div>

          <div className="flex mx-auto">
            <div className="justify-center items-center flex">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-black">
                      Lock Dmatic Token
                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                    </button>
                  </div>
                  {isConnected ?
                      (<form className={styles.form}>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <input
                              className={styles.input}
                              placeholder="Amount"
                              value={tokenAmount}
                              onChange={(e) => setTokenAmount(e.target.value)}
                          />
                          <input
                              className={styles.input}
                              placeholder="No of Days"
                              value={lockDays}
                              onChange={(e) => setLockDays(e.target.value)}
                          />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => handleLock()}
                          >
                            Lock Token
                          </button>

                          <button
                              className="bg-amber-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => withdrawToken?.()}
                          >
                            Withdraw Token
                          </button>
                        </div>
                      </form>) : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
