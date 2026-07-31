import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Building2, 
  Briefcase, 
  DollarSign, 
  ShieldCheck,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

const BADGE_OPTIONS = [
  "RTO Mandate",
  "Contract Violation",
  "90hr Weeks",
  "Unpaid Promotion",
  "Hospitalization",
  "Keystroke Tracking",
  "Understaffing",
  "Executive Hypocrisy"
];

export default function ResignationModal({ isOpen, onClose, onSubmitStory }) {
  const [formerCompany, setFormerCompany] = useState('');
  const [hideCompany, setHideCompany] = useState(false);
  const [role, setRole] = useState('');
  const [tenure, setTenure] = useState('');
  const [category, setCategory] = useState('RTO Mandate');
  const [finalStraw, setFinalStraw] = useState('');
  const [storyText, setStoryText] = useState('');
  const [salaryWas, setSalaryWas] = useState('$120,000');
  const [selectedBadges, setSelectedBadges] = useState(["RTO Mandate"]);
  const [alias, setAlias] = useState('');
  const [allowDms, setAllowDms] = useState(true);

  if (!isOpen) return null;

  const toggleBadge = (badge) => {
    sfx.playPop();
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(selectedBadges.filter(b => b !== badge));
    } else {
      if (selectedBadges.length < 3) {
        setSelectedBadges([...selectedBadges, badge]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formerCompany || !finalStraw || !storyText) {
      alert("Please fill in your company, final straw, and story details.");
      return;
    }

    sfx.playShred();
    
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff0055', '#ff5500', '#00f2fe', '#8a2be2']
    });

    const displayCompany = hideCompany ? `${formerCompany} (Name Hidden)` : formerCompany;

    onSubmitStory({
      authorAlias: alias.trim() || `Ex-${role || 'Employee'}`,
      avatar: "🔥",
      formerCompany: displayCompany,
      role: role || "Team Member",
      tenure: tenure || "1+ year",
      category,
      finalStraw,
      content: storyText,
      toxicBadges: selectedBadges.length > 0 ? selectedBadges : [category],
      salaryWas,
      allowDms,
      sanityRestored: Math.floor(Math.random() * 6) + 95,
      timestamp: "Just now"
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="glow-card w-full max-w-2xl p-6 sm:p-8 space-y-6 relative rounded-3xl border-[#ff0055]/40 my-8 shadow-2xl">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff0055]/20 text-[#ff4d79] text-xs font-black font-mono uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ANONYMOUS STORY PUBLISHER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Share Your <span className="text-gradient-fire">Real Resignation Story</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Post your authentic experience and choose whether readers can message you in 1-on-1 DMs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-300">Company Name *</label>
                <label className="text-[10px] text-slate-400 flex items-center gap-1 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={hideCompany}
                    onChange={(e) => setHideCompany(e.target.checked)}
                    className="accent-[#ff0055]"
                  />
                  <span>Hide exact name</span>
                </label>
              </div>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Amazon, Goldman Sachs"
                  value={formerCompany}
                  onChange={(e) => setFormerCompany(e.target.value)}
                  className="input-field pl-10 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Your Role / Job Title</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Senior Software Lead"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field pl-10 text-xs rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tenure / Time Served</label>
              <input
                type="text"
                placeholder="e.g. 3 years 2 months"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="input-field text-xs rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Primary Toxic Reason</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field text-xs rounded-xl"
              >
                <option value="RTO Mandate">Mandatory RTO / Contract Breach</option>
                <option value="Burnout & Overtime">Burnout & Extreme Overtime</option>
                <option value="Unsafe Workload">Unsafe Workload / Understaffing</option>
                <option value="Phantom Promotion">Phantom Promotion (No Pay Bump)</option>
                <option value="Micromanagement">Micromanagement & Keystroke Tracking</option>
                <option value="PIP Trap">Arbitrary PIP Setup</option>
              </select>
            </div>
          </div>

          {/* AUTHOR DM DECISION TOGGLE */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-200 block">Allow Anonymous 1-on-1 DMs for this story?</span>
              <span className="text-[10px] text-slate-400">If enabled, readers can start an anonymous 1-on-1 chat with you.</span>
            </div>

            <button
              type="button"
              onClick={() => setAllowDms(!allowDms)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                allowDms ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400 border border-white/10'
              }`}
            >
              {allowDms ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5 text-slate-500" />}
              <span>{allowDms ? '🟢 DMs Open' : '🔴 DMs Closed'}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">What was THE FINAL STRAW event? *</label>
            <input
              type="text"
              required
              placeholder="e.g. VP revoked written remote agreement with 10 days notice after I bought a home."
              value={finalStraw}
              onChange={(e) => setFinalStraw(e.target.value)}
              className="input-field text-xs rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Unfiltered Story *</label>
            <textarea
              required
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="Tell the raw story..."
              className="input-field text-xs h-36 rounded-xl leading-relaxed"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
            <button type="button" onClick={onClose} className="btn btn-secondary text-xs rounded-xl px-5 py-2.5">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary text-xs shadow-lg shadow-[#ff0055]/40 rounded-xl px-7 py-3 font-bold">
              <Send className="w-4 h-4" />
              <span>Publish Real Story</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
