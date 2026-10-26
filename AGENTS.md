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

Chủ dự án yêu cầu gộp nhóm 04 “Biểu thức cộng trừ liên tiếp” vào nhóm 02 “Tìm giá trị” trong Arithmetic / Số học. Chuyển đúng 6 câu, nhóm đích có 15 câu; không giữ ô riêng của nhóm cũ. Giữ nội dung/ảnh/lựa chọn/id nguồn, ghép lựa chọn đã lưu theo id từ cả hai nhóm; tham chiếu màn hình cũ phải tiếp tục trong nhóm đích khi tải lại. Giữ bản ghi nhóm cũ làm dự phòng, không đánh dấu tự nộp nhóm đã mở rộng.

Quy tắc mới cho Luyện theo chủ đề: đánh lại nhãn hiển thị Câu 1 đến Câu N theo thứ tự của lượt hiện tại; vẫn giữ số câu/id/nguồn gốc trong dữ liệu để ghép lựa chọn và đáp án. Mỗi lần bấm Bắt đầu/Tiếp tục làm bài từ popup chủ đề đặt startedAt=Date.now(), đếm lại 00:00; giữ lựa chọn cũ theo id nếu tiếp tục. Tải lại màn hình đang làm giữ đồng hồ/thứ tự như cũ, không tính là bắt đầu lượt mới. Quy tắc tiếp tục đồng hồ của bộ đề đầy đủ giữ nguyên. Popup giới thiệu thu nhỏ tối đa 520px, ảnh120px (96px trên điện thoại), dùng Be Vietnam Pro, tiêu đề20px/18px, giữ ảnh/màu từng giao diện.

Chủ dự án yêu cầu 5 nút chủ đề lớn giữ kích thước khi đổi nhóm: hàng cố định72px trên máy tính,64px trên điện thoại; cùng chiều rộng theo tên song ngữ dài nhất, tên trên một dòng. Khung chủ đề nhỏ có vùng giãn riêng, không kéo giãn các hàng nút trái. Ô chủ đề và nút Luyện tập có bóng/nét sáng tạo độ nổi3D, hover/nhấn bằng bóng không đổi hình học; giữ màu/ảnh riêng11giao diện, focusbànphím rõ và hỗ trợ giảm chuyển động.

Ẩn dòng lớp/chương trình/môn (ví dụ “Lớp 2 · TIMO · Toán”) dưới tên bài trên thanh màn hình làm bài, áp dụng cả bộ đề và luyện chủ đề. Giữ các trường lớp/chương trình/môn trong dữ liệu, bộ lọc và lưu tiến độ.

Yêu cầu kích thước tiếp theo: chủ đề lớn rộng tối thiểu 340 px và cao 80 px trên máy tính, cao 72 px trên điện thoại, vẫn cố định khi đổi nhóm và tên một dòng. Thu phần rộng của khung chủ đề nhỏ tương ứng, padding 16 px. Lưới chủ đề nhỏ 4 cột từ 1280 px, 2 cột ở 901–1279 px, 1 cột từ 900 px trở xuống; giữ accordion điện thoại và hiệu ứng 3D. Không thay dữ liệu hoặc chức năng làm bài.

Chủ dự án yêu cầu tìm chủ đề phù hợp cho câu “If last month was April…” và cho phép tạo mới. Đề 7 câu 1 (số hiển thị trong lượt luyện có thể khác) chuyển khỏi “Tuổi hiện tại và tương lai” vào chủ đề mới “Các tháng trong năm” trong chủ đề lớn 1 Logical thinking / Tư duy lô-gic. Chỉ chuyển đúng câu này, giữ nguồn/nội dung/lựa chọn; không suy luận đáp án. Nhóm tháng có 1 câu, nhóm tuổi còn 6 câu.

Chủ dự án chỉ định 3 câu trong ảnh chuyển vào “Tìm giá trị” của Số học: Đề 6 câu 7 (15 : 3 + 25 : 5 − 30 : 5), Đề 6 câu 10 (10 × 1 + 10 × 2 + 10 × 3 + 10 × 4), Đề 7 câu 9 (7 × 2 + 11 × 2 + 2 × 3 + 2 × 9). Nhóm đích có 18 câu; Số học Chưa phân loại còn đúng Đề 5 câu 8 (Gordon). Chỉ chuyển đúng 3 câu, không đổi nội dung/lựa chọn hay thêm đáp án. Tổng 135 câu có chủ đề và 40 câu Chưa phân loại.

