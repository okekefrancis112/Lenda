export default function Yield() {
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
            <button className="bg-white px-16 py-2 mx-auto text-[#000] mt-5">
              Lock MATIC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
