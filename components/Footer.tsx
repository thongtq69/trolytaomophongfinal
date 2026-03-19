import React from 'react';
import { Microscope, Facebook, Twitter, Mail, Phone, MapPin, ExternalLink, ChevronRight, Globe2, BookOpen, MonitorPlay, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 pt-20 pb-10 px-4 mt-auto no-print text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-sky-600 text-white p-3 rounded-2xl flex items-center justify-center shadow-2xl shadow-sky-600/30">
                <Microscope size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-2xl font-black leading-none tracking-tight text-white mb-1">TRỢ LÝ MÔ PHỎNG</h2>
                <p className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em]">Kỷ nguyên AI Giáo dục</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm max-w-xs">
              Sứ mệnh của chúng tôi là trang bị cho mọi giáo viên sức mạnh của AI để xây dựng những bài giảng sinh động, hiện đại và cuốn hút nhất.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 group">
                <Facebook size={20} className="text-slate-400 group-hover:text-blue-500" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 group">
                <Twitter size={20} className="text-slate-400 group-hover:text-sky-400" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 group">
                <Mail size={20} className="text-slate-400 group-hover:text-amber-400" />
              </a>
              <a href="#" className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 group">
                 <Globe2 size={20} className="text-slate-400 group-hover:text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-lg font-black uppercase tracking-widest text-sky-400">Ứng dụng AI</h3>
            <ul className="space-y-4">
              {['Soạn giáo án Pro', 'Game học tập Online', 'Tạo đề thi tự động', 'Viết SKKN mẫu', 'Xưởng truyện tranh AI'].map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white flex items-center gap-2 group transition-all">
                    <ChevronRight size={16} className="text-sky-600 group-hover:translate-x-1 transition-transform" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-8">
            <h3 className="text-lg font-black uppercase tracking-widest text-sky-400">Tài nguyên</h3>
            <ul className="space-y-4">
              {['Thư viện PhET', 'Mô phỏng OPhysics', 'Học liệu Falstad', 'Cộng đồng Giáo viên AI', 'Khóa học Đào tạo'].map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white flex items-center gap-2 group transition-all">
                    <ChevronRight size={16} className="text-sky-600 group-hover:translate-x-1 transition-transform" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Special CTA */}
          <div className="bg-gradient-to-br from-sky-900 to-indigo-950 p-8 rounded-[40px] border border-white/10 space-y-6 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={80} fill="white" />
            </div>
            
            <h3 className="text-xl font-black text-white leading-tight">Nâng Tầm Giảng Dạy Ngay Hôm Nay!</h3>
            <p className="text-sky-200/60 text-sm leading-relaxed">
              Nhận bộ tài liệu hướng dẫn sử dụng AI miễn phí khi liên hệ với chúng tôi qua Zalo hoặc Form đăng ký.
            </p>
            <a 
              href="https://forms.gle/19fbZmmHW5rEtxxG7" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-4 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-sky-900/50 w-full justify-center group"
            >
              ĐĂNG KÝ NGAY
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 TRỢ LÝ MÔ PHỎNG AI. PHÁT TRIỂN BỞI THẦY NGUYỄN MINH HIẾU.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Trợ giúp</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ArrowRight: React.FC<{ size?: number; className?: string }> = ({ size, className }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default Footer;