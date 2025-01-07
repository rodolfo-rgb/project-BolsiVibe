import { useState } from "react";
import { useForm } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface NewAccountFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; balance: number }) => void;
}

const NewAccountForm = ({ isOpen, onClose, onSubmit }: NewAccountFormProps) => {
  const form = useForm({
    defaultValues: {
      name: "",
      balance: 0,
    },
  });

  const handleSubmit = (data: { name: string; balance: number }) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nueva Cuenta</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Cuenta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Cuenta de Ahorros" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Saldo Inicial</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Crear Cuenta
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default NewAccountForm;