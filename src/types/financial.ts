
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
  confidence?: number;
  needsReview?: boolean;
  merchant?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  budget?: number;
  spent?: number;
  type: 'expense' | 'income';
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
}

export interface FinancialAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'credit';
  balance: number;
  institution: string;
}

export interface FinancialInsight {
  id: string;
  type: 'urgent' | 'opportunity' | 'observation' | 'confirmation';
  title: string;
  description: string;
  value?: string;
  actionButton?: {
    text: string;
    action: string;
  };
  priority: number;
}

export interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
  netFlow: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}
