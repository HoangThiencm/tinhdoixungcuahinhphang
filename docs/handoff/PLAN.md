# PLAN

## Hiện trạng
Qua kiểm tra thực tế trên hình Lục giác đều và toàn bộ danh mục Bài 21 – Bài 22 cùng thống nhất phương án với người dùng, hiện có **3 vấn đề cốt lõi** cần giải quyết dứt điểm:

1. **Kéo gập trên các hình chưa dễ đạt 100% và trục đối xứng chưa hiện nổi bật trên mọi hình**:
   - Như ảnh thực tế trên Hình lục giác đều: quãng đường kéo `scale = min(width, height) * 0.55` quá dài so với kích thước nửa hình, lại **không có cơ chế tự hít khít (`snap to 100%`) khi thả tay gần khít** (`>= 78%`), khiến học sinh kéo nửa trái sang nửa phải rồi thả tay thì hình bị dừng lửng lơ ở `~85%–90%` (`progress < 0.99`) → **trục đối xứng không bao giờ hiện ra**.
   - Ngoài ra, `clip-moving` đang cố định cứng 1 phía (`y_local >= 0`): nếu học sinh nắm cánh **bên phải kéo sang trái** (hoặc nắm **nửa trên kéo xuống dưới**), tích vô hướng âm làm `progress = 0`, hình đứng im không gập được.
   - Khi đạt `100%`, đường trục đối xứng đang vẽ màu xanh `#0284C7` không có viền sáng nền (`white halo`), nên trên các hình màu xanh dương (Lục giác đều, Hình tròn, Chữ cái, Biển báo xanh) bị chìm lẫn vào viền `#0369A1` của chính hình đó.
2. **Danh sách hình ở thanh bên đang bị lặp trùng nhau nhiều lần**:
   - Bài 21 đang lặp 4 cặp hình: `Con bướm (HĐ1)` & `Hình 5.3a: Con bướm`; `Hình tròn (HĐ2 & HĐ4)` & `Hình 5.3b: Hình tròn`; `5. Hình lục giác đều` & `Bài 5.2: Lục giác đều`; `6. Hình thang cân` & `Bài 5.1: Hình thang cân`.
   - Bài 22 cũng có mục trùng tính chất (2 bông hoa 5 cánh Bài 5.5b & 5.5d, Cỏ bốn lá lặp lại) và tên mục còn gắn nhiều ký hiệu vụn (`HĐ1`, `LT1`, `Hình 5.3a`...).
3. **Cơ chế chọn hướng kéo gập chưa phân tầng hợp lý giữa vật thật tự nhiên và hình phẳng hình học**:
   - Cần áp dụng đúng phương án đã chốt:
     + **Nhóm vật thật tự nhiên / kiến trúc mở đầu (Con bướm, Chiếc lá, Tháp Chăm, Cờ Tổ quốc, Cỏ ba lá, Biểu tượng 5.3c)**: gập theo chủ ý đúng trục đối xứng tự nhiên của vật.
     + **Nhóm hình phẳng Toán học, Chữ cái, Biển báo, Lưới ô vuông (Hình chữ nhật, Hình thoi, Hình vuông, Tam giác đều, Hình thang cân, Lục giác đều, Ngôi sao 6 cánh, Đoạn thẳng, Chữ cái, Biển báo, Bài 5.4)**: ẩn các nút chữ gợi ý lộ đáp án, cho học sinh **tự nắm kéo theo các hướng tự nhiên (Dọc / Ngang / Chéo)** có "nam châm bắt góc chuẩn" của hình → hướng nào hai nửa chồng khít 100% thì **bật sáng hiện Trục đối xứng** (và lưu lại các trục đã tìm được trên hình); hướng nào lệch nhau (như gập theo đường chéo Hình chữ nhật, gập ngang Hình thang cân) thì thấy rõ 2 đỉnh lệch nhau và báo không phải trục đối xứng.

