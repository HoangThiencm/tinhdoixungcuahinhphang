# IMPLEMENT

Trạng thái: HOÀN THÀNH

## Phạm vi đã triển khai

- `AxisStage`: kéo từ hai phía, bắt hướng gấp theo thao tác kéo, tự hít vào 0% hoặc 100%, và lưu các trục đã tìm được.
- Trục đối xứng ở trạng thái hoàn tất dùng viền trắng, nét đứt đỏ hồng và nhãn tương phản cao; `PaperCutStage` dùng cùng cách hiển thị sau khi mở giấy xong.
- `CenterStage`: xử lý liên tục qua nhánh `atan2` và tự hít vào 180° khi thả từ 155°; `PaperCutStage` tự hoàn tất gần cuối thao tác mở.
- `App`: ẩn các nút chọn trục lộ đáp án (giữ thanh đường kính tự do của hình tròn) và lưu trục đã khám phá theo từng đường.
- Dữ liệu Bài 21/Bài 22 không hiển thị các mục trùng theo kế hoạch và danh sách được gom thành bốn nhóm.

## Tệp đã thay đổi

- `src/App.tsx`
- `src/components/AxisStage.tsx`
- `src/components/CenterStage.tsx`
- `src/components/PaperCutStage.tsx`
- `src/data/axisShapes.tsx`
- `src/data/centerShapes.tsx`
- `docs/handoff/IMPLEMENT.md`

## Kiểm tra

- `npm run lint` — PASS
- `npm run build` — PASS
- `git diff --check` — PASS

Không commit hoặc push. Build chỉ hiển thị cảnh báo Vite có sẵn về `__dirname`.

## Sửa lỗi theo VERIFY.md

- Nhóm vật tự nhiên/đời sống chỉ còn trục đối xứng thật; các hình phẳng vẫn giữ đường gấp phản ví dụ. Hoạt động quay có tâm đối xứng chỉ còn điểm tâm đúng.
- Kéo gấp giữ nguyên nửa đã nắm trong suốt thao tác và hỗ trợ kéo ngược để mở hình. Ba mô phỏng dùng giá trị kéo mới nhất khi quyết định auto-snap.
- Huy hiệu trục được căn giữa trong khung đủ rộng; thông báo phản ví dụ phân biệt chính xác giữa đường gấp sai và hình không có trục đối xứng; viền cảnh báo đỏ áp dụng cho mọi đường gấp sai.
- Khi mở phẳng, mọi trục đã khám phá được giữ hiển thị cùng bộ đếm tiến độ.

Đã chạy lại: `npm run lint`, `npm run build`, `git diff --check` — PASS.
