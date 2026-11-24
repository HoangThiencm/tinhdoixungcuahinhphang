# IMPLEMENT

Trạng thái: HOÀN THÀNH

## Phạm vi triển khai

- Chuẩn hóa kéo gấp theo pháp tuyến cho gấp ngang, dọc, chéo và đường kính tự do.
- Thêm kéo trực tiếp cho quay, gấp/cắt giấy và lưới ô vuông.
- Bổ sung Tháp Chăm, ngôi sao sáu cánh, tam giác đều, biểu tượng ASEAN và bông tuyết.
- Danh sách hình luôn hiện trên màn hình hẹp; rút gọn nhãn và bỏ ghi chú dài.
- Làm sạch dữ liệu trục/tâm: hình đối xứng chỉ còn các lựa chọn đúng, còn hình không đối xứng vẫn có nếp gấp kiểm chứng.
- Đưa Con bướm và Chong chóng hai cánh trở lại hoạt động mặc định; chỉnh Biểu tượng ASEAN, sao sáu cánh và bông tuyết đối xứng đúng.
- Ưu tiên kéo trực tiếp bằng gợi ý trên cả bốn mô phỏng, tự chọn trục gần hướng kéo đầu tiên cho hình nhiều trục và tinh gọn các nút điều khiển thành nút phụ.
- Sửa toàn bộ lỗi trong `VERIFY.md`: trục/tâm chỉ lộ sau khi thao tác hoàn tất (hoặc khi đã mở phẳng sau khám phá), giấy và lưới nhận Pointer Drag, danh sách hình không bị ẩn trên màn hình hẹp và các viền ASEAN/bông tuyết khớp hình gốc.

## Tệp đã thay đổi

- `src/App.tsx`
- `src/components/AxisStage.tsx`
- `src/components/CenterStage.tsx`
- `src/components/PaperCutStage.tsx`
- `src/components/GridCompletionStage.tsx`
- `src/data/axisShapes.tsx`
- `src/data/centerShapes.tsx`
- `docs/handoff/IMPLEMENT.md`

## Kiểm tra đã chạy

- `npm run lint` — PASS
- `npm run build` — PASS

## Ghi chú

- Các kiểm tra tự động đã đạt; build vẫn hiển thị cảnh báo Vite có sẵn về `__dirname`.
- Không commit hoặc push trong lượt sửa lỗi xác minh này.
