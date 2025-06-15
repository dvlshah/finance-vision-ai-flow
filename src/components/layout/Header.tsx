
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Bell, User, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
}

export const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-slate-900 font-display">
            Dashboard
          </h2>
          <Badge variant="outline" className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 text-emerald-700 border-emerald-200 text-xs bg-emerald-50">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            Live
          </Badge>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200/80 rounded-lg hover:bg-slate-200 transition-colors duration-300 cursor-pointer group">
          <Search className="h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-600">Search transactions...</span>
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-white border border-slate-200 font-mono text-slate-500">
            ⌘K
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          onClick={onUploadClick} 
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Upload size={16} className="mr-2" />
          <span className="hidden sm:inline font-medium">Upload</span>
        </Button>
        
        <button className="relative p-2 rounded-lg border bg-white hover:bg-slate-100 transition-colors">
          <Bell size={18} className="text-slate-600" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
        
        <button className="p-2 rounded-lg border bg-white hover:bg-slate-100 transition-colors">
          <User size={18} className="text-slate-600" />
        </button>
      </div>
    </header>
  );
};
