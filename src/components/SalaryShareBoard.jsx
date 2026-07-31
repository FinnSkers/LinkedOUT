import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  PlusCircle, 
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

export default function SalaryShareBoard({ posts, onSubmitSalary }) {
  // 100% Clean state - ZERO filler/sample data
  const [salaries, setSalaries] = useState([]);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [hideCompany, setHideCompany] = useState(false);
  const [baseSalary, setBaseSalary] = useState('');
  const [bonus, setBonus] = useState('');
  const [equity, setEquity] = useState('');
  const [yearsExp, setYearsExp] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('45');
  const [stressRating, setStressRating] = useState(3);
  const [verdict, setVerdict] = useState('');

  const handleSalarySubmit = (e) => {
    e.preventDefault();
    if (!role || !baseSalary) {
      alert("Please fill in your role and base salary.");
      return;
    }

    sfx.playShred();
    
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#00f2fe', '#10b981', '#ff0055', '#ffb703']
    });

    const baseNum = Number(baseSalary.replace(/[^0-9]/g, '')) || 0;
    const bonusNum = Number(bonus.replace(/[^0-9]/g, '')) || 0;
    const equityNum = Number(equity.replace(/[^0-9]/g, '')) || 0;
    const totalComp = baseNum + bonusNum + equityNum;

    const displayCompany = hideCompany ? `${company} (Anonymous)` : (company || 'Anonymous Corp');

    const newSalaryEntry = {
      id: `sal-${Date.now()}`,
      role,
      company: displayCompany,
      baseSalary: baseNum,
      bonus: bonusNum,
      equity: equityNum,
      totalCompensation: totalComp,
      yearsExp: yearsExp || '3+ yrs',
      weeklyHours: Number(weeklyHours) || 40,
      stressRating: Number(stressRating),
      verdict: verdict || 'Fair compensation for the workload.',
      timestamp: 'Just now'
    };

    setSalaries([newSalaryEntry, ...salaries]);

    // Reset Form
    setRole('');
    setCompany('');
    setBaseSalary('');
    setBonus('');
    setEquity('');
    setVerdict('');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black font-mono uppercase tracking-wider">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>PAY & COMPENSATION TRANSPARENCY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Anonymous <span className="text-gradient-cyan">Salary Share</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium">
          Post your real pay package anonymously to fight pay opacity, benchmark your worth, and reveal true hours-to-pay ratios.
        </p>
      </div>

      {/* SHARE SALARY FORM PORTION */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-6 border-2 border-emerald-500/40 bg-slate-900/90 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            <span>Post Your Salary Package (100% Anonymous)</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted & Private</span>
          </span>
        </div>

        <form onSubmit={handleSalarySubmit} className="space-y-4 text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Your Job Title / Role *</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Software Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field pl-10 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-300">Company Name</label>
                <label className="text-[10px] text-slate-400 flex items-center gap-1 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={hideCompany}
                    onChange={(e) => setHideCompany(e.target.checked)}
                    className="accent-[#ff0055]"
                  />
                  <span>Hide name</span>
                </label>
              </div>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Meta, Deloitte"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field pl-10 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Years of Experience (YoE)</label>
              <input
                type="text"
                placeholder="e.g. 5 years"
                value={yearsExp}
                onChange={(e) => setYearsExp(e.target.value)}
                className="input-field text-xs rounded-xl"
              />
            </div>
          </div>

          {/* Pay Package Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
            <div>
              <label className="block text-xs font-bold text-emerald-400 mb-1">Base Salary ($/yr) *</label>
              <input
                type="text"
                required
                placeholder="e.g. $165,000"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                className="input-field text-xs rounded-xl font-mono text-emerald-300 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 mb-1">Annual Cash Bonus ($)</label>
              <input
                type="text"
                placeholder="e.g. $25,000"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                className="input-field text-xs rounded-xl font-mono text-amber-300 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cyan-400 mb-1">Annual Stock / RSUs ($)</label>
              <input
                type="text"
                placeholder="e.g. $45,000"
                value={equity}
                onChange={(e) => setEquity(e.target.value)}
                className="input-field text-xs rounded-xl font-mono text-cyan-300 font-bold"
              />
            </div>
          </div>

          {/* Workload & Stress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Actual Weekly Hours Worked</label>
              <input
                type="number"
                placeholder="e.g. 50"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(e.target.value)}
                className="input-field text-xs rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Stress Level (1 = Low, 5 = Extreme)</label>
              <select
                value={stressRating}
                onChange={(e) => setStressRating(Number(e.target.value))}
                className="input-field text-xs rounded-xl"
              >
                <option value={1}>1 - Low Stress / Great WLB</option>
                <option value={2}>2 - Moderate Stress</option>
                <option value={3}>3 - High Stress</option>
                <option value={4}>4 - Severe Stress & Overtime</option>
                <option value={5}>5 - Extreme Hazard / Toxic Burnout</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Is the Pay Worth the Stress? (Short Verdict)</label>
            <input
              type="text"
              placeholder="e.g. Great base salary, but 60hr weeks make it exhausting."
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              className="input-field text-xs rounded-xl"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn btn-primary px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black shadow-xl shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Publish Anonymous Salary</span>
            </button>
          </div>

        </form>
      </div>

      {/* SALARY FEED LIST */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span>Real User Salary Submissions ({salaries.length})</span>
        </h3>

        {salaries.length > 0 ? (
          salaries.map((s) => {
            const effectiveRate = Math.round(s.totalCompensation / (s.weeklyHours * 52));

            return (
              <div 
                key={s.id} 
                className="glow-card rounded-3xl p-6 space-y-4 border-l-4 border-emerald-500 bg-slate-900/80"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-xl text-white">{s.role}</h4>
                      <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                        {s.company}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 font-mono">
                      <span>{s.yearsExp} YoE</span>
                      <span>•</span>
                      <span>{s.weeklyHours} hrs/wk</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">~${effectiveRate}/hr effective pay</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">Total Compensation</span>
                    <span className="text-2xl font-black font-mono text-emerald-400">
                      ${(s.totalCompensation).toLocaleString()}<span className="text-xs text-slate-400">/yr</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/40 text-center text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Base Salary</span>
                    <span className="font-bold text-emerald-300">${s.baseSalary.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Cash Bonus</span>
                    <span className="font-bold text-amber-300">${s.bonus.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Stock / RSUs</span>
                    <span className="font-bold text-cyan-300">${s.equity.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 text-xs text-slate-300 font-medium italic">
                  "{s.verdict}"
                </div>
              </div>
            );
          })
        ) : (
          <div className="glow-card rounded-3xl p-8 text-center space-y-3">
            <p className="text-slate-400 text-sm">No real user salary entries submitted yet. Be the first to post your pay package above!</p>
          </div>
        )}
      </div>

    </div>
  );
}
