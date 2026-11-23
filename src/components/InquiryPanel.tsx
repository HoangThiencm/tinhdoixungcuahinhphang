import React from 'react';
import { CheckCircle2, Eye, EyeOff, HelpCircle, Lock, XCircle } from 'lucide-react';
import type {
  CandidateLine,
  CandidatePoint,
  SymmetryActivity,
} from '../types/symmetry';

interface InquiryPanelProps {
  activity: SymmetryActivity;
  selectedPredictionId: string | null;
  onSelectPrediction: (id: string) => void;
  /** Whether the required physical manipulation (fold 100%, rotate 180°, unfold) is complete */
  canRevealConclusion: boolean;
  manipulationHint: string;
  showConclusion: boolean;
  onToggleConclusion: () => void;
  /** Context-specific active test line / point */
  activeLine?: CandidateLine;
  customDiameterAngle?: number | null;
  activePoint?: CandidatePoint;
  /** Axis-fold extra action: show/hide all true axes after conclusion */
  showAllAxes?: boolean;
  onToggleAllAxes?: () => void;
}

export const InquiryPanel: React.FC<InquiryPanelProps> = ({
  activity,
  selectedPredictionId,
  onSelectPrediction,
  canRevealConclusion,
  manipulationHint,
  showConclusion,
  onToggleConclusion,
  activeLine,
  customDiameterAngle,
  activePoint,
  showAllAxes,
  onToggleAllAxes,
}) => {
  const isAxisTab = activity.tab === 'axis';
  const accentBtn = isAxisTab
    ? 'bg-sky-600 hover:bg-sky-700 text-white'
    : 'bg-teal-600 hover:bg-teal-700 text-white';

  const predictOptions =
    'predictOptions' in activity ? activity.predictOptions : undefined;

  // Determine dynamic line/point verdict when conclusion is shown
  const renderSpecificVerdict = () => {
    if (activity.mode === 'axis-fold' && activeLine) {
      const isTrue = customDiameterAngle !== null ? true : activeLine.isSymmetryAxis;
      const detail =
        customDiameterAngle !== null
          ? `Đường thẳng đi qua tâm O (góc ${Math.round(customDiameterAngle)}°) chia hình tròn thành hai nửa bằng nhau chồng khít hoàn toàn. Đây là một trục đối xứng của hình tròn.`
          : activeLine.explanation;

      return (
        <div
          className={`rounded-lg p-3.5 border text-sm leading-relaxed ${
            isTrue
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold mb-1.5">
            {isTrue ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chồng khít — Đường đang chọn LÀ trục đối xứng</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Không chồng khít — Đường đang chọn KHÔNG phải trục đối xứng</span>
              </>
            )}
          </div>
          <p className="text-slate-700">{detail}</p>
        </div>
      );
    }

    if (activity.mode === 'center-rotate' && activePoint) {
      const isTrue = activePoint.isSymmetryCenter;
      return (
        <div
          className={`rounded-lg p-3.5 border text-sm leading-relaxed ${
            isTrue
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold mb-1.5">
            {isTrue ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Trùng khít — Điểm {activePoint.pointTag || 'O'} LÀ tâm đối xứng</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Không trùng khít — Điểm {activePoint.pointTag || 'O'} KHÔNG phải tâm đối xứng</span>
              </>
            )}
          </div>
          <p className="text-slate-700">{activePoint.explanation}</p>
        </div>
      );
    }

    return null;
  };

  // Evaluate student's multiple-choice prediction once conclusion is shown
  const renderPredictionFeedback = () => {
    if (!showConclusion || !predictOptions || !selectedPredictionId) return null;
    const picked = predictOptions.find((o) => o.id === selectedPredictionId);
    if (!picked) return null;

    // For line-specific / point-specific tests in Group 2, compare with the active candidate
    let matched = picked.isCorrect;
    if (activity.mode === 'axis-fold' && activeLine && predictOptions.length === 2 && (picked.id === 'yes' || picked.id === 'no')) {
      const activeIsTrue = customDiameterAngle !== null ? true : activeLine.isSymmetryAxis;
      // Only override for line-dependent questions (not overall shape questions)
      if (
        activity.groupId === 'axis-g2' ||
        activity.id === 'axis-hd2-circle' ||
        activity.id === 'axis-g5-leaf' ||
        activity.id === 'axis-bt51-trapezoid'
      ) {
        matched = (picked.id === 'yes') === activeIsTrue;
      }
    }
    if (activity.mode === 'center-rotate' && activePoint && predictOptions.length === 2 && (picked.id === 'yes' || picked.id === 'no')) {
      if (activity.groupId === 'center-g2' || activity.id === 'center-h57a-circle') {
        matched = (picked.id === 'yes') === activePoint.isSymmetryCenter;
      }
    }

    return (
      <p className={`text-xs font-medium mt-2 ${matched ? 'text-emerald-700' : 'text-amber-700'}`}>
        {matched
          ? 'Dự đoán ban đầu của em chính xác!'
          : 'Dự đoán ban đầu chưa khớp kết quả thực nghiệm — hãy đối chiếu lại trên hình mô phỏng.'}
      </p>
    );
  };

  return (
    <aside className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-5">
      {/* Step 1: Prediction */}
      <section>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
          <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
          <span>1. Câu hỏi dự đoán</span>
        </div>
        <p className="text-[15px] font-medium text-slate-900 leading-relaxed">
          {activity.predictQuestion}
        </p>

        {predictOptions && predictOptions.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            {predictOptions.map((opt) => {
              const isSelected = selectedPredictionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectPrediction(opt.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    isSelected
                      ? isAxisTab
                        ? 'bg-sky-50 border-sky-500 text-sky-900'
                        : 'bg-teal-50 border-teal-500 text-teal-900'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
            {renderPredictionFeedback()}
          </div>
        )}
      </section>

      <hr className="border-slate-200" />

      {/* Step 2: Observation */}
      <section>
        <div className="text-xs font-semibold text-slate-500 mb-2">
          2. Quan sát sau khi thao tác
        </div>
        <p className="text-[15px] text-slate-800 leading-relaxed">
          {activity.observeQuestion}
        </p>

        {activity.mode === 'paper-cut' && (
          <div className="mt-3 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
            <span className="font-semibold text-slate-800">Hướng dẫn: </span>
            Bấm từng bước hoặc kéo thanh trượt phía dưới hình để theo dõi thao tác gấp, cắt và mở giấy.
          </div>
        )}
      </section>

      <hr className="border-slate-200" />

      {/* Step 3: Reveal Conclusion */}
      <section className="flex flex-col gap-3">
        <div className="text-xs font-semibold text-slate-500">
          3. Kiểm tra và kết luận
        </div>

        <button
          type="button"
          disabled={!canRevealConclusion}
          onClick={onToggleConclusion}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
            !canRevealConclusion
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : showConclusion
                ? 'bg-slate-800 hover:bg-slate-900 text-white'
                : accentBtn
          }`}
        >
          {!canRevealConclusion ? (
            <>
              <Lock className="w-4 h-4 shrink-0" />
              <span>Hiện kết luận</span>
            </>
          ) : showConclusion ? (
            <>
              <EyeOff className="w-4 h-4 shrink-0" />
              <span>Ẩn kết luận</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 shrink-0" />
              <span>Hiện kết luận</span>
            </>
          )}
        </button>

        {!canRevealConclusion && (
          <p className="text-xs text-slate-500 leading-relaxed">
            {manipulationHint}
          </p>
        )}

        {showConclusion && (
          <div className="flex flex-col gap-3 mt-1">
            {renderSpecificVerdict()}

            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3.5 text-sm leading-relaxed text-slate-800">
              <div className="font-semibold text-slate-900 mb-1">
                Kết luận chung
                {activity.mode === 'axis-fold' && (
                  <span className="font-normal text-slate-500"> · {activity.axisCountLabel}</span>
                )}
              </div>
              <p>{activity.overallConclusion}</p>
            </div>

            {activity.mode === 'axis-fold' &&
              activity.allTrueAxes.length > 0 &&
              onToggleAllAxes && (
                <button
                  type="button"
                  onClick={onToggleAllAxes}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-sm font-semibold transition-colors"
                >
                  {showAllAxes
                    ? 'Ẩn tất cả các trục đối xứng'
                    : `Hiện tất cả trục đối xứng (${activity.axisCountLabel})`}
                </button>
              )}
          </div>
        )}
      </section>
    </aside>
  );
};
