import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Building2, 
  Flame, 
  ShieldCheck, 
  Download,
  X,
  LogOut
} from 'lucide-react';
import { sfx } from '../utils/audio';

export default function ShareCardModal({ isOpen, onClose, post }) {
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen || !post) return null;

  const shareText = `🔥 Why I Quit ${post.formerCompany} (${post.role}):\n"${post.finalStraw}"\n\nRead full story & salaries anonymously on LinkedOut Bangladesh 🇧🇩\nhttps://linked-out-dusky.vercel.app/`;

  const handleCopy = () => {
    sfx.playPop();
    navigator.clipboard.writeText(shareText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glow-card max-w-xl w-full p-6 sm:p-8 space-y-6 rounded-3xl border-[#ff0055]/40 bg-slate-900/95 relative overflow-hidden">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff0055]/20 text-[#ff4d79] text-xs font-black font-mono uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-[#ff0055]" />
            <span>SHAREABLE STORY CARD</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Share on Facebook, LinkedIn or Reddit
          </h3>
        </div>

        {/* Story Card Image/Banner Mockup */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c101d] via-[#161f38] to-[#0c101d] border-2 border-[#ff0055]/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff0055] to-[#ff5500] flex items-center justify-center text-white font-bold text-xs">
                {post.avatar || "🇧🇩"}
              </div>
              <div>
                <span className="font-extrabold text-sm text-white block">{post.authorAlias}</span>
                <span className="text-[10px] text-slate-400 font-mono block">{post.role} @ {post.formerCompany}</span>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">LinkedOut BD 🇧🇩</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/50 border-l-4 border-[#ff0055] space-y-1">
            <span className="text-[10px] font-mono text-[#ff4d79] font-bold">THE FINAL STRAW</span>
            <p className="text-xs font-bold text-white leading-snug">"{post.finalStraw}"</p>
          </div>

          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed italic">
            "{post.content}"
          </p>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-white/10">
            <span>🔥 100% Anonymous BD Story</span>
            <span>linked-out-dusky.vercel.app</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className="btn btn-primary flex-1 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
          >
            {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedText ? 'Text Copied!' : 'Copy Share Post Text'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
