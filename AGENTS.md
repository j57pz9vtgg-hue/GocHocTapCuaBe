# Nguyên tắc làm việc do chủ dự án yêu cầu

1. Đáp án do chủ dự án cung cấp. Không tự suy luận, tự tạo hoặc tự sửa đáp án/lời giải. Khi nhận nội dung, chỉ báo lại nếu câu hỏi và đáp án không khớp hoặc dữ liệu thiếu/không hợp lệ; chờ chủ dự án xác nhận. Không thay đáp án bằng kiến thức của trợ lý. Khi chưa có đáp án, web phải ghi “Chờ đáp án”, không tự chấm.
2. Xử lý yêu cầu theo thứ tự: hoàn tất yêu cầu đang làm, kiểm tra, đẩy lên web và xác minh việc triển khai trước khi bắt đầu yêu cầu mới. Ghi nhận yêu cầu mới vào hàng chờ nếu cần. Nếu triển khai bị chặn, báo rõ trạng thái và nguyên nhân; không nói đã triển khai thành công khi chưa có bằng chứng.
3. Ghi nhận các nguyên tắc bổ sung từ chủ dự án khi được thông báo.

Website hiện là HTML/CSS/JavaScript tĩnh, xuất bản GitHub Pages từ nhánh main, thư mục /(root). Không thêm bước build nếu không được yêu cầu.

Giao diện được chủ dự án yêu cầu sao chép từ `j57pz9vtgg-hue/Bai_Tap_Ve_Nha`. Ảnh/phông chữ/CSS gốc nằm ở `assets/reference`; chỉ đổi đường dẫn tài nguyên cho GitHub Pages khi cần. Giữ cấu trúc hình thức của bản gốc thay vì tự thiết kế lại. Không nhập đáp án, tài khoản hoặc cấu hình đồng bộ từ ứng dụng mẫu chỉ vì chúng có mặt trong kho nguồn. Mật khẩu hiện tại chỉ dành cho đáp án/lời giải, không phải đăng nhập; giữ ba tab cài đặt theo yêu cầu đã nhận.

Sau khi sửa bất kỳ tệp JS/CSS nguồn nào, chạy `python3 scripts/version-assets.py` trước khi kiểm tra và đẩy lên GitHub. `index.html` phải dùng các tệp JS/CSS có mã SHA-256 trong tên để tránh trộn HTML/CSS mới với JavaScript cũ trong bộ nhớ đệm. Giữ các bản đã xuất bản, không ghi đè hoặc xóa chúng; tệp nguồn không có mã vẫn dùng để chỉnh sửa. Không chuyển lại sang đường dẫn tài nguyên không có phiên bản.

Thanh công cụ chỉ hiển thị một nút **Cài đặt**. Không khôi phục các nút đám mây, bảng màu, mũi tên/đăng xuất hoặc Phụ huynh riêng khi đồng bộ thiết kế mẫu. Giữ ba tab Giao diện/Mật khẩu/Hướng dẫn; chức năng dữ liệu và về danh sách nằm bên trong Cài đặt.

Khung Cài đặt cần đủ rộng để hiện trọn tên giao diện. Không giới hạn chiều cao lưới khiến hàng bị co và cắt nhãn; cuộn ở khung ngoài. Nút đóng dùng SVG rõ nét, vùng bấm ít nhất 44×44px và vẫn thấy khi cuộn.

Bố cục danh sách đề và bộ chọn lớp/chương trình/môn/nội dung dùng Pixel làm chuẩn chung cho cả 11 giao diện: chiều rộng tận dụng màn hình, lề cân hai bên, số cột và khoảng cách đồng nhất theo breakpoint. Giữ màu sắc/hình nền riêng; không thêm lại tiêu đề, lớp/môn và số đề dư thừa trên danh sách.

Nguyên tắc bổ sung ngày 24/10/2026: hoàn tất và xuất bản các yêu cầu đang có trước. Sau đó, với mỗi yêu cầu mới, phải thực hiện, kiểm tra, xuất bản thành công riêng từng yêu cầu rồi mới bắt đầu yêu cầu kế tiếp; không gộp nhiều yêu cầu để xuất bản một lần.
