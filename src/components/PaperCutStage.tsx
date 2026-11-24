import React from 'react';
import type { PaperCutActivity } from '../types/symmetry';

interface PaperCutStageProps {
  activity: PaperCutActivity;
  /** Continuous timeline value from 0 to steps.length - 1 */
  timeline: number;
  showReference: boolean;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp01(t);
}

export const PaperCutStage: React.FC<PaperCutStageProps> = ({
  activity,
  timeline,
  showReference,
}) => {
  const { variant } = activity;

  // Helper to render crisp dashed crease line
  const renderCreaseV = (y1 = -148, y2 = 148, label = 'd') =>
    showReference ? (
      <g>
        <line x1="0" y1={y1} x2="0" y2={y2} stroke="#0284C7" strokeWidth="2.4" strokeDasharray="7 5" />
        <text x="10" y={y1 + 14} fontSize="15" fontWeight="700" fill="#0369A1" fontStyle="italic">
          {label}
        </text>
      </g>
    ) : null;

  const renderCreaseH = (x1 = -160, x2 = 160, label = 'd') =>
    showReference ? (
      <g>
        <line x1={x1} y1="0" x2={x2} y2="0" stroke="#0284C7" strokeWidth="2.4" strokeDasharray="7 5" />
        <text x={x2 - 14} y="-10" fontSize="15" fontWeight="700" fill="#0369A1" fontStyle="italic">
          {label}
        </text>
      </g>
    ) : null;

  const renderPinO = () => (
    <g>
      <circle cx="0" cy="0" r="6.5" fill="#FACC15" stroke="#0F172A" strokeWidth="2.2" />
      <circle cx="0" cy="0" r="2" fill="#0F172A" />
      <text x="11" y="-10" fontSize="16" fontWeight="800" fill="#0F172A" fontStyle="italic">
        O
      </text>
    </g>
  );

  const renderDragHint = () => timeline < 0.02 ? (
    <g pointerEvents="none" opacity="0.82">
      <path d="M -52,126 C -18,145 18,145 52,126" fill="none" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" />
      <polygon points="57,123 45,124 52,134" fill="#0284C7" />
      <text x="-43" y="156" fontSize="14" fontWeight="700" fill="#0369A1">Kéo để mở</text>
    </g>
  ) : null;

  // =========================================================================
  // 1. SINGLE-FOLD CUT-FROM-SHEET ACTIVITIES (4 steps: 0..3)
  //    hd3-h52, cut-letter-A, cut-letter-E, cut-letter-T
  // =========================================================================
  if (
    variant === 'hd3-h52' ||
    variant === 'cut-letter-A' ||
    variant === 'cut-letter-E' ||
    variant === 'cut-letter-T'
  ) {
    const foldT = clamp01(timeline); // 0 -> 1: fold paper in half
    const cutT = clamp01(timeline - 1); // 1 -> 2: draw/cut along pattern
    const unfoldT = clamp01(timeline - 2); // 2 -> 3: unfold to reveal symmetric shape

    const isHoriz = variant === 'cut-letter-E';
    const paperFill = variant === 'hd3-h52' ? '#FBCFE8' : '#BAE6FD';
    const paperStroke = variant === 'hd3-h52' ? '#BE185D' : '#0369A1';
    const shapeFill = variant === 'hd3-h52' ? '#F472B6' : '#38BDF8';
    const shapeStroke = variant === 'hd3-h52' ? '#9D174D' : '#0369A1';

    const halfShapePath: Record<string, string> = {
      'hd3-h52':
        'M 0,-80 C 32,-108 92,-76 80,-20 C 70,28 24,52 54,84 C 32,98 0,94 0,94 Z',
      'cut-letter-A':
        'M 0,-114 L 82,114 L 46,114 L 29,62 L 0,62 L 0,32 L 18,32 L 0,-42 Z',
      'cut-letter-T':
        'M 0,-112 L 90,-112 L 90,-76 L 20,-76 L 20,112 L 0,112 Z',
      'cut-letter-E':
        'M -70,0 L -70,-110 L 72,-110 L 72,-76 L -32,-76 L -32,-17 L 54,-17 L 54,0 Z',
    };

    const cutOutlinePath: Record<string, string> = {
      'hd3-h52':
        'M 0,-80 C 32,-108 92,-76 80,-20 C 70,28 24,52 54,84 C 32,98 0,94 0,94',
      'cut-letter-A':
        'M 0,-114 L 82,114 L 46,114 L 29,62 L 0,62 M 0,32 L 18,32 L 0,-42',
      'cut-letter-T': 'M 90,-76 L 20,-76 L 20,112',
      'cut-letter-E': 'M 72,-76 L -32,-76 L -32,-17 L 54,-17',
    };

    const rectW = variant === 'hd3-h52' ? 105 : 96;
    const rectH = variant === 'hd3-h52' ? 112 : 122;

    // Before unfolding (timeline < 2): show paper folding and cutting
    if (timeline < 2.02) {
      const foldCos = Math.cos(foldT * Math.PI);
      const safeCos = Math.abs(foldCos) < 0.004 ? (foldCos >= 0 ? 0.004 : -0.004) : foldCos;
      const wasteOpacity = lerp(1, 0.22, clamp01((cutT - 0.55) / 0.45));

      return (
        <svg
          viewBox="-220 -175 440 350"
          className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
          role="img"
          aria-label={`Mô phỏng gấp cắt giấy: ${activity.title}`}
        >
          {renderDragHint()}
          {/* Stationary half of paper */}
          {!isHoriz ? (
            <rect
              x="0"
              y={-rectH}
              width={rectW}
              height={rectH * 2}
              fill={paperFill}
              stroke={paperStroke}
              strokeWidth="2.4"
              opacity={wasteOpacity}
            />
          ) : (
            <rect
              x={-rectW}
              y={-rectH}
              width={rectW * 2}
              height={rectH}
              fill={paperFill}
              stroke={paperStroke}
              strokeWidth="2.4"
              opacity={wasteOpacity}
            />
          )}

          {/* Folding half of paper */}
          {foldT < 0.99 && (
            <g transform={isHoriz ? `scale(1, ${safeCos})` : `scale(${safeCos}, 1)`}>
              {!isHoriz ? (
                <rect
                  x={-rectW}
                  y={-rectH}
                  width={rectW}
                  height={rectH * 2}
                  fill={paperFill}
                  stroke={paperStroke}
                  strokeWidth="2.4"
                  opacity={foldCos < 0 ? 0.8 : 1}
                />
              ) : (
                <rect
                  x={-rectW}
                  y="0"
                  width={rectW * 2}
                  height={rectH}
                  fill={paperFill}
                  stroke={paperStroke}
                  strokeWidth="2.4"
                  opacity={foldCos < 0 ? 0.8 : 1}
                />
              )}
            </g>
          )}

          {/* Fold arrow cue at start */}
          {foldT < 0.15 && !isHoriz && (
            <g>
              <path
                d="M -64,-134 C -24,-154 24,-154 64,-134"
                fill="none"
                stroke="#DC2626"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <polygon points="68,-132 57,-138 61,-128" fill="#DC2626" />
            </g>
          )}
          {foldT < 0.15 && isHoriz && (
            <g>
              <path
                d="M 118,54 C 138,20 138,-20 118,-54"
                fill="none"
                stroke="#DC2626"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <polygon points="116,-58 122,-47 112,-51" fill="#DC2626" />
            </g>
          )}

          {/* Cut shape emerging during step 2 -> 3 */}
          {cutT > 0.02 && (
            <g>
              <path
                d={halfShapePath[variant]}
                fill={shapeFill}
                fillOpacity={lerp(0.25, 0.95, cutT)}
                stroke={shapeStroke}
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              <path
                d={cutOutlinePath[variant]}
                fill="none"
                stroke="#DC2626"
                strokeWidth="3"
                strokeDasharray="7 5"
                strokeLinecap="round"
                opacity={lerp(1, 0.85, cutT)}
              />
              {cutT > 0.1 && cutT < 0.98 && (
                <text x={isHoriz ? 102 : 108} y="-12" fontSize="13" fontWeight="600" fill="#DC2626">
                  Đường cắt
                </text>
              )}
            </g>
          )}

          {isHoriz ? renderCreaseH(-140, 140, 'Nếp gấp') : renderCreaseV(-145, 145, 'Nếp gấp')}
        </svg>
      );
    }

    // Unfolding phase (timeline 2 -> 3): fixed cut half + unfolding mirror half!
    const unfoldCos = Math.cos(unfoldT * Math.PI); // 1 -> -1
    const safeUnfold = Math.abs(unfoldCos) < 0.004 ? (unfoldCos >= 0 ? 0.004 : -0.004) : unfoldCos;

    return (
      <svg
        viewBox="-220 -175 440 350"
        className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
        role="img"
        aria-label={`Mở giấy: ${activity.title}`}
      >
        {renderDragHint()}
        {/* Fixed half */}
        <path
          d={halfShapePath[variant]}
          fill={shapeFill}
          stroke={shapeStroke}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Unfolding mirrored half */}
        <g transform={isHoriz ? `scale(1, ${safeUnfold})` : `scale(${safeUnfold}, 1)`}>
          <path
            d={halfShapePath[variant]}
            fill={shapeFill}
            fillOpacity={unfoldCos < 0 ? 0.96 : 0.72}
            stroke={shapeStroke}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </g>

        {isHoriz ? renderCreaseH(-155, 155, 'Trục đối xứng') : renderCreaseV(-148, 148, 'Trục đối xứng')}
      </svg>
    );
  }

  // =========================================================================
  // 2. HÌNH 5.5a, 5.5b, 5.5c — PREDICT & UNFOLD (3 steps: 0..2)
  // =========================================================================
  if (variant === 'h55-a' || variant === 'h55-b' || variant === 'h55-c') {
    const unfoldT = clamp01(timeline / 2); // 0 -> 1 smooth unfold
    const unfoldCos = Math.cos(unfoldT * Math.PI); // 1 (folded on top of fixed) -> -1 (opened across crease)
    const safeCos = Math.abs(unfoldCos) < 0.004 ? (unfoldCos >= 0 ? 0.004 : -0.004) : unfoldCos;
    const isHoriz = variant === 'h55-c';

    const pathMap: Record<string, string> = {
      'h55-a': 'M 0,-108 L -84,-108 L -84,-74 L -20,-74 L -20,108 L 0,108 Z',
      'h55-b': 'M -92,106 L -92,-106 L -54,-106 L 0,16 L 0,68 L -58,-44 L -58,106 Z',
      'h55-c': 'M -66,0 L -66,-106 L 68,-106 L 68,-72 L -30,-72 L -30,-16 L 52,-16 L 52,0 Z',
    };

    return (
      <svg
        viewBox="-220 -175 440 350"
        className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
        role="img"
        aria-label={`Dự đoán khi mở giấy: ${activity.title}`}
      >
        {renderDragHint()}
        {/* Fixed cut half */}
        <path
          d={pathMap[variant]}
          fill="#BAE6FD"
          stroke="#0369A1"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Unfolding half */}
        <g transform={isHoriz ? `scale(1, ${safeCos})` : `scale(${safeCos}, 1)`}>
          <path
            d={pathMap[variant]}
            fill="#7DD3FC"
            fillOpacity={unfoldCos < 0 ? 0.95 : 0.65}
            stroke="#0369A1"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </g>

        {/* Red curved unfold hint arrow (matching textbook Hình 5.5) when still folded */}
        {unfoldT < 0.15 && !isHoriz && (
          <g>
            <path
              d="M -38,126 C -10,144 18,144 46,126"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <polygon points="50,123 39,124 44,132" fill="#DC2626" />
          </g>
        )}
        {unfoldT < 0.15 && isHoriz && (
          <g>
            <path
              d="M -92,-46 C -112,-14 -112,18 -92,48"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <polygon points="-89,52 -98,44 -89,40" fill="#DC2626" />
          </g>
        )}

        {isHoriz ? renderCreaseH(-150, 150, 'Nếp gấp') : renderCreaseV(-145, 145, 'Nếp gấp')}
      </svg>
    );
  }

  // =========================================================================
  // 3. DOUBLE-FOLD QUARTER PAPER CUTS WITH POST-UNFOLD 180° ROTATION
  //    h58-flower4, h59-clover4, b58-hexagons (6 steps: 0..5)
  // =========================================================================
  if (variant === 'h58-flower4' || variant === 'h59-clover4' || variant === 'b58-hexagons') {
    const fold1T = clamp01(timeline); // 0 -> 1: fold vertical to left half
    const fold2T = clamp01(timeline - 1); // 1 -> 2: fold horizontal to top-left quarter
    const cutT = clamp01(timeline - 2); // 2 -> 3: cut quarter pattern
    const unfoldT = clamp01(timeline - 3); // 3 -> 4: unfold both folds into complete shape
    const rotateT = clamp01(timeline - 4); // 4 -> 5: rotate 180° around O!

    const palette =
      variant === 'h58-flower4'
        ? { paper: '#FEF08A', fill: '#FACC15', stroke: '#A16207' }
        : variant === 'h59-clover4'
          ? { paper: '#BAE6FD', fill: '#38BDF8', stroke: '#0369A1' }
          : { paper: '#DBEAFE', fill: '#93C5FD', stroke: '#1D4ED8' };

    const quarterPath =
      variant === 'h58-flower4'
        ? 'M 0,0 L 0,-52 C -4,-96 -50,-112 -82,-82 C -112,-50 -96,-4 -52,0 Z'
        : variant === 'h59-clover4'
          ? 'M 0,0 L 0,-18 C -10,-62 -28,-108 -60,-100 C -78,-96 -80,-76 -66,-66 C -76,-80 -96,-78 -100,-60 C -108,-28 -62,-10 -18,0 Z'
          : 'M 0,-26 L 0,-84 L -50,-112 L -100,-84 L -100,-26 L -50,0 Z';

    const renderQuarterInAll4 = (outlineOnly = false) => {
      const style = outlineOnly
        ? {
            fill: 'rgba(37, 99, 235, 0.05)',
            stroke: '#2563EB',
            strokeWidth: 2.4,
            strokeDasharray: '6 4',
          }
        : {
            fill: palette.fill,
            stroke: palette.stroke,
            strokeWidth: 2.5,
            strokeLinejoin: 'round' as const,
          };
      return (
        <g>
          <path d={quarterPath} {...style} />
          <path d={quarterPath} transform="scale(-1, 1)" {...style} />
          <path d={quarterPath} transform="scale(1, -1)" {...style} />
          <path d={quarterPath} transform="scale(-1, -1)" {...style} />
        </g>
      );
    };

    // Phase A: Folding & cutting (timeline < 3.02)
    if (timeline < 3.02) {
      const c1 = Math.cos(fold1T * Math.PI);
      const sc1 = Math.abs(c1) < 0.004 ? (c1 >= 0 ? 0.004 : -0.004) : c1;
      const c2 = Math.cos(fold2T * Math.PI);
      const sc2 = Math.abs(c2) < 0.004 ? (c2 >= 0 ? 0.004 : -0.004) : c2;
      const wasteOpacity = lerp(1, 0.2, clamp01((cutT - 0.55) / 0.45));

      return (
        <svg
          viewBox="-220 -175 440 350"
          className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
          role="img"
          aria-label={`Gấp và cắt giấy: ${activity.title}`}
        >
          {renderDragHint()}
          {/* Faint footprint of original square once folded */}
          {fold1T > 0.2 && (
            <rect
              x="-110"
              y="-110"
              width="220"
              height="220"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.6"
              strokeDasharray="6 5"
            />
          )}

          {/* Top-left stationary quarter */}
          <rect
            x="-110"
            y="-110"
            width="110"
            height="110"
            fill={palette.paper}
            stroke={palette.stroke}
            strokeWidth="2.2"
            opacity={wasteOpacity}
          />

          {/* Bottom-left quarter (folds UP during fold2T) */}
          {fold2T < 0.99 && (
            <g transform={`scale(1, ${sc2})`}>
              <rect
                x="-110"
                y="0"
                width="110"
                height="110"
                fill={palette.paper}
                stroke={palette.stroke}
                strokeWidth="2.2"
                opacity={c2 < 0 ? 0.8 : 1}
              />
            </g>
          )}

          {/* Right half (folds LEFT during fold1T) */}
          {fold1T < 0.99 && (
            <g transform={`scale(${sc1}, 1)`}>
              <rect
                x="0"
                y="-110"
                width="110"
                height="220"
                fill={palette.paper}
                stroke={palette.stroke}
                strokeWidth="2.2"
                opacity={c1 < 0 ? 0.8 : 1}
              />
            </g>
          )}

          {/* Cut pattern on top-left quarter */}
          {cutT > 0.02 && (
            <g>
              <path
                d={quarterPath}
                fill={palette.fill}
                fillOpacity={lerp(0.25, 0.95, cutT)}
                stroke={palette.stroke}
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              <path
                d={quarterPath}
                fill="none"
                stroke="#DC2626"
                strokeWidth="2.8"
                strokeDasharray="6 4"
              />
            </g>
          )}

          {renderCreaseV(-142, 142, 'd₁')}
          {renderCreaseH(-142, 142, 'd₂')}
          {cutT > 0.4 && renderPinO()}
        </svg>
      );
    }

    // Phase B: Unfolding (timeline 3 -> 4)
    if (timeline < 4.02) {
      const u1 = clamp01(unfoldT * 2); // first half of step: unfold right
      const u2 = clamp01((unfoldT - 0.5) * 2); // second half of step: unfold down
      const cu1 = Math.cos(u1 * Math.PI);
      const scu1 = Math.abs(cu1) < 0.004 ? (cu1 >= 0 ? 0.004 : -0.004) : cu1;
      const cu2 = Math.cos(u2 * Math.PI);
      const scu2 = Math.abs(cu2) < 0.004 ? (cu2 >= 0 ? 0.004 : -0.004) : cu2;

      return (
        <svg
          viewBox="-220 -175 440 350"
          className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
          role="img"
          aria-label={`Mở hình: ${activity.title}`}
        >
          {renderDragHint()}
          {/* Top-left fixed quarter */}
          <path d={quarterPath} fill={palette.fill} stroke={palette.stroke} strokeWidth="2.5" strokeLinejoin="round" />
          {/* Top-right unfolding quarter */}
          <g transform={`scale(${scu1}, 1)`}>
            <path d={quarterPath} fill={palette.fill} stroke={palette.stroke} strokeWidth="2.5" strokeLinejoin="round" />
          </g>
          {/* Bottom unfolding half */}
          {u2 > 0.01 && (
            <g transform={`scale(1, ${scu2})`}>
              <path d={quarterPath} fill={palette.fill} stroke={palette.stroke} strokeWidth="2.5" strokeLinejoin="round" />
              <path
                d={quarterPath}
                transform="scale(-1, 1)"
                fill={palette.fill}
                stroke={palette.stroke}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </g>
          )}

          {renderCreaseV(-145, 145, 'd₁')}
          {renderCreaseH(-145, 145, 'd₂')}
          {renderPinO()}
        </svg>
      );
    }

    // Phase C: Post-unfold 180° rotation verification around O (timeline 4 -> 5)
    const rotDeg = rotateT * 180;
    return (
      <div className="relative w-full">
        <svg
          viewBox="-220 -175 440 350"
          className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
          role="img"
          aria-label={`Quay 180 độ kiểm tra tâm đối xứng: ${activity.title}`}
        >
          {renderDragHint()}
          {renderCreaseV(-145, 145, '')}
          {renderCreaseH(-145, 145, '')}

          <g transform={`rotate(${rotDeg.toFixed(2)}, 0, 0)`} opacity={rotDeg > 2 ? 0.84 : 1}>
            {renderQuarterInAll4(false)}
          </g>

          {/* Fixed original dashed outline */}
          <g pointerEvents="none">{renderQuarterInAll4(true)}</g>

          {renderPinO()}
        </svg>
        <div className="mt-2 flex items-center justify-between text-xs text-slate-600 px-1">
          <span>Quay nửa vòng quanh giao điểm O của hai nếp gấp</span>
          <span className="font-mono tabular-nums font-semibold text-teal-700">
            Góc quay: {Math.round(rotDeg)}° / 180°
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. BÀI TẬP 5.10a & 5.10b — PREDICT LETTER FROM QUARTER-FOLDED PAPER (3 steps: 0..2)
  // =========================================================================
  const u1 = clamp01(timeline); // 0 -> 1: unfold right across x = 0
  const u2 = clamp01(timeline - 1); // 1 -> 2: unfold down across y = 0
  const cu1 = Math.cos(u1 * Math.PI);
  const scu1 = Math.abs(cu1) < 0.004 ? (cu1 >= 0 ? 0.004 : -0.004) : cu1;
  const cu2 = Math.cos(u2 * Math.PI);
  const scu2 = Math.abs(cu2) < 0.004 ? (cu2 >= 0 ? 0.004 : -0.004) : cu2;

  const quarterLetterPath =
    variant === 'b510-a'
      ? // Upper-left quarter of bold red letter H (with subtle outer serif like textbook 5.10a)
        'M -74,-110 L -24,-110 L -24,-18 L 0,-18 L 0,0 L -64,0 L -64,-84 L -74,-84 Z'
      : // Upper-left quarter of bold red letter O (matching textbook 5.10b)
        'M -78,0 A 78,108 0 0,1 0,-108 L 0,-72 A 42,72 0 0,0 -42,0 Z';

  return (
    <svg
      viewBox="-220 -175 440 350"
      className="w-full h-auto max-h-[430px] select-none rounded-xl bg-white border border-slate-200"
      role="img"
      aria-label={`Mở mảnh giấy gấp tư: ${activity.title}`}
    >
      {renderDragHint()}
      {/* Fixed top-left quarter */}
      <path d={quarterLetterPath} fill="#EF4444" stroke="#991B1B" strokeWidth="2.4" strokeLinejoin="round" />

      {/* Right-unfolding quarter */}
      {u1 > 0.01 && (
        <g transform={`scale(${scu1}, 1)`}>
          <path d={quarterLetterPath} fill="#EF4444" stroke="#991B1B" strokeWidth="2.4" strokeLinejoin="round" />
        </g>
      )}

      {/* Down-unfolding bottom half */}
      {u2 > 0.01 && (
        <g transform={`scale(1, ${scu2})`}>
          <path d={quarterLetterPath} fill="#EF4444" stroke="#991B1B" strokeWidth="2.4" strokeLinejoin="round" />
          <path
            d={quarterLetterPath}
            transform="scale(-1, 1)"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Unfold hint arrows matching Bài 5.10 in textbook when folded */}
      {timeline < 0.15 && (
        <g>
          {/* Left curved arrow unfolding downward */}
          <path
            d="M -94,-90 C -118,-48 -118,-10 -94,20"
            fill="none"
            stroke="#0F172A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <polygon points="-90,24 -100,17 -91,12" fill="#0F172A" />
          {/* Bottom curved arrow unfolding rightward */}
          <path
            d="M -78,20 C -44,44 -8,44 24,20"
            fill="none"
            stroke="#0F172A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <polygon points="28,17 17,19 23,27" fill="#0F172A" />
        </g>
      )}

      {renderCreaseV(-145, 145, 'Nếp gấp dọc')}
      {renderCreaseH(-155, 155, 'Nếp gấp ngang')}
      {timeline > 1.85 && renderPinO()}
    </svg>
  );
};
