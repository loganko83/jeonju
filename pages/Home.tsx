import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, QrCode, Plus, Search, Wallet, Gift, Receipt, MapPin, X } from 'lucide-react';
import { useAppContext } from '../App';
import { MOCK_NOTICES } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userState, notifications } = useAppContext();
  const [showNotification, setShowNotification] = useState(true);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-teal-600 tracking-tighter">전주사랑상품권</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-500 font-medium">간편</div>
          <button onClick={() => navigate('/notifications')} className="relative p-1">
            <Bell className="text-gray-700" size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-5 pt-4 pb-24 space-y-6">

        {/* Gift Notification Banner */}
        {showNotification && (
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 shadow-lg flex items-center justify-between text-white relative animate-fade-in-down">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl backdrop-blur-sm">
                🎁
              </div>
              <Link to="/gift-box" className="flex flex-col">
                <span className="text-xs font-medium text-white/80">선물이 도착했어요!</span>
                <span className="text-sm font-bold">김철수님이 30,000원을 보냈습니다.</span>
              </Link>
            </div>
            <button onClick={() => setShowNotification(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={16} />
            </button>
          </div>
        )}
        
        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-600 font-medium flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">₩</span>
                총 보유금액
              </span>
              <button className="text-gray-400 transform rotate-90">›</button>
            </div>
            
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              {userState.balance.toLocaleString()}
              <span className="text-2xl font-bold ml-1">원</span>
            </h2>

            <div className="flex gap-3">
              <Link to="/charge" className="flex-1 bg-teal-600 text-white font-bold py-3 rounded-xl text-center shadow-lg shadow-teal-100 active:scale-95 transition-transform">
                상품권 충전
              </Link>
              <button onClick={() => navigate('/qr')} className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-xl text-center shadow-lg shadow-orange-100 active:scale-95 transition-transform">
                QR 결제
              </button>
            </div>
          </div>
          
          {/* Card Management Mini Section */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
             <span className="text-sm text-gray-500">보유중인 카드 (1개)</span>
             <div className="flex items-center gap-2">
               <div className="w-10 h-6 bg-orange-300 rounded overflow-hidden relative">
                  <div className="absolute right-0 bottom-0 w-6 h-6 bg-orange-400 rounded-full translate-x-1 translate-y-1"></div>
               </div>
               <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                 <Plus size={16} />
               </button>
             </div>
          </div>
        </div>

        {/* Cashback Banner */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-100 ring-2 ring-orange-50/50">
          <div className="text-center mb-4">
            <p className="text-gray-800 font-bold text-lg">
              지금 결제하고 <span className="text-orange-500">캐시백 12%</span> 적립
            </p>
            <p className="text-gray-500 text-sm mt-1">
              이번 달 한도 50만원 중 {(500000 - userState.balance).toLocaleString()}원 남았어요
            </p>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-orange-400 w-3/4 rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
            <span>0원</span>
            <span>500,000원</span>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="grid grid-cols-4 gap-2">
          <Link to="/map" className="flex flex-col items-center gap-2 p-2 active:bg-gray-100 rounded-xl transition-colors">
            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 shadow-sm">
              <Search size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-gray-700">가맹점찾기</span>
          </Link>
          <Link to="/history" className="flex flex-col items-center gap-2 p-2 active:bg-gray-100 rounded-xl transition-colors">
             <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-sm">
              <Receipt size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-gray-700">이용내역</span>
          </Link>
          <Link to="/menu" className="flex flex-col items-center gap-2 p-2 active:bg-gray-100 rounded-xl transition-colors">
             <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
              <Wallet size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-gray-700">내 지갑</span>
          </Link>
          <Link to="/gift" className="flex flex-col items-center gap-2 p-2 active:bg-gray-100 rounded-xl transition-colors">
             <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-500 shadow-sm">
              <Gift size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-medium text-gray-700">선물하기</span>
          </Link>
        </div>

        {/* Banners */}
        <div className="bg-teal-50 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-teal-800 font-bold mb-1">전주사랑상품권 QR가맹점</p>
              <p className="text-teal-600 text-sm">신청하고 순금 받아가세요!</p>
            </div>
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-2xl">💰</span>
            </div>
        </div>

        {/* News Feed */}
        <div className="bg-white p-5 rounded-3xl shadow-sm">
           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
             <span className="text-red-500">✿</span> 새소식
           </h3>
           <ul className="space-y-4">
             {MOCK_NOTICES.map(notice => (
               <li key={notice.id} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                 <div className="text-gray-800 text-sm font-medium mb-1 truncate">{notice.title}</div>
                 <div className="text-gray-400 text-xs">{notice.date}</div>
               </li>
             ))}
           </ul>
        </div>

      </div>
    </div>
  );
};

export default Home;