import React, { createContext, useContext, useState } from 'react';
import { initialProfiles } from '../utils/seedData';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState(initialProfiles);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, profiles, setProfiles }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
