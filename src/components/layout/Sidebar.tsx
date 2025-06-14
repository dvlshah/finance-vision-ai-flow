
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  CreditCard, 
  PieChart, 
  TrendingUp, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Upload, label: 'Upload', path: '/upload' },
  { icon: CreditCard, label: 'Transactions', path: '/transactions' },
  { icon: PieChart, label: 'Categories', path: '/categories' },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "h-screen bg-white/80 backdrop-blur-lg border-r border-slate-200/50 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="relative">
                <Coins className="h-6 w-6 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </div>
              <span className="font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                FinanceVision
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-200/50 shadow-sm" 
                  : "hover:bg-slate-50 hover:text-blue-600 text-slate-700"
              )}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-all duration-200",
                  isActive 
                    ? "text-blue-600" 
                    : "text-slate-500 group-hover:text-blue-600"
                )} 
              />
              {!isCollapsed && (
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isActive 
                    ? "text-blue-600" 
                    : "text-slate-700 group-hover:text-blue-600"
                )}>
                  {item.label}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-200/50">
          <div className="text-xs text-slate-500 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              All systems operational
            </div>
            <div>v2.1.0</div>
          </div>
        </div>
      )}
    </div>
  );
};
