import { Chart } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import Form from "./forms/Form";
import { useStateContext } from "../providers/StateProvider";
import Graphs from "./Graphs";
import Tables from "./Tables";
const DBChartsNTables = () => {
  const { showForm } = useStateContext();
  // alert("Got re-rendered");
  let years = [
    2025,
    2024,
    2023,
    2022,
    2021,
    2020,
    2019,
    2018,
    2017,
    2016,
    2015,
    2014,
    2013,
    2012,
    2011,
    2010,
    2009,
    2008,
    2007,
    2006,
    2005,
    2004,
    2003,
    2002,
    2001,
    ,
    2000,
  ];
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

  return (
    <>
      {/* Filters */}
      <div className="filters w-full flex items-center justify-end gap-x-2 pt-10 px-10">
        <select
          name="year"
          id="Year"
          className="border-none bg-white p-1 px-2 text-sm outline-none min-w-36 text-center rounded shadow"
        >
          <option value="yr" selected disabled>
            Select Year
          </option>
          {years.map((item, idx) => (
            <option value={item} key={idx} className="border-none outline-none">
              {item}
            </option>
          ))}
        </select>
        <select
          name="Month"
          id="Month"
          className="border-none bg-white p-1 px-2 text-sm outline-none min-w-36 text-center rounded shadow"
        >
          <option value="mnth" selected disabled>
            Select Month
          </option>
          {months.map((item, idx) => (
            <option value={item} key={idx}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <Graphs />

      {/* Tables */}
      <Tables />

      {/* Forms */}
      {showForm && <Form />}
    </>
  );
};

export default DBChartsNTables;
