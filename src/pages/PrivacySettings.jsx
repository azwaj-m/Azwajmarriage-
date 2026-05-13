import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck, Bell } from 'lucide-react';

const PrivacySettings = ({ onBack }) => {
  const [settings, setSettings] = useState({
    hidePhoto: false,
    hideAge: false,
    premiumOnly: true,
    ghostMode: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFDF9] text-[#4A0E0E] flex flex-col" dir="rtl">
      {/* ہیڈر بار */}
      <header className="bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] p-5 rounded-b-[35px] shadow-xl flex items-center gap-4 border-b border-[#D4AF37]/20">
        <button type="button" onClick={onBack} className="text-[#D4AF37] p-2 hover:bg-white/10 rounded-full transition-all active:scale-90">
          <ArrowRight size={20} />
        </button>
        <div>
          <h2 className="text-sm font-black text-[#D4AF37] tracking-tight">پرائیویسی سیٹنگز</h2>
          <p className="text-[9px] text-gray-300 font-bold mt-0.5">آپ کا ڈیٹا، آپ کے کنٹرول میں</p>
        </div>
      </header>

      {/* کنٹینٹ ایریا */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto no-scrollbar pb-24">
        
        {/* کارڈ 1: تصویر چھپائیں */}
        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center justify-between text-right">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F5E6D3]/40 rounded-xl text-[#4A0E0E]">
              {settings.hidePhoto ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
            <div>
              <h4 className="font-black text-[#4A0E0E] text-xs">میری تصویر چھپائیں</h4>
              <p className="text-[9px] font-bold text-gray-400 mt-0.5">صرف منظور شدہ ممبرز تصویر دیکھ سکیں گے</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={settings.hidePhoto} 
            onChange={() => toggleSetting('hidePhoto')}
            className="w-4 h-4 accent-[#4A0E0E] cursor-pointer"
          />
        </div>

        {/* کارڈ 2: عمر چھپائیں */}
        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center justify-between text-right">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F5E6D3]/40 rounded-xl text-[#4A0E0E]">
              <Lock size={18} />
            </div>
            <div>
              <h4 className="font-black text-[#4A0E0E] text-xs">میری عمر اور جنس چھپائیں</h4>
              <p className="text-[9px] font-bold text-gray-400 mt-0.5">پروفائل کارڈ پر عمر ظاہر نہیں کی جائے گی</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={settings.hideAge} 
            onChange={() => toggleSetting('hideAge')}
            className="w-4 h-4 accent-[#4A0E0E] cursor-pointer"
          />
        </div>

        {/* کارڈ 3: صرف پریمیم رشتے */}
        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center justify-between text-right">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="font-black text-[#4A0E0E] text-xs">صرف پریمیم ممبرز رابطہ کریں</h4>
              <p className="text-[9px] font-bold text-gray-400 mt-0.5">غیر تصدیق شدہ صارفین آپ کو میسج نہیں کر سکیں گے</p>
            </div>
          </div>
          <input 
            type="checkbox" 
            checked={settings.premiumOnly} 
            onChange={() => toggleSetting('premiumOnly')}
            className="w-4 h-4 accent-[#4A0E0E] cursor-pointer"
          />
        </div>

        {/* محفوظ کریں بٹن */}
        <button
          type="button"
          onClick={() => { alert('ترامیم محفوظ کر لی گئی ہیں!'); onBack(); }}
          className="w-full h-12 bg-[#4A0E0E] text-[#D4AF37] text-xs font-black rounded-xl shadow-lg border border-[#D4AF37]/20 active:scale-98 transition-all mt-6"
        >
          سیٹنگز محفوظ کریں
        </button>

      </div>
    </div>
  );
};

export default PrivacySettings;
