
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Tag, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchSummary {
  type: 'spending' | 'income' | 'category' | 'trend' | 'comparison' | 'general';
  title: string;
  value?: string | number;
  change?: number;
  period?: string;
  details: string;
  insights?: string[];
  relatedData?: { label: string; value: string }[];
}

interface SearchSummaryCardProps {
  summary: SearchSummary;
  query: string;
}

export const SearchSummaryCard = ({ summary, query }: SearchSummaryCardProps) => {
  const getIcon = () => {
    switch (summary.type) {
      case 'spending':
      case 'income':
        return <DollarSign className="h-5 w-5" />;
      case 'category':
        return <Tag className="h-5 w-5" />;
      case 'trend':
        return summary.change && summary.change > 0 ? 
          <TrendingUp className="h-5 w-5 text-green-600" /> : 
          <TrendingDown className="h-5 w-5 text-red-600" />;
      case 'comparison':
        return <Calendar className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getValueColor = () => {
    if (summary.type === 'spending') return 'text-red-600';
    if (summary.type === 'income') return 'text-green-600';
    return 'text-slate-900';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              {getIcon()}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-slate-900">
                {summary.title}
              </CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Based on: "{query}"
              </p>
            </div>
            {summary.value && (
              <div className="text-right">
                <div className={`text-2xl font-bold ${getValueColor()}`}>
                  {typeof summary.value === 'number' ? `$${summary.value.toFixed(2)}` : summary.value}
                </div>
                {summary.change !== undefined && (
                  <div className={`text-sm flex items-center gap-1 ${
                    summary.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {summary.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(summary.change)}%
                  </div>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-slate-700">{summary.details}</p>
          
          {summary.relatedData && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {summary.relatedData.map((data, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-slate-200">
                  <div className="text-xs text-slate-500 uppercase tracking-wide">{data.label}</div>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{data.value}</div>
                </div>
              ))}
            </div>
          )}

          {summary.insights && summary.insights.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-700">Key Insights:</h4>
              <div className="flex flex-wrap gap-2">
                {summary.insights.map((insight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {insight}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {summary.period && (
            <div className="text-xs text-slate-500 border-t pt-2">
              Period: {summary.period}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
