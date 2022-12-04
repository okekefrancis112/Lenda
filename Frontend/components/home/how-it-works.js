import { VscDebugDisconnect } from "react-icons/vsc";
import { BsCheckCircle } from "react-icons/bs";
import { CgSelectO } from "react-icons/cg";

const HowItWorks = () => {
  return (
    <div className="mb-16">
      <h2 className="text-center mb-6 text-white text-3xl font-bold">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center text-white gap-10">
        <div className="w-full md:w-1/3 text-center flex flex-col items-center px-0 md:px-5">
          <VscDebugDisconnect color="white" fontSize={30} />
          <h3 className="text-2xl font-medium text-[21px] mt-2">Connect</h3>
          <p className="text-[#ccc] text-[15px]">
            Connect wallet and explore untapped capabilities of your NFTs.
          </p>
        </div>
        <div className="w-full md:w-1/3 text-center flex flex-col items-center px-0 md:px-5">
          <CgSelectO fontSize={30} />
          <h3 className="text-2xl font-medium text-[21px] mt-2">Deposit</h3>
          <p className="text-[#ccc] text-[15px]">
            Earn 9% ROI when you deposit on the platform. Grow your funds with
            us
          </p>
        </div>
        <div className="w-full md:w-1/3 text-center flex flex-col items-center px-0 md:px-5">
          <BsCheckCircle fontSize={30} />
          <h3 className="text-2xl font-medium text-[21px] mt-2">Loan</h3>
          <p className="text-[#ccc] text-[15px]">
            Selected NFTs are available as collateral. Use your NFT as
            collateral and get specifiedd loam amount.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
