import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ConfidenceBadge } from '@/components/ui/confidence-badge';
import { ReviewQueue } from '@/components/transactions/ReviewQueue';
import { Search, Filter, MoreHorizontal, Copy, Split, Trash2, RefreshCw, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { EditTransactionModal } from '@/components/modals/EditTransactionModal';
import { SplitTransactionModal } from '@/components/modals/SplitTransactionModal';
import { BulkOperationsModal } from '@/components/modals/BulkOperationsModal';
import { ImportExportUtils } from '@/components/utilities/ImportExportUtils';
import { Confetti } from '@/components/ui/confetti';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [splittingTransaction, setSplittingTransaction] = useState<Transaction | null>(null);
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Refreshing transactions...');
  };

  const { isRefreshing, pullDistance } = usePullToRefresh({ 
    onRefresh: handleRefresh,
    threshold: 80 
  });

  const handleUpdateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    );
    
    // Check if all transactions are now reviewed (confidence >= 90)
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { ...t, ...updates } : t
    );
    const needsReview = updatedTransactions.filter(t => t.confidence < 90).length;
    if (needsReview === 0 && transactions.some(t => t.confidence < 90)) {
      setShowConfetti(true);
    }
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
  };

  const handleSplitTransaction = (id: string, splits: any[]) => {
    setTransactions(prev => {
      const originalTransaction = prev.find(t => t.id === id);
      if (!originalTransaction) return prev;

      const newTransactions = splits.map((split, index) => ({
        id: `${id}-split-${index}`,
        date: originalTransaction.date,
        description: split.description,
        amount: originalTransaction.amount < 0 ? -split.amount : split.amount,
        category: split.category,
        confidence: 100,
        reason: `Split from: ${originalTransaction.description}`,
        account: originalTransaction.account,
        merchant: originalTransaction.merchant
      }));

      return prev.filter(t => t.id !== id).concat(newTransactions);
    });
    setSplittingTransaction(null);
  };

  const handleBulkDelete = () => {
    setTransactions(prev => prev.filter(t => !selectedTransactions.includes(t.id)));
    setSelectedTransactions([]);
  };

  const handleBulkArchive = () => {
    console.log('Archiving transactions:', selectedTransactions);
    setSelectedTransactions([]);
  };

  const handleImportTransactions = (importedTransactions: Transaction[]) => {
    setTransactions(prev => [...prev, ...importedTransactions]);
    setShowImportExport(false);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const needsReviewCount = transactions.filter(t => t.confidence < 90).length;

  const handleEditTransactionModal = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  return (
    <div className="relative space-y-6">
      <Confetti 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)}
      />

      {/* Pull to refresh indicator */}
      {pullDistance > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 right-0 flex justify-center items-center bg-blue-50 text-blue-600 transition-all duration-200"
          style={{ height: `${Math.min(pullDistance, 80)}px` }}
        >
          <RefreshCw 
            className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} 
          />
          <span className="ml-2 text-sm">
            {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
          </span>
        </motion.div>
      )}

      {/* Review Queue */}
      <ReviewQueue 
        transactions={transactions}
        onUpdateTransaction={handleUpdateTransaction}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
                    onClick={() => setShowBulkOperations(true)}
                  >
                    Bulk Actions ({selectedTransactions.length})
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowImportExport(!showImportExport)}
                >
                  <Settings size={16} className="mr-1" />
                  Tools
                </Button>
              </div>
            </div>
            
            {/* Mobile-optimized search and filter */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search transactions or merchants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 md:h-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 h-12 md:h-10">
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
          </CardHeader>
          
          <CardContent>
            {showImportExport && (
              <div className="mb-4">
                <ImportExportUtils 
                  transactions={transactions}
                  onImport={handleImportTransactions}
                />
              </div>
            )}

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

              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                    transition={{ 
                      duration: 0.2,
                      layout: { duration: 0.3 }
                    }}
                  >
                    <TransactionRow
                      transaction={transaction}
                      isSelected={selectedTransactions.includes(transaction.id)}
                      onSelect={handleSelectTransaction}
                      onEditModal={handleEditTransactionModal}
                      onSplit={setSplittingTransaction}
                      onUpdateTransaction={handleUpdateTransaction}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals */}
      <EditTransactionModal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        transaction={editingTransaction}
        onSave={handleUpdateTransaction}
      />

      <SplitTransactionModal
        isOpen={!!splittingTransaction}
        onClose={() => setSplittingTransaction(null)}
        transaction={splittingTransaction}
        onSplit={handleSplitTransaction}
      />

      <BulkOperationsModal
        isOpen={showBulkOperations}
        onClose={() => setShowBulkOperations(false)}
        selectedCount={selectedTransactions.length}
        onBulkEdit={handleBulkCategoryChange}
        onBulkDelete={handleBulkDelete}
        onBulkArchive={handleBulkArchive}
      />
    </div>
  );
};

interface TransactionRowProps {
  transaction: Transaction;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onEditModal: (transaction: Transaction) => void;
  onSplit: (transaction: Transaction) => void;
  onUpdateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

const TransactionRow = ({ 
  transaction, 
  isSelected, 
  onSelect, 
  onEditModal, 
  onSplit, 
  onUpdateTransaction 
}: TransactionRowProps) => {
  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeRight: () => onEditModal(transaction),
    onSwipeLeft: () => console.log('Swipe left - could delete'),
    threshold: 100
  });

  return (
    <div 
      ref={swipeRef}
      className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors touch-manipulation"
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={(checked) => onSelect(transaction.id, checked as boolean)}
        className="min-w-[20px]"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <h4 className="font-medium text-slate-900 truncate pr-2">{transaction.description}</h4>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <span>{transaction.date}</span>
              <span>•</span>
              <span className="truncate">{transaction.account}</span>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0">
            <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 flex-shrink-0">
        <ConfidenceBadge
          confidence={transaction.confidence}
          category={transaction.category}
          reason={transaction.reason}
          onCategoryUpdate={(category) => onUpdateTransaction(transaction.id, {
            category,
            confidence: 100,
            reason: 'Corrected by user'
          })}
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-700 p-2">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEditModal(transaction)}>
              <MoreHorizontal size={14} className="mr-2" />
              Edit Transaction
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSplit(transaction)}>
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
      </div>
    </div>
  );
};
