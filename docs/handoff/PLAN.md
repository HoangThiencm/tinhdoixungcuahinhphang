# PLAN

## Hiện trạng
Qua rà soát toàn bộ mã nguồn hiện tại đối chiếu với SGK Toán 6 (Kết nối tri thức – Bài 21 trang 98–102 & Bài 22 trang 103–107) và bản chạy thực tế trên Google AI Studio, có 5 vấn đề lớn cần xử lý triệt để:

1. **Danh sách hình bị ẩn trên màn hình hẹp / khung Preview AI Studio (`< 1024px`) khiến người dùng chỉ thấy 2 hình**:
   - Trong `src/App.tsx`, thanh danh sách bên trái dùng `hidden lg:block`. Trên cửa sổ `< 1024px` (như khung Preview của Google AI Studio hoặc máy tính bảng), toàn bộ danh sách hình bị ẩn, mỗi tab chỉ hiện đúng 1 hình mặc định (Con bướm ở Bài 21 và Chong chóng 2 cánh ở Bài 22 → tổng cộng nhìn như chỉ có 2 hình).
2. **Lỗi thao tác kéo "gấp ngang" và ngược hướng kéo trong `src/components/AxisStage.tsx`**:
   - Hàm `handlePointerMove` đang gán cứng theo trục ngang `dragStart.current.x - event.clientX` và `cursor: 'ew-resize'` cho mọi đường gấp:
     + Khi chọn **gấp ngang** (`angleDeg = 0`, đường nằm ngang): nửa dưới gập lên trên theo trục dọc `Y`, học sinh kéo lên/xuống thì `clientX` không đổi nên **không kéo gập được**.
     + Khi **gấp dọc** (`angleDeg = 90`): trong phép biến đổi `rotate(90)`, nửa di động (`clip-moving: y >= 0`) là nửa **bên trái** lật sang **bên phải** (`+X`), nhưng code lại tính `dragStart.x - event.clientX` (bắt kéo từ phải sang trái, ngược chiều chuyển động của cánh hình).
     + Khi **gấp chéo** (`30°, 45°, 60°, 120°, 135°...`): không chiếu vector kéo `(dx, dy)` theo pháp tuyến đường gấp nên kéo lệch hướng.
   - Với Hình tròn khi xoay tự do đường qua tâm (`customDiameterAngle !== null`, ví dụ xoay về `0°` gấp ngang): code kiểm tra `selectedLine.isSymmetryAxis` thay vì `customDiameterAngle !== null ? true : selectedLine.isSymmetryAxis`, nên nếu trước đó từng bấm dây cung lệch tâm thì gấp ngang qua tâm O lại không nhận là trục đối xứng.
   - Khi thử gấp theo đường **không phải trục đối xứng** (như gấp ngang Con bướm): không hiện vạch nếp gấp đang thử nên học sinh không thấy rõ mình đang gấp qua đường ngang nào để kiểm chứng việc hai nửa lệch nhau (không có trục đối xứng ngang).
3. **Thao tác kéo chưa đồng bộ trên `CenterStage.tsx`, `PaperCutStage.tsx`, `GridCompletionStage.tsx`**:
   - `CenterStage.tsx` chỉ bắt kéo ngang `clientX` thay vì hỗ trợ kéo xoay theo góc quanh tâm `O` (kết hợp kéo mượt trên vùng SVG), đồng thời `showReference` bị đặt `false` làm mất cung hiển thị góc quay `0° → 180°`.
   - `PaperCutStage.tsx` và `GridCompletionStage.tsx` chưa hỗ trợ kéo trực tiếp (Pointer Drag) ngay trên SVG.
4. **Còn thiếu một số hình trong SGK Bài 21 & Bài 22**:
   - **Bài 21 (trang 101 – Thử thách nhỏ)** còn thiếu: **Tháp Chăm** (1 trục đối xứng dọc) và **Ngôi sao sáu cánh** (6 trục đối xứng).
   - **Bài 22 (trang 106 – Chú ý & Thử thách nhỏ)** còn thiếu: **Hình tam giác đều** (không có tâm đối xứng), **Ngôi sao sáu cánh** (có tâm đối xứng), **Biểu tượng ASEAN** (không có tâm đối xứng vì bó lúa và vòng màu lệch trên-dưới/đỏ-xanh khi quay 180°), **Bông tuyết 6 nhánh** (có tâm đối xứng).
