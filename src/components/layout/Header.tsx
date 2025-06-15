
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Bell, User, Search } from 'lucide-react';

interface HeaderProps {
  onUploadClick: () => void;
}

export const Header = ({ onUploadClick }: HeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-border sticky top-0 z-50 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg md:text-xl font-semibold text-foreground">
            Dashboard
          </h2>
          <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Live
          </Badge>
        </div>
        
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search transactions...</span>
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 font-mono">
            ⌘K
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-3">
        <Button onClick={onUploadClick} variant="gradient" size="touch-sm" className="md:size-default">
          <Upload size={16} />
          <span className="hidden sm:inline">Upload</span>
        </Button>
        
        <Button variant="outline" size="touch-sm" className="md:size-icon relative">
          <Bell size={18} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background"></div>
        </Button>
        
        <Button variant="outline" size="touch-sm" className="md:size-icon">
          <User size={18} />
        </Button>
      </div>
    </header>
  );
};
