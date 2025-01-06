import { Card } from "../components/ui/card";
import { Wallet, PiggyBank, CreditCard } from "lucide-react";

interface FinancialSummaryProps {
    income: number;
    expenses: number;
    savings: number;
}

const FinancialSummary = ({ income, expenses, savings }: FinancialSummaryProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-finance-primary/10 to-finance-primary/5">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-finance-primary/20 rounded-full">
                        <Wallet className="h-6 w-6 text-finance-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Ingresos</p>
                        <p className="text-2xl font-bold text-finance-text">
                            {formatCurrency(income)}
                        </p>
                    </div>
                </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-finance-secondary/10 to-finance-secondary/5">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-finance-secondary/20 rounded-full">
                        <CreditCard className="h-6 w-6 text-finance-secondary" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Gastos</p>
                        <p className="text-2xl font-bold text-finance-text">
                            {formatCurrency(expenses)}
                        </p>
                    </div>
                </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-finance-accent/10 to-finance-accent/5">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-finance-accent/20 rounded-full">
                        <PiggyBank className="h-6 w-6 text-finance-accent" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600">Ahorros</p>
                        <p className="text-2xl font-bold text-finance-text">
                            {formatCurrency(savings)}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default FinancialSummary;