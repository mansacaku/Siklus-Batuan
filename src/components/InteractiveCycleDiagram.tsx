import React, { useState } from 'react';
import { ROCK_NODES, ROCK_TRANSITIONS, RockNode, RockTransition } from '../data/rockCycleData';
import { Info, Sparkles, ArrowRight, Activity, ShieldAlert, Layers } from 'lucide-react';

interface Props {
  onSelectChapter?: (chapterId: number) => void;
}

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
    const isShortcut = t.id.includes('beku-metamorf') ||
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

  // Node coordinate lookup
  const nodeMap = new Map(ROCK_NODES.map((n) => [n.id, n]));

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Header Info */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5">
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

          {/* Filter segment control (Zero-pill compliant button group) */}
          <div className="inline-flex self-start sm:self-auto p-1 bg-stone-950 border border-stone-800 rounded-xl">
            <button
              onClick={() => setViewFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewFilter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Semua Jalur
            </button>
            <button
              onClick={() => setViewFilter('standard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewFilter === 'standard'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Siklus Standar
            </button>
            <button
              onClick={() => setViewFilter('shortcuts')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
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
          Ketuk salah satu <strong className="text-amber-300">Batuan</strong> atau <strong className="text-amber-300">Garis Panah Proses</strong> di bawah ini untuk mengamati perubahan fisis, lingkungan tektonik, dan catatan esensial OSN.
        </p>
      </div>

      {/* SVG Canvas Container - mobile safe */}
      <div className="relative w-full bg-stone-950 border border-stone-800/90 rounded-2xl p-2 sm:p-4 overflow-hidden shadow-2xl">
        <div className="w-full flex justify-between items-center text-[11px] text-stone-400 px-2 py-1 mb-1 border-b border-stone-800/60">
          <span>Sentuh komponen untuk analisis</span>
          <span className="text-amber-400/90 font-medium">Bumi = Dinamis</span>
        </div>

        {/* Responsive SVG wrapper with aspect ratio */}
        <div className="relative w-full aspect-[4/3.4] max-h-[460px] mx-auto">
          <svg
            viewBox="0 0 500 420"
            className="w-full h-full select-none"
            style={{ touchAction: 'manipulation' }}
          >
            <defs>
              {/* Arrow markers */}
              <marker
                id="arrow-std"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#78716c" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
              </marker>
              <marker
                id="arrow-shortcut"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
              </marker>

              {/* Radial gradient for Magma chamber */}
              <radialGradient id="magmaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#9a3412" stopOpacity="0.2" />
              </radialGradient>
            </defs>

            {/* Subtle background tectonic ring */}
            <circle
              cx="250"
              cy="230"
              r="140"
              fill="none"
              stroke="#292524"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.6"
            />

            {/* Transitions / Lines */}
            {displayedTransitions.map((t) => {
              const fromN = nodeMap.get(t.from);
              const toN = nodeMap.get(t.to);
              if (!fromN || !toN) return null;

              const x1 = (fromN.x / 100) * 500;
              const y1 = (fromN.y / 100) * 420;
              const x2 = (toN.x / 100) * 500;
              const y2 = (toN.y / 100) * 420;

              const isSelected = selectedTransitionId === t.id;
              const isShortcut = t.id.includes('beku-metamorf') ||
                t.id.includes('metamorf-sedimen_lepas') ||
                t.id.includes('sedimen_batu-sedimen_lepas') ||
                t.id.includes('sedimen_batu-magma');

              // Curve path control point calculation
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              const dx = x2 - x1;
              const dy = y2 - y1;
              const dist = Math.sqrt(dx * dx + dy * dy);

              // Curving slightly away from center (250, 230)
              const curveFactor = isShortcut ? 28 : 22;
              const perpX = (-dy / dist) * curveFactor;
              const perpY = (dx / dist) * curveFactor;

              const cx = mx + perpX;
              const cy = my + perpY;

              const pathData = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

              const strokeColor = isSelected
                ? '#f59e0b'
                : isShortcut
                ? '#a855f7'
                : '#78716c';

              const markerId = isSelected
                ? 'url(#arrow-active)'
                : isShortcut
                ? 'url(#arrow-shortcut)'
                : 'url(#arrow-std)';

              return (
                <g key={t.id} className="cursor-pointer" onClick={() => handleTransitionClick(t)}>
                  {/* Invisible thicker stroke for easy mobile touch */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                  {/* Visual stroke */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isSelected ? '3.5' : isShortcut ? '2.2' : '2'}
                    strokeDasharray={isShortcut ? '5 4' : 'none'}
                    markerEnd={markerId}
                    className="transition-all duration-200"
                  />
                  {/* Label on path */}
                  <g
                    transform={`translate(${cx}, ${cy})`}
                    className="pointer-events-none"
                  >
                    <rect
                      x="-48"
                      y="-9"
                      width="96"
                      height="18"
                      rx="4"
                      fill="#1c1917"
                      stroke={isSelected ? '#f59e0b' : '#292524'}
                      strokeWidth={isSelected ? '1' : '0.7'}
                      opacity="0.9"
                    />
                    <text
                      textAnchor="middle"
                      y="3.5"
                      fill={isSelected ? '#fde68a' : isShortcut ? '#d8b4fe' : '#a8a29e'}
                      fontSize="8.5"
                      fontWeight={isSelected ? '700' : '500'}
                    >
                      {t.process.length > 18 ? t.process.slice(0, 16) + '..' : t.process}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Nodes */}
            {ROCK_NODES.map((node) => {
              const nx = (node.x / 100) * 500;
              const ny = (node.y / 100) * 420;
              const isSelected = selectedNodeId === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${nx}, ${ny})`}
                  onClick={() => handleNodeClick(node)}
                  className="cursor-pointer group"
                >
                  {/* Outer aura on select */}
                  {isSelected && (
                    <circle
                      r="40"
                      fill={node.color}
                      opacity="0.2"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    r={isSelected ? 32 : 28}
                    fill={node.id === 'magma' ? 'url(#magmaGlow)' : '#1c1917'}
                    stroke={isSelected ? node.color : '#44403c'}
                    strokeWidth={isSelected ? 3 : 1.8}
                    className="transition-all duration-200 group-hover:scale-105"
                  />

                  {/* Inner accent ring */}
                  <circle
                    r={isSelected ? 27 : 23}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    opacity={isSelected ? 0.9 : 0.4}
                  />

                  {/* Node Label */}
                  <text
                    textAnchor="middle"
                    y="1"
                    fill={isSelected ? '#ffffff' : node.textColor}
                    fontSize="9.5"
                    fontWeight="700"
                    className="pointer-events-none"
                  >
                    {node.name.split(' ')[0]}
                  </text>
                  {node.name.split(' ').length > 1 && (
                    <text
                      textAnchor="middle"
                      y="12"
                      fill={isSelected ? '#ffffff' : '#d6d3d1'}
                      fontSize="8"
                      fontWeight="500"
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

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-stone-500 inline-block"></span>
            Garis Solid: Jalur Siklus Utama
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 border-b border-dashed border-purple-400 inline-block"></span>
            Garis Putus-putus: Jalan Pintas (Shortcut)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            Fokus Aktif
          </span>
        </div>
      </div>

      {/* Detail Card for selected Node or Transition */}
      {selectedTransition ? (
        <div className="bg-stone-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Proses Geologi Terpilih
              </span>
              <span className="text-xs text-stone-500">·</span>
              <span className="text-xs text-stone-400">Tenaga {selectedTransition.forceType}</span>
            </div>
            <button
              onClick={() => setSelectedTransitionId(null)}
              className="text-xs text-stone-400 hover:text-stone-200 px-2 py-1 rounded bg-stone-800"
            >
              Tutup
            </button>
          </div>

          <div className="flex items-center gap-2 text-stone-100 font-bold text-base sm:text-lg">
            <span>{nodeMap.get(selectedTransition.from)?.name}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-amber-400">{selectedTransition.process}</span>
            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{nodeMap.get(selectedTransition.to)?.name}</span>
          </div>

          <p className="text-sm text-stone-300 leading-relaxed">
            {selectedTransition.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80">
              <span className="text-stone-400 block mb-1 font-medium">Kondisi & Lingkungan:</span>
              <span className="text-stone-200">{selectedTransition.conditions}</span>
            </div>
            <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-800/30">
              <span className="text-amber-400 block mb-1 font-semibold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                Tips Pengujian OSN:
              </span>
              <span className="text-amber-200">{selectedTransition.osnTip}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-3">
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

          <p className="text-sm text-stone-300 leading-relaxed">
            {selectedNode.shortDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1 font-medium flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-stone-400" />
                Lingkungan Pembentukan:
              </span>
              <span className="text-stone-200 leading-relaxed">{selectedNode.env}</span>
            </div>

            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
              <span className="text-stone-400 block mb-1 font-medium flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-stone-400" />
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
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
              >
                Baca modul materi terkait
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
