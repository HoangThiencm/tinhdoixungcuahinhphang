import React, { useId, useRef } from 'react';
import type { AxisFoldActivity, CandidateLine } from '../types/symmetry';

interface AxisStageProps {
  activity: AxisFoldActivity;
  selectedLine: CandidateLine;
  /** Fold progress from 0 (flat) to 1 (fully folded 180°) */
  progress: number;
  showAllAxes: boolean;
  /** Lines the learner has verified; they remain visible after unfolding. */
  discoveredLineIds: string[];
  onProgressChange: (progress: number) => void;
  onAxisDiscovered: (lineId: string) => void;
  onSelectLine?: (lineId: string) => void;
  /** Optional custom angle in degrees when using free diameter mode on Circle */
  customDiameterAngle: number | null;
}

export const AxisStage: React.FC<AxisStageProps> = ({
  activity,
  selectedLine,
  progress,
  showAllAxes,
  discoveredLineIds,
  onProgressChange,
  onAxisDiscovered,
  onSelectLine,
  customDiameterAngle,
}) => {
  const uid = useId().replace(/:/g, '');
  const dragStart = useRef<{ x: number; y: number; progress: number } | null>(null);
  const directionLocked = useRef(false);
  const lockedLine = useRef<CandidateLine | null>(null);
  const foldSide = useRef<1 | -1>(1);
  const latestProgress = useRef(progress);
  latestProgress.current = progress;
  const locked = lockedLine.current;
  const activePx = customDiameterAngle !== null ? 0 : (locked?.px ?? selectedLine.px);
  const activePy = customDiameterAngle !== null ? 0 : (locked?.py ?? selectedLine.py);
  const activeAngle = customDiameterAngle !== null ? customDiameterAngle : (locked?.angleDeg ?? selectedLine.angleDeg);
  const activeTag = customDiameterAngle !== null ? 'd' : (locked?.lineTag ?? selectedLine.lineTag) || 'd';

  // Exact orthographic 3D projection of a 180° fold across line L(px, py, angleDeg)
  const foldAngleRad = progress * Math.PI;
  const rawCos = Math.cos(foldAngleRad);
  // Avoid exact 0 singular matrix at 90°
  const cosVal = Math.abs(rawCos) < 0.002 ? (rawCos >= 0 ? 0.002 : -0.002) : rawCos;
  const foldLift = Math.sin(foldAngleRad); // peaks at 1 when halfway (90°)
  const isFoldComplete = progress >= 0.99;
  const isTrueAxis = customDiameterAngle !== null || (locked?.isSymmetryAxis ?? selectedLine.isSymmetryAxis);
  // A discovered axis remains visible only when the sheet is fully folded, or
  // when the learner has opened a previously verified sheet completely flat.
  const currentLineId = customDiameterAngle !== null ? `diameter-${customDiameterAngle}` : (locked?.id ?? selectedLine.id);
  const isCurrentLineDiscovered = discoveredLineIds.includes(currentLineId);
  const shouldShowAxisNow = isTrueAxis && (isFoldComplete || (isCurrentLineDiscovered && progress <= 0.02));

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY, progress };
    directionLocked.current = progress > 0.02;
    lockedLine.current = null;
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragStart.current) return;
    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    if (!directionLocked.current && dragStart.current.progress < 0.03) {
      if (Math.hypot(dx, dy) <= 8) return;
      let nearest = selectedLine;
      if (activity.candidateLines.length > 1 && !customDiameterAngle) {
        nearest = activity.candidateLines
          .map((line) => {
            const lineRad = (line.angleDeg * Math.PI) / 180;
            return { line, score: Math.abs(dx * Math.sin(lineRad) - dy * Math.cos(lineRad)) };
          })
          .sort((a, b) => b.score - a.score)[0]?.line ?? selectedLine;
        if (nearest.id !== selectedLine.id) onSelectLine?.(nearest.id);
      }
      lockedLine.current = nearest;
      const nearestRad = ((customDiameterAngle ?? nearest.angleDeg) * Math.PI) / 180;
      const rawProjection = dx * Math.sin(nearestRad) - dy * Math.cos(nearestRad);
      foldSide.current = rawProjection >= 0 ? 1 : -1;
      directionLocked.current = true;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const movingLine = lockedLine.current ?? selectedLine;
    const scale = Math.max(Math.min(rect.width, rect.height) * 0.34, 1);
    const foldRad = ((customDiameterAngle ?? movingLine.angleDeg) * Math.PI) / 180;
    // Moving half is y_local >= 0. This is the screen direction it travels while folding.
    const ux = Math.sin(foldRad);
    const uy = -Math.cos(foldRad);
    const projection = (event.clientX - dragStart.current.x) * ux + (event.clientY - dragStart.current.y) * uy;
    const signedProjection = projection * foldSide.current;
    const next = Math.max(0, Math.min(1, dragStart.current.progress + signedProjection / scale));
    latestProgress.current = next;
    onProgressChange(next);
    if (next >= 0.99 && (customDiameterAngle !== null || movingLine.isSymmetryAxis)) {
      onAxisDiscovered(customDiameterAngle !== null ? `diameter-${customDiameterAngle}` : movingLine.id);
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const finalProgress = latestProgress.current;
    const finalLine = lockedLine.current ?? selectedLine;
    const finalLineId = customDiameterAngle !== null ? `diameter-${customDiameterAngle}` : finalLine.id;
    const finalIsTrueAxis = customDiameterAngle !== null || finalLine.isSymmetryAxis;
    if (finalProgress >= 0.78) {
      onProgressChange(1);
      if (finalIsTrueAxis) onAxisDiscovered(finalLineId);
    } else if (finalProgress <= 0.08) {
      onProgressChange(0);
    }
    dragStart.current = null;
  };

  // Line endpoints extending across viewBox
  const rad = (activeAngle * Math.PI) / 180;
  const L = 240;
  const lx1 = activePx - Math.cos(rad) * L;
  const ly1 = activePy - Math.sin(rad) * L;
  const lx2 = activePx + Math.cos(rad) * L;
  const ly2 = activePy + Math.sin(rad) * L;

  // Label position near one end of the fold line
  const labelDist = 148;
  const labelX = activePx + Math.cos(rad) * labelDist + Math.sin(rad) * 14;
  const labelY = activePy + Math.sin(rad) * labelDist - Math.cos(rad) * 14;
  const pillWidth = 142;
  const pillX = Math.max(-212, Math.min(212 - pillWidth, labelX - pillWidth / 2));
  const pillY = Math.max(-166, Math.min(142, labelY - 18));
  const discoveredAxes = progress <= 0.02
    ? activity.candidateLines.filter((line) => line.isSymmetryAxis && discoveredLineIds.includes(line.id) && line.id !== currentLineId)
    : [];

  // Moving half transform: T(p) R(a) Scale(1, cos(phi)) R(-a) T(-p)
  const movingTransform = `translate(${activePx}, ${activePy}) rotate(${activeAngle}) scale(1, ${cosVal.toFixed(5)}) rotate(${-activeAngle}) translate(${-activePx}, ${-activePy})`;

  // Render square grid if activity uses grid (Bài 5.4)
  const gridStep = activity.gridStep || 28;
  const renderGrid = () => {
    if (!activity.showGrid) return null;
    const lines: React.ReactNode[] = [];
    for (let x = -gridStep * 8; x <= gridStep * 8; x += gridStep) {
      lines.push(
        <line
          key={`gx-${x}`}
          x1={x}
          y1={-175}
          x2={x}
          y2={175}
          stroke="#CBD5E1"
          strokeWidth={x === 0 ? 1.2 : 0.8}
        />
      );
    }
    for (let y = -gridStep * 6; y <= gridStep * 6; y += gridStep) {
      lines.push(
        <line
          key={`gy-${y}`}
          x1={-215}
          y1={y}
          x2={215}
          y2={y}
          stroke="#CBD5E1"
          strokeWidth={y === 0 ? 1.2 : 0.8}
        />
      );
    }
    return <g>{lines}</g>;
  };

  return (
    <div className="relative w-full">
      <svg
        viewBox="-220 -175 440 350"
        className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
        role="img"
        aria-label={`Mô phỏng gấp hình: ${activity.title}`}
        style={{ touchAction: 'none', cursor: dragStart.current ? 'grabbing' : 'grab' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <defs>
          {/* Fixed half-plane: side y <= 0 in local line frame */}
          <clipPath id={`clip-fixed-${uid}`}>
            <rect
              x="-600"
              y="-600"
              width="1200"
              height="600"
              transform={`translate(${activePx}, ${activePy}) rotate(${activeAngle + (foldSide.current === -1 ? 180 : 0)})`}
            />
          </clipPath>

          {/* Moving half-plane: side y >= 0 in local line frame */}
          <clipPath id={`clip-moving-${uid}`}>
            <rect
              x="-600"
              y="0"
              width="1200"
              height="600"
              transform={`translate(${activePx}, ${activePy}) rotate(${activeAngle + (foldSide.current === -1 ? 180 : 0)})`}
            />
          </clipPath>

          {/* Subtle fold-crease shadow filter for 3D depth perception during fold */}
          <filter id={`fold-tint-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
            <feColorMatrix
              type="matrix"
              values="
                1.05 0    0    0  0.04
                0    0.88 0    0 -0.02
                0    0    0.92 0  0.04
                0    0    0    1  0"
            />
          </filter>

          {/* Subtle drop shadow while page is lifted in mid-air */}
          <filter id={`lift-shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx={0}
              dy={Math.max(1, foldLift * 7)}
              stdDeviation={Math.max(0.5, foldLift * 4)}
              floodColor="#0F172A"
              floodOpacity={foldLift * 0.22}
            />
          </filter>
        </defs>

        {/* Subtle canvas grid */}
        {renderGrid()}

        {progress < 0.02 && (
          <g pointerEvents="none" opacity="0.82">
            <path d="M -54,122 C -18,144 20,144 56,122" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" />
            <polygon points="60,119 48,120 55,130" fill="#0284C7" />
            <text x="-44" y="154" fontSize="14" fontWeight="700" fill="#0369A1">Kéo để gập</text>
          </g>
        )}

        {/* Subtle faint ghost of the moving half at its original flat position (visible once folding starts) */}
        {progress > 0.02 && (
          <g clipPath={`url(#clip-moving-${uid})`} opacity="0.16" style={{ filter: 'grayscale(0.5)' }}>
            {activity.renderShape()}
          </g>
        )}

        {/* FIXED HALF: stays strictly stationary */}
        <g clipPath={`url(#clip-fixed-${uid})`}>{activity.renderShape()}</g>

        {/* MOVING HALF: folds smoothly across the line and reflects mathematically at progress = 1 */}
        <g
          transform={movingTransform}
          filter={progress > 0.02 && progress < 0.98 ? `url(#lift-shadow-${uid})` : undefined}
          style={!isTrueAxis && isFoldComplete ? { filter: 'drop-shadow(0 0 4px #DC2626)' } : undefined}
        >
          <g
            clipPath={`url(#clip-moving-${uid})`}
            opacity={progress > 0.55 ? 0.72 : 1}
            filter={isFoldComplete ? `url(#fold-tint-${uid})` : undefined}
          >
            {activity.renderShape()}
          </g>

          {/* When folded past halfway, render subtle distinct overlay tint on the back of the folded half
              so overlapping vs non-overlapping edges are unmistakably clear */}
          {progress > 0.55 && (
            <g clipPath={`url(#clip-moving-${uid})`} opacity={(progress - 0.55) / 0.45 * 0.32}>
              <g style={{ mixBlendMode: 'multiply' }}>{activity.renderShape()}</g>
            </g>
          )}
        </g>

        {/* Mid-fold 3D crease shading strip for intuitive physical folding feel */}
        {foldLift > 0.08 && (
          <g transform={`translate(${activePx}, ${activePy}) rotate(${activeAngle})`} pointerEvents="none">
            <rect
              x="-240"
              y={cosVal >= 0 ? 0 : -14 * foldLift}
              width="480"
              height={14 * foldLift}
              fill="#0F172A"
              opacity={foldLift * 0.1}
            />
          </g>
        )}

        {/* Reference overlay (e.g., center O, segment labels A, B) */}
        {shouldShowAxisNow && activity.renderReferenceOverlay && activity.renderReferenceOverlay()}

        {/* Keep every independently verified axis visible after the sheet is reopened. */}
        {discoveredAxes.map((axis) => {
          const axisRad = (axis.angleDeg * Math.PI) / 180;
          const x1 = axis.px - Math.cos(axisRad) * L;
          const y1 = axis.py - Math.sin(axisRad) * L;
          const x2 = axis.px + Math.cos(axisRad) * L;
          const y2 = axis.py + Math.sin(axisRad) * L;
          return (
            <g key={`discovered-${axis.id}`} pointerEvents="none">
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFFFFF" strokeWidth="7" opacity="0.95" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E11D48" strokeWidth="3.2" strokeDasharray="9 5" />
            </g>
          );
        })}

        {/* All true symmetry axes overlay (when teacher/student enables "Hiện tất cả trục đối xứng") */}
        {shouldShowAxisNow && showAllAxes &&
          activity.allTrueAxes.map((ax, idx) => {
            const ar = (ax.angleDeg * Math.PI) / 180;
            return (
              <g key={`all-ax-${idx}`}>
                <line
                  x1={ax.px - Math.cos(ar) * 230}
                  y1={ax.py - Math.sin(ar) * 230}
                  x2={ax.px + Math.cos(ar) * 230}
                  y2={ax.py + Math.sin(ar) * 230}
                  stroke="#059669"
                  strokeWidth="2.4"
                  strokeDasharray="7 5"
                  opacity="0.9"
                />
                {ax.label && (
                  <text
                    x={ax.px + Math.cos(ar) * 145 + Math.sin(ar) * 14}
                    y={ax.py + Math.sin(ar) * 145 - Math.cos(ar) * 14}
                    fontSize="13"
                    fontWeight="700"
                    fill="#047857"
                    fontStyle="italic"
                  >
                    {ax.label}
                  </text>
                )}
              </g>
            );
          })}

        {/* True axes are only revealed after a complete fold (or reopened flat). */}
        {(shouldShowAxisNow || (!isTrueAxis && isFoldComplete)) && (
          <g>
            <line
              x1={lx1}
              y1={ly1}
              x2={lx2}
              y2={ly2}
              stroke={shouldShowAxisNow ? '#FFFFFF' : '#F97316'}
              strokeWidth={shouldShowAxisNow ? '7' : '2'}
              opacity={shouldShowAxisNow ? 0.95 : 0.75}
            />
            <line
              x1={lx1}
              y1={ly1}
              x2={lx2}
              y2={ly2}
              stroke={shouldShowAxisNow ? '#E11D48' : '#F97316'}
              strokeWidth={shouldShowAxisNow ? '3.2' : '2'}
              strokeDasharray="9 5"
              opacity="1"
            />
            {shouldShowAxisNow && <rect x={pillX} y={pillY} width={pillWidth} height="26" rx="13" fill="white" stroke="#E11D48" strokeWidth="1.5" />}
            <text
              x={shouldShowAxisNow ? pillX + pillWidth / 2 : Math.max(-200, Math.min(198, labelX))}
              y={shouldShowAxisNow ? pillY + 17 : Math.max(-155, Math.min(162, labelY))}
              textAnchor={shouldShowAxisNow ? 'middle' : undefined}
              fontSize={shouldShowAxisNow ? "13" : "16"}
              fontWeight={shouldShowAxisNow ? "800" : "700"}
              fill={shouldShowAxisNow ? '#BE123C' : '#C2410C'}
            >
              {shouldShowAxisNow ? `Trục đối xứng ${activeTag}` : activeTag}
            </text>
          </g>
        )}
      </svg>

      {/* Clean unboxed visual legend beneath the canvas */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 px-1">
        <div className="flex flex-wrap items-center gap-4">
          {isFoldComplete && (
            <span className={`inline-flex items-center gap-1.5 font-semibold ${isTrueAxis ? 'text-sky-800' : 'text-red-700'}`}>
              <span className="w-5 border-t-2 border-dashed border-sky-600 inline-block" />
              <span>{isTrueAxis
                ? `Hai nửa chồng khít – ${activeTag} là trục đối xứng`
                : activity.hasSymmetry
                  ? 'Hai nửa lệch nhau – Đường này không phải trục đối xứng'
                  : 'Hai nửa lệch nhau – Hình không có trục đối xứng'}</span>
            </span>
          )}
          {progress > 0.02 && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-300 border border-slate-400 inline-block opacity-60" />
              <span>Vị trí ban đầu của nửa được gấp</span>
            </span>
          )}
          {activity.allTrueAxes.length > 1 && discoveredLineIds.length > 0 && (
            <span className="font-semibold text-rose-700">Đã tìm thấy {discoveredLineIds.length} / {activity.allTrueAxes.length} trục đối xứng</span>
          )}
        </div>
        <span className="font-mono tabular-nums text-slate-500">
          Góc gấp: {Math.round(progress * 180)}°
        </span>
      </div>
    </div>
  );
};
