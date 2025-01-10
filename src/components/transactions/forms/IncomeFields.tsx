import { FormField, FormItem, FormLabel, FormControl } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Account } from "../../../types/accounts";
import { UseFormReturn } from "react-hook-form";

interface IncomeFieldsProps {
    form: UseFormReturn<any>;
    accounts: Account[];
}

const IncomeFields = ({ form, accounts }: IncomeFieldsProps) => {
    return (
        <FormField
            control={form.control}
            name="destinationAccountId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Cuenta Destino</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona la cuenta destino" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {accounts.map((account) => (
                                <SelectItem key={account.id} value={account.id.toString()}>
                                    {account.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    );
};

export default IncomeFields;