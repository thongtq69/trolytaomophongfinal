import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import ResultFound from './components/ResultFound';
import ResultGenerated from './components/ResultGenerated';
import LibraryView from './components/LibraryView';
import GuideModal from './components/GuideModal';
import Landing from './components/Landing';
import About from './components/About';
import Blog from './components/Blog';
import { Simulation, SearchParams, SearchStatus, AIResult } from './types';
import { simulationDatabase } from './services/simulationData';
import { generateSimulationContent } from './services/geminiService';
import { Loader2, AlertCircle, Database, SearchX, ArrowRight, Sparkles } from 'lucide-react';

import SettingsModal from './components/SettingsModal';
import { useSettings } from './contexts/SettingsContext';

type ViewState = 'landing' | 'search' | 'library' | 'about' | 'blog';

function App() {
  const { apiKey, selectedModel, setIsSettingsOpen } = useSettings();
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [dbResults, setDbResults] = useState<Simulation[]>([]);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleGoToSearch = () => {
    setCurrentView('search');
    setStatus('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    }, 1000);
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
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden">
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="flex-1 w-full">
        <div className={currentView === 'landing' ? "w-full" : "section-container"}>
          
          {/* Breadcrumb Section */}
          {currentView !== 'landing' && (
            <div className="animate-blur-in flex items-center gap-3 text-xs mb-12 px-6 py-4 bg-white border border-sky-100 rounded-2xl shadow-sm w-fit group">
              <button 
                onClick={() => { setCurrentView('landing'); setStatus('idle'); }} 
                className="text-slate-400 font-black hover:text-sky-600 transition-colors uppercase tracking-widest"
              >
                Trang chủ
              </button>
              <div className="size-1 rounded-full bg-slate-200"></div>
              <span className="font-black text-sky-600 uppercase tracking-widest">
                {currentView === 'search' ? 'Lớp học AI' : currentView === 'library' ? 'Thư viện tài nguyên' : currentView === 'about' ? 'Về chúng tôi' : 'Blog'}
              </span>
            </div>
          )}

          {/* VIEW: LANDING */}
          {currentView === 'landing' && (
            <div className="animate-blur-in">
              <Landing onViewChange={setCurrentView} />
            </div>
          )}

          {/* VIEW: LIBRARY */}
          {currentView === 'library' && (
            <div className="animate-blur-in">
              <LibraryView />
            </div>
          )}

          {/* VIEW: ABOUT */}
          {currentView === 'about' && (
            <div className="animate-blur-in">
              <About />
            </div>
          )}

          {/* VIEW: BLOG */}
          {currentView === 'blog' && (
            <div className="animate-blur-in">
              <Blog />
            </div>
          )}

          {/* VIEW: SEARCH & GENERATE */}
          {currentView === 'search' && (
            <div className="animate-slide-up max-w-5xl mx-auto space-y-12">
              <SearchForm
                isLoading={status === 'searching' || status === 'generating'}
                onSearchDB={handleSearchDB}
                onCreateAI={handleCreateAI}
              />

              {/* SEARCH RESULTS / AI GENERATION STATES */}
              {status !== 'idle' && (
                <div className="glass-card rounded-[40px] p-10 md:p-16 relative overflow-hidden">
                   {/* Background Decorative */}
                   <div className="absolute top-0 right-0 w-80 h-80 bg-sky-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60" />
                   
                   {/* ─── LOADING: SEARCHING ─── */}
                   {status === 'searching' && (
                     <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="relative mb-10">
                          <div className="absolute inset-0 bg-sky-200 rounded-full blur-2xl animate-pulse"></div>
                          <div className="bg-white p-8 rounded-3xl shadow-xl relative z-10 animate-float">
                             <Database className="text-sky-600" size={56} />
                          </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tighter">Đang tìm trong kho...</h3>
                        <p className="text-slate-500 font-bold max-w-xs mx-auto">Chúng tôi đang quét {simulationDatabase.length} tài nguyên để tìm nội dung phù hợp nhất.</p>
                     </div>
                   )}

                   {/* ─── LOADING: GENERATING ─── */}
                   {status === 'generating' && (
                     <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95 duration-500">
                        <div className="relative mb-12">
                          <div className="absolute inset-0 bg-indigo-200 rounded-full blur-3xl animate-pulse"></div>
                          <div className="bg-white p-10 rounded-full shadow-2xl relative z-10">
                             <Sparkles className="text-indigo-600 animate-bounce" size={64} />
                          </div>
                        </div>
                        <h2 className="text-4xl font-black bg-gradient-to-r from-sky-600 to-indigo-700 bg-clip-text text-transparent uppercase tracking-tighter mb-4">AI Đang sáng tạo...</h2>
                        <p className="text-slate-500 font-black max-w-md mx-auto leading-relaxed mb-12">
                          Vui lòng đợi trong giây lát, trợ lý AI đang lập trình mã nguồn HTML5 tương tác cho chủ đề <span className="text-sky-600 underline">"{searchParams?.topic}"</span>.
                        </p>
                        
                        <div className="w-full max-w-sm bg-slate-100 h-4 rounded-full overflow-hidden border-2 border-white shadow-inner relative">
                          <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 h-full rounded-full animate-progress" />
                        </div>
                     </div>
                   )}

                   {/* ─── ERROR ─── */}
                   {status === 'error' && (
                     <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in slide-in-from-top-4">
                        <div className="bg-rose-50 p-8 rounded-full text-rose-500 mb-8 border-4 border-white shadow-xl">
                          <AlertCircle size={64} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tighter">Có lỗi xảy ra</h3>
                        <p className="text-slate-500 font-bold mb-10 max-w-sm">Rất tiếc, AI không thể phản hồi vào lúc này. Vui lòng kiểm tra lại Key hoặc kết nối mạng.</p>
                        <button 
                          onClick={() => setStatus('idle')}
                          className="bg-slate-900 text-white font-black py-4 px-12 rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs shadow-xl"
                        >
                          Quay lại thử lại
                        </button>
                     </div>
                   )}

                   {/* ─── NO RESULT found in DB ─── */}
                   {status === 'no-result' && (
                     <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95">
                        <div className="bg-amber-50 p-8 rounded-full text-amber-500 mb-8 border-4 border-white shadow-xl">
                          <SearchX size={64} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tighter">Trống kho dữ liệu</h3>
                        <p className="text-slate-500 font-bold max-w-md mb-12">Chúng tôi chưa có mô phỏng này trong thư viện. Sử dụng sức mạnh AI để tự tay tạo mới ngay bây giờ!</p>
                        <button 
                          onClick={() => handleCreateAI(searchParams!)}
                          className="group bg-sky-600 hover:bg-sky-700 text-white font-black py-5 px-12 rounded-[24px] shadow-2xl shadow-sky-600/40 transition-all active:scale-95 flex items-center gap-4 uppercase tracking-widest text-xs"
                        >
                          <Sparkles size={24} className="group-hover:rotate-12 transition-transform text-amber-300" />
                          Dùng AI tạo ngay
                          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                     </div>
                   )}

                   {/* ─── FOUND: Result from DB ─── */}
                   {status === 'found' && (
                     <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex items-center gap-6 mb-12">
                           <div className="h-[1px] flex-1 bg-sky-100"></div>
                           <div className="flex items-center gap-2">
                              <Database size={16} className="text-sky-400" />
                              <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em] whitespace-nowrap">Kết quả từ thư viện</h4>
                           </div>
                           <div className="h-[1px] flex-1 bg-sky-100"></div>
                        </div>
                        <div className="space-y-8">
                          {dbResults.map(sim => (
                            <ResultFound key={sim.id} simulation={sim} />
                          ))}
                        </div>
                     </div>
                   )}

                   {/* ─── SUCCESS: AI Result ─── */}
                   {status === 'generated' && aiResult && searchParams && (
                     <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <ResultGenerated data={aiResult} topic={searchParams.topic} />
                     </div>
                   )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer onGoToSearch={handleGoToSearch} />

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <SettingsModal />

      <style>{`
        @keyframes progress {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 10s linear;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
