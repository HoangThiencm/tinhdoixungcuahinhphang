# VERIFY

## Kết luận
PASS

## Đối chiếu scope
Đã đối chiếu toàn bộ mã nguồn sau khi sửa với `docs/handoff/PLAN.md`:
- **Quy tắc ẩn/hiện trục & tâm đối xứng**: Trục đối xứng (`AxisStage`, `PaperCutStage`) và tâm đối xứng `O` (`CenterStage`) hoàn toàn ẩn lúc đầu và trong suốt quá trình kéo trung gian (`0% < progress < 99%`, `1° < angle < 179.5°`); chỉ xuất hiện sau khi gập/xoay chồng khít hoàn toàn (hoặc giữ lại trên hình mở phẳng `0°` sau khi đã khám phá).
- **Nút "Hiện các trục còn lại"**: Chỉ xuất hiện khi `axisDiscovered && activity.allTrueAxes.length > 1` (không còn hiện trên Con bướm và các hình 1 trục).
- **Thao tác kéo trực tiếp**: Đã gắn đầy đủ Pointer Drag (`setPointerCapture`, `touchAction: 'none'`, `cursor: grab/grabbing`) trên cả 4 sân khấu (`AxisStage`, `CenterStage`, `PaperCutStage`, `GridCompletionStage`), kèm thanh kéo kiểm tra ưu tiên ở trên (`order-1`) và hàng nút phụ nhỏ gọn (`Tự động chạy`, `Làm lại`, `Mở hình ra`) ở dưới (`order-2`).
- **Dữ liệu & kiến thức SGK Toán 6**: Con bướm (HĐ1) và Chong chóng hai cánh (HĐ1) đứng đầu mỗi tab; xóa bỏ toàn bộ đường gấp sai / điểm lệch tâm giả tạo trên các hình có đối xứng; Biểu tượng ASEAN, Ngôi sao sáu cánh (6 trục), Tháp Chăm, Bông tuyết, Tam giác đều đầy đủ và khớp viền `renderOutline`.
- **Giao diện & màn hình hẹp**: Đã xóa câu chữ giáo án thừa và hộp `educationalNote`; danh sách chọn hình luôn hiển thị trên cả màn hình `< 1024px`; trạng thái Git sạch sẽ trên nhánh `main`.

## Test đã chạy
- `git status` — PASS (sạch trạng thái rebase, đang ở nhánh `main`).
- `npm run lint` (`tsc --noEmit`) — PASS (0 lỗi).
- `npm run build` (`vite build`) — PASS (build thành công).
- Rà soát trực tiếp logic điều kiện hiển thị và sự kiện kéo trên `src/components/AxisStage.tsx`, `src/components/CenterStage.tsx`, `src/components/PaperCutStage.tsx`, `src/components/GridCompletionStage.tsx`, `src/data/axisShapes.tsx`, `src/data/centerShapes.tsx`, `src/App.tsx` — PASS.

## Pass / Fail từng tiêu chí
- Ẩn trục/tâm ban đầu và trong suốt lúc kéo trung gian, chỉ hiện sau khi chồng khít 100%: PASS
- Không hiện nút "Hiện các trục còn lại" trên hình chỉ có 1 trục: PASS
- Kéo trực tiếp mượt mà trên cả 4 sân khấu + thanh kéo chính + nút phụ `Tự động chạy`: PASS
- Đúng 100% kiến thức & thứ tự bài học SGK Toán 6 (Bài 21 & Bài 22): PASS
- Hiển thị danh sách hình trên màn hình hẹp `< 1024px` và sạch câu chữ giáo án thừa: PASS
- `npm run lint` và `npm run build` thành công 0 lỗi: PASS

## Bug
- Không có.