## Phạm vi
1. **Đảm bảo 100% TẤT CẢ CÁC HÌNH sau khi gập xong đều hít khít 180° và HIỆN RÕ TRỤC ĐỐI XỨNG**:
   - **Hỗ trợ kéo từ CẢ HAI PHÍA của đường gấp (`foldSide: 1 | -1`)**:
     + Khi học sinh đặt tay kéo (`pointerDown` + vượt ngưỡng `8px`), xác định phía học sinh đang nắm hoặc chiều vector kéo `(dx, dy)` để chọn `foldSide = 1` hoặc `-1`: nắm cánh trái kéo sang phải HAY nắm cánh phải kéo sang trái (nắm dưới kéo lên HAY nắm trên kéo xuống) đều lật đúng nửa vừa nắm sang nửa đối diện!
   - **Quãng đường kéo nhạy vừa tầm tay + Tự động hít khít (`Auto-Snap`) sang `100%`**:
     + Đặt `scale = Math.max(Math.min(rect.width, rect.height) * 0.34, 1)` để chỉ cần kéo đúng quãng đường từ nửa bên này sang nửa bên kia là đạt `100%`.
     + **Khi thả chuột/ngón tay (`onPointerUp`)**: nếu `progress >= 0.78` → tự động hoàn tất `progress = 1` (`180°`); nếu `progress <= 0.08` → tự động đặt phẳng `progress = 0`. (Áp dụng tương tự cho `CenterStage`: thả tay ở `angle >= 155°` tự hít vào `180°` và hiện tâm `O`; ở `PaperCutStage`: thả tay gần cuối `>= maxTimeline - 0.22` tự mở phẳng hoàn tất và hiện trục đối xứng).
   - **Hiển thị Trục đối xứng cực kỳ nổi bật trên MỌI màu nền hình (kể cả khi đang gập khít 100% lẫn khi mở phẳng ra)**:
     + Ngay khi gập hoàn tất (`progress >= 0.98`) trên trục đúng (`isTrueAxis`):
       * Vẽ lớp **hào quang nền trắng (`stroke="#FFFFFF" strokeWidth="7" opacity="0.95"`)** bên dưới + đường **trục đối xứng nét đứt đậm màu đỏ hồng/đỏ tươi chuẩn SGK (`stroke="#E11D48" strokeWidth="3.2" strokeDasharray="9 5"`)** đè lên trên cùng của SVG (nổi bật tuyệt đối trên cả nền cam, xanh dương, xanh lá, vàng và cả nền cờ đỏ nhờ viền trắng 7px!).
       * Vẽ **nhãn huy hiệu (pill badge)** nền trắng viền đỏ chữ đậm **`Trục đối xứng d`** (hoặc `d₁, d₂...`) ngay đầu trục trên canvas!
       * Với hình có nhiều trục đối xứng: lưu danh sách `discoveredLineIds` đã khám phá. Mỗi trục tìm được đều được giữ hiển thị khi mở hình phẳng ra, kèm bộ đếm gọn (ví dụ: `Đã tìm thấy 1 / 6 trục đối xứng` + nút phụ nhỏ `Hiện đủ 6 trục` sau khi đã tìm được ít nhất 1 trục).
     + Trên `PaperCutStage` (tất cả bài gấp & cắt giấy): ngay khi kéo mở tờ giấy ra xong ở bước cuối, hiện rõ đường **Trục đối xứng `d`** (có viền trắng + nét đứt đỏ tươi + nhãn `Trục đối xứng`) ngay trên đường nếp gấp của hình vừa cắt!

2. **Cơ chế kéo thông minh phân tầng 2 nhóm ở Bài 21 (ẩn nút gợi ý lộ đáp án)**:
   - **Nhóm vật tự nhiên / kiến trúc (Con bướm, Chiếc lá, Tháp Chăm, Cờ Tổ quốc, Cỏ ba lá, Biểu tượng tròn)**: chỉ gập theo đúng trục đối xứng tự nhiên của vật (kéo trái→phải hoặc phải→trái đều khép 2 nửa lại chồng khít → hiện trục `d`).
   - **Nhóm hình phẳng hình học, Chữ cái, Biển báo, Lưới ô vuông**:
     + Mỗi hình khai báo tập các đường gập đặc trưng tự nhiên để "bắt nam châm" khi học sinh kéo tay (gồm các trục đối xứng thật + các đường phản ví dụ tự nhiên học sinh hay thử như: đường chéo của Hình chữ nhật, đường ngang của Hình thang cân / Tam giác đều / Chữ A, đường dọc của Chữ B / Chữ E, đường nối trung điểm cạnh đối của Hình thoi, đường thẳng đứng/ngang của Biển 5.3d & Hình 5.4b).
     + **Ẩn các nút chữ lộ đáp án**; ngay khi học sinh bắt đầu kéo vượt `8px` từ trạng thái phẳng (`progress < 0.03`), tự động bắt ("snap") vào đường gập có phương vuông góc khớp nhất với góc kéo tay `Math.abs(dx * sin(rad) - dy * cos(rad))` và tự gán `foldSide` đúng theo chiều kéo!
     + Riêng Hình tròn vẫn giữ thêm thanh xoay góc tự do qua tâm `O` để minh họa vô số trục đối xứng.
     + Khi gập theo đường **không phải trục đối xứng** đạt `100%`: vẽ rõ nét viền của nửa gập đè lên nửa cố định (không dùng `opacity` quá mờ làm chìm nét) kèm viền cảnh báo để thấy rõ 2 phần chĩa lệch nhau và báo rõ: **`Hai nửa lệch nhau – Đường này không phải trục đối xứng`**.

