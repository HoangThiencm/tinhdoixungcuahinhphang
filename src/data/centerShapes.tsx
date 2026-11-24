import React from 'react';
import type { ActivityGroup, SymmetryActivity } from '../types/symmetry';

export const CENTER_GROUPS: ActivityGroup[] = [
  {
    id: 'center-g1',
    tab: 'center',
    title: 'Nhóm 1: Khám phá hình có tâm đối xứng',
    subtitle: 'HĐ1 (H.5.6), HĐ2 (H.5.7) & Thực hành 1 (H.5.8) (Trang 103–105)',
  },
  {
    id: 'center-g2',
    tab: 'center',
    title: 'Nhóm 2: Tâm đối xứng của một số hình phẳng',
    subtitle: 'HĐ3, HĐ4 & Luyện tập 1 (Trang 104–105)',
  },
  {
    id: 'center-g3',
    tab: 'center',
    title: 'Nhóm 3: Luyện tập nhận biết',
    subtitle: 'Luyện tập 1 & Bài tập 5.5, 5.6, 5.7 (Trang 104, 107)',
  },
  {
    id: 'center-g4',
    tab: 'center',
    title: 'Nhóm 4: Vẽ thêm để tạo hình có tâm đối xứng',
    subtitle: 'Luyện tập 2 & Bài tập 5.9 trên lưới ô vuông (Trang 106–107)',
  },
  {
    id: 'center-g5',
    tab: 'center',
    title: 'Nhóm 5: Gấp và cắt giấy',
    subtitle: 'Hình 5.9 & Bài tập 5.8, 5.10 (Trang 106–107)',
  },
  /*
  {
    id: 'center-equilateral-triangle',
    tab: 'center', groupId: 'center-g3', mode: 'center-rotate',
    title: 'Chú ý – Tam giác đều', shortTitle: 'Tam giác đều',
    sourceRef: 'Bài 22 – Chú ý, trang 106', hasSymmetry: false,
    candidatePoints: [{ id: 'O', label: 'Tâm O', x: 0, y: 0, isSymmetryCenter: false, pointTag: 'O', explanation: 'Quay nửa vòng làm các đỉnh lệch vị trí.' }],
    predictQuestion: 'Tam giác đều có tâm đối xứng không?', observeQuestion: 'Kéo để quay nửa vòng.', overallConclusion: 'Tam giác đều không có tâm đối xứng.',
    renderShape: () => <polygon points="0,-124 108,72 -108,72" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />,
    renderOutline: () => <polygon points="0,-124 108,72 -108,72" {...OUTLINE_PROPS} />,
  },
  {
    id: 'center-six-star',
    tab: 'center', groupId: 'center-g3', mode: 'center-rotate',
    title: 'Thử thách nhỏ – Ngôi sao sáu cánh', shortTitle: 'Ngôi sao sáu cánh',
    sourceRef: 'Bài 22 – Thử thách nhỏ, trang 106', hasSymmetry: true,
    candidatePoints: [{ id: 'O', label: 'Tâm O', x: 0, y: 0, isSymmetryCenter: true, pointTag: 'O', explanation: 'Quay 180° thì các cánh sao chồng khít.' }],
    predictQuestion: 'Ngôi sao sáu cánh có tâm đối xứng không?', observeQuestion: 'Kéo để quay nửa vòng.', overallConclusion: 'Ngôi sao sáu cánh có tâm đối xứng O.',
    renderShape: () => <g fill="#C4B5FD" stroke="#6D28D9" strokeWidth="3"><polygon points="0,-130 112,65 -112,65" /><polygon points="0,130 112,-65 -112,-65" /></g>,
    renderOutline: () => <g {...OUTLINE_PROPS}><polygon points="0,-130 112,65 -112,65" /><polygon points="0,130 112,-65 -112,-65" /></g>,
  },
  {
    id: 'center-asean',
    tab: 'center', groupId: 'center-g3', mode: 'center-rotate',
    title: 'Thử thách nhỏ – Biểu tượng ASEAN', shortTitle: 'Biểu tượng ASEAN',
    sourceRef: 'Bài 22 – Thử thách nhỏ, trang 106', hasSymmetry: false,
    candidatePoints: [{ id: 'O', label: 'Tâm vòng tròn', x: 0, y: 0, isSymmetryCenter: false, pointTag: 'O', explanation: 'Bó lúa và màu sắc trên-dưới không chồng khít khi quay.' }],
    predictQuestion: 'Biểu tượng ASEAN có tâm đối xứng không?', observeQuestion: 'Kéo để quay nửa vòng.', overallConclusion: 'Biểu tượng ASEAN không có tâm đối xứng.',
    renderShape: () => <g><circle r="112" fill="#2563EB" stroke="#1E3A8A" strokeWidth="4" /><circle r="82" fill="#DC2626" /><g stroke="#FACC15" strokeWidth="7" strokeLinecap="round"><path d="M -40,48 Q -48,0 -26,-48" /><path d="M -20,52 Q -24,0 -13,-52" /><path d="M 0,54 Q 0,0 0,-54" /><path d="M 20,52 Q 24,0 13,-52" /><path d="M 40,48 Q 48,0 26,-48" /></g></g>,
    renderOutline: () => <circle r="112" {...OUTLINE_PROPS} />,
  },
  {
    id: 'center-snowflake',
    tab: 'center', groupId: 'center-g3', mode: 'center-rotate',
    title: 'Thử thách nhỏ – Bông tuyết sáu nhánh', shortTitle: 'Bông tuyết',
    sourceRef: 'Bài 22 – Thử thách nhỏ, trang 106', hasSymmetry: true,
    candidatePoints: [{ id: 'O', label: 'Tâm O', x: 0, y: 0, isSymmetryCenter: true, pointTag: 'O', explanation: 'Các nhánh đối diện chồng khít sau khi quay 180°.' }],
    predictQuestion: 'Bông tuyết có tâm đối xứng không?', observeQuestion: 'Kéo để quay nửa vòng.', overallConclusion: 'Bông tuyết có tâm đối xứng O.',
    renderShape: () => <g stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round"><g><line x1="-122" y1="0" x2="122" y2="0" /><line x1="66" y1="0" x2="38" y2="-24" /><line x1="-66" y1="0" x2="-38" y2="24" /></g><g transform="rotate(60)"><line x1="-122" y1="0" x2="122" y2="0" /><line x1="66" y1="0" x2="38" y2="-24" /><line x1="-66" y1="0" x2="-38" y2="24" /></g><g transform="rotate(120)"><line x1="-122" y1="0" x2="122" y2="0" /><line x1="66" y1="0" x2="38" y2="-24" /><line x1="-66" y1="0" x2="-38" y2="24" /></g></g>,
    renderOutline: () => <g stroke="#2563EB" strokeWidth="2.6" strokeDasharray="7 5"><line x1="-122" y1="0" x2="122" y2="0" /><line x1="-122" y1="0" x2="122" y2="0" transform="rotate(60)" /><line x1="-122" y1="0" x2="122" y2="0" transform="rotate(120)" /></g>,
  },
  */
];

// Helper: regular polygon points string
function regularPolygonPoints(sides: number, radius: number, startAngleDeg = 0): string {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = ((startAngleDeg + (360 / sides) * i) * Math.PI) / 180;
    pts.push(`${(Math.cos(a) * radius).toFixed(2)},${(Math.sin(a) * radius).toFixed(2)}`);
  }
  return pts.join(' ');
}

// Reusable dashed outline style props
const OUTLINE_PROPS = {
  fill: 'rgba(37, 99, 235, 0.05)',
  stroke: '#2563EB',
  strokeWidth: 2.6,
  strokeDasharray: '7 5',
  strokeLinejoin: 'round' as const,
};

// Curved blade path for 3-blade and 4-blade pinwheels (H.5.7b, H.5.7c)
const CURVED_BLADE_3 =
  'M 0,-18 C -10,-62 12,-104 42,-98 C 68,-92 64,-52 34,-34 C 22,-26 14,-20 12,-10 Z';
const CURVED_BLADE_4 =
  'M 0,-14 C -16,-56 -48,-94 -76,-84 C -100,-76 -92,-38 -56,-20 C -34,-10 -20,-8 -12,-4 Z';

// Heart-petal path pointing upward (for 4-leaf clover 5.5a)
const CLOVER_PETAL =
  'M 0,-4 C -18,-26 -42,-54 -34,-82 C -26,-106 -6,-104 0,-86 C 6,-104 26,-106 34,-82 C 42,-54 18,-26 0,-4 Z';

// Narrow flower petal (for 5.5b 5-petal purple flower)
const PURPLE_PETAL =
  'M 0,-10 C -18,-36 -26,-84 -10,-106 C -4,-114 4,-114 10,-106 C 26,-84 18,-36 0,-10 Z';

// Daisy petal (for 5.5c 12-petal pink flower)
const DAISY_PETAL =
  'M 0,-20 C -11,-46 -13,-86 -5,-106 C -2,-112 2,-112 5,-106 C 13,-86 11,-46 0,-20 Z';

// Broad rounded petal (for 5.5d 5-petal red flower)
const RED_PETAL =
  'M 0,-8 C -28,-22 -48,-62 -30,-90 C -16,-110 16,-110 30,-90 C 48,-62 28,-22 0,-8 Z';

// 4-way symmetric arrow cross path for Bài 5.6c (grid step = 22)
const ARROW_CROSS_56C = (() => {
  const s = 22;
  const pts = [
    [0, -5],
    [2.5, -2.5],
    [1, -2.5],
    [1, -1],
    [2.5, -1],
    [2.5, -2.5],
    [5, 0],
    [2.5, 2.5],
    [2.5, 1],
    [1, 1],
    [1, 2.5],
    [2.5, 2.5],
    [0, 5],
    [-2.5, 2.5],
    [-1, 2.5],
    [-1, 1],
    [-2.5, 1],
    [-2.5, 2.5],
    [-5, 0],
    [-2.5, -2.5],
    [-2.5, -1],
    [-1, -1],
    [-1, -2.5],
    [-2.5, -2.5],
  ];
  return 'M ' + pts.map(([x, y]) => `${x * s},${y * s}`).join(' L ') + ' Z';
})();

