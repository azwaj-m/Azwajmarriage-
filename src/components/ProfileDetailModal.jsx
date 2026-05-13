import React from 'react';
import { X, MessageCircle, MapPin, Briefcase, GraduationCap, Calendar, Sparkles } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

const ProfileDetailModal = ({ profile, onClose, onStartChat }) => {
  if (!profile) return null;

  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-end justify-center p-4 backdrop-blur-xs">
      <div className="bg-[#FFFDF9] w-full rounded-[35px] max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col border border-[#D4AF37]/20 animate-slide-up no-scrollbar">
        
        {/* 📸 پریمیم ہیڈر تصویر مع گولڈن بارڈر */}
        <div className="relative h-72 bg-[#F5E6D3]/30 p-2 rounded-t-[35px]">
          <div className="w-full h-full rounded-[28px] overflow-hidden relative shadow-inner">
            <img 
              src={profile.photoURL || 'https://via.placeholder.com/400'} 
              alt={profile.fullName} 
              className="w-full h-full object-cover"
            />
            {/* اوورلے گریڈینٹ تصویر کو واضح کرنے کے لیے */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* بند کرنے کا بٹن (کراس) */}
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-6 left-6 p-2.5 bg-[#4A0E0E]/80 hover:bg-[#4A0E0E] border border-[#D4AF37]/30 text-[#D4AF37] rounded-full shadow-lg transition-all active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 📝 تفصیلات کا ایریا */}
        <div className="px-6 pb-8 pt-2 text-right">
          
          {/* نام اور تصدیقی بیج */}
          <div className="flex items-center justify-end gap-2 mb-1">
            {profile.isVerified && <VerifiedBadge />}
            <h2 className="text-xl font-black text-[#4A0E0E] tracking-tight">{profile.fullName}</h2>
          </div>
          
          {/* عمر اور جنس */}
          <div className="flex items-center justify-end gap-1.5 text-gray-400 text-[11px] font-bold">
            <span>{profile.gender}</span>
            <span>•</span>
            <span className="flex items-center gap-1">{profile.age} سال <Calendar size={11} className="text-[#D4AF37]" /></span>
          </div>

          <div className="w-full border-t border-gray-100 my-4" />

          {/* 🏛️ بنیادی انفارمیشن گریڈ (پریمیم کارڈ لک) */}
          <div className="grid grid-cols-1 gap-2.5">
            
            {/* شہر */}
            <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-xs">
              <MapPin className="w-4 h-4 text-[#4A0E0E]" />
              <div className="text-right">
                <p className="text-[9px] text-gray-400 font-bold">موجودہ شہر</p>
                <p className="text-xs font-black text-[#4A0E0E]">{profile.city}</p>
              </div>
            </div>

            {/* پیشہ */}
            <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-xs">
              <Briefcase className="w-4 h-4 text-[#4A0E0E]" />
              <div className="text-right">
                <p className="text-[9px] text-gray-400 font-bold">پیشہ / ملازمت</p>
                <p className="text-xs font-black text-[#4A0E0E]">{profile.profession}</p>
              </div>
            </div>

            {/* تعلیم */}
            <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-xs">
              <GraduationCap className="w-4 h-4 text-[#4A0E0E]" />
              <div className="text-right">
                <p className="text-[9px] text-gray-400 font-bold">تعلیمی قابلیت</p>
                <p className="text-xs font-black text-[#4A0E0E]">{profile.education || 'تفصیل موجود نہیں'}</p>
              </div>
            </div>

          </div>

          <div className="w-full border-t border-gray-100 my-4" />

          {/* 👑 تعارف */}
          <div className="space-y-2">
            <h4 className="font-black text-[#4A0E0E] text-xs flex items-center justify-end gap-1">
              میرے بارے میں <Sparkles size={11} className="text-[#D4AF37]" />
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed bg-[#F5E6D3]/20 border border-[#D4AF37]/10 p-3.5 rounded-2xl font-bold">
              {profile.about || 'صارف نے ابھی کوئی ذاتی تفصیل شیئر نہیں کی ہے۔'}
            </p>
          </div>

          {/* 👑 شاہی رابطہ بٹن */}
          <button
            type="button"
            onClick={() => onStartChat(profile)}
            className="w-full h-13 mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-[#4A0E0E] to-[#3D0A0A] text-[#D4AF37] rounded-xl text-xs font-black shadow-xl border border-[#D4AF37]/20 active:scale-98 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            رابطہ قائم کریں (میسج بھیجیں)
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileDetailModal;
