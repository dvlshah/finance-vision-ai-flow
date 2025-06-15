
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { itemVariants, containerVariants } from '@/lib/animations';

const reviewItems = [
  {
    count: 3,
    type: 'Low Confidence',
    description: 'AI needs help categorizing',
    color: 'bg-amber-100 text-amber-800'
  },
  {
    count: 1,
    type: 'Duplicate',
    description: 'Possible duplicate transaction',
    color: 'bg-red-100 text-red-800'
  },
  {
    count: 2,
    type: 'Unusual',
    description: 'Spending outside normal patterns',
    color: 'bg-blue-100 text-blue-800'
  }
];

export const NeedsReviewSummary = () => {
  const totalReviews = reviewItems.reduce((sum, item) => sum + item.count, 0);

  if (totalReviews === 0) {
    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardContent className="p-6 text-center">
            <div className="space-y-3">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">All caught up!</h3>
                <p className="text-sm text-slate-600">No transactions need review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Needs Review
            </div>
            <Badge variant="secondary">{totalReviews}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {reviewItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge className={item.color}>
                    {item.count}
                  </Badge>
                  <div>
                    <div className="font-medium text-sm text-slate-900">{item.type}</div>
                    <div className="text-xs text-slate-600">{item.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <Link to="/transactions">
            <Button variant="outline" className="w-full mt-4">
              Review Transactions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};
