
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { UploadModal } from '../modals/UploadModal';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header onUploadClick={() => setIsUploadModalOpen(true)} />
          <main className="p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
      
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  );
};
