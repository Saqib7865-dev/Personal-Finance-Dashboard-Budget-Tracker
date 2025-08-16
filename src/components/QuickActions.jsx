import { useEffect, useState } from "react";
import { useStateContext } from "../providers/StateProvider";

const QuickActions = () => {
  const {
    setShowForm,
    setFormTitle,
    setSelectedPeriod,
    setUserData,
    userData,
    selectedPeriod,
  } = useStateContext();
  const [isNewEnabled, setIsNewEnabled] = useState(null);
  useEffect(() => {
    let isDataAvailable = userData.findIndex(
      (item) => item.period === `${selectedPeriod.month}-${selectedPeriod.year}`
    );
    if (isDataAvailable === -1) setIsNewEnabled(true);
    else setIsNewEnabled(false);
  }, [userData, selectedPeriod]);
  return (
    <div className="w-full px-5 sm:px-10 grid sm:grid-cols-4 gap-2 sm:gap-6">
      <button
        disabled={isNewEnabled}
        className={`${
          isNewEnabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } bg-green-500 text-white font-semibold uppercase rounded shadow py-4 whitespace-nowrap`}
        onClick={() => {
          setShowForm(true);
          setFormTitle("Income Form");
        }}
      >
        Add Income
      </button>
      <button
        disabled={isNewEnabled}
        className={`${
          isNewEnabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } bg-pink-500 text-white rounded shadow py-4 font-semibold uppercase whitespace-nowrap`}
        onClick={() => {
          setShowForm(true);
          setFormTitle("Expenses Form");
        }}
      >
        Add Expense
      </button>
      <button
        disabled={isNewEnabled}
        className={`${
          isNewEnabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } bg-blue-500 text-white rounded shadow py-4 font-semibold uppercase whitespace-nowrap`}
        onClick={() => {
          setShowForm(true);
          setFormTitle("Budget Form");
        }}
      >
        Set Budget
      </button>
      <button
        className={`${
          isNewEnabled ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
        } bg-yellow-500 text-white rounded shadow py-4 font-semibold uppercase`}
        disabled={!isNewEnabled}
        onClick={() => {
          if (!isNewEnabled) return;
          setUserData((prev) => {
            return [
              ...prev,
              {
                income: [{ category: "Dummy Data", value: 10 }],
                expenses: [{ category: "Dummy Data", value: 5 }],
                budget: {
                  income: [{ category: "Dummy Data", value: 2 }],
                  expenses: [{ category: "Dummy Data", value: 3 }],
                },
                totalIncome: 0,
                totalExpenses: 0,
                totalIncomeBudget: 0,
                totalExpensesBudget: 0,
                savings: 0,
                expected_savings: 0,
                period: `${selectedPeriod.month}-${selectedPeriod.year}`,
              },
            ];
          });
          alert(
            "New Data Added!\nKindly enter income, expenses and set budget to continue"
          );
        }}
      >
        Add New
      </button>
    </div>
  );
};

export default QuickActions;