// 3-armed bent triskelion path for Bài 5.6d
function renderTriskelion56d(isOutline: boolean) {
  const stroke = isOutline ? '#2563EB' : '#0F172A';
  const dash = isOutline ? '7 5' : undefined;
  return (
    <g>
      {[0, 120, 240].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <path
            d="M 0,0 L 0,-94 L -48,-76"
            fill="none"
            stroke={stroke}
            strokeWidth={isOutline ? 3 : 4}
            strokeDasharray={dash}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </g>
  );
}

// Curved arrow for roundabout sign (Luyện tập 1 bài 3d - 3 arrows at 120°)
const ROUNDABOUT_ARROW_PATH =
  'M 12,-70 A 70,70 0 0,1 66,-24 L 78,-30 L 64,2 L 38,-14 L 50,-20 A 52,52 0 0,0 10,-52 Z';

const CENTER_ACTIVITIES_RAW: SymmetryActivity[] = [
  {
    id: 'center-equilateral-triangle', tab: 'center', groupId: 'center-g3', mode: 'center-rotate', title: 'Chú ý – Tam giác đều', shortTitle: 'Tam giác đều', sourceRef: 'Bài 22 – Chú ý, trang 106', hasSymmetry: false,
    candidatePoints: [{ id: 'O', label: 'Tâm O', x: 0, y: 0, isSymmetryCenter: false, pointTag: 'O', explanation: 'Quay nửa vòng làm các đỉnh lệch vị trí.' }], predictQuestion: 'Tam giác đều có tâm đối xứng không?', observeQuestion: 'Kéo để quay nửa vòng.', overallConclusion: 'Tam giác đều không có tâm đối xứng.',
    renderShape: () => <polygon points="0,-124 108,72 -108,72" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />, renderOutline: () => <polygon points="0,-124 108,72 -108,72" {...OUTLINE_PROPS} />,
  },
  {
    id: 'center-six-star', tab: 'center', groupId: 'center-g3', mode: 'center-rotate', title: 'Thử thách nhỏ – Ngôi sao sáu cánh', shortTitle: 'Ngôi sao sáu cánh', sourceRef: 'Bài 22 – Thử thách nhỏ, trang 106', hasSymmetry: true,
    candidatePoints: [{ id: 'O', label: 'Tâm O', x: 0, y: 0, isSymmetryCenter: true, pointTag: 'O', explanation: 'Quay 180° thì các cánh sao chồng khít.' }], predictQuestion: 'Ngôi sao sáu cánh có tâm đối xứng không?', observeQuestion: 'Kéo để quay nửa vòng.', overallConclusion: 'Ngôi sao sáu cánh có tâm đối xứng O.',
    renderShape: () => <g fill="none" stroke="#6D28D9" strokeWidth="4" strokeLinejoin="round"><polygon points="0,-130 112,65 -112,65" /><polygon points="0,130 112,-65 -112,-65" /></g>, renderOutline: () => <g {...OUTLINE_PROPS}><polygon points="0,-130 112,65 -112,65" /><polygon points="0,130 112,-65 -112,-65" /></g>,
  },
  {
    id: 'center-asean', tab: 'center', groupId: 'center-g3', mode: 'center-rotate', title: 'Thử thách nhỏ – Biểu tượng ASEAN', shortTitle: 'Biểu tượng ASEAN', sourceRef: 'Bài 22 – Thử thách nhỏ, trang 106', hasSymmetry: true,
    candidatePoints: [{ id: 'O', label: 'Tâm O', x: 0, y: 0, isSymmetryCenter: true, pointTag: 'O', explanation: 'Quay 180° thì vòng tròn và bó lúa chồng khít.' }], predictQuestion: 'Biểu tượng ASEAN có tâm đối xứng không?', observeQuestion: 'Kéo để quay nửa vòng.', overallConclusion: 'Biểu tượng ASEAN có tâm đối xứng O.',
    renderShape: () => <g><circle r="112" fill="#2563EB" stroke="#1E3A8A" strokeWidth="4" /><circle r="96" fill="none" stroke="white" strokeWidth="4" /><circle r="82" fill="#DC2626" /><g fill="none" stroke="#FACC15" strokeWidth="6" strokeLinecap="round">{[-42, -21, 0, 21, 42].map((x) => <path key={x} d={`M ${x},-54 Q ${x * 1.35},0 ${-x},54`} />)}</g></g>, renderOutline: () => <g fill="none" {...OUTLINE_PROPS}><circle r="112" /><circle r="96" /><circle r="82" />{[-42, -21, 0, 21, 42].map((x) => <path key={x} d={`M ${x},-54 Q ${x * 1.35},0 ${-x},54`} />)}</g>,
  },
  {
    id: 'center-snowflake', tab: 'center', groupId: 'center-g3', mode: 'center-rotate', title: 'Thử thách nhỏ – Bông tuyết sáu nhánh', shortTitle: 'Bông tuyết', sourceRef: 'Bài 22 – Thử thách nhỏ, trang 106', hasSymmetry: true,
    candidatePoints: [{ id: 'O', label: 'Tâm O', x: 0, y: 0, isSymmetryCenter: true, pointTag: 'O', explanation: 'Các nhánh đối diện chồng khít sau khi quay 180°.' }], predictQuestion: 'Bông tuyết có tâm đối xứng không?', observeQuestion: 'Kéo để quay nửa vòng.', overallConclusion: 'Bông tuyết có tâm đối xứng O.',
    renderShape: () => <g stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round">{[0, 60, 120].map((deg) => <g key={deg} transform={`rotate(${deg})`}><line x1="-122" y1="0" x2="122" y2="0" /><line x1="-82" y1="0" x2="-52" y2="-28" /><line x1="82" y1="0" x2="52" y2="28" /></g>)}</g>, renderOutline: () => <g fill="none" {...OUTLINE_PROPS} strokeLinecap="round">{[0, 60, 120].map((deg) => <g key={deg} transform={`rotate(${deg})`}><line x1="-122" y1="0" x2="122" y2="0" /><line x1="-82" y1="0" x2="-52" y2="-28" /><line x1="82" y1="0" x2="52" y2="28" /></g>)}</g>,
  },
  // =========================================================================
  // NHÓM 1: KHÁM PHÁ HÌNH CÓ TÂM ĐỐI XỨNG
  // =========================================================================
  {
    id: 'center-hd1-pinwheel2',
    tab: 'center',
    groupId: 'center-g1',
    mode: 'center-rotate',
    title: 'Chong chóng hai cánh (Hình 5.6)',
    shortTitle: 'Chong chóng hai cánh (H.5.6)',
    sourceRef: 'Bài 22 – HĐ1, Hình 5.6, trang 103',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Điểm ghim O ở chính giữa',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Khi quay chong chóng đúng một nửa vòng (180°) quanh điểm O, cánh trên quay xuống trùng khít cánh dưới và cánh dưới quay lên trùng khít cánh trên. Chong chóng trùng khít hoàn toàn với viền xanh ban đầu!',
      },
    ],
    predictQuestion: 'Khi quay chiếc chong chóng hai cánh đúng nửa vòng (180°) quanh điểm O, nó có khớp với viền màu xanh ban đầu không?',
    predictOptions: [
      { id: 'yes', label: 'Có, chồng khít hoàn toàn với viền ban đầu', isCorrect: true },
      { id: 'no', label: 'Không chồng khít', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay 180° quanh điểm O, hình chong chóng có trùng với đường viền nét đứt ở vị trí ban đầu không?',
    overallConclusion:
      'Chong chóng hai cánh có tâm đối xứng là điểm O: sau khi quay đúng nửa vòng (180°) quanh điểm O, hình thu được chồng khít với chính nó ở vị trí ban đầu.',
    renderShape: () => (
      <g>
        {/* Upper blade */}
        <polygon points="0,0 0,-116 54,-116" fill="#EF4444" stroke="#991B1B" strokeWidth="2.4" strokeLinejoin="round" />
        {/* Lower blade (exact 180° counterpart around (0,0)) */}
        <polygon points="0,0 0,116 -54,116" fill="#EF4444" stroke="#991B1B" strokeWidth="2.4" strokeLinejoin="round" />
      </g>
    ),
    renderOutline: () => (
      <g>
        <polygon points="0,0 0,-116 54,-116" {...OUTLINE_PROPS} />
        <polygon points="0,0 0,116 -54,116" {...OUTLINE_PROPS} />
      </g>
    ),
  },
  {
    id: 'center-h57a-circle',
    tab: 'center',
    groupId: 'center-g1',
    mode: 'center-rotate',
    title: 'Hình 5.7a – Hình tròn',
    shortTitle: 'Hình 5.7a: Hình tròn',
    sourceRef: 'Bài 22 – HĐ2, Hình 5.7a, trang 104',
    hasSymmetry: true,
    markerA: {
      x: -102,
      y: 0,
      note: 'Điểm A trên viền chỉ là dấu mốc để theo dõi chuyển động quay, không làm thay đổi tính đối xứng của hình tròn.',
    },
    educationalNote:
      'Lưu ý: Điểm A đánh dấu trên đường viền chỉ dùng làm mốc quan sát chuyển động quay nửa vòng (từ bên trái sang bên phải), không xem là bộ phận làm mất tính đối xứng của hình tròn.',
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Tâm O của hình tròn',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Khi quay hình tròn 180° quanh tâm O, điểm mốc A chuyển sang vị trí đối diện, còn toàn bộ hình tròn chồng khít hoàn toàn với vị trí ban đầu. Vậy O là tâm đối xứng của hình tròn.',
      },
      {
        id: 'off-center',
        label: 'Điểm O′ lệch khỏi tâm (để so sánh)',
        x: 42,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O′',
        explanation:
          'Khi quay 180° quanh điểm O′ không phải tâm, hình tròn bị dịch hẳn sang bên phải và không trùng với viền ban đầu.',
      },
    ],
    predictQuestion: 'Sau khi quay nửa vòng (180°) quanh tâm O, hình tròn có chồng khít với vị trí ban đầu không?',
    predictOptions: [
      { id: 'yes', label: 'Có, hình tròn có tâm đối xứng O', isCorrect: true },
      { id: 'no', label: 'Không chồng khít', isCorrect: false },
    ],
    observeQuestion: 'Theo dõi điểm mốc A di chuyển khi quay 180° quanh điểm đã chọn. Toàn bộ hình tròn có trùng vị trí ban đầu không?',
    overallConclusion:
      'Hình tròn là hình có tâm đối xứng, và tâm đối xứng chính là tâm O của hình tròn.',
    renderShape: () => (
      <circle cx="0" cy="0" r="102" fill="#38BDF8" fillOpacity="0.82" stroke="#0369A1" strokeWidth="3" />
    ),
    renderOutline: () => <circle cx="0" cy="0" r="102" {...OUTLINE_PROPS} />,
  },
  {
    id: 'center-h57b-pinwheel3',
    tab: 'center',
    groupId: 'center-g1',
    mode: 'center-rotate',
    title: 'Hình 5.7b – Chong chóng ba cánh',
    shortTitle: 'Hình 5.7b: Chong chóng 3 cánh',
    sourceRef: 'Bài 22 – HĐ2, Hình 5.7b, trang 104',
    hasSymmetry: false,
    markerA: {
      x: -76,
      y: 44,
      note: 'Điểm A giúp theo dõi một cánh quạt khi quay.',
    },
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Tâm quay O của chong chóng',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Chong chóng có 3 cánh đặt cách đều 120°. Sau khi quay nửa vòng (180°), cả 3 cánh đều nằm vào khoảng trống giữa các cánh ban đầu nên KHÔNG chồng khít với viền nét đứt!',
      },
    ],
    predictQuestion: 'Chong chóng ba cánh (Hình 5.7b) khi quay 180° quanh O có chồng khít với vị trí ban đầu không?',
    predictOptions: [
      { id: 'yes', label: 'Có, chồng khít', isCorrect: false },
      { id: 'no', label: 'Không chồng khít', isCorrect: true },
    ],
    observeQuestion: 'Khi góc quay đạt đúng 180°, vị trí 3 cánh đỏ so với đường viền nét đứt màu xanh như thế nào?',
    overallConclusion:
      'Chong chóng ba cánh KHÔNG có tâm đối xứng: sau khi quay 180° quanh tâm O, ba cánh không trùng khít với vị trí ban đầu.',
    renderShape: () => (
      <g>
        {[0, 120, 240].map((deg) => (
          <path
            key={deg}
            d={CURVED_BLADE_3}
            transform={`rotate(${deg})`}
            fill="#F87171"
            stroke="#991B1B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        ))}
        <circle cx="0" cy="0" r="22" fill="#FCA5A5" stroke="#991B1B" strokeWidth="2.5" />
      </g>
    ),
    renderOutline: () => (
      <g>
        {[0, 120, 240].map((deg) => (
          <path key={deg} d={CURVED_BLADE_3} transform={`rotate(${deg})`} {...OUTLINE_PROPS} />
        ))}
        <circle cx="0" cy="0" r="22" {...OUTLINE_PROPS} />
      </g>
    ),
  },
  {
    id: 'center-h57c-pinwheel4',
    tab: 'center',
    groupId: 'center-g1',
    mode: 'center-rotate',
    title: 'Hình 5.7c – Chong chóng bốn cánh',
    shortTitle: 'Hình 5.7c: Chong chóng 4 cánh',
    sourceRef: 'Bài 22 – HĐ2, Hình 5.7c, trang 104',
    hasSymmetry: true,
    markerA: {
      x: -76,
      y: -82,
      note: 'Điểm A giúp theo dõi vị trí cánh quạt khi quay.',
    },
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Tâm quay O của chong chóng',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Chong chóng bốn cánh đặt đều nhau 90°. Khi quay 180° quanh điểm O, mỗi cánh quay đến đúng vị trí của cánh đối diện nên hình chồng khít hoàn toàn với đường viền ban đầu!',
      },
    ],
    predictQuestion: 'Chong chóng bốn cánh (Hình 5.7c) có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có, chồng khít khi quay 180°', isCorrect: true },
      { id: 'no', label: 'Không chồng khít', isCorrect: false },
    ],
    observeQuestion: 'So sánh Hình 5.7b (3 cánh) và Hình 5.7c (4 cánh) sau khi quay đủ 180° quanh O.',
    overallConclusion:
      'Chong chóng bốn cánh CÓ tâm đối xứng là điểm O (khác với chong chóng ba cánh không có tâm đối xứng).',
    renderShape: () => (
      <g>
        {[0, 90, 180, 270].map((deg) => (
          <path
            key={deg}
            d={CURVED_BLADE_4}
            transform={`rotate(${deg})`}
            fill="#38BDF8"
            stroke="#0369A1"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        ))}
        <circle cx="0" cy="0" r="16" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2.5" />
      </g>
    ),
    renderOutline: () => (
      <g>
        {[0, 90, 180, 270].map((deg) => (
          <path key={deg} d={CURVED_BLADE_4} transform={`rotate(${deg})`} {...OUTLINE_PROPS} />
        ))}
        <circle cx="0" cy="0" r="16" {...OUTLINE_PROPS} />
      </g>
    ),
  },
  {
    id: 'center-h58-flower4',
    tab: 'center',
    groupId: 'center-g1',
    mode: 'paper-cut',
    variant: 'h58-flower4',
    title: 'Thực hành 1 – Cắt và quay hoa bốn cánh (Hình 5.8)',
    shortTitle: 'Hoa bốn cánh (H.5.8)',
    sourceRef: 'Bài 22 – Thực hành 1, Hình 5.8, trang 105',
    foldType: 'double-quarter',
    allowPostUnfoldRotate: true,
    steps: [
      {
        title: 'Bước 1: Chuẩn bị tờ giấy vuông (H.5.8a)',
        description: 'Gấp đôi tờ giấy hình vuông hai lần theo đường ngang và đường dọc.',
      },
      {
        title: 'Bước 2: Gấp lần thứ nhất (còn nửa tờ giấy)',
        description: 'Gấp đôi tờ giấy theo đường dọc chính giữa.',
      },
      {
        title: 'Bước 3: Gấp lần thứ hai (còn góc phần tư)',
        description: 'Gấp đôi tiếp theo đường ngang để tạo thành góc phần tư vuông.',
      },
      {
        title: 'Bước 4: Cắt đường cong cánh hoa (H.5.8b)',
        description: 'Vẽ và cắt một cung tròn trên góc phần tư đã gấp rồi loại bỏ phần thừa.',
      },
      {
        title: 'Bước 5: Mở tờ giấy thành hoa bốn cánh (H.5.8c)',
        description: 'Mở hai lần nếp gấp để thu được bông hoa bốn cánh màu vàng, đánh dấu giao điểm hai nếp gấp là O.',
      },
      {
        title: 'Bước 6: Quay nửa vòng 180° quanh O (H.5.8d)',
        description: 'Ghim tại điểm O và quay bông hoa 180° để kiểm tra xem hoa có chồng khít với viền ban đầu không!',
      },
    ],
    predictQuestion: 'Bông hoa bốn cánh cắt được ở Hình 5.8 có nhận giao điểm O của hai nếp gấp làm tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có, O là tâm đối xứng của bông hoa', isCorrect: true },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi mở giấy và quay bông hoa bốn cánh 180° quanh O, em quan sát thấy gì?',
    overallConclusion:
      'Bông hoa bốn cánh nhận giao điểm O của hai đường nếp gấp làm tâm đối xứng: khi quay 180° quanh O, bông hoa chồng khít hoàn toàn với vị trí ban đầu.',
  },

  // =========================================================================
  // NHÓM 2: TÂM ĐỐI XỨNG CỦA MỘT SỐ HÌNH PHẲNG
  // =========================================================================
  {
    id: 'center-g2-parallelogram',
    tab: 'center',
    groupId: 'center-g2',
    mode: 'center-rotate',
    title: 'Hình bình hành',
    shortTitle: '1. Hình bình hành',
    sourceRef: 'Bài 22 – HĐ3, trang 105',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Giao điểm O của hai đường chéo',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Khi quay hình bình hành 180° quanh giao điểm O của hai đường chéo, mỗi đỉnh chuyển sang đúng vị trí đỉnh đối diện nên hình bình hành chồng khít hoàn toàn!',
      },
      {
        id: 'wrong-pt',
        label: 'Điểm O′ lệch khỏi giao điểm hai đường chéo',
        x: 56,
        y: -26,
        isSymmetryCenter: false,
        pointTag: 'O′',
        explanation:
          'Khi quay 180° quanh điểm O′ không phải giao điểm hai đường chéo, hình bình hành bị lệch hẳn ra ngoài đường viền ban đầu.',
      },
    ],
    predictQuestion: 'Điểm đang chọn có phải là tâm đối xứng của hình bình hành không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Hãy thử quay quanh giao điểm hai đường chéo O và quanh điểm lệch O′ để đối chiếu.',
    overallConclusion:
      'Hình bình hành là hình có tâm đối xứng. Tâm đối xứng của hình bình hành là giao điểm O của hai đường chéo.',
    renderShape: () => (
      <polygon
        points="-84,-68 136,-68 84,68 -136,68"
        fill="#F97316"
        fillOpacity="0.82"
        stroke="#9A3412"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => (
      <polygon points="-84,-68 136,-68 84,68 -136,68" {...OUTLINE_PROPS} />
    ),
    renderReferenceOverlay: () => (
      <g stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4">
        <line x1="-84" y1="-68" x2="84" y2="68" />
        <line x1="136" y1="-68" x2="-136" y2="68" />
      </g>
    ),
  },
  {
    id: 'center-g2-square',
    tab: 'center',
    groupId: 'center-g2',
    mode: 'center-rotate',
    title: 'Hình vuông',
    shortTitle: '2. Hình vuông',
    sourceRef: 'Bài 22 – HĐ4, trang 105',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Giao điểm O của hai đường chéo',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Khi quay hình vuông 180° quanh giao điểm O của hai đường chéo, hình vuông chồng khít hoàn toàn với vị trí ban đầu.',
      },
      {
        id: 'wrong-mid',
        label: 'Trung điểm một cạnh (để đối chiếu)',
        x: 0,
        y: -88,
        isSymmetryCenter: false,
        pointTag: 'O′',
        explanation:
          'Khi quay 180° quanh trung điểm cạnh trên, hình vuông lật hẳn lên phía trên và không trùng với vị trí ban đầu.',
      },
    ],
    predictQuestion: 'Điểm đang chọn có phải là tâm đối xứng của hình vuông không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay 180° quanh điểm được chọn, hình vuông có khớp với đường viền nét đứt không?',
    overallConclusion:
      'Hình vuông có tâm đối xứng là giao điểm O của hai đường chéo.',
    renderShape: () => (
      <rect
        x="-88"
        y="-88"
        width="176"
        height="176"
        fill="#FEF08A"
        fillOpacity="0.88"
        stroke="#854D0E"
        strokeWidth="3"
      />
    ),
    renderOutline: () => <rect x="-88" y="-88" width="176" height="176" {...OUTLINE_PROPS} />,
    renderReferenceOverlay: () => (
      <g stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4">
        <line x1="-88" y1="-88" x2="88" y2="88" />
        <line x1="88" y1="-88" x2="-88" y2="88" />
      </g>
    ),
  },
  {
    id: 'center-g2-rectangle',
    tab: 'center',
    groupId: 'center-g2',
    mode: 'center-rotate',
    title: 'Hình chữ nhật',
    shortTitle: '3. Hình chữ nhật',
    sourceRef: 'Bài 22 – HĐ4, trang 105',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Giao điểm O của hai đường chéo',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Quay hình chữ nhật 180° quanh giao điểm O của hai đường chéo làm các đỉnh và cạnh đối diện đổi chỗ cho nhau, trùng khít hoàn toàn!',
      },
      {
        id: 'wrong-pt',
        label: 'Điểm O′ lệch tâm bên trong hình',
        x: -44,
        y: 22,
        isSymmetryCenter: false,
        pointTag: 'O′',
        explanation: 'Hình chữ nhật sau khi quay 180° quanh O′ bị dịch lệch khỏi đường viền ban đầu.',
      },
    ],
    predictQuestion: 'Điểm đang chọn có phải là tâm đối xứng của hình chữ nhật không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay 180° quanh điểm đã chọn, hình chữ nhật có chồng khít vị trí ban đầu không?',
    overallConclusion:
      'Hình chữ nhật có tâm đối xứng là giao điểm O của hai đường chéo.',
    renderShape: () => (
      <rect
        x="-124"
        y="-74"
        width="248"
        height="148"
        fill="#A3E635"
        fillOpacity="0.82"
        stroke="#3F6212"
        strokeWidth="3"
      />
    ),
    renderOutline: () => <rect x="-124" y="-74" width="248" height="148" {...OUTLINE_PROPS} />,
    renderReferenceOverlay: () => (
      <g stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4">
        <line x1="-124" y1="-74" x2="124" y2="74" />
        <line x1="124" y1="-74" x2="-124" y2="74" />
      </g>
    ),
  },
  {
    id: 'center-g2-hexagon',
    tab: 'center',
    groupId: 'center-g2',
    mode: 'center-rotate',
    title: 'Hình lục giác đều',
    shortTitle: '4. Hình lục giác đều',
    sourceRef: 'Bài 22 – HĐ4, trang 105',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Giao điểm O của các đường chéo chính',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Khi quay lục giác đều 180° quanh giao điểm O của các đường chéo chính, mỗi đỉnh trùng khít lên đỉnh đối diện của nó.',
      },
      {
        id: 'wrong-pt',
        label: 'Điểm O′ lệch tâm (để đối chiếu)',
        x: 42,
        y: 20,
        isSymmetryCenter: false,
        pointTag: 'O′',
        explanation: 'Quay quanh điểm O′ không phải tâm làm hình lục giác lệch hẳn vị trí ban đầu.',
      },
    ],
    predictQuestion: 'Điểm đang chọn có phải là tâm đối xứng của hình lục giác đều không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay 180° quanh điểm đã chọn, 6 đỉnh của lục giác đều có trùng với đường viền ban đầu không?',
    overallConclusion:
      'Hình lục giác đều có tâm đối xứng là giao điểm O của các đường chéo chính.',
    renderShape: () => (
      <polygon
        points={regularPolygonPoints(6, 108, 0)}
        fill="#F9A8D4"
        fillOpacity="0.86"
        stroke="#9D174D"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => <polygon points={regularPolygonPoints(6, 108, 0)} {...OUTLINE_PROPS} />,
    renderReferenceOverlay: () => (
      <g stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4">
        <line x1="-108" y1="0" x2="108" y2="0" />
        <line x1="-54" y1="-93.5" x2="54" y2="93.5" />
        <line x1="54" y1="-93.5" x2="-54" y2="93.5" />
      </g>
    ),
  },
  {
    id: 'center-g2-rhombus',
    tab: 'center',
    groupId: 'center-g2',
    mode: 'center-rotate',
    title: 'Hình thoi',
    shortTitle: '5. Hình thoi',
    sourceRef: 'Bài 22 – HĐ4, trang 105',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'center-O',
        label: 'Giao điểm O của hai đường chéo',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Khi quay hình thoi 180° quanh giao điểm O của hai đường chéo, hai đỉnh đối nhau đổi chỗ cho nhau và hình thoi chồng khít hoàn toàn.',
      },
      {
        id: 'wrong-pt',
        label: 'Điểm O′ lệch tâm (để đối chiếu)',
        x: -48,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O′',
        explanation: 'Quay quanh điểm O′ lệch tâm làm hình thoi dịch sang trái và không trùng với viền ban đầu.',
      },
    ],
    predictQuestion: 'Điểm đang chọn có phải là tâm đối xứng của hình thoi không?',
    predictOptions: [
      { id: 'yes', label: 'Có, là tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Bật đường chéo tham chiếu và quay 180° quanh O. Em thấy điều gì?',
    overallConclusion:
      'Hình thoi có tâm đối xứng là giao điểm O của hai đường chéo.',
    renderShape: () => (
      <polygon
        points="0,-84 140,0 0,84 -140,0"
        fill="#38BDF8"
        fillOpacity="0.82"
        stroke="#0369A1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => <polygon points="0,-84 140,0 0,84 -140,0" {...OUTLINE_PROPS} />,
    renderReferenceOverlay: () => (
      <g stroke="#475569" strokeWidth="1.8" strokeDasharray="5 4">
        <line x1="-140" y1="0" x2="140" y2="0" />
        <line x1="0" y1="-84" x2="0" y2="84" />
      </g>
    ),
  },
  {
    id: 'center-g2-segment',
    tab: 'center',
    groupId: 'center-g2',
    mode: 'center-rotate',
    title: 'Đoạn thẳng AB',
    shortTitle: '6. Đoạn thẳng',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 1), trang 104',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'midpoint-O',
        label: 'Trung điểm O của đoạn thẳng AB',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Khi quay đoạn thẳng AB một nửa vòng (180°) quanh trung điểm O, đầu mút A chuyển đến đúng vị trí đầu mút B và đầu mút B chuyển đến đúng vị trí A. Đoạn thẳng chồng khít lên chính nó!',
      },
      {
        id: 'wrong-pt',
        label: 'Điểm O′ không phải trung điểm',
        x: 46,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O′',
        explanation:
          'Vì O′ gần B hơn A nên khi quay 180° quanh O′, đầu mút A văng ra xa bên phải, không trùng với đoạn thẳng ban đầu.',
      },
    ],
    predictQuestion: 'Đoạn thẳng AB là một hình có tâm đối xứng. Tâm đối xứng của nó là điểm nào?',
    predictOptions: [
      { id: 'mid', label: 'Trung điểm O của đoạn thẳng AB', isCorrect: true },
      { id: 'end', label: 'Một đầu mút của đoạn thẳng', isCorrect: false },
    ],
    observeQuestion: 'Quan sát hai đầu mút A và B khi quay 180° quanh điểm đã chọn.',
    overallConclusion:
      'Đoạn thẳng AB có tâm đối xứng chính là trung điểm O của đoạn thẳng đó.',
    renderShape: () => (
      <g>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#0D9488" strokeWidth="8" strokeLinecap="round" />
        <circle cx="-120" cy="0" r="6" fill="#0F172A" />
        <circle cx="120" cy="0" r="6" fill="#0F172A" />
        <text x="-132" y="-16" fontSize="16" fontWeight="700" fill="#0F172A">
          A
        </text>
        <text x="120" y="-16" fontSize="16" fontWeight="700" fill="#0F172A">
          B
        </text>
      </g>
    ),
    renderOutline: () => (
      <g>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#2563EB" strokeWidth="10" strokeOpacity="0.25" strokeLinecap="round" />
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="7 5" />
      </g>
    ),
    renderReferenceOverlay: () => (
      <g stroke="#475569" strokeWidth="2">
        {/* Equal segment ticks on OA and OB */}
        <line x1="-60" y1="-8" x2="-60" y2="8" />
        <line x1="60" y1="-8" x2="60" y2="8" />
      </g>
    ),
  },

  // =========================================================================
  // NHÓM 3: LUYỆN TẬP NHẬN BIẾT (Trang 104 & 107)
  // =========================================================================
  // --- Chữ cái H, K, M, N, X ---
  {
    id: 'center-lt1-H',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 – Chữ cái H',
    shortTitle: 'Chữ cái H (LT1)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 2), trang 104',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'O',
        label: 'Điểm O ở chính giữa thanh ngang',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation: 'Khi quay chữ H 180° quanh trung điểm thanh ngang, hình thu được chồng khít hoàn toàn với chữ H ban đầu.',
      },
    ],
    predictQuestion: 'Chữ cái H có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay 180° quanh O, chữ H có trùng với đường viền nét đứt ban đầu không?',
    overallConclusion: 'Chữ cái H CÓ tâm đối xứng là trung điểm O của thanh ngang ở giữa.',
    renderShape: () => (
      <path
        d="M -68,-98 L -34,-98 L -34,-16 L 34,-16 L 34,-98 L 68,-98 L 68,98 L 34,98 L 34,16 L -34,16 L -34,98 L -68,98 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => (
      <path
        d="M -68,-98 L -34,-98 L -34,-16 L 34,-16 L 34,-98 L 68,-98 L 68,98 L 34,98 L 34,16 L -34,16 L -34,98 L -68,98 Z"
        {...OUTLINE_PROPS}
      />
    ),
  },
  {
    id: 'center-lt1-K',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 – Chữ cái K',
    shortTitle: 'Chữ cái K (LT1)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 2), trang 104',
    hasSymmetry: false,
    candidatePoints: [
      {
        id: 'O',
        label: 'Điểm O ở chính giữa khung chữ K',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Khi quay chữ K 180°, nét thẳng đứng chuyển sang bên phải còn hai nét xiên quay sang bên trái nên hoàn toàn KHÔNG chồng khít!',
      },
    ],
    predictQuestion: 'Chữ cái K có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi quay chữ K nửa vòng (180°), chữ K quay về hướng nào so với viền ban đầu?',
    overallConclusion: 'Chữ cái K KHÔNG có tâm đối xứng.',
    renderShape: () => (
      <path
        d="M -66,-98 L -32,-98 L -32,-14 L 38,-98 L 78,-98 L 8,-12 L 82,98 L 40,98 L -14,12 L -32,32 L -32,98 L -66,98 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => (
      <path
        d="M -66,-98 L -32,-98 L -32,-14 L 38,-98 L 78,-98 L 8,-12 L 82,98 L 40,98 L -14,12 L -32,32 L -32,98 L -66,98 Z"
        {...OUTLINE_PROPS}
      />
    ),
  },
  {
    id: 'center-lt1-M',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 – Chữ cái M',
    shortTitle: 'Chữ cái M (LT1)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 2), trang 104',
    hasSymmetry: false,
    candidatePoints: [
      {
        id: 'O',
        label: 'Điểm O ở chính giữa chữ M',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Khi quay chữ M 180° quanh O, chữ M bị lộn ngược thành hình giống chữ W nên không chồng khít với chữ M ban đầu!',
      },
    ],
    predictQuestion: 'Chữ cái M có trục đối xứng dọc, vậy nó có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi quay chữ M 180°, hình thu được trông giống chữ gì và có trùng viền ban đầu không?',
    overallConclusion:
      'Chữ cái M KHÔNG có tâm đối xứng (dù chữ M có trục đối xứng thẳng đứng). Quay 180° biến chữ M thành dạng chữ W ngược.',
    renderShape: () => (
      <path
        d="M -86,98 L -86,-98 L -48,-98 L 0,10 L 48,-98 L 86,-98 L 86,98 L 54,98 L 54,-38 L 12,56 L -12,56 L -54,-38 L -54,98 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => (
      <path
        d="M -86,98 L -86,-98 L -48,-98 L 0,10 L 48,-98 L 86,-98 L 86,98 L 54,98 L 54,-38 L 12,56 L -12,56 L -54,-38 L -54,98 Z"
        {...OUTLINE_PROPS}
      />
    ),
  },
  {
    id: 'center-lt1-N',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 – Chữ cái N',
    shortTitle: 'Chữ cái N (LT1)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 2), trang 104',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'O',
        label: 'Trung điểm O của nét chéo',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Khi quay chữ N 180° quanh trung điểm O của nét chéo, nét dọc trái trùng khít nét dọc phải và nét chéo trùng khít lên chính nó! Chữ N CÓ tâm đối xứng (dù không có trục đối xứng).',
      },
    ],
    predictQuestion: 'Chữ cái N không có trục đối xứng — vậy nó có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay chữ N đủ 180° quanh điểm O ở giữa nét chéo, em thấy điều gì bất ngờ?',
    overallConclusion:
      'Chữ cái N CÓ tâm đối xứng là trung điểm O của nét chéo! Đây là ví dụ tiêu biểu cho thấy một hình có thể có tâm đối xứng dù không có trục đối xứng.',
    renderShape: () => (
      <path
        d="M -72,98 L -72,-98 L -36,-98 L 38,34 L 38,-98 L 72,-98 L 72,98 L 36,98 L -38,-34 L -38,98 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => (
      <path
        d="M -72,98 L -72,-98 L -36,-98 L 38,34 L 38,-98 L 72,-98 L 72,98 L 36,98 L -38,-34 L -38,98 Z"
        {...OUTLINE_PROPS}
      />
    ),
  },
  {
    id: 'center-lt1-X',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 – Chữ cái X',
    shortTitle: 'Chữ cái X (LT1)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 2), trang 104',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'O',
        label: 'Giao điểm O của hai nét chéo',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation: 'Khi quay chữ X 180° quanh giao điểm hai nét chéo, chữ X chồng khít hoàn toàn với vị trí ban đầu.',
      },
    ],
    predictQuestion: 'Chữ cái X có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay chữ X nửa vòng quanh O, hình có khớp hoàn toàn với đường viền nét đứt không?',
    overallConclusion: 'Chữ cái X CÓ tâm đối xứng là giao điểm O của hai nét chéo.',
    renderShape: () => (
      <path
        d="M -74,-98 L -34,-98 L 0,-28 L 34,-98 L 74,-98 L 22,0 L 74,98 L 34,98 L 0,28 L -34,98 L -74,98 L -22,0 Z"
        fill="#0EA5E9"
        stroke="#0369A1"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => (
      <path
        d="M -74,-98 L -34,-98 L 0,-28 L 34,-98 L 74,-98 L 22,0 L 74,98 L 34,98 L 0,28 L -34,98 L -74,98 L -22,0 Z"
        {...OUTLINE_PROPS}
      />
    ),
  },

  // --- Biển báo & biểu tượng Luyện tập 1 bài 3 (trang 104) ---
  {
    id: 'center-lt1-sign-a',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 (3a) – Biển cấm dừng xe và đỗ xe',
    shortTitle: 'Biển báo 3a (Cấm dừng đỗ)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 3a), trang 104',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của biển báo',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation: 'Cả vòng tròn và dấu gạch chéo X đều trùng khít hoàn toàn sau khi quay 180° quanh tâm O.',
      },
    ],
    predictQuestion: 'Biển báo 3a có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Khi quay 180° quanh tâm O, hai gạch chéo đỏ có khớp hoàn toàn vị trí ban đầu không?',
    overallConclusion: 'Biển báo 3a CÓ tâm đối xứng là tâm O của hình tròn.',
    renderShape: () => (
      <g>
        <circle cx="0" cy="0" r="98" fill="#0EA5E9" stroke="#DC2626" strokeWidth="18" />
        <line x1="-66" y1="-66" x2="66" y2="66" stroke="#DC2626" strokeWidth="16" />
        <line x1="66" y1="-66" x2="-66" y2="66" stroke="#DC2626" strokeWidth="16" />
      </g>
    ),
    renderOutline: () => (
      <g>
        <circle cx="0" cy="0" r="107" {...OUTLINE_PROPS} />
        <line x1="-66" y1="-66" x2="66" y2="66" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="6 4" />
        <line x1="66" y1="-66" x2="-66" y2="66" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="6 4" />
      </g>
    ),
  },
  {
    id: 'center-lt1-sign-b',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 (3b) – Biển báo nguy hiểm',
    shortTitle: 'Biển báo 3b (Nguy hiểm !)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 3b), trang 104',
    hasSymmetry: false,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của tam giác',
        x: 0,
        y: 22,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Khi quay 180° quanh O, tam giác bị lật ngược đỉnh xuống dưới và dấu chấm than (!) cũng lộn ngược nên KHÔNG chồng khít!',
      },
    ],
    predictQuestion: 'Biển báo 3b (hình tam giác có dấu chấm than) có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi quay 180°, đỉnh tam giác và dấu chấm than thay đổi ra sao so với viền ban đầu?',
    overallConclusion: 'Biển báo 3b KHÔNG có tâm đối xứng (tam giác đều cũng không có tâm đối xứng).',
    renderShape: () => (
      <g>
        <path
          d="M 0,-104 L 112,88 L -112,88 Z"
          fill="#FACC15"
          stroke="#DC2626"
          strokeWidth="16"
          strokeLinejoin="round"
        />
        <path d="M -10,-32 L 10,-32 L 7,30 L -7,30 Z" fill="#0F172A" />
        <circle cx="0" cy="54" r="10" fill="#0F172A" />
      </g>
    ),
    renderOutline: () => (
      <path d="M 0,-104 L 112,88 L -112,88 Z" {...OUTLINE_PROPS} />
    ),
  },
  {
    id: 'center-lt1-sign-c',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 (3c) – Biểu tượng nút giao thông',
    shortTitle: 'Biểu tượng 3c (Nút giao thông)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 3c), trang 104',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của biểu tượng',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Các nhánh đường thẳng và đường cong trắng đều được bố trí đối xứng qua tâm O của hình vuông nên khi quay 180° quanh O, hình chồng khít hoàn toàn!',
      },
    ],
    predictQuestion: 'Biểu tượng nút giao thông 3c có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Khi quay biểu tượng 3c đủ 180° quanh tâm O, các đường cong trắng có trùng khớp hoàn toàn không?',
    overallConclusion:
      'Biểu tượng 3c CÓ tâm đối xứng là tâm O của hình vuông.',
    renderShape: () => (
      <g>
        <rect x="-92" y="-92" width="184" height="184" rx="12" fill="#1E3A8A" stroke="#172554" strokeWidth="3" />
        {/* Symmetric highway interchange motif (exact 180° rotational symmetry) */}
        <path d="M -78,-42 L 78,42 M -78,42 L 78,-42" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
        <path d="M -78,-14 Q 0,-56 78,-14 M -78,14 Q 0,56 78,14" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
      </g>
    ),
    renderOutline: () => (
      <g>
        <rect x="-92" y="-92" width="184" height="184" rx="12" {...OUTLINE_PROPS} />
        <path d="M -78,-42 L 78,42 M -78,42 L 78,-42" stroke="#2563EB" strokeWidth="2" strokeDasharray="5 4" />
      </g>
    ),
  },
  {
    id: 'center-lt1-sign-d',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Luyện tập 1 (3d) – Biển báo nơi giao nhau chạy theo vòng xuyến',
    shortTitle: 'Biển báo 3d (Vòng xuyến)',
    sourceRef: 'Bài 22 – Luyện tập 1 (câu 3d), trang 104',
    hasSymmetry: false,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của hình tròn',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Vòng tròn xanh trùng khít, nhưng bên trong có 3 mũi tên cong cách đều 120° (số lẻ!). Khi quay 180°, vị trí 3 đầu mũi tên lệch hẳn sang vị trí các khoảng trống nên KHÔNG chồng khít!',
      },
    ],
    predictQuestion: 'Hãy đếm số mũi tên trắng! Biển báo vòng xuyến 3d có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Khi quay 180° quanh tâm O, 3 mũi tên trắng có trùng với đường viền nét đứt ban đầu không?',
    overallConclusion:
      'Biển báo 3d KHÔNG có tâm đối xứng! Vì có 3 mũi tên xếp đều theo vòng tròn (cách nhau 120°), nên quay 180° không làm chúng trùng khít vị trí ban đầu.',
    renderShape: () => (
      <g>
        <circle cx="0" cy="0" r="100" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
        {[0, 120, 240].map((deg) => (
          <path key={deg} d={ROUNDABOUT_ARROW_PATH} transform={`rotate(${deg})`} fill="#FFFFFF" />
        ))}
      </g>
    ),
    renderOutline: () => (
      <g>
        <circle cx="0" cy="0" r="100" {...OUTLINE_PROPS} />
        {[0, 120, 240].map((deg) => (
          <path key={deg} d={ROUNDABOUT_ARROW_PATH} transform={`rotate(${deg})`} {...OUTLINE_PROPS} />
        ))}
      </g>
    ),
  },

  // --- Bài tập 5.5 (trang 107) ---
  {
    id: 'center-bt55a',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.5a – Cỏ bốn lá',
    shortTitle: 'Bài 5.5a: Cỏ bốn lá',
    sourceRef: 'Bài 22 – Bài tập 5.5a, trang 107',
    hasSymmetry: true,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của cỏ bốn lá',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation: 'Bốn cánh lá xếp đối xứng nhau từng đôi một qua tâm O nên quay 180° chồng khít hoàn toàn!',
      },
    ],
    predictQuestion: 'Hình cỏ bốn lá 5.5a có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Khi quay 180° quanh O, 4 cánh lá có khớp hoàn toàn viền ban đầu không?',
    overallConclusion: 'Bài 5.5a (cỏ bốn lá) CÓ tâm đối xứng là tâm O ở chính giữa.',
    renderShape: () => (
      <g>
        {[45, 135, 225, 315].map((deg) => (
          <path
            key={deg}
            d={CLOVER_PETAL}
            transform={`rotate(${deg})`}
            fill="#4ADE80"
            stroke="#15803D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        ))}
        <circle cx="0" cy="0" r="10" fill="#16A34A" />
      </g>
    ),
    renderOutline: () => (
      <g>
        {[45, 135, 225, 315].map((deg) => (
          <path key={deg} d={CLOVER_PETAL} transform={`rotate(${deg})`} {...OUTLINE_PROPS} />
        ))}
      </g>
    ),
  },
  {
    id: 'center-bt55b',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.5b – Bông hoa tím 5 cánh',
    shortTitle: 'Bài 5.5b: Hoa tím 5 cánh',
    sourceRef: 'Bài 22 – Bài tập 5.5b, trang 107',
    hasSymmetry: false,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của bông hoa',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Bông hoa có 5 cánh (số lẻ). Khi quay nửa vòng 180° quanh tâm O, cánh hướng xuống dưới xoay lên trên vào đúng khe hở giữa hai cánh trên nên KHÔNG chồng khít!',
      },
    ],
    predictQuestion: 'Bông hoa 5 cánh (5.5b) có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi quay 180°, các cánh hoa tím nằm ở đâu so với đường viền nét đứt ban đầu?',
    overallConclusion: 'Bài 5.5b (hoa tím 5 cánh) KHÔNG có tâm đối xứng vì số cánh là 5 (số lẻ).',
    renderShape: () => (
      <g>
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d={PURPLE_PETAL}
            transform={`rotate(${deg + 180})`}
            fill="#C084FC"
            stroke="#7E22CE"
            strokeWidth="2.4"
          />
        ))}
        <circle cx="0" cy="0" r="14" fill="#FDE047" stroke="#A16207" strokeWidth="2" />
      </g>
    ),
    renderOutline: () => (
      <g>
        {[0, 72, 144, 216, 288].map((deg) => (
          <path key={deg} d={PURPLE_PETAL} transform={`rotate(${deg + 180})`} {...OUTLINE_PROPS} />
        ))}
      </g>
    ),
  },
  {
    id: 'center-bt55c',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.5c – Bông hoa cúc hồng 12 cánh',
    shortTitle: 'Bài 5.5c: Hoa cúc 12 cánh',
    sourceRef: 'Bài 22 – Bài tập 5.5c, trang 107',
    hasSymmetry: true,
    educationalNote:
      'Mô hình hình học hoa cúc 12 cánh đều (số cánh chẵn) giúp minh họa tính đối xứng tâm theo ý tưởng bài tập 5.5c trong sách giáo khoa.',
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của bông hoa',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Bông hoa có 12 cánh đều nhau (số chẵn, cách nhau 30°). Khi quay 180° quanh tâm O, mỗi cánh trùng khít lên đúng cánh đối diện qua tâm!',
      },
    ],
    predictQuestion: 'Bông hoa cúc hồng 12 cánh (5.5c) có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay 180° quanh tâm O, 12 cánh hoa có trùng khít đường viền ban đầu không?',
    overallConclusion: 'Bài 5.5c (hoa cúc 12 cánh đều) CÓ tâm đối xứng là tâm O của nhụy hoa.',
    renderShape: () => (
      <g>
        {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
          <path
            key={deg}
            d={DAISY_PETAL}
            transform={`rotate(${deg})`}
            fill="#F472B6"
            stroke="#BE185D"
            strokeWidth="2"
          />
        ))}
        <circle cx="0" cy="0" r="24" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.4" />
      </g>
    ),
    renderOutline: () => (
      <g>
        {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
          <path key={deg} d={DAISY_PETAL} transform={`rotate(${deg})`} {...OUTLINE_PROPS} />
        ))}
      </g>
    ),
  },
  {
    id: 'center-bt55d',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.5d – Bông hoa đỏ 5 cánh',
    shortTitle: 'Bài 5.5d: Hoa đỏ 5 cánh',
    sourceRef: 'Bài 22 – Bài tập 5.5d, trang 107',
    hasSymmetry: false,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của bông hoa',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Bông hoa đỏ có 5 cánh (số lẻ). Sau khi quay 180° quanh tâm O, các cánh hoa không chồng khít với vị trí ban đầu.',
      },
    ],
    predictQuestion: 'Bông hoa đỏ 5 cánh (5.5d) có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Quan sát 5 cánh hoa đỏ khi quay đủ 180° quanh O.',
    overallConclusion: 'Bài 5.5d (hoa đỏ 5 cánh) KHÔNG có tâm đối xứng.',
    renderShape: () => (
      <g>
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d={RED_PETAL}
            transform={`rotate(${deg})`}
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="2.4"
          />
        ))}
        <circle cx="0" cy="0" r="10" fill="#7F1D1D" />
      </g>
    ),
    renderOutline: () => (
      <g>
        {[0, 72, 144, 216, 288].map((deg) => (
          <path key={deg} d={RED_PETAL} transform={`rotate(${deg})`} {...OUTLINE_PROPS} />
        ))}
      </g>
    ),
  },

  // --- Bài tập 5.6 (trang 107) – Giữ đúng vị trí điểm O theo sách ---
  {
    id: 'center-bt56a',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.6a – Kiểm tra điểm O đã cho',
    shortTitle: 'Bài 5.6a: Kiểm tra điểm O',
    sourceRef: 'Bài 22 – Bài tập 5.6a, trang 107',
    hasSymmetry: true,
    showGrid: true,
    gridStep: 24,
    candidatePoints: [
      {
        id: 'given-O',
        label: 'Điểm O theo đề bài 5.6a',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Điểm O nằm đúng tại tâm chung của hai hình vuông lồng nhau. Khi quay 180° quanh O, cả hai hình vuông đều chồng khít hoàn toàn!',
      },
    ],
    predictQuestion: 'Trong Hình 5.6a, điểm O đã cho có phải là tâm đối xứng của hình không?',
    predictOptions: [
      { id: 'yes', label: 'Có, điểm O là tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay Hình 5.6a đúng 180° quanh điểm O cho sẵn, hình có trùng với đường viền ban đầu không?',
    overallConclusion: 'Trong Bài 5.6a, điểm O LÀ tâm đối xứng của hình.',
    renderShape: () => (
      <g fill="rgba(14, 165, 233, 0.14)" stroke="#0F172A" strokeWidth="2.8" strokeLinejoin="round">
        <rect x="-72" y="-72" width="144" height="144" />
        <polygon points="0,-102 102,0 0,102 -102,0" />
      </g>
    ),
    renderOutline: () => (
      <g>
        <rect x="-72" y="-72" width="144" height="144" {...OUTLINE_PROPS} />
        <polygon points="0,-102 102,0 0,102 -102,0" {...OUTLINE_PROPS} />
      </g>
    ),
  },
  {
    id: 'center-bt56b',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.6b – Kiểm tra điểm O đã cho',
    shortTitle: 'Bài 5.6b: Kiểm tra điểm O',
    sourceRef: 'Bài 22 – Bài tập 5.6b, trang 107',
    hasSymmetry: false,
    showGrid: true,
    gridStep: 24,
    candidatePoints: [
      {
        id: 'given-O',
        label: 'Điểm O theo đề bài 5.6b (giữ đúng vị trí SGK)',
        x: 0,
        y: -24,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Hình gồm hai đường tròn khác bán kính (đường tròn nhỏ ở trên, đường tròn lớn ở dưới). Khi quay 180° quanh điểm O đã cho, đường tròn lớn quay lên trên, đường tròn nhỏ quay xuống dưới nên KHÔNG chồng khít!',
      },
    ],
    predictQuestion: 'Trong Hình 5.6b, điểm O đã cho có phải là tâm đối xứng của hình không?',
    predictOptions: [
      { id: 'yes', label: 'Có, điểm O là tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi quay 180° quanh đúng điểm O của đề bài, hai đường tròn nằm ở đâu so với vị trí ban đầu?',
    overallConclusion:
      'Trong Bài 5.6b, điểm O KHÔNG phải là tâm đối xứng của hình (vì hai đường tròn khác kích thước và không đồng tâm nên khi quay 180° không thể chồng khít).',
    renderShape: () => (
      <g fill="rgba(14, 165, 233, 0.12)" stroke="#0F172A" strokeWidth="2.8">
        {/* Large lower circle centered at (0, 24), r = 84 */}
        <circle cx="0" cy="24" r="84" />
        {/* Smaller upper circle centered at (0, -36), r = 60 */}
        <circle cx="0" cy="-36" r="60" />
      </g>
    ),
    renderOutline: () => (
      <g>
        <circle cx="0" cy="24" r="84" {...OUTLINE_PROPS} />
        <circle cx="0" cy="-36" r="60" {...OUTLINE_PROPS} />
      </g>
    ),
  },
  {
    id: 'center-bt56c',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.6c – Kiểm tra điểm O đã cho',
    shortTitle: 'Bài 5.6c: Kiểm tra điểm O',
    sourceRef: 'Bài 22 – Bài tập 5.6c, trang 107',
    hasSymmetry: true,
    showGrid: true,
    gridStep: 22,
    candidatePoints: [
      {
        id: 'given-O',
        label: 'Điểm O theo đề bài 5.6c',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Bốn mũi tên đều giống nhau và cách đều tâm O. Khi quay 180° quanh O, mũi tên trên đổi chỗ mũi tên dưới, mũi tên trái đổi chỗ mũi tên phải nên chồng khít hoàn toàn!',
      },
    ],
    predictQuestion: 'Trong Hình 5.6c, điểm O đã cho có phải là tâm đối xứng của hình không?',
    predictOptions: [
      { id: 'yes', label: 'Có, điểm O là tâm đối xứng', isCorrect: true },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Khi quay 180° quanh điểm O cho sẵn, 4 mũi tên có khớp từng ô lưới với vị trí ban đầu không?',
    overallConclusion: 'Trong Bài 5.6c, điểm O LÀ tâm đối xứng của hình mũi tên bốn chiều.',
    renderShape: () => (
      <path d={ARROW_CROSS_56C} fill="rgba(14, 165, 233, 0.16)" stroke="#0F172A" strokeWidth="2.8" strokeLinejoin="round" />
    ),
    renderOutline: () => <path d={ARROW_CROSS_56C} {...OUTLINE_PROPS} />,
  },
  {
    id: 'center-bt56d',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.6d – Kiểm tra điểm O đã cho',
    shortTitle: 'Bài 5.6d: Kiểm tra điểm O',
    sourceRef: 'Bài 22 – Bài tập 5.6d, trang 107',
    hasSymmetry: false,
    showGrid: true,
    gridStep: 24,
    candidatePoints: [
      {
        id: 'given-O',
        label: 'Điểm O theo đề bài 5.6d',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Hình gồm 3 nhánh gấp khúc đặt cách đều 120° quanh O. Khi quay 180° quanh O, cả 3 nhánh hướng ngược lại hoàn toàn và KHÔNG trùng với đường nét đứt ban đầu!',
      },
    ],
    predictQuestion: 'Trong Hình 5.6d, điểm O đã cho có phải là tâm đối xứng của hình không?',
    predictOptions: [
      { id: 'yes', label: 'Có, điểm O là tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không phải tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi quay 180° quanh điểm O, 3 nhánh gấp khúc có trùng lên vị trí ban đầu không?',
    overallConclusion: 'Trong Bài 5.6d, điểm O KHÔNG phải là tâm đối xứng của hình (vì hình có 3 nhánh lẻ cách đều 120°).',
    renderShape: () => renderTriskelion56d(false),
    renderOutline: () => renderTriskelion56d(true),
  },

  // --- Bài tập 5.7 (trang 107) ---
  {
    id: 'center-bt57a',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.7a – Hai hình elip đồng tâm',
    shortTitle: 'Bài 5.7a: Hai hình elip',
    sourceRef: 'Bài 22 – Bài tập 5.7a, trang 107',
    hasSymmetry: true,
    showGrid: true,
    gridStep: 24,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm chung O của hai đường elip',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation: 'Khi quay 180° quanh tâm chung O, cả elip nằm ngang và elip thẳng đứng đều chồng khít hoàn toàn!',
      },
    ],
    predictQuestion: 'Hình 5.7a có tâm đối xứng không? Nếu có, tâm đối xứng nằm ở đâu?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng (tại tâm chung O)', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi quay 180° quanh tâm O, hình có khớp hoàn toàn đường viền nét đứt không?',
    overallConclusion: 'Bài 5.7a CÓ tâm đối xứng là tâm chung O của hai đường elip.',
    renderShape: () => (
      <g fill="rgba(14, 165, 233, 0.1)" stroke="#0F172A" strokeWidth="2.8">
        <ellipse cx="0" cy="0" rx="102" ry="74" />
        <ellipse cx="0" cy="0" rx="74" ry="102" />
      </g>
    ),
    renderOutline: () => (
      <g>
        <ellipse cx="0" cy="0" rx="102" ry="74" {...OUTLINE_PROPS} />
        <ellipse cx="0" cy="0" rx="74" ry="102" {...OUTLINE_PROPS} />
      </g>
    ),
  },
  {
    id: 'center-bt57b',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.7b – Hình hoa 4 cánh đối xứng',
    shortTitle: 'Bài 5.7b: Hình 4 cánh đối xứng',
    sourceRef: 'Bài 22 – Bài tập 5.7b, trang 107',
    hasSymmetry: true,
    showGrid: true,
    gridStep: 24,
    candidatePoints: [
      {
        id: 'O',
        label: 'Điểm O nơi bốn cánh gặp nhau',
        x: 0,
        y: 0,
        isSymmetryCenter: true,
        pointTag: 'O',
        explanation:
          'Hai cánh dọc dài bằng nhau đối diện nhau, hai cánh ngang ngắn bằng nhau đối diện nhau. Khi quay 180° quanh giao điểm O, mỗi cánh chồng khít lên cánh đối diện!',
      },
    ],
    predictQuestion: 'Hình 5.7b có hai cánh dọc dài hơn hai cánh ngang — vậy hình này có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng (tại giao điểm O)', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Khi quay 180° quanh giao điểm O, cánh trên chồng lên cánh nào và cánh trái chồng lên cánh nào?',
    overallConclusion:
      'Bài 5.7b CÓ tâm đối xứng là điểm giao nhau O ở chính giữa (vì hai cánh dọc đối xứng nhau và hai cánh ngang đối xứng nhau qua O).',
    renderShape: () => (
      <g fill="rgba(14, 165, 233, 0.14)" stroke="#0F172A" strokeWidth="2.8" strokeLinejoin="round">
        {/* Top & bottom long narrow loops */}
        <path d="M 0,0 C -18,-36 -16,-96 0,-104 C 16,-96 18,-36 0,0 Z" />
        <path d="M 0,0 C -18,36 -16,96 0,104 C 16,96 18,36 0,0 Z" />
        {/* Left & right shorter loops */}
        <path d="M 0,0 C -26,-16 -72,-14 -78,0 C -72,14 -26,16 0,0 Z" />
        <path d="M 0,0 C 26,-16 72,-14 78,0 C 72,14 26,16 0,0 Z" />
      </g>
    ),
    renderOutline: () => (
      <g>
        <path d="M 0,0 C -18,-36 -16,-96 0,-104 C 16,-96 18,-36 0,0 Z" {...OUTLINE_PROPS} />
        <path d="M 0,0 C -18,36 -16,96 0,104 C 16,96 18,36 0,0 Z" {...OUTLINE_PROPS} />
        <path d="M 0,0 C -26,-16 -72,-14 -78,0 C -72,14 -26,16 0,0 Z" {...OUTLINE_PROPS} />
        <path d="M 0,0 C 26,-16 72,-14 78,0 C 72,14 26,16 0,0 Z" {...OUTLINE_PROPS} />
      </g>
    ),
  },
  {
    id: 'center-bt57c',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.7c – Ba hình chữ nhật ghép xoay 120°',
    shortTitle: 'Bài 5.7c: Ba hình chữ nhật',
    sourceRef: 'Bài 22 – Bài tập 5.7c, trang 107',
    hasSymmetry: false,
    showGrid: true,
    gridStep: 24,
    candidatePoints: [
      {
        id: 'O',
        label: 'Điểm O ở chính giữa ba hình chữ nhật',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Có 3 hình chữ nhật đặt cách nhau 120°. Khi quay nửa vòng 180°, cả 3 hình chữ nhật đều chỉ ngược hướng so với vị trí ban đầu nên KHÔNG chồng khít!',
      },
    ],
    predictQuestion: 'Hình 5.7c (gồm 3 hình chữ nhật ghép quanh tâm) có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'Sau khi quay 180° quanh O, vị trí 3 hình chữ nhật lệch như thế nào so với đường viền nét đứt?',
    overallConclusion: 'Bài 5.7c KHÔNG có tâm đối xứng.',
    renderShape: () => (
      <g fill="rgba(14, 165, 233, 0.16)" stroke="#0F172A" strokeWidth="2.8" strokeLinejoin="round">
        {[0, 120, 240].map((deg) => (
          <rect key={deg} x="0" y="-96" width="38" height="96" transform={`rotate(${deg})`} />
        ))}
      </g>
    ),
    renderOutline: () => (
      <g>
        {[0, 120, 240].map((deg) => (
          <rect key={deg} x="0" y="-96" width="38" height="96" transform={`rotate(${deg})`} {...OUTLINE_PROPS} />
        ))}
      </g>
    ),
  },
  {
    id: 'center-bt57d',
    tab: 'center',
    groupId: 'center-g3',
    mode: 'center-rotate',
    title: 'Bài 5.7d – Hình ngũ giác đều',
    shortTitle: 'Bài 5.7d: Ngũ giác đều',
    sourceRef: 'Bài 22 – Bài tập 5.7d, trang 107',
    hasSymmetry: false,
    showGrid: true,
    gridStep: 24,
    candidatePoints: [
      {
        id: 'O',
        label: 'Tâm O của ngũ giác đều',
        x: 0,
        y: 0,
        isSymmetryCenter: false,
        pointTag: 'O',
        explanation:
          'Ngũ giác đều có 5 đỉnh (số lẻ). Ban đầu có 1 đỉnh nhọn hướng sang phải và 1 cạnh thẳng đứng bên trái; sau khi quay 180° thì đỉnh nhọn hướng sang trái, không trùng với vị trí ban đầu!',
      },
    ],
    predictQuestion: 'Hình ngũ giác đều (5.7d) có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng', isCorrect: false },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: true },
    ],
    observeQuestion: 'So sánh vị trí 5 đỉnh của ngũ giác đều sau khi quay 180° với đường viền nét đứt ban đầu.',
    overallConclusion:
      'Bài 5.7d (ngũ giác đều) KHÔNG có tâm đối xứng. Tổng quát, đa giác đều có số cạnh lẻ (tam giác đều, ngũ giác đều, ...) đều không có tâm đối xứng.',
    renderShape: () => (
      <polygon
        points={regularPolygonPoints(5, 100, 0)}
        fill="rgba(14, 165, 233, 0.14)"
        stroke="#0F172A"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    ),
    renderOutline: () => <polygon points={regularPolygonPoints(5, 100, 0)} {...OUTLINE_PROPS} />,
  },

  // =========================================================================
  // NHÓM 4: VẼ THÊM ĐỂ TẠO HÌNH CÓ TÂM ĐỐI XỨNG (Trang 106–107)
  // =========================================================================
  {
    id: 'center-lt2a-grid',
    tab: 'center',
    groupId: 'center-g4',
    mode: 'grid-complete',
    title: 'Luyện tập 2a – Vẽ thêm hình đối xứng qua O',
    shortTitle: 'Luyện tập 2a (Lưới ô vuông)',
    sourceRef: 'Bài 22 – Luyện tập 2a, trang 106',
    gridCols: 8,
    gridRows: 8,
    cellSize: 36,
    givenPolygon: [
      { x: 0, y: 0 },
      { x: -2, y: -1 },
      { x: -2, y: -2 },
      { x: -1, y: -3 },
      { x: 1, y: -3 },
      { x: 2, y: -2 },
      { x: 2, y: -1 },
    ],
    originalFill: '#FEF08A',
    originalStroke: '#A16207',
    addedFill: '#FDBA74',
    addedStroke: '#C2410C',
    sampleGuideVertices: [
      { x: -2, y: -2 },
      { x: 1, y: -3 },
      { x: 2, y: -1 },
    ],
    predictQuestion: 'Hãy quan sát các đỉnh của hình màu vàng trên lưới ô vuông. Nếu lấy đối xứng từng đỉnh qua điểm O, phần vẽ thêm sẽ nằm ở phía nào?',
    observeQuestion: 'Bấm "Hiện phần hình tương ứng" (hoặc kéo thanh trượt quay 180°) và bật đường nối đỉnh qua O để kiểm tra từng ô lưới!',
    overallConclusion:
      'Mỗi điểm A trên phần hình đã cho có điểm đối xứng A′ qua tâm O (sao cho O là trung điểm của AA′). Phần vẽ thêm màu cam thu được bằng cách quay phần màu vàng 180° quanh O.',
  },
  {
    id: 'center-lt2b-grid',
    tab: 'center',
    groupId: 'center-g4',
    mode: 'grid-complete',
    title: 'Luyện tập 2b – Vẽ thêm hình đối xứng qua O',
    shortTitle: 'Luyện tập 2b (Lưới ô vuông)',
    sourceRef: 'Bài 22 – Luyện tập 2b, trang 106',
    gridCols: 8,
    gridRows: 8,
    cellSize: 36,
    givenPolygon: [
      { x: -2, y: 3 },
      { x: -2, y: -3 },
      { x: -1, y: -3 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: -1 },
      { x: -1, y: 3 },
    ],
    originalFill: '#38BDF8',
    originalStroke: '#0369A1',
    addedFill: '#818CF8',
    addedStroke: '#3730A3',
    sampleGuideVertices: [
      { x: -2, y: -3 },
      { x: -2, y: 3 },
      { x: -1, y: -3 },
    ],
    predictQuestion: 'Dự đoán xem khi vẽ thêm phần đối xứng qua điểm O ở Hình 2b, toàn bộ hình tạo thành sẽ giống chữ cái gì?',
    observeQuestion: 'Bấm "Hiện phần hình tương ứng" để xem hình hoàn chỉnh xuất hiện trên lưới ô vuông!',
    overallConclusion:
      'Khi lấy đối xứng qua O (quay 180° quanh O), nửa hình màu xanh da trời tạo thành nửa đối diện màu chàm, ghép lại thành chữ cái N nhận O làm tâm đối xứng!',
  },
  {
    id: 'center-bt59a-grid',
    tab: 'center',
    groupId: 'center-g4',
    mode: 'grid-complete',
    title: 'Bài 5.9a – Vẽ thêm để được hình có tâm đối xứng O',
    shortTitle: 'Bài 5.9a (Lưới ô vuông)',
    sourceRef: 'Bài 22 – Bài tập 5.9a, trang 107',
    gridCols: 8,
    gridRows: 8,
    cellSize: 36,
    givenPolygon: [
      { x: -1, y: -3 },
      { x: 1, y: -3 },
      { x: 1, y: -1 },
      { x: 3, y: -1 },
      { x: 3, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: -1 },
    ],
    originalFill: '#FB7185',
    originalStroke: '#BE123C',
    addedFill: '#FBBF24',
    addedStroke: '#B45309',
    sampleGuideVertices: [
      { x: -1, y: -3 },
      { x: 3, y: -1 },
      { x: 3, y: 1 },
    ],
    predictQuestion: 'Quan sát cạnh xiên đi qua điểm O ở Hình 5.9a. Khi quay 180° quanh O, phần vẽ thêm sẽ nằm ở góc phần tư nào?',
    observeQuestion: 'Kiểm tra từng đỉnh đối xứng qua O trên lưới ô vuông sau khi hiện phần vẽ thêm.',
    overallConclusion:
      'Cạnh xiên đi qua trung điểm O trùng lại chính nó, còn phần bậc thang phía trên – bên phải quay 180° quanh O tạo thành phần bậc thang phía dưới – bên trái hoàn toàn đối xứng.',
  },
  {
    id: 'center-bt59b-grid',
    tab: 'center',
    groupId: 'center-g4',
    mode: 'grid-complete',
    title: 'Bài 5.9b – Vẽ thêm để được hình có tâm đối xứng O',
    shortTitle: 'Bài 5.9b (Lưới ô vuông)',
    sourceRef: 'Bài 22 – Bài tập 5.9b, trang 107',
    gridCols: 8,
    gridRows: 8,
    cellSize: 36,
    givenPolygon: [
      { x: -3, y: -1 },
      { x: -1, y: -3 },
      { x: 0, y: -3 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 3 },
      { x: -1, y: 3 },
      { x: -3, y: 1 },
    ],
    originalFill: '#22C55E',
    originalStroke: '#15803D',
    addedFill: '#2DD4BF',
    addedStroke: '#0F766E',
    sampleGuideVertices: [
      { x: -3, y: -1 },
      { x: -1, y: -3 },
      { x: -1, y: 0 },
    ],
    predictQuestion: 'Khi vẽ thêm phần đối xứng của mảnh màu xanh lá qua điểm O trong Bài 5.9b, hình thu được có hình dạng như thế nào?',
    observeQuestion: 'Bấm "Hiện phần hình tương ứng" và quan sát khoảng trống ở chính giữa quanh điểm O.',
    overallConclusion:
      'Phần vẽ thêm đối xứng qua O tạo thành nửa bên phải khép kín với phần đã cho, tạo thành một vòng bát giác đối xứng có ô trống hình thoi ở chính giữa chứa tâm O.',
  },

  // =========================================================================
  // NHÓM 5: GẤP VÀ CẮT GIẤY (Trang 106–107)
  // =========================================================================
  {
    id: 'center-h59-clover4',
    tab: 'center',
    groupId: 'center-g5',
    mode: 'paper-cut',
    variant: 'h59-clover4',
    title: 'Thực hành 2 – Gấp và cắt hình cỏ bốn lá (Hình 5.9)',
    shortTitle: 'Cắt cỏ bốn lá (Hình 5.9)',
    sourceRef: 'Bài 22 – Thực hành 2, Hình 5.9, trang 106',
    foldType: 'double-quarter',
    allowPostUnfoldRotate: true,
    steps: [
      {
        title: 'Bước 1: Chuẩn bị giấy vuông 4 cm × 4 cm (H.5.9a)',
        description: 'Xác định hai đường gấp chính giữa vuông góc nhau trên mảnh giấy hình vuông xanh.',
      },
      {
        title: 'Bước 2: Gấp đôi lần thứ nhất',
        description: 'Gấp đôi mảnh giấy sao cho hai cạnh đối diện trùng lên nhau.',
      },
      {
        title: 'Bước 3: Gấp đôi lần thứ hai',
        description: 'Gấp đôi tiếp theo phương vuông góc để thu được góc phần tư vuông.',
      },
      {
        title: 'Bước 4: Vẽ và cắt theo đường cánh lá (H.5.9b)',
        description: 'Vẽ nét hình tim/hai thùy lá chạm vào hai cạnh nếp gấp rồi cắt theo nét vẽ.',
      },
      {
        title: 'Bước 5: Mở giấy thu được cỏ bốn lá (H.5.9c)',
        description: 'Mở tờ giấy ra để thu được hình cỏ bốn lá đối xứng với giao điểm hai nếp gấp là O.',
      },
      {
        title: 'Bước 6: Quay nửa vòng 180° quanh O để kiểm tra',
        description: 'Quay hình cỏ bốn lá 180° quanh tâm O để kiểm chứng O là tâm đối xứng!',
      },
    ],
    predictQuestion: 'Hình cỏ bốn lá cắt được theo Hình 5.9 có tâm đối xứng không?',
    predictOptions: [
      { id: 'yes', label: 'Có tâm đối xứng (tại giao điểm O của hai nếp gấp)', isCorrect: true },
      { id: 'no', label: 'Không có tâm đối xứng', isCorrect: false },
    ],
    observeQuestion: 'Sau khi mở ra và quay 180° quanh O, hình cỏ bốn lá có chồng khít vị trí ban đầu không?',
    overallConclusion:
      'Hình cỏ bốn lá vừa có 4 trục đối xứng, vừa có tâm đối xứng là giao điểm O của hai đường nếp gấp.',
  },
  {
    id: 'center-bt58-hexagons',
    tab: 'center',
    groupId: 'center-g5',
    mode: 'paper-cut',
    variant: 'b58-hexagons',
    title: 'Bài 5.8 – Gấp và cắt hình 4 lục giác nối nhau',
    shortTitle: 'Bài 5.8: Cắt cụm 4 lục giác',
    sourceRef: 'Bài 22 – Bài tập 5.8, trang 107',
    foldType: 'double-quarter',
    allowPostUnfoldRotate: true,
    steps: [
      {
        title: 'Bước 1: Chuẩn bị tờ giấy vuông',
        description: 'Tương tự Thực hành 2, kẻ hai đường gấp vuông góc đi qua trung điểm các cạnh.',
      },
      {
        title: 'Bước 2: Gấp đôi lần 1 (dọc)',
        description: 'Gấp đôi mảnh giấy theo chiều dọc.',
      },
      {
        title: 'Bước 3: Gấp đôi lần 2 (ngang)',
        description: 'Gấp đôi tiếp theo chiều ngang thành góc phần tư.',
      },
      {
        title: 'Bước 4: Vẽ và cắt một hình lục giác trên góc phần tư',
        description: 'Vẽ hình lục giác tiếp xúc với cả hai mép nếp gấp (chừa phần dính ở hai nếp gấp) rồi cắt phần giấy thừa xung quanh.',
      },
      {
        title: 'Bước 5: Mở giấy kiểm tra kết quả',
        description: 'Mở hai lần nếp gấp để thấy 4 hình lục giác nối nhau cân đối như Hình bài 5.8!',
      },
      {
        title: 'Bước 6: Quay 180° quanh O kiểm chứng tâm đối xứng',
        description: 'Quay toàn bộ cụm 4 hình lục giác 180° quanh giao điểm hai nếp gấp O.',
      },
    ],
    predictQuestion: 'Khi gấp tư tờ giấy và cắt 1 hình lục giác chạm hai mép gấp rồi mở ra, em sẽ thu được bao nhiêu hình lục giác?',
    predictOptions: [
      { id: '2', label: '2 hình lục giác', isCorrect: false },
      { id: '4', label: '4 hình lục giác đối xứng quanh tâm O', isCorrect: true },
      { id: '6', label: '6 hình lục giác', isCorrect: false },
    ],
    observeQuestion: 'Sau khi mở giấy và quay 180° quanh giao điểm O của hai nếp gấp, hình có chồng khít không?',
    overallConclusion:
      'Gấp đôi giấy hai lần vuông góc nhau rồi cắt 1 hình lục giác chạm hai mép gấp, khi mở ra ta được hình gồm 4 lục giác đều nối nhau nhận giao điểm O làm tâm đối xứng.',
  },
  {
    id: 'center-bt510a',
    tab: 'center',
    groupId: 'center-g5',
    mode: 'paper-cut',
    variant: 'b510-a',
    title: 'Bài 5.10a – Dự đoán chữ cái khi mở giấy gấp tư',
    shortTitle: 'Bài 5.10a: Dự đoán chữ gì?',
    sourceRef: 'Bài 22 – Bài tập 5.10a, trang 107',
    foldType: 'double-quarter',
    steps: [
      {
        title: 'Bước 1: Quan sát mảnh giấy gấp tư đã cắt (5.10a)',
        description: 'Mảnh giấy 3 cm × 5 cm đã được gấp theo chiều ngang và chiều dọc rồi cắt như Hình 5.10a. Hãy dự đoán chữ gì khi mở ra!',
      },
      {
        title: 'Bước 2: Mở nếp gấp dọc sang bên phải',
        description: 'Mở lớp giấy thứ nhất qua nếp gấp đứng bên phải.',
      },
      {
        title: 'Bước 3: Mở tiếp nếp gấp ngang xuống dưới',
        description: 'Mở hoàn toàn tờ giấy qua nếp gấp ngang bên dưới để xem chữ cái thu được!',
      },
    ],
    predictQuestion: 'Theo em, khi mở mảnh giấy ở Bài 5.10a ra, An sẽ nhận được chữ cái gì?',
    predictOptions: [
      { id: 'H', label: 'Chữ H', isCorrect: true },
      { id: 'I', label: 'Chữ I', isCorrect: false },
      { id: 'E', label: 'Chữ E', isCorrect: false },
      { id: 'T', label: 'Chữ T', isCorrect: false },
    ],
    observeQuestion: 'Quan sát kết quả sau hai lần mở giấy: chữ cái nào xuất hiện và giao điểm hai nếp gấp là gì của chữ đó?',
    overallConclusion:
      'Khi mở mảnh giấy Bài 5.10a qua hai nếp gấp vuông góc, An nhận được chữ H! Chữ H vừa có 2 trục đối xứng (trùng 2 nếp gấp) vừa có tâm đối xứng O (tại giao điểm hai nếp gấp).',
  },
  {
    id: 'center-bt510b',
    tab: 'center',
    groupId: 'center-g5',
    mode: 'paper-cut',
    variant: 'b510-b',
    title: 'Bài 5.10b – Dự đoán chữ cái khi mở giấy gấp tư',
    shortTitle: 'Bài 5.10b: Dự đoán chữ gì?',
    sourceRef: 'Bài 22 – Bài tập 5.10b, trang 107',
    foldType: 'double-quarter',
    steps: [
      {
        title: 'Bước 1: Quan sát mảnh giấy gấp tư đã cắt (5.10b)',
        description: 'Mảnh giấy 3 cm × 5 cm đã gấp ngang – dọc rồi cắt thành một phần tư vòng cong như Hình 5.10b. Hãy dự đoán chữ gì!',
      },
      {
        title: 'Bước 2: Mở nếp gấp dọc sang bên phải',
        description: 'Mở lớp giấy thứ nhất qua nếp gấp đứng tạo thành nửa vòng cung phía trên.',
      },
      {
        title: 'Bước 3: Mở tiếp nếp gấp ngang xuống dưới',
        description: 'Mở hoàn toàn tờ giấy qua nếp gấp ngang bên dưới để xem chữ cái thu được!',
      },
    ],
    predictQuestion: 'Theo em, khi mở mảnh giấy ở Bài 5.10b ra, An sẽ nhận được chữ cái gì?',
    predictOptions: [
      { id: 'C', label: 'Chữ C', isCorrect: false },
      { id: 'O', label: 'Chữ O', isCorrect: true },
      { id: 'U', label: 'Chữ U', isCorrect: false },
      { id: 'D', label: 'Chữ D', isCorrect: false },
    ],
    observeQuestion: 'Sau hai lần mở giấy, phần cong tạo thành chữ gì?',
    overallConclusion:
      'Khi mở mảnh giấy Bài 5.10b qua hai nếp gấp vuông góc, An nhận được chữ O! Chữ O có cả 2 trục đối xứng (hai nếp gấp) và tâm đối xứng O tại giao điểm hai nếp gấp.',
  },
];

// Hình có tâm đối xứng chỉ dùng tâm quay đúng; các hình không đối xứng vẫn
// có điểm thử để người học quan sát kết quả không chồng khít.
export const CENTER_ACTIVITIES: SymmetryActivity[] = CENTER_ACTIVITIES_RAW
  .map((activity) => activity.mode === 'center-rotate' && activity.hasSymmetry
    ? { ...activity, candidatePoints: activity.candidatePoints.filter((point) => point.isSymmetryCenter) }
    : activity)
  .sort((a, b) => {
    if (a.id === 'center-hd1-pinwheel2') return -1;
    if (b.id === 'center-hd1-pinwheel2') return 1;
    return a.groupId.localeCompare(b.groupId);
  });
