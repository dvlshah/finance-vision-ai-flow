
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
    color: 'text-green-600',
    progress: 75,
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    title: 'Monthly Income',
    value: '$8,500',
    change: '+3.2%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'text-blue-600',
    progress: 85,
    gradient: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    title: 'Monthly Expenses',
    value: '$6,200',
    change: '-2.1%',
    trend: 'down' as const,
    icon: CreditCard,
    color: 'text-orange-600',
    progress: 62,
    gradient: 'from-orange-500/20 to-amber-500/20'
  },
  {
    title: 'Savings Rate',
    value: '27%',
    change: '+5.3%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'text-purple-600',
    progress: 27,
    gradient: 'from-purple-500/20 to-violet-500/20'
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
          <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors">
                {item.title}
              </CardTitle>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-full blur-lg scale-150 group-hover:opacity-30 transition-opacity duration-300" />
                <ProgressRing 
                  progress={item.progress} 
                  size={44} 
                  strokeWidth={3}
                  className={`${item.color} relative z-10`}
                >
                  <item.icon size={18} className={`${item.color} group-hover:scale-110 transition-transform duration-300`} />
                </ProgressRing>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
                {item.value}
              </div>
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded-full ${item.trend === 'up' ? 'bg-green-100' : 'bg-red-100'} group-hover:scale-110 transition-transform duration-300`}>
                  {item.trend === 'up' ? (
                    <TrendingUp size={12} className="text-green-500" />
                  ) : (
                    <TrendingDown size={12} className="text-red-500" />
                  )}
                </div>
                <span className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </span>
                <span className="text-xs text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
