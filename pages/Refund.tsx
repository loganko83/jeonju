import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const Refund: React.FC = () => {
  const navigate = useNavigate();
  const { userState } = useAppContext();
  const [reason, setReason] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">환불 신청</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-5 space-y-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
           <p className="text-sm text-gray-500 mb-1">환불 가능 금액</p>
           <p className="text-2xl font-bold text-teal-600">{userState.balance.toLocaleString()}원</p>
           <div className="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
             * 마지막 충전 잔액의 60% 이상 사용 시 수수료 없이 환불 가능합니다.
           </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">환불 계좌</label>
          <div className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 text-sm">
             전북은행 123-456-7890 (홍길동)
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">환불 사유 (선택)</label>
          <textarea 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500"
            rows={3}
            placeholder="환불 사유를 입력해주세요."
          />
        </div>
      </div>

      <div className="mt-auto p-5 pb-8">
        <button 
          className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
          onClick={() => {
            alert("환불 신청이 완료되었습니다. 영업일 기준 3일 이내 입금됩니다.");
            navigate('/');
          }}
        >
          환불 신청하기
        </button>
      </div>
    </div>
  );
};

export default Refund;