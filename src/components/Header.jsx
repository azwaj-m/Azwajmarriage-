import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../context/SearchContext';
import { Search } from 'lucide-react';

const Header = () => {
  const { t } = useTranslation();
  // سرچ کی سٹیٹ اب یہاں سے کنٹرول ہوگی
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <header className="bg-[#4A0E0E] py-4 px-6 rounded-b-[35px] shadow-lg max-w-md mx-auto sticky top-0 z-50">
      <div className="flex items-center justify-between gap-3">
        {/* لوگو */}
        <div className="flex items-center gap-1">
          <span className="text-[#D4AF37] text-lg font-black tracking-widest">AZWAJ</span>
        </div>

        {/* عالمی سرچ بار */}
        <div className="flex-1 relative flex items-center bg-white/10 rounded-full border border-white/15 px-3.5 py-1.5 backdrop-blur-sm transition-all focus-within:bg-white/15 focus-within:border-[#D4AF37]/50">
          <Search size={14} className="text-[#D4AF37] mr-1.5" />
          <input
            type="text"
            placeholder={t('search_placeholder', 'Search country, name, job...')}
            className="w-full bg-transparent text-white placeholder-white/50 text-[10px] font-bold outline-none border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
