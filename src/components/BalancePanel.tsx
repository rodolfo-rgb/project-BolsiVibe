import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";

interface BalancePanelProps {
  totalBalance: number;
  income: number;
  expenses: number;
}

const BalancePanel = ({ totalBalance, income, expenses }: BalancePanelProps) => {
  const [showAmounts, setShowAmounts] = useState(true);

  const toggleVisibility = () => {
    setShowAmounts(!showAmounts);
  };

  const formatAmount = (amount: number) => {
    return showAmounts ? `$${amount.toLocaleString("es-ES")}` : "****";
  };

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Balance Total</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleVisibility}
            className="h-8 w-8"
          >
            {showAmounts ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="text-3xl font-bold mb-4">
          {formatAmount(totalBalance)}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div>
            <span className="block">Ingresos</span>
            <span className="font-medium text-green-600">
              {formatAmount(income)}
            </span>
          </div>
          <div>
            <span className="block">Gastos</span>
            <span className="font-medium text-red-600">
              {formatAmount(expenses)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalancePanel;