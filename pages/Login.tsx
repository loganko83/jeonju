import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { Fingerprint, ScanFace, CheckCircle2 } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isBioLoading, setIsBioLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      login(username);
      navigate('/');
    } else {
      alert('아이디와 비밀번호를 입력해주세요.');
    }
  };

  const handleBiometricLogin = () => {
    setIsBioLoading(true);
    // Simulate biometric delay
    setTimeout(() => {
      setIsBioLoading(false);
      login('홍길동'); // Mock user
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-teal-600 mb-2 tracking-tighter">전주사랑상품권</h1>
          <p className="text-gray-400 text-sm">지역 경제를 살리는 착한 소비</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-100 active:scale-95 transition-transform mt-6"
          >
            로그인
          </button>
        </form>

        <div className="my-8 flex items-center justify-between gap-4">
           <div className="h-px bg-gray-200 flex-1"></div>
           <span className="text-xs text-gray-400">간편 로그인</span>
           <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <button 
          onClick={handleBiometricLogin}
          className="w-full border border-gray-200 bg-gray-50 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:bg-gray-100 transition-colors"
        >
          <Fingerprint size={20} className="text-teal-600" />
          <span>생체인증으로 로그인</span>
        </button>

        <div className="mt-8 flex justify-center gap-4 text-sm text-gray-500">
          <Link to="/signup" className="hover:text-teal-600">회원가입</Link>
          <span className="text-gray-300">|</span>
          <button className="hover:text-teal-600">아이디/비밀번호 찾기</button>
        </div>
      </div>

      {/* Biometric Scanning Overlay */}
      {isBioLoading && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fade-in">
           <div className="bg-white rounded-3xl p-8 flex flex-col items-center shadow-2xl animate-scale-up">
              <div className="relative w-20 h-20 mb-6">
                 <ScanFace size={80} className="text-gray-200" strokeWidth={1} />
                 <div className="absolute inset-0 border-t-2 border-teal-500 animate-scan-vertical"></div>
              </div>
              <p className="text-gray-800 font-bold text-lg mb-1">Face ID</p>
              <p className="text-gray-500 text-sm">사용자 인증 중입니다...</p>
           </div>
           <style>{`
             @keyframes scan-vertical {
               0% { top: 0; opacity: 0; }
               20% { opacity: 1; }
               80% { opacity: 1; }
               100% { top: 100%; opacity: 0; }
             }
             .animate-scan-vertical {
               animation: scan-vertical 1.5s linear infinite;
               height: 2px;
               background: linear-gradient(90deg, transparent, #0d9488, transparent);
               box-shadow: 0 0 10px #0d9488;
             }
           `}</style>
        </div>
      )}
    </div>
  );
};

export default Login;