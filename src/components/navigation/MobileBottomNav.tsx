
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  CreditCard, 
  PieChart, 
  TrendingUp 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Upload, label: 'Upload', path: '/upload' },
  { icon: CreditCard, label: 'Transactions', path: '/transactions' },
  { icon: PieChart, label: 'Categories', path: '/categories' },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
];

export const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-colors min-w-[64px] min-h-[56px]",
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "mb-1",
                  isActive ? "text-blue-600" : "text-slate-600"
                )} 
              />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-blue-600" : "text-slate-600"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
