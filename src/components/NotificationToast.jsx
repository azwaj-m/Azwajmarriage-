import React, { useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  return (
    <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur border border-rose-100 p-4 rounded-xl shadow-xl flex items-start gap-3 z-[100] animate-slide-down">
      <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
        <X className="w-4 h-4 text-gray-400" />
      </button>

      <div className="flex-1 text-right">
        <h4 className="font-bold text-xs text-rose-500 flex items-center justify-end gap-1">
          <span>{notification.title}</span>
          <MessageCircle className="w-3.5 h-3.5 text-rose-500" />
        </h4>
        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationToast;
