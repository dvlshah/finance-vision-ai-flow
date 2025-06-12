
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DailyPulse } from '@/components/dashboard/DailyPulse';
import { WelcomeHero } from '@/components/dashboard/WelcomeHero';
import { UploadModal } from '@/components/modals/UploadModal';
import { useState } from 'react';

const Index = () => {
  const [hasTransactions] = useState(true); // This would come from actual data in a real app
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  if (!hasTransactions) {
    return (
      <DashboardLayout>
        <WelcomeHero onUploadClick={() => setIsUploadModalOpen(true)} />
        <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DailyPulse />
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </DashboardLayout>
  );
};

export default Index;
