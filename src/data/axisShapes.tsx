import React from 'react';
import type { ActivityGroup, SymmetryActivity } from '../types/symmetry';

export const AXIS_GROUPS: ActivityGroup[] = [
  {
    id: 'axis-g1',
    tab: 'axis',
    title: 'Nhóm 1: Khám phá hình có trục đối xứng',
    subtitle: 'HĐ1, HĐ2, HĐ3, HĐ4 & Hình 5.3 (Trang 99–100)',
  },
  {
    id: 'axis-g2',
    tab: 'axis',
    title: 'Nhóm 2: Trục đối xứng của một số hình phẳng',
    subtitle: 'HĐ5, HĐ6, Thực hành 1 & Tranh luận 1 (Trang 100)',
  },
  {
    id: 'axis-g3',
    tab: 'axis',
    title: 'Nhóm 3: Luyện tập nhận biết',
    subtitle: 'Luyện tập 1, 2 & Bài tập 5.1 – 5.4 (Trang 99, 102)',
  },
  {
    id: 'axis-g4',
    tab: 'axis',
    title: 'Nhóm 4: Gấp và cắt giấy',
    subtitle: 'Hình 5.4, Thực hành 2 & Hình 5.5 (Trang 101)',
  },
  {
    id: 'axis-g5',
    tab: 'axis',
    title: 'Nhóm 5: Mở rộng',
    subtitle: 'Chiếc lá đối xứng trong học tập',
  },
  /*
  {
    id: 'axis-cham-tower',
    tab: 'axis',
    groupId: 'axis-g5',
    mode: 'axis-fold',
    title: 'Thử thách nhỏ – Tháp Chăm',
    shortTitle: 'Tháp Chăm',
    sourceRef: 'Bài 21 – Thử thách nhỏ, trang 101',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      { id: 'vertical', label: 'Đường dọc qua đỉnh tháp', px: 0, py: 0, angleDeg: 90, isSymmetryAxis: true, lineTag: 'd', explanation: 'Hai nửa của tháp chồng khít.' },
      { id: 'horizontal', label: 'Đường ngang qua thân tháp', px: 0, py: 0, angleDeg: 0, isSymmetryAxis: false, lineTag: 'd₂', explanation: 'Đỉnh và chân tháp không trùng nhau.' },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Tháp Chăm có trục đối xứng nào?',
    observeQuestion: 'Kéo để gấp kiểm tra.',
    overallConclusion: 'Tháp Chăm có một trục đối xứng dọc.',
    renderShape: () => <g fill="#FDE68A" stroke="#92400E" strokeWidth="3" strokeLinejoin="round"><path d="M -82,125 L -72,-24 L 0,-142 L 72,-24 L 82,125 Z" /><path d="M -48,-24 L 0,-88 L 48,-24 Z" fill="#F59E0B" /><rect x="-23" y="48" width="46" height="77" fill="#78350F" /></g>,
  },
  {
    id: 'axis-six-star',
    tab: 'axis',
    groupId: 'axis-g5',
    mode: 'axis-fold',
    title: 'Thử thách nhỏ – Ngôi sao sáu cánh',
    shortTitle: 'Ngôi sao sáu cánh',
    sourceRef: 'Bài 21 – Thử thách nhỏ, trang 101',
    hasSymmetry: true,
    axisCountLabel: '6 trục đối xứng',
    candidateLines: [
      { id: 'vertical', label: 'Đường dọc qua hai đỉnh', px: 0, py: 0, angleDeg: 90, isSymmetryAxis: true, lineTag: 'd₁', explanation: 'Hai nửa ngôi sao chồng khít.' },
      { id: 'horizontal', label: 'Đường ngang qua hai đỉnh', px: 0, py: 0, angleDeg: 0, isSymmetryAxis: true, lineTag: 'd₂', explanation: 'Hai nửa ngôi sao chồng khít.' },
      { id: 'off', label: 'Đường lệch khỏi tâm', px: 24, py: 0, angleDeg: 90, isSymmetryAxis: false, lineTag: 'd₃', explanation: 'Đường không đi qua tâm không phải trục đối xứng.' },
    ],
    allTrueAxes: [0, 30, 60, 90, 120, 150].map((angleDeg) => ({ px: 0, py: 0, angleDeg, label: 'd' })),
    predictQuestion: 'Ngôi sao sáu cánh có bao nhiêu trục đối xứng?',
    observeQuestion: 'Thử các đường đi qua tâm.',
    overallConclusion: 'Ngôi sao sáu cánh có sáu trục đối xứng.',
    renderShape: () => <g fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="3" strokeLinejoin="round"><polygon points="0,-130 112,65 -112,65" /><polygon points="0,130 112,-65 -112,-65" /></g>,
  },
  */
];

// Helper: Regular polygon points
function regularPolygonPoints(sides: number, radius: number, startAngleDeg = -90): string {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = ((startAngleDeg + (360 / sides) * i) * Math.PI) / 180;
    pts.push(`${(Math.cos(a) * radius).toFixed(2)},${(Math.sin(a) * radius).toFixed(2)}`);
  }
  return pts.join(' ');
}

// Helper: 5-point star polygon
function star5Points(outerR: number, innerR: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = ((-90 + i * 36) * Math.PI) / 180;
    pts.push(`${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`);
  }
  return pts.join(' ');
}

// Reusable exact half-butterfly builder (mirrored across x = 0 for 100% mathematical symmetry)
function renderButterflyHalf(variant: 'monarch' | 'morpho') {
  const isMonarch = variant === 'monarch';
  const mainWing = isMonarch ? '#F97316' : '#2563EB';
  const wingInner = isMonarch ? '#FB923C' : '#3B82F6';
  const wingEdge = isMonarch ? '#1E293B' : '#1E3A8A';
  const spotColor = isMonarch ? '#FEF3C7' : '#BFDBFE';

  return (
    <g>
      {/* Upper right wing */}
      <path
        d="M 4,-28 C 28,-88 104,-118 134,-74 C 154,-44 134,8 78,12 C 42,14 14,2 4,-6 Z"
        fill={mainWing}
        stroke={wingEdge}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Upper wing inner highlight */}
      <path
        d="M 14,-22 C 36,-72 94,-92 114,-62 C 126,-42 110,-4 68,0 C 40,2 20,-4 14,-22 Z"
        fill={wingInner}
        opacity="0.7"
      />
      {/* Upper wing veins */}
      <path
        d="M 6,-18 C 44,-44 86,-66 122,-66 M 6,-12 C 48,-24 94,-30 130,-24 M 6,-6 C 42,-2 78,0 106,4"
        fill="none"
        stroke={wingEdge}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Upper wing spots */}
      <circle cx="116" cy="-64" r="5" fill={spotColor} />
      <circle cx="126" cy="-42" r="4.2" fill={spotColor} />
      <circle cx="114" cy="-20" r="3.8" fill={spotColor} />
      <ellipse cx="76" cy="-44" rx="11" ry="7" transform="rotate(-24 76 -44)" fill={spotColor} opacity="0.85" />

      {/* Lower right wing */}
      <path
        d="M 4,0 C 38,8 96,20 102,58 C 106,88 74,116 40,104 C 16,96 8,54 4,24 Z"
        fill={mainWing}
        stroke={wingEdge}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Lower wing inner lobe */}
      <path
        d="M 12,12 C 38,20 78,30 82,58 C 85,78 62,96 38,88 C 22,82 14,50 12,12 Z"
        fill={wingInner}
        opacity="0.65"
      />
      {/* Lower wing veins */}
      <path
        d="M 6,8 C 36,24 66,46 88,72 M 6,16 C 28,44 48,72 58,98"
        fill="none"
        stroke={wingEdge}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="84" cy="64" r="4.5" fill={spotColor} />
      <circle cx="64" cy="88" r="4" fill={spotColor} />

      {/* Right half of body (clipped along x >= 0 naturally by path) */}
      <path
        d="M 0,-52 C 7,-52 9,-44 7,-34 C 10,-20 10,8 8,28 C 7,52 4,76 0,80 Z"
        fill="#1E293B"
      />
      {/* Right antenna */}
      <path
        d="M 3,-50 C 12,-76 26,-92 40,-96"
        fill="none"
        stroke="#1E293B"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="41" cy="-96" r="3.2" fill="#1E293B" />
    </g>
  );
}

// Reusable exact symmetric leaf half (mirrored across x = 0)
function renderLeafHalf() {
  return (
    <g>
      <path
        d="M 0,-116 C 36,-92 78,-42 78,16 C 78,66 44,96 0,104 Z"
        fill="#22C55E"
        stroke="#15803D"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M 0,-116 C 18,-80 42,-36 42,14 C 42,54 22,82 0,104 Z"
        fill="#4ADE80"
        opacity="0.45"
      />
      {/* Stem half */}
      <path d="M 0,102 L 3,102 L 4,132 L 0,132 Z" fill="#15803D" />
      {/* Midrib half */}
      <path d="M 0,-110 L 0,104" stroke="#166534" strokeWidth="2.4" />
      {/* Lateral veins */}
      <path
        d="M 0,-64 Q 24,-60 44,-74 M 0,-28 Q 32,-24 62,-40 M 0,10 Q 34,12 68,-6 M 0,48 Q 30,48 56,34 M 0,80 Q 18,78 34,68"
        fill="none"
        stroke="#166534"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>
  );
}

// Exact Figure 5.3c emblem half (mirrored across x = 0)
function renderEmblem53cHalf() {
  return (
    <g>
      {/* Outer ring right semicircle */}
      <path
        d="M 0,-106 A 106,106 0 0,1 0,106 L 0,88 A 88,88 0 0,0 0,-88 Z"
        fill="#E2E8F0"
        stroke="#1E293B"
        strokeWidth="2.5"
      />
      {/* Inner arch / ring segment right half */}
      <path
        d="M 0,-70 A 70,70 0 0,1 66,22 L 48,16 A 52,52 0 0,0 0,-52 Z"
        fill="#CBD5E1"
        stroke="#1E293B"
        strokeWidth="2.5"
      />
      {/* Central chevron stem right half */}
      <path
        d="M 0,-40 L 42,2 L 42,26 L 14,-2 L 14,88 L 0,88 Z"
        fill="#94A3B8"
        stroke="#1E293B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </g>
  );
}

// Exact clover 5.3c (3-leaf clover, vertical symmetry across x = 0)
function renderClover53c() {
  return (
    <g>
      {/* Vertical stem */}
      <path
        d="M -6,28 L 6,28 L 10,118 L -10,118 Z"
        fill="#4D9E3F"
        stroke="#2E6B24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Top heart-shaped leaf (symmetric across x = 0) */}
      <path
        d="M 0,6 C -20,-18 -46,-46 -38,-78 C -32,-102 -8,-104 0,-86 C 8,-104 32,-102 38,-78 C 46,-46 20,-18 0,6 Z"
        fill="#5BB54A"
        stroke="#2E6B24"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Right leaf */}
      <g transform="rotate(102 0 12)">
        <path
          d="M 0,12 C -18,-10 -44,-36 -36,-68 C -30,-92 -8,-94 0,-76 C 8,-94 30,-92 36,-68 C 44,-36 18,-10 0,12 Z"
          fill="#5BB54A"
          stroke="#2E6B24"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>
      {/* Left leaf (exact mirror of right leaf) */}
      <g transform="scale(-1, 1) rotate(102 0 12)">
        <path
          d="M 0,12 C -18,-10 -44,-36 -36,-68 C -30,-92 -8,-94 0,-76 C 8,-94 30,-92 36,-68 C 44,-36 18,-10 0,12 Z"
          fill="#5BB54A"
          stroke="#2E6B24"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>
      {/* Subtle central join */}
      <circle cx="0" cy="12" r="7" fill="#4D9E3F" />
    </g>
  );
}

