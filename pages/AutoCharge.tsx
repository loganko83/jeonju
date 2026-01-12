import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AutoCharge: React.FC = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">자동충전 설정</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-5">
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-800">자동충전 사용</h3>
              <p className="text-xs text-gray-500 mt-1">잔액이 부족할 때 자동으로 충전합니다.</p>
            </div>
            <div 
              onClick={() => setEnabled(!enabled)}
              className={`w-14 h-8 rounded-full flex items-center px-1 cursor-pointer transition-colors ${enabled ? 'bg-teal-500' : 'bg-gray-200'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
         </div>

         {enabled && (
           <div className="space-y-4 animate-fade-in-down">
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
               <label className="text-xs text-gray-500 font-bold block mb-2">충전 기준 잔액</label>
               <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                 <span className="text-lg font-bold text-gray-800">50,000원</span>
                 <span className="text-sm text-gray-400">이하 일 때</span>
               </div>
             </div>

             <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
               <label className="text-xs text-gray-500 font-bold block mb-2">충전할 금액</label>
               <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                 <span className="text-lg font-bold text-gray-800">100,000원</span>
                 <span className="text-sm text-gray-400">충전</span>
               </div>
             </div>
             
             <button className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold mt-4">
               설정 저장
             </button>
           </div>
         )}
      </div>
    </div>
  );
};

export default AutoCharge;