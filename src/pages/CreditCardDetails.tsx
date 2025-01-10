import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard as CreditCardIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

interface CreditCardDisplayProps {
    type: string;
    expiryDate: string;
}

const CreditCardDisplay = ({ type, expiryDate }: CreditCardDisplayProps) => (
    <div className="w-96 h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 m-4">
            {type === "visa" && (
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 11.5V12.5C22 16.9183 18.4183 20.5 14 20.5H10C5.58172 20.5 2 16.9183 2 12.5V11.5C2 7.08172 5.58172 3.5 10 3.5H14C18.4183 3.5 22 7.08172 22 11.5Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 15L12 7L17 15" stroke="currentColor" strokeWidth="2" />
                </svg>
            )}
            {type === "mastercard" && (
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="12" r="7" fill="#EB001B" fillOpacity="0.8" />
                    <circle cx="15" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8" />
                </svg>
            )}
            {type === "american-express" && (
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M7 12H17" stroke="currentColor" strokeWidth="2" />
                </svg>
            )}
        </div>
        <div className="mt-16">
            <div className="text-xl tracking-widest">XXXX XXXX XXXX XXXX</div>
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <div className="text-xs">VÁLIDA HASTA</div>
                    <div>{expiryDate}</div>
                </div>
            </div>
        </div>
    </div>
);

const CreditCardDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isAdjusting, setIsAdjusting] = useState(false);
    const [newDebt, setNewDebt] = useState("0");

    // Mock data - en una implementación real vendría de un estado global o base de datos
    const card = {
        id: Number(id),
        name: "Visa Clásica",
        debt: 2500,
        type: "visa",
        institution: "Banco Nacional",
        expiryDate: "12/25",
        cutoffDate: "15",
        expenses: 1500,
        income: 4000,
        transactions: 12
    };

    const handleDebtAdjust = () => {
        if (isAdjusting) {
            // Aquí iría la lógica para actualizar el saldo
            toast({
                title: "Saldo actualizado",
                description: "El saldo de la tarjeta ha sido actualizado exitosamente.",
            });
        }
        setIsAdjusting(!isAdjusting);
    };

    if (!card) {
        return (
            <div className="p-6">
                <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
                    <ArrowLeft className="mr-2" />
                    Volver al Dashboard
                </Button>
                <p>Tarjeta no encontrada</p>
            </div>
        );
    }

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
                            <span>{card.name}</span>
                            <Button
                                variant={isAdjusting ? "default" : "outline"}
                                onClick={handleDebtAdjust}
                            >
                                {isAdjusting ? "Guardar" : "Reajustar"}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-center">
                            <CreditCardDisplay type={card.type} expiryDate={card.expiryDate} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                            {isAdjusting ? (
                                <Input
                                    type="number"
                                    value={newDebt}
                                    onChange={(e) => setNewDebt(e.target.value)}
                                    className="max-w-[200px]"
                                />
                            ) : (
                                <span className="text-2xl font-bold">
                                    ${card.debt.toLocaleString("es-ES")}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de la Tarjeta</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <dl className="space-y-2">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Institución</dt>
                                    <dd className="font-medium">{card.institution}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Tipo de Tarjeta</dt>
                                    <dd className="font-medium capitalize">{card.type}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Fecha de Corte</dt>
                                    <dd className="font-medium">Día {card.cutoffDate}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Transacciones</dt>
                                    <dd className="font-medium">{card.transactions}</dd>
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
                                    <span className="text-muted-foreground">Gastos</span>
                                    <span className="font-medium text-destructive">
                                        ${card.expenses.toLocaleString("es-ES")}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Pagos</span>
                                    <span className="font-medium text-green-600">
                                        ${card.income.toLocaleString("es-ES")}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <span className="font-medium">Total Transacciones</span>
                                    <span className="font-medium">{card.transactions}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreditCardDetails;