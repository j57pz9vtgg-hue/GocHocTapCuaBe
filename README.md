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

Các hình/sơ đồ được dựng lại bằng SVG tại `assets/papers/timo-grade2-qualifying-01/`: 15 hình nội dung câu hỏi và 4 hình lựa chọn của câu 17. Nét và vị trí dựa trên ảnh gốc, không bổ sung lời giải hay ngoại suy kết quả. Tên tệp có SHA-256 để không thay đổi tài nguyên đã xuất bản. Bài đầy đủ giữ 5 đề mục lớn; luyện chủ đề giữ số câu và nguồn đề gốc trong dữ liệu; nhãn hiển thị được đánh lại từ 1 theo lượt luyện.

Tên 5 nhóm lớn hiển thị trên một dòng, các ô có cùng chiều rộng theo tên dài nhất. Không hiển thị ghi chú khoảng câu trên các ô; quy tắc khoảng câu vẫn giữ nguyên trong dữ liệu phân loại. Đã kiểm tra từ 320px đến 1920px trên đủ 11 giao diện.

## Đề số 2 vòng loại TIMO lớp 2

Nguồn: 5 ảnh chụp do chủ dự án gửi tiếp theo Đề số 1. Id: `timo-grade2-qualifying-02`. Có 25 câu song ngữ, 100 lựa chọn, 15 hình/sơ đồ và 4 hình lựa chọn của câu 17 trong `assets/papers/timo-grade2-qualifying-02/`.

Theo yêu cầu tiếp theo của chủ dự án, 21 câu Đề số 2 được ghép vào các tên chủ đề nhỏ có sẵn của Đề số 1. Câu 3, 13, 22, 23 chưa phù hợp với tên hiện có nên giữ Chưa phân loại. Không tạo tên mới. Các câu vẫn không có `answer`, `answerSource` hoặc `explanation`. Đề số 1 giữ nguyên 25 tên chủ đề nhỏ đã được cho phép. Tổng ngân hàng lớp 2 hiện là 50 câu, phân biệt bằng id đề và số câu gốc, không trộn bài làm giữa hai đề. Cả hai đề đều chờ đáp án của chủ dự án.

`node scripts/check-data.cjs` còn kiểm tra số lượng hình lựa chọn, sự tồn tại của ảnh và mã SHA-256 trong tên tài nguyên trước khi xuất bản.

Nội dung trang đề dùng Times New Roman (Times/serif dự phòng). Cỡ chữ, màu, độ đậm, giãn dòng và các hình giữ nguyên. Chỉ có một nút Nộp bài ở thanh công cụ phía trên; nút mở khi đã chọn đủ câu và khóa sau khi nộp để tránh nộp lặp.

Đồng hồ trên thanh đề đếm tăng MM:SS (HH:MM:SS khi đủ một giờ), bắt đầu khi hiển thị câu hỏi. Nộp bài lưu `finishedAt` để đóng băng thời gian trên kết quả/xem lại và ô đề; Làm lại đặt lại đồng hồ. Tiếp tục phiên chưa nộp giữ `startedAt` đã lưu, gồm thời gian rời trang như quy tắc đo thời gian hiện có. Bộ đếm được dọn khi quay về danh sách.


## Đề số 3 vòng loại TIMO lớp 2

Nhập từ 5 ảnh chủ dự án gửi: 25 câu song ngữ, 100 lựa chọn và 19 SVG (gồm 4 hình lựa chọn câu 17). Giữ nguyên thứ tự câu và lựa chọn. Cả 25 câu vào Chưa phân loại theo 5 nhóm lớn; chưa có đáp án hoặc lời giải.


## Đề số 4 vòng loại TIMO lớp 2

Nhập 25 câu song ngữ, 100 lựa chọn từ 5 ảnh chủ dự án gửi; 15 hình SVG dựng theo nguồn. Câu hỏi giữ thứ tự gốc và được phân vào Chưa phân loại trong 5 nhóm lớn. Chưa có đáp án/lời giải. Ngân hàng hiện có 4 đề, tổng cộng 100 câu.


