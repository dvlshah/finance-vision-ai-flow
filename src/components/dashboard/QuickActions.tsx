
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Upload, Target, Receipt } from 'lucide-react';

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
    <Card className="shadow-elevation-2">
      <CardContent className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant}
              onClick={action.onClick}
              size="touch"
              className="h-auto p-4 flex flex-col items-center space-y-2 text-center min-h-[80px]"
            >
              <action.icon size={20} />
              <div>
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-70">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
