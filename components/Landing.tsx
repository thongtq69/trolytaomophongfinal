import React, { useState } from 'react';
import { 
  Sparkles, Microscope, Search, Database, Code, 
  ArrowRight, Globe2, BookOpen, MonitorPlay, 
  CheckCircle2, Users, Trophy, Lightbulb, 
  MessageSquare, Mail, Phone, MapPin, ExternalLink,
  ChevronRight, PlayCircle, Star
} from 'lucide-react';

interface LandingProps {
  onViewChange: (view: 'landing' | 'search' | 'library') => void;
}

const CATEGORIES = [
  "Tất cả", "SOẠN GIÁO ÁN PRO", "GAME HAY", "TẠO ĐỀ THI", 
  "MÔ PHỎNG AI", "TẠO SKKN", "CHATBOT PRO", "Phiếu học tập"
];

const TOOLS = [
  {
    title: "KẾ HOẠCH BÀI GIẢNG PRO",
    desc: "Công cụ hỗ trợ soạn giáo án Word chuyên sâu theo CV 2345, 5512.",
    badge: "LIÊN HỆ",
    category: "SOẠN GIÁO ÁN PRO",
    accent: "bg-amber-100 text-amber-700"
  },
  {
    title: "RUNG CHUÔNG VÀNG ONLINE",
    desc: "Game học tập Rung chuông vàng tương tác trực tiếp, sinh động.",
    badge: "MIỄN PHÍ",
    category: "GAME HAY",
    accent: "bg-emerald-100 text-emerald-700"
  },
  {
    title: "TẠO ĐỀ THI THEO CV 7991",
    desc: "Hỗ trợ giáo viên tạo đề thi kiểm tra chuẩn mẫu CV 7991.",
    badge: "MIỄN PHÍ",
    category: "TẠO ĐỀ THI",
    accent: "bg-blue-100 text-blue-700"
  },
  {
    title: "SKKN 2026 - MẪU HẢI PHÒNG",
    desc: "Hướng dẫn & hỗ trợ viết SKKN chuẩn mẫu Sở GDĐT Hải Phòng.",
    badge: "VIP",
    category: "TẠO SKKN",
    accent: "bg-purple-100 text-purple-700"
  },
  {
    title: "CHATBOT CÁ NHÂN HÓA",
    desc: "Trợ lý Chatbot AI cá nhân hóa cho từng môn học và giáo viên.",
    badge: "VIP",
    category: "CHATBOT PRO",
    accent: "bg-indigo-100 text-indigo-700"
  },
  {
    title: "PHIẾU HỌC TẬP THÔNG MINH",
    desc: "Thiết kế phiếu học tập đẹp, khoa học chỉ với vài từ khóa.",
    badge: "MIỄN PHÍ",
    category: "Phiếu học tập",
    accent: "bg-rose-100 text-rose-700"
  },
  {
    title: "XƯỞNG TRUYỆN PRO",
    desc: "Công cụ AI mạnh mẽ giúp tạo kịch bản truyện tranh minh họa.",
    badge: "MIỄN PHÍ",
    category: "Sáng tạo truyện",
    accent: "bg-orange-100 text-orange-700"
  },
  {
    title: "TRỢ LÝ TẠO MÔ PHỎNG",
    desc: "Tự động tạo mô phỏng tương tác HTML5 cho mọi môn học.",
    badge: "MIỄN PHÍ",
    category: "Tạo mô phỏng",
    accent: "bg-sky-100 text-sky-700"
  }
];

const STATS = [
  { label: 'Giáo viên sử dụng', value: '1,500+', icon: <Users size={20}/> },
  { label: 'Công cụ AI', value: '25+', icon: <Sparkles size={20}/> },
  { label: 'Tiết kiệm thời gian', value: '80%', icon: <Trophy size={20}/> },
  { label: 'Mô phỏng sẵn có', value: '5,000+', icon: <Database size={20}/> },
];

