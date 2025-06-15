
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const reviewItems = [
  {
    count: 3,
    type: 'Low Confidence',
    description: 'AI needs help categorizing',
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-600'
  },
  {
    count: 1,
    type: 'Duplicate',
    description: 'Possible duplicate transaction',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: AlertTriangle,
    iconColor: 'text-red-600'
  },
  {
    count: 2,
    type: 'Unusual',
    description: 'Spending outside normal patterns',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Eye,
    iconColor: 'text-blue-600'
  }
];

export const NeedsReviewSummary = () => {
  const totalReviews = reviewItems.reduce((sum, item) => sum + item.count, 0);

  if (totalReviews === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card border-0 shadow-level-1">
          <CardContent className="p-8 text-center">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl animate-pulse" />
                <CheckCircle className="h-8 w-8 text-green-600 relative z-10" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">All caught up!</h3>
                <p className="text-sm text-slate-600">No transactions need review</p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300">
        <CardHeader className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-red-50/50 rounded-t-2xl opacity-60" />
          <CardTitle className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-gradient-primary">Needs Review</span>
            </div>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-glow">
              {totalReviews}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 relative">
          {reviewItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 glass rounded-xl border border-white/20 hover:shadow-level-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-lg blur group-hover:opacity-30 transition-opacity duration-300" />
                  <Badge className={`${item.color} relative z-10 px-3 py-1 text-sm font-semibold border`}>
                    {item.count}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <item.icon size={16} className={item.iconColor} />
                  <div>
                    <div className="font-medium text-sm text-slate-900">{item.type}</div>
                    <div className="text-xs text-slate-600">{item.description}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Link to="/transactions">
              <Button className="w-full mt-4 btn-gradient hover:shadow-glow transform hover:scale-[1.02] transition-all duration-300 group">
                <span>Review Transactions</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
