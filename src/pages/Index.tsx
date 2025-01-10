import AccountsPanel from "../components/AccountsPanel";
import CreditCardsPanel from "../components/CreditCardsPanel";
import BalancePanel from "../components/BalancePanel";

const Index = () => {
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <BalancePanel
                totalBalance={30000}
                income={45000}
                expenses={15000}
            />
            <AccountsPanel />
            <CreditCardsPanel />
        </div>
    );
};

export default Index;