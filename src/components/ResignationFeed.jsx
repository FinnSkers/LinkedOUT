import React, { useState, useRef } from 'react';
import { 
  Flame, 
  Search, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Send, 
  Lock,
  Building2,
  Briefcase,
  AlertCircle,
  FileText,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import ResignationCard from './ResignationCard';
import { CATEGORIES } from '../data/seedPosts';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function ResignationFeed({ posts, onReact, onAddComment, onSubmitStory, onOpenAnonymousChat }) {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Form State
  const [company, setCompany] = useState('');
  const [hideCompany, setHideCompany] = useState(false);
  const [role, setRole] = useState('');
  const [tenure, setTenure] = useState('');
  const [category, setCategory] = useState('Unpaid Overtime & Saturday Office');
  const [finalStraw, setFinalStraw] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [salaryLeft, setSalaryLeft] = useState('');

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
      salaryWas: salaryLeft || "৳ Undisclosed",
      sanityRestored: 99,
      timestamp: "Just now"
    });

    // Reset Form
    setCompany('');
    setRole('');
    setTenure('');
    setFinalStraw('');
    setStoryContent('');
    setSalaryLeft('');
  };

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
      
      {/* USER-FRIENDLY & BEAUTIFUL STORY CREATION BOX */}
      <div 
        id="share-section"
        ref={shareBoxRef}
        className="glow-card rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-slate-900/95 border-2 border-[#ff0055]/40 shadow-2xl space-y-8"
      >
        {/* Form Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff0055]/20 border border-[#ff0055]/40 text-[#ff4d79] text-xs font-black font-mono uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>SHARE WHY YOU LEFT 🇧🇩</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Post Your Resignation Story
            </h1>
            <p className="text-slate-300 text-sm font-medium">
              100% Anonymous • No account, login, or email required.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 rounded-2xl shrink-0">
            <Lock className="w-4 h-4" />
            <span>Encrypted Device Token active</span>
          </div>
        </div>

        {/* ERGONOMIC USER-FRIENDLY FORM */}
        <form onSubmit={handleInlineSubmit} className="space-y-6">
          
          {/* Row 1: Company & Job Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-extrabold text-slate-200 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#ff0055]" />
                  <span>Former Company / Office Hub *</span>
                </label>
                <label className="text-xs text-slate-400 flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                  <input 
                    type="checkbox"
                    checked={hideCompany}
                    onChange={(e) => setHideCompany(e.target.checked)}
                    className="w-4 h-4 accent-[#ff0055] rounded cursor-pointer"
                  />
                  <span className="flex items-center gap-1 font-semibold">
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>Hide company name</span>
                  </span>
                </label>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Software Firm (Gulshan / Banani / Uttara)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-slate-100 text-sm font-medium placeholder-slate-500 focus:outline-none focus:border-[#ff0055] focus:ring-2 focus:ring-[#ff0055]/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-200 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Your Role / Job Title</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer / SQA / Executive"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-slate-100 text-sm font-medium placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              />
            </div>
          </div>

          {/* Row 2: Category & Left Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Primary Workplace Issue</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-slate-100 text-sm font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all cursor-pointer"
              >
                <option value="Unpaid Overtime & Saturday Office">Unpaid Overtime & Saturday Office</option>
                <option value="Salary Delay (2-3 Mos)">Salary Delay (2-3 Months Unpaid)</option>
                <option value="Notice Period & Experience Cert Trap">Experience Cert & Release Letter Withheld</option>
                <option value="Chairman / MD Micromanagement">Chairman / Family MD Micromanagement</option>
                <option value="Phantom Hike & Deferred Review">Phantom Hike & Deferred Appraisal</option>
                <option value="Arbitrary PIP / Forced Resignation">Arbitrary PIP & Forced Resignation</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-extrabold text-slate-200 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Left-Behind Monthly Salary (৳ BDT)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. ৳ 85,000 / month (or ৳ 12 Lakh / yr)"
                value={salaryLeft}
                onChange={(e) => setSalaryLeft(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-slate-100 text-sm font-medium placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all"
              />
            </div>
          </div>

          {/* Row 3: Final Straw */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-extrabold text-slate-200 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#ff0055]" />
              <span>What was THE FINAL STRAW that made you quit? *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Management withheld my experience certificate after 3 months notice."
              value={finalStraw}
              onChange={(e) => setFinalStraw(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-slate-100 text-sm font-medium placeholder-slate-500 focus:outline-none focus:border-[#ff0055] focus:ring-2 focus:ring-[#ff0055]/30 transition-all"
            />
          </div>

          {/* Row 4: Full Story Content */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-extrabold text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Your Full Resignation Story *</span>
            </label>
            <textarea
              required
              rows={5}
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
              placeholder="Tell your story clearly... What happened? How did management react? How is your life now?"
              className="w-full p-4 rounded-2xl bg-black/60 border border-white/15 text-slate-100 text-sm font-medium placeholder-slate-500 leading-relaxed focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{storyContent.length} characters • 100% Anonymous BD Platform</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-2xl shadow-[#ff0055]/50 hover:scale-105 transition-all bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white flex items-center justify-center gap-2"
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
