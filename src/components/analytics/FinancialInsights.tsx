
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, TrendingDown, Target, Calendar, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'info' | 'tip';
  title: string;
  description: string;
  action?: string;
  value?: string;
  icon: React.ReactNode;
}

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'success',
    title: 'Great Savings Month!',
    description: 'You saved 15% more than your average this month. Your grocery spending decreased by $85.',
    value: '+15%',
    icon: <CheckCircle2 className="h-5 w-5" />
  },
  {
    id: '2',
    type: 'warning',
    title: 'Entertainment Budget Alert',
    description: 'You\'ve spent 93% of your entertainment budget with 8 days left in the month.',
    action: 'Review budget',
    value: '93%',
    icon: <AlertCircle className="h-5 w-5" />
  },
  {
    id: '3',
    type: 'tip',
    title: 'Subscription Optimization',
    description: 'You have 3 entertainment subscriptions. Consider consolidating to save ~$25/month.',
    action: 'Review subscriptions',
    value: '$25/mo',
    icon: <Lightbulb className="h-5 w-5" />
  },
  {
    id: '4',
    type: 'info',
    title: 'Spending Pattern Detected',
    description: 'Your coffee purchases spike on Mondays. Average: $18 every Monday.',
    value: '$18',
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: '5',
    type: 'success',
    title: 'Transportation Savings',
    description: 'Switching to public transit saved you $120 compared to last month\'s gas expenses.',
    value: '$120',
    icon: <CheckCircle2 className="h-5 w-5" />
  },
  {
    id: '6',
    type: 'tip',
    title: 'Emergency Fund Goal',
    description: 'You\'re 67% towards your 6-month emergency fund goal. Keep up the great progress!',
    action: 'Adjust savings',
    value: '67%',
    icon: <Target className="h-5 w-5" />
  }
];

const achievementData = [
  { title: 'Savings Streak', value: '4 months', description: 'Consecutive months hitting savings goal' },
  { title: 'Budget Adherence', value: '89%', description: 'Average budget compliance this year' },
  { title: 'Expense Tracking', value: '28 days', description: 'Days of consistent transaction logging' },
  { title: 'Financial Score', value: '8.2/10', description: 'Based on spending habits and savings' }
];

export const FinancialInsights = () => {
  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-amber-200 bg-amber-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      case 'tip': return 'border-purple-200 bg-purple-50';
      default: return 'border-slate-200 bg-slate-50';
    }
  };

  const getInsightIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-amber-600';
      case 'info': return 'text-blue-600';
      case 'tip': return 'text-purple-600';
      default: return 'text-slate-600';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'tip': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockInsights.map((insight) => (
              <div 
                key={insight.id} 
                className={`p-4 border rounded-lg ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`${getInsightIconColor(insight.type)} mt-0.5`}>
                      {insight.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-900">{insight.title}</h4>
                        {insight.value && (
                          <Badge variant="secondary" className="text-xs">
                            {insight.value}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{insight.description}</p>
                      {insight.action && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Financial Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievementData.map((achievement, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {achievement.value}
                </div>
                <div className="font-medium text-slate-700 mb-1">
                  {achievement.title}
                </div>
                <div className="text-xs text-slate-500">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-green-600">$1,850</div>
              <div className="text-xs text-slate-600">Saved</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <TrendingDown className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-blue-600">12%</div>
              <div className="text-xs text-slate-600">Spending Reduction</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-purple-600">4/5</div>
              <div className="text-xs text-slate-600">Goals Met</div>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-amber-600 mx-auto mb-2" />
              <div className="text-lg font-semibold text-amber-600">8.2</div>
              <div className="text-xs text-slate-600">Financial Health</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