Chủ dự án chỉ định câu “Among the following numbers, how many of them are even numbers greater than 20?” (Đề 4 câu 14, số trong lượt luyện có thể khác) vào “Nhận biết kết quả chẵn” của Number Theory / Lý thuyết số. Chỉ chuyển đúng câu này từ Chưa phân loại, giữ dãy số 14, 31, 22, 19, 52, 93, 70, 54 và các lựa chọn gốc. Không tính hoặc nhập đáp án.

Theo ảnh chỉ định tiếp theo, Đề 6 câu 15 (xác định tổng 1 đến 14 lẻ hay chẵn) và Đề 4 câu 12 (số lẻ lớn nhất có 2 chữ số) đều vào “Nhận biết kết quả chẵn” trong Number Theory / Lý thuyết số. Đây là nhóm được chủ dự án chỉ định cho cả 2 câu trong ảnh, không suy luận đáp án hoặc tự sửa tên nhóm.

Theo ảnh tiếp theo, Đề 5 câu 14 (đếm số lẻ lớn hơn 39) và Đề 2 câu 13 (đếm kết quả lẻ của các phép tính) vào đúng “Nhận biết kết quả chẵn” theo chủ dự án. Chỉ phân loại 2 câu được chỉ định, giữ nguyên dãy số/phép tính/lựa chọn, không tính đáp án hay đổi nhãn nhóm.

Theo ảnh chỉ định tiếp theo, Đề 7 câu 11 (tổng 1 + 2 + 3 + 4 + … + 9 lẻ hay chẵn) vào “Nhận biết kết quả chẵn” trong Number Theory / Lý thuyết số. Nhóm hiện có 8 câu; chỉ phân loại, không tính hoặc nhập đáp án.

Chủ dự án yêu cầu gộp chủ đề nhỏ 04 và 06 của Hình học: “Quan sát khối từ phía trước” (2 câu) và “Đếm khối lập phương xếp chồng” (5 câu) thành “Quan sát và đếm khối lập phương” (7 câu). Giữ id nhóm 04 cũ, nối tham chiếu/bài làm nhóm 06 sang nhóm đích qua resolveTimoTopicId, giữ lựa chọn nguồn và bản ghi dự phòng. Nhóm Đếm đoạn thẳng không đổi. Chưa tự ghép thêm câu khác ngoài 7 câu của hai nhóm trong bước này.

Theo ảnh chỉ định tiếp theo, thêm Đề 4 câu 17 (khối trắng nhìn từ phải) và Đề 5 câu 17 (khối trắng nhìn từ trên) vào chủ đề nhỏ 04 “Quan sát và đếm khối lập phương”. Chỉ chuyển đúng 2 câu trong ảnh, nhóm tăng từ 7 lên 9 câu. Không đổi hình/nguồn/lựa chọn hoặc thêm đáp án.

Theo ảnh tiếp theo, Đề 3 câu 18 (khối xanh nhìn từ phải) và Đề 6 câu 19 (khối trắng nhìn từ bên cạnh) vào “Quan sát và đếm khối lập phương”. Nhóm tăng từ 9 lên 11 câu, giữ nguyên hình/nguồn/lựa chọn và không bổ sung đáp án.

Theo ảnh tiếp theo, Đề 7 câu 17 (khối trắng dạng cầu nhìn từ phải) vào chủ đề nhỏ 04 “Quan sát và đếm khối lập phương”. Nhóm hiện có 12 câu; giữ hình và các lựa chọn 4, 3, 7, 6 nguyên bản, không suy luận đáp án.

Chủ dự án yêu cầu tìm chủ đề phù hợp cho câu Gordon (Đề 5 câu 8), cho phép tạo mới nếu chưa có. Câu tìm số ban đầu qua các phép tính được ghép vào tên có sẵn “Tìm số bị che trong phép tính” thuộc Arithmetic / Số học, không tạo nhóm trùng kỹ năng. Nhóm hiện có 8 câu; Số học không còn câu Chưa phân loại. Không giải bài hoặc thay lựa chọn. Tổng 147 câu có chủ đề nhỏ và 28 câu Chưa phân loại.

