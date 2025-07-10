import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, PiggyBank, TrendingUp, Home, Plane, GraduationCap } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface GoalsStepProps {
  data: OnboardingData;
  onDataUpdate: (data: Partial<OnboardingData>) => void;
}

const FINANCIAL_GOALS = [
  {
    id: 'emergency_fund',
    label: 'Build an Emergency Fund',
    description: 'Save 3-6 months of expenses for unexpected situations',
    icon: PiggyBank,
  },
  {
    id: 'debt_payoff',
    label: 'Pay Off Debt',
    description: 'Eliminate credit card debt, loans, or other obligations',
    icon: TrendingUp,
  },
  {
    id: 'home_purchase',
    label: 'Buy a Home',
    description: 'Save for a down payment and homeownership costs',
    icon: Home,
  },
  {
    id: 'vacation',
    label: 'Plan a Vacation',
    description: 'Save for travel and leisure experiences',
    icon: Plane,
  },
  {
    id: 'education',
    label: 'Education/Skills',
    description: 'Invest in education, courses, or skill development',
    icon: GraduationCap,
  },
  {
    id: 'retirement',
    label: 'Retirement Planning',
    description: 'Build long-term wealth for your future',
    icon: Target,
  },
];

const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner - Just getting started' },
  { value: 'intermediate', label: 'Intermediate - Some experience' },
  { value: 'advanced', label: 'Advanced - Very experienced' },
];

export const GoalsStep = ({ data, onDataUpdate }: GoalsStepProps) => {
  const handleGoalToggle = (goalId: string) => {
    const goals = data.financialGoals || [];
    const newGoals = goals.includes(goalId)
      ? goals.filter(id => id !== goalId)
      : [...goals, goalId];
    
    onDataUpdate({ financialGoals: newGoals });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">What are your financial goals?</h3>
        <p className="text-muted-foreground">
          Select the goals that matter most to you right now
        </p>
      </div>

      <div className="space-y-6">
        {/* Financial Goals */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Primary financial goals (Select all that apply)
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {FINANCIAL_GOALS.map((goal) => {
              const Icon = goal.icon;
              const isChecked = data.financialGoals?.includes(goal.id) || false;
              
              return (
                <Card 
                  key={goal.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    isChecked ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <CardContent className="flex items-start space-x-4 p-4">
                    <div className="flex items-center space-x-3 flex-1">
                      <Checkbox
                        checked={isChecked}
                        onChange={() => handleGoalToggle(goal.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isChecked ? 'bg-primary text-white' : 'bg-muted'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{goal.label}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            How would you describe your financial experience?
          </Label>
          <Select
            value={data.experience}
            onValueChange={(value) => onDataUpdate({ experience: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            This helps us tailor the complexity of insights and recommendations
          </p>
        </div>
      </div>
    </div>
  );
};