import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Building2, 
  Briefcase, 
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { sfx } from '../utils/audio';

export default function ResignationLetterGenerator() {
  const [employeeName, setEmployeeName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [noticePeriodWeeks, setNoticePeriodWeeks] = useState('4');
  const [lastWorkingDay, setLastWorkingDay] = useState('');
  const [reasonTone, setReasonTone] = useState('polite');
  const [copied, setCopied] = useState(false);

  const generateLetterText = () => {
    const name = employeeName || "[Your Name]";
    const manager = managerName || "[Manager's Name / HR]";
    const company = companyName || "[Company Name]";
    const jobRole = role || "[Your Job Title]";
    const lastDay = lastWorkingDay || "[Last Working Date]";

    if (reasonTone === 'direct') {
      return `Date: ${new Date().toLocaleDateString()}

To: ${manager}
${company}

Subject: Resignation Notice - ${name} (${jobRole})

Dear ${manager},

Please accept this letter as formal notification that I am resigning from my position as ${jobRole} at ${company}. My last working day will be ${lastDay}, fulfilling my ${noticePeriodWeeks}-week notice period.

During my remaining time, I will focus on completing my pending tasks, documenting ongoing workflows, and assisting with a smooth handover of my responsibilities.

I request that my final settlement, provident fund clearance, and experience certificate be processed as per standard regulations upon completion of my last working day.

Sincerely,

${name}
${jobRole}`;
    }

    return `Date: ${new Date().toLocaleDateString()}

To: ${manager}
${company}

Subject: Resignation Notice - ${name} (${jobRole})

Dear ${manager},

I am writing to formally announce my resignation from my role as ${jobRole} at ${company}. As per our agreement, my last working day will be ${lastDay}.

I would like to express my sincere appreciation for the opportunities I had during my tenure at ${company}. I am grateful for the experiences gained and the chance to collaborate with the team.

Over the coming ${noticePeriodWeeks} weeks, I am fully committed to ensuring a seamless transition of my duties. I will organize all project documentation and assist with handing over my active responsibilities to the designated team members.

Please let me know the procedure for my final clearance, experience certificate, and final settlement processing.

Wishing ${company} continued success.

Warm regards,

${name}
${jobRole}`;
  };

  const letterText = generateLetterText();

  const handleCopy = () => {
    sfx.playPop();
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#ff0055]/20 to-slate-900 border-[#ff0055]/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff0055]/20 text-[#ff4d79] text-xs font-black font-mono uppercase tracking-wider">
          <FileText className="w-4 h-4 text-[#ff0055]" />
          <span>1-CLICK CORPORATE RESIGNATION GENERATOR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Generate Your <span className="text-gradient-fire">Formal "I Quit" Letter</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Generate a polite, professional, bulletproof resignation email for HR & management in 1 click.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Parameters */}
        <div className="glow-card rounded-3xl p-6 space-y-4 bg-slate-900/90 border-white/10">
          <h3 className="text-base font-extrabold text-white pb-2 border-b border-white/10">
            Letter Parameters
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Tanvir Ahmed"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className="input-field text-xs py-2.5 px-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Manager / HR Name</label>
              <input
                type="text"
                placeholder="e.g. Rafiqul Islam (HR Manager)"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                className="input-field text-xs py-2.5 px-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Company Name</label>
              <input
                type="text"
                placeholder="e.g. Tech Solutions Ltd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="input-field text-xs py-2.5 px-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Your Role / Job Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field text-xs py-2.5 px-3 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Notice Period</label>
                <select
                  value={noticePeriodWeeks}
                  onChange={(e) => setNoticePeriodWeeks(e.target.value)}
                  className="input-field text-xs py-2.5 px-2 rounded-xl"
                >
                  <option value="2">2 Weeks (14 Days)</option>
                  <option value="4">4 Weeks (30 Days)</option>
                  <option value="8">8 Weeks (60 Days)</option>
                  <option value="12">12 Weeks (90 Days)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Last Working Date</label>
                <input
                  type="date"
                  value={lastWorkingDay}
                  onChange={(e) => setLastWorkingDay(e.target.value)}
                  className="input-field text-xs py-2.5 px-2 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Tone</label>
              <select
                value={reasonTone}
                onChange={(e) => setReasonTone(e.target.value)}
                className="input-field text-xs py-2.5 px-2 rounded-xl"
              >
                <option value="polite">Polite & Diplomatic (Standard)</option>
                <option value="direct">Direct & Professional (Firm)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Generated Letter Output */}
        <div className="glow-card rounded-3xl p-6 space-y-4 bg-slate-900/90 border-[#ff0055]/30 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">LETTER PREVIEW</span>
              <button
                onClick={handleCopy}
                className="btn btn-primary px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-slate-200 leading-relaxed overflow-y-auto max-h-[380px] whitespace-pre-wrap selection:bg-[#ff0055] selection:text-white">
              {letterText}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ready to copy into your email client or print for HR.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
