import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  ShieldAlert, 
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { BUZZWORD_DICTIONARY } from '../data/buzzwords';
import { sfx } from '../utils/audio';

export default function BuzzwordDecoder() {
  const [inputText, setInputText] = useState('');
  const [decodedResults, setDecodedResults] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const sampleTexts = [
    "We are seeking a self-starter with high ownership for a fast-paced environment where you will wear many hats. We offer competitive compensation aligned with market rates and a flexible PTO policy. We are like a family here and work hard, play hard!",
    "Due to a strategic re-alignment of corporate priorities, we are increasing in-office synergy and cross-functional alignment."
  ];

  const handleScan = (textToScan = inputText) => {
    if (!textToScan.trim()) return;
    sfx.playShred();
    setIsScanning(true);

    setTimeout(() => {
      const lower = textToScan.toLowerCase();
      const matches = BUZZWORD_DICTIONARY.filter(item => 
        lower.includes(item.phrase.toLowerCase())
      );
      setDecodedResults(matches);
      setIsScanning(false);
    }, 400);
  };

  const handleLoadSample = (sample) => {
    sfx.playPop();
    setInputText(sample);
    handleScan(sample);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border-purple-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black font-mono uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>CORPORATE BS SCANNER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
          Corporate Buzzword <span className="text-gradient-purple">Decoder</span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium">
          Paste any job description, manager email, or LinkedIn post. Our algorithm strips away corporate fluff to reveal what leadership is <strong className="text-white">ACTUALLY</strong> saying.
        </p>
      </div>

      {/* Input Section */}
      <div className="glow-card rounded-3xl p-6 space-y-4">
        
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <label className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#ff0055]" />
            <span>Paste Corporate Text / Job Offer Below:</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Try Sample:</span>
            <button
              onClick={() => handleLoadSample(sampleTexts[0])}
              className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 transition-all font-bold"
            >
              Sample Job Post 🚩
            </button>
          </div>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste text here... e.g. 'We work hard, play hard in a fast-paced environment where we are like a family...'"
          className="input-field text-sm h-36 font-sans rounded-2xl bg-slate-900/90"
        />

        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-400 font-mono">
            {inputText.length} Characters
          </span>

          <button
            onClick={() => handleScan()}
            disabled={isScanning || !inputText.trim()}
            className="btn btn-primary shadow-xl shadow-[#ff0055]/30 text-xs px-7 py-3 rounded-xl font-bold"
          >
            <Zap className="w-4 h-4" />
            <span>{isScanning ? 'Decoding Fluff...' : 'Decode Red Flags'}</span>
          </button>
        </div>

      </div>

      {/* Results Section */}
      {decodedResults.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-500" />
              <span>Decoded Red Flags ({decodedResults.length} Detected)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decodedResults.map((item, idx) => (
              <div 
                key={idx}
                className="glow-card rounded-2xl p-5 space-y-3 border-l-4 border-rose-500 bg-slate-900/90"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black font-mono text-rose-400 uppercase tracking-wide">
                    {item.flagLevel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">{item.category}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Corporate Jargon Used:</span>
                  <p className="text-sm font-extrabold text-amber-300 font-mono">"{item.phrase}"</p>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Unfiltered Reality Translation:</span>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {item.translation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dictionary Reference Grid */}
      <div className="glow-card rounded-3xl p-6 space-y-4">
        <h3 className="text-xl font-black text-white">Corporate BS Dictionary Index</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BUZZWORD_DICTIONARY.map((b, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1.5 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-100">{b.phrase}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{b.translation}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
