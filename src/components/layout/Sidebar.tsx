
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
      "h-screen glass border-r border-glass-border transition-all duration-500 flex flex-col backdrop-blur-xl animate-slide-in-right",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="relative">
                <Coins className="h-6 w-6 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
                <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 text-purple-500 opacity-70 animate-pulse" size={12} />
              </div>
              <span className="font-bold text-gradient-primary font-display text-lg group-hover:scale-105 transition-transform duration-300">
                FinanceVision
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg glass-card hover:shadow-level-2 transition-all duration-300 group"
          >
            {isCollapsed ? 
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" /> : 
              <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            }
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 custom-scrollbar overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group relative stagger-1",
                `stagger-${index + 1}`,
                isActive 
                  ? "glass-card shadow-level-2 text-blue-600 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-200/50" 
                  : "hover:glass-card hover:shadow-level-1 hover:text-blue-600 text-slate-700"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon 
                size={20} 
                className={cn(
                  "transition-all duration-300 group-hover:scale-110",
                  isActive 
                    ? "text-blue-600 animate-pulse" 
                    : "text-slate-500 group-hover:text-blue-600"
                )} 
              />
              {!isCollapsed && (
                <span className={cn(
                  "text-sm font-medium transition-all duration-300 group-hover:translate-x-1",
                  isActive 
                    ? "text-blue-600 font-semibold" 
                    : "text-slate-700 group-hover:text-blue-600"
                )}>
                  {item.label}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute right-2 w-2 h-2 bg-gradient-primary rounded-full animate-pulse shadow-glow" />
              )}
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-glass-border animate-fade-in">
          <div className="text-xs text-slate-500 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-glow"></div>
              <span className="font-medium">All systems operational</span>
            </div>
            <div className="font-mono opacity-70">v2.1.0</div>
            <div className="mt-2 p-2 glass-card rounded-lg">
              <div className="flex items-center justify-center gap-1 text-purple-600">
                <Sparkles size={12} className="animate-pulse" />
                <span className="text-xs font-medium">AI Enhanced</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
