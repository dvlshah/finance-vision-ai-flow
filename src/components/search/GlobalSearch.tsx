
import { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSearch } from '@/contexts/SearchContext';
import { AdvancedFilters } from './AdvancedFilters';

export const GlobalSearch = () => {
  const { searchQuery, setSearchQuery, filters, clearFilters } = useSearch();
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount = [
    filters.dateRange !== 'all' ? 1 : 0,
    filters.categories.length > 0 ? 1 : 0,
    filters.amountRange.min > 0 || filters.amountRange.max < 10000 ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search transactions, categories, or amounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
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

      {(searchQuery || activeFiltersCount > 0) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-600">Active:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: "{searchQuery}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSearchQuery('')}
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
