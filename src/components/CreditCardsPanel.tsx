import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, CreditCard } from "lucide-react";
import NewCreditCardForm from "./NewCreditCardForm";

interface CreditCard {
  id: number;
  name: string;
  debt: number;
  institution?: string;
  type?: string;
  expiryDate?: string;
  cutoffDate?: string;
}

const CreditCardsPanel = () => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>([
    { id: 1, name: "Visa Clásica", debt: 2500 },
    { id: 2, name: "Mastercard Gold", debt: 1800 },
    { id: 3, name: "American Express", debt: 3200 },
  ]);
  const [isNewCardFormOpen, setIsNewCardFormOpen] = useState(false);

  const totalDebt = creditCards.reduce((sum, card) => sum + card.debt, 0);

  const handleAddCard = (data: {
    institution: string;
    name: string;
    type: string;
    expiryDate: string;
    cutoffDate: string;
  }) => {
    const newCard: CreditCard = {
      id: creditCards.length + 1,
      name: data.name,
      debt: 0,
      institution: data.institution,
      type: data.type,
      expiryDate: data.expiryDate,
      cutoffDate: data.cutoffDate,
    };
    setCreditCards([...creditCards, newCard]);
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Mis Tarjetas de Crédito
          </CardTitle>
          <Button className="gap-2" onClick={() => setIsNewCardFormOpen(true)}>
            <Plus className="h-4 w-4" />
            Nueva Tarjeta
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg"
              >
                <span className="font-medium">{card.name}</span>
                <span className="text-lg text-destructive">
                  ${card.debt.toLocaleString("es-ES")}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4 mt-4 border-t">
              <span className="font-semibold">Deuda Total</span>
              <span className="text-xl font-bold text-destructive">
                ${totalDebt.toLocaleString("es-ES")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <NewCreditCardForm
        isOpen={isNewCardFormOpen}
        onClose={() => setIsNewCardFormOpen(false)}
        onSubmit={handleAddCard}
      />
    </>
  );
};

export default CreditCardsPanel;