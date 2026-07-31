import React from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  Flame, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Building2 
} from 'lucide-react';

const STATS_DATA = [
  { reason: "Unpaid Overtime & Saturday Office", percentage: 42, color: "bg-[#ff0055]" },
  { reason: "Salary Delay (2-3 Months Unpaid)", percentage: 28, color: "bg-amber-500" },
  { reason: "Notice Period & Experience Cert Withheld", percentage: 16, color: "bg-cyan-500" },
  { reason: "Chairman / Family MD Micromanagement", percentage: 9, color: "bg-purple-500" },
  { reason: "Phantom Hike / Deferred Appraisal", percentage: 5, color: "bg-emerald-500" }
];

export default function ToxicityAnalytics() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-amber-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black font-mono uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <span>BANGLADESH WORKPLACE TOXICITY ANALYTICS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Why Bangladeshi Employees <span className="text-gradient-fire">Quit (Data Breakdown)</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Aggregated statistical breakdown of top resignation factors across Dhaka tech hubs and corporate firms.
        </p>
      </div>

      {/* Bar Chart Breakdown */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-6 bg-slate-900/90 border-white/10">
        <h3 className="text-lg font-black text-white pb-3 border-b border-white/10 flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#ff0055]" />
          <span>Top Primary Causes for Resignation</span>
        </h3>

        <div className="space-y-5">
          {STATS_DATA.map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-200">{item.reason}</span>
                <span className="text-amber-400 font-mono font-black">{item.percentage}%</span>
              </div>

              <div className="w-full h-3.5 rounded-full bg-black overflow-hidden border border-white/10">
                <div 
                  className={`h-full ${item.color} transition-all duration-700 rounded-full`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
