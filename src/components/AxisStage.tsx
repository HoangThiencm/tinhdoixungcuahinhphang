import React, { useId, useRef } from 'react';
import type { AxisFoldActivity, CandidateLine } from '../types/symmetry';

interface AxisStageProps {
  activity: AxisFoldActivity;
  selectedLine: CandidateLine;
  /** Fold progress from 0 (flat) to 1 (fully folded 180°) */
  progress: number;
  showAllAxes: boolean;
  axisDiscovered: boolean;
  onProgressChange: (progress: number) => void;
  onAxisDiscovered: () => void;
  onSelectLine?: (lineId: string) => void;
  /** Optional custom angle in degrees when using free diameter mode on Circle */
  customDiameterAngle: number | null;
}

export const AxisStage: React.FC<AxisStageProps> = ({
  activity,
  selectedLine,
  progress,
  showAllAxes,
  axisDiscovered,
  onProgressChange,
  onAxisDiscovered,
  onSelectLine,
  customDiameterAngle,
}) => {
  const uid = useId().replace(/:/g, '');
  const dragStart = useRef<{ x: number; y: number; progress: number } | null>(null);
  const directionLocked = useRef(false);
  const activePx = customDiameterAngle !== null ? 0 : selectedLine.px;
  const activePy = customDiameterAngle !== null ? 0 : selectedLine.py;
  const activeAngle = customDiameterAngle !== null ? customDiameterAngle : selectedLine.angleDeg;
  const activeTag = customDiameterAngle !== null ? 'd' : selectedLine.lineTag || 'd';

  // Exact orthographic 3D projection of a 180° fold across line L(px, py, angleDeg)
  const foldAngleRad = progress * Math.PI;
  const rawCos = Math.cos(foldAngleRad);
  // Avoid exact 0 singular matrix at 90°
  const cosVal = Math.abs(rawCos) < 0.002 ? (rawCos >= 0 ? 0.002 : -0.002) : rawCos;
  const foldLift = Math.sin(foldAngleRad); // peaks at 1 when halfway (90°)
  const isFoldComplete = progress >= 0.99;
  const isTrueAxis = customDiameterAngle !== null || selectedLine.isSymmetryAxis;
  const showDiscoveredAxis = axisDiscovered || (isFoldComplete && isTrueAxis);

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY, progress };
    directionLocked.current = progress > 0.02;
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragStart.current) return;
    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;
    if (!directionLocked.current && progress < 0.02 && Math.hypot(dx, dy) > 10 && activity.candidateLines.length > 1 && !customDiameterAngle) {
      const nearest = activity.candidateLines
        .filter((line) => line.isSymmetryAxis)
        .map((line) => {
          const lineRad = (line.angleDeg * Math.PI) / 180;
          return { line, score: dx * Math.sin(lineRad) - dy * Math.cos(lineRad) };
        })
        .sort((a, b) => b.score - a.score)[0]?.line;
      if (nearest && nearest.id !== selectedLine.id) onSelectLine?.(nearest.id);
      directionLocked.current = true;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const scale = Math.max(Math.min(rect.width, rect.height) * 0.55, 1);
    const foldRad = (activeAngle * Math.PI) / 180;
    // Moving half is y_local >= 0. This is the screen direction it travels while folding.
    const ux = Math.sin(foldRad);
    const uy = -Math.cos(foldRad);
    const projection = (event.clientX - dragStart.current.x) * ux + (event.clientY - dragStart.current.y) * uy;
    const next = Math.max(0, Math.min(1, dragStart.current.progress + projection / scale));
    onProgressChange(next);
    if (next >= 0.99 && isTrueAxis) onAxisDiscovered();
  };

  const handlePointerEnd = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
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
              transform={`translate(${activePx}, ${activePy}) rotate(${activeAngle})`}
            />
          </clipPath>

          {/* Moving half-plane: side y >= 0 in local line frame */}
          <clipPath id={`clip-moving-${uid}`}>
            <rect
              x="-600"
              y="0"
              width="1200"
              height="600"
              transform={`translate(${activePx}, ${activePy}) rotate(${activeAngle})`}
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
          {!activity.hasSymmetry && isFoldComplete && (
            <rect
              x="-218"
              y="-173"
              width="436"
              height="346"
              fill="none"
              stroke="#DC2626"
              strokeWidth="3"
              strokeDasharray="10 6"
              pointerEvents="none"
            />
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
        {showDiscoveredAxis && activity.renderReferenceOverlay && activity.renderReferenceOverlay()}

        {/* All true symmetry axes overlay (when teacher/student enables "Hiện tất cả trục đối xứng") */}
        {showDiscoveredAxis && showAllAxes &&
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

        {/* The tested crease stays visible, but only true axes receive the blue axis treatment. */}
        {(progress > 0.02 || showDiscoveredAxis) && (
          <g>
            <line
              x1={lx1}
              y1={ly1}
              x2={lx2}
              y2={ly2}
              stroke={isTrueAxis && showDiscoveredAxis ? '#0284C7' : '#F97316'}
              strokeWidth={isTrueAxis && showDiscoveredAxis ? '2.8' : '2'}
              strokeDasharray="9 5"
              opacity={isTrueAxis && showDiscoveredAxis ? 1 : 0.75}
            />
            {/* Small fold indicator arrow near the line when flat */}
            {progress < 0.05 && (
              <g transform={`translate(${activePx}, ${activePy}) rotate(${activeAngle})`}>
                <path
                  d="M 110,22 C 122,12 122,-12 110,-22"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <polygon points="106,-24 115,-22 111,-14" fill="#0284C7" />
              </g>
            )}
            <text
              x={Math.max(-200, Math.min(198, labelX))}
              y={Math.max(-155, Math.min(162, labelY))}
              fontSize="16"
              fontWeight="700"
              fill={isTrueAxis && showDiscoveredAxis ? '#0369A1' : '#C2410C'}
              fontStyle="italic"
            >
              {activeTag}
            </text>
          </g>
        )}
      </svg>

      {/* Clean unboxed visual legend beneath the canvas */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 px-1">
        <div className="flex flex-wrap items-center gap-4">
          {showDiscoveredAxis && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-sky-800">
              <span className="w-5 border-t-2 border-dashed border-sky-600 inline-block" />
              <span>Đây là TRỤC ĐỐI XỨNG ({activeTag})</span>
            </span>
          )}
          {progress > 0.02 && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-300 border border-slate-400 inline-block opacity-60" />
              <span>Vị trí ban đầu của nửa được gấp</span>
            </span>
          )}
          {isFoldComplete && (
            <span className={`inline-flex items-center gap-1.5 font-semibold ${isTrueAxis ? 'text-sky-800' : 'text-red-700'}`}>
              <span>{isTrueAxis ? 'Hai nửa chồng khít – d là trục đối xứng' : 'Hai nửa không chồng khít – Hình không có trục đối xứng'}</span>
            </span>
          )}
        </div>
        <span className="font-mono tabular-nums text-slate-500">
          Góc gấp: {Math.round(progress * 180)}°
        </span>
      </div>
    </div>
  );
};
