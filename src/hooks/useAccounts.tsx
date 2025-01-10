import { useState } from "react";

interface Account {
    id: number;
    name: string;
    balance: number;
}

export const useAccounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([
        { id: 1, name: "Cuenta Principal", balance: 5000 },
        { id: 2, name: "Cuenta de Ahorros", balance: 10000 },
        { id: 3, name: "Cuenta de Inversiones", balance: 15000 },
    ]);

    const addAccount = (data: { name: string; balance: number }) => {
        const newAccount: Account = {
            id: accounts.length + 1,
            name: data.name,
            balance: data.balance,
        };
        setAccounts((prev) => [...prev, newAccount]);
        return newAccount;
    };

    const editAccount = (id: number, data: { name: string; balance: number }) => {
        setAccounts((prev) =>
            prev.map((account) =>
                account.id === id
                    ? { ...account, name: data.name, balance: data.balance }
                    : account
            )
        );
    };

    const deleteAccount = (id: number) => {
        setAccounts((prev) => prev.filter((account) => account.id !== id));
    };

    const getTotalBalance = () => {
        return accounts.reduce((sum, account) => sum + account.balance, 0);
    };

    return {
        accounts,
        addAccount,
        editAccount,
        deleteAccount,
        getTotalBalance,
    };
};