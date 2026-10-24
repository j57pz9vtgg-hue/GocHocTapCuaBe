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
- Làm bài mở popup với hình của giao diện đang chọn, tên đề, số câu thực tế và thời lượng. Các đề minh họa hiện không giới hạn thời gian.
- Thời gian bắt đầu khi bấm Bắt đầu/Tiếp tục, gồm thời gian rời trang. Lựa chọn và trạng thái lưu trên trình duyệt nếu localStorage được cho phép. Không đồng bộ sang thiết bị khác.
- Xem lại bài đã nộp hoặc làm lại từ đầu. Đề chưa có đáp án hiển thị Chờ đáp án.
- Câu hỏi hỗ trợ `text`/`english`, `translation`/`vietnamese`, `detail`, `image` trong `./assets/` và `imageAlt`. Chỉ hiện dữ liệu đã cung cấp.

## Nguyên tắc đáp án và mật khẩu

Đáp án/lời giải chỉ do chủ dự án cung cấp. Không tự giải, suy luận hoặc điền đáp án thiếu. Chưa có đáp án thì không chấm điểm. Khi nhận dữ liệu, nếu không khớp phải báo chủ dự án để xác nhận.

Đáp án hợp lệ cần `answer` (chỉ số lựa chọn bắt đầu từ 0) và `answerSource: 'user'`. Chỉ lưu `explanation` nếu đã được cung cấp. Hiện dữ liệu minh họa không có đáp án.

Mật khẩu phụ huynh chỉ mở đáp án/lời giải; không phải đăng nhập. Đặt/đổi/gỡ trong tab Mật khẩu; đổi/gỡ cần mật khẩu hiện tại. Bản băm có salt riêng dùng PBKDF2/SHA-256 lưu trên trình duyệt; HTTPS hoặc localhost cần cho Web Crypto. Đây là khóa thao tác của web tĩnh, không bảo vệ dữ liệu khỏi công cụ phát triển. Xóa dữ liệu trang sẽ mất bản lưu và mật khẩu.

Khóa localStorage riêng của dự án: `goc-hoc-tap.preferences.v1`, `goc-hoc-tap.parent-password.v1`, `goc-hoc-tap.attempts.v1`. Không đọc/ghi dữ liệu của ứng dụng mẫu. Xem các nguyên tắc làm việc trong `AGENTS.md`.

## Tránh lỗi bộ nhớ đệm sau cập nhật

`index.html` dùng tên tệp JS/CSS kèm mã nội dung, ví dụ `app.e282389fedd1.js`. Mỗi bản HTML tải đúng bộ tài nguyên tương ứng, tránh lấy JavaScript cũ cùng stylesheet mới.

Khi chỉnh sửa mã nguồn hoặc stylesheet, chạy trước khi kiểm tra/xuất bản:

```sh
python3 scripts/version-assets.py
```

Lệnh chỉ tạo bản sao tệp với mã SHA-256 và cập nhật đường dẫn HTML, không biên dịch và không cài phụ thuộc. Giữ các bản đã xuất bản để các trang còn trong bộ nhớ đệm tiếp tục có tài nguyên khớp phiên bản. Website vẫn xuất bản trực tiếp từ `main / (root)`.

Khung Cài đặt rộng tối đa 840px trên máy tính, tự co theo điện thoại. Tên giao diện xuống dòng đầy đủ; cuộn ở khung ngoài. Nút đóng 44×44px được giữ ở đầu khung khi cuộn.

## Luyện theo chủ đề TIMO

Riêng TIMO có 5 chủ đề lớn, mỗi nhóm hiện có 6 ô chủ đề nhỏ theo mẫu được duyệt. Máy tính chọn nhóm ở cột trái, điện thoại dùng nhóm mở/thu gọn. Tìm kiếm lọc trên cả tên nhóm và tên chủ đề nhỏ. Cấu trúc/tên tạm nằm ở `timoTopicGroups` trong `assets/data.js`. Chưa có nội dung do chủ dự án cung cấp, nút Luyện tập mở thông báo trống; không gán câu hỏi minh họa, đáp án hoặc kết quả cũ cho các chủ đề mới. Các chương trình và chế độ đề khác giữ dữ liệu hiện có.

Các ô chủ đề TIMO lấy huy hiệu, màu nền, nút và ảnh minh họa theo giao diện đang chọn. Chỉ Pixel dùng ảnh/huy hiệu Pixel; các giao diện khác dùng sprite của chính bộ đó và banner tương ứng trong popup.

## Màn hình đăng nhập

Mật khẩu đăng nhập chung được gửi riêng cho chủ dự án, tách biệt với mật khẩu phụ huynh trong tab Mật khẩu. `assets/access.js` chứa salt và bộ kiểm tra PBKDF2/SHA-256 (210.000 vòng), không chứa mật khẩu nguyên văn. `index.html` ẩn/inert khung học tập ngay từ đầu; không có JavaScript thì nút Đăng nhập bị vô hiệu hóa.

- Đăng nhập đúng khi không chọn ghi nhớ: giữ trạng thái trong tab hiện tại bằng sessionStorage; tab mới yêu cầu mật khẩu.
- Chọn Ghi nhớ đăng nhập: lưu trạng thái ở localStorage, lần mở sau trên cùng trình duyệt tự vào web, không phải nhập lại. Không lưu chuỗi mật khẩu vào dữ liệu trang.
- Cài đặt → Hướng dẫn → Đăng xuất: xóa trạng thái phiên và ghi nhớ, giữ bài làm, giao diện và mật khẩu phụ huynh.
- Khóa riêng: `goc-hoc-tap.access.remember.v1`, `goc-hoc-tap.access.session.v1`. Thay bộ kiểm tra mật khẩu sẽ làm trạng thái ghi nhớ cũ không còn hợp lệ.

Đây là khóa giao diện cho website tĩnh trên GitHub Pages, không phải xác thực hoặc phân quyền trên máy chủ. Tài nguyên tĩnh trong kho/trang vẫn có thể được đọc trực tiếp. Không dùng cơ chế này để bảo vệ dữ liệu nhạy cảm.