5. **Còn câu chữ kiểu giáo án / dẫn dắt rườm rà trên giao diện**:
   - Header vẫn hiện câu `"Học sinh quan sát – dự đoán – thao tác – kiểm tra – giải thích."`.
   - Còn các hộp giải thích dài `educationalNote`, các tiêu đề rườm rà như `"Danh mục Bài 21 (5 nhóm hoạt động)"`, `"Chọn một hình hoặc hoạt động để thực hành"`, `"Chọn đường dự đoán để gấp kiểm tra:"`, `"Chọn điểm dự đoán làm tâm quay (180°):"`, và file thừa `src/components/InquiryPanel.tsx`.

## Phạm vi
1. **Hiển thị rõ toàn bộ kho hình SGK trên MỌI kích thước màn hình (kể cả AI Studio Preview & mobile/tablet)**:
   - Giữ đúng 2 tab chính: **Bài 21: Hình có trục đối xứng** và **Bài 22: Hình có tâm đối xứng**.
   - Bỏ kiểu ẩn hoàn toàn danh sách hình dưới `< 1024px`. Thiết kế bộ chọn nhóm mục SGK + dải/lưới thẻ chọn hình (kèm nút trước/sau `Hình trước` / `Hình tiếp` và bộ chọn nhóm gọn: *Khám phá*, *Hình phẳng*, *Luyện tập*, *Gấp & cắt giấy*, *Bài tập & Thử thách*) **luôn hiển thị trực quan** ngay cả trên màn hình hẹp để thấy ngay đầy đủ tất cả các hình của SGK, không bao giờ bị tưởng nhầm chỉ có 2 hình.
2. **Chuẩn hóa tương tác "Kéo để kiểm tra + Tự động chạy" cho toàn bộ mô phỏng**:
   - **AxisStage (Gấp kiểm tra trục đối xứng)**:
     + Tính vector pháp tuyến đơn vị của đường gấp hướng từ nửa di động sang nửa cố định: trong hệ tọa độ đường gấp `rotate(activeAngle)`, nửa di động nằm ở `y_local >= 0` (tức hướng ra ngoài là `(-sin(rad), cos(rad))`) và lật sang `y_local <= 0` theo hướng dịch chuyển màn hình `u = (sin(rad), -cos(rad))`.
     + Chiếu chuyển động chuột/chạm `(dx, dy)` lên vector hướng lật `u`: kéo đúng theo chiều gập (trái → phải khi gấp dọc, dưới → trên khi gấp ngang, vuông góc nếp gấp khi gấp chéo) sẽ tăng `progress` từ `0 → 1`, kéo ngược lại sẽ mở ra `1 → 0`. Hỗ trợ đổi con trỏ phù hợp (`grab` / `grabbing`).
     + Khi đang chọn một đường gấp cụ thể (hoặc vừa đổi hướng gấp như gấp dọc / gấp ngang / gấp chéo): hiện đường nếp gấp mờ nhạt dẫn hướng khi bắt đầu chạm/kéo để học sinh biết rõ đang gấp theo đường nào, nhưng **chưa gắn nhãn trục đối xứng**.
     + Khi gấp hết cỡ (`progress >= 0.99`):
       * Với đường đúng (`isTrueAxis === true`, bao gồm cả mọi đường kính qua tâm O khi `customDiameterAngle !== null`): hai nửa chồng khít hoàn toàn → làm nổi bật đường thẳng ở giữa kèm nhãn ngắn gọn **`Trục đối xứng d`** (và giữ nguyên trục này khi bấm **`Mở hình ra`**).
       * Với đường sai (`isTrueAxis === false`, ví dụ gấp ngang Con bướm): hai nửa lệch nhau rõ ràng → hiện đường nếp gấp thử màu cam/đỏ nhạt nét đứt để thấy vị trí gấp nhưng hiện trạng thái ngắn gọn **`Không chồng khít – Không phải trục đối xứng`** (tuyệt đối không đánh dấu là trục đối xứng).
   - **CenterStage (Quay 180° kiểm tra tâm đối xứng)**:
     + Hỗ trợ kéo xoay trực tiếp trên SVG bằng góc quay quanh điểm `O` (`atan2`) kết hợp kéo mượt nếu chạm gần tâm, luôn hiển thị cung góc quay mảnh trực quan khi `angle > 1°`.
     + Khi quay đủ `180°`: nếu chồng khít (`isSymmetryCenter === true`) thì hiện nổi bật điểm `O` kèm nhãn **`Tâm đối xứng O`**; nếu lệch nhau (`isSymmetryCenter === false`) thì báo ngắn gọn **`Không chồng khít – Không có tâm đối xứng`**.
   - **PaperCutStage & GridCompletionStage**:
     + Bổ sung Pointer Drag trực tiếp trên SVG để học sinh kéo mở giấy / kéo quay phần hình đối xứng trên lưới ô vuông mượt mà, đồng bộ 2 chiều với thanh trượt và nút **`Tự động chạy`**.
   - **Thanh điều khiển thống nhất**:
     + Mọi hình đều có: thao tác **kéo trực tiếp trên hình**, **thanh kéo kiểm tra**, nút **`Tự động chạy`** (đang chạy hiện **`Tạm dừng`**), **`Làm lại`**, nút **`Mở hình ra`** (ở gấp hình), và chọn tốc độ (`Chậm / Vừa / Nhanh`).
