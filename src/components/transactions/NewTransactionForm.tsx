import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { TransactionType } from "../../types/transaction";
import { useAccounts } from "../../hooks/useAccounts";
import { useCreditCards } from "../../hooks/useCreditCards";
import CommonFields from "./forms/CommonFields";
import ExpenseFields from "./forms/ExpenseFields";
import IncomeFields from "./forms/IncomeFields";
import CreditPaymentFields from "./forms/CreditPaymentFields";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";

const transactionSchema = z.object({
    type: z.enum(["income", "expense", "credit_payment"] as const),
    amount: z.number().min(1, "El monto debe ser mayor a 0"),
    description: z.string().min(1, "La descripción es requerida"),
    date: z.string().min(1, "La fecha es requerida"),
    category: z.string().min(1, "La categoría es requerida"),
    sourceAccountId: z.number().optional(),
    destinationAccountId: z.number().optional(),
    creditCardId: z.number().optional(),
}).refine((data) => {
    if (data.type === "expense") {
        return !!data.sourceAccountId;
    }
    if (data.type === "income") {
        return !!data.destinationAccountId;
    }
    if (data.type === "credit_payment") {
        return !!data.creditCardId;
    }
    return true;
}, {
    message: "Por favor selecciona una cuenta o tarjeta según el tipo de transacción",
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface NewTransactionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        type: TransactionType;
        amount: number;
        description: string;
        date: string;
        category?: string;
        sourceAccountId?: number;
        destinationAccountId?: number;
        creditCardId?: number;
    }) => void;
}

const NewTransactionForm = ({ isOpen, onClose, onSubmit }: NewTransactionFormProps) => {
    const { accounts } = useAccounts();
    const { creditCards, updateCardDebt } = useCreditCards();
    const { toast } = useToast();

    const form = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type: "expense" as TransactionType,
            amount: 0,
            description: "",
            date: new Date().toISOString().split("T")[0],
            category: "",
            sourceAccountId: undefined,
            destinationAccountId: undefined,
            creditCardId: undefined,
        },
    });

    const handleSubmit = (data: TransactionFormData) => {
        try {
            if (data.type === "credit_payment" && data.creditCardId) {
                updateCardDebt(data.creditCardId, data.amount);
            }
            onSubmit(data);
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Hubo un error al procesar la transacción",
            });
        }
    };

    const transactionType = form.watch("type");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva Transacción</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <CommonFields form={form} />

                        {transactionType === "expense" && (
                            <ExpenseFields form={form} accounts={accounts} />
                        )}

                        {transactionType === "income" && (
                            <IncomeFields form={form} accounts={accounts} />
                        )}

                        {transactionType === "credit_payment" && (
                            <CreditPaymentFields form={form} creditCards={creditCards} />
                        )}

                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit">Guardar</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default NewTransactionForm;