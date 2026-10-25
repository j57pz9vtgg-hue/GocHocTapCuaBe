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


## Phân loại đầy đủ 5 chủ đề lớn

Theo yêu cầu mở toàn bộ nhóm Chưa phân loại, 21 câu còn lại được ghép vào 14 nhóm mới của Hình học và Tổ hợp. Giữ nguyên các nhóm và phân loại trước đó.

| Chủ đề lớn | Chủ đề nhỏ mới | Câu nguồn (đề:câu) |
| --- | --- | --- |
| Hình học | Đếm hình tam giác | 5:18 |
| Hình học | Tạo hình vuông từ các đường thẳng | 5:19 |
| Hình học | Cạnh của hình phẳng và hình khối | 6:17, 7:18 |
| Hình học | Tạo đường thẳng từ các điểm | 6:20 |
| Tổ hợp | Lập số lẻ không lặp chữ số | 2:22, 5:23 |
| Tổ hợp | Lập hai số có tổng lớn nhất | 2:23, 4:25 |
| Tổ hợp | Chia đều và cân bằng các nhóm | 4:21, 5:21, 7:22 |
| Tổ hợp | Chọn cặp không phân biệt thứ tự | 4:24, 6:24 |
| Tổ hợp | Phân phối đồ vật vào các nhóm | 5:24 |
| Tổ hợp | Lập số lớn nhất và nhỏ nhất | 6:22, 7:21 |
| Tổ hợp | Đếm số lẻ trong dãy số | 6:23 |
| Tổ hợp | Đếm số có chữ số cho trước | 6:25 |
| Tổ hợp | Lập số chẵn được lặp chữ số | 7:23 |
| Tổ hợp | Điền số vào bảng có tổng bằng nhau | 7:25 |

Kết quả: 175/175 câu của 7 đề vòng loại TIMO lớp 2 có chủ đề nhỏ, 35 câu mỗi chủ đề lớn; số nhóm nhỏ lần lượt là 8/4/9/8/15. Không còn câu Chưa phân loại trong ngân hàng hiện có. Không thay nội dung, lựa chọn, ảnh, số câu/id nguồn, thứ tự bộ đề hoặc đáp án; chưa có đáp án được cung cấp.


## Đề quốc gia 1 — TIMO lớp 2

Nhập từ 4 ảnh do chủ dự án gửi: 25 câu tự luận, giữ nguyên câu tiếng Anh và phần từ vựng tiếng Việt, 11 hình SVG dựng lại theo ảnh. Id timo-grade2-national-01, danh mục Đề quốc gia. Không có lựa chọn A–D hoặc đáp án được tạo thêm; mỗi câu có ô nhập văn bản. Giữ nguồn đề/số câu và phân loại đủ cả 25 câu vào các nhóm luyện phù hợp, tạo nhóm mới cho dạng thời gian, số theo điều kiện, hình khối, góc trong đa giác, đổi tiền và chuyển bớt/so sánh trong Tổ hợp.

Ô trả lời tự luận lưu cùng bài làm và ghép theo id khi đảo/thêm câu trong chủ đề; chặn câu trống, giữ khi tải lại, chỉ mở nộp khi đủ câu, dừng đồng hồ khi nộp và hiển thị Chờ đáp án. Khi có khóa trả lời văn bản do chủ dự án xác nhận, so khớp chính xác sau khi bỏ khoảng trắng hai đầu; không suy luận khóa hoặc tự tạo lời giải. Đã kiểm tra 11 giao diện máy tính/điện thoại, hình ảnh, lưu/khôi phục, nhập/nộp/làm lại và bài luyện trộn tự luận với trắc nghiệm; 7 đề vòng loại giữ nguyên.


## Đề quốc gia 2 — TIMO lớp 2

Nhập 25 câu tự luận và 9 SVG từ 4 ảnh chủ dự án gửi; giữ nguyên câu tiếng Anh/phần từ vựng Việt, bảng số, phép cộng dọc, các hình đếm đoạn thẳng, khối lập phương, hình chữ nhật và biểu thức. Phân loại đủ 25 câu; bổ sung nhóm cho bảng số, đếm hình chữ nhật, số không chứa chữ số cho trước, hiệu nhỏ nhất của hai số, mua hàng theo ngân sách và đếm kết quả theo điều kiện. Không tạo lựa chọn/đáp án. Đã kiểm tra lưu/nộp/tải lại và luyện trộn hai dạng câu trên 11 giao diện; 7 đề vòng loại và Đề quốc gia 1 giữ nguyên.


