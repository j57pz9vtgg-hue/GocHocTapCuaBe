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

Chọn lớp 1–12, chương trình TIMO/ASMO/Báo bài của trường, môn học và nhóm luyện tập; làm bài mẫu, nộp bài, xem điểm, lời giải và làm lại. Kết quả chỉ giữ trong phiên trang hiện tại, chưa lưu sau khi tải lại.

Nội dung hiện là minh họa, chưa có đề TIMO/ASMO chính thức hoặc báo bài của trường. Câu hỏi ngôn ngữ dùng chung giữa các lớp và các chủ đề cần được bổ sung ngân hàng câu hỏi thực tế trước khi dùng chính thức.

- `index.html`: trang chính, điều hướng và hộp hướng dẫn.
- `assets/styles.css`: giao diện, bố cục máy tính/điện thoại.
- `assets/app.js`: bộ lọc, luồng làm bài và chấm điểm.
- `assets/data.js`: dữ liệu câu hỏi mẫu.
- `assets/study-illustration.png`, `assets/favicon.svg`: hình ảnh.

Website không cần tài khoản, máy chủ cơ sở dữ liệu hoặc API key.
