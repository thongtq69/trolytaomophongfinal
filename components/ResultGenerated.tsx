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
      
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Sparkles size={24} className="text-amber-300" />
            </div>
            <h2 className="font-black text-2xl tracking-tight uppercase">Mô phỏng AI đã sẵn sàng!</h2>
          </div>
          <p className="text-sky-50 font-medium text-sm opacity-90">Hệ thống đã khởi tạo thành công mô hình tương tác cho chủ đề <span className="underline decoration-amber-300/50 underline-offset-4">"{topic}"</span>.</p>
        </div>
        <div className="flex gap-3 relative z-10">
          <button 
            onClick={handleDownload}
            className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-white/20 transition-all uppercase tracking-widest"
          >
            <Download size={18} />
            Tải HTML
          </button>
          <button 
            onClick={handleCopy}
            className="bg-white text-sky-700 px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-sky-50 transition-all uppercase tracking-widest shadow-xl active:scale-95"
          >
            {copied ? <Check size={18} className="text-emerald-500" strokeWidth={3} /> : <Code size={18} />}
            {copied ? 'Đã sao chép' : 'Copy Source'}
          </button>
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