## Đề quốc gia 3 — TIMO lớp 2

Nhập 25 câu tự luận, từ vựng tiếng Việt và 9 SVG theo 4 ảnh chủ dự án gửi. Giữ các đoạn lưới thiếu/có trong hình đếm vuông, các giao điểm và thứ tự tầng khối theo nguồn. Cả 25 câu đã có nhóm luyện phù hợp; bổ sung nhóm Biểu diễn số bằng hiệu hai số. Không tạo đáp án hoặc lựa chọn. Kiểm tra đủ chức năng nhập/nộp/lưu/tải lại, ảnh, chủ đề trộn và 11 giao diện.


## Đề quốc gia 4 — TIMO lớp 2

Nhập đủ 25 câu tự luận, phần từ vựng Việt và 10 SVG từ 4 ảnh chủ dự án gửi. Các bảng số, lưới vuông, đoạn thẳng, khối lập phương, đường biên đa giác và biểu thức được dựng theo nguồn. Phân loại đủ các câu vào nhóm phù hợp, không đổi các bài đã có hoặc thêm lựa chọn/đáp án. Đã kiểm tra nhập/nộp/lưu/tải lại, chủ đề trộn và 11 giao diện.


## Đề quốc gia 5 — TIMO lớp 2

Nhập 25 câu tự luận và phần từ vựng Việt, 10 SVG theo 4 ảnh gốc. Giữ chính xác các dấu # trên 4 lưới, hình đoạn thẳng, lưới ô vuông, tầng khối và biểu thức. Phân loại đầy đủ; bổ sung dạng cộng chữ số chưa biết trong Lý thuyết số, chia hình bằng đường thẳng, quan hệ chữ số và chọn nhóm không phân biệt thứ tự. Không tạo lựa chọn/đáp án. Kiểm tra đủ luồng nhập/nộp/lưu/tải lại và chủ đề trộn trên 11 giao diện.


## Đề quốc gia 6 — TIMO lớp 2

Nhập đủ 25 câu tự luận và phần từ vựng Việt, 12 SVG theo 4 ảnh gốc. Giữ các dòng hội thoại, ký hiệu ※, dãy hình, lưới vuông, phép cộng dọc và tầng khối. Phân loại đủ các câu; bổ sung dạng suy luận chữ số/vị trí, điền dấu nhân và cộng, độ dài cạnh tam giác, chọn và sắp xếp có thứ tự. Không tạo lựa chọn hoặc đáp án. Đã kiểm tra nhập/nộp/lưu/tải lại, chủ đề trộn và 11 giao diện.

Ngân hàng hiện có 13 đề, 325 câu: 7 đề vòng loại (175 câu trắc nghiệm) và 6 đề quốc gia (150 câu tự luận). Toàn bộ câu đã được gắn chủ đề nhỏ phù hợp; nội dung 300 câu trước giữ nguyên khi thêm Đề quốc gia 6. Các đề chưa có khóa trả lời của chủ dự án tiếp tục hiển thị “Chờ đáp án”.


## Đề quốc gia 7 — TIMO lớp 2

Nhập 25 câu tự luận, phần từ vựng Việt và 9 SVG theo 3 ảnh chủ dự án gửi. Giữ dãy ký hiệu, phép cộng dọc, biểu thức, lưới vuông, khối lập phương và các điểm trên đoạn thẳng. Phân loại đủ 25 câu; bổ sung chủ đề Suy luận quan hệ gia đình, Số ngày trong tháng, Điền dấu nhân và trừ. Giữ nguyên cả chỗ ghi “1-digit odd number” trong từ vựng câu 14 theo ảnh nguồn; nội dung tiếng Anh hỏi số lẻ có hai chữ số.

Ngân hàng hiện có 14 đề, 350 câu: 7 đề vòng loại và 7 đề quốc gia; 70 câu mỗi nhóm lớn, không còn câu Chưa phân loại. Không thay 325 câu đã có, không tự tạo lựa chọn/đáp án/lời giải. Đã kiểm tra nhập/nộp/lưu/tải lại, hình, luyện trộn hai loại câu và 11 giao diện ở máy tính/điện thoại.

## Đáp án Đề vòng loại 1

