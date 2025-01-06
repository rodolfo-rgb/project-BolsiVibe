import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import MonthNavigation from "./MonthNavigation";
import FinancialSummary from "./FinancialSummary";
import ExpensesList from "./ExpensesList";
import AddExpenseDialog from "./AddExpenseDialog";
import { Button } from "../components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "../components/ui/use-toast";

const MonthlyView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            date: new Date(),
            description: "Supermercado",
            amount: 1500,
            category: "Alimentación",
        },
        {
            id: 2,
            date: new Date(),
            description: "Gasolina",
            amount: 800,
            category: "Transporte",
        },
    ]);

    const { toast } = useToast();

    const handlePreviousMonth = () => {
        setCurrentDate((date) => subMonths(date, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((date) => addMonths(date, 1));
    };

    const handleAddExpense = (newExpense: {
        description: string;
        amount: number;
        category: string;
    }) => {
        setExpenses((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                date: new Date(),
                ...newExpense,
            },
        ]);
    };

    const handleCopyPreviousMonth = () => {
        toast({
            title: "Presupuesto copiado",
            description: "El presupuesto del mes anterior ha sido copiado exitosamente",
        });
    };

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlyIncome = 25000; // Este sería un valor que vendría de la configuración del usuario
    const savings = monthlyIncome - totalExpenses;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-finance-text">Plan Financiero</h1>
                <Button
                    variant="outline"
                    onClick={handleCopyPreviousMonth}
                    className="hover:bg-finance-background"
                >
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar mes anterior
                </Button>
            </div>

            <MonthNavigation
                currentDate={currentDate}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
            />

            <FinancialSummary
                income={monthlyIncome}
                expenses={totalExpenses}
                savings={savings}
            />

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-finance-text">Gastos del Mes</h3>
                <AddExpenseDialog onAddExpense={handleAddExpense} />
            </div>

            <ExpensesList expenses={expenses} />
        </div>
    );
};

export default MonthlyView;