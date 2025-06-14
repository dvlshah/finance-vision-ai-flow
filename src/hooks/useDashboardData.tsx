
import { useState, useEffect } from 'react';
import { FinancialInsight, CashFlowData, CategoryData, Transaction } from '@/types/financial';

export const useDashboardData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasTransactions, setHasTransactions] = useState(true);

  // Mock data - in real app this would come from API
  const [insights] = useState<FinancialInsight[]>([
    {
      id: '1',
      type: 'urgent',
      title: 'Mortgage Payment Due',
      description: 'Your $1,850 mortgage payment is due in 3 days. Your checking account balance is currently $1,200.',
      actionButton: { text: 'Initiate Transfer', action: 'transfer' },
      priority: 1
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Investment Growth',
      description: 'Your AAPL investment is up 8% this month, adding $450 to your net worth.',
      value: '+$450',
      priority: 2
    }
  ]);

  const [cashFlowData] = useState<CashFlowData[]>([
    { month: 'Jan', income: 8500, expenses: 5200, netFlow: 3300 },
    { month: 'Feb', income: 8500, expenses: 5800, netFlow: 2700 },
    { month: 'Mar', income: 8500, expenses: 6100, netFlow: 2400 },
    { month: 'Apr', income: 8500, expenses: 5900, netFlow: 2600 },
    { month: 'May', income: 8500, expenses: 6200, netFlow: 2300 },
    { month: 'Jun', income: 8800, expenses: 5700, netFlow: 3100 },
  ]);

  const [categoryData] = useState<CategoryData[]>([
    { name: 'Housing', value: 2100, color: '#3b82f6' },
    { name: 'Food', value: 800, color: '#ef4444' },
    { name: 'Transportation', value: 650, color: '#f59e0b' },
    { name: 'Entertainment', value: 400, color: '#8b5cf6' },
    { name: 'Utilities', value: 300, color: '#10b981' },
    { name: 'Shopping', value: 950, color: '#f97316' },
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    setError(null);
    // Simulate refetch
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return {
    isLoading,
    error,
    hasTransactions,
    insights,
    cashFlowData,
    categoryData,
    refetch
  };
};
