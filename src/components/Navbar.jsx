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
  VolumeX,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { sfx } from '../utils/audio';

export default function Navbar({ activeTab, setActiveTab, onScrollToShare }) {
  const [muted, setMuted] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleTabClick = (tabId) => {
    if (!muted) sfx.playPop();
    setActiveTab(tabId);
    setShowMoreMenu(false);
  };

  const toggleSound = () => {
    setMuted(!muted);
  };

  const isMoreTabActive = ['rights', 'analytics', 'mystories', 'calculator', 'leaderboard'].includes(activeTab);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#05070d]/95 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('feed')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff0055] via-[#ff5500] to-[#ffb703] flex items-center justify-center shadow-lg shadow-[#ff0055]/30 group-hover:scale-105 transition-all">
            <LogOut className="w-5 h-5 text-white transform -scale-x-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-white">Linked</span>
              <span className="font-black text-xl sm:text-2xl tracking-tight text-gradient-fire">Out</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-black ml-1 uppercase">
                🇧🇩 BD
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold hidden md:block">Real Bangladeshi resignation stories & salaries</p>
          </div>
        </div>

        {/* Clean Streamlined Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 shadow-inner">
          <button
            onClick={() => handleTabClick('feed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'feed'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-md shadow-[#ff0055]/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-4 h-4 text-[#ff0055]" />
            <span>Feed of Truth</span>
          </button>

          <button
            onClick={() => handleTabClick('salary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'salary'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>BD Salary (৳)</span>
          </button>

          <button
            onClick={() => handleTabClick('generator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-md shadow-[#ff0055]/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>"I Quit" Generator</span>
          </button>

          {/* More Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                isMoreTabActive
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>More Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl p-2 space-y-1 z-50 animate-fade-in">
                <button
                  onClick={() => handleTabClick('rights')}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 text-left"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>BD Labor Rights Guide</span>
                </button>

                <button
                  onClick={() => handleTabClick('analytics')}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 text-left"
                >
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>Workplace Analytics</span>
                </button>

                <button
                  onClick={() => handleTabClick('mystories')}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 text-left"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>My Stories & DMs</span>
                </button>

                <button
                  onClick={() => handleTabClick('calculator')}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 text-left"
                >
                  <Calculator className="w-4 h-4 text-[#ff0055]" />
                  <span>Overtime Loss (৳)</span>
                </button>
              </div>
            )}
          </div>
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
            className="btn btn-primary group shadow-xl shadow-[#ff0055]/40 relative overflow-hidden px-5 py-2.5 rounded-2xl shrink-0"
          >
            <span className="relative z-10 flex items-center gap-2 text-xs font-black uppercase tracking-wider">
              <PlusCircle className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Share Why You Left</span>
              <span className="sm:hidden">Share</span>
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
