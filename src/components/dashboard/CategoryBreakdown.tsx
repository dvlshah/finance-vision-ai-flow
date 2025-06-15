
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CategoryData } from '@/types/financial';
import { motion } from 'framer-motion';

const categoryData: CategoryData[] = [
  { name: 'Housing', value: 2100, color: '#0f172a' },
  { name: 'Food', value: 800, color: '#475569' },
  { name: 'Transportation', value: 650, color: '#64748b' },
  { name: 'Entertainment', value: 400, color: '#94a3b8' },
  { name: 'Utilities', value: 300, color: '#cbd5e1' },
  { name: 'Shopping', value: 950, color: '#e2e8f0' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg">
        <p className="font-medium text-slate-900">{data.name}</p>
        <p className="text-sm text-slate-600">
          <span className="font-semibold" style={{ color: data.payload.color }}>
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
      <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900">Spending by Category</CardTitle>
            <p className="text-sm text-slate-500 mt-1">This month's breakdown</p>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                animationBegin={0}
                animationDuration={1200}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              
              <Tooltip content={<CustomTooltip />} />
              
              <Legend 
                verticalAlign="bottom" 
                height={50}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-xs text-slate-700 font-medium">{value}</span>
                )}
                wrapperStyle={{
                  paddingTop: '16px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
