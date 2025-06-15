
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FinancialHealthScore } from '@/components/dashboard/FinancialHealthScore';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AISpotlight } from '@/components/dashboard/AISpotlight';
import { CashFlowTrend } from '@/components/dashboard/CashFlowTrend';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { NeedsReviewSummary } from '@/components/dashboard/NeedsReviewSummary';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { QuickActionModal } from '@/components/modals/QuickActionModal';
import { UploadModal } from '@/components/modals/UploadModal';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useModalState } from '@/hooks/useModalState';

const Index = () => {
  const { isLoading, hasTransactions } = useDashboardData();
  const { uploadModal, quickActionModal } = useModalState();

  const handleQuickAction = (action: 'transaction' | 'budget' | 'receipt') => {
    console.log('Quick action:', action);
    quickActionModal.open(action);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  if (!hasTransactions) {
    return (
      <DashboardLayout>
        <ErrorBoundary>
          <WelcomeHero onUploadClick={uploadModal.open} />
          <UploadModal isOpen={uploadModal.isOpen} onClose={uploadModal.close} />
        </ErrorBoundary>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ErrorBoundary>
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
            onUploadClick={uploadModal.open} 
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

        {/* Modals */}
        <UploadModal isOpen={uploadModal.isOpen} onClose={uploadModal.close} />
        <QuickActionModal
          isOpen={quickActionModal.isOpen}
          onClose={quickActionModal.close}
          actionType={quickActionModal.actionType}
        />
      </ErrorBoundary>
    </DashboardLayout>
  );
};

export default Index;
