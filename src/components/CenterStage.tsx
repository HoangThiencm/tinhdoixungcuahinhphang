import React, { useRef } from 'react';
import type { CandidatePoint, CenterRotateActivity } from '../types/symmetry';

interface CenterStageProps {
  activity: CenterRotateActivity;
  selectedPoint: CandidatePoint;
  /** Rotation angle in degrees from 0 to 180 */
  angle: number;
  showReference: boolean;
  centerDiscovered: boolean;
  onAngleChange: (angle: number) => void;
  onCenterDiscovered: () => void;
}

export const CenterStage: React.FC<CenterStageProps> = ({
  activity,
  selectedPoint,
  angle,
  showReference,
  centerDiscovered,
  onAngleChange,
  onCenterDiscovered,
}) => {
  const ox = selectedPoint.x;
  const oy = selectedPoint.y;
  const isAt180 = angle >= 179.5;
  const dragStart = useRef<{ x: number; angle: number } | null>(null);

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, angle };
  };
  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragStart.current) return;
    const width = Math.max(event.currentTarget.getBoundingClientRect().width, 1);
    const next = Math.max(0, Math.min(180, dragStart.current.angle + (event.clientX - dragStart.current.x) / width * 180));
    onAngleChange(next);
    if (next >= 179.5 && selectedPoint.isSymmetryCenter) onCenterDiscovered();
  };
  const handlePointerEnd = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragStart.current = null;
  };

  // Render square grid if activity uses grid (Bài 5.6, 5.7)
  const gridStep = activity.gridStep || 24;
  const renderGrid = () => {
    if (!activity.showGrid) return null;
    const lines: React.ReactNode[] = [];
    for (let x = -gridStep * 9; x <= gridStep * 9; x += gridStep) {
      lines.push(
        <line
          key={`gx-${x}`}
          x1={x}
          y1={-175}
          x2={x}
          y2={175}
          stroke="#CBD5E1"
          strokeWidth={x === 0 ? 1.15 : 0.75}
        />
      );
    }
    for (let y = -gridStep * 7; y <= gridStep * 7; y += gridStep) {
      lines.push(
        <line
          key={`gy-${y}`}
          x1={-215}
          y1={y}
          x2={215}
          y2={y}
          stroke="#CBD5E1"
          strokeWidth={y === 0 ? 1.15 : 0.75}
        />
      );
    }
    return <g>{lines}</g>;
  };

  // Sweep arc showing angle of rotation around O (small clean arc radius 32)
  const renderAngleArc = () => {
    if (angle <= 1) return null;
    const r = 34;
    const startRad = -Math.PI / 2;
    const endRad = startRad + (angle * Math.PI) / 180;
    const sx = ox + r * Math.cos(startRad);
    const sy = oy + r * Math.sin(startRad);
    const ex = ox + r * Math.cos(endRad);
    const ey = oy + r * Math.sin(endRad);
    const largeArc = angle > 180 ? 1 : 0;

    return (
      <g pointerEvents="none">
        <path
          d={`M ${sx.toFixed(1)},${sy.toFixed(1)} A ${r},${r} 0 ${largeArc},1 ${ex.toFixed(1)},${ey.toFixed(1)}`}
          fill="none"
          stroke="#0D9488"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <line
          x1={ox}
          y1={oy}
          x2={sx}
          y2={sy}
          stroke="#0D9488"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.7"
        />
        <line
          x1={ox}
          y1={oy}
          x2={ex}
          y2={ey}
          stroke="#0D9488"
          strokeWidth="1.4"
          opacity="0.85"
        />
      </g>
    );
  };

  // Marker A circular trail if activity has markerA (e.g. Circle 5.7a)
  const renderMarkerATrail = () => {
    if (!activity.markerA) return null;
    const dx = activity.markerA.x - ox;
    const dy = activity.markerA.y - oy;
    const r = Math.hypot(dx, dy);
    if (r < 5 || angle <= 1) return null;
    const startAngle = Math.atan2(dy, dx);
    const endAngle = startAngle + (angle * Math.PI) / 180;
    const sx = ox + r * Math.cos(startAngle);
    const sy = oy + r * Math.sin(startAngle);
    const ex = ox + r * Math.cos(endAngle);
    const ey = oy + r * Math.sin(endAngle);
    const largeArc = angle > 180 ? 1 : 0;

    return (
      <path
        d={`M ${sx.toFixed(1)},${sy.toFixed(1)} A ${r.toFixed(1)},${r.toFixed(1)} 0 ${largeArc},1 ${ex.toFixed(1)},${ey.toFixed(1)}`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="1.6"
        strokeDasharray="4 4"
        opacity="0.55"
      />
    );
  };

  return (
    <div className="relative w-full">
      <svg
        viewBox="-220 -175 440 350"
        className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
        role="img"
        aria-label={`Mô phỏng quay 180 độ quanh tâm: ${activity.title}`}
        style={{ touchAction: 'none', cursor: 'ew-resize' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {renderGrid()}

        {angle < 1 && (
          <g pointerEvents="none" opacity="0.82">
            <path d={`M ${ox + 42},${oy - 34} A 54,54 0 0,1 ${ox + 54},${oy + 18}`} fill="none" stroke="#0F766E" strokeWidth="2.4" strokeLinecap="round" />
            <polygon points={`${ox + 57},${oy + 22} ${ox + 47},${oy + 17} ${ox + 50},${oy + 28}`} fill="#0F766E" />
            <text x={ox + 38} y={oy + 78} fontSize="14" fontWeight="700" fill="#0F766E">Kéo để xoay</text>
          </g>
        )}

        {/* Optional reference lines (diagonals / midpoint ticks) */}
        {showReference && activity.renderReferenceOverlay && (
          <g opacity="0.85">{activity.renderReferenceOverlay()}</g>
        )}

        {/* ROTATING RIGID SHAPE: rotates strictly around (ox, oy) by `angle` degrees */}
        <g
          transform={`rotate(${angle.toFixed(2)}, ${ox}, ${oy})`}
          opacity={angle > 2 ? 0.84 : 1}
        >
          {activity.renderShape()}

          {/* Optional observation marker A on the shape rim */}
          {activity.markerA && (
            <g>
              <circle
                cx={activity.markerA.x}
                cy={activity.markerA.y}
                r="5.5"
                fill="#0F172A"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={activity.markerA.x - 16}
                y={activity.markerA.y - 8}
                fontSize="15"
                fontWeight="700"
                fill="#0F172A"
                fontStyle="italic"
              >
                A
              </text>
            </g>
          )}
        </g>

        {/* FIXED ORIGINAL OUTLINE (dashed blue) — rendered on top so mismatches & matches are crystal clear! */}
        <g pointerEvents="none">{activity.renderOutline()}</g>

        {/* Marker A motion trail */}
        {renderMarkerATrail()}

        {/* Live angle sweep arc around O */}
        {showReference && renderAngleArc()}

        {/* Điểm O chỉ xuất hiện sau khi hình đã quay trọn nửa vòng. */}
        {centerDiscovered && (
        <g>
          <circle cx={ox} cy={oy} r="7" fill="#FACC15" stroke="#0F172A" strokeWidth="2.4" />
          <circle cx={ox} cy={oy} r="2.2" fill="#0F172A" />
          <text
            x={ox + 12}
            y={oy - 10}
            fontSize="17"
            fontWeight="800"
            fill="#0F172A"
            fontStyle="italic"
          >
            {selectedPoint.pointTag || 'O'}
          </text>
        </g>
        )}
      </svg>

      {/* Clean unboxed visual legend */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 px-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 border-t-2 border-dashed border-blue-600 inline-block" />
            <span>Viền vị trí ban đầu (cố định)</span>
          </span>
          {centerDiscovered && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-teal-800">
              <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-slate-900 inline-block" />
              <span>Điểm cố định {selectedPoint.pointTag || 'O'} là TÂM ĐỐI XỨNG</span>
            </span>
          )}
          {isAt180 && (
            <span className="font-medium text-slate-800">
              {selectedPoint.isSymmetryCenter ? 'Điểm cố định O chính là TÂM ĐỐI XỨNG của hình!' : 'Hình chưa chồng khít: không có tâm đối xứng tại điểm này.'}
            </span>
          )}
        </div>
        <span className="font-mono tabular-nums font-semibold text-teal-700">
          Góc quay: {Math.round(angle)}° / 180°
        </span>
      </div>
    </div>
  );
};
