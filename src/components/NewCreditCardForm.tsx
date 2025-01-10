import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "../hooks/use-toast";

interface NewCreditCardFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    institution: string;
    name: string;
    type: string;
    expiryDate: string;
    cutoffDate: string;
  }) => void;
  initialValues?: {
    institution?: string;
    name: string;
    type?: string;
    expiryDate?: string;
    cutoffDate?: string;
  };
}

const NewCreditCardForm = ({ isOpen, onClose, onSubmit, initialValues }: NewCreditCardFormProps) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      institution: "",
      name: "",
      type: "",
      expiryDate: "",
      cutoffDate: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = (data: {
    institution: string;
    name: string;
    type: string;
    expiryDate: string;
    cutoffDate: string;
  }) => {
    if (!data.institution || !data.name || !data.type || !data.expiryDate || !data.cutoffDate) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const formattedData = {
      ...data,
      expiryDate: data.expiryDate ? formatExpiryDate(data.expiryDate) : "",
    };
    onSubmit(formattedData);
    form.reset();
    onClose();
  };

  const formatExpiryDate = (date: string) => {
    const [year, month] = date.split("-");
    return `${month}/${year.slice(2)}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{initialValues ? "Editar Tarjeta" : "Nueva Tarjeta de Crédito"}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institución</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Banco XYZ" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Tarjeta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Tarjeta Oro" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Tarjeta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">Mastercard</SelectItem>
                      <SelectItem value="amex">American Express</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Vencimiento</FormLabel>
                  <FormControl>
                    <Input
                      type="month"
                      {...field}
                      placeholder="MM/YY"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cutoffDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Corte</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {initialValues ? "Guardar Cambios" : "Agregar Tarjeta"}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default NewCreditCardForm;
