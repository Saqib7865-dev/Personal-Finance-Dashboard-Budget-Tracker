import { useEffect } from "react";
import DBCards from "./components/DBCards";
import DBChartsNTables from "./components/DBChartsNTables";
import Header from "./components/Header";
import QuickActions from "./components/QuickActions";
import { useStateContext } from "./providers/StateProvider";

function App() {
  const { showForm } = useStateContext();

  useEffect(() => {
    if (showForm) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showForm]);

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <DBCards />
      <QuickActions />
      <DBChartsNTables />
    </div>
  );
}

export default App;
