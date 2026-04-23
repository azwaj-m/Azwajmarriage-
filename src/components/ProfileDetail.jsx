import React from 'react';
import { X, Lock, MapPin, Briefcase, Heart, Book } from 'lucide-react';

const ProfileDetail = ({ profile, onClose }) => {
  return (
    <div className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-xl flex flex-col">
      <button onClick={onClose} className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full"><X /></button>
      
      <div className="h-2/5 relative">
        <img src={profile.img || 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5'} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-3xl font-black text-[#D4AF37]">{profile.p?.n === 1 ? profile.fn : profile.dn}</h2>
          <p className="text-white opacity-80">{profile.age} سال • {profile.city}</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-t-[50px] -mt-10 p-8 space-y-6 overflow-y-auto">
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 flex items-center gap-3">
             <Book className="text-[#4A0E0E]" size={20} />
             <div><p className="text-[10px] text-gray-400">مذہب / مسلک</p><p className="font-bold text-xs">{profile.religion || 'اسلام'} ({profile.sect || 'عام'})</p></div>
          </div>
          <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 flex items-center gap-3">
             <Briefcase className="text-[#4A0E0E]" size={20} />
             <div><p className="text-[10px] text-gray-400">کاروبار</p><p className="font-bold text-xs">{profile.job || 'ذاتی'}</p></div>
          </div>
        </section>

        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
           <p className="text-xs font-black text-[#4A0E0E] mb-2 flex items-center gap-2"><Heart size={14}/> مشاغل</p>
           <p className="text-sm text-gray-600">{profile.hobbies || 'مطالعہ، سیاحت'}</p>
        </div>

        <div className="bg-[#4A0E0E] p-6 rounded-3xl text-white">
           <p className="text-xs font-bold text-[#D4AF37] mb-2 italic underline">مختصر تعارف</p>
           <p className="text-sm leading-relaxed">{profile.bio || 'ایک سادہ اور مخلص انسان جو جیون ساتھی کی تلاش میں ہے۔'}</p>
        </div>

        <div className="pt-4 space-y-3">
           <div className="flex justify-between p-4 bg-gray-100 rounded-2xl">
              <span className="text-xs font-bold">فون نمبر:</span>
              <span className="text-xs">{profile.p?.ph === 1 ? profile.ph : '🔒 پوشیدہ'}</span>
           </div>
           <div className="flex justify-between p-4 bg-gray-100 rounded-2xl">
              <span className="text-xs font-bold">اصل نام:</span>
              <span className="text-xs">{profile.p?.n === 1 ? profile.fn : '🔒 پوشیدہ'}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
