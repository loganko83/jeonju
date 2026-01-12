import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white px-4 py-3 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
      </header>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          서비스 이용을 위해<br />
          회원가입을 해주세요.
        </h2>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('가입되었습니다!'); navigate('/login'); }}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">이름</label>
            <input
              type="text"
              placeholder="실명 입력"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-teal-600 transition-colors rounded-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">생년월일</label>
            <input
              type="number"
              placeholder="생년월일 6자리 (예: 900101)"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-teal-600 transition-colors rounded-none"
            />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">휴대폰 번호</label>
             <div className="flex gap-2">
               <input
                type="tel"
                placeholder="숫자만 입력"
                className="flex-1 border-b border-gray-300 py-2 focus:outline-none focus:border-teal-600 transition-colors rounded-none"
               />
               <button type="button" className="bg-gray-100 text-gray-600 text-xs px-3 rounded-lg">인증요청</button>
             </div>
          </div>

          <div className="pt-4">
             <label className="block text-sm font-bold text-gray-700 mb-1">아이디</label>
             <input
              type="text"
              placeholder="아이디 입력"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-teal-600 transition-colors rounded-none"
             />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-1">비밀번호</label>
             <input
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-teal-600 transition-colors rounded-none"
             />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg mt-8 active:scale-95 transition-transform"
          >
            가입완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