Luyện chủ đề nhỏ tự đổi thứ tự câu khi mở lại hoặc làm lại (từ 2 câu trở lên). Thứ tự cuối lưu riêng theo lớp/chủ đề; câu trả lời đang làm được ghép theo id nguồn, không theo vị trí mới. Bộ đề đầy đủ giữ nguyên thứ tự gốc.


Theo yêu cầu chỉnh tiếp cỡ chữ, nội dung tờ đề (số câu, câu hỏi, bản dịch, lựa chọn và đề mục) dùng Times New Roman 12pt / 16 CSS px trên máy tính và điện thoại. Chỉ đổi thuộc tính phông/cỡ chữ; giữ hình minh họa, nội dung, màu, độ đậm, quy tắc khoảng cách và thanh công cụ. Đã đối chiếu thuộc tính hiển thị trên cả 11 giao diện tại 1440px và 390px; nút nộp trên cùng vẫn khóa khi chưa đủ câu và nộp được khi đủ 25/25.


## Đề số 5 vòng loại TIMO lớp 2

Nguồn: 4 ảnh chủ dự án gửi, gồm 25 câu song ngữ, 100 lựa chọn và 13 hình SVG dựng theo ảnh (dãy hình, dãy số, phép cộng dọc, khối lập phương và ngôi sao). Các câu giữ đúng số gốc và lựa chọn A–D; phân vào Chưa phân loại trong 5 nhóm TIMO. Chưa có đáp án hay lời giải.


## Đề số 6 vòng loại TIMO lớp 2

Nguồn: 4 ảnh chủ dự án gửi. Có đủ 25 câu song ngữ, 100 lựa chọn và 9 hình SVG; giữ thứ tự câu, ký hiệu hình chữ thập và lựa chọn theo nguồn. Các câu vào Chưa phân loại trong 5 nhóm lớn, không có đáp án/lời giải.


## Đề số 7 vòng loại TIMO lớp 2

Nguồn: 5 ảnh chủ dự án gửi. Đã nhập 25 câu song ngữ, 100 lựa chọn và 13 SVG (dãy chữ/số/hình, mũi tên trên lưới, phép cộng dọc, khối lập phương, kệ sách và bảng 3×3). Giữ nguyên thứ tự và dữ liệu gốc; tất cả câu của đề này dùng Chưa phân loại theo 5 nhóm TIMO. Chưa có đáp án/lời giải. Ngân hàng hiện gồm 7 đề vòng loại lớp 2, tổng cộng 175 câu.


## Rà phân loại vào các chủ đề nhỏ có sẵn

Theo yêu cầu tiếp theo của chủ dự án, rà toàn bộ câu Chưa phân loại của 7 đề vòng loại lớp 2. Chỉ thêm trường `subtopic` khi khớp một trong 25 tên đã có của Đề 1 và trong đúng chủ đề lớn theo số câu; không tạo tên mới hoặc đổi tên. Thêm 78 câu được phân loại, tổng 124/175 câu đã có tên chủ đề nhỏ, còn 51 câu Chưa phân loại.

| Đề | Ghép thêm | Câu vẫn Chưa phân loại |
| --- | ---: | --- |
| 1 | 0 | Không còn |
| 2 | 0 | 3, 13, 22, 23 |
| 3 | 24 | 18 |
| 4 | 18 | 4, 12, 14, 17, 21, 24, 25 |
| 5 | 14 | 4, 8, 12, 14, 15, 17, 18, 19, 21, 23, 24 |
| 6 | 11 | 3, 5, 7, 10, 11, 13, 15, 17, 19, 20, 22, 23, 24, 25 |
| 7 | 11 | 1, 2, 5, 9, 11, 12, 14, 15, 17, 18, 21, 22, 23, 25 |

