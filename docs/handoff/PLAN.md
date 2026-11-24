# PLAN

## Hiện trạng
Qua rà soát toàn bộ mã nguồn đối chiếu với SGK Toán 6 (Kết nối tri thức – Bài 21 trang 98–102 & Bài 22 trang 103–107), phản hồi thực tế và thống nhất thiết kế với người dùng, hiện còn các vấn đề cốt lõi sau:

1. **Thao tác tự động đang lấn át thao tác kéo trực tiếp**:
   - Giao diện hiện tại đặt nút bấm xanh lớn (`Tự động gập` / `Xem lại` / `Hiện phần hình tương ứng...`) cùng cụm nút `Tốc độ: Chậm / Vừa / Nhanh` làm hành động chính, khiến mô phỏng giống xem hoạt hình tự chạy thay vì buộc học sinh **tự tay kéo từ từ** để quan sát sự trùng khít.
   - Trên hình SVG lúc mới mở (`progress = 0`) chưa có tín hiệu gợi ý kéo trực quan (tay nắm / mũi tên mảnh tại mép gập hoặc hướng xoay) để học sinh nhận biết ngay là nắm trực tiếp vào hình để kéo.
2. **Dữ liệu các hình có tính đối xứng đang bị chèn thêm các đường gấp / tâm quay SAI giả tạo gây nhầm lẫn kiến thức**:
   - Ở Bài 21 (`src/data/axisShapes.tsx`), các hình có trục đối xứng (Con bướm, Tháp Chăm, Hình thang cân, Cờ Tổ quốc, Cỏ 3 lá, Hình thoi, Hình chữ nhật, Hình vuông, Tam giác đều, Lục giác đều, Ngôi sao 6 cánh, Hình tròn, Chữ A, B, H, E, Biển 2a, 2c, 5.3d, Hình 5.4a, 5.4b, 5.4d, Chiếc lá) đang có các đường `isSymmetryAxis: false` (ví dụ nút *"Đường thẳng nằm ngang qua thân"* trên Con bướm).
   - Ở Bài 22 (`src/data/centerShapes.tsx`), các hình có tâm đối xứng đang có thêm nút giả `Điểm O′ lệch khỏi tâm`.
3. **Sai đáp án SGK ở Biểu tượng ASEAN (trang 106) và sai thứ tự danh sách mở đầu**:
   - `center-asean` trong `src/data/centerShapes.tsx` đang bị đặt sai `hasSymmetry: false` và vẽ bó lúa lệch, trong khi theo SGK Toán 6 Kết nối tri thức trang 106, Biểu tượng ASEAN (đã lược chữ, bó lúa đối xứng) **CÓ tâm đối xứng** là tâm `O` của hình tròn.
   - `axis-cham-tower` và `center-equilateral-triangle` đang bị đặt lên đầu mảng `AXIS_ACTIVITIES` / `CENTER_ACTIVITIES` làm mất hình mở đầu chuẩn SGK (Con bướm HĐ1 ở Tab 1 và Chong chóng hai cánh HĐ1 ở Tab 2).
   - `axis-six-star` (Ngôi sao sáu cánh) mới có 2 trục thay vì đủ **6 trục đối xứng**, và nét vẽ chưa chuẩn ngôi sao sáu cánh đan rỗng của SGK.

## Phạm vi
1. **Lấy THAO TÁC KÉO TRỰC TIẾP làm trung tâm, nút Tự động chạy chỉ là nút phụ nhỏ cho giáo viên**:
   - Trên tất cả 4 sân khấu (`AxisStage`, `CenterStage`, `PaperCutStage`, `GridCompletionStage`):
     + Học sinh **nắm kéo trực tiếp trên hình SVG** (chuột hoặc cảm ứng, `cursor: grab` / `grabbing`, `touch-action: none`) để gập, xoay `0° → 180°`, mở giấy, hoặc quay tạo phần hình đối xứng trên lưới ô vuông.
     + Khi `progress === 0`, hiển thị gợi ý thao tác kéo nhẹ nhàng ngay trên vùng hình (biểu tượng mũi tên cong mảnh + nhãn nhỏ `Kéo để gập` / `Kéo để xoay` tự ẩn ngay khi bắt đầu kéo).
     + Ngay sát dưới hình là **thanh kéo lớn, mượt** đồng bộ 2 chiều với thao tác kéo trên hình để học sinh kéo từ từ tiến/lùi ở bất kỳ vị trí nào.
   - Tinh gọn thanh điều khiển phụ trợ:
     + **Bỏ** nút xanh to làm hành động chính và **bỏ** cụm chọn tốc độ `Chậm / Vừa / Nhanh` rườm rà.
     + Chỉ giữ các nút phụ nhỏ gọn (`outline`, kích thước nhỏ vừa phải ở góc phải): **`Tự động chạy`** (chạy chậm rãi ~2.6 giây để giáo viên trình chiếu khi đứng bảng; đang chạy đổi thành **`Tạm dừng`**), **`Mở hình ra`** (khi đã tìm ra trục đối xứng và hình đang gập), và **`Làm lại`**.

