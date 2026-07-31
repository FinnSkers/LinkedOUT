import React, { useState } from 'react';
import { 
  Building2, 
  Flame, 
  Search, 
  Users, 
  ShieldAlert, 
  DollarSign, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { sfx } from '../utils/audio';

const COMPANY_BOWLS = [
  {
    id: 'bowl-tech',
    name: "Dhaka Tech & Software Hub Bowl 💻",
    description: "Gulshan, Banani, Uttara, & Mohakhali Software Engineers, SQAs, & Product Teams",
    activeMembers: "1.4k Members",
    topTopics: ["Saturday Office", "Remote BD Contracts", "Tech Salaries"]
  },
  {
    id: 'bowl-mfs',
    name: "MFS & FinTech Bowl 📱",
    description: "bKash, Nagad, Upay, & FinTech Product & Operations Teams",
    activeMembers: "980 Members",
    topTopics: ["Quarterly Target Stress", "Late Slack Calls", "Eid Bonus Payouts"]
  },
  {
    id: 'bowl-banking',
    name: "Commercial Banking & NBFI Bowl 🏦",
    description: "Brac Bank, City Bank, EBL, & Financial Officers",
    activeMembers: "1.1k Members",
    topTopics: ["Salary Delays", "Deposit Pressure", "Branch Hours"]
  },
  {
    id: 'bowl-corporate',
    name: "RMG & Supply Chain Corporate Bowl 🏬",
    description: "Apparel, Garments, & Corporate Operations Teams",
    activeMembers: "850 Members",
    topTopics: ["Chairman MD Micromanagement", "Experience Cert Clearance", "PF Payouts"]
  }
];

export default function CompanyHub({ posts }) {
  const [selectedBowl, setSelectedBowl] = useState('bowl-tech');

  const handleSelectBowl = (id) => {
    sfx.playPop();
    setSelectedBowl(id);
  };

  const currentBowl = COMPANY_BOWLS.find(b => b.id === selectedBowl);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-cyan-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black font-mono uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-cyan-400" />
          <span>BANGLADESH COMPANY & SECTOR BOWLS 🇧🇩</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          BD Industry <span className="text-gradient-cyan">"Bowls" (Water Cooler)</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Inspired by Blind & Fishbowl — discuss stories, salary benchmarks, and culture by specific BD sectors.
        </p>
      </div>

      {/* Bowls Selection Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COMPANY_BOWLS.map((bowl) => {
          const isSelected = bowl.id === selectedBowl;

          return (
            <button
              key={bowl.id}
              onClick={() => handleSelectBowl(bowl.id)}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-lg shadow-cyan-500/10 scale-105'
                  : 'bg-slate-900/90 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <h3 className="font-black text-xs text-white leading-snug">{bowl.name}</h3>
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">{bowl.activeMembers}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Bowl Details */}
      {currentBowl && (
        <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-5 bg-slate-900/90 border-cyan-500/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-white">{currentBowl.name}</h3>
              <p className="text-xs text-slate-300 mt-1">{currentBowl.description}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold shrink-0">
              {currentBowl.activeMembers}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase">Trending Discussion Topics</span>
            <div className="flex flex-wrap gap-2">
              {currentBowl.topTopics.map((topic, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-bold">
                  🔥 #{topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