Các trường hợp còn lại khác phạm vi tên hiện có, ví dụ tuổi có mốc quá khứ; tháng/chữ cái; góc nhìn từ trên/phải/bên; đếm tam giác/cạnh; số lẻ hoặc lặp chữ số; chia/nhân; chuyển giữa ba nhóm; phân phối hoa; bảng 3×3. Không suy luận đáp án để ghép tên, nhất là các câu yêu cầu xác định chẵn hay lẻ. Nội dung, thứ tự bộ đề, hình ảnh, lựa chọn, id và các phân loại đã có được giữ nguyên; chưa có đáp án/lời giải.


Theo chỉ định riêng tiếp theo, câu 2 Đề số 7 (dãy chữ A, Z, B, __, C, X, D, W) được chuyển từ Chưa phân loại vào “Quy luật dãy số” trong Tư duy lô-gic. Nội dung/ảnh/lựa chọn giữ nguyên; chủ đề này tăng từ 7 lên 8 câu. Tổng hiện tại 125 câu đã phân loại và 50 câu Chưa phân loại.


Theo ảnh chỉ định tiếp theo, Đề 7 câu 5, Đề 2 câu 3, Đề 5 câu 4 và Đề 7 câu 1 thuộc “Tuổi hiện tại và tương lai”. Chuyển đúng 4 câu, giữ nguyên nội dung/ảnh/lựa chọn. Chủ đề hiện có 6 câu; toàn ngân hàng có 129 câu phân loại và 46 câu Chưa phân loại.


## Tiếp tục màn hình sau khi tải lại trang

Nút tải lại của trình duyệt giữ màn hình hiện tại trong cùng tab: lớp/chương trình/môn/nội dung, nhóm mở/từ khóa, đề hoặc chủ đề đang làm, thứ tự câu, lựa chọn đã chọn, đồng hồ và vị trí câu đang xem. Màn hình kết quả giữ trạng thái đã nộp và thời gian đã dừng; giới thiệu bài và tab Cài đặt cũng được khôi phục. Trạng thái dùng sessionStorage, ghép câu theo id với dữ liệu hiện hành; không lưu bản sao đề hoặc mật khẩu. Chỉ khôi phục sau khi xác thực truy cập, không tự mở lời giải phụ huynh. Bản ghi lỗi hoặc đề bị xóa trở về danh sách an toàn. Đã kiểm tra tải lại trên 11 giao diện ở 1440px/390px, tiếp tục bài/chủ đề/intro/kết quả/bộ lọc, ghép lựa chọn, vị trí cuộn và đăng xuất.


Theo chỉ định tiếp theo, Đề 4 câu 4 (Lucy) và Đề 6 câu 5 (Amy) vào “Tuổi hiện tại và tương lai”, tăng nhóm lên 8 câu. Đề 6 câu 3 giữ Chưa phân loại. Ngân hàng hiện có 131 câu đã phân loại và 44 câu Chưa phân loại; không đổi nội dung/lựa chọn/ảnh.


Nhóm “Phối hợp lựa chọn” đã đổi tên theo chủ dự án thành “Có bao nhiêu cách kết hợp khác nhau?”. Giữ nguyên 5 câu thuộc nhóm và id chủ đề cũ để tiếp tục bài đã lưu hoặc tải lại màn hình, không thay nội dung, lựa chọn, hình hay đáp án.


Theo yêu cầu mới, tạo “Bài toán vị trí trong hàng” trong Logical thinking / Tư duy lô-gic, nhận đúng Đề 6 câu 3 từ Chưa phân loại. Nhóm mới có 1 câu; nội dung, nguồn đề, hình và lựa chọn giữ nguyên. Ngân hàng hiện có 132 câu có chủ đề nhỏ và 43 câu Chưa phân loại.


Theo yêu cầu phân loại lại câu Alice mua bánh, Đề 7 câu 5 nay thuộc chủ đề mới “Bài toán mua hàng và tiền còn lại” trong Logical thinking / Tư duy lô-gic. Chuyển khỏi “Tuổi hiện tại và tương lai” (nhóm tuổi còn 7 câu). Nhóm mua hàng mới có đúng 1 câu, giữ nguyên nội dung/lựa chọn, không thêm đáp án hay lời giải.


