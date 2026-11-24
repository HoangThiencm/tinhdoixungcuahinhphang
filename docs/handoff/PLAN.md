# PLAN

## Hiện trạng
Qua kiểm thử thực tế (`/verify` → FAIL) và đối chiếu ảnh màn hình người dùng gửi, hiện có **5 lỗi cụ thể** (kèm trạng thái `git` đang kẹt giữa chừng `rebase` làm rơi mất một phần code giao diện trước đó):

1. **Trục đối xứng và nhãn `d` bị lộ ngay khi mới kéo nhẹ (`Góc gấp: 7°`), chưa đợi gập xong 100%**:
   - Trong `src/components/AxisStage.tsx` (dòng 301): điều kiện `(progress > 0.02 || showDiscoveredAxis)` khiến vừa kéo quá `2%` là đường nét đứt và chữ `d` hiện ngay giữa thân bướm trước khi hai cánh kịp chồng khít. Ngoài ra nếu `axisDiscovered` đã bật từ lần trước rồi học sinh kéo lại ở `7°`, trục xanh và câu *"Đây là TRỤC ĐỐI XỨNG (d)"* vẫn hiện lửng lơ giữa lúc đang gập.
   - Trên Con bướm chỉ có **1 trục đối xứng** (`allTrueAxes.length === 1`), nhưng `src/App.tsx` (dòng 403) vẫn hiện nút xanh **`Hiện các trục còn lại`**.
   - Trong `src/components/PaperCutStage.tsx`: đường `Trục đối xứng` đang hiện sẵn trước khi mở tờ giấy ra xong.
2. **`PaperCutStage.tsx` và `GridCompletionStage.tsx` có chữ "Kéo để mở / Kéo để xoay" nhưng chưa gắn sự kiện kéo chuột/cảm ứng trên SVG**:
   - Do dở `git rebase`, các prop callback và `onPointerDown / Move / Up` trên thẻ `<svg>` của 2 màn hình này bị rơi mất.
3. **`src/App.tsx` vẫn còn sót câu chữ giáo án & bố cục cũ**:
   - Còn dòng `"Học sinh quan sát – dự đoán – thao tác – kiểm tra – giải thích."`, hộp `educationalNote`, câu `"Chọn đường dự đoán để gấp kiểm tra:"`, và danh sách hình vẫn bị `hidden lg:block` trên màn hình `< 1024px`.
   - Dòng 195 & 247 quên xét `customDiameterAngle !== null` cho Hình tròn.
4. **`CenterStage.tsx` & hình chi tiết Bài 22**:
   - Cung hiển thị góc quay `renderAngleArc()` bị chặn bởi `showReference === false`; lúc đang xoay lửng lơ `1° < angle < 179.5°` cần đảm bảo điểm `O` chỉ hiện sau khi quay trọn `180°` chồng khít (hoặc khi đặt lại `0°` sau khi đã tìm thấy tâm).
   - `renderOutline` của `center-asean` và `center-snowflake` thiếu nét chi tiết bên trong; viền cảnh báo đỏ của hình không đối xứng trong `AxisStage.tsx` đang vẽ khung chữ nhật bao cả SVG thay vì bao theo nét hình.
5. **Trạng thái Git đang kẹt `You are currently rebasing`**:
   - Cần kết thúc sạch trạng thái rebase (`git rebase --continue` hoặc `git rebase --abort` cẩn thận sau khi giữ code) trước khi commit/push mới.

