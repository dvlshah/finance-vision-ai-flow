
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
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
  },
  {
    count: 1,
    type: 'Duplicate',
    description: 'Possible duplicate transaction',
    icon: AlertTriangle,
    iconColor: 'text-red-600',
  },
  {
    count: 2,
    type: 'Unusual',
    description: 'Spending outside normal patterns',
    icon: Eye,
    iconColor: 'text-blue-600',
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
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6 text-center">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mx-auto w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">All caught up!</h3>
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
      <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900">Needs Review</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Requires your attention</p>
            </div>
            <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full text-base font-bold bg-amber-100 text-amber-800 border-amber-200">
              {totalReviews}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          {reviewItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <Badge className={`w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full border ${item.iconColor} bg-white`}>
                  {item.count}
                </Badge>
                <div className="flex items-start gap-3">
                  <item.icon size={16} className={`${item.iconColor} mt-0.5`} />
                  <div>
                    <div className="font-medium text-sm text-slate-900">{item.type}</div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="pt-2"
          >
            <Link to="/transactions" className="block">
              <Button className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors duration-200">
                <span>Review Transactions</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
