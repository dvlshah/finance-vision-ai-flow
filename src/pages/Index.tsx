
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
import { DashboardSkeletonGrid } from '@/components/common/EnhancedSkeleton';
import { MobileGestures } from '@/components/navigation/MobileGestures';
import { PerformanceMonitor } from '@/components/common/PerformanceMonitor';
import { AccessibilityEnhancer } from '@/components/common/AccessibilityEnhancer';
import { BrowserCompatibility } from '@/components/common/BrowserCompatibility';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useModalState } from '@/hooks/useModalState';
import { motion } from 'framer-motion';

const Index = () => {
  const { isLoading, hasTransactions, refetch } = useDashboardData();
  const { uploadModal, quickActionModal } = useModalState();

  const handleQuickAction = (action: 'transaction' | 'budget' | 'receipt') => {
    console.log('Quick action:', action);
    quickActionModal.open(action);
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const handleSwipeLeft = () => {
    // Navigate to next section or page
    console.log('Swiped left - navigate forward');
  };

  const handleSwipeRight = () => {
    // Navigate to previous section or page  
    console.log('Swiped right - navigate back');
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <MobileGestures onRefresh={handleRefresh}>
          <DashboardSkeletonGrid />
        </MobileGestures>
        <PerformanceMonitor />
        <AccessibilityEnhancer />
        <BrowserCompatibility />
      </DashboardLayout>
    );
  }

  if (!hasTransactions) {
    return (
      <DashboardLayout>
        <MobileGestures onRefresh={handleRefresh}>
          <ErrorBoundary>
            <WelcomeHero onUploadClick={uploadModal.open} />
            <UploadModal isOpen={uploadModal.isOpen} onClose={uploadModal.close} />
          </ErrorBoundary>
        </MobileGestures>
        <PerformanceMonitor />
        <AccessibilityEnhancer />
        <BrowserCompatibility />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Skip Links for Accessibility */}
      <a 
        href="#main-content" 
        className="skip-link visually-hidden focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
        id="skip-to-main"
      >
        Skip to main content
      </a>

      <MobileGestures 
        onRefresh={handleRefresh}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      >
        <ErrorBoundary>
          {/* Live region for screen reader announcements */}
          <div 
            id="announcements" 
            aria-live="polite" 
            aria-atomic="true" 
            className="visually-hidden"
          />

          <main 
            id="main-content"
            role="main"
            aria-label="Financial Dashboard"
          >
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero Section - Financial Health Score (Enhanced) */}
              <motion.section 
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                aria-label="Financial Health Overview"
              >
                <div className="lg:col-span-2">
                  <FinancialHealthScore score={78} trend="up" changePercent={5.3} />
                </div>
                <motion.div 
                  className="flex items-center justify-center lg:justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="text-center lg:text-right space-y-3">
                    <motion.h1 
                      className="text-3xl lg:text-4xl font-bold text-gradient-primary font-display"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Welcome back!
                    </motion.h1>
                    <motion.p 
                      className="text-slate-600 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      Your financial overview for today
                    </motion.p>
                    <motion.div 
                      className="flex items-center justify-center lg:justify-end gap-2 text-sm text-slate-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div 
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow" 
                        aria-hidden="true"
                      />
                      <span>All systems operational</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.section>

              {/* Primary CTA - Quick Actions (Enhanced) */}
              <section aria-label="Quick Actions">
                <QuickActions 
                  onUploadClick={uploadModal.open} 
                  onQuickAction={handleQuickAction} 
                />
              </section>

              {/* AI Spotlight - Enhanced with modern design */}
              <section aria-label="AI Insights">
                <AISpotlight />
              </section>

              {/* Main Chart - Enhanced Cash Flow Trend */}
              <section 
                className="grid grid-cols-1 xl:grid-cols-3 gap-6"
                aria-label="Financial Analytics"
              >
                <div className="xl:col-span-2">
                  <CashFlowTrend />
                </div>
                <div className="space-y-6">
                  {/* Supporting Info - Category Breakdown */}
                  <CategoryBreakdown />
                  {/* Needs Review Summary */}
                  <NeedsReviewSummary />
                </div>
              </section>
            </motion.div>
          </main>

          {/* Modals */}
          <UploadModal isOpen={uploadModal.isOpen} onClose={uploadModal.close} />
          <QuickActionModal
            isOpen={quickActionModal.isOpen}
            onClose={quickActionModal.close}
            actionType={quickActionModal.actionType}
          />
        </ErrorBoundary>
      </MobileGestures>
      
      {/* Performance and Accessibility Monitoring */}
      <PerformanceMonitor />
      <AccessibilityEnhancer />
      <BrowserCompatibility />
    </DashboardLayout>
  );
};

export default Index;
