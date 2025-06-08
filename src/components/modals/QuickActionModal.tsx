
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AddTransactionForm } from '@/components/forms/AddTransactionForm';
import { BudgetForm } from '@/components/forms/BudgetForm';
import { ReceiptScanner } from '@/components/forms/ReceiptScanner';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'transaction' | 'budget' | 'receipt' | null;
}

export const QuickActionModal = ({ isOpen, onClose, actionType }: QuickActionModalProps) => {
  const handleSubmit = (data: any) => {
    console.log('Quick action submitted:', data);
    // Here you would typically send to your backend/state management
    onClose();
  };

  const getTitle = () => {
    switch (actionType) {
      case 'transaction': return 'Add Transaction';
      case 'budget': return 'Set Budget';
      case 'receipt': return 'Scan Receipt';
      default: return 'Quick Action';
    }
  };

  const getDescription = () => {
    switch (actionType) {
      case 'transaction': return 'Add a new transaction to your financial records';
      case 'budget': return 'Set up a budget for expense tracking';
      case 'receipt': return 'Scan a receipt to automatically extract transaction details';
      default: return 'Perform a quick financial action';
    }
  };

  const renderContent = () => {
    switch (actionType) {
      case 'transaction':
        return <AddTransactionForm onSubmit={handleSubmit} onCancel={onClose} />;
      case 'budget':
        return <BudgetForm onSubmit={handleSubmit} onCancel={onClose} />;
      case 'receipt':
        return <ReceiptScanner onSubmit={handleSubmit} onCancel={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 max-w-md">
        <VisuallyHidden>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </VisuallyHidden>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
