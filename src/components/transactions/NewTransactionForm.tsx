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

    const form = useForm({
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

    const handleSubmit = (data: any) => {
        if (data.type === "credit_payment" && data.creditCardId) {
            updateCardDebt(data.creditCardId, data.amount);
        }
        onSubmit(data);
        form.reset();
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