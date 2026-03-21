import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Ứng dụng AI trong việc soạn giáo án điện tử",
    excerpt: "Khám phá cách sử dụng trí tuệ nhân tạo để tự động hóa việc chuẩn bị bài giảng, tiết kiệm đến 80% thời gian cho giáo viên.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
    date: "15 Tháng 10, 2023",
    author: "Nguyễn Minh Hiếu"
  },
  {
    id: 2,
    title: "5 Công cụ mô phỏng Vật lý tốt nhất 2023",
    excerpt: "Tổng hợp các phần mềm và website hỗ trợ tạo mô phỏng hiện tượng Vật lý trực quan, giúp học sinh dễ dàng nắm bắt kiến thức.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600",
    date: "02 Tháng 11, 2023",
    author: "Ban Biên Tập"
  },
  {
    id: 3,
    title: "Hướng dẫn tạo game học tập bằng ChatGPT",
    excerpt: "Từng bước sử dụng ChatGPT để xây dựng các trò chơi tương tác ngay trên lớp học mà không cần biết lập trình chuyên sâu.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    date: "20 Tháng 11, 2023",
    author: "Nguyễn Minh Hiếu"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="w-full pb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <section className="section-container text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">Góc Chia Sẻ</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Cập nhật những tin tức, kiến thức và kinh nghiệm mới nhất về ứng dụng công nghệ trong giảng dạy.
        </p>
      </section>

      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-sky-50 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 font-medium">
                  <span className="flex items-center gap-1"><Calendar size={16} className="text-sky-600"/> {post.date}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 line-clamp-3 mb-6 flex-1">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-sky-600 font-bold hover:text-sky-800 transition-colors mt-auto">
                  Đọc tiếp <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
