import React, { useState, useMemo, useEffect } from 'react';
import { CHAPTERS_DATA } from '../data/rockCycleData';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';

interface Props {
  activeChapterId: number;
  onSelectChapter: (id: number) => void;
  completedChapters: number[];
  onToggleComplete: (id: number) => void;
  bookmarkedChapters: number[];
  onToggleBookmark: (id: number) => void;
  fontSize: 'normal' | 'large' | 'compact';
}

export const ChapterReader: React.FC<Props> = ({
  activeChapterId,
  onSelectChapter,
  completedChapters,
  onToggleComplete,
  bookmarkedChapters,
  onToggleBookmark,
  fontSize
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChapterList, setShowChapterList] = useState(false);

  // Auto-open chapter list when user searches
  useEffect(() => {
    if (searchQuery.trim()) {
      setShowChapterList(true);
    }
  }, [searchQuery]);

  const activeChapter = useMemo(() => {
    return CHAPTERS_DATA.find((c) => c.id === activeChapterId) || CHAPTERS_DATA[0];
  }, [activeChapterId]);

  // Filtered chapters for search
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return CHAPTERS_DATA;
    const q = searchQuery.toLowerCase();
    return CHAPTERS_DATA.filter((c) => {
      const matchTitle = c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q);
      const matchLead = c.content.lead.toLowerCase().includes(q);
      const matchSections = c.content.sections.some(
        (s) =>
          (s.heading && s.heading.toLowerCase().includes(q)) ||
          s.body.some((b) => b.toLowerCase().includes(q)) ||
          (s.highlight && s.highlight.text.toLowerCase().includes(q))
      );
      return matchTitle || matchLead || matchSections;
    });
  }, [searchQuery]);

  const isCompleted = completedChapters.includes(activeChapter.id);
  const isBookmarked = bookmarkedChapters.includes(activeChapter.id);

  // Proportional typography classes across body, callouts, and examples
  const textSizeClass =
    fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'compact'
      ? 'text-xs sm:text-sm leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  const calloutSizeClass =
    fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'compact'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  const exampleDescSizeClass =
    fontSize === 'large'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-xs sm:text-sm leading-relaxed';

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Search & Quick Navigator Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 space-y-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            aria-label="Cari konsep"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari konsep (misal: diagenesis, subduksi, granit, flux melting)..."
            className="w-full min-h-11 pl-10 pr-20 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder:text-stone-400 focus:border-amber-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-9 px-3 rounded-lg text-xs font-medium text-stone-300 hover:text-white hover:bg-stone-800 active:scale-[0.98] transition-all"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Chapter dropdown toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => setShowChapterList((prev) => !prev)}
            aria-expanded={showChapterList}
            className="flex items-center gap-2 min-h-11 px-3 py-2 text-xs font-semibold text-stone-200 hover:text-white bg-stone-950 hover:bg-stone-800 active:scale-[0.98] active:bg-stone-800 border border-stone-800 rounded-xl transition-all"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Pilih Bab ({activeChapter.id} dari 12)</span>
            {showChapterList ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>{completedChapters.length} / 12 Selesai</span>
            <div className="w-16 h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${(completedChapters.length / 12) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Expandable Chapter List */}
        {showChapterList && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2 border-t border-stone-800 max-h-72 overflow-y-auto">
            {filteredChapters.length === 0 ? (
              <p className="text-xs text-stone-400 p-3 col-span-full">
                Tidak ada bab untuk “{searchQuery}”. Coba kata kunci lain.
              </p>
            ) : (
              filteredChapters.map((ch) => {
                const active = ch.id === activeChapter.id;
                const done = completedChapters.includes(ch.id);
                const bkm = bookmarkedChapters.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(ch.id);
                      setShowChapterList(false);
                    }}
                    className={`text-left min-h-11 p-3 rounded-xl border text-xs transition-all active:scale-[0.98] flex items-center justify-between gap-2 ${
                      active
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 font-semibold'
                        : 'bg-stone-950/70 border-stone-800/80 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <div className="truncate">
                      <span className="text-xs text-stone-400 block font-normal">
                        Bab {ch.id}
                      </span>
                      <span className="truncate">{ch.title.split('. ')[1] || ch.title}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {bkm && <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                      {done && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Main Chapter Content View */}
      <article className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 space-y-6">
        {/* Chapter Header */}
        <header className="border-b border-stone-800 pb-4 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="font-semibold text-amber-400">MODUL OSN KEBUMIAN</span>
              <span>·</span>
              <span>Waktu Baca ~{activeChapter.readTime}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onToggleBookmark(activeChapter.id)}
                aria-label={isBookmarked ? 'Hapus penanda bab ini' : 'Simpan penanda bab ini'}
                aria-pressed={isBookmarked}
                className={`min-h-11 px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all active:scale-[0.98] active:bg-stone-800 ${
                  isBookmarked
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span className="hidden sm:inline">{isBookmarked ? 'Ditandai' : 'Simpan'}</span>
              </button>

              <button
                onClick={() => onToggleComplete(activeChapter.id)}
                aria-pressed={isCompleted}
                className={`flex items-center gap-1.5 min-h-11 px-3 py-2 rounded-xl border text-xs font-medium transition-all active:scale-[0.98] active:bg-stone-800 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:text-white'
                }`}
              >
                {isCompleted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Sudah Paham</span>
                  </>
                ) : (
                  <span>Tandai Paham</span>
                )}
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-stone-100 tracking-tight leading-tight">
            {activeChapter.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-medium">
            {activeChapter.subtitle}
          </p>
        </header>

        {/* Lead paragraph */}
        <div className={`p-4 bg-stone-950/80 rounded-xl border-l-4 border-amber-500 text-stone-200 italic ${calloutSizeClass}`}>
          "{activeChapter.content.lead}"
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {activeChapter.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              {section.heading && (
                <h3 className="text-base sm:text-lg font-bold text-stone-100 border-b border-stone-800/80 pb-1.5">
                  {section.heading}
                </h3>
              )}

              {section.subheading && (
                <h4 className="text-sm font-semibold text-stone-300">
                  {section.subheading}
                </h4>
              )}

              <div className="space-y-2.5">
                {section.body.map((line, pIdx) => {
                  const m = line.match(/^(?:([•\d.]+)\s*)?([^:]{3,60}):\s+(.*)$/);
                  if (m) {
                    return (
                      <p key={pIdx} className={`text-stone-300 pl-4 -indent-4 ${textSizeClass}`}>
                        {m[1] ? <span className="text-amber-400 font-semibold mr-1">{m[1]}</span> : null}
                        <strong className="text-stone-100 font-semibold">{m[2]}:</strong> {m[3]}
                      </p>
                    );
                  }
                  return (
                    <p key={pIdx} className={`text-stone-300 ${textSizeClass}`}>
                      {line}
                    </p>
                  );
                })}
              </div>

              {/* Highlight callouts - scaled >= body text for proper hierarchy */}
              {section.highlight && (
                <div
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    section.highlight.type === 'feynman'
                      ? 'bg-amber-950/25 border-amber-500/40'
                      : section.highlight.type === 'osn-key'
                      ? 'bg-sky-950/25 border-sky-500/40'
                      : section.highlight.type === 'formula'
                      ? 'bg-emerald-950/25 border-emerald-500/40'
                      : 'bg-rose-950/25 border-rose-500/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                    {section.highlight.type === 'feynman' && (
                      <>
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400">{section.highlight.title}</span>
                      </>
                    )}
                    {section.highlight.type === 'osn-key' && (
                      <>
                        <Sparkles className="w-4 h-4 text-sky-400" />
                        <span className="text-sky-400">{section.highlight.title}</span>
                      </>
                    )}
                    {section.highlight.type === 'formula' && (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">{section.highlight.title}</span>
                      </>
                    )}
                    {section.highlight.type === 'warning' && (
                      <>
                        <AlertCircle className="w-4 h-4 text-rose-400" />
                        <span className="text-rose-400">{section.highlight.title}</span>
                      </>
                    )}
                  </div>
                  <p className={`text-stone-100 font-medium ${calloutSizeClass}`}>
                    {section.highlight.text}
                  </p>
                </div>
              )}

              {/* Examples listing */}
              {section.examples && section.examples.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {section.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-stone-100">
                          {ex.name}
                        </span>
                        {ex.badge && (
                          <span className="text-xs text-amber-400 font-mono">
                            {ex.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-stone-300 ${exampleDescSizeClass}`}>
                        {ex.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Footer (Honest progress: navigating does NOT auto-mark complete) */}
        <footer className="border-t border-stone-800 pt-5 flex items-center justify-between gap-2">
          {activeChapter.id > 1 ? (
            <button
              onClick={() => onSelectChapter(activeChapter.id - 1)}
              className="flex items-center gap-1.5 min-h-11 px-3.5 py-2 text-xs font-semibold text-stone-200 hover:text-white bg-stone-950 hover:bg-stone-800 active:scale-[0.98] active:bg-stone-800 border border-stone-800 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Bab Sebelumnya</span>
            </button>
          ) : (
            <div></div>
          )}

          {activeChapter.id < CHAPTERS_DATA.length ? (
            <button
              onClick={() => onSelectChapter(activeChapter.id + 1)}
              className="flex items-center gap-1.5 min-h-11 px-4 py-2 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              <span>Lanjut ke Bab {activeChapter.id + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onToggleComplete(activeChapter.id)}
              className="flex items-center gap-1.5 min-h-11 px-4 py-2 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] rounded-xl transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Bab Terakhir Dipahami' : 'Tandai Bab 12 Paham'}</span>
            </button>
          )}
        </footer>
      </article>
    </div>
  );
};