Chủ dự án yêu cầu phân loại toàn bộ câu Chưa phân loại của chủ đề lớn 3, cho phép tạo tên mới. Thêm 4 nhóm: “Đếm số theo điều kiện” (Đề 5 câu 12, Đề 6 câu 13, Đề 7 câu 12); “Tìm số còn thiếu trong đẳng thức” (Đề 5 câu 15); “Chuyển bớt và so sánh số lượng” (Đề 6 câu 11, Đề 7 câu 14); “Chia nhóm theo sức chứa” (Đề 7 câu 15). Giữ các phân loại cũ, nội dung/ảnh/lựa chọn/id nguồn và đáp án nguyên trạng. Chủ đề 3 đủ 35 câu đã phân loại, còn 21 câu Chưa phân loại ở các nhóm khác.

Chủ dự án mở rộng yêu cầu: phân loại toàn bộ câu Chưa phân loại của 5 chủ đề lớn, cho phép tạo nhóm nhỏ phù hợp. Sau khi hoàn tất chủ đề 3, phân loại tiếp 5 câu Hình học và 16 câu Tổ hợp bằng 14 nhóm mới, đúng nhóm lớn theo số câu gốc. Cả 175 câu của 7 đề TIMO lớp 2 hiện có đều đã phân loại, 35 câu mỗi nhóm lớn; giữ mọi phân loại trước đó và toàn bộ nội dung/ảnh/lựa chọn/id nguồn. Nhóm Chưa phân loại rỗng không hiển thị khi có chủ đề chứa câu, vẫn giữ bucket mặc định cho dữ liệu tương lai. Không tạo đáp án/lời giải; không tự đổi các phân loại chủ dự án đã chỉ định.

Chủ dự án gửi thêm 6 đề TIMO lớp 2 vòng quốc gia, yêu cầu nhập lần lượt và gắn các câu vào luyện chủ đề phù hợp. Đây là đề tự luận không có lựa chọn A–D: dùng responseType=text, options=[], ô nhập tối đa 200 ký tự; không tự tạo lựa chọn hoặc đáp án. Giữ nguyên câu tiếng Anh và phần từ vựng/glossary tiếng Việt do ảnh cung cấp, không tự viết bản dịch thay thế. Bài trộn tự luận/trắc nghiệm lưu và khôi phục lựa chọn theo id nguồn; chỉ chấm khi có answerSource=user và đáp án đúng kiểu được chủ dự án cung cấp. Các tiêu đề nguồn Number Theory / Số học trong ảnh được giữ riêng khi hiển thị đề, phân loại chủ đề lớn vẫn dùng Lý thuyết số theo quy định. Nhập/kiểm tra/xuất bản thành công từng đề trước khi bắt đầu đề kế tiếp.

Chủ dự án đã cung cấp đáp án và lời giải chi tiết cho cả7 đề vòng loại TIMO lớp2 (175 câu). Gắn answerSource=user, khóa0-based từ chữ A–D và lời giải/hình theo ảnh nguồn; không tự tính lại hoặc thay khóa. Các câu khác chưa có khóa vẫn Chờ đáp án. Luyện chủ đề dùng chính đối tượng câu nguồn, mở lời giải theo từng câu có khóa sau khi nộp và xác nhận mật khẩu phụ huynh nếu đã cài. Khi bài trộn chưa đủ khóa, không chấm điểm toàn bài; chỉ đánh dấu/hiển thị lời giải cho câu đã được cung cấp. Không làm lộ lời giải/hình lời giải ở trạng thái trước khi nộp hoặc trước khi mở lời giải.

Theo yêu cầu gộp mới, chuyển câu12 Đề quốc gia7 từ “Điền dấu nhân và trừ” vào chủ đề nhỏ4 “Điền dấu cộng và trừ” trong Lý thuyết số. Giữ tên/id chủ đề4, tổng12 câu; không đổi phép tính hoặc câu nguồn. Ánh xạ id nhóm cũ sang nhóm4 để chuyển tiếp bài làm và trạng thái đang mở.

