
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CategoryData } from '@/types/financial';
import { motion } from 'framer-motion';

const categoryData: CategoryData[] = [
  { name: 'Housing', value: 2100, color: '#6366f1' },
  { name: 'Food', value: 800, color: '#ef4444' },
  { name: 'Transportation', value: 650, color: '#f59e0b' },
  { name: 'Entertainment', value: 400, color: '#8b5cf6' },
  { name: 'Utilities', value: 300, color: '#10b981' },
  { name: 'Shopping', value: 950, color: '#f97316' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="glass-card p-3 border-0 shadow-level-2">
        <p className="font-medium text-slate-900">{data.name}</p>
        <p className="text-sm text-slate-600">
          <span className="font-bold" style={{ color: data.payload.color }}>
            ${data.value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export const CategoryBreakdown = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300">
        <CardHeader className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-t-2xl opacity-60" />
          <div className="relative z-10">
            <CardTitle className="text-lg font-semibold text-gradient-primary">Spending by Category</CardTitle>
            <p className="text-sm text-slate-500">This month's breakdown</p>
          </div>
        </CardHeader>
        
        <CardContent className="relative">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <defs>
                {categoryData.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
                  </linearGradient>
                ))}
              </defs>
              
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                animationBegin={0}
                animationDuration={1200}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#gradient-${index})`}
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              
              <Tooltip content={<CustomTooltip />} />
              
              <Legend 
                verticalAlign="bottom" 
                height={60}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-slate-700 font-medium">{value}</span>
                )}
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
