import React, { useState } from 'react';
import { Search, Sparkles, Settings, Monitor, Loader2, FlaskConical, Atom, Dna, Calculator, Check, Upload, FileText, Zap, BookOpen, Target } from 'lucide-react';
import { SUBJECTS, GRADES, DEVICE_OPTIONS, SearchParams, UploadedFile } from '../types';
import FileUploader from './FileUploader';

interface SearchFormProps {
  isLoading: boolean;
  onCreateAI: (params: SearchParams) => void;
}

type InputMode = 'topic' | 'file';

const SearchForm: React.FC<SearchFormProps> = ({ isLoading, onCreateAI }) => {
  const [inputMode, setInputMode] = useState<InputMode>('topic');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const [formData, setFormData] = useState<SearchParams>({
    subject: SUBJECTS[0],
    topic: '',
    grade: GRADES[7],
    parameters: '',
    expectedResult: '',
    devices: []
  });

  const handleInputChange = (field: keyof SearchParams, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeviceChange = (deviceId: string) => {
    setFormData(prev => {
      const current = prev.devices;
      if (current.includes(deviceId)) {
        return { ...prev, devices: current.filter(d => d !== deviceId) };
      } else {
        return { ...prev, devices: [...current, deviceId] };
      }
    });
  };



  const handleSubmitAI = () => {
    if (inputMode === 'topic') {
      if (!formData.topic.trim()) {
        alert("Vui lòng nhập chủ đề để AI tạo mô phỏng!");
        return;
      }
    } else {
      if (uploadedFiles.length === 0) {
        alert("Vui lòng tải lên ít nhất một file!");
        return;
      }
    }

    const paramsWithFiles: SearchParams = {
      ...formData,
      uploadedFiles: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      topic: inputMode === 'file' && !formData.topic.trim()
        ? `Bài tập từ: ${uploadedFiles.map(f => f.name).join(', ')}`
        : formData.topic
    };

    onCreateAI(paramsWithFiles);
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Vật lý': return <Atom size={18} className="text-blue-500" />;
      case 'Hóa học': return <FlaskConical size={18} className="text-green-500" />;
      case 'Sinh học': return <Dna size={18} className="text-pink-500" />;
      case 'Toán học': return <Calculator size={18} className="text-purple-500" />;
      default: return <Atom size={18} className="text-blue-500" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Vật lý': return 'from-blue-500 to-cyan-500';
      case 'Hóa học': return 'from-green-500 to-emerald-500';
      case 'Sinh học': return 'from-pink-500 to-rose-500';
      case 'Toán học': return 'from-purple-500 to-violet-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div className="relative max-w-[1200px] mx-auto z-10 group">
      {/* Animated gradient border */}
      <div className="absolute -inset-[3px] bg-gradient-to-r from-sky-300 via-indigo-400 to-sky-300 rounded-[35px] opacity-80 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]"></div>
      
      <div className="bg-white rounded-[32px] p-6 md:p-8 relative overflow-hidden h-full shadow-2xl">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-100/50 to-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/50 to-sky-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-sky-600 to-blue-700 rounded-2xl text-white shadow-xl shadow-sky-200">
              <Monitor size={28} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent uppercase tracking-tight">
                Thiết lập mô phỏng
              </h2>
              <p className="text-sm font-bold text-sky-600/70 flex items-center gap-1.5 mt-1 uppercase tracking-wider text-[10px]">
                <Sparkles size={14} className="text-amber-500" />
                Mô tả ý tưởng của bạn để AI hiện thực hóa
              </p>
            </div>
          </div>
        </div>

        <form 
          onSubmit={(e) => { e.preventDefault(); handleSubmitAI(); }} 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-teal-200">
                1
              </div>
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Thông tin cơ bản</span>
            </div>

            {/* Subject & Grade Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <BookOpen size={12} className="text-teal-500" />
                  Môn học
                </span>
                <div className="relative">
                  <select
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full rounded-2xl border-2 border-slate-300 bg-slate-50 focus:border-sky-400 focus:ring-8 focus:ring-sky-500/10 transition-all text-sm font-black py-4 pl-11 pr-4 appearance-none cursor-pointer hover:border-sky-300"
                  >
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    {getSubjectIcon(formData.subject)}
                  </div>
                  <div className={`absolute right-0 top-0 bottom-0 w-2 rounded-r-xl bg-gradient-to-b ${getSubjectColor(formData.subject)}`} />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Zap size={12} className="text-amber-500" />
                  Đối tượng
                </span>
                <select
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all text-sm font-semibold py-3.5 px-4 appearance-none cursor-pointer hover:border-amber-400"
                >
                  {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </label>
            </div>

            {/* Input Mode Toggle */}
            <div className="flex gap-1 p-1.5 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl border-2 border-slate-300">
              <button
                type="button"
                onClick={() => setInputMode('topic')}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black transition-all duration-300 ${inputMode === 'topic'
                    ? 'bg-white text-sky-700 shadow-xl shadow-sky-600/10 border border-sky-100 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                  }`}
              >
                <FileText size={18} className={inputMode === 'topic' ? 'text-sky-600' : ''} />
                Nhập chủ đề
              </button>
              <button
                type="button"
                onClick={() => setInputMode('file')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${inputMode === 'file'
                    ? 'bg-white text-violet-700 shadow-lg shadow-violet-100 border border-violet-100'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                  }`}
              >
                <Upload size={18} className={inputMode === 'file' ? 'text-violet-500' : ''} />
                Tải file bài tập
              </button>
            </div>

            {/* Conditional Input */}
            {inputMode === 'topic' ? (
              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Chủ đề chi tiết <span className="text-rose-500">*</span>
                </span>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  placeholder="Ví dụ: Cấu trúc nguyên tử, Định luật Ohm, Quang hợp..."
                  className="w-full rounded-xl border-2 border-slate-300 bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-100 transition-all text-sm font-medium py-3.5 px-4 shadow-sm hover:border-teal-400"
                />
              </label>
            ) : (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-md text-[10px]">NEW</span>
                  Tải file bài tập <span className="text-rose-500">*</span>
                </span>
                <FileUploader
                  files={uploadedFiles}
                  onFilesChange={setUploadedFiles}
                  maxFiles={5}
                  maxSizeMB={10}
                />
                <p className="text-xs text-violet-600 font-medium bg-violet-50 rounded-lg px-3 py-2 border border-violet-100">
                  ✨ AI sẽ phân tích nội dung file và tạo mô phỏng tương ứng
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
                2
              </div>
              <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Chi tiết nâng cao</span>
            </div>

            <div className="space-y-6">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Settings size={12} className="text-slate-500" />
                  Thông số điều chỉnh
                </span>
                <textarea
                  rows={2}
                  value={formData.parameters}
                  onChange={(e) => handleInputChange('parameters', e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 transition-all text-sm py-3 px-4 resize-none hover:border-sky-400"
                  placeholder="Góc tới, điện trở, khối lượng, nhiệt độ..."
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  <Target size={12} className="text-rose-500" />
                  Kết quả mong đợi
                </span>
                <textarea
                  rows={4}
                  value={formData.expectedResult}
                  onChange={(e) => handleInputChange('expectedResult', e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-300 bg-slate-50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all text-sm py-3.5 px-4 resize-none hover:border-rose-300"
                  placeholder="Mô tả kết quả bạn muốn thấy (Ví dụ: Có biểu đồ động, có bảng thông số...)"
                />
              </label>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                       <Sparkles size={16} className="text-emerald-500" />
                    </div>
                    <div>
                       <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-tight">Mẹo tối ưu AI</p>
                       <p className="text-[10px] text-emerald-600 font-medium leading-relaxed mt-1">
                          Cung cấp thông số chi tiết giúp AI tạo ra mô phỏng chính xác hơn 40%.
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 flex flex-col pt-10 border-t border-slate-100">
            <button
              type="button"
              onClick={handleSubmitAI}
              disabled={isLoading}
              className="group relative w-full bg-gradient-to-r from-[#dcfce7] via-[#bbf7d0] to-[#86efac] hover:from-[#bbf7d0] hover:to-[#4ade80] text-[#064e3b] rounded-[2rem] p-6 lg:p-8 flex items-center justify-between transition-all shadow-[0_8px_30px_rgba(74,222,128,0.25)] hover:shadow-[0_8px_30px_rgba(74,222,128,0.4)] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99] overflow-hidden border border-[#86efac] hover:border-[#4ade80]"
            >
              {/* Lab Tech SVG Background Elements */}
              <div className="absolute inset-0 opacity-[0.10] pointer-events-none mix-blend-color-burn">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hexagons-search" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
                      <path d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z" fill="none" stroke="#064e3b" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="30" cy="0" r="2" fill="#064e3b" />
                      <circle cx="60" cy="17.32" r="2" fill="#064e3b" />
                      <circle cx="60" cy="51.96" r="2" fill="#064e3b" />
                      <circle cx="30" cy="69.28" r="2" fill="#064e3b" />
                      <circle cx="0" cy="51.96" r="2" fill="#064e3b" />
                      <circle cx="0" cy="17.32" r="2" fill="#064e3b" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hexagons-search)" />
                </svg>
              </div>

              {/* Spinning Tech Node */}
              <div className="absolute right-0 top-0 h-full w-1/2 opacity-[0.15] pointer-events-none mix-blend-color-burn flex justify-end">
                <div className="absolute right-[5%] top-[-80%] w-[350px] h-[350px] animate-[spin_50s_linear_infinite]">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#047857]">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" className="opacity-60" />
                    <circle cx="50" cy="5" r="4" fill="currentColor" />
                    <circle cx="95" cy="50" r="6" fill="currentColor" />
                    <circle cx="50" cy="95" r="4" fill="currentColor" />
                    <circle cx="5" cy="50" r="5" fill="currentColor" />
                    <line x1="50" y1="5" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="95" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="5" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="50" y1="95" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="10" fill="currentColor" className="animate-pulse" />
                    <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" className="animate-ping opacity-20" />
                  </svg>
                </div>
              </div>
              
              {/* Additional Subtle Data Rings */}
              <div className="absolute left-[20%] bottom-[-50%] opacity-10 animate-[spin_40s_linear_infinite_reverse] pointer-events-none">
                <svg width="250" height="250" viewBox="0 0 100 100" className="text-[#064e3b]">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 4" />
                </svg>
              </div>

              <div className="flex items-center gap-6 relative z-10 w-full">
                <Sparkles size={48} className="text-[#047857] stroke-[1.5] hidden sm:block drop-shadow-sm" />
                <div className="flex flex-col items-start gap-1 text-left min-w-0">
                  <div className="flex items-center gap-4 flex-wrap">
                    <Sparkles size={24} className="text-[#047857] stroke-2 sm:hidden flex-shrink-0" />
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight drop-shadow-sm truncate max-w-full text-[#064e3b]">
                      {inputMode === 'file' ? 'Hiện thực hóa từ file bài tập' : 'Dùng AI tạo mô phỏng tương tác'}
                    </span>
                    <span className="px-3 py-1 border border-[#047857]/20 rounded-xl text-[10px] lg:text-xs font-bold tracking-widest bg-white/40 uppercase shadow-sm flex-shrink-0 text-[#0f766e]">
                      VERSION 24.3
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#065f46] uppercase mt-1">
                    Xây dựng bởi trí tuệ nhân tạo thế hệ mới • Kết quả hiển thị ngay lập tức
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex h-14 w-14 rounded-full border border-[#047857]/20 items-center justify-center bg-white/40 group-hover:bg-white/60 transition-colors shrink-0 relative z-10 shadow-sm group-hover:shadow-md">
                {isLoading ? (
                  <Loader2 className="animate-spin text-[#047857]" size={24} />
                ) : (
                  <Zap size={24} className="text-[#059669]" />
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default SearchForm;
