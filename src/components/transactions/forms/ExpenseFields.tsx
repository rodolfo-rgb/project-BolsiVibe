import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Account } from "../../../types/accounts";
import { UseFormReturn } from "react-hook-form";
import { useCreditCards } from "../../../hooks/useCreditCards";

interface ExpenseFieldsProps {
    form: UseFormReturn<any>;
    accounts: Account[];
}

const ExpenseFields = ({ form, accounts }: ExpenseFieldsProps) => {
    const { creditCards } = useCreditCards();


    const handleSourceChange = (value: string) => {
        const [type, id] = value.split(':');
        if (type === 'account') {
            form.setValue('account_id', id);
            form.setValue('credit_card_id', undefined);
        } else {
            form.setValue('credit_card_id', id);
            form.setValue('account_id', undefined);
        }
    };

    const getCurrentValue = () => {
        const accountId = form.watch('account_id');
        const creditCardId = form.watch('credit_card_id');
        if (accountId) return `account:${accountId}`;
        if (creditCardId) return `credit_card:${creditCardId}`;
        return undefined;
    };

    return (
        <FormField
            control={form.control}
            name="source"
            render={() => (
                <FormItem>
                    <FormLabel>Cuenta o Tarjeta Origen</FormLabel>
                    <Select
                        onValueChange={handleSourceChange}
                        value={getCurrentValue()}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona la cuenta o tarjeta origen" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {accounts.length > 0 && (
                                <>
                                    <SelectItem value="accounts_header" disabled className="font-semibold">
                                        Cuentas
                                    </SelectItem>
                                    {accounts.map((account) => (
                                        <SelectItem key={account.id} value={`account:${account.id}`}>
                                            {account.name}
                                        </SelectItem>
                                    ))}
                                </>
                            )}
                            {creditCards.length > 0 && (
                                <>
                                    <SelectItem value="cards_header" disabled className="font-semibold">
                                        Tarjetas de Crédito
                                    </SelectItem>
                                    {creditCards.map((card) => (
                                        <SelectItem key={card.id} value={`credit_card:${card.id}`}>
                                            {card.name} (Disponible: $
                                            {(card.limit_amount - (card.current_balance ?? 0)).toLocaleString("es-ES")})
                                        </SelectItem>
                                    ))}
                                </>
                            )}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ExpenseFields;