3. **Gộp sạch toàn bộ các hình bị lặp trong `axisShapes.tsx` và `centerShapes.tsx`**:
   - **Bài 21 (`axisShapes.tsx`)**:
     + Xóa `axis-h53a-butterfly` (lặp với `Con bướm`), xóa `axis-h53b-circle` (lặp với `Hình tròn`), xóa `axis-bt52-hexagon` (lặp với `Hình lục giác đều`), xóa `axis-bt51-trapezoid` (gộp vào 1 mục `Hình thang cân` duy nhất).
     + Đặt lại tên `shortTitle` & `title` ngắn gọn, trong sáng theo tên hình (ví dụ: `Con bướm`, `Hình tròn`, `Hình thoi`, `Hình chữ nhật`, `Hình vuông`, `Tam giác đều`, `Hình lục giác đều`, `Hình thang cân`, `Đoạn thẳng`, `Ngôi sao sáu cánh`, `Tháp Chăm`, `Chiếc lá`...), chia thành 4 nhóm gọn gàng:
       1. *Khám phá trong tự nhiên & đời sống*
       2. *Các hình phẳng hình học*
       3. *Chữ cái, Biển báo & Lưới ô vuông*
       4. *Gấp và cắt giấy*
   - **Bài 22 (`centerShapes.tsx`)**:
     + Gộp bỏ mục lặp không cần thiết (xóa 1 trong 2 bông hoa 5 cánh trùng tính chất `center-bt55d`, giữ 1 mẫu `Hoa năm cánh` đại diện cạnh `Cỏ bốn lá` và `Hoa cúc 12 cánh`; đặt tên ngắn gọn không rườm rà), chia thành 4 nhóm gọn gàng tương ứng.

## Ngoài phạm vi
- Không thêm nội dung ngoài Bài 21 & Bài 22 SGK Toán 6.
- Không thêm thư viện ngoài.

## File dự kiến tác động
- `src/types/symmetry.ts`
- `src/components/AxisStage.tsx`
- `src/components/CenterStage.tsx`
- `src/components/PaperCutStage.tsx`
- `src/data/axisShapes.tsx`
- `src/data/centerShapes.tsx`
- `src/App.tsx`

## Các bước thực hiện
1. **Bước 1 – Nâng cấp `AxisStage.tsx` (kéo 2 phía + auto-snap 100% + vẽ trục đối xứng nổi bật)**:
   - Thêm `foldSide` (`1 | -1`) tự xác định khi bắt đầu kéo theo dấu của `dx * sin(foldRad) - dy * cos(foldRad)` (đổi vai trò `clip-fixed` và `clip-moving` khi `foldSide === -1` bằng cách cộng `180°` vào góc clip local, giúp kéo từ trái→phải hay phải→trái, dưới→trên hay trên→dưới đều gập đúng nửa vừa kéo).
   - Khi bắt đầu kéo từ trạng thái phẳng (`progress < 0.03`) và `candidateLines.length > 1 && !customDiameterAngle`: chọn đường trong `candidateLines` có `Math.abs(dx * sin(lineRad) - dy * cos(lineRad))` lớn nhất.
   - Giảm `scale` xuống `Math.min(rect.width, rect.height) * 0.34`; trong `handlePointerEnd`: nếu `progress >= 0.78` thì gọi `onProgressChange(1)` (và `onAxisDiscovered()` nếu `isTrueAxis`), nếu `progress <= 0.08` thì gọi `onProgressChange(0)`.
   - Vẽ đường trục đối xứng (khi `isTrueAxis && (progress >= 0.98 || (isCurrentLineDiscovered && progress <= 0.02))`) gồm lớp nền trắng `stroke="#FFFFFF" strokeWidth="7"` + nét đứt đỏ hồng `#E11D48` `strokeWidth="3.2"` + huy hiệu nhãn `Trục đối xứng d` rõ nét; đồng thời vẽ các trục đã khám phá trước đó (`discoveredLineIds`) khi mở phẳng `progress <= 0.02`.
2. **Bước 2 – Đồng bộ auto-snap & hiển thị rõ trục/tâm trên `CenterStage.tsx` và `PaperCutStage.tsx`**:
   - `CenterStage.tsx`: xử lý chống nhảy góc qua nhánh `-π/+π` khi tính `atan2`; khi thả tay ở `angle >= 155°` tự hít vào `180°` và hiện nổi bật tâm đối xứng `O`.
   - `PaperCutStage.tsx`: khi thả tay ở `timeline >= maxTimeline - 0.22` tự hoàn tất mở phẳng `maxTimeline` và vẽ rõ đường `Trục đối xứng d` có viền sáng trắng + nét đứt nổi bật.
