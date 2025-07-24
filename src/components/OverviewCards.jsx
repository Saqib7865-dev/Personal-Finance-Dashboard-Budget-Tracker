const OverviewCards = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-6 min-h-72 items-center px-10">
      <div className="balance-card w-full bg-red-500 p-10 rounded shadow-sm text-white">
        Balance Card
      </div>
      <div className="balance-card w-full bg-red-500 p-10 rounded shadow-sm text-white">
        Income Card
      </div>
      <div className="balance-card w-full bg-red-500 p-10 rounded shadow-sm text-white">
        Expenses Card
      </div>
      <div className="balance-card w-full bg-red-500 p-10 rounded shadow-sm text-white">
        Savings Card
      </div>
    </div>
  );
};

export default OverviewCards;
