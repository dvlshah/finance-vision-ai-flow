import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import { ProgressRing } from '@/components/ui/progress-ring';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

const overviewData = [
  {
    title: 'Net Worth',
    value: '$124,532',
    change: '+12.5%',
    trend: 'up' as const,
    icon: DollarSign,
    color: 'text-green-600',
    progress: 75
  },
  {
    title: 'Monthly Income',
    value: '$8,500',
    change: '+3.2%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'text-blue-600',
    progress: 85
  },
  {
    title: 'Monthly Expenses',
    value: '$6,200',
    change: '-2.1%',
    trend: 'down' as const,
    icon: CreditCard,
    color: 'text-orange-600',
    progress: 62
  },
  {
    title: 'Savings Rate',
    value: '27%',
    change: '+5.3%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'text-purple-600',
    progress: 27
  }
];

export const OverviewCards = () => {
  const { isLowPerformance } = usePerformanceOptimization();

  return (
    <motion.div
      variants={isLowPerformance ? undefined : containerVariants}
      initial={isLowPerformance ? false : "hidden"}
      animate={isLowPerformance ? false : "visible"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-spacing"
    >
      {overviewData.map((item, index) => (
        <motion.div
          key={item.title}
          variants={isLowPerformance ? undefined : itemVariants}
          whileHover={isLowPerformance ? undefined : { scale: 1.02, y: -4 }}
          className="cursor-pointer will-change-transform"
        >
          <Card className="shadow-elevation-2 interactive-card gpu-accelerated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <div className="relative">
                <ProgressRing 
                  progress={item.progress} 
                  size={40} 
                  strokeWidth={4}
                  className={item.color}
                >
                  <item.icon size={16} className={item.color} />
                </ProgressRing>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {item.value}
              </div>
              <div className="flex items-center space-x-1">
                {item.trend === 'up' ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                <span className={`text-xs ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
