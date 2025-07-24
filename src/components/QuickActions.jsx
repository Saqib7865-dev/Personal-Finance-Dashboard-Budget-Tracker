const QuickActions = () => {
  return (
    <div className="w-full px-10 grid grid-cols-4 gap-6">
      <button className="bg-green-500 text-white rounded shadow py-4 cursor-pointer">Add Income</button>
      <button className="bg-green-500 text-white rounded shadow py-4 cursor-pointer">Add Expense</button>
      <button className="bg-green-500 text-white rounded shadow py-4 cursor-pointer">Set Budget</button>
      <button className="bg-green-500 text-white rounded shadow py-4 cursor-pointer">Export</button>
    </div>
  );
};

export default QuickActions;
