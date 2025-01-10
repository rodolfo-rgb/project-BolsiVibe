export type TransactionType = "income" | "expense" | "credit_payment";

export interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    description: string;
    date: string;
    accountId?: number;
    creditCardId?: number;
    category?: string;
}