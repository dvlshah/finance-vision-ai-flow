import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { WelcomeStep } from "./steps/WelcomeStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { GoalsStep } from "./steps/GoalsStep";
import { CompleteStep } from "./steps/CompleteStep";

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export type OnboardingData = {
  monthlyIncome: string;
  currency: string;
  spendingCategories: string[];
  financialGoals: string[];
  experience: string;
};

const STEPS = [
  { id: 'welcome', title: 'Welcome', component: WelcomeStep },
  { id: 'preferences', title: 'Preferences', component: PreferencesStep },
  { id: 'goals', title: 'Goals', component: GoalsStep },
  { id: 'complete', title: 'Complete', component: CompleteStep },
];

export const OnboardingFlow = ({ isOpen, onClose, onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    monthlyIncome: '',
    currency: 'USD',
    spendingCategories: [],
    financialGoals: [],
    experience: '',
  });

  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep].component;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Welcome step
        return true;
      case 1: // Preferences step
        return onboardingData.monthlyIncome && onboardingData.currency;
      case 2: // Goals step
        return onboardingData.financialGoals.length > 0;
      case 3: // Complete step
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Getting Started</h2>
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Content */}
          <div className="min-h-[400px] flex flex-col">
            <CurrentStepComponent
              data={onboardingData}
              onDataUpdate={handleDataUpdate}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="inline-flex items-center gap-2"
            >
              {currentStep === STEPS.length - 1 ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Complete Setup
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};