import React from 'react';
import { Settings, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();

  const MenuSection = ({ title, items }: { title: string, items: { label: string, path: string }[] }) => (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-900 mb-2 px-1 flex items-center gap-2">
        {title === '전주사랑상품권' && <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px]">₩</span>}
        {title === '가맹점/새소식' && <span className="text-lg">😎</span>}
        {title === '고객지원' && <span className="text-lg">🎧</span>}
        {title}
      </h3>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate(item.path)}
            className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0 active:bg-gray-50 cursor-pointer"
          >
            <span className="text-gray-700 text-sm font-medium">{item.label}</span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
       <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <h1 className="text-xl font-bold text-teal-600">전주사랑상품권</h1>
        <div className="flex gap-4">
          <Settings className="text-gray-800" size={24} />
          <button onClick={() => navigate('/')}>
             <X className="text-gray-800" size={24} />
          </button>
        </div>
      </header>

      {/* Merchant Mode Toggle */}
      <div className="p-4">
        <div className="bg-white border border-teal-500 rounded-full py-3 flex items-center justify-center gap-2 shadow-sm relative overflow-visible">
           <span className="text-teal-700 font-bold text-sm">가맹점 모드 전환 ⇄</span>
           <div className="absolute -top-3 right-8 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded shadow-sm">
             매장 관리를 빠르게!
           </div>
        </div>
      </div>

      <div className="px-4">
        <MenuSection 
          title="전주사랑상품권" 
          items={[
            { label: '상품권 보유현황', path: '/balance' },
            { label: '상품권 충전', path: '/charge' },
            { label: 'QR결제', path: '/qr' },
            { label: '이용내역', path: '/history' },
            { label: '선물하기', path: '/gift' },
            { label: '선물함', path: '/gift-box' },
            { label: '상품권 환불', path: '/refund' },
            { label: '상품권 자동 충전', path: '/auto-charge' }
          ]} 
        />
        
        <MenuSection 
          title="계좌/카드" 
          items={[
            { label: '보유 계좌 조회', path: '/accounts' },
            { label: '계좌 추가', path: '/accounts' },
            { label: '보유 카드 조회', path: '/cards' },
            { label: '카드 신청', path: '/cards' },
            { label: '카드 배송 현황', path: '/cards' }
          ]} 
        />

        <MenuSection 
          title="가맹점/새소식" 
          items={[
            { label: '가맹점 찾기', path: '/map' },
            { label: '모바일(QR)가맹점 신청', path: '/guide' },
            { label: '새소식(공지사항)', path: '/notices' },
            { label: '전주사랑상품권 안내', path: '/guide' },
            { label: '정책뉴스', path: '/notices' }
          ]} 
        />

         <MenuSection 
          title="고객지원" 
          items={[
            { label: '자주하는 질문', path: '/faq' },
            { label: '문의하기', path: '/faq' },
            { label: 'AI 챗봇 상담', path: '/support' }
          ]} 
        />
        
        <div className="text-center py-8 text-gray-400 text-xs">
          앱 버전 2.4.1
        </div>
      </div>
    </div>
  );
};

export default MenuPage;