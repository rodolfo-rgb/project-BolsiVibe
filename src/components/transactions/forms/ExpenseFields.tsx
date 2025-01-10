import { FormField, FormItem, FormLabel, FormControl } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Account } from "../../../types/accounts";
import { UseFormReturn } from "react-hook-form";

interface ExpenseFieldsProps {
    form: UseFormReturn<any>;
    accounts: Account[];
}

const ExpenseFields = ({ form, accounts }: ExpenseFieldsProps) => {
    return (
        <FormField
            control={form.control}
            name="sourceAccountId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Cuenta Origen</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona la cuenta origen" />
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

export default ExpenseFields;