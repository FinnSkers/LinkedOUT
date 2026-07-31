import React, { useState } from 'react';
import { 
  HelpCircle, 
  Flame, 
  CheckCircle2, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

const QUIZ_QUESTIONS = [
  {
    question: "1. Is Saturday a mandatory office day for your team?",
    options: [
      { text: "Yes, every Saturday is mandatory (6 days/week)", points: 20 },
      { text: "Alternate Saturdays or emergency only", points: 10 },
      { text: "No, strict 5-day work week (Sun - Thu)", points: 0 }
    ]
  },
  {
    question: "2. Does management or your boss message/call on WhatsApp after 9 PM?",
    options: [
      { text: "Frequently, expects instant replies late at night", points: 20 },
      { text: "Occasionally for urgent issues", points: 10 },
      { text: "Never, strict respect for personal time", points: 0 }
    ]
  },
  {
    question: "3. Has your salary ever been delayed by 1+ months?",
    options: [
      { text: "Yes, regularly delayed by 1-3 months", points: 20 },
      { text: "Once or twice in the past year", points: 10 },
      { text: "Never, paid on or before the 1st of every month", points: 0 }
    ]
  },
  {
    question: "4. How does management handle notice periods and experience certificates?",
    options: [
      { text: "Threatens to withhold experience certificate / clearance", points: 20 },
      { text: "Demands 3-month notice without flexibility", points: 10 },
      { text: "Smooth standard 30-day clearance & certificate process", points: 0 }
    ]
  },
  {
    question: "5. Are you expected to do unpaid overtime during crunch periods?",
    options: [
      { text: "Yes, 10-15+ extra hours weekly with zero overtime pay", points: 20 },
      { text: "Sometimes, occasional late hours", points: 10 },
      { text: "No, overtime is paid or rare", points: 0 }
    ]
  }
];

export default function ToxicQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (questionIdx, points) => {
    sfx.playPop();
    const updated = { ...selectedAnswers, [questionIdx]: points };
    setSelectedAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0055', '#ff5500', '#00f2fe']
      });
    }
  };

  const calculateTotalScore = () => {
    return Object.values(selectedAnswers).reduce((a, b) => a + b, 0);
  };

  const totalScore = calculateTotalScore();

  const getVerdict = (score) => {
    if (score >= 70) return { title: "🔴 EXTREMELY TOXIC WORKPLACE", desc: "Your office exhibits severe red flags (unpaid overtime, delayed salaries, late-night micromanagement). Start updating your CV and plan your exit!", color: "text-[#ff0055]" };
    if (score >= 40) return { title: "🟡 MODERATE TOXICITY HAZARD", desc: "Your workplace has notable boundary issues. Keep track of your accomplishments and know your legal BD labor rights.", color: "text-amber-400" };
    return { title: "🟢 HEALTHY WORKPLACE ENVIRONMENT", desc: "Great news! Your office respects work-life balance and basic employee rights.", color: "text-emerald-400" };
  };

  const verdict = getVerdict(totalScore);

  const handleReset = () => {
    sfx.playPop();
    setCurrentStep(0);
    setSelectedAnswers({});
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#ff0055]/20 to-slate-900 border-[#ff0055]/30 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff0055]/20 text-[#ff4d79] text-xs font-black font-mono uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#ff0055]" />
          <span>BANGLADESHI WORKPLACE TOXICITY QUIZ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Is Your Office <span className="text-gradient-fire">Toxic? (Quiz)</span>
        </h2>
        <p className="text-slate-300 text-sm font-medium">
          Answer 5 quick questions tailored for BD work culture to calculate your company's Toxicity Score.
        </p>
      </div>

      {!quizFinished ? (
        <div className="glow-card rounded-3xl p-6 sm:p-8 space-y-6 bg-slate-900/90 border-white/10">
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono font-bold text-slate-400">
              <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-[#ff0055] to-amber-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {QUIZ_QUESTIONS[currentStep].question}
            </h3>

            <div className="space-y-3 pt-2">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentStep, opt.points)}
                  className="w-full p-4 rounded-2xl bg-black/50 hover:bg-[#ff0055]/20 border border-white/15 hover:border-[#ff0055]/50 text-left text-sm font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.text}</span>
                  <div className="w-5 h-5 rounded-full border border-white/30 group-hover:border-[#ff0055] group-hover:bg-[#ff0055] transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Quiz Results Card */
        <div className="glow-card rounded-3xl p-8 space-y-6 bg-slate-900/90 border-2 border-[#ff0055]/40 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-black border border-white/15 flex items-center justify-center mx-auto text-4xl shadow-2xl">
            {totalScore >= 70 ? '🚨' : totalScore >= 40 ? '⚠️' : '✅'}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">YOUR RESULT SCORE</span>
            <div className="text-4xl sm:text-5xl font-black font-mono text-gradient-fire">
              {totalScore} / 100 Toxicity Rating
            </div>
            <h3 className={`text-xl font-extrabold ${verdict.color} pt-2`}>
              {verdict.title}
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed pt-1">
              {verdict.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleReset}
              className="btn btn-secondary px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
