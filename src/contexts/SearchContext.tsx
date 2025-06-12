
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    dateRange: string;
    categories: string[];
    amountRange: { min: number; max: number };
  };
  setFilters: (filters: Partial<SearchContextType['filters']>) => void;
  clearFilters: () => void;
  isNaturalLanguageMode: boolean;
  setIsNaturalLanguageMode: (mode: boolean) => void;
  searchSummary: any;
  setSearchSummary: (summary: any) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const defaultFilters = {
  dateRange: 'all',
  categories: [],
  amountRange: { min: 0, max: 10000 }
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFiltersState] = useState(defaultFilters);
  const [isNaturalLanguageMode, setIsNaturalLanguageMode] = useState(false);
  const [searchSummary, setSearchSummary] = useState<any>(null);

  const setFilters = (newFilters: Partial<SearchContextType['filters']>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFiltersState(defaultFilters);
    setSearchQuery('');
    setSearchSummary(null);
    setIsNaturalLanguageMode(false);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      filters,
      setFilters,
      clearFilters,
      isNaturalLanguageMode,
      setIsNaturalLanguageMode,
      searchSummary,
      setSearchSummary
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
