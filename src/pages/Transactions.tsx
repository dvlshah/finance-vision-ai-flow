import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionList } from '@/components/transactions/TransactionList';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { TransactionListEmpty } from '@/components/empty-states/TransactionListEmpty';

const Transactions = () => {
  const [hasTransactions] = useState(false); // This would come from actual data
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);

  if (!hasTransactions) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          </div>
          <TransactionListEmpty 
            onUploadClick={() => setIsUploadModalOpen(true)}
            onAddTransactionClick={() => setIsAddTransactionModalOpen(true)}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Transactions</h1>
            <p className="text-slate-600">View and manage all your financial transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        <GlobalSearch />
        <TransactionList />
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
