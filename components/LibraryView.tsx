import React, { useState } from 'react';
import { Simulation, SUBJECTS } from '../types';
import { simulationDatabase } from '../services/simulationData';
import ResultFound from './ResultFound';
import { BookOpen, Filter, Search } from 'lucide-react';

const LibraryView: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState<string>('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique subjects from DB plus "Tất cả"
  const allSubjects = ['Tất cả', ...SUBJECTS, 'Khoa học tự nhiên'];

  const filteredSimulations = simulationDatabase.filter(sim => {
    const matchSubject = activeSubject === 'Tất cả' || sim.subject === activeSubject;
    const matchSearch = sim.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        sim.topic.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchSubject && matchSearch;
  });

  return (
    <div className="animate-in fade-in duration-500">
      {/* Library Header & Filters */}
      <div className="bg-white rounded-[32px] shadow-2xl shadow-sky-900/5 border border-sky-100 p-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
              <BookOpen className="text-sky-600" size={32} />
              Thư viện mô phỏng
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-2">
              Khám phá <span className="text-sky-600 font-black">{simulationDatabase.length} tài nguyên</span> đã được kiểm duyệt kỹ lưỡng.
            </p>
          </div>

          <div className="flex-1 max-w-lg">
            <div className="relative group">
              <input
                type="text"
                placeholder="Tìm nhanh theo tên hoặc chủ đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-sky-400 focus:bg-white focus:ring-8 focus:ring-sky-500/10 transition-all text-sm font-bold shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={20} />
            </div>
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allSubjects.map(sub => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`
                whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2
                ${activeSubject === sub 
                  ? 'bg-sky-600 border-sky-600 text-white shadow-xl shadow-sky-600/30 scale-105' 
                  : 'bg-white border-sky-50 text-slate-400 hover:border-sky-200 hover:text-sky-600'}
              `}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results */}
      {filteredSimulations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredSimulations.map(sim => (
            <ResultFound key={sim.id} simulation={sim} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-sky-100">
          <div className="bg-sky-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-sky-200">
            <Filter size={40} />
          </div>
          <p className="text-slate-400 font-bold text-lg mb-6">Không tìm thấy mô phỏng nào phù hợp.</p>
          <button 
            onClick={() => {setActiveSubject('Tất cả'); setSearchTerm('')}}
            className="px-8 py-3 bg-sky-50 text-sky-600 font-black rounded-xl hover:bg-sky-100 transition-all uppercase tracking-tight text-sm"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};

export default LibraryView;