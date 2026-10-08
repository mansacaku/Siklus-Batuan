import React from 'react';
import { BookOpen, RefreshCw, Compass, Sliders, Target, Zap } from 'lucide-react';

export type TabType = 'materi' | 'diagram' | 'lab' | 'matriks' | 'kuis' | 'rumus';

interface Props {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'diagram', label: 'Diagram', icon: RefreshCw },
    { id: 'lab', label: 'Lab Siklus', icon: Compass },
    { id: 'matriks', label: 'Endo/Ekso', icon: Sliders },
    { id: 'kuis', label: 'Latihan OSN', icon: Target },
    { id: 'rumus', label: 'Rumus Saku', icon: Zap }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800/90 px-1 py-1 sm:py-1.5 shadow-2xl">
      <div className="max-w-2xl mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 sm:py-1.5 px-0.5 transition-colors relative ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-stone-400 hover:text-stone-200 font-medium'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-amber-500/20 text-amber-400' : 'text-stone-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight truncate max-w-[62px]">
                {tab.label}
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
