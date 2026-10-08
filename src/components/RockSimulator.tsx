import React, { useState } from 'react';
import { ROCK_SIMULATOR_PRESETS } from '../data/rockCycleData';
import {
  RotateCcw,
  ChevronRight,
  Compass,
  Flame,
  Mountain,
  Droplets,
  ArrowUpCircle,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface CustomStep {
  rockName: string;
  action: string;
  forceType: 'Endogen' | 'Eksogen' | 'Kombinasi';
  process: string;
  desc: string;
}

type ActionKey =
  | 'weathering'
  | 'lithification'
  | 'regional_metamorphism'
  | 'contact_metamorphism'
  | 'subduction_melting'
  | 'crystallization_slow'
  | 'crystallization_fast'
  | 'uplift';

const isLooseSediment = (rock: string) =>
  /Lepas|Pasir Kuarsa Tersortir|Lumpur|Ca²⁺|Partikel Sedimen/i.test(rock);

const isMagma = (rock: string) => rock.includes('Magma');

const ACTION_RULES: Record<
  ActionKey,
  {
    allowed: (rock: string) => boolean;
    disabledHint: (rock: string) => string;
  }
> = {
  weathering: {
    allowed: (r) => !isMagma(r),
    disabledHint: () => 'Magma cair tidak bisa dilapukkan — dinginkan dulu menjadi batuan beku.'
  },
  lithification: {
    allowed: (r) => isLooseSediment(r),
    disabledHint: (r) =>
      isMagma(r)
        ? 'Magma tidak bisa mengalami kompaksi — bekukan dan lapukkan dulu.'
        : 'Hanya untuk sedimen lepas — lapukkan batuan padat terlebih dahulu.'
  },
  regional_metamorphism: {
    allowed: (r) => !isMagma(r) && !isLooseSediment(r),
    disabledHint: (r) =>
      isMagma(r)
        ? 'Metamorfisme wajib dalam fasa padat — bekukan magma dulu.'
        : 'Sedimen lepas harus melalui litifikasi (kompaksi & sementasi) dulu.'
  },
  contact_metamorphism: {
    allowed: (r) => !isMagma(r) && !isLooseSediment(r),
    disabledHint: (r) =>
      isMagma(r)
        ? 'Metamorfisme kontak terjadi pada batuan padat di sekitar magma.'
        : 'Litifikasi sedimen lepas terlebih dahulu sebelum metamorfisme kontak.'
  },
  subduction_melting: {
    allowed: (r) => !isMagma(r),
    disabledHint: () => 'Material sudah berwujud Magma cair.'
  },
  crystallization_slow: {
    allowed: (r) => isMagma(r),
    disabledHint: () => 'Hanya berlaku pada Magma cair — lelehkan batuan terlebih dahulu.'
  },
  crystallization_fast: {
    allowed: (r) => isMagma(r),
    disabledHint: () => 'Hanya berlaku pada Magma cair — lelehkan batuan terlebih dahulu.'
  },
  uplift: {
    allowed: (r) => !isMagma(r) && !isLooseSediment(r) && !r.includes('Tersingkap'),
    disabledHint: (r) =>
      r.includes('Tersingkap')
        ? 'Batuan sudah tersingkap di permukaan.'
        : isMagma(r)
        ? 'Bekukan magma menjadi batuan padat terlebih dahulu.'
        : 'Sedimen lepas sudah berada di cekungan permukaan.'
  }
};

export const RockSimulator: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Custom simulator state
  const [customRock] = useState<string>('Granit (Beku Intrusif)');
  const [history, setHistory] = useState<CustomStep[]>([
    {
      rockName: 'Granit (Beku Intrusif)',
      action: 'Kondisi Awal',
      forceType: 'Endogen',
      process: 'Kristalisasi magma lambat di kedalaman kerak',
      desc: 'Batuan kristalin masif berbutir fanerik (kuarsa, ortoklas, biotit).'
    }
  ]);

  const currentPreset = ROCK_SIMULATOR_PRESETS[selectedPresetIndex];
  const isPresetFinished = currentStepIndex >= currentPreset.steps.length - 1;
  const activeRockName = history[history.length - 1].rockName;

  const handleNextPresetStep = () => {
    if (currentStepIndex < currentPreset.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleResetPreset = () => {
    setCurrentStepIndex(0);
  };

  const getForceBadgeClass = (forceType: 'Endogen' | 'Eksogen' | 'Kombinasi') => {
    if (forceType === 'Endogen') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (forceType === 'Eksogen') return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
    return 'text-violet-400 bg-violet-500/10 border-violet-500/30';
  };

  // Custom action processor
  const applyGeologicalAction = (actionKey: ActionKey) => {
    if (!ACTION_RULES[actionKey].allowed(activeRockName)) return;

    const lastRock = activeRockName;
    let nextRock = '';
    let processName = '';
    let forceType: 'Endogen' | 'Eksogen' | 'Kombinasi' = 'Endogen';
    let desc = '';

    switch (actionKey) {
      case 'weathering':
        forceType = 'Eksogen';
        processName = 'Pelapukan in-situ & Erosi Fluvial';
        if (lastRock.includes('Gamping') || lastRock.includes('Marmer')) {
          nextRock = 'Ion Ca²⁺ & Lumpur Karbonat Lepas';
          desc = 'Kalsit terlarut oleh air hujan asam membentuk bentang alam karst dan sedimen kalsit lepas.';
        } else if (lastRock.includes('Pasir') || lastRock.includes('Kuarsit')) {
          nextRock = 'Pasir Kuarsa Tersortir Baik (Sedimen Lepas)';
          desc = 'Kuarsa sangat resisten secara kimiawi sehingga tetap utuh dan bertambah bundar.';
        } else {
          nextRock = 'Partikel Sedimen Lepas (Pasir & Lempung)';
          desc = 'Mineral feldspar terhidrolisis menjadi lempung, kuarsa terlepas menjadi butiran pasir.';
        }
        break;

      case 'lithification':
        forceType = 'Kombinasi';
        processName = 'Diagenesis (Kompaksi & Sementasi)';
        if (lastRock.includes('Lumpur') || lastRock.includes('Lempung')) {
          nextRock = 'Serpih / Shale (Batuan Sedimen Klastik)';
          desc = 'Butir lempung mengalami pemadatan sejajar dan sementasi tipis membentuk serpih berlaminasi.';
        } else if (lastRock.includes('Karbonat') || lastRock.includes('Ca²⁺')) {
          nextRock = 'Batu Gamping / Limestone (Batuan Sedimen)';
          desc = 'Kalsium karbonat mengendap dan merekat menjadi batuan sedimen karbonat masif.';
        } else {
          nextRock = 'Batu Pasir / Sandstone (Batuan Sedimen)';
          desc = 'Butiran pasir terkunci oleh semen silika atau kalsit di bawah tekanan beban lapisan penutup.';
        }
        break;

      case 'regional_metamorphism':
        forceType = 'Endogen';
        processName = 'Metamorfisme Regional Orogenik (P & T Tinggi, Padat)';
        if (lastRock.includes('Shale') || lastRock.includes('Serpih')) {
          nextRock = 'Sekis Mika / Schist (Batuan Metamorf Foliasi)';
          desc = 'Tekanan terarah menyejajarkan mineral mika menghasilkan lembaran foliasi mengkilap.';
        } else if (lastRock.includes('Gamping') || lastRock.includes('Limestone')) {
          nextRock = 'Marmer / Marble (Batuan Metamorf Non-foliasi)';
          desc = 'Kalsit merekrstalisasi menjadi mozaik kristal interlocking tanpa pelelehan.';
        } else if (lastRock.includes('Pasir') || lastRock.includes('Sandstone')) {
          nextRock = 'Kuarsit / Quartzite (Batuan Metamorf)';
          desc = 'Butir kuarsa dan semen silika menyatu sempurna menjadi batuan metamorf kuarsa padat tahan erosi.';
        } else {
          nextRock = 'Gneiss / Gneis (Batuan Metamorf Berfoliasi Pita)';
          desc = 'Pemisahan pita mineral felsik terang dan mafik gelap akibat P-T derajat tinggi.';
        }
        break;

      case 'contact_metamorphism':
        forceType = 'Endogen';
        processName = 'Metamorfisme Kontak Termal (Suhu Tinggi, Tekanan Rendah)';
        if (lastRock.includes('Gamping')) {
          nextRock = 'Marmer / Marble Kontak';
          desc = 'Panas intrusi magma membakar batu gamping di sekitarnya menjadi marmer rekristal.';
        } else {
          nextRock = 'Hornfels (Batuan Metamorf Kontak Padat)';
          desc = 'Batuan samping terpanggang menjadi batuan keras tanpa foliasi berbutir halus.';
        }
        break;

      case 'subduction_melting':
        forceType = 'Endogen';
        processName = 'Subduksi & Pelelehan Parsial (Melting)';
        nextRock = 'Magma Silikat Panas (Cair)';
        desc = 'Batuan terseret melampaui kurva solidus di kedalaman mantel atas dan lebur menjadi magma baru.';
        break;

      case 'crystallization_slow':
        forceType = 'Endogen';
        processName = 'Pendinginan Lambat Intrusif (Plutonik)';
        nextRock = 'Granit / Diorit (Batuan Beku Fanerik)';
        desc = 'Magma mendingin jutaan tahun di dalam kerak, kristal mineral tumbuh besar dan teratur.';
        break;

      case 'crystallization_fast':
        forceType = 'Endogen';
        processName = 'Erupsi & Pembekuan Ekstrusif Cepat';
        nextRock = 'Basalt / Andesit (Batuan Beku Afanitik)';
        desc = 'Lava keluar ke atmosfer atau dasar laut dan membeku cepat sehingga kristalnya sangat halus.';
        break;

      case 'uplift':
        forceType = 'Endogen';
        processName = 'Pengangkatan Tektonik (Uplift) ke Puncak Gunung';
        nextRock = `${lastRock} (Tersingkap di Permukaan)`;
        desc = 'Gaya orogenik mengangkat batuan dari kedalaman kerak hingga tersingkap ke udara luar.';
        break;

      default:
        return;
    }

    setHistory((prev) => [
      ...prev,
      {
        rockName: nextRock,
        action: actionKey,
        forceType,
        process: processName,
        desc
      }
    ]);
  };

  const handleResetCustom = () => {
    setHistory([
      {
        rockName: customRock,
        action: 'Kondisi Awal',
        forceType: 'Endogen',
        process: 'Titik awal simulasi batuan',
        desc: 'Batuan kristalin masif berbutir fanerik (kuarsa, ortoklas, biotit).'
      }
    ]);
  };

  const actionButtons: {
    key: ActionKey;
    title: string;
    subtitle: string;
    force: 'Endogen' | 'Eksogen' | 'Kombinasi';
    icon: React.FC<{ className?: string }>;
    iconColor: string;
  }[] = [
    {
      key: 'weathering',
      title: 'Pelapukan & Erosi',
      subtitle: 'Diserang air, asam, suhu, dan dipindahkan',
      force: 'Eksogen',
      icon: Droplets,
      iconColor: 'text-sky-400'
    },
    {
      key: 'lithification',
      title: 'Kompaksi & Sementasi (Litifikasi)',
      subtitle: 'Tertimbun cekungan dan memadat jadi batu',
      force: 'Kombinasi',
      icon: Mountain,
      iconColor: 'text-violet-400'
    },
    {
      key: 'regional_metamorphism',
      title: 'Metamorfisme Regional (Orogenesa)',
      subtitle: 'Tekanan dan suhu tinggi tanpa meleleh (Padat)',
      force: 'Endogen',
      icon: Mountain,
      iconColor: 'text-rose-400'
    },
    {
      key: 'contact_metamorphism',
      title: 'Metamorfisme Kontak Termal',
      subtitle: 'Terpanggang suhu intrusi magma di dekatnya',
      force: 'Endogen',
      icon: Flame,
      iconColor: 'text-rose-400'
    },
    {
      key: 'uplift',
      title: 'Pengangkatan Tektonik (Uplift)',
      subtitle: 'Terangkat gaya orogenik ke permukaan Bumi',
      force: 'Endogen',
      icon: ArrowUpCircle,
      iconColor: 'text-rose-400'
    },
    {
      key: 'subduction_melting',
      title: 'Pelelehan Subduksi (Melting)',
      subtitle: 'Melampaui solidus kerak menjadi magma cair',
      force: 'Endogen',
      icon: Flame,
      iconColor: 'text-rose-400'
    },
    {
      key: 'crystallization_slow',
      title: 'Kristalisasi Intrusif Lambat',
      subtitle: 'Mendingin lambat di dalam kerak → Fanerik',
      force: 'Endogen',
      icon: Compass,
      iconColor: 'text-rose-400'
    },
    {
      key: 'crystallization_fast',
      title: 'Erupsi & Pembekuan Ekstrusif Cepat',
      subtitle: 'Membeku cepat di permukaan → Basalt/Andesit',
      force: 'Endogen',
      icon: Zap,
      iconColor: 'text-rose-400'
    }
  ];

  return (
    <div className="w-full max-w-full space-y-5">
      {/* Introduction Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Compass className="w-4 h-4" />
          Lab Siklus Batuan
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-stone-100 mb-2">
          Laboratorium Simulasi Jalur Batuan
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Uji bagaimana interaksi tenaga <span className="text-rose-400 font-semibold">Endogen</span>, <span className="text-sky-400 font-semibold">Eksogen</span>, dan <span className="text-violet-400 font-semibold">Kombinasi</span> mengubah batuan secara bertahap. Coba skenario nyata di bawah ini atau rancang sendiri perjalanannya!
        </p>
      </div>

      {/* Preset Scenario Viewer */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
          <div>
            <span className="text-xs text-stone-400 font-medium">Skenario Pembelajaran Nyata:</span>
            <h3 className="text-base sm:text-lg font-bold text-amber-400">
              {currentPreset.name}
            </h3>
          </div>

          {/* Preset Selector */}
          <div className="flex gap-1.5 overflow-x-auto py-1">
            {ROCK_SIMULATOR_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setCurrentStepIndex(0);
                }}
                aria-pressed={selectedPresetIndex === idx}
                className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all active:scale-[0.98] ${
                  selectedPresetIndex === idx
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-stone-950 text-stone-300 border border-stone-800 hover:text-white'
                }`}
              >
                Kasus {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline visualization (AA contrast compliant without opacity-40) */}
        <div className="space-y-3">
          {/* Starting point */}
          <div className="flex items-start gap-3 p-3 bg-stone-950 rounded-xl border border-stone-800">
            <div className="w-6 h-6 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              0
            </div>
            <div>
              <div className="text-xs text-stone-400">Batuan Awal</div>
              <div className="text-sm font-bold text-stone-100">{currentPreset.initialRock}</div>
            </div>
          </div>

          {/* Current sequence steps */}
          {currentPreset.steps.map((st, idx) => {
            const isReached = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all duration-200 ${
                  isCurrent
                    ? 'bg-stone-950 border-amber-500/60 shadow-lg'
                    : isReached
                    ? 'bg-stone-950/80 border-stone-800'
                    : 'bg-stone-950/40 border-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-amber-500 text-stone-950 font-extrabold'
                          : isReached
                          ? 'bg-stone-800 text-stone-200'
                          : 'bg-stone-900 text-stone-400 border border-stone-800'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className={`text-xs font-bold ${isReached ? 'text-amber-400' : 'text-stone-400'}`}>
                      {st.action}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="text-xs text-amber-300 font-medium">
                      Tahap Aktif
                    </span>
                  )}
                </div>

                <p className={`text-xs sm:text-sm mb-2 leading-relaxed pl-8 ${isReached ? 'text-stone-200' : 'text-stone-400'}`}>
                  {st.event}
                </p>

                <div className="pl-8 flex items-center gap-2 text-xs">
                  <span className="text-stone-400">Hasil:</span>
                  <span className={`font-bold ${isReached ? 'text-emerald-400' : 'text-stone-400'}`}>
                    {st.result}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion status when preset reaches final step */}
        {isPresetFinished && (
          <div
            role="status"
            aria-live="polite"
            className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm text-emerald-200"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Seluruh tahapan pada <strong>{currentPreset.name}</strong> selesai! Kamu bisa memilih kasus lain atau menekan <strong>Ulangi</strong>.
            </span>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between pt-2 gap-2">
          <button
            onClick={handleResetPreset}
            className="flex items-center gap-1.5 min-h-11 px-3.5 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-950 hover:bg-stone-800 active:scale-[0.98] rounded-xl border border-stone-800 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Ulangi
          </button>

          <button
            onClick={handleNextPresetStep}
            disabled={isPresetFinished}
            className={`flex items-center gap-1.5 min-h-11 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              isPresetFinished
                ? 'bg-stone-800 text-stone-400 cursor-not-allowed'
                : 'bg-amber-500 text-stone-950 hover:bg-amber-400 active:scale-[0.98] shadow-md shadow-amber-500/20'
            }`}
          >
            <span>{isPresetFinished ? 'Skenario Selesai' : 'Langkah berikutnya'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Custom Interactive Sandbox */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="border-b border-stone-800 pb-3">
          <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            Mode Bebas Analisis
          </div>
          <h3 className="text-base sm:text-lg font-bold text-stone-100">
            Rancang Transformasi Batuan Mandiri
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Pilih peristiwa geologi yang valid secara fisis terhadap wujud batuan saat ini. Peristiwa yang bertentangan dengan hukum geologi dinonaktifkan beserta penjelasannya.
          </p>
        </div>

        {/* Current Rock Display */}
        <div
          role="status"
          aria-live="polite"
          className="p-4 bg-stone-950 rounded-xl border border-amber-500/30"
        >
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span>Kondisi Material Saat Ini</span>
            <span className="font-mono text-amber-400">Langkah #{history.length}</span>
          </div>
          <div className="text-base sm:text-lg font-extrabold text-stone-100 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>{activeRockName}</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            {history[history.length - 1].desc}
          </p>
        </div>

        {/* Geological Action Triggers with Validity Guards */}
        <div>
          <span className="text-xs font-medium text-stone-300 block mb-2.5">
            Pilih Peristiwa Geologi yang Menimpa Material:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {actionButtons.map((btn) => {
              const Icon = btn.icon;
              const isAllowed = ACTION_RULES[btn.key].allowed(activeRockName);
              const disabledReason = !isAllowed
                ? ACTION_RULES[btn.key].disabledHint(activeRockName)
                : null;

              return (
                <div
                  key={btn.key}
                  className={`rounded-xl border p-3 transition-all flex flex-col justify-between ${
                    isAllowed
                      ? 'bg-stone-950 border-stone-800 hover:border-stone-700'
                      : 'bg-stone-950/40 border-stone-900'
                  }`}
                >
                  <button
                    onClick={() => applyGeologicalAction(btn.key)}
                    disabled={!isAllowed}
                    aria-disabled={!isAllowed}
                    className={`w-full text-left flex items-start gap-2.5 min-h-11 rounded-lg transition-all ${
                      isAllowed
                        ? 'text-stone-100 active:scale-[0.98] cursor-pointer'
                        : 'text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isAllowed ? btn.iconColor : 'text-stone-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`font-semibold ${isAllowed ? 'text-stone-100' : 'text-stone-400'}`}>
                          {btn.title}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getForceBadgeClass(btn.force)}`}>
                          {btn.force}
                        </span>
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">{btn.subtitle}</div>
                    </div>
                  </button>

                  {disabledReason && (
                    <p className="text-xs text-amber-400/90 mt-2 pt-2 border-t border-stone-800/80">
                      {disabledReason}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* History Log */}
        {history.length > 1 && (
          <div className="pt-3 border-t border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-stone-300 font-semibold">Jejak Transformasi ({history.length} tahap):</span>
              <button
                onClick={handleResetCustom}
                className="min-h-11 px-3 text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 rounded-xl active:scale-[0.98] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Ulangi
              </button>
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="text-xs p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-wrap items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-mono text-xs">#{i}</span>
                    <span className="font-semibold text-stone-100">{h.rockName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">{h.process}</span>
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getForceBadgeClass(h.forceType)}`}>
                      {h.forceType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
