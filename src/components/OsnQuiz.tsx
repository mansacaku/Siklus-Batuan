import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/rockCycleData';
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  Check
} from 'lucide-react';

export const OsnQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: string }>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<{ [qId: number]: boolean }>({});
  const [showSummary, setShowSummary] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQ = QUIZ_QUESTIONS.length;
  const isSubmitted = !!submittedQuestions[currentQ.id];
  const selectedOptionId = selectedAnswers[currentQ.id];

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optId }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;
    setSubmittedQuestions((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setCurrentIndex(0);
    setShowSummary(false);
  };

  // Calculate score
  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctId ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((score / totalQ) * 100);

  return (
    <div className="w-full max-w-full space-y-4">
      {/* Quiz Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Latihan Soal & Analisis OSN
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-100">
              Uji Nalar Siklus Batuan Kebumian
            </h2>
          </div>

          <div className="text-xs text-stone-400 flex items-center gap-2">
            <span>
              Soal {currentIndex + 1} dari {totalQ}
            </span>
            <div className="w-20 h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / totalQ) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
          Soal-soal ini dirancang sesuai standar seleksi OSN Kebumian: bukan menguji hafalan nama belaka, melainkan kemampuan mendiagnosis proses fisis-kimiawi dan dinamika tektonik lempeng.
        </p>
      </div>

      {!showSummary ? (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 space-y-5">
          {/* Scenario Context */}
          <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 text-xs sm:text-sm text-stone-300">
            <span className="text-amber-400 font-semibold block mb-0.5">
              Skenario Lapangan / Konteks Geologi:
            </span>
            <span>{currentQ.contextScenario}</span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-stone-100 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List (AA contrast compliant without opacity-60) */}
          <div className="space-y-2.5" role="radiogroup" aria-label={currentQ.question}>
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = opt.id === currentQ.correctId;

              let buttonStyle =
                'bg-stone-950/70 border-stone-800 text-stone-200 hover:bg-stone-800 active:scale-[0.98]';

              if (isSelected && !isSubmitted) {
                buttonStyle =
                  'bg-amber-500/15 border-amber-500/60 text-amber-200 font-semibold active:scale-[0.98]';
              } else if (isSubmitted) {
                if (isCorrect) {
                  buttonStyle =
                    'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'bg-rose-950/30 border-rose-500/80 text-rose-200';
                } else {
                  buttonStyle = 'bg-stone-950/50 border-stone-800/70 text-stone-400';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 min-h-[48px] ${buttonStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 uppercase ${
                      isSelected && !isSubmitted
                        ? 'bg-amber-500 text-stone-950'
                        : isSubmitted && isCorrect
                        ? 'bg-emerald-500 text-stone-950'
                        : isSubmitted && isSelected && !isCorrect
                        ? 'bg-rose-500 text-white'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Analysis Breakdown (4 Steps OSN Framework) when submitted */}
          {isSubmitted && (
            <div
              role="status"
              aria-live="polite"
              className="space-y-4 pt-3 border-t border-stone-800 animate-fadeIn"
            >
              <div
                className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs sm:text-sm font-semibold ${
                  selectedOptionId === currentQ.correctId
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                }`}
              >
                {selectedOptionId === currentQ.correctId ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tepat Sekali! Analisis Geologismu Valid.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Kurang Tepat. Simak analisis kausalitas di bawah ini.</span>
                  </>
                )}
              </div>

              {/* 4-Step Thinking Box */}
              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Kerangka Berpikir 4 Tahap OSN:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-800/80">
                    <span className="text-stone-400 block font-medium mb-0.5">1. Apa yang terjadi?</span>
                    <span className="text-stone-200">{currentQ.analisisOSN.terjadi}</span>
                  </div>
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-800/80">
                    <span className="text-stone-400 block font-medium mb-0.5">2. Kondisi penyebab?</span>
                    <span className="text-stone-200">{currentQ.analisisOSN.kondisi}</span>
                  </div>
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-800/80">
                    <span className="text-stone-400 block font-medium mb-0.5">3. Proses geologi?</span>
                    <span className="text-stone-200">{currentQ.analisisOSN.proses}</span>
                  </div>
                  <div className="p-3 bg-stone-900 rounded-xl border border-stone-800/80">
                    <span className="text-stone-400 block font-medium mb-0.5">4. Hasil akhir?</span>
                    <span className="text-amber-300 font-semibold">{currentQ.analisisOSN.hasil}</span>
                  </div>
                </div>
              </div>

              {/* Comprehensive explanation */}
              <div className="text-xs sm:text-sm text-stone-200 leading-relaxed bg-stone-950/60 p-4 rounded-xl border border-stone-800">
                <span className="font-semibold text-amber-400 block mb-1">
                  Ulasan Konseptual:
                </span>
                {currentQ.penjelasanLengkap}
              </div>
            </div>
          )}

          {/* Persistent Navigation & Action Bar (Sebelumnya always available) */}
          <div className="pt-2 border-t border-stone-800/80 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex items-center gap-1.5 min-h-11 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  currentIndex === 0
                    ? 'bg-stone-950 text-stone-400 border-stone-900 cursor-not-allowed'
                    : 'bg-stone-950 text-stone-200 border-stone-800 hover:bg-stone-800 hover:text-white active:scale-[0.98]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className={`min-h-11 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                    selectedOptionId
                      ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 active:scale-[0.98] shadow-lg shadow-amber-500/20'
                      : 'bg-stone-800 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <span>Periksa Jawaban</span>
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 min-h-11 px-5 py-2.5 text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-amber-500/20"
                >
                  <span>{currentIndex < totalQ - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {!isSubmitted && !selectedOptionId && (
              <p className="text-xs text-stone-400 text-right">
                Pilih satu jawaban dulu untuk memeriksa analisis.
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Summary Card */
        <div
          role="region"
          aria-live="polite"
          className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center space-y-5"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs text-stone-400 font-medium">Evaluasi Pemahaman OSN Kebumian</span>
            <h3 className="text-2xl font-extrabold text-stone-100 mt-1">
              Skor Kamu: {score} / {totalQ} ({scorePercentage}%)
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-md mx-auto leading-relaxed">
              {scorePercentage >= 85
                ? 'Luar biasa! Pemahaman kausalitas siklus batuan dan pola berpikir geologismu sudah berada di level Calon Medalis Nasional OSN!'
                : scorePercentage >= 60
                ? 'Bagus! Kamu sudah memahami prinsip-prinsip utama. Ulangi bab terkait untuk memperdalam jalan pintas siklus dan diagenesis.'
                : 'Terus berlatih! Ingat rumus berpikir: Apa yang terjadi → Kondisi penyebab → Proses → Hasil akhir.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
