import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, List, MapPin, Target, Phone, X, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_MERCHANTS } from '../constants';
import { Merchant } from '../types';

const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [category, setCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const CATEGORIES = ['전체', '음식점', '제과/카페', '마트', '병원/약국', '학원', '미용'];

  // Auto show list when typing search
  useEffect(() => {
    if (searchQuery.length > 0) {
      setShowList(true);
    }
  }, [searchQuery]);

  const filteredMerchants = MOCK_MERCHANTS.filter(m => {
    // Category Filter
    const categoryMatch = category === '전체' || m.category.includes(category) || (category === '마트' && m.category.includes('마트'));
    // Search Filter
    const searchMatch = m.name.includes(searchQuery) || m.category.includes(searchQuery);
    
    return categoryMatch && searchMatch;
  });

  return (
    <div className="h-screen flex flex-col relative">
      {/* Top Search Bar & Categories */}
      <div className="absolute top-0 left-0 w-full z-20 p-4 bg-gradient-to-b from-white/90 to-transparent pb-8">
        <div className="bg-white rounded-lg shadow-lg flex items-center px-4 py-3 mb-3">
          <button onClick={() => navigate('/')} className="mr-3">
             <ChevronLeft size={24} className="text-gray-500" />
          </button>
          <input 
            type="text" 
            placeholder="가맹점명 또는 업종으로 검색" 
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={20} className="text-gray-400" />
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setShowList(false); }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-sm transition-colors ${
                category === cat ? 'bg-teal-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map Area (Mock) */}
      <div className="flex-1 bg-blue-50 relative overflow-hidden" onClick={() => setSelectedMerchant(null)}>
        {/* Fake Map Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>
        
        {/* River/Road simulation */}
        <div className="absolute top-1/2 left-0 w-full h-8 bg-blue-200 transform -rotate-12 border-y-4 border-blue-300"></div>
        <div className="absolute top-0 left-1/3 w-4 h-full bg-gray-200 border-x-2 border-white"></div>
        
        {/* Map Pins */}
        {filteredMerchants.map((m, idx) => (
          <div 
            key={m.id}
            className="absolute flex flex-col items-center gap-1 cursor-pointer transform hover:-translate-y-2 transition-transform z-10"
            style={{ top: `${40 + (idx % 3) * 15}%`, left: `${20 + (idx % 3) * 25}%` }} 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMerchant(m);
            }}
          >
             <div className={`px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap mb-1 transition-colors ${selectedMerchant?.id === m.id ? 'bg-teal-600 text-white' : 'bg-white text-gray-800'}`}>
               {m.name}
             </div>
             <MapPin 
               className={`drop-shadow-md transition-colors ${selectedMerchant?.id === m.id ? 'text-teal-600 fill-teal-600' : 'text-red-500 fill-red-500'}`} 
               size={32} 
             />
          </div>
        ))}

        {/* Floating Controls */}
        <div className="absolute top-36 left-1/2 -translate-x-1/2">
           <button 
             onClick={() => { setSearchQuery(''); setShowList(false); }}
             className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700 flex items-center gap-2"
           >
             <span>↻ 검색 초기화</span>
           </button>
        </div>

        <div className="absolute top-36 left-4">
           <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
             <Target size={20} className="text-gray-700" />
           </button>
        </div>
      </div>

      {/* List View Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        {!selectedMerchant && !showList && (
          <button 
            onClick={() => setShowList(true)}
            className="bg-white px-5 py-2.5 rounded-full shadow-lg text-gray-800 font-bold flex items-center gap-2 border border-gray-100"
          >
            <List size={18} />
            <span>목록보기</span>
          </button>
        )}
      </div>

      {/* Selected Merchant Bottom Sheet */}
      {selectedMerchant && (
        <div className="absolute bottom-0 left-0 w-full bg-white z-30 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-6 animate-slide-up">
           <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
           
           <div className="flex justify-between items-start mb-2">
             <div>
               <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedMerchant.name}</h2>
               <p className="text-sm text-gray-500">{selectedMerchant.category}</p>
             </div>
             <button onClick={() => setSelectedMerchant(null)} className="p-1 bg-gray-100 rounded-full">
               <X size={20} className="text-gray-500" />
             </button>
           </div>

           {selectedMerchant.isCashback && (
             <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-md mb-4">
               캐시백 적립 가맹점
             </div>
           )}

           <div className="space-y-3 mb-6">
             <div className="flex items-start gap-3">
               <MapPin size={18} className="text-gray-400 mt-0.5" />
               <p className="text-sm text-gray-700">{selectedMerchant.address}</p>
             </div>
             <div className="flex items-center gap-3">
               <Phone size={18} className="text-gray-400" />
               <p className="text-sm text-gray-700">{selectedMerchant.phone}</p>
             </div>
             {selectedMerchant.description && (
               <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl mt-2">
                 "{selectedMerchant.description}"
               </p>
             )}
           </div>

           <div className="flex gap-3">
             <button className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2">
               <Phone size={18} /> 전화
             </button>
             <button className="flex-1 bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2" onClick={() => navigate('/qr')}>
               <span className="text-lg">₩</span> 결제하기
             </button>
           </div>
        </div>
      )}

      {/* Full List Overlay */}
      {showList && (
        <div className="absolute top-36 bottom-0 left-0 w-full bg-white z-20 rounded-t-3xl shadow-negative overflow-hidden flex flex-col animate-slide-up">
           <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-lg">주변 가맹점 <span className="text-teal-600">{filteredMerchants.length}</span>곳</h2>
              <button onClick={() => setShowList(false)}><X className="text-gray-400" /></button>
           </div>
           <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-20">
              {filteredMerchants.map(m => (
                <div key={m.id} className="border-b border-gray-100 pb-4 last:border-0" onClick={() => {setShowList(false); setSelectedMerchant(m);}}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-gray-800">{m.name}</h3>
                    <span className="text-xs text-gray-400">0.4km</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{m.category}</p>
                  <p className="text-xs text-gray-400 truncate">{m.address}</p>
                  {m.isCashback && <span className="inline-block mt-2 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">캐시백적립</span>}
                </div>
              ))}
              {filteredMerchants.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                   검색 결과가 없습니다.
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;