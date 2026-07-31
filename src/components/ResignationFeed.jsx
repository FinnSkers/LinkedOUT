import React, { useState, useRef } from 'react';
import { 
  Flame, 
  Search, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Send, 
  Lock 
} from 'lucide-react';
import ResignationCard from './ResignationCard';
import { CATEGORIES } from '../data/seedPosts';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function ResignationFeed({ posts, onReact, onAddComment, onSubmitStory, onOpenAnonymousChat }) {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Inline "Share Why You Left" Form State (Bangladeshi Context)
  const [company, setCompany] = useState('');
  const [hideCompany, setHideCompany] = useState(false);
  const [role, setRole] = useState('');
  const [tenure, setTenure] = useState('');
  const [category, setCategory] = useState('Unpaid Overtime & Saturday Office');
  const [finalStraw, setFinalStraw] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [salaryLeft, setSalaryLeft] = useState('৳ 85,000 / month');

  const shareBoxRef = useRef(null);

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !finalStraw.trim() || !storyContent.trim()) {
      alert("Please fill in your company, final straw, and story details.");
      return;
    }

    sfx.playShred();

    confetti({
      particleCount: 160,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#006a4e', '#f42a41', '#ff5500', '#00f2fe']
    });

    const displayCompany = hideCompany ? `${company} (Anonymous BD)` : company;

    onSubmitStory({
      authorAlias: `Ex-${role || 'Employee'}`,
      avatar: "🇧🇩",
      formerCompany: displayCompany,
      role: role || "Former Team Member",
      tenure: tenure || "1+ year",
      category,
      finalStraw,
      content: storyContent,
      toxicBadges: [category, "Sanity Reclaimed"],
      salaryWas: salaryLeft,
      sanityRestored: 99,
      timestamp: "Just now"
    });

    // Reset Form
    setCompany('');
    setRole('');
    setTenure('');
    setFinalStraw('');
    setStoryContent('');
  };

  // Filter and Sort Logic
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All Stories' || post.category === selectedCategory;
    const matchesSearch = 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.formerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorAlias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.finalStraw.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'reactions') {
      const totalA = Object.values(a.reactions || {}).reduce((acc, val) => acc + val, 0);
      const totalB = Object.values(b.reactions || {}).reduce((acc, val) => acc + val, 0);
      return totalB - totalA;
    }
    return 0;
  });

  return (
    <div className="space-y-8">
      
      {/* HERO SECTION: MAIN FOCUS -> SHARE WHY YOU LEFT (BANGLADESH EDITION) */}
      <div 
        id="share-section"
        ref={shareBoxRef}
        className="glow-card rounded-3xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-[#0c101d] via-[#141c33] to-[#0c101d] border-2 border-[#ff0055]/50 shadow-2xl space-y-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff0055]/20 border border-[#ff0055]/40 text-[#ff4d79] text-xs font-black font-mono uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
              <span>LINKEDOUT BANGLADESH 🇧🇩</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Share <span className="text-gradient-fire">Why You Left</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-1 font-medium">
              Mandatory Saturday office? 3-month delayed salary? Withheld experience certificates? Share your real story anonymously without fear.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl shrink-0">
            <Lock className="w-4 h-4" />
            <span>100% Encrypted & Anonymous</span>
          </div>
        </div>

        {/* INLINE REAL STORY PUBLISHING FORM (BD CONTEXT) */}
        <form onSubmit={handleInlineSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-300">Former Company / Hub *</label>
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
              <input
                type="text"
                required
                placeholder="e.g. Tech Firm (Gulshan / Banani / Uttara)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="input-field text-xs py-2.5 rounded-xl bg-slate-900/90"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Your Role / Job Title</label>
              <input
                type="text"
                placeholder="e.g. Software Engineer / SQA / Executive"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field text-xs py-2.5 rounded-xl bg-slate-900/90"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Primary Toxic Issue</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field text-xs py-2.5 rounded-xl bg-slate-900/90"
              >
                <option value="Unpaid Overtime & Saturday Office">Unpaid Overtime & Saturday Office</option>
                <option value="Salary Delay (2-3 Mos)">Salary Delay (2-3 Months Unpaid)</option>
                <option value="Notice Period & Experience Cert Trap">Experience Cert & Release Letter Withheld</option>
                <option value="Chairman / MD Micromanagement">Chairman / Family MD Micromanagement</option>
                <option value="Phantom Hike & Deferred Review">Phantom Hike & Deferred Appraisal</option>
                <option value="Arbitrary PIP / Forced Resignation">Arbitrary PIP & Forced Resignation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">What was THE FINAL STRAW? *</label>
              <input
                type="text"
                required
                placeholder="e.g. Management withheld my experience certificate after 3 months notice."
                value={finalStraw}
                onChange={(e) => setFinalStraw(e.target.value)}
                className="input-field text-xs py-2.5 rounded-xl bg-slate-900/90"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Left-Behind Monthly Pay (৳ BDT)</label>
              <input
                type="text"
                placeholder="e.g. ৳ 85,000 / month (or ৳ 12 Lakh / yr)"
                value={salaryLeft}
                onChange={(e) => setSalaryLeft(e.target.value)}
                className="input-field text-xs py-2.5 rounded-xl bg-slate-900/90"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Your Story (Describe what happened in detail) *</label>
            <textarea
              required
              rows={4}
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
              placeholder="Share what happened at your workplace in Dhaka / Chattogram... Be honest and raw."
              className="input-field text-xs rounded-xl bg-slate-900/90 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <span className="text-xs text-slate-400 font-mono">
              {storyContent.length} characters • 100% Anonymous BD Platform
            </span>

            <button
              type="submit"
              className="btn btn-primary px-8 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-xl shadow-[#ff0055]/40 hover:scale-105 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Publish Story (100% Anonymous)</span>
            </button>
          </div>

        </form>
      </div>

      {/* Filter and Search Bar Header */}
      <div className="glow-card p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search company, role, or issue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 text-xs sm:text-sm py-2.5 rounded-xl bg-slate-900/90"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sfx.playPop();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white shadow-lg shadow-[#ff0055]/30 scale-105'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <TrendingUp className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 font-bold outline-none focus:border-[#ff0055]"
          >
            <option value="newest">🔥 Latest Real Stories</option>
            <option value="reactions">⚡ Most Respect Reactions</option>
          </select>
        </div>

      </div>

      {/* Feed List of Real Stories */}
      <div className="space-y-6">
        {sortedPosts.length > 0 ? (
          sortedPosts.map(post => (
            <ResignationCard
              key={post.id}
              post={post}
              onReact={onReact}
              onAddComment={onAddComment}
              onOpenAnonymousChat={onOpenAnonymousChat}
            />
          ))
        ) : (
          <div className="glow-card p-12 rounded-3xl text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center mx-auto text-4xl shadow-inner">
              🇧🇩
            </div>
            <h3 className="text-2xl font-bold text-white">No Stories Match Your Filter</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Be the first Bangladeshi employee to share why you quit above!
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
