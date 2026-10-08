import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface Flashcard {
  id: string;
  category: 'Rumus Cepat' | 'Prinsip Feynman' | 'Jalan Pintas' | 'Zona Tektonik';
  title: string;
  formula: string;
  explanation: string;
  badge: string;
}

const CHEAT_CARDS: Flashcard[] = [
  {
    id: 'c1',
    category: 'Rumus Cepat',
    title: '5 Rumus Inti Transformasi Batuan',
    formula: 'Mendingin → Beku | Lapuk → Sedimen Lepas | Kompaksi+Semen → Batuan Sedimen | Panas+Tekan (Padat) → Metamorf | Meleleh → Magma',
    explanation: 'Hukum dasar geologi: Jangan menghafal urutan siklus, tapi pahami pemicu fisis dari perubahan kondisi energi dan lingkungannya.',
    badge: 'Fundamental'
  },
  {
    id: 'c2',
    category: 'Prinsip Feynman',
    title: 'Laju Pendinginan & Ukuran Kristal',
    formula: 'Lambat di Dalam (Intrusif) = Kristal Besar | Cepat di Luar (Ekstrusif) = Kristal Halus / Gelas',
    explanation: 'Ibarat antrean bus: pendinginan lambat memberi waktu ion mineral berbaris rapi membentuk kisi kristal fanerik besar (contoh: Granit). Erupsi cepat membekukan seketika menjadi afanitik/gelas amorf (contoh: Obsidian, Basalt).',
    badge: 'Batuan Beku'
  },
  {
    id: 'c3',
    category: 'Prinsip Feynman',
    title: 'Metamorfisme = Fasa Padat Mutlak',
    formula: 'Suhu Naik + Tekanan Tinggi + Tetap Padat = Rekristalisasi Metamorf',
    explanation: 'Bayangkan kue dipanggang dan ditekan dalam oven: adonan matang dan mengeras dengan tekstur baru, tapi TIDAK PERNAH mencair jadi kuah. Jika mencair total, namanya peleburan (melting) menuju batuan beku.',
    badge: 'Metamorf'
  },
  {
    id: 'c4',
    category: 'Rumus Cepat',
    title: 'Trisula Tenaga Eksogen',
    formula: 'Pelapukan (In-Situ) ≠ Erosi & Transport (Pindah) ≠ Sedimentasi (Endap)',
    explanation: 'Pelapukan menghancurkan batuan di tempat asal. Erosi melepaskan dan mengangkut partikel. Sedimentasi menjatuhkan beban saat energi agen pengangkut melemah.',
    badge: 'Eksogen'
  },
  {
    id: 'c5',
    category: 'Rumus Cepat',
    title: 'Litifikasi (Diagenesis Pembatu)',
    formula: 'Sedimen Lepas + Kompaksi Beban + Sementasi Kimiawi = Batuan Sedimen',
    explanation: 'Endapan lumpur di danau belum menjadi batuan sedimen. Diperlukan penumpukan lapisan baru untuk memeras air pori (kompaksi) dan presipitasi kalsit/silika (sementasi).',
    badge: 'Sedimen'
  },
  {
    id: 'c6',
    category: 'Zona Tektonik',
    title: 'Pelelehan di Zona Subduksi (Flux Melting)',
    formula: 'Subduksi Lempeng Basah → Dehidrasi Air → Menurunkan Titik Leleh Mantel Baji → Magma Busur',
    explanation: 'Bukan dekompresi dan bukan gesekan mekanik! Kehadiran air volatil menurunkan kurva solidus peridotit mantel secara termodinamika.',
    badge: 'Subduksi OSN'
  },
  {
    id: 'c7',
    category: 'Zona Tektonik',
    title: 'Pelelehan di Punggung Samudra (MOR)',
    formula: 'Lempeng Memisah → Mantel Naik Cepat → Tekanan Turun Tanpa Kalor Hilang → Decompression Melting',
    explanation: 'Penurunan tekanan litostatik secara adiabatik memicu astenosfer meleleh sebagian menghasilkan magma basaltik pembentuk kerak samudra baru.',
    badge: 'Divergen MOR'
  },
  {
    id: 'c8',
    category: 'Jalan Pintas',
    title: 'Jalan Pintas: Beku Langsung Metamorf',
    formula: 'Granit Beku + Tumbukan Orogenik Orogenesa = Gneiss (Tanpa Jadi Sedimen)',
    explanation: 'Batuan di kedalaman tidak harus terangkat ke permukaan dan lapuk menjadi sedimen terlebih dahulu untuk mengalami metamorfosis.',
    badge: 'Shortcut'
  },
  {
    id: 'c9',
    category: 'Jalan Pintas',
    title: 'Jalan Pintas: Sedimen Langsung Leleh',
    formula: 'Sedimen Palung Laut + Penunjaman Cepat = Meleleh Jadi Magma Busur',
    explanation: 'Sedimen pelagik dasar samudra terseret ke kedalaman mantel atas dan lebur bersama lempeng penunjam menjadi magma vulkanik.',
    badge: 'Shortcut'
  }
];

export const QuickCheatSheet: React.FC = () => {
  const [filter, setFilter] = useState<string>('Semua');

  const categories = ['Semua', 'Rumus Cepat', 'Prinsip Feynman', 'Zona Tektonik', 'Jalan Pintas'];

  const filteredCards = CHEAT_CARDS.filter((c) => {
    if (filter === 'Semua') return true;
    return c.category === filter;
  });

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Intro */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Catatan Saku & Rumus Cepat
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100">
              Rumus Saku Geologi OSN Kebumian
            </h2>
          </div>

          {/* Segmented Filter */}
          <div
            role="group"
            aria-label="Filter kategori rumus saku"
            className="flex flex-wrap gap-1 p-1 bg-stone-950 border border-stone-800 rounded-xl"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-[0.98] ${
                  filter === cat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Kumpulan prinsip esensial, analogi Feynman, dan rumus kausalitas yang sering menjadi kunci penyelesaian soal-soal tingkat lanjut.
        </p>
      </div>

      {/* Flashcards List with Full-Width Prominent Formula Band */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 mb-2">
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  {card.category}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {card.badge}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-100 leading-snug mb-3">
                {card.title}
              </h3>

              {/* Prominent Full-Bleed Formula Block */}
              <div className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-3.5 my-3 bg-stone-950/90 border-y border-stone-800 font-mono text-sm sm:text-base font-semibold text-amber-300 leading-relaxed">
                {card.formula}
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-1">
                {card.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
