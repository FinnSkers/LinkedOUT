import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  AlertOctagon, 
  Clock, 
  FileCheck, 
  Briefcase,
  HelpCircle
} from 'lucide-react';

const RIGHTS_LIST = [
  {
    title: "1. Notice Period Regulations",
    summary: "As per Bangladesh Labor Act 2006 (Section 27), permanent workers resigning must provide 30 days (1 month) written notice or pay equivalent basic salary. Employers cannot demand 90 days notice unless specifically agreed upon in writing with additional compensation.",
    icon: Clock,
    color: "text-cyan-400"
  },
  {
    title: "2. Right to Experience Certificate & Release Letter",
    summary: "Upon completion of the notice period and final clearance, an employee is legally entitled to an Service/Experience Certificate. Withholding experience certificates or release letters as leverage is illegal under BD labor guidelines.",
    icon: FileCheck,
    color: "text-emerald-400"
  },
  {
    title: "3. Provident Fund & Gratuity Payout Timelines",
    summary: "Final settlement, including employee and employer contributions to Provident Fund (PF) and accumulated gratuity, must be disbursed within 30 working days after the last working day.",
    icon: Briefcase,
    color: "text-amber-400"
  },
  {
    title: "4. Overtime & Work Hour Caps",
    summary: "Standard work hours are capped at 8 hours per day / 48 hours per week. Any work beyond this must be compensated at double the normal basic wage rate (2x hourly rate). Unpaid overtime is a violation of BD labor laws.",
    icon: AlertOctagon,
    color: "text-rose-400"
  }
];

export default function LaborLawGuide() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-cyan-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black font-mono uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>BANGLADESH LABOR LAW & WORKER RIGHTS GUIDE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Know Your <span className="text-gradient-cyan">Legal Workplace Rights 🇧🇩</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Key facts from the Bangladesh Labor Act 2006 regarding notice periods, experience certificates, final settlements, and overtime.
        </p>
      </div>

      {/* Rights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {RIGHTS_LIST.map((r, i) => {
          const IconComponent = r.icon;
          return (
            <div 
              key={i}
              className="glow-card rounded-3xl p-6 space-y-3 bg-slate-900/90 border-white/10 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${r.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-white">{r.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {r.summary}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
