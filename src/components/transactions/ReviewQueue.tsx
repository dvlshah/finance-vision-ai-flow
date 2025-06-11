
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ui/confidence-badge';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  confidence: number;
  reason?: string;
  account?: string;
  merchant?: string;
}

interface ReviewQueueProps {
  transactions: Transaction[];
  onUpdateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

export const ReviewQueue = ({ transactions, onUpdateTransaction }: ReviewQueueProps) => {
  const needsReview = transactions.filter(t => t.confidence < 90);

  if (needsReview.length === 0) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="flex items-center justify-center py-6">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-700 font-medium">All transactions reviewed!</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-amber-50 border-amber-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-lg text-amber-900">Review Queue</CardTitle>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              {needsReview.length} pending
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              needsReview.forEach(transaction => {
                onUpdateTransaction(transaction.id, {
                  confidence: 100,
                  reason: 'Bulk approved by user'
                });
              });
            }}
          >
            Approve All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {needsReview.slice(0, 5).map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 truncate">{transaction.description}</h4>
                <div className="flex items-center space-x-2 text-sm text-slate-500 mt-1">
                  <span>{transaction.date}</span>
                  <span>•</span>
                  <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 flex-shrink-0">
                <ConfidenceBadge
                  confidence={transaction.confidence}
                  category={transaction.category}
                  reason={transaction.reason}
                />
              </div>
            </div>
          ))}
          
          {needsReview.length > 5 && (
            <div className="text-center pt-2">
              <span className="text-sm text-slate-500">
                and {needsReview.length - 5} more transactions to review
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
