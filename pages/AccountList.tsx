import React from 'react';
import { ChevronLeft, Plus, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccountList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">계좌 관리</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-5 space-y-4">
        {/* Main Account */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-teal-100 relative">
           <div className="absolute top-4 right-4 text-teal-600 text-xs font-bold bg-teal-50 px-2 py-1 rounded">주계좌</div>
           <div className="flex items-center gap-3 mb-3">
             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">JB</div>
             <div>
               <h3 className="font-bold text-gray-800">전북은행</h3>
               <p className="text-sm text-gray-500">123-456-7890</p>
             </div>
           </div>
           <div className="flex gap-2 mt-4">
             <button className="flex-1 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg">송금</button>
             <button className="flex-1 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg">내역</button>
           </div>
        </div>

        {/* Add Account Button */}
        <button className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-200 border-dashed flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-50 transition-colors">
           <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
             <Plus size={24} />
           </div>
           <span className="text-sm font-medium">계좌 추가하기</span>
        </button>
      </div>
      
      <div className="p-5 mt-auto">
        <p className="text-xs text-gray-400 text-center">
          본인 명의의 은행 계좌만 등록할 수 있습니다.<br/>
          오픈뱅킹 서비스 이용약관에 동의해야 합니다.
        </p>
      </div>
    </div>
  );
};

export default AccountList;