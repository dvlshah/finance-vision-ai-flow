
import { Button } from '@/components/ui/button';
import { Upload, Bell, User } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
}

export const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button onClick={onUploadClick} className="bg-blue-600 hover:bg-blue-700">
          <Upload size={16} className="mr-2" />
          Upload Documents
        </Button>
        
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell size={20} className="text-slate-600" />
        </button>
        
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <User size={20} className="text-slate-600" />
        </button>
      </div>
    </header>
  );
};
