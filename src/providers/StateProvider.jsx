import { createContext, useContext, useEffect, useState } from "react";

const context = createContext();

const StateProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [FormTitle, setFormTitle] = useState("Income Form");
  const [userData, setUserData] = useState([
    {
      period: "Feb-2023",
      income: [
        { category: "Dummy Data", value: 50 },
        { category: "Dummy Data1", value: 40 },
      ],
      expenses: [{ category: "Dummy Data", value: 500 }],
      budget: {
        income: [{ category: "Dummy Data", value: 20 }],
        expenses: [{ category: "Dummy Data", value: 30 }],
      },
    },
    {
      period: "Aug-2025",
      income: [
        { category: "Salary", value: 35000 },
        { category: "Stocks", value: 120000 },
      ],
      expenses: [
        { category: "House Rent", value: 150000 },
        { category: "Cable Fee", value: 100 },
      ],
      budget: {
        income: [
          { category: "Salary", value: 35000 },
          { category: "Stocks", value: 150000 },
        ],
        expenses: [
          { category: "House Rent", value: 120000 },
          { category: "Cable Fee", value: 200 },
        ],
      },
    },
  ]);
  const [selectedPeriod, setSelectedPeriod] = useState({
    year: new Date().getFullYear(),
    month: new Date().toLocaleString("default", { month: "short" }),
  });

  useEffect(() => {
    let newUserData = userData.map((item) => {
      let totalIncome = item.income
        ? item.income.reduce((acc, sum) => acc + Number(sum.value), 0)
        : 0;
      let totalExpenses = item.expenses
        ? item.expenses.reduce((acc, sum) => acc + Number(sum.value), 0)
        : 0;
      let totalIncomeBudget = item.budget
        ? item.budget.income.reduce((acc, sum) => acc + Number(sum.value), 0)
        : 0;
      let totalExpensesBudget = item.budget
        ? item.budget.expenses.reduce((acc, sum) => acc + Number(sum.value), 0)
        : 0;
      let savings = totalIncome - totalExpenses;
      let expected_savings = item.totalIncomeBudget - item.totalExpensesBudget;
      return {
        ...item,
        totalIncome,
        totalExpenses,
        totalIncomeBudget,
        totalExpensesBudget,
        savings,
        expected_savings,
      };
    });
    setUserData(newUserData);
  }, [selectedPeriod]);
  return (
    <context.Provider
      value={{
        showForm,
        setShowForm,
        FormTitle,
        setFormTitle,
        userData,
        setUserData,
        selectedPeriod,
        setSelectedPeriod,
      }}
    >
      {children}
    </context.Provider>
  );
};

const useStateContext = () => useContext(context);

export { StateProvider, useStateContext };
