import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ResignationFeed from './components/ResignationFeed';
import SanityCalculator from './components/SanityCalculator';
import Leaderboard from './components/Leaderboard';
import ResignationModal from './components/ResignationModal';
import AnonymousChatModal from './components/AnonymousChatModal';
import MyStoriesDashboard from './components/MyStoriesDashboard';
import SalaryShareBoard from './components/SalaryShareBoard';
import { supabase, TABLE_NAME } from './lib/supabase';
import { getOrCreateDeviceToken } from './utils/anonymousKey';
import { LogOut, Lock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatTargetPost, setChatTargetPost] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  // Hard purge old cache keys
  useEffect(() => {
    localStorage.removeItem('linkedout_posts');
    localStorage.removeItem('linkedout_posts_real');
    localStorage.removeItem('linkedout_posts_real_v2');
  }, []);

  const [posts, setPosts] = useState([]);

  // Fetch Real User Posts from Supabase
  useEffect(() => {
    async function loadSupabasePosts() {
      try {
        const { data, error } = await supabase
          .from(TABLE_NAME)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn("Supabase connection error:", error.message);
          setPosts([]);
          setSupabaseConnected(false);
        } else if (data && data.length > 0) {
          // Filter out any filler or deleted rows strictly
          const realUserPosts = data.filter(item => 
            item.content && 
            !item.content.includes('DELETED_FILLER_POST') &&
            item.former_company !== 'MetaMega Global Solutions' &&
            item.former_company !== 'HyperScale Tech Corp' &&
            item.author_alias !== 'Ex-Senior Staff Infra Lead' &&
            item.author_alias !== 'Ex-Finance Lead' &&
            item.author_alias !== 'Ex-ICU Charge Nurse' &&
            item.author_alias !== 'Ex-Growth Lead' &&
            item.author_alias !== 'Ex-Senior Consultant'
          );

          const formattedData = realUserPosts.map(item => ({
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
            timestamp: new Date(item.created_at || Date.now()).toLocaleDateString(),
            reactions: item.reactions || { fire: 1, tea: 1, redFlag: 0, ripSanity: 0, ovation: 1 },
            comments: item.comments || []
          }));

          setPosts(formattedData);
          setSupabaseConnected(true);
        } else {
          setPosts([]);
          setSupabaseConnected(true);
        }
      } catch (err) {
        setPosts([]);
        setSupabaseConnected(false);
      }
    }

    loadSupabasePosts();
  }, []);

  // Toggle DM Availability
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

  // Reaction Handler
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

  // Comment Handler
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

  // Real User Story Submission
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
      await supabase
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
    } catch (err) {
      console.warn("Supabase insert exception:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05070d] text-slate-100 font-sans selection:bg-[#ff0055] selection:text-white">
      
      {/* Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onScrollToShare={handleScrollToShare}
      />

      {/* Main Workspace */}
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

        {activeTab === 'salary' && (
          <SalaryShareBoard 
            posts={posts}
            onSubmitSalary={() => {}}
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

      {/* Story Creator Modal */}
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

      {/* ELEGANT PROPER FOOTER */}
      <footer className="border-t border-white/10 bg-[#040509] text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff0055] via-[#ff5500] to-[#ffb703] flex items-center justify-center text-white shadow-lg shadow-[#ff0055]/30">
                  <LogOut className="w-5 h-5 transform -scale-x-100" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-black text-2xl tracking-tight text-white">Linked</span>
                  <span className="font-black text-2xl tracking-tight text-gradient-fire">Out</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                The authentic, privacy-first community where employees anonymously share why they left toxic workplaces, post pay packages, and connect 1-on-1.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-xs font-bold">
              <button onClick={() => setActiveTab('feed')} className="hover:text-white transition-colors">
                Feed of Truth
              </button>
              <button onClick={() => setActiveTab('salary')} className="hover:text-white transition-colors">
                Salary & Pay Share
              </button>
              <button onClick={() => setActiveTab('mystories')} className="hover:text-white transition-colors">
                My Stories & DMs
              </button>
              <button onClick={() => setActiveTab('calculator')} className="hover:text-white transition-colors">
                Overtime Calculator
              </button>
              <button onClick={() => setActiveTab('leaderboard')} className="hover:text-white transition-colors">
                Red Flag Ranks
              </button>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Anonymous • Zero User Accounts Required</span>
            </div>

            <p>© {new Date().getFullYear()} LinkedOut. Reclaiming professional dignity & peace of mind.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
