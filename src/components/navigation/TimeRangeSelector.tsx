
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TimeRangeSelectorProps {
  onRangeChange?: (range: string) => void;
}

export const TimeRangeSelector = ({ onRangeChange }: TimeRangeSelectorProps) => {
  const [selectedRange, setSelectedRange] = useState('30days');
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customDate, setCustomDate] = useState<Date>();

  const timeRanges = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 3 months' },
    { value: 'ytd', label: 'Year to date' },
    { value: 'all', label: 'All time' },
    { value: 'custom', label: 'Custom range' }
  ];

  const handleRangeSelect = (value: string) => {
    setSelectedRange(value);
    if (value !== 'custom') {
      onRangeChange?.(value);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex bg-slate-100 rounded-lg p-1">
        {timeRanges.slice(0, 4).map((range) => (
          <Button
            key={range.value}
            variant={selectedRange === range.value ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleRangeSelect(range.value)}
            className={cn(
              "text-xs px-3 py-1 h-8",
              selectedRange === range.value 
                ? 'bg-white shadow-sm' 
                : 'hover:bg-slate-200 text-slate-600'
            )}
          >
            {range.label}
          </Button>
        ))}
      </div>

      <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <CalendarIcon size={14} className="mr-1" />
            Custom
            <ChevronDown size={14} className="ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={customDate}
            onSelect={setCustomDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
