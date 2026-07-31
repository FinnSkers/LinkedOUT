import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  DollarSign
} from 'lucide-react';
import { sfx } from '../utils/audio';

export default function SanityCalculator() {
  const [salary, setSalary] = useState(120000);
  const [weeklyHours, setWeeklyHours] = useState(55);
  const [weekendSlackMsgs, setWeekendSlackMsgs] = useState(12);
  const [micromanageLevel, setMicromanageLevel] = useState(4);
  const [rtoDays, setRtoDays] = useState(5);

  const expectedHours = 40;
  const overtimeHours = Math.max(0, weeklyHours - expectedHours);
  const hourlyRate = salary / (52 * expectedHours);
  const stolenOvertimeValue = Math.round(overtimeHours * hourlyRate * 52 * 1.5);
  
  const scoreOvertime = Math.min(35, (overtimeHours / 30) * 35);
  const scoreSlack = Math.min(25, (weekendSlackMsgs / 20) * 25);
  const scoreMicro = (micromanageLevel / 5) * 25;
  const scoreRto = (rtoDays / 5) * 15;
  
  const toxicityScore = Math.min(100, Math.round(scoreOvertime + scoreSlack + scoreMicro + scoreRto));

  const getToxicityVerdict = (score) => {
    if (score >= 80) return { title: "HAZARDOUS TOXIC WASTELAND ☣️", color: "text-[#ff0055]", desc: "Your workplace is draining your soul, health, and dignity. Quit immediately or demand a 300% hazard bonus." };
    if (score >= 60) return { title: "HIGH RISK BURNOUT ZONE 🚩", color: "text-amber-500", desc: "You are giving away hundreds of free overtime hours while suffering severe Sunday Scaries." };
    if (score >= 40) return { title: "MODERATELY DRAINED ⚠️", color: "text-yellow-400", desc: "Manageable, but watch out for incremental scope creep and boundary violations." };
    return { title: "HEALTHY PEACEFUL OASIS 🌴", color: "text-emerald-400", desc: "Your workplace actually respects boundaries. Treasure this rare unicorn!" };
  };

  const verdict = getToxicityVerdict(toxicityScore);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border-rose-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-black font-mono uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>WORKPLACE SANITY INDEX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Salary vs. Sanity <span className="text-gradient-fire">Calculator</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium">
          Quantify how much unpaid labor, stress, and weekend calls are costing you in real dollars and peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders Form */}
        <div className="lg:col-span-7 glow-card rounded-3xl p-6 space-y-6">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#ff0055]" />
            <span>Workload & Boundary Parameters</span>
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-slate-300">Annual Base Salary</span>
              <span className="text-emerald-400 font-mono text-sm">${salary.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="40000"
              max="350000"
              step="5000"
              value={salary}
              onChange={(e) => {
                sfx.playPop();
                setSalary(Number(e.target.value));
              }}
              className="w-full accent-[#ff0055] bg-slate-800 rounded-lg cursor-pointer h-2.5"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-slate-300">Actual Hours Worked Per Week</span>
              <span className="text-amber-400 font-mono text-sm">{weeklyHours} hours ({overtimeHours} hrs unpaid OT)</span>
            </div>
            <input
              type="range"
              min="35"
              max="90"
              step="1"
              value={weeklyHours}
              onChange={(e) => {
                sfx.playPop();
                setWeeklyHours(Number(e.target.value));
              }}
              className="w-full accent-[#ff0055] bg-slate-800 rounded-lg cursor-pointer h-2.5"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-slate-300">Weekend Slack / Email Pings per Month</span>
              <span className="text-purple-400 font-mono text-sm">{weekendSlackMsgs} pings</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={weekendSlackMsgs}
              onChange={(e) => {
                sfx.playPop();
                setWeekendSlackMsgs(Number(e.target.value));
              }}
              className="w-full accent-[#ff0055] bg-slate-800 rounded-lg cursor-pointer h-2.5"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-slate-300">Manager Micromanagement Intensity (1-5)</span>
              <span className="text-rose-400 font-mono text-sm">Level {micromanageLevel} / 5</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={micromanageLevel}
              onChange={(e) => {
                sfx.playPop();
                setMicromanageLevel(Number(e.target.value));
              }}
              className="w-full accent-[#ff0055] bg-slate-800 rounded-lg cursor-pointer h-2.5"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-slate-300">Mandatory Days in Office</span>
              <span className="text-cyan-400 font-mono text-sm">{rtoDays} days / week</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={rtoDays}
              onChange={(e) => {
                sfx.playPop();
                setRtoDays(Number(e.target.value));
              }}
              className="w-full accent-[#ff0055] bg-slate-800 rounded-lg cursor-pointer h-2.5"
            />
          </div>

        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glow-card rounded-3xl p-7 space-y-6 text-center relative overflow-hidden border-[#ff0055]/40 shadow-2xl">
            <div className="text-xs font-black uppercase tracking-widest text-slate-400">
              YOUR TOXICITY QUOTIENT
            </div>

            <div className="relative inline-flex items-center justify-center my-2">
              <div className="text-6xl font-black font-mono text-white tracking-tighter">
                {toxicityScore}<span className="text-3xl text-[#ff0055]">/100</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1">
              <div className={`text-base font-black ${verdict.color}`}>
                {verdict.title}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {verdict.desc}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10 text-left">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Stolen Overtime Value:</span>
                <span className="font-mono font-extrabold text-rose-400 text-sm">${stolenOvertimeValue.toLocaleString()} / yr</span>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Effective Hourly Wage:</span>
                <span className="font-mono font-bold text-slate-200">${Math.round(salary / (weeklyHours * 52))}/hr</span>
              </div>
            </div>

            <button 
              onClick={() => {
                sfx.playShred();
                alert("Remember: No salary is worth permanent burnout! Start polishing that resume today.");
              }}
              className="btn btn-primary w-full text-xs py-3.5 rounded-xl font-bold uppercase tracking-wider"
            >
              Get Recommended Exit Strategy
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
