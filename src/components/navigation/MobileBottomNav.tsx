
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  CreditCard, 
  PieChart, 
  TrendingUp, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Upload, label: 'Upload', path: '/upload' },
  { icon: CreditCard, label: 'Transactions', path: '/transactions' },
  { icon: PieChart, label: 'Categories', path: '/categories' },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border md:hidden z-50 safe-area-pb">
      <nav className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[48px] min-h-[48px] touch-manipulation",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-colors mb-1",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )} 
              />
              <span className={cn(
                "text-xs font-medium transition-colors leading-tight",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