## Phạm vi
1. **Quy tắc hiển thị Trục đối xứng / Tâm đối xứng đúng 100% trình tự khám phá**:
   - **Lúc mới mở (`0%`) và trong suốt quá trình đang kéo gập (`0% < progress < 99%`)**: **HOÀN TOÀN KHÔNG hiện** đường trục đối xứng, không hiện vạch nét đứt giữa hình, không hiện chữ `d`! Học sinh chỉ thấy 2 nửa hình (như 2 cánh con bướm) từ từ khép lại.
   - **Chỉ SAU KHI gập chồng khít hoàn toàn (`progress >= 0.99`)** với trục đúng (`isTrueAxis`): đường **Trục đối xứng `d`** và dòng kết luận **`Hai nửa chồng khít → d là trục đối xứng`** mới hiện lên!
   - Khi bấm **`Mở hình ra`** (đưa `progress` về `0` sau khi đã gập khít): hình mở phẳng ra và **giữ nguyên trục đối xứng `d`** ở giữa để học sinh quan sát. Nếu học sinh lại nắm cánh kéo gập lần nữa (`0.02 < progress < 0.99`), tạm ẩn trục trong lúc cánh đang bay giữa không trung và hiện lại khi chạm khít `100%`.
   - Nút **`Hiện các trục còn lại`** chỉ xuất hiện khi `axisDiscovered && activity.allTrueAxes.length > 1` (tuyệt đối không hiện trên Con bướm hay các hình chỉ có 1 trục!).
   - Tương tự ở **Bài 22 (`CenterStage`)**: trong lúc đang kéo xoay `0° → 179°`, điểm tâm `O` hoàn toàn ẩn; chỉ khi chạm đủ **`180°`** chồng khít lên viền ban đầu thì điểm **`O`** mới hiện sáng ở giữa kèm kết luận **`Tâm đối xứng O`** (và vẫn giữ tâm `O` nếu đưa về `0°` xem hình gốc, chỉ ẩn trong lúc đang xoay lửng lơ `1° < angle < 179.5°`).
   - Ở **Gấp & cắt giấy (`PaperCutStage`)**: ẩn đường nếp gấp/trục đối xứng cho đến khi tờ giấy đã mở ra hoàn tất ở bước cuối cùng (`timeline >= activity.steps.length - 1.05`).

2. **Hoàn thiện thao tác KÉO TRỰC TIẾP trên cả 4 sân khấu + giao diện gọn sạch**:
   - Gắn đầy đủ Pointer Drag (`onPointerDown`, `onPointerMove`, `onPointerUp`, `setPointerCapture`, `touchAction: 'none'`, `cursor: grab/grabbing`) cho cả `AxisStage`, `CenterStage` (hỗ trợ xoay góc `atan2` quanh tâm + kéo ngang mượt), `PaperCutStage` và `GridCompletionStage`.
   - Trong `App.tsx`:
     + Xóa câu `"Học sinh quan sát – dự đoán – thao tác – kiểm tra – giải thích."`, xóa render `educationalNote`, đổi `"Chọn đường dự đoán để gấp kiểm tra:"` thành `"Chọn trục gấp:"`.
     + Hiển thị dải chọn nhóm + danh sách chọn hình trực quan ngay cả trên màn hình `< 1024px` (không dùng `hidden lg:block` làm mất danh sách trên AI Studio Preview).
     + Đặt **thanh kéo kiểm tra** nằm ngay sát dưới hình (trước hàng nút phụ nhỏ gọn `Tự động chạy`, `Làm lại`, `Mở hình ra`).
   - Sửa hiệu ứng lệch nhau của hình không đối xứng (`!activity.hasSymmetry` khi `isFoldComplete`): dùng `drop-shadow` viền đỏ trên chính nửa hình gập (xóa `<rect>` bao khung SVG), và bổ sung đủ nét bó lúa / nhánh tuyết vào `renderOutline` của `center-asean`, `center-snowflake`.

## Ngoài phạm vi
- Không thêm nội dung ngoài Bài 21 & Bài 22 SGK Toán 6.
- Không thêm thư viện mới.

## File dự kiến tác động
- `src/components/AxisStage.tsx`
- `src/components/CenterStage.tsx`
- `src/components/PaperCutStage.tsx`
- `src/components/GridCompletionStage.tsx`
- `src/data/centerShapes.tsx`
- `src/App.tsx`

## Các bước thực hiện
1. **Bước 1**: Xử lý sạch trạng thái `git rebase` đang treo (đảm bảo không mất dữ liệu đã làm sạch trong `axisShapes.tsx` và `centerShapes.tsx`).
2. **Bước 2**: Sửa `src/components/AxisStage.tsx`:
   - Đặt `const shouldShowAxisNow = isTrueAxis && (isFoldComplete || (axisDiscovered && progress <= 0.02));`.
   - Xóa hoàn toàn việc vẽ `<line>` và `<text>{activeTag}</text>` khi `0.02 < progress < 0.99`. Chỉ vẽ trục xanh `d` khi `shouldShowAxisNow === true`; với hình `!isTrueAxis`, chỉ khi `isFoldComplete` mới hiện vạch gấp thử nét đứt cam/đỏ và `drop-shadow` đỏ trên nửa hình lệch (xóa `<rect x="-218" ... />`).
