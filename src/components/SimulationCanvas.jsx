```jsx
import React, { useEffect, useRef, useState } from 'react';

export default function SimulationCanvas({ activeQuestion }) {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simTime, setSimTime] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Setup high-DPI display calibration
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr;
    canvas.height = 360 * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '360px';
    ctx.scale(dpr, dpr);

    let t = simTime;

    const render = () => {
      // Clear frame with deep slate workspace background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, 600, 360);

      // Draw grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 600; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 360); ctx.stroke();
      }
      for (let j = 0; j < 360; j += 40) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(600, j); ctx.stroke();
      }

      // Draw baseline ground
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(30, 320); ctx.lineTo(570, 320); ctx.stroke();

      if (activeQuestion?.id === 'kin_001') {
        // Projectile Motion Model
        const v0 = activeQuestion.simParams.velocity || 35;
        const angleRad = (activeQuestion.simParams.angle || 60) * Math.PI / 180;
        const g = 9.8;

        // Scaling values: meters to pixels mapping
        const scaleX = 4.5;
        const scaleY = 4.5;
        const startX = 50;
        const startY = 320;

        // Calculate current real-time coordinates
        const posX = startX + (v0 * Math.cos(angleRad) * t) * scaleX;
        const posY = startY - (v0 * Math.sin(angleRad) * t - 0.5 * g * t * t) * scaleY;

        // Trace standard mathematical trajectory path path
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for (let stepT = 0; stepT <= 10; stepT += 0.05) {
          const tx = startX + (v0 * Math.cos(angleRad) * stepT) * scaleX;
          const ty = startY - (v0 * Math.sin(angleRad) * stepT - 0.5 * g * stepT * stepT) * scaleY;
          if (ty > startY) break;
          ctx.lineTo(tx, ty);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Render current vector element
        if (posY <= startY) {
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(posX, posY, 8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Flat land impact position indicator
          ctx.fillStyle = '#ef4444';
          const finalX = startX + (v0 * Math.cos(angleRad) * ((2 * v0 * Math.sin(angleRad)) / g)) * scaleX;
          ctx.beginPath(); ctx.arc(finalX, startY, 6, 0, Math.PI * 2); ctx.fill();
        }

      } else if (activeQuestion?.id === 'dyn_001') {
        // Dome sliding vector simulation
        const centerX = 300;
        const centerY = 320;
        const R = activeQuestion.simParams.radius || 100;

        // Draw physical circular surface boundary
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, R, Math.PI, 0, false);
        ctx.stroke();

        // Slide kinetics logic tracking angular decay
        const theta = Math.min(Math.PI / 2, (t * 0.4)); 
        const currentAngle = -Math.PI / 2 + theta;

        const objX = centerX + R * Math.cos(currentAngle);
        const objY = centerY + R * Math.sin(currentAngle);

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(objX, objY, 7, 0, Math.PI * 2);
        ctx.fill();

        // Point of physical detachment line (h = 2R/3)
        const detachY = centerY - (2 * R) / 3;
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(centerX - R, detachY); ctx.lineTo(centerX + R, detachY); ctx.stroke();
        ctx.setLineDash([]);
      }

      if (isPlaying) {
        t += 0.016; // increment approximate physics time steps
        setSimTime(t);
        animationRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, activeQuestion, simTime]);

  const toggleSimulation = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setSimTime(0);
  };

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
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isPlaying ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-sky-500 text-slate-950 hover:bg-sky-400'
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
