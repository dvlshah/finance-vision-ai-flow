
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
    <Card className="bg-gradient-to-br from-slate-50 to-white border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-1">Financial Health Score</h2>
              <p className="text-sm text-slate-600">Based on your spending patterns and savings</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <div className={cn(
                  "text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                  getScoreGradient(score)
                )}>
                  {score}
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-medium text-slate-700">{getScoreLabel(score)}</div>
                  <div className="text-sm text-slate-500">out of 100</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {trend === 'up' ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : trend === 'down' ? (
                  <TrendingDown size={16} className="text-red-500" />
                ) : null}
                <span className={cn(
                  "text-sm font-medium",
                  trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-600'
                )}>
                  {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{Math.abs(changePercent)}% vs last month
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-slate-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                  className={cn(
                    "transition-all duration-1000 ease-out",
                    score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'
                  )}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn(
                  "text-lg font-bold",
                  getScoreColor(score)
                )}>
                  {score}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
