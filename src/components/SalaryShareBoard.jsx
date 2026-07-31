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
  // Filter salary share posts from posts state or local submissions
  const salaryPostsFromSupabase = posts.filter(p => p.category === 'Salary Share' || p.category === 'BD Salary Share');

  const [localSalaries, setLocalSalaries] = useState([]);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [hideCompany, setHideCompany] = useState(false);
  const [baseSalary, setBaseSalary] = useState('');
  const [bonus, setBonus] = useState('');
  const [equity, setEquity] = useState('');
  const [yearsExp, setYearsExp] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('48');
  const [stressRating, setStressRating] = useState(3);
  const [verdict, setVerdict] = useState('');

  const handleSalarySubmit = (e) => {
    e.preventDefault();
    if (!role || !baseSalary) {
      alert("Please fill in your role and base monthly salary.");
      return;
    }

    sfx.playShred();
    
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#006a4e', '#f42a41', '#10b981', '#ffb703']
    });

    const baseNum = Number(baseSalary.replace(/[^0-9]/g, '')) || 0;
    const bonusNum = Number(bonus.replace(/[^0-9]/g, '')) || 0;
    const equityNum = Number(equity.replace(/[^0-9]/g, '')) || 0;
    const totalCompMonthly = baseNum + Math.round(bonusNum / 12) + Math.round(equityNum / 12);
    const totalCompYearly = baseNum * 12 + bonusNum + equityNum;

    const displayCompany = hideCompany ? `${company} (Anonymous BD)` : (company || 'Anonymous BD Firm');

    const salaryStoryPayload = {
      authorAlias: `BD-${role || 'Professional'}`,
      avatar: "🇧🇩",
      formerCompany: displayCompany,
      role: role || "Team Member",
      tenure: yearsExp || "2+ yrs",
      category: "BD Salary Share",
      finalStraw: verdict || `Monthly Pay Package: ৳ ${totalCompMonthly.toLocaleString()}/mo`,
      content: `Base Monthly: ৳ ${baseNum.toLocaleString()} | Bonus: ৳ ${bonusNum.toLocaleString()} | Hours: ${weeklyHours} hrs/wk | Stress: ${stressRating}/5. Verdict: ${verdict || 'Fair compensation for BD tech market.'}`,
      toxicBadges: ["Salary Package", `${weeklyHours} hrs/wk`],
      salaryWas: `৳ ${totalCompMonthly.toLocaleString()} / month`,
      sanityRestored: 100
    };

    // Save directly to Supabase via parent callback
    if (onSubmitSalary) {
      onSubmitSalary(salaryStoryPayload);
    }

    const newLocalSalaryEntry = {
      id: `sal-${Date.now()}`,
      role,
      company: displayCompany,
      baseSalary: baseNum,
      bonus: bonusNum,
      equity: equityNum,
      totalCompensationMonthly: totalCompMonthly,
      totalCompensationYearly: totalCompYearly,
      yearsExp: yearsExp || '2+ yrs',
      weeklyHours: Number(weeklyHours) || 48,
      stressRating: Number(stressRating),
      verdict: verdict || 'Fair compensation for BD tech market.',
      timestamp: 'Just now'
    };

    setLocalSalaries([newLocalSalaryEntry, ...localSalaries]);

    // Reset Form
    setRole('');
    setCompany('');
    setBaseSalary('');
    setBonus('');
    setEquity('');
    setVerdict('');
  };

  // Combine live Supabase salary entries with local entries
  const allSalaryEntries = [
    ...localSalaries,
    ...salaryPostsFromSupabase.map(p => ({
      id: p.id,
      role: p.role,
      company: p.formerCompany,
      baseSalary: 0,
      bonus: 0,
      equity: 0,
      totalCompensationMonthly: p.salaryWas || "৳ Package",
      yearsExp: p.tenure,
      weeklyHours: 48,
      stressRating: 3,
      verdict: p.content,
      isSupabaseRow: true
    }))
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-emerald-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black font-mono uppercase tracking-wider">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>BANGLADESH PAY TRANSPARENCY (৳ BDT)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Anonymous <span className="text-gradient-cyan">BD Salary Share (৳)</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium">
          All salary submissions are saved permanently to your Supabase PostgreSQL database!
        </p>
      </div>

      {/* SHARE SALARY FORM PORTION */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-6 border-2 border-emerald-500/40 bg-slate-900/90 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" />
            <span>Post Your Salary Package in BDT (Saved to Supabase Database)</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Encrypted & Anonymous</span>
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
                  placeholder="e.g. Software Engineer / SQA"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field pl-10 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-300">Company / Hub</label>
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
                  placeholder="e.g. Gulshan Tech Firm / MFS"
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
                placeholder="e.g. 3 years"
                value={yearsExp}
                onChange={(e) => setYearsExp(e.target.value)}
                className="input-field text-xs rounded-xl"
              />
            </div>
          </div>

          {/* Pay Package Breakdown in BDT */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
            <div>
              <label className="block text-xs font-bold text-emerald-400 mb-1">Base Monthly Salary (৳/mo) *</label>
              <input
                type="text"
                required
                placeholder="e.g. ৳ 85,000"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                className="input-field text-xs rounded-xl font-mono text-emerald-300 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 mb-1">Eid Bonus / Festival Pay (৳/yr)</label>
              <input
                type="text"
                placeholder="e.g. ৳ 85,000 (2 Eid bonuses)"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                className="input-field text-xs rounded-xl font-mono text-amber-300 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cyan-400 mb-1">Other Allowances / PF (৳/yr)</label>
              <input
                type="text"
                placeholder="e.g. ৳ 30,000"
                value={equity}
                onChange={(e) => setEquity(e.target.value)}
                className="input-field text-xs rounded-xl font-mono text-cyan-300 font-bold"
              />
            </div>
          </div>

          {/* Workload & Stress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Weekly Hours Worked (Including Saturday)</label>
              <input
                type="number"
                placeholder="e.g. 48"
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
                <option value={1}>1 - Good WLB / 5-Day Week</option>
                <option value={2}>2 - Moderate Stress</option>
                <option value={3}>3 - High Stress & Late Hours</option>
                <option value={4}>4 - Saturday Office & Unpaid Overtime</option>
                <option value={5}>5 - Severe Toxic Burnout / Salary Delay</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Is the Pay Worth the Workload? (Short Verdict)</label>
            <input
              type="text"
              placeholder="e.g. Good monthly pay in BDT, but late shifts are tough."
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
              <span>Publish BD Salary to Database</span>
            </button>
          </div>

        </form>
      </div>

      {/* SALARY FEED LIST */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span>Real BD User Salary Submissions ({allSalaryEntries.length})</span>
        </h3>

        {allSalaryEntries.length > 0 ? (
          allSalaryEntries.map((s) => (
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
                    <span className="text-emerald-400 font-bold">Saved in Supabase Database</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">Monthly Take-Home</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {typeof s.totalCompensationMonthly === 'number' ? `৳ ${s.totalCompensationMonthly.toLocaleString()}/mo` : s.totalCompensationMonthly}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/5 text-xs text-slate-300 font-medium italic">
                "{s.verdict}"
              </div>
            </div>
          ))
        ) : (
          <div className="glow-card rounded-3xl p-8 text-center space-y-3">
            <p className="text-slate-400 text-sm">No real Bangladeshi salary entries submitted yet. Be the first to post your pay package above!</p>
          </div>
        )}
      </div>

    </div>
  );
}
