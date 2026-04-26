import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search, Heart, X, Star, MessageSquareHeart, Home, UserCircle, CheckCircle, Plus, Camera, LogOut, Settings, User } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './utils/firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import 'swiper/css';
import 'swiper/css/effect-cards';

const App = () => {
  const [rotation, setRotation] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  
  // فارم ڈیٹا سٹیٹ
  const [formData, setFormData] = useState({ name: '', age: '', edu: '', loc: '', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' });

  // فائر بیس سے ڈیٹا لوڈ کرنا
  useEffect(() => {
    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(data.length > 0 ? data : [
        { id: 'default', name: "Ayesha", age: 24, edu: "Psychologist", loc: "Lahore", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" }
      ]);
    });
    return () => unsubscribe();
  }, []);

  // ڈیٹا سیو کرنے کا فنکشن
  const handleSaveProfile = async () => {
    if (!formData.name || !formData.age) return alert("براہ کرم تمام معلومات درج کریں");
    try {
      await addDoc(collection(db, "profiles"), { ...formData, createdAt: new Date() });
      setIsUploadOpen(false);
      setFormData({ name: '', age: '', edu: '', loc: '', img: formData.img });
    } catch (e) { console.error("Error adding document: ", e); }
  };

  const members = ["https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150", "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150", "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150"];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FDF5F5] relative overflow-hidden font-sans" dir="ltr">
      {/* Sidebar */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-0 z-[101] flex">
            <div className="w-[80%] bg-[#4A0E0E] p-8 text-[#D4AF37] shadow-2xl">
              <X className="mb-10 cursor-pointer" onClick={() => setIsDrawerOpen(false)} />
              <nav className="space-y-8 text-xl">
                <div className="flex items-center gap-4"><User /> My Profile</div>
                <div className="flex items-center gap-4" onClick={() => { setIsUploadOpen(true); setIsDrawerOpen(false); }}><Plus /> Add Match</div>
                <div className="flex items-center gap-4 text-red-400 mt-20"><LogOut /> Logout</div>
              </nav>
            </div>
            <div className="flex-grow bg-black/50" onClick={() => setIsDrawerOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-[#4A0E0E] p-5 pb-24 rounded-b-[60px] relative z-10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <Menu className="text-[#D4AF37] cursor-pointer" onClick={() => setIsDrawerOpen(true)} />
          <span className="text-[#D4AF37] font-black tracking-widest uppercase">AZWAJ</span>
          <Bell className="text-[#D4AF37]" />
        </div>
      </header>

      <main className="relative -mt-16 px-6 z-30">
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="w-[300px] h-[400px]">
          {profiles.map(user => (
            <SwiperSlide key={user.id} className="rounded-[40px] bg-white border-8 border-white shadow-2xl overflow-hidden relative">
              <img src={user.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 p-6 flex flex-col justify-end text-white text-right">
                <h3 className="text-2xl font-bold">{user.name}, {user.age}</h3>
                <p className="text-sm opacity-80">{user.edu} • {user.loc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* Circular Carousel */}
      <div className="relative h-60 -mt-10 z-20 flex justify-center items-center">
        {members.map((img, i) => {
          const angle = (i * (360 / members.length)) + rotation;
          const x = Math.sin(angle * (Math.PI / 180)) * 160;
          const y = Math.cos(angle * (Math.PI / 180)) * 70;
          return (
            <motion.div key={i} onPan={(e, info) => setRotation(prev => prev + info.delta.x * 0.8)} animate={{ x, y, scale: y < 0 ? 0.7 : 1.3, zIndex: y < 0 ? 5 : 40 }} className="absolute">
              <img src={img} className="w-16 h-16 rounded-full border-4 border-[#D4AF37] shadow-xl" alt="" />
            </motion.div>
          );
        })}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 bg-white z-[200] p-8 text-right" dir="rtl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#4A0E0E]">نیا پروفائل</h2>
              <X onClick={() => setIsUploadOpen(false)} />
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="نام" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="number" placeholder="عمر" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setFormData({...formData, age: e.target.value})} />
              <input type="text" placeholder="تعلیم / پیشہ" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setFormData({...formData, edu: e.target.value})} />
              <input type="text" placeholder="شہر" className="w-full p-4 bg-gray-50 rounded-2xl" onChange={e => setFormData({...formData, loc: e.target.value})} />
              <button onClick={handleSaveProfile} className="w-full bg-[#4A0E0E] text-[#D4AF37] py-5 rounded-3xl font-bold">محفوظ کریں</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
