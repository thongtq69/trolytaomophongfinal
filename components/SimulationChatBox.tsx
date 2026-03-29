import React, { useMemo, useState } from 'react';
import { Bot, Loader2, MessageSquareText, Send, Sparkles, User } from 'lucide-react';
import { AIResult, ChatMessage, SearchParams } from '../types';
import { askSimulationAssistant } from '../services/geminiService';

interface SimulationChatBoxProps {
  topic: string;
  params: SearchParams;
  result: AIResult;
  apiKey: string;
  model: string;
}

const quickPrompts = [
  'Giải thích nhanh mô phỏng này dùng để dạy gì',
  'Gợi ý 3 câu hỏi thảo luận trên lớp',
  'Muốn chỉnh sửa mô phỏng thì nên sửa phần nào trước?'
];

const createAssistantIntro = (topic: string): ChatMessage => ({
  id: `assistant-intro-${Date.now()}`,
  role: 'assistant',
  content: `Mình đã nạp toàn bộ ngữ cảnh của mô phỏng "${topic}" gồm yêu cầu đầu vào, HTML mô phỏng, hướng dẫn sử dụng và câu hỏi thực hành. Bạn có thể hỏi mình cách dùng, cách giảng dạy, cách chỉnh sửa hoặc giải thích nội dung của mô phỏng này.`
});

const SimulationChatBox: React.FC<SimulationChatBoxProps> = ({ topic, params, result, apiKey, model }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createAssistantIntro(topic)]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const contextFingerprint = useMemo(
    () => JSON.stringify({ topic, html: result.html, guide: result.guide, questions: result.questions, params }),
    [topic, result, params]
  );

  React.useEffect(() => {
    setMessages([createAssistantIntro(topic)]);
    setInput('');
    setError('');
  }, [contextFingerprint, topic]);

  const submitQuestion = async (rawQuestion?: string) => {
    const question = (rawQuestion ?? input).trim();
    if (!question || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const reply = await askSimulationAssistant(
        question,
        nextMessages,
        { params, result },
        apiKey,
        model
      );

      setMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: reply,
        }
      ]);
    } catch (err: any) {
      setError(err?.message || 'Không thể trả lời lúc này.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-[2rem] border border-emerald-100 bg-white/95 shadow-2xl shadow-emerald-900/5 overflow-hidden">
      <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex items-start gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Bot size={28} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">AI Chat Box</h3>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                <Sparkles size={12} />
                Context loaded
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Chatbox đã được nạp sẵn ngữ cảnh của mô phỏng, nên câu trả lời sẽ bám theo chủ đề, hướng dẫn, câu hỏi thực hành và mã HTML vừa tạo.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-4 pt-5 sm:px-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {quickPrompts.map(prompt => (
            <button
              key={prompt}
              type="button"
              onClick={() => submitQuestion(prompt)}
              disabled={isLoading}
              className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="custom-scrollbar max-h-[480px] space-y-4 overflow-y-auto rounded-[1.5rem] bg-slate-50 p-4 sm:p-5">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                  <Bot size={18} />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-relaxed shadow-sm ${message.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'border border-white bg-white text-slate-700'
                }`}
              >
                <div className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                  {message.role === 'user' ? <User size={12} /> : <MessageSquareText size={12} />}
                  {message.role === 'user' ? 'Bạn' : 'Simulab AI'}
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.role === 'user' && (
                <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-900/20">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="mt-1 flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <Bot size={18} />
              </div>
              <div className="rounded-[1.5rem] border border-white bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <Loader2 size={16} className="animate-spin text-emerald-600" />
                  Đang phân tích mô phỏng và soạn câu trả lời...
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitQuestion();
          }}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <textarea
            rows={3}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Hỏi về cách dùng, giải thích kiến thức, cách sửa mô phỏng, hoặc cách dạy trên lớp..."
            className="min-h-[84px] flex-1 rounded-[1.5rem] border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-[1.5rem] bg-emerald-600 px-6 py-4 text-sm font-black uppercase tracking-[0.15em] text-white shadow-xl shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            Gửi câu hỏi
          </button>
        </form>
      </div>
    </section>
  );
};

export default SimulationChatBox;
