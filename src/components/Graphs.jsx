import { Chart } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { useStateContext } from "../providers/StateProvider";
import { useEffect, useState } from "react";
const Graphs = () => {
  const { selectedPeriod, userData } = useStateContext();
  const [userPrices, setUserPrices] = useState({
    minIncome: 0,
    maxIncome: 0,
    minExpenses: 0,
    maxExpenses: 0,
    minBudget: 0,
    maxBudget: 0,
  });
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    // First, filter the data
    let filDataLoc = userData.find((item) => {
      return item.period === selectedPeriod.month + "-" + selectedPeriod.year;
    });
    setFilteredData(filDataLoc || {});

    // Then calculate min/max from the filtered data
    if (filDataLoc) {
      const minIncome = Math.min(
        ...(filDataLoc?.income?.map((item) => item.value) || [0])
      );
      const maxIncome = Math.max(
        ...(filDataLoc?.income?.map((item) => item.value) || [0])
      );
      const minExpenses = Math.min(
        ...(filDataLoc?.expenses?.map((item) => item.value) || [0])
      );
      const maxExpenses = Math.max(
        ...(filDataLoc?.expenses?.map((item) => item.value) || [0])
      );
      const minBudget = Math.min(
        ...(filDataLoc?.budget?.income?.map((item) => item.value) || [0]),
        ...(filDataLoc?.budget?.expenses?.map((item) => item.value) || [0])
      );
      const maxBudget = Math.max(
        ...(filDataLoc?.budget?.income?.map((item) => item.value) || [0]),
        ...(filDataLoc?.budget?.expenses?.map((item) => item.value) || [0])
      );

      setUserPrices({
        minIncome,
        maxIncome,
        minExpenses,
        maxExpenses,
        minBudget,
        maxBudget,
      });
    }
  }, [userData, selectedPeriod]);

  const getColorShades = (value, hue, min, max) => {
    const intensity = (value - min) / (max - min || 1);
    const lightness = 90 - intensity * 40;
    return `hsl(${hue},80%,${lightness}%)`;
  };

  const IncomeChartData = {
    labels: filteredData?.income
      ? filteredData.income.map((item) => item.category)
      : [],
    datasets: [
      {
        data: filteredData?.income
          ? filteredData.income.map((item) => item.value)
          : [],
        backgroundColor: filteredData?.income?.map((item) =>
          getColorShades(
            item.value,
            158,
            userPrices.minIncome,
            userPrices.maxIncome
          )
        ),
        borderWidth: 0,
      },
    ],
  };
  const ExpenseChartData = {
    labels: filteredData?.expenses
      ? filteredData.expenses.map((item) => item.category)
      : [],
    datasets: [
      {
        data: filteredData?.expenses
          ? filteredData.expenses.map((item) => item.value)
          : [],
        backgroundColor: filteredData?.expenses?.map((item) =>
          getColorShades(
            item.value,
            350,
            userPrices.minExpenses,
            userPrices.maxExpenses
          )
        ),
        borderWidth: 0,
      },
    ],
  };
  const SavingsIncomeChartData = {
    labels: filteredData?.budget
      ? filteredData.budget.income.map((item) => item.category)
      : [],
    datasets: [
      {
        data: filteredData?.budget
          ? filteredData.budget.income.map((item) => item.value)
          : [],
        backgroundColor: filteredData?.budget?.income.map((v) =>
          getColorShades(
            v.value,
            120,
            userPrices.minBudget,
            userPrices.maxBudget
          )
        ),
        borderWidth: 0,
      },
    ],
  };
  const SavingsExpensesChartData = {
    labels: filteredData?.budget
      ? filteredData.budget.expenses.map((item) => item.category)
      : [],
    datasets: [
      {
        data: filteredData?.budget
          ? filteredData.budget.expenses.map((item) => item.value)
          : [],
        backgroundColor: filteredData?.budget?.expenses.map((v) =>
          getColorShades(
            v.value,
            350,
            userPrices.minBudget,
            userPrices.maxBudget
          )
        ),
        borderWidth: 0,
      },
    ],
  };
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let formattedMonth = months.indexOf(selectedPeriod.month);
  // Budget Data
  let budgetIncomeData = [];
  budgetIncomeData.length = 12;
  budgetIncomeData[formattedMonth] = Math.abs(
    filteredData?.budget?.income?.reduce((acc, sum) => acc + sum.value, 0)
  );
  let budgetExpensesData = [];
  budgetExpensesData.length = 12;
  budgetExpensesData[formattedMonth] = Math.abs(
    filteredData?.budget?.expenses?.reduce((acc, sum) => acc + sum.value, 0)
  );
  // Actual Data
  let actualIncomeData = [];
  actualIncomeData.length = 12;
  actualIncomeData[formattedMonth] = Math.abs(
    filteredData?.income?.reduce((acc, sum) => acc + sum.value, 0)
  );
  let actualExpensesData = [];
  actualExpensesData.length = 12;
  actualExpensesData[formattedMonth] = Math.abs(
    filteredData?.expenses?.reduce((acc, sum) => acc + sum.value, 0)
  );

  let trackedData = [];
  trackedData.length = 12;
  trackedData[formattedMonth] = Math.abs(filteredData?.savings);

  return (
    <div className="charts pt-4 sm:pt-6">
      <div className="head bg-blue-950 text-white font-semibold px-10 py-2 text-lg text-center">
        <p>
          Summary - {selectedPeriod.month} {selectedPeriod.year}
        </p>
      </div>
      <div className="chartsContainer grid grid-cols-1 md:grid-cols-2 gap-4 px-5 sm:px-10 pt-5">
        <div className="chart1 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden flex flex-col">
          <h4 className="font-bold text-2xl font-mono">
            <span className="text-green-500">Income</span> Categories (Tracked)
          </h4>
          <div className="bottom charts flex flex-col lg:flex-row gap-y-7 lg:gap-y-0 items-center justify-around h-full py-4">
            <div className="left">
              <div className="chartContainer pt-5 sm:w-64 h-full flex items-center">
                <Doughnut
                  data={{
                    labels: IncomeChartData?.labels,
                    datasets: [
                      {
                        label: IncomeChartData.labels,
                        data: IncomeChartData.datasets?.[0]?.data,
                        backgroundColor: filteredData?.income?.map((item) =>
                          getColorShades(
                            item.value,
                            158,
                            userPrices.minIncome,
                            userPrices.maxIncome
                          )
                        ),
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    cutout: "75%",
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: true,
                      },
                    },
                  }}
                ></Doughnut>
              </div>
            </div>
            <div className="right">
              <ul className="mb-4 space-y-2">
                {IncomeChartData.labels.map((label, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded"
                        style={{
                          backgroundColor:
                            IncomeChartData.datasets[0].backgroundColor[i],
                        }}
                      ></span>
                      {label}
                    </div>
                    <span>
                      {IncomeChartData.datasets[0].data[i]?.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-2 text-right font-semibold text-sm">
                Total Income:{" "}
                {filteredData?.income
                  ?.reduce((acc, sum) => acc + sum.value, 0)
                  .toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>
        <div className="chart2 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden relative flex flex-col">
          <div className="left h-full">
            <h4 className="font-bold text-2xl font-mono">
              Tracked (vs. Budget)
            </h4>
            <div className="w-full flex items-end justify-end lg:px-10 py-6">
              <ul className="checklist grid grid-cols-2 gap-4 bg-white border border-slate-200 p-2">
                <li className="text-sm font-semibold">✅ Budget</li>
                <li className="text-sm font-semibold">✅ Income</li>
                <li className="text-sm font-semibold">✅ Expenses</li>
                <li className="text-sm font-semibold">✅ Savings</li>
              </ul>
            </div>
            <div className="pt-5 w-full h-full py-6">
              <Bar
                data={{
                  labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  datasets: [
                    {
                      label: "Budget Income",
                      data: budgetIncomeData,
                      backgroundColor: "#2b7fff",
                    },
                    {
                      label: "Actual Income",
                      data: actualIncomeData,
                      backgroundColor: "#90EE90",
                    },
                    {
                      label: "Budget Expenses",
                      data: budgetExpensesData,
                      backgroundColor: "#2b7fff",
                    },
                    {
                      label: "Actual Expenses",
                      data: actualExpensesData,
                      backgroundColor:
                        Math.abs(filteredData.totalExpensesBudget) >
                        Math.abs(filteredData.totalExpenses)
                          ? "#10B981"
                          : "#ff0000",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: {
                      display: true,
                      text: "Monthly Revenue Breakdown",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="chart3 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden flex flex-col">
          <h4 className="font-bold text-2xl font-mono">
            <span className="text-pink-500">Expense</span> Categories (Tracked)
          </h4>
          <div className="bottom charts flex flex-col lg:flex-row gap-y-7 lg:gap-y-0 items-center justify-around h-full py-4">
            <div className="left">
              <div className="PiechartContainer pt-5 w-64 h-full flex items-center">
                <Doughnut
                  data={{
                    labels: ExpenseChartData?.labels,
                    datasets: [
                      {
                        label: ExpenseChartData.labels,
                        data: ExpenseChartData.datasets?.[0]?.data
                          ? ExpenseChartData.datasets?.[0]?.data
                          : [0],
                        backgroundColor: filteredData?.expenses?.map((item) =>
                          getColorShades(
                            item.value,
                            350,
                            userPrices.minExpenses,
                            userPrices.maxExpenses
                          )
                        ),
                      },
                    ],
                  }}
                  options={{
                    cutout: "75%",
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: true,
                      },
                    },
                  }}
                ></Doughnut>
              </div>
            </div>
            <div className="right">
              <ul className="mb-4 space-y-2">
                {ExpenseChartData.labels.map((label, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded"
                        style={{
                          backgroundColor:
                            ExpenseChartData.datasets[0].backgroundColor[i],
                        }}
                      ></span>
                      {label}
                    </div>
                    <span>
                      {ExpenseChartData.datasets[0].data[i]?.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-2 text-right font-semibold text-sm">
                Total Expenses:{" "}
                {(+filteredData?.expenses?.reduce(
                  (acc, sum) => acc + sum.value,
                  0
                ))?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="chart4 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden flex flex-col">
          <h4 className="font-bold text-2xl font-mono">
            <span className="text-blue-500">Budget</span> Categories (Tracked)
          </h4>
          <div className="bottom charts flex flex-col gap-y-7 lg:gap-y-7 items-center justify-around h-full py-4">
            <div className="left flex xl:flex-row flex-col gap-4">
              <div className="PiechartContainer pt-5 h-full flex items-center">
                <Doughnut
                  data={{
                    labels: SavingsIncomeChartData.labels,
                    datasets: [
                      {
                        label: SavingsIncomeChartData.labels,
                        data: SavingsIncomeChartData.datasets?.[0]?.data
                          ? SavingsIncomeChartData.datasets?.[0]?.data
                          : [0],
                        backgroundColor: filteredData?.budget?.income.map((v) =>
                          getColorShades(
                            v.value,
                            120,
                            userPrices.minBudget,
                            userPrices.maxBudget
                          )
                        ),
                      },
                    ],
                  }}
                  options={{
                    cutout: "75%",
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: true,
                      },
                    },
                  }}
                ></Doughnut>
              </div>
              <div className="PiechartContainer pt-5 h-full flex items-center">
                <Doughnut
                  data={{
                    labels: SavingsExpensesChartData.labels,
                    datasets: [
                      {
                        label: SavingsExpensesChartData.labels,
                        data: SavingsExpensesChartData.datasets?.[0]?.data
                          ? SavingsExpensesChartData.datasets?.[0]?.data
                          : [0],
                        backgroundColor: filteredData?.budget?.expenses.map(
                          (v) =>
                            getColorShades(
                              v.value,
                              350,
                              userPrices.minBudget,
                              userPrices.maxBudget
                            )
                        ),
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    cutout: "75%",
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: true,
                      },
                    },
                  }}
                ></Doughnut>
              </div>
            </div>
            <div className="w-full right flex lg:flex-row gap-y-8 flex-col gap-x-12 px-10">
              <div className="income w-full">
                <h4 className="text-lg font-mono text-green-500 mb-4 font-semibold">
                  Income Budget
                </h4>
                <ul className="mb-4 space-y-2">
                  {SavingsIncomeChartData.labels.map((label, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded"
                          style={{
                            backgroundColor:
                              SavingsIncomeChartData.datasets[0]
                                .backgroundColor[i],
                          }}
                        ></span>
                        {label}
                      </div>
                      <span>
                        {SavingsIncomeChartData.datasets[0].data[
                          i
                        ]?.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-2 text-right font-semibold text-sm">
                  Total Income Budget:{" "}
                  {(+filteredData.budget?.income?.reduce(
                    (acc, sum) => acc + sum.value,
                    0
                  ))?.toLocaleString()}
                </div>
              </div>
              <div className="expenses w-full">
                <h4 className="text-lg font-mono text-pink-500 mb-4 font-semibold">
                  Expenses Budget
                </h4>

                <ul className="mb-4 space-y-2">
                  {SavingsExpensesChartData.labels.map((label, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded"
                          style={{
                            backgroundColor:
                              SavingsExpensesChartData.datasets[0]
                                .backgroundColor[i],
                          }}
                        ></span>
                        {label}
                      </div>
                      <span>
                        {SavingsExpensesChartData.datasets[0].data[
                          i
                        ]?.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-2 text-right font-semibold text-sm">
                  Total Expenses Budget:{" "}
                  {(+filteredData.budget?.expenses?.reduce(
                    (acc, sum) => acc + sum.value,
                    0
                  ))?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
