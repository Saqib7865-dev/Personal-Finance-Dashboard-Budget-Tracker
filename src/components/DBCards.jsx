const DBCards = () => {
  return (
    <div className="cardContainer grid grid-cols-4 gap-4 px-10 py-5">
      <div className="period bg-white rounded shadow py-5 px-5">
        <h2 className="text-2xl font-semibold mb-4">Selcted Year & Period</h2>
        <span className="px-3 py-1 border rounded-full font-serif mr-2">
          2022
        </span>
        <span className="px-3 py-1 border rounded-full font-serif">
          March
        </span>
      </div>
      <div className="period bg-white rounded shadow py-5 px-5">
        <h2 className="text-2xl font-semibold mb-4">Period Completed</h2>
        <div className="div w-full text-center">
          <span className="px-3 py-1 border-2 rounded bg-gray-400 text-white font-serif mr-2 mx-auto inline-block">
            100%
          </span>
        </div>
      </div>
      <div className="period bg-white rounded shadow py-5 px-5">
        <h2 className="text-2xl font-semibold mb-4">Period Tracking Balance</h2>
        <div className="div w-full text-end">
          <span className="px-1 py-1 rounded font-serif mr-2 mx-auto inline-block">
            100% of tracked income left to be allocated
          </span>
        </div>
      </div>
      <div className="period bg-white rounded shadow py-5 px-5">
        <h2 className="text-2xl font-semibold mb-4">Period Savings Rate</h2>
        <div className="div w-full text-end">
          <span className="px-1 py-1 rounded font-serif mr-2 mx-auto inline-block">
            You are saving 10% of your income
          </span>
        </div>
      </div>
    </div>
  );
};

export default DBCards;