2. **Chỉ cho kéo gập theo ĐÚNG các trục đối xứng thật của hình (ẩn sạch các hướng gập không đối xứng)**:
   - **Với mọi hình CÓ trục đối xứng (`hasSymmetry: true`) trong `src/data/axisShapes.tsx`**:
     + **Xóa 100% các `candidateLines` có `isSymmetryAxis: false`!**
     + Hình có **1 trục đối xứng** (Con bướm HĐ1, Con bướm 5.3a, Hình tròn 5.3b, Biểu tượng 5.3c, Hình thang cân, Tháp Chăm, Chữ A, Chữ B, Chữ E, Biển 2c, Cờ đỏ sao vàng, Cỏ 3 lá, Hình 5.4a, Hình 5.4d, Chiếc lá): chỉ có duy nhất 1 trục đúng và **ẩn hoàn toàn cụm nút chọn trục** — học sinh kéo cánh/nửa hình chồng khít lên nhau → trục đối xứng `d` hiện lên ở giữa!
     + Hình có **nhiều trục đối xứng** (Hình thoi: 2 trục; Hình chữ nhật: 2 trục; Đoạn thẳng: 2 trục; Chữ H: 2 trục; Biển 2a: 2 trục; Biển 5.3d: 2 trục; Hình 5.4b: 2 trục; Tam giác đều: 3 trục; Hình vuông: 4 trục; Lục giác đều: 6 trục; Ngôi sao sáu cánh: đủ **6 trục**; Hình tròn HĐ2/HĐ4: đường qua tâm O + xoay tự do góc qua tâm O):
       * Chỉ hiển thị các chip gọn chọn giữa **các trục đối xứng thật** (`Trục 1`, `Trục 2`...) kèm tự động nhận trục đối xứng gần nhất theo hướng kéo tay ban đầu của học sinh khi `progress === 0` (ví dụ trên Hình chữ nhật: kéo ngang trái→phải tự gập theo trục dọc, kéo dọc dưới→lên tự gập theo trục ngang!).
   - **Riêng 6 hình KHÔNG có trục đối xứng (`hasSymmetry: false`) trong bài tập phân loại của SGK** (Chữ **G**, **F** ở LT1; Biển **2b**, **2d** ở LT2; Chữ **P** ở Bài 5.3b; **Hình 5.4c**):
     + Học sinh kéo gập trực tiếp trên hình (kéo ngang gập dọc hoặc kéo dọc gập ngang); nửa gập luôn có đường viền cảnh báo đỏ nét đứt rõ rệt để thấy ngay hai phần **không chồng khít** (không bị chìm màu vào nửa cố định) → hiện kết luận ngắn gọn: **`Hai nửa không chồng khít – Hình không có trục đối xứng`**.

