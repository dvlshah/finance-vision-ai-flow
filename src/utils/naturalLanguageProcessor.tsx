
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

interface SearchSummary {
  type: 'spending' | 'income' | 'category' | 'trend' | 'comparison' | 'general';
  title: string;
  value?: string | number;
  change?: number;
  period?: string;
  details: string;
  insights?: string[];
  relatedData?: { label: string; value: string }[];
}

export const processNaturalLanguageQuery = (query: string, transactions: Transaction[]): SearchSummary | null => {
  const lowerQuery = query.toLowerCase();
  
  // Total spending queries
  if (lowerQuery.includes('how much') && (lowerQuery.includes('spent') || lowerQuery.includes('spending'))) {
    const totalSpent = transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const categoryBreakdown = transactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryBreakdown)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      type: 'spending',
      title: 'Total Spending Analysis',
      value: totalSpent,
      period: 'Last 30 days',
      details: `You've spent $${totalSpent.toFixed(2)} across ${Object.keys(categoryBreakdown).length} categories. Your highest spending category is ${topCategory?.[0]} at $${topCategory?.[1].toFixed(2)}.`,
      relatedData: [
        { label: 'Transactions', value: transactions.filter(t => t.amount < 0).length.toString() },
        { label: 'Categories', value: Object.keys(categoryBreakdown).length.toString() },
        { label: 'Avg/Transaction', value: `$${(totalSpent / transactions.filter(t => t.amount < 0).length || 0).toFixed(2)}` },
        { label: 'Top Category', value: topCategory?.[0] || 'N/A' }
      ],
      insights: [
        `${Math.round((topCategory?.[1] || 0) / totalSpent * 100)}% spent on ${topCategory?.[0]}`,
        `${transactions.filter(t => t.amount < 0).length} total transactions`,
        'Based on recent activity'
      ]
    };
  }

  // Income queries
  if (lowerQuery.includes('income') || lowerQuery.includes('earned') || lowerQuery.includes('made')) {
    const totalIncome = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      type: 'income',
      title: 'Income Summary',
      value: totalIncome,
      period: 'Last 30 days',
      details: `Your total income is $${totalIncome.toFixed(2)} from ${transactions.filter(t => t.amount > 0).length} deposits.`,
      relatedData: [
        { label: 'Deposits', value: transactions.filter(t => t.amount > 0).length.toString() },
        { label: 'Largest', value: `$${Math.max(...transactions.filter(t => t.amount > 0).map(t => t.amount)).toFixed(2)}` },
        { label: 'Average', value: `$${(totalIncome / (transactions.filter(t => t.amount > 0).length || 1)).toFixed(2)}` },
        { label: 'Sources', value: new Set(transactions.filter(t => t.amount > 0).map(t => t.merchant)).size.toString() }
      ]
    };
  }

  // Category-specific queries
  const categories = ['food', 'entertainment', 'transportation', 'shopping', 'housing', 'utilities'];
  const mentionedCategory = categories.find(cat => lowerQuery.includes(cat));
  
  if (mentionedCategory) {
    const categoryTransactions = transactions.filter(t => 
      t.category.toLowerCase().includes(mentionedCategory)
    );
    const categorySpending = categoryTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      type: 'category',
      title: `${mentionedCategory.charAt(0).toUpperCase() + mentionedCategory.slice(1)} Spending`,
      value: categorySpending,
      period: 'Last 30 days',
      details: `You've spent $${categorySpending.toFixed(2)} on ${mentionedCategory} across ${categoryTransactions.length} transactions.`,
      relatedData: [
        { label: 'Transactions', value: categoryTransactions.length.toString() },
        { label: 'Avg/Transaction', value: `$${(categorySpending / (categoryTransactions.length || 1)).toFixed(2)}` },
        { label: 'Largest', value: `$${Math.max(...categoryTransactions.filter(t => t.amount < 0).map(t => Math.abs(t.amount))).toFixed(2)}` },
        { label: 'Merchants', value: new Set(categoryTransactions.map(t => t.merchant)).size.toString() }
      ]
    };
  }

  // Merchant/vendor queries
  const merchants = [...new Set(transactions.map(t => t.merchant))];
  const mentionedMerchant = merchants.find(merchant => 
    merchant && lowerQuery.includes(merchant.toLowerCase())
  );

  if (mentionedMerchant) {
    const merchantTransactions = transactions.filter(t => t.merchant === mentionedMerchant);
    const merchantSpending = merchantTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      type: 'general',
      title: `${mentionedMerchant} Analysis`,
      value: merchantSpending,
      period: 'All time',
      details: `You've spent $${merchantSpending.toFixed(2)} at ${mentionedMerchant} across ${merchantTransactions.length} visits.`,
      relatedData: [
        { label: 'Visits', value: merchantTransactions.length.toString() },
        { label: 'Avg/Visit', value: `$${(merchantSpending / (merchantTransactions.length || 1)).toFixed(2)}` },
        { label: 'Category', value: merchantTransactions[0]?.category || 'Various' },
        { label: 'Last Visit', value: merchantTransactions[0]?.date || 'N/A' }
      ]
    };
  }

  // Comparison queries
  if (lowerQuery.includes('compare') || lowerQuery.includes('vs') || lowerQuery.includes('versus')) {
    const currentMonthSpending = transactions
      .filter(t => t.amount < 0 && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const lastMonthSpending = transactions
      .filter(t => t.amount < 0 && new Date(t.date).getMonth() === new Date().getMonth() - 1)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const change = lastMonthSpending > 0 ? ((currentMonthSpending - lastMonthSpending) / lastMonthSpending) * 100 : 0;

    return {
      type: 'comparison',
      title: 'Monthly Spending Comparison',
      value: currentMonthSpending,
      change: change,
      period: 'Current vs Previous Month',
      details: `This month you've spent $${currentMonthSpending.toFixed(2)} compared to $${lastMonthSpending.toFixed(2)} last month. That's a ${Math.abs(change).toFixed(1)}% ${change > 0 ? 'increase' : 'decrease'}.`,
      relatedData: [
        { label: 'This Month', value: `$${currentMonthSpending.toFixed(2)}` },
        { label: 'Last Month', value: `$${lastMonthSpending.toFixed(2)}` },
        { label: 'Difference', value: `$${Math.abs(currentMonthSpending - lastMonthSpending).toFixed(2)}` },
        { label: 'Trend', value: change > 0 ? 'Increasing' : 'Decreasing' }
      ]
    };
  }

  // Trend queries
  if (lowerQuery.includes('trend') || lowerQuery.includes('pattern') || lowerQuery.includes('habit')) {
    const dailySpending = transactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => {
        const date = t.date;
        acc[date] = (acc[date] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const avgDailySpending = Object.values(dailySpending).reduce((a, b) => a + b, 0) / Object.keys(dailySpending).length;

    return {
      type: 'trend',
      title: 'Spending Trends',
      value: avgDailySpending,
      period: 'Daily average',
      details: `Your average daily spending is $${avgDailySpending.toFixed(2)}. You have ${Object.keys(dailySpending).length} active spending days.`,
      insights: [
        'Most active spending days',
        'Consistent daily patterns',
        'Weekend vs weekday analysis'
      ]
    };
  }

  return null;
};