3. **Bước 3 – Gộp sạch hình lặp & cấu hình đường gập phản ví dụ tự nhiên trong `axisShapes.tsx` và `centerShapes.tsx`**:
   - Xóa 4 mục lặp ở Bài 21 (`axis-h53a-butterfly`, `axis-h53b-circle`, `axis-bt52-hexagon`, `axis-bt51-trapezoid`) và mục lặp hoa 5 cánh ở Bài 22 (`center-bt55d`).
   - Giữ duy nhất 1 trục đúng cho nhóm vật tự nhiên mở đầu (Con bướm, Chiếc lá, Tháp Chăm, Cờ Tổ quốc, Cỏ ba lá, Biểu tượng 5.3c).
   - Với nhóm hình phẳng hình học, chữ cái, biển báo, lưới ô vuông: khai báo đủ các trục đối xứng thật + các đường phản ví dụ tự nhiên (như đường chéo Hình chữ nhật, đường ngang Hình thang cân / Tam giác đều / Chữ A, đường dọc Chữ B / Chữ E...) để học sinh kéo tay theo hướng nào là bắt đúng góc đó để kiểm chứng.
4. **Bước 4 – Tinh chỉnh `App.tsx`**:
   - Quản lý `discoveredLineIds: string[]` theo từng hình (reset khi đổi hình hoặc bấm `Làm lại`, giữ nguyên khi bấm `Mở hình ra` để tích lũy các trục tìm được).
   - Ẩn dãy nút chữ chọn trục lộ đáp án (chỉ giữ thanh góc tự do cho Hình tròn và nút `Hiện đủ N trục đối xứng` sau khi đã tự gập tìm được ít nhất 1 trục).
5. **Bước 5 – Kiểm thử**:
   - Chạy `npm run lint` và `npm run build` đạt PASS 0 lỗi.

## Rủi ro
- *Rủi ro*: Khi `onSelectLine` đổi sang trục khác ngay ở `10px` đầu tiên của cú kéo, nếu handler ở `App.tsx` reset `dragStart` hoặc làm lệch `activeAngle` của cùng sự kiện `pointerMove` thì cú kéo đầu bị khựng.
  *Giải pháp*: Trong `AxisStage.tsx`, lưu `lockedLine` trực tiếp vào `ref` ngay tại khoảnh khắc khóa hướng kéo để dùng tính `foldRad` tức thời trong suốt cú kéo đó, đồng thời gọi `onSelectLine` chỉ để cập nhật `selectedLineId` (không xóa trạng thái đang kéo).

## Cách kiểm thử
1. Kiểm tra danh sách hình: không còn bất kỳ hình nào bị lặp tên ở Bài 21 (Con bướm, Hình tròn, Lục giác đều, Hình thang cân chỉ xuất hiện 1 lần) và Bài 22.
2. Kiểm tra gập & hiện trục đối xứng trên **TẤT CẢ các hình Bài 21**:
   - **Con bướm**: nắm cánh trái kéo sang phải HOẶC nắm cánh phải kéo sang trái → thả tay khi hai cánh chạm gần nhau → tự hít khít `100%` và hiện nổi bật **Trục đối xứng `d`** (viền sáng trắng + nét đứt đỏ sắc nét).
   - **Hình lục giác đều**: kéo ngang (gập dọc), kéo dọc (gập ngang), kéo xiên → hít khít `100%` và hiện nổi bật trục đối xứng ngay trên nền xanh dương (không còn dừng lửng lơ ở `88%` hay chìm màu!).
   - **Hình chữ nhật**: kéo ngang/dọc → chồng khít & hiện trục đối xứng; kéo xiên theo đường chéo → hai đỉnh nhọn chĩa lệch nhau rõ rệt & báo không phải trục đối xứng.
   - **Gấp & cắt giấy**: kéo mở hết cỡ → hiện rõ trục đối xứng ở giữa hình cắt.
3. Kiểm tra Bài 22: kéo xoay gần `180°` thả tay tự hít đúng `180°` và hiện nổi bật tâm đối xứng `O` trên mọi hình có tâm đối xứng.
4. Chạy `npm run lint` và `npm run build` thành công 0 lỗi.

## Tiêu chí nghiệm thu
- 100% các hình có trục đối xứng (bao gồm cả Hình lục giác đều, Hình tròn, Con bướm, Đa giác, Chữ cái, Biển báo, Cắt giấy) khi kéo gập xong đều hít khít `180°` và hiện nổi bật đường **Trục đối xứng** tương phản cao ngay trên hình (cả lúc đang gập khít lẫn khi mở phẳng ra).
- Nắm kéo được từ cả 2 phía đối diện một cách tự nhiên; vật tự nhiên gập theo chủ ý, hình phẳng/chữ cái/biển báo cho phép kéo thử Dọc – Ngang – Chéo bắt góc thông minh không lộ nút đáp án.
- Danh sách hình gọn sạch, xóa triệt để mọi hình bị lặp.
- `npm run lint` và `npm run build` đạt PASS.
