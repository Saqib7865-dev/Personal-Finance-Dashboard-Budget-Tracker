import Form from "./forms/Form";
import { useStateContext } from "../providers/StateProvider";
import Graphs from "./Graphs";
import Tables from "./Tables";
const DBChartsNTables = () => {
  const { showForm, selectedPeriod, setSelectedPeriod } =
    useStateContext();
  let years = [
    2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
    2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002,
    2001, 2000,
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
    <div>
      {/* Filters */}
      <div className="filters w-full flex items-center justify-end gap-x-2 pt-5 sm:pt-10 px-5 sm:px-10">
        <select
          name="Month"
          id="Month"
          className="border-none bg-white p-2 text-sm outline-none min-w-36 text-center rounded shadow appearance-none"
          onChange={(e) =>
            setSelectedPeriod((prev) => {
              return { ...prev, month: e.target.value };
            })
          }
        >
          <option value="mnth" selected disabled>
            {selectedPeriod.month}
          </option>
          {months.map((item, idx) => (
            <option value={item} key={idx}>
              {item}
            </option>
          ))}
        </select>
        <select
          name="year"
          id="Year"
          className="border-none bg-white p-2 text-sm outline-none min-w-36 text-center rounded shadow appearance-none"
          onChange={(e) =>
            setSelectedPeriod((prev) => {
              return { ...prev, year: e.target.value };
            })
          }
        >
          <option value="yr" selected disabled>
            {selectedPeriod.year}
          </option>
          {years.map((item, idx) => (
            <option value={item} key={idx} className="border-none outline-none">
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
    </div>
  );
};

export default DBChartsNTables;
