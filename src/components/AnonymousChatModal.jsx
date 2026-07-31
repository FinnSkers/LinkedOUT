import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Lock, 
  ShieldCheck, 
  MessageSquare, 
  UserX, 
  Sparkles,
  Bot,
  CheckCheck
} from 'lucide-react';
import { sfx } from '../utils/audio';

const QUICK_QUESTIONS = [
  "Did management offer a counter-offer when you quit?",
  "How did you handle your healthcare/benefits transition?",
  "Did HR try to enforce an NDA or non-compete?",
  "What was the team's reaction when you announced it?"
];

export default function AnonymousChatModal({ isOpen, onClose, targetPost }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [myAlias] = useState(`Anonymous Reader #${Math.floor(Math.random() * 8999) + 1000}`);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && targetPost) {
      // Seed initial welcome message from the author
      setMessages([
        {
          id: 'welcome-1',
          sender: targetPost.authorAlias,
          avatar: targetPost.avatar || '🔥',
          text: `Hey! I'm ${targetPost.authorAlias}. Feel free to ask me anything about my experience at ${targetPost.formerCompany} or why I quit. Our chat is 100% anonymous and encrypted.`,
          timestamp: 'Just now',
          isAuthor: true
        }
      ]);
    }
  }, [isOpen, targetPost]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen || !targetPost) return null;

  const handleSendMessage = (textToSend = inputMessage) => {
    if (!textToSend.trim()) return;
    sfx.playShred();

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: myAlias,
      avatar: '🕶️',
      text: textToSend,
      timestamp: 'Just now',
      isMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Simulate real-time author reply for demo interactivity
    setTimeout(() => {
      sfx.playPop();
      let replyText = "That's a great question. Honestly, once I realized leadership was prioritizing short-term metrics over people, there was no looking back. The peace of mind after handing in my badge was worth every single dollar.";
      
      if (textToSend.toLowerCase().includes('counter')) {
        replyText = "They tried offering a $20k retention bonus on the spot, but I knew the toxic culture wouldn't change. I turned it down immediately.";
      } else if (textToSend.toLowerCase().includes('health') || textToSend.toLowerCase().includes('insurance')) {
        replyText = "I used COBRA for a 2-week gap before my new employer's benefits kicked in on day 1.";
      } else if (textToSend.toLowerCase().includes('nda') || textToSend.toLowerCase().includes('non-compete')) {
        replyText = "HR reminded me of standard confidentiality, but non-competes in tech/healthcare are largely unenforceable in most states.";
      }

      const authorReply = {
        id: `reply-${Date.now()}`,
        sender: targetPost.authorAlias,
        avatar: targetPost.avatar || '🔥',
        text: replyText,
        timestamp: 'Just now',
        isAuthor: true
      };

      setMessages(prev => [...prev, authorReply]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="glow-card w-full max-w-2xl h-[620px] flex flex-col rounded-3xl border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl text-white shadow-lg shadow-cyan-500/20 shrink-0">
              🕶️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">{targetPost.authorAlias}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold font-mono">1-ON-1 ANONYMOUS CHAT</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Regarding: <span className="text-slate-200 font-semibold">{targetPost.formerCompany}</span> ({targetPost.role})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Shield Banner */}
        <div className="bg-cyan-950/30 border-b border-cyan-500/20 px-4 py-2 text-[11px] text-cyan-300 flex items-center justify-between font-mono">
          <span className="flex items-center gap-1.5 font-bold">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>End-to-End Anonymous Session</span>
          </span>
          <span className="text-slate-400">Your Alias: <strong className="text-white">{myAlias}</strong></span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/60">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 max-w-[85%] ${msg.isMe ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-sm shrink-0">
                {msg.avatar}
              </div>

              <div className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                msg.isMe 
                  ? 'bg-gradient-to-r from-[#ff0055] to-[#ff5500] text-white font-medium rounded-tr-none shadow-md shadow-[#ff0055]/20'
                  : 'bg-slate-900 border border-white/10 text-slate-200 rounded-tl-none'
              }`}>
                <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 font-mono">
                  <span>{msg.sender}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="leading-relaxed font-normal">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Preset Quick Question Chips */}
        <div className="px-4 py-2 bg-slate-900/80 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 font-bold whitespace-nowrap border border-white/10 transition-all shrink-0"
            >
              💬 "{q}"
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }} 
          className="p-3 sm:p-4 bg-slate-900 border-t border-white/10 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask an anonymous follow-up question..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="input-field text-xs py-2.5 rounded-xl bg-slate-950"
          />
          <button type="submit" className="btn btn-primary py-2 px-5 text-xs rounded-xl font-bold">
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
