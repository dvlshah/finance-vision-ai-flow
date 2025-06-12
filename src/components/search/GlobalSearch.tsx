import { useState } from 'react';
import { Search, X, Filter, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSearch } from '@/contexts/SearchContext';
import { AdvancedFilters } from './AdvancedFilters';
import { SearchSummaryCard } from './SearchSummaryCard';
import { processNaturalLanguageQuery } from '@/utils/naturalLanguageProcessor';

// Mock transactions data for demo - in real app this would come from props or context
const mockTransactions = [
  {
    id: '1',
    date: '2024-06-05',
    description: 'Grocery Store Purchase - Whole Foods Market',
    amount: -87.32,
    category: 'Food',
    confidence: 95,
    reason: 'Merchant name contains "Whole Foods" which is commonly categorized as Food',
    account: 'Chase Checking',
    merchant: 'Whole Foods Market'
  },
  {
    id: '2',
    date: '2024-06-04',
    description: 'Salary Deposit - ACME Corporation',
    amount: 4250.00,
    category: 'Income',
    confidence: 99,
    reason: 'Regular recurring deposit pattern identified as salary',
    account: 'Chase Checking',
    merchant: 'ACME Corporation'
  },
  // ... keep existing code (rest of mock transactions)
];

export const GlobalSearch = () => {
  const { searchQuery, setSearchQuery, filters, clearFilters } = useSearch();
  const [showFilters, setShowFilters] = useState(false);
  const [searchSummary, setSearchSummary] = useState<any>(null);
  const [isNaturalLanguageQuery, setIsNaturalLanguageQuery] = useState(false);

  const activeFiltersCount = [
    filters.dateRange !== 'all' ? 1 : 0,
    filters.categories.length > 0 ? 1 : 0,
    filters.amountRange.min > 0 || filters.amountRange.max < 10000 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    // Check if this looks like a natural language query
    const naturalLanguagePatterns = [
      'how much', 'what did', 'where did', 'when did', 'show me', 'find my',
      'compare', 'vs', 'versus', 'trend', 'pattern', 'spent on', 'income',
      'earned', 'made', 'total', 'average', 'most', 'least'
    ];
    
    const isNLQuery = naturalLanguagePatterns.some(pattern => 
      value.toLowerCase().includes(pattern)
    );
    
    setIsNaturalLanguageQuery(isNLQuery);
    
    if (isNLQuery && value.length > 10) {
      const summary = processNaturalLanguageQuery(value, mockTransactions);
      setSearchSummary(summary);
    } else {
      setSearchSummary(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search transactions or ask questions like 'How much did I spend on food?'"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchSummary(null);
                setIsNaturalLanguageQuery(false);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {isNaturalLanguageQuery && (
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
              <Sparkles className="h-4 w-4 text-blue-500" />
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="ml-2 px-1 py-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Natural Language Query Suggestions */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-500">Try asking:</span>
          {[
            "How much did I spend this month?",
            "Show me my food expenses",
            "What's my average spending?",
            "Compare this month vs last month"
          ].map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="text-xs h-7 text-slate-600 hover:text-blue-600"
              onClick={() => handleSearchChange(suggestion)}
            >
              "{suggestion}"
            </Button>
          ))}
        </div>
      )}

      {/* Search Summary Card */}
      {searchSummary && (
        <SearchSummaryCard summary={searchSummary} query={searchQuery} />
      )}

      {(searchQuery || activeFiltersCount > 0) && !searchSummary && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-600">Active:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              {isNaturalLanguageQuery ? (
                <>
                  <Sparkles className="h-3 w-3" />
                  AI Search: "{searchQuery}"
                </>
              ) : (
                <>Search: "{searchQuery}"</>
              )}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => {
                  setSearchQuery('');
                  setSearchSummary(null);
                  setIsNaturalLanguageQuery(false);
                }}
              />
            </Badge>
          )}
          {filters.dateRange !== 'all' && (
            <Badge variant="secondary">
              Date: {filters.dateRange}
            </Badge>
          )}
          {filters.categories.length > 0 && (
            <Badge variant="secondary">
              Categories: {filters.categories.length}
            </Badge>
          )}
          {(filters.amountRange.min > 0 || filters.amountRange.max < 10000) && (
            <Badge variant="secondary">
              Amount: ${filters.amountRange.min} - ${filters.amountRange.max}
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {showFilters && <AdvancedFilters />}
    </div>
  );
};
