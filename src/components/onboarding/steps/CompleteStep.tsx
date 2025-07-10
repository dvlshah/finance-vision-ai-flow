import { CheckCircle, Sparkles, TrendingUp, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OnboardingData } from "../OnboardingFlow";

interface CompleteStepProps {
  data: OnboardingData;
  onDataUpdate: (data: Partial<OnboardingData>) => void;
}

export const CompleteStep = ({ data }: CompleteStepProps) => {
  const formatCurrency = (amount: string, currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: 'C$',
      AUD: 'A$',
    };
    return `${symbols[currency] || '$'}${amount}`;
  };

  const getCategoryLabels = () => {
    const categoryMap: Record<string, string> = {
      dining: 'Dining & Food',
      shopping: 'Shopping',
      transportation: 'Transportation',
      housing: 'Housing & Utilities',
      entertainment: 'Entertainment',
      healthcare: 'Healthcare',
    };
    
    return data.spendingCategories?.map(id => categoryMap[id]).filter(Boolean) || [];
  };

  const getGoalLabels = () => {
    const goalMap: Record<string, string> = {
      emergency_fund: 'Emergency Fund',
      debt_payoff: 'Pay Off Debt',
      home_purchase: 'Buy a Home',
      vacation: 'Plan Vacation',
      education: 'Education/Skills',
      retirement: 'Retirement Planning',
    };
    
    return data.financialGoals?.map(id => goalMap[id]).filter(Boolean) || [];
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h3 className="text-3xl font-bold">You're all set!</h3>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Your FinanceVision account is ready. Here's what we've set up for you:
        </p>
      </div>

      {/* Summary */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-6 max-w-lg mx-auto text-left">
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Your Profile
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Income:</span>
              <span className="font-medium">
                {formatCurrency(data.monthlyIncome, data.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Currency:</span>
              <span className="font-medium">{data.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experience:</span>
              <span className="font-medium capitalize">{data.experience}</span>
            </div>
          </div>
        </div>

        {getCategoryLabels().length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Focus Categories
            </h4>
            <div className="flex flex-wrap gap-2">
              {getCategoryLabels().map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {getGoalLabels().length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Target className="h-4 w-4" />
              Financial Goals
            </h4>
            <div className="flex flex-wrap gap-2">
              {getGoalLabels().map((goal) => (
                <Badge key={goal} variant="outline" className="text-xs">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto text-sm">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg mx-auto flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-medium">AI Analytics Ready</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg mx-auto flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="font-medium">Goals Tracking</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg mx-auto flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-purple-600" />
            </div>
            <p className="font-medium">Personalized Insights</p>
          </div>
        </div>

        <p className="text-muted-foreground">
          Click "Complete Setup" to start your financial journey!
        </p>
      </div>
    </div>
  );
};