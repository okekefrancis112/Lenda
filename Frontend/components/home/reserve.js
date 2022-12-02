const ReserveSection = () => {
  return (
    <div className="bg-navyBlue rounded-xl max-w-[800px] mx-auto px-10 py-8 text-white flex flex-col items-center mb-16 mt-20 gap-2">
      <h3 className="text-3xl font-bold">RESERVE</h3>
      <p className="text-[20px]">ASSET: MATIC</p>
      <p className="text-[20px]">
        Total Liquity in Reserve: <span>1 MATIC</span>
      </p>
      <p className="text-[20px]">
        Total Borrowed: <span>1 MATIC</span>
      </p>

      <div className="flex flex-col md:flex-row gap-5">
        <button className="bg-[#cb2d83] py-2 px-20 ">Deposit</button>
        <button className="bg-[#7e5bd6] py-2 px-20 ">Borrow</button>
      </div>
    </div>
  );
};

export default ReserveSection;
