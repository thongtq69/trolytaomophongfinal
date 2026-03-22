import React from 'react';
import { Users, Target, Heart, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="w-full pb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <section className="section-container text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">Về Chúng Tôi</h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          Chúng tôi là những giáo viên và kỹ sư đam mê giáo dục, với sứ mệnh mang công nghệ AI tiên tiến nhất đến từng lớp học tại Việt Nam.
        </p>
      </section>

      <section className="section-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <img src="/assets/mission.png" alt="Sứ mệnh" className="rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'; }} />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Trong kỷ nguyên số, giáo dục không chỉ là truyền đạt kiến thức mà còn là khơi dậy niềm đam mê học hỏi. Simulab ra đời với mong muốn cung cấp các công cụ mô phỏng trực quan, sinh động, giúp tiết học trở nên thú vị hơn bao giờ hết.
          </p>
          <ul className="space-y-4">
            {[
              { icon: <Target className="text-sky-600" />, text: "Xây dựng ngân hàng giáo án tương tác phong phú" },
              { icon: <Sparkles className="text-sky-600" />, text: "Tích hợp AI để tự động hoá tối đa công việc chuẩn bị" },
              { icon: <Heart className="text-sky-600" />, text: "Lan toả tình yêu giảng dạy và trải nghiệm hiện đại" }
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 text-slate-700 font-medium text-lg">
                <div className="p-2 bg-sky-100 rounded-xl">{item.icon}</div>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