Chủ dự án yêu cầu gộp nhóm11 “Phép cộng với chữ số chưa biết” của Lý thuyết số vào nhóm4 cùng tên của Số học. Đây là ngoại lệ chuyển nhóm lớn được chỉ định rõ: câu15 Đề quốc gia5 và câu15 Đề quốc gia6 dùng practiceTopicGroup=timo-group-2; giữ số câu, đề nguồn và tiêu đề phần trong đề thi. Nhóm4 Số học có14 câu; id nhóm cũ chuyển về nhóm4 để giữ bài làm và trạng thái đang mở. Các câu còn lại tiếp tục phân nhóm lớn theo số gốc.

Theo yêu cầu tiếp theo, gộp nhóm7 “Tìm số còn thiếu trong đẳng thức” của Lý thuyết số vào nhóm2 “Tìm số bị che trong phép tính” của Số học. Câu15 Đề vòng loại5 đổi subtopic theo tên đích và dùng practiceTopicGroup=timo-group-2, giữ nguyên câu/khóa/lời giải/nguồn. Nhóm2 có10 câu. Id nhóm cũ chuyển sang nhóm2 để giữ tiến độ.

Theo yêu cầu mới, gộp “Điền dấu nhân và cộng” vào nhóm nhỏ4 của Lý thuyết số, đổi tên chung thành “Điền dấu”. Tổng13 câu. Giữ id cũ của “Điền dấu cộng và trừ”; ánh xạ các id điền dấu nhân/cộng, nhân/trừ về id này để bảo toàn bài làm. Không sửa phép tính hoặc đáp án/lời giải.

Theo yêu cầu mới, gộp “Đếm hình tam giác” vào nhóm nhỏ1 “Đếm hình vuông” của Hình học và đổi tên chung thành “Đếm hình”, tổng12 câu. Giữ id gốc của Đếm hình vuông; id nhóm tam giác chuyển về nhóm1. Chỉ gộp hai nhóm được chỉ định, giữ nguyên nội dung/ảnh/khóa/lời giải và nguồn, bảo toàn bài làm đã lưu.

Theo yêu cầu mới, gộp “Đếm đoạn thẳng” (11 câu) và “Cạnh của hình phẳng và hình khối” (2 câu) thành nhóm nhỏ4 “Đếm đoạn thẳng và cạnh” của Hình học, tổng13 câu. Giữ id Đếm đoạn thẳng, chuyển id nhóm cạnh về nhóm4 và bảo toàn bài làm theo nguồn. Giữ nguyên đề, ảnh, lựa chọn, khóa và lời giải.

Theo yêu cầu tiếp theo, gộp “Tạo đường thẳng từ các điểm” (câu20 Đề vòng loại6) vào nhóm nhỏ4 “Đếm đoạn thẳng và cạnh”, tổng14 câu. Giữ nội dung/khóa/lời giải, chuyển id nhóm cũ về nhóm4 và giữ tiến độ theo nguồn.

Theo yêu cầu tiếp theo, gộp “Đếm hình chữ nhật” (câu19 Đề quốc gia2) vào nhóm nhỏ1 “Đếm hình”, tổng13 câu. Giữ tên/id nhóm1; chuyển id nhóm chữ nhật về nhóm1 để giữ bài làm. Không sửa nội dung/hình/khóa/lời giải hoặc nguồn.

Theo yêu cầu mới, gộp “Các ngày trong tuần” (10 câu), “Số ngày trong tháng” (1 câu) và “Các tháng trong năm” (1 câu) thành nhóm nhỏ5 “Ngày, tháng và lịch” của Tư duy lô-gic, tổng12 câu. Giữ id Các ngày trong tuần, ánh xạ id hai nhóm còn lại về nhóm5 để giữ bài làm và trạng thái đang mở. Không sửa nội dung, ảnh, khóa/lời giải hoặc nguồn câu.

Chủ dự án đã gửi khóa văn bản và lời giải chi tiết cho cả7 đề quốc gia1–7 (175 câu). Gắn answerSource=user, giữ nguyên khóa dạng số/chữ/ngày/biểu thức/ký hiệu theo nguồn và nguyên văn các bước giải. Các bài luyện chủ đề tham chiếu cùng câu nên dùng chung khóa/lời giải; Cả350 câu của14 đề hiện có đều đã có khóa và lời giải do chủ dự án cung cấp. Không tự suy luận hoặc điền khóa còn thiếu.

