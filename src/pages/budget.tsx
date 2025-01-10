import { useState } from "react";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";
import NewBudgetPlanForm from "../components/budget/NewBudgetPlanForm";
import BudgetPlanReport from "../components/budget/BudgetPlanReport";
import { Card } from "../components/ui/card";

const Budget = () => {
    const [budgetPlans, setBudgetPlans] = useState<BudgetPlan[]>([]);
    const [currentPlanIndex, setCurrentPlanIndex] = useState<number>(0);

    const currentPlan = budgetPlans[currentPlanIndex];

    const handlePlanCreated = (plan: BudgetPlan) => {
        setBudgetPlans([...budgetPlans, plan]);
        setCurrentPlanIndex(budgetPlans.length);
    };

    const handleCopyPreviousPlan = () => {
        const previousPlan = budgetPlans[currentPlanIndex];
        if (previousPlan) {
            const newPlan = {
                ...previousPlan,
                date: new Date().toISOString(),
            };
            setBudgetPlans([...budgetPlans, newPlan]);
            setCurrentPlanIndex(budgetPlans.length);
        }
    };

    const navigatePlan = (direction: "prev" | "next") => {
        if (direction === "prev" && currentPlanIndex > 0) {
            setCurrentPlanIndex(currentPlanIndex - 1);
        } else if (direction === "next" && currentPlanIndex < budgetPlans.length) {
            setCurrentPlanIndex(currentPlanIndex + 1);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Planificación de Presupuesto</h1>

            {budgetPlans.length === 0 ? (
                <Card className="p-6 mb-6 bg-muted/50">
                    <p className="text-center text-muted-foreground mb-4">
                        No hay planes quincenales creados. Crea tu primer plan para comenzar.
                    </p>
                </Card>
            ) : (
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigatePlan("prev")}
                            disabled={currentPlanIndex === 0}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Plan {currentPlanIndex + 1} de {budgetPlans.length}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigatePlan("next")}
                            disabled={currentPlanIndex === budgetPlans.length}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleCopyPreviousPlan}
                            className="flex items-center gap-2"
                        >
                            <Copy className="h-4 w-4" />
                            Copiar Plan Actual
                        </Button>
                    </div>
                </div>
            )}

            {!currentPlan ? (
                <div className="text-center">
                    <NewBudgetPlanForm onPlanCreated={handlePlanCreated} />
                </div>
            ) : (
                <BudgetPlanReport
                    plan={currentPlan}
                    onReset={() => {
                        setBudgetPlans(budgetPlans.filter((_, index) => index !== currentPlanIndex));
                        setCurrentPlanIndex(Math.max(0, currentPlanIndex - 1));
                    }}
                />
            )}
        </div>
    );
};

export default Budget;