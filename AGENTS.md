# Nguyên tắc làm việc do chủ dự án yêu cầu

1. Đáp án do chủ dự án cung cấp. Không tự suy luận, tự tạo hoặc tự sửa đáp án/lời giải. Khi nhận nội dung, chỉ báo lại nếu câu hỏi và đáp án không khớp hoặc dữ liệu thiếu/không hợp lệ; chờ chủ dự án xác nhận. Không thay đáp án bằng kiến thức của trợ lý. Khi chưa có đáp án, web phải ghi “Chờ đáp án”, không tự chấm.
2. Xử lý yêu cầu theo thứ tự: hoàn tất yêu cầu đang làm, kiểm tra, đẩy lên web và xác minh việc triển khai trước khi bắt đầu yêu cầu mới. Ghi nhận yêu cầu mới vào hàng chờ nếu cần. Nếu triển khai bị chặn, báo rõ trạng thái và nguyên nhân; không nói đã triển khai thành công khi chưa có bằng chứng.
3. Ghi nhận các nguyên tắc bổ sung từ chủ dự án khi được thông báo.

Website hiện là HTML/CSS/JavaScript tĩnh, xuất bản GitHub Pages từ nhánh main, thư mục /(root). Không thêm bước build nếu không được yêu cầu.

Giao diện được chủ dự án yêu cầu sao chép từ `j57pz9vtgg-hue/Bai_Tap_Ve_Nha`. Ảnh/phông chữ/CSS gốc nằm ở `assets/reference`; chỉ đổi đường dẫn tài nguyên cho GitHub Pages khi cần. Giữ cấu trúc hình thức của bản gốc thay vì tự thiết kế lại. Không nhập đáp án, tài khoản hoặc cấu hình đồng bộ từ ứng dụng mẫu chỉ vì chúng có mặt trong kho nguồn. Mật khẩu phụ huynh trong tab Mật khẩu chỉ dành cho đáp án/lời giải, riêng với mật khẩu đăng nhập; giữ ba tab cài đặt theo yêu cầu đã nhận.

Sau khi sửa bất kỳ tệp JS/CSS nguồn nào, chạy `python3 scripts/version-assets.py` trước khi kiểm tra và đẩy lên GitHub. `index.html` phải dùng các tệp JS/CSS có mã SHA-256 trong tên để tránh trộn HTML/CSS mới với JavaScript cũ trong bộ nhớ đệm. Giữ các bản đã xuất bản, không ghi đè hoặc xóa chúng; tệp nguồn không có mã vẫn dùng để chỉnh sửa. Không chuyển lại sang đường dẫn tài nguyên không có phiên bản.

Thanh công cụ chỉ hiển thị một nút **Cài đặt**. Không khôi phục các nút đám mây, bảng màu, mũi tên/đăng xuất hoặc Phụ huynh riêng khi đồng bộ thiết kế mẫu. Giữ ba tab Giao diện/Mật khẩu/Hướng dẫn; chức năng dữ liệu và về danh sách nằm bên trong Cài đặt.

Khung Cài đặt cần đủ rộng để hiện trọn tên giao diện. Không giới hạn chiều cao lưới khiến hàng bị co và cắt nhãn; cuộn ở khung ngoài. Nút đóng dùng SVG rõ nét, vùng bấm ít nhất 44×44px và vẫn thấy khi cuộn.

Bố cục danh sách đề và bộ chọn lớp/chương trình/môn/nội dung dùng Pixel làm chuẩn chung cho cả 11 giao diện: chiều rộng tận dụng màn hình, lề cân hai bên, số cột và khoảng cách đồng nhất theo breakpoint. Giữ màu sắc/hình nền riêng; không thêm lại tiêu đề, lớp/môn và số đề dư thừa trên danh sách.

Nguyên tắc bổ sung ngày 24/10/2026: hoàn tất và xuất bản các yêu cầu đang có trước. Sau đó, với mỗi yêu cầu mới, phải thực hiện, kiểm tra, xuất bản thành công riêng từng yêu cầu rồi mới bắt đầu yêu cầu kế tiếp; không gộp nhiều yêu cầu để xuất bản một lần.

