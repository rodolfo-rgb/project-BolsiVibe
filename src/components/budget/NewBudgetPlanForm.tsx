import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { useToast } from "../../hooks/use-toast";
import ExpensesSelection from "./ExpensesSelection";

interface NewBudgetPlanFormProps {
    onPlanCreated: (plan: BudgetPlan) => void;
}

const NewBudgetPlanForm = ({ onPlanCreated }: NewBudgetPlanFormProps) => {
    const { toast } = useToast();
    const [step, setStep] = useState<"initial" | "expenses">("initial");
    const [initialBudget, setInitialBudget] = useState("");
    const [savingsPercentage, setSavingsPercentage] = useState("");

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!initialBudget || !savingsPercentage) {
            toast({
                title: "Error",
                description: "Por favor completa todos los campos",
                variant: "destructive",
            });
            return;
        }

        const budget = parseFloat(initialBudget);
        const percentage = parseFloat(savingsPercentage);

        if (percentage < 0 || percentage > 100) {
            toast({
                title: "Error",
                description: "El porcentaje debe estar entre 0 y 100",
                variant: "destructive",
            });
            return;
        }

        setStep("expenses");
    };

    const handleExpensesSubmit = (expenses: BudgetExpense[]) => {
        const budget = parseFloat(initialBudget);
        const percentage = parseFloat(savingsPercentage);
        const savingsAmount = (budget * percentage) / 100;
        const spendingAmount = budget - savingsAmount;

        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        if (totalExpenses > spendingAmount) {
            toast({
                title: "Error",
                description: "Los gastos superan el monto disponible para gastar",
                variant: "destructive",
            });
            return;
        }

        const plan: BudgetPlan = {
            date: new Date().toISOString(), // Add the missing date property
            initialBudget: budget,
            savingsPercentage: percentage,
            savingsAmount,
            spendingAmount,
            expenses,
            remainingAmount: spendingAmount - totalExpenses,
        };

        onPlanCreated(plan);
    };

    if (step === "expenses") {
        const budget = parseFloat(initialBudget);
        const percentage = parseFloat(savingsPercentage);
        const savingsAmount = (budget * percentage) / 100;
        const spendingAmount = budget - savingsAmount;

        return (
            <ExpensesSelection
                availableAmount={spendingAmount}
                onSubmit={handleExpensesSubmit}
                onBack={() => setStep("initial")}
            />
        );
    }

    return (
        <Card className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Crear Nuevo Plan Quincenal</h2>
            <form onSubmit={handleInitialSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="initialBudget">Presupuesto Quincenal</Label>
                    <Input
                        id="initialBudget"
                        type="number"
                        value={initialBudget}
                        onChange={(e) => setInitialBudget(e.target.value)}
                        placeholder="Ingresa tu presupuesto"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="savingsPercentage">Porcentaje de Ahorro</Label>
                    <Input
                        id="savingsPercentage"
                        type="number"
                        value={savingsPercentage}
                        onChange={(e) => setSavingsPercentage(e.target.value)}
                        placeholder="Porcentaje a ahorrar"
                        min="0"
                        max="100"
                    />
                </div>
                <Button type="submit" className="w-full">
                    Continuar
                </Button>
            </form>
        </Card>
    );
};

export default NewBudgetPlanForm;