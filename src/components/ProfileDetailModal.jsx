import React from 'react';
import { X, CheckCircle, MapPin, Briefcase, Moon, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileDetailModal = ({ profile, onClose }) => {
  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-[300] backdrop-blur-sm flex items-end justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="bg-white rounded-t-[50px] w-full max-w-md max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <button onClick={onClose} className="absolute top-6 left-6 bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200">
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-[#D4AF37] overflow-hidden mb-4 shadow-lg">
                  <img src={profile.profileImg || "/images/Logo.png"} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                 <h2 className="text-3xl font-bold text-[#4A0E0E]">{profile.fullName}, {profile.age || '24'}</h2>
                 {profile.verificationStatus && <CheckCircle size={20} className="text-yellow-500 fill-yellow-500/20" />}
              </div>
              <p className="text-[#4A0E0E]/80 text-sm font-bold flex items-center gap-1.5"><Heart size={16} fill="currentColor"/> سنجیدہ رشتہ کی تلاش</p>
            </div>

            <div className="space-y-4 border-t pt-6 text-right">
              <InfoItem icon={Briefcase} label="پیشہ/تعلیم" value={profile.profession || profile.education || 'Masters in Psychology'} />
              <InfoItem icon={MapPin} label="شہر" value={profile.city || 'Lahore, Pakistan'} />
              <InfoItem icon={Moon} label="مذہب" value={profile.religion || 'Muslim'} />
            </div>

            <div className="mt-8 border-t pt-6 text-right">
              <h3 className="text-lg font-bold text-[#4A0E0E] mb-3">میرے بارے میں</h3>
              <p className="text-sm text-gray-700 leading-relaxed bg-[#FDF5F5] p-5 rounded-3xl border border-[#D4AF37]/20">
                میں ایک خوش مزاج اور ملنسار انسان ہوں۔ مجھے کتابیں پڑھنا اور سفر کرنا پسند ہے۔ میں ایک ایسے ساتھی کی تلاش میں ہوں جو تعلیم یافتہ، سمجھدار اور مذہبی اقدار کا احترام کرتا ہو۔
              </p>
            </div>

            <button className="w-full mt-10 bg-gradient-to-br from-[#4A0E0E] to-[#631212] text-[#D4AF37] font-bold p-5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-3">
              <Heart fill="currentColor"/> دلچسپی بھیجیں
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4">
        <div className="bg-[#4A0E0E] p-3.5 rounded-2xl text-[#D4AF37]"><Icon size={20}/></div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold text-[#4A0E0E]">{value}</p>
        </div>
    </div>
)

export default ProfileDetailModal;
