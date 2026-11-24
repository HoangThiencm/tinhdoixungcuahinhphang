# VERIFY

## Kết luận
PASS

## Đối chiếu scope
Đã kiểm tra toàn bộ mã nguồn sau lượt sửa lỗi đối chiếu với `docs/handoff/PLAN.md` và 4 lỗi trong lần xác minh trước:
- **Gộp sạch các hình trùng lặp**: Bài 21 đã loại bỏ 4 hình lặp (`axis-h53a-butterfly`, `axis-h53b-circle`, `axis-bt52-hexagon`, `axis-bt51-trapezoid`), Bài 22 loại bỏ mục lặp hoa 5 cánh (`center-bt55d`), chia gọn thành 4 nhóm không còn mục mồ côi.
- **Phân tầng hướng kéo chuẩn sư phạm**: Nhóm vật tự nhiên/đời sống (`Con bướm`, `Chiếc lá`, `Tháp Chăm`, `Cờ Tổ quốc`, `Cỏ ba lá`, `Biểu tượng 5.3c`, `Hình tròn`) chỉ gập theo đúng trục đối xứng thật; nhóm hình phẳng hình học, chữ cái, biển báo, lưới ô vuông hỗ trợ kéo bắt góc thông minh (Dọc / Ngang / Chéo) và ẩn các nút chữ lộ đáp án; Bài 22 lọc sạch các điểm `O′` lệch tâm giả tạo.
- **Kéo 2 phía, kéo mở ngược & tự hít khít 100% (`Auto-Snap`)**: Khóa `foldSide` một lần duy nhất khi bắt đầu kéo từ trạng thái phẳng, dùng `signedProjection` cho phép cả kéo gập vào (`0 → 1`) lẫn kéo ngược mở ra (`1 → 0`), lưu `latestProgress / latestAngle / latestTimeline` qua `ref` để tự hít khít `100%` (`>= 0.78`), `180°` (`>= 155°`) và hoàn tất mở giấy (`>= maxTimeline - 0.22`) chính xác tuyệt đối.
- **Hiển thị nổi bật Trục đối xứng & tích lũy đa trục**: Đường trục đối xứng dùng nền sáng trắng `7px` + nét đứt `#E11D48` `3.2px` + huy hiệu `Trục đối xứng d` căn giữa rộng `142px` nổi bật trên mọi màu nền (kể cả Hình lục giác đều màu xanh dương và các bài Gấp & cắt giấy); khi mở phẳng giữ hiển thị toàn bộ các trục đã tìm được kèm bộ đếm `Đã tìm thấy X / N trục đối xứng`; thông báo phản ví dụ phân biệt rõ đường gấp không phải trục đối xứng với hình không có trục đối xứng.

## Test đã chạy
- `git status` — PASS (nhánh `main` sạch).
- `npm run lint` (`tsc --noEmit`) — PASS (0 lỗi).
- `npm run build` (`vite build`) — PASS (build thành công).
- Rà soát trực tiếp toàn bộ logic kéo, auto-snap, huy hiệu SVG và lọc dữ liệu trong `src/components/AxisStage.tsx`, `src/components/CenterStage.tsx`, `src/components/PaperCutStage.tsx`, `src/data/axisShapes.tsx`, `src/data/centerShapes.tsx`, `src/App.tsx` — PASS.

## Pass / Fail từng tiêu chí
- Gộp sạch toàn bộ các hình trùng lặp ở Bài 21 & Bài 22: PASS
- Vật tự nhiên gập theo chủ ý; hình phẳng/chữ cái/biển báo kéo bắt góc thông minh không lộ nút đáp án; Bài 22 sạch điểm lệch tâm giả: PASS
- Kéo mượt từ cả 2 phía, hỗ trợ kéo ngược mở ra & auto-snap hít khít 100%: PASS
- Mọi hình có trục/tâm đối xứng sau khi gập/xoay xong đều hiện nổi bật trục/tâm tương phản cao và tích lũy các trục đã tìm được khi mở phẳng: PASS
- Thông báo phản ví dụ chính xác về kiến thức SGK (ví dụ gập đường chéo Hình chữ nhật): PASS
- `npm run lint` và `npm run build` thành công 0 lỗi: PASS

## Bug
- Không có.
