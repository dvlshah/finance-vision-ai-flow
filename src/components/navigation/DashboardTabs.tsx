
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FinancialHealthScore } from '@/components/dashboard/FinancialHealthScore';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { CashFlowTrend } from '@/components/dashboard/CashFlowTrend';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TimeRangeSelector } from '@/components/navigation/TimeRangeSelector';
import { QuickActionModal } from '@/components/modals/QuickActionModal';
import { BarChart3, PieChart, TrendingUp, CreditCard, Target, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardTabsProps {
  onUploadClick: () => void;
}

export const DashboardTabs = ({ onUploadClick }: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [quickActionModal, setQuickActionModal] = useState<{
    isOpen: boolean;
    actionType: 'transaction' | 'budget' | 'receipt' | null;
  }>({
    isOpen: false,
    actionType: null
  });

  const handleQuickAction = (action: 'transaction' | 'budget' | 'receipt') => {
    setQuickActionModal({
      isOpen: true,
      actionType: action
    });
  };

  const closeQuickActionModal = () => {
    setQuickActionModal({
      isOpen: false,
      actionType: null
    });
  };

  const tabItems = [
    { value: 'overview', label: 'Overview', icon: BarChart3 },
    { value: 'transactions', label: 'Transactions', icon: CreditCard },
    { value: 'spending', label: 'Spending', icon: PieChart },
    { value: 'investments', label: 'Investments', icon: TrendingUp },
    { value: 'goals', label: 'Goals', icon: Target },
    { value: 'reports', label: 'Reports', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gradient-primary">Dashboard</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-glow" />
            <span className="text-sm text-slate-500">Live</span>
          </div>
        </div>
        <TimeRangeSelector onRangeChange={(range) => console.log('Range changed:', range)} />
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TabsList className="grid grid-cols-6 w-full max-w-4xl mx-auto glass-card border-0 shadow-level-1 p-1">
            {tabItems.map((tab, index) => (
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TabsTrigger 
                  value={tab.value} 
                  className="flex items-center gap-2 data-[state=active]:glass-card data-[state=active]:shadow-level-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Active indicator glow */}
                  {activeTab === tab.value && (
                    <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-lg animate-pulse" />
                  )}
                  
                  <tab.icon 
                    size={16} 
                    className={`transition-all duration-300 ${
                      activeTab === tab.value 
                        ? 'text-blue-600 animate-pulse' 
                        : 'text-slate-500 group-hover:text-blue-600'
                    }`}
                  />
                  <span className="hidden sm:inline font-medium relative z-10">
                    {tab.label}
                  </span>
                  
                  {/* Sparkle effect for active tab */}
                  {activeTab === tab.value && (
                    <Sparkles size={12} className="text-purple-500 animate-pulse opacity-70" />
                  )}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>

        <TabsContent value="overview" className="space-y-8">
          {/* Top Level Overview with enhanced layout */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="lg:col-span-2">
              <FinancialHealthScore score={78} trend="up" changePercent={5.3} />
            </div>
            <div className="space-y-4">
              <CashFlowTrend />
            </div>
          </motion.div>

          {/* Quick Actions with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <QuickActions onUploadClick={onUploadClick} onQuickAction={handleQuickAction} />
          </motion.div>

          {/* Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <OverviewCards />
          </motion.div>

          {/* Secondary Level Charts */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="lg:col-span-2">
              <SpendingChart />
            </div>
            <CategoryBreakdown />
          </motion.div>
        </TabsContent>

        <TabsContent value="transactions">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TransactionList />
          </motion.div>
        </TabsContent>

        <TabsContent value="spending" className="space-y-6">
          <motion.div 
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CategoryBreakdown />
            <SpendingChart />
          </motion.div>
        </TabsContent>

        {/* Empty state components with enhanced design */}
        <TabsContent value="investments">
          <motion.div 
            className="text-center py-16 glass-card rounded-2xl shadow-level-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl animate-pulse" />
                <TrendingUp size={32} className="text-blue-600 relative z-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Investment Portfolio</h3>
                <p className="text-slate-600 max-w-md mx-auto">Connect your investment accounts to see portfolio analysis and track your long-term financial growth.</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="goals">
          <motion.div 
            className="text-center py-16 glass-card rounded-2xl shadow-level-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl animate-pulse" />
                <Target size={32} className="text-purple-600 relative z-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Financial Goals</h3>
                <p className="text-slate-600 max-w-md mx-auto">Set and track your financial goals and budgets to achieve your dreams faster.</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="reports">
          <motion.div 
            className="text-center py-16 glass-card rounded-2xl shadow-level-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl animate-pulse" />
                <FileText size={32} className="text-green-600 relative z-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Financial Reports</h3>
                <p className="text-slate-600 max-w-md mx-auto">Generate detailed reports and export your data for tax preparation and financial planning.</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      <QuickActionModal
        isOpen={quickActionModal.isOpen}
        onClose={closeQuickActionModal}
        actionType={quickActionModal.actionType}
      />
    </div>
  );
};
