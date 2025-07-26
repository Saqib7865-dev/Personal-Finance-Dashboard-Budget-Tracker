import { useStateContext } from "../providers/StateProvider";

const QuickActions = () => {
  const { setShowForm, setFormTitle } = useStateContext();
  return (
    <div className="w-full px-10 grid grid-cols-4 gap-6">
      <button
        className="bg-green-500 text-white font-semibold uppercase rounded shadow py-4 cursor-pointer"
        onClick={() => {
          setShowForm(true);
          setFormTitle("Income Form");
        }}
      >
        Add Income
      </button>
      <button
        className="bg-pink-500 text-white rounded shadow py-4 cursor-pointer font-semibold uppercase"
        onClick={() => {
          setShowForm(true);
          setFormTitle("Expenses Form");
        }}
      >
        Add Expense
      </button>
      <button
        className="bg-blue-500 text-white rounded shadow py-4 cursor-pointer font-semibold uppercase"
        onClick={() => {
          setShowForm(true);
          setFormTitle("Budget Form");
        }}
      >
        Set Budget
      </button>
      <button
        className="bg-yellow-500 text-white rounded shadow py-4 cursor-pointer font-semibold uppercase"
        onClick={() => alert("Export feature is disabled temporarily")}
      >
        Export
      </button>
    </div>
  );
};

export default QuickActions;
