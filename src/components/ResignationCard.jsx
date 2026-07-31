import React, { useState } from 'react';
import { 
  Flame, 
  MessageSquare, 
  Send, 
  Building2, 
  DollarSign, 
  MessageCircleCode, 
  Clock,
  Share2
} from 'lucide-react';
import { sfx } from '../utils/audio';
import confetti from 'canvas-confetti';
import ShareCardModal from './ShareCardModal';

export default function ResignationCard({ post, onReact, onAddComment, onOpenAnonymousChat }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const reactions = post.reactions || { fire: 1, tea: 1, redFlag: 0, ripSanity: 0, ovation: 1 };
  const comments = post.comments || [];
  const dmsOpen = post.allowDms !== false;

  const handleReactionClick = (type) => {
    sfx.playPop();
    if (type === 'fire' || type === 'ovation') {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#ff0055', '#ff5500', '#ffb703']
      });
    }
    onReact(post.id, type);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    sfx.playPop();
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <article className="glow-card rounded-3xl p-6 sm:p-8 space-y-6 bg-slate-900/90 border border-white/10 relative overflow-hidden transition-all duration-300">
      
      {/* CARD HEADER: Author, Company, Tenure, Timestamp */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        
        {/* Author & Avatar */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/15 flex items-center justify-center text-2xl shadow-md shrink-0">
            {post.avatar || "🇧🇩"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                {post.authorAlias}
              </h3>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ff0055]/15 text-[#ff4d79] border border-[#ff0055]/30 text-xs font-extrabold">
                <Building2 className="w-3.5 h-3.5" />
                <span>{post.formerCompany}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1">
              <span>{post.role}</span>
              <span>•</span>
              <span>{post.tenure}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{post.timestamp}</span>
              </span>
            </div>
          </div>
        </div>

        {/* DM Status Badge */}
        <div className="shrink-0 self-end sm:self-center">
          {dmsOpen ? (
            <button
              onClick={() => {
                sfx.playPop();
                onOpenAnonymousChat(post);
              }}
              className="px-4 py-2 rounded-2xl text-xs font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/25 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer"
            >
              <MessageCircleCode className="w-4 h-4 text-emerald-400" />
              <span>🟢 DMs Open (Chat 1-on-1)</span>
            </button>
          ) : (
            <span className="px-3.5 py-1.5 rounded-2xl text-xs font-bold bg-slate-800 text-slate-400 border border-white/10 flex items-center gap-1.5">
              <span>🔴 DMs Offline</span>
            </span>
          )}
        </div>

      </div>

      {/* FINAL STRAW BLOCKQUOTE */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#ff0055]/15 via-slate-900 to-slate-900 border-l-4 border-[#ff0055] space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-black text-[#ff4d79] font-mono uppercase tracking-wider">
          <Flame className="w-4 h-4 text-[#ff0055]" />
          <span>THE FINAL STRAW</span>
        </div>
        <p className="text-sm sm:text-base font-bold text-white leading-snug">
          "{post.finalStraw}"
        </p>
      </div>

      {/* MAIN STORY CONTENT */}
      <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal whitespace-pre-line space-y-3">
        {post.content}
      </div>

      {/* TOXIC BADGES & SALARY LEFT */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {post.toxicBadges?.map((badge, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-1"
            >
              <span>#</span>
              <span>{badge}</span>
            </span>
          ))}
        </div>

        {post.salaryWas && (
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-black text-emerald-400">
            <DollarSign className="w-4 h-4" />
            <span>Left Behind: {post.salaryWas}</span>
          </div>
        )}
      </div>

      {/* CARD FOOTER: Reactions, Comment Toggle, Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-bold">
        
        {/* Respect Reaction Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleReactionClick('fire')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#ff0055]/20 border border-white/10 hover:border-[#ff0055]/40 text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>🔥</span>
            <span className="font-mono">{reactions.fire || 0}</span>
          </button>

          <button
            onClick={() => handleReactionClick('tea')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>☕</span>
            <span className="font-mono">{reactions.tea || 0}</span>
          </button>

          <button
            onClick={() => handleReactionClick('redFlag')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>🚩</span>
            <span className="font-mono">{reactions.redFlag || 0}</span>
          </button>

          <button
            onClick={() => handleReactionClick('ovation')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>👏</span>
            <span className="font-mono">{reactions.ovation || 0}</span>
          </button>
        </div>

        {/* Comment Toggle & Share Modal Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sfx.playPop();
              setShowComments(!showComments);
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex items-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#ff0055]" />
            <span>Comments ({comments.length})</span>
          </button>

          <button
            onClick={() => {
              sfx.playPop();
              setIsShareModalOpen(true);
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            title="Share Story Card"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline font-bold">Share Card</span>
          </button>
        </div>

      </div>

      {/* COMMENTS SECTION */}
      {showComments && (
        <div className="space-y-4 pt-4 border-t border-white/10 animate-fade-in">
          
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <span>{c.avatar || "⚡"}</span>
                      <span>{c.author}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{c.timestamp}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed pl-5">{c.text}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-2">No comments yet. Be the first to reply!</p>
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Write a supportive comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="input-field text-xs py-2.5 px-4 rounded-xl"
            />
            <button
              type="submit"
              className="btn btn-primary px-5 text-xs rounded-xl font-bold shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        post={post}
      />

    </article>
  );
}
