import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Microscope, Search, Database, Code, 
  ArrowRight, Globe2, BookOpen, MonitorPlay, 
  CheckCircle2, Users, Trophy, Lightbulb, 
  MessageSquare, Mail, Phone, MapPin, ExternalLink,
  ChevronRight, PlayCircle, Star
} from 'lucide-react';
import { simulationDatabase } from '../services/simulationData';

interface LandingProps {
  onViewChange: (view: 'landing' | 'search' | 'library') => void;
}

const Landing: React.FC<LandingProps> = ({ onViewChange }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  // Derive categories from DB subjects
  const categories = useMemo(() => {
    const subjects = Array.from(new Set(simulationDatabase.map(sim => sim.subject)));
    return ["Tất cả", ...subjects];
  }, []);

  const filteredTools = useMemo(() => {
    const tools = activeCategory === "Tất cả" 
      ? simulationDatabase.slice(0, 12) // Show top 12 initially
      : simulationDatabase.filter(sim => sim.subject === activeCategory);
    return tools;
  }, [activeCategory]);

  const stats = [
    { label: 'Giáo viên sử dụng', value: '1,500+', icon: <Users size={20}/> },
    { label: 'Công cụ AI', value: '25+', icon: <Sparkles size={20}/> },
    { label: 'Tiết kiệm thời gian', value: '80%', icon: <Trophy size={20}/> },
    { label: 'Mô phỏng sẵn có', value: `${simulationDatabase.length}+`, icon: <Database size={20}/> },
  ];

  const getBadgeStyle = (subject: string) => {
    switch(subject) {
      case 'Vật lý': return 'bg-blue-100 text-blue-700';
      case 'Hóa học': return 'bg-emerald-100 text-emerald-700';
      case 'Toán học': return 'bg-purple-100 text-purple-700';
      case 'Sinh học': return 'bg-rose-100 text-rose-700';
      case 'Soạn bài': return 'bg-amber-100 text-amber-700';
      case 'Game học tập': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] flex flex-col gap-24 pb-24">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-8">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-100/50 to-transparent -z-10 rounded-l-[100px]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="section-container flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 font-bold text-sm shadow-sm animate-bounce-slow">
              <Sparkles size={16} />
              <span>Nền tảng AI Giáo dục hàng đầu Việt Nam</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Giảng dạy sáng tạo <br/>
              với <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">Trợ lý AI</span> <br/>
              thế hệ mới
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Giúp giáo viên tiết kiệm hàng giờ soạn giáo án, tạo đề thi và mô phỏng tương tác chỉ trong vài giây với công nghệ Gemini AI tiên tiến nhất.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => onViewChange('search')}
                className="btn-primary py-5 px-10 text-lg shadow-xl shadow-sky-600/30 group"
              >
                Trải Nghiệm Ngay
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => onViewChange('library')}
                className="btn-secondary py-5 px-10 text-lg group"
              >
                <MonitorPlay size={22} />
                Xem Thư Viện
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`size-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="size-12 rounded-full border-4 border-white bg-sky-600 text-white flex items-center justify-center text-xs font-bold">+1k</div>
              </div>
              <p className="text-sm font-medium text-slate-500">
                Gia nhập cộng đồng <span className="text-slate-900 font-black">1,500+ giáo viên</span> hiện đại
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-sky-400/20 blur-[120px] rounded-full"></div>
            <img 
              src="/assets/hero.png" 
              alt="AI Teacher Assistant" 
              className="relative z-10 w-full max-w-2xl mx-auto drop-shadow-2xl animate-float"
            />
            {/* Floating Badges - Anchored to Image */}
            <div className="absolute top-[20%] -right-4 bg-white p-4 rounded-3xl shadow-2xl border border-sky-50 flex items-center gap-3 z-20 animate-float [animation-delay:1s]">
              <div className="size-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                <CheckCircle2 size={24}/>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hiệu suất</div>
                <div className="text-sm font-black text-slate-800">Tiết kiệm 5h/tuần</div>
              </div>
            </div>
            
            <div className="absolute bottom-[20%] -left-4 bg-white p-4 rounded-3xl shadow-2xl border border-sky-50 flex items-center gap-3 z-20 animate-float [animation-delay:0.5s]">
              <div className="size-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
                <Trophy size={24}/>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tin dùng</div>
                <div className="text-sm font-black text-slate-800">1,500+ Giáo viên</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto w-full px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white/80 backdrop-blur-xl rounded-[40px] border border-white shadow-2xl shadow-sky-900/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2">
              <div className="size-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-1">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS REPOSITORY */}
      <section id="tools" className="section-container space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Kho Tài Nguyên Giáo Dục Chọn Lọc</h2>
          <p className="text-slate-500 text-lg">Khám phá và sử dụng hàng trăm mô phỏng, công cụ AI được thiết kế chuyên biệt cho từng môn học.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                activeCategory === cat 
                ? "bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-600/30 scale-105" 
                : "bg-white border-sky-50 text-slate-400 hover:border-sky-200 hover:text-sky-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="group bg-white rounded-[32px] p-8 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-sky-900/10 transition-all hover:-translate-y-2 flex flex-col h-full border-b-4 border-b-transparent hover:border-b-sky-500">
              <div className="flex justify-between items-start mb-6">
                <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getBadgeStyle(tool.subject)}`}>
                  {tool.subject}
                </div>
                <div className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-[10px] font-black border border-sky-100 uppercase tracking-tighter">
                  {tool.platform}
                </div>
              </div>
              
              <div className="mb-6 h-40 flex items-center justify-center bg-slate-50/50 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform p-4">
                <img 
                  src={tool.preview || "/assets/feature.png"} 
                  alt={tool.title} 
                  className="w-full h-full object-contain pointer-events-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/assets/feature.png";
                  }}
                />
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors uppercase tracking-tight leading-snug">
                {tool.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                {tool.topic.join(', ')}
              </p>

              <button 
                onClick={() => onViewChange('library')}
                className="w-full py-4 bg-slate-50 group-hover:bg-sky-600 group-hover:text-white text-sky-700 font-black rounded-2xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]"
              >
                Khám phá ngay
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* See All Button */}
        <div className="text-center pt-8">
          <button 
            onClick={() => onViewChange('library')}
            className="btn-secondary py-5 px-12 group"
          >
            Xem tất cả {simulationDatabase.length} tài nguyên
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ABOUT & MISSION */}
      <section className="bg-sky-900 py-24 relative overflow-hidden text-white rounded-[60px] mx-4 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>
        
        <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sky-300 font-bold text-sm border border-white/10">
              <Lightbulb size={16} />
              <span>Về Dự Án & Sứ Mệnh</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter">
              Xây dựng cộng đồng <br/>
              giáo viên sẵn sàng cho <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-300">Kỷ nguyên AI</span>
            </h2>
            <p className="text-sky-100/70 text-lg leading-relaxed font-medium">
              Tôi phát triển các công cụ này với tâm huyết giúp đồng nghiệp giáo viên Việt Nam không bị bỏ lại phía sau. Ứng dụng AI không chỉ là tiết kiệm thời gian, mà là thay đổi cách chúng ta truyền cảm hứng cho học sinh thông qua các tài liệu học tập sinh động và hiện đại.
            </p>
            <div className="space-y-5">
              {[
                "Tuân thủ chuẩn Bộ GD&ĐT Việt Nam",
                "Dễ sử dụng cho cả người không rành công nghệ",
                "Cập nhật liên tục các công nghệ AI mới nhất"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="size-8 bg-sky-500/20 rounded-xl flex items-center justify-center text-sky-400 border border-sky-500/30 group-hover:bg-sky-400 group-hover:text-sky-900 transition-colors">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="font-bold text-sky-50 leading-none">{text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group p-4">
            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[50px] transform rotate-3 group-hover:rotate-0 transition-transform"></div>
            <img 
              src="/assets/mission.png" 
              alt="Mission" 
              className="relative z-10 rounded-[50px] shadow-2xl border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 w-full"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-container text-center space-y-24">
        <div className="space-y-6">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight uppercase">3 Bước Tối Ưu Giảng Dạy</h2>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">Chưa bao giờ việc tạo bài giảng điện tử lại trở nên dễ dàng và nhanh chóng đến thế.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          <div className="hidden md:block absolute top-[40%] left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-sky-100 to-transparent -z-10"></div>
          
          {[
            { step: '01', title: 'Chọn Công Cụ', desc: 'Duyệt qua kho công cụ AI đa dạng và chọn chức năng bạn cần.', icon: <Search size={28}/> },
            { step: '02', title: 'Nhập Nội Dung', desc: 'Mô tả ngắn gọn yêu cầu hoặc tải tài liệu lên để AI xử lý.', icon: <Sparkles size={28}/> },
            { step: '03', title: 'Nhận Kết Quả', desc: 'AI tự động sinh mã, văn bản hoặc mô phỏng. Xuất và sử dụng ngay!', icon: <ArrowRight size={28}/> },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-8 group">
              <div className="size-24 bg-white shadow-2xl shadow-sky-600/10 rounded-[32px] border border-sky-50 flex items-center justify-center relative transition-transform group-hover:-translate-y-2">
                <div className="absolute -top-3 -right-3 size-10 bg-sky-600 text-white rounded-2xl flex items-center justify-center font-black text-xs shadow-lg shadow-sky-600/30">
                  {item.step}
                </div>
                <div className="text-sky-600 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-[240px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="section-container pb-0">
        <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-[60px] p-12 md:p-20 text-center space-y-10 relative overflow-hidden shadow-2xl shadow-sky-900/20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -track-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-3xl mx-auto">Sẵn Sàng Thay Đổi Cách Bạn Giảng Dạy Mãi Mãi?</h2>
                <p className="text-sky-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
                    Gia nhập cùng 1,500+ giáo viên hiện đại đang sử dụng Trợ lý AI để mỗi tiết học trở thành một trải nghiệm thú vị.
                </p>
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-6">
                <button 
                  onClick={() => onViewChange('search')}
                  className="bg-white text-sky-700 font-black py-6 px-12 rounded-[24px] text-lg shadow-2xl hover:bg-sky-50 transition-all active:scale-95 uppercase tracking-widest"
                >
                    Bắt đầu miễn phí
                </button>
                <button className="bg-sky-500/20 backdrop-blur-md border border-white/20 text-white font-black py-6 px-12 rounded-[24px] text-lg hover:bg-white/10 transition-all uppercase tracking-widest">
                    Liên hệ hỗ trợ
                </button>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
