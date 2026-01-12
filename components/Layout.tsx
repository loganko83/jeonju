import React from 'react';
import { Home, MapPin, Menu, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const activeClass = "text-teal-600 font-bold";
  const inactiveClass = "text-gray-400";

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl flex flex-col">
      <main className="flex-1 pb-20 overflow-y-auto no-scrollbar">
        {children}
      </main>

      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around py-3 px-2 z-50 rounded-t-2xl shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        <Link to="/" className={`flex flex-col items-center text-xs gap-1 ${location.pathname === '/' ? activeClass : inactiveClass}`}>
          <Home size={24} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
          <span>홈</span>
        </Link>
        <Link to="/map" className={`flex flex-col items-center text-xs gap-1 ${location.pathname === '/map' ? activeClass : inactiveClass}`}>
          <MapPin size={24} strokeWidth={location.pathname === '/map' ? 2.5 : 2} />
          <span>가맹점</span>
        </Link>
        <Link to="/support" className={`flex flex-col items-center text-xs gap-1 ${location.pathname === '/support' ? activeClass : inactiveClass}`}>
          <HelpCircle size={24} strokeWidth={location.pathname === '/support' ? 2.5 : 2} />
          <span>AI상담</span>
        </Link>
        <Link to="/menu" className={`flex flex-col items-center text-xs gap-1 ${location.pathname === '/menu' ? activeClass : inactiveClass}`}>
          <Menu size={24} strokeWidth={location.pathname === '/menu' ? 2.5 : 2} />
          <span>전체</span>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;