3. **Chuẩn hóa toàn bộ Bài 22 (`src/data/centerShapes.tsx`) đúng 100% SGK**:
   - **Xóa toàn bộ các điểm `O′` lệch tâm giả tạo**; mỗi hình chỉ quay quanh đúng **1 điểm `O` duy nhất** (ẩn hoàn toàn khu vực chọn tâm quay).
   - **Sửa đúng `center-asean` (Biểu tượng ASEAN – Thử thách nhỏ trang 106)**: `hasSymmetry: true`, `isSymmetryCenter: true`, vẽ chuẩn vòng tròn xanh – viền trắng – nền đỏ – bó lúa vàng đối xứng tâm qua `O(0, 0)` để khi kéo xoay `180°` chồng khít hoàn toàn và hiện tâm đối xứng `O`.
   - Hoàn thiện nét vẽ chuẩn SGK cho `axis-six-star`, `center-six-star` (ngôi sao sáu cánh rỗng đan nhau) và `center-snowflake` (bông tuyết 6 nhánh đối xứng).
   - Ở `GridCompletionStage` (Luyện tập 2 & Bài 5.9): bỏ nút to tự chạy ở trên, để học sinh **kéo trực tiếp trên lưới ô vuông (hoặc thanh kéo)** quay phần hình đã cho từ `0° → 180°` quanh `O` tạo ra phần hình đối xứng.

4. **Đúng thứ tự bài học SGK & hiển thị danh sách hình gọn đẹp trên mọi màn hình**:
   - Tab 1 mở mặc định vào **Con bướm (HĐ1)**; `axis-cham-tower` và `axis-six-star` nằm ở nhóm cuối (*Thử thách nhỏ & Mở rộng*).
   - Tab 2 mở mặc định vào **Chong chóng hai cánh (HĐ1)**; `center-equilateral-triangle`, `center-six-star`, `center-asean`, `center-snowflake` nằm đúng vị trí sau phần hình phẳng / luyện tập.
   - Trên màn hình hẹp `< 1024px` (như khung Preview AI Studio), bộ chọn hình hiển thị gọn ở đầu trang (chọn nhóm + dải cuộn ngang các hình có chiều cao gọn) để người dùng thấy ngay cả danh sách đầy đủ các hình lẫn khung mô phỏng ngay bên dưới mà không phải cuộn xa.

## Ngoài phạm vi
- Không thêm nội dung ngoài Bài 21 và Bài 22 SGK Toán 6.
- Không thêm thư viện mới hay sửa cấu hình build.

## File dự kiến tác động
- `src/data/axisShapes.tsx`
- `src/data/centerShapes.tsx`
- `src/components/AxisStage.tsx`
- `src/components/CenterStage.tsx`
- `src/components/PaperCutStage.tsx`
- `src/components/GridCompletionStage.tsx`
- `src/App.tsx`

## Các bước thực hiện
1. **Bước 1 – Làm sạch dữ liệu & sửa chuẩn kiến thức SGK trong `axisShapes.tsx` và `centerShapes.tsx`**:
   - Đặt đúng `axis-hd1-butterfly` làm phần tử đầu tiên của `AXIS_ACTIVITIES` và `center-hd1-pinwheel2` làm phần tử đầu tiên của `CENTER_ACTIVITIES`; đưa các hình *Thử thách nhỏ* trang 101 & 106 về đúng nhóm.
   - Với mọi hoạt động `hasSymmetry: true` trong `axisShapes.tsx`: xóa toàn bộ `candidateLines` có `isSymmetryAxis: false`; bổ sung đủ 6 trục đối xứng cho `axis-six-star`.
   - Trong `centerShapes.tsx`: xóa toàn bộ `candidatePoints` lệch tâm giả tạo; sửa `center-asean` thành `hasSymmetry: true`, `isSymmetryCenter: true` với bó lúa đối xứng tâm hoàn hảo qua `(0,0)`; trau chuốt SVG cho ngôi sao sáu cánh và bông tuyết.
2. **Bước 2 – Tối ưu tương tác KÉO TRỰC TIẾP trên `AxisStage`, `CenterStage`, `PaperCutStage`, `GridCompletionStage`**:
   - Trong `AxisStage.tsx`:
     + Thêm gợi ý kéo trực quan nhẹ nhàng khi `progress === 0`.
     + Khi hình có nhiều trục đối xứng và `progress === 0`, nếu học sinh bắt đầu kéo vượt ngưỡng `10px`, tự động chọn trục đối xứng trong `candidateLines` có pháp tuyến khớp hướng kéo tay nhất (đồng thời vẫn cho bấm chip chuyển trục).
     + Với hình `hasSymmetry: false`, vẽ thêm đường viền nét đứt màu đỏ trên nửa gập để khi gập lại không bao giờ bị chìm màu vào nửa dưới, hiện rõ trạng thái không chồng khít.
   - Trong `CenterStage.tsx`, `PaperCutStage.tsx`, `GridCompletionStage.tsx`: đảm bảo kéo trực tiếp mượt mà trên SVG, có gợi ý kéo ban đầu khi `progress === 0`.
