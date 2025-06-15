
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertCircle, ArrowRight, Sparkles, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'tip';
  title: string;
  description: string;
  action?: string;
  value?: string;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
}

const spotlightInsights: Insight[] = [
  {
    id: '1',
    type: 'success',
    title: 'Great Savings Month!',
    description: 'You saved 15% more than your average this month. Keep up the excellent work!',
    value: '+$185',
    icon: <TrendingUp className="h-5 w-5" />,
    action: 'View Details',
    priority: 'high'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Entertainment Budget Alert',
    description: 'You\'ve spent 93% of your entertainment budget. Consider reviewing your spending.',
    value: '93%',
    icon: <AlertCircle className="h-5 w-5" />,
    action: 'Review Budget',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'tip',
    title: 'Investment Opportunity',
    description: 'Based on your cash flow, you could invest an additional $300 this month.',
    value: '$300',
    icon: <Lightbulb className="h-5 w-5" />,
    action: 'Learn More',
    priority: 'low'
  }
];

export const AISpotlight = () => {
  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80';
      case 'warning': return 'border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/80';
      case 'tip': return 'border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-violet-50/80';
      default: return 'border-slate-200/50 bg-gradient-to-br from-slate-50/80 to-gray-50/80';
    }
  };

  const getInsightIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'tip': return 'text-purple-600 bg-purple-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
      case 'medium': return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      case 'low': return 'bg-green-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      default: return 'bg-slate-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300 overflow-hidden relative group">
        {/* AI-themed background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Neural network pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-8 w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
          <div className="absolute top-8 left-12 w-0.5 h-8 bg-purple-500 transform rotate-45" />
          <div className="absolute top-12 right-16 w-1 h-1 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg animate-pulse" />
                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gradient-primary font-semibold text-lg">AI Financial Insights</span>
                  <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
                </div>
                <p className="text-sm text-slate-500">Powered by machine learning</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group">
                <span className="mr-2">View All</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {spotlightInsights.map((insight, index) => (
              <motion.div 
                key={insight.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className={`relative p-5 border rounded-2xl ${getInsightColor(insight.type)} hover:shadow-level-2 transition-all duration-300 group/card overflow-hidden cursor-pointer transform hover:-translate-y-1`}
              >
                {/* Priority indicator */}
                <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${getPriorityIndicator(insight.priority)} animate-pulse`} />
                
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${getInsightIconColor(insight.type)} group-hover/card:scale-110 transition-transform duration-300 shadow-level-1`}>
                        {insight.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm leading-tight">{insight.title}</h4>
                        {insight.value && (
                          <Badge 
                            variant="secondary" 
                            className="text-xs mt-1 px-2 py-1 bg-white/80 border border-white/40 shadow-level-1 group-hover/card:shadow-level-2 transition-shadow duration-300"
                          >
                            {insight.value}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{insight.description}</p>
                  
                  {insight.action && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-xs bg-white/50 border-white/60 hover:bg-white/80 hover:border-white/80 transition-all duration-300 group/button"
                    >
                      <span className="mr-1">{insight.action}</span>
                      <Zap className="h-3 w-3 group-hover/button:rotate-12 transition-transform duration-300" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* AI Learning Indicator */}
          <motion.div 
            className="mt-6 p-4 glass rounded-2xl border border-white/20 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-glow" />
              <span>AI is learning from your patterns to provide better insights</span>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