3. **Bước 3**: Sửa `src/components/CenterStage.tsx` và `src/data/centerShapes.tsx`:
   - Đặt `const shouldShowCenterNow = selectedPoint.isSymmetryCenter && (isAt180 || (centerDiscovered && angle <= 1));`.
   - Luôn gọi `renderAngleArc()` khi `angle > 1 && angle < 179.5` (không phụ thuộc `showReference`); hỗ trợ kéo xoay mượt `grab`/`grabbing`.
   - Cập nhật `renderOutline` của `center-asean` và `center-snowflake` khớp đầy đủ chi tiết bên trong.
4. **Bước 4**: Gắn đầy đủ Pointer Drag cho `src/components/PaperCutStage.tsx` (chỉ hiện trục đối xứng khi mở giấy xong ở bước cuối) và `src/components/GridCompletionStage.tsx`.
5. **Bước 5**: Cập nhật `src/App.tsx`:
   - Chỉ hiện nút `Hiện các trục còn lại` khi `axisDiscovered && activity.allTrueAxes.length > 1`.
   - Sửa điều kiện `isTrueAxis` gồm `customDiameterAngle !== null || activeLine?.isSymmetryAxis`.
   - Xóa dòng phụ đề dưới tiêu đề chính, xóa `educationalNote`, đổi nhãn chọn trục ngắn gọn, đưa thanh kéo lên trước hàng nút phụ, và hiển thị bộ chọn hình gọn trên `< 1024px`.
6. **Bước 6**: Chạy `npm run lint` và `npm run build` kiểm tra 0 lỗi.

## Rủi ro
- *Rủi ro*: Đang kẹt `git rebase` nếu chạy `git rebase --abort` bất cẩn sẽ mất code hiện tại trên working tree.
  *Giải pháp*: Dùng `git rebase --quit` hoặc hoàn tất `GIT_EDITOR=true git rebase --continue` trước khi sửa tiếp.

## Cách kiểm thử
1. Mở Con bướm (HĐ1):
   - Ở `0°`: hoàn toàn không có trục.
   - Kéo từ từ `1° → 178°`: chỉ thấy cánh bướm khép dần, **tuyệt đối chưa hiện trục `d`**.
   - Chạm `180°` (`100%`): hai cánh chồng khít → **lúc này trục đối xứng `d` mới hiện lên**; **không có** nút `Hiện các trục còn lại` trên Con bướm.
   - Bấm `Mở hình ra`: con bướm mở phẳng, trục `d` vẫn hiển thị rõ ở giữa thân. Nếu nắm cánh kéo gập lại ở `7°`, trục ẩn đi trong lúc đang gập và chỉ hiện lại khi gập khít `100%`.
2. Mở Hình chữ nhật / Hình vuông / Ngôi sao 6 cánh (nhiều trục): sau khi gập khít 1 trục, nút `Hiện các trục còn lại` xuất hiện và hoạt động đúng.
3. Mở Gấp & cắt giấy và Lưới ô vuông: nắm kéo trực tiếp trên hình SVG mượt mà; trục đối xứng ở bài cắt giấy chỉ hiện sau khi mở giấy xong.
4. Mở Bài 22: kéo xoay từ `0° → 179°` chưa hiện tâm `O`; chạm đúng `180°` chồng khít mới hiện tâm đối xứng `O`.
5. Thu nhỏ màn hình `< 1024px`: danh sách chọn hình luôn hiển thị gọn gàng; giao diện sạch câu chữ giáo án.
6. `npm run lint` và `npm run build` đạt PASS.

## Tiêu chí nghiệm thu
- Trục đối xứng / Tâm đối xứng **chỉ xuất hiện sau khi thao tác gập/xoay hoàn tất chồng khít 100%** (và giữ lại khi mở phẳng ra xem), tuyệt đối không lộ sớm ở góc trung gian như `7°`.
- Kéo trực tiếp mượt mà trên cả 4 loại sân khấu; danh sách hình hiển thị đầy đủ trên mọi màn hình; sạch câu chữ giáo án thừa; không hiện nút `Hiện các trục còn lại` trên hình 1 trục.
- `npm run lint` và `npm run build` thành công 0 lỗi.
