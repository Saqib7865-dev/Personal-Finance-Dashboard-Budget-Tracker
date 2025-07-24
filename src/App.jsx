import BudgetSection from "./components/BudgetSection";
import ChartsSection from "./components/ChartsSection";
import DBCards from "./components/DBCards";
import DBChartsNTables from "./components/DBChartsNTables";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import OverviewCards from "./components/OverviewCards";
import QuickActions from "./components/QuickActions";

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <DBCards />
      <DBChartsNTables />
      <OverviewCards />
      <QuickActions />
      <MainContent />
      <ChartsSection />
      <BudgetSection />
    </div>
  );
}

export default App;
