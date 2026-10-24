# Góc học tập của bé

Website tĩnh HTML/CSS/JavaScript, xuất bản GitHub Pages từ nhánh `main`, thư mục `/(root)`. Không cần npm hay bước build để chạy/xuất bản.

## Chạy và xuất bản

Phục vụ thư mục dự án qua localhost để dùng Web Crypto cho mật khẩu:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

GitHub: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Địa chỉ: https://j57pz9vtgg-hue.github.io/GocHocTapCuaBe/.

## Thiết kế giao diện

Theo yêu cầu chủ dự án, tái sử dụng trực tiếp bộ thiết kế từ `j57pz9vtgg-hue/Bai_Tap_Ve_Nha`, commit `2b5fdecc94329b5979d8f6f1d375b4b529a73c18`:

- `assets/reference/media/`: 53 tài nguyên hình ảnh gốc, giữ nguyên nội dung tệp.
- `assets/reference/fonts/`: 4 phông chữ gốc và 2 giấy phép OFL.
- `assets/reference/styles/`: 7 stylesheet gốc, chỉ đổi đường dẫn tài nguyên để chạy dưới `/GocHocTapCuaBe/`.
- `assets/icons.js`: biểu tượng Lucide có cùng hình học với giao diện gốc; không cần React ở thời gian chạy.
- `assets/compat.css`: kết nối giao diện gốc với hành vi của ứng dụng tĩnh hiện tại.

11 giao diện: Khám phá Bắc Cực, Đồ chơi 3D mềm, Thế giới Pixel, Thỏ con, Đảo pha lê, Thành phố trên mây, Rừng đom đóm, Nhà khám phá khủng long, Phép thuật, Kho báu và Ô tô. Giao diện ban đầu là Bắc Cực. Lựa chọn cũ `space` chuyển thành Đảo pha lê; lựa chọn Rừng vẫn được giữ.

Dùng cấu trúc/thẻ, banner, bộ lọc, sprites và bố cục của giao diện gốc. Dữ liệu bài học và dịch vụ của ứng dụng mẫu không được sao chép. Không nhập cấu hình Firebase, tài khoản, màn hình đăng nhập hay đáp án từ ứng dụng khác. Thanh trên cùng chỉ có một nút Cài đặt. Ba tab Giao diện/Mật khẩu/Hướng dẫn gom toàn bộ chức năng; trong Hướng dẫn có Dữ liệu trên thiết bị/tải bản sao và Về danh sách bài tập. Chưa có đồng bộ trực tuyến.

## Hành vi học tập

- Chọn lớp, chương trình, môn, nội dung; tìm kiếm theo tên bài.
- Làm bài mở popup với hình của giao diện đang chọn, tên đề, số câu thực tế và thời lượng. Thời lượng được hiển thị theo dữ liệu đề được cung cấp.
- Thời gian bắt đầu khi bấm Bắt đầu/Tiếp tục, gồm thời gian rời trang. Lựa chọn và trạng thái lưu trên trình duyệt nếu localStorage được cho phép. Không đồng bộ sang thiết bị khác.
- Xem lại bài đã nộp hoặc làm lại từ đầu. Đề chưa có đáp án hiển thị Chờ đáp án.
- Câu hỏi hỗ trợ `text`/`english`, `translation`/`vietnamese`, `detail`, `image` trong `./assets/` và `imageAlt`. Chỉ hiện dữ liệu đã cung cấp.

## Nguyên tắc đáp án và mật khẩu

Đáp án/lời giải chỉ do chủ dự án cung cấp. Không tự giải, suy luận hoặc điền đáp án thiếu. Chưa có đáp án thì không chấm điểm. Khi nhận dữ liệu, nếu không khớp phải báo chủ dự án để xác nhận.

Đáp án hợp lệ cần `answer` (chỉ số lựa chọn bắt đầu từ 0) và `answerSource: 'user'`. Chỉ lưu `explanation` nếu đã được cung cấp. Đã nhập đề chính thức do chủ dự án cung cấp; chưa có đáp án.

Mật khẩu phụ huynh chỉ mở đáp án/lời giải; không phải đăng nhập. Đặt/đổi/gỡ trong tab Mật khẩu; đổi/gỡ cần mật khẩu hiện tại. Bản băm có salt riêng dùng PBKDF2/SHA-256 lưu trên trình duyệt; HTTPS hoặc localhost cần cho Web Crypto. Đây là khóa thao tác của web tĩnh, không bảo vệ dữ liệu khỏi công cụ phát triển. Xóa dữ liệu trang sẽ mất bản lưu và mật khẩu.

Khóa localStorage riêng của dự án: `goc-hoc-tap.preferences.v1`, `goc-hoc-tap.parent-password.v1`, `goc-hoc-tap.attempts.official.v1`. Không đọc/ghi dữ liệu của ứng dụng mẫu. Xem các nguyên tắc làm việc trong `AGENTS.md`.

