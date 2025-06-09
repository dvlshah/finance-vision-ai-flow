
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  confidence: number;
  reason?: string;
  account?: string;
  merchant?: string;
}

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSave: (id: string, updatedTransaction: Partial<Transaction>) => void;
}

export const EditTransactionModal = ({ isOpen, onClose, transaction, onSave }: EditTransactionModalProps) => {
  const [description, setDescription] = useState(transaction?.description || '');
  const [amount, setAmount] = useState(Math.abs(transaction?.amount || 0).toString());
  const [category, setCategory] = useState(transaction?.category || '');
  const [merchant, setMerchant] = useState(transaction?.merchant || '');
  const [account, setAccount] = useState(transaction?.account || '');
  const [date, setDate] = useState(transaction ? new Date(transaction.date) : new Date());
  const [isExpense, setIsExpense] = useState((transaction?.amount || 0) < 0);

  const categories = [
    'Food', 'Income', 'Entertainment', 'Transportation', 'Shopping', 
    'Housing', 'Utilities', 'Healthcare', 'Education', 'Travel', 'Other'
  ];

  const accounts = [
    'Chase Checking', 'Credit Card', 'Savings Account', 'Investment Account'
  ];

  const handleSave = () => {
    if (!transaction) return;

    const updatedTransaction = {
      description,
      amount: isExpense ? -parseFloat(amount) : parseFloat(amount),
      category,
      merchant,
      account,
      date: date.toISOString().split('T')[0],
      confidence: 100,
      reason: 'Manually edited by user'
    };

    onSave(transaction.id, updatedTransaction);
    onClose();
  };

  // Reset form when modal opens with new transaction
  useState(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(Math.abs(transaction.amount).toString());
      setCategory(transaction.category);
      setMerchant(transaction.merchant || '');
      setAccount(transaction.account || '');
      setDate(new Date(transaction.date));
      setIsExpense(transaction.amount < 0);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={isExpense ? 'default' : 'outline'}
              onClick={() => setIsExpense(true)}
              size="sm"
            >
              Expense
            </Button>
            <Button
              type="button"
              variant={!isExpense ? 'default' : 'outline'}
              onClick={() => setIsExpense(false)}
              size="sm"
            >
              Income
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Transaction description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="merchant">Merchant</Label>
            <Input
              id="merchant"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="Merchant name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account">Account</Label>
            <Select value={account} onValueChange={setAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acc) => (
                  <SelectItem key={acc} value={acc}>
                    {acc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
