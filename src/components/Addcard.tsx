import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "../components/ui/use-toast";

interface AddcardProps {
    onAddExpense: (expense: {
        description: string;
        amount: number;
        category: string;
    }) => void;
}

const Addcard = ({ onAddExpense }: AddcardProps) => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !category) {
            toast({
                title: "Error",
                description: "Por favor completa todos los campos",
                variant: "destructive",
            });
            return;
        }

        onAddExpense({
            description,
            amount: parseFloat(amount),
            category,
        });

        setDescription("");
        setAmount("");
        setCategory("");
        setOpen(false);

        toast({
            title: "Gasto agregado",
            description: "El gasto ha sido registrado exitosamente",
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[rgb(13,40,71)] hover:bg-[rgb(29,71,118)]">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Gasto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Gasto</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ej: Compras supermercado"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Monto</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Input
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Ej: Alimentación"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[rgb(13,40,71)] hover:bg-[rgb(29,71,118)]">
                        Guardar Gasto
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Addcard;
