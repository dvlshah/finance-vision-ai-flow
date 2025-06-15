
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FinancialHealthScoreProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export const FinancialHealthScore = ({ score, trend, changePercent }: FinancialHealthScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  const getGlowColor = (score: number) => {
    if (score >= 80) return 'shadow-[0_0_30px_rgba(16,185,129,0.3)]';
    if (score >= 60) return 'shadow-[0_0_30px_rgba(245,158,11,0.3)]';
    return 'shadow-[0_0_30px_rgba(239,68,68,0.3)]';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-card border-0 shadow-level-2 hover:shadow-level-3 transition-all duration-500 overflow-hidden relative group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 animate-gradient-shift" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400/30 rounded-full animate-float" />
          <div className="absolute top-12 right-8 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-gradient-primary">Financial Health Score</h2>
                  <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
                </div>
                <p className="text-sm text-slate-600">Based on your spending patterns and savings</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <motion.div 
                    className={cn(
                      "text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent relative",
                      getScoreGradient(score)
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, type: 'spring', bounce: 0.5 }}
                  >
                    <span className="relative z-10">{score}</span>
                    <div className={cn("absolute inset-0 blur-xl opacity-30", getGlowColor(score))} />
                  </motion.div>
                  
                  <div className="space-y-1">
                    <div className={cn(
                      "text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                      getScoreGradient(score)
                    )}>
                      {getScoreLabel(score)}
                    </div>
                    <div className="text-sm text-slate-500">out of 100</div>
                  </div>
                </div>

                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className={cn(
                    "p-2 rounded-xl",
                    trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-slate-100'
                  )}>
                    {trend === 'up' ? (
                      <TrendingUp size={16} className="text-green-500" />
                    ) : trend === 'down' ? (
                      <TrendingDown size={16} className="text-red-500" />
                    ) : null}
                  </div>
                  <span className={cn(
                    "text-sm font-semibold",
                    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-600'
                  )}>
                    {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{Math.abs(changePercent)}% vs last month
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* 3D Circular Progress Ring */}
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90 drop-shadow-lg">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'} />
                      <stop offset="100%" stopColor={score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#dc2626'} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Background circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="rgba(148, 163, 184, 0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  
                  {/* Progress circle */}
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - score / 100)}`}
                    strokeLinecap="round"
                    filter="url(#glow)"
                    initial={{ strokeDashoffset: `${2 * Math.PI * 54}` }}
                    animate={{ strokeDashoffset: `${2 * Math.PI * 54 * (1 - score / 100)}` }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                  />
                </svg>
                
                {/* Center score display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    className={cn(
                      "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                      getScoreGradient(score)
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 1, type: 'spring' }}
                  >
                    {score}
                  </motion.span>
                </div>
              </div>
              
              {/* Floating AI indicator */}
              <motion.div 
                className="flex items-center gap-2 px-3 py-2 glass rounded-full border border-white/20"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-xs font-medium text-slate-700">AI Enhanced</span>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