“Cộng nhiều số” đổi tên thành “Tìm giá trị” theo chỉ định của chủ dự án. Giữ đúng 9 câu và id chủ đề cũ, không thay đổi nội dung/ảnh/lựa chọn hoặc tự bổ sung câu khác; bài đang làm và trạng thái tải lại vẫn tiếp tục được.


Theo yêu cầu gộp nhóm 04 vào 02 của Số học: 6 câu “Biểu thức cộng trừ liên tiếp” chuyển vào “Tìm giá trị”, tổng 15 câu; bỏ ô riêng của nhóm cũ. Nội dung/lựa chọn/ảnh và số câu nguồn giữ nguyên. Các lựa chọn đã lưu ở hai nhóm được ghép theo id câu; bài đang mở ở nhóm cũ tiếp tục trong nhóm đích khi tải lại. Bản ghi cũ được giữ dự phòng; bài gộp chưa tự nộp.


## Đánh số và đồng hồ khi mở bài luyện chủ đề

Bài theo chủ đề hiển thị Câu 1…N theo thứ tự hiện tại sau khi đảo, còn id/số câu/nguồn đề gốc giữ trong dữ liệu. Bấm Bắt đầu hoặc Tiếp tục làm bài từ popup chủ đề đặt đồng hồ về 00:00; các lựa chọn đang lưu vẫn ghép theo đúng id. Tải lại trang giữ nguyên thứ tự, lựa chọn, vị trí và thời gian đang chạy. Bộ đề đầy đủ giữ quy tắc số câu và tiếp tục thời gian cũ.

Popup giới thiệu thu nhỏ từ700px xuống tối đa520px, ảnh120px (96px trên điện thoại), tiêu đề Be Vietnam Pro20px/18px, chữ mô tả13px/12px và nút14px. Không đổi nội dung/ảnh/màu chủ đề hoặc phông16px trong tờ đề. Đã kiểm tra 11 giao diện tại1440/390/320px, màn hình ngang844×390, đánh số15câu, mở lại đặt00:00, đồng hồ chạy/tải lại giữ thời gian và dữ liệu nguồn không đổi.


## Kích thước cố định và độ nổi cho các nút chủ đề

Năm nút chủ đề lớn giữ chiều cao72px trên máy tính và64px trên điện thoại, cùng chiều rộng đủ tên song ngữ dài nhất trên một dòng. Hàng giãn riêng của lưới chứa phần nội dung cao của khung bên phải; chuyển nhóm không kéo giãn hoặc đổi vị trí các nút bên trái. Thêm bóng đế, nét sáng, trạng thái hover/nhấn cho nút nhóm, ô chủ đề nhỏ và nút Luyện tập; không đổi màu/ảnh riêng của11giao diện hoặc dữ liệu bài.

Đã kiểm tra 5 nhóm trên11giao diện ở1920/1440/1024/800/761/760/538/390/320px: kích thước đồng nhất khi đổi nhóm, tên một dòng không cắt, khung nội dung không tràn lưới hoặc màn hình. Kiểm tra thêm clickthật, bànphím, trạng thái nhấn/giảmchuyểnđộng và mở bài luyện.


Theo yêu cầu tăng nhẹ kích thước ô chủ đề lớn: cột bên trái tối thiểu 340 px, các nút cao 80 px (72 px trên điện thoại), giữ đồng nhất khi đổi nhóm. Khung bên phải hẹp hơn tương ứng và padding còn 16 px. Màn hình từ 1280 px hiển thị 4 chủ đề nhỏ mỗi hàng; 901–1279 px dùng 2 cột và dưới đó 1 cột để đọc được trên màn hình nhỏ. Giữ tên chủ đề lớn một dòng, bóng nổi 3D, ảnh/màu từng giao diện và dữ liệu bài. Đã kiểm tra 11 giao diện tại 14 độ rộng từ 320 đến 1920 px, số ô thực tế mỗi hàng, kích thước ổn định, không cắt chữ/tràn màn hình và mở bài luyện.


