
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FinancialHealthScore } from '@/components/dashboard/FinancialHealthScore';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { CashFlowTrend } from '@/components/dashboard/CashFlowTrend';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TimeRangeSelector } from '@/components/navigation/TimeRangeSelector';
import { QuickActionModal } from '@/components/modals/QuickActionModal';
import { BarChart3, PieChart, TrendingUp, CreditCard, Target, FileText } from 'lucide-react';

interface DashboardTabsProps {
  onUploadClick: () => void;
}

export const DashboardTabs = ({ onUploadClick }: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [quickActionModal, setQuickActionModal] = useState<{
    isOpen: boolean;
    actionType: 'transaction' | 'budget' | 'receipt' | null;
  }>({
    isOpen: false,
    actionType: null
  });

  const handleQuickAction = (action: 'transaction' | 'budget' | 'receipt') => {
    setQuickActionModal({
      isOpen: true,
      actionType: action
    });
  };

  const closeQuickActionModal = () => {
    setQuickActionModal({
      isOpen: false,
      actionType: null
    });
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
        <TimeRangeSelector onRangeChange={(range) => console.log('Range changed:', range)} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full max-w-3xl mx-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <CreditCard size={16} />
            <span className="hidden sm:inline">Transactions</span>
          </TabsTrigger>
          <TabsTrigger value="spending" className="flex items-center gap-2">
            <PieChart size={16} />
            <span className="hidden sm:inline">Spending</span>
          </TabsTrigger>
          <TabsTrigger value="investments" className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span className="hidden sm:inline">Investments</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target size={16} />
            <span className="hidden sm:inline">Goals</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Top Level Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FinancialHealthScore score={78} trend="up" changePercent={5.3} />
            <div className="lg:col-span-2">
              <CashFlowTrend />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions onUploadClick={onUploadClick} onQuickAction={handleQuickAction} />

          {/* Overview Cards */}
          <OverviewCards />

          {/* Secondary Level Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SpendingChart />
            </div>
            <CategoryBreakdown />
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionList />
        </TabsContent>

        <TabsContent value="spending" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CategoryBreakdown />
            <SpendingChart />
          </div>
        </TabsContent>

        <TabsContent value="investments">
          <div className="text-center py-12 text-slate-500">
            <TrendingUp size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium mb-2">Investment Portfolio</h3>
            <p>Connect your investment accounts to see portfolio analysis</p>
          </div>
        </TabsContent>

        <TabsContent value="goals">
          <div className="text-center py-12 text-slate-500">
            <Target size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium mb-2">Financial Goals</h3>
            <p>Set and track your financial goals and budgets</p>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="text-center py-12 text-slate-500">
            <FileText size={48} className="mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium mb-2">Financial Reports</h3>
            <p>Generate detailed reports and export your data</p>
          </div>
        </TabsContent>
      </Tabs>

      <QuickActionModal
        isOpen={quickActionModal.isOpen}
        onClose={closeQuickActionModal}
        actionType={quickActionModal.actionType}
      />
    </div>
  );
};
