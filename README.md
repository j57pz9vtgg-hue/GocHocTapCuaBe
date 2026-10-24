# Góc học tập của bé

Website tĩnh dùng HTML, CSS, JavaScript thuần. Không cần React, Vite, npm hay bước build.

## Xem trên máy

Mở `index.html` trực tiếp trong trình duyệt, hoặc chạy từ thư mục dự án:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

## Đăng lên GitHub Pages

1. Đưa `index.html`, toàn bộ thư mục `assets` và `.nojekyll` lên nhánh `main` của kho `j57pz9vtgg-hue/GocHocTapCuaBe`. Giữ đúng cấu trúc thư mục, không chỉ tải mỗi tệp HTML.
2. Mở **Settings → Pages**.
3. Chọn **Source → Deploy from a branch**.
4. Chọn **main → /(root)** rồi bấm **Save**.
5. Chờ GitHub Pages xuất bản, sau đó mở https://j57pz9vtgg-hue.github.io/GocHocTapCuaBe/.

Không cần tạo workflow riêng. GitHub có thể hiển thị tác vụ Pages tự động trong tab Actions. Các đường dẫn tài nguyên là tương đối nên chạy được cả ở đường dẫn gốc và dưới tên kho.

## Tính năng và dữ liệu

Chọn lớp 1–12, chương trình TIMO/ASMO/Báo bài của trường, môn học và nhóm luyện tập; làm bài mẫu, nộp bài và làm lại. Điểm và lời giải chỉ hiển thị khi có đáp án do chủ dự án cung cấp. Trạng thái bài chỉ giữ trong phiên trang hiện tại, chưa lưu sau khi tải lại.

Nội dung hiện là minh họa, chưa có đề TIMO/ASMO chính thức hoặc báo bài của trường. Câu hỏi ngôn ngữ dùng chung giữa các lớp và các chủ đề cần được bổ sung ngân hàng câu hỏi thực tế trước khi dùng chính thức.

- `index.html`: trang chính, điều hướng và hộp hướng dẫn.
- `assets/styles.css`: giao diện, bố cục máy tính/điện thoại.
- `assets/app.js`: bộ lọc, luồng làm bài và chấm điểm.
- `assets/data.js`: dữ liệu câu hỏi mẫu.
- `assets/space-banner.png`, `assets/forest-banner.png`, `assets/space-stickers.png`, `assets/favicon.svg`: hình ảnh.
- `assets/settings.js`: giao diện, mật khẩu và mở khóa lời giải.

Website không cần tài khoản, máy chủ cơ sở dữ liệu hoặc API key.

## Giao diện và cài đặt phụ huynh

- Giao diện lưới 15 đề mẫu; chế độ chủ đề hiện có 3 chủ đề mỗi môn.
- Nút **Cài đặt** cho phép chọn **Vũ trụ xanh** / **Khu rừng kỳ diệu**, đặt/đổi/gỡ mật khẩu, đọc hướng dẫn sử dụng.
- Không có màn hình đăng nhập. Bé được học và nộp bài bình thường; điểm chỉ có khi đã nhận đáp án của chủ dự án. Nếu đã cài mật khẩu, nút **Xem đáp án và lời giải** sẽ yêu cầu mật khẩu phụ huynh. Khi làm lại bài, lời giải được ẩn lại.
- Đổi/gỡ mật khẩu cần nhập mật khẩu hiện tại. Nếu chưa cài mật khẩu, lời giải có thể xem trực tiếp.
- Giao diện và bản băm mật khẩu có salt riêng (PBKDF2/SHA-256) được lưu bằng localStorage trên trình duyệt hiện tại. Không lưu mật khẩu dạng văn bản. Không dùng mật khẩu tài khoản quan trọng khác cho chức năng này.
- Đây là cơ chế hỗ trợ phụ huynh của web tĩnh, không bảo vệ đáp án khỏi người có khả năng đọc hoặc sửa mã JavaScript. Xóa dữ liệu trang sẽ xóa giao diện đã lưu và mật khẩu. Muốn quản lý an toàn qua nhiều thiết bị cần backend.
- Đặt và xác nhận mật khẩu cần HTTPS (GitHub Pages) hoặc localhost khi phát triển.

## Quy tắc đáp án

Không tự suy luận hoặc tự tạo đáp án/lời giải. Dữ liệu minh họa hiện chỉ có câu hỏi và lựa chọn, không có đáp án. Web hiển thị **Chờ đáp án**, không tự chấm hoặc mở lời giải khi chưa được cung cấp đáp án.

Khi chủ dự án cung cấp đáp án, lưu `answer` là chỉ số lựa chọn từ 0, `answerSource: 'user'` và chỉ đưa `explanation` nếu đã được cung cấp. Mọi câu hỏi trong bài phải có đáp án hợp lệ trước khi chấm. Nếu dữ liệu không khớp, báo chủ dự án thay vì tự sửa.

Nguyên tắc làm việc của chủ dự án được lưu trong `AGENTS.md`.

## Thẻ đề

Thẻ đề hiển thị số thứ tự, tên đề, trạng thái, kết quả và thời gian làm bài; minh họa nằm bên phải, nút Làm bài ở dưới. Chưa làm hiển thị `—`. Khi nộp bài, thời gian được đo từ lúc mở bài đến khi nộp; chưa có đáp án được cung cấp thì kết quả hiển thị `Chờ đáp án`. Trạng thái và thời gian hiện chỉ lưu trong phiên trang đang mở.
