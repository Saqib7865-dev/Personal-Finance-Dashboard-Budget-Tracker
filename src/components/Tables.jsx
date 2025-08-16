import { useStateContext } from "../providers/StateProvider";

const Tables = () => {
  const { selectedPeriod, userData } = useStateContext();
  let filteredData = userData.find((item) => {
    return item.period === selectedPeriod.month + "-" + selectedPeriod.year;
  });
  let complIncomePerc = [];
  let remainingIncome = [];
  let excessIncome = [];
  let complExpensePerc = [];
  let remainingExpenses = [];
  let excessExpenses = [];
  return (
    <div className="tables pt-6">
      <div className="head bg-blue-950 text-white font-semibold px-10 py-2 text-lg text-center">
        <p>
          Breakdown - {selectedPeriod.month} {selectedPeriod.year}
        </p>
      </div>
      <div className="px-5 sm:px-10 py-5 w-full">
        <div className="incomeTable overflow-x-auto max-w-full">
          <table className="w-full">
            <thead className="bg-green-500">
              <tr className="text-white whitespace-nowrap">
                <th className="rounded-l p-2 text-center tracking-wide">
                  Income
                </th>
                <th className="p-2 text-center">Tracked</th>
                <th className="p-2 text-center">Budget</th>
                <th className="p-2 text-center">% Compl.</th>
                <th className="p-2 text-center">remaining</th>
                <th className="rounded-r p-2 text-center">excess</th>
              </tr>
            </thead>
            <tbody className="w-screen text-center whitespace-nowrap">
              {filteredData?.income?.map((item, idx) => {
                let BudgetValue = "Not Defined";
                let IncomeInBudget = filteredData?.budget.income.find(
                  (obj) => obj.category === item.category
                );
                if (IncomeInBudget) {
                  BudgetValue = IncomeInBudget.value;
                  if (BudgetValue > item.value) {
                    remainingIncome.push(BudgetValue - item.value);
                    excessIncome.push(0);
                  } else if (BudgetValue === item.value) {
                    remainingIncome.push(0);
                    excessIncome.push(0);
                  } else if (BudgetValue < item.value) {
                    remainingIncome.push(0);
                    excessIncome.push(item.value - BudgetValue);
                  }
                  complIncomePerc.push(
                    Math.round((item.value / BudgetValue) * 100)
                  );
                }
                return (
                  <tr key={idx}>
                    <td className="py-2">{item.category}</td>
                    <td className="py-2">
                      {item.value.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2">
                      {BudgetValue === "Not defined"
                        ? BudgetValue
                        : BudgetValue.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2 bg-green-300">
                      {complIncomePerc[idx]
                        ? complIncomePerc[idx].toLocaleString("en-IN") + "%"
                        : "0%"}
                    </td>
                    <td className="py-2">
                      {remainingIncome?.[idx]?.toLocaleString("en-IN") ?? 0}
                    </td>
                    <td className="py-2">
                      {excessIncome[idx]?.toLocaleString("en-IN") ?? 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="text-center border-t whitespace-nowrap">
              <tr>
                <td className="py-2 font-bold whitespace-nowrap">
                  Total Income
                </td>
                <td className="py-2 font-bold whitespace-nowrap">
                  {filteredData?.income
                    .reduce((acc, sum) => acc + sum.value, 0)
                    ?.toLocaleString("en-IN")}
                </td>
                <td className="py-2 font-bold whitespace-nowrap">
                  {filteredData?.budget.income
                    .reduce((acc, sum) => acc + sum.value, 0)
                    .toLocaleString("en-IN")}
                </td>
                <td className="py-2 font-bold whitespace-nowrap">
                  {complIncomePerc.reduce((acc, sum) => acc + sum, 0) /
                  complIncomePerc.length
                    ? `${(
                        complIncomePerc.reduce((acc, sum) => acc + sum, 0) /
                        complIncomePerc.length
                      ).toLocaleString("en-IN")}%`
                    : `Could not compute`}
                </td>
                <td className="py-2 font-bold whitespace-nowrap">
                  {remainingIncome
                    .reduce((acc, sum) => acc + sum, 0)
                    .toLocaleString("en-IN")}
                </td>
                <td className="py-2 font-bold whitespace-nowrap">
                  {excessIncome.reduce((acc, sum) => acc + sum, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="px-5 sm:px-10 py-5 w-full">
        <div className="expenseTable w-full overflow-x-auto max-w-full">
          <table className="w-full">
            <thead className="w-screen bg-pink-500">
              <tr className="text-white">
                <th className="rounded-l p-2 text-center whitespace-nowrap">
                  Expenses
                </th>
                <th className="p-2 text-center whitespace-nowrap">Tracked</th>
                <th className="p-2 text-center whitespace-nowrap">Budget</th>
                <th className="p-2 text-center whitespace-nowrap">% Compl.</th>
                <th className="p-2 text-center whitespace-nowrap">remaining</th>
                <th className="rounded-r p-2 text-center whitespace-nowrap">
                  excess
                </th>
              </tr>
            </thead>
            <tbody className="w-screen text-center">
              {filteredData?.expenses?.map((item, idx) => {
                let BudgetValue = "Not Defined";
                let ExpenseInBudget = filteredData?.budget.expenses.find(
                  (obj) => obj.category === item.category
                );
                if (ExpenseInBudget) {
                  BudgetValue = ExpenseInBudget.value;
                  if (BudgetValue > item.value) {
                    remainingExpenses.push(ExpenseInBudget.value - item.value);
                    excessExpenses.push(0);
                  } else if (BudgetValue === item.value) {
                    remainingExpenses.push(0);
                    excessExpenses.push(0);
                  } else if (BudgetValue < item.value) {
                    remainingExpenses.push(0);
                    excessExpenses.push(item.value - ExpenseInBudget.value);
                  }
                  complExpensePerc.push(
                    Math.round((item.value / ExpenseInBudget.value) * 100)
                  );
                }
                return (
                  <tr key={idx}>
                    <td className="py-2 whitespace-nowrap">{item.category}</td>
                    <td className="py-2 whitespace-nowrap">
                      {item.value.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {BudgetValue === "Not defined"
                        ? BudgetValue
                        : BudgetValue.toLocaleString("en-IN")}
                    </td>
                    <td className="py-2 bg-pink-300 whitespace-nowrap">
                      {complExpensePerc[idx]
                        ? complExpensePerc[idx].toLocaleString("en-IN") + "%"
                        : "0%"}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {remainingExpenses[idx]?.toLocaleString("en-IN") ?? 0}
                    </td>
                    <td className="py-2 whitespace-nowrap">
                      {excessExpenses[idx]
                        ? excessExpenses[idx]?.toLocaleString("en-IN")
                        : 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="text-center border-t">
              <tr>
                <td className="py-2 whitespace-nowrap font-bold">
                  Total Expenses
                </td>
                <td className="py-2 whitespace-nowrap font-bold">
                  {filteredData?.expenses
                    ?.reduce((acc, sum) => acc + sum.value, 0)
                    .toLocaleString("en-IN")}
                </td>
                <td className="py-2 whitespace-nowrap font-bold">
                  {filteredData?.budget?.expenses
                    ?.reduce((acc, sum) => acc + sum.value, 0)
                    .toLocaleString("en-IN")}
                </td>
                <td className="py-2 whitespace-nowrap font-bold">
                  {complExpensePerc.reduce((acc, sum) => acc + sum, 0) /
                  complExpensePerc.length
                    ? `${(
                        complExpensePerc.reduce((acc, sum) => acc + sum, 0) /
                        complExpensePerc.length
                      ).toLocaleString("en-IN")}%`
                    : `Could not compute`}
                </td>
                <td className="py-2 whitespace-nowrap font-bold">
                  {remainingExpenses
                    .reduce((acc, sum) => acc + sum, 0)
                    ?.toLocaleString("en-IN")}
                </td>
                <td className="py-2 whitespace-nowrap font-bold">
                  {excessExpenses
                    .reduce((acc, sum) => acc + sum, 0)
                    ?.toLocaleString("en-IN")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {/* <div className="px-10 py-5 w-full">
        <div className="expenseTable w-full">
          <table className="w-full">
            <thead className="w-screen bg-blue-500">
              <tr className="text-white">
                <th className="rounded-l py-2 text-center">Savings</th>
                <th className="py-2 text-center">Tracked</th>
                <th className="py-2 text-center">Budget</th>
                <th className="py-2 text-center">% Compl.</th>
                <th className="py-2 text-center">remaining</th>
                <th className="rounded-r py-2 text-center">excess</th>
              </tr>
            </thead>
            <tbody className="w-screen text-center">
              {userData.budget?.income.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2">
                    {item.category.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2">{item.value.toLocaleString("en-IN")}</td>
                  <td className="py-2">-</td>
                  <td className="py-2 bg-blue-300">100%</td>
                  <td className="py-2">-</td>
                  <td className="py-2">-</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-center border-t">
              <tr>
                <td className="py-2 font-bold">Total Budget</td>
                <td className="py-2 font-bold">
                  {userData.totalIncomeBudget.toLocaleString("en-IN")}
                </td>
                <td className="py-2 font-bold">-</td>
                <td className="py-2 font-bold">100%</td>
                <td className="py-2 font-bold">-</td>
                <td className="py-2 font-bold">-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default Tables;
