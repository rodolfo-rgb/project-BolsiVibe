import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import CreditCardItem from "./CreditCardItem";

interface CreditCard {
    id: number;
    name: string;
    debt: number;
    institution?: string;
    type?: string;
    expiryDate?: string;
    cutoffDate?: string;
}

interface CardsDialogProps {
    isOpen: boolean;
    cards: CreditCard[];
    showAmounts: boolean;
    onClose: () => void;
    onEdit: (card: CreditCard) => void;
    onDelete: (card: CreditCard) => void;
}

const CardsDialog = ({
    isOpen,
    cards,
    showAmounts,
    onClose,
    onEdit,
    onDelete,
}: CardsDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Todas mis Tarjetas</DialogTitle>
                    <DialogDescription>
                        Gestiona tus tarjetas de crédito
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    {cards.map((card) => (
                        <CreditCardItem
                            key={card.id}
                            card={card}
                            showAmounts={showAmounts}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CardsDialog;