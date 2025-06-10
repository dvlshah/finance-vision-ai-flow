
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, AlertTriangle, CheckCircle, Plus, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BudgetItem {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  status: 'on-track' | 'warning' | 'over-budget';
}

const mockBudgets: BudgetItem[] = [
  {
    id: '1',
    category: 'Food',
    budgeted: 800,
    spent: 650,
    remaining: 150,
    status: 'on-track'
  },
  {
    id: '2',
    category: 'Transportation',
    budgeted: 400,
    spent: 420,
    remaining: -20,
    status: 'over-budget'
  },
  {
    id: '3',
    category: 'Entertainment',
    budgeted: 300,
    spent: 280,
    remaining: 20,
    status: 'warning'
  },
  {
    id: '4',
    category: 'Shopping',
    budgeted: 500,
    spent: 350,
    remaining: 150,
    status: 'on-track'
  },
  {
    id: '5',
    category: 'Utilities',
    budgeted: 250,
    spent: 180,
    remaining: 70,
    status: 'on-track'
  }
];

export const BudgetTracking = () => {
  const totalBudgeted = mockBudgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = mockBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const overallProgress = (totalSpent / totalBudgeted) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-amber-600 bg-amber-50';
      case 'over-budget': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle size={14} />;
      case 'warning': return <AlertTriangle size={14} />;
      case 'over-budget': return <AlertTriangle size={14} />;
      default: return null;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-600';
      case 'warning': return 'bg-amber-600';
      case 'over-budget': return 'bg-red-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Budget Overview
            </CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">Total Budgeted</p>
              <p className="text-2xl font-bold text-slate-900">${totalBudgeted.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-slate-600">Total Spent</p>
              <p className="text-2xl font-bold text-blue-600">${totalSpent.toLocaleString()}</p>
              <p className="text-xs text-slate-500">{overallProgress.toFixed(1)}% of budget</p>
            </div>
            <div className={`text-center p-4 rounded-lg ${totalRemaining >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-sm text-slate-600">Remaining</p>
              <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(totalRemaining).toLocaleString()}
              </p>
              <p className="text-xs text-slate-500">
                {totalRemaining >= 0 ? 'Under budget' : 'Over budget'}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-slate-600">{overallProgress.toFixed(1)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Budgets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBudgets.map((budget) => {
              const progress = (budget.spent / budget.budgeted) * 100;
              return (
                <div key={budget.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-900">{budget.category}</span>
                      <Badge className={`${getStatusColor(budget.status)} border-0`}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(budget.status)}
                          {budget.status.replace('-', ' ')}
                        </span>
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Spent: ${budget.spent}</span>
                      <span>Budget: ${budget.budgeted}</span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getProgressColor(budget.status)}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      {progress > 100 && (
                        <div className="absolute top-0 left-0 w-full h-2 bg-red-600 rounded-full opacity-20" />
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className={budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {budget.remaining >= 0 ? 'Remaining' : 'Over budget'}: ${Math.abs(budget.remaining)}
                      </span>
                      <span className="text-slate-600">{progress.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
