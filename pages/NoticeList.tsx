import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_NOTICES } from '../constants';

const NoticeList: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'ALL' | 'EVENT' | 'POLICY'>('ALL');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">새소식</h1>
        <div className="w-8"></div>
      </header>

      <div className="bg-white flex border-b border-gray-100 overflow-x-auto no-scrollbar">
        {['ALL', 'NOTICE', 'EVENT', 'POLICY'].map((t) => (
          <button 
            key={t}
            onClick={() => setTab(t as any)}
            className={`flex-1 py-3 text-sm font-bold text-center border-b-2 whitespace-nowrap px-4 transition-colors ${tab === t ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-400'}`}
          >
            {t === 'ALL' ? '전체' : t === 'NOTICE' ? '공지' : t === 'EVENT' ? '이벤트' : '정책뉴스'}
          </button>
        ))}
      </div>

      <div className="bg-white">
        {MOCK_NOTICES.map((notice) => (
           <div key={notice.id} className="p-5 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex gap-2 mb-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${notice.type === 'EVENT' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                  {notice.type === 'EVENT' ? '이벤트' : '공지'}
                </span>
              </div>
              <h3 className="text-gray-900 font-medium mb-1 line-clamp-2">{notice.title}</h3>
              <p className="text-xs text-gray-400">{notice.date}</p>
           </div>
        ))}
        {/* Placeholder for Policy News */}
        {tab === 'POLICY' && (
           <div className="p-10 text-center text-gray-400 text-sm">
             등록된 정책 뉴스가 없습니다.
           </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;