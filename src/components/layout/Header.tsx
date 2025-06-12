
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Bell, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
}

export const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200">
          <Sparkles className="h-3 w-3 text-blue-500" />
          <span className="text-xs text-blue-700">Press</span>
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
            Cmd+K
          </Badge>
          <span className="text-xs text-blue-700">for AI assistance</span>
        </div>
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
