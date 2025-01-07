import AccountsPanel from "../components/AccountsPanel";
import CreditCardsPanel from "../components/CreditCardsPanel";
import BalancePanel from "../components/BalancePanel";

const Index = () => {
  // Estos valores deberían venir de tu estado global o base de datos
  const totalBalance = 30000;
  const income = 45000;
  const expenses = 15000;

  return (
    <div className="p-6">
      <BalancePanel
        totalBalance={totalBalance}
        income={income}
        expenses={expenses}
      />
      <AccountsPanel />
      <CreditCardsPanel />
    </div>
  );
};

export default Index;