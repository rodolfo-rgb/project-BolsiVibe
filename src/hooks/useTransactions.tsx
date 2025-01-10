import { useState } from "react";
import { Transaction, TransactionType } from "../types/transaction";

export const useTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 1,
            type: "income",
            amount: 5000,
            description: "Salario",
            date: "2024-04-15",
            accountId: 1,
            category: "Trabajo",
        },
        {
            id: 2,
            type: "expense",
            amount: 1500,
            description: "Supermercado",
            date: "2024-04-14",
            accountId: 1,
            category: "Alimentación",
        },
        {
            id: 3,
            type: "credit_payment",
            amount: 2000,
            description: "Pago tarjeta Visa",
            date: "2024-04-13",
            creditCardId: 1,
            accountId: 1,
            category: "Pagos",
        },
    ]);

    const addTransaction = (data: Omit<Transaction, "id">) => {
        const newTransaction = {
            ...data,
            id: transactions.length + 1,
        };
        setTransactions((prev) => [...prev, newTransaction]);
        return newTransaction;
    };

    const deleteTransaction = (id: number) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    return {
        transactions,
        addTransaction,
        deleteTransaction,
    };
};