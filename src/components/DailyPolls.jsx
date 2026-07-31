import React, { useState } from 'react';
import { 
  BarChart2, 
  Flame, 
  CheckCircle2, 
  Sparkles,
  Users
} from 'lucide-react';
import { sfx } from '../utils/audio';

const INITIAL_POLLS = [
  {
    id: 'poll-1',
    question: "1. Does your boss or team leader message you on WhatsApp after 9:00 PM?",
    options: [
      { id: 'p1-a', text: "Yes, almost every night", votes: 420 },
      { id: 'p1-b', text: "Occasionally during crunch time", votes: 215 },
      { id: 'p1-c', text: "Never, strict boundaries", votes: 98 }
    ]
  },
  {
    id: 'poll-2',
    question: "2. Is Saturday office mandatory at your current workplace?",
    options: [
      { id: 'p2-a', text: "Yes, 6-day work week is mandatory", votes: 530 },
      { id: 'p2-b', text: "Alternate Saturdays (2 Saturdays/mo)", votes: 190 },
      { id: 'p2-c', text: "No, strict 5-day week (Sun - Thu)", votes: 310 }
    ]
  },
  {
    id: 'poll-3',
    question: "3. Have you ever had your experience certificate or clearance delayed after quitting?",
    options: [
      { id: 'p3-a', text: "Yes, withheld/delayed for leverage", votes: 340 },
      { id: 'p3-b', text: "Took more than 45 days to issue", votes: 180 },
      { id: 'p3-c', text: "No, smooth clearance on time", votes: 260 }
    ]
  }
];

export default function DailyPolls() {
  const [polls, setPolls] = useState(INITIAL_POLLS);
  const [userVotedOptions, setUserVotedOptions] = useState({});

  const handleVote = (pollId, optionId) => {
    if (userVotedOptions[pollId]) return;
    sfx.playPop();

    setUserVotedOptions(prev => ({ ...prev, [pollId]: optionId }));

    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map(opt => {
              if (opt.id === optionId) {
                return { ...opt, votes: opt.votes + 1 };
              }
              return opt;
            })
          };
        }
        return poll;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#ff0055]/20 to-slate-900 border-[#ff0055]/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff0055]/20 text-[#ff4d79] text-xs font-black font-mono uppercase tracking-wider">
          <BarChart2 className="w-4 h-4 text-[#ff0055]" />
          <span>DAILY ANONYMOUS WORKPLACE VIBE CHECK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Anonymous <span className="text-gradient-fire">Community Polls 🇧🇩</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Vote anonymously on daily workplace questions and see live real-time statistics from Bangladeshi workers.
        </p>
      </div>

      {/* Poll Cards */}
      <div className="space-y-5">
        {polls.map((poll) => {
          const totalVotes = poll.options.reduce((acc, o) => acc + o.votes, 0);
          const hasVoted = Boolean(userVotedOptions[poll.id]);

          return (
            <div 
              key={poll.id}
              className="glow-card rounded-3xl p-6 space-y-5 bg-slate-900/90 border-white/10"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  {poll.question}
                </h3>
                <span className="text-xs font-mono text-slate-400 font-bold shrink-0 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{totalVotes} Votes</span>
                </span>
              </div>

              <div className="space-y-3">
                {poll.options.map((opt) => {
                  const percent = Math.round((opt.votes / totalVotes) * 100) || 0;
                  const isSelected = userVotedOptions[poll.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleVote(poll.id, opt.id)}
                      disabled={hasVoted}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all relative overflow-hidden flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-[#ff0055]/20 border-[#ff0055] text-white' 
                          : 'bg-black/40 border-white/15 text-slate-300 hover:border-white/30'
                      }`}
                    >
                      {/* Background Bar */}
                      {hasVoted && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 bg-white/10 transition-all duration-500 rounded-2xl"
                          style={{ width: `${percent}%` }}
                        />
                      )}

                      <span className="relative z-10 font-bold">{opt.text}</span>

                      {hasVoted && (
                        <span className="relative z-10 font-mono font-black text-amber-400">
                          {percent}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {hasVoted && (
                <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Your anonymous vote has been recorded!</span>
                </p>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