Ô Tìm bài tập và nút Cài đặt dùng cùng một vị trí góc trên bên phải banner trên cả 11 giao diện, không nằm dưới banner hoặc chen vào bộ chọn; màn hình nhỏ phải tránh che tên web.

Khung bộ chọn lớp/chương trình/môn/nội dung phải thẳng hai mép với lưới ô đề trên cả 11 giao diện, dùng chung lề theo màn hình; không dùng margin âm làm khung bộ chọn rộng hơn dãy đề.

Giao diện chủ đề TIMO: chỉ Pixel dùng huy hiệu và hình sách Pixel. Mỗi giao diện còn lại dùng màu, kiểu số và ảnh minh họa thuộc bộ chủ đề tương ứng; không tái dùng ảnh Pixel cho các chủ đề khác.

Theo yêu cầu mới, web có màn hình đăng nhập bằng mật khẩu chung riêng do trợ lý đặt và gửi chủ dự án. Không dùng mật khẩu phụ huynh để đăng nhập. Ghi nhớ chỉ sau khi đăng nhập đúng và tích chọn; giữ trên cùng trình duyệt đến khi đăng xuất. Không lưu mật khẩu nguyên văn trong repo hoặc localStorage/sessionStorage. Đăng xuất ở Cài đặt → Hướng dẫn, chỉ xóa trạng thái truy cập, giữ bài làm và mật khẩu đáp án. Đây là khóa giao diện cho web tĩnh, không phải xác thực máy chủ.

TIMO chỉ có môn Toán; không hiển thị hoặc giữ lựa chọn Tiếng Việt/Tiếng Anh khi chuyển sang TIMO. Đã gỡ toàn bộ đề/câu hỏi minh họa và ô đề giả khỏi danh sách đang dùng; danh sách đề chính thức chỉ chứa nội dung do chủ dự án gửi. Giữ cấu trúc 5 nhóm TIMO nhưng không tự sinh chủ đề nhỏ/nội dung luyện tập. Bài làm chính thức dùng namespace riêng và id đề ổn định để không gán kết quả đề mẫu cho đề mới.

Chủ dự án sẽ gửi toàn bộ bộ đề trước, rồi mới gửi đáp án. Nhập đề đúng nội dung đã gửi; trong thời gian chờ đáp án không suy luận hoặc chấm điểm, chỉ hiển thị “Chờ đáp án”. Khi đáp án được gửi, đối chiếu và báo dữ liệu không khớp, không tự sửa.

TIMO có 5 chủ đề lớn cố định theo số câu của mỗi đề 25 câu: Logical thinking / Tư duy lô-gic (1–5); Arithmetic / Số học (6–10); Number Theory / Lý thuyết số (11–15); Geometry / Hình học (16–20); Combinatorics / Tổ hợp (21–25). Mỗi đề chính thức mới tự đưa tham chiếu câu hỏi vào nhóm tương ứng, giữ nguyên nội dung, số câu gốc, lớp và nguồn đề. Không đặt tên chủ đề nhỏ bằng suy luận nếu chưa được yêu cầu; dùng “Chưa phân loại” ở mỗi nhóm. Riêng Đề số 1 vòng loại TIMO lớp 2, chủ dự án đã yêu cầu trợ lý đọc nội dung và đặt một tên chủ đề nhỏ riêng cho mỗi câu; đây là ngoại lệ đặt tên, không phải cho phép suy luận đáp án. Các đề khác tiếp tục dùng Chưa phân loại khi chưa có tên được cung cấp.

Các yêu cầu ngày 24/10/2026 được xử lý theo thứ tự riêng: Đề số 1 vòng loại TIMO lớp 2 (25 tên chủ đề nhỏ riêng, xuất bản ở 40ffeba); bố cục tên nhóm lớn một dòng, cùng chiều rộng và không có ghi chú khoảng câu (xuất bản ở 5aa1e85); sau đó Đề số 2 vòng loại TIMO lớp 2. Theo yêu cầu phân loại tiếp theo, Đề số 2 có 21 câu ghép vào các tên chủ đề nhỏ có sẵn của Đề số 1; câu 3, 13, 22, 23 vẫn Chưa phân loại. Không tạo tên mới cho Đề số 2. Cả hai đề chưa có đáp án, tuyệt đối không tự chấm.

