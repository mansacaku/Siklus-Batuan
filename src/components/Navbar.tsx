import React from 'react';
import { Compass, BookOpen, Layers, Type } from 'lucide-react';

interface Props {
  completedCount: number;
  totalChapters: number;
  fontSize: 'compact' | 'normal' | 'large';
  onChangeFontSize: (size: 'compact' | 'normal' | 'large') => void;
  onOpenHome: () => void;
}

export const Navbar: React.FC<Props> = ({
  completedCount,
  totalChapters,
  fontSize,
  onChangeFontSize,
  onOpenHome
}) => {
  const percent = Math.round((completedCount / totalChapters) * 100);

  const cycleFontSize = () => {
    if (fontSize === 'compact') onChangeFontSize('normal');
    else if (fontSize === 'normal') onChangeFontSize('large');
    else onChangeFontSize('compact');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 px-3 sm:px-6 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <button
          onClick={onOpenHome}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4 text-stone-950" />
          </div>
          <div>
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              OSN Kebumian · Piloting
            </div>
            <div className="text-sm sm:text-base font-extrabold text-stone-100 tracking-tight leading-none">
              Siklus Batuan
            </div>
          </div>
        </button>

        {/* Right tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-300">
            <span className="text-[11px] text-stone-400 hidden xs:inline">Progres:</span>
            <span className="font-bold text-amber-400 font-mono">{percent}%</span>
            <div className="w-12 h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>

          {/* Font Size Button */}
          <button
            onClick={cycleFontSize}
            title="Ubah Ukuran Teks"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl text-xs text-stone-300 transition-colors"
          >
            <Type className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">
              {fontSize === 'compact' ? 'S' : fontSize === 'normal' ? 'M' : 'L'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
