import { useStateContext } from "../providers/StateProvider";

const DBCards = () => {
  const { userData, selectedPeriod } = useStateContext();
  let now = new Date();
  let numberOfDaysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
  let savingsRate = (userData.savings / userData.totalIncome) * 100;
  return (
    <div className="cardContainer grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:px-10 px-5 py-5">
      <div className="period bg-white rounded shadow py-5 px-5">
        <h2 className="text-2xl font-semibold mb-4">Selected Year & Period</h2>
        <span className="px-3 py-1 border rounded-full mr-2">
          {selectedPeriod.month}
        </span>
        <span className="px-3 py-1 border rounded-full">
          {selectedPeriod.year}
        </span>
      </div>
      <div className="period bg-white rounded shadow py-5 px-5">
        <h2 className="text-2xl font-semibold mb-4">Period Completed</h2>
        <div className="div w-full text-center">
          <span className="px-3 py-1 border-2 rounded bg-gray-400 text-white mr-2 mx-auto inline-block">
            {Math.round((now.getDate() / numberOfDaysInMonth) * 100)}%
          </span>
        </div>
      </div>
      <div className="period bg-white rounded shadow py-5 px-5">
        <h2 className="text-2xl font-semibold mb-4">
          <span className="inline-block">Expected Period Savings </span>{" "}
          <span className="text-lg inline-block">(Acc. to budget)</span>
        </h2>
        <div className="div w-full text-end">
          <span className="px-1 py-1 rounded mr-2 mx-auto inline-block tracking-wider">
            {userData.expected_savings < 0
              ? `You are expected to borrow ${Math.abs(
                  userData.expected_savings ?? 0
                )}/-`
              : `You are expected to save ${
                  userData.expected_savings?.toLocaleString("en-IN") ?? 0
                }/-`}
          </span>
        </div>
      </div>
      <div className="period bg-white rounded shadow py-5 px-5">
        <h2 className="text-2xl font-semibold mb-4">Period Savings Rate</h2>
        <div className="div w-full text-end">
          <span className="px-1 py-1 rounded mr-2 mx-auto inline-block tracking-wider">
            {savingsRate < 0
              ? `You are spending ${Math.abs(
                  savingsRate ?? 0
                )}% more than your income`
              : `You are saving ${
                  savingsRate ? savingsRate : 0
                }% of your income`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DBCards;