3. **Bổ sung đầy đủ 100% các hình trong SGK Bài 21 & Bài 22**:
   - **Bài 21 (`src/data/axisShapes.tsx`)**: bổ sung **Tháp Chăm** (1 trục dọc) và **Ngôi sao sáu cánh** (6 trục đối xứng) từ mục *Thử thách nhỏ* trang 101; rà soát toàn bộ các hình từ trang 98–102 đảm bảo đủ và đúng toán học.
   - **Bài 22 (`src/data/centerShapes.tsx`)**: bổ sung **Hình tam giác đều** (không có tâm đối xứng – trang 106), **Ngôi sao sáu cánh** (có tâm đối xứng – trang 106), **Biểu tượng ASEAN** (không có tâm đối xứng – trang 106), **Bông tuyết 6 nhánh** (có tâm đối xứng – trang 106); rà soát toàn bộ các hình từ trang 103–107.
4. **Xóa sạch câu chữ kiểu giáo án / lý thuyết rườm rà**:
   - Xóa dòng `"Học sinh quan sát – dự đoán – thao tác – kiểm tra – giải thích."` trên header.
   - Xóa hiển thị `educationalNote` và mọi đoạn giải thích dài dòng.
   - Đổi toàn bộ nhãn điều khiển sang ngôn ngữ ngắn gọn, trực diện: `Hướng gấp:`, `Tâm quay:`, `Kéo trên hình hoặc kéo thanh trượt để kiểm tra`, `Tự động chạy`.
   - Xóa nội dung không dùng của `src/components/InquiryPanel.tsx` (hoặc để trống export an toàn / xóa file nếu không nơi nào import).

## Ngoài phạm vi
- Không thêm nội dung ngoài chương trình Bài 21 và Bài 22 SGK Toán 6.
- Không thêm backend, đăng nhập hay thư viện bên thứ ba mới.
- Không thay đổi cấu hình build Vite / TypeScript.

## File dự kiến tác động
- `src/types/symmetry.ts`
- `src/components/AxisStage.tsx`
- `src/components/CenterStage.tsx`
- `src/components/PaperCutStage.tsx`
- `src/components/GridCompletionStage.tsx`
- `src/components/InquiryPanel.tsx`
- `src/data/axisShapes.tsx`
- `src/data/centerShapes.tsx`
- `src/App.tsx`

