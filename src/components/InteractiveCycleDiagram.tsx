import React, { useState } from 'react';
import { ROCK_NODES, ROCK_TRANSITIONS, RockNode, RockTransition } from '../data/rockCycleData';
import { Info, Sparkles, ArrowRight, Activity, Layers } from 'lucide-react';

interface Props {
  onSelectChapter?: (chapterId: number) => void;
}

const SHORT_PROCESS_LABELS: Record<string, string> = {
  'magma-beku': 'Pendinginan & Kristalisasi',
  'beku-sedimen_lepas': 'Pelapukan & Erosi',
  'sedimen_lepas-sedimen_batu': 'Kompaksi & Sementasi',
  'sedimen_batu-metamorf': 'Metamorfisme (P & T)',
  'metamorf-magma': 'Peleburan (Melting)',
  'beku-metamorf': 'Metamorfisme Langsung',
  'metamorf-sedimen_lepas': 'Uplift & Pelapukan',
  'sedimen_batu-sedimen_lepas': 'Daur Ulang Sedimen',
  'sedimen_batu-magma': 'Subduksi & Peleburan'
};

export const InteractiveCycleDiagram: React.FC<Props> = ({ onSelectChapter }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('magma');
  const [selectedTransitionId, setSelectedTransitionId] = useState<string | null>(null);
  const [viewFilter, setViewFilter] = useState<'all' | 'standard' | 'shortcuts'>('all');

  const selectedNode = ROCK_NODES.find((n) => n.id === selectedNodeId) || ROCK_NODES[0];
  const selectedTransition = selectedTransitionId
    ? ROCK_TRANSITIONS.find((t) => t.id === selectedTransitionId)
    : null;

  // Filter transitions
  const displayedTransitions = ROCK_TRANSITIONS.filter((t) => {
    const isShortcut =
      t.id.includes('beku-metamorf') ||
      t.id.includes('metamorf-sedimen_lepas') ||
      t.id.includes('sedimen_batu-sedimen_lepas') ||
      t.id.includes('sedimen_batu-magma');
    if (viewFilter === 'standard') return !isShortcut;
    if (viewFilter === 'shortcuts') return isShortcut;
    return true;
  });

  const handleNodeClick = (node: RockNode) => {
    setSelectedNodeId(node.id);
    setSelectedTransitionId(null);
  };

  const handleTransitionClick = (trans: RockTransition) => {
    setSelectedTransitionId(trans.id);
  };

  const getForceColorClass = (forceType: string) => {
    if (forceType === 'Endogen') return 'text-rose-400';
    if (forceType === 'Eksogen') return 'text-sky-400';
    return 'text-violet-400';
  };

  // Node coordinate lookup
  const nodeMap = new Map(ROCK_NODES.map((n) => [n.id, n]));

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Header Info */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Simulator Visual Interaktif
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100">
              Diagram Siklus & Jalan Pintas Batuan
            </h2>
          </div>

          {/* Filter segment control */}
          <div
            role="group"
            aria-label="Filter jalur siklus batuan"
            className="inline-flex self-start sm:self-auto p-1 bg-stone-950 border border-stone-800 rounded-xl flex-wrap gap-1"
          >
            <button
              onClick={() => setViewFilter('all')}
              aria-pressed={viewFilter === 'all'}
              className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-[0.98] ${
                viewFilter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua Jalur
            </button>
            <button
              onClick={() => setViewFilter('standard')}
              aria-pressed={viewFilter === 'standard'}
              className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-[0.98] ${
                viewFilter === 'standard'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Siklus Standar
            </button>
            <button
              onClick={() => setViewFilter('shortcuts')}
              aria-pressed={viewFilter === 'shortcuts'}
              className={`min-h-11 px-3 py-1.5 text-xs font-medium rounded-lg transition-all active:scale-[0.98] ${
                viewFilter === 'shortcuts'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Jalan Pintas (OSN)
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Pilih salah satu <strong className="text-amber-300">Batuan</strong> atau <strong className="text-amber-300">Garis Panah Proses</strong> (melalui klik, sentuhan, atau tombol <kbd className="px-1.5 py-0.5 text-xs bg-stone-950 border border-stone-700 rounded">Tab</kbd>) untuk mengamati perubahan fisis, lingkungan tektonik, dan catatan esensial OSN.
        </p>
      </div>

      {/* SVG Canvas Container - scrollable on narrow screens so labels stay >= 12px */}
      <div className="relative w-full bg-stone-950 border border-stone-800/90 rounded-2xl p-3 sm:p-4 shadow-2xl">
        <div className="w-full flex justify-between items-center text-xs text-stone-400 px-2 py-1.5 mb-2 border-b border-stone-800/60">
          <span>Pilih batuan atau jalur proses untuk analisis</span>
          <span className="text-amber-400 font-medium sm:hidden">Geser horizontal bila perlu →</span>
          <span className="text-amber-400 font-medium hidden sm:inline">Bumi = Dinamis</span>
        </div>

        {/* Scrollable wrapper on mobile to guarantee legible SVG text and touch targets */}
        <div className="w-full overflow-x-auto pb-2">
          <div className="relative min-w-[560px] w-full aspect-[4/3.4] max-h-[480px] mx-auto">
            <svg
              role="group"
              aria-label="Diagram siklus batuan"
              viewBox="0 0 560 460"
              className="w-full h-full select-none"
              style={{ touchAction: 'manipulation' }}
            >
              <defs>
                <marker
                  id="arrow-std"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5.5"
                  markerHeight="5.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#a8a29e" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                </marker>
                <marker
                  id="arrow-shortcut"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5.5"
                  markerHeight="5.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#c084fc" />
                </marker>

                <radialGradient id="magmaGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#9a3412" stopOpacity="0.25" />
                </radialGradient>
              </defs>

              {/* Subtle background tectonic ring */}
              <circle
                cx="280"
                cy="250"
                r="155"
                fill="none"
                stroke="#292524"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.7"
              />

              {/* Transitions / Lines */}
              {displayedTransitions.map((t) => {
                const fromN = nodeMap.get(t.from);
                const toN = nodeMap.get(t.to);
                if (!fromN || !toN) return null;

                const x1 = (fromN.x / 100) * 560;
                const y1 = (fromN.y / 100) * 460;
                const x2 = (toN.x / 100) * 560;
                const y2 = (toN.y / 100) * 460;

                const isSelected = selectedTransitionId === t.id;
                const isShortcut =
                  t.id.includes('beku-metamorf') ||
                  t.id.includes('metamorf-sedimen_lepas') ||
                  t.id.includes('sedimen_batu-sedimen_lepas') ||
                  t.id.includes('sedimen_batu-magma');

                // Curve path control point calculation
                const mx = (x1 + x2) / 2;
                const my = (y1 + y2) / 2;
                const dx = x2 - x1;
                const dy = y2 - y1;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const curveFactor = isShortcut ? 34 : 26;
                const perpX = (-dy / dist) * curveFactor;
                const perpY = (dx / dist) * curveFactor;

                const cx = mx + perpX;
                const cy = my + perpY;

                const pathData = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

                const strokeColor = isSelected
                  ? '#f59e0b'
                  : isShortcut
                  ? '#c084fc'
                  : '#a8a29e';

                const markerId = isSelected
                  ? 'url(#arrow-active)'
                  : isShortcut
                  ? 'url(#arrow-shortcut)'
                  : 'url(#arrow-std)';

                const labelText = SHORT_PROCESS_LABELS[t.id] || t.process;

                return (
                  <g
                    key={t.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`Jalur ${fromN.name} ke ${toN.name}: ${t.process} — lihat detail`}
                    onClick={() => handleTransitionClick(t)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleTransitionClick(t);
                      }
                    }}
                    className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                  >
                    {/* Wide invisible stroke for accessible touch target */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="32"
                      strokeLinecap="round"
                    />
                    {/* Visual stroke */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isSelected ? '3.5' : isShortcut ? '2.4' : '2.2'}
                      strokeDasharray={isShortcut ? '6 4' : 'none'}
                      markerEnd={markerId}
                      className="transition-all duration-200"
                    />
                    {/* Full readable label on path */}
                    <g
                      transform={`translate(${cx}, ${cy})`}
                      className="pointer-events-none"
                    >
                      <rect
                        x="-68"
                        y="-11"
                        width="136"
                        height="22"
                        rx="6"
                        fill="#1c1917"
                        stroke={isSelected ? '#f59e0b' : isShortcut ? '#9333ea' : '#44403c'}
                        strokeWidth={isSelected ? '1.5' : '1'}
                        opacity="0.95"
                      />
                      <text
                        textAnchor="middle"
                        y="4"
                        fill={isSelected ? '#fde68a' : isShortcut ? '#e9d5ff' : '#e7e5e4'}
                        fontSize="10"
                        fontWeight={isSelected ? '700' : '600'}
                      >
                        {labelText}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Nodes */}
              {ROCK_NODES.map((node) => {
                const nx = (node.x / 100) * 560;
                const ny = (node.y / 100) * 460;
                const isSelected = selectedNodeId === node.id && !selectedTransitionId;

                return (
                  <g
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`${node.name} — lihat detail`}
                    transform={`translate(${nx}, ${ny})`}
                    onClick={() => handleNodeClick(node)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNodeClick(node);
                      }
                    }}
                    className="cursor-pointer group outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
                  >
                    {/* 76-unit invisible touch target */}
                    <circle r="38" fill="transparent" />

                    {/* Outer aura on select */}
                    {isSelected && (
                      <circle
                        r="44"
                        fill={node.color}
                        opacity="0.22"
                        className="animate-pulse"
                      />
                    )}

                    {/* Main Node Circle - distinct rock color always visible on stroke */}
                    <circle
                      r={isSelected ? 36 : 33}
                      fill={node.id === 'magma' ? 'url(#magmaGlow)' : '#1c1917'}
                      stroke={node.color}
                      strokeWidth={isSelected ? 3.5 : 2.2}
                      className="transition-all duration-200 group-hover:scale-105"
                    />

                    {/* Inner accent ring */}
                    <circle
                      r={isSelected ? 30 : 27}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      opacity={isSelected ? 0.95 : 0.55}
                    />

                    {/* Node Label */}
                    <text
                      textAnchor="middle"
                      y={node.name.split(' ').length > 1 ? '-2' : '4'}
                      fill={isSelected ? '#ffffff' : node.textColor}
                      fontSize="11.5"
                      fontWeight="700"
                      className="pointer-events-none"
                    >
                      {node.name.split(' ')[0]}
                    </text>
                    {node.name.split(' ').length > 1 && (
                      <text
                        textAnchor="middle"
                        y="11"
                        fill={isSelected ? '#ffffff' : '#e7e5e4'}
                        fontSize="10"
                        fontWeight="600"
                        className="pointer-events-none"
                      >
                        {node.name.split(' ').slice(1).join(' ')}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 border-t border-stone-800/80 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-stone-400 inline-block"></span>
            Garis Solid: Jalur Siklus Utama
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-b-2 border-dashed border-purple-400 inline-block"></span>
            Garis Putus-putus: Jalan Pintas (Shortcut)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            Fokus Aktif
          </span>
        </div>
      </div>

      {/* Detail Card for selected Node or Transition */}
      {selectedTransition ? (
        <div
          role="region"
          aria-live="polite"
          className="bg-stone-900 border border-amber-500/30 rounded-2xl p-4 sm:p-6 space-y-3"
        >
          <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Proses Geologi Terpilih
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className={`text-xs font-semibold ${getForceColorClass(selectedTransition.forceType)}`}>
                Tenaga {selectedTransition.forceType}
              </span>
            </div>
            <button
              onClick={() => setSelectedTransitionId(null)}
              className="text-xs min-h-11 px-3 py-1.5 rounded-xl bg-stone-800 text-stone-200 hover:bg-stone-700 active:scale-[0.98] transition-all"
            >
              Tutup
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-stone-100 font-bold text-base sm:text-lg">
            <span>{nodeMap.get(selectedTransition.from)?.name}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-amber-400">{selectedTransition.process}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{nodeMap.get(selectedTransition.to)?.name}</span>
          </div>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            {selectedTransition.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
              <span className="text-stone-400 block mb-1 font-medium">Kondisi & Lingkungan:</span>
              <span className="text-stone-200">{selectedTransition.conditions}</span>
            </div>
            <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-800/30">
              <span className="text-amber-400 block mb-1 font-semibold flex items-center gap-1">
                <Info className="w-4 h-4" />
                Tips Pengujian OSN:
              </span>
              <span className="text-amber-200">{selectedTransition.osnTip}</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          role="region"
          aria-live="polite"
          className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 space-y-3"
        >
          <div className="flex items-start justify-between gap-2 border-b border-stone-800 pb-3">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-0.5">
                Detail Batuan Terpilih
              </div>
              <h3 className="text-lg sm:text-xl font-bold" style={{ color: selectedNode.color }}>
                {selectedNode.name}
              </h3>
            </div>
            <div className="text-right text-xs text-stone-400">
              <span className="font-mono text-stone-300">Famili: {selectedNode.type}</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            {selectedNode.shortDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1 font-medium flex items-center gap-1">
                <Layers className="w-4 h-4 text-stone-400" />
                Lingkungan Pembentukan:
              </span>
              <span className="text-stone-200 leading-relaxed">{selectedNode.env}</span>
            </div>

            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1 font-medium flex items-center gap-1">
                <Activity className="w-4 h-4 text-stone-400" />
                Kunci Proses Geologis:
              </span>
              <span className="text-stone-200 leading-relaxed">{selectedNode.keyProcess}</span>
            </div>
          </div>

          <div className="pt-1">
            <span className="text-xs text-stone-400 block mb-2 font-medium">Contoh Nyata di Kerak Bumi:</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.examples.map((ex, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 bg-stone-800/80 text-stone-200 rounded-lg border border-stone-700/60"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>

          {onSelectChapter && (
            <div className="pt-2 border-t border-stone-800/60 flex justify-end">
              <button
                onClick={() => {
                  if (selectedNode.id === 'magma' || selectedNode.id === 'beku') onSelectChapter(2);
                  else if (selectedNode.id === 'sedimen_lepas') onSelectChapter(3);
                  else if (selectedNode.id === 'sedimen_batu') onSelectChapter(4);
                  else if (selectedNode.id === 'metamorf') onSelectChapter(5);
                }}
                className="text-xs min-h-11 px-3 text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 rounded-xl active:scale-[0.98] transition-all"
              >
                Baca modul materi terkait
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
