import React from 'react';
import { 
  Flame, 
  PlusCircle, 
  Calculator, 
  ShieldAlert, 
  LogOut,
  UserCheck,
  DollarSign
} from 'lucide-react';
import { sfx } from '../utils/audio';

export default function Navbar({ activeTab, setActiveTab, onScrollToShare }) {
  const handleTabClick = (tabId) => {
    sfx.playPop();
    setActiveTab(tabId);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#05070d]/90 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('feed')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ff0055] via-[#ff5500] to-[#ffb703] flex items-center justify-center shadow-lg shadow-[#ff0055]/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <LogOut className="w-6 h-6 text-white transform -scale-x-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl tracking-tight text-white">Linked</span>
              <span className="font-black text-2xl tracking-tight text-gradient-fire">Out</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-black ml-1 uppercase shadow-sm flex items-center gap-1">
                <span>🇧🇩 BD EDITION</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-bold hidden sm:block">Where Bangladeshi employees share why they quit</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 shadow-inner">
          <button
            onClick={() => handleTabClick('feed')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'feed'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-lg shadow-[#ff0055]/30 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Feed of Truth</span>
          </button>

          <button
            onClick={() => handleTabClick('salary')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'salary'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>BD Salary & Pay Share (৳)</span>
          </button>

          <button
            onClick={() => handleTabClick('mystories')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'mystories'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-lg shadow-[#ff0055]/30 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>My Stories & DMs</span>
          </button>

          <button
            onClick={() => handleTabClick('calculator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-lg shadow-[#ff0055]/30 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Overtime & Salary Loss (৳)</span>
          </button>
        </nav>

        {/* Primary CTA - SHARE WHY YOU LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sfx.playFire();
              onScrollToShare();
            }}
            className="btn btn-primary group shadow-2xl shadow-[#ff0055]/50 relative overflow-hidden px-6 py-3 rounded-2xl"
          >
            <span className="relative z-10 flex items-center gap-2 text-xs font-black uppercase tracking-wider">
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Share Why You Left</span>
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
