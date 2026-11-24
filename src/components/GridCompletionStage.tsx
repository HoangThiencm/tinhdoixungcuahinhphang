import React, { useRef } from 'react';
import type { GridCompletionActivity } from '../types/symmetry';

interface GridCompletionStageProps {
  activity: GridCompletionActivity;
  /** Animated counterpart reveal angle from 0° to 180° */
  revealAngle: number;
  showCounterpart: boolean;
  showVertexGuides: boolean;
  onRevealAngleChange: (angle: number) => void;
}

export const GridCompletionStage: React.FC<GridCompletionStageProps> = ({
  activity,
  revealAngle,
  showCounterpart,
  showVertexGuides,
  onRevealAngleChange,
}) => {
  const dragStart = useRef<{ x: number; angle: number } | null>(null);
  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, angle: revealAngle };
  };
  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragStart.current) return;
    const width = Math.max(event.currentTarget.getBoundingClientRect().width, 1);
    onRevealAngleChange(Math.max(0, Math.min(180, dragStart.current.angle + (event.clientX - dragStart.current.x) / width * 180)));
  };
  const handlePointerEnd = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragStart.current = null;
  };
  const { gridCols, gridRows, cellSize, givenPolygon } = activity;
  const halfW = (gridCols / 2) * cellSize;
  const halfH = (gridRows / 2) * cellSize;

  const givenPointsStr = givenPolygon
    .map((p) => `${p.x * cellSize},${p.y * cellSize}`)
    .join(' ');

  const mirroredPointsStr = givenPolygon
    .map((p) => `${-p.x * cellSize},${-p.y * cellSize}`)
    .join(' ');

  const gridLines: React.ReactNode[] = [];
  for (let c = -gridCols / 2; c <= gridCols / 2; c++) {
    const x = c * cellSize;
    gridLines.push(
      <line
        key={`vc-${c}`}
        x1={x}
        y1={-halfH}
        x2={x}
        y2={halfH}
        stroke={c === 0 ? '#94A3B8' : '#CBD5E1'}
        strokeWidth={c === 0 ? 1.5 : 1}
      />
    );
  }
  for (let r = -gridRows / 2; r <= gridRows / 2; r++) {
    const y = r * cellSize;
    gridLines.push(
      <line
        key={`hr-${r}`}
        x1={-halfW}
        y1={y}
        x2={halfW}
        y2={y}
        stroke={r === 0 ? '#94A3B8' : '#CBD5E1'}
        strokeWidth={r === 0 ? 1.5 : 1}
      />
    );
  }

  return (
    <div className="relative w-full">
      <svg
        viewBox="-220 -175 440 350"
        className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
        role="img"
        aria-label={`Vẽ thêm hình có tâm đối xứng trên lưới: ${activity.title}`}
        style={{ touchAction: 'none', cursor: dragStart.current ? 'grabbing' : 'grab' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {/* Crisp textbook graph paper background */}
        <rect
          x={-halfW}
          y={-halfH}
          width={halfW * 2}
          height={halfH * 2}
          fill="#FFFFFF"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        <g>{gridLines}</g>

        {/* Original given polygon */}
        <polygon
          points={givenPointsStr}
          fill={activity.originalFill}
          fillOpacity="0.88"
          stroke={activity.originalStroke}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Animated 180° counterpart polygon (either animating from 0°->180° or snapped to 180°) */}
        {(showCounterpart || revealAngle > 1) && (
          <g transform={`rotate(${revealAngle.toFixed(2)}, 0, 0)`}>
            <polygon
              points={givenPointsStr}
              fill={activity.addedFill}
              fillOpacity={revealAngle >= 179 ? 0.85 : 0.65}
              stroke={activity.addedStroke}
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeDasharray={revealAngle >= 179 ? undefined : '6 4'}
            />
          </g>
        )}

        {/* Dashed preview outline of final 180° target once fully shown */}
        {revealAngle >= 179 && (
          <polygon
            points={mirroredPointsStr}
            fill="none"
            stroke={activity.addedStroke}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        )}

        {/* Optional symmetry guide lines connecting sample vertices P to P' through midpoint O */}
        {showVertexGuides &&
          activity.sampleGuideVertices.map((pt, idx) => {
            const px = pt.x * cellSize;
            const py = pt.y * cellSize;
            const labelChar = String.fromCharCode(65 + idx); // A, B, C
            return (
              <g key={`guide-${idx}`}>
                <line
                  x1={px}
                  y1={py}
                  x2={-px}
                  y2={-py}
                  stroke="#0F766E"
                  strokeWidth="1.8"
                  strokeDasharray="5 4"
                />
                <circle cx={px} cy={py} r="4.5" fill="#0F172A" />
                <text x={px + 7} y={py - 6} fontSize="13" fontWeight="700" fill="#0F172A">
                  {labelChar}
                </text>
                {revealAngle >= 175 && (
                  <>
                    <circle cx={-px} cy={-py} r="4.5" fill="#0F766E" />
                    <text x={-px + 7} y={-py + 15} fontSize="13" fontWeight="700" fill="#0F766E">
                      {labelChar}′
                    </text>
                  </>
                )}
              </g>
            );
          })}

        {/* Fixed Center Point O */}
        <g>
          <circle cx="0" cy="0" r="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2.2" />
          <circle cx="0" cy="0" r="2" fill="#0F172A" />
          <text x="-18" y="18" fontSize="16" fontWeight="800" fill="#0F172A" fontStyle="italic">
            O
          </text>
        </g>
      </svg>

      {/* Two-tone visual legend */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 px-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-sm border inline-block"
              style={{ backgroundColor: activity.originalFill, borderColor: activity.originalStroke }}
            />
            <span>Phần hình đã cho</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-sm border inline-block"
              style={{ backgroundColor: activity.addedFill, borderColor: activity.addedStroke }}
            />
            <span>Phần hình vẽ thêm (quay 180° quanh O)</span>
          </span>
        </div>
        <span className="font-mono tabular-nums text-teal-700 font-semibold">
          Góc quay tạo ảnh: {Math.round(revealAngle)}° / 180°
        </span>
      </div>
    </div>
  );
};