## Tránh lỗi bộ nhớ đệm sau cập nhật

`index.html` dùng tên tệp JS/CSS kèm mã nội dung, ví dụ `app.e282389fedd1.js`. Mỗi bản HTML tải đúng bộ tài nguyên tương ứng, tránh lấy JavaScript cũ cùng stylesheet mới.

Khi chỉnh sửa mã nguồn hoặc stylesheet, chạy trước khi kiểm tra/xuất bản:

```sh
python3 scripts/version-assets.py
```

Lệnh chỉ tạo bản sao tệp với mã SHA-256 và cập nhật đường dẫn HTML, không biên dịch và không cài phụ thuộc. Giữ các bản đã xuất bản để các trang còn trong bộ nhớ đệm tiếp tục có tài nguyên khớp phiên bản. Website vẫn xuất bản trực tiếp từ `main / (root)`.

Khung Cài đặt rộng tối đa 840px trên máy tính, tự co theo điện thoại. Tên giao diện xuống dòng đầy đủ; cuộn ở khung ngoài. Nút đóng 44×44px được giữ ở đầu khung khi cuộn.

## Luyện theo chủ đề TIMO

Riêng TIMO chỉ có môn Toán, với cấu trúc 5 chủ đề lớn đã được duyệt. Tên chủ đề nhỏ được bổ sung theo chỉ dẫn của chủ dự án; các câu chưa có tên vào Chưa phân loại. Máy tính chọn nhóm ở cột trái, điện thoại dùng nhóm mở/thu gọn. Cấu trúc và tên nhóm nằm ở `timoTopicGroups` trong `assets/data.js`.

Các ô chủ đề TIMO lấy huy hiệu, màu nền, nút và ảnh minh họa theo giao diện đang chọn. Chỉ Pixel dùng ảnh/huy hiệu Pixel; các giao diện khác dùng sprite của chính bộ đó và banner tương ứng trong popup.

## Màn hình đăng nhập

Mật khẩu đăng nhập chung được gửi riêng cho chủ dự án, tách biệt với mật khẩu phụ huynh trong tab Mật khẩu. `assets/access.js` chứa salt và bộ kiểm tra PBKDF2/SHA-256 (210.000 vòng), không chứa mật khẩu nguyên văn. `index.html` ẩn/inert khung học tập ngay từ đầu; không có JavaScript thì nút Đăng nhập bị vô hiệu hóa.

- Đăng nhập đúng khi không chọn ghi nhớ: giữ trạng thái trong tab hiện tại bằng sessionStorage; tab mới yêu cầu mật khẩu.
- Chọn Ghi nhớ đăng nhập: lưu trạng thái ở localStorage, lần mở sau trên cùng trình duyệt tự vào web, không phải nhập lại. Không lưu chuỗi mật khẩu vào dữ liệu trang.
- Cài đặt → Hướng dẫn → Đăng xuất: xóa trạng thái phiên và ghi nhớ, giữ bài làm, giao diện và mật khẩu phụ huynh.
- Khóa riêng: `goc-hoc-tap.access.remember.v1`, `goc-hoc-tap.access.session.v1`. Thay bộ kiểm tra mật khẩu sẽ làm trạng thái ghi nhớ cũ không còn hợp lệ.

Đây là khóa giao diện cho website tĩnh trên GitHub Pages, không phải xác thực hoặc phân quyền trên máy chủ. Tài nguyên tĩnh trong kho/trang vẫn có thể được đọc trực tiếp. Không dùng cơ chế này để bảo vệ dữ liệu nhạy cảm.

## Nhận đề chính thức

Toàn bộ câu hỏi minh họa, ô đề tạm và chủ đề nhỏ tạm đã được gỡ khỏi danh sách đang dùng. `officialPapers` trong `assets/data.js` chỉ chứa bộ đề do chủ dự án cung cấp. Danh sách chỉ hiển thị các bản ghi khớp chương trình/môn/lớp/nội dung, có `id` ổn định, `title` và `questions` không rỗng. Không sinh tự động 15 ô hoặc câu hỏi thay thế khi chưa có dữ liệu.

Chủ dự án gửi tất cả bộ đề trước rồi mới gửi đáp án. Đề chưa có đáp án vẫn được luyện/nộp khi đã được nhập, kết quả luôn Chờ đáp án. Không tự suy luận đáp án. Chỉ bổ sung đáp án với `answerSource: 'user'` khi đã được cung cấp.

Bài làm chính thức lưu trong `goc-hoc-tap.attempts.official.v1`, khóa gồm lớp/chương trình/môn/nội dung/id đề. Dữ liệu đề minh họa cũ không được nhập lại hay gán cho đề chính thức. Các tài nguyên đã xuất bản được giữ nguyên theo cơ chế bộ nhớ đệm; HTML hiện hành chỉ tải dữ liệu mới không còn câu hỏi mẫu.

