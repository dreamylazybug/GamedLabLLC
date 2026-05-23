```jsx
import React from 'react';

export default function QuestionBank({ questions, onSelectQuestion, activeQuestion }) {
  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold tracking-tight text-slate-200">Interactive Task Matrix</h3>
        <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
          Syllabus v1.0
        </span>
      </div>

      <div className="space-y-4">
        {questions.map((q) => {
          const isSelected = activeQuestion?.id === q.id;
          return (
            <div 
              key={q.id}
              onClick={() => onSelectQuestion(q)}
              className={`group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 border-sky-500/60 shadow-lg shadow-sky-950/20' 
                  : 'bg-slate-950/40 border-slate-900/80 hover:border-slate-800 hover:bg-slate-900/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {q.id.toUpperCase()}
                  </span>
                  {q.exams.map((exam, i) => (
                    <span key={i} className="text-[10px] font-medium text-slate-500">
                      • {exam}
                    </span>
                  ))}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  q.difficulty === 'Complex' ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {q.difficulty}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium transition-colors group-hover:text-slate-200">
                {q.questionText}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {q.options.map((opt, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2 rounded-lg text-[11px] font-medium border transition-colors ${
                      isSelected
                        ? 'bg-slate-950 border-slate-800 text-slate-400'
                        : 'bg-slate-950/20 border-slate-950 text-slate-500'
                    }`}
                  >
                    <span className="text-slate-600 mr-1.5 font-bold">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
