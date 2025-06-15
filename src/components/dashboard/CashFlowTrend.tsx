
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { CashFlowData } from '@/types/financial';
import { TrendingUp, TrendingDown, DollarSign, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const trendData: CashFlowData[] = [
  { month: 'Jan', income: 8500, expenses: 5200, netFlow: 3300 },
  { month: 'Feb', income: 8500, expenses: 5800, netFlow: 2700 },
  { month: 'Mar', income: 8500, expenses: 6100, netFlow: 2400 },
  { month: 'Apr', income: 8500, expenses: 5900, netFlow: 2600 },
  { month: 'May', income: 8500, expenses: 6200, netFlow: 2300 },
  { month: 'Jun', income: 8800, expenses: 5700, netFlow: 3100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        className="glass-card p-4 border-0 shadow-level-3 max-w-xs"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <p className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-blue-600" />
          {label} Overview
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shadow-glow" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-slate-600 capitalize font-medium">
                {entry.dataKey === 'netFlow' ? 'Net Flow' : entry.dataKey}:
              </span>
            </div>
            <span className="text-sm font-bold text-slate-900">
              ${entry.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </motion.div>
    );
  }
  return null;
};

export const CashFlowTrend = () => {
  const currentMonth = trendData[trendData.length - 1];
  const previousMonth = trendData[trendData.length - 2];
  const changePercent = ((currentMonth.netFlow - previousMonth.netFlow) / previousMonth.netFlow * 100).toFixed(1);
  const isPositive = Number(changePercent) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300 overflow-hidden relative group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-indigo-50/20 animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-6 right-8 w-2 h-2 bg-blue-400/20 rounded-full animate-float" />
          <div className="absolute bottom-12 left-12 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse-slow" />
        </div>

        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gradient-primary flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                Cash Flow Trend
                <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
              </CardTitle>
              <p className="text-sm text-slate-500 mt-1">6-month net flow analysis</p>
            </div>
            
            <motion.div 
              className="text-right space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div 
                className="text-3xl font-bold text-slate-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
              >
                ${currentMonth.netFlow.toLocaleString()}
              </motion.div>
              
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'} group-hover:scale-110 transition-transform duration-300`}>
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                </div>
                <div className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{changePercent}%
                </div>
              </div>
              
              <Badge variant="secondary" className="text-xs px-2 py-1 bg-white/50 border border-slate-200">
                vs last month
              </Badge>
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="netFlowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="50%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-slate-600"
              />
              
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tickLine={false}
                axisLine={false}
                className="text-slate-600"
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Area
                type="monotone"
                dataKey="netFlow"
                stroke="url(#strokeGradient)"
                strokeWidth={3}
                fill="url(#netFlowGradient)"
                dot={{ fill: '#fff', strokeWidth: 3, r: 6, filter: 'url(#glow)' }}
                activeDot={{ 
                  r: 8, 
                  stroke: '#3b82f6', 
                  strokeWidth: 3, 
                  fill: '#fff',
                  filter: 'url(#glow)',
                  className: 'animate-pulse'
                }}
                animationDuration={2000}
                animationBegin={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
