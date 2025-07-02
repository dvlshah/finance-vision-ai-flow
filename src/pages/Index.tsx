
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AISpotlight } from '@/components/dashboard/AISpotlight';
import { CashFlowTrend } from '@/components/dashboard/CashFlowTrend';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { QuickActionModal } from '@/components/modals/QuickActionModal';
import { UploadModal } from '@/components/modals/UploadModal';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { PageTransition } from '@/components/common/PageTransition';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useModalState } from '@/hooks/useModalState';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';

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
        <PageTransition>
          <DashboardSkeleton />
        </PageTransition>
      </DashboardLayout>
    );
  }

  if (!hasTransactions) {
    return (
      <DashboardLayout>
        <PageTransition>
          <ErrorBoundary>
            <WelcomeHero onUploadClick={uploadModal.open} />
            <UploadModal isOpen={uploadModal.isOpen} onClose={uploadModal.close} />
          </ErrorBoundary>
        </PageTransition>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageTransition>
        <ErrorBoundary>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Hero Banner - Unified awesome design */}
            <DashboardHero 
              financialHealthScore={78}
              scoreChange={{ value: 5.3, trend: 'up' }}
            />

            {/* Quick Actions - Full width for symmetry */}
            <QuickActions 
              onUploadClick={uploadModal.open} 
              onQuickAction={handleQuickAction} 
            />

            {/* AI Spotlight - Full width for balance */}
            <AISpotlight />

            {/* Main Charts Section - Symmetrical 2-column layout */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <CashFlowTrend />
              <CategoryBreakdown />
            </motion.div>
          </motion.div>

          {/* Modals */}
          <UploadModal isOpen={uploadModal.isOpen} onClose={uploadModal.close} />
          <QuickActionModal
            isOpen={quickActionModal.isOpen}
            onClose={quickActionModal.close}
            actionType={quickActionModal.actionType}
          />
        </ErrorBoundary>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Index;
