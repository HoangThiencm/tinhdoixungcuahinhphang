import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FlipHorizontal2,
  List,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Scissors,
  Sparkles,
  X,
} from 'lucide-react';
import { AXIS_ACTIVITIES, AXIS_GROUPS } from './data/axisShapes';
import { CENTER_ACTIVITIES, CENTER_GROUPS } from './data/centerShapes';
import { AxisStage } from './components/AxisStage';
import { CenterStage } from './components/CenterStage';
import { PaperCutStage } from './components/PaperCutStage';
import { GridCompletionStage } from './components/GridCompletionStage';
import type { LessonTab, SymmetryActivity } from './types/symmetry';

type PlaySpeed = 'slow' | 'normal' | 'fast';

const SPEED_MULT: Record<PlaySpeed, number> = {
  slow: 0.55,
  normal: 1,
  fast: 1.75,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<LessonTab>('axis');
  const [selectedActivityId, setSelectedActivityId] = useState<string>(AXIS_ACTIVITIES[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);

  // Simulation playback state
  const [progress, setProgress] = useState(0); // normalized 0..1 (axis-fold), 0..180 (center-rotate & grid-complete), 0..maxStep (paper-cut)
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [axisDiscovered, setAxisDiscovered] = useState(false);
  const [centerDiscovered, setCenterDiscovered] = useState(false);
  const [speed, setSpeed] = useState<PlaySpeed>('normal');

  // Reference & display toggles
  const [showReference, setShowReference] = useState(true);
  const [showAllAxes, setShowAllAxes] = useState(false);
  const [showCounterpart, setShowCounterpart] = useState(false);

  // Candidate selections
  const [selectedLineId, setSelectedLineId] = useState<string>('');
  const [customDiameterAngle, setCustomDiameterAngle] = useState<number | null>(null);
  const [selectedPointId, setSelectedPointId] = useState<string>('');

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const groups = activeTab === 'axis' ? AXIS_GROUPS : CENTER_GROUPS;
  const activities = activeTab === 'axis' ? AXIS_ACTIVITIES : CENTER_ACTIVITIES;

  const activity: SymmetryActivity = useMemo(() => {
    return activities.find((a) => a.id === selectedActivityId) || activities[0];
  }, [activities, selectedActivityId]);

  // Max value of `progress` depending on mode
  const maxProgress = useMemo(() => {
    if (activity.mode === 'axis-fold') return 1;
    if (activity.mode === 'center-rotate') return 180;
    if (activity.mode === 'grid-complete') return 180;
    return Math.max(1, activity.steps.length - 1);
  }, [activity]);

  // Reset all simulation & inquiry state cleanly whenever activity changes
  const resetForActivity = useCallback((act: SymmetryActivity) => {
    setIsPlaying(false);
    setHasStarted(false);
    setProgress(0);
    setShowAllAxes(false);
    setShowCounterpart(false);
    setAxisDiscovered(false);
    setCenterDiscovered(false);
    setCustomDiameterAngle(null);

    if (act.mode === 'axis-fold') {
      setSelectedLineId(act.candidateLines[0]?.id || '');
      setShowReference(false);
    } else if (act.mode === 'center-rotate') {
      setSelectedPointId(act.candidatePoints[0]?.id || '');
      setShowReference(false);
    } else if (act.mode === 'grid-complete') {
      setShowReference(false); // vertex guides off initially until toggled
    } else {
      setShowReference(true);
    }
  }, []);

  // Initialize on first mount
  useEffect(() => {
    resetForActivity(activity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity.id]);

  // Switch between Tab 1 (Bài 21) and Tab 2 (Bài 22)
  const handleTabChange = (tab: LessonTab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    const firstAct = tab === 'axis' ? AXIS_ACTIVITIES[0] : CENTER_ACTIVITIES[0];
    setSelectedActivityId(firstAct.id);
    setMobileMenuOpen(false);
  };

  const handleSelectActivity = (id: string) => {
    setSelectedActivityId(id);
    setMobileMenuOpen(false);
  };

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
      return;
    }

    const step = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min(0.05, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      setProgress((prev) => {
        let rate = 0.55; // default units/sec
        if (activity.mode === 'axis-fold') {
          rate = 0.55 * SPEED_MULT[speed]; // ~1.8s full fold
        } else if (activity.mode === 'center-rotate' || activity.mode === 'grid-complete') {
          rate = 75 * SPEED_MULT[speed]; // ~2.4s full 180° rotation
        } else if (activity.mode === 'paper-cut') {
          rate = 0.72 * SPEED_MULT[speed]; // ~1.4s per step
        }

        const next = prev + rate * dt;
        if (next >= maxProgress) {
          setIsPlaying(false);
          return maxProgress;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [isPlaying, speed, activity.mode, maxProgress]);

  // Playback handlers
  const handleStart = () => {
    if (activity.mode === 'grid-complete') {
      setShowCounterpart(true);
    }
    if (progress >= maxProgress - 0.001) {
      setProgress(0);
    }
    setHasStarted(true);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleResume = () => {
    if (progress >= maxProgress - 0.001) {
      setProgress(0);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setHasStarted(false);
    setProgress(0);
    setShowAllAxes(false);
    setShowCounterpart(false);
    setAxisDiscovered(false);
    setCenterDiscovered(false);
  };

  const handleUnfold = () => {
    setIsPlaying(false);
    setHasStarted(true);
    setProgress(0);
  };

  const handleSliderChange = (val: number) => {
    setIsPlaying(false);
    setHasStarted(true);
    if (activity.mode === 'grid-complete' && val > 0) {
      setShowCounterpart(true);
    }
    setProgress(val);
    if (activity.mode === 'axis-fold' && val >= 0.99 && (customDiameterAngle !== null || activeLine?.isSymmetryAxis)) {
      setAxisDiscovered(true);
    }
    if (activity.mode === 'center-rotate' && val >= 179.5 && activePoint?.isSymmetryCenter) {
      setCenterDiscovered(true);
    }
  };

  // Candidate line selection (Tab 1)
  const activeLine = useMemo(() => {
    if (activity.mode !== 'axis-fold') return undefined;
    return (
      activity.candidateLines.find((l) => l.id === selectedLineId) ||
      activity.candidateLines[0]
    );
  }, [activity, selectedLineId]);

  const handleSelectCandidateLine = (lineId: string) => {
    setSelectedLineId(lineId);
    setCustomDiameterAngle(null);
    setIsPlaying(false);
    setHasStarted(false);
    setProgress(0);
    setAxisDiscovered(false);
  };

  const handleCustomDiameterChange = (deg: number) => {
    setCustomDiameterAngle(deg);
    setIsPlaying(false);
    setHasStarted(false);
    setProgress(0);
    setAxisDiscovered(false);
  };

  // Candidate point selection (Tab 2)
  const activePoint = useMemo(() => {
    if (activity.mode !== 'center-rotate') return undefined;
    return (
      activity.candidatePoints.find((p) => p.id === selectedPointId) ||
      activity.candidatePoints[0]
    );
  }, [activity, selectedPointId]);

  const handleSelectCandidatePoint = (pointId: string) => {
    setSelectedPointId(pointId);
    setIsPlaying(false);
    setHasStarted(false);
    setProgress(0);
    setCenterDiscovered(false);
  };

  useEffect(() => {
    if (activity.mode === 'axis-fold' && progress >= 0.99 && (customDiameterAngle !== null || activeLine?.isSymmetryAxis)) {
      setAxisDiscovered(true);
    }
    if (activity.mode === 'center-rotate' && progress >= 179.5 && activePoint?.isSymmetryCenter) {
      setCenterDiscovered(true);
    }
  }, [activity.mode, progress, activeLine, activePoint]);

  const isAxisTab = activeTab === 'axis';
  const currentPaperStepIdx =
    activity.mode === 'paper-cut'
      ? Math.min(activity.steps.length - 1, Math.round(progress))
      : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* =====================================================================
          HEADER + TWO LARGE PRIMARY TABS
      ===================================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-snug">
                KHÁM PHÁ TÍNH ĐỐI XỨNG CỦA HÌNH PHẲNG
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
              aria-label="Mở danh sách hình và hoạt động"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <List className="w-4 h-4" />}
              <span>Danh sách</span>
            </button>
          </div>

          {/* Two large primary tabs */}
          <nav
            className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl shrink-0"
            aria-label="Chọn bài học"
          >
            <button
              type="button"
              onClick={() => handleTabChange('axis')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
                isAxisTab
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <FlipHorizontal2 className="w-4 h-4 shrink-0" />
              <span>Bài 21: Hình có trục đối xứng</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('center')}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap ${
                !isAxisTab
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <RotateCw className="w-4 h-4 shrink-0" />
              <span>Bài 22: Hình có tâm đối xứng</span>
            </button>
          </nav>
        </div>
      </header>

      {/* =====================================================================
          MAIN THREE-COLUMN CLASSROOM WORKSPACE
      ===================================================================== */}
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-4 sm:px-6 py-5 grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-5 items-start">
        {/* LEFT COLUMN: Grouped Activity & Shape Selector */}
        <aside
          className={`${
            'block'
          } lg:block bg-white border border-slate-200 rounded-xl overflow-hidden lg:sticky lg:top-24`}
        >
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70">
            <h2 className="text-sm font-bold text-slate-900">
              {isAxisTab ? 'Chọn hình – Bài 21' : 'Chọn hình – Bài 22'}
            </h2>
          </div>

          <div className="max-h-[68vh] lg:max-h-[calc(100vh-190px)] overflow-y-auto divide-y divide-slate-100">
            {groups.map((grp) => {
              const items = activities.filter((a) => a.groupId === grp.id);
              return (
                <div key={grp.id} className="p-3">
                  <div className="px-1.5 mb-2">
                    <div className="text-xs font-bold text-slate-800 leading-snug">
                      {grp.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{grp.subtitle}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {items.map((item) => {
                      const active = item.id === activity.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectActivity(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-between gap-2 ${
                            active
                              ? isAxisTab
                                ? 'bg-sky-600 text-white font-semibold'
                                : 'bg-teal-600 text-white font-semibold'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate">{item.shortTitle}</span>
                          {item.mode === 'paper-cut' && (
                            <Scissors
                              className={`w-3.5 h-3.5 shrink-0 ${
                                active ? 'text-white/85' : 'text-slate-400'
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER COLUMN: Interactive Simulation Stage + Unified Control Bar */}
        <section className="flex flex-col gap-4 min-w-0">
          {/* Stage Container */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">
            {/* Stage Top Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activity.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {activity.sourceRef}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {activity.mode === 'axis-fold' && axisDiscovered && (
                  <button
                    type="button"
                    onClick={() => setShowAllAxes((value) => !value)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-800 transition-colors whitespace-nowrap"
                  >
                    <span>{showAllAxes ? 'Ẩn các trục còn lại' : 'Hiện các trục còn lại'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active SVG Canvas */}
            {activity.mode === 'axis-fold' && activeLine && (
              <AxisStage
                activity={activity}
                selectedLine={activeLine}
                progress={progress}
                showAllAxes={showAllAxes}
                axisDiscovered={axisDiscovered}
                onProgressChange={handleSliderChange}
                onAxisDiscovered={() => setAxisDiscovered(true)}
                customDiameterAngle={customDiameterAngle}
              />
            )}

            {activity.mode === 'center-rotate' && activePoint && (
              <CenterStage
                activity={activity}
                selectedPoint={activePoint}
                angle={progress}
                showReference={showReference}
                centerDiscovered={centerDiscovered}
                onAngleChange={handleSliderChange}
                onCenterDiscovered={() => setCenterDiscovered(true)}
              />
            )}

            {activity.mode === 'paper-cut' && (
              <div>
                <PaperCutStage
                  activity={activity}
                  timeline={progress}
                  showReference={showReference}
                  onTimelineChange={handleSliderChange}
                />
                {/* Current Step Description */}
                <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-sm">
                  <div className="font-bold text-slate-900">
                    {activity.steps[currentPaperStepIdx]?.title}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {activity.steps[currentPaperStepIdx]?.description}
                  </p>
                </div>
              </div>
            )}

            {activity.mode === 'grid-complete' && (
              <GridCompletionStage
                activity={activity}
                revealAngle={progress}
                showCounterpart={showCounterpart}
                showVertexGuides={showReference}
                onRevealAngleChange={handleSliderChange}
              />
            )}

          </div>

          {/* =================================================================
              UNIFIED SIMULATION CONTROLS DECK (Right below the canvas)
          ================================================================= */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col gap-4">
            {/* Candidate Fold Line Picker (Tab 1) */}
            {activity.mode === 'axis-fold' && activeLine && (
              <div>
                <div className="text-xs font-semibold text-slate-600 mb-2">
                  Hướng gấp:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activity.candidateLines.map((line) => {
                    const selected = customDiameterAngle === null && line.id === activeLine.id;
                    return (
                      <button
                        key={line.id}
                        type="button"
                        onClick={() => handleSelectCandidateLine(line.id)}
                        className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors text-left ${
                          selected
                            ? 'bg-sky-50 border-sky-500 text-sky-900 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {line.label}
                      </button>
                    );
                  })}
                </div>

                {/* Extra free diameter angle dial for Circle (HĐ2 & HĐ4) */}
                {activity.allowFreeDiameter && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
                    <label
                      htmlFor="circle-diameter-angle"
                      className="text-xs font-semibold text-slate-700 whitespace-nowrap"
                    >
                      Hoặc xoay tự do đường qua tâm O:
                    </label>
                    <input
                      id="circle-diameter-angle"
                      type="range"
                      min={0}
                      max={180}
                      step={5}
                      value={customDiameterAngle ?? activeLine.angleDeg}
                      onChange={(e) => handleCustomDiameterChange(Number(e.target.value))}
                      className="sim-slider flex-1"
                    />
                    <span className="font-mono tabular-nums text-xs font-semibold text-sky-700 w-12 text-right">
                      {Math.round(customDiameterAngle ?? activeLine.angleDeg)}°
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Candidate Center Point Picker (Tab 2) */}
            {activity.mode === 'center-rotate' &&
              activePoint &&
              activity.candidatePoints.length > 1 && (
                <div>
                  <div className="text-xs font-semibold text-slate-600 mb-2">
                    Tâm quay:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activity.candidatePoints.map((pt) => {
                      const selected = pt.id === activePoint.id;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => handleSelectCandidatePoint(pt.id)}
                          className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors text-left ${
                            selected
                              ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {pt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Paper-Cut Step Switcher Buttons */}
            {activity.mode === 'paper-cut' && (
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  {activity.steps.map((st, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSliderChange(idx)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap ${
                        currentPaperStepIdx === idx
                          ? isAxisTab
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'bg-teal-600 text-white border-teal-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Bước {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPaperStepIdx <= 0}
                    onClick={() => handleSliderChange(Math.max(0, Math.floor(progress - 0.01)))}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 whitespace-nowrap"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Bước trước</span>
                  </button>
                  <button
                    type="button"
                    disabled={progress >= maxProgress - 0.01}
                    onClick={() =>
                      handleSliderChange(Math.min(maxProgress, Math.floor(progress) + 1))
                    }
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 text-xs font-semibold text-slate-700 whitespace-nowrap"
                  >
                    <span>Bước tiếp</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Grid-Completion Dedicated Quick Action */}
            {activity.mode === 'grid-complete' && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowCounterpart(true);
                    setHasStarted(true);
                    if (progress >= 179) {
                      setProgress(0);
                    }
                    setIsPlaying(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Hiện phần hình tương ứng (quay 180° quanh O)</span>
                </button>
              </div>
            )}

            {/* Primary Playback Controls Row: Bắt đầu / Tạm dừng / Tiếp tục / Làm lại + Speed */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {!isPlaying && !hasStarted && (
                  <button
                    type="button"
                    onClick={handleStart}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors whitespace-nowrap ${
                      isAxisTab
                        ? 'bg-sky-600 hover:bg-sky-700'
                        : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                  >
                    <Play className="w-4 h-4 shrink-0" />
                    <span>
                      {activity.mode === 'paper-cut' &&
                      (activity.variant.startsWith('h55') || activity.variant.startsWith('b510'))
                        ? 'Mở giấy'
                        : activity.mode === 'axis-fold'
                          ? 'Tự động gập'
                          : activity.mode === 'center-rotate'
                            ? 'Tự động xoay'
                            : 'Bắt đầu'}
                    </span>
                  </button>
                )}

                {isPlaying && (
                  <button
                    type="button"
                    onClick={handlePause}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <Pause className="w-4 h-4 shrink-0" />
                    <span>Tạm dừng</span>
                  </button>
                )}

                {!isPlaying && hasStarted && progress < maxProgress - 0.01 && (
                  <button
                    type="button"
                    onClick={handleResume}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors whitespace-nowrap ${
                      isAxisTab
                        ? 'bg-sky-600 hover:bg-sky-700'
                        : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                  >
                    <Play className="w-4 h-4 shrink-0" />
                    <span>Tiếp tục</span>
                  </button>
                )}

                {!isPlaying && hasStarted && progress >= maxProgress - 0.01 && (
                  <button
                    type="button"
                    onClick={handleStart}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors whitespace-nowrap ${
                      isAxisTab
                        ? 'bg-sky-600 hover:bg-sky-700'
                        : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                  >
                    <Play className="w-4 h-4 shrink-0" />
                    <span>Xem lại</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" />
                  <span>Làm lại</span>
                </button>
                {activity.mode === 'axis-fold' && axisDiscovered && (
                  <button
                    type="button"
                    onClick={handleUnfold}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-sm font-semibold transition-colors whitespace-nowrap"
                  >
                    <FlipHorizontal2 className="w-4 h-4 shrink-0" />
                    <span>Mở hình ra</span>
                  </button>
                )}
              </div>

              {/* Speed Selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium mr-1">Tốc độ:</span>
                {(
                  [
                    { id: 'slow', label: 'Chậm' },
                    { id: 'normal', label: 'Vừa' },
                    { id: 'fast', label: 'Nhanh' },
                  ] as const
                ).map((sp) => (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => setSpeed(sp.id)}
                    className={`px-2.5 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
                      speed === sp.id
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Scrubbing Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <label htmlFor="sim-progress-slider">
                  {activity.mode === 'axis-fold'
                    ? 'Kéo từ từ để gập hình (hoặc kéo trực tiếp trên hình)'
                    : activity.mode === 'center-rotate'
                      ? 'Kéo từ từ để xoay (hoặc kéo trực tiếp trên hình)'
                      : activity.mode === 'grid-complete'
                        ? 'Thanh trượt quay phần hình tương ứng quanh O'
                        : 'Thanh trượt theo dõi từng giai đoạn gấp – cắt – mở giấy'}
                </label>
                <span className="font-mono tabular-nums font-semibold text-slate-800">
                  {activity.mode === 'axis-fold'
                    ? `${Math.round(progress * 100)}%`
                    : activity.mode === 'center-rotate' || activity.mode === 'grid-complete'
                      ? `${Math.round(progress)}° / 180°`
                      : `Bước ${currentPaperStepIdx + 1} / ${activity.steps.length}`}
                </span>
              </div>
              <input
                id="sim-progress-slider"
                type="range"
                min={0}
                max={maxProgress}
                step={activity.mode === 'axis-fold' ? 0.005 : activity.mode === 'paper-cut' ? 0.02 : 1}
                value={progress}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className={`sim-slider w-full ${!isAxisTab ? 'teal-slider' : ''}`}
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
