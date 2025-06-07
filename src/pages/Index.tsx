
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardTabs } from '@/components/navigation/DashboardTabs';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial Overview</h1>
          <p className="text-slate-600">Your complete financial picture at a glance</p>
        </div>
        
        <DashboardTabs onUploadClick={() => {}} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
