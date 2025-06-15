
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import { ProgressRing } from '@/components/ui/progress-ring';
import { motion } from 'framer-motion';

const overviewData = [
  {
    title: 'Net Worth',
    value: '$124,532',
    change: '+12.5%',
    trend: 'up' as const,
    icon: DollarSign,
    color: 'text-emerald-600',
    progress: 75,
    gradient: 'from-emerald-500/20 to-green-500/20',
    bgGradient: 'from-emerald-50 to-green-50'
  },
  {
    title: 'Monthly Income',
    value: '$8,500',
    change: '+3.2%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'text-blue-600',
    progress: 85,
    gradient: 'from-blue-500/20 to-indigo-500/20',
    bgGradient: 'from-blue-50 to-indigo-50'
  },
  {
    title: 'Monthly Expenses',
    value: '$6,200',
    change: '-2.1%',
    trend: 'down' as const,
    icon: CreditCard,
    color: 'text-orange-600',
    progress: 62,
    gradient: 'from-orange-500/20 to-amber-500/20',
    bgGradient: 'from-orange-50 to-amber-50'
  },
  {
    title: 'Savings Rate',
    value: '27%',
    change: '+5.3%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'text-purple-600',
    progress: 27,
    gradient: 'from-purple-500/20 to-violet-500/20',
    bgGradient: 'from-purple-50 to-violet-50'
  }
];

export const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300 group cursor-pointer transform hover:-translate-y-1 overflow-hidden relative">
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Floating particles */}
            <div className="absolute top-3 right-3 w-1 h-1 bg-blue-400/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-purple-400/40 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors">
                {item.title}
              </CardTitle>
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 rounded-full blur-lg scale-150 group-hover:opacity-40 transition-opacity duration-300`} />
                <ProgressRing 
                  progress={item.progress} 
                  size={44} 
                  strokeWidth={3}
                  className={`${item.color} relative z-10 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon size={18} className={`${item.color} group-hover:scale-110 transition-transform duration-300`} />
                </ProgressRing>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <motion.div 
                className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {item.value}
              </motion.div>
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-full ${item.trend === 'up' ? 'bg-emerald-100' : 'bg-red-100'} group-hover:scale-110 transition-transform duration-300`}>
                  {item.trend === 'up' ? (
                    <TrendingUp size={12} className="text-emerald-600" />
                  ) : (
                    <TrendingDown size={12} className="text-red-600" />
                  )}
                </div>
                <span className={`text-sm font-semibold ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {item.change}
                </span>
                <span className="text-xs text-slate-500 opacity-70 group-hover:opacity-100 transition-opacity">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
