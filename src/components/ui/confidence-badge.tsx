
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, HelpCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ConfidenceBadgeProps {
  confidence: number;
  category?: string;
  reason?: string;
  className?: string;
  onCategoryUpdate?: (category: string) => void;
}

const AI_SUGGESTIONS = {
  'Amazon Purchase - Various Items': [
    { category: 'Shopping', confidence: 85, reason: 'Amazon purchases are typically shopping' },
    { category: 'Electronics', confidence: 75, reason: 'Amazon commonly sells electronics' },
    { category: 'Books', confidence: 65, reason: 'Amazon started as a bookstore' }
  ],
  'Shell Gas Station #1234': [
    { category: 'Transportation', confidence: 95, reason: 'Gas stations are for vehicle fuel' },
    { category: 'Car Maintenance', confidence: 80, reason: 'Could include car services' },
    { category: 'Travel', confidence: 70, reason: 'Fuel for travel purposes' }
  ],
  default: [
    { category: 'Shopping', confidence: 80, reason: 'Most purchases are general shopping' },
    { category: 'Food', confidence: 75, reason: 'Common expense category' },
    { category: 'Entertainment', confidence: 70, reason: 'Leisure and entertainment spending' }
  ]
};

export const ConfidenceBadge = ({ 
  confidence, 
  category, 
  reason, 
  className,
  onCategoryUpdate 
}: ConfidenceBadgeProps) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const getSuggestions = () => {
    return AI_SUGGESTIONS.default;
  };

  const handleSuggestionClick = (suggestion: { category: string }) => {
    if (onCategoryUpdate) {
      onCategoryUpdate(suggestion.category);
      setIsOpen(false);
    }
  };

  const badgeContent = (
    <Badge 
      variant="secondary" 
      className={cn(
        getVariant(), 
        'flex items-center gap-1',
        confidence < 90 && onCategoryUpdate ? 'cursor-pointer' : 'cursor-help',
        className
      )}
    >
      {getIcon()}
      {category}
      {confidence < 90 && ' ?'}
    </Badge>
  );

  // If confidence is high or no update handler, show simple badge
  if (confidence >= 90 || !onCategoryUpdate) {
    return badgeContent;
  }

  // Show popover for low confidence with correction options
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {badgeContent}
      </PopoverTrigger>
      <PopoverContent className="w-80" side="top">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium text-slate-900">AI Suggestions</h4>
            </div>
            <p className="text-sm text-slate-600">
              Confidence: {confidence}% • Click to correct
            </p>
          </div>
          
          <div className="space-y-2">
            {getSuggestions().map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 text-left"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{suggestion.category}</span>
                    <span className="text-xs text-slate-500">{suggestion.confidence}%</span>
                  </div>
                  <p className="text-xs text-slate-500">{suggestion.reason}</p>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="pt-2 border-t">
            <p className="text-xs text-slate-500 italic">
              {reason}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
