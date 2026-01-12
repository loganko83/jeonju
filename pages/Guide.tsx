import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Guide: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">이용안내</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-6 space-y-8">
         <section>
           <h2 className="text-2xl font-bold text-teal-700 mb-2">전주사랑상품권이란?</h2>
           <p className="text-gray-600 leading-relaxed text-sm">
             전주시 내에서 돈이 돌게하여 소상공인과 지역주민이 상생하는 착한 소비의 시작! 전주사랑상품권은 지역자금의 역외 유출을 막고 지역경제를 활성화하기 위해 전주시가 발행하는 지역화폐입니다.
           </p>
         </section>

         <section className="bg-orange-50 p-5 rounded-2xl">
           <h3 className="font-bold text-orange-600 mb-2 text-lg">혜택 안내</h3>
           <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
             <li><span className="font-bold">캐시백 10%</span> (이벤트 기간 12%)</li>
             <li>연말정산 소득공제 <span className="font-bold">30%</span> (전통시장 40%)</li>
             <li>가맹점 카드수수료 절감 효과</li>
           </ul>
         </section>

         <section>
           <h3 className="font-bold text-gray-800 mb-2">구매 한도</h3>
           <div className="flex justify-between text-sm py-2 border-b border-gray-100">
             <span className="text-gray-500">월 구매한도</span>
             <span className="font-bold">50만원</span>
           </div>
           <div className="flex justify-between text-sm py-2 border-b border-gray-100">
             <span className="text-gray-500">최대 보유한도</span>
             <span className="font-bold">200만원</span>
           </div>
         </section>
         
         <div className="pt-8">
           <button 
             onClick={() => navigate('/cards')} 
             className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-100"
           >
             카드 신청하러 가기
           </button>
         </div>
      </div>
    </div>
  );
};

export default Guide;