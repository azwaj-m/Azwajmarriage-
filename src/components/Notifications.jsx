import React from 'react';
import { MessageCircle, Heart, Bell } from 'lucide-react';

const NotificationsComponent = () => {
  const list = [
    { id: 1, title: 'نیا رشتہ پیغام', body: 'عائشہ خان نے آپ کو براہ راست بات کرنے کی درخواست بھیجی ہے۔', time: '5 منٹ پہلے', type: 'chat' },
    { id: 2, title: 'پروفائل وزٹ', body: 'کسی نے آپ کی پروفائل دیکھی ہے۔ دیکھنے کے لیے تصدیق کی حد مکمل کریں۔', time: '1 گھنٹہ پہلے', type: 'visit' }
  ];

  return (
    <div className="p-4 space-y-3 text-right">
      <h3 className="font-bold text-gray-800 text-sm mb-4">تازہ ترین نوٹیفیکیشنز</h3>
      {list.map((item) => (
        <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-50 shadow-sm flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400">{item.time}</span>
              <span className="font-bold text-xs text-gray-800">{item.title}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{item.body}</p>
          </div>
          <div className="p-2 bg-rose-50 rounded-lg">
            {item.type === 'chat' ? <MessageCircle className="w-4 h-4 text-rose-500" /> : <Bell className="w-4 h-4 text-rose-500" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsComponent;
