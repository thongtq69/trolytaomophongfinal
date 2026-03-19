import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import ResultFound from './components/ResultFound';
import ResultGenerated from './components/ResultGenerated';
import LibraryView from './components/LibraryView';
import GuideModal from './components/GuideModal';
import Landing from './components/Landing';
import { Simulation, SearchParams, SearchStatus, AIResult } from './types';
import { simulationDatabase } from './services/simulationData';
import { generateSimulationContent } from './services/geminiService';
import { Loader2, AlertCircle, Database, SearchX, ArrowRight, Sparkles } from 'lucide-react';

import SettingsModal from './components/SettingsModal';
import { useSettings } from './contexts/SettingsContext';

type ViewState = 'landing' | 'search' | 'library';

function App() {
  const { apiKey, selectedModel, setIsSettingsOpen } = useSettings();
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [dbResults, setDbResults] = useState<Simulation[]>([]);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // 1. Search in Existing Database
  const handleSearchDB = (params: SearchParams) => {
    setSearchParams(params);
    setStatus('searching');
    setDbResults([]);
    setAiResult(null);

    setTimeout(() => {
      const normalizedQuery = params.topic.toLowerCase().trim();
      const matches = simulationDatabase.filter(sim => {
        if (sim.subject !== params.subject) return false;
        const topicMatch = sim.topic.some(t => t.includes(normalizedQuery) || normalizedQuery.includes(t)) || sim.title.toLowerCase().includes(normalizedQuery);
        return topicMatch;
      });

      if (matches.length > 0) {
        setDbResults(matches);
        setStatus('found');
      } else {
        setStatus('no-result');
      }
    }, 600);
  };

  // 2. Create with AI
  const handleCreateAI = async (params: SearchParams) => {
    setSearchParams(params);
    setStatus('generating');
    setDbResults([]);
    setAiResult(null);

    try {
      if (!apiKey) {
        setIsSettingsOpen(true);
        setStatus('idle');
        return;
      }
      const result = await generateSimulationContent(params, apiKey, selectedModel);
      setAiResult(result);
      setStatus('generated');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="flex-grow max-w-[1600px] mx-auto w-full px-4 md:px-8 py-8">

        {/* Breadcrumb / Top Info (Hidden on mobile) */}
        {currentView !== 'landing' && (
          <div className="hidden md:flex items-center gap-3 text-sm mb-10 px-4 py-3 bg-white border border-sky-100 rounded-2xl shadow-sm">
            <button onClick={() => setCurrentView('landing')} className="text-slate-500 font-bold hover:text-sky-600 transition-colors">Trang chủ</button>
            <span className="text-slate-300 font-bold">/</span>
            <span className="font-black text-sky-600 uppercase tracking-tight">
              {currentView === 'search' ? 'Tìm kiếm & Tạo mới' : 'Thư viện tài nguyên'}
            </span>
          </div>
        )}

        {/* --- VIEW: LANDING --- */}
        {currentView === 'landing' && (
          <Landing onViewChange={setCurrentView} />
        )}

        {/* --- VIEW: LIBRARY --- */}
        {currentView === 'library' && (
          <LibraryView />
        )}

        {/* --- VIEW: SEARCH & GENERATE --- */}
        {currentView === 'search' && (
          <>
            <SearchForm
              isLoading={status === 'searching' || status === 'generating'}
              onSearchDB={handleSearchDB}
              onCreateAI={handleCreateAI}
            />

            {/* RESULT AREA */}
            <div className="mt-12 transition-all max-w-[1200px] mx-auto">

              {/* STATE: Searching DB */}
              {status === 'searching' && (
                <div className="text-center py-12">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-teal-50 w-20 h-20 mx-auto flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 border-4 border-teal-50 rounded-2xl"></div>
                    <div className="absolute inset-0 border-4 border-[#0D9488] border-t-transparent rounded-2xl animate-spin"></div>
                    <Database size={32} className="text-[#0D9488]" />
                  </div>
                  <p className="text-slate-600 font-bold text-lg">Đang truy xuất dữ liệu kho...</p>
                  <p className="text-slate-400 text-sm mt-1">Đang tìm kiếm trong {simulationDatabase.length} mô phỏng có sẵn</p>
                </div>
              )}

              {/* STATE: Generating AI */}
              {status === 'generating' && (
                <div className="fixed inset-0 z-[100] bg-teal-900/40 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="bg-white p-10 rounded-3xl shadow-2xl border border-teal-50 flex flex-col items-center gap-6 max-w-sm text-center">
                    <div className="relative">
                      <div className="size-24 border-4 border-sky-50 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="absolute inset-0 flex items-center justify-center text-sky-600">
                        <Sparkles size={32} />
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Đang khởi tạo mô phỏng...</h2>
                      <p className="text-slate-500 text-sm leading-relaxed">AI đang viết mã HTML, Canvas logic và thiết kế giao diện cho chủ đề <strong>"{searchParams?.topic}"</strong></p>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mt-4">
                      <div className="bg-sky-600 h-full w-[65%] rounded-full shadow-[0_0_15px_rgba(2,132,199,0.4)] animate-[loading_2s_ease-in-out_infinite]"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* STATE: Error */}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-700 shadow-sm max-w-xl mx-auto">
                  <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                  <h3 className="font-bold text-xl mb-2">Đã xảy ra lỗi kết nối</h3>
                  <p className="text-red-600/70 mb-6 text-sm">Không thể kết nối với máy chủ AI. Vui lòng kiểm tra đường truyền.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-white border border-red-200 text-red-600 font-bold py-3 px-8 rounded-xl hover:bg-red-50 transition"
                  >
                    Quay lại
                  </button>
                </div>
              )}

              {/* STATE: No Result Found */}
              {status === 'no-result' && (
                <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-teal-200 p-12">
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <SearchX size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy trong thư viện</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Chủ đề <strong>"{searchParams?.topic}"</strong> chưa có sẵn. Hãy sử dụng AI để tạo mô phỏng mới ngay lập tức.
                  </p>
                  <button
                    onClick={() => handleCreateAI(searchParams!)}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-black py-5 px-10 rounded-2xl shadow-2xl shadow-sky-600/30 transition transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 mx-auto uppercase tracking-tight text-sm"
                  >
                    <Sparkles size={22} className="text-amber-300" />
                    <span>Dùng AI tạo mô phỏng ngay</span>
                    <ArrowRight size={22} />
                  </button>
                </div>
              )}

              {/* STATE: Found DB Results */}
              {status === 'found' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2 px-2">
                    <div className="flex items-center gap-3">
                      <div className="size-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Kết quả từ thư viện</h3>
                    </div>
                    <span className="bg-white border border-sky-100 text-sky-600 text-[10px] font-black px-4 py-1.5 rounded-full shadow-sm">{dbResults.length} KẾT QUẢ</span>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {dbResults.map(sim => (
                      <ResultFound key={sim.id} simulation={sim} />
                    ))}
                  </div>
                </div>
              )}

              {/* STATE: AI Generated Result */}
              {status === 'generated' && aiResult && (
                <ResultGenerated data={aiResult} topic={searchParams?.topic || 'Custom Simulation'} />
              )}
            </div>
          </>
        )}

      </main>

      <Footer />

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <SettingsModal />

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default App;