
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, Info, CheckCircle, ArrowRight } from 'lucide-react';

interface PulseInsight {
  id: string;
  type: 'urgent' | 'opportunity' | 'observation' | 'confirmation';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  metadata?: {
    amount?: string;
    timeframe?: string;
    progress?: number;
  };
}

const mockInsights: PulseInsight[] = [
  {
    id: '1',
    type: 'urgent',
    title: 'Mortgage Payment Alert',
    description: "Heads up: Your $1,850 mortgage payment is due in 3 days. Your checking account balance is currently $1,200. I recommend moving $650 from your 'High-Yield Savings' to cover it.",
    action: {
      label: 'Initiate Transfer',
      onClick: () => console.log('Initiating transfer...')
    },
    metadata: {
      amount: '$650',
      timeframe: '3 days'
    }
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Investment Performance Update',
    description: "Your 'AAPL' investment is up 8% this month, adding $450 to your net worth. You're now 65% of the way to your 'New Car' goal.",
    metadata: {
      amount: '+$450',
      progress: 65
    }
  },
  {
    id: '3',
    type: 'observation',
    title: 'Spending Pattern Notice',
    description: "You've spent $120 on 'Coffee Shops' so far this month, which is on track to be 30% higher than your average. Just an FYI.",
    metadata: {
      amount: '$120',
      timeframe: 'This month'
    }
  },
  {
    id: '4',
    type: 'confirmation',
    title: 'Salary Processed',
    description: "Your salary of $4,250 was deposited today. I've automatically allocated $500 to 'Vacation Fund' and $300 to 'Investments' as you planned.",
    metadata: {
      amount: '$4,250'
    }
  }
];

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'urgent': return AlertTriangle;
    case 'opportunity': return TrendingUp;
    case 'observation': return Info;
    case 'confirmation': return CheckCircle;
    default: return Info;
  }
};

const getInsightColors = (type: string) => {
  switch (type) {
    case 'urgent': return {
      border: 'border-red-200',
      background: 'bg-red-50',
      icon: 'text-red-600',
      badge: 'bg-red-100 text-red-800'
    };
    case 'opportunity': return {
      border: 'border-green-200',
      background: 'bg-green-50',
      icon: 'text-green-600',
      badge: 'bg-green-100 text-green-800'
    };
    case 'observation': return {
      border: 'border-amber-200',
      background: 'bg-amber-50',
      icon: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-800'
    };
    case 'confirmation': return {
      border: 'border-blue-200',
      background: 'bg-blue-50',
      icon: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-800'
    };
    default: return {
      border: 'border-slate-200',
      background: 'bg-slate-50',
      icon: 'text-slate-600',
      badge: 'bg-slate-100 text-slate-800'
    };
  }
};

export const DailyPulse = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Daily Pulse</h2>
          <p className="text-slate-600 mt-1">What's most important for your money today</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {mockInsights.length} insights
        </Badge>
      </div>

      <div className="space-y-4">
        {mockInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const colors = getInsightColors(insight.type);
          
          return (
            <Card 
              key={insight.id} 
              className={`${colors.border} ${colors.background} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`${colors.icon} mt-1`}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                        <Badge className={`${colors.badge} text-xs mt-2 capitalize`}>
                          {insight.type}
                        </Badge>
                      </div>
                      
                      {insight.metadata && (
                        <div className="text-right">
                          {insight.metadata.amount && (
                            <div className="text-lg font-bold text-slate-900">
                              {insight.metadata.amount}
                            </div>
                          )}
                          {insight.metadata.timeframe && (
                            <div className="text-sm text-slate-500">
                              {insight.metadata.timeframe}
                            </div>
                          )}
                          {insight.metadata.progress && (
                            <div className="text-sm text-slate-500">
                              {insight.metadata.progress}% complete
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                      {insight.description}
                    </p>

                    {insight.action && (
                      <div className="flex justify-end pt-2">
                        <Button 
                          onClick={insight.action.onClick}
                          className="bg-slate-900 hover:bg-slate-800"
                        >
                          {insight.action.label}
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
