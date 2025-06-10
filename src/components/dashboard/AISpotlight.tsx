
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'tip';
  title: string;
  description: string;
  action?: string;
  value?: string;
  icon: React.ReactNode;
}

const spotlightInsights: Insight[] = [
  {
    id: '1',
    type: 'success',
    title: 'Great Savings Month!',
    description: 'You saved 15% more than your average this month.',
    value: '+$185',
    icon: <TrendingUp className="h-5 w-5" />,
    action: 'View Details'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Entertainment Budget Alert',
    description: 'You\'ve spent 93% of your entertainment budget.',
    value: '93%',
    icon: <AlertCircle className="h-5 w-5" />,
    action: 'Review Budget'
  }
];

export const AISpotlight = () => {
  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-amber-200 bg-amber-50';
      case 'tip': return 'border-purple-200 bg-purple-50';
      default: return 'border-slate-200 bg-slate-50';
    }
  };

  const getInsightIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-amber-600';
      case 'tip': return 'text-purple-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            AI Financial Insights
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spotlightInsights.map((insight) => (
            <div 
              key={insight.id} 
              className={`p-4 border rounded-lg ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`${getInsightIconColor(insight.type)}`}>
                    {insight.icon}
                  </div>
                  <h4 className="font-medium text-slate-900">{insight.title}</h4>
                </div>
                {insight.value && (
                  <Badge variant="secondary" className="text-xs">
                    {insight.value}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600 mb-3">{insight.description}</p>
              {insight.action && (
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  {insight.action}
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
