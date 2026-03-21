import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts, BlogPost } from '../services/blogData';

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <div className="w-full pb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <section className="section-container max-w-4xl mx-auto space-y-8 pt-6">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-sky-600 font-bold transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Trở lại danh sách
          </button>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-sky-600 uppercase tracking-widest">
              <span className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full"><Calendar size={16} /> {selectedPost.date}</span>
              <span className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full"><User size={16} /> {selectedPost.author}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              {selectedPost.title}
            </h1>
            
            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative my-10">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            <div 
              className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-sky-600 prose-img:rounded-3xl prose-p:leading-relaxed prose-li:marker:text-sky-500"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full pb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <section className="section-container text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">Góc Chia Sẻ</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Cập nhật những tin tức, kiến thức và kinh nghiệm thực chiến mới nhất về ứng dụng AI trong giảng dạy.
        </p>
      </section>

      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map(post => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-sky-50 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col group cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-sky-600 mb-4 font-bold uppercase tracking-widest bg-sky-50 w-fit px-3 py-1 rounded-full">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-600 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sky-600 font-black hover:text-sky-800 transition-colors mt-auto uppercase text-sm tracking-wider">
                  Đọc full bài <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
