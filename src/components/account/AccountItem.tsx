import { Button } from "../ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Account {
    id: number;
    name: string;
    balance: number;
}

interface AccountItemProps {
    account: Account;
    showAmounts?: boolean;
    onEdit: (account: Account) => void;
    onDelete: (account: Account) => void;
}

const AccountItem = ({ account, onEdit, onDelete }: AccountItemProps) => {
    return (
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
                <span className="font-medium">{account.name}</span>
                <p className="text-sm text-muted-foreground">
                    ${account.balance.toLocaleString("es-ES")}
                </p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(account)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(account)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default AccountItem;