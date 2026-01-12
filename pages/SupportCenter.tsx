import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQS = [
  { q: "전주사랑상품권은 어디서 사용할 수 있나요?", a: "전주시 내 IC카드 단말기를 사용하는 대부분의 점포에서 사용 가능합니다. 단, 대형마트, 백화점, 유흥업소 등 일부 제한업종에서는 사용이 불가합니다." },
  { q: "소득공제 신청은 어떻게 하나요?", a: "앱 내 [전체메뉴 > 소득공제 신청]에서 카드 등록 후 신청하시면 됩니다. 신청 이후 사용분부터 적용됩니다." },
  { q: "비밀번호를 분실했습니다.", a: "앱 재설치 후 본인인증을 진행하시면 비밀번호를 재설정하실 수 있습니다." }
];

const SupportCenter: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">고객센터</h1>
        <div className="w-8"></div>
      </header>

      <div className="bg-white mb-2 pb-2">
         <div className="p-5 pb-0">
           <h2 className="text-xl font-bold text-gray-800 mb-1">무엇을 도와드릴까요?</h2>
           <p className="text-sm text-gray-500">자주 묻는 질문을 확인해보세요.</p>
         </div>
      </div>

      <div className="bg-white">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-100 last:border-0">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left p-5 flex justify-between items-start"
            >
              <span className="font-medium text-gray-800 text-sm pr-4"><span className="text-teal-600 font-bold mr-2">Q.</span>{faq.q}</span>
              <ChevronDown size={16} className={`text-gray-400 transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="bg-gray-50 p-5 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-5 mt-4">
        <div className="bg-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-teal-100 flex items-center justify-between cursor-pointer" onClick={() => navigate('/support')}>
           <div>
             <h3 className="font-bold text-lg mb-1">AI 챗봇 상담</h3>
             <p className="text-teal-100 text-sm">24시간 언제든 물어보세요!</p>
           </div>
           <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
             🤖
           </div>
        </div>
      </div>
      
      <div className="px-5 pb-8">
        <button className="w-full bg-white border border-gray-200 rounded-xl py-4 text-gray-600 font-medium shadow-sm flex items-center justify-center gap-2">
           <Mail size={18} />
           1:1 문의하기
        </button>
      </div>

    </div>
  );
};

export default SupportCenter;