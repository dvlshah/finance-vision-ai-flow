
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Bell, User, Sparkles, Search } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
}

export const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 border-blue-200 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live
          </Badge>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200/50 hover:bg-slate-100 transition-colors cursor-pointer">
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-500">Search transactions...</span>
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-white border border-slate-200">
            ⌘K
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          onClick={onUploadClick} 
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-600/25 transform hover:scale-105 transition-all duration-200"
        >
          <Upload size={16} className="mr-2" />
          <span className="hidden sm:inline">Upload</span>
        </Button>
        
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors group">
          <Bell size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
        </button>
        
        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors group">
          <User size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
        </button>
      </div>
    </header>
  );
};
