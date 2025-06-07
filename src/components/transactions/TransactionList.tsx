
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ConfidenceBadge } from '@/components/ui/confidence-badge';
import { Search, Filter, Edit2, Check, X, MoreHorizontal, Copy, Split, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  confidence: number;
  reason?: string;
  isEditing?: boolean;
  account?: string;
  merchant?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-06-05',
    description: 'Grocery Store Purchase - Whole Foods Market',
    amount: -87.32,
    category: 'Food',
    confidence: 95,
    reason: 'Merchant name contains "Whole Foods" which is commonly categorized as Food',
    account: 'Chase Checking',
    merchant: 'Whole Foods Market'
  },
  {
    id: '2',
    date: '2024-06-04',
    description: 'Salary Deposit - ACME Corporation',
    amount: 4250.00,
    category: 'Income',
    confidence: 99,
    reason: 'Regular recurring deposit pattern identified as salary',
    account: 'Chase Checking',
    merchant: 'ACME Corporation'
  },
  {
    id: '3',
    date: '2024-06-03',
    description: 'Netflix Monthly Subscription',
    amount: -15.99,
    category: 'Entertainment',
    confidence: 88,
    reason: 'Subscription service for entertainment platform',
    account: 'Credit Card',
    merchant: 'Netflix'
  },
  {
    id: '4',
    date: '2024-06-02',
    description: 'Shell Gas Station #1234',
    amount: -45.20,
    category: 'Transportation',
    confidence: 72,
    reason: 'Gas station purchases typically categorized as transportation',
    account: 'Credit Card',
    merchant: 'Shell'
  },
  {
    id: '5',
    date: '2024-06-01',
    description: 'Amazon Purchase - Various Items',
    amount: -127.45,
    category: 'Shopping',
    confidence: 65,
    reason: 'Amazon purchases can vary in category, requires manual review',
    account: 'Credit Card',
    merchant: 'Amazon'
  }
];

export const TransactionList = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [bulkEditMode, setBulkEditMode] = useState(false);

  const handleEditTransaction = (id: string) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, isEditing: true } : t)
    );
  };

  const handleSaveTransaction = (id: string, newCategory: string) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { 
        ...t, 
        category: newCategory, 
        isEditing: false, 
        confidence: 100,
        reason: 'Manually corrected by user'
      } : t)
    );
  };

  const handleCancelEdit = (id: string) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, isEditing: false } : t)
    );
  };

  const handleSelectTransaction = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions(prev => [...prev, id]);
    } else {
      setSelectedTransactions(prev => prev.filter(t => t !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(filteredTransactions.map(t => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleBulkCategoryChange = (category: string) => {
    setTransactions(prev => 
      prev.map(t => 
        selectedTransactions.includes(t.id) 
          ? { ...t, category, confidence: 100, reason: 'Bulk edited by user' }
          : t
      )
    );
    setSelectedTransactions([]);
    setBulkEditMode(false);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const needsReviewCount = transactions.filter(t => t.confidence < 90).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
            {needsReviewCount > 0 && (
              <p className="text-sm text-amber-600 mt-1">
                {needsReviewCount} transactions need review
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedTransactions.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setBulkEditMode(!bulkEditMode)}
              >
                Edit {selectedTransactions.length} selected
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search transactions or merchants..."
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
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Edit Controls */}
        {bulkEditMode && selectedTransactions.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-blue-900">
              Bulk Edit {selectedTransactions.length} transactions
            </h4>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-blue-700">Change category to:</span>
              <Select onValueChange={handleBulkCategoryChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setBulkEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {/* Select All Header */}
          <div className="flex items-center space-x-3 py-2 border-b border-slate-100">
            <Checkbox
              checked={selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm font-medium text-slate-600">
              Select All ({filteredTransactions.length})
            </span>
          </div>

          {filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              isSelected={selectedTransactions.includes(transaction.id)}
              onSelect={handleSelectTransaction}
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
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, category: string) => void;
  onCancel: (id: string) => void;
}

const TransactionRow = ({ transaction, isSelected, onSelect, onEdit, onSave, onCancel }: TransactionRowProps) => {
  const [editCategory, setEditCategory] = useState(transaction.category);

  return (
    <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
      <Checkbox
        checked={isSelected}
        onCheckedChange={(checked) => onSelect(transaction.id, checked as boolean)}
      />
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="font-medium text-slate-900">{transaction.description}</h4>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>{transaction.date}</span>
              <span>•</span>
              <span>{transaction.account}</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {transaction.isEditing ? (
          <>
            <Select value={editCategory} onValueChange={setEditCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
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
            <ConfidenceBadge
              confidence={transaction.confidence}
              category={transaction.category}
              reason={transaction.reason}
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-700">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onEdit(transaction.id)}>
                  <Edit2 size={14} className="mr-2" />
                  Edit Category
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Split size={14} className="mr-2" />
                  Split Transaction
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy size={14} className="mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};
