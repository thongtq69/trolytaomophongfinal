import React from 'react';
import { 
  Sparkles, Microscope, Search, Database, Code, 
  ArrowRight, Globe2, BookOpen, MonitorPlay, 
  CheckCircle2, Users, Trophy, Lightbulb, 
  MessageSquare, Mail, Phone, MapPin, ExternalLink,
  ChevronRight, PlayCircle, Star
} from 'lucide-react';
import { simulationDatabase } from '../services/simulationData';

interface LandingProps {
  onViewChange: (view: 'landing' | 'search') => void;
}

const Landing: React.FC<LandingProps> = ({ onViewChange }) => {
  const handleShowSimulationCreator = () => onViewChange('search');

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleShowSimulationCreator();
    }
  };

  const stats = [
    { label: 'Nền Tảng Đa Năng', value: 'AI', icon: <Sparkles size={20}/> },
    { label: 'Chủ Đề Tiêu Biểu', value: '4+', icon: <BookOpen size={20}/> },
    { label: 'Hiệu Quả Tối Đa', value: '80%', icon: <Trophy size={20}/> },
    { label: 'Khối Lượng Dữ Liệu', value: `${simulationDatabase.length}+`, icon: <Database size={20}/> },
  ];

  return (
    <div className="w-full bg-[#f8fafc] flex flex-col gap-16 md:gap-20 pb-16 md:pb-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[78vh] w-full flex items-center justify-center pt-6 md:pt-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-100/50 to-transparent -z-10 rounded-l-[100px]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-400/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="section-container flex flex-col lg:flex-row items-center gap-12 md:gap-14">
          <div className="flex-1 text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-100 text-sky-600 font-bold text-sm shadow-sm animate-bounce-slow">
              <Sparkles size={16} />
              <span>Nền tảng AI Giáo dục hàng đầu Việt Nam</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Giảng dạy sáng tạo <br/>
              với <span className="header-gradient">Simulab AI</span> <br/>
              thế hệ mới
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
              Giúp giáo viên tiết kiệm hàng giờ soạn giáo án, tạo đề thi và mô phỏng tương tác chỉ trong vài giây với công nghệ AI tiên tiến.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => onViewChange('search')}
                className="btn-primary py-5 px-10 text-lg shadow-xl shadow-sky-600/30 group"
              >
                Trải Nghiệm Ngay
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </button>
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
                <Sparkles size={24}/>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trải Nghiệm</div>
                <div className="text-sm font-black text-slate-800">Thân thiện, Tương tác</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto w-full px-4 -mt-12 md:-mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[48px] border border-slate-100 backdrop-blur-3xl">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-3">
              <div className="size-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-inner">
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI SIMULATION GENERATION FEATURE */}
      <section id="features" className="section-container space-y-12 md:space-y-14">
        <style>{`
          @keyframes swing {
            0% { transform: rotate(25deg); }
            100% { transform: rotate(-25deg); }
          }
          @keyframes springStretch {
            0%, 100% { height: 40px; }
            50% { height: 90px; }
          }
        `}</style>
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">Biến Ý Tưởng Thành <br/><span className="header-gradient">Mô Phỏng Tương Tác</span></h2>
          <p className="text-slate-500 text-xl font-medium">Chỉ với những dòng mô tả đơn giản bằng tiếng Việt, Simulab AI sẽ tự động thiết kế các mô hình ảo hoá trực quan dành riêng cho bài giảng của bạn.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-14 items-center">
          {/* Feature text & list */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-600 font-bold text-sm border border-sky-200 shadow-sm">
                <Sparkles size={16} />
                <span>Hoàn Toàn Tự Động</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900">Xây dựng thế giới trực quan với Simulab AI</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Chỉ cần đóng vai người đạo diễn và đưa ra ý tưởng. Hệ thống trí tuệ nhân tạo sẽ tự động xây dựng bối cảnh và tương tác trong vài giây, tái hiện các hiện tượng Vật lý, phản ứng Hoá học hay Toán học một cách chân thực nhất để giảng dạy.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Hỗ trợ Đa Môn Học', desc: 'Vật lý, Hoá học, Toán hay Sinh học, bất kỳ khái niệm nào bạn muốn mô hình hoá.', icon: <Database className="text-sky-600" /> },
                { title: 'Tương Tác Thời Gian Thực', desc: 'Học sinh có thể tự do điều chỉnh thông số, thay đổi biến số và quan sát kết quả.', icon: <PlayCircle className="text-sky-600" /> },
                { title: 'Tinh Chỉnh Bằng Chữ', desc: 'Chưa ưng ý? Gõ thêm yêu cầu để AI tinh chỉnh màu sắc, số liệu hay chức năng.', icon: <MessageSquare className="text-sky-600" /> }
              ].map((ft, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-sky-900/5 transition-all border border-transparent hover:border-sky-50 group">
                  <div className="p-3 bg-sky-50 rounded-2xl group-hover:bg-sky-100 transition-colors">
                    {ft.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{ft.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">{ft.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onViewChange('search')}
              className="btn-primary w-full sm:w-auto justify-center group"
            >
              Tạo mô phỏng đầu tiên <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Visualization Graphic */}
          <div className="relative">
            <div className="absolute inset-0 bg-sky-200/50 blur-[100px] rounded-full"></div>
            <div className="relative bg-white border-2 border-sky-50 rounded-[40px] shadow-2xl overflow-hidden shadow-sky-900/10">
              {/* Fake Browser header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-sky-50 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="size-3 rounded-full bg-rose-400"></div>
                  <div className="size-3 rounded-full bg-amber-400"></div>
                  <div className="size-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="bg-white text-xs text-slate-400 px-4 py-1.5 rounded-full flex-1 text-center font-bold border border-sky-50 shadow-sm mx-4 flex items-center justify-center gap-2">
                  <MonitorPlay size={12} className="text-sky-600"/>
                  Mô phỏng 3D: Hệ Mặt Trời
                </div>
              </div>
              {/* Fake Content */}
              <div className="p-8 aspect-square flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-slate-50/50 overflow-hidden">
                <div className="absolute top-4 right-4 bg-sky-100 text-sky-700 text-[10px] font-black uppercase px-3 py-1 rounded-full animate-pulse border border-sky-200 z-10 shadow-sm">
                  Chế Độ Tương Tác
                </div>
                
                {/* Visual Solar System animation logic */}
                <div className="relative size-40 flex items-center justify-center mt-8">
                  {/* Orbit Track */}
                  <div className="absolute inset-0 rounded-full border-2 border-sky-200/60 border-dashed"></div>
                  
                  {/* Sun */}
                  <div className="size-14 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_0_40px_rgba(251,191,36,0.5)] z-10 flex items-center justify-center">
                    <div className="size-8 rounded-full bg-white/30 blur-[4px]"></div>
                  </div>

                  {/* Planet Container (rotates) */}
                  <div className="absolute w-full h-full animate-[spin_4s_linear_infinite]">
                    {/* Planet */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 size-7 bg-white p-1 rounded-full shadow-lg border border-sky-100">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-sky-600"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 w-full max-w-[200px] bg-white border border-sky-100 p-4 rounded-2xl shadow-xl shadow-sky-900/5 z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tốc độ quỹ đạo</span>
                    <span className="text-xs font-black text-sky-600">x1.5</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-sky-400 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-white border-2 border-sky-600 rounded-full shadow"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating element */}
            <div className="absolute -left-6 top-1/2 p-4 bg-slate-900 text-white rounded-3xl shadow-2xl flex items-center gap-4 border-4 border-white animate-float z-20">
               <div className="p-3 bg-slate-800 rounded-2xl"><MessageSquare size={20} className="text-sky-400"/></div>
               <div className="text-sm font-medium">"Trợ lý tăng tốc độ quay <br/>của Trái Đất lên nhé"</div>
            </div>
          </div>
        </div>

        {/* Integrated Gallery inside the same section */}
          <div className="pt-6 w-full border-t border-sky-100">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-10 pt-6">
            <h3 className="text-3xl font-black text-slate-900">Và Không Giới Hạn Khả Năng Tiềm Ẩn</h3>
            <p className="text-slate-500 text-lg">Áp dụng cho mọi cấp học và lĩnh vực, từ nguyên tử vi mô đến quỹ đạo vũ trụ vĩ mô.</p>
          </div>

          <div className="mx-auto grid max-w-[1560px] grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-10">
          
          {/* Card 1: Physics / Optics */}
          <div onClick={handleShowSimulationCreator} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} className="group bg-white rounded-[32px] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/10 transition-all flex flex-col h-full overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-100">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              {/* Fake Prism */}
              <div className="relative w-24 h-24 flex items-center justify-center -translate-y-2">
                 {/* Prism triangle */}
                 <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[52px] border-b-indigo-200/50 backdrop-blur-sm z-10 relative shadow-2xl shadow-indigo-500/20 drop-shadow-lg scale-110"></div>
                 {/* White light beam */}
                 <div className="absolute top-1/2 -left-[60px] w-20 h-1 bg-white shadow-[0_0_10px_white] rotate-12 -translate-y-1/2 z-20 mix-blend-screen"></div>
                 <div className="absolute top-1/2 -left-[80px] w-28 h-1 bg-white shadow-[0_0_15px_white] rotate-12 -translate-y-1/2 blur-[1px]"></div>
                 {/* Rainbow beams */}
                 <div className="absolute top-1/2 right-[-60px] w-20 h-[2px] bg-red-400 rotate-[-10deg] shadow-[0_0_8px_red] blur-[1px]"></div>
                 <div className="absolute top-1/2 right-[-60px] w-20 h-[2px] bg-yellow-400 rotate-[-15deg] shadow-[0_0_8px_yellow] blur-[1px]"></div>
                 <div className="absolute top-1/2 right-[-60px] w-20 h-[2px] bg-emerald-400 rotate-[-20deg] shadow-[0_0_8px_green] blur-[1px]"></div>
                 <div className="absolute top-1/2 right-[-60px] w-20 h-[2px] bg-blue-400 rotate-[-25deg] shadow-[0_0_8px_blue] blur-[1px]"></div>
                 <div className="absolute top-1/2 right-[-60px] w-20 h-[2px] bg-purple-400 rotate-[-30deg] shadow-[0_0_8px_purple] blur-[1px]"></div>
              </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Vật Lý</div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">Tán Sắc Ánh Sáng</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Bộ lăng kính ảo cho phép học sinh tự do điều chỉnh góc chiếu và độ rộng chùm sáng để khám phá quang phổ và sự khúc xạ vô cùng an toàn.</p>
            </div>
          </div>

          {/* Card 2: Biology / Cell */}
          <div onClick={handleShowSimulationCreator} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} className="group bg-white rounded-[32px] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all flex flex-col h-full overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-100">
               {/* Organic Cell mockup */}
               <div className="relative size-24 bg-emerald-100 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] border-4 border-emerald-300 shadow-[inset_0_0_20px_rgba(52,211,153,0.5)] animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] transition-all flex items-center justify-center overflow-hidden">
                  <div className="size-8 bg-purple-400 rounded-full opacity-80 blur-[2px] shadow-lg absolute"></div>
                  <div className="size-3 bg-emerald-400 rounded-full absolute top-4 left-4 blur-[1px]"></div>
                  <div className="size-4 bg-rose-400 rounded-full border-2 border-rose-500 absolute bottom-4 right-6"></div>
                  <div className="size-2 bg-amber-400 rounded-full absolute bottom-1/2 left-3"></div>
               </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Sinh Học</div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">Cấu Trúc Tế Bào 3D</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Học sinh có thể bóc tách từng lớp cấu tạo của tế bào động thực vật, tìm hiểu chức năng của từng bào quan thông qua chạm tương tác.</p>
            </div>
          </div>

          {/* Card 3: Chemistry / Titration */}
          <div onClick={handleShowSimulationCreator} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} className="group bg-white rounded-[32px] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-rose-900/10 transition-all flex flex-col h-full overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-colors"></div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-100">
               {/* Beaker setup */}
               <div className="relative mt-8 flex flex-col items-center">
                  {/* Drop */}
                  <div className="size-2 bg-sky-400 rounded-full rounded-t-sm rotate-45 animate-bounce absolute -top-8 opacity-70 blur-[1px] shadow-[0_10px_20px_rgba(56,189,248,0.8)]"></div>
                  {/* Flask */}
                  <div className="w-12 h-14 border-l-4 border-r-4 border-b-4 border-white bg-slate-200/50 backdrop-blur-md rounded-b-xl relative overflow-hidden shadow-2xl z-10 flex items-end">
                     {/* Liquid */}
                     <div className="w-full h-1/2 bg-rose-400 group-hover:bg-purple-500 transition-colors duration-1000 origin-bottom scale-y-[1] animate-pulse">
                        <div className="absolute inset-0 bg-white/20 -translate-y-2 blur-[2px] animate-[spin_3s_linear_infinite]"></div>
                     </div>
                  </div>
                  {/* Stand fake */}
                  <div className="w-20 h-1.5 bg-slate-300 rounded mt-1 shadow-sm"></div>
               </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="inline-block px-3 py-1 bg-rose-50 text-rose-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Hoá Học</div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">Chuẩn Độ Dung Dịch</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Giả lập phòng thí nghiệm trọn vẹn. Đo lường nồng độ chuẩn xác và mô phỏng phản ứng đổi màu ngay lập tức mà không lo rủi ro cháy nổ.</p>
            </div>
          </div>

          {/* Card 4: Math / Graphs */}
          <div onClick={handleShowSimulationCreator} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} className="group bg-white rounded-[32px] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-sky-900/10 transition-all flex flex-col h-full overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-colors"></div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-100">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] bg-[length:15px_15px] opacity-30"></div>
               {/* Math Graph svg */}
               <svg className="w-full h-full relative z-10 p-4" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
                 <path d="M0,25 Q25,-10 50,25 T100,25" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-sky-400 drop-shadow-[0_0_5px_rgba(56,189,248,0.8)]" strokeDasharray="150" strokeDashoffset="0">
                   <animate attributeName="stroke-dashoffset" values="150;0" dur="2.5s" repeatCount="indefinite" />
                 </path>
                 <circle cx="50" cy="25" r="2" fill="currentColor" className="text-blue-600 animate-ping opacity-70" />
                 {/* X Y axis */}
                 <line x1="50" y1="0" x2="50" y2="50" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2" />
                 <line x1="0" y1="25" x2="100" y2="25" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2" />
               </svg>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="inline-block px-3 py-1 bg-sky-50 text-sky-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Toán Học</div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">Đồ Thị Hàm Số</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Di chuyển hệ số bằng thanh trượt trực quan và chứng kiến đường cong đồ thị dịch chuyển theo thời gian thực vô cùng mượt mà.</p>
            </div>
          </div>

          {/* Card 5: Physics / Pendulum */}
          <div onClick={handleShowSimulationCreator} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} className="group bg-white rounded-[32px] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-cyan-900/10 transition-all flex flex-col h-full overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-100">
               <div className="absolute inset-0 bg-gradient-to-b from-white via-cyan-50/30 to-slate-50"></div>
               {/* Pendulum */}
               <div className="relative z-10 flex flex-col items-center">
                 {/* Pivot */}
                 <div className="w-20 h-2 bg-slate-300 rounded-full shadow-sm"></div>
                 {/* Arm + Ball */}
                 <div className="origin-top" style={{ animation: 'swing 2s ease-in-out infinite alternate' }}>
                   <div className="w-[3px] h-20 bg-gradient-to-b from-slate-400 to-slate-300 mx-auto rounded-full"></div>
                   <div className="size-10 bg-gradient-to-br from-cyan-400 to-sky-600 rounded-full mx-auto -mt-1 shadow-[0_8px_30px_rgba(6,182,212,0.5)] border-2 border-white/50 flex items-center justify-center">
                     <div className="size-4 bg-white/30 rounded-full blur-[2px]"></div>
                   </div>
                 </div>
                 {/* Shadow on floor */}
                 <div className="w-8 h-2 bg-slate-200 rounded-full blur-[3px] mt-3 opacity-60"></div>
               </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="inline-block px-3 py-1 bg-cyan-50 text-cyan-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Vật Lý</div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors">Con Lắc Đơn</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Quan sát chuyển động dao động điều hoà, thay đổi chiều dài dây và góc lệch ban đầu để nghiên cứu chu kỳ và năng lượng.</p>
            </div>
          </div>

          {/* Card 6: Astronomy / Solar System */}
          <div onClick={handleShowSimulationCreator} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} className="group bg-white rounded-[32px] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-amber-900/10 transition-all flex flex-col h-full overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors"></div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-100">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.95),_rgba(30,41,59,1))]"></div>
               {/* Stars */}
               <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               {/* Solar system */}
               <div className="relative z-10 size-36 flex items-center justify-center">
                 {/* Orbit rings */}
                 <div className="absolute inset-[22%] rounded-full border border-white/10"></div>
                 <div className="absolute inset-[8%] rounded-full border border-white/8"></div>
                 <div className="absolute inset-0 rounded-full border border-white/5"></div>
                 {/* Sun */}
                 <div className="size-8 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_0_30px_rgba(251,191,36,0.7)] z-10 flex items-center justify-center">
                   <div className="size-4 rounded-full bg-white/30 blur-[3px]"></div>
                 </div>
                 {/* Planet 1 - orbiting */}
                 <div className="absolute inset-[22%] animate-[spin_4s_linear_infinite]">
                   <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 bg-sky-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.9)]"></div>
                 </div>
                 {/* Planet 2 - orbiting */}
                 <div className="absolute inset-[8%] animate-[spin_7s_linear_infinite_reverse]">
                   <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-2.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.9)]"></div>
                 </div>
                 {/* Planet 3 - orbiting */}
                 <div className="absolute inset-0 animate-[spin_11s_linear_infinite]">
                   <div className="absolute -top-1 left-1/2 -translate-x-1/2 size-2 bg-rose-400 rounded-full shadow-[0_0_6px_rgba(251,113,133,0.9)]"></div>
                 </div>
               </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="inline-block px-3 py-1 bg-amber-50 text-amber-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Thiên Văn</div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">Hệ Mặt Trời Thu Nhỏ</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Quan sát các hành tinh quay quanh Mặt Trời với tốc độ khác nhau, điều chỉnh quỹ đạo và vận tốc để khám phá thiên văn học.</p>
            </div>
          </div>

          {/* Card 7: Geography / Earth Core */}
          <div onClick={handleShowSimulationCreator} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} className="group bg-white rounded-[32px] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-amber-900/10 transition-all flex flex-col h-full overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors"></div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-100">
               {/* Core mockup */}
               <div className="relative size-32 bg-red-400 rounded-full border-4 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] flex items-center justify-center overflow-hidden">
                  <div className="absolute w-full h-1/2 bg-amber-900/20 top-0 backdrop-blur-[1px]"></div>
                  <div className="size-20 bg-orange-400 rounded-full flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                     <div className="size-10 bg-amber-300 rounded-full flex items-center justify-center shadow-[0_0_20px_white]">
                        <div className="size-4 bg-white/80 rounded-full blur-[1px]"></div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="inline-block px-3 py-1 bg-amber-50 text-amber-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Địa Lý</div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">Cấu Trúc Trái Đất</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Bóc tách từng lớp vỏ, lớp manti và lõi ngoài của Trái Đất. Quan sát dòng đối lưu nhiệt dung nham vô cùng chân thực.</p>
            </div>
          </div>

          {/* Card 8: Physics / Mechanics */}
          <div onClick={handleShowSimulationCreator} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} className="group bg-white rounded-[32px] p-6 border border-sky-50 shadow-sm hover:shadow-2xl hover:shadow-violet-900/10 transition-all flex flex-col h-full overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-colors"></div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-slate-100">
               {/* Spring mockup */}
               <div className="flex flex-col items-center mt-[-30px]">
                  <div className="w-16 h-2 bg-slate-300 rounded-full"></div>
                  {/* CSS Spring */}
                  <div className="w-8 relative flex flex-col overflow-hidden" style={{ animation: 'springStretch 2s ease-in-out infinite' }}>
                    <div className="w-[2px] h-full bg-slate-400 mx-auto opacity-30 absolute left-1/2 -translate-x-1/2"></div>
                    <div className="w-full h-full flex flex-col justify-around py-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-full h-[4px] bg-slate-400 rotate-[-15deg] rounded-full my-0.5 shadow-sm"></div>
                      ))}
                    </div>
                  </div>
                  {/* CSS Weight */}
                  <div className="size-10 bg-violet-500 rounded-xl shadow-lg border-2 border-white flex items-center justify-center relative z-10 shadow-violet-500/40">
                     <div className="w-4 h-1 bg-white/50 rounded-full"></div>
                  </div>
               </div>
            </div>
            <div className="space-y-2 flex-grow">
              <div className="inline-block px-3 py-1 bg-violet-50 text-violet-600 font-bold text-[10px] uppercase tracking-widest rounded-full mb-2">Vật Lý</div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-violet-600 transition-colors">Con Lắc Lò Xo</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Thay đổi độ cứng tĩnh, xem các yếu tố lực ma sát và trọng lượng tác động lên dao động điều hoà.</p>
            </div>
          </div>
        </div>
        </div>

        <div className="text-center pt-4 md:pt-6">
          <button 
            onClick={() => onViewChange('search')}
            className="btn-secondary py-5 px-12 group mx-auto inline-flex"
          >
            Tự tạo mô phỏng của bạn
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
              Trong kỷ nguyên số, giáo dục không chỉ là truyền đạt kiến thức mà còn là khơi dậy niềm đam mê học hỏi. Simulab ra đời với mong muốn cung cấp các công cụ mô phỏng trực quan, sinh động, giúp tiết học trở nên thú vị hơn bao giờ hết.
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
            { step: '01', title: 'Chọn Công Cụ', desc: 'Duyệt qua kho công cụ Simulab đa dạng và chọn chức năng bạn cần.', icon: <Search size={28}/> },
            { step: '02', title: 'Nhập Nội Dung', desc: 'Mô tả ngắn gọn yêu cầu hoặc tải tài liệu lên để Simulab xử lý.', icon: <Sparkles size={28}/> },
            { step: '03', title: 'Nhận Kết Quả', desc: 'Simulab trả về cảnh quan 3D hoặc mô phỏng tương tác. Lưu lại và sử dụng ngay!', icon: <ArrowRight size={28}/> },
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
                    Sử dụng nền tảng Simulab để tự do sáng tạo ra các bài giảng sinh động và biến mỗi không gian lớp học thành một trải nghiệm thú vị.
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
