import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { format } from "date-fns";

interface Expense {
    id: number;
    date: Date;
    description: string;
    amount: number;
    category: string;
}

interface ExpensesListProps {
    expenses: Expense[];
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        }).format(amount);
    };

    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell>{format(expense.date, "dd/MM/yyyy")}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ExpensesList;