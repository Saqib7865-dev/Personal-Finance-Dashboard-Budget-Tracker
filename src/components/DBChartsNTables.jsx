import { Chart } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
const DBChartsNTables = () => {
  const values = [4500, 1200, 50, 10, 200];

  const max = Math.max(...values);
  const min = Math.min(...values);
  const getGreenShades = (value, hue) => {
    const intensity = (value - min) / (max - min || 1);
    const lightness = 90 - intensity * 40;
    return `hsl(${hue},80%,${lightness}%)`;
  };
  const IncomeChartData = {
    labels: [
      "Employment (Net)",
      "Side Hustle (Net)",
      "Dividends",
      "Freelancing",
      "Rental Income",
    ],
    datasets: [
      {
        data: values,
        backgroundColor: values.map((v) => getGreenShades(v, 158)),
        borderWidth: 0,
      },
    ],
  };
  const ExpenseChartData = {
    labels: [
      "Funs & Vacation",
      "Housing",
      "Utilities",
      "Groceries",
      "Transportation",
      "Others",
    ],
    datasets: [
      {
        data: values,
        backgroundColor: values.map((v) => getGreenShades(v, 350)),
        borderWidth: 0,
      },
    ],
  };
  const SavingsChartData = {
    labels: [
      "Funs & Vacation",
      "Housing",
      "Utilities",
      "Groceries",
      "Transportation",
      "Others",
    ],
    datasets: [
      {
        data: values,
        backgroundColor: values.map((v) => getGreenShades(v, 220)),
        borderWidth: 0,
      },
    ],
  };
  let total = values.reduce((acc, sum) => acc + sum, 0);
  return (
    <>
      {/* Filters */}
      <div className="filters w-full flex items-center justify-end gap-x-2 pt-10 px-10">
        <select
          name="year"
          id="Year"
          className="border-none bg-white p-1 px-2 text-sm outline-none min-w-32 rounded shadow"
        >
          <option value="2022" selected disabled>
            2022
          </option>
        </select>
        <select
          name="Month"
          id="Month"
          className="border-none bg-white p-1 px-2 text-sm outline-none min-w-32 rounded shadow"
        >
          <option value="mnth" selected disabled>
            Select Month
          </option>
        </select>
      </div>
      {/* Charts */}
      <div className="charts pt-6">
        <div className="head bg-blue-950 text-white font-semibold px-10 py-2 text-lg text-center">
          <p>Summary - March 2022</p>
        </div>
        <div className="chartsContainer grid grid-cols-1 lg:grid-cols-2 gap-4 px-10 pt-5">
          <div className="chart1 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden flex flex-col">
            <h4 className="font-bold text-2xl font-mono">
              <span className="text-green-500">Income</span> Categories
              (Tracked)
            </h4>
            <div className="bottom charts flex items-center justify-around h-full">
              <div className="left">
                <div className="PiechartContainer pt-5 w-64 h-full flex items-center">
                  <Doughnut
                    data={{
                      labels: ["Salary", "Stocks"],
                      datasets: [
                        {
                          label: "Revenue",
                          data: [30, 10],
                          backgroundColor: ["#10B981", "#D1FAE5"],
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
                          enabled: false,
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
                        {IncomeChartData.datasets[0].data[i].toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-2 text-right font-semibold text-sm">
                  Total: {total.toLocaleString()}
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
              <span className="text-pink-500">Expense</span> Categories
              (Tracked)
            </h4>
            <div className="bottom charts flex items-center justify-around h-full">
              <div className="left">
                <div className="PiechartContainer pt-5 w-64 h-full flex items-center">
                  <Doughnut
                    data={{
                      labels: ["Salary", "Stocks"],
                      datasets: [
                        {
                          label: "Revenue",
                          data: [30, 10],
                          backgroundColor: ["#E75480", "#FFB6C1"],
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
                          enabled: false,
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
                  Total: {total.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div className="chart4 w-full bg-white shadow rounded p-3 min-h-28 overflow-hidden flex flex-col">
            <h4 className="font-bold text-2xl font-mono">
              <span className="text-blue-500">Expense</span> Categories
              (Tracked)
            </h4>
            <div className="bottom charts flex items-center justify-around h-full">
              <div className="left">
                <div className="PiechartContainer pt-5 w-64 h-full flex items-center">
                  <Doughnut
                    data={{
                      labels: ["Salary", "Stocks"],
                      datasets: [
                        {
                          label: "Revenue",
                          data: [30, 10],
                          backgroundColor: ["#00008B", "#add8e6"],
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
                          enabled: false,
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
                  Total: {total.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DBChartsNTables;
