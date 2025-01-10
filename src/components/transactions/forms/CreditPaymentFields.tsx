import { FormField, FormItem, FormLabel, FormControl } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { UseFormReturn } from "react-hook-form";

interface CreditCard {
    id: number;
    name: string;
    debt: number;
}

interface CreditPaymentFieldsProps {
    form: UseFormReturn<any>;
    creditCards: CreditCard[];
}

const CreditPaymentFields = ({ form, creditCards }: CreditPaymentFieldsProps) => {
    return (
        <FormField
            control={form.control}
            name="creditCardId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Tarjeta a Pagar</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona la tarjeta" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {creditCards.map((card) => (
                                <SelectItem key={card.id} value={card.id.toString()}>
                                    {card.name} - Adeudo: ${card.debt.toLocaleString("es-ES")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
};

export default CreditPaymentFields;