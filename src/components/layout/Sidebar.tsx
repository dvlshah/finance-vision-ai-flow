
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  CreditCard, 
  PieChart, 
  TrendingUp, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Upload, label: 'Upload Documents', path: '/upload' },
  { icon: CreditCard, label: 'Transactions', path: '/transactions' },
  { icon: PieChart, label: 'Categories', path: '/categories' },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "h-screen bg-white border-r border-slate-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-slate-800">FinanceVision</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors group"
          >
            <item.icon size={20} className="text-slate-600 group-hover:text-blue-600" />
            {!isCollapsed && (
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
