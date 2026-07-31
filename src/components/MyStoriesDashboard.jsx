import React, { useState } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  MessageSquare, 
  MessageCircleCode, 
  ToggleLeft, 
  ToggleRight, 
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  Flame,
  KeyRound
} from 'lucide-react';
import { sfx } from '../utils/audio';
import { getOrCreateDeviceToken, saveSecretKey } from '../utils/anonymousKey';

export default function MyStoriesDashboard({ posts, onToggleDms, onOpenChat }) {
  const [deviceToken, setDeviceToken] = useState(getOrCreateDeviceToken());
  const [copiedKey, setCopiedKey] = useState(false);
  const [importKeyInput, setImportKeyInput] = useState('');
  const [showImport, setShowImport] = useState(false);

  // Filter posts created on this device (or matching token)
  const myStories = posts.filter(post => post.deviceToken === deviceToken || post.id.startsWith('post-'));

  const handleCopyKey = () => {
    sfx.playPop();
    navigator.clipboard.writeText(deviceToken);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleImportKey = (e) => {
    e.preventDefault();
    if (!importKeyInput.trim()) return;
    sfx.playShred();
    saveSecretKey(importKeyInput);
    setDeviceToken(importKeyInput.trim());
    setImportKeyInput('');
    setShowImport(false);
    alert("Anonymous Secret Key loaded successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Secret Key Header Card */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border-emerald-500/30 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black font-mono uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ZERO-ACCOUNT ANONYMOUS TRACKER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              My Published Stories & <span className="text-gradient-fire">Active DMs</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              You are tracked using a secure <strong>Anonymous Secret Key</strong> stored on your device. No email or password needed!
            </p>
          </div>

          {/* Secret Key Box */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1 text-right shrink-0">
            <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold">Your Secret Key</span>
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono font-black text-amber-300">{deviceToken}</code>
              <button 
                onClick={handleCopyKey}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                title="Copy Secret Key"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Transfer Key Button */}
        <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-slate-400">
          <span>Want to sync your stories to your phone or another browser?</span>
          <button 
            onClick={() => setShowImport(!showImport)}
            className="text-cyan-300 hover:text-white font-bold flex items-center gap-1 font-mono"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{showImport ? 'Cancel Import' : 'Enter Key from Another Device'}</span>
          </button>
        </div>

        {/* Key Import Box */}
        {showImport && (
          <form onSubmit={handleImportKey} className="pt-3 flex gap-2 animate-fade-in">
            <input
              type="text"
              placeholder="Paste Secret Key (e.g. LO-RENEGADE-9824)"
              value={importKeyInput}
              onChange={(e) => setImportKeyInput(e.target.value)}
              className="input-field text-xs py-2 rounded-xl font-mono bg-black"
            />
            <button type="submit" className="btn btn-primary text-xs py-2 px-4 rounded-xl font-bold shrink-0">
              Load Device Key
            </button>
          </form>
        )}
      </div>

      {/* List of Published Stories by this Device */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#ff0055]" />
          <span>My Stories ({myStories.length})</span>
        </h3>

        {myStories.length > 0 ? (
          myStories.map(post => {
            const dmsActive = post.allowDms !== false;

            return (
              <div 
                key={post.id} 
                className="glow-card rounded-3xl p-6 space-y-4 border-l-4 border-[#ff0055] bg-slate-900/80"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-lg text-white">{post.formerCompany}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                        {post.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 italic">
                      "{post.finalStraw}"
                    </p>
                  </div>

                  {/* TOGGLE DM AVAILABILITY CONTROL */}
                  <button
                    onClick={() => {
                      sfx.playPop();
                      onToggleDms(post.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                      dmsActive 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-slate-800 text-slate-400 border border-white/10'
                    }`}
                  >
                    {dmsActive ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5 text-slate-500" />}
                    <span>{dmsActive ? '🟢 DMs Open (Accepting Chats)' : '🔴 DMs Offline'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {post.content}
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#ff0055]" />
                      {post.comments?.length || 0} Comments
                    </span>
                    <span>•</span>
                    <span>🔥 {Object.values(post.reactions || {}).reduce((a, b) => a + b, 0)} Total Respect Reactions</span>
                  </div>

                  <button
                    onClick={() => onOpenChat(post)}
                    className="btn btn-secondary py-1.5 px-4 text-xs rounded-xl font-bold flex items-center gap-1.5 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    <MessageCircleCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View 1-on-1 Chat Drawer</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glow-card rounded-3xl p-8 text-center space-y-3">
            <p className="text-slate-400 text-sm">You haven't published any stories from this device yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
