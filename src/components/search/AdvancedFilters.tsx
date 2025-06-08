
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useSearch } from '@/contexts/SearchContext';

const categories = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education'
];

export const AdvancedFilters = () => {
  const { filters, setFilters } = useSearch();

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters({
      categories: checked 
        ? [...filters.categories, category]
        : filters.categories.filter(c => c !== category)
    });
  };

  const handleAmountRangeChange = (values: number[]) => {
    setFilters({
      amountRange: { min: values[0], max: values[1] }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Advanced Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-3 block">Date Range</label>
          <Select value={filters.dateRange} onValueChange={(value) => setFilters({ dateRange: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">Categories</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <label htmlFor={category} className="text-sm font-medium">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">
            Amount Range: ${filters.amountRange.min} - ${filters.amountRange.max}
          </label>
          <Slider
            value={[filters.amountRange.min, filters.amountRange.max]}
            onValueChange={handleAmountRangeChange}
            max={10000}
            min={0}
            step={50}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};
