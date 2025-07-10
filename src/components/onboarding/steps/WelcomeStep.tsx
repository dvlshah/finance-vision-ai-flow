import { Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface WelcomeStepProps {
  data: OnboardingData;
  onDataUpdate: (data: Partial<OnboardingData>) => void;
}

export const WelcomeStep = ({ data, onDataUpdate }: WelcomeStepProps) => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-3xl font-bold">Welcome to FinanceVision!</h3>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Let's get you set up with a personalized financial experience. 
          This will only take a few minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold">Smart Analytics</h4>
          <p className="text-sm text-muted-foreground">
            AI-powered insights to understand your spending patterns
          </p>
        </div>

        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold">Secure & Private</h4>
          <p className="text-sm text-muted-foreground">
            Bank-level security with complete data privacy
          </p>
        </div>

        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold">Quick Setup</h4>
          <p className="text-sm text-muted-foreground">
            Get started in minutes with our guided setup
          </p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-sm text-muted-foreground">
          <strong>What to expect:</strong> We'll ask about your income, spending preferences, 
          and financial goals to customize your experience.
        </p>
      </div>
    </div>
  );
};