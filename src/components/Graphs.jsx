import { Chart } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { useStateContext } from "../providers/StateProvider";
import { useEffect, useState } from "react";
const Graphs = () => {
  const { userData } = useStateContext();
  const [userPrices, setUserPrices] = useState({
    minIncome: 0,
    maxIncome: 0,
    minExpenses: 0,
    maxExpenses: 0,
    minBudget: 0,
    maxBudget: 0,
  });

  useEffect(() => {
    const minIncome = Math.min(
      ...(userData?.income?.map((item) => item.value) || [0])
    );
    const maxIncome = Math.max(
      ...(userData?.income?.map((item) => item.value) || [0])
    );
    const minExpenses = Math.min(
      ...(userData?.expenses?.map((item) => item.value) || [0])
    );
    const maxExpenses = Math.max(
      ...(userData?.expenses?.map((item) => item.value) || [0])
    );
    const minBudget = Math.min(
      ...(userData?.budget?.map((item) => item.value) || [0])
    );
    const maxBudget = Math.max(
      ...(userData?.budget?.map((item) => item.value) || [0])
    );
    setUserPrices({
      minIncome,
      maxIncome,
      minExpenses,
      maxExpenses,
      minBudget,
      maxBudget,
    });
  }, [userData]);
  const getColorShades = (value, hue, min, max) => {
    const intensity = (value - min) / (max - min || 1);
    const lightness = 90 - intensity * 40;
    return `hsl(${hue},80%,${lightness}%)`;
  };

  const IncomeChartData = {
    labels: userData.income ? userData.income.map((item) => item.category) : [],
    datasets: [
      {
        data: userData.income ? userData.income.map((item) => item.value) : [],
        backgroundColor: userData?.income?.map((item) =>
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
    labels: userData.expenses
      ? userData.expenses.map((item) => item.category)
      : [],
    datasets: [
      {
        data: userData.expenses
          ? userData.expenses.map((item) => item.value)
          : [],
        backgroundColor: userData?.expenses?.map((item) =>
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
  const SavingsChartData = {
    labels: userData.budget ? userData.budget.map((item) => item.category) : [],
    datasets: [
      {
        data: userData.budget ? userData.budget.map((item) => item.value) : [],
        backgroundColor: userData?.budget?.map((v) =>
          getColorShades(
            v.value,
            220,
            userPrices.minBudget,
            userPrices.maxBudget
          )
        ),
        borderWidth: 0,
      },
    ],
  };
  let totalIncome =
    (userData.income &&
      userData.income.reduce((acc, sum) => +acc + +sum.value, 0)) ||
    0;
  let totalExpenses =
    (userData.expenses &&
      userData.expenses.reduce((acc, sum) => +acc + +sum.value, 0)) ||
    0;
  let totalBudget =
    (userData.budget &&
      userData.budget.reduce((acc, sum) => +acc + +sum.value, 0)) ||
    0;
  return (
    <div className="charts pt-6">
      <div className="head bg-blue-950 text-white font-semibold px-10 py-2 text-lg text-center">
        <p>Summary - March 2022</p>
      </div>
      <div className="chartsContainer grid grid-cols-1 lg:grid-cols-2 gap-4 px-10 pt-5">
        <div className="chart1 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden flex flex-col">
          <h4 className="font-bold text-2xl font-mono">
            <span className="text-green-500">Income</span> Categories (Tracked)
          </h4>
          <div className="bottom charts flex items-center justify-around h-full">
            <div className="left">
              <div className="PiechartContainer pt-5 w-64 h-full flex items-center">
                <Doughnut
                  data={{
                    labels: IncomeChartData?.labels,
                    datasets: [
                      {
                        label: IncomeChartData.labels,
                        data: IncomeChartData.datasets?.[0]?.data,
                        backgroundColor: userData?.income?.map((item) =>
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
                Total Income: {(+totalIncome)?.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>
        <div className="chart2 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden relative">
          <div className="left h-full">
            <h4 className="font-bold text-2xl font-mono">
              Tracked (vs. Budget)
            </h4>
            <div className="w-full flex items-end justify-end px-10">
              <ul className="checklist grid grid-cols-2 gap-4 bg-white border border-slate-200 p-2">
                <li className="text-sm font-semibold">✅ Budget</li>
                <li className="text-sm font-semibold">✅ Income</li>
                <li className="text-sm font-semibold">✅ Expenses</li>
                <li className="text-sm font-semibold">✅ Savings</li>
              </ul>
            </div>
            <div className="PiechartContainer pt-5 w-full h-full">
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
                      label: "Salary",
                      data: [0, 0, 0, 0, 0, 0, 6500, 0, 0, 0, 0, 0],
                      backgroundColor: "#10B981",
                    },
                    {
                      label: "Bonus",
                      data: [0, 0, 0, 0, 0, 0, 2500, 0, 0, 0, 0, 0],
                      backgroundColor: "#E75480",
                    },
                    {
                      label: "Stocks",
                      data: [0, 0, 0, 0, 0, 0, 1200, 0, 0, 0, 0, 0],
                      backgroundColor: "#00008B",
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
          <div className="bottom charts flex items-center justify-around h-full">
            <div className="left">
              <div className="PiechartContainer pt-5 w-64 h-full flex items-center">
                <Doughnut
                  data={{
                    labels: ExpenseChartData?.labels,
                    datasets: [
                      {
                        label: "Revenue",
                        data: ExpenseChartData.datasets?.[0]?.data
                          ? ExpenseChartData.datasets?.[0]?.data
                          : [0],
                        backgroundColor: userData?.expenses?.map((item) =>
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
                Total Expenses: {(+totalExpenses)?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="chart4 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden flex flex-col">
          <h4 className="font-bold text-2xl font-mono">
            <span className="text-blue-500">Budget</span> Categories (Tracked)
          </h4>
          <div className="bottom charts flex items-center justify-around h-full">
            <div className="left">
              <div className="PiechartContainer pt-5 w-64 h-full flex items-center">
                <Doughnut
                  data={{
                    labels: SavingsChartData.labels,
                    datasets: [
                      {
                        label: "Revenue",
                        data: SavingsChartData.datasets?.[0]?.data
                          ? SavingsChartData.datasets?.[0]?.data
                          : [0],
                        backgroundColor: userData?.budget?.map((v) =>
                          getColorShades(
                            v.value,
                            220,
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
            </div>
            <div className="right">
              <ul className="mb-4 space-y-2">
                {SavingsChartData.labels.map((label, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded"
                        style={{
                          backgroundColor:
                            SavingsChartData.datasets[0].backgroundColor[i],
                        }}
                      ></span>
                      {label}
                    </div>
                    <span>
                      {SavingsChartData.datasets[0].data[i]?.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-2 text-right font-semibold text-sm">
                Total Budget: {(+totalBudget)?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
