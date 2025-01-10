interface BudgetExpense {
    category: string;
    amount: number;
}

interface BudgetPlan {
    initialBudget: number;
    savingsPercentage: number;
    savingsAmount: number;
    spendingAmount: number;
    expenses: BudgetExpense[];
    remainingAmount: number;
    date: string; // Date for the plan
}