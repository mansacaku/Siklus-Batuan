import React, { useState } from 'react';
import { FORCES_DATA, EndogenEksogenItem } from '../data/rockCycleData';
import { Flame, Wind, SlidersHorizontal, Info, Compass } from 'lucide-react';

export const ForcesMatrix: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Endogen' | 'Eksogen' | 'Kombinasi'>('all');

  const filteredItems = FORCES_DATA.filter((item) => {
    if (filter === 'all') return true;
    return item.tenaga === filter;
  });

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Intro */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Matriks Geodinamika
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100">
              Hubungan Tenaga Endogen vs Eksogen
            </h2>
          </div>

          {/* Filter segment control (buttons) */}
          <div className="inline-flex self-start sm:self-auto p-1 bg-stone-950 border border-stone-800 rounded-xl flex-wrap gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua (8)
            </button>
            <button
              onClick={() => setFilter('Endogen')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'Endogen'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Endogen (4)
            </button>
            <button
              onClick={() => setFilter('Eksogen')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'Eksogen'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Eksogen (3)
            </button>
            <button
              onClick={() => setFilter('Kombinasi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'Kombinasi'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Kombinasi (1)
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Tenaga <strong className="text-amber-400">Endogen</strong> digerakkan oleh panas dalam Bumi (membangun dan merekonstruksi relief kerak), sedangkan Tenaga <strong className="text-sky-400">Eksogen</strong> ditenagai oleh radiasi matahari, hidrosfer, atmosfer, dan gravitasi (meratakan dan merombak relief).
        </p>
      </div>

      {/* Cards list - zero horizontal overflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => {
          const isEndogen = item.tenaga === 'Endogen';
          const isEksogen = item.tenaga === 'Eksogen';

          return (
            <div
              key={item.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-stone-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      isEndogen
                        ? 'bg-amber-500/15 text-amber-400'
                        : isEksogen
                        ? 'bg-sky-500/15 text-sky-400'
                        : 'bg-emerald-500/15 text-emerald-400'
                    }`}
                  >
                    {isEndogen ? (
                      <Flame className="w-4 h-4" />
                    ) : isEksogen ? (
                      <Wind className="w-4 h-4" />
                    ) : (
                      <SlidersHorizontal className="w-4 h-4" />
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-100">
                    {item.proses}
                  </h3>
                </div>

                <div className="text-xs text-stone-400 shrink-0">
                  <span
                    className={
                      isEndogen
                        ? 'text-amber-400 font-semibold'
                        : isEksogen
                        ? 'text-sky-400 font-semibold'
                        : 'text-emerald-400 font-semibold'
                    }
                  >
                    {item.tenaga}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-stone-400 block font-medium">Peran dalam Siklus:</span>
                <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed mt-0.5">
                  {item.peran}
                </p>
              </div>

              <div className="space-y-1.5 text-xs bg-stone-950 p-3 rounded-xl border border-stone-800/60">
                <div>
                  <span className="text-stone-400">Mekanisme Fisis:</span>
                  <p className="text-stone-300 mt-0.5 leading-relaxed">{item.mekanisme}</p>
                </div>
                <div>
                  <span className="text-stone-400">Lingkungan Khas:</span>
                  <p className="text-stone-300 mt-0.5 leading-relaxed">{item.lingkungan}</p>
                </div>
                <div>
                  <span className="text-stone-400">Contoh Batuan / Material:</span>
                  <p className="text-amber-300 font-medium mt-0.5">{item.contohBatuan}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
