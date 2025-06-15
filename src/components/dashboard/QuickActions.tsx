import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Upload, Target, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import { itemVariants, containerVariants } from '@/lib/animations';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

interface QuickActionsProps {
  onUploadClick: () => void;
  onQuickAction: (action: 'transaction' | 'budget' | 'receipt') => void;
}

export const QuickActions = ({ onUploadClick, onQuickAction }: QuickActionsProps) => {
  const { isLowPerformance } = usePerformanceOptimization();

  const actions = [
    {
      icon: Plus,
      label: 'Add Transaction',
      description: 'Manual entry',
      onClick: () => onQuickAction('transaction'),
      variant: 'gradient' as const
    },
    {
      icon: Upload,
      label: 'Upload Documents',
      description: 'Import statements',
      onClick: onUploadClick,
      variant: 'success' as const
    },
    {
      icon: Target,
      label: 'Set Budget',
      description: 'Create goals',
      onClick: () => onQuickAction('budget'),
      variant: 'secondary' as const
    },
    {
      icon: Receipt,
      label: 'Scan Receipt',
      description: 'Photo capture',
      onClick: () => onQuickAction('receipt'),
      variant: 'outline' as const
    }
  ];

  return (
    <motion.div
      variants={isLowPerformance ? undefined : itemVariants}
      initial={isLowPerformance ? false : "hidden"}
      animate={isLowPerformance ? false : "visible"}
    >
      <Card className="shadow-elevation-2">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <motion.div
            variants={isLowPerformance ? undefined : containerVariants}
            initial={isLowPerformance ? false : "hidden"}
            animate={isLowPerformance ? false : "visible"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                variants={isLowPerformance ? undefined : itemVariants}
                whileHover={isLowPerformance ? undefined : { scale: 1.05 }}
                whileTap={isLowPerformance ? undefined : { scale: 0.95 }}
                className="will-change-transform"
              >
                <Button
                  variant={action.variant}
                  onClick={action.onClick}
                  size="touch"
                  className="h-auto p-4 flex flex-col items-center space-y-2 text-center min-h-[80px] w-full gpu-accelerated"
                >
                  <action.icon size={20} />
                  <div>
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs opacity-70">{action.description}</div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
