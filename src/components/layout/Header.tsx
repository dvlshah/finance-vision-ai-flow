
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Bell, User, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
}

export const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="h-16 glass border-b border-glass-border sticky top-0 z-50 px-6 flex items-center justify-between animate-slide-in-up">
      <div className="flex items-center space-x-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gradient-primary font-display">
            Dashboard
          </h2>
          <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-1 px-2 py-1 glass-card text-emerald-700 border-emerald-200 text-xs">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            Live
          </Badge>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 glass-card hover:shadow-level-2 transition-all duration-300 cursor-pointer group">
          <Search className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">Search transactions...</span>
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-white/50 border border-slate-200 font-mono">
            ⌘K
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button 
          onClick={onUploadClick} 
          size="sm"
          className="btn-gradient hover:shadow-glow transform hover:scale-105 transition-all duration-300 group"
        >
          <Upload size={16} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline font-medium">Upload</span>
          <Sparkles size={14} className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
        </Button>
        
        <button className="relative p-2 rounded-xl glass-card hover:shadow-level-2 transition-all duration-300 group">
          <Bell size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors group-hover:animate-pulse" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-error rounded-full border-2 border-white animate-pulse"></div>
        </button>
        
        <button className="p-2 rounded-xl glass-card hover:shadow-level-2 transition-all duration-300 group">
          <User size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
        </button>
      </div>
    </header>
  );
};