Nhập 25 đáp án và lời giải đúng theo 4 ảnh chủ dự án cung cấp, kèm 7 hình minh họa lời giải. Chỉ các câu này có answerSource=user; các đề khác tiếp tục chờ đáp án. Luyện theo chủ đề dùng cùng câu nguồn nên nhận đúng khóa/lời giải dù đảo thứ tự. Bài chủ đề chưa đủ khóa vẫn chờ chấm toàn bài, nhưng phụ huynh có thể mở lời giải của riêng các câu đã có khóa. Giữ cơ chế mật khẩu phụ huynh, không hiển thị lời giải trước khi nộp. Đã kiểm tra chấm 25/25, mật khẩu sai/đúng, tải lại/làm lại, bài trộn và 11 giao diện.


## Đáp án Đề vòng loại 2

Nhập 25 khóa và lời giải theo 4 ảnh chủ dự án cung cấp, kèm 7 SVG minh họa. Khóa/lời giải áp dụng cùng câu nguồn trong bài luyện theo chủ đề. Giữ nguyên đề, lựa chọn và phân loại. Kiểm tra chấm điểm, mở lời giải qua mật khẩu, bài luyện trộn khóa đã có/chưa có, lưu/tải lại/làm lại và 11 giao diện.

## Đáp án Đề vòng loại 3

Nhập 25 khóa/lời giải và 6 SVG minh họa theo 4 ảnh chủ dự án gửi, giữ cả các cách giải thay thế và chú thích mặt khuất/khối khuất. Áp dụng cùng câu nguồn vào luyện chủ đề. Đã kiểm tra chấm25/25, hiển thị đủ25 lời giải, mật khẩu sai/đúng, ảnh, lưu/tải lại/làm lại, bài trộn và11 giao diện. Không thay đề/lựa chọn/phân loại hoặc khóa của các đề trước.

## Đáp án Đề vòng loại 4

Nhập25 đáp án/lời giải và8 SVG theo5 ảnh chủ dự án gửi. Giữ các cách giải, số đánh trên khối/mặt/ô/đoạn, dãy mũi tên, cách chia bánh và4 bước sơ đồ ghép cặp. Bài chủ đề tham chiếu cùng khóa nguồn. Không sửa đề/lựa chọn/phân loại hoặc các khóa trước. Kiểm tra chấm điểm, mật khẩu, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện.

## Đáp án Đề vòng loại 5

Nhập25 khóa/lời giải và6 SVG từ4 ảnh chủ dự án gửi. Giữ các bước giải, hình đánh số, sơ đồ phép tính, bảng10 cách cắm hoa và các cách giải thay thế. Áp dụng vào đúng câu nguồn của luyện chủ đề. Hiện125 câu của5 đề vòng loại đầu có đáp án do chủ dự án cung cấp;225 câu còn lại tiếp tục chờ đáp án. Không đổi nội dung350 câu, lựa chọn, phân loại hay nguồn đề. Kiểm tra chấm điểm, mở lời giải bằng mật khẩu, bài luyện trộn, lưu/tải lại/làm lại và11 giao diện.

## Đáp án Đề vòng loại 6

Nhập25 khóa/lời giải và3 SVG theo3 ảnh chủ dự án gửi. Các câu trong luyện chủ đề tham chiếu cùng khóa/lời giải nguồn. Giữ nguyên câu hỏi/lựa chọn/phân loại và khóa các đề trước. Giữ nguyên cả dòng “Chọn đứa trẻ thứ hai: có6 cách” của câu24 dù phép tính trong nguồn dùng6×5:2; đã báo chủ dự án, không tự sửa. Kiểm tra chấm điểm, mật khẩu sai/đúng, hình, lưu/tải lại/làm lại, bài trộn và11 giao diện.

## Đáp án Đề vòng loại 7

Nhập25 khóa/lời giải và4 SVG theo5 ảnh chủ dự án cung cấp. Giữ hai cách giải câu4, các vùng đánh số câu16, mặt nhìn câu17, đoạn thẳng câu19 và các bước giải còn lại. Các bài luyện chủ đề dùng cùng khóa nguồn, giữ đúng khi đảo câu. Hiện cả175 câu của7 đề vòng loại đều có khóa/lời giải của chủ dự án;175 câu của7 đề quốc gia tiếp tục Chờ đáp án. Không thay nội dung, lựa chọn hoặc phân loại của350 câu. Kiểm tra chấm điểm, mật khẩu, hình, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện.

