
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const chartData = [
  { month: 'Jan', spending: 5200, income: 8500 },
  { month: 'Feb', spending: 5800, income: 8500 },
  { month: 'Mar', spending: 6100, income: 8500 },
  { month: 'Apr', spending: 5900, income: 8500 },
  { month: 'May', spending: 6200, income: 8500 },
  { month: 'Jun', spending: 5700, income: 8500 },
];

export const SpendingChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Income vs Spending</CardTitle>
          <p className="text-sm text-slate-500">Track your financial flow over time</p>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, '']}
                  labelStyle={{ color: '#1e293b' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  name="Income"
                  strokeDasharray="0"
                  strokeDashoffset="100%"
                  style={{
                    animation: 'drawLine 2s ease-in-out forwards'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="spending" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  name="Spending"
                  strokeDasharray="0"
                  strokeDashoffset="100%"
                  style={{
                    animation: 'drawLine 2s ease-in-out 0.5s forwards'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