const Landing: React.FC<LandingProps> = ({ onViewChange }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filteredTools = TOOLS.filter(tool => 
    activeCategory === "Tất cả" || tool.category === activeCategory
  );

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
          {STATS.map((stat, idx) => (
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
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">Kho Công Cụ AI Chuyên Biệt</h2>
          <p className="text-slate-500 text-lg">Hệ sinh thái công cụ hỗ trợ giáo viên số hóa bài giảng toàn diện theo chuẩn Bộ Giáo Dục.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 px-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                activeCategory === cat 
                ? "bg-sky-600 border-sky-600 text-white shadow-lg shadow-sky-600/30 scale-105" 
                : "bg-white border-sky-50 text-slate-500 hover:border-sky-200 hover:text-sky-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTools.map((tool, idx) => (
            <div key={idx} className="group bg-white rounded-[32px] p-8 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-sky-900/10 transition-all hover:-translate-y-2 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${tool.accent}`}>
                  {tool.category}
                </div>
                <div className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-[10px] font-black border border-sky-100 uppercase">
                  {tool.badge}
                </div>
              </div>
              <div className="mb-6 h-32 flex items-center justify-center bg-slate-50/50 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform">
                <img 
                  src={
                    tool.category === "Toán học" ? "/assets/math_icon.png" :
                    tool.category === "MÔ PHỎNG AI" ? "/assets/physics_icon.png" :
                    tool.category === "SOẠN GIÁO ÁN PRO" ? "/assets/feature.png" :
                    "/assets/hero.png"
                  } 
                  alt={tool.title} 
                  className="h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors uppercase tracking-tight">
                {tool.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-2">
                {tool.desc}
              </p>
              <button 
                onClick={() => onViewChange('search')}
                className="w-full py-4 bg-slate-50 group-hover:bg-sky-600 group-hover:text-white text-sky-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                Sử dụng ngay
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT & MISSION */}
      <section className="bg-sky-900 py-24 relative overflow-hidden text-white rounded-[60px] mx-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>
        
        <div className="section-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sky-300 font-bold text-sm border border-white/10">
              <Lightbulb size={16} />
              <span>Về Dự Án & Sứ Mệnh</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Xây dựng cộng đồng <br/>
              giáo viên sẵn sàng cho <br/>
              <span className="text-sky-400">Kỷ nguyên AI</span>
            </h2>
            <p className="text-sky-100/70 text-lg leading-relaxed">
              Tôi phát triển các công cụ này với tâm huyết giúp đồng nghiệp giáo viên Việt Nam không bị bỏ lại phía sau. Ứng dụng AI không chỉ là tiết kiệm thời gian, mà là thay đổi cách chúng ta truyền cảm hứng cho học sinh thông qua các tài liệu học tập sinh động và hiện đại.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="size-6 bg-sky-400 rounded-full flex items-center justify-center text-sky-900 mt-1 shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <p className="font-bold">Tuân thủ chuẩn Bộ GD&ĐT Việt Nam</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-6 bg-sky-400 rounded-full flex items-center justify-center text-sky-900 mt-1 shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <p className="font-bold">Dễ sử dụng cho cả người không rành công nghệ</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-6 bg-sky-400 rounded-full flex items-center justify-center text-sky-900 mt-1 shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <p className="font-bold">Cập nhật liên tục các công nghệ AI mới nhất</p>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[40px] transform rotate-3 group-hover:rotate-0 transition-transform"></div>
            <img 
              src="/assets/mission.png" 
              alt="Mission" 
              className="relative z-10 rounded-[40px] shadow-2xl border border-white/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-container text-center space-y-20">
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-900">3 Bước Tối Ưu Giảng Dạy</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Chưa bao giờ việc tạo bài giảng điện tử lại trở nên dễ dàng và nhanh chóng đến thế.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Hidden on mobile) */}
          <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-sky-100 -z-10"></div>
          
          {[
            { step: '01', title: 'Chọn Công Cụ', desc: 'Duyệt qua kho công cụ AI đa dạng và chọn chức năng bạn cần.', icon: <Search size={24}/> },
            { step: '02', title: 'Nhập Nội Dung', desc: 'Mô tả ngắn gọn yêu cầu hoặc tải tài liệu lên để AI xử lý.', icon: <Sparkles size={24}/> },
            { step: '03', title: 'Nhận Kết Quả', desc: 'AI tự động sinh mã, văn bản hoặc mô phỏng. Xuất và sử dụng ngay!', icon: <ArrowRight size={24}/> },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-6">
              <div className="size-20 bg-white shadow-xl shadow-sky-600/10 rounded-full border border-sky-50 flex items-center justify-center relative">
                <div className="absolute -top-2 -right-2 size-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-black text-xs">
                  {item.step}
                </div>
                <div className="text-sky-600">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-sky-50/50 py-24">
        <div className="section-container space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-slate-900">Giáo Viên Nói Gì?</h2>
            <p className="text-slate-500">Cảm nhận từ những người đồng nghiệp đã trải nghiệm thành công.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Cô Lan Anh', role: 'GV Vật lý, Hà Nội', text: 'Công cụ tạo mô phỏng AI thật sự cứu cánh tôi trong những tiết dự giờ. Chỉ vài phút là có ngay thí nghiệm tương tác cực sinh động.' },
              { name: 'Thầy Minh Quân', role: 'GV Toán, Đà Nẵng', text: 'Tôi dùng Trợ lý soạn giáo án để tối ưu hóa quy trình. Giờ tôi có nhiều thời gian hơn để quan tâm đến hS.' },
              { name: 'Cô Thu Hương', role: 'GV Tiểu học, HCM', text: 'Xưởng truyện Pro là đam mê của tôi! hS hào hứng lạ kỳ khi được học qua những câu chuyện minh họa AI.' },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-sky-100 shadow-sm space-y-4 relative">
                <div className="absolute -top-4 left-8 text-sky-400">
                  <MessageSquare size={32} fill="currentColor" />
                </div>
                <div className="flex gap-1 text-amber-400">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-slate-600 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-sky-50">
                  <div className="size-10 bg-sky-200 rounded-full overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt={t.name}/>
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400 font-bold">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & CTA */}
      <section className="section-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Sẵn Sàng Thay Đổi <br/> Cách Bạn Giảng Dạy?</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Nếu bạn có bất kỳ câu hỏi nào hoặc muốn đăng ký các khóa đào tạo chuyên sâu về AI, hãy liên hệ với chúng tôi ngay hôm nay.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-sky-50 shadow-sm group hover:border-sky-300 transition-all">
              <div className="size-14 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 transition-transform group-hover:scale-110">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Email hỗ trợ</div>
                <div className="text-lg font-black text-slate-800">hieu.nguyenminh@edu.vn</div>
              </div>
            </div>
            <div className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-sky-50 shadow-sm group hover:border-sky-300 transition-all">
              <div className="size-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Hotline & Zalo</div>
                <div className="text-lg font-black text-slate-800">03xx xxx xxx</div>
              </div>
            </div>
            <div className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-sky-50 shadow-sm group hover:border-sky-300 transition-all">
              <div className="size-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 transition-transform group-hover:scale-110">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase">Địa chỉ</div>
                <div className="text-lg font-black text-slate-800">TP. Hải Phòng, Việt Nam</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-10 md:p-14 rounded-[50px] shadow-2xl shadow-sky-900/10 border border-sky-50 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-900">Liên Hệ Ngay</h3>
            <p className="text-slate-400">Nhận tư vấn miễn phí về các gói VIP</p>
          </div>
          
          <div className="space-y-4">
            <input type="text" placeholder="Họ và tên của bạn" className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all" />
            <input type="email" placeholder="Địa chỉ Email" className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all" />
            <textarea placeholder="Nội dung lời nhắn..." rows={4} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all"></textarea>
            <button className="btn-primary w-full py-5 text-lg">
              Gửi Liên Hệ
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Landing;
