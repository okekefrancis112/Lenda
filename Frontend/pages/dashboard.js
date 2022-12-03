import { MdPayments } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";

export default function Dashboard() {
  return (
    <div className="min-h-[70vh]">
      <div className="max-w-[800px] mx-auto mt-12">
        <h1 className="text-white text-2xl font-bold mb-5">Dashboard</h1>
        <div className="flex gap-5 text-white">
          <div className="w-1/2 bg-navyBlue p-5 rounded-md">
            <div className="flex gap-4">
              <GiMoneyStack color="white" fontSize={25} />
              <span className="font-bold">My Deposits</span>
            </div>
            <div>
              <p>
                Total Balance: <span>100 MATIC</span>
              </p>
            </div>
            <div className="flex gap-5 mt-8">
              <button className="w-1/2 bg-green px-3 py-2">Deposit</button>
              <button className="w-1/2 bg-purple px-3 py-2">Withdraw</button>
            </div>
          </div>
          <div className="w-1/2 bg-navyBlue p-5 rounded-md">
            <div className="flex gap-4">
              <MdPayments color="white" fontSize={25} />
              <span className="font-bold">My Borrows</span>
            </div>
            <div>
              <p>
                Total Debt: <span>100 MATIC</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