Theo yêu cầu phân loại câu hỏi về tháng, tạo “Các tháng trong năm” trong Logical thinking / Tư duy lô-gic và chuyển đúng Đề 7 câu 1 (tháng trước là tháng 4, hỏi 16 tháng nữa). Nhóm tháng có 1 câu, nhóm tuổi còn 6 câu. Số hiển thị trong lượt luyện có thể khác số câu nguồn; nội dung/lựa chọn không đổi và chưa có đáp án.


Theo ảnh chỉ định tiếp theo, Đề 6 câu 7 và 10, Đề 7 câu 9 chuyển vào “Tìm giá trị”. Nhóm có 18 câu; Số học còn đúng 1 câu Chưa phân loại (Đề 5 câu 8). Nội dung, lựa chọn, thứ tự bộ đề và số câu nguồn không đổi. Tổng 135 câu đã phân loại, 40 câu Chưa phân loại.


Theo các ảnh chỉ định của chủ dự án, thêm 6 câu vào “Number Theory / Lý thuyết số / Nhận biết kết quả chẵn”: Đề 4 câu 14; Đề 6 câu 15; Đề 4 câu 12; Đề 5 câu 14; Đề 2 câu 13; Đề 7 câu 11. Nhóm hiện có 8 câu, kể cả các câu về số lẻ do chủ dự án chỉ định rõ. Không sửa tên nhóm, nội dung, lựa chọn hoặc tạo đáp án. Tổng 141 câu có chủ đề nhỏ và 34 câu Chưa phân loại.


Gộp hai nhóm Hình học “Quan sát khối từ phía trước” và “Đếm khối lập phương xếp chồng” thành “Quan sát và đếm khối lập phương”, gồm đúng 7 câu. Giữ id nhóm quan sát cũ, chuyển tham chiếu nhóm xếp chồng sang nhóm đích để tiếp tục bài/khôi phục lựa chọn theo id; giữ bản ghi cũ dự phòng. Không đổi nội dung/ảnh/lựa chọn hoặc nhóm Đếm đoạn thẳng.


Sau khi gộp hai nhóm hình khối, theo 3 ảnh tiếp theo của chủ dự án thêm đúng 5 câu: Đề 4 câu 17, Đề 5 câu 17, Đề 3 câu 18, Đề 6 câu 19 và Đề 7 câu 17. “Quan sát và đếm khối lập phương” hiện có 12 câu. Các ảnh, lựa chọn, số câu nguồn và bài theo bộ đề không đổi. Tổng 146 câu có chủ đề nhỏ, 29 câu Chưa phân loại.


Câu Gordon (Đề 5 câu 8) phù hợp nhóm có sẵn “Tìm số bị che trong phép tính” của Số học: tìm số ban đầu qua các phép tính đã cho. Đưa đúng câu này vào nhóm, tăng lên 8 câu; không tạo nhóm mới hoặc sửa nội dung/lựa chọn. Số học đã phân loại đủ 35 câu. Ngân hàng hiện có 147 câu có chủ đề nhỏ, 28 câu Chưa phân loại, chưa có đáp án do chủ dự án gửi.


## Phân loại đầy đủ Lý thuyết số

Theo yêu cầu tạo chủ đề phù hợp cho các câu còn lại, thêm 4 nhóm: Đếm số theo điều kiện (3 câu), Tìm số còn thiếu trong đẳng thức (1), Chuyển bớt và so sánh số lượng (2), Chia nhóm theo sức chứa (1). Cả 35 câu trong Number Theory / Lý thuyết số đã có chủ đề nhỏ; các nhóm và nội dung đã có giữ nguyên. Chỉ thêm metadata phân loại, không giải bài hoặc thêm đáp án.
