const programs = ['TIMO', 'ASMO', 'Báo bài của trường'];
const subjects = ['Toán', 'Tiếng Việt', 'Tiếng Anh'];
const modes = ['Đề vòng loại', 'Đề quốc gia', 'Luyện theo chủ đề'];

function getSubjects(program) {
  return program === 'TIMO' ? ['Toán'] : subjects;
}

// Only add official papers and answer keys supplied by the project owner.
// Each paper needs a stable id, program, subject, grade, mode, title and questions.
const officialPapers = [
  {
    "id": "timo-grade2-qualifying-01",
    "title": "Đề vòng loại 01",
    "sourceTitle": "PRELIMINARY ROUND / VÒNG LOẠI — ĐỀ SỐ 1",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề vòng loại",
    "questions": [
      {
        "number": 1,
        "english": "What is the number that should be filled in the blank?",
        "translation": "Tìm số thích hợp để điền vào chỗ trống.",
        "options": [
          "24",
          "25",
          "26",
          "23"
        ],
        "subtopic": "Quy luật dãy số",
        "imageAlt": "Dãy số 2, 6, 11, 17, chỗ trống, 32, 41.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q01-sequence.b544b7b56670.svg"
      },
      {
        "number": 2,
        "english": "Tony has 17 red marbles. Then, his friend gave him 12 yellow marbles. How many marbles does Tony have now?",
        "translation": "Tony có 17 viên bi màu đỏ. Sau đó, một người bạn cho cậu bé 12 viên bi màu vàng. Hỏi lúc này Tony có bao nhiêu viên bi?",
        "options": [
          "39",
          "5",
          "29",
          "15"
        ],
        "subtopic": "Thêm và gộp số lượng"
      },
      {
        "number": 3,
        "english": "Maria will be 13 years old 6 years later. How old is Maria now?",
        "translation": "6 năm nữa, Maria sẽ 13 tuổi. Hỏi bây giờ Maria bao nhiêu tuổi?",
        "options": [
          "6",
          "8",
          "19",
          "7"
        ],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 4,
        "english": "According to the pattern shown below, how many hats are there in the 5th group?",
        "translation": "Dựa vào quy luật dưới đây, có bao nhiêu chiếc mũ trong nhóm thứ 5?",
        "options": [
          "13",
          "15",
          "16",
          "12"
        ],
        "subtopic": "Quy luật sắp xếp hình",
        "imageAlt": "Ba lưới ô vuông chứa các chiếc mũ, được ghi lần lượt 1st group, 2nd group, 3rd group, đúng theo các vị trí trong ảnh đề.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q04-hats.8113a2ac14a8.svg"
      },
      {
        "number": 5,
        "english": "Yesterday was Monday. Which day of the week was it 6 days before now?",
        "translation": "Hôm qua là thứ Hai. Hỏi 6 ngày trước hôm nay là thứ mấy?",
        "options": [
          "Sunday / Chủ nhật",
          "Wednesday / Thứ Tư",
          "Monday / Thứ Hai",
          "Tuesday / Thứ Ba"
        ],
        "subtopic": "Các ngày trong tuần",
        "optionColumns": 2
      },
      {
        "number": 6,
        "english": "Find the value of 11 + 13 + 5 + 9.",
        "translation": "Tìm giá trị của 11 + 13 + 5 + 9.",
        "options": [
          "37",
          "38",
          "40",
          "39"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Which number is hidden behind the bell below?",
        "translation": "Số nào đang bị giấu sau cái chuông dưới đây?",
        "options": [
          "28",
          "30",
          "17",
          "18"
        ],
        "subtopic": "Tìm số bị che trong phép tính",
        "imageAlt": "Phép tính 5 cộng hình cái chuông bằng 29 trừ 6.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q07-bell.a15badb850d7.svg"
      },
      {
        "number": 8,
        "english": "Find the value of 14 − 13 + 12 − 11 + 10 − 9 + 8 − 7 + 6.",
        "translation": "Tìm giá trị của 14 − 13 + 12 − 11 + 10 − 9 + 8 − 7 + 6.",
        "options": [
          "4",
          "6",
          "10",
          "8"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "Find the first number in the sequence of operation below.",
        "translation": "Tìm số đầu tiên trong chuỗi phép tính dưới đây.",
        "options": [
          "10",
          "16",
          "12",
          "8"
        ],
        "subtopic": "Sơ đồ chuỗi phép tính",
        "imageAlt": "Tam giác chứa dấu hỏi, mũi tên cộng 2 tới hình vuông, cộng 7 tới hình ngũ giác, trừ 5 tới hình lục giác chứa số 12.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q09-operations.485f5fe71c07.svg"
      },
      {
        "number": 10,
        "english": "Given that A and B represent different 1-digit numbers, find the value of B.",
        "translation": "Biết rằng A và B biểu diễn các số có 1 chữ số khác nhau, tìm giá trị của B.",
        "options": [
          "8",
          "7",
          "5",
          "4"
        ],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "imageAlt": "Phép cộng đặt dọc: số AB cộng A bằng 52; A ở dòng thứ hai thẳng cột với B ở dòng đầu.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q10-column-addition.863e13109f19.svg"
      },
      {
        "number": 11,
        "english": "How many 2-digit numbers with 2 digits adding up to 13 are there?",
        "translation": "Hỏi có bao nhiêu số có 2 chữ số mà khi cộng 2 chữ số đó lại thì được kết quả là 13?",
        "options": [
          "5",
          "6",
          "7",
          "4"
        ],
        "subtopic": "Số có hai chữ số và tổng chữ số"
      },
      {
        "number": 12,
        "english": "According to the pattern below, what is the 6th number in the sequence?",
        "translation": "Theo quy luật dưới đây, số thứ 6 trong dãy là số nào?",
        "options": [
          "68",
          "62",
          "70",
          "69"
        ],
        "subtopic": "Tìm số hạng trong dãy số",
        "imageAlt": "Dãy số 34, 41, 48, 55, …",
        "image": "./assets/papers/timo-grade2-qualifying-01/q12-sequence.b0bff4a309bb.svg"
      },
      {
        "number": 13,
        "english": "Among the following operations, how many results are even numbers?",
        "translation": "Hỏi có bao nhiêu kết quả là số chẵn trong các phép tính sau?",
        "options": [
          "4",
          "3",
          "2",
          "1"
        ],
        "subtopic": "Nhận biết kết quả chẵn",
        "imageAlt": "Sáu ô phép tính: 13 + 6; 22 − 10 + 7; 25 − 11; 8 + 3; 27 − 4; 5 + 7.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q13-expressions.71828f018f2a.svg"
      },
      {
        "number": 14,
        "english": "Fill in the lines with ‘−’ and ‘+’ to make the equation below correct.",
        "translation": "Điền dấu ‘−’ và ‘+’ vào chỗ trống để tạo thành một phép tính đúng.",
        "options": [
          "3 + 9 + 5 + 1 = 8",
          "3 + 9 − 5 − 1 = 8",
          "3 + 9 + 5 − 1 = 8",
          "3 + 9 − 5 + 1 = 8"
        ],
        "subtopic": "Điền dấu cộng và trừ",
        "imageAlt": "Phép tính 3, chỗ điền dấu, 9, chỗ điền dấu, 5, chỗ điền dấu, 1 bằng 8.",
        "optionColumns": 2,
        "image": "./assets/papers/timo-grade2-qualifying-01/q14-signs.7c0e4999dbee.svg"
      },
      {
        "number": 15,
        "english": "Martin has 4 pencils and Ryan has 16 pencils. How many pencils should Ryan give to Martin so that they have the same number of pencils?",
        "translation": "Martin có 4 chiếc bút chì và Ryan có 16 chiếc bút chì. Hỏi Ryan cần cho Martin bao nhiêu chiếc bút chì để hai bạn có số bút chì bằng nhau?",
        "options": [
          "6",
          "20",
          "10",
          "12"
        ],
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau"
      },
      {
        "number": 16,
        "english": "How many squares are there in the figure below?",
        "translation": "Hỏi có bao nhiêu hình vuông trong hình vẽ dưới đây?",
        "options": [
          "9",
          "10",
          "7",
          "8"
        ],
        "subtopic": "Đếm hình vuông",
        "imageAlt": "Khung chữ nhật có các đường ngang và dọc tạo thành những hình vuông giao nhau, dựng lại theo hình của câu 16.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q16-squares.5e4b037701a7.svg"
      },
      {
        "number": 17,
        "english": "According to the pattern shown below, what is the figure in the space?",
        "translation": "Dựa vào quy luật đã cho, hình nào là hình thích hợp điền vào chỗ trống.",
        "options": [
          "★",
          "◆",
          "●",
          "▲"
        ],
        "subtopic": "Quy luật dãy hình",
        "imageAlt": "Dãy hình sao, thoi, tròn, sao, tam giác, tròn, sao, thoi, tròn, sao, dấu hỏi, tròn, sao, thoi, tròn, sao, tam giác, tròn.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q17-shapes.82c8a2e7db7f.svg",
        "optionImages": [
          "./assets/papers/timo-grade2-qualifying-01/q17-choice-star.9c1649fa892b.svg",
          "./assets/papers/timo-grade2-qualifying-01/q17-choice-diamond.38f9365e789f.svg",
          "./assets/papers/timo-grade2-qualifying-01/q17-choice-circle.49d5682facc5.svg",
          "./assets/papers/timo-grade2-qualifying-01/q17-choice-triangle.fead5fb754f7.svg"
        ]
      },
      {
        "number": 18,
        "english": "At least how many small squares can be seen if viewing the figure below from the front?",
        "translation": "Hỏi có thể thấy được ít nhất bao nhiêu hình vuông nhỏ nếu nhìn hình dưới đây từ phía trước?",
        "options": [
          "10",
          "9",
          "8",
          "7"
        ],
        "subtopic": "Quan sát và đếm khối lập phương",
        "imageAlt": "Cụm các khối lập phương màu xanh nhạt, có các cột cao thấp và các mặt trước nhìn nghiêng theo ảnh câu 18.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q18-front-view.02db79aa7bfb.svg"
      },
      {
        "number": 19,
        "english": "How many line segments are there in the figure below?",
        "translation": "Hỏi có bao nhiêu đoạn thẳng trong hình vẽ dưới đây?",
        "options": [
          "12",
          "14",
          "13",
          "15"
        ],
        "subtopic": "Đếm đoạn thẳng",
        "imageAlt": "Hình con thuyền tạo bởi các đoạn thẳng, cột buồm, cánh buồm và các điểm đánh dấu theo ảnh câu 19.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q19-segments.36b55d8b5646.svg"
      },
      {
        "number": 20,
        "english": "Linda stacks identical cubes on top of each other to get the figure below. At least how many cubes does she need to use?",
        "translation": "Linda xếp các khối lập phương y hệt chồng lên nhau để được hình vẽ dưới đây. Hỏi cô bé cần ít nhất bao nhiêu khối lập phương?",
        "options": [
          "10",
          "11",
          "12",
          "13"
        ],
        "subtopic": "Quan sát và đếm khối lập phương",
        "imageAlt": "Hình các khối lập phương giống nhau xếp chồng thành các bậc, dựng theo các mặt nhìn thấy trong ảnh câu 20.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q20-stacked-cubes.d7c889eb0ff3.svg"
      },
      {
        "number": 21,
        "english": "Arrange the numbers below in descending order to find the 4th largest number.",
        "translation": "Sắp xếp các số sau giảm dần để tìm số lớn thứ 4.",
        "options": [
          "56",
          "48",
          "65",
          "71"
        ],
        "subtopic": "Sắp xếp số và xác định thứ hạng",
        "imageAlt": "Các số 19, 33, 71, 48, 65, 97, 39, 56, 77.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q21-numbers.ce85517152d3.svg"
      },
      {
        "number": 22,
        "english": "Choose 2 digits, without repetition, from 1, 2, 5, 6, 7, 9 to form 2-digit numbers. How many even numbers can be formed?",
        "translation": "Chọn 2 chữ số không lặp lại từ 1, 2, 5, 6, 7, 9 để tạo thành các số có 2 chữ số. Hỏi có thể tạo được bao nhiêu số chẵn?",
        "options": [
          "8",
          "9",
          "10",
          "12"
        ],
        "subtopic": "Lập số chẵn không lặp chữ số"
      },
      {
        "number": 23,
        "english": "Lylia has 4 number cards including 8, 3, 5, 6. Find the smallest sum of two 2-digit numbers formed by those cards without repetition.",
        "translation": "Lylia có 4 thẻ số bao gồm 8, 3, 5, 6. Tìm tổng nhỏ nhất có thể của hai số có 2 chữ số tạo từ các thẻ đã cho biết rằng không chữ số nào bị lặp lại.",
        "options": [
          "94",
          "86",
          "103",
          "35"
        ],
        "subtopic": "Lập hai số có tổng nhỏ nhất"
      },
      {
        "number": 24,
        "english": "Philip wants to use one type of meat and one type of vegetable to make a dish. For meat, he can choose beef, chicken or pork. For vegetable, he can choose potatoes, tomatoes or cabbages. In how many ways can Philip choose ingredients for that dish?",
        "translation": "Philip muốn dùng một loại thịt và một loại rau để nấu một món ăn. Trong các loại thịt, anh ấy có thể chọn thịt bò, thịt gà hoặc thịt lợn. Trong các loại rau, anh ấy có thể chọn khoai tây, cà chua hoặc bắp cải. Hỏi Philip có thể có bao nhiêu cách chọn nguyên liệu cho món ăn của mình?",
        "options": [
          "6",
          "9",
          "10",
          "8"
        ],
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?",
        "imageAlt": "Hai khung gồm thịt bò, thịt gà, thịt lợn ở bên trái và khoai tây, cà chua, bắp cải ở bên phải; ở giữa là dấu cộng.",
        "image": "./assets/papers/timo-grade2-qualifying-01/q24-food-choices.cfeb3560b255.svg"
      },
      {
        "number": 25,
        "english": "Bruce wants to buy some books. Each book costs $4. For every 3 books, the store gives him 1 pen for free. Bruce has a total of $80. At most how many pens can Bruce get for free?",
        "translation": "Bruce muốn mua một số sách. Mỗi quyển sách có giá 4 đô. Cứ mua 3 quyển sách thì anh ấy được cửa hàng tặng 1 chiếc bút. Bruce có tổng cộng 80 đô. Hỏi Bruce có thể được tặng nhiều nhất bao nhiêu chiếc bút?",
        "options": [
          "7",
          "8",
          "5",
          "6"
        ],
        "subtopic": "Mua hàng và quà tặng"
      }
    ]
  },
  {
    "id": "timo-grade2-qualifying-02",
    "title": "Đề vòng loại 02",
    "sourceTitle": "ĐỀ SỐ 2 — VÒNG LOẠI TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề vòng loại",
    "questions": [
      {
        "number": 1,
        "english": "What is the number that should be filled in the blank?",
        "translation": "Tìm số thích hợp để điền vào chỗ trống.",
        "options": [
          "20",
          "25",
          "26",
          "30"
        ],
        "imageAlt": "Dãy số 1, 4, 9, 16, chỗ trống, 36, 49.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q01-sequence.c68d2e0203cd.svg",
        "subtopic": "Quy luật dãy số"
      },
      {
        "number": 2,
        "english": "There are 11 boys and 15 girls in the art club. How many members are there in this club?",
        "translation": "Câu lạc bộ nghệ thuật có 11 thành viên nam và 15 thành viên nữ. Hỏi câu lạc bộ đó có tất cả bao nhiêu thành viên?",
        "options": [
          "24",
          "25",
          "26",
          "27"
        ],
        "subtopic": "Thêm và gộp số lượng"
      },
      {
        "number": 3,
        "english": "Karik was 8 years old 7 years ago. How old is Karik now?",
        "translation": "7 năm trước, Karik 8 tuổi. Hỏi bây giờ Karik bao nhiêu tuổi?",
        "options": [
          "1",
          "8",
          "14",
          "15"
        ],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 4,
        "english": "According to the pattern shown below, how many flowers are there in the next group?",
        "translation": "Dựa vào quy luật dưới đây, có bao nhiêu hình bông hoa trong nhóm tiếp theo?",
        "options": [
          "14",
          "15",
          "16",
          "17"
        ],
        "imageAlt": "Bốn nhóm hoa lần lượt trong các lưới 2 × 2, 3 × 3, 4 × 4 và 5 × 5, giữ các vị trí hoa như ảnh đề.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q04-flowers.1fdd407eeb3d.svg",
        "subtopic": "Quy luật sắp xếp hình"
      },
      {
        "number": 5,
        "english": "Tomorrow will be Saturday. Which day of the week was it 5 days before now?",
        "translation": "Ngày mai là thứ Bảy. Hỏi 5 ngày trước hôm nay là thứ mấy?",
        "options": [
          "Sunday / Chủ nhật",
          "Wednesday / Thứ Tư",
          "Saturday / Thứ Bảy",
          "Tuesday / Thứ Ba"
        ],
        "optionColumns": 2,
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 6,
        "english": "Find the value of 5 + 14 + 7 + 16.",
        "translation": "Tìm giá trị của 5 + 14 + 7 + 16.",
        "options": [
          "37",
          "38",
          "41",
          "42"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Which number is hidden behind the tree below?",
        "translation": "Số nào đang bị giấu sau cái cây dưới đây?",
        "options": [
          "17",
          "39",
          "41",
          "43"
        ],
        "imageAlt": "Hình cái cây trừ 12 bằng 9 cộng 20.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q07-tree.90dcd04c749a.svg",
        "subtopic": "Tìm số bị che trong phép tính"
      },
      {
        "number": 8,
        "english": "Find the value of 15 − 14 + 13 − 12 + 11 − 10 + 9 − 8 + 7 − 6 + 5.",
        "translation": "Tìm giá trị của 15 − 14 + 13 − 12 + 11 − 10 + 9 − 8 + 7 − 6 + 5.",
        "options": [
          "10",
          "9",
          "7",
          "5"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "Find the first number in the sequence below.",
        "translation": "Tìm số đầu tiên trong dãy dưới đây.",
        "options": [
          "10",
          "15",
          "22",
          "25"
        ],
        "imageAlt": "Bốn ô bầu dục: dấu hỏi, mũi tên trừ 7 tới ô trống, mũi tên trừ 5 tới ô trống, mũi tên cộng 22 tới số 32.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q09-operations.3f5e10368f22.svg",
        "subtopic": "Sơ đồ chuỗi phép tính"
      },
      {
        "number": 10,
        "english": "Given that A and B represent different 1-digit numbers, find the value of B.",
        "translation": "Biết rằng A và B biểu diễn các số có 1 chữ số khác nhau, tìm giá trị của B.",
        "options": [
          "4",
          "7",
          "8",
          "9"
        ],
        "imageAlt": "Phép cộng đặt dọc: AB cộng B bằng 48; B ở hàng thứ hai thẳng cột với B ở hàng đầu.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q10-column-addition.a75d7416ff4b.svg",
        "subtopic": "Phép cộng với chữ số chưa biết"
      },
      {
        "number": 11,
        "english": "How many 2-digit numbers with 2 digits adding up to 14 are there?",
        "translation": "Hỏi có bao nhiêu số có 2 chữ số mà khi cộng 2 chữ số đó lại thì được kết quả là 14?",
        "options": [
          "3",
          "5",
          "7",
          "8"
        ],
        "subtopic": "Số có hai chữ số và tổng chữ số"
      },
      {
        "number": 12,
        "english": "According to the pattern below, what is the 6th number in the sequence?",
        "translation": "Theo quy luật dưới đây, số thứ 6 trong dãy là số nào?",
        "options": [
          "32",
          "23",
          "14",
          "41"
        ],
        "imageAlt": "Dãy số 77, 68, 59, 50, …",
        "image": "./assets/papers/timo-grade2-qualifying-02/q12-sequence.60cb8509b4af.svg",
        "subtopic": "Tìm số hạng trong dãy số"
      },
      {
        "number": 13,
        "english": "Among the following operations, how many results are odd numbers?",
        "translation": "Hỏi có bao nhiêu kết quả là số lẻ trong các phép tính sau?",
        "options": [
          "4",
          "3",
          "2",
          "5"
        ],
        "imageAlt": "Năm ô phép tính: 7 + 4; 18 − 6; 14 + 23; 25 − 12; 21 − 2 − 9.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q13-expressions.00859f8300d3.svg",
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 14,
        "english": "Fill in the lines with ‘−’ and ‘+’ to make the equation below correct.",
        "translation": "Điền dấu ‘−’ và ‘+’ vào chỗ trống để tạo thành một phép tính đúng.",
        "options": [
          "1 + 8 + 3 + 7 = 13",
          "1 + 8 + 3 − 7 = 13",
          "1 + 8 − 3 + 7 = 13",
          "1 + 8 − 3 − 7 = 13"
        ],
        "imageAlt": "1, chỗ điền dấu, 8, chỗ điền dấu, 3, chỗ điền dấu, 7 bằng 13.",
        "optionColumns": 2,
        "image": "./assets/papers/timo-grade2-qualifying-02/q14-signs.1ded52b45aaf.svg",
        "subtopic": "Điền dấu cộng và trừ"
      },
      {
        "number": 15,
        "english": "Ken has 10 marbles and Ben has 20 marbles. How many marbles should Ben give to Ken so that they have the same number of marbles?",
        "translation": "Ken có 10 viên bi và Ben có 20 viên bi. Hỏi Ben phải cho Ken bao nhiêu viên bi để hai bạn có số bi bằng nhau?",
        "options": [
          "5",
          "10",
          "15",
          "7"
        ],
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau"
      },
      {
        "number": 16,
        "english": "How many squares are there in the figure below?",
        "translation": "Hỏi có bao nhiêu hình vuông trong hình vẽ dưới đây?",
        "options": [
          "9",
          "10",
          "12",
          "13"
        ],
        "imageAlt": "Hai hình vuông chồng lệch nhau, phần chồng chia thành một lưới hai cột và bốn hàng như hình đề.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q16-squares.e09671f914c1.svg",
        "subtopic": "Đếm hình vuông"
      },
      {
        "number": 17,
        "english": "According to the pattern shown below, what is the figure in the space?",
        "translation": "Dựa vào quy luật dưới đây, tìm hình vẽ thích hợp điền vào chỗ trống.",
        "options": [
          "Hình nhiều tia",
          "▲",
          "♥",
          "★"
        ],
        "imageAlt": "Dãy hình tim, hình nhiều tia, tam giác, sao, tròn, lặp lại như hình đề với một chỗ trống; các lựa chọn là hình nhiều tia, tam giác, tim và sao.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q17-shapes.69e2a2f57d6d.svg",
        "optionImages": [
          "./assets/papers/timo-grade2-qualifying-02/q17-choice-burst.b54ace7a4564.svg",
          "./assets/papers/timo-grade2-qualifying-02/q17-choice-triangle.ceb995c1057d.svg",
          "./assets/papers/timo-grade2-qualifying-02/q17-choice-heart.cb48071b00c0.svg",
          "./assets/papers/timo-grade2-qualifying-02/q17-choice-star.8e510ea5fe66.svg"
        ],
        "subtopic": "Quy luật dãy hình"
      },
      {
        "number": 18,
        "english": "At least how many small squares can be seen if viewing the figure below from the front?",
        "translation": "Hỏi có thể thấy được ít nhất bao nhiêu hình vuông nhỏ nếu nhìn hình dưới đây từ phía trước?",
        "options": [
          "10",
          "9",
          "8",
          "7"
        ],
        "imageAlt": "Các mặt khối lập phương màu xanh lá xếp cao thấp, với cột cao ở bên phải, dựng theo ảnh câu 18.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q18-front-view.b31eb0190096.svg",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 19,
        "english": "How many line segments are there in the figure below?",
        "translation": "Hỏi có bao nhiêu đoạn thẳng trong hình vẽ dưới đây?",
        "options": [
          "12",
          "11",
          "13",
          "10"
        ],
        "imageAlt": "Sáu điểm trên đường ngang và đường gấp khúc, nối bằng các đoạn thẳng và hai đoạn thẳng đứng như ảnh đề.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q19-segments.d75b54a655d7.svg",
        "subtopic": "Đếm đoạn thẳng"
      },
      {
        "number": 20,
        "english": "Camila stacks identical cubes on top of each other to get the figure below. At least how many cubes does she need to use?",
        "translation": "Camila xếp chồng các khối lập phương y hệt lên nhau để được hình dưới đây. Hỏi cô bé cần ít nhất bao nhiêu khối lập phương?",
        "options": [
          "10",
          "11",
          "12",
          "13"
        ],
        "imageAlt": "Các mặt khối lập phương màu xanh lá xếp chồng, với hai khối ở hàng trước bên trái và một cột ở bên phải như ảnh đề.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q20-stacked-cubes.72b899db0a7e.svg",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 21,
        "english": "Arrange the numbers in ascending order to find the 5th smallest number.",
        "translation": "Sắp xếp các số sau từ bé đến lớn để tìm số bé thứ 5.",
        "options": [
          "33",
          "62",
          "47",
          "39"
        ],
        "imageAlt": "Các số 24, 47, 98, 39, 62, 75, 80, 17, 33.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q21-numbers.f10534cb0981.svg",
        "subtopic": "Sắp xếp số và xác định thứ hạng"
      },
      {
        "number": 22,
        "english": "Choose 2 digits, without repetition, from 1, 3, 0, 7, 4 to form 2-digit numbers. How many odd numbers are there?",
        "translation": "Chọn 2 chữ số không lặp lại từ 1, 3, 0, 7, 4 để tạo thành các số có 2 chữ số. Hỏi có bao nhiêu số lẻ?",
        "options": [
          "8",
          "9",
          "10",
          "11"
        ]
      },
      {
        "number": 23,
        "english": "Frank has 4 number cards: 1, 3, 5, 4. Find the largest sum of two 2-digit numbers formed by those cards without repetition.",
        "translation": "Frank có 4 thẻ số: 1, 3, 5, 4. Tìm tổng lớn nhất có thể của hai số có 2 chữ số tạo từ các thẻ đã cho biết rằng không có chữ số nào bị lặp lại.",
        "options": [
          "94",
          "106",
          "85",
          "68"
        ]
      },
      {
        "number": 24,
        "english": "Kara wants to go home after school. There are 3 roads from the school to the bus station and there are 2 roads from the bus station to her house. How many different ways are there to come back home given that Kara has to go through the bus station?",
        "translation": "Kara muốn trở về nhà sau giờ học. Có 3 con đường từ trường học đến trạm xe buýt và có 2 con đường từ trạm xe buýt về nhà. Hỏi có bao nhiêu con đường khác nhau để đi từ trường về nhà mà Kara phải đi qua trạm xe buýt?",
        "options": [
          "8",
          "7",
          "6",
          "5"
        ],
        "imageAlt": "Trường học ở bên trái, trạm xe buýt ở giữa phía dưới, ngôi nhà ở bên phải; ba đường nối từ trường tới trạm và hai đường nối từ trạm về nhà.",
        "image": "./assets/papers/timo-grade2-qualifying-02/q24-roads.46b64812b380.svg",
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?"
      },
      {
        "number": 25,
        "english": "Lily wants to buy some dolls. Each doll costs $5. For every 3 dolls, the store gives a tote bag for free. Lily has a total of $70. At most how many tote bags can Lily get for free?",
        "translation": "Lily muốn mua một số búp bê. Mỗi con búp bê có giá 5 đô. Với mỗi 3 con búp bê, cửa hàng tặng thêm 1 chiếc túi. Lily có tổng cộng 70 đô. Hỏi Lily có thể được tặng nhiều nhất bao nhiêu túi?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "subtopic": "Mua hàng và quà tặng"
      }
    ]
  },
  {
    "id": "timo-grade2-qualifying-03",
    "title": "Đề vòng loại 03",
    "sourceTitle": "ĐỀ SỐ 3 — VÒNG LOẠI TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề vòng loại",
    "questions": [
      {
        "number": 1,
        "english": "According to the pattern shown below, find the number to replace the question mark.",
        "translation": "Dựa vào quy luật dưới đây, tìm số để thay thế dấu hỏi chấm.",
        "options": [
          "26",
          "27",
          "28",
          "29"
        ],
        "imageAlt": "Dãy 2, 5, 9, 14, 20, dấu hỏi, …",
        "image": "./assets/papers/timo-grade2-qualifying-03/q01-sequence.c3c1b01c42eb.svg",
        "subtopic": "Quy luật dãy số"
      },
      {
        "number": 2,
        "english": "There are 15 boys and 12 girls in Jennie’s class. How many classmates does she have?",
        "translation": "Lớp của Jennie có 15 học sinh nam và 12 học sinh nữ. Hỏi cô bé có bao nhiêu người bạn cùng lớp?",
        "options": [
          "24",
          "25",
          "26",
          "27"
        ],
        "subtopic": "Thêm và gộp số lượng"
      },
      {
        "number": 3,
        "english": "After 6 years, Linda will be 15 years old. How old is Linda now?",
        "translation": "6 năm nữa, Linda sẽ 15 tuổi. Hỏi bây giờ Linda bao nhiêu tuổi?",
        "options": [
          "6",
          "21",
          "11",
          "9"
        ],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 4,
        "english": "According to the pattern shown below, how many suns are there in the 10th group?",
        "translation": "Dựa vào quy luật dưới đây, có bao nhiêu hình mặt trời trong nhóm thứ 10?",
        "options": [
          "20",
          "22",
          "24",
          "26"
        ],
        "imageAlt": "Bốn nhóm mặt trời trong các lưới ô vuông, giữ vị trí theo ảnh của nhóm 1 đến nhóm 4.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q04-suns.fe9df3c857f5.svg",
        "subtopic": "Quy luật sắp xếp hình"
      },
      {
        "number": 5,
        "english": "The day before yesterday was Monday. Which day of the week will it be 4 days later?",
        "translation": "Ngày hôm kia là thứ Hai. Hỏi 4 ngày nữa là thứ mấy?",
        "options": [
          "Tuesday / Thứ Ba",
          "Wednesday / Thứ Tư",
          "Saturday / Thứ Bảy",
          "Sunday / Chủ Nhật"
        ],
        "optionColumns": 2,
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 6,
        "english": "Find the value of 12 + 6 + 7 + 13.",
        "translation": "Tìm giá trị của 12 + 6 + 7 + 13.",
        "options": [
          "28",
          "38",
          "37",
          "27"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Which number is hidden inside the backpack below?",
        "translation": "Số nào đang bị giấu trong chiếc cặp dưới đây?",
        "options": [
          "33",
          "35",
          "13",
          "15"
        ],
        "imageAlt": "11 cộng hình chiếc cặp màu xanh bằng 36 trừ 12.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q07-backpack.d7a05fa4de7c.svg",
        "subtopic": "Tìm số bị che trong phép tính"
      },
      {
        "number": 8,
        "english": "Find the value of 10 − 9 + 8 − 7 + 6 − 5 + 4 − 3 + 2 − 1.",
        "translation": "Tìm giá trị của 10 − 9 + 8 − 7 + 6 − 5 + 4 − 3 + 2 − 1.",
        "options": [
          "4",
          "5",
          "6",
          "3"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "What is the first number in the sequence?",
        "translation": "Số đầu tiên trong dãy là số nào?",
        "options": [
          "26",
          "17",
          "21",
          "20"
        ],
        "imageAlt": "Các hình ngũ giác: dấu hỏi, mũi tên trừ 10, ô trống, mũi tên cộng 7, ô trống, mũi tên cộng 6, số 23.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q09-operations.35d1a500c149.svg",
        "subtopic": "Sơ đồ chuỗi phép tính"
      },
      {
        "number": 10,
        "english": "Given that A and B represent different 1-digit numbers, what is the value of B?",
        "translation": "Biết A và B biểu diễn các số có 1 chữ số khác nhau, hỏi giá trị của B bằng bao nhiêu?",
        "options": [
          "7",
          "8",
          "4",
          "2"
        ],
        "imageAlt": "Phép cộng dọc AB cộng B bằng 24.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q10-column-addition.ac3344cba018.svg",
        "subtopic": "Phép cộng với chữ số chưa biết"
      },
      {
        "number": 11,
        "english": "How many 2-digit numbers with 2 digits adding up to 12 are there?",
        "translation": "Hỏi có bao nhiêu số có 2 chữ số mà khi cộng 2 chữ số đó lại thì được kết quả là 12?",
        "options": [
          "6",
          "12",
          "8",
          "7"
        ],
        "subtopic": "Số có hai chữ số và tổng chữ số"
      },
      {
        "number": 12,
        "english": "According to the pattern below, find the value of the 6th number in the sequence.",
        "translation": "Dựa vào quy luật dưới đây, tìm giá trị của số thứ 6 trong dãy.",
        "options": [
          "40",
          "38",
          "50",
          "48"
        ],
        "imageAlt": "Dãy 98, 86, 74, 62, …",
        "image": "./assets/papers/timo-grade2-qualifying-03/q12-sequence.fe25d3ed13bf.svg",
        "subtopic": "Tìm số hạng trong dãy số"
      },
      {
        "number": 13,
        "english": "Among the operations below, how many results are even numbers?",
        "translation": "Trong các phép tính dưới đây, có bao nhiêu kết quả là số chẵn?",
        "options": [
          "3",
          "2",
          "4",
          "1"
        ],
        "imageAlt": "Năm phép tính: 12 − 3; 7 + 5; 11 − 3 + 2; 111 + 1; 20 − 17.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q13-expressions.78c22541e0a4.svg",
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 14,
        "english": "Fill in the blanks with ‘−’ and ‘+’ to make the equation below correct.",
        "translation": "Điền dấu ‘−’ và ‘+’ vào chỗ trống để tạo thành một phép tính đúng.",
        "options": [
          "4 + 5 + 3 + 6 = 12",
          "4 + 5 − 3 − 6 = 12",
          "4 + 5 − 3 + 6 = 12",
          "4 + 5 + 3 − 6 = 12"
        ],
        "imageAlt": "4, chỗ điền dấu, 5, chỗ điền dấu, 3, chỗ điền dấu, 6 bằng 12.",
        "optionColumns": 2,
        "image": "./assets/papers/timo-grade2-qualifying-03/q14-signs.143f30da5a24.svg",
        "subtopic": "Điền dấu cộng và trừ"
      },
      {
        "number": 15,
        "english": "John has 20 balloons and Jack has 60 balloons. How many balloons should Jack give to John so that they have the same number of balloons?",
        "translation": "John có 20 quả bóng bay và Jack có 60 quả bóng bay. Hỏi Jack phải cho John bao nhiêu quả bóng bay để họ có số bóng bằng nhau?",
        "options": [
          "20",
          "40",
          "60",
          "80"
        ],
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau"
      },
      {
        "number": 16,
        "english": "How many squares are there in the figure below?",
        "translation": "Hỏi có bao nhiêu hình vuông trong hình dưới đây?",
        "options": [
          "6",
          "9",
          "10",
          "7"
        ],
        "imageAlt": "Hình vuông lớn phía trên trái, hình vuông nhỏ chia ô ở giữa và hình vuông dưới phải chồng lên nhau theo ảnh.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q16-squares.da63e2c48405.svg",
        "subtopic": "Đếm hình vuông"
      },
      {
        "number": 17,
        "english": "According to the pattern shown below, what is the figure in the space (“__”) provided?",
        "translation": "Dựa vào quy luật dưới đây, hình điền vào chỗ trống (“__”) là hình nào?",
        "options": [
          "●",
          "△",
          "◆",
          "○"
        ],
        "imageAlt": "Dãy chấm tròn, tam giác rỗng và hình thoi, lặp lại và có một chỗ trống theo ảnh.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q17-shapes.b18b6bb40b34.svg",
        "optionImages": [
          "./assets/papers/timo-grade2-qualifying-03/q17-choice-dot.725f922c2d52.svg",
          "./assets/papers/timo-grade2-qualifying-03/q17-choice-triangle.e01cebdcb296.svg",
          "./assets/papers/timo-grade2-qualifying-03/q17-choice-diamond.4834da97d3e0.svg",
          "./assets/papers/timo-grade2-qualifying-03/q17-choice-circle.87e68b438602.svg"
        ],
        "subtopic": "Quy luật dãy hình"
      },
      {
        "number": 18,
        "english": "At least how many squares can be seen if viewing the figure below from the right?",
        "translation": "Hỏi có thể nhìn thấy ít nhất bao nhiêu hình vuông nếu nhìn hình dưới đây từ phía bên phải?",
        "options": [
          "9",
          "6",
          "7",
          "8"
        ],
        "imageAlt": "Cụm khối lập phương màu xanh có cột cao ở phía sau, được hỏi khi nhìn từ bên phải, như ảnh đề.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q18-right-view.57b3c1f0dd37.svg",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 19,
        "english": "How many line segments are there in the figure below?",
        "translation": "Hỏi có bao nhiêu đoạn thẳng trong hình vẽ dưới đây?",
        "options": [
          "12",
          "14",
          "13",
          "11"
        ],
        "imageAlt": "Hình thoi lớn và các đoạn thẳng đi qua hai điểm ở giữa, sáu điểm đánh dấu như ảnh.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q19-segments.eae3bf0e6e7f.svg",
        "subtopic": "Đếm đoạn thẳng"
      },
      {
        "number": 20,
        "english": "Fiona stacks identical cubes on top of each other to get the figure below. At least how many cubes does she need to use?",
        "translation": "Fiona xếp chồng các khối lập phương y hệt lên nhau để được hình dưới đây. Hỏi cô bé cần ít nhất bao nhiêu khối lập phương?",
        "options": [
          "10",
          "11",
          "8",
          "9"
        ],
        "imageAlt": "Cụm khối màu trắng xám với hai cột phía sau và một khối nhô ra phía trước theo ảnh.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q20-stacked-cubes.5912c10900e5.svg",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 21,
        "english": "Arrange the numbers in descending order to find the 3rd largest number.",
        "translation": "Sắp xếp các số sau từ lớn đến bé để tìm số lớn thứ 3.",
        "options": [
          "88",
          "37",
          "52",
          "49"
        ],
        "imageAlt": "Các số 23, 92, 12, 37, 49, 52, 88, 45.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q21-numbers.5d826c965731.svg",
        "subtopic": "Sắp xếp số và xác định thứ hạng"
      },
      {
        "number": 22,
        "english": "Choose 2 digits, without repetition, from 2, 3, 4, 5, 6 to form 2-digit numbers. How many even numbers are there?",
        "translation": "Chọn 2 chữ số không lặp lại từ 2, 3, 4, 5, 6 để tạo thành các số có 2 chữ số. Hỏi có tất cả bao nhiêu số chẵn?",
        "options": [
          "12",
          "24",
          "10",
          "20"
        ],
        "subtopic": "Lập số chẵn không lặp chữ số"
      },
      {
        "number": 23,
        "english": "Teacher writes 4 digits 2, 8, 5, 3 on the board. Find the smallest sum of two 2-digit numbers formed by those digits without repetition.",
        "translation": "Cô giáo viết 4 chữ số 2, 8, 5, 3 trên bảng. Tìm tổng nhỏ nhất có thể của hai số có 2 chữ số tạo từ các chữ số đã cho, biết rằng không có chữ số nào bị lặp lại.",
        "options": [
          "61",
          "81",
          "63",
          "83"
        ],
        "subtopic": "Lập hai số có tổng nhỏ nhất"
      },
      {
        "number": 24,
        "english": "There are 4 ways from the supermarket to the train station and there are 2 ways from the train station to the cinema. How many different ways are there from the supermarket to the cinema through the train station?",
        "translation": "Có 4 cách đi từ siêu thị đến ga tàu và có 2 cách đi từ ga tàu đến rạp chiếu phim. Hỏi có bao nhiêu cách khác nhau đi từ siêu thị đến rạp chiếu phim mà phải đi qua ga tàu?",
        "options": [
          "8",
          "5",
          "6",
          "4"
        ],
        "imageAlt": "Siêu thị, ga tàu và rạp chiếu phim với bốn đường từ siêu thị tới ga và hai đường từ ga tới rạp theo ảnh.",
        "image": "./assets/papers/timo-grade2-qualifying-03/q24-routes.93045e82bb86.svg",
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?"
      },
      {
        "number": 25,
        "english": "Peter wants to buy some pens. Each pen costs $5. For every 2 pens, the store gives 1 eraser for free. Peter has a total of $25. At most how many erasers can Peter get for free?",
        "translation": "Peter muốn mua một số bút. Mỗi chiếc bút có giá 5 đô. Với mỗi 2 chiếc bút, cửa hàng tặng thêm 1 cục tẩy miễn phí. Peter có tổng cộng 25 đô. Hỏi Peter có thể được tặng nhiều nhất bao nhiêu cục tẩy?",
        "options": [
          "5",
          "2",
          "3",
          "4"
        ],
        "subtopic": "Mua hàng và quà tặng"
      }
    ]
  },
  {
    "id": "timo-grade2-qualifying-04",
    "title": "Đề vòng loại 04",
    "sourceTitle": "ĐỀ SỐ 4 — VÒNG LOẠI TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề vòng loại",
    "questions": [
      {
        "number": 1,
        "english": "In a garden, there are 15 apple trees and 5 orange trees. How many trees are there in total?",
        "translation": "Trong một khu vườn, có 15 cây táo và 5 cây cam. Hỏi có tất cả bao nhiêu cây?",
        "options": [
          "20",
          "10",
          "15",
          "5"
        ],
        "subtopic": "Thêm và gộp số lượng"
      },
      {
        "number": 2,
        "english": "If it was Friday yesterday, which day of the week will it be 3 days from now?",
        "translation": "Nếu hôm qua là thứ Sáu, hỏi 3 ngày nữa tính từ hôm nay là thứ mấy?",
        "options": [
          "Monday / Thứ Hai",
          "Wednesday / Thứ Tư",
          "Tuesday / Thứ Ba",
          "Sunday / Chủ Nhật"
        ],
        "optionColumns": 2,
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 3,
        "english": "According to the pattern below, find the next figure in the sequence.",
        "translation": "Dựa vào quy luật dãy dưới đây, tìm hình tiếp theo ở trong dãy.",
        "options": [
          "□",
          "✚",
          "▲",
          "▼"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q03.9923b7911951.svg",
        "imageAlt": "Dãy hình vuông rỗng, dấu cộng và tam giác đặc theo ảnh",
        "subtopic": "Quy luật sắp xếp hình"
      },
      {
        "number": 4,
        "english": "When Lucy was born, her mother was 25 years old. Now, her mother is 27 years old, how old is Lucy?",
        "translation": "Khi Lucy sinh ra, mẹ cô bé 25 tuổi. Bây giờ mẹ 27 tuổi, hỏi Lucy bao nhiêu tuổi?",
        "options": [
          "42",
          "3",
          "52",
          "2"
        ],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 5,
        "english": "According to the pattern of the sequence below, let’s find the next number.",
        "translation": "Dựa vào quy luật của dãy số sau, hãy tìm số tiếp theo.",
        "options": [
          "6",
          "12",
          "13",
          "11"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q05.d2094fa15ab8.svg",
        "imageAlt": "Dãy 1, 20, 2, 18, 3, 16, 4, 14, 5, …",
        "subtopic": "Quy luật dãy số"
      },
      {
        "number": 6,
        "english": "Find the value of 3 + 25 + 7.",
        "translation": "Tìm giá trị của 3 + 25 + 7.",
        "options": [
          "40",
          "45",
          "30",
          "35"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Calculate 50 − 45 + 40 − 35.",
        "translation": "Tính 50 − 45 + 40 − 35.",
        "options": [
          "10",
          "15",
          "20",
          "25"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Find the number covered by the bird in the figure below.",
        "translation": "Hãy tìm số bị che bởi con chim trong hình dưới đây.",
        "options": [
          "9",
          "53",
          "11",
          "21"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q08.2be289c4ea5f.svg",
        "imageAlt": "21 cộng hình con chim xanh bằng 32",
        "subtopic": "Tìm số bị che trong phép tính"
      },
      {
        "number": 9,
        "english": "What is the suitable number to replace the flower below?",
        "translation": "Hãy tìm số thích hợp để thay thế cho bông hoa dưới đây?",
        "options": [
          "9",
          "19",
          "29",
          "39"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q09.41fac98782b3.svg",
        "imageAlt": "Bông hoa xanh trừ 10 bằng 15 cộng 4",
        "subtopic": "Tìm số bị che trong phép tính"
      },
      {
        "number": 10,
        "english": "Given that X and Y are 2 different digits, what is the value of Y?",
        "translation": "Cho X và Y là 2 chữ số khác nhau, hỏi giá trị của Y bằng bao nhiêu?",
        "options": [
          "2",
          "8",
          "9",
          "7"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q10.16aaea0b9fa2.svg",
        "imageAlt": "Phép cộng dọc XX cộng Y bằng 30",
        "subtopic": "Phép cộng với chữ số chưa biết"
      },
      {
        "number": 11,
        "english": "According to the pattern below, find the value of the 6th number in the sequence.",
        "translation": "Dựa vào quy luật dưới đây, tìm giá trị của số thứ 6 trong dãy.",
        "options": [
          "15",
          "13",
          "12",
          "16"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q11.d07b3c4159b8.svg",
        "imageAlt": "Dãy số 1, 4, 7, 10, …",
        "subtopic": "Tìm số hạng trong dãy số"
      },
      {
        "number": 12,
        "english": "What is the largest 2-digit odd number?",
        "translation": "Hỏi số lẻ lớn nhất có 2 chữ số là bao nhiêu?",
        "options": [
          "99",
          "98",
          "10",
          "11"
        ],
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 13,
        "english": "Class 2A has 22 students. Class 2B has 28 students. How many students have to move from class 2B to class 2A so that two classes have the same number of students?",
        "translation": "Lớp 2A có 22 học sinh. Lớp 2B có 28 học sinh. Hỏi cần chuyển bao nhiêu học sinh từ lớp 2B sang lớp 2A để hai lớp có số học sinh bằng nhau?",
        "options": [
          "3",
          "4",
          "5",
          "6"
        ],
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau"
      },
      {
        "number": 14,
        "english": "Among the following numbers, how many of them are even numbers greater than 20?",
        "translation": "Trong các số dưới đây, hỏi có bao nhiêu số chẵn lớn hơn 20?",
        "options": [
          "5",
          "4",
          "6",
          "3"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q14.6490fe276d20.svg",
        "imageAlt": "Các số 14, 31, 22, 19, 52, 93, 70, 54",
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 15,
        "english": "Fill the suitable signs in the blanks to get the correct equation.",
        "translation": "Điền dấu thích hợp vào chỗ trống để được phép tính đúng.",
        "options": [
          "5 − 3 + 2 − 4 = 6",
          "5 + 3 − 2 + 4 = 6",
          "5 − 3 − 2 + 4 = 6",
          "5 + 3 + 2 − 4 = 6"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q15.cadba1a8858a.svg",
        "imageAlt": "5, chỗ điền dấu, 3, chỗ điền dấu, 2, chỗ điền dấu, 4 bằng 6",
        "optionColumns": 2,
        "subtopic": "Điền dấu cộng và trừ"
      },
      {
        "number": 16,
        "english": "Lucy stacks identical cubes on top of each other to get the figure below. At least how many cubes does she need to use?",
        "translation": "Lucy xếp chồng các khối lập phương y hệt lên nhau để được hình dưới đây. Hỏi cô bé cần ít nhất bao nhiêu khối lập phương?",
        "options": [
          "6",
          "7",
          "8",
          "9"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q16.5d0a2ed562e1.svg",
        "imageAlt": "Khối lập phương trắng xám: hai khối phía trước, cột cao bên trái và khối bên phải như ảnh",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 17,
        "english": "At least how many small squares can be seen if viewing the figure below from the right?",
        "translation": "Hỏi có thể nhìn thấy ít nhất bao nhiêu hình vuông nhỏ nếu nhìn hình dưới đây từ phía bên phải?",
        "options": [
          "6",
          "7",
          "8",
          "9"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q17.4b7fc37a09da.svg",
        "imageAlt": "Cụm khối trắng xám dùng cho góc nhìn từ bên phải theo ảnh câu 17",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 18,
        "english": "How many squares are there in the figure below?",
        "translation": "Hình dưới đây có bao nhiêu hình vuông?",
        "options": [
          "15",
          "16",
          "17",
          "14"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q18.e7c5edbb6d4e.svg",
        "imageAlt": "Lưới ô vuông dạng hình con vật, đầu trên trái, cổ đứng, thân và hai chân như ảnh",
        "subtopic": "Đếm hình vuông"
      },
      {
        "number": 19,
        "english": "How many line segments are there in the figure below?",
        "translation": "Hỏi có bao nhiêu đoạn thẳng trong hình vẽ dưới đây?",
        "options": [
          "12",
          "11",
          "8",
          "7"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q19.83871ef79cb5.svg",
        "imageAlt": "Một đoạn thẳng xiên qua hai giao điểm, cắt hai đoạn ngang xiên có các điểm đánh dấu như ảnh",
        "subtopic": "Đếm đoạn thẳng"
      },
      {
        "number": 20,
        "english": "From the pattern shown below, how many right arrows “⇨” are there in the first ten figures?",
        "translation": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu mũi tên chỉ sang phải “⇨” trong 10 hình đầu tiên?",
        "options": [
          "6",
          "8",
          "9",
          "7"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q20.3e8fdc6faff5.svg",
        "imageAlt": "Dãy mũi tên sang phải và lên trên như ảnh",
        "subtopic": "Quy luật dãy hình"
      },
      {
        "number": 21,
        "english": "A store wants to put the following pieces of cakes into 4 boxes. How many pieces are there in each box so that all boxes have the same number of cakes?",
        "translation": "Một cửa hàng muốn cho số bánh sau vào 4 hộp. Hỏi mỗi hộp có bao nhiêu miếng bánh thì cả 4 hộp đều có số bánh như nhau?",
        "options": [
          "2",
          "6",
          "4",
          "3"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q21.3a12c8d0fd88.svg",
        "imageAlt": "Mười hai miếng bánh xếp thành hai hàng, mỗi hàng sáu miếng như ảnh"
      },
      {
        "number": 22,
        "english": "Arrange the numbers in ascending order to find the 3rd smallest number.",
        "translation": "Sắp xếp các số sau từ bé đến lớn để tìm số bé thứ 3.",
        "options": [
          "16",
          "27",
          "22",
          "34"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-04/q22.a2c6982bccf8.svg",
        "imageAlt": "Các số 11, 73, 27, 16, 34, 45, 67, 22",
        "subtopic": "Sắp xếp số và xác định thứ hạng"
      },
      {
        "number": 23,
        "english": "Ashley chooses 2 different digits from 0, 1, 2, 4 to form 2-digit numbers. Among those numbers, how many even numbers are there?",
        "translation": "Ashley chọn 2 chữ số khác nhau từ 0, 1, 2 và 4 để lập thành các số có hai chữ số. Hỏi trong các số đó có bao nhiêu số chẵn?",
        "options": [
          "7",
          "6",
          "5",
          "8"
        ],
        "subtopic": "Lập số chẵn không lặp chữ số"
      },
      {
        "number": 24,
        "english": "There are five friends including Amy, Ben, Cindy, Dan, Erik joining a chess lesson. Every 2 friends play with each other exactly one match. How many matches are there in the lesson?",
        "translation": "Có 5 bạn gồm Amy, Ben, Cindy, Dan, Erik tham gia một buổi học cờ vua. Cứ hai bạn bất kì chơi với nhau đúng một ván cờ. Hỏi có tất cả bao nhiêu ván cờ trong buổi học đó?",
        "options": [
          "20",
          "10",
          "15",
          "5"
        ]
      },
      {
        "number": 25,
        "english": "Teacher writes 4 digits 1, 4, 6, and 7 on the board. Find the largest sum of two 2-digit numbers formed by those digits without repetition.",
        "translation": "Cô giáo viết 4 chữ số 1, 4, 6 và 7 trên bảng. Tìm tổng lớn nhất có thể của hai số có 2 chữ số tạo từ các chữ số đã cho, biết rằng không có chữ số nào bị lặp lại.",
        "options": [
          "117",
          "135",
          "153",
          "76"
        ]
      }
    ]
  },
  {
    "id": "timo-grade2-qualifying-05",
    "title": "Đề vòng loại 05",
    "sourceTitle": "ĐỀ SỐ 5 — VÒNG LOẠI TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề vòng loại",
    "questions": [
      {
        "number": 1,
        "english": "Michael’s class has 5 boys and 6 girls. How many classmates does he have?",
        "translation": "Lớp của Michael có 5 bạn trai và 6 bạn gái. Hỏi Michael có bao nhiêu bạn cùng lớp?",
        "options": [
          "11",
          "10",
          "12",
          "9"
        ],
        "subtopic": "Thêm và gộp số lượng"
      },
      {
        "number": 2,
        "english": "If today is Wednesday and also the first day of March, which day of the week is 9th March?",
        "translation": "Nếu hôm nay là thứ Tư và cũng là ngày đầu tiên của tháng 3. Vậy ngày 9 tháng 3 là thứ mấy?",
        "options": [
          "Wednesday / Thứ Tư",
          "Saturday / Thứ Bảy",
          "Friday / Thứ Sáu",
          "Thursday / Thứ Năm"
        ],
        "optionColumns": 2,
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 3,
        "english": "According to the pattern below, find the 15th figure counting from the left.",
        "translation": "Dựa vào quy luật dưới đây, tìm hình thứ 15 tính từ bên trái.",
        "options": [
          "○",
          "□",
          "△",
          "✱"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q03.0b8d093a2adc.svg",
        "imageAlt": "Dãy tam giác rỗng, dấu sao, hình tròn rỗng, hình vuông rỗng lặp theo ảnh",
        "subtopic": "Quy luật sắp xếp hình"
      },
      {
        "number": 4,
        "english": "Dan celebrated his 6th birthday 3 years ago. How old will he be 2 years later?",
        "translation": "Dan tổ chức sinh nhật lần thứ 6 vào 3 năm trước. Hỏi 2 năm nữa anh ấy mấy tuổi?",
        "options": [
          "1",
          "11",
          "7",
          "5"
        ],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 5,
        "english": "According to the pattern below, what is the value of the next number?",
        "translation": "Dựa vào quy luật của dãy số sau, giá trị của số tiếp theo là số nào?",
        "options": [
          "13",
          "15",
          "25",
          "30"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q05.7c3aa09c5752.svg",
        "imageAlt": "Dãy 50, 3, 45, 6, 40, 9, 35, 12, …",
        "subtopic": "Quy luật dãy số"
      },
      {
        "number": 6,
        "english": "Find the value of 5 + 6 + 7 + 8 + 9 + 10.",
        "translation": "Tìm giá trị của 5 + 6 + 7 + 8 + 9 + 10.",
        "options": [
          "50",
          "55",
          "40",
          "45"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Calculate 13 − 11 + 9 − 7 + 5 − 3 + 1.",
        "translation": "Tính 13 − 11 + 9 − 7 + 5 − 3 + 1.",
        "options": [
          "14",
          "6",
          "7",
          "10"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Gordon thinks of a number. He adds 38 then subtracts 42 to get the smallest 2-digit odd number. Find Gordon’s number.",
        "translation": "Gordon nghĩ ra một số. Anh ấy lấy số đó cộng thêm 38 rồi trừ đi 42 thì được số lẻ nhỏ nhất có hai chữ số. Tìm số đó.",
        "options": [
          "15",
          "25",
          "14",
          "7"
        ],
        "subtopic": "Tìm số bị che trong phép tính"
      },
      {
        "number": 9,
        "english": "Let X and Y be different 1-digit numbers. If the equation below is correct, find the value of Y.",
        "translation": "Cho X và Y là các số có một chữ số khác nhau. Biết rằng phép toán dưới đây là đúng, tìm giá trị của Y.",
        "options": [
          "4",
          "8",
          "9",
          "7"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q09.95697f5bccae.svg",
        "imageAlt": "Phép cộng dọc XY cộng Y bằng 48",
        "subtopic": "Phép cộng với chữ số chưa biết"
      },
      {
        "number": 10,
        "english": "According to the pattern of the following sequence, find the sum of the first eight numbers.",
        "translation": "Dựa vào quy luật dãy số dưới đây, hãy tìm tổng của 8 số đầu tiên.",
        "options": [
          "21",
          "54",
          "44",
          "34"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q10.dbbbb5065f9e.svg",
        "imageAlt": "Dãy 1, 1, 2, 3, 5, 8, …",
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 11,
        "english": "According to the pattern below, find the value of the 7th number in the sequence.",
        "translation": "Dựa vào quy luật dưới đây, tìm giá trị của số thứ 7 trong dãy.",
        "options": [
          "18",
          "19",
          "23",
          "27"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q11.dadce1549f51.svg",
        "imageAlt": "Dãy 3, 7, 11, 15, …",
        "subtopic": "Tìm số hạng trong dãy số"
      },
      {
        "number": 12,
        "english": "From 7 to 23, how many 2-digit numbers are there?",
        "translation": "Trong các số từ 7 đến 23, hỏi có bao nhiêu số có hai chữ số?",
        "options": [
          "13",
          "14",
          "15",
          "16"
        ],
        "subtopic": "Đếm số theo điều kiện"
      },
      {
        "number": 13,
        "english": "Cara has 40 candies and Jolie has 20 candies. How many candies does Cara have to give Jolie to make them have the same number of candies?",
        "translation": "Cara có 40 cái kẹo và Jolie có 20 cái kẹo. Hỏi Cara phải cho Jolie bao nhiêu cái kẹo để hai bạn có số kẹo bằng nhau?",
        "options": [
          "20",
          "15",
          "10",
          "5"
        ],
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau"
      },
      {
        "number": 14,
        "english": "Refer to these numbers, how many odd numbers greater than 39 are there?",
        "translation": "Trong các số dưới đây, hỏi có bao nhiêu số lẻ lớn hơn 39?",
        "options": [
          "3",
          "2",
          "4",
          "1"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q14.afa49cd848c7.svg",
        "imageAlt": "Các số 12, 15, 28, 93, 35, 41, 90",
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 15,
        "english": "Fill in the blank to get a correct equation.",
        "translation": "Điền số thích hợp vào chỗ trống để được phép toán đúng.",
        "options": [
          "17",
          "27",
          "61",
          "71"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q15.f3c6ed679e66.svg",
        "imageAlt": "Chỗ trống cộng 27 bằng 19 cộng 48 trừ 23",
        "subtopic": "Tìm số còn thiếu trong đẳng thức"
      },
      {
        "number": 16,
        "english": "At least how many cubes are there in the figure below?",
        "translation": "Hình dưới đây có ít nhất bao nhiêu khối lập phương?",
        "options": [
          "8",
          "7",
          "6",
          "9"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q16.14f57a03e3f2.svg",
        "imageAlt": "Cụm khối trắng xám: hai chân hai bên, một khối cao ở giữa và một khối nhô phía trước theo ảnh",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 17,
        "english": "At least how many squares can be seen if viewing the figure from top?",
        "translation": "Nếu nhìn hình dưới đây từ trên xuống thì có thể thấy được ít nhất bao nhiêu hình vuông?",
        "options": [
          "3",
          "4",
          "6",
          "5"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q17.66888d272299.svg",
        "imageAlt": "Cụm khối trắng xám có hàng ngang phía trên, cột đứng phía trước và một khối nhô bên phải phía dưới theo ảnh; nhìn từ trên xuống",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 18,
        "english": "How many triangles are there in the figure below?",
        "translation": "Hình dưới đây có bao nhiêu hình tam giác?",
        "options": [
          "5",
          "8",
          "10",
          "12"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q18.8bfe4837b58e.svg",
        "imageAlt": "Ngôi sao năm cánh bằng năm đoạn thẳng giao nhau, theo hình câu 18"
      },
      {
        "number": 19,
        "english": "Daniel draws 6 lines on a sheet of paper. At most how many squares can be formed by Daniel?",
        "translation": "Daniel vẽ 6 đường thẳng trên một tờ giấy. Hỏi anh ấy có thể tạo ra nhiều nhất bao nhiêu hình vuông?",
        "options": [
          "1",
          "4",
          "5",
          "6"
        ]
      },
      {
        "number": 20,
        "english": "According to the pattern shown below, how many circles are there in the first 20 figures?",
        "translation": "Dựa vào quy luật dưới đây, có bao nhiêu hình tròn trong 20 hình đầu tiên?",
        "options": [
          "6",
          "8",
          "10",
          "12"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q20.a083162e756e.svg",
        "imageAlt": "Dãy hai hình vuông rỗng, tam giác đặc và hai hình tròn rỗng lặp lại như ảnh",
        "subtopic": "Quy luật dãy hình"
      },
      {
        "number": 21,
        "english": "Separate the following stars into 3 equal groups. How many stars are there in the first 2 groups?",
        "translation": "Chia các hình ngôi sao dưới đây thành 3 nhóm bằng nhau. Hỏi có bao nhiêu hình ngôi sao trong 2 nhóm đầu tiên?",
        "options": [
          "3",
          "4",
          "6",
          "9"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q21.f6ad08bcff92.svg",
        "imageAlt": "Chín ngôi sao đen xếp thành một hàng như ảnh"
      },
      {
        "number": 22,
        "english": "Arrange these numbers in descending order to find the 4th largest number.",
        "translation": "Sắp xếp các số sau từ lớn đến bé để tìm số lớn thứ tư.",
        "options": [
          "39",
          "50",
          "46",
          "73"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-05/q22.25fcba59a751.svg",
        "imageAlt": "Các số 23, 91, 73, 39, 46, 82, 50",
        "subtopic": "Sắp xếp số và xác định thứ hạng"
      },
      {
        "number": 23,
        "english": "Tom chooses 2 different digits from 1, 4 and 7 to form 2-digit numbers. Among those numbers, how many odd numbers are there?",
        "translation": "Tom chọn 2 chữ số khác nhau từ 1, 4 và 7 để tạo thành các số có hai chữ số. Hỏi trong số đó có bao nhiêu số lẻ?",
        "options": [
          "3",
          "4",
          "5",
          "6"
        ]
      },
      {
        "number": 24,
        "english": "In how many ways can we distribute 6 identical flowers into 3 different vases given that no vases are empty?",
        "translation": "Hỏi có bao nhiêu cách để cắm 6 bông hoa giống nhau vào 3 lọ hoa khác nhau sao cho lọ nào cũng có hoa?",
        "options": [
          "2",
          "9",
          "10",
          "18"
        ]
      },
      {
        "number": 25,
        "english": "Kesha has 2 different T-shirts and 3 different pants. Each day, she mixes a shirt with a pant to make a set of clothes. At most how many different sets of clothes can she mix?",
        "translation": "Kesha có 2 chiếc áo phông khác nhau và 3 chiếc quần khác nhau. Mỗi ngày, cô bé phối 1 chiếc áo với 1 chiếc quần để có một bộ quần áo. Hỏi cô bé có thể phối nhiều nhất bao nhiêu bộ quần áo khác nhau?",
        "options": [
          "6",
          "3",
          "5",
          "8"
        ],
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?"
      }
    ]
  },
  {
    "id": "timo-grade2-qualifying-06",
    "title": "Đề vòng loại 06",
    "sourceTitle": "ĐỀ SỐ 6 — VÒNG LOẠI TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề vòng loại",
    "questions": [
      {
        "number": 1,
        "english": "If today is Saturday, which day of the week will 4 days later be?",
        "translation": "Nếu hôm nay là thứ Bảy, hỏi 4 ngày sau là thứ mấy trong tuần?",
        "options": [
          "Monday / Thứ Hai",
          "Tuesday / Thứ Ba",
          "Wednesday / Thứ Tư",
          "Thursday / Thứ Năm"
        ],
        "optionColumns": 2,
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 2,
        "english": "According to the pattern shown below, what is the number in the blank?",
        "translation": "Dựa vào quy luật dưới đây, số ở chỗ trống là số nào?",
        "options": [
          "26",
          "24",
          "27",
          "28"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q02.1ab91f310a23.svg",
        "imageAlt": "Dãy 2, 6, 10, 14, 18, 22, chỗ trống",
        "subtopic": "Quy luật dãy số"
      },
      {
        "number": 3,
        "english": "Class 2A has 34 students queuing up in a row. If there are 9 students behind Amy, how many students are in front of Amy?",
        "translation": "Lớp 2A có 34 học sinh xếp thành một hàng. Nếu có 9 học sinh phía sau Amy, hỏi có bao nhiêu học sinh đứng trước Amy?",
        "options": [
          "25",
          "24",
          "23",
          "22"
        ],
        "subtopic": "Bài toán vị trí trong hàng"
      },
      {
        "number": 4,
        "english": "From the pattern shown below, how many ⊗ more than # is / are there in the 15th group?",
        "translation": "Dựa vào quy luật dưới đây, ⊗ nhiều hơn # bao nhiêu hình trong nhóm thứ 15?",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q04.edc601172a6c.svg",
        "imageAlt": "Bốn hình chữ thập tăng dần: các ô chứa ⊗ và # xen kẽ đúng vị trí của ảnh, nhóm đầu có một ô ⊗",
        "subtopic": "Quy luật sắp xếp hình"
      },
      {
        "number": 5,
        "english": "3 years ago, Amy was 14 years old. How old is Amy now?",
        "translation": "3 năm trước, Amy 14 tuổi. Hỏi Amy hiện tại bao nhiêu tuổi?",
        "options": [
          "11",
          "14",
          "13",
          "17"
        ],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 6,
        "english": "Find the value of 7 + 17 + 27 + 37 + 47 + 3 + 3 + 3 + 3 + 3.",
        "translation": "Tìm giá trị của 7 + 17 + 27 + 37 + 47 + 3 + 3 + 3 + 3 + 3.",
        "options": [
          "130",
          "135",
          "140",
          "150"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Find the value of 15 : 3 + 25 : 5 − 30 : 5.",
        "translation": "Tìm giá trị của 15 : 3 + 25 : 5 − 30 : 5.",
        "options": [
          "3",
          "4",
          "5",
          "6"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Find the value of 1 − 2 + 3 − 4 + 5 − 6 + 7 − 8 + 9.",
        "translation": "Tìm giá trị của 1 − 2 + 3 − 4 + 5 − 6 + 7 − 8 + 9.",
        "options": [
          "3",
          "7",
          "5",
          "9"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "What is the number should be filled in the blank if the equation is correct?",
        "translation": "Ta cần điền số nào vào chỗ trống dưới đây để được phép tính đúng?",
        "options": [
          "2",
          "6",
          "72",
          "32"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q09.ce950daff039.svg",
        "imageAlt": "Chỗ trống chia 6 bằng 12",
        "subtopic": "Tìm số bị che trong phép tính"
      },
      {
        "number": 10,
        "english": "Find the value of 10 × 1 + 10 × 2 + 10 × 3 + 10 × 4.",
        "translation": "Tìm giá trị của 10 × 1 + 10 × 2 + 10 × 3 + 10 × 4.",
        "options": [
          "80",
          "90",
          "100",
          "110"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 11,
        "english": "Amy has 23 apples and John has 11 apples. How many apples does John have to ask Amy to give him so that Amy has 2 more apples than John?",
        "translation": "Amy có 23 quả táo và John có 11 quả táo. Hỏi John cần xin Amy đưa cho bạn ấy bao nhiêu quả táo để Amy có nhiều hơn John 2 quả táo?",
        "options": [
          "5",
          "4",
          "3",
          "2"
        ],
        "subtopic": "Chuyển bớt và so sánh số lượng"
      },
      {
        "number": 12,
        "english": "The numbers below follow the arithmetic sequence, what is the 20th number?",
        "translation": "Các số dưới đây là một dãy số cách đều, số thứ 20 là số nào?",
        "options": [
          "138",
          "139",
          "140",
          "141"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q12.f942592e032f.svg",
        "imageAlt": "Dãy 101, 103, 105, 107, 109, …",
        "subtopic": "Tìm số hạng trong dãy số"
      },
      {
        "number": 13,
        "english": "How many 2-digit numbers having the tens digit that is smaller than 3 are there?",
        "translation": "Có bao nhiêu số có 2 chữ số có chữ số hàng chục nhỏ hơn 3?",
        "options": [
          "19",
          "20",
          "21",
          "18"
        ],
        "subtopic": "Đếm số theo điều kiện"
      },
      {
        "number": 14,
        "english": "Fill the lines with ‘+’ and ‘−’ to make the equation below correct.",
        "translation": "Điền vào dòng kẻ với ‘+’ và ‘−’ để tạo thành một phép tính đúng.",
        "options": [
          "1 − 3 − 5 + 7 + 11 = 11",
          "1 + 3 − 5 − 7 + 11 = 11",
          "1 − 3 + 5 − 7 + 11 = 11",
          "1 + 3 + 5 − 7 − 11 = 11"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q14.b61f811fc769.svg",
        "imageAlt": "1, 3, 5, 7, 11 với các chỗ điền dấu, bằng 11",
        "optionColumns": 2,
        "subtopic": "Điền dấu cộng và trừ"
      },
      {
        "number": 15,
        "english": "Determine the result of 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 is odd or even?",
        "translation": "Hãy xác định kết quả của 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 là lẻ hay chẵn.",
        "options": [
          "Odd / Số lẻ",
          "Even / Số chẵn",
          "Both odd and even / Vừa chẵn vừa lẻ",
          "Neither odd not even / Không chẵn, không lẻ"
        ],
        "optionColumns": 2,
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 16,
        "english": "How many squares are there in the figure below?",
        "translation": "Có bao nhiêu hình vuông trong hình dưới đây?",
        "options": [
          "9",
          "10",
          "11",
          "12"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q16.282c03b67a9e.svg",
        "imageAlt": "Hai hàng ô vuông lệch nhau: hàng dưới năm ô, hàng trên bốn ô bắt đầu phía trên ô thứ ba của hàng dưới",
        "subtopic": "Đếm hình vuông"
      },
      {
        "number": 17,
        "english": "How many sides does a circle have?",
        "translation": "Một hình tròn có bao nhiêu cạnh?",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ]
      },
      {
        "number": 18,
        "english": "According to the pattern shown below, what is the figure in the space (“?”) provided?",
        "translation": "Dựa vào quy luật dưới đây, hình điền vào “?” là hình gì?",
        "options": [
          "△",
          "◊",
          "○",
          "□"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q18.0bf6b1fb3e60.svg",
        "imageAlt": "Dãy tam giác, vuông, tròn, hình thoi rỗng và một dấu hỏi đúng vị trí theo ảnh",
        "subtopic": "Quy luật dãy hình"
      },
      {
        "number": 19,
        "english": "At least how many squares can be seen if viewing the figure below from the side?",
        "translation": "Có ít nhất bao nhiêu hình vuông có thể nhìn thấy được nếu nhìn từ phía bên cạnh?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q19.0a0be2b91a13.svg",
        "imageAlt": "Cụm khối trắng viền đen, cột cao phía trước giữa, hai ô phía trước và các khối lùi phía trái, theo ảnh",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 20,
        "english": "At most how many lines can be formed by using 5 points on a plane?",
        "translation": "Có nhiều nhất bao nhiêu đường thẳng được tạo bởi 5 điểm trên một mặt phẳng?",
        "options": [
          "6",
          "8",
          "9",
          "10"
        ]
      },
      {
        "number": 21,
        "english": "A restaurant has 2 types of appetizers, 3 types of main courses and 3 types of desserts. How many ways can a customer order an appetizer, a main course and a dessert?",
        "translation": "Một nhà hàng có 2 món khai vị, 3 món chính và 3 món tráng miệng. Hỏi có bao nhiêu cách một khách hàng gọi 1 món khai vị, 1 món chính và 1 món tráng miệng?",
        "options": [
          "18",
          "6",
          "9",
          "8"
        ],
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?"
      },
      {
        "number": 22,
        "english": "What is the smallest 4-digit number by using 3, 9, 4 and 0 that is divisible by 10? (Each digit can only be used once).",
        "translation": "Số nhỏ nhất có 4 chữ số tạo bởi các chữ số 3, 9, 4 và 0 mà chia hết cho 10 là số nào? (Mỗi chữ số chỉ dùng một lần).",
        "options": [
          "3094",
          "3049",
          "3940",
          "3490"
        ]
      },
      {
        "number": 23,
        "english": "How many odd numbers are there in the first 30 numbers of the sequence?",
        "translation": "Có bao nhiêu số lẻ trong 30 số đầu tiên ở dãy dưới đây?",
        "options": [
          "13",
          "14",
          "15",
          "16"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-06/q23.296150f09baa.svg",
        "imageAlt": "Dãy 2, 5, 8, 11, 14, 17, …"
      },
      {
        "number": 24,
        "english": "Pick 2 from 6 children to take part in mathematics competition. How many different combinations are there?",
        "translation": "Chọn 2 trong 6 đứa trẻ để tham gia một cuộc thi toán. Hỏi có bao nhiêu cách chọn khác nhau?",
        "options": [
          "15",
          "17",
          "18",
          "20"
        ]
      },
      {
        "number": 25,
        "english": "How many numbers contain the digit “0” from 1 to 101?",
        "translation": "Có bao nhiêu số có chứa chữ số 0 từ số 1 đến 101?",
        "options": [
          "8",
          "9",
          "10",
          "11"
        ]
      }
    ]
  },
  {
    "id": "timo-grade2-qualifying-07",
    "title": "Đề vòng loại 07",
    "sourceTitle": "ĐỀ SỐ 7 — VÒNG LOẠI TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề vòng loại",
    "questions": [
      {
        "number": 1,
        "english": "If last month was April, which month will it be 16 months later (from now)?",
        "translation": "Biết tháng trước là tháng 4, hỏi 16 tháng nữa là tháng mấy?",
        "options": [
          "May / Tháng 5",
          "September / Tháng 9",
          "August / Tháng 8",
          "December / Tháng 12"
        ],
        "optionColumns": 2,
        "subtopic": "Các tháng trong năm"
      },
      {
        "number": 2,
        "english": "By observing the pattern, what is the English letter in the space (“__”) provided?",
        "translation": "Quan sát quy luật dưới đây để điền chữ cái Tiếng Anh thích hợp vào chỗ trống (“__”).",
        "options": [
          "E",
          "S",
          "U",
          "Y"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q02.5da736d8f1fb.svg",
        "imageAlt": "Dãy chữ A, Z, B, chỗ trống, C, X, D, W, …",
        "subtopic": "Quy luật dãy số"
      },
      {
        "number": 3,
        "english": "Observe the sequence below to replace the music note with a suitable number.",
        "translation": "Quan sát dãy số dưới đây để thay thế nốt nhạc bằng số thích hợp.",
        "options": [
          "35",
          "39",
          "30",
          "36"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q03.69031f0364cf.svg",
        "imageAlt": "Dãy 50, 49, 47, 44, 40, ký hiệu nốt nhạc, …",
        "subtopic": "Quy luật dãy số"
      },
      {
        "number": 4,
        "english": "Refer to the pattern below, how many arrows are there in the 5th Group?",
        "translation": "Dựa vào quy luật dưới đây, hỏi sẽ có bao nhiêu mũi tên trong nhóm thứ 5?",
        "options": [
          "15",
          "20",
          "21",
          "16"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q04.2013fa3c2140.svg",
        "imageAlt": "Bốn lưới 2×2, 3×3, 4×4, 5×5 với các mũi tên rỗng đúng vị trí trong ảnh",
        "subtopic": "Quy luật sắp xếp hình"
      },
      {
        "number": 5,
        "english": "Each cupcake costs $2. Alice had $23 and she bought 7 cupcakes. How much money did she have left?",
        "translation": "Một cái bánh có giá 2 đô. Alice có 23 đô và cô bé mua 7 cái bánh. Hỏi khi mua cô bé còn lại bao nhiêu tiền?",
        "options": [
          "$14",
          "$9",
          "$21",
          "$8"
        ],
        "subtopic": "Bài toán mua hàng và tiền còn lại"
      },
      {
        "number": 6,
        "english": "Find the value of 28 + 43 + 72 + 29 + 11 + 37.",
        "translation": "Tìm giá trị của 28 + 43 + 72 + 29 + 11 + 37.",
        "options": [
          "220",
          "200",
          "210",
          "230"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Which number should the flower be replaced by to get a correct equation?",
        "translation": "Hỏi cần thay thế bông hoa dưới đây bởi số nào để được phép tính đúng?",
        "options": [
          "23",
          "46",
          "2",
          "40"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q07.b9052bdb3cae.svg",
        "imageAlt": "Bông hoa cộng bông hoa trừ 22 bằng bông hoa cộng 24",
        "subtopic": "Tìm số bị che trong phép tính"
      },
      {
        "number": 8,
        "english": "Find the value of 2 + 4 + 6 + … + 16 + 18.",
        "translation": "Tính giá trị của 2 + 4 + 6 + … + 16 + 18.",
        "options": [
          "100",
          "80",
          "90",
          "180"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "Calculate: 7 × 2 + 11 × 2 + 2 × 3 + 2 × 9.",
        "translation": "Tính: 7 × 2 + 11 × 2 + 2 × 3 + 2 × 9.",
        "options": [
          "60",
          "50",
          "40",
          "70"
        ],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 10,
        "english": "A and B represent different 1-digit numbers. What is the value of B if the equation is correct?",
        "translation": "Biết A và B biểu diễn các số có 1 chữ số khác nhau, hỏi giá trị của B là bao nhiêu để ta được phép tính đúng dưới đây?",
        "options": [
          "5",
          "6",
          "3",
          "4"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q10.e276c823d299.svg",
        "imageAlt": "Phép cộng dọc ABA cộng BB bằng 530",
        "subtopic": "Phép cộng với chữ số chưa biết"
      },
      {
        "number": 11,
        "english": "Determine whether the sum 1 + 2 + 3 + 4 + … + 9 is odd or even.",
        "translation": "Tổng 1 + 2 + 3 + … + 9 là số lẻ hay số chẵn?",
        "options": [
          "Odd / Số lẻ",
          "Even / Số chẵn",
          "Both odd and even / Vừa chẵn vừa lẻ",
          "Neither odd nor even / Không lẻ không chẵn"
        ],
        "optionColumns": 2,
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 12,
        "english": "A box has balls with consecutive even numbers from 10 to 40. How many balls are there in the box?",
        "translation": "Một hộp chứa các quả bóng được đánh số chẵn liên tiếp từ 10 đến 40. Hỏi có bao nhiêu quả bóng trong hộp đó?",
        "options": [
          "15",
          "16",
          "31",
          "40"
        ],
        "subtopic": "Đếm số theo điều kiện"
      },
      {
        "number": 13,
        "english": "Find the next number in the arithmetic sequence below.",
        "translation": "Tìm số tiếp theo trong dãy số cách đều dưới đây.",
        "options": [
          "355",
          "314",
          "335",
          "345"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q13.7e0da0dd124b.svg",
        "imageAlt": "Dãy 419, 398, 377, 356, …",
        "subtopic": "Tìm số hạng trong dãy số"
      },
      {
        "number": 14,
        "english": "Andy gave Betty 27 marbles and Betty gave Charlie 13 marbles so that they have the same number of marbles. How many marbles does Andy have more than Charlie originally?",
        "translation": "Andy cho Betty 27 viên bi và Betty cho Charlie 13 viên bi thì ba bạn có số bi bằng nhau. Hỏi lúc đầu Andy có nhiều hơn Charlie bao nhiêu viên bi?",
        "options": [
          "27",
          "41",
          "14",
          "40"
        ],
        "subtopic": "Chuyển bớt và so sánh số lượng"
      },
      {
        "number": 15,
        "english": "David collected 19 stamps. His brother collected 12 stamps. One page of the collection can contain no more than 9 stamps. At least how many pages are required to present all stamps of 2 brothers?",
        "translation": "David sưu tầm được 19 cái tem. Anh trai David sưu tầm được 12 cái tem. Mỗi trang của bộ sưu tập không chứa được nhiều hơn 9 cái tem. Hỏi cần ít nhất bao nhiêu trang để trưng bày được toàn bộ số tem của hai anh em?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "subtopic": "Chia nhóm theo sức chứa"
      },
      {
        "number": 16,
        "english": "How many squares are there in the figure below?",
        "translation": "Hỏi có bao nhiêu hình vuông trong hình dưới đây?",
        "options": [
          "21",
          "22",
          "16",
          "19"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q16.2ebfeebeded5.svg",
        "imageAlt": "Lưới ô vuông với ba ô trên cùng bên phải, hàng ngang năm ô, khoảng trống ở giữa và ba ô dưới cùng theo ảnh",
        "subtopic": "Đếm hình vuông"
      },
      {
        "number": 17,
        "english": "At least how many unit squares are seen if viewing the figure below from the right?",
        "translation": "Hỏi có thể nhìn thấy ít nhất bao nhiêu hình vuông đơn vị nếu nhìn hình dưới đây từ phía bên phải?",
        "options": [
          "4",
          "3",
          "7",
          "6"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q17.0c2dba61cea4.svg",
        "imageAlt": "Cụm khối trắng xám dạng cầu với hai trụ và hai khối nhô ra hai bên ở chân, nhìn từ bên phải theo ảnh",
        "subtopic": "Quan sát và đếm khối lập phương"
      },
      {
        "number": 18,
        "english": "How many edges does a cube have?",
        "translation": "Hỏi một hình lập phương có bao nhiêu cạnh?",
        "options": [
          "16",
          "12",
          "9",
          "8"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q18.15e837be5343.svg",
        "imageAlt": "Một khối lập phương màu xanh với mặt trên, mặt trước và mặt bên phải"
      },
      {
        "number": 19,
        "english": "How many line segments are there in the figure below?",
        "translation": "Hỏi có bao nhiêu đoạn thẳng trong hình vẽ dưới đây?",
        "options": [
          "18",
          "24",
          "16",
          "28"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q19.8af014d34e9b.svg",
        "imageAlt": "Năm ô vuông dạng dấu cộng, các đỉnh và giao điểm được đánh dấu bằng chấm đen như ảnh",
        "subtopic": "Đếm đoạn thẳng"
      },
      {
        "number": 20,
        "english": "Refer to the figure sequence below. How many triangles are there in the first 23 symbols counting from the left?",
        "translation": "Dựa vào quy luật dưới đây, hỏi có bao nhiêu hình tam giác trong 23 hình đầu tiên tính từ phía bên trái?",
        "options": [
          "9",
          "10",
          "8",
          "6"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q20.4de04fbbfa10.svg",
        "imageAlt": "Dãy ngôi sao đặc, hình tròn rỗng, tam giác chúc xuống rỗng, hình vuông đặc và tam giác chúc xuống rỗng lặp lại như ảnh",
        "subtopic": "Quy luật dãy hình"
      },
      {
        "number": 21,
        "english": "A 4-digit number is formed by choosing 4 numbers without repetition from 0, 1, 3, 7 and 9. What is the difference between the largest and the smallest value?",
        "translation": "Một số có 4 chữ số được tạo ra bằng cách chọn 4 số không lặp lại từ 0, 1, 3, 7 và 9. Tìm hiệu giữa giá trị lớn nhất và giá trị nhỏ nhất có thể chọn được.",
        "options": [
          "9594",
          "8999",
          "8352",
          "8694"
        ]
      },
      {
        "number": 22,
        "english": "The librarian needs to move some books so that 3 shelves below have the same number of books. At least how many books does she have to move?",
        "translation": "Thủ thư cần di chuyển một số sách để cả 3 ngăn sách có số sách bằng nhau. Hỏi cô ấy cần di chuyển ít nhất bao nhiêu quyển sách?",
        "options": [
          "5",
          "6",
          "3",
          "2"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q22.4e6bfa602fcf.svg",
        "imageAlt": "Kệ sách ba ngăn: hàng trên 7 quyển, hàng giữa 8 quyển, hàng dưới 3 quyển theo ảnh"
      },
      {
        "number": 23,
        "english": "Choose 3 digits, can have repetition, from 0, 1, 3, 6 and 9 to form 3-digit even numbers. How many different numbers can be formed?",
        "translation": "Chọn 3 chữ số (có thể được chọn lặp lại) từ 0, 1, 3, 6 và 9 để lập thành các số chẵn có 3 chữ số. Hỏi có thể lập được bao nhiêu số khác nhau như vậy?",
        "options": [
          "40",
          "20",
          "24",
          "30"
        ]
      },
      {
        "number": 24,
        "english": "For every 4 pens, the store gives each customer 2 erasers for free. If Fred buys 15 pens, how many erasers can he get?",
        "translation": "Cứ mua 4 chiếc bút thì khách hàng được tặng 2 cục tẩy miễn phí. Nếu Fred mua 15 chiếc bút thì anh ấy nhận được bao nhiêu cục tẩy?",
        "options": [
          "7",
          "3",
          "8",
          "6"
        ],
        "subtopic": "Mua hàng và quà tặng"
      },
      {
        "number": 25,
        "english": "The 3 × 3 squares below contains 9 consecutive numbers from 1 to 9 in each cell and the sum of numbers in each column or row is equal. Find the number that should be filled in cell A.",
        "translation": "Hình vuông 3 × 3 dưới đây gồm 9 số liên tiếp từ 1 đến 9 được điền vào mỗi ô. Tổng các số ở mỗi hàng và mỗi cột là bằng nhau. Hãy tìm số thích hợp để điền vào ô A.",
        "options": [
          "2",
          "4",
          "6",
          "8"
        ],
        "image": "./assets/papers/timo-grade2-qualifying-07/q25.82d57d1c646a.svg",
        "imageAlt": "Bảng 3×3 với các hàng A, 1, B; 3, C, 7; D, 9, E"
      }
    ]
  }
];
function getPapers(program, subject, grade, mode) {
  if (!getSubjects(program).includes(subject)) return [];
  return officialPapers.filter(paper =>
    paper.program === program && paper.subject === subject &&
    String(paper.grade) === String(grade) && paper.mode === mode &&
    typeof paper.id === 'string' && /^[a-zA-Z0-9_-]+$/.test(paper.id) &&
    typeof paper.title === 'string' && paper.title.trim() &&
    Array.isArray(paper.questions) && paper.questions.length > 0
  );
}
function getQuestions(subject, grade, mode, paper, program = 'TIMO') {
  return getPapers(program, subject, grade, mode)[paper]?.questions || [];
}

// TIMO classification is determined only by the original question number.
const timoTopicGroups = [
  ['Logical thinking', 'Tư duy lô-gic', 1, 5],
  ['Arithmetic', 'Số học', 6, 10],
  ['Number Theory', 'Lý thuyết số', 11, 15],
  ['Geometry', 'Hình học', 16, 20],
  ['Combinatorics', 'Tổ hợp', 21, 25],
].map(([english, vietnamese, first, last], index) => ({
  id: `timo-group-${index + 1}`,
  english, vietnamese, first, last,
  name: `${english} / ${vietnamese}`,
  topics: [{ id: `timo-group-${index + 1}-unclassified`, name: 'Chưa phân loại', entries: [] }],
}));
function timoQuestionNumber(question, index) {
  return question.number === undefined ? index + 1 : Number(question.number);
}
function getTimoPaperIssues(paper) {
  const issues = [];
  if (!Array.isArray(paper.questions) || paper.questions.length !== 25) {
    issues.push('Bộ đề TIMO cần đủ 25 câu hỏi.');
  }
  const seen = new Set();
  (Array.isArray(paper.questions) ? paper.questions : []).forEach((question, index) => {
    const number = question && timoQuestionNumber(question, index);
    if (!Number.isInteger(number) || number < 1 || number > 25) {
      issues.push(`Vị trí ${index + 1}: số câu phải từ 1 đến 25.`);
    } else if (seen.has(number)) {
      issues.push(`Trùng câu ${number}.`);
    } else seen.add(number);
  });
  const missing = Array.from({ length: 25 }, (_, index) => index + 1).filter(number => !seen.has(number));
  if (missing.length) issues.push(`Thiếu câu ${missing.join(', ')}.`);
  return issues;
}
function buildTimoTopicGroups(papers, grade) {
  const groups = timoTopicGroups.map(group => ({ ...group, topics: group.topics.map(topic => ({ ...topic, entries: [] })) }));
  for (const paper of papers) {
    if (paper.program !== 'TIMO' || paper.subject !== 'Toán' || String(paper.grade) !== String(grade) ||
        ![modes[0], modes[1]].includes(paper.mode) || getTimoPaperIssues(paper).length) continue;
    // Sort a new list, leaving the original paper, question text and answer fields untouched.
    const numbered = paper.questions.map((question, index) => ({ question, number: timoQuestionNumber(question, index) })).sort((a, b) => a.number - b.number);
    for (const { question, number } of numbered) {
      const group = groups.find(group => number >= group.first && number <= group.last);
      const name = typeof question.subtopic === 'string' && question.subtopic.trim() ? question.subtopic.trim() : 'Chưa phân loại';
      let topic = group.topics.find(topic => topic.name === name);
      if (!topic) {
        // Keep the existing topic ID so saved attempts, question order and reload state survive this label change.
        const stableName = name === 'Có bao nhiêu cách kết hợp khác nhau?' ? 'Phối hợp lựa chọn'
          : name === 'Tìm giá trị' ? 'Cộng nhiều số'
          : name === 'Quan sát và đếm khối lập phương' ? 'Quan sát khối từ phía trước' : name;
        topic = { id: `${group.id}-named-${encodeURIComponent(stableName)}`, name, entries: [] };
        group.topics.push(topic);
      }
      topic.entries.push({ id: `${paper.id}:${number}`, question, number, paperId: paper.id, paperTitle: paper.title, mode: paper.mode });
    }
  }
  return groups;
}
function getTimoTopicGroups(grade) {
  return buildTimoTopicGroups(officialPapers, grade);
}

// Legacy topic references continue in the surviving group after the owner-requested merge.
function resolveTimoTopicId(id) {
  const prefix = `${timoTopicGroups[1].id}-named-`;
  const geometryPrefix = `${timoTopicGroups[3].id}-named-`;
  if (id === geometryPrefix + encodeURIComponent('Đếm khối lập phương xếp chồng'))
    return geometryPrefix + encodeURIComponent('Quan sát khối từ phía trước');
  return id === prefix + encodeURIComponent('Biểu thức cộng trừ liên tiếp')
    ? prefix + encodeURIComponent('Cộng nhiều số') : id;
}
