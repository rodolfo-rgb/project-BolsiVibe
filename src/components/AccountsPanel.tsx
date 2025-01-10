import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useAccounts } from "../hooks/useAccounts";
import NewAccountForm from "./NewAccountForm";
import AccountsDialog from "./account/AccountsDialog";
import AccountsList from "./account/AccountsList";
import { useToast } from "./ui/use-toast";

interface Account {
  id: number;
  name: string;
  balance: number;
}

const AccountsPanel = () => {
  const { accounts, addAccount, editAccount, deleteAccount } = useAccounts();
  const { toast } = useToast();
  const [isNewAccountFormOpen, setIsNewAccountFormOpen] = useState(false);
  const [isAccountsDialogOpen, setIsAccountsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleAddAccount = (data: { name: string; balance: number }) => {
    const newAccount = addAccount(data);
    setIsNewAccountFormOpen(false);
    toast({
      title: "Cuenta creada",
      description: `La cuenta ${newAccount.name} ha sido creada exitosamente.`,
    });
  };

  const handleEditAccount = (data: { name: string; balance: number }) => {
    if (selectedAccount) {
      editAccount(selectedAccount.id, data);
      setIsEditFormOpen(false);
      setSelectedAccount(null);
      toast({
        title: "Cuenta actualizada",
        description: `La cuenta ${data.name} ha sido actualizada exitosamente.`,
      });
    }
  };

  const handleDeleteAccount = (account: Account) => {
    deleteAccount(account.id);
    setIsAccountsDialogOpen(false);
    setSelectedAccount(null);
    toast({
      title: "Cuenta eliminada",
      description: `La cuenta ${account.name} ha sido eliminada exitosamente.`,
      variant: "destructive",
    });
  };

  const handleCloseDialogs = () => {
    setIsAccountsDialogOpen(false);
    setIsEditFormOpen(false);
    setSelectedAccount(null);
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
          <AccountsList
            accounts={accounts}
            onAccountClick={() => setIsAccountsDialogOpen(true)}
          />
        </CardContent>
      </Card>

      <NewAccountForm
        isOpen={isNewAccountFormOpen}
        onClose={() => setIsNewAccountFormOpen(false)}
        onSubmit={handleAddAccount}
      />

      <AccountsDialog
        isOpen={isAccountsDialogOpen}
        accounts={accounts}
        onClose={handleCloseDialogs}
        onEdit={(account) => {
          setSelectedAccount(account);
          setIsEditFormOpen(true);
          setIsAccountsDialogOpen(false);
        }}
        onDelete={handleDeleteAccount}
      />

      <NewAccountForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setSelectedAccount(null);
        }}
        onSubmit={handleEditAccount}
        initialValues={selectedAccount || undefined}
      />
    </>
  );
};

export default AccountsPanel;