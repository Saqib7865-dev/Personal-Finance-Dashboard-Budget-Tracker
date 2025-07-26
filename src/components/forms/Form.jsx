import { useEffect, useState } from "react";
import { useStateContext } from "../../providers/StateProvider";

const Form = () => {
  const {
    setShowForm,
    FormTitle: title,
    setUserData,
    userData,
  } = useStateContext();
  const [inputFields, setInputFields] = useState(1);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    inputFields === 1 &&
      setInputFields((_) => {
        if (title === "Income Form") {
          return userData.income
            ? userData.income.length === 0
              ? 1
              : userData.income.length
            : 1;
        } else if (title === "Expenses Form") {
          return userData.expenses
            ? userData.expenses.length === 0
              ? 1
              : userData.expenses.length
            : 1;
        } else if (title === "Budget Form") {
          return userData.budget
            ? userData.budget.length === 0
              ? 1
              : userData.budget.length
            : 1;
        }
      });
    setEditedData(userData);
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(editedData);
    setShowForm(false);
  };

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
            {title}
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
              <label htmlFor="" className="text-slate-500">
                {title?.split(" ")?.[0]} Category No. {idx + 1}
              </label>
              <input
                type="text"
                placeholder="i.e. Salary"
                value={
                  title === "Income Form"
                    ? userData?.income?.[idx]?.category
                    : title === "Expenses Form"
                    ? userData?.expenses?.[idx]?.category
                    : userData?.budget?.[idx]?.category
                }
                onChange={(e) => {
                  let editedLocal = { ...editedData };
                  if (title === "Income Form") {
                    if (!editedLocal.hasOwnProperty("income")) {
                      editedLocal = { ...editedData, income: [{}] };
                    }
                    if (!editedLocal.income?.[idx]) {
                      editedLocal.income = [...editedLocal.income, {}];
                    }
                    if (editedLocal.income?.length > inputFields) {
                      console.log("I am more than inputFields");
                      editedLocal.income = editedLocal.income.slice(
                        0,
                        editedLocal.income.length
                      );
                    }
                    editedLocal.income[idx].category = e.target.value;
                  } else if (title === "Expenses Form") {
                    if (!editedLocal.hasOwnProperty("expenses")) {
                      editedLocal = { ...editedLocal, expenses: [{}] };
                    }
                    if (!editedLocal.expenses?.[idx]) {
                      editedLocal.expenses = [...editedLocal.expenses, {}];
                    }
                    editedLocal.expenses[idx].category = e.target.value;
                  } else if (title === "Budget Form") {
                    if (!editedLocal.hasOwnProperty("budget")) {
                      editedLocal = { ...editedLocal, budget: [{}] };
                    }
                    if (!editedLocal.budget?.[idx]) {
                      editedLocal.budget = [...editedLocal.budget, {}];
                    }
                    editedLocal.budget[idx].category = e.target.value;
                  }
                  setEditedData(editedLocal);
                }}
                className="outline-none border border-slate-200 text-slate-700 rounded p-2"
              />
              <label htmlFor="" className="text-slate-500">
                {title?.split(" ")?.[0]} Amount No. {idx + 1}
              </label>
              <input
                type="number"
                placeholder="i.e. 120000"
                className="outline-none border border-slate-200 text-slate-700 rounded p-2"
                value={
                  title === "Income Form"
                    ? userData?.income?.[idx]?.value
                    : title === "Expenses Form"
                    ? userData?.expenses?.[idx]?.value
                    : userData?.budget?.[idx]?.value
                }
                onChange={(e) => {
                  let editedLocal = { ...editedData };
                  if (title === "Income Form") {
                    if (!editedLocal.hasOwnProperty("income")) {
                      editedLocal = { ...editedData, income: [{}] };
                    }
                    if (!editedLocal.income?.[idx]) {
                      editedLocal.income = [...editedLocal.income, {}];
                    }
                    editedLocal.income[idx].value = e.target.value;
                  } else if (title === "Expenses Form") {
                    if (!editedLocal.hasOwnProperty("expenses")) {
                      editedLocal = { ...editedLocal, expenses: [{}] };
                    }
                    if (!editedLocal.expenses?.[idx]) {
                      editedLocal.expenses = [...editedLocal.expenses, {}];
                    }
                    editedLocal.expenses[idx].value = e.target.value;
                  } else if (title === "Budget Form") {
                    if (!editedLocal.hasOwnProperty("budget")) {
                      editedLocal = { ...editedLocal, budget: [{}] };
                    }
                    if (!editedLocal.budget?.[idx]) {
                      editedLocal.budget = [...editedLocal.budget, {}];
                    }
                    editedLocal.budget[idx].value = e.target.value;
                  }
                  setEditedData(editedLocal);
                }}
              />
            </div>
          ))}
        </div>
        <div className="buttons flex gap-x-2">
          <button
            type="button"
            className="text-start text-sm text-blue-500 border border-blue-500 w-fit p-1 rounded cursor-pointer outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setInputFields((prev) => prev + 1);
            }}
          >
            Add+
          </button>
          <button
            type="button"
            className="text-start text-sm text-red-500 border border-red-500 w-fit p-1 rounded cursor-pointer outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setInputFields((prev) => (prev === 1 ? prev : prev - 1));
              let dataToEdit = { ...editedData };
              if (title === "Income Form") {
                if (!dataToEdit.income || dataToEdit.income.length === 0)
                  alert("Kindly enter your income first to delete");
                dataToEdit.income = dataToEdit.income.slice(
                  0,
                  dataToEdit.income.length - 1
                );
              } else if (title === "Expenses Form") {
                if (!dataToEdit.expenses || dataToEdit.expenses.length === 0)
                  alert("Kindly enter your expense first to delete");
                dataToEdit.expenses = dataToEdit.expenses.slice(
                  0,
                  dataToEdit.expenses.length - 1
                );
              } else if (title === "Budget Form") {
                if (!dataToEdit.budget || dataToEdit.budget.length === 0)
                  alert("Kindly enter your budget first to delete");
                dataToEdit.budget = dataToEdit.budget.slice(
                  0,
                  dataToEdit.budget.length - 1
                );
              }
              setEditedData(dataToEdit);
            }}
          >
            Remove
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