## Các bước thực hiện
1. **Bước 1 – Sửa dứt điểm toán học kéo gấp trong `AxisStage.tsx`**:
   - Tính `isTrueAxis = customDiameterAngle !== null ? true : selectedLine.isSymmetryAxis`.
   - Trong `handlePointerDown` / `handlePointerMove`: lưu `(clientX, clientY, progress)`. Tính vector hướng gập màn hình `ux = Math.sin(rad)`, `uy = -Math.cos(rad)` (với `rad = activeAngle * Math.PI / 180`). Độ dịch chuyển chiếu lên hướng gập là `proj = (event.clientX - startX) * ux + (event.clientY - startY) * uy`, chuẩn hóa theo kích thước SVG (`Math.min(rect.width, rect.height) * 0.55`) để cập nhật `progress` mượt mà đúng chiều cho mọi góc gấp (`0°` ngang, `90°` dọc, và mọi góc chéo).
   - Khi đang kéo (`progress > 0.02` và chưa xong) hiển thị đường nếp gấp mảnh trung tính để học sinh thấy vị trí gập; khi `progress >= 0.99`:
     + Nếu `isTrueAxis`: kích hoạt `onAxisDiscovered()`, vẽ đường trục đối xứng nổi bật kèm nhãn `d`.
     + Nếu `!isTrueAxis`: vẽ vạch nếp gấp thử màu đỏ/cam nhạt kèm thông báo ngắn `Không chồng khít – Không phải trục đối xứng`, không kích hoạt `axisDiscovered`.
2. **Bước 2 – Chuẩn hóa kéo trực tiếp cho `CenterStage.tsx`, `PaperCutStage.tsx`, `GridCompletionStage.tsx`**:
   - `CenterStage.tsx`: hỗ trợ kéo xoay mượt quanh tâm `(ox, oy)` trên SVG (kết hợp góc `atan2` quanh tâm khi kéo cách tâm `> 18px` và fallback kéo ngang khi chạm sát tâm), luôn vẽ cung góc quay khi `angle > 1°`, chỉ hiện điểm `O` là tâm đối xứng khi quay đủ `180°` và `isSymmetryCenter === true`.
   - `PaperCutStage.tsx` & `GridCompletionStage.tsx`: thêm sự kiện `onPointerDown` / `onPointerMove` / `onPointerUp` (`touchAction: 'none'`) để kéo trực tiếp trên hình đồng bộ với `progress` và nút `Tự động chạy`.
3. **Bước 3 – Bổ sung đầy đủ các hình SGK còn thiếu trong `axisShapes.tsx` và `centerShapes.tsx`**:
   - Trong `src/data/axisShapes.tsx`: thêm hoạt động gấp kiểm tra cho **Tháp Chăm** (1 trục dọc, có thêm đường ngang để kiểm chứng không đối xứng) và **Ngôi sao sáu cánh** (6 trục đối xứng: 3 đường qua đỉnh đối diện và 3 đường qua giao điểm đối diện, kèm 1 đường lệch để kiểm chứng).
   - Trong `src/data/centerShapes.tsx`: thêm hoạt động quay 180° kiểm tra cho **Tam giác đều** (`isSymmetryCenter: false`), **Ngôi sao sáu cánh** (`isSymmetryCenter: true`), **Biểu tượng ASEAN** (`isSymmetryCenter: false`), và **Bông tuyết** (`isSymmetryCenter: true`).
4. **Bước 4 – Thiết kế lại điều hướng hình và làm sạch câu chữ trong `App.tsx`**:
   - Xóa câu `"Học sinh quan sát – dự đoán – thao tác – kiểm tra – giải thích."` và bỏ render `educationalNote`.
   - Thiết kế bộ chọn nhóm + danh sách chọn hình luôn hiển thị trực quan trên mọi độ rộng màn hình (trên màn hình `< 1024px` hiển thị thanh tab nhóm + cuộn ngang/lưới chip tất cả các hình trong nhóm kèm nút `Trước / Tiếp` và tổng số hình rõ ràng; trên màn hình `>= 1024px` hiển thị cột danh sách bên trái trực quan).
   - Thống nhất nút **`Tự động chạy`**, **`Tạm dừng`**, **`Làm lại`**, **`Mở hình ra`**, chọn tốc độ và thanh kéo kiểm tra; dọn bỏ `InquiryPanel.tsx`.
5. **Bước 5 – Kiểm thử toàn diện**:
   - Chạy `npm run lint` và `npm run build` đảm bảo sạch lỗi 100%.