export const AXIS_ACTIVITIES: SymmetryActivity[] = [
  {
    id: 'axis-cham-tower', tab: 'axis', groupId: 'axis-g5', mode: 'axis-fold',
    title: 'Thử thách nhỏ – Tháp Chăm', shortTitle: 'Tháp Chăm', sourceRef: 'Bài 21 – Thử thách nhỏ, trang 101',
    hasSymmetry: true, axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      { id: 'vertical', label: 'Đường dọc qua đỉnh tháp', px: 0, py: 0, angleDeg: 90, isSymmetryAxis: true, lineTag: 'd', explanation: 'Hai nửa của tháp chồng khít.' },
      { id: 'horizontal', label: 'Đường ngang qua thân tháp', px: 0, py: 0, angleDeg: 0, isSymmetryAxis: false, lineTag: 'd₂', explanation: 'Đỉnh và chân tháp không trùng nhau.' },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }], predictQuestion: 'Tháp Chăm có trục đối xứng nào?', observeQuestion: 'Kéo để gấp kiểm tra.', overallConclusion: 'Tháp Chăm có một trục đối xứng dọc.',
    renderShape: () => <g fill="#FDE68A" stroke="#92400E" strokeWidth="3" strokeLinejoin="round"><path d="M -82,125 L -72,-24 L 0,-142 L 72,-24 L 82,125 Z" /><path d="M -48,-24 L 0,-88 L 48,-24 Z" fill="#F59E0B" /><rect x="-23" y="48" width="46" height="77" fill="#78350F" /></g>,
  },
  {
    id: 'axis-six-star', tab: 'axis', groupId: 'axis-g5', mode: 'axis-fold',
    title: 'Thử thách nhỏ – Ngôi sao sáu cánh', shortTitle: 'Ngôi sao sáu cánh', sourceRef: 'Bài 21 – Thử thách nhỏ, trang 101',
    hasSymmetry: true, axisCountLabel: '6 trục đối xứng',
    candidateLines: [{ id: 'vertical', label: 'Đường dọc qua hai đỉnh', px: 0, py: 0, angleDeg: 90, isSymmetryAxis: true, lineTag: 'd₁', explanation: 'Hai nửa ngôi sao chồng khít.' }, { id: 'horizontal', label: 'Đường ngang qua hai đỉnh', px: 0, py: 0, angleDeg: 0, isSymmetryAxis: true, lineTag: 'd₂', explanation: 'Hai nửa ngôi sao chồng khít.' }, { id: 'off', label: 'Đường lệch khỏi tâm', px: 24, py: 0, angleDeg: 90, isSymmetryAxis: false, lineTag: 'd₃', explanation: 'Đường không đi qua tâm không phải trục đối xứng.' }],
    allTrueAxes: [0, 30, 60, 90, 120, 150].map((angleDeg) => ({ px: 0, py: 0, angleDeg, label: 'd' })), predictQuestion: 'Ngôi sao sáu cánh có bao nhiêu trục đối xứng?', observeQuestion: 'Thử các đường đi qua tâm.', overallConclusion: 'Ngôi sao sáu cánh có sáu trục đối xứng.',
    renderShape: () => <g fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="3" strokeLinejoin="round"><polygon points="0,-130 112,65 -112,65" /><polygon points="0,130 112,-65 -112,-65" /></g>,
  },
  // =========================================================================
  // NHÓM 1: KHÁM PHÁ HÌNH CÓ TRỤC ĐỐI XỨNG
  // =========================================================================
  {
    id: 'axis-hd1-butterfly',
    tab: 'axis',
    groupId: 'axis-g1',
    mode: 'axis-fold',
    title: 'Con bướm (Hoạt động mở đầu)',
    shortTitle: 'Con bướm (HĐ1)',
    sourceRef: 'Bài 21 – HĐ1, trang 99',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    hideLineInitially: true,
    candidateLines: [
      {
        id: 'vertical-body',
        label: 'Đường thẳng đi giữa thân bướm',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Khi gấp theo đường thẳng đi dọc giữa thân bướm, hai cánh, hai râu và các họa tiết trên cánh chồng khít hoàn toàn lên nhau. Vậy đường thẳng này là trục đối xứng của hình con bướm.',
      },
      {
        id: 'horizontal-mid',
        label: 'Đường thẳng nằm ngang qua thân',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation:
          'Khi gấp theo đường nằm ngang, cánh trên lớn hơn và có râu bướm, còn cánh dưới nhỏ hơn nên hai phần không chồng khít lên nhau. Đường này không phải trục đối xứng.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Theo em, nếu gấp đôi con bướm theo đường đi giữa thân thì hai cánh bướm sẽ như thế nào?',
    predictOptions: [
      { id: 'overlap', label: 'Hai cánh chồng khít lên nhau', isCorrect: true },
      { id: 'mismatch', label: 'Hai cánh lệch nhau, không chồng khít', isCorrect: false },
    ],
    observeQuestion: 'Khi hai cánh bướm gấp lại, em quan sát thấy điều gì?',
    overallConclusion:
      'Hình con bướm có trục đối xứng là đường thẳng d đi dọc chính giữa thân. Khi gấp hình theo đường thẳng d, hai nửa con bướm chồng khít lên nhau.',
    renderShape: () => (
      <g>
        {renderButterflyHalf('monarch')}
        <g transform="scale(-1, 1)">{renderButterflyHalf('monarch')}</g>
      </g>
    ),
  },
  {
    id: 'axis-hd2-circle',
    tab: 'axis',
    groupId: 'axis-g1',
    mode: 'axis-fold',
    title: 'Hình tròn và đường thẳng đi qua tâm',
    shortTitle: 'Hình tròn (HĐ2 & HĐ4)',
    sourceRef: 'Bài 21 – HĐ2, Hình 5.1 & HĐ4, trang 99–100',
    hasSymmetry: true,
    axisCountLabel: 'Vô số trục đối xứng',
    allowFreeDiameter: true,
    candidateLines: [
      {
        id: 'diam-65',
        label: 'Đường thẳng đi qua tâm (nghiêng 65° – H.5.1)',
        px: 0,
        py: 0,
        angleDeg: 65,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Đường thẳng đi qua tâm O chia hình tròn thành hai nửa hình tròn bằng nhau. Khi gấp lại, hai nửa hình tròn chồng khít lên nhau.',
      },
      {
        id: 'diam-90',
        label: 'Đường thẳng thẳng đứng qua tâm O',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Đường thẳng thẳng đứng đi qua tâm O cũng là trục đối xứng của hình tròn: hai nửa chồng khít hoàn toàn.',
      },
      {
        id: 'diam-0',
        label: 'Đường thẳng nằm ngang qua tâm O',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Đường thẳng nằm ngang đi qua tâm O cũng là trục đối xứng của hình tròn.',
      },
      {
        id: 'chord-offcenter',
        label: 'Đường thẳng KHÔNG đi qua tâm O (để so sánh)',
        px: 44,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Đường thẳng này không đi qua tâm O nên chia hình tròn thành hai phần lớn – nhỏ khác nhau. Khi gấp lại, phần nhỏ nằm lọt vào trong, không chồng khít với phần lớn.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 0 },
      { px: 0, py: 0, angleDeg: 30 },
      { px: 0, py: 0, angleDeg: 60 },
      { px: 0, py: 0, angleDeg: 90 },
      { px: 0, py: 0, angleDeg: 120 },
      { px: 0, py: 0, angleDeg: 150 },
    ],
    predictQuestion: 'Đường thẳng đang chọn có làm hai phần hình tròn chồng khít khi gấp lại không?',
    predictOptions: [
      { id: 'yes', label: 'Có, hai phần chồng khít', isCorrect: true },
      { id: 'no', label: 'Không chồng khít', isCorrect: false },
    ],
    observeQuestion: 'Hãy thử xoay đường thẳng đi qua tâm O theo nhiều hướng khác nhau và so sánh với đường không đi qua tâm. Em rút ra nhận xét gì?',
    overallConclusion:
      'Mỗi đường thẳng đi qua tâm O đều là một trục đối xứng của hình tròn. Vì có vô số đường thẳng đi qua tâm O nên hình tròn có vô số trục đối xứng. Đường thẳng không đi qua tâm thì không phải trục đối xứng.',
    renderShape: () => (
      <g>
        <circle cx="0" cy="0" r="108" fill="#84CC16" fillOpacity="0.82" stroke="#365314" strokeWidth="3" />
      </g>
    ),
    renderReferenceOverlay: () => (
      <g>
        <circle cx="0" cy="0" r="4.5" fill="#0F172A" />
        <text x="10" y="-8" fontSize="16" fontWeight="700" fill="#0F172A" fontStyle="italic">
          O
        </text>
      </g>
    ),
  },
  {
    id: 'axis-hd3-papercut',
    tab: 'axis',
    groupId: 'axis-g1',
    mode: 'paper-cut',
    variant: 'hd3-h52',
    title: 'Gấp và cắt giấy theo Hình 5.2',
    shortTitle: 'Gấp & cắt giấy (HĐ3 – H.5.2)',
    sourceRef: 'Bài 21 – HĐ3, Hình 5.2, trang 99',
    foldType: 'single-vertical',
    steps: [
      {
        title: 'Bước 1: Chuẩn bị tờ giấy',
        description: 'Đặt tờ giấy hình chữ nhật màu hồng và xác định đường nếp gấp chính giữa tờ giấy.',
      },
      {
        title: 'Bước 2: Gấp đôi tờ giấy (H.5.2a)',
        description: 'Gấp đôi tờ giấy theo đường thẳng ở giữa để hai nửa tờ giấy chồng khít lên nhau.',
      },
      {
        title: 'Bước 3: Cắt theo đường cong (H.5.2b)',
        description: 'Dùng kéo cắt một đường cong bắt đầu từ nếp gấp và kết thúc trên nếp gấp.',
      },
      {
        title: 'Bước 4: Mở tờ giấy ra',
        description: 'Mở phần giấy vừa cắt ra dọc theo đường nếp gấp để quan sát hình thu được.',
      },
    ],
    predictQuestion: 'Khi mở tờ giấy đã cắt đôi ra, hai nửa hình nằm ở hai bên đường nếp gấp sẽ có đặc điểm gì?',
    predictOptions: [
      { id: 'sym', label: 'Đối xứng nhau qua đường nếp gấp', isCorrect: true },
      { id: 'asym', label: 'Khác hẳn nhau, không đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hình nhận được có đặc điểm gì đối với đường nếp gấp?',
    overallConclusion:
      'Hình nhận được sau khi mở giấy là một hình có trục đối xứng, và chính đường nếp gấp là trục đối xứng của hình đó. Hai nửa ở hai bên nếp gấp đối xứng nhau hoàn toàn.',
  },
  {
    id: 'axis-h53a-butterfly',
    tab: 'axis',
    groupId: 'axis-g1',
    mode: 'axis-fold',
    title: 'Hình 5.3a – Con bướm xanh',
    shortTitle: 'Hình 5.3a: Con bướm',
    sourceRef: 'Bài 21 – Hình 5.3a, trang 99',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'd-vert',
        label: 'Đường thẳng d (thẳng đứng)',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Gấp hình con bướm theo đường thẳng d làm hai phần chồng khít lên nhau. Vậy đường thẳng d là trục đối xứng của hình 5.3a.',
      },
      {
        id: 'd-horiz',
        label: 'Đường thẳng nằm ngang (kiểm chứng sai)',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Gấp theo đường nằm ngang cho thấy phần cánh trên và phần cánh dưới không chồng khít nhau.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Đường thẳng d có phải là trục đối xứng của Hình 5.3a không?',
    predictOptions: [
      { id: 'yes', label: 'Có, d là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp theo đường thẳng đã chọn, hai phần của Hình 5.3a có chồng khít không?',
    overallConclusion:
      'Hình 5.3a là hình có trục đối xứng và đường thẳng thẳng đứng d đi giữa thân con bướm là trục đối xứng của hình.',
    renderShape: () => (
      <g>
        {renderButterflyHalf('morpho')}
        <g transform="scale(-1, 1)">{renderButterflyHalf('morpho')}</g>
      </g>
    ),
  },
  {
    id: 'axis-h53b-circle',
    tab: 'axis',
    groupId: 'axis-g1',
    mode: 'axis-fold',
    title: 'Hình 5.3b – Hình tròn',
    shortTitle: 'Hình 5.3b: Hình tròn',
    sourceRef: 'Bài 21 – Hình 5.3b, trang 99',
    hasSymmetry: true,
    axisCountLabel: 'Vô số trục đối xứng',
    candidateLines: [
      {
        id: 'd-vert',
        label: 'Đường thẳng d đi qua tâm (Hình 5.3b)',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Khi gấp hình tròn theo đường thẳng d đi qua tâm, hai nửa hình tròn chồng khít lên nhau. Đường thẳng d là trục đối xứng của hình.',
      },
      {
        id: 'd-off',
        label: 'Đường thẳng lệch tâm',
        px: -42,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Đường thẳng không đi qua tâm chia hình tròn thành hai phần không đều nhau nên khi gấp không chồng khít.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 90, label: 'd' },
      { px: 0, py: 0, angleDeg: 0 },
      { px: 0, py: 0, angleDeg: 45 },
      { px: 0, py: 0, angleDeg: 135 },
    ],
    predictQuestion: 'Đường thẳng d trong Hình 5.3b có phải là trục đối xứng của hình tròn không?',
    predictOptions: [
      { id: 'yes', label: 'Có, d là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hai nửa hình tròn sau khi gấp theo đường thẳng đang chọn như thế nào?',
    overallConclusion:
      'Hình 5.3b (hình tròn) là hình có trục đối xứng; đường thẳng d đi qua tâm là một trục đối xứng của hình.',
    renderShape: () => (
      <circle cx="0" cy="0" r="106" fill="#4CAF50" stroke="#1B5E20" strokeWidth="3" />
    ),
  },
  {
    id: 'axis-h53c-emblem',
    tab: 'axis',
    groupId: 'axis-g1',
    mode: 'axis-fold',
    title: 'Hình 5.3c – Hình biểu tượng vòng tròn',
    shortTitle: 'Hình 5.3c: Biểu tượng',
    sourceRef: 'Bài 21 – Hình 5.3c, trang 99',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'd-vert',
        label: 'Đường thẳng d (thẳng đứng như H.5.3c)',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Khi gấp theo đường thẳng d ở chính giữa, vòng tròn ngoài, vòng cung bên trong và phần mũi tên ở giữa chồng khít hoàn toàn. Vậy d là trục đối xứng.',
      },
      {
        id: 'd-horiz',
        label: 'Đường thẳng nằm ngang',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Phần phía trên có đầu mũi tên nhọn còn phần phía dưới có chân thẳng kéo xuống mép dưới nên gấp theo đường ngang không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Theo em, đường thẳng d có chia Hình 5.3c thành hai phần chồng khít khi gấp không?',
    predictOptions: [
      { id: 'yes', label: 'Có, chồng khít hoàn toàn', isCorrect: true },
      { id: 'no', label: 'Không chồng khít', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp Hình 5.3c theo đường đã chọn, các đường nét bên trong có trùng nhau hoàn toàn không?',
    overallConclusion:
      'Hình 5.3c là hình có trục đối xứng với 1 trục đối xứng duy nhất là đường thẳng d thẳng đứng đi qua chính giữa biểu tượng.',
    renderShape: () => (
      <g>
        {renderEmblem53cHalf()}
        <g transform="scale(-1, 1)">{renderEmblem53cHalf()}</g>
      </g>
    ),
  },

  // =========================================================================
  // NHÓM 2: TRỤC ĐỐI XỨNG CỦA MỘT SỐ HÌNH PHẲNG
  // =========================================================================
  {
    id: 'axis-g2-rhombus',
    tab: 'axis',
    groupId: 'axis-g2',
    mode: 'axis-fold',
    title: 'Hình thoi (không phải hình vuông)',
    shortTitle: '1. Hình thoi',
    sourceRef: 'Bài 21 – HĐ5, trang 100',
    hasSymmetry: true,
    axisCountLabel: '2 trục đối xứng',
    candidateLines: [
      {
        id: 'diag-h',
        label: 'Đường chéo lớn (nằm ngang)',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation:
          'Gấp hình thoi theo đường chéo lớn, hai tam giác cân phía trên và phía dưới chồng khít hoàn toàn. Đây là trục đối xứng thứ nhất.',
      },
      {
        id: 'diag-v',
        label: 'Đường chéo nhỏ (thẳng đứng)',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation:
          'Gấp hình thoi theo đường chéo nhỏ, hai tam giác cân bên trái và bên phải chồng khít hoàn toàn. Đây là trục đối xứng thứ hai.',
      },
      {
        id: 'mid-edge-1',
        label: 'Đường nối trung điểm hai cạnh đối (kiểm chứng)',
        px: 0,
        py: 0,
        angleDeg: -31,
        isSymmetryAxis: false,
        lineTag: 'd₃',
        explanation:
          'Vì hình thoi này không phải hình vuông (góc nhọn khác góc tù), nên khi gấp theo đường nối trung điểm hai cạnh đối, các đỉnh lệch nhau và không chồng khít.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 0, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 90, label: 'd₂' },
    ],
    predictQuestion: 'Đường thẳng đang chọn có phải là trục đối xứng của hình thoi (không phải hình vuông) không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp hình thoi theo đường đã chọn, hai phần có chồng khít không?',
    overallConclusion:
      'Hình thoi (không phải hình vuông) có đúng 2 trục đối xứng là hai đường chéo của nó.',
    renderShape: () => (
      <polygon
        points="0,-84 140,0 0,84 -140,0"
        fill="#FB7185"
        fillOpacity="0.82"
        stroke="#881337"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-g2-rectangle',
    tab: 'axis',
    groupId: 'axis-g2',
    mode: 'axis-fold',
    title: 'Hình chữ nhật (không phải hình vuông)',
    shortTitle: '2. Hình chữ nhật',
    sourceRef: 'Bài 21 – HĐ6, trang 100',
    hasSymmetry: true,
    axisCountLabel: '2 trục đối xứng',
    candidateLines: [
      {
        id: 'mid-v',
        label: 'Đường thẳng đi qua trung điểm hai cạnh dài',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation:
          'Khi gấp theo đường đi qua trung điểm hai cạnh dài, hai nửa hình chữ nhật chồng khít hoàn toàn. Đây là một trục đối xứng.',
      },
      {
        id: 'mid-h',
        label: 'Đường thẳng đi qua trung điểm hai cạnh ngắn',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation:
          'Khi gấp theo đường đi qua trung điểm hai cạnh ngắn, hai nửa hình chữ nhật chồng khít hoàn toàn. Đây là trục đối xứng thứ hai.',
      },
      {
        id: 'diag-1',
        label: 'Đường chéo hình chữ nhật (kiểm chứng rất hay nhầm!)',
        px: 0,
        py: 0,
        angleDeg: 30.96,
        isSymmetryAxis: false,
        lineTag: 'd₃',
        explanation:
          'Quan sát thật kỹ: dù đường chéo chia hình chữ nhật thành hai tam giác bằng nhau, nhưng khi GẤP theo đường chéo, hai đỉnh vuông góc không trùng nhau nên hai phần KHÔNG chồng khít! Đường chéo không phải trục đối xứng của hình chữ nhật (không vuông).',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 90, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 0, label: 'd₂' },
    ],
    predictQuestion: 'Theo em, đường thẳng đang chọn có phải là trục đối xứng của hình chữ nhật không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hãy thử gấp theo cả đường trung bình và đường chéo. Em thấy điểm khác biệt rõ rệt nào?',
    overallConclusion:
      'Hình chữ nhật (không phải hình vuông) có đúng 2 trục đối xứng là hai đường thẳng đi qua trung điểm của mỗi cặp cạnh đối diện. Hai đường chéo KHÔNG phải là trục đối xứng.',
    renderShape: () => (
      <rect
        x="-120"
        y="-72"
        width="240"
        height="144"
        fill="#FDE047"
        fillOpacity="0.85"
        stroke="#854D0E"
        strokeWidth="3"
      />
    ),
  },
  {
    id: 'axis-g2-square',
    tab: 'axis',
    groupId: 'axis-g2',
    mode: 'axis-fold',
    title: 'Hình vuông',
    shortTitle: '3. Hình vuông',
    sourceRef: 'Bài 21 – Thực hành 1 & Tranh luận 1, trang 100',
    hasSymmetry: true,
    axisCountLabel: '4 trục đối xứng',
    candidateLines: [
      {
        id: 'mid-v',
        label: 'Đường đi qua trung điểm hai cạnh trên – dưới',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation: 'Hai nửa hình vuông chồng khít hoàn toàn. Đây là trục đối xứng thứ nhất.',
      },
      {
        id: 'mid-h',
        label: 'Đường đi qua trung điểm hai cạnh trái – phải',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation: 'Hai nửa hình vuông chồng khít hoàn toàn. Đây là trục đối xứng thứ hai.',
      },
      {
        id: 'diag-1',
        label: 'Đường chéo thứ nhất (45°)',
        px: 0,
        py: 0,
        angleDeg: 45,
        isSymmetryAxis: true,
        lineTag: 'd₃',
        explanation: 'Vì bốn cạnh hình vuông bằng nhau, khi gấp theo đường chéo, hai tam giác vuông cân chồng khít hoàn toàn!',
      },
      {
        id: 'diag-2',
        label: 'Đường chéo thứ hai (135°)',
        px: 0,
        py: 0,
        angleDeg: 135,
        isSymmetryAxis: true,
        lineTag: 'd₄',
        explanation: 'Gấp theo đường chéo thứ hai, hai nửa hình vuông cũng chồng khít hoàn toàn.',
      },
      {
        id: 'tilted-wrong',
        label: 'Đường thẳng qua tâm nghiêng 22° (kiểm chứng Tranh luận 1)',
        px: 0,
        py: 0,
        angleDeg: 22,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Đường thẳng nghiêng góc bất kì qua tâm KHÔNG làm hai nửa hình vuông chồng khít! Vì vậy hình vuông KHÔNG có vô số trục đối xứng như bạn Vuông nghĩ.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 90, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 0, label: 'd₂' },
      { px: 0, py: 0, angleDeg: 45, label: 'd₃' },
      { px: 0, py: 0, angleDeg: 135, label: 'd₄' },
    ],
    predictQuestion: 'Hình vuông có bao nhiêu trục đối xứng? Đường đang chọn có làm hai nửa chồng khít không?',
    predictOptions: [
      { id: 'yes', label: 'Đường này là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Đường này không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi kiểm tra các đường qua tâm (kể cả đường nghiêng 22°), hình vuông có tất cả mấy trục đối xứng?',
    overallConclusion:
      'Hình vuông có đúng 4 trục đối xứng: 2 đường thẳng đi qua trung điểm các cặp cạnh đối diện và 2 đường chéo. (Tranh luận 1: hình vuông có 4 trục đối xứng, không phải 2 và cũng không phải vô số!)',
    renderShape: () => (
      <rect
        x="-92"
        y="-92"
        width="184"
        height="184"
        fill="#93C5FD"
        fillOpacity="0.82"
        stroke="#1E3A8A"
        strokeWidth="3"
      />
    ),
  },
  {
    id: 'axis-g2-equilateral-triangle',
    tab: 'axis',
    groupId: 'axis-g2',
    mode: 'axis-fold',
    title: 'Tam giác đều',
    shortTitle: '4. Tam giác đều',
    sourceRef: 'Bài 21 – Thực hành 1, trang 100',
    hasSymmetry: true,
    axisCountLabel: '3 trục đối xứng',
    candidateLines: [
      {
        id: 'tri-1',
        label: 'Đường qua đỉnh trên và trung điểm đáy',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation: 'Gấp theo đường thẳng đi qua đỉnh trên và trung điểm cạnh đáy, hai nửa tam giác đều chồng khít.',
      },
      {
        id: 'tri-2',
        label: 'Đường qua đỉnh dưới phải và trung điểm cạnh đối',
        px: 0,
        py: 0,
        angleDeg: 30,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation: 'Hai nửa tam giác đều chồng khít hoàn toàn. Đây là trục đối xứng thứ hai.',
      },
      {
        id: 'tri-3',
        label: 'Đường qua đỉnh dưới trái và trung điểm cạnh đối',
        px: 0,
        py: 0,
        angleDeg: 150,
        isSymmetryAxis: true,
        lineTag: 'd₃',
        explanation: 'Hai nửa tam giác đều chồng khít hoàn toàn. Đây là trục đối xứng thứ ba.',
      },
      {
        id: 'tri-wrong',
        label: 'Đường nằm ngang song song đáy (kiểm chứng)',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Phần phía trên là một tam giác nhỏ nhọn còn phần phía dưới là một hình thang cân nên khi gấp không thể chồng khít.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 90, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 30, label: 'd₂' },
      { px: 0, py: 0, angleDeg: 150, label: 'd₃' },
    ],
    predictQuestion: 'Đường thẳng đang chọn có phải là trục đối xứng của tam giác đều không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp theo từng đường dự đoán, em tìm được mấy trục đối xứng của tam giác đều?',
    overallConclusion:
      'Tam giác đều có đúng 3 trục đối xứng: đó là 3 đường thẳng đi qua mỗi đỉnh và trung điểm của cạnh đối diện.',
    renderShape: () => (
      <polygon
        points={regularPolygonPoints(3, 118, -90)}
        fill="#6EE7B7"
        fillOpacity="0.82"
        stroke="#065F46"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-g2-hexagon',
    tab: 'axis',
    groupId: 'axis-g2',
    mode: 'axis-fold',
    title: 'Hình lục giác đều',
    shortTitle: '5. Hình lục giác đều',
    sourceRef: 'Bài 21 – Thực hành 1, trang 100',
    hasSymmetry: true,
    axisCountLabel: '6 trục đối xứng',
    candidateLines: [
      {
        id: 'hex-d1',
        label: 'Đường chéo chính 1 (ngang 0°)',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation: 'Đường chéo chính nối hai đỉnh đối diện chia lục giác đều thành hai hình thang cân chồng khít nhau.',
      },
      {
        id: 'hex-d2',
        label: 'Đường chéo chính 2 (60°)',
        px: 0,
        py: 0,
        angleDeg: 60,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation: 'Đường chéo chính nối hai đỉnh đối diện là trục đối xứng thứ hai.',
      },
      {
        id: 'hex-d3',
        label: 'Đường chéo chính 3 (120°)',
        px: 0,
        py: 0,
        angleDeg: 120,
        isSymmetryAxis: true,
        lineTag: 'd₃',
        explanation: 'Đường chéo chính nối hai đỉnh đối diện là trục đối xứng thứ ba.',
      },
      {
        id: 'hex-m1',
        label: 'Đường qua trung điểm hai cạnh đối 1 (90°)',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₄',
        explanation: 'Đường thẳng đi qua trung điểm hai cạnh đối diện cũng làm hai nửa lục giác đều chồng khít hoàn toàn!',
      },
      {
        id: 'hex-m2',
        label: 'Đường qua trung điểm hai cạnh đối 2 (30°)',
        px: 0,
        py: 0,
        angleDeg: 30,
        isSymmetryAxis: true,
        lineTag: 'd₅',
        explanation: 'Đây là trục đối xứng thứ năm của lục giác đều.',
      },
      {
        id: 'hex-m3',
        label: 'Đường qua trung điểm hai cạnh đối 3 (150°)',
        px: 0,
        py: 0,
        angleDeg: 150,
        isSymmetryAxis: true,
        lineTag: 'd₆',
        explanation: 'Đây là trục đối xứng thứ sáu của lục giác đều.',
      },
      {
        id: 'hex-wrong',
        label: 'Đường qua tâm nghiêng 15° (kiểm chứng)',
        px: 0,
        py: 0,
        angleDeg: 15,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Đường thẳng nghiêng 15° không đi qua hai đỉnh đối diện và cũng không đi qua trung điểm hai cạnh đối diện nên hai phần bị lệch đỉnh khi gấp.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 0, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 60, label: 'd₂' },
      { px: 0, py: 0, angleDeg: 120, label: 'd₃' },
      { px: 0, py: 0, angleDeg: 90, label: 'd₄' },
      { px: 0, py: 0, angleDeg: 30, label: 'd₅' },
      { px: 0, py: 0, angleDeg: 150, label: 'd₆' },
    ],
    predictQuestion: 'Đường thẳng đang chọn có phải là trục đối xứng của hình lục giác đều không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Ngoài 3 đường chéo chính, còn loại đường thẳng nào là trục đối xứng của hình lục giác đều?',
    overallConclusion:
      'Hình lục giác đều có đúng 6 trục đối xứng: 3 đường chéo chính (đi qua các cặp đỉnh đối diện) và 3 đường thẳng đi qua trung điểm các cặp cạnh đối diện.',
    renderShape: () => (
      <polygon
        points={regularPolygonPoints(6, 110, 0)}
        fill="#7DD3FC"
        fillOpacity="0.84"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-g2-trapezoid',
    tab: 'axis',
    groupId: 'axis-g2',
    mode: 'axis-fold',
    title: 'Hình thang cân',
    shortTitle: '6. Hình thang cân',
    sourceRef: 'Bài 21 – Hình thang cân (Bài 5.1, trang 102)',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'trap-v',
        label: 'Đường thẳng đi qua trung điểm hai đáy',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Khi gấp theo đường thẳng đi qua trung điểm của đáy nhỏ và đáy lớn, hai cạnh bên và hai góc kề đáy chồng khít hoàn toàn.',
      },
      {
        id: 'trap-h',
        label: 'Đường thẳng đi qua trung điểm hai cạnh bên (nằm ngang)',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation:
          'Đáy trên ngắn hơn đáy dưới nên khi gấp theo đường nằm ngang, hai phần không chồng khít lên nhau.',
      },
      {
        id: 'trap-diag',
        label: 'Đường chéo hình thang cân',
        px: 0,
        py: 0,
        angleDeg: 32,
        isSymmetryAxis: false,
        lineTag: 'd₃',
        explanation:
          'Hai tam giác ở hai bên đường chéo có kích thước khác nhau nên khi gấp hoàn toàn không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Đường thẳng nào là trục đối xứng của hình thang cân?',
    predictOptions: [
      { id: 'yes', label: 'Đường đang chọn là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Đường đang chọn không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Khi gấp hình thang cân theo đường thẳng đang chọn, hai phần có chồng khít không?',
    overallConclusion:
      'Hình thang cân thông thường (hai đáy không bằng nhau) có đúng 1 trục đối xứng là đường thẳng đi qua trung điểm của hai đáy.',
    renderShape: () => (
      <polygon
        points="-66,-64 66,-64 128,64 -128,64"
        fill="#FEF08A"
        fillOpacity="0.88"
        stroke="#854D0E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-g2-segment',
    tab: 'axis',
    groupId: 'axis-g2',
    mode: 'axis-fold',
    title: 'Đoạn thẳng AB',
    shortTitle: '7. Đoạn thẳng',
    sourceRef: 'Bài 21 – Thực hành 1, trang 100',
    hasSymmetry: true,
    axisCountLabel: '2 trục đối xứng',
    candidateLines: [
      {
        id: 'seg-perp',
        label: 'Đường trung trực (vuông góc tại trung điểm O)',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation:
          'Khi gấp theo đường trung trực của đoạn thẳng AB, nửa đoạn OB chồng khít hoàn toàn lên nửa đoạn OA (điểm B trùng điểm A). Đây là một trục đối xứng của đoạn thẳng.',
      },
      {
        id: 'seg-collinear',
        label: 'Đường thẳng chứa đoạn thẳng AB',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation:
          'Mọi điểm của đoạn thẳng AB đều nằm ngay trên đường thẳng d₂ nên khi lấy đối xứng qua d₂, đoạn thẳng AB vẫn trùng khít với chính nó! Vì vậy đường thẳng chứa đoạn thẳng AB cũng là một trục đối xứng của đoạn thẳng.',
      },
      {
        id: 'seg-slant',
        label: 'Đường thẳng đi qua trung điểm O nhưng xiên góc 45°',
        px: 0,
        py: 0,
        angleDeg: 45,
        isSymmetryAxis: false,
        lineTag: 'd₃',
        explanation:
          'Khi gấp qua đường xiên 45°, nửa đoạn thẳng bên phải bị gập xuống phương thẳng đứng thay vì trùng lên nửa đoạn thẳng bên trái. Đường này không phải trục đối xứng.',
      },
      {
        id: 'seg-off',
        label: 'Đường vuông góc nhưng lệch trung điểm O',
        px: 40,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd₄',
        explanation:
          'Đường thẳng không đi qua trung điểm chia đoạn AB thành hai phần dài – ngắn khác nhau nên khi gấp không chồng khít.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 90, label: 'd₁ (trung trực)' },
      { px: 0, py: 0, angleDeg: 0, label: 'd₂ (chứa AB)' },
    ],
    predictQuestion: 'Đường thẳng đang chọn có phải là trục đối xứng của đoạn thẳng AB không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hãy phân biệt kết quả khi gấp theo đường trung trực, đường chứa đoạn AB và đường xiên qua trung điểm.',
    overallConclusion:
      'Đoạn thẳng AB có 2 trục đối xứng: (1) đường trung trực của đoạn thẳng AB (đi qua trung điểm và vuông góc với AB) và (2) chính đường thẳng chứa đoạn thẳng AB.',
    renderShape: () => (
      <g>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#0284C7" strokeWidth="8" strokeLinecap="round" />
        <circle cx="-120" cy="0" r="6" fill="#0F172A" />
        <circle cx="120" cy="0" r="6" fill="#0F172A" />
      </g>
    ),
    renderReferenceOverlay: () => (
      <g>
        <text x="-132" y="-16" fontSize="17" fontWeight="700" fill="#0F172A">
          A
        </text>
        <text x="120" y="-16" fontSize="17" fontWeight="700" fill="#0F172A">
          B
        </text>
        <circle cx="0" cy="0" r="4" fill="#DC2626" />
        <text x="8" y="22" fontSize="14" fontWeight="600" fill="#DC2626">
          O (trung điểm)
        </text>
      </g>
    ),
  },

  // =========================================================================
  // NHÓM 3: LUYỆN TẬP NHẬN BIẾT (Trang 99 & 102)
  // =========================================================================
  // --- Luyện tập 1: Chữ cái A, B, G, H, E, F ---
  {
    id: 'axis-lt1-A',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 1 – Chữ cái A',
    shortTitle: 'Chữ cái A (LT1)',
    sourceRef: 'Bài 21 – Luyện tập 1, trang 99',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'vert',
        label: 'Đường thẳng đứng ở giữa',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation: 'Hai nửa trái và phải của chữ A chồng khít hoàn toàn. Đường thẳng đứng ở giữa là trục đối xứng.',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang ở giữa',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Đầu trên chữ A nhọn còn phía dưới mở hai chân nên gấp ngang không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Chữ cái A có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp chữ A theo đường đã chọn, hai phần có chồng khít không?',
    overallConclusion: 'Chữ cái A có 1 trục đối xứng là đường thẳng đứng đi qua đỉnh trên và chính giữa thanh ngang.',
    renderShape: () => (
      <path
        d="M 0,-104 L 78,104 L 44,104 L 28,58 L -28,58 L -44,104 L -78,104 Z M 0,-46 L -18,28 L 18,28 Z"
        fill="#0EA5E9"
        fillRule="evenodd"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-lt1-B',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 1 – Chữ cái B',
    shortTitle: 'Chữ cái B (LT1)',
    sourceRef: 'Bài 21 – Luyện tập 1, trang 99',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    educationalNote:
      'Chữ B trong bài học được dựng hình học có hai phần bụng trên và dưới bằng nhau hoàn toàn (khác với một số phông chữ in có bụng dưới rộng hơn).',
    candidateLines: [
      {
        id: 'horiz',
        label: 'Đường nằm ngang ở chính giữa',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Với mẫu chữ B có hai vòng trên và dưới đối xứng bằng nhau, khi gấp theo đường nằm ngang ở chính giữa, hai nửa chồng khít hoàn toàn.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng ở giữa',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Bên trái chữ B là nét thẳng còn bên phải là hai nét cong nên gấp dọc không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 0, label: 'd' }],
    predictQuestion: 'Chữ cái B (có hai vòng trên và dưới bằng nhau) có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp chữ B theo đường nằm ngang, phần trên và phần dưới có chồng khít không?',
    overallConclusion:
      'Chữ cái B (với cấu tạo hai nửa trên – dưới bằng nhau theo hình mẫu sách giáo khoa) có 1 trục đối xứng nằm ngang ở chính giữa.',
    renderShape: () => (
      <path
        d="M -64,-100 L 14,-100 C 52,-100 72,-78 72,-50 C 72,-26 56,-8 36,-2 L 36,2 C 56,8 72,26 72,50 C 72,78 52,100 14,100 L -64,100 Z M -32,-70 L -32,-16 L 10,-16 C 28,-16 40,-27 40,-43 C 40,-59 28,-70 10,-70 Z M -32,16 L -32,70 L 10,70 C 28,70 40,59 40,43 C 40,27 28,16 10,16 Z"
        fill="#0EA5E9"
        fillRule="evenodd"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-lt1-G',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 1 – Chữ cái G',
    shortTitle: 'Chữ cái G (LT1)',
    sourceRef: 'Bài 21 – Luyện tập 1, trang 99',
    hasSymmetry: false,
    axisCountLabel: '0 trục đối xứng',
    candidateLines: [
      {
        id: 'horiz',
        label: 'Đường nằm ngang ở giữa',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd₁',
        explanation:
          'Phần dưới bên phải chữ G có nét gạch ngang hướng vào trong, còn phần trên bên phải để hở nên khi gấp ngang không chồng khít.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng ở giữa',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation:
          'Bên trái chữ G là vòng cong kín, còn bên phải bị khuyết trên và có thanh ngang bên trong nên gấp dọc không chồng khít.',
      },
    ],
    allTrueAxes: [],
    predictQuestion: 'Chữ cái G có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Hãy thử gấp chữ G theo các đường thẳng khác nhau. Có đường nào làm hai phần chồng khít không?',
    overallConclusion:
      'Chữ cái G KHÔNG có trục đối xứng vì phần hở phía trên bên phải và thanh ngang ở giữa làm hình mất cân đối theo mọi phương.',
    renderShape: () => (
      <path
        d="M 68,-54 L 38,-36 C 28,-56 12,-68 -8,-68 C -42,-68 -64,-40 -64,0 C -64,40 -42,68 -6,68 C 22,68 42,54 48,26 L 2,26 L 2,-4 L 82,-4 L 82,14 C 82,66 44,100 -8,100 C -62,100 -98,60 -98,0 C -98,-60 -62,-100 -8,-100 C 28,-100 54,-82 68,-54 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-lt1-H',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 1 – Chữ cái H',
    shortTitle: 'Chữ cái H (LT1)',
    sourceRef: 'Bài 21 – Luyện tập 1, trang 99',
    hasSymmetry: true,
    axisCountLabel: '2 trục đối xứng',
    candidateLines: [
      {
        id: 'vert',
        label: 'Đường thẳng đứng ở chính giữa',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation: 'Hai nét thẳng đứng hai bên đối xứng nhau qua đường chính giữa nên chồng khít hoàn toàn.',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang đi qua giữa thanh ngang',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation: 'Nửa trên và nửa dưới chữ H đối xứng nhau hoàn toàn nên chồng khít khi gấp.',
      },
      {
        id: 'diag',
        label: 'Đường chéo nghiêng 45°',
        px: 0,
        py: 0,
        angleDeg: 45,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Gấp theo đường chéo làm nét dọc biến thành nét ngang nên không chồng khít.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 90, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 0, label: 'd₂' },
    ],
    predictQuestion: 'Chữ cái H có trục đối xứng không? Có mấy trục?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi kiểm tra các đường gấp, em tìm được mấy trục đối xứng của chữ H?',
    overallConclusion:
      'Chữ cái H có 2 trục đối xứng: 1 trục thẳng đứng đi qua chính giữa và 1 trục nằm ngang đi qua chính giữa thanh ngang.',
    renderShape: () => (
      <path
        d="M -70,-100 L -36,-100 L -36,-17 L 36,-17 L 36,-100 L 70,-100 L 70,100 L 36,100 L 36,17 L -36,17 L -36,100 L -70,100 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-lt1-E',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 1 – Chữ cái E',
    shortTitle: 'Chữ cái E (LT1)',
    sourceRef: 'Bài 21 – Luyện tập 1, trang 99',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'horiz',
        label: 'Đường nằm ngang đi qua thanh giữa',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation: 'Thanh ngang trên và thanh ngang dưới bằng nhau và cách đều thanh giữa nên gấp ngang chồng khít hoàn toàn.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng ở giữa',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Nét thẳng đứng nằm ở bên trái, còn bên phải để hở nên gấp dọc không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 0, label: 'd' }],
    predictQuestion: 'Chữ cái E có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp theo đường nằm ngang, hai nửa chữ E có chồng khít không?',
    overallConclusion: 'Chữ cái E có 1 trục đối xứng nằm ngang đi qua chính giữa thanh ngang ở giữa.',
    renderShape: () => (
      <path
        d="M -60,-100 L 62,-100 L 62,-68 L -26,-68 L -26,-16 L 50,-16 L 50,16 L -26,16 L -26,68 L 62,68 L 62,100 L -60,100 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-lt1-F',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 1 – Chữ cái F',
    shortTitle: 'Chữ cái F (LT1)',
    sourceRef: 'Bài 21 – Luyện tập 1, trang 99',
    hasSymmetry: false,
    axisCountLabel: '0 trục đối xứng',
    candidateLines: [
      {
        id: 'horiz',
        label: 'Đường nằm ngang ở giữa',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd₁',
        explanation: 'Chữ F có thanh ngang trên nhưng không có thanh ngang dưới nên khi gấp ngang không chồng khít.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng ở giữa',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation: 'Nét thẳng đứng ở bên trái, hai thanh ngang hướng sang phải nên gấp dọc không chồng khít.',
      },
    ],
    allTrueAxes: [],
    predictQuestion: 'Chữ cái F có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Khi gấp chữ F theo đường ngang hay dọc, phần nào bị lộ ra không trùng?',
    overallConclusion: 'Chữ cái F KHÔNG có trục đối xứng vì thiếu thanh ngang phía dưới và lệch về bên trái.',
    renderShape: () => (
      <path
        d="M -56,-100 L 62,-100 L 62,-68 L -22,-68 L -22,-14 L 48,-14 L 48,18 L -22,18 L -22,100 L -56,100 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },

  // --- Luyện tập 2: Các biển báo a, b, c, d (trang 99) ---
  {
    id: 'axis-lt2-sign-a',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 2a – Biển báo cấm đi ngược chiều',
    shortTitle: 'Biển báo 2a (Cấm ngược chiều)',
    sourceRef: 'Bài 21 – Luyện tập 2a, trang 99',
    hasSymmetry: true,
    axisCountLabel: '2 trục đối xứng',
    candidateLines: [
      {
        id: 'vert',
        label: 'Đường thẳng đứng qua tâm',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation: 'Cả hình tròn đỏ và thanh chữ nhật trắng nằm ngang đều đối xứng qua đường thẳng đứng đi qua tâm.',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang qua tâm',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation: 'Đường nằm ngang chia đôi cả hình tròn và thanh trắng thành hai nửa chồng khít hoàn toàn.',
      },
      {
        id: 'diag',
        label: 'Đường chéo 45° qua tâm',
        px: 0,
        py: 0,
        angleDeg: 45,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Hình tròn chồng khít, nhưng thanh chữ nhật trắng bị xoay thành thẳng đứng nên KHÔNG chồng khít!',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 90, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 0, label: 'd₂' },
    ],
    predictQuestion: 'Biển báo 2a (Cấm đi ngược chiều) có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hãy kiểm tra cả đường đứng, đường ngang và đường chéo 45°. Tại sao đường chéo không phải trục đối xứng?',
    overallConclusion:
      'Biển báo 2a CÓ trục đối xứng (gồm 2 trục đối xứng: trục thẳng đứng và trục nằm ngang cùng đi qua tâm biển báo).',
    renderShape: () => (
      <g>
        <circle cx="0" cy="0" r="102" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
        <rect x="-74" y="-17" width="148" height="34" rx="2" fill="#FFFFFF" />
      </g>
    ),
  },
  {
    id: 'axis-lt2-sign-b',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 2b – Biển báo cấm người đi bộ',
    shortTitle: 'Biển báo 2b (Cấm người đi bộ)',
    sourceRef: 'Bài 21 – Luyện tập 2b, trang 99',
    hasSymmetry: false,
    axisCountLabel: '0 trục đối xứng',
    candidateLines: [
      {
        id: 'diag-slash',
        label: 'Đường thẳng chứa vạch gạch chéo (45°)',
        px: 0,
        py: 0,
        angleDeg: 45,
        isSymmetryAxis: false,
        lineTag: 'd₁',
        explanation:
          'Vòng tròn và vạch chéo đỏ trùng nhau, nhưng hình người đi bộ bên trong bị lật lệch hẳn vị trí nên KHÔNG chồng khít.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng qua tâm',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation:
          'Cả vạch gạch chéo đỏ (nghiêng ngược lại) và hình người đi bộ quay mặt sang trái đều không chồng khít.',
      },
    ],
    allTrueAxes: [],
    predictQuestion: 'Biển báo 2b (Cấm người đi bộ) có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Dù viền ngoài là hình tròn, bộ phận nào bên trong làm biển báo không chồng khít khi gấp?',
    overallConclusion:
      'Biển báo 2b KHÔNG có trục đối xứng vì hình người đang bước đi (quay về một phía) kết hợp với vạch gạch chéo làm hình không đối xứng theo bất kì đường thẳng nào.',
    renderShape: () => (
      <g>
        <circle cx="0" cy="0" r="102" fill="#FFFFFF" stroke="#DC2626" strokeWidth="18" />
        {/* Walking person silhouette facing left */}
        <circle cx="-4" cy="-50" r="12" fill="#0F172A" />
        <path
          d="M -6,-34 L 6,-34 L 10,8 L 28,58 L 15,62 L 0,20 L -14,62 L -26,56 L -10,6 L -12,-14 L -32,2 L -39,-7 L -16,-28 Z"
          fill="#0F172A"
        />
        <path d="M 6,-24 L 26,-4 L 18,4 L 2,-14 Z" fill="#0F172A" />
        {/* Red diagonal slash */}
        <line x1="-66" y1="-66" x2="66" y2="66" stroke="#DC2626" strokeWidth="16" />
      </g>
    ),
  },
  {
    id: 'axis-lt2-sign-c',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 2c – Biển báo mũi tên hướng phải',
    shortTitle: 'Biển báo 2c (Mũi tên phải)',
    sourceRef: 'Bài 21 – Luyện tập 2c, trang 99',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'horiz',
        label: 'Đường nằm ngang đi qua tâm mũi tên',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Khi gấp theo đường nằm ngang đi qua giữa thân và đỉnh nhọn mũi tên, cả hình tròn xanh và mũi tên trắng chồng khít hoàn toàn.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng qua tâm',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Đầu nhọn mũi tên ở bên phải còn đuôi thẳng ở bên trái nên khi gấp dọc hai phần không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 0, label: 'd' }],
    predictQuestion: 'Biển báo 2c có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Đường gấp nào làm cả hình tròn xanh và mũi tên trắng chồng khít?',
    overallConclusion: 'Biển báo 2c CÓ 1 trục đối xứng là đường thẳng nằm ngang đi qua tâm hình tròn và trục mũi tên.',
    renderShape: () => (
      <g>
        <circle cx="0" cy="0" r="102" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
        <polygon points="-72,-18 14,-18 14,-44 76,0 14,44 14,18 -72,18" fill="#FFFFFF" />
      </g>
    ),
  },
  {
    id: 'axis-lt2-sign-d',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Luyện tập 2d – Biển báo đường hai chiều',
    shortTitle: 'Biển báo 2d (Đường hai chiều)',
    sourceRef: 'Bài 21 – Luyện tập 2d, trang 99',
    hasSymmetry: false,
    axisCountLabel: '0 trục đối xứng',
    candidateLines: [
      {
        id: 'vert',
        label: 'Đường thẳng đứng đi qua đỉnh tam giác',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd₁',
        explanation:
          'Chú ý thật kỹ hai mũi tên! Khung tam giác chồng khít, nhưng mũi tên bên trái chỉ LÊN còn mũi tên bên phải chỉ XUỐNG. Khi gấp theo đường thẳng đứng, đầu nhọn mũi tên trái chồng vào đuôi mũi tên phải nên KHÔNG chồng khít!',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang',
        px: 0,
        py: 18,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation: 'Khung tam giác có 1 đỉnh ở trên và cạnh đáy ở dưới nên gấp ngang không chồng khít.',
      },
    ],
    allTrueAxes: [],
    predictQuestion: 'Hãy quan sát thật kỹ chiều hai mũi tên! Biển báo 2d có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Khi gấp dọc theo đỉnh tam giác, hai mũi tên màu đen bên trong có chồng khít không?',
    overallConclusion:
      'Biển báo 2d KHÔNG có trục đối xứng! Dù khung tam giác cân đối nhưng hai mũi tên chỉ hai chiều ngược nhau (↑ và ↓), nên khi gấp dọc chúng không chồng khít lên nhau.',
    renderShape: () => (
      <g>
        <path
          d="M 0,-106 L 114,88 L -114,88 Z"
          fill="#FACC15"
          stroke="#DC2626"
          strokeWidth="18"
          strokeLinejoin="round"
        />
        {/* Left arrow pointing UP */}
        <path d="M -22,-22 L -38,2 L -28,2 L -28,54 L -16,54 L -16,2 L -6,2 Z" fill="#0F172A" />
        {/* Right arrow pointing DOWN */}
        <path d="M 22,58 L 38,34 L 28,34 L 28,-18 L 16,-18 L 16,34 L 6,34 Z" fill="#0F172A" />
      </g>
    ),
  },

  // --- Bài tập 5.1, 5.2, 5.3, 5.4 (trang 102) ---
  {
    id: 'axis-bt51-trapezoid',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.1 – Tìm trục đối xứng của hình thang cân',
    shortTitle: 'Bài 5.1: Hình thang cân',
    sourceRef: 'Bài 21 – Bài tập 5.1, trang 102',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'vert-mid',
        label: 'Đường thẳng đi qua trung điểm hai đáy',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation: 'Khi gấp hình thang cân theo đường thẳng đi qua trung điểm hai đáy, hai phần chồng khít hoàn toàn.',
      },
      {
        id: 'horiz-mid',
        label: 'Đường thẳng nằm ngang qua trung điểm hai cạnh bên',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Đáy nhỏ phía trên và đáy lớn phía dưới có độ dài khác nhau nên gấp ngang không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Đường thẳng nào là trục đối xứng của hình thang cân trong Bài 5.1?',
    predictOptions: [
      { id: 'yes', label: 'Đường đang chọn là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Đường đang chọn không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp hình thang cân theo đường dự đoán, hai phần có chồng khít không?',
    overallConclusion:
      'Trục đối xứng của hình thang cân là đường thẳng đi qua trung điểm của hai đáy (và vuông góc với hai đáy).',
    renderShape: () => (
      <polygon
        points="-72,-56 72,-56 122,56 -122,56"
        fill="#FEF9C3"
        stroke="#475569"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-bt52-hexagon',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.2 – Số trục đối xứng của hình lục giác đều',
    shortTitle: 'Bài 5.2: Lục giác đều',
    sourceRef: 'Bài 21 – Bài tập 5.2, trang 102',
    hasSymmetry: true,
    axisCountLabel: '6 trục đối xứng',
    candidateLines: [
      {
        id: 'd1',
        label: 'Đường chéo chính 1 (0°)',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation: 'Hai nửa lục giác đều chồng khít hoàn toàn.',
      },
      {
        id: 'd2',
        label: 'Đường chéo chính 2 (60°)',
        px: 0,
        py: 0,
        angleDeg: 60,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation: 'Hai nửa lục giác đều chồng khít hoàn toàn.',
      },
      {
        id: 'd3',
        label: 'Đường chéo chính 3 (120°)',
        px: 0,
        py: 0,
        angleDeg: 120,
        isSymmetryAxis: true,
        lineTag: 'd₃',
        explanation: 'Hai nửa lục giác đều chồng khít hoàn toàn.',
      },
      {
        id: 'm1',
        label: 'Đường qua trung điểm hai cạnh đối (90°)',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd₄',
        explanation: 'Hai nửa lục giác đều chồng khít hoàn toàn.',
      },
      {
        id: 'm2',
        label: 'Đường qua trung điểm hai cạnh đối (30°)',
        px: 0,
        py: 0,
        angleDeg: 30,
        isSymmetryAxis: true,
        lineTag: 'd₅',
        explanation: 'Hai nửa lục giác đều chồng khít hoàn toàn.',
      },
      {
        id: 'm3',
        label: 'Đường qua trung điểm hai cạnh đối (150°)',
        px: 0,
        py: 0,
        angleDeg: 150,
        isSymmetryAxis: true,
        lineTag: 'd₆',
        explanation: 'Hai nửa lục giác đều chồng khít hoàn toàn.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 0, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 60, label: 'd₂' },
      { px: 0, py: 0, angleDeg: 120, label: 'd₃' },
      { px: 0, py: 0, angleDeg: 90, label: 'd₄' },
      { px: 0, py: 0, angleDeg: 30, label: 'd₅' },
      { px: 0, py: 0, angleDeg: 150, label: 'd₆' },
    ],
    predictQuestion: 'Hình lục giác đều có bao nhiêu trục đối xứng?',
    predictOptions: [
      { id: '3', label: '3 trục đối xứng', isCorrect: false },
      { id: '6', label: '6 trục đối xứng', isCorrect: true },
      { id: '12', label: '12 trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hãy thử gấp theo từng đường và bấm "Hiện tất cả trục" sau khi kết luận để đếm đủ các trục.',
    overallConclusion:
      'Hình lục giác đều có tất cả 6 trục đối xứng: 3 đường chéo chính và 3 đường thẳng đi qua trung điểm của các cặp cạnh đối diện.',
    renderShape: () => (
      <polygon
        points={regularPolygonPoints(6, 102, 0)}
        fill="#60D5FA"
        stroke="#0369A1"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-bt53a-flag',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.3a – Cờ Tổ quốc Việt Nam',
    shortTitle: 'Bài 5.3a: Cờ đỏ sao vàng',
    sourceRef: 'Bài 21 – Bài tập 5.3a, trang 102',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'vert',
        label: 'Đường thẳng đứng qua đỉnh trên ngôi sao',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Cả lá cờ hình chữ nhật đỏ và ngôi sao vàng năm cánh hướng thẳng lên trên đều chồng khít hoàn toàn khi gấp theo đường thẳng đứng ở giữa.',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang qua tâm lá cờ',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Khung chữ nhật chồng khít nhưng ngôi sao có 1 đỉnh ở trên và 2 đỉnh ở dưới nên khi gấp ngang, các cánh sao KHÔNG trùng nhau!',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Hình 5.3a (Cờ đỏ sao vàng) có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hãy so sánh khi gấp theo đường đứng và đường ngang. Ngôi sao vàng ở giữa thay đổi thế nào?',
    overallConclusion:
      'Hình 5.3a CÓ 1 trục đối xứng là đường thẳng đứng đi qua chính giữa lá cờ và đỉnh trên của ngôi sao. Đường nằm ngang không phải trục đối xứng.',
    renderShape: () => (
      <g>
        <rect x="-132" y="-88" width="264" height="176" fill="#DA251D" stroke="#991B1B" strokeWidth="2.5" />
        <polygon points={star5Points(54, 20.63)} fill="#FFFF00" />
      </g>
    ),
  },
  {
    id: 'axis-bt53b-P',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.3b – Chữ cái P',
    shortTitle: 'Bài 5.3b: Chữ P',
    sourceRef: 'Bài 21 – Bài tập 5.3b, trang 102',
    hasSymmetry: false,
    axisCountLabel: '0 trục đối xứng',
    candidateLines: [
      {
        id: 'horiz',
        label: 'Đường nằm ngang ở giữa',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd₁',
        explanation: 'Vòng cong của chữ P chỉ nằm ở nửa trên, nửa dưới chỉ có chân thẳng nên gấp ngang không chồng khít.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng ở giữa',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation: 'Nét thẳng ở bên trái và vòng cong ở bên phải nên gấp dọc không chồng khít.',
      },
    ],
    allTrueAxes: [],
    predictQuestion: 'Chữ P trong Bài 5.3b có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi gấp theo các đường thử, hai phần chữ P có chồng khít không?',
    overallConclusion: 'Hình 5.3b (chữ P) KHÔNG có trục đối xứng.',
    renderShape: () => (
      <path
        d="M -62,-102 L 10,-102 C 52,-102 76,-78 76,-42 C 76,-6 52,18 10,18 L -28,18 L -28,102 L -62,102 Z M -28,-70 L -28,-14 L 8,-14 C 28,-14 42,-25 42,-42 C 42,-59 28,-70 8,-70 Z"
        fill="#78350F"
        fillRule="evenodd"
        stroke="#451A03"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'axis-bt53c-clover',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.3c – Cỏ ba lá',
    shortTitle: 'Bài 5.3c: Cỏ ba lá',
    sourceRef: 'Bài 21 – Bài tập 5.3c, trang 102',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    candidateLines: [
      {
        id: 'vert',
        label: 'Đường thẳng đứng đi qua cuống lá và lá trên',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Lá trên cùng và cuống lá thẳng đứng được chia đôi đối xứng; lá bên trái và lá bên phải chồng khít lên nhau hoàn toàn.',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang qua tâm',
        px: 0,
        py: 10,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Phía trên có lá còn phía dưới có cuống lá nên gấp ngang không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Hình cỏ ba lá 5.3c có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp dọc theo đường đi qua cuống lá, ba chiếc lá chồng lên nhau như thế nào?',
    overallConclusion:
      'Hình 5.3c (cỏ ba lá) CÓ 1 trục đối xứng là đường thẳng đứng đi qua giữa lá trên cùng và cuống lá.',
    renderShape: () => renderClover53c(),
  },
  {
    id: 'axis-bt53d-nosign',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.3d – Biển báo vòng tròn gạch chéo đỏ',
    shortTitle: 'Bài 5.3d: Vòng tròn gạch chéo',
    sourceRef: 'Bài 21 – Bài tập 5.3d, trang 102',
    hasSymmetry: true,
    axisCountLabel: '2 trục đối xứng',
    candidateLines: [
      {
        id: 'diag-along',
        label: 'Đường thẳng chứa vạch gạch chéo (45°)',
        px: 0,
        py: 0,
        angleDeg: 45,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation:
          'Vạch gạch chéo nằm ngay trên đường gấp và vòng tròn bị chia đôi đều nên hai phần chồng khít hoàn toàn!',
      },
      {
        id: 'diag-perp',
        label: 'Đường vuông góc với vạch gạch chéo tại tâm (135°)',
        px: 0,
        py: 0,
        angleDeg: 135,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation:
          'Hai nửa vạch gạch chéo gập chồng khít lên nhau và vòng tròn cũng chồng khít. Đây là trục đối xứng thứ hai!',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng qua tâm (kiểm chứng)',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation:
          'Khi gấp theo đường thẳng đứng, vạch gạch chéo bị lật theo hướng chéo ngược lại (tạo thành dấu X), KHÔNG trùng với vạch chéo ban đầu!',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: 45, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 135, label: 'd₂' },
    ],
    predictQuestion: 'Hình 5.3d (vòng tròn trắng viền đỏ có vạch gạch chéo) có trục đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Tại sao đường đứng không phải trục đối xứng, còn đường chứa vạch chéo và đường vuông góc với nó lại đúng?',
    overallConclusion:
      'Hình 5.3d CÓ 2 trục đối xứng: đường thẳng chứa thanh gạch chéo đỏ (45°) và đường thẳng vuông góc với thanh gạch chéo tại tâm (135°).',
    renderShape: () => (
      <g>
        <circle cx="0" cy="0" r="98" fill="#FFFFFF" stroke="#DC2626" strokeWidth="18" />
        <line x1="-68" y1="-68" x2="68" y2="68" stroke="#DC2626" strokeWidth="16" />
      </g>
    ),
  },
  {
    id: 'axis-bt54a',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.4 – Hình a (trên lưới ô vuông)',
    shortTitle: 'Bài 5.4: Hình a',
    sourceRef: 'Bài 21 – Bài tập 5.4 (Hình a), trang 102',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    showGrid: true,
    gridStep: 28,
    candidateLines: [
      {
        id: 'vert',
        label: 'Đường thẳng đứng đi qua đỉnh nhọn phía dưới',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Hai tai nhọn ở trên, hai cạnh bên nghiêng và phần đáy hai bên đều đối xứng chính xác từng ô lưới qua đường thẳng đứng giữa.',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang qua giữa hình',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Phía trên có hai góc nhọn lõm vào, phía dưới có một đỉnh nhọn lồi ra nên gấp ngang không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Hình a trong Bài 5.4 có mấy trục đối xứng?',
    predictOptions: [
      { id: '0', label: 'Không có trục đối xứng', isCorrect: false },
      { id: '1', label: 'Chỉ có 1 trục đối xứng', isCorrect: true },
      { id: '2', label: 'Có 2 trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Quan sát trên lưới ô vuông sau khi gấp Hình a, hai phần có khớp từng ô lưới không?',
    overallConclusion: 'Bài 5.4 – Hình a chỉ có 1 trục đối xứng (đường thẳng đứng đi chính giữa hình).',
    renderShape: () => {
      const s = 28;
      const pts = [
        [-4, -2],
        [-3, -3],
        [-2, -2],
        [2, -2],
        [3, -3],
        [4, -2],
        [3, 2],
        [1, 2],
        [0, 3],
        [-1, 2],
        [-3, 2],
      ]
        .map(([x, y]) => `${x * s},${y * s}`)
        .join(' ');
      return (
        <polygon
          points={pts}
          fill="#FEF08A"
          fillOpacity="0.88"
          stroke="#CA8A04"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      );
    },
  },
  {
    id: 'axis-bt54b',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.4 – Hình b (trên lưới ô vuông)',
    shortTitle: 'Bài 5.4: Hình b',
    sourceRef: 'Bài 21 – Bài tập 5.4 (Hình b), trang 102',
    hasSymmetry: true,
    axisCountLabel: '2 trục đối xứng',
    showGrid: true,
    gridStep: 32,
    candidateLines: [
      {
        id: 'diag-main',
        label: 'Đường chéo nối hai đỉnh nhọn (nghiêng -45°)',
        px: 0,
        py: 0,
        angleDeg: -45,
        isSymmetryAxis: true,
        lineTag: 'd₁',
        explanation:
          'Hai cung tròn hai bên đường chéo nối hai đỉnh nhọn chồng khít hoàn toàn lên nhau. Đây là trục đối xứng thứ nhất.',
      },
      {
        id: 'diag-perp',
        label: 'Đường chéo vuông góc ở giữa (nghiêng 45°)',
        px: 0,
        py: 0,
        angleDeg: 45,
        isSymmetryAxis: true,
        lineTag: 'd₂',
        explanation:
          'Khi gấp theo đường thẳng vuông góc tại chính giữa, hai đầu nhọn chồng khít lên nhau. Đây là trục đối xứng thứ hai.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng qua tâm',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Hình đặt nghiêng 45° nên khi gấp theo đường thẳng đứng, hai đầu nhọn lệch hẳn nhau.',
      },
    ],
    allTrueAxes: [
      { px: 0, py: 0, angleDeg: -45, label: 'd₁' },
      { px: 0, py: 0, angleDeg: 45, label: 'd₂' },
    ],
    predictQuestion: 'Hình b trong Bài 5.4 có mấy trục đối xứng?',
    predictOptions: [
      { id: '0', label: 'Không có trục đối xứng', isCorrect: false },
      { id: '1', label: 'Chỉ có 1 trục đối xứng', isCorrect: false },
      { id: '2', label: 'Có 2 trục đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi kiểm tra các đường chéo, Hình b có bao nhiêu trục đối xứng?',
    overallConclusion:
      'Bài 5.4 – Hình b có đúng 2 trục đối xứng là đường thẳng nối hai đỉnh nhọn và đường trung trực của đoạn nối hai đỉnh nhọn đó.',
    renderShape: () => {
      // Exact 5x5 grid square lens (cell = 32 -> 2.5*32 = 80, R = 160)
      return (
        <path
          d="M -80,80 A 160,160 0 0,1 80,-80 A 160,160 0 0,1 -80,80 Z"
          fill="#FEF08A"
          fillOpacity="0.88"
          stroke="#CA8A04"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      );
    },
  },
  {
    id: 'axis-bt54c',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.4 – Hình c (trên lưới ô vuông)',
    shortTitle: 'Bài 5.4: Hình c',
    sourceRef: 'Bài 21 – Bài tập 5.4 (Hình c), trang 102',
    hasSymmetry: false,
    axisCountLabel: '0 trục đối xứng',
    showGrid: true,
    gridStep: 32,
    candidateLines: [
      {
        id: 'vert',
        label: 'Đường thẳng đứng qua tâm',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd₁',
        explanation:
          'Bốn cánh của hình ngôi sao quay lệch cùng chiều (như chong chóng). Khi gấp dọc, các đỉnh cánh lệch nhau rõ rệt, không chồng khít.',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang qua tâm',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation: 'Gấp ngang cũng làm các cánh nhọn lệch hướng hoàn toàn, không chồng khít.',
      },
      {
        id: 'diag1',
        label: 'Đường chéo 45° qua tâm',
        px: 0,
        py: 0,
        angleDeg: 45,
        isSymmetryAxis: false,
        lineTag: 'd₃',
        explanation: 'Gấp theo đường chéo 45°, các cạnh thẳng và cạnh xiên không trùng nhau nên không chồng khít.',
      },
      {
        id: 'diag2',
        label: 'Đường chéo 135° qua tâm',
        px: 0,
        py: 0,
        angleDeg: 135,
        isSymmetryAxis: false,
        lineTag: 'd₄',
        explanation: 'Gấp theo đường chéo 135° cũng không chồng khít.',
      },
    ],
    allTrueAxes: [],
    predictQuestion: 'Hình c trông khá đều đặn — theo em nó có trục đối xứng không?',
    predictOptions: [
      { id: '0', label: 'Không có trục đối xứng', isCorrect: true },
      { id: '1', label: 'Chỉ có 1 trục đối xứng', isCorrect: false },
      { id: '2', label: 'Có 2 trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hãy gấp thử cả 4 đường qua tâm (đứng, ngang, hai đường chéo). Có đường nào làm hai phần chồng khít không?',
    overallConclusion:
      'Bài 5.4 – Hình c KHÔNG có trục đối xứng! Dù có vẻ cân đối (dạng chong chóng 4 cánh), nhưng mỗi cánh đều có một cạnh thẳng đứng/ngang và một cạnh xiên cùng xoay một chiều nên không thể gấp chồng khít qua bất kì đường thẳng nào.',
    renderShape: () => {
      const s = 32;
      const pts = [
        [-1, -3],
        [1, -1],
        [3, -1],
        [1, 1],
        [1, 3],
        [-1, 1],
        [-3, 1],
        [-1, -1],
      ]
        .map(([x, y]) => `${x * s},${y * s}`)
        .join(' ');
      return (
        <polygon
          points={pts}
          fill="#86EFAC"
          fillOpacity="0.88"
          stroke="#15803D"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      );
    },
  },
  {
    id: 'axis-bt54d',
    tab: 'axis',
    groupId: 'axis-g3',
    mode: 'axis-fold',
    title: 'Bài 5.4 – Hình d (trên lưới ô vuông)',
    shortTitle: 'Bài 5.4: Hình d',
    sourceRef: 'Bài 21 – Bài tập 5.4 (Hình d), trang 102',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    showGrid: true,
    gridStep: 28,
    candidateLines: [
      {
        id: 'horiz',
        label: 'Đường nằm ngang đi qua giữa mũi tên',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation: 'Nửa trên và nửa dưới của mũi tên đối xứng chính xác từng ô lưới nên chồng khít hoàn toàn.',
      },
      {
        id: 'vert',
        label: 'Đường thẳng đứng ở giữa',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: false,
        lineTag: 'd′',
        explanation: 'Đầu mũi tên nhọn nằm bên phải, đuôi vuông nằm bên trái nên gấp dọc không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 0, label: 'd' }],
    predictQuestion: 'Hình d (hình mũi tên) trong Bài 5.4 có mấy trục đối xứng?',
    predictOptions: [
      { id: '0', label: 'Không có trục đối xứng', isCorrect: false },
      { id: '1', label: 'Chỉ có 1 trục đối xứng', isCorrect: true },
      { id: '2', label: 'Có 2 trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp Hình d theo đường nằm ngang, hai nửa có khớp từng ô lưới không?',
    overallConclusion: 'Bài 5.4 – Hình d chỉ có 1 trục đối xứng là đường thẳng nằm ngang đi chính giữa thân và đỉnh mũi tên.',
    renderShape: () => {
      const s = 28;
      const pts = [
        [-4, -1],
        [1, -1],
        [1, -2],
        [4, 0],
        [1, 2],
        [1, 1],
        [-4, 1],
      ]
        .map(([x, y]) => `${x * s},${y * s}`)
        .join(' ');
      return (
        <polygon
          points={pts}
          fill="#86EFAC"
          fillOpacity="0.88"
          stroke="#15803D"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      );
    },
  },

  // =========================================================================
  // NHÓM 4: GẤP VÀ CẮT GIẤY (Trang 101)
  // =========================================================================
  {
    id: 'axis-g4-cut-A',
    tab: 'axis',
    groupId: 'axis-g4',
    mode: 'paper-cut',
    variant: 'cut-letter-A',
    title: 'Gấp giấy cắt chữ A (Hình 5.4)',
    shortTitle: 'Cắt chữ A (Hình 5.4)',
    sourceRef: 'Bài 21 – Hình 5.4, trang 101',
    foldType: 'single-vertical',
    steps: [
      {
        title: 'Bước 1: Chuẩn bị mảnh giấy (H.5.4a)',
        description: 'Mảnh giấy hình chữ nhật kích thước 3 cm × 5 cm, xác định trục gấp dọc ở chính giữa.',
      },
      {
        title: 'Bước 2: Gấp đôi mảnh giấy (H.5.4b)',
        description: 'Gấp đôi mảnh giấy theo chiều dọc để hai cạnh dài trùng khít lên nhau.',
      },
      {
        title: 'Bước 3: Vẽ và cắt nửa chữ A (H.5.4c)',
        description: 'Vẽ nét nửa bên phải chữ A sát cạnh nếp gấp rồi cắt bỏ phần giấy thừa màu nhạt.',
      },
      {
        title: 'Bước 4: Mở giấy ra được chữ A (H.5.4d)',
        description: 'Mở tờ giấy ra để thu được chữ A hoàn chỉnh; đường nếp gấp chính là trục đối xứng dọc của chữ A.',
      },
    ],
    predictQuestion: 'Tại sao chỉ cần cắt nửa chữ A trên tờ giấy gấp đôi là ta thu được cả chữ A cân đối?',
    predictOptions: [
      { id: 'axis', label: 'Vì chữ A có trục đối xứng thẳng đứng trùng với nếp gấp', isCorrect: true },
      { id: 'random', label: 'Vì mọi chữ cái đều cắt được bằng cách gấp dọc', isCorrect: false },
    ],
    observeQuestion: 'Sau khi mở giấy, đường nếp gấp nằm ở vị trí nào của chữ A?',
    overallConclusion:
      'Chữ A có trục đối xứng thẳng đứng ở chính giữa. Khi gấp đôi tờ giấy theo trục đó và cắt đúng một nửa chữ A rồi mở ra, hai nửa đối xứng nhau qua nếp gấp tạo thành chữ A hoàn chỉnh.',
  },
  {
    id: 'axis-g4-cut-E',
    tab: 'axis',
    groupId: 'axis-g4',
    mode: 'paper-cut',
    variant: 'cut-letter-E',
    title: 'Thực hành 2 – Gấp giấy cắt chữ E',
    shortTitle: 'Cắt chữ E (Thực hành 2)',
    sourceRef: 'Bài 21 – Thực hành 2, trang 101',
    foldType: 'single-horizontal',
    steps: [
      {
        title: 'Bước 1: Xác định trục gấp ngang',
        description: 'Vì chữ E có trục đối xứng NẰM NGANG, ta chuẩn bị mảnh giấy chữ nhật và kẻ đường gấp ngang ở giữa.',
      },
      {
        title: 'Bước 2: Gấp đôi theo chiều ngang',
        description: 'Gấp đôi tờ giấy theo đường ngang chính giữa.',
      },
      {
        title: 'Bước 3: Vẽ và cắt nửa trên chữ E',
        description: 'Cắt khoét một hình chữ nhật bên phải giữa thanh trên và nửa thanh giữa dọc theo nếp gấp.',
      },
      {
        title: 'Bước 4: Mở giấy thu được chữ E',
        description: 'Mở tờ giấy ra: hai nửa đối xứng nhau qua nếp gấp ngang tạo thành chữ E cân đối.',
      },
    ],
    predictQuestion: 'Để cắt chữ E bằng một lần gấp đôi, ta nên gấp tờ giấy theo chiều nào?',
    predictOptions: [
      { id: 'horiz', label: 'Gấp theo đường nằm ngang ở giữa', isCorrect: true },
      { id: 'vert', label: 'Gấp theo đường thẳng đứng ở giữa', isCorrect: false },
    ],
    observeQuestion: 'Đường nếp gấp tương ứng với bộ phận nào của chữ E sau khi mở giấy?',
    overallConclusion:
      'Chữ E có trục đối xứng nằm ngang đi qua giữa thanh ngang ở giữa, nên ta gấp đôi tờ giấy theo đường ngang, cắt nửa trên rồi mở ra sẽ được chữ E.',
  },
  {
    id: 'axis-g4-cut-T',
    tab: 'axis',
    groupId: 'axis-g4',
    mode: 'paper-cut',
    variant: 'cut-letter-T',
    title: 'Thực hành 2 – Gấp giấy cắt chữ T',
    shortTitle: 'Cắt chữ T (Thực hành 2)',
    sourceRef: 'Bài 21 – Thực hành 2, trang 101',
    foldType: 'single-vertical',
    steps: [
      {
        title: 'Bước 1: Xác định trục gấp dọc',
        description: 'Vì chữ T có trục đối xứng THẲNG ĐỨNG, ta chọn đường gấp dọc ở chính giữa mảnh giấy.',
      },
      {
        title: 'Bước 2: Gấp đôi theo chiều dọc',
        description: 'Gấp đôi mảnh giấy theo đường dọc chính giữa.',
      },
      {
        title: 'Bước 3: Vẽ và cắt nửa chữ T',
        description: 'Cắt bỏ phần hình chữ nhật ở góc dưới bên ngoài (giữ nguyên phần thanh ngang trên và nửa thân dọc sát nếp gấp).',
      },
      {
        title: 'Bước 4: Mở giấy thu được chữ T',
        description: 'Mở tờ giấy ra để thấy chữ T hoàn chỉnh nhận đường nếp gấp làm trục đối xứng.',
      },
    ],
    predictQuestion: 'Để cắt chữ T bằng một lần gấp đôi, ta chọn đường gấp nào?',
    predictOptions: [
      { id: 'vert', label: 'Gấp theo đường thẳng đứng ở giữa', isCorrect: true },
      { id: 'horiz', label: 'Gấp theo đường nằm ngang ở giữa', isCorrect: false },
    ],
    observeQuestion: 'Quan sát chữ T khi mở ra: hai phần đối xứng nhau qua đường nếp gấp như thế nào?',
    overallConclusion:
      'Chữ T có 1 trục đối xứng thẳng đứng đi dọc thân chữ. Gấp đôi giấy theo trục dọc, cắt bỏ hình chữ nhật dưới-ngoài rồi mở ra sẽ thu được chữ T.',
  },
  {
    id: 'axis-g4-h55a',
    tab: 'axis',
    groupId: 'axis-g4',
    mode: 'paper-cut',
    variant: 'h55-a',
    title: 'Tranh luận 2 – Hình 5.5a (Dự đoán chữ cái)',
    shortTitle: 'Hình 5.5a: Dự đoán chữ gì?',
    sourceRef: 'Bài 21 – Tranh luận 2, Hình 5.5a, trang 101',
    foldType: 'single-vertical',
    steps: [
      {
        title: 'Bước 1: Quan sát mảnh giấy đã cắt (H.5.5a)',
        description: 'Mảnh giấy đã được gấp đôi dọc theo mép phải và cắt sẵn. Hãy dự đoán chữ cái sẽ xuất hiện khi mở sang phải!',
      },
      {
        title: 'Bước 2: Mở dần mảnh giấy',
        description: 'Mở tờ giấy sang bên phải quanh đường nếp gấp thẳng đứng.',
      },
      {
        title: 'Bước 3: Quan sát chữ cái thu được',
        description: 'So sánh kết quả mở ra với dự đoán ban đầu của em.',
      },
    ],
    predictQuestion: 'Theo em, khi mở mảnh giấy ở Hình 5.5a ra, ta sẽ nhận được chữ cái gì?',
    predictOptions: [
      { id: 'T', label: 'Chữ T', isCorrect: true },
      { id: 'I', label: 'Chữ I', isCorrect: false },
      { id: 'L', label: 'Chữ L', isCorrect: false },
      { id: 'F', label: 'Chữ F', isCorrect: false },
    ],
    observeQuestion: 'Khi mở mảnh giấy Hình 5.5a quanh nếp gấp đứng, hình nào xuất hiện?',
    overallConclusion:
      'Khi mở mảnh giấy Hình 5.5a qua nếp gấp thẳng đứng, thanh ngang ở trên được nhân đôi sang hai bên tạo thành chữ T!',
  },
  {
    id: 'axis-g4-h55b',
    tab: 'axis',
    groupId: 'axis-g4',
    mode: 'paper-cut',
    variant: 'h55-b',
    title: 'Tranh luận 2 – Hình 5.5b (Dự đoán chữ cái)',
    shortTitle: 'Hình 5.5b: Dự đoán chữ gì?',
    sourceRef: 'Bài 21 – Tranh luận 2, Hình 5.5b, trang 101',
    foldType: 'single-vertical',
    steps: [
      {
        title: 'Bước 1: Quan sát mảnh giấy đã cắt (H.5.5b)',
        description: 'Mảnh giấy gồm một nét dọc bên trái và một nét xiên đi xuống chạm mép gấp bên phải. Hãy dự đoán chữ gì khi mở ra!',
      },
      {
        title: 'Bước 2: Mở dần mảnh giấy',
        description: 'Mở mảnh giấy sang phải quanh đường nếp gấp thẳng đứng.',
      },
      {
        title: 'Bước 3: Quan sát chữ cái thu được',
        description: 'Kiểm tra chữ cái hiện ra và vị trí trục đối xứng.',
      },
    ],
    predictQuestion: 'Theo em, khi mở mảnh giấy ở Hình 5.5b ra, ta sẽ nhận được chữ cái gì?',
    predictOptions: [
      { id: 'N', label: 'Chữ N', isCorrect: false },
      { id: 'M', label: 'Chữ M', isCorrect: true },
      { id: 'W', label: 'Chữ W', isCorrect: false },
      { id: 'V', label: 'Chữ V', isCorrect: false },
    ],
    observeQuestion: 'Nét xiên và nét dọc đối xứng sang bên phải tạo thành chữ cái nào?',
    overallConclusion:
      'Khi mở mảnh giấy Hình 5.5b qua nếp gấp đứng, nét xiên tạo thành chữ V ở giữa và hai nét dọc ở hai bên tạo thành chữ M!',
  },
  {
    id: 'axis-g4-h55c',
    tab: 'axis',
    groupId: 'axis-g4',
    mode: 'paper-cut',
    variant: 'h55-c',
    title: 'Tranh luận 2 – Hình 5.5c (Dự đoán chữ cái)',
    shortTitle: 'Hình 5.5c: Dự đoán chữ gì?',
    sourceRef: 'Bài 21 – Tranh luận 2, Hình 5.5c, trang 101',
    foldType: 'single-horizontal',
    steps: [
      {
        title: 'Bước 1: Quan sát mảnh giấy đã cắt (H.5.5c)',
        description: 'Mảnh giấy được gấp đôi theo mép ngang phía dưới. Hãy dự đoán chữ gì khi mở xuống dưới!',
      },
      {
        title: 'Bước 2: Mở dần mảnh giấy xuống dưới',
        description: 'Mở mảnh giấy xuống phía dưới quanh nếp gấp nằm ngang.',
      },
      {
        title: 'Bước 3: Quan sát chữ cái thu được',
        description: 'Kiểm tra chữ cái thu được và nếp gấp ngang ở giữa.',
      },
    ],
    predictQuestion: 'Theo em, khi mở mảnh giấy ở Hình 5.5c xuống dưới, ta sẽ nhận được chữ cái gì?',
    predictOptions: [
      { id: 'F', label: 'Chữ F', isCorrect: false },
      { id: 'C', label: 'Chữ C', isCorrect: false },
      { id: 'E', label: 'Chữ E', isCorrect: true },
      { id: 'H', label: 'Chữ H', isCorrect: false },
    ],
    observeQuestion: 'Khi mở mảnh giấy Hình 5.5c xuống dưới qua nếp gấp ngang, em nhận được chữ cái gì?',
    overallConclusion:
      'Khi mở mảnh giấy Hình 5.5c xuống dưới qua nếp gấp ngang, ta nhận được chữ E (có trục đối xứng nằm ngang trùng với nếp gấp)!',
  },

  // =========================================================================
  // NHÓM 5: MỞ RỘNG
  // =========================================================================
  {
    id: 'axis-g5-leaf',
    tab: 'axis',
    groupId: 'axis-g5',
    mode: 'axis-fold',
    title: 'Mở rộng – Chiếc lá đối xứng',
    shortTitle: 'Chiếc lá đối xứng',
    sourceRef: 'Bài 21 – Hoạt động mở rộng',
    hasSymmetry: true,
    axisCountLabel: '1 trục đối xứng',
    educationalNote:
      'Hình chiếc lá này được thiết kế đối xứng chính xác để học tập; lá trong tự nhiên có thể không hoàn toàn đối xứng.',
    candidateLines: [
      {
        id: 'midrib',
        label: 'Đường thẳng đi dọc gân chính chiếc lá',
        px: 0,
        py: 0,
        angleDeg: 90,
        isSymmetryAxis: true,
        lineTag: 'd',
        explanation:
          'Khi gấp dọc theo gân chính chiếc lá, hai nửa phiến lá và các đường gân phụ chồng khít hoàn toàn lên nhau.',
      },
      {
        id: 'horiz',
        label: 'Đường nằm ngang cắt ngang thân lá',
        px: 0,
        py: 0,
        angleDeg: 0,
        isSymmetryAxis: false,
        lineTag: 'd₂',
        explanation:
          'Đầu lá nhọn phía trên khác với bầu lá và cuống lá phía dưới nên khi gấp ngang không chồng khít.',
      },
      {
        id: 'slant',
        label: 'Đường xiên 35° qua tâm lá',
        px: 0,
        py: 0,
        angleDeg: 35,
        isSymmetryAxis: false,
        lineTag: 'd₃',
        explanation: 'Gấp theo đường xiên làm hai phần phiến lá lệch nhau rõ rệt, không chồng khít.',
      },
    ],
    allTrueAxes: [{ px: 0, py: 0, angleDeg: 90, label: 'd' }],
    predictQuestion: 'Trong các đường thẳng gợi ý, đường nào là trục đối xứng của chiếc lá mô hình này?',
    predictOptions: [
      { id: 'yes', label: 'Đường đang chọn là trục đối xứng', isCorrect: true },
      { id: 'no', label: 'Đường đang chọn không phải trục đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi gấp theo đường gân chính và các đường khác, em quan sát thấy điều gì?',
    overallConclusion:
      'Đường thẳng đi dọc gân chính là trục đối xứng duy nhất của mô hình chiếc lá này. Lưu ý rằng trong tự nhiên, chiếc lá thật thường chỉ gần đối xứng chứ không đối xứng tuyệt đối.',
    renderShape: () => (
      <g>
        {renderLeafHalf()}
        <g transform="scale(-1, 1)">{renderLeafHalf()}</g>
      </g>
    ),
  },
];
