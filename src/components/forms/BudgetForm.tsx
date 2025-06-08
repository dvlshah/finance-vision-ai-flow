
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';

interface BudgetFormProps {
  onSubmit: (budget: any) => void;
  onCancel: () => void;
}

export const BudgetForm = ({ onSubmit, onCancel }: BudgetFormProps) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('monthly');

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Healthcare', 'Travel', 'Education'
  ];

  const currentSpending = {
    'Food & Dining': 450,
    'Transportation': 200,
    'Shopping': 300,
    'Entertainment': 150,
    'Bills & Utilities': 800,
    'Healthcare': 100,
    'Travel': 200,
    'Education': 50
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount) return;

    onSubmit({
      category,
      amount: parseFloat(amount),
      period,
      currentSpending: currentSpending[category as keyof typeof currentSpending] || 0
    });

    setCategory('');
    setAmount('');
    setPeriod('monthly');
  };

  const selectedCategorySpending = category ? currentSpending[category as keyof typeof currentSpending] || 0 : 0;
  const budgetAmount = parseFloat(amount) || 0;
  const usagePercentage = budgetAmount > 0 ? (selectedCategorySpending / budgetAmount) * 100 : 0;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target size={20} />
          Set Budget
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    <div className="flex items-center justify-between w-full">
                      <span>{cat}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ${currentSpending[cat as keyof typeof currentSpending] || 0}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Budget Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg font-mono"
            />
          </div>

          {category && budgetAmount > 0 && (
            <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Current Spending</span>
                <span className="font-medium">${selectedCategorySpending}</span>
              </div>
              <Progress value={Math.min(usagePercentage, 100)} className="h-2" />
              <div className="flex items-center gap-2 text-sm">
                {usagePercentage > 100 ? (
                  <>
                    <AlertCircle size={16} className="text-red-500" />
                    <span className="text-red-600">Over budget by ${(selectedCategorySpending - budgetAmount).toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="text-green-600">${(budgetAmount - selectedCategorySpending).toFixed(2)} remaining</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="w-full">
              Cancel
            </Button>
            <Button type="submit" className="w-full">
              Set Budget
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