Theo yêu cầu mới, gộp “Đỉnh, cạnh và mặt của hình khối” (8 câu) vào nhóm nhỏ4 “Đếm đoạn thẳng và cạnh” của Hình học, tổng22 câu. Giữ id nhóm4, chuyển id nhóm cũ về nhóm4 để bảo toàn bài làm. Không thay nội dung/ảnh/khóa/lời giải và nguồn câu. Thực hiện sau khi xuất bản xong đáp án quốc gia5–7.

Theo yêu cầu mới, gộp “Chia nhóm theo sức chứa” (2 câu) vào nhóm nhỏ6 “Đếm số theo điều kiện” của Lý thuyết số, tổng7 câu. Giữ id nhóm6, chuyển tiếp id nhóm cũ để bảo toàn bài làm theo nguồn. Không sửa câu hỏi/ảnh/khóa/lời giải hoặc số câu gốc.

Theo yêu cầu mới, gộp “Bài toán tính thời gian” (câu3 Đề quốc gia1) vào nhóm nhỏ5 “Ngày, tháng và lịch” của Tư duy lô-gic, tổng13 câu. Giữ tên/id nhóm5, chuyển tiếp id nhóm thời gian và bài làm đã lưu. Không sửa nội dung, ảnh, khóa/lời giải hoặc nguồn.

Theo yêu cầu mới, gộp “Quy luật trong bảng số” (4 câu) vào nhóm nhỏ1 “Quy luật dãy số” của Tư duy lô-gic, tổng21 câu. Giữ tên/id nhóm1, chuyển id nhóm bảng số về nhóm1 để bảo toàn bài làm. Giữ nguyên bảng, câu hỏi, khóa/lời giải và nguồn câu.

YÊU CẦU MỚI NHẤT — LÀM LẠI PHÂN LOẠI: Chủ dự án yêu cầu xóa toàn bộ chủ đề nhỏ của cả5 chủ đề lớn và đưa350 câu về “Chưa phân loại” để tự phân loại lại. Đã bỏ trường subtopic khỏi350 câu; giữ nguyên5 nhóm lớn, cả các chỉ định practiceTopicGroup trước đó (số câu từng nhóm70/73/67/70/70), toàn bộ câu/ảnh/lựa chọn/khóa/lời giải và đề nguồn. Không khôi phục các phân loại nhỏ cũ hoặc tự tạo lại khi chưa có yêu cầu mới. Các hướng dẫn phân loại/gộp nhỏ trước đây chỉ là lịch sử, không phải yêu cầu khôi phục. Link/tiến độ nhóm nhỏ cũ chuyển về Chưa phân loại tương ứng, giữ các bản lưu cũ làm dự phòng.

Theo yêu cầu mới, kết quả làm đúng, Làm lại và Xem đáp án và lời giải nằm trong cùng thanh với Nộp bài sau khi nộp; bỏ hộp kết quả riêng bên dưới. Chưa nộp thì chưa hiện điểm/lời giải. Giữ điều kiện nộp đủ câu, mật khẩu phụ huynh, lưu/tải lại và đặt lại đồng hồ khi Làm lại. Màn hình nhỏ được xuống hàng trong cùng thanh để không tràn.

Theo yêu cầu tiếp theo, biểu tượng quyển sách đầu trang làm bài là nút Về góc luyện tập; bỏ nút chữ quay về riêng bên phải. Nút sách có tên truy cập/tooltip, vùng bấm ít nhất44px và hỗ trợ bàn phím, giữ tiến độ khi quay về.

Theo yêu cầu tiếp theo, thanh tiêu đề/bộ điều khiển của đề phải rộng đúng bằng tờ đề A4 (min(100%,210mm)), căn thẳng hai mép với exam-paper. Khi đã nộp, tiêu đề/tiến độ/thời gian ở hàng trên; kết quả/Làm lại/Xem đáp án/Nộp bài ở cùng hàng dưới trong thanh để vừa794px. Điện thoại được xuống hàng trong cùng khung, không tràn. Không đổi khổ/nội dung tờ đề.

Theo yêu cầu riêng cho Đảo Pha Lê, thu nhỏ cụm lâu đài và bổ sung phần đỉnh vốn bị cắt sẵn trong ảnh gốc để thấy trọn đỉnh, giữ cân đối với cảnh. Dùng ảnh sửa riêng assets/theme-art/crystal-world-open-castle.*.webp cho nền/banner và trang làm bài của crystal; không thay tài nguyên gốc hoặc10 giao diện khác.