## Gộp chủ đề điền dấu

Gộp “Điền dấu nhân và trừ” vào chủ đề nhỏ4 “Điền dấu cộng và trừ” theo yêu cầu chủ dự án, tổng12 câu. Giữ nội dung/ảnh/đáp án/lời giải và nguồn của350 câu; chỉ đổi nhãn phân loại câu12 Đề quốc gia7. Id cũ chuyển về nhóm4, bài làm lưu theo nguồn được giữ cả lựa chọn trắc nghiệm và văn bản tự luận; đã kiểm tra tải lại và màn hình máy tính/điện thoại.

## Gộp nhóm phép cộng chữ số chưa biết

Gộp2 câu từ nhóm11 của Lý thuyết số vào nhóm4 “Phép cộng với chữ số chưa biết” của Số học theo chỉ định chủ dự án, tổng14 câu. Chỉ định nhóm luyện riêng cho câu15 Đề quốc gia5 và6; giữ nguyên số câu, đề mục nguồn, nội dung và đáp án/lời giải. Chuyển id nhóm cũ sang nhóm4 để giữ bài làm đã lưu ở cả hai nhóm, kể cả khi tải lại trang.

## Gộp nhóm tìm số còn thiếu

Chuyển câu15 Đề vòng loại5 từ “Tìm số còn thiếu trong đẳng thức” của Lý thuyết số sang chủ đề nhỏ2 “Tìm số bị che trong phép tính” của Số học, tổng10 câu. Giữ nguyên đề nguồn, số câu, nội dung, lựa chọn, đáp án và lời giải. Chuyển tiếp id nhóm cũ, giữ bài làm ở cả hai nhóm khi mở và tải lại.

## Nhóm4 Điền dấu

Gộp câu13 Đề quốc gia6 từ “Điền dấu nhân và cộng” vào nhóm4, đổi tên chung thành “Điền dấu”, tổng13 câu. Giữ id nhóm4, số câu/nguồn/nội dung và khóa/lời giải. Bài làm từ các nhóm cũ được chuyển về nhóm chung theo id nguồn và giữ khi tải lại; kiểm tra máy tính/điện thoại.

## Nhóm1 Đếm hình

Gộp nhóm Đếm hình vuông (11 câu) và Đếm hình tam giác (1 câu) thành nhóm nhỏ1 “Đếm hình” của Hình học, tổng12 câu. Giữ id nhóm1, chuyển tiếp id nhóm tam giác và bài làm theo câu nguồn. Nội dung, hình, khóa và lời giải giữ nguyên; đã kiểm tra mở nhóm và khôi phục bài làm khi tải lại ở máy tính/điện thoại.

## Gộp nhóm đếm đoạn thẳng và cạnh

Gộp hai nhóm thành nhóm nhỏ4 “Đếm đoạn thẳng và cạnh” của Hình học, tổng13 câu. Giữ id nhóm Đếm đoạn thẳng và chuyển tiếp id nhóm cạnh để giữ bài làm ở cả hai nhóm, kể cả khi tải lại. Chỉ đổi phân loại; nội dung/ảnh/đáp án/lời giải và nguồn câu giữ nguyên. Kiểm tra mở bài, khôi phục tiến độ và máy tính/điện thoại.

Gộp tiếp “Tạo đường thẳng từ các điểm” vào nhóm nhỏ4, tổng14 câu. Chuyển id nhóm cũ về nhóm4, bảo toàn câu nguồn, khóa/lời giải và bài làm đã lưu; kiểm tra tải lại và máy tính/điện thoại.

Gộp “Đếm hình chữ nhật” vào nhóm nhỏ1 “Đếm hình”, tổng13 câu, theo yêu cầu chủ dự án. Giữ nguyên câu nguồn19 Đề quốc gia2, chuyển tiếp id nhóm cũ và bài làm khi tải lại. Đã kiểm tra bài trộn trắc nghiệm/tự luận và máy tính/điện thoại.

## Nhóm5 Ngày, tháng và lịch

Gộp ba nhóm Các ngày trong tuần, Số ngày trong tháng và Các tháng trong năm thành nhóm nhỏ5 “Ngày, tháng và lịch”, tổng12 câu. Giữ id nhóm ngày trong tuần và chuyển tiếp hai id cũ; câu nguồn, khóa/lời giải và bài làm của cả ba nhóm giữ nguyên. Kiểm tra mở bài, khôi phục lựa chọn/văn bản và tải lại trên máy tính/điện thoại.

