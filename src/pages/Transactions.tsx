
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionList } from '@/components/transactions/TransactionList';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { PageTransition } from '@/components/common/PageTransition';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';

const Transactions = () => {
  return (
    <DashboardLayout>
      <PageTransition>
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
      </PageTransition>
    </DashboardLayout>
  );
};

export default Transactions;
