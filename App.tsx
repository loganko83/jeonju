import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { UserState, AppNotification } from './types';
import { MOCK_NOTIFICATIONS } from './constants';

// Components
import Home from './pages/Home';
import Charge from './pages/Charge';
import MapPage from './pages/MapPage';
import History from './pages/History';
import Gift from './pages/Gift';
import MenuPage from './pages/MenuPage';
import Support from './pages/Support';

// New Pages
import BalanceStatus from './pages/BalanceStatus';
import QrPayment from './pages/QrPayment';
import GiftBox from './pages/GiftBox';
import GiftSettings from './pages/GiftSettings';
import GiftDetail from './pages/GiftDetail';
import Refund from './pages/Refund';
import AutoCharge from './pages/AutoCharge';
import AccountList from './pages/AccountList';
import CardList from './pages/CardList';
import NoticeList from './pages/NoticeList';
import Guide from './pages/Guide';
import SupportCenter from './pages/SupportCenter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotificationCenter from './pages/NotificationCenter';

// Global State
interface AppContextType {
  userState: UserState;
  notifications: AppNotification[];
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  charge: (amount: number) => void;
  pay: (amount: number) => boolean;
  receiveGift: (amount: number) => void;
  login: (username: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

// Scroll To Top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { userState } = useAppContext();
  if (!userState.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  // Initialize from localStorage if available (mock persistence)
  const [userState, setUserState] = useState<UserState>({
    isLoggedIn: false,
    username: '',
    balance: 636698,
    cashbackBalance: 70000,
    cashbackRate: 0.12, // 12%
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  const login = (username: string) => {
    setUserState(prev => ({ ...prev, isLoggedIn: true, username }));
  };

  const logout = () => {
    setUserState(prev => ({ ...prev, isLoggedIn: false, username: '' }));
  };

  const charge = (amount: number) => {
    setUserState(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  const pay = (amount: number) => {
    if (userState.balance < amount) return false;
    const earned = amount * userState.cashbackRate;
    setUserState(prev => ({
      ...prev,
      balance: prev.balance - amount,
      cashbackBalance: prev.cashbackBalance + earned
    }));
    return true;
  };

  const receiveGift = (amount: number) => {
    setUserState(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider value={{ userState, notifications, markAsRead, removeNotification, charge, pay, receiveGift, login, logout }}>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/charge" element={<Charge />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/gift" element={<Gift />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/support" element={<Support />} />
                  
                  {/* Sub Routes */}
                  <Route path="/balance" element={<BalanceStatus />} />
                  <Route path="/qr" element={<QrPayment />} />
                  <Route path="/gift-box" element={<GiftBox />} />
                  <Route path="/gift/settings" element={<GiftSettings />} />
                  <Route path="/gift/:id" element={<GiftDetail />} />
                  <Route path="/refund" element={<Refund />} />
                  <Route path="/auto-charge" element={<AutoCharge />} />
                  <Route path="/accounts" element={<AccountList />} />
                  <Route path="/cards" element={<CardList />} />
                  <Route path="/notices" element={<NoticeList />} />
                  <Route path="/guide" element={<Guide />} />
                  <Route path="/faq" element={<SupportCenter />} />
                  <Route path="/notifications" element={<NotificationCenter />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;