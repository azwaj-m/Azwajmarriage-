import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Upload, AlertCircle } from 'lucide-react';

const Verification = ({ onBack }) => {
  const [idNumber, setIdNumber] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idNumber) return alert('براہ کرم شناختی نمبر درج کریں');
    setUploaded(true);
    alert('آپ کی دستاویزات آفیشل ٹیم کو موصول ہو گئی ہیں۔ 24 گھنٹے میں بیج ایکٹیو ہو جائے گا۔');
    onBack();
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] text-[#4A0E0E] flex flex-col" dir="rtl">
      {/* ہیڈر بار */}
      <header className="bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] p-5 rounded-b-[35px] shadow-xl flex items-center gap-4 border-b border-[#D4AF37]/20">
        <button type="button" onClick={onBack} className="text-[#D4AF37] p-2 hover:bg-transparent/10 rounded-full transition-all active:scale-90">
          <ArrowRight size={20} />
        </button>
        <div>
          <h2 className="text-sm font-black text-[#D4AF37] tracking-tight">آفیشل شناختی تصدیق (CNIC)</h2>
          <p className="text-[9px] text-gray-300 font-bold mt-0.5">محفوظ اور قابلِ بھروسہ فیملی نیٹ ورک</p>
        </div>
      </header>

      {/* فارم ایریا */}
      <form onSubmit={handleSubmit} className="p-5 space-y-5 flex-1 overflow-y-auto no-scrollbar text-right pb-24">
        
        {/* معلومات گائیڈ الرٹ */}
        <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-start gap-3">
          <AlertCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-[10px] font-bold text-blue-800 leading-relaxed">
            ازواج ایپ پر رشتوں کی شفافیت کے لیے شناختی کارڈ یا پاسپورٹ کی تصدیق لازمی ہے۔ آپ کا ڈیٹا مکمل انکرپٹڈ اور محفوظ رہتا ہے۔
          </p>
        </div>

        {/* شناختی نمبر ان پٹ */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-[#4A0E0E] px-1">قومی شناختی کارڈ / پاسپورٹ نمبر</label>
          <input 
            type="text" 
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            placeholder="مثال: 42101-XXXXXXX-X"
            className="w-full bg-transparent border border-gray-100 p-3.5 rounded-xl text-xs font-bold text-center text-[#4A0E0E] shadow-xs focus:outline-hidden focus:border-[#4A0E0E]"
          />
        </div>

        {/* فائل اپلوڈ باکس */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-[#4A0E0E] px-1">شناختی کارڈ کی فرنٹ تصویر اپلوڈ کریں</label>
          <div className="w-full h-36 bg-transparent border-2 border-dashed border-[#D4AF37]/30 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-4 hover:border-[#4A0E0E] transition-colors relative">
            <Upload size={24} className="text-[#4A0E0E]/60 mb-2" />
            <span className="text-[10px] font-black text-[#4A0E0E]">تصویر منتخب کرنے کے لیے یہاں کلک کریں</span>
            <span className="text-[8px] text-gray-400 font-bold mt-0.5">JPG, PNG (Max 5MB)</span>
          </div>
        </div>

        {/* فائل اپلوڈ باکس (بیک سائیڈ) */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-[#4A0E0E] px-1">شناختی کارڈ کی بیک تصویر اپلوڈ کریں</label>
          <div className="w-full h-36 bg-transparent border-2 border-dashed border-[#D4AF37]/30 rounded-2xl flex flex-col items-center justify-center cursor-pointer p-4 hover:border-[#4A0E0E] transition-colors relative">
            <Upload size={24} className="text-[#4A0E0E]/60 mb-2" />
            <span className="text-[10px] font-black text-[#4A0E0E]">تصویر منتخب کرنے کے لیے یہاں کلک کریں</span>
            <span className="text-[8px] text-gray-400 font-bold mt-0.5">JPG, PNG (Max 5MB)</span>
          </div>
        </div>

        {/* سبمٹ بٹن */}
        <button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] text-[#D4AF37] text-xs font-black rounded-xl shadow-lg border border-[#D4AF37]/20 active:scale-98 transition-all mt-4 flex items-center justify-center gap-2"
        >
          <ShieldCheck size={16} /> دستاویزات جمع کروائیں
        </button>

      </form>
    </div>
  );
};

export default Verification;
