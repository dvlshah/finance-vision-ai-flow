
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { CashFlowData } from '@/types/financial';
import { motion } from 'framer-motion';
import { itemVariants, scaleInVariants } from '@/lib/animations';

const trendData: CashFlowData[] = [
  { month: 'Jan', income: 8500, expenses: 5200, netFlow: 3300 },
  { month: 'Feb', income: 8500, expenses: 5800, netFlow: 2700 },
  { month: 'Mar', income: 8500, expenses: 6100, netFlow: 2400 },
  { month: 'Apr', income: 8500, expenses: 5900, netFlow: 2600 },
  { month: 'May', income: 8500, expenses: 6200, netFlow: 2300 },
  { month: 'Jun', income: 8800, expenses: 5700, netFlow: 3100 },
];

export const CashFlowTrend = () => {
  const currentMonth = trendData[trendData.length - 1];
  const previousMonth = trendData[trendData.length - 2];
  const changePercent = ((currentMonth.netFlow - previousMonth.netFlow) / previousMonth.netFlow * 100).toFixed(1);

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Cash Flow Trend</CardTitle>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                ${currentMonth.netFlow.toLocaleString()}
              </div>
              <div className={`text-sm ${Number(changePercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(changePercent) >= 0 ? '+' : ''}{changePercent}% vs last month
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            animate="visible"
          >
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="netFlowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Net Flow']}
                  labelStyle={{ color: '#1e293b' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="netFlow"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#netFlowGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
