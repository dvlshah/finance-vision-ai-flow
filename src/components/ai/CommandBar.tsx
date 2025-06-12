
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';

interface CommandBarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getContextualPrompts = (pathname: string) => {
  const prompts = {
    '/': [
      "What's the most important thing I should know today?",
      "How am I tracking against my monthly budget?",
      "Show me my biggest expenses this week",
      "What opportunities do I have to save money?"
    ],
    '/transactions': [
      "Find all my subscriptions over $10",
      "Show me duplicate charges this month",
      "What did I spend on groceries last week?",
      "Find transactions from Starbucks"
    ],
    '/analytics': [
      "Compare my spending this month vs last month",
      "What's my average monthly income?",
      "Show me my spending trends by category",
      "How much have I saved this year?"
    ],
    '/categories': [
      "Which category am I overspending in?",
      "Recategorize my recent Amazon purchases",
      "What's my biggest spending category?",
      "Show me trends in my food spending"
    ]
  };

  return prompts[pathname as keyof typeof prompts] || prompts['/'];
};

const getContextualPlaceholder = (pathname: string) => {
  const placeholders = {
    '/': "e.g., What's the most important thing I should know today?",
    '/transactions': "e.g., Find all my subscriptions over $10",
    '/analytics': "e.g., Compare my spending this month vs last month",
    '/categories': "e.g., Which category am I overspending in?"
  };

  return placeholders[pathname as keyof typeof placeholders] || placeholders['/'];
};

export const CommandBar = ({ open, onOpenChange }: CommandBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();

  const contextualPrompts = getContextualPrompts(location.pathname);
  const placeholder = getContextualPlaceholder(location.pathname);

  useEffect(() => {
    if (!open) {
      setInputValue('');
      setIsProcessing(false);
    }
  }, [open]);

  const handleSubmit = async (query: string) => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    console.log('Processing AI query:', query);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      // Here you would integrate with your AI service
    }, 1500);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    handleSubmit(value);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b px-3">
        <div className="flex items-center gap-2 flex-1">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            className="border-0 focus:ring-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                e.preventDefault();
                handleSubmit(inputValue);
              }
            }}
          />
          {isProcessing && (
            <div className="flex items-center gap-2 text-blue-500">
              <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent" />
              <span className="text-xs">Thinking...</span>
            </div>
          )}
        </div>
        <Badge variant="secondary" className="text-xs">
          Cmd+K
        </Badge>
      </div>

      <CommandList>
        <CommandEmpty>
          <div className="text-center py-6">
            <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-slate-600">
              Ask me anything about your finances
            </p>
            <p className="text-xs text-slate-400 mt-1">
              I can help you find transactions, analyze spending, and make decisions
            </p>
          </div>
        </CommandEmpty>

        {inputValue.length === 0 && (
          <CommandGroup heading="Suggested for this page">
            {contextualPrompts.map((prompt, index) => (
              <CommandItem
                key={index}
                value={prompt}
                onSelect={() => handleSelect(prompt)}
                className="flex items-center gap-3 py-3"
              >
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span className="flex-1">{prompt}</span>
                <ArrowRight className="h-3 w-3 text-slate-400" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {inputValue.length > 0 && (
          <CommandGroup heading="Quick Actions">
            <CommandItem
              value={`search-${inputValue}`}
              onSelect={() => handleSelect(inputValue)}
              className="flex items-center gap-3 py-3"
            >
              <Search className="h-4 w-4 text-slate-500" />
              <span className="flex-1">Search for "{inputValue}"</span>
              <ArrowRight className="h-3 w-3 text-slate-400" />
            </CommandItem>
            <CommandItem
              value={`ai-${inputValue}`}
              onSelect={() => handleSelect(inputValue)}
              className="flex items-center gap-3 py-3 bg-blue-50 border border-blue-200"
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="flex-1">Ask AI: "{inputValue}"</span>
              <Badge variant="secondary" className="text-xs">AI</Badge>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};
