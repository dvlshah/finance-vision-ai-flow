
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CategoryData } from '@/types/financial';

const categoryData: CategoryData[] = [
  { name: 'Housing', value: 2100, color: '#3b82f6' },
  { name: 'Food', value: 800, color: '#ef4444' },
  { name: 'Transportation', value: 650, color: '#f59e0b' },
  { name: 'Entertainment', value: 400, color: '#8b5cf6' },
  { name: 'Utilities', value: 300, color: '#10b981' },
  { name: 'Shopping', value: 950, color: '#f97316' },
];

export const CategoryBreakdown = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Spending by Category</CardTitle>
        <p className="text-sm text-slate-500">This month's breakdown</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Amount']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
