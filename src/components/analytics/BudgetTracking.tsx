
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, AlertTriangle, CheckCircle, Plus, Edit, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
      case 'on-track': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'warning': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'over-budget': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-slate-700 bg-slate-50 border-slate-200';
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
      case 'on-track': return 'bg-emerald-600';
      case 'warning': return 'bg-amber-600';
      case 'over-budget': return 'bg-red-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300 overflow-hidden relative group">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gradient-primary">Budget Overview</span>
                <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
              </CardTitle>
              <Button size="sm" className="btn-gradient hover:shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                Add Budget
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div 
                className="text-center p-4 glass rounded-xl border border-slate-200/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-slate-600 mb-1">Total Budgeted</p>
                <p className="text-2xl font-bold text-slate-900">${totalBudgeted.toLocaleString()}</p>
              </motion.div>
              <motion.div 
                className="text-center p-4 glass rounded-xl border border-blue-200/50 bg-blue-50/30"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-slate-600 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-blue-600">${totalSpent.toLocaleString()}</p>
                <p className="text-xs text-slate-500">{overallProgress.toFixed(1)}% of budget</p>
              </motion.div>
              <motion.div 
                className={`text-center p-4 glass rounded-xl border ${totalRemaining >= 0 ? 'border-emerald-200/50 bg-emerald-50/30' : 'border-red-200/50 bg-red-50/30'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-slate-600 mb-1">Remaining</p>
                <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  ${Math.abs(totalRemaining).toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  {totalRemaining >= 0 ? 'Under budget' : 'Over budget'}
                </p>
              </motion.div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                <span className="text-sm text-slate-600">{overallProgress.toFixed(1)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gradient-primary">Category Budgets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBudgets.map((budget, index) => {
                const progress = (budget.spent / budget.budgeted) * 100;
                return (
                  <motion.div 
                    key={budget.id} 
                    className="p-4 glass border border-slate-200/50 rounded-xl hover:shadow-level-1 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-900">{budget.category}</span>
                        <Badge className={`${getStatusColor(budget.status)} border font-medium`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(budget.status)}
                            {budget.status.replace('-', ' ')}
                          </span>
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Spent: <span className="font-semibold text-slate-900">${budget.spent}</span></span>
                        <span className="text-slate-600">Budget: <span className="font-semibold text-slate-900">${budget.budgeted}</span></span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(budget.status)}`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        {progress > 100 && (
                          <div className="absolute top-0 left-0 w-full h-2 bg-red-600/20 rounded-full" />
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className={`font-medium ${budget.remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {budget.remaining >= 0 ? 'Remaining' : 'Over budget'}: ${Math.abs(budget.remaining)}
                        </span>
                        <span className="text-slate-600 font-medium">{progress.toFixed(1)}%</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
