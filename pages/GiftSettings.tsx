import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GiftSettings: React.FC = () => {
  const navigate = useNavigate();
  const [notify, setNotify] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);

  const Toggle = ({ value, onChange }: { value: boolean, onChange: (v: boolean) => void }) => (
    <div 
      onClick={() => onChange(!value)}
      className={`w-12 h-7 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${value ? 'bg-teal-500' : 'bg-gray-300'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">선물 설정</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-5 space-y-4">
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800 text-sm">선물 도착 알림</h3>
            <p className="text-xs text-gray-500 mt-1">선물을 받았을 때 푸시 알림을 받습니다.</p>
          </div>
          <Toggle value={notify} onChange={setNotify} />
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800 text-sm">친구 선물 자동 받기</h3>
            <p className="text-xs text-gray-500 mt-1">등록된 친구가 보낸 선물을 즉시 수락합니다.</p>
          </div>
          <Toggle value={autoAccept} onChange={setAutoAccept} />
        </div>

        <div className="p-2">
          <p className="text-xs text-gray-400">
            * 3일 동안 받지 않은 선물은 자동으로 발송 취소 및 환불됩니다.<br/>
            * 거절한 선물은 즉시 보낸 사람에게 환불됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiftSettings;
