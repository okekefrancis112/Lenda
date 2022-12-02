import styles from "../styles/Borrow.module.css";
import Select from "react-select";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from 'wagmi/connectors/injected'

const options = [
  { value: "0x9F6d70CDf08d893f0063742b51d3E9D1e18b7f74", label: "Azuki" },
  { value: "0xB677bfBc9B09a3469695f40477d05bc9BcB15F50", label: "BAYC " },
  { value: "0xE42f272EdF974e9c70a6d38dCb47CAB2A28CED3F", label: "CloneX " },
  { value: "0x13F38938A18ff26394c5ac8df94E349A97AaAb4e", label: "CoolCats" },
  {
    value: "0x5c13b249846540F81c093Bc342b5d963a7518145",
    label: "CryptoPunks ",
  },
  { value: "0x870bc8BfEe8A7Bbd63Dc1ef09F2fF37DeBCfEF35", label: "Cryptoadz " },
  { value: "0xEDA76D1C345AcA04c6910f5824EC337C8a8F36d2", label: "Doodles " },
  { value: "0xCbDcc8788019226d09FcCEb4C727C48A062D8124", label: "MAYC " },
  { value: "0x4b531A318B0e44B549F3b2f824721b3D0d51930A", label: "VeeFriends " },
];

export default function BorrowPage() {
  const [selectedOption, setSelectedOption] = useState(null);

  const {address, isConnected} = useAccount()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  console.log(selectedOption);

  return (
    <div>
      {isConnected ?
          <div className=" w-[450px] mx-auto bg-navyBlue px-4 py-3 pb-10 mt-10 mb-20 rounded-xl">
            <form className={styles.form}>
              <h2 className="py-2 text-white text-2xl font-bold mb-2">Lend</h2>
              <Select
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
              />
              <input type="text" className={styles.input} />
              <button className="bg-[#7d5bd6] w-full font-bold py-3 rounded-md text-[20px] ">
                LEND
              </button>
            </form>
          </div> :
          <button className="bg-[#7d5bd6] w-full font-bold py-3 rounded-md text-[20px]" onClick={() =>connect()}>Connect Wallet</button>
      }
    </div>
  );
}