Chủ dự án yêu cầu sách trong trang làm bài phải giữ đúng hình gốc như hình2, chỉ thêm chức năng quay về. Dùng trực tiếp ảnh sách gốc theo giao diện (crystal/cloud/forest/magic/treasure/cars/museum-book), các giao diện còn lại giữ pixel-book như trước. Không thay hình thành sách phẳng khi bọc nút; kích thước ảnh52px máy tính/35px điện thoại, vùng bấm vẫn ít nhất44px.

Theo yêu cầu mới, toàn bộ câu hỏi tiếng Anh trong đề/luyện chủ đề in đậm; dòng câu hỏi/bản dịch giãn1.5, khoảng cách gọn và đều. Hình câu hỏi thu nhỏ theo tỷ lệ, tối đa560px rộng/240px cao máy tính,200px cao điện thoại; không cắt hình hoặc thay nội dung, không áp dụng thu nhỏ này cho hình lời giải.

Theo yêu cầu tiếp theo, trên máy tính từ1200px tên website và thanh tên đề nằm cùng hàng đầu trang. Tờ đề giữ khổ A4 và thẳng hai mép với thanh tên đề; dưới1200px tiếp tục xếp hàng thích ứng để không chồng lấn. Giữ hình sách gốc và chức năng về góc luyện tập.

Theo yêu cầu mới, cố định toàn bộ hàng đầu trang làm bài khi cuộn: sách/tên website và thanh tên đề/tiến độ/thời gian/kết quả/các nút luôn hiện. Dùng sticky giữ bố cục A4 và vị trí ban đầu; màn hình nhỏ ghim hai phần theo chiều dọc, không chồng lên nhau. Không đổi chức năng điều khiển.

Theo yêu cầu mới, kiểm tra73 câu Số học và chuyển lại đúng3 câu gốc của Lý thuyết số: Đề vòng loại05 câu15, Đề quốc gia05 câu15 và Đề quốc gia06 câu15. Bỏ practiceTopicGroup=timo-group-2 trên3 câu; mỗi nhóm lớn hiện có70 câu, vẫn Chưa phân loại. Chỉ đổi phân nhóm luyện tập, giữ nguyên câu/khóa/lời giải/nguồn; chép câu trả lời đã lưu của3 câu sang nhóm3 theo id, giữ bản ghi nguồn làm dự phòng và ưu tiên đáp án đang lưu ở nhóm đích.

Theo yêu cầu mới, thêm chức năng hệ thống đề xuất chủ đề/phân loại để chủ dự án duyệt trong Chưa phân loại của5 nhóm lớn. Cho phép tạo chủ đề mới sau khi duyệt, sửa tên, bỏ chọn câu, chỉnh sửa chủ đề và đưa câu về Chưa phân loại. Chỉ gợi ý dựa trên nội dung câu hỏi, không dùng đáp án/lời giải và không tự áp dụng khi mở màn hình. Phân loại cá nhân lưu cục bộ riêng theo lớp/nhóm/id câu nguồn; có xuất/nhập JSON với bước xem trước và duyệt khi nhập, không tuyên bố đồng bộ toàn website. Giữ nội dung/đề/khóa/lời giải và tiến độ theoid khi chuyển nhóm. Không tự tái áp dụng các phân loại cũ đã xóa; phân loại được duyệt cóid review riêng.

Theo yêu cầu mới nhất, phân loại trực tiếp trong trang câu hỏi Luyện theo chủ đề: mỗi câu có mục Phân loại câu này, đề xuất/chọn chủ đề/tạo tên mới và duyệt ngay tại câu. Nút đề xuất/quản lý chung nằm trong tờ bài luyện; gỡ nút phân loại và chỉnh sửa khỏi danh sách chủ đề bên ngoài. Áp dụng phân loại vẫn ở trang đang luyện, cập nhật câu còn lại theo id, giữ lựa chọn/thứ tự/thời gian; không làm lộ lời giải. Đề vòng loại/quốc gia không hiện công cụ phân loại này.

