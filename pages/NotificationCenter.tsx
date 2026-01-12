import React from 'react';
import { ChevronLeft, Bell, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const NotificationCenter: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead, removeNotification } = useAppContext();

  const handleDeleteAll = () => {
    if (confirm('모든 알림을 삭제하시겠습니까?')) {
      // In a real app, this would call a batch delete method.
      // For this mock, we'd need a clearAll method in context, 
      // but we'll just delete them one by one for now or just skip implementing 'Delete All' fully
      // to keep the context interface simple, or simply assume it's handled.
      notifications.forEach(n => removeNotification(n.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">알림 센터</h1>
        <button onClick={handleDeleteAll} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 size={22} />
        </button>
      </header>

      <div className="flex-1">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-10 mt-20">
            <Bell size={48} className="text-gray-200 mb-4" />
            <p className="text-gray-400">받은 알림이 없습니다.</p>
          </div>
        ) : (
          notifications.map(n => (
            <div 
              key={n.id} 
              onClick={() => markAsRead(n.id)}
              className={`p-5 border-b border-gray-100 transition-all cursor-pointer relative group ${n.read ? 'bg-white' : 'bg-teal-50/40 hover:bg-teal-50/60'}`}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>

              <div className="flex justify-between items-start mb-1 pr-6">
                <div className="flex items-center gap-2">
                  {!n.read && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                  <span className="text-xs font-bold text-gray-400">{n.type === 'TRANSACTION' ? '결제/충전' : '공지/이벤트'}</span>
                </div>
                <span className="text-xs text-gray-300">{n.date}</span>
              </div>
              <h3 className={`text-sm mb-1 ${n.read ? 'text-gray-600 font-medium' : 'text-gray-900 font-bold'}`}>{n.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;