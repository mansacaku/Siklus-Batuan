import React, { useState } from 'react';
import { FORCES_DATA } from '../data/rockCycleData';
import { Flame, Wind, SlidersHorizontal, Compass } from 'lucide-react';

const MATRIX_COMPARISON_ROWS = [
  {
    aspek: 'Sumber Energi Utama',
    endogen: 'Panas internal Bumi (peluruhan unsur radioaktif & sisa panas akresi mantel/inti).',
    eksogen: 'Radiasi matahari, gravitasi Bumi, sirkulasi atmosfer, hidrosfer, dan biosfer.'
  },
  {
    aspek: 'Sifat & Dampak Relief',
    endogen: 'Konstruktif — membangun pegunungan, cekungan, gunung api, dan memperbarui kerak.',
    eksogen: 'Destruktif / Gradasi — mengikis tinggian dan mengisi cekungan (meratakan relief).'
  },
  {
    aspek: 'Proses Geologi Kunci',
    endogen: 'Magmatisme, vulkanisme, tektonisme (orogenesa/epirogenesa), metamorfisme, pelelehan.',
    eksogen: 'Pelapukan (fisik, kimia, biologi), erosi/transportasi massa, dan sedimentasi.'
  },
  {
    aspek: 'Kondisi Fisis Dominan',
    endogen: 'Temperatur tinggi (200°C – >1200°C) dan tekanan litostatik/diferensial besar.',
    eksogen: 'Kondisi dekat permukaan (suhu ruang, tekanan atmosfer, kaya air dan oksigen).'
  },
  {
    aspek: 'Produk Material Khas',
    endogen: 'Magma, Batuan Beku (Granit, Basalt), Batuan Metamorf (Marmer, Sekis, Gneiss).',
    eksogen: 'Regolit, Sedimen Lepas (Pasir, Lumpur), serta bersama diagenesis membentuk Batuan Sedimen.'
  }
];

export const ForcesMatrix: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Endogen' | 'Eksogen' | 'Kombinasi'>('all');

  const filteredItems = FORCES_DATA.filter((item) => {
    if (filter === 'all') return true;
    return item.tenaga === filter;
  });

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Intro */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Matriks Geodinamika
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100">
              Endogen vs Eksogen
            </h2>
          </div>

          {/* Filter segment control */}
          <div
            role="group"
            aria-label="Filter jenis tenaga geologi"
            className="inline-flex self-start sm:self-auto p-1 bg-stone-950 border border-stone-800 rounded-xl flex-wrap gap-1"
          >
            <button
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
              className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-[0.98] ${
                filter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua (8)
            </button>
            <button
              onClick={() => setFilter('Endogen')}
              aria-pressed={filter === 'Endogen'}
              className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-[0.98] ${
                filter === 'Endogen'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Endogen (4)
            </button>
            <button
              onClick={() => setFilter('Eksogen')}
              aria-pressed={filter === 'Eksogen'}
              className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-[0.98] ${
                filter === 'Eksogen'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Eksogen (3)
            </button>
            <button
              onClick={() => setFilter('Kombinasi')}
              aria-pressed={filter === 'Kombinasi'}
              className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-[0.98] ${
                filter === 'Kombinasi'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Kombinasi (1)
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Tenaga <strong className="text-rose-400">Endogen</strong> digerakkan oleh panas dalam Bumi (membangun dan merekonstruksi relief kerak), sedangkan Tenaga <strong className="text-sky-400">Eksogen</strong> ditenagai oleh radiasi matahari, hidrosfer, atmosfer, dan gravitasi (meratakan dan merombak relief). Proses <strong className="text-violet-400">Kombinasi</strong> (diagenesis) menjembatani keduanya di cekungan sedimen.
        </p>
      </div>

      {/* Real Two-Column Comparison Matrix Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 border-b border-stone-800 bg-stone-950/60">
          <h3 className="text-sm sm:text-base font-bold text-stone-100">
            Tabel Perbandingan Langsung: Endogen vs Eksogen
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950/90">
                <th scope="col" className="py-3 px-4 font-bold text-stone-300 w-1/4">
                  Dimensi Geologi
                </th>
                <th scope="col" className="py-3 px-4 font-bold text-rose-400 w-[37.5%] border-l border-stone-800/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    Tenaga Endogen (Internal)
                  </span>
                </th>
                <th scope="col" className="py-3 px-4 font-bold text-sky-400 w-[37.5%] border-l border-stone-800/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Wind className="w-4 h-4" />
                    Tenaga Eksogen (Eksternal)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {MATRIX_COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-stone-950/40 transition-colors">
                  <th scope="row" className="py-3 px-4 font-semibold text-stone-200 align-top">
                    {row.aspek}
                  </th>
                  <td className="py-3 px-4 text-stone-300 leading-relaxed align-top border-l border-stone-800/80">
                    {row.endogen}
                  </td>
                  <td className="py-3 px-4 text-stone-300 leading-relaxed align-top border-l border-stone-800/80">
                    {row.eksogen}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filtered Process Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => {
          const isEndogen = item.tenaga === 'Endogen';
          const isEksogen = item.tenaga === 'Eksogen';

          return (
            <div
              key={item.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-stone-800/80 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isEndogen
                        ? 'bg-rose-500/15 text-rose-400'
                        : isEksogen
                        ? 'bg-sky-500/15 text-sky-400'
                        : 'bg-violet-500/15 text-violet-400'
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

                <div className="text-xs shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded border font-semibold ${
                      isEndogen
                        ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                        : isEksogen
                        ? 'text-sky-400 bg-sky-500/10 border-sky-500/30'
                        : 'text-violet-400 bg-violet-500/10 border-violet-500/30'
                    }`}
                  >
                    {item.tenaga}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-stone-400 block font-medium">Peran dalam Siklus:</span>
                <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed mt-0.5">
                  {item.peran}
                </p>
              </div>

              <div className="space-y-2 text-xs bg-stone-950 p-3 rounded-xl border border-stone-800/60">
                <div>
                  <span className="text-stone-400 font-medium">Mekanisme Fisis:</span>
                  <p className="text-stone-300 mt-0.5 leading-relaxed">{item.mekanisme}</p>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">Lingkungan Khas:</span>
                  <p className="text-stone-300 mt-0.5 leading-relaxed">{item.lingkungan}</p>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">Contoh Batuan / Material:</span>
                  <p className="text-amber-300 font-semibold mt-0.5">{item.contohBatuan}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
