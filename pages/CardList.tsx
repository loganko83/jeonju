import React from 'react';
import { ChevronLeft, Plus, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CardList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">보유 카드</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-5 space-y-6">
        
        {/* Card Visualization */}
        <div className="relative">
          <div className="aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 shadow-xl p-6 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
             <div className="flex justify-between items-start mb-8">
               <span className="font-bold tracking-wider opacity-80">Jeonju Pay</span>
               <span className="text-xs border border-white/30 px-2 py-0.5 rounded">교통겸용</span>
             </div>
             <div className="mb-4">
               <div className="w-12 h-8 bg-yellow-400/80 rounded mb-2"></div>
             </div>
             <div className="text-lg font-mono tracking-widest text-shadow">
               9490 1234 **** ****
             </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
             <span className="text-sm font-bold text-gray-700">별칭: 생활비 카드</span>
             <button className="text-xs text-gray-500 underline">카드관리</button>
          </div>
        </div>

        {/* Delivery Status */}
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
               <Truck size={20} />
             </div>
             <div>
               <p className="text-sm font-bold text-gray-800">카드 배송 현황</p>
               <p className="text-xs text-gray-400">신청하신 카드가 배송중입니다.</p>
             </div>
           </div>
           <button className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg text-gray-600 font-medium">조회</button>
        </div>

        {/* Apply New Card */}
        <button className="w-full bg-white rounded-xl p-4 shadow-sm flex items-center justify-center gap-2 text-teal-600 font-bold border border-teal-100">
           <Plus size={20} />
           카드 무료 신청하기
        </button>

      </div>
    </div>
  );
};

export default CardList;