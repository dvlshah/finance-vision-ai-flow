
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CategoryBreakdown } from '@/components/dashboard/CategoryBreakdown';
import { PageTransition } from '@/components/common/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Categories = () => {
  const categories = [
    { name: 'Food & Dining', spent: 850, budget: 1000, color: 'bg-red-500' },
    { name: 'Transportation', spent: 320, budget: 400, color: 'bg-blue-500' },
    { name: 'Entertainment', spent: 180, budget: 300, color: 'bg-green-500' },
    { name: 'Shopping', spent: 420, budget: 500, color: 'bg-yellow-500' },
    { name: 'Bills & Utilities', spent: 680, budget: 700, color: 'bg-purple-500' },
  ];

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Categories</h1>
              <p className="text-slate-600">Manage your spending categories and budgets</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryBreakdown />
            
            <Card>
              <CardHeader>
                <CardTitle>Category Management</CardTitle>
                <CardDescription>Edit your spending categories and set budgets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${category.color}`} />
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-slate-500">
                          ${category.spent} / ${category.budget}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Categories;
