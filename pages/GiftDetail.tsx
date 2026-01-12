import React from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_GIFTS } from '../constants';

const GiftDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const gift = MOCK_GIFTS.find(g => g.id === id);

  if (!gift) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
         <div className="text-center">
           <p className="text-gray-500 mb-4">선물 정보를 찾을 수 없습니다.</p>
           <button onClick={() => navigate(-1)} className="text-teal-600 font-bold">돌아가기</button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">선물 상세</h1>
        <button className="p-2 text-gray-600">
          <Share2 size={24} />
        </button>
      </header>

      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 relative">
           {/* Decorative top border */}
           <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-600 w-full"></div>
           
           <div className="p-8 text-center border-b border-dashed border-gray-200">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                gift.status === 'PENDING' ? 'bg-orange-100 text-orange-600' :
                gift.status === 'ACCEPTED' ? 'bg-gray-100 text-gray-600' :
                'bg-red-100 text-red-600'
              }`}>
                {gift.status === 'PENDING' ? '대기중' : gift.status === 'ACCEPTED' ? '받기완료' : '취소/거절됨'}
              </span>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{gift.amount.toLocaleString()}원</h2>
              <p className="text-gray-500 text-sm">
                {gift.type === 'RECEIVED' ? `${gift.otherParty}님이 보낸 마음` : `${gift.otherParty}님에게 보낸 마음`}
              </p>
           </div>

           <div className="p-6 bg-gray-50/50 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">거래일시</span>
                <span className="font-medium text-gray-800">{gift.date} 14:30</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">거래번호</span>
                <span className="font-medium text-gray-800 font-mono text-xs tracking-wider">20240521-GIFT-{gift.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">메시지</span>
                <span className="font-medium text-gray-800 max-w-[60%] text-right">"{gift.message}"</span>
              </div>
           </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            문의사항이 있으신가요? <span className="underline cursor-pointer" onClick={() => navigate('/faq')}>고객센터 문의하기</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiftDetail;
