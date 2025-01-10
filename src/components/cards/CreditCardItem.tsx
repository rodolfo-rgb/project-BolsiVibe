import { Button } from "../ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface CreditCard {
    id: number;
    name: string;
    debt: number;
    institution?: string;
    type?: string;
    expiryDate?: string;
    cutoffDate?: string;
}

interface CreditCardItemProps {
    card: CreditCard;
    showAmounts: boolean;
    onEdit: (card: CreditCard) => void;
    onDelete: (card: CreditCard) => void;
}

const CreditCardItem = ({
    card,
    showAmounts,
    onEdit,
    onDelete,
}: CreditCardItemProps) => {
    return (
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div className="space-y-1">
                <p className="font-medium">{card.name}</p>
                {card.institution && (
                    <p className="text-sm text-muted-foreground">{card.institution}</p>
                )}
            </div>
            <div className="flex items-center gap-4">
                <span className="text-lg text-destructive">
                    {showAmounts ? `$${card.debt.toLocaleString("es-ES")}` : "••••••"}
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(card)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDelete(card)}
                        >
                            <Trash className="h-4 w-4 mr-2" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default CreditCardItem;