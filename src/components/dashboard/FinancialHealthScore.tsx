
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

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-white border-0 shadow-lg">
      <CardContent className="p-8 text-center">
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-slate-600">Financial Health Score</h2>
          
          <div className="relative">
            <div className={cn(
              "text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              getScoreGradient(score)
            )}>
              {score}
            </div>
            <div className="text-sm font-medium text-slate-500 mt-1">out of 100</div>
          </div>

          <div className="flex items-center justify-center space-x-2">
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

          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={cn(
                "h-2 rounded-full bg-gradient-to-r transition-all duration-1000",
                getScoreGradient(score)
              )}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
