import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, DollarSign, BarChart2, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAccounts } from "../hooks/useAccounts";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

const AccountDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { accounts, editAccount } = useAccounts();
    const { toast } = useToast();
    const account = accounts.find((acc) => acc.id === Number(id));
    const [isAdjusting, setIsAdjusting] = useState(false);
    const [newBalance, setNewBalance] = useState(account?.balance.toString() || "0");

    if (!account) {
        return (
            <div className="p-6">
                <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
                    <ArrowLeft className="mr-2" />
                    Volver al Dashboard
                </Button>
                <p>Cuenta no encontrada</p>
            </div>
        );
    }

    const handleBalanceAdjust = () => {
        if (isAdjusting) {
            editAccount(account.id, {
                name: account.name,
                balance: Number(newBalance),
            });
            toast({
                title: "Saldo actualizado",
                description: "El saldo de la cuenta ha sido actualizado exitosamente.",
            });
        }
        setIsAdjusting(!isAdjusting);
    };

    // Datos de ejemplo - en una implementación real vendrían de la base de datos
    const accountStats = {
        expenses: 2500,
        income: 5000,
        transactions: 15,
        type: "Cuenta Corriente",
    };

    return (
        <div className="p-6">
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
                <ArrowLeft className="mr-2" />
                Volver al Dashboard
            </Button>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>{account.name}</span>
                            <Button
                                variant={isAdjusting ? "default" : "outline"}
                                onClick={handleBalanceAdjust}
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                {isAdjusting ? "Guardar" : "Reajustar"}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                            {isAdjusting ? (
                                <Input
                                    type="number"
                                    value={newBalance}
                                    onChange={(e) => setNewBalance(e.target.value)}
                                    className="max-w-[200px]"
                                />
                            ) : (
                                <span className="text-2xl font-bold">
                                    ${account.balance.toLocaleString("es-ES")}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de la Cuenta</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="space-y-2">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Tipo de Cuenta</dt>
                                    <dd className="font-medium">{accountStats.type}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Transacciones</dt>
                                    <dd className="font-medium">{accountStats.transactions}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Movimientos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <BarChart2 className="h-4 w-4 text-green-500" />
                                        <span className="text-muted-foreground">Ingresos</span>
                                    </div>
                                    <span className="font-medium text-green-600">
                                        ${accountStats.income.toLocaleString("es-ES")}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <BarChart2 className="h-4 w-4 text-red-500" />
                                        <span className="text-muted-foreground">Gastos</span>
                                    </div>
                                    <span className="font-medium text-red-600">
                                        ${accountStats.expenses.toLocaleString("es-ES")}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;