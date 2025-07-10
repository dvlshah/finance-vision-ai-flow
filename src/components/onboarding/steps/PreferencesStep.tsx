import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Settings, ShoppingCart, Coffee, Car, Home } from "lucide-react";
import { OnboardingData } from "../OnboardingFlow";

interface PreferencesStepProps {
  data: OnboardingData;
  onDataUpdate: (data: Partial<OnboardingData>) => void;
}

const SPENDING_CATEGORIES = [
  { id: 'dining', label: 'Dining & Food', icon: Coffee },
  { id: 'shopping', label: 'Shopping', icon: ShoppingCart },
  { id: 'transportation', label: 'Transportation', icon: Car },
  { id: 'housing', label: 'Housing & Utilities', icon: Home },
  { id: 'entertainment', label: 'Entertainment', icon: Settings },
  { id: 'healthcare', label: 'Healthcare', icon: Settings },
];

const CURRENCIES = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'CAD', label: 'Canadian Dollar (C$)' },
  { value: 'AUD', label: 'Australian Dollar (A$)' },
];

export const PreferencesStep = ({ data, onDataUpdate }: PreferencesStepProps) => {
  const handleCategoryToggle = (categoryId: string) => {
    const categories = data.spendingCategories || [];
    const newCategories = categories.includes(categoryId)
      ? categories.filter(id => id !== categoryId)
      : [...categories, categoryId];
    
    onDataUpdate({ spendingCategories: newCategories });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Let's personalize your experience</h3>
        <p className="text-muted-foreground">
          Tell us about your financial situation to get better insights
        </p>
      </div>

      <div className="space-y-6">
        {/* Monthly Income */}
        <div className="space-y-3">
          <Label htmlFor="income" className="text-base font-semibold">
            What's your approximate monthly income?
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="income"
              type="number"
              placeholder="5000"
              className="pl-10"
              value={data.monthlyIncome}
              onChange={(e) => onDataUpdate({ monthlyIncome: e.target.value })}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            This helps us provide personalized budgeting recommendations
          </p>
        </div>

        {/* Currency */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            What's your preferred currency?
          </Label>
          <Select
            value={data.currency}
            onValueChange={(value) => onDataUpdate({ currency: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Spending Categories */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Which categories do you spend the most on? (Select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SPENDING_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isChecked = data.spendingCategories?.includes(category.id) || false;
              
              return (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    isChecked ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  <CardContent className="flex items-center space-x-3 p-4">
                    <Checkbox
                      checked={isChecked}
                      onChange={() => handleCategoryToggle(category.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{category.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};