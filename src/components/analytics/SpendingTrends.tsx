
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useState } from 'react';

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

export const SpendingTrends = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [viewType, setViewType] = useState('line');

  const currentMonthSpending = 3300;
  const previousMonthSpending = 3100;
  const spendingChange = ((currentMonthSpending - previousMonthSpending) / previousMonthSpending) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Spending Trends
            </CardTitle>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-24">
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
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">This Month</p>
              <p className="text-2xl font-bold text-slate-900">${currentMonthSpending.toLocaleString()}</p>
              <div className={`flex items-center justify-center gap-1 text-sm ${spendingChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {spendingChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(spendingChange).toFixed(1)}% vs last month
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-slate-600">Average Income</p>
              <p className="text-2xl font-bold text-green-600">$5,067</p>
              <p className="text-xs text-slate-500">6-month average</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-slate-600">Savings Rate</p>
              <p className="text-2xl font-bold text-blue-600">36.5%</p>
              <p className="text-xs text-slate-500">Income - Expenses</p>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {viewType === 'line' ? (
                <LineChart data={mockSpendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Line type="monotone" dataKey="spending" stroke="#ef4444" strokeWidth={2} name="Spending" />
                  <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} name="Savings" />
                </LineChart>
              ) : (
                <BarChart data={mockSpendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="spending" fill="#ef4444" name="Spending" />
                  <Bar dataKey="income" fill="#22c55e" name="Income" />
                  <Bar dataKey="savings" fill="#3b82f6" name="Savings" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCategoryData.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-900">{category.category}</span>
                    <span className="text-sm font-semibold">${category.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-slate-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-600 min-w-[3rem]">{category.percentage}%</span>
                  </div>
                </div>
                <div className={`ml-4 text-sm font-medium flex items-center gap-1 ${category.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {category.change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(category.change)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
