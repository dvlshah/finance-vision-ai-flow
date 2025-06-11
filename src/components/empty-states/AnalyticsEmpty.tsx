
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Upload, TrendingUp } from 'lucide-react';

interface AnalyticsEmptyProps {
  onUploadClick: () => void;
}

export const AnalyticsEmpty = ({ onUploadClick }: AnalyticsEmptyProps) => {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center space-y-8">
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center">
              <BarChart3 className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Analytics Coming Soon</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Add some transactions first, and we'll generate powerful insights about your spending patterns and financial health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="p-6 bg-muted/50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-brand-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Spending Trends</h3>
              <p className="text-sm text-muted-foreground">
                Track how your spending changes over time with detailed charts and insights
              </p>
            </div>
            <div className="p-6 bg-muted/50 rounded-lg">
              <BarChart3 className="h-8 w-8 text-brand-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Category Breakdown</h3>
              <p className="text-sm text-muted-foreground">
                See where your money goes with automatic categorization and visual breakdowns
              </p>
            </div>
          </div>

          <Button 
            onClick={onUploadClick}
            size="lg"
            className="px-8"
          >
            <Upload className="h-5 w-5 mr-2" />
            Get Started - Upload Statements
          </Button>

          <div className="text-sm text-muted-foreground">
            We'll analyze your data and show insights after you add at least 10 transactions
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
