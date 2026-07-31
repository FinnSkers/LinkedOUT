import React, { useState } from 'react';
import { 
  Calculator, 
  Clock, 
  Flame, 
  AlertTriangle, 
  Sparkles,
  TrendingDown,
  Building2,
  DollarSign
} from 'lucide-react';
import { sfx } from '../utils/audio';

export default function SanityCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(85000);
  const [expectedHours, setExpectedHours] = useState(40);
  const [actualHours, setActualHours] = useState(56);
  const [weekendWork, setWeekendWork] = useState(true);
  const [salaryDelayed, setSalaryDelayed] = useState(false);

  // Calculations in BDT (৳)
  const hourlyRateExpected = monthlySalary / (expectedHours * 4.33);
  const overtimeHoursPerWeek = Math.max(0, actualHours - expectedHours);
  const unpaidOvertimeMonthlyBDT = Math.round(overtimeHoursPerWeek * 4.33 * hourlyRateExpected);
  const unpaidOvertimeYearlyBDT = unpaidOvertimeMonthlyBDT * 12;

  const actualHourlyRate = Math.round(monthlySalary / (actualHours * 4.33));
  const wageLossPercentage = Math.round(((hourlyRateExpected - actualHourlyRate) / hourlyRateExpected) * 100);

  // Toxicity Score (0 - 100)
  let toxicityScore = 30;
  if (overtimeHoursPerWeek > 5) toxicityScore += 20;
  if (overtimeHoursPerWeek > 15) toxicityScore += 25;
  if (weekendWork) toxicityScore += 15;
  if (salaryDelayed) toxicityScore += 20;
  toxicityScore = Math.min(100, toxicityScore);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header Card */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black font-mono uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>BANGLADESH OVERTIME & SALARY DRAIN CALCULATOR (৳ BDT)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Calculate Your <span className="text-gradient-cyan">Real Hourly Wage (৳)</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          See how much money and time you lose to unpaid overtime, Saturday office hours, and late shifts in Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Parameters */}
        <div className="glow-card rounded-3xl p-6 space-y-5 bg-slate-900/90 border-white/10">
          <h3 className="text-lg font-black text-white pb-2 border-b border-white/10 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>Your Monthly Work Parameters</span>
          </h3>

          <div className="space-y-4 text-xs font-bold">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Monthly Base Salary (৳ BDT)</span>
                <span className="text-emerald-400 font-mono font-black">৳ {monthlySalary.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={400000}
                step={5000}
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Contracted Weekly Hours</span>
                <span className="text-cyan-400 font-mono font-black">{expectedHours} hrs/wk</span>
              </div>
              <input
                type="range"
                min={35}
                max={50}
                step={1}
                value={expectedHours}
                onChange={(e) => setExpectedHours(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Actual Weekly Hours Worked</span>
                <span className="text-[#ff0055] font-mono font-black">{actualHours} hrs/wk</span>
              </div>
              <input
                type="range"
                min={40}
                max={90}
                step={1}
                value={actualHours}
                onChange={(e) => setActualHours(Number(e.target.value))}
                className="w-full accent-[#ff0055] cursor-pointer"
              />
            </div>

            <div className="pt-2 space-y-2">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={weekendWork}
                  onChange={(e) => setWeekendWork(e.target.checked)}
                  className="accent-[#ff0055] w-4 h-4"
                />
                <span>Mandatory Saturday Office / Weekend Calls</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={salaryDelayed}
                  onChange={(e) => setSalaryDelayed(e.target.checked)}
                  className="accent-[#ff0055] w-4 h-4"
                />
                <span>Salary Regularly Delayed (1-2+ months)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Calculated Results Card */}
        <div className="glow-card rounded-3xl p-6 space-y-6 bg-slate-900/90 border-emerald-500/30 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase font-black">YOUR REAL COMPENSATION METRICS</span>
            
            <div className="mt-4 space-y-4">
              
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                <span className="text-xs text-slate-400 block font-bold">Unpaid Overtime Value Stolen</span>
                <span className="text-3xl font-black font-mono text-[#ff0055]">
                  ৳ {unpaidOvertimeYearlyBDT.toLocaleString()}<span className="text-xs text-slate-400">/year</span>
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  You work ~{overtimeHoursPerWeek * 4.33 | 0} unpaid extra hours every month in BD.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center font-mono">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Expected Hourly Rate</span>
                  <span className="text-lg font-extrabold text-emerald-400">৳ {Math.round(hourlyRateExpected)}/hr</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block">Actual Hourly Rate</span>
                  <span className="text-lg font-extrabold text-[#ff0055]">৳ {actualHourlyRate}/hr</span>
                </div>
              </div>

              {/* Toxicity Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-300">Workplace Toxicity Rating</span>
                  <span className="text-[#ff0055]">{toxicityScore}/100</span>
                </div>
                <div className="w-full h-3 rounded-full bg-black overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-[#ff0055] transition-all duration-500"
                    style={{ width: `${toxicityScore}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Know your worth in BDT before accepting your next job offer in BD.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
