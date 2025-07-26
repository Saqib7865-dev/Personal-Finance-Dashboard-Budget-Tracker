import React from "react";

const Tables = () => {
  return (
    <div className="tables pt-6">
      <div className="head bg-blue-950 text-white font-semibold px-10 py-2 text-lg text-center">
        <p>Breakdown - March 2022</p>
      </div>
      <div className="px-10 py-5 w-full">
        <div className="incomeTable w-full">
          <table className="w-full">
            <thead className="w-screen bg-green-500">
              <tr className="text-white">
                <th className="rounded-l py-2 text-center">Income</th>
                <th className="py-2 text-center">Tracked</th>
                <th className="py-2 text-center">Budget</th>
                <th className="py-2 text-center">% Compl.</th>
                <th className="py-2 text-center">Remaining</th>
                <th className="rounded-r py-2 text-center">Excess</th>
              </tr>
            </thead>
            <tbody className="w-screen text-center">
              <tr>
                <td className="py-2">Employment (Net)</td>
                <td className="py-2">45000</td>
                <td className="py-2">45000</td>
                <td className="py-2 bg-green-300">100%</td>
                <td className="py-2">-</td>
                <td className="py-2">-</td>
              </tr>
              <tr>
                <td className="py-2">Side Hustle (Net)</td>
                <td className="py-2">1200</td>
                <td className="py-2">1000</td>
                <td className="py-2 bg-green-300">120%</td>
                <td className="py-2">-</td>
                <td className="py-2">200</td>
              </tr>
              <tr>
                <td className="py-2">Dividends</td>
                <td className="py-2">50</td>
                <td className="py-2">50</td>
                <td className="py-2 bg-green-300">100%</td>
                <td className="py-2">-</td>
                <td className="py-2">-</td>
              </tr>
            </tbody>
            <tfoot className="text-center border-t">
              <tr>
                <td className="py-2 font-bold">Total Income</td>
                <td className="py-2 font-bold">5960</td>
                <td className="py-2 font-bold">46000</td>
                <td className="py-2 font-bold">104%</td>
                <td className="py-2 font-bold">-</td>
                <td className="py-2 font-bold">200</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="px-10 py-5 w-full">
        <div className="expenseTable w-full">
          <table className="w-full">
            <thead className="w-screen bg-pink-500">
              <tr className="text-white">
                <th className="rounded-l py-2 text-center">Expenses</th>
                <th className="py-2 text-center">Tracked</th>
                <th className="py-2 text-center">Budget</th>
                <th className="py-2 text-center">% Compl.</th>
                <th className="py-2 text-center">Remaining</th>
                <th className="rounded-r py-2 text-center">Excess</th>
              </tr>
            </thead>
            <tbody className="w-screen text-center">
              <tr>
                <td className="py-2">Funs & Vacation</td>
                <td className="py-2">4500</td>
                <td className="py-2">1200</td>
                <td className="py-2 bg-pink-300">100%</td>
                <td className="py-2">-</td>
                <td className="py-2">-</td>
              </tr>
              <tr>
                <td className="py-2">Utilities</td>
                <td className="py-2">300</td>
                <td className="py-2">300</td>
                <td className="py-2 bg-pink-300">100%</td>
                <td className="py-2">-</td>
                <td className="py-2">200</td>
              </tr>
              <tr>
                <td className="py-2">Housing</td>
                <td className="py-2">1200</td>
                <td className="py-2">1200</td>
                <td className="py-2 bg-pink-300">100%</td>
                <td className="py-2">-</td>
                <td className="py-2">-</td>
              </tr>
              <tr>
                <td className="py-2">Groceries</td>
                <td className="py-2">230</td>
                <td className="py-2">350</td>
                <td className="py-2 bg-gray-300">66%</td>
                <td className="py-2">120</td>
                <td className="py-2">-</td>
              </tr>
            </tbody>
            <tfoot className="text-center border-t">
              <tr>
                <td className="py-2 font-bold">Total Expenses</td>
                <td className="py-2 font-bold">3669</td>
                <td className="py-2 font-bold">4876</td>
                <td className="py-2 font-bold">96%</td>
                <td className="py-2 font-bold">-</td>
                <td className="py-2 font-bold">-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="px-10 py-5 w-full">
        <div className="expenseTable w-full">
          <table className="w-full">
            <thead className="w-screen bg-blue-500">
              <tr className="text-white">
                <th className="rounded-l py-2 text-center">Savings</th>
                <th className="py-2 text-center">Tracked</th>
                <th className="py-2 text-center">Budget</th>
                <th className="py-2 text-center">% Compl.</th>
                <th className="py-2 text-center">Remaining</th>
                <th className="rounded-r py-2 text-center">Excess</th>
              </tr>
            </thead>
            <tbody className="w-screen text-center">
              <tr>
                <td className="py-2">Funs & Vacation</td>
                <td className="py-2">4500</td>
                <td className="py-2">1200</td>
                <td className="py-2 bg-blue-300">100%</td>
                <td className="py-2">-</td>
                <td className="py-2">-</td>
              </tr>
              <tr>
                <td className="py-2">Utilities</td>
                <td className="py-2">300</td>
                <td className="py-2">300</td>
                <td className="py-2 bg-blue-300">100%</td>
                <td className="py-2">-</td>
                <td className="py-2">200</td>
              </tr>
              <tr>
                <td className="py-2">Groceries</td>
                <td className="py-2">230</td>
                <td className="py-2">350</td>
                <td className="py-2 bg-gray-300">66%</td>
                <td className="py-2">120</td>
                <td className="py-2">-</td>
              </tr>
              <tr>
                <td className="py-2">Housing</td>
                <td className="py-2">1200</td>
                <td className="py-2">1200</td>
                <td className="py-2 bg-blue-300">100%</td>
                <td className="py-2">-</td>
                <td className="py-2">-</td>
              </tr>
            </tbody>
            <tfoot className="text-center border-t">
              <tr>
                <td className="py-2 font-bold">Total Budget</td>
                <td className="py-2 font-bold">3669</td>
                <td className="py-2 font-bold">4876</td>
                <td className="py-2 font-bold">96%</td>
                <td className="py-2 font-bold">-</td>
                <td className="py-2 font-bold">-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tables;
