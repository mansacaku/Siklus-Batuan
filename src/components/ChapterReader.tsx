import React, { useState, useMemo } from 'react';
import { CHAPTERS_DATA, Chapter } from '../data/rockCycleData';
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
  Layers,
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

  // Text size classes
  const textSizeClass =
    fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'compact'
      ? 'text-xs sm:text-sm leading-normal'
      : 'text-sm sm:text-base leading-relaxed';

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Search & Quick Navigator Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3 sm:p-4 space-y-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari konsep (misal: diagenesis, subduksi, granit, flux melting)..."
            className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/60"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Chapter dropdown toggle on mobile */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowChapterList((prev) => !prev)}
            className="flex items-center gap-2 text-xs font-semibold text-stone-300 hover:text-white px-3 py-1.5 bg-stone-950 border border-stone-800 rounded-xl transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Pilih Bab ({activeChapter.id} dari 12)</span>
            {showChapterList ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
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
            {filteredChapters.map((ch) => {
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
                  className={`text-left p-2.5 rounded-xl border text-xs transition-colors flex items-center justify-between gap-2 ${
                    active
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 font-semibold'
                      : 'bg-stone-950/70 border-stone-800/80 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="truncate">
                    <span className="text-[11px] text-stone-400 block font-normal">
                      Bab {ch.id}
                    </span>
                    <span className="truncate">{ch.title.split('. ')[1] || ch.title}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {bkm && <Bookmark className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Chapter Content View */}
      <article className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 space-y-6">
        {/* Chapter Header */}
        <header className="border-b border-stone-800 pb-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="font-semibold text-amber-400">MODUL OSN KEBUMIAN</span>
              <span>·</span>
              <span>Waktu Baca ~{activeChapter.readTime}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onToggleBookmark(activeChapter.id)}
                title={isBookmarked ? 'Hapus penanda' : 'Tandai halaman'}
                className={`p-2 rounded-xl border transition-colors ${
                  isBookmarked
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                onClick={() => onToggleComplete(activeChapter.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                {isCompleted ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Sudah Paham</span>
                  </>
                ) : (
                  <span>Tandai Paham</span>
                )}
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-stone-100 tracking-tight">
            {activeChapter.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-medium">
            {activeChapter.subtitle}
          </p>
        </header>

        {/* Lead paragraph */}
        <div className="p-3.5 sm:p-4 bg-stone-950/80 rounded-xl border-l-4 border-amber-500 text-stone-200 text-sm sm:text-base leading-relaxed italic">
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
                {section.body.map((par, pIdx) => (
                  <p key={pIdx} className={`text-stone-300 ${textSizeClass}`}>
                    {par}
                  </p>
                ))}
              </div>

              {/* Highlight callouts */}
              {section.highlight && (
                <div
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    section.highlight.type === 'feynman'
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : section.highlight.type === 'osn-key'
                      ? 'bg-blue-950/25 border-blue-500/40'
                      : section.highlight.type === 'formula'
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-red-950/20 border-red-500/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                    {section.highlight.type === 'feynman' && (
                      <>
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-amber-400">{section.highlight.title}</span>
                      </>
                    )}
                    {section.highlight.type === 'osn-key' && (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-blue-400">{section.highlight.title}</span>
                      </>
                    )}
                    {section.highlight.type === 'formula' && (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{section.highlight.title}</span>
                      </>
                    )}
                    {section.highlight.type === 'warning' && (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-red-400">{section.highlight.title}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed">
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
                      className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-stone-100">
                          {ex.name}
                        </span>
                        {ex.badge && (
                          <span className="text-[10px] text-amber-400 font-mono">
                            {ex.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {ex.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Footer */}
        <footer className="border-t border-stone-800 pt-5 flex items-center justify-between gap-2">
          {activeChapter.id > 1 ? (
            <button
              onClick={() => onSelectChapter(activeChapter.id - 1)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-300 hover:text-white bg-stone-950 border border-stone-800 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bab Sebelumnya</span>
            </button>
          ) : (
            <div></div>
          )}

          {activeChapter.id < CHAPTERS_DATA.length ? (
            <button
              onClick={() => {
                if (!isCompleted) onToggleComplete(activeChapter.id);
                onSelectChapter(activeChapter.id + 1);
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              <span>Lanjut ke Bab {activeChapter.id + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (!isCompleted) onToggleComplete(activeChapter.id);
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Selesai Seluruh Modul</span>
            </button>
          )}
        </footer>
      </article>
    </div>
  );
};
