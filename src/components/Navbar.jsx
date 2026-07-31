import React, { useState } from 'react';
import { 
  Flame, 
  PlusCircle, 
  Calculator, 
  ShieldAlert, 
  LogOut,
  UserCheck,
  DollarSign,
  FileText,
  BookOpen,
  BarChart3,
  Volume2,
  VolumeX
} from 'lucide-react';
import { sfx } from '../utils/audio';

export default function Navbar({ activeTab, setActiveTab, onScrollToShare }) {
  const [muted, setMuted] = useState(false);

  const handleTabClick = (tabId) => {
    if (!muted) sfx.playPop();
    setActiveTab(tabId);
  };

  const toggleSound = () => {
    setMuted(!muted);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#05070d]/90 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('feed')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
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
            <p className="text-[11px] text-slate-400 font-bold hidden xl:block">Where Bangladeshi employees share why they quit</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 shadow-inner overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleTabClick('feed')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'feed'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-lg shadow-[#ff0055]/30 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Feed of Truth</span>
          </button>

          <button
            onClick={() => handleTabClick('salary')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'salary'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>BD Salary (৳)</span>
          </button>

          <button
            onClick={() => handleTabClick('generator')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-lg shadow-[#ff0055]/30 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>"I Quit" Letter</span>
          </button>

          <button
            onClick={() => handleTabClick('rights')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'rights'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>BD Labor Rights</span>
          </button>

          <button
            onClick={() => handleTabClick('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/20 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => handleTabClick('mystories')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'mystories'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-lg shadow-[#ff0055]/30 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>My Stories</span>
          </button>

          <button
            onClick={() => handleTabClick('calculator')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'calculator'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-lg shadow-[#ff0055]/30 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Overtime (৳)</span>
          </button>
        </nav>

        {/* Sound FX Toggle & CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title={muted ? 'Unmute SFX' : 'Mute SFX'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => {
              if (!muted) sfx.playFire();
              onScrollToShare();
            }}
            className="btn btn-primary group shadow-2xl shadow-[#ff0055]/50 relative overflow-hidden px-5 py-2.5 rounded-2xl"
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
