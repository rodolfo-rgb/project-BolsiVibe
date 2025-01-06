import { Button } from "../components/ui/button";

interface TransactionFilterProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export const TransactionFilter = ({ activeFilter, onFilterChange }: TransactionFilterProps) => {
    return (
        <div className="flex gap-2 mb-6">
            <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => onFilterChange("all")}
            >
                Todas las transacciones
            </Button>
            <Button
                variant={activeFilter === "transfers" ? "default" : "outline"}
                onClick={() => onFilterChange("transfers")}
            >
                Transferencias
            </Button>
            <Button
                variant={activeFilter === "credit" ? "default" : "outline"}
                onClick={() => onFilterChange("credit")}
            >
                Pagos de crédito
            </Button>

            {/* Botón de Agregar Transferencia desplazado a la derecha */}
            <Button
                variant="default"
                className="ml-auto"  // Aplica margen a la izquierda para desplazar el botón
            >
                Agregar Transferencia
            </Button>
        </div>
    );
};
