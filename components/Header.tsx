import React, { useState, useEffect } from 'react';
import { Microscope, Bell, User, Settings, Eye } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface HeaderProps {
  onOpenGuide: () => void;
  currentView: 'landing' | 'search' | 'library';
  onViewChange: (view: 'landing' | 'search' | 'library') => void;
}

const BASE_VISIT_COUNT = 1326;
const VISIT_COUNT_KEY = 'app_visit_count';

const Header: React.FC<HeaderProps> = ({ onOpenGuide, currentView, onViewChange }) => {
  const { apiKey, setIsSettingsOpen } = useSettings();
  const [visitCount, setVisitCount] = useState<number>(0);

  useEffect(() => {
    // Lấy số lượt truy cập từ localStorage
    const storedCount = localStorage.getItem(VISIT_COUNT_KEY);
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0;

    // Tăng số lượt truy cập
    const newCount = currentCount + 1;
    localStorage.setItem(VISIT_COUNT_KEY, newCount.toString());
    setVisitCount(newCount);
  }, []);

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/70 backdrop-blur-xl border-b border-sky-100 px-4 md:px-10 py-3 transition-all">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onViewChange('landing')}
        >
          <div className="bg-sky-600 font-bold text-white p-2.5 rounded-2xl flex items-center justify-center shadow-xl shadow-sky-600/20 group-hover:bg-sky-700 transition-all group-hover:scale-110">
            <Microscope size={24} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black leading-none tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">TRỢ LÝ MÔ PHỎNG</h1>
            <p className="text-[11px] font-bold text-sky-700/81 uppercase tracking-[0.14em] hidden sm:block">PHÁT TRIỂN BỞI THẦY NGUYỄN MINH HIẾU</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <button
            onClick={() => onViewChange('landing')}
            className={`text-sm font-bold pb-1 transition-all ${currentView === 'landing' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-500 hover:text-sky-600'}`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => onViewChange('library')}
            className={`text-sm font-bold pb-1 transition-all ${currentView === 'library' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-500 hover:text-sky-600'}`}
          >
            Thư viện
          </button>
          <button
            onClick={() => onViewChange('search')}
            className={`text-sm font-bold pb-1 transition-all ${currentView === 'search' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-500 hover:text-sky-600'}`}
          >
            Tạo mô phỏng
          </button>
          <button
            onClick={onOpenGuide}
            className="text-slate-500 text-sm font-bold hover:text-sky-600 transition-colors"
          >
            Hướng dẫn
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-100 rounded-2xl shadow-sm">
            <Eye size={18} className="text-sky-600" />
            <span className="text-sm font-black text-sky-700">
              {(BASE_VISIT_COUNT + visitCount).toLocaleString('vi-VN')}
            </span>
            <span className="text-xs text-sky-600/60 font-medium">truy cập</span>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`flex items-center justify-center p-2.5 rounded-xl transition-all ${!apiKey ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-600 hover:scale-110'}`}
          >
            <Settings size={22} />
          </button>

          <button className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition-all hover:scale-110">
            <Bell size={22} />
          </button>
          <div className="size-11 rounded-2xl border-2 border-sky-100 bg-sky-50 flex items-center justify-center text-sky-600 shadow-sm cursor-pointer hover:border-sky-300 transition-all">
            <User size={22} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
