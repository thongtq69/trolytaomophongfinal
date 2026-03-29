import React, { useState } from 'react';
import { Sparkles, Download, Code, Check } from 'lucide-react';
import { AIResult, SearchParams } from '../types';
import SimulationChatBox from './SimulationChatBox';

interface ResultGeneratedProps {
  data: AIResult;
  topic: string;
  searchParams: SearchParams;
  apiKey: string;
  selectedModel: string;
}

const ResultGenerated: React.FC<ResultGeneratedProps> = ({ data, topic, searchParams, apiKey, selectedModel }) => {
  const [copied, setCopied] = useState(false);
  
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
      <div className="relative w-full bg-gradient-to-br from-[#dcfce7] via-[#bbf7d0] to-[#86efac] rounded-[2rem] p-6 sm:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-xl overflow-hidden group border border-[#86efac]">
        
        {/* Lab Tech SVG Decorations */}
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none mix-blend-color-burn">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
                <path d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z" fill="none" stroke="#064e3b" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="30" cy="0" r="2" fill="#064e3b" />
                <circle cx="60" cy="17.32" r="2" fill="#064e3b" />
                <circle cx="60" cy="51.96" r="2" fill="#064e3b" />
                <circle cx="30" cy="69.28" r="2" fill="#064e3b" />
                <circle cx="0" cy="51.96" r="2" fill="#064e3b" />
                <circle cx="0" cy="17.32" r="2" fill="#064e3b" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>
        
        {/* Floating animated nodes (Lab tech effect) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {/* Molecule Node 1 */}
           <div className="absolute top-[-30%] right-[5%] opacity-30 animate-[spin_40s_linear_infinite]">
             <svg width="300" height="300" viewBox="0 0 100 100" className="text-[#047857]">
               <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" className="opacity-50" />
               <circle cx="50" cy="5" r="4" fill="currentColor" />
               <circle cx="95" cy="50" r="6" fill="currentColor" />
               <circle cx="50" cy="95" r="4" fill="currentColor" />
               <circle cx="5" cy="50" r="5" fill="currentColor" />
               <line x1="50" y1="5" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
               <line x1="95" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
               <line x1="5" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
               <line x1="50" y1="95" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
               <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" />
               <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="animate-ping opacity-10" />
             </svg>
           </div>
           
           {/* Abstract Data Rings */}
           <div className="absolute bottom-[-40%] left-[10%] opacity-20 animate-[spin_60s_linear_infinite_reverse]">
             <svg width="250" height="250" viewBox="0 0 100 100" className="text-[#065f46]">
               <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
               <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 2" />
               <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
             </svg>
           </div>
           
           {/* Glow Effects */}
           <div className="absolute -bottom-24 -left-12 w-64 h-64 bg-white rounded-full blur-[80px] opacity-60 animate-[pulse_6s_ease-in-out_infinite]"></div>
        </div>

        <div className="flex items-start md:items-center gap-5 sm:gap-6 w-full lg:flex-1 min-w-[280px] relative z-10">
          {/* Icon */}
          <div className="flex-shrink-0 flex items-center justify-center size-14 sm:size-16 bg-[#047857]/10 backdrop-blur-sm rounded-[1.25rem] border border-[#047857]/20 shadow-sm relative group cursor-default">
             <div className="absolute inset-0 bg-white/40 rounded-[1.25rem] blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <Sparkles size={32} className="text-[#064e3b] relative z-10" strokeWidth={1.5} />
          </div>
          
          <div className="flex flex-col gap-1.5 min-w-0 text-[#064e3b]">
             {/* Title - Removed truncate so it never gets cut off */}
            <h2 className="font-black text-[22px] sm:text-[26px] md:text-[28px] tracking-tight uppercase drop-shadow-sm flex flex-wrap leading-tight">
              Mô phỏng AI đã sẵn sàng!
            </h2>
            <div className="text-[#065f46] font-bold text-xs md:text-sm flex flex-wrap items-center gap-x-1.5 gap-y-2 mt-0.5 leading-snug">
              <span>Hệ thống đã khởi tạo thành công không gian tương tác cho chủ đề</span>
              <span className="font-black px-3 py-1.5 rounded-[10px] bg-white/40 border border-[#047857]/20 text-[#0f766e] shadow-sm inline-block max-w-[200px] sm:max-w-full truncate">
                 "{topic}"
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto mt-4 xl:mt-0 relative z-10 justify-start md:justify-end">
          <button 
            onClick={handleDownload}
            className="flex-1 sm:flex-none justify-center bg-[#047857] border-2 border-[#065f46] px-6 py-3.5 sm:py-4 rounded-[1.25rem] text-xs sm:text-[13px] font-black text-white flex items-center gap-2 hover:bg-[#064e3b] transition-all uppercase tracking-widest active:scale-95 shadow-lg shadow-[#047857]/20"
          >
            <Download size={18} strokeWidth={2.5} />
            Tải Bản Offline
          </button>
          <button 
            onClick={handleCopy}
            className="flex-1 sm:flex-none justify-center bg-white text-[#047857] px-6 py-3.5 sm:py-4 rounded-[1.25rem] text-xs sm:text-[13px] font-black flex items-center gap-2 hover:bg-[#f0fdf4] border-2 border-white transition-all uppercase tracking-widest shadow-lg shadow-black/5 active:scale-95 group"
          >
            <div className="relative">
              {copied ? <Check size={18} className="text-[#059669]" strokeWidth={3} /> : <Code size={18} className="group-hover:rotate-12 transition-transform text-[#10b981]" strokeWidth={2.5} />}
            </div>
            {copied ? 'Đã Sao Chép !' : 'Copy Mã Nhúng'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full">
         <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-slate-100 relative group transition-all duration-500 hover:shadow-cyan-500/10 hover:border-white">
            <div className="w-full h-[600px] md:h-[750px] relative">
              <iframe 
                title="Generated Simulation"
                srcDoc={data.html}
                className="w-full h-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-modals"
              />
              <div className="absolute bottom-6 left-6">
                 <div className="bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-full text-xs font-black flex items-center gap-3 border border-white/20 shadow-2xl tracking-widest">
                    <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
                    INTERACTIVE READY
                 </div>
              </div>
            </div>
         </div>
      </div>

      <SimulationChatBox
        topic={topic}
        params={searchParams}
        result={data}
        apiKey={apiKey}
        model={selectedModel}
      />
    </div>
  );
};

export default ResultGenerated;
