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
  Coins,
  Sparkles
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
      "h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200">
          <div className={cn("flex items-center", isCollapsed ? 'justify-center' : 'justify-between')}>
            {!isCollapsed && (
              <Link to="/dashboard" className="flex items-center gap-2 group">
                <Coins className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-slate-800 font-display text-lg">
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
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 p-2.5 rounded-lg transition-colors duration-200 group",
                  isCollapsed ? 'justify-center' : '',
                  isActive 
                    ? "bg-slate-100 text-slate-900 font-semibold" 
                    : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                )}
              >
                <item.icon 
                  size={20} 
                  className={cn(isActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-800")} 
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-200">
          <div className="text-xs text-slate-500 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>All systems operational</span>
            </div>
            <div className="font-mono">v2.1.0</div>
            <div className="flex items-center gap-1.5 text-purple-600">
              <Sparkles size={14} />
              <span className="font-medium">AI Enhanced</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