3. **Bước 3 – Tinh gọn giao diện điều khiển & danh sách hình trong `App.tsx`**:
   - Đưa thanh kéo kiểm tra lên vị trí chính ngay sát dưới khung hình; chuyển `Tự động chạy` thành nút phụ nhỏ (`outline`) nằm cạnh `Làm lại` (và `Mở hình ra`); xóa cụm nút chọn tốc độ `Chậm / Vừa / Nhanh` và nút to `Hiện phần hình tương ứng` của lưới ô vuông.
   - Ẩn khu vực chọn trục khi `candidateLines.length <= 1 && !allowFreeDiameter`; ẩn hoàn toàn khu vực chọn tâm quay.
   - Tối ưu khung chọn hình trên `< 1024px` (chọn nhóm + dải chip hình gọn) để thấy rõ toàn bộ kho hình SGK ngay cạnh vùng mô phỏng.
4. **Bước 4 – Kiểm thử**:
   - Chạy `npm run lint` và `npm run build` đảm bảo PASS 100%.

## Rủi ro
- *Rủi ro*: Tự động bắt trục theo hướng kéo khi hình có 4–6 trục (như Hình vuông, Lục giác đều) dễ nhảy trục giữa chừng nếu đổi trục trong lúc đang kéo.
  *Giải pháp*: Chỉ khóa chọn trục một lần duy nhất ngay khoảnh khắc vượt ngưỡng kéo `10px` khi bắt đầu từ trạng thái mở phẳng (`progress < 0.02`), trong suốt cú kéo giữ nguyên trục đó; học sinh cũng có thể bấm trực tiếp vào chip `Trục 1..6` bất kỳ lúc nào.

## Cách kiểm thử
1. Kiểm tra ưu tiên thao tác kéo:
   - Mở Con bướm (HĐ1): thấy gợi ý kéo nhẹ trên cánh, nắm cánh bướm kéo từ từ sang phải → hai cánh chồng khít → trục đối xứng `d` hiện lên ở giữa; kéo ngược sang trái (hoặc bấm `Mở hình ra`) → cánh mở ra, trục `d` vẫn hiển thị.
   - Không còn nút gấp ngang trên Con bướm; không còn nút xanh to tự chạy lấn át; nút `Tự động chạy` nhỏ gọn ở góc phải vẫn hoạt động mượt khi giáo viên cần bấm.
2. Kiểm tra hình nhiều trục (Hình chữ nhật, Hình thoi, Tam giác đều, Hình vuông, Lục giác đều, Ngôi sao 6 cánh):
   - Chỉ có các trục đối xứng thật; kéo ngang/dọc/chéo từ trạng thái phẳng tự bắt đúng trục tương ứng hoặc bấm chip trục đều mượt.
3. Kiểm tra Bài 22 (Chong chóng 2 cánh, Chong chóng 3 cánh, Biểu tượng ASEAN, Ngôi sao 6 cánh, Bông tuyết, Lưới ô vuông):
   - Kéo xoay trực tiếp `0° → 180°`; Biểu tượng ASEAN chồng khít 100% và hiện tâm đối xứng `O`.
4. Chạy `npm run lint` và `npm run build` không có lỗi.

## Tiêu chí nghiệm thu
- Thao tác **kéo trực tiếp trên hình** (và thanh kéo) là tương tác chính ở mọi mô phỏng; nút `Tự động chạy` chỉ là nút phụ nhỏ gọn cho giáo viên chiếu bảng.
- Chỉ cho kéo gập theo đúng các trục đối xứng thật ở các hình đối xứng (tuyệt đối không còn đường gấp ngang trên Con bướm hay các đường/tâm sai giả tạo).
- Đúng 100% kiến thức & thứ tự bài học SGK Toán 6 Kết nối tri thức (Bài 21 & Bài 22, bao gồm Biểu tượng ASEAN, Ngôi sao 6 cánh, Tháp Chăm, Bông tuyết).
- `npm run lint` và `npm run build` thành công 0 lỗi.
