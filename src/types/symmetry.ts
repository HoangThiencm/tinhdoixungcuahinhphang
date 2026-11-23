import type { ReactNode } from 'react';

export type LessonTab = 'axis' | 'center';

/** Trạng thái khám phá được giữ riêng với vị trí của thanh kéo. */
export interface DiscoveryState {
  progress: number;
  revealed: boolean;
}

export type ActivityMode =
  | 'axis-fold'
  | 'paper-cut'
  | 'center-rotate'
  | 'grid-complete';

export interface CandidateLine {
  id: string;
  label: string;
  /** Point on the line in SVG coordinates (origin at 0,0) */
  px: number;
  py: number;
  /** Direction angle of the line in degrees (0 = horizontal, 90 = vertical) */
  angleDeg: number;
  /** True if folding across this line makes the two halves coincide exactly */
  isSymmetryAxis: boolean;
  /** Tailored explanation when this specific line is tested */
  explanation: string;
  /** Optional short label placed near the line on canvas (e.g., "d") */
  lineTag?: string;
}

export interface CandidatePoint {
  id: string;
  label: string;
  x: number;
  y: number;
  /** True if rotating 180° around (x, y) maps the shape onto itself */
  isSymmetryCenter: boolean;
  /** Tailored explanation when this specific point is tested */
  explanation: string;
  /** Point tag shown on canvas (default "O") */
  pointTag?: string;
}

export interface PredictionOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface AxisFoldActivity {
  id: string;
  tab: 'axis';
  groupId: string;
  mode: 'axis-fold';
  title: string;
  shortTitle: string;
  sourceRef: string;
  /** Whether the shape overall has at least one axis of symmetry */
  hasSymmetry: boolean;
  /** Total number of axes of symmetry ('vô số' for circle, or integer) */
  axisCountLabel: string;
  /** Hide the fold line initially until student clicks "Hiện đường tham chiếu" or picks a line */
  hideLineInitially?: boolean;
  /** Allow free rotation of a diameter line through (0,0) (for Circle HĐ2/HĐ4) */
  allowFreeDiameter?: boolean;
  /** Show subtle square grid in background (for Bài 5.4) */
  showGrid?: boolean;
  gridStep?: number;
  /** Candidate fold lines the student can pick to test */
  candidateLines: CandidateLine[];
  /** All true axes shown when "Hiện tất cả trục đối xứng" is toggled */
  allTrueAxes: Array<{ px: number; py: number; angleDeg: number; label?: string }>;
  /** Optional extra note displayed cleanly under stage (e.g. symmetric leaf disclaimer) */
  educationalNote?: string;
  /** Pedagogical questions */
  predictQuestion: string;
  predictOptions?: PredictionOption[];
  observeQuestion: string;
  overallConclusion: string;
  /** Render the SVG shape in viewBox -220 -180 440 360 */
  renderShape: (opts?: { outlineOnly?: boolean; ghost?: boolean }) => ReactNode;
  /** Optional extra static reference annotations (vertex labels A, B, center O, etc.) */
  renderReferenceOverlay?: () => ReactNode;
}

export interface CenterRotateActivity {
  id: string;
  tab: 'center';
  groupId: string;
  mode: 'center-rotate';
  title: string;
  shortTitle: string;
  sourceRef: string;
  /** Whether the shape itself has a center of symmetry */
  hasSymmetry: boolean;
  /** Show background square grid (for Bài 5.6 & 5.7) */
  showGrid?: boolean;
  gridStep?: number;
  /** Candidate rotation centers (or single textbook-given point O for Bài 5.6) */
  candidatePoints: CandidatePoint[];
  /** Optional tracking point A on the shape that moves with the shape (e.g., Circle 5.7a) */
  markerA?: { x: number; y: number; note?: string };
  educationalNote?: string;
  predictQuestion: string;
  predictOptions?: PredictionOption[];
  observeQuestion: string;
  overallConclusion: string;
  /** Render the filled shape */
  renderShape: () => ReactNode;
  /** Render the crisp dashed outline at original 0° position */
  renderOutline: () => ReactNode;
  /** Render optional reference lines (diagonals, midpoint ticks, etc.) */
  renderReferenceOverlay?: () => ReactNode;
}

export type PaperCutVariant =
  | 'hd3-h52'
  | 'cut-letter-A'
  | 'cut-letter-E'
  | 'cut-letter-T'
  | 'h55-a'
  | 'h55-b'
  | 'h55-c'
  | 'h58-flower4'
  | 'h59-clover4'
  | 'b58-hexagons'
  | 'b510-a'
  | 'b510-b';

export interface PaperCutActivity {
  id: string;
  tab: LessonTab;
  groupId: string;
  mode: 'paper-cut';
  variant: PaperCutVariant;
  title: string;
  shortTitle: string;
  sourceRef: string;
  foldType: 'single-vertical' | 'single-horizontal' | 'double-quarter';
  /** If true, student can also rotate the unfolded result 180° around O */
  allowPostUnfoldRotate?: boolean;
  steps: Array<{
    title: string;
    description: string;
  }>;
  predictQuestion: string;
  predictOptions?: PredictionOption[];
  observeQuestion: string;
  overallConclusion: string;
  educationalNote?: string;
}

export interface GridPoint {
  x: number;
  y: number;
}

export interface GridCompletionActivity {
  id: string;
  tab: 'center';
  groupId: string;
  mode: 'grid-complete';
  title: string;
  shortTitle: string;
  sourceRef: string;
  /** Grid dimensions in cells (centered around O at (0,0)) */
  gridCols: number;
  gridRows: number;
  /** Pixel size per cell */
  cellSize: number;
  /** Center O offset in grid coordinates relative to grid center (0,0) */
  centerOffset?: { x: number; y: number };
  /** Vertices of the given polygon in grid coordinates relative to O = (0,0) */
  givenPolygon: GridPoint[];
  /** Fill/stroke colors for original half vs rotated 180° counterpart */
  originalFill: string;
  originalStroke: string;
  addedFill: string;
  addedStroke: string;
  /** Key vertex pairs to illustrate central symmetry through O */
  sampleGuideVertices: GridPoint[];
  predictQuestion: string;
  observeQuestion: string;
  overallConclusion: string;
}

export type SymmetryActivity =
  | AxisFoldActivity
  | CenterRotateActivity
  | PaperCutActivity
  | GridCompletionActivity;

export interface ActivityGroup {
  id: string;
  tab: LessonTab;
  title: string;
  subtitle: string;
}
