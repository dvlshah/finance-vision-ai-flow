
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfidenceBadgeProps {
  confidence: number;
  category?: string;
  reason?: string;
  className?: string;
}

export const ConfidenceBadge = ({ confidence, category, reason, className }: ConfidenceBadgeProps) => {
  const getConfidenceLevel = () => {
    if (confidence >= 90) return 'high';
    if (confidence >= 70) return 'medium';
    return 'low';
  };

  const getIcon = () => {
    const level = getConfidenceLevel();
    switch (level) {
      case 'high': return <CheckCircle size={12} />;
      case 'medium': return <HelpCircle size={12} />;
      case 'low': return <AlertTriangle size={12} />;
    }
  };

  const getVariant = () => {
    const level = getConfidenceLevel();
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 hover:bg-red-200';
    }
  };

  const content = (
    <Badge 
      variant="secondary" 
      className={cn(getVariant(), 'flex items-center gap-1 cursor-help', className)}
    >
      {getIcon()}
      {category}
      {confidence < 90 && ' ?'}
    </Badge>
  );

  if (reason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">AI Confidence: {confidence}%</p>
              <p className="text-xs text-slate-600">{reason}</p>
              {confidence < 90 && (
                <p className="text-xs text-slate-500 italic">
                  Click to review and correct if needed
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};
