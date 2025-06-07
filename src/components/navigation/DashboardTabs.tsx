
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { TransactionList } from '@/components/transactions/TransactionList';
import { BarChart3, PieChart, TrendingUp, CreditCard, Target, FileText } from 'lucide-react';

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
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
        <OverviewCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SpendingChart />
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
  );
};
