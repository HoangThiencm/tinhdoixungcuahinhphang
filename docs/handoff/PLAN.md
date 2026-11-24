# PLAN

## Hiện trạng
- Ứng dụng hiện chia thành 2 tab (Bài 21: Hình có trục đối xứng; Bài 22: Hình có tâm đối xứng).
- Tuy nhiên, giao diện hiện tại hiển thị sẵn các đường tham chiếu / trục đối xứng ngay từ ban đầu, kèm các bảng trắc nghiệm dự đoán (InquiryPanel) rườm rà.
- Trải nghiệm chưa mang tính khám phá sư phạm tự nhiên: Học sinh chưa được chủ động "kéo từ từ" để hai nửa hình (như hai cánh con bướm) chồng khít lên nhau rồi mới phát hiện nếp gấp chính là trục đối xứng.

## Phạm vi
- Tái cấu trúc trải nghiệm mô phỏng khám phá trên toàn bộ các hình ở cả 2 tab:
  1. **Tab 1: Hình có trục đối xứng (Bài 21)**
     - **Ban đầu**: Hình vẽ nguyên vẹn, sinh động (con bướm, chiếc lá, các hình hình học phẳng). Trục đối xứng ban đầu **hoàn toàn ẩn**.
     - **Thao tác kéo từ từ**: Hỗ trợ kéo trực tiếp (drag con trỏ chuột / touch) trên cánh hình hoặc kéo thanh trượt mô phỏng để nửa di động gập từ từ sang nửa cố định với hiệu ứng không gian 3D mượt mà.
     - **Xuất hiện trục đối xứng**: Chỉ khi học sinh kéo đến vị trí hai nửa chồng khít hoàn toàn (100%), đường nếp gấp ở giữa mới bừng sáng xuất hiện, kèm nhãn chỉ dẫn: *"Nếp gấp này chính là TRỤC ĐỐI XỨNG của hình!"*.
     - **Mở hình ra (Unfold)**: Cho phép mở hình phẳng lại, khi đó trục đối xứng vẫn được lưu giữ trên hình để học sinh quan sát trọn vẹn.
     - **Áp dụng đồng bộ cho tất cả các hình**: Con bướm, chiếc lá, hình chữ nhật, hình thoi, tam giác đều, hình thang cân, hình tròn, v.v. Nếu thử gập sai (không đối xứng), hai nửa không khít và không hiện trục đối xứng.
  2. **Tab 2: Hình có tâm đối xứng (Bài 22)**
     - Ban đầu tâm O ẩn. Học sinh kéo xoay từ từ (drag rotate hoặc slider 0° -> 180°).
     - Khi xoay đủ 180° và hình chồng khít hoàn toàn lên chính nó, điểm cố định ở tâm mới bừng sáng xuất hiện nhãn: *"Điểm cố định O chính là TÂM ĐỐI XỨNG của hình!"*.
  3. **Đơn giản hóa giao diện**:
     - Loại bỏ các câu hỏi trắc nghiệm rườm rà, tập trung không gian tối đa cho mô phỏng trực quan tương tác kéo - gập - xoay.

## Ngoài phạm vi
- Không thay đổi các vector SVG chi tiết đã dựng chuẩn đẹp trong `axisShapes.tsx` và `centerShapes.tsx`.
- Không bổ sung các bài học ngoài phạm vi Bài 21 & Bài 22 Sách giáo khoa Toán 6.
- Không thay đổi kiến trúc build Vite / React / Tailwindcss.

## File dự kiến tác động
- `src/types/symmetry.ts`: Bổ sung trạng thái khám phá (drag progress, folded state, revealed axis/center state).
- `src/components/AxisStage.tsx`: Tích hợp bộ xử lý kéo (Pointer Events Drag), ẩn trục ban đầu, hiển thị hiệu ứng nếp gấp sáng khi khít 100%, hỗ trợ giữ trục khi mở lại.
- `src/components/CenterStage.tsx`: Tích hợp thao tác kéo xoay quanh tâm, ẩn điểm O ban đầu, kích hoạt hiệu ứng tâm đối xứng khi quay đủ 180°.
- `src/App.tsx`: Tinh gọn layout, tích hợp thanh điều khiển kéo từ từ trực quan, đồng bộ với thao tác drag trên màn hình, lược bỏ InquiryPanel trắc nghiệm.

## Các bước thực hiện
1. **Bước 1**: Nâng cấp `AxisStage.tsx` hỗ trợ tương tác kéo (Pointer Drag) trực tiếp:
   - Xử lý các sự kiện `onPointerDown`, `onPointerMove`, `onPointerUp`, `setPointerCapture` với `touch-action: none` để học sinh có thể chạm/kéo mượt mà cả trên máy tính lẫn tablet/mobile.
   - Tính toán góc gập và vị trí cánh bướm theo tọa độ kéo chuột/ngón tay.
