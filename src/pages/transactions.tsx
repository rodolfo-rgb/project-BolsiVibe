import { useState } from "react";
import { TransactionCard } from "../components/TransactionCard";
import { TransactionFilter } from "../components/TransactionFilter";

// Mock data - in a real app this would come from an API
const transactions = [
    {
        id: 1,
        type: "transfer-in",
        amount: 1500,
        date: "2024-03-20 14:30",
        description: "Pago de nomina",
        source: "Empleador",
        destination: "Cuenta principal"
    },
    {
        id: 2,
        type: "transfer-out",
        amount: 800,
        date: "2024-03-19 09:15",
        description: "Pago de alquiler",
        source: "Cuenta principal",
        destination: "Landlord"
    },
    {
        id: 3,
        type: "credit-payment",
        amount: 250,
        date: "2024-03-18 16:45",
        description: "Factura de tarjeta de crédito",
        source: "Cuenta principal",
        destination: "Credit Card"
    },
    {
        id: 4,
        type: "transfer-in",
        amount: 100,
        date: "2024-03-17 11:20",
        description: "Besos para Beto",
        source: "Alexis",
        destination: "Cuenta principal"
    }
] as const;

const Index = () => {
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredTransactions = transactions.filter(transaction => {
        if (activeFilter === "all") return true;
        if (activeFilter === "transfers") return transaction.type.includes("transfer");
        if (activeFilter === "credit") return transaction.type === "credit-payment";
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">Transacciones</h1>
                    <p className="text-gray-600">Realice un seguimiento de sus transacciones y administre sus finanzas</p>
                </div>

                <TransactionFilter
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />

                <div className="space-y-4">
                    {filteredTransactions.map((transaction) => (
                        <TransactionCard
                            key={transaction.id}
                            type={transaction.type}
                            amount={transaction.amount}
                            date={transaction.date}
                            description={transaction.description}
                            source={transaction.source}
                            destination={transaction.destination}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;