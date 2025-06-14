
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Upload, Target, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickActionsProps {
  onUploadClick: () => void;
  onQuickAction: (action: 'transaction' | 'budget' | 'receipt') => void;
}

export const QuickActions = ({ onUploadClick, onQuickAction }: QuickActionsProps) => {
  const actions = [
    {
      icon: Plus,
      label: 'Add Transaction',
      description: 'Manual entry',
      onClick: () => onQuickAction('transaction'),
      gradient: 'from-blue-500 to-indigo-600',
      hoverGradient: 'from-blue-600 to-indigo-700'
    },
    {
      icon: Upload,
      label: 'Upload Documents',
      description: 'Import statements',
      onClick: onUploadClick,
      gradient: 'from-purple-500 to-violet-600',
      hoverGradient: 'from-purple-600 to-violet-700'
    },
    {
      icon: Target,
      label: 'Set Budget',
      description: 'Create goals',
      onClick: () => onQuickAction('budget'),
      gradient: 'from-emerald-500 to-green-600',
      hoverGradient: 'from-emerald-600 to-green-700'
    },
    {
      icon: Receipt,
      label: 'Scan Receipt',
      description: 'Photo capture',
      onClick: () => onQuickAction('receipt'),
      gradient: 'from-orange-500 to-amber-600',
      hoverGradient: 'from-orange-600 to-amber-700'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass-card border-0 shadow-level-1 hover:shadow-level-2 transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gradient-primary mb-6 text-lg">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Button
                  variant="outline"
                  onClick={action.onClick}
                  className="h-auto p-0 bg-transparent border-0 shadow-none hover:shadow-none group relative overflow-hidden"
                >
                  <div className="glass-card p-6 w-full h-full flex flex-col items-center space-y-3 text-center transition-all duration-300 group-hover:shadow-level-2 group-hover:-translate-y-1 relative z-10">
                    {/* Background gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                    
                    {/* Icon with glow effect */}
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-20 rounded-full blur-lg scale-150 group-hover:opacity-40 transition-opacity duration-300`} />
                      <div className={`relative z-10 p-3 rounded-2xl bg-gradient-to-br ${action.gradient} text-white group-hover:scale-110 transition-transform duration-300 shadow-glow`}>
                        <action.icon size={24} />
                      </div>
                    </div>
                    
                    {/* Text content */}
                    <div className="relative z-10">
                      <div className="font-semibold text-sm text-slate-900 group-hover:text-slate-800 transition-colors">
                        {action.label}
                      </div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors mt-1">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