Theo yêu cầu mới, trong Luyện theo chủ đề đánh dấu sao★ ở đầu những câu có đề nguồn là Vòng quốc gia, kèm chú thích ★ Câu Vòng quốc gia trong tờ bài và tên truy cập/tooltip. Xác định theo paperId/mode nguồn, không suy đoán độ khó từ nội dung hoặc dạng câu. Giữ dấu đúng khi đảo thứ tự, tải lại, làm lại và phân loại; không thêm sao vào trang bộ đề đầy đủ hoặc câu Vòng loại.

Theo yêu cầu mới, danh sách Chủ đề đã duyệt có nút Đổi tên/chỉnh sửa và Xóa chủ đề, kể cả chủ đề0 câu. Xóa có bước hiển thị rõ tên/số câu và nút áp dụng trong giao diện; chỉ bỏ chủ đề và chuyển tham chiếu câu về Chưa phân loại trong cùng nhóm, giữ nguyên câu/ảnh/đáp án/lời giải và tiến độ theoid. Nếu đang luyện chủ đề vừa xóa, chuyển tiếp sang Chưa phân loại của nhóm ấy để tiếp tục phân loại; giữ thời gian/lựa chọn. Không thêm nút phân loại trở lại danh sách bên ngoài.

Theo yêu cầu mới, màn hình đề xuất phân loại mặc định bỏ tích toàn bộ câu và cả ô Chọn tất cả trong nhóm mỗi lần mở/làm mới. Chỉ chuyển các câu do người dùng chủ động tích và áp dụng; vẫn hỗ trợ chọn/bỏ tất cả và trạng thái chọn một phần. Không thay đáp án bài luyện hoặc các phân loại đã duyệt.

Theo yêu cầu mới, trong trang quản lý phân loại bên trong bài luyện có Xuất đã/chưa phân loại để gửi cập nhật. Tệp JSON gồm toàn bộ ngân hàng TIMO Toán (cả5 nhóm lớn), mã câu/đề nguồn/số gốc, tên chủ đề, trạng thái rõ ràng và tổng kiểm đếm, chỉ dùng các phân loại đã duyệt; không chứa đáp án/lời giải/bài làm/mật khẩu. Người dùng gửi tệp trong chat để trợ lý cập nhật dữ liệu chung rồi xuất bản, không tuyên bố xuất tệp là đã tự đồng bộ. Khi nhận tệp, dùng node scripts/import-classification.cjs <file> --check rồi bỏ --check để cập nhật assets/classification-base.js; không nhập phần văn bản câu hỏi từ tệp hoặc sửa khóa/lời giải. Chạy version-assets, kiểm tra, commit/push và xác minh Pages như thường lệ. Bản chung dùng mặc định trên trình duyệt/máy mới chưa có phân loại cá nhân; giữ bản cục bộ hiện có để không mất thay đổi chưa gửi. Chưa có tệp do chủ dự án gửi thì bản chung vẫn giữ nguyên tất cả Chưa phân loại; không tự xuất bản các gợi ý.

Theo yêu cầu mới, nhập báo bài tuần26–30/10/2026 trong chương trình Báo bài của trường, với6 môn Toán, Tiếng Việt, SCIENCE, GLOBAL, ESL, MATHEMATICS; Toán và MATHEMATICS là2 môn riêng. Báo bài là nội dung đọc theo ngày/tiết/bài học/từ vựng/chuẩn bị/lịch kiểm tra, không tự tạo câu hỏi/đáp án hoặc đưa vào ngân hàng đề TIMO. Chỉ nội dung6 môn được chỉ định; các môn khác trong ảnh không thêm vào bộ lọc. Chủ dự án đã xác nhận báo bài này thuộc Lớp1. Giữ nguyên2 dòng Bài45 trong nguồn (Ôn tập và Kể chuyện), lỗi diễn đạt tiếng Anh nguồn không tự sửa; hoạt động Halloween30/10 áp dụng tiếtSCIENCE5 vàTiếngViệt7,8 thuộc hàng gộp trong ảnh. Ngày28/10SCIENCE UNIT TEST2;29/10ESL UNIT3TEST. Chỉ hiển thị Báo bài tuần ở bộ chọn nội dung của chương trình này; TIMO/ASMO giữ các chế độ cũ.

