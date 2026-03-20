import React from 'react';
import { X, Search, Sparkles, Download } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="bg-gradient-to-r from-sky-600 to-indigo-700 p-8 flex justify-between items-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-black text-2xl uppercase tracking-tight">Hướng dẫn sử dụng</h3>
            <p className="text-sky-100 text-xs font-bold opacity-80 uppercase tracking-widest mt-1">Làm chủ công nghệ AI Giáo dục</p>
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 rounded-2xl p-3 transition-colors backdrop-blur-md border border-white/10"><X size={24} /></button>
        </div>
        
        <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="flex gap-6 group">
            <div className="bg-sky-50 p-4 rounded-3xl h-fit text-sky-600 border border-sky-100 group-hover:scale-110 transition-transform shadow-sm">
                <Search size={28} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 uppercase text-sm tracking-tight mb-1">1. Khám phá thư viện</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Sử dụng thanh tìm kiếm để truy cập hàng trăm mô phỏng và công cụ AI đã được đội ngũ giáo viên kiểm duyệt kỹ lưỡng.</p>
            </div>
          </div>

          <div className="flex gap-6 group">
            <div className="bg-amber-50 p-4 rounded-3xl h-fit text-amber-600 border border-amber-100 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles size={28} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 uppercase text-sm tracking-tight mb-1">2. Sáng tạo cùng AI</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Chỉ cần nhập chủ đề hoặc tải lên file tài liệu, AI sẽ tự động lập trình mã nguồn HTML5, tạo game hoặc soạn giáo án chi tiết cho bạn.</p>
            </div>
          </div>

          <div className="flex gap-6 group">
            <div className="bg-emerald-50 p-4 rounded-3xl h-fit text-emerald-600 border border-emerald-100 group-hover:scale-110 transition-transform shadow-sm">
                <Download size={28} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-black text-slate-800 uppercase text-sm tracking-tight mb-1">3. Triển khai giảng dạy</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Bạn có thể trình chiếu trực tiếp trên lớp hoặc tải file về máy để sử dụng offline mà không cần kết nối Internet.</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 border-t border-slate-50 text-center bg-slate-50/50">
          <button 
                onClick={onClose} 
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-sky-600/20 active:scale-95 uppercase tracking-widest text-xs"
          >
            Đã sẵn sàng trải nghiệm
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;