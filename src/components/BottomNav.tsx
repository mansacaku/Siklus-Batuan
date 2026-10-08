import React from 'react';
import { BookOpen, RefreshCw, Compass, Sliders, Target, Zap } from 'lucide-react';

export type TabType = 'materi' | 'diagram' | 'lab' | 'matriks' | 'kuis' | 'rumus';

interface Props {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: TabType; label: string; shortLabel: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'materi', label: 'Materi', shortLabel: 'Materi', icon: BookOpen },
    { id: 'diagram', label: 'Diagram', shortLabel: 'Diagram', icon: RefreshCw },
    { id: 'lab', label: 'Lab Siklus', shortLabel: 'Lab Siklus', icon: Compass },
    { id: 'matriks', label: 'Endogen vs Eksogen', shortLabel: 'Endo/Ekso', icon: Sliders },
    { id: 'kuis', label: 'Latihan OSN', shortLabel: 'Latihan OSN', icon: Target },
    { id: 'rumus', label: 'Rumus Saku', shortLabel: 'Rumus Saku', icon: Zap }
  ];

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed bottom-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800/90 px-2 py-1.5 shadow-2xl"
    >
      <div className="max-w-3xl mx-auto flex items-center justify-around gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 min-h-12 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-[0.98] active:bg-stone-900 relative ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-stone-400 hover:text-stone-200 font-medium'
              }`}
            >
              <div
                className={`w-8 h-7 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-amber-500/20 text-amber-400' : 'text-stone-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span className="text-xs mt-0.5 tracking-tight whitespace-nowrap hidden sm:inline">
                {tab.label}
              </span>
              <span className="text-xs mt-0.5 tracking-tight whitespace-nowrap sm:hidden">
                {tab.shortLabel}
              </span>

              {isActive && (
                <span className="w-4 h-0.5 bg-amber-400 rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
