import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ResignationFeed from './components/ResignationFeed';
import SanityCalculator from './components/SanityCalculator';
import Leaderboard from './components/Leaderboard';
import ResignationModal from './components/ResignationModal';
import AnonymousChatModal from './components/AnonymousChatModal';
import MyStoriesDashboard from './components/MyStoriesDashboard';
import { supabase, TABLE_NAME } from './lib/supabase';
import { Database, Terminal } from 'lucide-react';
import { getOrCreateDeviceToken } from './utils/anonymousKey';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatTargetPost, setChatTargetPost] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [supabaseStatusText, setSupabaseStatusText] = useState('Checking Supabase Database...');
  const [showSqlModal, setShowSqlModal] = useState(false);

  // Hard purge ALL old local storage cache on startup
  useEffect(() => {
    localStorage.removeItem('linkedout_posts');
    localStorage.removeItem('linkedout_posts_real');
    localStorage.removeItem('linkedout_posts_real_v2');
  }, []);

  // Posts state initialized to 100% EMPTY array (zero pre-created items)
  const [posts, setPosts] = useState([]);

  // Fetch Real User Posts from Supabase on Mount
  useEffect(() => {
    async function loadSupabasePosts() {
      try {
        const { data, error } = await supabase
          .from(TABLE_NAME)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn("Supabase load error:", error.message);
          setPosts([]);
          setSupabaseConnected(false);
          setSupabaseStatusText(`Supabase Table '${TABLE_NAME}' ready for 1st Real User Post`);
        } else if (data && data.length > 0) {
          const formattedData = data.map(item => ({
            id: item.id,
            authorAlias: item.author_alias || item.authorAlias,
            avatar: item.avatar || "🔥",
            formerCompany: item.former_company || item.formerCompany,
            role: item.role,
            tenure: item.tenure,
            category: item.category,
            finalStraw: item.final_straw || item.finalStraw,
            content: item.content,
            toxicBadges: item.toxic_badges || item.toxicBadges || [],
            salaryWas: item.salary_was || item.salaryWas,
            allowDms: item.allow_dms !== false,
            deviceToken: item.device_token,
            sanityRestored: item.sanity_restored || item.sanityRestored || 98,
            timestamp: new Date(item.created_at || Date.now()).toLocaleDateString() + " (Real User Post)",
            reactions: item.reactions || { fire: 1, tea: 1, redFlag: 0, ripSanity: 0, ovation: 1 },
            comments: item.comments || []
          }));
          setPosts(formattedData);
          setSupabaseConnected(true);
          setSupabaseStatusText(`🟢 Live Supabase Sync ('${TABLE_NAME}' — ${data.length} Real User Posts)`);
        } else {
          // Zero records in Supabase = Zero posts on page
          setPosts([]);
          setSupabaseConnected(true);
          setSupabaseStatusText(`🟢 Connected to Supabase ('${TABLE_NAME}' clean — 0 real posts)`);
        }
      } catch (err) {
        setPosts([]);
        setSupabaseConnected(false);
        setSupabaseStatusText('Supabase Offline / Fallback');
      }
    }

    loadSupabasePosts();
  }, []);

  // Toggle DM Availability for a Story
  const handleToggleDms = async (postId) => {
    let newStatus = true;
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          newStatus = post.allowDms === false ? true : false;
          return {
            ...post,
            allowDms: newStatus
          };
        }
        return post;
      })
    );

    if (supabaseConnected && typeof postId === 'string' && postId.includes('-') === false) {
      try {
        await supabase
          .from(TABLE_NAME)
          .update({ allow_dms: newStatus })
          .eq('id', postId);
      } catch (err) {
        console.warn("Supabase toggle DM error:", err);
      }
    }
  };

  // Open 1-on-1 Anonymous Chat
  const handleOpenAnonymousChat = (post) => {
    setChatTargetPost(post);
    setIsChatOpen(true);
  };

  // Scroll to "Share Why You Left" Box
  const handleScrollToShare = () => {
    setActiveTab('feed');
    setTimeout(() => {
      const el = document.getElementById('share-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsModalOpen(true);
      }
    }, 100);
  };

  // Reaction Handler with Supabase update
  const handleReact = async (postId, reactionType) => {
    let updatedReactions = {};

    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentReactions = post.reactions || {};
          updatedReactions = {
            ...currentReactions,
            [reactionType]: (currentReactions[reactionType] || 0) + 1
          };
          return {
            ...post,
            reactions: updatedReactions
          };
        }
        return post;
      })
    );

    if (supabaseConnected && typeof postId === 'string' && postId.includes('-') === false) {
      try {
        await supabase
          .from(TABLE_NAME)
          .update({ reactions: updatedReactions })
          .eq('id', postId);
      } catch (err) {
        console.warn("Supabase update error:", err);
      }
    }
  };

  // Add Comment Handler with Supabase update
  const handleAddComment = async (postId, commentText) => {
    let updatedComments = [];

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: "Anonymous Reader",
            avatar: "⚡",
            text: commentText,
            timestamp: "Just now"
          };
          updatedComments = [...(post.comments || []), newComment];
          return {
            ...post,
            comments: updatedComments
          };
        }
        return post;
      })
    );

    if (supabaseConnected && typeof postId === 'string' && postId.includes('-') === false) {
      try {
        await supabase
          .from(TABLE_NAME)
          .update({ comments: updatedComments })
          .eq('id', postId);
      } catch (err) {
        console.warn("Supabase comment error:", err);
      }
    }
  };

  // Real User Story Submission with Direct Supabase Insert
  const handleSubmitStory = async (newStoryData) => {
    const currentDeviceToken = getOrCreateDeviceToken();

    const newPost = {
      id: `post-${Date.now()}`,
      ...newStoryData,
      deviceToken: currentDeviceToken,
      allowDms: newStoryData.allowDms !== false,
      reactions: { fire: 1, tea: 1, redFlag: 0, ripSanity: 0, ovation: 1 },
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);
    setActiveTab('feed');

    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert([{
          author_alias: newStoryData.authorAlias,
          avatar: newStoryData.avatar,
          former_company: newStoryData.formerCompany,
          role: newStoryData.role,
          tenure: newStoryData.tenure,
          category: newStoryData.category,
          final_straw: newStoryData.finalStraw,
          content: newStoryData.content,
          toxic_badges: newStoryData.toxicBadges,
          salary_was: newStoryData.salaryWas,
          sanity_restored: newStoryData.sanityRestored,
          allow_dms: newStoryData.allowDms !== false,
          device_token: currentDeviceToken,
          reactions: { fire: 1, tea: 1, redFlag: 0, ripSanity: 0, ovation: 1 },
          comments: []
        }]);

      if (error) {
        console.warn("Supabase insert note:", error.message);
      } else {
        console.log("Real user story published to Supabase!", data);
      }
    } catch (err) {
      console.warn("Supabase insert exception:", err);
    }
  };

  const sqlSetupScript = `CREATE TABLE public.${TABLE_NAME} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_alias TEXT NOT NULL,
  avatar TEXT,
  former_company TEXT NOT NULL,
  role TEXT,
  tenure TEXT,
  category TEXT NOT NULL,
  final_straw TEXT NOT NULL,
  content TEXT NOT NULL,
  toxic_badges JSONB DEFAULT '[]'::jsonb,
  salary_was TEXT,
  sanity_restored INT DEFAULT 95,
  allow_dms BOOLEAN DEFAULT true,
  device_token TEXT,
  reactions JSONB DEFAULT '{"fire": 1, "tea": 1, "redFlag": 0, "ripSanity": 0, "ovation": 1}'::jsonb,
  comments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS & public policies
ALTER TABLE public.${TABLE_NAME} ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.${TABLE_NAME} FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.${TABLE_NAME} FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.${TABLE_NAME} FOR UPDATE USING (true);`;

  return (
    <div className="min-h-screen flex flex-col bg-[#05070d] text-slate-100 font-sans selection:bg-[#ff0055] selection:text-white">
      
      {/* Supabase Status Banner */}
      <div className="bg-slate-900 border-b border-white/10 px-4 py-2 text-xs flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 font-mono">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-bold">{supabaseStatusText}</span>
        </div>

        <button 
          onClick={() => setShowSqlModal(true)}
          className="text-[11px] px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 font-bold font-mono flex items-center gap-1.5"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>View Supabase SQL Schema</span>
        </button>
      </div>

      {/* Header Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onScrollToShare={handleScrollToShare}
      />

      {/* Main App Workspace View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'feed' && (
          <ResignationFeed 
            posts={posts}
            onReact={handleReact}
            onAddComment={handleAddComment}
            onSubmitStory={handleSubmitStory}
            onOpenAnonymousChat={handleOpenAnonymousChat}
          />
        )}

        {activeTab === 'mystories' && (
          <MyStoriesDashboard 
            posts={posts}
            onToggleDms={handleToggleDms}
            onOpenChat={handleOpenAnonymousChat}
          />
        )}

        {activeTab === 'calculator' && (
          <SanityCalculator />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard />
        )}
      </main>

      {/* Create / Resignation Post Modal */}
      <ResignationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitStory={handleSubmitStory}
      />

      {/* 1-on-1 Anonymous Chat Modal */}
      <AnonymousChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        targetPost={chatTargetPost}
      />

      {/* SQL Setup Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glow-card max-w-2xl w-full p-6 space-y-4 rounded-3xl border-cyan-500/30">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <span>Supabase SQL Table Schema (linkedout_posts)</span>
              </h3>
              <button onClick={() => setShowSqlModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs font-mono text-cyan-300 overflow-x-auto selection:bg-cyan-500 selection:text-black">
              {sqlSetupScript}
            </pre>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(sqlSetupScript);
                  alert("SQL copied to clipboard!");
                }} 
                className="btn btn-primary text-xs"
              >
                Copy SQL Script
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-[#05070a] text-center text-xs text-slate-500 space-y-2">
        <p className="font-bold text-slate-300">
          LinkedOut — Share Why You Left: 100% Real User Posts & Supabase Sync.
        </p>
        <p className="font-mono text-slate-500">Connected to Supabase Database: gkddsnllqwubtuoulcrh.supabase.co</p>
      </footer>

    </div>
  );
}