2. **Bước 2**: Thực hiện cơ chế ẩn hiện trục sư phạm trong `AxisStage.tsx`:
   - Trục đối xứng mặc định ẩn khi `progress < 0.99`.
   - Khi `progress >= 0.99` (chồng khít hoàn toàn): Kích hoạt hiệu ứng xuất hiện trục đối xứng (nét đứt / sáng rực) kèm nhãn nổi bật *"ĐÂY LÀ TRỤC ĐỐI XỨNG"*.
   - Cho phép mở hình phẳng lại (Unfold) nhưng vẫn giữ lại đường trục đối xứng đã tìm thấy.
3. **Bước 3**: Cập nhật danh sách hình trong `axisShapes.tsx` để hỗ trợ tương tác kéo khám phá cho từng hình:
   - Với hình có nhiều trục (tam giác đều, hình vuông, hình tròn): Cho phép chọn hướng gập để học sinh tự tay kéo gập khám phá từng trục một.
   - Với hình không có trục đối xứng: Khi kéo gập sang bên kia, hai nửa để lộ phần lệch nhau rõ ràng, thông báo không chồng khít.
4. **Bước 4**: Nâng cấp `CenterStage.tsx` cho Tab 2 (Tâm đối xứng):
   - Cho phép kéo xoay trực tiếp hình quanh tâm từ 0° đến 180°.
   - Ẩn điểm tâm O ban đầu. Chỉ khi xoay tới 180° và hình trùng khít vị trí ban đầu, tâm O mới phát sáng kèm thông báo *"ĐÂY LÀ TÂM ĐỐI XỨNG"*.
5. **Bước 5**: Cải tiến giao diện và thanh điều khiển trong `App.tsx`:
   - Đặt thanh trượt "Kéo từ từ để gập / xoay" ngay dưới hình, kèm nút "Tự động kéo", "Làm lại", "Mở hình ra".
   - Loại bỏ panel trắc nghiệm dài dòng, thay bằng khung hướng dẫn sư phạm ngắn gọn, súc tích.
6. **Bước 6**: Kiểm thử toàn diện và xác nhận chất lượng.

## Rủi ro
- *Rủi ro*: Thao tác kéo chuột trên SVG có thể bị kẹt hoặc trượt khi di chuyển ra ngoài biên SVG.
  *Giải pháp*: Dùng `setPointerCapture` và lắng nghe sự kiện ở container cấp cao để duy trì kéo liên tục mượt mà.
- *Rủi ro*: Khi mở hình ra (unfold), nếu không quản lý cẩn thận cờ trạng thái thì trục vừa phát hiện có thể bị ẩn đi mất.
  *Giải pháp*: Duy trì state `axisDiscovered: boolean` riêng biệt với `progress`.

## Cách kiểm thử
1. Mở Tab 1, chọn hình con bướm:
   - Ban đầu: Hình con bướm hoàn toàn tự nhiên, không có trục giữa.
   - Thao tác: Dùng chuột/ngón tay kéo cánh bướm phải sang trái từ từ -> Cánh bướm gập dần trong không gian 3D.
   - Khi kéo hết cỡ (chồng khít): Xuất hiện hiệu ứng nếp gấp sáng ở giữa và nhãn "TRỤC ĐỐI XỨNG".
   - Bấm mở hình ra: Hình trở lại phẳng nhưng trục đối xứng ở giữa vẫn hiển thị rõ ràng.
2. Kiểm tra tương tự với các hình khác: chiếc lá, tam giác đều, hình chữ nhật, hình thoi, hình tròn.
3. Mở Tab 2, chọn hình đối xứng tâm:
   - Kéo xoay hình từ 0° đến 180°: Đến đúng 180° hình chồng khít và tâm đối xứng O mới sáng lên.
4. Kiểm tra build dự án (`npm run build`) không có bất kỳ lỗi nào.

## Tiêu chí nghiệm thu
- Thực hiện đúng 100% ý tưởng người dùng: Không vẽ sẵn trục/tâm từ đầu; học sinh thao tác kéo từ từ để 2 nửa chồng khít lên nhau; sau khi khít trục/tâm ở giữa mới xuất hiện.
- Thao tác kéo trực quan, mượt mà trên cả máy tính lẫn thiết bị cảm ứng.
- Đầy đủ 2 tab cho Bài 21 và Bài 22; loại bỏ các phần trắc nghiệm phức tạp không cần thiết.
- Mã nguồn sạch sẽ, không lỗi runtime hay build time.
