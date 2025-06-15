
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileBottomNav } from '../navigation/MobileBottomNav';
import { UploadModal } from '../modals/UploadModal';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-ambient relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/50 to-purple-50/30 animate-float" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float" />
      
      <div className="relative z-10 flex min-h-screen">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col">
          <Header onUploadClick={() => setIsUploadModalOpen(true)} />
          <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 custom-scrollbar overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="animate-fade-in">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
      
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  );
};
