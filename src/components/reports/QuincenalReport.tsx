import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useAccounts } from "../../hooks/useAccounts";
import { useTransactions } from "../../hooks/useTransactions";
import { useCreditCards } from "../../hooks/useCreditCards";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileDown } from "lucide-react";
import { Button } from "../..//components/ui/button";
import { useToast } from "../../components/ui/use-toast";

const QuinceReport = () => {
    const { accounts, getTotalBalance } = useAccounts();
    const { transactions } = useTransactions();
    const { creditCards } = useCreditCards();
    const { toast } = useToast();

    const totalBalance = getTotalBalance();
    const totalDebt = creditCards.reduce((sum, card) => sum + card.debt, 0);

    // Calcular ingresos y gastos
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    // Datos para la gráfica
    const chartData = [
        { name: "Ingresos", amount: income },
        { name: "Gastos", amount: expenses },
        { name: "Deuda", amount: totalDebt },
    ];

    const handleExport = () => {
        toast({
            title: "Reporte exportado",
            description: "El reporte ha sido exportado exitosamente.",
        });
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Reporte Quincenal</h1>
                    <p className="text-muted-foreground">
                        {format(new Date(), "PPP", { locale: es })}
                    </p>
                </div>
                <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    Exportar Reporte
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Balance Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-600">
                            ${totalBalance.toLocaleString("es-ES")}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Ingresos Quincenales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-blue-600">
                            ${income.toLocaleString("es-ES")}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Gastos Quincenales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-red-600">
                            ${expenses.toLocaleString("es-ES")}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Resumen de Cuentas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {accounts.map((account) => (
                            <div key={account.id} className="flex justify-between items-center">
                                <span>{account.name}</span>
                                <span className="font-medium">
                                    ${account.balance.toLocaleString("es-ES")}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tarjetas de Crédito</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {creditCards.map((card) => (
                            <div key={card.id} className="flex justify-between items-center">
                                <span>{card.name}</span>
                                <span className="font-medium text-red-600">
                                    ${card.debt.toLocaleString("es-ES")}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Gráfica de Movimientos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#0284c7" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuinceReport;