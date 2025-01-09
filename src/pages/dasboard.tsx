import AccountsPanel from "../components/AccountsPanel";
import CreditCardsPanel from "../components/CreditCardsPanel";
import BalancePanel from "../components/BalancePanel";
import { Toaster } from "../components/ui/toaster";
import { Toaster as Sonner } from "../components/ui/sonner"
import { TooltipProvider } from "../components/ui/tooltip";

const Dashboard = () => {
  // Estos valores deberían venir de tu estado global o base de datos
  const totalBalance = 30000;
  const income = 45000;
  const expenses = 15000;

  return (
    <>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="p-6">
        <BalancePanel
          totalBalance={totalBalance}
          income={income}
          expenses={expenses}
        />
        <AccountsPanel />
        <CreditCardsPanel />
      </div>
    </TooltipProvider>
    </>
  );
};

export default Dashboard;