
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { TransactionList } from '@/components/transactions/TransactionList';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial Overview</h1>
          <p className="text-slate-600">Your complete financial picture at a glance</p>
        </div>
        
        <OverviewCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SpendingChart />
          <CategoryBreakdown />
        </div>
        
        <TransactionList />
      </div>
    </DashboardLayout>
  );
};

export default Index;
