import React, { useState } from 'react';
import { ROCK_SIMULATOR_PRESETS } from '../data/rockCycleData';
import { Play, RotateCcw, ChevronRight, Compass, ShieldCheck, Flame, Mountain, Droplets } from 'lucide-react';

interface CustomStep {
  rockName: string;
  action: string;
  forceType: string;
  process: string;
  desc: string;
}

export const RockSimulator: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Custom simulator state
  const [customRock, setCustomRock] = useState<string>('Granit (Beku Intrusif)');
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

  const handleNextPresetStep = () => {
    if (currentStepIndex < currentPreset.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleResetPreset = () => {
    setCurrentStepIndex(0);
  };

  // Custom action processor
  const applyGeologicalAction = (actionKey: string) => {
    const lastRock = history[history.length - 1].rockName;
    let nextRock = '';
    let processName = '';
    let forceType = '';
    let desc = '';

    switch (actionKey) {
      case 'weathering':
        forceType = 'Eksogen';
        processName = 'Pelapukan in-situ & Erosi Fluvial';
        if (lastRock.includes('Gamping') || lastRock.includes('Marmer')) {
          nextRock = 'Ion Ca²⁺ & Lumpur Karbonat Lepas';
          desc = 'Kalsit terlarut oleh air hujan asam membentuk bentang alam karst dan sedimen kalsit lepas.';
        } else if (lastRock.includes('Pasir') || lastRock.includes('Kuarsit')) {
          nextRock = 'Pasir Kuarsa Tersortir Baik';
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
        desc = 'Lava keluar ke atmosfer/air laut dan membeku kilat sehingga kristalnya sangat mikro.';
        break;

      case 'uplift':
        forceType = 'Endogen';
        processName = 'Pengangkatan Tektonik (Uplift) ke Puncak Gunung';
        nextRock = `${lastRock} (Tersingkap di Puncak Kerak)`;
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
        desc: 'Batuan siap dikenai intervensi dinamika geologi.'
      }
    ]);
  };

  return (
    <div className="w-full max-w-full space-y-5">
      {/* Introduction Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <Compass className="w-4 h-4" />
          Laboratorium Simulasi Jalur Batuan
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-stone-100 mb-2">
          Eksperimen Lintasan Geodinamika
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Uji bagaimana interaksi tenaga endogen dan eksogen mengubah batuan secara bertahap. Coba skenario nyata evolusi batuan di bawah ini atau rancang sendiri perjalanannya!
        </p>
      </div>

      {/* Preset Scenario Viewer */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
          <div>
            <span className="text-xs text-stone-400 font-medium">Skenario Pembelajaran Nyata:</span>
            <h3 className="text-base sm:text-lg font-bold text-amber-400">
              {currentPreset.name}
            </h3>
          </div>

          {/* Preset Selector */}
          <div className="flex gap-1 overflow-x-auto py-1">
            {ROCK_SIMULATOR_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setCurrentStepIndex(0);
                }}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedPresetIndex === idx
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
                }`}
              >
                Kasus {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline visualization */}
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
                    ? 'bg-stone-950 border-amber-500/50 shadow-lg'
                    : isReached
                    ? 'bg-stone-950/60 border-stone-800'
                    : 'bg-stone-950/30 border-stone-900 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-amber-500 text-stone-950 font-black'
                          : isReached
                          ? 'bg-stone-800 text-stone-300'
                          : 'bg-stone-900 text-stone-600'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-400">
                      {st.action}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="text-[11px] text-amber-300 font-medium">
                      Sedang Aktif
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-300 mb-2 leading-relaxed pl-8">
                  {st.event}
                </p>

                <div className="pl-8 flex items-center gap-2 text-xs">
                  <span className="text-stone-400">Hasil:</span>
                  <span className="font-bold text-emerald-400">{st.result}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleResetPreset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 bg-stone-950 rounded-xl border border-stone-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Ulang Kasus
          </button>

          <button
            onClick={handleNextPresetStep}
            disabled={currentStepIndex >= currentPreset.steps.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              currentStepIndex >= currentPreset.steps.length - 1
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
            }`}
          >
            Lanjut Peristiwa Geologi
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Custom Interactive Sandbox */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="border-b border-stone-800 pb-3">
          <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            Mode Bebas Analisis
          </div>
          <h3 className="text-base sm:text-lg font-bold text-stone-100">
            Rancang Transformasi Batuan Mandiri
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Pilih peristiwa geologi untuk diaplikasikan ke batuan saat ini, dan perhatikan hukum kekekalan materi geologi.
          </p>
        </div>

        {/* Current Rock Display */}
        <div className="p-4 bg-stone-950 rounded-xl border border-amber-500/30">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span>Kondisi Batuan Saat Ini</span>
            <span className="font-mono text-amber-400">Langkah #{history.length}</span>
          </div>
          <div className="text-base sm:text-lg font-extrabold text-stone-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            {history[history.length - 1].rockName}
          </div>
          <p className="text-xs text-stone-300 mt-2 leading-relaxed">
            {history[history.length - 1].desc}
          </p>
        </div>

        {/* Geological Action Triggers */}
        <div>
          <span className="text-xs font-medium text-stone-400 block mb-2">
            Pilih Peristiwa Geologi yang Menimpa Batuan:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => applyGeologicalAction('weathering')}
              className="flex items-center gap-2 p-2.5 bg-stone-950 hover:bg-stone-800/80 border border-stone-800 rounded-xl text-left text-stone-200 transition-colors"
            >
              <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <div className="font-semibold text-stone-100">Pelapukan & Erosi (Eksogen)</div>
                <div className="text-[11px] text-stone-400">Diserang air, asam, suhu, dan dipindahkan</div>
              </div>
            </button>

            <button
              onClick={() => applyGeologicalAction('lithification')}
              className="flex items-center gap-2 p-2.5 bg-stone-950 hover:bg-stone-800/80 border border-stone-800 rounded-xl text-left text-stone-200 transition-colors"
            >
              <Mountain className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-stone-100">Kompaksi & Sementasi (Litifikasi)</div>
                <div className="text-[11px] text-stone-400">Tertimbun cekungan dan memadat jadi batu</div>
              </div>
            </button>

            <button
              onClick={() => applyGeologicalAction('regional_metamorphism')}
              className="flex items-center gap-2 p-2.5 bg-stone-950 hover:bg-stone-800/80 border border-stone-800 rounded-xl text-left text-stone-200 transition-colors"
            >
              <Mountain className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="font-semibold text-stone-100">Metamorfisme Regional (Orogenesa)</div>
                <div className="text-[11px] text-stone-400">Tekanan dan suhu tinggi tanpa meleleh (Padat)</div>
              </div>
            </button>

            <button
              onClick={() => applyGeologicalAction('contact_metamorphism')}
              className="flex items-center gap-2 p-2.5 bg-stone-950 hover:bg-stone-800/80 border border-stone-800 rounded-xl text-left text-stone-200 transition-colors"
            >
              <Flame className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="font-semibold text-stone-100">Metamorfisme Kontak Termal</div>
                <div className="text-[11px] text-stone-400">Terpanggang suhu intrusi magma di dekatnya</div>
              </div>
            </button>

            <button
              onClick={() => applyGeologicalAction('subduction_melting')}
              className="flex items-center gap-2 p-2.5 bg-stone-950 hover:bg-stone-800/80 border border-stone-800 rounded-xl text-left text-stone-200 transition-colors"
            >
              <Flame className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <div className="font-semibold text-stone-100">Pelelehan Subduksi (Melting)</div>
                <div className="text-[11px] text-stone-400">Melampaui solidus kerak menjadi magma cair</div>
              </div>
            </button>

            <button
              onClick={() => applyGeologicalAction('crystallization_slow')}
              className="flex items-center gap-2 p-2.5 bg-stone-950 hover:bg-stone-800/80 border border-stone-800 rounded-xl text-left text-stone-200 transition-colors"
            >
              <Compass className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <div className="font-semibold text-stone-100">Kristalisasi Intrusif (Plutonik)</div>
                <div className="text-[11px] text-stone-400">Mendingin lambat jauh di dalam kerak</div>
              </div>
            </button>
          </div>
        </div>

        {/* History Log */}
        {history.length > 1 && (
          <div className="pt-2 border-t border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-stone-400 font-medium">Jejak Transformasi:</span>
              <button
                onClick={handleResetCustom}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                Reset Eksperimen
              </button>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="text-xs p-2 rounded-lg bg-stone-950/70 border border-stone-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 font-mono text-[10px]">#{i}</span>
                    <span className="font-medium text-stone-200">{h.rockName}</span>
                  </div>
                  <span className="text-[10px] text-stone-400">{h.process}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
