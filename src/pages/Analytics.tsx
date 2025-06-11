
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SpendingTrends } from '@/components/analytics/SpendingTrends';
import { BudgetTracking } from '@/components/analytics/BudgetTracking';
import { FinancialInsights } from '@/components/analytics/FinancialInsights';
import { ReportsGenerator } from '@/components/analytics/ReportsGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Target, Lightbulb, FileText } from 'lucide-react';

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics & Reports</h1>
          <p className="text-slate-600">Comprehensive insights into your financial patterns and trends</p>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Budgets</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <SpendingTrends />
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <BudgetTracking />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <FinancialInsights />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