## Rủi ro
- *Rủi ro*: Chiều kéo `ux, uy` bị ngược nếu nhầm dấu hệ trục Y hướng xuống của SVG.
  *Kiểm tra toán học*: Với `angleDeg = 90` (`rad = π/2`), `clip-moving` giữ `y_local >= 0` → điểm `(0, +100)` sau `rotate(90)` thành `(-100, 0)` (bên trái), khi gập sang phải `( +100, 0 )` thì `dx > 0`; công thức `ux = sin(90°) = +1, uy = -cos(90°) = 0` cho `proj = +dx > 0` (kéo trái sang phải tăng `progress` — khớp 100%). Với `angleDeg = 0` (`rad = 0`), `clip-moving` giữ `y >= 0` (nửa dưới), khi gập lên trên `dy < 0`; công thức `ux = 0, uy = -1` cho `proj = -dy > 0` (kéo dưới lên trên tăng `progress` — khớp 100%).
- *Rủi ro*: Quá nhiều hình làm rối mắt trên màn hình nhỏ.
  *Giải pháp*: Phân tách bằng dải lọc nhóm gọn ngay phía trên + chip chọn hình trực quan luôn nhìn thấy (kèm chỉ số `Hình x / N` và nút chuyển nhanh).

## Cách kiểm thử
1. Kiểm tra trên khung hẹp `< 1024px` (giống Google AI Studio Preview) và màn hình rộng:
   - Cả Bài 21 và Bài 22 đều nhìn thấy ngay toàn bộ các nhóm và danh sách đầy đủ hàng chục hình SGK, chuyển qua lại dễ dàng.
2. Kiểm tra thao tác kéo gấp theo mọi hướng ở Bài 21:
   - **Con bướm**: kéo cánh trái sang phải (gấp dọc) → chồng khít → hiện trục đối xứng `d`; chuyển sang gấp ngang, kéo từ dưới lên trên → hai nửa gập lên nhau nhưng lệch cánh/râu → báo *Không chồng khít – Không phải trục đối xứng*, không hiện trục đối xứng.
   - **Hình chữ nhật / Chữ H / Chữ B / Chữ E / Hình tròn**: chọn gấp ngang, kéo từ dưới lên trên → chồng khít → hiện đúng trục đối xứng nằm ngang.
   - **Hình tròn (xoay đường qua tâm tự do)**: thử chọn dây cung lệch tâm trước rồi kéo thanh góc qua tâm O về `0°` → gấp lại phải nhận đúng là trục đối xứng.
   - **Tháp Chăm & Ngôi sao sáu cánh**: hiển thị đẹp, kéo kiểm tra đúng số trục đối xứng theo SGK trang 101.
3. Kiểm tra Bài 22:
   - Kéo xoay trực tiếp trên hình + bấm `Tự động chạy` hoạt động mượt trên Chong chóng, Hình bình hành, Tam giác đều, Ngôi sao sáu cánh, Biểu tượng ASEAN, Bông tuyết, các bài lưới ô vuông và gấp cắt giấy.
4. Kiểm tra giao diện: không còn dòng `"Học sinh quan sát – dự đoán – thao tác – kiểm tra – giải thích."` hay các đoạn giải thích giáo án dài dòng.
5. Chạy `npm run lint` và `npm run build` đạt PASS.

## Tiêu chí nghiệm thu
- Hiển thị đầy đủ toàn bộ các hình mô phỏng của Bài 21 & Bài 22 theo đúng SGK Toán 6 trên mọi kích thước màn hình (không bị ẩn thành 2 hình trên khung hẹp).
- Kéo kiểm tra trực tiếp trên hình hoạt động đúng chiều vật lý cho cả gấp dọc, gấp ngang, gấp chéo, quay quanh tâm, mở giấy; gấp ngang chỉ hiện trục đối xứng ở những hình thực sự đối xứng ngang và báo rõ không chồng khít ở những hình không đối xứng ngang.
- Đầy đủ nút **Tự động chạy**, **Tạm dừng**, **Làm lại**, **Mở hình ra** và thanh kéo kiểm tra.
- Giao diện gọn sạch, bỏ hoàn toàn câu chữ kiểu *"Học sinh quan sát – dự đoán – thao tác – kiểm tra – giải thích"* và các hộp giải thích dài dòng.
- `npm run lint` và `npm run build` thành công không lỗi.
