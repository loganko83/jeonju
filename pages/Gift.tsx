import React, { useState } from 'react';
import { ChevronLeft, User, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const Gift: React.FC = () => {
  const navigate = useNavigate();
  const { userState } = useAppContext();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!recipient) return alert("받는 분을 입력해주세요.");
    if (amount <= 0) return alert("금액을 입력해주세요.");
    if (amount > userState.balance) return alert("잔액이 부족합니다.");

    alert(`${recipient}님에게 ${amount.toLocaleString()}원을 선물했습니다.`);
    navigate('/gift-box');
  };

  const addAmount = (val: number) => {
    setAmount(prev => prev + val);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">선물하기</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        
        {/* Recipient Input */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
           <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
             <User size={16} className="text-teal-600"/> 받는 분
           </label>
           <input 
             type="text" 
             value={recipient}
             onChange={(e) => setRecipient(e.target.value)}
             placeholder="이름 또는 전화번호 입력"
             className="w-full border-b-2 border-gray-200 py-2 text-lg focus:outline-none focus:border-teal-600 transition-colors"
           />
        </div>

        {/* Amount Input */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <label className="text-sm font-bold text-gray-700 mb-2 block">보낼 금액</label>
          <div className="relative mb-4">
             <input 
               type="number" 
               value={amount === 0 ? '' : amount} 
               onChange={(e) => setAmount(Number(e.target.value))}
               placeholder="0"
               className="w-full text-right text-3xl font-bold text-gray-900 border-none p-0 focus:ring-0 placeholder-gray-200"
             />
             <span className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 text-gray-400 font-bold">원</span>
          </div>
          <p className="text-xs text-right text-gray-500 mb-4">
            보유잔액: <span className="text-teal-600 font-bold">{userState.balance.toLocaleString()}원</span>
          </p>

          <div className="grid grid-cols-4 gap-2">
             {[10000, 30000, 50000, 100000].map(val => (
               <button 
                key={val} 
                onClick={() => addAmount(val)} 
                className="py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 active:bg-gray-100"
               >
                 +{val/10000}만
               </button>
             ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
           <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
             <MessageSquare size={16} className="text-teal-600"/> 메시지 카드
           </label>
           <textarea 
             value={message}
             onChange={(e) => setMessage(e.target.value)}
             placeholder="마음을 담은 메시지를 입력해보세요."
             rows={3}
             className="w-full bg-gray-50 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-100"
           />
        </div>

        <div className="text-xs text-gray-400 leading-relaxed px-2">
           • 선물하기는 보유한 충전금액 내에서 가능합니다.<br/>
           • 선물 받은 사람이 3일 이내에 수락하지 않으면 자동 취소됩니다.
        </div>
      </div>

      <div className="p-5 pb-8 bg-white border-t border-gray-100">
         <button 
           onClick={handleSend}
           className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-teal-200 active:scale-95 transition-transform"
         >
           선물 보내기
         </button>
      </div>
    </div>
  );
};

export default Gift;
