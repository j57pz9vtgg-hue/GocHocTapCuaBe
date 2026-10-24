# Góc học tập của bé

Website tĩnh HTML/CSS/JavaScript, xuất bản GitHub Pages từ nhánh `main`, thư mục `/(root)`. Không cần npm hay bước build để chạy/xuất bản.

## Chạy và xuất bản

Mở `index.html` hoặc phục vụ thư mục dự án:

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

Dùng cấu trúc/thẻ, banner, bộ lọc, sprites và bố cục của giao diện gốc. Dữ liệu bài học và dịch vụ của ứng dụng mẫu không được sao chép. Không nhập cấu hình Firebase, tài khoản, màn hình đăng nhập hay đáp án từ ứng dụng khác. Biểu tượng đám mây quản lý dữ liệu cục bộ/tải bản sao, chưa có đồng bộ trực tuyến; biểu tượng mũi tên đưa về danh sách. Giữ ba tab Giao diện/Mật khẩu/Hướng dẫn theo yêu cầu của chủ dự án.

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