## Tự phân chủ đề TIMO

5 nhóm có tên song ngữ và khoảng số câu cố định: Logical thinking / Tư duy lô-gic (1–5), Arithmetic / Số học (6–10), Number Theory / Lý thuyết số (11–15), Geometry / Hình học (16–20), Combinatorics / Tổ hợp (21–25). `getTimoTopicGroups(grade)` tự xây ngân hàng từ các đề TIMO Toán vòng loại/quốc gia cùng lớp trong `officialPapers`.

Câu hỏi giữ tham chiếu tới bản gốc, kèm id đề và số câu nguồn; không sao chép/suy luận đáp án. Có `number` thì dùng số đã khai báo, nếu không dùng vị trí 1–25. Đề thiếu/trùng/sai số câu phải báo để sửa dữ liệu, không âm thầm phân loại. Mỗi nhóm luôn có “Chưa phân loại”; chỉ chuyển sang nhóm nhỏ có tên khi trường `subtopic` được cung cấp. Ngoại lệ chủ dự án yêu cầu: trợ lý đặt tên riêng cho từng câu của Đề số 1 vòng loại TIMO lớp 2; không áp dụng tự đặt tên cho các đề khác.

Các bộ đề mới tự cộng câu hỏi vào nhóm tương ứng; danh sách không nhân bản khi dựng lại giao diện. Luyện theo chủ đề giữ số câu và tên đề nguồn, bài chưa có đáp án tiếp tục Chờ đáp án. Bài làm theo chủ đề lưu danh sách id câu nguồn để khôi phục lựa chọn đúng câu khi ngân hàng được bổ sung hoặc sắp xếp lại.

Kiểm tra dữ liệu trước xuất bản: `node scripts/check-data.cjs`. Kiểm thử quy tắc phân nhóm: `node --test tests/timo-topics.test.cjs`. Không có câu hỏi hoặc đáp án kiểm thử nào được đưa vào dữ liệu xuất bản.

## Đề số 1 vòng loại TIMO lớp 2

Nguồn: 5 ảnh chụp do chủ dự án gửi trong cuộc trò chuyện. Id: `timo-grade2-qualifying-01`, thuộc lớp 2 / TIMO / Toán / Đề vòng loại. Đã nhập 25 câu song ngữ và 100 lựa chọn đúng thứ tự A–D; chưa có `answer`, `answerSource` hoặc `explanation`.

Chủ dự án cho phép đặt một tên chủ đề nhỏ riêng cho mỗi câu chỉ trong bộ đề này. 25 tên được lưu ở `subtopic`, tự phân thành 5 nhóm theo số câu. Chưa phân loại vẫn có trong dữ liệu, nhưng ô trống được ẩn khi nhóm đã có các chủ đề nhỏ chứa câu hỏi.

Các hình/sơ đồ được dựng lại bằng SVG tại `assets/papers/timo-grade2-qualifying-01/`: 15 hình nội dung câu hỏi và 4 hình lựa chọn của câu 17. Nét và vị trí dựa trên ảnh gốc, không bổ sung lời giải hay ngoại suy kết quả. Tên tệp có SHA-256 để không thay đổi tài nguyên đã xuất bản. Bài đầy đủ giữ 5 đề mục lớn; luyện chủ đề giữ số câu và nguồn đề gốc.

Tên 5 nhóm lớn hiển thị trên một dòng, các ô có cùng chiều rộng theo tên dài nhất. Không hiển thị ghi chú khoảng câu trên các ô; quy tắc khoảng câu vẫn giữ nguyên trong dữ liệu phân loại. Đã kiểm tra từ 320px đến 1920px trên đủ 11 giao diện.

## Đề số 2 vòng loại TIMO lớp 2

Nguồn: 5 ảnh chụp do chủ dự án gửi tiếp theo Đề số 1. Id: `timo-grade2-qualifying-02`. Có 25 câu song ngữ, 100 lựa chọn, 15 hình/sơ đồ và 4 hình lựa chọn của câu 17 trong `assets/papers/timo-grade2-qualifying-02/`.

Không có `subtopic`, `answer`, `answerSource` hay `explanation` trên các câu của Đề số 2. Mỗi nhóm lớn tự nhận đúng 5 câu vào Chưa phân loại. Đề số 1 giữ nguyên 25 tên chủ đề nhỏ đã được cho phép. Tổng ngân hàng lớp 2 hiện là 50 câu, phân biệt bằng id đề và số câu gốc, không trộn bài làm giữa hai đề. Cả hai đề đều chờ đáp án của chủ dự án.

`node scripts/check-data.cjs` còn kiểm tra số lượng hình lựa chọn, sự tồn tại của ảnh và mã SHA-256 trong tên tài nguyên trước khi xuất bản.
