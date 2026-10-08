import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav, TabType } from './components/BottomNav';
import { ChapterReader } from './components/ChapterReader';
import { InteractiveCycleDiagram } from './components/InteractiveCycleDiagram';
import { RockSimulator } from './components/RockSimulator';
import { ForcesMatrix } from './components/ForcesMatrix';
import { OsnQuiz } from './components/OsnQuiz';
import { QuickCheatSheet } from './components/QuickCheatSheet';
import { CHAPTERS_DATA } from './data/rockCycleData';
import {
  Sparkles,
  BookOpen,
  RefreshCw,
  Compass,
  Target,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('materi');
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [fontSize, setFontSize] = useState<'compact' | 'normal' | 'large'>('normal');
  const [showPilotingBanner, setShowPilotingBanner] = useState<boolean>(() => {
    try {
      return localStorage.getItem('osn_banner_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  // Persistent storage for learning progress (honest default: [])
  const [completedChapters, setCompletedChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('osn_completed_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedChapters, setBookmarkedChapters] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('osn_bookmarked_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('osn_completed_chapters', JSON.stringify(completedChapters));
    } catch (e) {
      console.error(e);
    }
  }, [completedChapters]);

  useEffect(() => {
    try {
      localStorage.setItem('osn_bookmarked_chapters', JSON.stringify(bookmarkedChapters));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedChapters]);

  const handleDismissBanner = () => {
    setShowPilotingBanner(false);
    try {
      localStorage.setItem('osn_banner_dismissed', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleComplete = (id: number) => {
    setCompletedChapters((prev) =>
      prev.includes(id) ? prev.filter((ch) => ch !== id) : [...prev, id]
    );
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarkedChapters((prev) =>
      prev.includes(id) ? prev.filter((ch) => ch !== id) : [...prev, id]
    );
  };

  const handleSelectChapterFromDiagram = (chapterId: number) => {
    setActiveChapterId(chapterId);
    setActiveTab('materi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-stone-950 text-stone-100 flex flex-col overflow-x-clip selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Sticky Header */}
      <Navbar
        completedCount={completedChapters.length}
        totalChapters={CHAPTERS_DATA.length}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        onOpenHome={() => {
          setActiveTab('materi');
          setActiveChapterId(1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Container - Unified max-w-3xl */}
      <main className="w-full max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-1 space-y-4 pb-28 sm:pb-32">
        {/* Onboarding Banner */}
        {showPilotingBanner && (
          <div className="relative bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 rounded-2xl p-4 sm:p-6 text-xs sm:text-sm text-stone-200 shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Modul belajar mandiri · Siklus Batuan</span>
              </div>
              <button
                onClick={handleDismissBanner}
                className="text-stone-400 hover:text-stone-200 min-h-11 min-w-11 -mr-2 -mt-2 flex items-center justify-center rounded-xl active:scale-[0.98] active:bg-stone-800 transition-all"
                aria-label="Tutup pengantar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Halo Calon Juara OSN! Modul ini dirancang khusus untuk pembelajaran mandiri materi <strong className="text-amber-300">Siklus Batuan (Rock Cycle)</strong>. Dilengkapi 12 bab komprehensif, diagram interaktif dengan jalan pintas (shortcut), laboratorium dinamika kerak, dan latihan studi kasus penalaran OSN.
            </p>

            {/* Primary CTA & Quick action buttons within banner */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-stone-800/80">
              <button
                onClick={() => {
                  setActiveTab('materi');
                  setActiveChapterId(1);
                  handleDismissBanner();
                }}
                className="text-xs min-h-11 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl flex items-center gap-1.5 font-bold shadow-md shadow-amber-500/20 active:scale-[0.98] transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Mulai dari Bab 1
              </button>
              <button
                onClick={() => setActiveTab('diagram')}
                className="text-xs min-h-11 px-3 py-2 bg-stone-900 hover:bg-stone-800 active:scale-[0.98] active:bg-stone-800 text-amber-300 rounded-xl border border-amber-500/30 flex items-center gap-1.5 font-medium transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Diagram Interaktif
              </button>
              <button
                onClick={() => setActiveTab('lab')}
                className="text-xs min-h-11 px-3 py-2 bg-stone-900 hover:bg-stone-800 active:scale-[0.98] active:bg-stone-800 text-amber-300 rounded-xl border border-amber-500/30 flex items-center gap-1.5 font-medium transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                Lab Siklus
              </button>
              <button
                onClick={() => setActiveTab('kuis')}
                className="text-xs min-h-11 px-3 py-2 bg-stone-900 hover:bg-stone-800 active:scale-[0.98] active:bg-stone-800 text-amber-300 rounded-xl border border-amber-500/30 flex items-center gap-1.5 font-medium transition-all"
              >
                <Target className="w-3.5 h-3.5" />
                Latihan OSN
              </button>
            </div>
          </div>
        )}

        {/* Tab View Switcher */}
        {activeTab === 'materi' && (
          <ChapterReader
            activeChapterId={activeChapterId}
            onSelectChapter={(id) => {
              setActiveChapterId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedChapters={completedChapters}
            onToggleComplete={handleToggleComplete}
            bookmarkedChapters={bookmarkedChapters}
            onToggleBookmark={handleToggleBookmark}
            fontSize={fontSize}
          />
        )}

        {activeTab === 'diagram' && (
          <InteractiveCycleDiagram onSelectChapter={handleSelectChapterFromDiagram} />
        )}

        {activeTab === 'lab' && <RockSimulator />}

        {activeTab === 'matriks' && <ForcesMatrix />}

        {activeTab === 'kuis' && <OsnQuiz />}

        {activeTab === 'rumus' && <QuickCheatSheet />}

        {/* Motivation note */}
        <div className="p-4 sm:p-6 rounded-2xl bg-stone-900/60 border border-stone-800/60 text-center space-y-1.5">
          <p className="text-xs sm:text-sm text-amber-400 font-semibold">
            "Proses apa yang menyebabkannya terbentuk dan bagaimana kondisi Bumi dapat mengubahnya lagi?"
          </p>
          <p className="text-xs text-stone-400">
            Pertanyaan Kunci Seorang Calon Geolog & Juara OSN Kebumian
          </p>
        </div>
      </main>

      {/* Mobile-First Sticky Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}
