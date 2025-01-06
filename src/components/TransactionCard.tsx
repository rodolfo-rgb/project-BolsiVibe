import { ArrowDownRight, ArrowUpRight, CreditCard } from "lucide-react";
import { cn } from "../lib/utils";

interface TransactionCardProps {
    type: "transfer-in" | "transfer-out" | "credit-payment";
    amount: number;
    date: string;
    description: string;
    source: string;
    destination: string;
}

export const TransactionCard = ({
    type,
    amount,
    date,
    description,
    source,
    destination,
}: TransactionCardProps) => {
    const isPositive = type === "transfer-in";
    const icon = type === "credit-payment" ? CreditCard : isPositive ? ArrowDownRight : ArrowUpRight;
    const Icon = icon;

    return (
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-2 rounded-full",
                        type === "credit-payment" ? "bg-blue-100 text-blue-600" :
                            isPositive ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                    )}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-medium">{description}</h3>
                        <p className="text-sm text-gray-500">
                            {type === "credit-payment" ? "Credit Card Payment" : `${source} → ${destination}`}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className={cn(
                        "font-semibold",
                        type === "credit-payment" ? "text-blue-600" :
                            isPositive ? "text-emerald-600" : "text-red-600"
                    )}>
                        {isPositive ? "+" : "-"}${Math.abs(amount).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
            </div>
        </div>
    );
};