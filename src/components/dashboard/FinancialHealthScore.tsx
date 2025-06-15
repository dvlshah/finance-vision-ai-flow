
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancialHealthScoreProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export const FinancialHealthScore = ({ score, trend, changePercent }: FinancialHealthScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white border-0 shadow-lg h-full">
      <CardContent className="p-6 h-full">
        <div className="h-full flex flex-col justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">Financial Health Score</h2>
            <p className="text-sm text-slate-600">Based on your spending patterns and savings</p>
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <div className={cn(
                  "text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                  getScoreGradient(score)
                )}>
                  {score}
                </div>
                <div className="space-y-0">
                  <div className="text-base font-medium text-slate-700">{getScoreLabel(score)}</div>
                  <div className="text-xs text-slate-500">out of 100</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {trend === 'up' ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : trend === 'down' ? (
                  <TrendingDown size={14} className="text-red-500" />
                ) : null}
                <span className={cn(
                  "text-sm font-medium",
                  trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-600'
                )}>
                  {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{Math.abs(changePercent)}% vs last month
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-200"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - score / 100)}`}
                    className={cn(
                      "transition-all duration-1000 ease-out",
                      score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'
                    )}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn(
                    "text-sm font-bold",
                    getScoreColor(score)
                  )}>
                    {score}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
