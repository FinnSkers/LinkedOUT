import React from 'react';
import { 
  ShieldAlert, 
  Flag, 
  Flame
} from 'lucide-react';
import { sfx } from '../utils/audio';

const TOXIC_LEADERBOARD = [
  {
    rank: 1,
    industry: "HyperScale Tech & SaaS",
    turnoverRate: "42.8% Annual Turnover",
    topRedFlag: "Mandatory 5-Day RTO + 70hr Work Weeks",
    toxicityIndex: 96,
    trend: "Up 14% this quarter",
    commonQuote: "We work hard, play hard. The pizza bonus is in the breakroom!"
  },
  {
    rank: 2,
    industry: "High-Pressure Investment Banking",
    turnoverRate: "38.5% Annual Turnover",
    topRedFlag: "2 AM Pitch Deck Demands & Weekend Slack Slaves",
    toxicityIndex: 92,
    trend: "Stable at extreme",
    commonQuote: "Pls fix formatting on slide 47 before 6 AM tomorrow."
  },
  {
    rank: 3,
    industry: "Aggressive Agency Marketing",
    turnoverRate: "35.2% Annual Turnover",
    topRedFlag: "Wear 5 Hats for 1 Junior Salary",
    toxicityIndex: 88,
    trend: "Up 8% this quarter",
    commonQuote: "We need someone with a 'hustle mentality' who doesn't watch the clock."
  },
  {
    rank: 4,
    industry: "Legacy Corporate Retail HQ",
    turnoverRate: "31.0% Annual Turnover",
    topRedFlag: "Micromanagement & Keystroke Tracking",
    toxicityIndex: 84,
    trend: "Down 2%",
    commonQuote: "Your mouse stopped moving for 9 minutes at 3:15 PM."
  }
];

export default function Leaderboard() {
  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border-rose-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-black font-mono uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>WORKPLACE RED FLAG INDEX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Industry <span className="text-gradient-fire">Red Flag Leaderboard</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium">
          Aggregated turnover statistics, most reported corporate red flags, and toxicity rankings compiled from verified LinkedOut resignation posts.
        </p>
      </div>

      {/* Spotlight Image Card */}
      <div className="glow-card rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 border-cyan-500/30">
        <div className="w-full md:w-1/2 h-52 rounded-2xl overflow-hidden shadow-xl shrink-0">
          <img src="/freedom.jpg" alt="Freedom from Corporate Toxicity" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-extrabold font-mono uppercase">
            INDUSTRY SPOTLIGHT 2026
          </span>
          <h3 className="text-2xl font-black text-white">Over 40% of Tech Workers Quitting Over RTO</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Employees are walking away from 6-figure tech salaries rather than commuting 2 hours daily for Zoom calls in an open office plan.
          </p>
        </div>
      </div>

      {/* Leaderboard Cards List */}
      <div className="space-y-4">
        {TOXIC_LEADERBOARD.map((item) => (
          <div 
            key={item.rank}
            onClick={() => sfx.playPop()}
            className="glow-card rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-l-4 border-[#ff0055] cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff0055] to-[#ff5500] flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-[#ff0055]/30 shrink-0">
                #{item.rank}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-extrabold text-xl text-white">{item.industry}</h3>
                  <span className="px-3 py-1 rounded-full bg-[#ff0055]/20 text-[#ff4d79] text-xs font-extrabold font-mono">{item.turnoverRate}</span>
                </div>
                
                <div className="text-xs text-slate-300 mt-2 flex items-center gap-2 flex-wrap font-medium">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Flag className="w-4 h-4" />
                    Top Red Flag: {item.topRedFlag}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 self-end md:self-center shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">Toxicity Index</span>
                <span className="text-3xl font-black font-mono text-[#ff4d79]">{item.toxicityIndex}/100</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
