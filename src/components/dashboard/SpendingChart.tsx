
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { TrendingUp, Sparkles, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const chartData = [
  { month: 'Jan', spending: 5200, income: 8500 },
  { month: 'Feb', spending: 5800, income: 8500 },
  { month: 'Mar', spending: 6100, income: 8500 },
  { month: 'Apr', spending: 5900, income: 8500 },
  { month: 'May', spending: 6200, income: 8500 },
  { month: 'Jun', spending: 5700, income: 8500 },
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
              <span className="text-sm text-slate-600 capitalize font-medium">{entry.dataKey}:</span>
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

export const SpendingChart = () => {
  const currentMonth = chartData[chartData.length - 1];
  const totalSaved = currentMonth.income - currentMonth.spending;
  const savingsRate = ((totalSaved / currentMonth.income) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="col-span-full lg:col-span-2"
    >
      <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300 overflow-hidden relative group">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-indigo-50/20 animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-6 right-8 w-2 h-2 bg-blue-400/20 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-12 left-12 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardHeader className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-shimmer opacity-50" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gradient-primary flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                Income vs Spending
                <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
              </CardTitle>
              <p className="text-sm text-slate-500 mt-1">Track your financial flow over time</p>
            </div>
            
            <div className="text-right space-y-2">
              <motion.div 
                className="text-2xl font-bold text-emerald-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
              >
                ${totalSaved.toLocaleString()}
              </motion.div>
              <Badge variant="secondary" className="text-xs px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700">
                {savingsRate}% saved
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="50%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(148, 163, 184, 0.2)" 
                vertical={false}
              />
              
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
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#incomeGradient)"
                dot={{ fill: '#fff', strokeWidth: 3, r: 5, filter: 'url(#glow)' }}
                activeDot={{ 
                  r: 7, 
                  stroke: '#10b981', 
                  strokeWidth: 2, 
                  fill: '#fff',
                  filter: 'url(#glow)'
                }}
                animationDuration={1500}
              />
              
              <Area
                type="monotone"
                dataKey="spending"
                stroke="#f59e0b"
                strokeWidth={3}
                fill="url(#spendingGradient)"
                dot={{ fill: '#fff', strokeWidth: 3, r: 5, filter: 'url(#glow)' }}
                activeDot={{ 
                  r: 7, 
                  stroke: '#f59e0b', 
                  strokeWidth: 2, 
                  fill: '#fff',
                  filter: 'url(#glow)'
                }}
                animationDuration={1500}
                animationBegin={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
