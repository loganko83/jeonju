import React, { useState, useEffect } from 'react';
import { ChevronLeft, Settings, Gift as GiftIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_GIFTS } from '../constants';
import { Gift } from '../types';
import { useAppContext } from '../App';

const GiftBox: React.FC = () => {
  const navigate = useNavigate();
  const { receiveGift } = useAppContext();
  const [tab, setTab] = useState<'RECEIVED' | 'SENT'>('RECEIVED');
  const [gifts, setGifts] = useState<Gift[]>(MOCK_GIFTS);
  const [showToast, setShowToast] = useState<string | null>(null);

  const filteredGifts = gifts.filter(g => g.type === tab);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleAccept = (gift: Gift) => {
    if (confirm(`${gift.otherParty}님의 선물을 받으시겠습니까?`)) {
      receiveGift(gift.amount);
      setGifts(prev => prev.map(g => g.id === gift.id ? { ...g, status: 'ACCEPTED' } : g));
    }
  };

  const handleRefuse = (gift: Gift) => {
    if (confirm("선물을 거절하시겠습니까?")) {
      setGifts(prev => prev.map(g => g.id === gift.id ? { ...g, status: 'REFUSED' } : g));
      setShowToast("선물을 거절했습니다. 보낸 분에게 환불 처리됩니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate('/')} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">선물함</h1>
        <button onClick={() => navigate('/gift/settings')} className="p-2">
          <Settings size={24} className="text-gray-800" />
        </button>
      </header>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] bg-gray-800 text-white px-4 py-3 rounded-xl shadow-xl z-50 flex items-center justify-between animate-fade-in-down">
          <span className="text-sm">{showToast}</span>
          <button onClick={() => setShowToast(null)}><X size={16}/></button>
        </div>
      )}

      <div className="bg-white flex border-b border-gray-100">
        <button 
          onClick={() => setTab('RECEIVED')}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${tab === 'RECEIVED' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-400'}`}
        >
          받은 선물 <span className="bg-teal-100 text-teal-600 px-1.5 rounded-full text-[10px] ml-1">{gifts.filter(g => g.type === 'RECEIVED' && g.status === 'PENDING').length}</span>
        </button>
        <button 
          onClick={() => setTab('SENT')}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${tab === 'SENT' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-400'}`}
        >
          보낸 선물
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {filteredGifts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-3xl grayscale opacity-50">
              🎁
            </div>
            <p className="text-gray-500 text-sm mb-1">내역이 없습니다.</p>
          </div>
        ) : (
          filteredGifts.map(gift => (
            <div key={gift.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${gift.status === 'ACCEPTED' ? 'bg-gray-100 grayscale' : 'bg-purple-100'}`}>
                      🎁
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">{gift.date}</p>
                      <h3 className="font-bold text-gray-800">
                        {gift.otherParty}님{tab === 'RECEIVED' ? '이 보낸 선물' : '에게 보낸 선물'}
                      </h3>
                    </div>
                  </div>
                  {gift.status === 'PENDING' && (
                    <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">대기중</span>
                  )}
                  {gift.status === 'ACCEPTED' && (
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">완료</span>
                  )}
                  {gift.status === 'REFUSED' && (
                    <span className="text-xs font-bold text-red-400 bg-red-50 px-2 py-1 rounded">거절됨</span>
                  )}
               </div>

               <div className="bg-gray-50 rounded-xl p-3 mb-4 text-center">
                 <p className="text-xl font-bold text-gray-900">{gift.amount.toLocaleString()}원</p>
                 {gift.message && <p className="text-xs text-gray-500 mt-1">"{gift.message}"</p>}
               </div>

               {tab === 'RECEIVED' && gift.status === 'PENDING' && (
                 <div className="flex gap-2">
                   <button 
                    onClick={() => handleRefuse(gift)}
                    className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
                   >
                     거절
                   </button>
                   <button 
                    onClick={() => handleAccept(gift)}
                    className="flex-1 py-2 rounded-lg bg-teal-600 text-sm font-bold text-white shadow-lg shadow-teal-100 hover:bg-teal-700"
                   >
                     선물 받기
                   </button>
                 </div>
               )}

               <button 
                 onClick={() => navigate(`/gift/${gift.id}`)}
                 className="w-full text-center text-xs text-gray-400 mt-2 hover:underline"
               >
                 상세보기
               </button>
            </div>
          ))
        )}
      </div>

      {tab === 'SENT' && (
        <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
           <button onClick={() => navigate('/gift')} className="w-full py-3 bg-teal-600 text-white rounded-xl font-bold shadow-lg">
             새로운 선물 보내기
           </button>
        </div>
      )}
    </div>
  );
};

export default GiftBox;
