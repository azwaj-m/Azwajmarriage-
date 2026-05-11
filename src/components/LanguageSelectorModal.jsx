import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Globe } from 'lucide-react';
import { allLanguages } from '../utils/languages';

const LanguageSelectorModal = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();

  if (!isOpen) return null;

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col text-right">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">زبان کا انتخاب کریں</span>
            <Globe className="w-5 h-5 text-rose-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {allLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all text-center ${
                i18n.language === lang.code
                  ? 'border-rose-500 bg-rose-50 text-rose-600'
                  : 'border-gray-100 hover:bg-gray-50 text-gray-700'
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectorModal;
