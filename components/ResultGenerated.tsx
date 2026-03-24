import React, { useState } from 'react';
import { Sparkles, Download, Code, Check, FileText, HelpCircle, Play, Rocket } from 'lucide-react';
import { AIResult } from '../types';

interface ResultGeneratedProps {
  data: AIResult;
  topic: string;
}

const ResultGenerated: React.FC<ResultGeneratedProps> = ({ data, topic }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'questions' | 'guide' | 'code'>('preview');
  
  const handleDownload = () => {
    const blob = new Blob([data.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mo-phong-${topic.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Redesigned Success Banner */}
      <div className="relative group overflow-hidden rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]">
        {/* Multilayered Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af] via-[#0369a1] to-[#0d9488] transition-all duration-700 group-hover:scale-110"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Content Wrapper */}
        <div className="relative z-10 px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-5 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                <Sparkles size={40} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" strokeWidth={2.5} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h2 className="font-black text-3xl md:text-4xl tracking-tight text-white uppercase drop-shadow-md">
                  Mô phỏng AI đã sẵn sàng!
                </h2>
                <div className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-emerald-500/40 animate-bounce-slow uppercase tracking-tighter self-start mt-1">
                  NEW
                </div>
              </div>
              <p className="text-sky-100 font-bold text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed">
                Hệ thống đã khởi tạo thành công mô hình học tập tương tác chủ đề <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 font-black italic">"{topic}"</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto min-w-[180px] group/btn bg-white/10 backdrop-blur-xl border-2 border-white/20 px-8 py-5 rounded-2xl text-[13px] font-black text-white flex items-center justify-center gap-3 hover:bg-white/20 hover:border-white/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 uppercase tracking-widest shadow-2xl"
            >
              <div className="p-1.5 bg-white/20 rounded-lg group-hover/btn:bg-white/40 transition-colors">
                <Download size={22} />
              </div>
              Tải HTML
            </button>
            
            <button 
              onClick={handleCopy}
              className={`
                w-full sm:w-auto min-w-[200px] group/btn relative overflow-hidden px-8 py-5 rounded-2xl text-[13px] font-black flex items-center justify-center gap-3 transition-all duration-500 uppercase tracking-widest shadow-2xl border-2 border-transparent hover:-translate-y-1 active:scale-95
                ${copied 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 border-amber-300 hover:shadow-orange-500/40'
                }
              `}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${copied ? 'bg-white/20' : 'bg-white/40'}`}>
                {copied ? <Check size={22} strokeWidth={3} /> : <Code size={22} />}
              </div>
              <span>{copied ? 'Đã sao chép' : 'Copy Source'}</span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Preview */}
        <div className="lg:col-span-8">
           <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative group">
              {activeTab === 'preview' ? (
                <div className="aspect-video w-full h-[500px] relative">
                  <iframe 
                    title="Generated Simulation"
                    srcDoc={data.html}
                    className="w-full h-full border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-modals"
                  />
                  <div className="absolute bottom-4 left-4">
                     <div className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-white/10 shadow-lg">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        INTERACTIVE READY
                     </div>
                  </div>
                </div>
              ) : activeTab === 'code' ? (
                 <div className="h-[500px] bg-[#1e1e1e] overflow-auto p-4 custom-scrollbar">
                   <pre className="text-[#d4d4d4] font-mono text-xs whitespace-pre-wrap">{data.html}</pre>
                 </div>
              ) : (
                <div className="h-[500px] bg-white overflow-auto p-8 custom-scrollbar">
                   <div className="prose prose-teal max-w-none">
                      {activeTab === 'questions' ? (
                        <div className="whitespace-pre-wrap font-medium text-slate-700">{data.questions}</div>
                      ) : (
                        <div className="whitespace-pre-wrap font-medium text-slate-700">{data.guide}</div>
                      )}
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* Right: Controls & Info */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Navigation Tabs */}
          <div className="bg-white rounded-3xl p-5 shadow-2xl shadow-sky-900/5 border border-sky-50 flex flex-col gap-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-2">Điều khiển</h3>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-tight ${activeTab === 'preview' ? 'bg-sky-600 text-white shadow-xl shadow-sky-600/30 active:scale-95' : 'text-slate-500 hover:bg-slate-50 hover:text-sky-600'}`}
            >
              <Play size={18} fill={activeTab === 'preview' ? 'currentColor' : 'none'} /> Mô phỏng
            </button>
            <button 
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-tight ${activeTab === 'questions' ? 'bg-sky-600 text-white shadow-xl shadow-sky-600/30 active:scale-95' : 'text-slate-500 hover:bg-slate-50 hover:text-sky-600'}`}
            >
              <HelpCircle size={18} /> Câu hỏi
            </button>
            <button 
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-tight ${activeTab === 'guide' ? 'bg-sky-600 text-white shadow-xl shadow-sky-600/30 active:scale-95' : 'text-slate-500 hover:bg-slate-50 hover:text-sky-600'}`}
            >
              <FileText size={18} /> Hướng dẫn
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-black text-sm uppercase tracking-tight ${activeTab === 'code' ? 'bg-sky-600 text-white shadow-xl shadow-sky-600/30 active:scale-95' : 'text-slate-500 hover:bg-slate-50 hover:text-sky-600'}`}
            >
              <Code size={18} /> Source Code
            </button>
          </div>

          {/* AI Analysis Box */}
          <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-sky-900/5 border border-sky-50 flex-1 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-2xl group-hover:bg-sky-100 transition-colors pointer-events-none" />
             <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tight relative">
               <span className="bg-sky-100 text-sky-600 p-2 rounded-xl border border-sky-100"><Rocket size={18}/></span>
               AI Analysis
             </h3>
             <div className="text-xs text-slate-500 space-y-4 leading-relaxed font-medium relative">
                <p>Mô phỏng này được tạo tự động dựa trên các tham số vật lý/hóa học tiêu chuẩn và thuật toán chính xác.</p>
                <div className="p-4 bg-sky-50/50 rounded-2xl border-l-[6px] border-sky-500 text-sky-800 italic font-bold text-xs shadow-sm">
                  "Học sinh có thể tương tác trực tiếp với các biến số để quan sát sự thay đổi của hệ thống trong thời gian thực."
                </div>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-lg">
                    <Check size={16} className="text-emerald-500" strokeWidth={3} /> 
                    <span className="font-black text-slate-700 uppercase tracking-tighter">Responsive:</span> <span className="text-slate-400">Mobile/Tablet</span>
                  </li>
                  <li className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-lg">
                    <Check size={16} className="text-emerald-500" strokeWidth={3} /> 
                    <span className="font-black text-slate-700 uppercase tracking-tighter">Offline:</span> <span className="text-slate-400">Chạy không mạng</span>
                  </li>
                </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultGenerated;