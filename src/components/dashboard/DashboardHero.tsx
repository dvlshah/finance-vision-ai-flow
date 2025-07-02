import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, Target, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/lib/animations';

interface HeroMetric {
  label: string;
  value: string;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'stable';
  };
  icon: React.ReactNode;
}

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

  const metrics: HeroMetric[] = [
    {
      label: 'Monthly Savings',
      value: '$3,100',
      change: { value: '+8.2%', trend: 'up' },
      icon: <Target className="w-5 h-5" />
    },
    {
      label: 'Budget Status',
      value: '78% Used',
      change: { value: '-5%', trend: 'down' },
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      label: 'This Month',
      value: '$5,400',
      change: { value: '+12%', trend: 'up' },
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (financialHealthScore / 100) * circumference;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="hero-gradient rounded-3xl p-8 mb-8 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-white/80 text-lg">
            {currentDate} • Your financial overview
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Metrics */}
          <div className="lg:col-span-3 space-y-4">
            {metrics.slice(0, 2).map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="hero-metric-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-primary/70">{metric.icon}</div>
                  {metric.change && (
                    <div className={cn(
                      "flex items-center space-x-1 text-sm font-medium",
                      metric.change.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    )}>
                      {metric.change.trend === 'up' ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      <span>{metric.change.value}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-xl font-bold text-foreground">{metric.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Center - Financial Health Score */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="hero-metric-card w-full max-w-md"
            >
              <div className="text-center">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  Financial Health Score
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Based on your spending patterns and savings
                </p>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted/20"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
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
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-foreground">
                        {financialHealthScore}
                      </span>
                      <span className="text-sm text-muted-foreground">out of 100</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className={cn(
                    "text-lg font-semibold",
                    getScoreColor(financialHealthScore)
                  )}>
                    {getScoreLabel(financialHealthScore)}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    {scoreChange.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : scoreChange.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    ) : null}
                    <span className={cn(
                      "text-sm font-medium",
                      scoreChange.trend === 'up' ? 'text-emerald-600' : 
                      scoreChange.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                    )}>
                      {scoreChange.trend === 'up' ? '+' : scoreChange.trend === 'down' ? '-' : ''}
                      {Math.abs(scoreChange.value)}% vs last month
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Metrics */}
          <div className="lg:col-span-3 space-y-4">
            {metrics.slice(2).map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="hero-metric-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-primary/70">{metric.icon}</div>
                  {metric.change && (
                    <div className={cn(
                      "flex items-center space-x-1 text-sm font-medium",
                      metric.change.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    )}>
                      {metric.change.trend === 'up' ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      <span>{metric.change.value}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-xl font-bold text-foreground">{metric.value}</p>
              </motion.div>
            ))}
            
            {/* Additional metric for better balance */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hero-metric-card"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-primary/70">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1 text-sm font-medium text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+15%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Net Worth</p>
              <p className="text-xl font-bold text-foreground">$48,250</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};