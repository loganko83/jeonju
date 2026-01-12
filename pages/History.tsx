import React, { useState } from 'react';
import { ChevronLeft, SlidersHorizontal, ArrowDownCircle, ArrowUpCircle, Coins, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TRANSACTIONS } from '../constants';

const History: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'CASHBACK'>('ALL');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Advanced Filter States
  const [period, setPeriod] = useState<'1WEEK' | '1MONTH' | '3MONTHS'>('1MONTH');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'PAYMENT' | 'CHARGE'>('ALL');

  // Constants for Date Calculation (Simulated 'Today' as 2024-05-21 to match mock data)
  const TODAY = new Date('2024-05-21');

  // Filter Logic
  let displayTransactions = MOCK_TRANSACTIONS.filter(t => {
    // 1. Basic Type Filter
    if (filter === 'CASHBACK') {
      if (t.cashbackEarned === 0 && t.cashbackUsed === 0) return false;
    }

    // 2. Advanced Type Filter
    if (typeFilter !== 'ALL' && t.type !== typeFilter) return false;

    // 3. Period Filter
    const transDate = new Date(t.date.replace(' ', 'T')); // '2024-05-20 12:30' -> '2024-05-20T12:30'
    const diffTime = Math.abs(TODAY.getTime() - transDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (period === '1WEEK' && diffDays > 7) return false;
    if (period === '1MONTH' && diffDays > 30) return false;
    if (period === '3MONTHS' && diffDays > 90) return false;

    return true;
  });

  // Calculate Summaries
  const totalSpend = displayTransactions
    .filter(t => t.type === 'PAYMENT')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalEarned = displayTransactions
    .reduce((acc, curr) => acc + curr.cashbackEarned, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">이용내역</h1>
        <button className="p-2" onClick={() => setShowFilterModal(true)}>
          <SlidersHorizontal size={24} className="text-gray-800" />
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white px-4 border-b border-gray-100 flex">
        <button 
          onClick={() => setFilter('ALL')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 ${filter === 'ALL' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-400'}`}
        >
          전체
        </button>
        <button 
          onClick={() => setFilter('CASHBACK')}
          className={`flex-1 py-3 text-sm font-bold border-b-2 ${filter === 'CASHBACK' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-400'}`}
        >
          캐시백 내역
        </button>
      </div>

      <div className="flex-1 p-5 space-y-4">
        {/* Summary Card */}
        {displayTransactions.length > 0 && filter === 'ALL' && (
           <div className="bg-teal-600 rounded-2xl p-5 text-white flex justify-between items-center shadow-lg shadow-teal-100">
              <div>
                <p className="text-teal-100 text-xs mb-1">총 사용금액</p>
                <p className="text-xl font-bold">{totalSpend.toLocaleString()}원</p>
              </div>
              <div className="text-right">
                <p className="text-teal-100 text-xs mb-1">받은 혜택</p>
                <p className="text-xl font-bold text-yellow-300">+{totalEarned.toLocaleString()}원</p>
              </div>
           </div>
        )}

        {displayTransactions.length === 0 ? (
          <div className="text-center py-20">
             <div className="inline-block p-4 rounded-full bg-gray-100 text-gray-400 mb-2">
               <SlidersHorizontal size={32} />
             </div>
             <p className="text-gray-400 text-sm">해당 기간의 내역이 없습니다.</p>
          </div>
        ) : (
          displayTransactions.map((t) => (
            <div key={t.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50">
               <div className="text-xs text-gray-500 font-bold mb-3 pb-2 border-b border-gray-100">
                 {t.date.split(' ')[0]}
               </div>
               
               <div className="flex justify-between items-start">
                 <div className="flex gap-3">
                   <div className="mt-1">
                     {filter === 'CASHBACK' ? (
                        <Coins className={t.cashbackEarned > 0 ? "text-orange-500" : "text-gray-400"} size={24} />
                     ) : (
                        t.type === 'CHARGE' ? <ArrowDownCircle className="text-teal-500" size={24} /> : <ArrowUpCircle className="text-orange-500" size={24} />
                     )}
                   </div>
                   <div>
                     <p className="text-xs text-gray-400 mb-0.5">
                       {t.type === 'CHARGE' ? '충전' : t.type === 'PAYMENT' ? '결제' : '기타'}
                     </p>
                     <h3 className="font-bold text-gray-800 text-lg mb-1">{t.merchantName}</h3>
                     {filter !== 'CASHBACK' && <p className="text-xs text-gray-400">{t.date.split(' ')[1]}</p>}
                   </div>
                 </div>
                 
                 <div className="text-right">
                   {filter === 'ALL' ? (
                      <>
                        <p className={`font-bold text-lg ${t.type === 'CHARGE' ? 'text-teal-600' : 'text-gray-900'}`}>
                          {t.type === 'CHARGE' ? '+' : ''}{t.amount.toLocaleString()}원
                        </p>
                        {t.cashbackEarned > 0 && (
                          <p className="text-xs text-orange-500 mt-1 font-medium">
                            적립 +{t.cashbackEarned.toLocaleString()}
                          </p>
                        )}
                         {t.cashbackUsed > 0 && (
                          <p className="text-xs text-gray-500 mt-1 font-medium">
                            캐시백사용 -{t.cashbackUsed.toLocaleString()}
                          </p>
                        )}
                      </>
                   ) : (
                     <>
                        {t.cashbackEarned > 0 && <p className="font-bold text-orange-500 text-lg">+{t.cashbackEarned.toLocaleString()}원</p>}
                        {t.cashbackUsed > 0 && <p className="font-bold text-gray-700 text-lg">-{t.cashbackUsed.toLocaleString()}원</p>}
                        <p className="text-xs text-gray-400 mt-1">{t.cashbackEarned > 0 ? '적립' : '사용'}</p>
                     </>
                   )}
                 </div>
               </div>
            </div>
          ))
        )}
      </div>

      {/* Filter Bottom Sheet */}
      {showFilterModal && (
        <div className="absolute inset-0 z-50">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilterModal(false)}></div>
           <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold text-gray-900">상세조회</h2>
                 <button onClick={() => setShowFilterModal(false)}><X className="text-gray-400" /></button>
              </div>

              <div className="space-y-6">
                 <div>
                    <h3 className="text-sm font-bold text-gray-600 mb-3">조회기간</h3>
                    <div className="flex gap-2">
                       {['1WEEK', '1MONTH', '3MONTHS'].map(p => (
                         <button 
                           key={p}
                           onClick={() => setPeriod(p as any)}
                           className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-colors ${period === p ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-gray-200 text-gray-500'}`}
                         >
                           {p === '1WEEK' ? '1주일' : p === '1MONTH' ? '1개월' : '3개월'}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <h3 className="text-sm font-bold text-gray-600 mb-3">거래유형</h3>
                    <div className="flex gap-2">
                       {['ALL', 'PAYMENT', 'CHARGE'].map(t => (
                         <button 
                           key={t}
                           onClick={() => setTypeFilter(t as any)}
                           className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-colors ${typeFilter === t ? 'border-teal-600 bg-teal-50 text-teal-600' : 'border-gray-200 text-gray-500'}`}
                         >
                           {t === 'ALL' ? '전체' : t === 'PAYMENT' ? '결제' : '충전'}
                         </button>
                       ))}
                    </div>
                 </div>

                 <button 
                   onClick={() => setShowFilterModal(false)}
                   className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg mt-4"
                 >
                   조회하기
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default History;