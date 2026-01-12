import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const BalanceStatus: React.FC = () => {
  const navigate = useNavigate();
  const { userState } = useAppContext();

  const maxLimit = 2000000;
  const monthLimit = 500000;
  // Mock current month usage
  const currentUsage = 230000; 

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">보유현황</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-5 space-y-6">
        
        {/* Total Balance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
           <p className="text-gray-500 text-sm mb-2">총 보유금액</p>
           <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              {userState.balance.toLocaleString()}
              <span className="text-xl font-medium ml-1 text-gray-600">원</span>
            </h2>
            <div className="flex justify-center gap-8 text-sm">
               <div>
                 <p className="text-gray-400 mb-1">충전잔액</p>
                 <p className="font-bold text-gray-800">{(userState.balance - userState.cashbackBalance).toLocaleString()}원</p>
               </div>
               <div className="w-px bg-gray-200"></div>
               <div>
                 <p className="text-orange-500 mb-1">캐시백</p>
                 <p className="font-bold text-gray-800">{userState.cashbackBalance.toLocaleString()}원</p>
               </div>
            </div>
        </div>

        {/* Limits */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-gray-800 mb-6">한도 현황</h3>
           
           <div className="mb-6">
             <div className="flex justify-between text-sm mb-2">
               <span className="text-gray-500">보유 한도</span>
               <span className="font-bold text-gray-800">{userState.balance.toLocaleString()} / {maxLimit.toLocaleString()}</span>
             </div>
             <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(userState.balance / maxLimit) * 100}%` }}></div>
             </div>
           </div>

           <div>
             <div className="flex justify-between text-sm mb-2">
               <span className="text-gray-500">월 구매(충전) 한도</span>
               <span className="font-bold text-gray-800">{currentUsage.toLocaleString()} / {monthLimit.toLocaleString()}</span>
             </div>
             <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${(currentUsage / monthLimit) * 100}%` }}></div>
             </div>
             <p className="text-xs text-right text-orange-500 mt-2">
               이번 달 {(monthLimit - currentUsage).toLocaleString()}원 더 충전 가능
             </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BalanceStatus;