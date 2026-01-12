import React, { useState } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const Charge: React.FC = () => {
  const navigate = useNavigate();
  const { charge } = useAppContext();
  const [amount, setAmount] = useState<number>(0);

  const handleCharge = () => {
    if (amount > 0) {
      charge(amount);
      alert(`${amount.toLocaleString()}원이 충전되었습니다.`);
      navigate('/');
    }
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
        <h1 className="text-lg font-bold text-gray-800">충전하기</h1>
        <button className="p-2">
          <Menu size={24} className="text-gray-800" />
        </button>
      </header>

      <div className="flex-1 p-5 space-y-8">
        {/* Limit Info */}
        <div className="bg-white p-4 rounded-xl flex justify-between items-center text-sm shadow-sm">
           <div className="text-gray-500 text-center flex-1 border-r border-gray-100">
             <p className="text-xs mb-1">충전 가능 금액</p>
             <p className="font-bold text-gray-800">2,000,000원</p>
           </div>
           <div className="text-gray-500 text-center flex-1">
             <p className="text-xs mb-1">보유한도</p>
             <button className="font-bold text-gray-800 underline">보유한도확인 ›</button>
           </div>
        </div>

        {/* Account Selection */}
        <div>
          <div className="flex justify-between items-center mb-3">
             <h3 className="font-bold text-gray-800">계좌 선택</h3>
             <button className="text-xs border border-gray-300 rounded px-2 py-1 text-gray-600">설정</button>
          </div>
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer active:bg-gray-50">
             <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">+</span>
             <span className="text-gray-600 font-medium">전북은행 123-456-7890</span>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <h3 className="font-bold text-gray-800 mb-3">금액 입력</h3>
          <div className="relative">
             <input 
               type="number" 
               value={amount === 0 ? '' : amount} 
               onChange={(e) => setAmount(Number(e.target.value))}
               placeholder="충전금액입력"
               className="w-full border border-gray-300 rounded-xl px-4 py-4 text-center text-lg font-bold focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
             />
             {amount > 0 && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">원</span>}
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
             <button onClick={() => addAmount(10000)} className="bg-white border border-gray-200 rounded-lg py-3 text-sm font-medium text-gray-600 active:bg-gray-100">+1만원</button>
             <button onClick={() => addAmount(50000)} className="bg-white border border-gray-200 rounded-lg py-3 text-sm font-medium text-gray-600 active:bg-gray-100">+5만원</button>
             <button onClick={() => addAmount(100000)} className="bg-white border border-gray-200 rounded-lg py-3 text-sm font-medium text-gray-600 active:bg-gray-100">+10만원</button>
          </div>
        </div>
        
        {/* Notice */}
        <div className="text-xs text-gray-500 space-y-2 mt-10">
           <h4 className="font-bold text-gray-700 text-base mb-2">꼭! 확인해주세요.</h4>
           <p>• 상품권 충전 취소나 환불하신 금액은 영업일 기준 3일 이내 입금될 예정입니다.</p>
           <p>• 상품권 충전 한도는 전주시 정책에 따른 충전 한도까지만 적용됩니다.</p>
        </div>
      </div>

      <div className="p-5 pb-8 bg-white border-t border-gray-100">
         <button 
           onClick={handleCharge}
           disabled={amount === 0}
           className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${amount > 0 ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'bg-gray-200 text-gray-400'}`}
         >
           총 {amount.toLocaleString()}원 충전하기
         </button>
      </div>
    </div>
  );
};

export default Charge;
