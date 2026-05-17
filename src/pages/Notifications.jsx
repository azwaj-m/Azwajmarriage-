import React from 'react';
import { MessageCircle, Heart, Crown, User, ChevronRight, Clock, Star } from 'lucide-react';

const Notifications = ({ setActiveTab, setCurrentView }) => {
  // نوٹیفیکیشنز کا ڈیٹا کیٹیگری کے لحاظ سے
  const sections = [
    {
      title: "New",
      data: [
        {
          id: 1,
          title: 'Aisha Khan sent you a message',
          time: '2 mins ago',
          icon: <MessageCircle size={16} />,
          bgColor: 'bg-blue-50',
          iconColor: 'text-blue-600',
          target: { tab: 'chat', view: 'main' }
        },
        {
          id: 2,
          title: 'Premium Offer: 50% Discount',
          time: 'Just now',
          icon: <Crown size={16} />,
          bgColor: 'bg-amber-50',
          iconColor: 'text-amber-600',
          target: { tab: 'home', view: 'premium' }
        }
      ]
    },
    {
      title: "Earlier",
      data: [
        {
          id: 3,
          title: 'Someone liked your profile',
          time: '3 hours ago',
          icon: <Heart size={16} />,
          bgColor: 'bg-red-50',
          iconColor: 'text-red-600',
          target: { tab: 'notifications', view: 'main' }
        },
        {
          id: 4,
          title: 'Your profile was viewed by 5 people',
          time: '5 hours ago',
          icon: <User size={16} />,
          bgColor: 'bg-purple-50',
          iconColor: 'text-purple-600',
          target: { tab: 'profile', view: 'main' }
        }
      ]
    }
  ];

  const handleNotificationClick = (target) => {
    if (target.tab) setActiveTab(target.tab);
    if (target.view) setCurrentView(target.view);
  };

  return (
    <div className="bg-[#FDF5F5] min-h-full pb-20 animate-in fade-in duration-500">
      {/* ہیڈر */}
      <div className="p-4 flex justify-between items-center bg-transparent border-b border-gray-100 sticky top-0 z-10">
        <h2 className="text-[#4A0E0E] text-xl font-black uppercase tracking-tight">Activity</h2>
        <button className="text-[10px] font-bold text-[#D4AF37] uppercase bg-[#4A0E0E] px-3 py-1 rounded-full">
          Mark all read
        </button>
      </div>

      <div className="p-4 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            {/* سیکشن ٹائٹل */}
            <div className="flex items-center gap-2 px-1">
              <span className="text-[#4A0E0E] font-black text-xs uppercase tracking-widest">{section.title}</span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* نوٹیفیکیشن کارڈز */}
            <div className="space-y-2">
              {section.data.map((n) => (
                <div 
                  key={n.id}
                  onClick={() => handleNotificationClick(n.target)}
                  className="bg-transparent p-3 rounded-2xl flex items-center justify-between shadow-sm border border-transparent active:border-[#D4AF37] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${n.bgColor} ${n.iconColor} p-2.5 rounded-xl`}>
                      {n.icon}
                    </div>
                    <div>
                      <h4 className="text-[#4A0E0E] font-bold text-[11px] leading-tight">{n.title}</h4>
                      <div className="flex items-center gap-1 mt-1 text-gray-400">
                        <Clock size={8} />
                        <span className="text-[9px] font-medium">{n.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* سجیشن سیکشن (پریمیم لک) */}
        <div className="mt-8 bg-gradient-to-r from-[#4A0E0E] to-[#631919] p-4 rounded-[25px] shadow-lg relative overflow-hidden">
          <Star className="absolute -right-2 -top-2 text-[#D4AF37] opacity-20" size={60} />
          <h3 className="text-[#D4AF37] font-black text-xs uppercase italic">Top Suggestion</h3>
          <p className="text-white text-[10px] mt-1 opacity-90">Complete your profile to get 3x more matches today!</p>
          <button 
            onClick={() => setCurrentView('edit_profile')}
            className="mt-3 bg-[#D4AF37] text-[#4A0E0E] text-[9px] font-black px-4 py-1.5 rounded-lg uppercase"
          >
            Update Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
