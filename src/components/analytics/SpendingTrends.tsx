
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Sparkles, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const mockSpendingData = [
  { month: 'Jan', spending: 3200, income: 5000, savings: 1800 },
  { month: 'Feb', spending: 2800, income: 5000, savings: 2200 },
  { month: 'Mar', spending: 3500, income: 5000, savings: 1500 },
  { month: 'Apr', spending: 2900, income: 5000, savings: 2100 },
  { month: 'May', spending: 3100, income: 5200, savings: 2100 },
  { month: 'Jun', spending: 3300, income: 5200, savings: 1900 }
];

const mockCategoryData = [
  { category: 'Food', amount: 850, percentage: 25.8, change: 5.2 },
  { category: 'Transportation', amount: 420, percentage: 12.7, change: -2.1 },
  { category: 'Entertainment', amount: 380, percentage: 11.5, change: 15.3 },
  { category: 'Shopping', amount: 650, percentage: 19.7, change: -8.4 },
  { category: 'Utilities', amount: 280, percentage: 8.5, change: 1.2 },
  { category: 'Healthcare', amount: 190, percentage: 5.8, change: 22.1 }
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

export const SpendingTrends = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [viewType, setViewType] = useState('line');

  const currentMonthSpending = 3300;
  const previousMonthSpending = 3100;
  const spendingChange = ((currentMonthSpending - previousMonthSpending) / previousMonthSpending) * 100;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300 overflow-hidden relative group">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/20 to-indigo-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gradient-primary">Spending Trends</span>
                <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
              </CardTitle>
              <div className="flex gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32 glass-card border-0 shadow-level-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={viewType} onValueChange={setViewType}>
                  <SelectTrigger className="w-24 glass-card border-0 shadow-level-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="bar">Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div 
                className="text-center p-4 glass rounded-xl border border-slate-200/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-slate-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-slate-900">${currentMonthSpending.toLocaleString()}</p>
                <div className={`flex items-center justify-center gap-1 text-sm mt-2 ${spendingChange > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {spendingChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(spendingChange).toFixed(1)}% vs last month
                </div>
              </motion.div>
              <motion.div 
                className="text-center p-4 glass rounded-xl border border-emerald-200/50 bg-emerald-50/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-slate-600 mb-1">Average Income</p>
                <p className="text-2xl font-bold text-emerald-600">$5,067</p>
                <p className="text-xs text-slate-500 mt-1">6-month average</p>
              </motion.div>
              <motion.div 
                className="text-center p-4 glass rounded-xl border border-blue-200/50 bg-blue-50/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-slate-600 mb-1">Savings Rate</p>
                <p className="text-2xl font-bold text-blue-600">36.5%</p>
                <p className="text-xs text-slate-500 mt-1">Income - Expenses</p>
              </motion.div>
            </div>

            <div className="h-80 relative">
              <ResponsiveContainer width="100%" height="100%">
                {viewType === 'line' ? (
                  <LineChart data={mockSpendingData}>
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="spending" stroke="#f59e0b" strokeWidth={3} name="Spending" dot={{ fill: '#fff', strokeWidth: 3, r: 5, filter: 'url(#glow)' }} />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} name="Income" dot={{ fill: '#fff', strokeWidth: 3, r: 5, filter: 'url(#glow)' }} />
                    <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={3} name="Savings" dot={{ fill: '#fff', strokeWidth: 3, r: 5, filter: 'url(#glow)' }} />
                  </LineChart>
                ) : (
                  <BarChart data={mockSpendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="spending" fill="#f59e0b" name="Spending" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="savings" fill="#3b82f6" name="Savings" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gradient-primary">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCategoryData.map((category, index) => (
                <motion.div 
                  key={category.category} 
                  className="flex items-center justify-between p-3 glass rounded-xl border border-slate-200/50 hover:shadow-level-1 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900">{category.category}</span>
                      <span className="text-sm font-bold text-slate-900">${category.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-slate-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 min-w-[3rem] font-medium">{category.percentage}%</span>
                    </div>
                  </div>
                  <div className={`ml-4 text-sm font-semibold flex items-center gap-1 ${category.change > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {category.change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(category.change)}%
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
