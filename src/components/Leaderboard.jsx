import React from 'react';
import { 
  ShieldAlert, 
  Flame, 
  TrendingUp, 
  Building2, 
  AlertTriangle,
  Award,
  ChevronRight
} from 'lucide-react';

const TOXIC_LEADERBOARD = [
  {
    rank: 1,
    industry: "Tech & Software Firms (Dhaka)",
    topIssue: "Mandatory Saturday Office & Unpaid Overtime",
    turnoverRate: "42% Annual Turnover",
    avgTenure: "9 Months",
    commonBadges: ["Saturday Office", "Unpaid Overtime", "Notice Trap"]
  },
  {
    rank: 2,
    industry: "Commercial Banks & NBFIs",
    topIssue: "2-3 Months Salary Delay & Excessive Pressure",
    turnoverRate: "35% Annual Turnover",
    avgTenure: "1.2 Years",
    commonBadges: ["Salary Delay", "Target Pressure", "Frozen Hike"]
  },
  {
    rank: 3,
    industry: "MFS & EdTech Startups",
    topIssue: "Phantom Promotion & Abrupt Layoffs",
    turnoverRate: "38% Annual Turnover",
    avgTenure: "11 Months",
    commonBadges: ["Unpaid Promotion", "Burnout", "Micromanagement"]
  },
  {
    rank: 4,
    industry: "RMG & Supply Chain Corporate",
    topIssue: "Chairman / Family MD Micromanagement",
    turnoverRate: "29% Annual Turnover",
    avgTenure: "1.5 Years",
    commonBadges: ["Family MD", "Late Clearance", "Withheld Cert"]
  }
];

export default function Leaderboard() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border-rose-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-black font-mono uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>WORKPLACE TOXICITY LEADERBOARD 🇧🇩</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Red Flag <span className="text-gradient-fire">Leaderboard</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Industry turnover metrics and top toxic issues reported across Bangladeshi corporate sectors.
        </p>
      </div>

      {/* Leaderboard Rankings List */}
      <div className="space-y-4">
        {TOXIC_LEADERBOARD.map((item) => (
          <div 
            key={item.rank}
            className="glow-card rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-slate-900/90 border-white/10 hover:border-rose-500/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl font-mono shrink-0 shadow-lg ${
                item.rank === 1 ? 'bg-gradient-to-tr from-[#ff0055] to-[#ff5500] text-white shadow-[#ff0055]/30' :
                item.rank === 2 ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-black' :
                'bg-slate-800 text-slate-300 border border-white/10'
              }`}>
                #{item.rank}
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-lg text-white">{item.industry}</h3>
                <p className="text-xs text-rose-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Top Issue: {item.topIssue}</span>
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  {item.commonBadges.map((b, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
                      #{b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 self-end sm:self-center font-mono">
              <span className="text-lg font-black text-rose-400 block">{item.turnoverRate}</span>
              <span className="text-xs text-slate-400 block">Avg Tenure: {item.avgTenure}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
