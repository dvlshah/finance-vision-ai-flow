import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/lib/animations';

interface DashboardHeroProps {
  financialHealthScore: number;
  scoreChange: {
    value: number;
    trend: 'up' | 'down' | 'stable';
  };
}

export const DashboardHero = ({ 
  financialHealthScore, 
  scoreChange 
}: DashboardHeroProps) => {
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (financialHealthScore / 100) * circumference;

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-3xl p-8 mb-8 border border-border/50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Good morning 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your financial overview
          </p>
        </motion.div>

        {/* Clean Centered Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left - Simple Metric */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <p className="text-sm text-muted-foreground mb-2">Monthly Savings</p>
            <p className="text-2xl font-semibold text-foreground">$3,100</p>
            <div className="flex items-center justify-center lg:justify-start mt-1">
              <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
              <span className="text-sm text-emerald-600 font-medium">+8%</span>
            </div>
          </motion.div>

          {/* Center - Clean Health Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="relative inline-block mb-4">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-1000 ease-out",
                    getScoreColor(financialHealthScore)
                  )}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">
                  {financialHealthScore}
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-foreground">
                Financial Health
              </h3>
              <p className={cn("text-sm font-medium", getScoreColor(financialHealthScore))}>
                {getScoreLabel(financialHealthScore)}
              </p>
              <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                {scoreChange.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-600" />}
                {scoreChange.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-600" />}
                <span className={cn(
                  scoreChange.trend === 'up' ? 'text-emerald-600' : 
                  scoreChange.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                )}>
                  {scoreChange.trend !== 'stable' && (scoreChange.trend === 'up' ? '+' : '-')}
                  {Math.abs(scoreChange.value)}% this month
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Simple Metric */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center lg:text-right"
          >
            <p className="text-sm text-muted-foreground mb-2">Net Worth</p>
            <p className="text-2xl font-semibold text-foreground">$48,250</p>
            <div className="flex items-center justify-center lg:justify-end mt-1">
              <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
              <span className="text-sm text-emerald-600 font-medium">+15%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};