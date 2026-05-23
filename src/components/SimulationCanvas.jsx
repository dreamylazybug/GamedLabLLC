import React, { useState, useEffect, useRef } from 'react';

export default function SimulationCanvas({ activeQuestion }) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simTime, setSimTime] = useState(0);

  // Toggle play/pause states
  const toggleSimulation = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset the simulation clock
  const resetSimulation = () => {
    setIsPlaying(false);
    setSimTime(0);
  };

  // Reset simulation whenever the active question file changes
  useEffect(() => {
    resetSimulation();
  }, [activeQuestion]);

  // Core physics animation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set high-DPI canvas resolution sizing
    const resizeCanvas = () => {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = 400 * 2;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `400px`;
      ctx.scale(2, 2);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      // Clear display for next physics layout tick
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw mathematical background grid matrix
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width / 2; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 400);
        ctx.stroke();
      }
      for (let y = 0; y < 400; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width / 2, y);
        ctx.stroke();
      }

      // Safeguard against missing active simulation files
      if (!activeQuestion) {
        ctx.fillStyle = '#64748b';
        ctx.font = '13px ui-mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Awaiting Physics Vector Inputs... Select a module to begin.', canvas.width / 4, 200);
        return;
      }

      // Draw active environment boundary framework
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, (canvas.width / 2) - 40, 360);

      // Render custom physics vector coordinates based on the selected question data
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(activeQuestion.title || 'Kinetic Simulation Environment', 40, 50);

      // Simple kinematic placeholder render loop
      const centerX = (canvas.width / 4);
      const centerY = 200;
      const radius = 25;
      
      // Calculate dynamic displacement offset using time variables
      const offsetX = isPlaying ? Math.sin(simTime * 0.05) * 80 : Math.sin(simTime * 0.05) * 80;

      // Draw coordinate vector path line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + offsetX, centerY);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dashes

      // Draw the primary kinetic particle boundary
      ctx.fillStyle = '#6366f1';
      ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(centerX + offsetX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset canvas shadows

      // Draw origin axis anchor indicator node
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Update simulation time delta ticks if the simulation state is running
      if (isPlaying) {
        setSimTime((prev) => prev + 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, simTime, activeQuestion]);

  return (
    <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Kinetic Execution Frame</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSimulation}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              isPlaying 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20' 
                : 'bg-sky-500 text-slate-950 border-sky-400 hover:bg-sky-400'
            }`}
          >
            {isPlaying ? 'Pause Motor' : 'Execute Step'}
          </button>
          <button
            onClick={resetSimulation}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60 hover:bg-slate-700"
          >
            Reset Array
          </button>
        </div>
      </div>
      <div className="relative bg-slate-950">
        <canvas ref={canvasRef} className="block w-full" />
      </div>
    </div>
  );
}