Tên của 5 chủ đề lớn TIMO phải hiển thị trọn trên một dòng (Anh / Việt). Bỏ ghi chú khoảng câu trên ô chọn; khoảng 1–5/6–10/11–15/16–20/21–25 vẫn dùng nội bộ để phân loại. Cả 5 ô cùng chiều rộng, tự đủ cho tên dài nhất; điện thoại vẫn phải vừa màn hình.

Trang làm bài chỉ giữ nút Nộp bài trên thanh phía trên, không có nút nộp ở cuối bài. Nội dung đề dùng Times New Roman/Times/serif; yêu cầu mới cho phép đổi phông và cỡ chữ: Times New Roman 12pt (16px) cho nội dung, số câu, bản dịch, lựa chọn và đề mục bên trong tờ đề. Giữ màu, độ đậm, quy tắc giãn dòng, khoảng cách và hình; không đổi kiểu chữ thanh công cụ hoặc phần còn lại của web. Điều kiện nộp hiện tại vẫn là trả lời đủ số câu (2/25 bị khóa, 25/25 mở); không tự đổi quy tắc này nếu chưa được yêu cầu.

Không hiển thị ghi chú tên đề nguồn (ví dụ “Đề vòng loại 01”) bên dưới từng câu hỏi. Vẫn giữ nguồn đề, số câu và id câu trong dữ liệu để phân loại, lưu bài và ghép đáp án chính xác.

Đồng hồ làm bài đếm tăng từ 00:00 khi câu hỏi được mở (không tính popup giới thiệu của lượt mới), cập nhật theo giây và dừng khi nộp/xem lại; làm lại đặt về 00:00. Giữ dấu thời gian phiên đã lưu khi tiếp tục bài, không tạo nhiều bộ đếm hoặc để bộ đếm chạy cập nhật sau khi về danh sách. Không tự đặt giới hạn thời gian nếu đề chưa cung cấp.

Chỉ ghép các câu Đề số 2 vào chủ đề nhỏ đã có khi nội dung phù hợp. Câu 3 nói tuổi quá khứ (tên hiện có nói hiện tại/tương lai), câu 13 nói kết quả lẻ (tên hiện có nói chẵn), câu 22 lập số lẻ (tên hiện có lập số chẵn), câu 23 tìm tổng lớn nhất (tên hiện có nhỏ nhất) chưa phù hợp nên để Chưa phân loại. Đây là phân loại nội dung, không phải lời giải/đáp án. Theo yêu cầu mới, áp dụng rà và ghép tên có sẵn cho toàn bộ câu Chưa phân loại của 7 đề hiện có. Không tạo hoặc đổi tên chủ đề; câu chưa khớp giữ nguyên.

Luyện theo chủ đề nhỏ: mỗi lần mở hoặc Làm lại phải có thứ tự câu khác lượt trước khi có ít nhất 2 câu. Chỉ đảo các bộ tham chiếu câu/id/nguồn đồng thời; giữ số câu gốc, lựa chọn A–D và đáp án gắn với đúng câu. Lưu thứ tự cuối theo lớp/chủ đề, có bộ nhớ dự phòng nếu trình duyệt chặn lưu. Bài đang làm được ghép lại câu trả lời bằng id. Không đảo bộ đề đầy đủ; chủ đề 1 câu giữ nguyên.

Lần rà phân loại mới ghép thêm 78 câu của Đề 3–7 vào đúng 25 tên có sẵn, trong nhóm lớn ban đầu. Tổng 175 câu: 124 câu có chủ đề nhỏ và 51 câu Chưa phân loại. Không ghép câu nhìn từ phải/trên/bên vào tên chỉ nói phía trước; không ghép số lẻ hoặc được lặp chữ số vào tên số chẵn không lặp; không ghép tổng lớn nhất vào tổng nhỏ nhất. Giữ nguyên 4 câu chưa khớp của Đề 2 và toàn bộ nội dung/ảnh/lựa chọn/id/đáp án nguồn.

