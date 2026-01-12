import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Flashlight, Image, QrCode, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const QrPayment: React.FC = () => {
  const navigate = useNavigate();
  const { pay, userState } = useAppContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [mode, setMode] = useState<'SCAN' | 'MY_QR'>('SCAN');
  const [step, setStep] = useState<'SCAN' | 'AMOUNT' | 'CONFIRM'>('SCAN');
  const [amount, setAmount] = useState<number>(0);
  const [merchantName, setMerchantName] = useState('');
  const [qrTimer, setQrTimer] = useState(180);
  const [qrCode, setQrCode] = useState("1234-5678-9012");
  const [isFlashOn, setIsFlashOn] = useState(false);

  useEffect(() => {
    if (mode === 'SCAN' && step === 'SCAN') {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera access denied", err);
        }
      };
      startCamera();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [mode, step]);

  useEffect(() => {
    if (mode === 'MY_QR') {
      const interval = setInterval(() => {
        setQrTimer((prev) => {
          if (prev <= 1) {
            regenerateQr();
            return 180;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  const regenerateQr = () => {
     const randomPart = Math.floor(1000 + Math.random() * 9000);
     setQrCode(`1234-5678-${randomPart}`);
     setQrTimer(180);
  };

  const handleSimulatedScan = () => {
    setMerchantName("전주 한옥마을 상회");
    setStep('AMOUNT');
  };

  const handlePayment = () => {
    if (pay(amount)) {
      alert("결제가 완료되었습니다.");
      navigate('/');
    } else {
      alert("잔액이 부족합니다.");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const InputKeypad = () => (
    <div className="grid grid-cols-3 gap-px bg-gray-100 pt-px mt-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button 
          key={num}
          onClick={() => setAmount(prev => Number(`${prev}${num}`))}
          className="bg-white py-6 text-xl font-bold active:bg-gray-50"
        >
          {num}
        </button>
      ))}
      <button 
        onClick={() => setAmount(prev => Number(`${prev}00`))} 
        className="bg-white py-6 text-xl font-bold active:bg-gray-50"
      >
        00
      </button>
      <button 
        onClick={() => setAmount(prev => Number(`${prev}0`))} 
        className="bg-white py-6 text-xl font-bold active:bg-gray-50"
      >
        0
      </button>
      <button 
        onClick={() => setAmount(prev => Math.floor(prev / 10))} 
        className="bg-white py-6 text-xl font-bold active:bg-gray-50 text-gray-500"
      >
        ←
      </button>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Styles for scanning animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: #2dd4bf;
          box-shadow: 0 0 10px #2dd4bf, 0 0 20px #2dd4bf;
          animation: scan 2s linear infinite;
        }
      `}</style>

      {/* Header & Tab */}
      <div className={`absolute top-0 w-full z-30 ${mode === 'SCAN' && step === 'SCAN' ? 'text-white' : 'text-gray-800 bg-white shadow-sm'}`}>
        <header className="p-4 flex justify-between items-center">
          <button onClick={() => step === 'SCAN' ? navigate(-1) : setStep('SCAN')} className={`p-2 rounded-full ${mode === 'SCAN' && step === 'SCAN' ? 'bg-black/30 backdrop-blur-sm' : ''}`}>
            <ChevronLeft size={24} />
          </button>
          <div className={`flex bg-black/10 rounded-full p-1 backdrop-blur-md ${mode !== 'SCAN' ? 'bg-gray-100' : ''}`}>
             <button 
               onClick={() => { setMode('SCAN'); setStep('SCAN'); }}
               className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${mode === 'SCAN' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'}`}
             >
               스캔하기
             </button>
             <button 
               onClick={() => setMode('MY_QR')}
               className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${mode === 'MY_QR' ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500'}`}
             >
               내 QR
             </button>
          </div>
          <div className="w-10"></div>
        </header>
      </div>

      {/* SCAN MODE */}
      {mode === 'SCAN' && (
        <>
          {step === 'SCAN' && (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="absolute inset-0 w-full h-full object-cover"
                onClick={handleSimulatedScan}
              />
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="relative w-64 h-64 border-2 border-teal-400 rounded-3xl bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="scan-line"></div>
                    <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-teal-500 -translate-x-1 -translate-y-1 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-teal-500 translate-x-1 -translate-y-1 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-teal-500 -translate-x-1 translate-y-1 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-teal-500 translate-x-1 translate-y-1 rounded-br-lg"></div>
                    
                    <p className="absolute -bottom-10 left-0 w-full text-center text-white text-sm font-medium drop-shadow">
                      화면을 터치하여 스캔 테스트
                    </p>
                </div>
              </div>
              <div className="absolute bottom-0 w-full p-8 flex justify-around items-center z-20 pb-20">
                <button className="flex flex-col items-center gap-2 text-white opacity-80 hover:opacity-100">
                   <div className="w-12 h-12 bg-gray-800/80 rounded-full flex items-center justify-center">
                     <Image size={24} />
                   </div>
                   <span className="text-xs">앨범</span>
                </button>
                <button 
                  onClick={() => setIsFlashOn(!isFlashOn)}
                  className={`flex flex-col items-center gap-2 text-white opacity-80 hover:opacity-100 ${isFlashOn ? 'text-yellow-300' : ''}`}
                >
                   <div className={`w-12 h-12 bg-gray-800/80 rounded-full flex items-center justify-center ${isFlashOn ? 'ring-2 ring-yellow-300' : ''}`}>
                     <Flashlight size={24} className={isFlashOn ? 'fill-yellow-300 text-yellow-300' : ''} />
                   </div>
                   <span className="text-xs">조명</span>
                </button>
              </div>
            </>
          )}

          {step === 'AMOUNT' && (
            <div className="flex-1 flex flex-col pt-20 bg-white">
              <div className="px-6 pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{merchantName}</h2>
                <p className="text-gray-500 text-sm">결제할 금액을 입력해주세요.</p>
              </div>
              
              <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-4xl font-bold text-teal-600 flex items-center gap-1">
                  {amount > 0 ? amount.toLocaleString() : <span className="text-gray-300">0</span>}
                  <span className="text-2xl text-gray-400">원</span>
                </div>
              </div>

              <div className="p-4">
                <button 
                  onClick={() => setStep('CONFIRM')}
                  disabled={amount === 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${amount > 0 ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}
                >
                  다음
                </button>
              </div>
              <InputKeypad />
            </div>
          )}

          {step === 'CONFIRM' && (
            <div className="flex-1 flex flex-col pt-20 bg-gray-50 p-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="text-center text-gray-500 text-sm mb-4">결제정보 확인</h3>
                <div className="text-center mb-6">
                  <p className="text-lg font-bold text-gray-800 mb-1">{merchantName}</p>
                  <p className="text-3xl font-bold text-teal-600">{amount.toLocaleString()}원</p>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-dashed border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">보유 잔액</span>
                    <span className="font-bold text-gray-800">{userState.balance.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-500">예상 캐시백 (12%)</span>
                    <span className="font-bold text-orange-500">+{(amount * 0.12).toLocaleString()}원</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handlePayment}
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg"
              >
                결제하기
              </button>
            </div>
          )}
        </>
      )}

      {/* MY QR MODE */}
      {mode === 'MY_QR' && (
        <div className="flex-1 bg-teal-600 flex flex-col items-center justify-center p-6 pt-20">
           <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-sm text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-100 p-2 rounded-full border-4 border-teal-600">
                 <QrCode size={32} className="text-teal-600" />
              </div>

              <div className="mt-6 mb-4">
                 <h2 className="text-xl font-bold text-gray-800">내 QR 결제 코드</h2>
                 <p className="text-xs text-gray-500 mt-1">가맹점 리더기에 스캔해주세요.</p>
              </div>

              <div className="aspect-square bg-gray-900 rounded-xl mb-6 p-4 flex items-center justify-center relative overflow-hidden group">
                 {/* CSS QR Simulation */}
                 <div className="w-full h-full bg-white opacity-90" style={{ 
                    backgroundImage: 'radial-gradient(black 40%, transparent 40%)', 
                    backgroundSize: '15px 15px' 
                 }}></div>
                 {/* Corner markers */}
                 <div className="absolute top-4 left-4 w-12 h-12 border-4 border-black bg-white">
                    <div className="w-6 h-6 bg-black m-1"></div>
                 </div>
                 <div className="absolute top-4 right-4 w-12 h-12 border-4 border-black bg-white">
                    <div className="w-6 h-6 bg-black m-1"></div>
                 </div>
                 <div className="absolute bottom-4 left-4 w-12 h-12 border-4 border-black bg-white">
                    <div className="w-6 h-6 bg-black m-1"></div>
                 </div>
              </div>

              <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3">
                 <span className="font-mono text-gray-600 transition-all">{qrCode}</span>
                 <div className="flex items-center gap-2 text-teal-600 font-bold">
                    <span className="text-xs">남은시간 {formatTime(qrTimer)}</span>
                    <RotateCw size={14} className="cursor-pointer" onClick={regenerateQr} />
                 </div>
              </div>
           </div>
           
           <p className="text-teal-100 text-sm mt-6 text-center opacity-80">
              안전한 결제를 위해 QR코드는<br/>3분마다 갱신됩니다.
           </p>
        </div>
      )}
    </div>
  );
};

export default QrPayment;