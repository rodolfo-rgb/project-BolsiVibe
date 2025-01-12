import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, ArrowUpCircle, ArrowDownCircle, CreditCard, Trash2 } from "lucide-react";
import { useTransactions } from "../hooks/useTransactions";
import { useAccounts } from "../hooks/useAccounts";
import NewTransactionForm from "./transactions/NewTransactionForm";
import { useToast } from "./ui/use-toast";
import { Transaction } from "../types/transaction";
import { TransactionFormData } from "../types/transaction-types";
import { ToggleGroup, ToggleGroupItem } from "./ui/toogle-group";

const TransactionsPanel = () => {
    const { transactions, addTransaction, deleteTransaction } = useTransactions();
    const { accounts } = useAccounts();
    const { toast } = useToast();
    const [isNewTransactionFormOpen, setIsNewTransactionFormOpen] = useState(false);
    const [filter, setFilter] = useState<"all" | "account" | "credit">("all");

    const handleAddTransaction = (data: TransactionFormData) => {
        addTransaction(data);
        setIsNewTransactionFormOpen(false);
        toast({
            title: "Transacción agregada",
            description: "La transacción ha sido agregada exitosamente.",
        });
    };

    const getTransactionIcon = (type: Transaction["type"]) => {
        switch (type) {
            case "income":
                return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
            case "expense":
                return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
            case "credit_payment":
                return <CreditCard className="h-4 w-4 text-blue-500" />;
            default:
                return null;
        }
    };

    const getTransactionTypeText = (type: Transaction["type"]) => {
        switch (type) {
            case "income":
                return "Ingreso";
            case "expense":
                return "Gasto";
            case "credit_payment":
                return "Pago de Tarjeta";
            default:
                return "";
        }
    };

    const filteredTransactions = transactions.filter((transaction) => {
        if (filter === "all") return true;
        if (filter === "credit") return transaction.type === "credit_payment";
        return transaction.type === "income" || transaction.type === "expense";
    });

    const handleDeleteTransaction = async (transaction: Transaction) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta transacción?")) {
            await deleteTransaction(transaction);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <ToggleGroup
                    type="single"
                    value={filter}
                    onValueChange={(value) => value && setFilter(value as typeof filter)}
                    className="bg-[rgb(13,40,71)]/5 p-1 rounded-lg"
                >
                    <ToggleGroupItem
                        value="all"
                        aria-label="Todas las transacciones"
                        className="text-sm data-[state=on]:bg-[rgb(13,40,71)] data-[state=on]:text-white hover:bg-[rgb(13,40,71)]/80 hover:text-white transition-colors"
                    >
                        Todas
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="account"
                        aria-label="Solo transacciones de cuenta"
                        className="text-sm data-[state=on]:bg-[rgb(13,40,71)] data-[state=on]:text-white hover:bg-[rgb(13,40,71)]/80 hover:text-white transition-colors"
                    >
                        Cuentas
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="credit"
                        aria-label="Solo pagos de tarjeta"
                        className="text-sm data-[state=on]:bg-[rgb(13,40,71)] data-[state=on]:text-white hover:bg-[rgb(13,40,71)]/80 hover:text-white transition-colors"
                    >
                        Tarjetas
                    </ToggleGroupItem>
                </ToggleGroup>

                <Button onClick={() => setIsNewTransactionFormOpen(true)} variant="outline" className="shrink-0">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Transacción
                </Button>
            </div>

            <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-background border rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            {getTransactionIcon(transaction.type)}
                            <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-sm text-muted-foreground">
                                    {getTransactionTypeText(transaction.type)} • {transaction.date}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span
                                className={`font-medium ${transaction.type === "income"
                                    ? "text-green-500"
                                    : transaction.type === "expense"
                                        ? "text-red-500"
                                        : "text-blue-500"
                                    }`}
                            >
                                {transaction.type === "income" ? "+" : "-"}$
                                {transaction.amount.toLocaleString("es-ES")}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteTransaction(transaction)}
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <NewTransactionForm
                isOpen={isNewTransactionFormOpen}
                onClose={() => setIsNewTransactionFormOpen(false)}
                onSubmit={handleAddTransaction}
                accounts={accounts}
            />
        </div>
    );
};

export default TransactionsPanel;
