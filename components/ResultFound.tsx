import React, { useState } from 'react';
import { Simulation } from '../types';
import { ExternalLink, Copy, ChevronDown, ChevronUp, ImageOff, Play, Globe, CheckCircle, Atom, Zap } from 'lucide-react';

interface ResultFoundProps {
  simulation: Simulation;
}

const ResultFound: React.FC<ResultFoundProps> = ({ simulation }) => {
  const [imgError, setImgError] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(simulation.url);
    alert("Đã sao chép liên kết!");
  };

  const isVietnamese = simulation.language.toLowerCase().includes('việt') || simulation.language === 'vi';

  return (
    <div className="bg-white rounded-[40px] shadow-2xl shadow-sky-900/5 border border-sky-100 overflow-hidden hover:shadow-sky-900/10 transition-all duration-500 hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-5/12 bg-sky-50 relative group cursor-pointer overflow-hidden">
           <div className="aspect-video lg:h-full w-full relative h-full">
             {!imgError ? (
               <img 
                src={simulation.preview} 
                alt={simulation.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={() => setImgError(true)}
               />
             ) : (
               <div className="flex flex-col items-center justify-center h-full text-sky-200 bg-sky-100/50">
                 <div className="p-8 bg-white/50 rounded-full backdrop-blur-sm shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-sky-400/10 animate-pulse"></div>
                    <Atom size={64} strokeWidth={1} className="relative z-10" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-50">Tạo mô phỏng AI</span>
               </div>
             )}
             <div className="absolute inset-0 bg-sky-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="bg-white text-sky-600 p-5 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300">
                  <Play size={36} fill="currentColor" className="ml-1" />
                </div>
             </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-black rounded-full border border-sky-100 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle size={12} strokeWidth={3} /> {simulation.platform}
              </span>
              <span className={`px-3 py-1 text-[10px] font-black rounded-full border flex items-center gap-1.5 uppercase tracking-wider ${isVietnamese ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                <Globe size={12} strokeWidth={3} /> {isVietnamese ? 'Tiếng Việt' : simulation.language}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{simulation.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">
                Chủ đề: <span className="text-sky-600/80">{simulation.topic.join(', ')}</span> • Phù hợp cho <span className="text-sky-600/80 uppercase text-[11px] font-black tracking-widest">{simulation.grade.join(', ')}</span>
              </p>
            </div>

            {/* Guide Accordion */}
            {simulation.guide && (
              <div className="bg-teal-50/50 rounded-xl border border-teal-100 overflow-hidden">
                <button 
                  onClick={() => setIsGuideOpen(!isGuideOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold text-teal-800 uppercase tracking-wider hover:bg-teal-50 transition-colors"
                >
                  <span>Hướng dẫn nhanh</span>
                  {isGuideOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                
                {isGuideOpen && (
                   <div className="px-4 pb-4 pt-1 text-sm text-teal-900/80 animate-in slide-in-from-top-2">
                     <p className="whitespace-pre-line leading-relaxed border-l-2 border-[#0D9488] pl-3">
                       {simulation.guide}
                     </p>
                   </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a 
              href={simulation.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-[1.5] bg-sky-600 hover:bg-sky-700 text-white font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-sky-600/20 active:scale-95 uppercase tracking-tight text-sm"
            >
              <ExternalLink size={20} />
              Mở mô phỏng
            </a>
            <button 
              onClick={copyLink}
              className="flex-1 bg-white hover:bg-sky-50 text-sky-600 font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all border-2 border-sky-100 hover:border-sky-300 active:scale-95 uppercase tracking-tight text-sm"
            >
              <Copy size={20} />
              Sao chép
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultFound;