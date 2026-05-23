import React from 'react';

export default function QuestionBank({ questions, onSelectQuestion, activeQuestion }) {
  return (
    <div className="space-y-3 max-h-[680px] overflow-y-auto pr-2 custom-scrollbar">
      {questions.map((q) => {
        const isSelected = activeQuestion && activeQuestion.id === q.id;

        return (
          <button
            key={q.id}
            onClick={() => onSelectQuestion(q)}
            className={`w-full text-left group relative p-5 rounded-xl border transition-all duration-200 block overflow-hidden ${
              isSelected
                ? 'bg-slate-900 border-sky-500/60 shadow-lg shadow-sky-950/20'
                : 'bg-slate-950/40 border-slate-900/80 hover:border-slate-800 hover:bg-slate-900/20'
            }`}
          >
            {/* Active Indicator Glow */}
            {isSelected && (
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-sky-400 to-indigo-500" />
            )}

            <div className="flex items-start justify-between gap-4 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 group-hover:text-sky-400/80 transition-colors">
                Module {q.id} // Vector Input
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                q.difficulty === 'Hard' 
                  ? 'bg-rose-500/5 border-rose-500/10 text-rose-400' 
                  : q.difficulty === 'Medium'
                  ? 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                  : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'
              }`}>
                {q.difficulty}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-1">
              {q.title}
            </h3>
            
            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-medium">
              {q.question}
            </p>
          </button>
        );
      })}
    </div>
  );
}