Chủ dự án chỉ định riêng: câu 2 Đề số 7 (dãy chữ A, Z, B, __, C, X, D, W) thuộc chủ đề nhỏ có sẵn “Quy luật dãy số” trong Logical thinking. Chỉ chuyển đúng câu này, không đổi tên chủ đề hoặc tự mở rộng sang các câu khác. Sau chuyển: 125 câu có chủ đề nhỏ, 50 câu Chưa phân loại.

Chỉ định riêng tiếp theo của chủ dự án bằng ảnh: chuyển đúng 4 câu vào “Tuổi hiện tại và tương lai”: Đề 7 câu 5 (Alice mua bánh), Đề 2 câu 3 (Karik), Đề 5 câu 4 (Dan), Đề 7 câu 1 (tháng). Đây là phân loại do chủ dự án chỉ định, kể cả hai câu không nói về tuổi; không tự hoàn tác hoặc mở rộng sang câu khác. Chủ đề tăng từ 2 lên 6 câu; tổng 129 câu có chủ đề, 46 câu Chưa phân loại.

Tải lại trang bằng nút trình duyệt phải tiếp tục tại màn hình hiện tại trong cùng tab: giữ bộ lọc, nhóm chủ đề, từ khóa, đề/chủ đề đang mở, thứ tự câu, lựa chọn, thời gian bắt đầu/kết thúc và vị trí đang xem. Ghi tham chiếu id vào sessionStorage riêng theo tab, lấy nội dung mới từ ngân hàng hiện hành khi tải lại; không lưu bản sao đề hoặc mật khẩu. Khôi phục sau khi mở khóa đăng nhập; không tự mở khóa đáp án phụ huynh. Thoát về danh sách/đăng xuất phải ghi trạng thái mới, không kéo lại màn hình cũ.

Chủ dự án tiếp tục chỉ định: Đề 4 câu 4 (Lucy) và Đề 6 câu 5 (Amy) chuyển vào “Tuổi hiện tại và tương lai”. Câu 3 Đề 6 ở giữa ảnh không được yêu cầu chuyển, giữ nguyên Chưa phân loại. Chủ đề tuổi hiện có 8 câu; tổng 131 câu có chủ đề nhỏ, 44 câu Chưa phân loại.

Chủ dự án đổi tên nhóm “Phối hợp lựa chọn” thành “Có bao nhiêu cách kết hợp khác nhau?”. Đổi nhãn trên 5 câu hiện có nhưng giữ id chủ đề cũ để không mất bài đang làm, thứ tự và trạng thái tải lại. Không thêm/bớt hoặc chuyển câu giữa các nhóm trong yêu cầu đổi tên này.

Chủ dự án yêu cầu tạo chủ đề nhỏ mới “Bài toán vị trí trong hàng” ở chủ đề lớn 1 Logical thinking / Tư duy lô-gic; chuyển đúng Đề 6 câu 3 (lớp 2A có 34 học sinh, 9 bạn sau Amy) vào nhóm này. Đây là tên được chỉ định riêng, không tự mở rộng sang câu khác. Nhóm mới có 1 câu; tổng 132 câu có chủ đề nhỏ, 43 câu Chưa phân loại.

Chủ dự án yêu cầu phân loại lại câu Alice mua bánh (Đề 7 câu 5), cho phép tạo chủ đề phù hợp nếu chưa có. Câu này được chuyển khỏi nhóm tuổi vào chủ đề mới “Bài toán mua hàng và tiền còn lại” ở Logical thinking / Tư duy lô-gic. Yêu cầu này thay chỉ định cũ đưa câu mua bánh vào nhóm tuổi; không áp dụng cho các câu khác. Nhóm mới 1 câu, nhóm tuổi còn 7 câu.

Chủ dự án đổi tên “Cộng nhiều số” thành “Tìm giá trị”. Giữ nguyên 9 câu của nhóm trong Arithmetic / Số học, giữ id chủ đề cũ để bài đã lưu, thứ tự và màn hình tải lại tiếp tục hoạt động. Không tự ghép thêm câu khác chỉ vì tên mới rộng hơn.
