import React, { useState } from 'react';
import { 
  Flame, 
  Coffee, 
  Flag, 
  Skull, 
  Award, 
  MessageSquare, 
  Share2, 
  Building2, 
  Clock, 
  DollarSign, 
  Heart,
  Send,
  Sparkles,
  MessageCircleCode,
  Lock,
  ThumbsUp,
  Circle,
  ShieldCheck
} from 'lucide-react';
import { sfx } from '../utils/audio';

export default function ResignationCard({ post, onReact, onAddComment, onOpenAnonymousChat }) {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [requestDmInComment, setRequestDmInComment] = useState(false);

  // Author DM Availability status (defaulting to open/online unless closed)
  const isDmOpen = post.allowDms !== false;

  const handleReactionClick = (reactionType, emojiSymbol) => {
    sfx.playPop();
    onReact(post.id, reactionType);

    const id = Date.now() + Math.random();
    setFloatingEmojis(prev => [...prev, { id, symbol: emojiSymbol, left: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(item => item.id !== id));
    }, 800);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    sfx.playShred();

    const formattedComment = requestDmInComment 
      ? `${commentText} 💬 [Requesting 1-on-1 Chat]`
      : commentText;

    onAddComment(post.id, formattedComment);
    setCommentText('');
    setRequestDmInComment(false);
  };

  const handleCommentUpvote = (commentId) => {
    sfx.playPop();
    // Local upvote counter trigger
  };

  const handleShare = () => {
    sfx.playPop();
    navigator.clipboard.writeText(`Check out this real resignation story on LinkedOut: "${post.content.slice(0, 100)}..."`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <article className="glow-card rounded-3xl p-6 sm:p-7 space-y-6 animate-fade-in relative overflow-hidden group">
      
      {/* Floating Emojis Layer */}
      {floatingEmojis.map(item => (
        <span 
          key={item.id} 
          className="floating-emoji text-2xl"
          style={{ left: `${item.left}%`, bottom: '20%' }}
        >
          {item.symbol}
        </span>
      ))}

      {/* Top Accent Ribbon */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#ff0055]/15 via-transparent to-transparent rounded-bl-full pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-white/10 flex items-center justify-center text-3xl shadow-lg shadow-black/60 shrink-0 transform group-hover:scale-105 transition-transform">
            {post.avatar || "⚡"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-xl text-white group-hover:text-[#ff4d79] transition-colors">
                {post.authorAlias}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ff0055]/15 border border-[#ff0055]/30 text-[10px] font-black text-[#ff4d79] tracking-wider uppercase">
                VERIFIED EX-EMPLOYEE
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 flex-wrap font-medium">
              <span className="flex items-center gap-1.5 text-slate-200 font-bold">
                <Building2 className="w-4 h-4 text-[#ff0055]" />
                {post.formerCompany}
              </span>
              <span>•</span>
              <span className="text-slate-300">{post.role}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {post.tenure}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-slate-500 font-mono block mb-1">{post.timestamp}</span>
          <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono inline-flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            +{post.sanityRestored}% Sanity Restored
          </span>
        </div>
      </div>

      {/* Category, Toxic Badges & Author DM Status */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-xl bg-[#ff0055]/20 border border-[#ff0055]/40 text-xs font-black text-white flex items-center gap-1.5 shadow-md shadow-[#ff0055]/20">
            <Flag className="w-3.5 h-3.5 text-[#ff0055]" />
            {post.category}
          </span>
          {post.toxicBadges?.map((badge, idx) => (
            <span key={idx} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
              #{badge}
            </span>
          ))}
        </div>

        {/* AUTHOR DECISION: ONLINE vs OFFLINE DM TOGGLE BADGE */}
        {isDmOpen ? (
          <button
            onClick={() => {
              sfx.playPop();
              onOpenAnonymousChat(post);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-emerald-500/10"
            title="Author is Online & Accepting 1-on-1 DMs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>🟢 DMs Open (Chat 1-on-1)</span>
          </button>
        ) : (
          <button
            onClick={() => {
              sfx.playPop();
              setShowComments(true);
              alert("The author has set 1-on-1 DMs to Offline. You can drop a public comment below instead!");
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-white/10 text-slate-400 text-xs font-bold flex items-center gap-2 cursor-pointer hover:bg-slate-700"
            title="Author has set 1-on-1 DMs to Offline"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>🔴 DMs Offline (Use Comments)</span>
          </button>
        )}
      </div>

      {/* The Final Straw Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ff0055]/15 via-amber-500/10 to-transparent border-l-4 border-[#ff0055]">
        <div className="text-xs font-black uppercase tracking-wider text-[#ff4d79] mb-1 flex items-center gap-1.5">
          <Skull className="w-4 h-4" />
          <span>The Final Straw:</span>
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-100 italic">
          "{post.finalStraw}"
        </p>
      </div>

      {/* Main Story Content */}
      <div className="space-y-2">
        <div className="text-xs font-black uppercase tracking-wider text-slate-400">
          WHY I QUIT & WHAT HAPPENED:
        </div>
        <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line font-normal">
          {post.content}
        </div>
      </div>

      {/* Salary & Freedom Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-white/10 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Left-Behind Salary</span>
            <span className="text-emerald-400 font-extrabold text-sm font-mono">{post.salaryWas || "$120,000"}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Current Status</span>
            <span className="text-purple-300 font-extrabold text-sm">100% Liberated & Thriving ✨</span>
          </div>
        </div>
      </div>

      {/* Reaction Toolbar */}
      <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10 flex-wrap">
        
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleReactionClick('fire', '🔥')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-[#ff0055]/20 border border-white/10 hover:border-[#ff0055]/50 text-xs font-bold text-slate-200 hover:text-white transition-all transform active:scale-95"
            title="Fired Up!"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{post.reactions?.fire || 0}</span>
          </button>

          <button
            onClick={() => handleReactionClick('tea', '☕')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 text-xs font-bold text-slate-200 hover:text-white transition-all transform active:scale-95"
            title="Spill The Tea"
          >
            <Coffee className="w-4 h-4 text-cyan-400" />
            <span>{post.reactions?.tea || 0}</span>
          </button>

          <button
            onClick={() => handleReactionClick('redFlag', '🚩')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/50 text-xs font-bold text-slate-200 hover:text-white transition-all transform active:scale-95"
            title="Major Red Flag"
          >
            <Flag className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>{post.reactions?.redFlag || 0}</span>
          </button>

          <button
            onClick={() => handleReactionClick('ovation', '👏')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 text-xs font-bold text-slate-200 hover:text-white transition-all transform active:scale-95"
            title="Respect"
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span>{post.reactions?.ovation || 0}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sfx.playPop();
              setShowComments(!showComments);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-[#ff0055]" />
            <span>{post.comments?.length || 0} Comments</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all relative"
            title="Share Story"
          >
            <Share2 className="w-4 h-4" />
            {isCopied && (
              <span className="absolute -top-8 right-0 bg-[#ff0055] text-white text-[10px] px-2.5 py-1 rounded-md shadow-lg font-bold whitespace-nowrap animate-bounce">
                Copied Link!
              </span>
            )}
          </button>
        </div>

      </div>

      {/* RICH COMMENT THREAD & COMMENT OPTIONS */}
      {showComments && (
        <div className="pt-4 border-t border-white/10 space-y-4 animate-fade-in">
          
          {/* Comment Options Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Post a public anonymous comment or ask a question..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="input-field text-xs py-2.5 rounded-xl"
              />
              <button type="submit" className="btn btn-primary py-2 px-5 text-xs shrink-0 rounded-xl font-bold">
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Comment Options Checkbox */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={requestDmInComment}
                  onChange={(e) => setRequestDmInComment(e.target.checked)}
                  className="accent-[#ff0055]"
                />
                <span>Tag as 💬 "Requesting 1-on-1 Private Chat"</span>
              </label>

              <span className="text-slate-500 font-mono">100% Anonymous Commenting</span>
            </div>
          </form>

          {/* Comment Thread List with Author Highlights */}
          <div className="space-y-3">
            {post.comments?.map((c, i) => {
              const isStoryAuthor = c.author === post.authorAlias || c.isAuthor;

              return (
                <div 
                  key={c.id || i} 
                  className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition-all ${
                    isStoryAuthor 
                      ? 'bg-amber-500/10 border-amber-500/30' 
                      : 'bg-slate-900/80 border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold">
                      <span>{c.avatar || "💬"}</span>
                      <span className={isStoryAuthor ? 'text-amber-300 font-black' : 'text-slate-200'}>
                        {c.author}
                      </span>

                      {/* Author Highlight Badge */}
                      {isStoryAuthor && (
                        <span className="px-2 py-0.5 text-[9px] rounded-full bg-amber-500/20 text-amber-300 font-black font-mono border border-amber-500/30">
                          ⭐ STORY AUTHOR
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-500 font-mono">{c.timestamp || "Just now"}</span>
                      <button 
                        onClick={() => handleCommentUpvote(c.id)}
                        className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-emerald-400 font-bold"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{c.upvotes || 1}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed font-normal">{c.text}</p>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </article>
  );
}
