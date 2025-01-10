import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, CreditCard, Eye, EyeOff } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import NewCreditCardForm from "./NewCreditCardForm";
import CardsDialog from "./cards/CardsDialog";
import DeleteCardDialog from "./cards/DeleteCardDialog";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creditCards, setCreditCards] = useState<CreditCard[]>([
    {
      id: 1,
      name: "Visa Clásica",
      debt: 2500,
      type: "visa",
      institution: "Banco Nacional",
      expiryDate: "12/25",
      cutoffDate: "15"
    },
    {
      id: 2,
      name: "Mastercard Gold",
      debt: 1800,
      type: "mastercard",
      institution: "Banco Internacional",
      expiryDate: "06/26",
      cutoffDate: "20"
    },
    {
      id: 3,
      name: "American Express",
      debt: 3200,
      type: "american-express",
      institution: "American Express",
      expiryDate: "09/24",
      cutoffDate: "25"
    },
  ]);
  const [isNewCardFormOpen, setIsNewCardFormOpen] = useState(false);
  const [isCardsDialogOpen, setIsCardsDialogOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<CreditCard | null>(null);
  const [cardToDelete, setCardToDelete] = useState<CreditCard | null>(null);
  const [showAmounts, setShowAmounts] = useState(true);

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
    setCreditCards((prev) => [...prev, newCard]);
    setIsNewCardFormOpen(false);
    toast({
      title: "Tarjeta agregada",
      description: `La tarjeta ${data.name} ha sido agregada exitosamente.`,
    });
  };

  const handleEditCard = (data: {
    institution: string;
    name: string;
    type: string;
    expiryDate: string;
    cutoffDate: string;
  }) => {
    if (cardToEdit) {
      setCreditCards((prev) =>
        prev.map((card) =>
          card.id === cardToEdit.id
            ? {
              ...card,
              name: data.name,
              institution: data.institution,
              type: data.type,
              expiryDate: data.expiryDate,
              cutoffDate: data.cutoffDate,
            }
            : card
        )
      );
      toast({
        title: "Tarjeta actualizada",
        description: `La tarjeta ${data.name} ha sido actualizada exitosamente.`,
      });
      setCardToEdit(null);
      setIsNewCardFormOpen(false);
    }
  };

  const handleDeleteCard = () => {
    if (cardToDelete) {
      setCreditCards((prev) =>
        prev.filter((card) => card.id !== cardToDelete.id)
      );
      toast({
        title: "Tarjeta eliminada",
        description: `La tarjeta ${cardToDelete.name} ha sido eliminada exitosamente.`,
        variant: "destructive",
      });
      setCardToDelete(null);
    }
  };

  const handleCloseDialogs = () => {
    setIsCardsDialogOpen(false);
    setCardToEdit(null);
    setCardToDelete(null);
    setIsNewCardFormOpen(false);
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Mis Tarjetas de Crédito
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowAmounts(!showAmounts)}
            >
              {showAmounts ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button className="gap-2" onClick={() => setIsNewCardFormOpen(true)}>
              <Plus className="h-4 w-4" />
              Nueva Tarjeta
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => navigate(`/credit-card/${card.id}`)}
              >
                <span className="font-medium">{card.name}</span>
                <span className="text-lg text-destructive">
                  {showAmounts
                    ? `$${card.debt.toLocaleString("es-ES")}`
                    : "••••••"}
                </span>
              </div>
            ))}
            <div
              className="flex items-center justify-between pt-4 mt-4 border-t cursor-pointer hover:opacity-80"
              onClick={() => setIsCardsDialogOpen(true)}
            >
              <span className="font-semibold">Deuda Total</span>
              <span className="text-xl font-bold text-destructive">
                {showAmounts
                  ? `$${totalDebt.toLocaleString("es-ES")}`
                  : "••••••"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <CardsDialog
        isOpen={isCardsDialogOpen}
        cards={creditCards}
        showAmounts={showAmounts}
        onClose={handleCloseDialogs}
        onEdit={(card) => {
          setCardToEdit(card);
          setIsNewCardFormOpen(true);
          setIsCardsDialogOpen(false);
        }}
        onDelete={(card) => setCardToDelete(card)}
      />

      <NewCreditCardForm
        isOpen={isNewCardFormOpen}
        onClose={() => {
          setIsNewCardFormOpen(false);
          setCardToEdit(null);
        }}
        onSubmit={cardToEdit ? handleEditCard : handleAddCard}
        initialValues={cardToEdit || undefined}
      />

      <DeleteCardDialog
        isOpen={cardToDelete !== null}
        card={cardToDelete}
        onClose={() => setCardToDelete(null)}
        onConfirm={handleDeleteCard}
      />
    </>
  );
};

export default CreditCardsPanel;
