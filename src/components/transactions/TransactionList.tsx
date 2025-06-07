
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Edit2, Check, X } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  confidence: number;
  isEditing?: boolean;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-06-05',
    description: 'Grocery Store Purchase',
    amount: -87.32,
    category: 'Food',
    confidence: 95
  },
  {
    id: '2',
    date: '2024-06-04',
    description: 'Salary Deposit',
    amount: 4250.00,
    category: 'Income',
    confidence: 99
  },
  {
    id: '3',
    date: '2024-06-03',
    description: 'Netflix Subscription',
    amount: -15.99,
    category: 'Entertainment',
    confidence: 88
  },
  {
    id: '4',
    date: '2024-06-02',
    description: 'Gas Station',
    amount: -45.20,
    category: 'Transportation',
    confidence: 92
  }
];

export const TransactionList = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleEditTransaction = (id: string) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, isEditing: true } : t)
    );
  };

  const handleSaveTransaction = (id: string, newCategory: string) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, category: newCategory, isEditing: false, confidence: 100 } : t)
    );
  };

  const handleCancelEdit = (id: string) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, isEditing: false } : t)
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={handleEditTransaction}
              onSave={handleSaveTransaction}
              onCancel={handleCancelEdit}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface TransactionRowProps {
  transaction: Transaction;
  onEdit: (id: string) => void;
  onSave: (id: string, category: string) => void;
  onCancel: (id: string) => void;
}

const TransactionRow = ({ transaction, onEdit, onSave, onCancel }: TransactionRowProps) => {
  const [editCategory, setEditCategory] = useState(transaction.category);

  return (
    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <div>
            <h4 className="font-medium text-slate-900">{transaction.description}</h4>
            <p className="text-sm text-slate-500">{transaction.date}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {transaction.isEditing ? (
            <>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onSave(transaction.id, editCategory)}
                className="text-green-600 hover:text-green-700"
              >
                <Check size={16} />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onCancel(transaction.id)}
                className="text-red-600 hover:text-red-700"
              >
                <X size={16} />
              </Button>
            </>
          ) : (
            <>
              <Badge 
                variant="secondary" 
                className={`${transaction.confidence < 90 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
              >
                {transaction.category}
                {transaction.confidence < 90 && ' ?'}
              </Badge>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(transaction.id)}
                className="text-slate-600 hover:text-slate-700"
              >
                <Edit2 size={16} />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
