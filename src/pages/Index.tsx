
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FinancialHealthScore } from '@/components/dashboard/FinancialHealthScore';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AISpotlight } from '@/components/dashboard/AISpotlight';
import { CashFlowTrend } from '@/components/dashboard/CashFlowTrend';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { NeedsReviewSummary } from '@/components/dashboard/NeedsReviewSummary';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { useState } from 'react';

const Index = () => {
  const [hasTransactions] = useState(true); // This would come from actual data in a real app
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleQuickAction = (action: 'transaction' | 'budget' | 'receipt') => {
    console.log('Quick action:', action);
    // Handle quick actions here
  };

  if (!hasTransactions) {
    return (
      <DashboardLayout>
        <WelcomeHero onUploadClick={() => setIsUploadModalOpen(true)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section - Financial Health Score (Enlarged) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FinancialHealthScore score={78} trend="up" changePercent={5.3} />
          </div>
          <div className="flex items-center">
            <div className="text-right space-y-2">
              <h1 className="text-3xl font-bold text-slate-900">Welcome back!</h1>
              <p className="text-slate-600">Your financial overview for today</p>
            </div>
          </div>
        </div>

        {/* Primary CTA - Quick Actions */}
        <QuickActions 
          onUploadClick={() => setIsUploadModalOpen(true)} 
          onQuickAction={handleQuickAction} 
        />

        {/* AI Spotlight - Key Financial Insights */}
        <AISpotlight />

        {/* Main Chart - Cash Flow Trend */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <CashFlowTrend />
          </div>
          <div className="space-y-6">
            {/* Supporting Info - Category Breakdown */}
            <CategoryBreakdown />
            {/* Needs Review Summary */}
            <NeedsReviewSummary />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
