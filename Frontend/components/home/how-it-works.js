import { VscDebugDisconnect } from "react-icons/vsc";
import { BsCheckCircle } from "react-icons/bs";
import { CgSelectO } from "react-icons/cg";

const HowItWorks = () => {
  return (
    <div className="mb-16">
      <h2 className="text-center mb-6 text-white text-3xl font-bold">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row justify-between text-white gap-10">
        <div className="text-center flex flex-col items-center">
          <VscDebugDisconnect color="white" fontSize={30} />
          <h3 className="text-2xl font-medium text-[21px] mt-2">Connect</h3>
          <p className="text-[#ccc] text-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim{" "}
          </p>
        </div>
        <div className="text-center flex flex-col items-center">
          <CgSelectO fontSize={30} />
          <h3 className="text-2xl font-medium text-[21px] mt-2">
            Check products
          </h3>
          <p className="text-[#ccc] text-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim{" "}
          </p>
        </div>
        <div className="text-center flex flex-col items-center">
          <BsCheckCircle fontSize={30} />
          <h3 className="text-2xl font-medium text-[21px] mt-2">Select item</h3>
          <p className="text-[#ccc] text-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
