import { useEffect, useState } from "react";
import { useStateContext } from "../../providers/StateProvider";

const Form = () => {
  const {
    setShowForm,
    FormTitle: title,
    setUserData,
    userData,
    selectedPeriod,
  } = useStateContext();

  const [inputFields, setInputFields] = useState(
    title === "Budget Form" ? { income: 1, expenses: 1 } : 1
  );
  const [editedData, setEditedData] = useState({});
  const [currentPeriodData, setCurrentPeriodData] = useState(null);

  useEffect(() => {
    const periodKey = `${selectedPeriod.month}-${selectedPeriod.year}`;
    const matchedData = userData.find((item) => item.period === periodKey);

    if (matchedData) {
      setCurrentPeriodData(matchedData);

      if (title === "Income Form") {
        const count = matchedData?.income?.length || 1;
        setInputFields(count);
      } else if (title === "Expenses Form") {
        const count = matchedData?.expenses?.length || 1;
        setInputFields(count);
      } else if (title === "Budget Form") {
        setInputFields({
          income: matchedData?.budget?.income?.length || 1,
          expenses: matchedData?.budget?.expenses?.length || 1,
        });
      }

      let initialData = { ...matchedData };

      if (title === "Budget Form") {
        if (!initialData.budget) {
          initialData.budget = { income: [], expenses: [] };
        }
        if (!initialData.budget.income) {
          initialData.budget.income = [];
        }
        if (!initialData.budget.expenses) {
          initialData.budget.expenses = [];
        }
      }

      setEditedData(initialData);
    } else {
      setCurrentPeriodData(null);
      setEditedData({});
    }
  }, [userData, title, selectedPeriod]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserData((prev) => {
      const periodKey = `${selectedPeriod.month}-${selectedPeriod.year}`;
      const updatedUserData = prev.map((item) => {
        if (item.period === periodKey) {
          return editedData;
        }
        return item;
      });
      return updatedUserData;
    });

    setShowForm(false);
  };

  if (!currentPeriodData) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/30"
        onClick={() => setShowForm(false)}
      >
        <div
          className="bg-white text-black p-10 flex flex-col gap-y-3 rounded min-w-[500px] text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="head flex items-center justify-between">
            <h2 className="uppercase font-semibold text-2xl text-red-500 font-mono">
              No Data Found
            </h2>
            <span
              className="font-semibold cursor-pointer text-base"
              onClick={(e) => {
                e.stopPropagation();
                setShowForm(false);
              }}
            >
              X
            </span>
          </div>
          <p className="text-gray-600 text-lg">
            Kindly add a new period data for {selectedPeriod.month}-
            {selectedPeriod.year} first before editing{" "}
            {title.toLowerCase().replace(" form", "")}.
          </p>
          <button
            className="bg-gray-500 text-white p-2 rounded w-fit mx-auto mt-4"
            onClick={() => setShowForm(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30"
      onClick={() => setShowForm(false)}
    >
      <form
        className="bg-white text-black p-10 flex flex-col gap-y-3 rounded min-w-[500px]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="head flex items-center justify-between">
          <h2
            className={`uppercase font-semibold text-2xl ${
              title === "Income Form"
                ? "text-green-500"
                : title === "Expenses Form"
                ? "text-pink-500"
                : title === "Budget Form"
                ? "text-blue-500"
                : ""
            } font-mono`}
          >
            {title} - {selectedPeriod.month} {selectedPeriod.year}
          </h2>
          <span
            className="font-semibold cursor-pointer text-base"
            onClick={(e) => {
              e.stopPropagation();
              setShowForm(false);
            }}
          >
            X
          </span>
        </div>

        {title === "Budget Form" ? (
          <div className="fieldsContainer overflow-y-auto w-full flex flex-col gap-y-6 max-h-[500px]">
            <h4 className="text-lg text-green-500">Expected Incomes</h4>
            <div
              className={`incomes grid ${
                inputFields.income === 1
                  ? "grid-cols-1"
                  : inputFields.income === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } gap-4`}
            >
              {Array.from({ length: inputFields.income }).map((_, idx) => (
                <div className="flex flex-col gap-y-2 w-full p-2" key={idx}>
                  <label className="text-slate-500">
                    Exp. Income Category No. {idx + 1}
                  </label>
                  <input
                    type="text"
                    placeholder="i.e. Salary"
                    value={editedData?.budget?.income?.[idx]?.category || ""}
                    onChange={(e) => {
                      let editedLocal = { ...editedData };
                      if (!editedLocal.budget)
                        editedLocal.budget = { income: [], expenses: [] };
                      if (!editedLocal.budget.income)
                        editedLocal.budget.income = [];
                      if (!editedLocal.budget.income[idx])
                        editedLocal.budget.income[idx] = {};
                      editedLocal.budget.income[idx].category = e.target.value;
                      setEditedData(editedLocal);
                    }}
                    className="outline-none border border-slate-200 text-slate-700 rounded p-2"
                  />
                  <label className="text-slate-500">
                    Exp. Income Amount No. {idx + 1}
                  </label>
                  <input
                    type="number"
                    placeholder="i.e. 120000"
                    className="outline-none border border-slate-200 text-slate-700 rounded p-2"
                    value={editedData?.budget?.income?.[idx]?.value || ""}
                    onChange={(e) => {
                      let editedLocal = { ...editedData };
                      if (!editedLocal.budget)
                        editedLocal.budget = { income: [], expenses: [] };
                      if (!editedLocal.budget.income)
                        editedLocal.budget.income = [];
                      if (!editedLocal.budget.income[idx])
                        editedLocal.budget.income[idx] = {};
                      editedLocal.budget.income[idx].value = Number(
                        e.target.value
                      );
                      setEditedData(editedLocal);
                    }}
                  />
                </div>
              ))}
            </div>

            <h4 className="text-lg text-pink-500">Expected Expenses</h4>
            <div
              className={`expenses grid ${
                inputFields.expenses === 1
                  ? "grid-cols-1"
                  : inputFields.expenses === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } gap-4`}
            >
              {Array.from({ length: inputFields.expenses }).map((_, idx) => (
                <div className="flex flex-col gap-y-2 w-full p-2" key={idx}>
                  <label className="text-slate-500">
                    Exp. Expenses Category No. {idx + 1}
                  </label>
                  <input
                    type="text"
                    placeholder="i.e. House Rent"
                    value={editedData?.budget?.expenses?.[idx]?.category || ""}
                    onChange={(e) => {
                      let editedLocal = { ...editedData };
                      if (!editedLocal.budget)
                        editedLocal.budget = { income: [], expenses: [] };
                      if (!editedLocal.budget.expenses)
                        editedLocal.budget.expenses = [];
                      if (!editedLocal.budget.expenses[idx])
                        editedLocal.budget.expenses[idx] = {};
                      editedLocal.budget.expenses[idx].category =
                        e.target.value;
                      setEditedData(editedLocal);
                    }}
                    className="outline-none border border-slate-200 text-slate-700 rounded p-2"
                  />
                  <label className="text-slate-500">
                    Exp. Expenses Amount No. {idx + 1}
                  </label>
                  <input
                    type="number"
                    placeholder="i.e. 120000"
                    className="outline-none border border-slate-200 text-slate-700 rounded p-2"
                    value={editedData?.budget?.expenses?.[idx]?.value || ""}
                    onChange={(e) => {
                      let editedLocal = { ...editedData };
                      if (!editedLocal.budget)
                        editedLocal.budget = { income: [], expenses: [] };
                      if (!editedLocal.budget.expenses)
                        editedLocal.budget.expenses = [];
                      if (!editedLocal.budget.expenses[idx])
                        editedLocal.budget.expenses[idx] = {};
                      editedLocal.budget.expenses[idx].value = Number(
                        e.target.value
                      );
                      setEditedData(editedLocal);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`fieldsContainer grid ${
              inputFields === 1
                ? "grid-cols-1"
                : inputFields === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            } gap-4 overflow-y-auto max-h-[500px] w-full`}
          >
            {Array.from({ length: inputFields }).map((_, idx) => (
              <div className="flex flex-col gap-y-2 w-full p-2" key={idx}>
                <label className="text-slate-500">
                  {title?.split(" ")?.[0]} Category No. {idx + 1}
                </label>
                <input
                  type="text"
                  placeholder="i.e. Salary"
                  value={
                    title === "Income Form"
                      ? editedData?.income?.[idx]?.category || ""
                      : title === "Expenses Form"
                      ? editedData?.expenses?.[idx]?.category || ""
                      : ""
                  }
                  onChange={(e) => {
                    let editedLocal = { ...editedData };
                    if (title === "Income Form") {
                      if (!editedLocal.income) editedLocal.income = [];
                      if (!editedLocal.income[idx])
                        editedLocal.income[idx] = {};
                      editedLocal.income[idx].category = e.target.value;
                    } else if (title === "Expenses Form") {
                      if (!editedLocal.expenses) editedLocal.expenses = [];
                      if (!editedLocal.expenses[idx])
                        editedLocal.expenses[idx] = {};
                      editedLocal.expenses[idx].category = e.target.value;
                    }
                    setEditedData(editedLocal);
                  }}
                  className="outline-none border border-slate-200 text-slate-700 rounded p-2"
                />
                <label className="text-slate-500">
                  {title?.split(" ")?.[0]} Amount No. {idx + 1}
                </label>
                <input
                  type="number"
                  placeholder="i.e. 120000"
                  className="outline-none border border-slate-200 text-slate-700 rounded p-2"
                  value={
                    title === "Income Form"
                      ? editedData?.income?.[idx]?.value || ""
                      : title === "Expenses Form"
                      ? editedData?.expenses?.[idx]?.value || ""
                      : ""
                  }
                  onChange={(e) => {
                    let editedLocal = { ...editedData };
                    if (title === "Income Form") {
                      if (!editedLocal.income) editedLocal.income = [];
                      if (!editedLocal.income[idx])
                        editedLocal.income[idx] = {};
                      editedLocal.income[idx].value = Number(e.target.value);
                    } else if (title === "Expenses Form") {
                      if (!editedLocal.expenses) editedLocal.expenses = [];
                      if (!editedLocal.expenses[idx])
                        editedLocal.expenses[idx] = {};
                      editedLocal.expenses[idx].value = Number(e.target.value);
                    }
                    setEditedData(editedLocal);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="buttons flex gap-x-2 flex-wrap">
          <button
            type="button"
            className={`${
              title === "Budget Form" ? "hidden" : ""
            } text-start text-sm text-blue-500 border border-blue-500 w-fit p-1 rounded cursor-pointer outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              setInputFields((prev) => prev + 1);
            }}
          >
            Add+
          </button>
          <button
            type="button"
            className={`${
              title === "Budget Form" ? "hidden" : ""
            } text-start text-sm text-red-500 border border-red-500 w-fit p-1 rounded cursor-pointer outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              if (inputFields === 1) return; // Prevent going below 1

              setInputFields((prev) => prev - 1);

              let dataToEdit = { ...editedData };
              if (title === "Income Form" && dataToEdit.income) {
                dataToEdit.income = dataToEdit.income.slice(0, -1);
              } else if (title === "Expenses Form" && dataToEdit.expenses) {
                dataToEdit.expenses = dataToEdit.expenses.slice(0, -1);
              }
              setEditedData(dataToEdit);
            }}
          >
            Remove
          </button>

          {/* Budget form buttons */}
          <button
            type="button"
            className={`${
              title === "Budget Form" ? "" : "hidden"
            } text-start text-sm text-blue-500 border border-blue-500 w-fit p-1 rounded cursor-pointer outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              setInputFields((prev) => ({
                ...prev,
                income: prev.income + 1,
              }));
            }}
          >
            Add income
          </button>

          <button
            type="button"
            className={`${
              title === "Budget Form" ? "" : "hidden"
            } text-start text-sm text-red-500 border border-red-500 w-fit p-1 rounded cursor-pointer outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              setInputFields((prev) => ({
                ...prev,
                income: Math.max(1, prev.income - 1),
              }));

              let dataToEdit = { ...editedData };
              if (
                dataToEdit.budget?.income &&
                dataToEdit.budget.income.length > 1
              ) {
                dataToEdit.budget.income = dataToEdit.budget.income.slice(
                  0,
                  -1
                );
                setEditedData(dataToEdit);
              }
            }}
          >
            Remove income
          </button>

          <button
            type="button"
            className={`${
              title === "Budget Form" ? "" : "hidden"
            } text-start text-sm text-blue-500 border border-blue-500 w-fit p-1 rounded cursor-pointer outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              setInputFields((prev) => ({
                ...prev,
                expenses: prev.expenses + 1,
              }));
            }}
          >
            Add expense
          </button>

          <button
            type="button"
            className={`${
              title === "Budget Form" ? "" : "hidden"
            } text-start text-sm text-red-500 border border-red-500 w-fit p-1 rounded cursor-pointer outline-none`}
            onClick={(e) => {
              e.stopPropagation();
              setInputFields((prev) => ({
                ...prev,
                expenses: Math.max(1, prev.expenses - 1),
              }));

              let dataToEdit = { ...editedData };
              if (
                dataToEdit.budget?.expenses &&
                dataToEdit.budget.expenses.length > 1
              ) {
                dataToEdit.budget.expenses = dataToEdit.budget.expenses.slice(
                  0,
                  -1
                );
                setEditedData(dataToEdit);
              }
            }}
          >
            Remove expense
          </button>
        </div>

        <input
          type="submit"
          value="Submit"
          className={`p-2 cursor-pointer ${
            title === "Income Form"
              ? "bg-green-500"
              : title === "Expenses Form"
              ? "bg-pink-500"
              : title === "Budget Form"
              ? "bg-blue-500"
              : ""
          } text-white rounded w-fit outline-none inline-block mx-auto`}
        />
      </form>
    </div>
  );
};

export default Form;
