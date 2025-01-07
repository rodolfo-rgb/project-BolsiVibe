import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import NewAccountForm from "./NewAccountForm";

interface Account {
  id: number;
  name: string;
  balance: number;
}

const AccountsPanel = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: "Cuenta Principal", balance: 5000 },
    { id: 2, name: "Cuenta de Ahorros", balance: 10000 },
    { id: 3, name: "Cuenta de Inversiones", balance: 15000 },
  ]);
  const [isNewAccountFormOpen, setIsNewAccountFormOpen] = useState(false);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const handleAddAccount = (data: { name: string; balance: number }) => {
    const newAccount: Account = {
      id: accounts.length + 1,
      name: data.name,
      balance: data.balance,
    };
    setAccounts([...accounts, newAccount]);
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mis Cuentas</CardTitle>
          <Button className="gap-2" onClick={() => setIsNewAccountFormOpen(true)}>
            <Plus className="h-4 w-4" />
            Nueva Cuenta
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 bg-secondary rounded-lg"
              >
                <span className="font-medium">{account.name}</span>
                <span className="text-lg">
                  ${account.balance.toLocaleString("es-ES")}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-4 mt-4 border-t">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">
                ${totalBalance.toLocaleString("es-ES")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <NewAccountForm
        isOpen={isNewAccountFormOpen}
        onClose={() => setIsNewAccountFormOpen(false)}
        onSubmit={handleAddAccount}
      />
    </>
  );
};

export default AccountsPanel;