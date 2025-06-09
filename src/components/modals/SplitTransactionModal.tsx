
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Minus } from 'lucide-react';

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

interface SplitItem {
  description: string;
  amount: number;
  category: string;
}

interface SplitTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSplit: (id: string, splits: SplitItem[]) => void;
}

export const SplitTransactionModal = ({ isOpen, onClose, transaction, onSplit }: SplitTransactionModalProps) => {
  const [splits, setSplits] = useState<SplitItem[]>([
    { description: '', amount: 0, category: '' },
    { description: '', amount: 0, category: '' }
  ]);

  const categories = [
    'Food', 'Entertainment', 'Transportation', 'Shopping', 
    'Housing', 'Utilities', 'Healthcare', 'Education', 'Travel', 'Other'
  ];

  const totalSplitAmount = splits.reduce((sum, split) => sum + split.amount, 0);
  const originalAmount = Math.abs(transaction?.amount || 0);
  const remaining = originalAmount - totalSplitAmount;

  const addSplit = () => {
    setSplits([...splits, { description: '', amount: 0, category: '' }]);
  };

  const removeSplit = (index: number) => {
    if (splits.length > 2) {
      setSplits(splits.filter((_, i) => i !== index));
    }
  };

  const updateSplit = (index: number, field: keyof SplitItem, value: string | number) => {
    const newSplits = [...splits];
    newSplits[index] = { ...newSplits[index], [field]: value };
    setSplits(newSplits);
  };

  const handleSplit = () => {
    if (!transaction || Math.abs(remaining) > 0.01) return;
    
    const validSplits = splits.filter(split => 
      split.description.trim() && split.amount > 0 && split.category
    );
    
    if (validSplits.length < 2) return;
    
    onSplit(transaction.id, validSplits);
    onClose();
  };

  const isValid = splits.every(split => 
    split.description.trim() && split.amount > 0 && split.category
  ) && Math.abs(remaining) <= 0.01;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Split Transaction</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg">
            <h4 className="font-medium text-sm text-slate-700 mb-1">Original Transaction</h4>
            <p className="text-sm text-slate-600">{transaction?.description}</p>
            <p className="font-semibold">${originalAmount.toFixed(2)}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Split Into:</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={addSplit}
                className="h-8 px-2"
              >
                <Plus size={14} className="mr-1" />
                Add Split
              </Button>
            </div>

            {splits.map((split, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Split {index + 1}
                  </span>
                  {splits.length > 2 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeSplit(index)}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Minus size={12} />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Description</Label>
                    <Input
                      value={split.description}
                      onChange={(e) => updateSplit(index, 'description', e.target.value)}
                      placeholder="What was this for?"
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Amount</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={split.amount || ''}
                      onChange={(e) => updateSplit(index, 'amount', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="h-8"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Category</Label>
                  <Select 
                    value={split.category} 
                    onValueChange={(value) => updateSplit(index, 'category', value)}
                  >
                    <SelectTrigger className="h-8">
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
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-3 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>Total Split:</span>
              <span className="font-medium">${totalSplitAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Remaining:</span>
              <span className={`font-medium ${Math.abs(remaining) > 0.01 ? 'text-red-600' : 'text-green-600'}`}>
                ${remaining.toFixed(2)}
              </span>
            </div>
          </div>

          {Math.abs(remaining) > 0.01 && (
            <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded">
              Split amounts must total exactly ${originalAmount.toFixed(2)}
            </p>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
            <Button 
              onClick={handleSplit} 
              className="w-full"
              disabled={!isValid}
            >
              Split Transaction
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
