
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface AddTransactionFormProps {
  onSubmit: (transaction: any) => void;
  onCancel: () => void;
}

// Mock AI category prediction
const predictCategory = (description: string): string | null => {
  const patterns = {
    'Food & Dining': ['starbucks', 'mcdonalds', 'pizza', 'restaurant', 'cafe', 'food', 'grocery', 'whole foods', 'safeway'],
    'Transportation': ['uber', 'lyft', 'gas', 'shell', 'chevron', 'taxi', 'metro', 'bus'],
    'Shopping': ['amazon', 'target', 'walmart', 'mall', 'store', 'shop'],
    'Entertainment': ['netflix', 'spotify', 'movie', 'theater', 'game', 'concert'],
    'Bills & Utilities': ['electric', 'water', 'internet', 'phone', 'utility', 'bill'],
    'Healthcare': ['doctor', 'pharmacy', 'hospital', 'medical', 'health'],
    'Travel': ['hotel', 'airline', 'flight', 'booking', 'airbnb'],
    'Education': ['school', 'university', 'course', 'book', 'tuition']
  };

  const lowerDesc = description.toLowerCase();
  
  for (const [category, keywords] of Object.entries(patterns)) {
    if (keywords.some(keyword => lowerDesc.includes(keyword))) {
      return category;
    }
  }
  
  return null;
};

export const AddTransactionForm = ({ onSubmit, onCancel }: AddTransactionFormProps) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState<Date>(new Date());
  const [showAiSuggestion, setShowAiSuggestion] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Healthcare', 'Travel', 'Education', 'Other'
  ];

  // AI category prediction on description change
  useEffect(() => {
    if (description.length > 3 && !category) {
      const predicted = predictCategory(description);
      if (predicted && predicted !== suggestedCategory) {
        setSuggestedCategory(predicted);
        setShowAiSuggestion(true);
      }
    } else {
      setShowAiSuggestion(false);
    }
  }, [description, category, suggestedCategory]);

  const acceptAiSuggestion = () => {
    if (suggestedCategory) {
      setCategory(suggestedCategory);
      setShowAiSuggestion(false);
    }
  };

  const dismissAiSuggestion = () => {
    setShowAiSuggestion(false);
    setSuggestedCategory(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !category) return;

    onSubmit({
      amount: parseFloat(amount),
      description,
      category,
      type,
      date: date.toISOString(),
      source: 'manual',
      confidence: 100
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setType('expense');
    setDate(new Date());
    setShowAiSuggestion(false);
    setSuggestedCategory(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus size={20} />
            Add Transaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={type === 'expense' ? 'default' : 'outline'}
                onClick={() => setType('expense')}
                className="w-full"
              >
                Expense
              </Button>
              <Button
                type="button"
                variant={type === 'income' ? 'default' : 'outline'}
                onClick={() => setType('income')}
                className="w-full"
              >
                Income
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
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

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What was this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              
              {/* AI Suggestion */}
              {showAiSuggestion && suggestedCategory && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <Sparkles size={16} className="text-blue-600" />
                  <span className="text-sm text-blue-700 flex-1">
                    Suggested category: <strong>{suggestedCategory}</strong>
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={acceptAiSuggestion}
                    className="h-6 px-2 text-blue-600 hover:bg-blue-100"
                  >
                    Accept
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={dismissAiSuggestion}
                    className="h-6 px-2 text-slate-500 hover:bg-slate-100"
                  >
                    ×
                  </Button>
                </motion.div>
              )}
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
              <Button type="button" variant="outline" onClick={onCancel} className="w-full">
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Add Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
