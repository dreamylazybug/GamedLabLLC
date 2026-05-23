```jsx
import React, { useState, useEffect } from 'react';
import QuestionBank from '../components/QuestionBank';
import SimulationCanvas from '../components/SimulationCanvas';
import questionData from '../data/questions.json';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    // Instantiate our core data bank matrix
    setQuestions(questionData);
    if (questionData.length > 0) {
      setActiveQuestion(questionData[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans antialiased selection:bg-sky-500/30 selection:text-sky-200">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Persistent Global Navigation Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <span className="text-slate-950 font-black text-sm tracking-tighter">GL</span>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider uppercase text-slate-200">GamedLabLLC</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-normal">Physical AI STEM Simulation Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-400">
              STABLE_BUILD_v1.0.4
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Tasks Matrix (Takes 5 Grid Blocks) */}
          <section className="lg:col-span-5 space-y-4">
            <div className="px-1">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-100">Physics Syllabus Modules</h2>
              <p className="text-xs text-slate-400 mt-1">Select a conceptual problem file to load vector fields into the canvas.</p>
            </div>
            <QuestionBank 
              questions={questions} 
              onSelectQuestion={setActiveQuestion} 
              activeQuestion={activeQuestion} 
            />
          </section>

          {/* Right Column: Dynamic Kinetic Processing Space (Takes 7 Grid Blocks) */}
          <section className="lg:col-span-7 space-y-6">
            <SimulationCanvas activeQuestion={activeQuestion} />
            
            {/* Contextual Technical Analysis Card */}
            {activeQuestion && (
              <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sky-500/50" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Mathematical Logic Breakdown</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900/40 border border-slate-900 p-4 rounded-xl">
                  {activeQuestion.explanation}
                </p>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}
