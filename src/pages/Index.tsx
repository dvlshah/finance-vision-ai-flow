import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AISpotlight } from '@/components/dashboard/AISpotlight';
import { CashFlowTrend } from '@/components/dashboard/CashFlowTrend';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { NeedsReviewSummary } from '@/components/dashboard/NeedsReviewSummary';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
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
  const { uploadModal } = useModalState();

  const handleRefresh = async () => {
    await refetch();
  };

  const handleSwipeLeft = () => {
    console.log('Swiped left - navigate forward');
  };

  const handleSwipeRight = () => {
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
      <a 
        href="#main-content" 
        className="skip-link visually-hidden focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg"
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
            className="space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* AI Spotlight */}
              <section aria-label="AI Insights">
                <AISpotlight />
              </section>

              {/* Main Analytics Section */}
              <section 
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
                aria-label="Financial Analytics"
              >
                <div className="lg:col-span-2">
                  <CashFlowTrend />
                </div>
                <div className="flex flex-col space-y-6">
                  <CategoryBreakdown />
                  <NeedsReviewSummary />
                </div>
              </section>
            </motion.div>
          </main>

          <UploadModal isOpen={uploadModal.isOpen} onClose={uploadModal.close} />
        </ErrorBoundary>
      </MobileGestures>
      
      <PerformanceMonitor />
      <AccessibilityEnhancer />
      <BrowserCompatibility />
    </DashboardLayout>
  );
};

export default Index;
