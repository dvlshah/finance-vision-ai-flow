
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AddTransactionForm } from '@/components/forms/AddTransactionForm';
import { BudgetForm } from '@/components/forms/BudgetForm';
import { ReceiptScanner } from '@/components/forms/ReceiptScanner';

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
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
