import React, { useState, useEffect } from 'react';
import { Microscope, Bell, User, Settings, Eye, Menu, X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface HeaderProps {
  onOpenGuide: () => void;
  currentView: 'landing' | 'search' | 'library' | 'about' | 'blog';
  onViewChange: (view: 'landing' | 'search' | 'library' | 'about' | 'blog') => void;
}

const VISIT_COUNT_KEY = 'app_visit_count';

const NAV_ITEMS = [
  { key: 'landing', label: 'Trang chủ' },
  { key: 'library', label: 'Thư viện' },
  { key: 'search', label: 'Tạo mô phỏng' },
  { key: 'about', label: 'Về chúng tôi' },
  { key: 'blog', label: 'Blog' },
] as const;

const Header: React.FC<HeaderProps> = ({ onOpenGuide, currentView, onViewChange }) => {
  const { apiKey, setIsSettingsOpen } = useSettings();
  const [visitCount, setVisitCount] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Lấy số lượt truy cập từ localStorage
    const storedCount = localStorage.getItem(VISIT_COUNT_KEY);
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0;

    // Tăng số lượt truy cập
    const newCount = currentCount + 1;
    localStorage.setItem(VISIT_COUNT_KEY, newCount.toString());
    setVisitCount(newCount);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGuideOpen = () => {
    setIsMobileMenuOpen(false);
    onOpenGuide();
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-xl border-b border-sky-100 px-4 md:px-10 py-3 transition-all">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-3">
        <div
          className="flex min-w-0 items-center gap-3 cursor-pointer group"
          onClick={() => onViewChange('landing')}
        >
          <div className="bg-sky-600 font-bold text-white p-2.5 rounded-2xl flex items-center justify-center shadow-xl shadow-sky-600/20 group-hover:bg-sky-700 transition-all group-hover:scale-110">
            <Microscope size={24} strokeWidth={2.5} />
          </div>
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate text-lg sm:text-xl font-black leading-none tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">TRỢ LÝ MÔ PHỎNG</h1>
            <p className="text-[11px] font-bold text-sky-700/81 uppercase tracking-[0.14em] hidden sm:block">PHÁT TRIỂN BỞI THẦY NGUYỄN MINH HIẾU</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => onViewChange(item.key)}
              className={`text-sm font-bold pb-1 transition-all ${currentView === item.key ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-500 hover:text-sky-600'}`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleGuideOpen}
            className="text-slate-500 text-sm font-bold hover:text-sky-600 transition-colors"
          >
            Hướng dẫn
          </button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-100 rounded-2xl shadow-sm">
            <Eye size={18} className="text-sky-600" />
            <span className="text-sm font-black text-sky-700">
              {visitCount.toLocaleString('vi-VN')}
            </span>
            <span className="text-xs text-sky-600/60 font-medium">truy cập</span>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`flex items-center justify-center p-2.5 rounded-xl transition-all ${!apiKey ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-600 hover:scale-110'}`}
          >
            <Settings size={22} />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="flex lg:hidden items-center justify-center p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition-all"
            aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button className="hidden sm:flex p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition-all hover:scale-110">
            <Bell size={22} />
          </button>
          <div className="hidden sm:flex size-11 rounded-2xl border-2 border-sky-100 bg-sky-50 items-center justify-center text-sky-600 shadow-sm cursor-pointer hover:border-sky-300 transition-all">
            <User size={22} />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden max-w-7xl w-full mx-auto mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="rounded-3xl border border-sky-100 bg-white/95 p-3 shadow-2xl shadow-sky-100/60 backdrop-blur-xl">
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.key}
                  onClick={() => onViewChange(item.key)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-black transition-all ${currentView === item.key ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200' : 'text-slate-600 hover:bg-slate-50 hover:text-sky-600'}`}
                >
                  <span>{item.label}</span>
                  {currentView === item.key && <span className="text-[10px] uppercase tracking-[0.2em]">Đang xem</span>}
                </button>
              ))}
              <button
                onClick={handleGuideOpen}
                className="rounded-2xl px-4 py-3 text-left text-sm font-black text-slate-600 hover:bg-slate-50 hover:text-sky-600 transition-all"
              >
                Hướng dẫn
              </button>
            </nav>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 sm:hidden">
              <div className="flex items-center gap-2 text-sky-700">
                <Eye size={16} />
                <span className="text-sm font-black">{visitCount.toLocaleString('vi-VN')}</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">lượt truy cập</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