## Đáp án Đề quốc gia 1

Nhập25 khóa văn bản/lời giải và4 SVG minh họa theo5 ảnh chủ dự án gửi. Giữ các bước giải, bảng chữ cái và hình đánh số mặt khối/đoạn thẳng/đỉnh đa giác. Các câu trong luyện chủ đề dùng chung khóa nguồn, kể cả khi đảo câu. Chỉ thêm khóa do chủ dự án cung cấp, không tự chấm các đề quốc gia còn lại. Kiểm tra nhập/nộp/chấm25/25, mật khẩu sai/đúng, lời giải/hình, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện.

## Đáp án Đề quốc gia 2

Nhập25 khóa văn bản/lời giải và5 SVG theo5 ảnh chủ dự án gửi. Giữ cách giải, bảng chữ cái, chữ số hàng đơn vị, các mặt bị che và các hình đếm chữ nhật/đoạn thẳng. Khóa/lời giải dùng chung trong luyện chủ đề. Không thay câu nguồn hoặc khóa trước. Đã kiểm tra chấm25/25, mở lời giải qua mật khẩu, hình, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện.

## Đáp án Đề quốc gia 3

Nhập25 khóa văn bản/lời giải và4 SVG theo4 ảnh chủ dự án gửi. Giữ các cách giải ngày tháng, bảng chữ cái, mảnh ghép, đoạn thẳng và mặt nhìn được đánh số. Luyện chủ đề dùng cùng khóa nguồn. Đã kiểm tra chấm25/25, mật khẩu, hình, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện; các câu nguồn và khóa trước giữ nguyên.

## Đáp án Đề quốc gia 4

Nhập25 khóa văn bản/lời giải và5 SVG theo4 ảnh chủ dự án gửi. Giữ các cách giải chữ số, đếm hình/đoạn/góc, các mặt bị che, bảng chữ cái và các bước giải còn lại. Luyện chủ đề dùng cùng khóa nguồn. Kiểm tra chấm25/25, mật khẩu, hình, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện.

Hiện275/350 câu có đáp án do chủ dự án cung cấp:175 câu của7 đề vòng loại và100 câu của4 đề quốc gia đầu.75 câu của Đề quốc gia5–7 tiếp tục Chờ đáp án, không tự tạo khóa hoặc lời giải.

## Đáp án Đề quốc gia 5

Nhập25 khóa văn bản/lời giải và5 SVG theo4 ảnh chủ dự án cung cấp. Giữ các bước giải, hình đánh số và cách đếm/kết hợp. Câu13: nguồn lời giải dùng2×3 và kết quả202, câu hỏi đã nhập dùng2×2; giữ nguyên cả hai nguồn, nhập đáp sốEven do chủ dự án cung cấp và báo sự khác nhau, không tự sửa. Khóa/lời giải áp dụng cùng câu trong luyện chủ đề. Kiểm tra chấm25/25, mật khẩu, hình, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện.

## Đáp án Đề quốc gia 6

Nhập25 khóa văn bản/lời giải và5 SVG từ4 ảnh chủ dự án gửi. Giữ hội thoại suy luận, các bước giải, nhóm ký hiệu, ô vuông, mặt khối và11 vùng của hình tròn. Khóa/lời giải dùng chung trong luyện chủ đề, giữ nguyên lập luận của nguồn. Kiểm tra chấm25/25, mật khẩu, hình, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện; không đổi câu nguồn hoặc khóa trước.

## Đáp án Đề quốc gia 7

Nhập25 khóa văn bản/lời giải và6 SVG theo4 ảnh chủ dự án gửi. Giữ các bước giải, nhóm hình, bảng chữ cái, các hình đánh số và tam giác minh họa của lời giải. Các bài luyện chủ đề dùng cùng khóa nguồn. Đã kiểm tra chấm25/25, mật khẩu, hình, lưu/tải lại/làm lại, bài luyện trộn và11 giao diện.

Cả350 câu của14 đề hiện có (7 vòng loại và7 quốc gia) đã có đáp án/lời giải do chủ dự án cung cấp. Không thay nội dung, lựa chọn hoặc phân loại câu khi nhập các khóa quốc gia. Giữ nguyên chỗ khác nhau giữa câu13 Đề quốc gia5 và lời giải nguồn đã báo, không tự sửa.