Theo yêu cầu mới, gộp2 nút xuất phân loại thành duy nhất nút Xuất bản sao phân loại ở footer quản lý. Nút này xuất JSON đầy đủ350 câu đã/chưa phân loại để vừa sao lưu/nhập lại vừa gửi trợ lý cập nhật bản chung; tên tệp goc-hoc-tap-phan-loai.json. Bỏ nút xuất riêng ở khung Gửi phân loại phía trên, chỉ giữ hướng dẫn sử dụng nút dưới. Không thêm lại nút xuất trùng chức năng.

Theo yêu cầu mới, tên môn hiển thị thống nhất viết thường và viết hoa chữ cái đầu tiên: Toán, Tiếng việt, Science, Global, Esl, Mathematics (Tiếng anh ở chương trình có môn đó). Dùng subjectDisplayName cho nhãn bộ lọc và tiêu đề báo bài; giữ nguyên giá trị/id môn trong dữ liệu và trạng thái lưu để không mất liên kết nội dung hoặc lựa chọn cũ.

Theo yêu cầu mới, bộ chọn nội dung trong Báo bài của trường hiển thị từng tên tuần cụ thể (hiện có Báo bài tuần26–30/10/2026) và Tất cả các tuần, không giữ nhãn chung Báo bài tuần. Danh sách tự lấy từ báo bài đã được cung cấp theo lớp, mới nhất trước; mặc định tuần mới nhất, giữ lựa chọn khi đổi môn/tải lại nếu còn hợp lệ. Trạng thái cũ Báo bài tuần chuyển tiếp vào tuần hiện có, không trả về TIMO hoặc làm mất bộ lọc. Tất cả các tuần chỉ hiển thị các báo bài đã nhập, không tạo tuần giả.

Theo yêu cầu mới, trong Báo bài của trường bấm tên từng bài/chủ đề để mở hộp nội dung chi tiết theo báo bài nguồn, gồm mục tiêu/từ vựng/ngữ pháp/kỹ năng/chuẩn bị/link khi có. Danh sách gọn chỉ tên bài, ngày và tiết; nội dung dùng chung từ bản ghi nguồn20 mục, không tự viết thêm bài giảng hoặc bài tập khi nguồn chỉ có tên. Hộp có nút đóng44px/Escape và trả focus về bài, giữ bộ lọc/vị trí; tải lại khi đang mở phải khôi phục đúng bài bằng id.

Theo yêu cầu mới, trang làm bài có ô Tìm câu hỏi bên phải cùng hàng với Góc học tập của bé trên máy tính và ghim khi cuộn, cùng sách/tên đề/các nút. Điện thoại cho xuống hàng và ghim theo thứ tự, không chồng lấn. Tìm trong chính bài/chủ đề đang mở theo tiếng Anh, tiếng Việt không phân biệt dấu/hoa thường, số câu và nội dung công khai; không dùng đáp án/lời giải làm chỉ mục trước khi mở khóa. Chỉ ẩn/hiện DOM câu, giữ nguyên id/thứ tự/chọn đáp án/đồng hồ/tổng số câu và điều kiện nộp toàn bài. Có số kết quả/xóa/tình trạng không tìm thấy, giữ từ khóa khi tải lại và khi phân loại. Danh sách trang ngoài vẫn dùng ô tìm kiếm riêng như trước.

Sửa lỗi focus ô tìm kiếm trong trang làm bài: chỉ hiển thị một viền focus quanh toàn bộ khung chứa biểu tượng/input/nút xóa bằng focus-within; bỏ viền riêng của input gây chồng/lệch khung. Giữ dấu focus rõ ràng khi dùng bàn phím và không làm đổi kích thước/khả năng ghim/chức năng tìm kiếm.

Chủ dự án đã gửi goc-hoc-tap-phan-loai.json ngày26/10/2026. Đã kiểm tra đủ350 mã câu và cập nhật bản chung:70 câu của Tư duy lô-gic thuộc5 chủ đề do chủ dự án duyệt,280 câu ở4 nhóm còn lại giữ Chưa phân loại. Giữ nguyên tên/id chủ đề và từng ánh xạ trong tệp; chỉ nhập metadata phân loại, không thay nội dung câu/ảnh/đáp án/lời giải. Thiết bị chưa có bản phân loại riêng dùng bản chung; khi lần đầu nhận revision chung, chuyển câu trả lời từ nhóm cũ sang nhóm mới theoid, có markerrevision để không phục hồi các đáp án cũ sau khi người dùng Làm lại. Giữ thay đổi phân loại cục bộ chưa gửi.
