
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';

const overviewData = [
  {
    title: 'Net Worth',
    value: '$124,532',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Monthly Income',
    value: '$8,500',
    change: '+3.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-blue-600'
  },
  {
    title: 'Monthly Expenses',
    value: '$6,200',
    change: '-2.1%',
    trend: 'down',
    icon: CreditCard,
    color: 'text-orange-600'
  },
  {
    title: 'Savings Rate',
    value: '27%',
    change: '+5.3%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-purple-600'
  }
];

export const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewData.map((item) => (
        <Card key={item.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {item.title}
            </CardTitle>
            <item.icon size={20} className={item.color} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {item.value}
            </div>
            <div className="flex items-center space-x-1">
              {item.trend === 'up' ? (
                <TrendingUp size={14} className="text-green-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
              <span className={`text-xs ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {item.change}
              </span>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
