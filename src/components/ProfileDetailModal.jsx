
import React from 'react';

import { X, MessageCircle, MapPin, Briefcase, GraduationCap } from 'lucide-react';

import VerifiedBadge from './VerifiedBadge';



const ProfileDetailModal = ({ profile, onClose, onStartChat }) => {

  if (!profile) return null;



  return (

    <div className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center p-4">

      <div className="bg-white w-full rounded-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col animate-slide-up">

        

        {/* ہیڈر تصویر */}

        <div className="relative h-64 bg-gray-100">

          <img 

            src={profile.photoURL || 'https://via.placeholder.com/400'} 

            alt={profile.fullName} 

            className="w-full h-full object-cover"

          />

          <button 

            onClick={onClose}

            className="absolute top-4 left-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"

          >

            <X className="w-5 h-5" />

          </button>

        </div>



        {/* تفصیلات کا ایریا */}

        <div className="p-6 text-right">

          <div className="flex items-center justify-end gap-2">

            {profile.isVerified && <VerifiedBadge />}

            <h2 className="text-2xl font-bold text-gray-800">{profile.fullName}</h2>

          </div>

          <p className="text-sm text-gray-500 mt-1">{profile.age} سال • {profile.gender}</p>



          <hr className="my-4 border-gray-100" />



          {/* بنیادی انفارمیشن گریڈ */}

          <div className="space-y-3">

            <div className="flex items-center justify-end gap-2 text-gray-600 text-sm">

              <span>{profile.city}</span>

              <MapPin className="w-4 h-4 text-rose-500" />

            </div>

            <div className="flex items-center justify-end gap-2 text-gray-600 text-sm">

              <span>{profile.profession}</span>

              <Briefcase className="w-4 h-4 text-rose-500" />

            </div>

            <div className="flex items-center justify-end gap-2 text-gray-600 text-sm">

              <span>{profile.education || 'ایجوکیشن درج نہیں'}</span>

              <GraduationCap className="w-4 h-4 text-rose-500" />

            </div>

          </div>



          <hr className="my-4 border-gray-100" />



          {/* تعارف */}

          <h4 className="font-bold text-gray-800 mb-2">میرے بارے میں</h4>

          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">

            {profile.about || 'صارف نے ابھی کوئی تفصیل شیئر نہیں کی۔'}

          </p>



          {/* ایکشن بٹن */}

          <button

            onClick={() => onStartChat(profile)}

            className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-rose-200 hover:opacity-90 transition-opacity"

          >

            <MessageCircle className="w-5 h-5" />

            رابطہ قائم کریں

          </button>

        </div>



      </div>

    </div>

  );

};



export default ProfileDetailModal;

