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
        "image": "./assets/papers/timo-grade2-qualifying-01/q01-sequence.b544b7b56670.svg",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Quy luật: Khoảng cách giữa 2 số liên tiếp trong dãy tăng dần 1 đơn vị.\n2 + 4 = 6, 6 + 5 = 11, 11 + 6 = 17, 17 + 7 = 24, 24 + 8 = 32, 32 + 9 = 41.\nVậy số cần tìm là 24.\nĐáp số: A."
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
        "subtopic": "Thêm và gộp số lượng",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Tony có tất cả số bi là: 17 + 12 = 29 (viên).\nĐáp số: C."
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
        "subtopic": "Tuổi hiện tại và tương lai",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Tuổi của Maria bây giờ là: 13 − 6 = 7 (tuổi).\nĐáp số: D."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q04-hats.8113a2ac14a8.svg",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Số chiếc mũ trong mỗi nhóm lần lượt là: 4, 7, 10, …\nQuy luật: Số chiếc mũ trong mỗi nhóm tăng dần 3 đơn vị.\n4 + 3 = 7, 7 + 3 = 10, …\nSố chiếc mũ trong nhóm 4 là: 10 + 3 = 13 (chiếc).\nSố chiếc mũ trong nhóm 5 là: 13 + 3 = 16 (chiếc).\nĐáp số: C."
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
        "optionColumns": 2,
        "answer": 1,
        "answerSource": "user",
        "explanation": "Hôm qua là thứ Hai nên 1 ngày trước hôm nay là thứ Hai.\n2 ngày trước hôm nay là Chủ nhật. 3 ngày trước hôm nay là thứ Bảy. 4 ngày trước hôm nay là thứ Sáu. 5 ngày trước hôm nay là thứ Năm. 6 ngày trước hôm nay là thứ Tư.\nĐáp số: B."
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
        "subtopic": "Tìm giá trị",
        "answer": 1,
        "answerSource": "user",
        "explanation": "11 + 13 + 5 + 9 = (11 + 9) + (13 + 5) = 20 + 18 = 38.\nĐáp số: B."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q07-bell.a15badb850d7.svg",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta có:\n5 + 🔔 = 29 − 6\n5 + 🔔 = 23\n🔔 = 23 − 5\n🔔 = 18\nVậy số bị giấu sau cái chuông là 18.\nĐáp số: D."
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
        "subtopic": "Tìm giá trị",
        "answer": 2,
        "answerSource": "user",
        "explanation": "14 − 13 + 12 − 11 + 10 − 9 + 8 − 7 + 6\n= (14 − 13) + (12 − 11) + (10 − 9) + (8 − 7) + 6\n= 1 + 1 + 1 + 1 + 6\n= 10.\nĐáp số: C."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q09-operations.485f5fe71c07.svg",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-01/q09.0adcaf43354a.svg",
        "explanationImageAlt": "Sơ đồ lời giải do chủ dự án cung cấp:8,10,17,12 và các phép tính thuận/ngược",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta lần lượt tính theo chiều ngược lại như hình dưới đây.\nVậy số cần tìm là 8.\nĐáp số: D."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q10-column-addition.863e13109f19.svg",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Trường hợp 1: Hàng đơn vị là phép cộng không nhớ.\nXét hàng chục, ta có: A = 5.\nXét hàng đơn vị, ta có: B + A = 2. Do đó, B + 5 = 2. Ta không tìm được số B thỏa mãn.\nTrường hợp 2: Hàng đơn vị là phép cộng có nhớ.\nXét hàng chục, ta có: A + 1 = 5. Do đó, A = 4.\nXét hàng đơn vị, ta có: B + A = 12. Do đó, B + 4 = 12. Ta tìm được B = 8.\nVậy giá trị của B là 8.\nĐáp số: A."
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
        "subtopic": "Số có hai chữ số và tổng chữ số",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Ta có: 13 = 9 + 4 = 8 + 5 = 7 + 6 = 6 + 7 = 5 + 8 = 4 + 9.\nVậy có 6 số thỏa mãn yêu cầu là: 94, 85, 76, 67, 58, 49.\nĐáp số: B."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q12-sequence.b0bff4a309bb.svg",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Quy luật: Các số trong dãy tăng dần 7 đơn vị.\n34 + 7 = 41, 41 + 7 = 48, 48 + 7 = 55, …\nSố thứ 5 trong dãy là: 55 + 7 = 62.\nSố thứ 6 trong dãy là: 62 + 7 = 69.\nĐáp số: D."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q13-expressions.71828f018f2a.svg",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta có: 13 + 6 = 19, 22 − 10 + 7 = 19, 25 − 11 = 14, 8 + 3 = 11, 27 − 4 = 23, 5 + 7 = 12.\nCác số chẵn nhận được là: 14, 12.\nVậy có 2 kết quả là số chẵn.\nĐáp số: C."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q14-signs.7c0e4999dbee.svg",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta có: 3 + 9 − 5 + 1 = 12 − 5 + 1 = 7 + 1 = 8.\nVậy phép tính đúng là: 3 + 9 − 5 + 1 = 8.\nĐáp số: D."
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
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Hai bạn có tất cả số bút chì là: 4 + 16 = 20 (chiếc).\nVì 20 = 10 + 10 nên khi hai bạn có số bút chì bằng nhau thì mỗi bạn có 10 chiếc bút chì.\nVậy Ryan cần cho Martin số bút chì là: 16 − 10 = 6 (chiếc).\nĐáp số: A."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q16-squares.5e4b037701a7.svg",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-01/q16.36862be43e16.svg",
        "explanationImageAlt": "Ba hình đánh số 1 đến9 cho các hình vuông theo lời giải gốc",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Ta có hình vẽ sau.\nVậy hình đã cho có 9 hình vuông.\nĐáp số: A."
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
        ],
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-01/q17.6dda98d40b8d.svg",
        "explanationImageAlt": "Ba nhóm sáu hình, chỗ trống ở vị trí tam giác theo lời giải gốc",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Quy luật: Nhóm 6 hình ★ ◆ ● ★ ▲ ● lặp lại.\nVậy hình cần tìm là ▲.\nĐáp số: D."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q18-front-view.02db79aa7bfb.svg",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-01/q18.3b921a6118de.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 18 do chủ dự án cung cấp",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta có hình vẽ sau.\nVậy có thể nhìn thấy ít nhất 8 hình vuông nhỏ từ phía trước.\nĐáp số: C."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q19-segments.36b55d8b5646.svg",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-01/q19.836f8aab6a78.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 19 do chủ dự án cung cấp",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Ta có hình vẽ sau.\nCó 10 đoạn thẳng đơn là: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.\nCó 2 đoạn thẳng được ghép bởi 2 đoạn thẳng đơn là: (2 + 3), (6 + 7).\nVậy hình đã cho có tất cả số đoạn thẳng là: 10 + 2 = 12 (đoạn thẳng).\nĐáp số: A."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q20-stacked-cubes.d7c889eb0ff3.svg",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-01/q20.b996a3915f8b.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 20 do chủ dự án cung cấp",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta ghi lại số khối lập phương ở mỗi chồng như hình sau.\nVậy Linda cần ít nhất số khối lập phương là: (1 + 1 + 1 + 1 + 1) + (2 + 2) + 3 = 12 (khối).\nĐáp số: C."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q21-numbers.ce85517152d3.svg",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Các số được sắp xếp từ lớn đến bé là: 97, 77, 71, 65, 56, 48, 39, 33, 19.\nVậy số lớn thứ 4 là 65.\nĐáp số: C."
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
        "subtopic": "Lập số chẵn không lặp chữ số",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Các số chẵn có hàng đơn vị là 2 hoặc 6.\nCác số có hàng đơn vị là 2 bao gồm: 12, 52, 62, 72, 92.\nCác số có hàng đơn vị là 6 bao gồm: 16, 26, 56, 76, 96.\nVậy ta có thể tạo được 10 số chẵn có 2 chữ số không lặp lại.\nĐáp số: C."
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
        "subtopic": "Lập hai số có tổng nhỏ nhất",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Để tổng nhỏ nhất có thể, ta chọn 2 chữ số nhỏ nhất để làm hàng chục của 2 số.\nDo đó, 2 chữ số ở hàng chục là 3 và 5. Lúc này, 2 chữ số ở hàng đơn vị là 8 và 6.\nTổng nhỏ nhất có thể là: 38 + 56 = 58 + 36 = 94.\nĐáp số: A."
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
        "image": "./assets/papers/timo-grade2-qualifying-01/q24-food-choices.cfeb3560b255.svg",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-01/q24.b4d382479b80.svg",
        "explanationImageAlt": "Chín cách kết hợp thịt bò,gà,lợn với khoai tây,cà chua,bắp cải như lời giải",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Philip có các cách chọn nguyên liệu như dưới đây.\nVậy Philip có 9 cách chọn nguyên liệu.\nĐáp số: B."
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
        "subtopic": "Mua hàng và quà tặng",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Mỗi lần mua 3 quyển sách, Bruce cần trả số tiền là: 4 + 4 + 4 = 12 (đô).\nTa có: 80 = 12 + 12 + 12 + 12 + 12 + 12 + 8 = 12 × 6 + 8.\nDo đó, Bruce có thể mua được nhiều nhất 6 lần như vậy và được tặng 6 chiếc bút.\nĐáp số: D."
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
        "subtopic": "Quy luật dãy số",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Quy luật: Khoảng cách giữa 2 số liên tiếp trong dãy tăng dần 2 đơn vị.\n1 + 3 = 4, 4 + 5 = 9, 9 + 7 = 16, 16 + 9 = 25, 25 + 11 = 36, 36 + 13 = 49.\nVậy số cần tìm là 25.\nĐáp số: B."
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
        "subtopic": "Thêm và gộp số lượng",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Câu lạc bộ có tất cả số thành viên là: 11 + 15 = 26 (thành viên).\nĐáp số: C."
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
        "subtopic": "Tuổi hiện tại và tương lai",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Tuổi của Karik bây giờ là: 8 + 7 = 15 (tuổi).\nĐáp số: D."
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
        "subtopic": "Quy luật sắp xếp hình",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-02/q04.d1b61063f186.svg",
        "explanationImageAlt": "Nhóm tiếp theo có16 bông hoa trên lưới6x6 như lời giải",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta có nhóm tiếp theo như dưới đây.\nVậy nhóm tiếp theo có 16 hình bông hoa.\nĐáp số: C."
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
        "subtopic": "Các ngày trong tuần",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Ngày mai là thứ Bảy nên hôm nay là thứ Sáu.\n1 ngày trước hôm nay là thứ Năm. 2 ngày trước hôm nay là thứ Tư. 3 ngày trước hôm nay là thứ Ba. 4 ngày trước hôm nay là thứ Hai. 5 ngày trước hôm nay là Chủ nhật.\nĐáp số: A."
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
        "subtopic": "Tìm giá trị",
        "answer": 3,
        "answerSource": "user",
        "explanation": "5 + 14 + 7 + 16 = (14 + 16) + (5 + 7) = 30 + 12 = 42.\nĐáp số: D."
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
        "subtopic": "Tìm số bị che trong phép tính",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta có:\n🌳 − 12 = 9 + 20\n🌳 − 12 = 29\n🌳 = 29 + 12\n🌳 = 41\nVậy số bị giấu sau cái cây là 41.\nĐáp số: C."
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
        "subtopic": "Tìm giá trị",
        "answer": 0,
        "answerSource": "user",
        "explanation": "15 − 14 + 13 − 12 + 11 − 10 + 9 − 8 + 7 − 6 + 5\n= (15 − 14) + (13 − 12) + (11 − 10) + (9 − 8) + (7 − 6) + 5\n= 1 + 1 + 1 + 1 + 1 + 5\n= 10.\nĐáp số: A."
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
        "subtopic": "Sơ đồ chuỗi phép tính",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-02/q09.2e71f1c0d3ca.svg",
        "explanationImageAlt": "Các giá trị22,15,10,32 và phép tính thuận/ngược theo lời giải",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta lần lượt tính theo chiều ngược lại như hình dưới đây.\nVậy số cần tìm là 22.\nĐáp số: C."
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
        "subtopic": "Phép cộng với chữ số chưa biết",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Trường hợp 1: Hàng đơn vị là phép cộng không nhớ.\nXét hàng đơn vị, ta có: B + B = 8. Do đó, B = 4.\nXét hàng chục, ta có: A = 4 (không thỏa mãn A khác B).\nTrường hợp 2: Hàng đơn vị là phép cộng có nhớ.\nXét hàng đơn vị, ta có: B + B = 18. Do đó, B = 9.\nXét hàng chục, ta có: A + 1 = 4. Do đó, A = 3 (thỏa mãn A khác B).\nVậy B = 9.\nĐáp số: D."
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
        "subtopic": "Số có hai chữ số và tổng chữ số",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Ta có: 14 = 9 + 5 = 8 + 6 = 7 + 7 = 6 + 8 = 5 + 9.\nCác số có 2 chữ số mà tổng 2 chữ số bằng 14 là: 95, 86, 77, 68, 59.\nTrong đó, các số lẻ có 2 chữ số với tổng 2 chữ số bằng 14 là: 95, 77, 59.\nVậy có 3 số thỏa mãn đề bài.\nĐáp số: A."
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
        "subtopic": "Tìm số hạng trong dãy số",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Quy luật: Các số trong dãy giảm dần 9 đơn vị.\n77 − 9 = 68, 68 − 9 = 59, 59 − 9 = 50, …\nSố thứ 5 của dãy là: 50 − 9 = 41.\nSố thứ 6 của dãy là: 41 − 9 = 32.\nĐáp số: A."
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
        "subtopic": "Nhận biết kết quả chẵn",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Ta có: 7 + 4 = 11, 18 − 6 = 12, 14 + 23 = 37, 25 − 12 = 13, 21 − 2 − 9 = 10.\nCác kết quả là số lẻ bao gồm: 11, 37, 13.\nVậy có 3 kết quả là số lẻ.\nĐáp số: B."
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
        "subtopic": "Điền dấu cộng và trừ",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta có: 1 + 8 − 3 + 7 = 9 − 3 + 7 = 6 + 7 = 13.\nVậy phép tính đúng là: 1 + 8 − 3 + 7 = 13.\nĐáp số: C."
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
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Hai bạn có tất cả số bi là: 10 + 20 = 30 (viên).\nNhận thấy: 30 = 15 + 15. Do đó, khi hai bạn có số bi bằng nhau thì mỗi bạn có 15 viên bi.\nLúc đầu, Ben có 20 viên bi. Sau khi cho Ken, Ben còn lại 15 viên bi.\nVậy Ben phải cho Ken số bi là: 20 − 15 = 5 (viên).\nĐáp số: A."
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
        "subtopic": "Đếm hình vuông",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-02/q16.5ca46fd3ba83.svg",
        "explanationImageAlt": "Năm hình đánh dấu các hình vuông1 đến13 theo lời giải gốc",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta đếm số hình vuông như hình vẽ sau.\nVậy hình đã cho có 13 hình vuông.\nĐáp số: D."
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
        "subtopic": "Quy luật dãy hình",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-02/q17.f1f576f3cccb.svg",
        "explanationImageAlt": "Nhóm5 hình trái tim,nhiều tia,tam giác,sao,tròn lặp lại theo lời giải",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Quy luật: Nhóm 5 hình ♥ ✹ ▲ ★ ● lặp lại.\nVậy hình cần tìm là hình nhiều tia ✹.\nĐáp số: A."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-02/q18.bf5abcfbedab.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 18 do chủ dự án cung cấp",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Ta có hình vẽ sau.\nVậy ta có thể nhìn thấy 9 hình vuông nhỏ từ phía trước.\nĐáp số: B."
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
        "subtopic": "Đếm đoạn thẳng",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-02/q19.fd8cfc87644d.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 19 do chủ dự án cung cấp",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Ta đánh số các đoạn thẳng như hình dưới đây.\nCó 8 đoạn thẳng đơn là: 1, 2, 3, 4, 5, 6, 7, 8.\nCó 2 đoạn thẳng được ghép bởi 2 đoạn thẳng đơn là: (1 + 2), (2 + 3).\nCó 1 đoạn thẳng được ghép bởi 3 đoạn thẳng đơn là: (1 + 2 + 3).\nVậy hình đã cho có tất cả số đoạn thẳng là: 8 + 2 + 1 = 11 (đoạn thẳng).\nĐáp số: B."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-02/q20.29b6edc81f2f.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 20 do chủ dự án cung cấp",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta ghi lại số khối lập phương ở mỗi chồng như dưới đây.\nVậy Camila cần ít nhất số khối lập phương là: (1 + 1 + 1 + 1) + (2 + 2 + 2 + 2) = 12 (khối).\nĐáp số: C."
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
        "subtopic": "Sắp xếp số và xác định thứ hạng",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Các số được sắp xếp từ bé đến lớn là: 17, 24, 33, 39, 47, 62, 75, 80, 98.\nVậy số bé thứ 5 là 47.\nĐáp số: C."
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
        ],
        "subtopic": "Lập số lẻ không lặp chữ số",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Các số lẻ có hàng đơn vị là 1, 3 hoặc 7.\nCác số lẻ có hàng đơn vị là 1 bao gồm: 31, 71, 41.\nCác số lẻ có hàng đơn vị là 3 bao gồm: 13, 73, 43.\nCác số lẻ có hàng đơn vị là 7 bao gồm: 17, 37, 47.\nVậy ta có thể tạo được 9 số lẻ có 2 chữ số.\nĐáp số: B."
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
        ],
        "subtopic": "Lập hai số có tổng lớn nhất",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Để tổng lớn nhất có thể, ta chọn 2 chữ số lớn nhất để làm hàng chục của 2 số.\nDo đó, 2 chữ số ở hàng chục là 5 và 4. Lúc này, 2 chữ số ở hàng đơn vị là 1 và 3.\nTổng lớn nhất có thể là: 51 + 43 = 53 + 41 = 94.\nĐáp số: A."
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
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Có 3 cách đi từ trường đến trạm xe buýt.\nCó 2 cách đi từ trạm xe buýt về nhà.\nSố cách đi từ trường về nhà là: 3 × 2 = 6 (cách).\nVậy có 6 con đường đi từ trường về nhà.\nĐáp số: C."
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
        "subtopic": "Mua hàng và quà tặng",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Mỗi lần mua 3 con búp bê, Lily cần trả số tiền là: 5 + 5 + 5 = 15 (đô).\nTa có: 70 = 15 + 15 + 15 + 15 + 10 = 15 × 4 + 10.\nDo đó, Lily có thể mua nhiều nhất 4 lần như vậy và được tặng 4 chiếc túi.\nĐáp số: C."
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
        "subtopic": "Quy luật dãy số",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Quy luật: Khoảng cách giữa 2 số liên tiếp trong dãy tăng dần 1 đơn vị.\n2 + 3 = 5; 5 + 4 = 9; 9 + 5 = 14; 14 + 6 = 20; …\nSố cần tìm là: 20 + 7 = 27.\nĐáp số: B."
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
        "subtopic": "Thêm và gộp số lượng",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Lớp của Jennie có tổng số học sinh là: 15 + 12 = 27 (học sinh).\nVậy Jennie có 26 người bạn cùng lớp (không tính Jennie).\nĐáp số: C."
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
        "subtopic": "Tuổi hiện tại và tương lai",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Tuổi của Linda bây giờ là: 15 − 6 = 9 (tuổi).\nĐáp số: D."
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
        "subtopic": "Quy luật sắp xếp hình",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Cách 1: Quy luật: Số hình mặt trời trong nhóm thứ n là 2 × n + 2.\nNhóm 1: có 2 × 1 + 2 = 4 hình mặt trời.\nNhóm 2: có 2 × 2 + 2 = 6 hình mặt trời.\nNhóm 3: có 2 × 3 + 2 = 8 hình mặt trời.\nNhóm 4: có 2 × 4 + 2 = 10 hình mặt trời.\n…\nVậy nhóm 10 có 2 × 10 + 2 = 22 hình mặt trời.\nCách 2: Số hình mặt trời trong các nhóm lần lượt là: 4, 6, 8, 10, …\nQuy luật: Các số trong dãy tăng dần 2 đơn vị.\nTa liệt kê và tìm được số thứ 10 trong dãy là 22.\nĐáp số: B."
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
        "subtopic": "Các ngày trong tuần",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ngày hôm kia là thứ Hai nên hôm qua là thứ Ba. Hôm nay là thứ Tư.\n1 ngày nữa là thứ Năm. 2 ngày nữa là thứ Sáu. 3 ngày nữa là thứ Bảy.\nVậy 4 ngày nữa là Chủ nhật.\nĐáp số: D."
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
        "subtopic": "Tìm giá trị",
        "answer": 1,
        "answerSource": "user",
        "explanation": "12 + 6 + 7 + 13 = (12 + 6) + (7 + 13) = 18 + 20 = 38.\nĐáp số: B."
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
        "subtopic": "Tìm số bị che trong phép tính",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta có:\n11 + 🎒 = 36 − 12\n11 + 🎒 = 24\n🎒 = 24 − 11\n🎒 = 13.\nĐáp số: C."
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
        "subtopic": "Tìm giá trị",
        "answer": 1,
        "answerSource": "user",
        "explanation": "10 − 9 + 8 − 7 + 6 − 5 + 4 − 3 + 2 − 1\n= (10 − 9) + (8 − 7) + (6 − 5) + (4 − 3) + (2 − 1)\n= 1 + 1 + 1 + 1 + 1 = 5.\nĐáp số: B."
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
        "subtopic": "Sơ đồ chuỗi phép tính",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-03/q09.fbca843bd87c.svg",
        "explanationImageAlt": "Sơ đồ?,A,B,23 cùng các phép tính−10,+7,+6 theo lời giải",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta có sơ đồ sau.\nVì B + 6 = 23 nên B = 23 − 6 = 17.\nVì A + 7 = B nên A = B − 7 = 17 − 7 = 10.\nVì ? − 10 = A nên ? = A + 10 = 10 + 10 = 20.\nVậy số cần tìm là 20.\nĐáp số: D."
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
        "subtopic": "Phép cộng với chữ số chưa biết",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Trường hợp 1: Phép cộng ở hàng đơn vị là phép cộng không nhớ.\nKhi đó, B + B = 4. Suy ra, B = 2.\nAB + B = 24 nên AB = 24 − B = 24 − 2 = 22, suy ra A = 2 (loại vì A = B = 2).\nTrường hợp 2: Phép cộng ở hàng đơn vị là phép cộng có nhớ 1.\nKhi đó, B + B = 14. Suy ra, B = 7.\nAB + B = 24 nên AB = 24 − B = 24 − 7 = 14, suy ra A = 1 (thỏa mãn A khác B).\nVậy B = 7.\nĐáp số: A."
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
        "subtopic": "Số có hai chữ số và tổng chữ số",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Các số thỏa mãn yêu cầu là: 39, 48, 57, 66, 75, 84, 93.\nVậy có 7 số thỏa mãn yêu cầu.\nĐáp số: D."
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
        "subtopic": "Tìm số hạng trong dãy số",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Quy luật: Các số trong dãy giảm dần 12 đơn vị.\n98 − 12 = 86; 86 − 12 = 74; 74 − 12 = 62; …\nSố thứ 5 của dãy là: 62 − 12 = 50.\nSố thứ 6 của dãy là: 50 − 12 = 38.\nĐáp số: B."
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
        "subtopic": "Nhận biết kết quả chẵn",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Ta có: 12 − 3 = 9; 7 + 5 = 12; 11 − 3 + 2 = 10; 111 + 1 = 112; 20 − 17 = 3.\nTrong các kết quả ở trên, có 3 kết quả là số chẵn (là 12, 10 và 112).\nĐáp số: A."
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
        "subtopic": "Điền dấu cộng và trừ",
        "answer": 2,
        "answerSource": "user",
        "explanation": "4 + 5 + 3 + 6 = 9 + 3 + 6 = 12 + 6 = 18 (loại).\n4 + 5 − 3 − 6 = 9 − 3 − 6 = 6 − 6 = 0 (loại).\n4 + 5 − 3 + 6 = 9 − 3 + 6 = 6 + 6 = 12 (thỏa mãn).\n4 + 5 + 3 − 6 = 9 + 3 − 6 = 12 − 6 = 6 (loại).\nVậy phép tính đúng là: 4 + 5 − 3 + 6 = 12.\nĐáp số: C."
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
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Tổng số bóng bay của hai bạn là: 20 + 60 = 80 (quả).\nKhi hai bạn có số bóng bay bằng nhau thì mỗi bạn có 80 : 2 = 40 (quả).\nVậy Jack cần cho John số bóng bay là: 60 − 40 = 20 (quả).\nĐáp số: A."
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
        "subtopic": "Đếm hình vuông",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-03/q16.e20b992dc6f3.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 16 do chủ dự án cung cấp",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta đánh số các mảnh ghép như dưới đây.\nCác hình vuông tạo bởi 1 mảnh ghép là: 2, 3, 4, 5 ⇒ 4 hình vuông.\nCác hình vuông tạo bởi 2 mảnh ghép là: (5, 6) ⇒ 1 hình vuông.\nCác hình vuông tạo bởi 4 mảnh ghép là: (2, 3, 4, 5) ⇒ 1 hình vuông.\nCác hình vuông tạo bởi 5 mảnh ghép là: (1, 2, 3, 4, 5) ⇒ 1 hình vuông.\nVậy trong hình đã cho có tất cả 4 + 1 + 1 + 1 = 7 hình vuông.\nĐáp số: D."
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
        "subtopic": "Quy luật dãy hình",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-03/q17.0499b762d686.svg",
        "explanationImageAlt": "Nhóm5 hình lặp lại và chỗ trống như lời giải gốc",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Quy luật: Nhóm gồm 5 hình (● ● △ ◆ △) lặp lại.\nVậy hình cần tìm là ●.\nĐáp số: A."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-03/q18.8b1cb3d4bc98.svg",
        "explanationImageAlt": "Hình lời giải đánh số1 đến7 và mũi tên tới các mặt khuất theo ảnh gốc",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta đánh số các hình vuông thấy được khi nhìn hình đã cho từ bên phải như dưới đây.\nVậy có thể thấy được ít nhất 7 hình vuông khi nhìn hình đã cho từ bên phải.\nĐáp số: C."
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
        "subtopic": "Đếm đoạn thẳng",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-03/q19.509dc5f98518.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 19 do chủ dự án cung cấp",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Ta đánh số các đoạn thẳng như hình dưới đây.\nNgoài ra, có 2 đoạn thẳng ghép bởi 2 đoạn thẳng đơn là (5, 6), (6, 7) và 1 đoạn thẳng ghép bởi 3 đoạn thẳng đơn là (5, 6, 7).\nVậy trong hình đã cho có tất cả 11 + 2 + 1 = 14 đoạn thẳng.\nĐáp số: B."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-03/q20.5b8e8c5301de.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 20 do chủ dự án cung cấp",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta đánh số các khối lập phương như hình dưới đây.\nNgoài ra, còn 1 khối lập phương ở ngay bên dưới khối lập phương số 2.\nVậy có ít nhất 8 + 1 = 9 khối lập phương trong hình đã cho.\nĐáp số: D."
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
        "subtopic": "Sắp xếp số và xác định thứ hạng",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Các số được sắp xếp theo thứ tự từ lớn đến bé là: 92, 88, 52, 49, 45, 37, 23, 12.\nVậy số lớn thứ 3 là 52.\nĐáp số: C."
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
        "subtopic": "Lập số chẵn không lặp chữ số",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Cách 1: Vì số cần tìm là số chẵn nên có hàng đơn vị là 2, 4 hoặc 6.\nNếu hàng đơn vị là 2, ta tạo được các số sau: 32, 42, 52, 62 ⇒ 4 số.\nNếu hàng đơn vị là 4, ta tạo được các số sau: 24, 34, 54, 64 ⇒ 4 số.\nNếu hàng đơn vị là 6, ta tạo được các số sau: 26, 36, 46, 56 ⇒ 4 số.\nVậy có tất cả 4 + 4 + 4 = 12 số thỏa mãn yêu cầu.\nCách 2: Có 3 cách chọn chữ số hàng đơn vị (là 2, 4, 6).\nSau đó, có 4 cách chọn chữ số hàng chục từ các chữ số còn lại.\nVậy có tất cả 3 × 4 = 12 số thỏa mãn yêu cầu.\nĐáp số: A."
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
        "subtopic": "Lập hai số có tổng nhỏ nhất",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Để tổng nhỏ nhất thì ta chọn 2 chữ số nhỏ nhất làm hàng chục (là 2 và 3).\nCòn lại 2 chữ số 8 và 5 làm hàng đơn vị.\nKhi đó, ta có hai số 28 và 35 (hoặc 25 và 38).\nTổng nhỏ nhất cần tìm là: 28 + 35 = 25 + 38 = 63.\nĐáp số: C."
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
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Có 4 cách chọn đường đi từ siêu thị đến ga tàu và 2 cách chọn đường đi từ ga tàu đến rạp chiếu phim.\nDo đó, có 4 × 2 = 8 cách đi từ siêu thị đến rạp chiếu phim mà phải đi qua ga tàu.\nĐáp số: A."
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
        "subtopic": "Mua hàng và quà tặng",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Peter có thể mua được nhiều nhất số chiếc bút là: 25 : 5 = 5 (chiếc bút).\nTa có 5 = 2 + 2 + 1 nên có 2 lần Peter được tặng 1 cục tẩy.\nVậy Peter có thể được tặng nhiều nhất là 2 cục tẩy.\nĐáp số: B."
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
        "subtopic": "Thêm và gộp số lượng",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Tổng số cây trong khu vườn là: 15 + 5 = 20 (cái cây).\nĐáp số: A."
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
        "subtopic": "Các ngày trong tuần",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Hôm qua là thứ Sáu. Vậy hôm nay là thứ Bảy.\n1 ngày nữa là Chủ nhật. 2 ngày nữa là thứ Hai. 3 ngày nữa là thứ Ba.\nĐáp số: C."
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
        "subtopic": "Quy luật sắp xếp hình",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-04/q03.eedd114201fc.svg",
        "explanationImageAlt": "Nhóm4 hình vuông,dấu cộng,tam giác,vuông lặp lại theo lời giải",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Quy luật: Nhóm 4 hình (□ ✚ ▲ □) lặp lại.\nVậy hình cần tìm là □.\nĐáp số: A."
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
        "subtopic": "Tuổi hiện tại và tương lai",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Vì khi Lucy sinh ra, mẹ có bé 25 tuổi nên mẹ hơn Lucy 25 tuổi.\nSố tuổi của Lucy hiện tại là: 27 − 25 = 2 (tuổi).\nĐáp số: D."
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
        "subtopic": "Quy luật dãy số",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Quy luật: Tách dãy số đã cho thành 2 dãy nhỏ đan xen nhau.\n+ Dãy thứ nhất: Dãy tăng dần 1 đơn vị: 1, 2, 3, 4, 5, …\n+ Dãy thứ hai: Dãy giảm dần 2 đơn vị: 20, 18, 16, 14, …\nSố cần tìm là số tiếp theo của dãy thứ hai.\nVậy số cần tìm là: 14 − 2 = 12.\nĐáp số: B."
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
        "subtopic": "Tìm giá trị",
        "answer": 3,
        "answerSource": "user",
        "explanation": "3 + 25 + 7 = (3 + 7) + 25 = 10 + 25 = 35.\nĐáp số: D."
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
        "subtopic": "Tìm giá trị",
        "answer": 0,
        "answerSource": "user",
        "explanation": "50 − 45 + 40 − 35 = (50 − 45) + (40 − 35) = 5 + 5 = 10.\nĐáp số: A."
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
        "subtopic": "Tìm số bị che trong phép tính",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Số bị che là: 32 − 21 = 11.\nĐáp số: C."
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
        "subtopic": "Tìm số bị che trong phép tính",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Bông hoa − 10 = 15 + 4\nBông hoa − 10 = 19\nBông hoa = 19 + 10\nBông hoa = 29.\nĐáp số: C."
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
        "subtopic": "Phép cộng với chữ số chưa biết",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Dựa vào phép tính hàng đơn vị, ta thấy đây là phép cộng có nhớ (nhớ 1).\nDựa vào phép tính hàng chục, ta có X + 1 = 3 nên X = 2.\nXX + Y = 30 nên Y = 30 − XX = 30 − 22 = 8 (thỏa mãn).\nĐáp số: B."
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
        "subtopic": "Tìm số hạng trong dãy số",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Quy luật: Các số trong dãy tăng dần 3 đơn vị.\n1 + 3 = 4; 4 + 3 = 7; 7 + 3 = 10; …\nSố thứ 5 của dãy là: 10 + 3 = 13.\nSố thứ 6 của dãy là: 13 + 3 = 16.\nĐáp số: D."
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
        "subtopic": "Nhận biết kết quả chẵn",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Số lẻ lớn nhất có 2 chữ số là 99.\nĐáp số: A."
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
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Tổng số học sinh của 2 lớp là: 22 + 28 = 50 (học sinh).\nTa có: 50 = 25 + 25.\nDo đó, khi 2 lớp có số học sinh bằng nhau, mỗi lớp có 25 học sinh.\nVậy số học sinh cần chuyển từ lớp 2B sang lớp 2A để 2 lớp có số học sinh bằng nhau là: 28 − 25 = 3 (học sinh).\nĐáp số: A."
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
        "subtopic": "Nhận biết kết quả chẵn",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Các số chẵn lớn hơn 20 là: 22, 52, 70, 54.\nVậy có 4 số chẵn thỏa mãn đề bài.\nĐáp số: B."
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
        "subtopic": "Điền dấu cộng và trừ",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta có: 5 + 3 + 2 − 4 = 8 + 2 − 4 = 10 − 4 = 6.\nĐáp số: D."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-04/q16.19378a1c6ea5.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 16 do chủ dự án cung cấp",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta đánh số các khối lập phương như dưới đây.\nVậy cần ít nhất là 8 khối lập phương.\nĐáp số: C."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-04/q17.671d12d4a7af.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 17 do chủ dự án cung cấp",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Ta đánh số các hình vuông thấy được khi nhìn hình đã cho từ bên phải như dưới đây.\nVậy có thể thấy được ít nhất 7 hình vuông khi nhìn hình đã cho từ bên phải.\nĐáp số: B."
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
        "subtopic": "Đếm hình vuông",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-04/q18.4460fd75a588.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 18 do chủ dự án cung cấp",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta đánh số các hình vuông như dưới đây.\nHình vuông đơn vị: có 14 hình là 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 và 14.\nHình vuông được ghép bởi 4 hình vuông đơn vị: có 3 hình là (2, 3, 4, 5), (6, 7, 10, 11) và (7, 8, 11, 12).\nVậy có tất cả: 14 + 3 = 17 hình vuông.\nĐáp số: C."
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
        "subtopic": "Đếm đoạn thẳng",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-04/q19.e2d3631d66c9.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 19 do chủ dự án cung cấp",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Ta đánh số các đoạn thẳng như dưới đây.\nĐoạn thẳng đơn: có 7 đoạn là 1, 2, 3, 4, 5, 6 và 7.\nĐoạn thẳng được ghép bởi 2 đoạn thẳng đơn: có 4 đoạn là (1, 2), (3, 4), (5, 6) và (6, 7).\nĐoạn thẳng được ghép bởi 3 đoạn thẳng đơn: có 1 đoạn là (5, 6, 7).\nVậy có tất cả: 7 + 4 + 1 = 12 (đoạn thẳng).\nĐáp số: A."
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
        "subtopic": "Quy luật dãy hình",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-04/q20.1a92b357d2f5.svg",
        "explanationImageAlt": "Mười hình đầu tiên theo lời giải:nhóm3 mũi tên phải,lên,phải",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Quy luật: Nhóm 3 hình (⇨ ⇧ ⇨) lặp lại.\nLiệt kê tiếp đến hình thứ 10, ta được dãy hình như sau.\nTrong dãy hình trên, có 7 mũi tên chỉ sang phải.\nĐáp số: D."
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
        "imageAlt": "Mười hai miếng bánh xếp thành hai hàng, mỗi hàng sáu miếng như ảnh",
        "subtopic": "Chia đều và cân bằng các nhóm",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-04/q21.d0793d2a4a02.svg",
        "explanationImageAlt": "Mười hai miếng bánh được chia thành4 hộp,mỗi hộp3 miếng theo lời giải",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta có cách chia đều số bánh vào 4 hộp như sau.\nVậy 1 hộp có 3 miếng bánh.\nĐáp số: D."
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
        "subtopic": "Sắp xếp số và xác định thứ hạng",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Các số được sắp xếp theo thứ tự từ bé đến lớn như sau: 11, 16, 22, 27, 34, 45, 67, 73.\nSố bé thứ ba là 22.\nĐáp số: C."
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
        "subtopic": "Lập số chẵn không lặp chữ số",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Số cần lập là số chẵn nên chữ số hàng đơn vị là 0, 2 hoặc 4.\n+ Nếu chữ số hàng đơn vị là 0, ta lập được các số: 10, 20, 40. Có 3 số.\n+ Nếu chữ số hàng đơn vị là 2, ta lập được các số: 12, 42. Có 2 số.\n+ Nếu chữ số hàng đơn vị là 4, ta lập được các số: 14, 24. Có 2 số.\nVậy có 3 + 2 + 2 = 7 số thỏa mãn đề bài.\nĐáp số: A."
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
        ],
        "subtopic": "Chọn cặp không phân biệt thứ tự",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-04/q24.97ae463811ce.svg",
        "explanationImageAlt": "Bốn bước ghép cặp Amy,Ben,Cindy,Dan,Erik theo lời giải,không lặp cặp",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Cách 1:\nChọn bạn thứ nhất chơi ván cờ: có 5 cách.\nChọn bạn thứ hai chơi ván cờ: có 4 cách.\nVậy số cách chọn ra 2 bạn là: 5 × 4 = 20 cách.\nTuy nhiên các cặp được chọn như trên sẽ được tính 2 lần nên số cách khác nhau để chọn ra 2 bạn trong số 5 bạn là: 20 : 2 = 10 (cách).\nCách 2: Ta có sơ đồ sau.\nGiả sử chọn bạn thứ nhất là Amy. Amy sẽ chơi 4 ván với 4 bạn còn lại.\nTiếp theo chọn bạn thứ nhất là Ben. Ben sẽ chơi 3 ván cờ với 3 bạn còn lại (trừ Amy).\nTiếp theo chọn bạn thứ nhất là Cindy. Cindy sẽ chơi 2 ván cờ với 2 bạn còn lại (trừ Amy và Ben).\nTiếp theo chọn bạn thứ nhất là Dan. Dan sẽ chơi 1 ván cờ với 1 bạn còn lại (là Erik).\nVậy có tất cả 4 + 3 + 2 + 1 = 10 ván cờ.\nĐáp số: B."
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
        ],
        "subtopic": "Lập hai số có tổng lớn nhất",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Muốn tổng lớn nhất thì hai số hạng phải lớn nhất có thể.\nTa sẽ chọn 2 chữ số lớn nhất có thể để làm các chữ số hàng chục (là 6 và 7).\nChọn 2 chữ số còn lại làm hàng đơn vị (là 1, 4).\nKhi đó, ta có 2 số là 61 và 74 (hoặc 64 và 71).\nTổng cần tìm là: 61 + 74 = 64 + 71 = 135.\nĐáp số: B."
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
        "subtopic": "Thêm và gộp số lượng",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Lớp của Michael có số học sinh là: 5 + 6 = 11 (bạn).\nVì không tính Michael nên số bạn cùng lớp của Michael là: 11 − 1 = 10 (bạn).\nĐáp số: B."
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
        "subtopic": "Các ngày trong tuần",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Sau 7 ngày (tức là 1 tuần) thì thứ trong tuần lặp lại.\nHôm nay là thứ Tư (ngày 1 tháng 3) thì 1 tuần sau (ngày 8 tháng 3) cũng là thứ Tư.\nVậy ngày 9 tháng 3 là thứ Năm.\nĐáp số: D."
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
        "subtopic": "Quy luật sắp xếp hình",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Quy luật: nhóm 4 hình (△ ✱ ○ □) lặp lại.\nVì 15 = 4 + 4 + 4 + 3 nên trong 15 hình đầu có 3 nhóm hình (△ ✱ ○ □) và thừa ra 3 hình lần lượt là (△ ✱ ○). Hình thứ 15 là hình cuối cùng thừa ra và là ○.\nĐáp số: A."
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
        "subtopic": "Tuổi hiện tại và tương lai",
        "answer": 1,
        "answerSource": "user",
        "explanation": "3 năm trước, Dan 6 tuổi nên hiện tại số tuổi của Dan là: 6 + 3 = 9 (tuổi).\n2 năm nữa số tuổi của Dan là: 9 + 2 = 11 (tuổi).\nĐáp số: B."
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
        "subtopic": "Quy luật dãy số",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Quy luật: Tách dãy đã cho thành 2 dãy nhỏ đan xen nhau.\nDãy thứ nhất: 50, 45, 40, 35, …\nDãy thứ hai: 3, 6, 9, 12, …\nSố cần tìm là số tiếp theo của dãy thứ nhất.\nQuy luật của dãy thứ nhất: Các số trong dãy giảm dần 5 đơn vị.\n50 − 5 = 45; 45 − 5 = 40; 40 − 5 = 35; …\nSố cần tìm là: 35 − 5 = 30.\nĐáp số: D."
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
        "subtopic": "Tìm giá trị",
        "answer": 3,
        "answerSource": "user",
        "explanation": "5 + 6 + 7 + 8 + 9 + 10 = (5 + 10) + (6 + 9) + (7 + 8) = 15 + 15 + 15 = 45.\nĐáp số: D."
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
        "subtopic": "Tìm giá trị",
        "answer": 2,
        "answerSource": "user",
        "explanation": "13 − 11 + 9 − 7 + 5 − 3 + 1 = (13 − 11) + (9 − 7) + (5 − 3) + 1 = 2 + 2 + 2 + 1 = 7.\nĐáp số: C."
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
        "subtopic": "Tìm số bị che trong phép tính",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-05/q08.29cbe51ce9bf.svg",
        "explanationImageAlt": "Sơ đồ lời giải15 cộng38 bằng53,trừ42 bằng11 và phép tính ngược",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Số lẻ nhỏ nhất có hai chữ số là 11.\nTa có sơ đồ sau.\nĐáp số: A."
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
        "subtopic": "Phép cộng với chữ số chưa biết",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Xét hàng đơn vị: Y + Y = 8 hoặc Y + Y = 18 (phép cộng có nhớ 1).\n+ Với Y + Y = 8 thì Y = 4, X = 4. Điều này không thỏa mãn X và Y là 2 số khác nhau.\n+ Với Y + Y = 18 thì Y = 9 và X + 1 = 4 nên X = 3 thỏa mãn bài toán.\nĐáp số: C."
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
        "subtopic": "Tìm giá trị",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Quy luật: Tổng 2 số hạng liên tiếp bằng số tiếp theo của dãy.\n1 + 1 = 2; 1 + 2 = 3; 2 + 3 = 5; 3 + 5 = 8; …\nSố thứ bảy của dãy là: 5 + 8 = 13.\nSố thứ tám của dãy là: 8 + 13 = 21.\nTổng của 8 số hạng đầu tiên của dãy là:\n1 + 1 + 2 + 3 + 5 + 8 + 13 + 21\n= (1 + 1 + 8) + (2 + 3 + 5) + 13 + 21\n= 10 + 10 + 13 + 21\n= 54.\nĐáp số: B."
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
        "subtopic": "Tìm số hạng trong dãy số",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Quy luật: các số trong dãy tăng dần 4 đơn vị.\n3 + 4 = 7; 7 + 4 = 11; 11 + 4 = 15; …\nSố thứ 5 của dãy là: 15 + 4 = 19.\nSố thứ 6 của dãy là: 19 + 4 = 23.\nSố thứ 7 của dãy là: 23 + 4 = 27.\nĐáp số: D."
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
        "subtopic": "Đếm số theo điều kiện",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Các số có 2 chữ số thỏa mãn là: 10, 11, 12, 13, …, 23.\nTừ 1 đến 23 có 23 số.\nTừ 1 đến 9 có 9 số.\nVậy từ 10 đến 23 có 23 − 9 = 14 số.\nĐáp số: B."
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
        "subtopic": "Chuyển bớt để hai nhóm bằng nhau",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Tổng số kẹo của 2 bạn là: 40 + 20 = 60 (cái).\nChia đều 60 cái kẹo cho 2 bạn thì mỗi bạn sẽ có 60 : 2 = 30 cái kẹo.\nVậy Cara cần cho Jolie số kẹo là: 40 − 30 = 10 (cái).\nĐáp số: C."
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
        "subtopic": "Nhận biết kết quả chẵn",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Các số lẻ lớn hơn 39 là 93 và 41.\nVậy có 2 số lẻ lớn hơn 39 trong các số đã cho.\nĐáp số: B."
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
        "subtopic": "Tìm số còn thiếu trong đẳng thức",
        "answer": 0,
        "answerSource": "user",
        "explanation": "X + 27 = 19 + 48 − 23\nX + 27 = 44\nX = 44 − 27\nX = 17.\nĐáp số: A."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-05/q16.e881a3bfaae0.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 16 do chủ dự án cung cấp",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Ta đánh số các khối lập phương như dưới đây.\nVậy có ít nhất 8 khối lập phương trong hình đã cho.\nĐáp số: A."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-05/q17.ebd18e7278b8.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 17 do chủ dự án cung cấp",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Ta đánh số các hình vuông thấy được khi nhìn từ trên xuống như dưới đây.\nVậy có thể thấy ít nhất 5 hình vuông khi nhìn hình đã cho từ trên xuống.\nĐáp số: D."
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
        "imageAlt": "Ngôi sao năm cánh bằng năm đoạn thẳng giao nhau, theo hình câu 18",
        "subtopic": "Đếm hình tam giác",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-05/q18.eb4c238d50bd.svg",
        "explanationImageAlt": "Ngôi sao năm cánh đánh số các vùng1 đến6 theo lời giải gốc",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta đánh số các mảnh như dưới đây.\nHình tam giác đơn: 5 hình, là 1, 2, 3, 4, 5.\nHình tam giác tạo bởi 2 tam giác đơn và 1 ngũ giác: 5 hình, là (1, 3, 6), (2, 4, 6), (3, 5, 6), (4, 1, 6) và (5, 2, 6).\nTổng số hình tam giác là: 5 + 5 = 10 (hình).\nĐáp số: C."
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
        ],
        "subtopic": "Tạo hình vuông từ các đường thẳng",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-05/q19.c502bd86aa16.svg",
        "explanationImageAlt": "Bốn hình vuông nhỏ được đánh số1 đến4 và một hình vuông lớn đỏ đánh số5 theo lời giải",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Daniel có thể tạo được nhiều nhất 5 hình vuông như sau.\nĐáp số: C."
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
        "subtopic": "Quy luật dãy hình",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Quy luật: Nhóm 5 hình (□ □ ▲ ○ ○) lặp lại.\n20 hình đầu tiên gồm 20 : 5 = 4 nhóm.\nTrong mỗi nhóm có 2 hình tròn nên trong 4 nhóm có 2 × 4 = 8 hình tròn.\nĐáp số: B."
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
        "imageAlt": "Chín ngôi sao đen xếp thành một hàng như ảnh",
        "subtopic": "Chia đều và cân bằng các nhóm",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Chia đều 9 hình ngôi sao vào 3 nhóm thì mỗi nhóm có 9 : 3 = 3 ngôi sao.\nTrong 2 nhóm đầu tiên có 3 + 3 = 6 ngôi sao.\nĐáp số: C."
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
        "subtopic": "Sắp xếp số và xác định thứ hạng",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Các số được sắp xếp theo thứ tự từ lớn đến bé như sau: 91, 82, 73, 50, 46, 39, 23.\nVậy số lớn thứ tư là 50.\nĐáp số: B."
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
        ],
        "subtopic": "Lập số lẻ không lặp chữ số",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Các số lẻ có 2 chữ số lập được là: 17, 41, 47, 71.\nĐáp số: B."
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
        ],
        "subtopic": "Phân phối đồ vật vào các nhóm",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-05/q24.017b22dcefbd.svg",
        "explanationImageAlt": "Bảng10 cách cắm hoa theo nguồn,các số hoa ở lọ1,lọ2,lọ3",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta có thể cắm hoa theo các cách sau (xem bảng).\nĐáp số: C."
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
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Cách 1:\nVới chiếc áo phông thứ nhất Kesha có thể phối với 3 chiếc quần được 3 bộ quần áo.\nVới chiếc áo phông thứ hai Kesha có thể phối với 3 chiếc quần được 3 bộ quần áo.\nVậy tổng số bộ quần áo Kesha có thể phối là 3 + 3 = 6 (bộ).\nCách 2:\nSố cách Kesha chọn áo là: 2 cách.\nSố cách Kesha chọn quần là: 3 cách.\nSố cách phối quần áo là 2 × 3 = 6 (cách).\nĐáp số: A."
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
        "subtopic": "Các ngày trong tuần",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Hôm nay là thứ Bảy nên 1 ngày nữa là Chủ nhật.\n2 ngày nữa là thứ Hai. 3 ngày nữa là thứ Ba. 4 ngày nữa là thứ Tư.\nĐáp số: C."
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
        "subtopic": "Quy luật dãy số",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Quy luật: Các số trong dãy tăng dần 4 đơn vị.\n2 + 4 = 6; 6 + 4 = 10; 10 + 4 = 14; 14 + 4 = 18; 18 + 4 = 22; …\nVậy số ở chỗ trống là: 22 + 4 = 26.\nĐáp số: A."
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
        "subtopic": "Bài toán vị trí trong hàng",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Số học sinh đứng trước Amy là: 34 − 9 − 1 = 24 (học sinh).\nĐáp số: B."
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
        "subtopic": "Quy luật sắp xếp hình",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Liệt kê số lượng hình ⊗ nhiều hơn hình # trong mỗi nhóm:\nNhóm 1: số lượng hình ⊗ nhiều hơn hình # là 1 hình.\nNhóm 2: số lượng hình ⊗ nhiều hơn hình # là 3 hình.\nNhóm 3: số lượng hình ⊗ nhiều hơn hình # là 1 hình.\nNhóm 4: số lượng hình ⊗ nhiều hơn hình # là 3 hình.\nTrong nhóm lẻ, số lượng hình ⊗ nhiều hơn hình # là 1 hình.\nTrong nhóm chẵn, số lượng hình ⊗ nhiều hơn hình # là 3 hình.\nNhư vậy trong nhóm thứ 15, số lượng hình ⊗ nhiều hơn hình # là 1 hình.\nĐáp số: B."
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
        "subtopic": "Tuổi hiện tại và tương lai",
        "answer": 3,
        "answerSource": "user",
        "explanation": "3 năm trước Amy 14 tuổi nên tuổi của Amy hiện tại là: 14 + 3 = 17 (tuổi).\nĐáp số: D."
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
        "subtopic": "Tìm giá trị",
        "answer": 3,
        "answerSource": "user",
        "explanation": "7 + 17 + 27 + 37 + 47 + 3 + 3 + 3 + 3 + 3\n= (7 + 3) + (17 + 3) + (27 + 3) + (37 + 3) + (47 + 3)\n= 10 + 20 + 30 + 40 + 50\n= 150.\nĐáp số: D."
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
        "subtopic": "Tìm giá trị",
        "answer": 1,
        "answerSource": "user",
        "explanation": "15 : 3 + 25 : 5 − 30 : 5 = 5 + 5 − 6 = 10 − 6 = 4.\nĐáp số: B."
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
        "subtopic": "Tìm giá trị",
        "answer": 2,
        "answerSource": "user",
        "explanation": "1 − 2 + 3 − 4 + 5 − 6 + 7 − 8 + 9 = 1 + (3 − 2) + (5 − 4) + (7 − 6) + (9 − 8)\n= 1 + 1 + 1 + 1 + 1 = 5.\nĐáp số: C."
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
        "subtopic": "Tìm số bị che trong phép tính",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Số cần tìm là: 12 × 6 = 72.\nĐáp số: C."
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
        "subtopic": "Tìm giá trị",
        "answer": 2,
        "answerSource": "user",
        "explanation": "10 × 1 + 10 × 2 + 10 × 3 + 10 × 4 = 10 × (1 + 2 + 3 + 4) = 10 × 10 = 100.\nĐáp số: C."
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
        "subtopic": "Chuyển bớt và so sánh số lượng",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Tổng số táo của 2 bạn là: 23 + 11 = 34 (quả).\nNếu không tính 2 quả táo của Amy thì hai bạn có số táo là: 34 − 2 = 32 (quả).\nKhi đó, hai bạn có số táo bằng nhau và đều có 16 quả táo.\nLúc đầu John có 11 quả táo và sau khi xin Amy thì John có 16 quả táo.\nVậy Amy cần cho John số táo là: 16 − 11 = 5 (quả).\nĐáp số: A."
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
        "subtopic": "Tìm số hạng trong dãy số",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Quy luật: Các số trong dãy tăng dần 2 đơn vị.\nSố thứ 20 cách số đầu tiên là 20 − 1 = 19 khoảng, mỗi khoảng bằng 2 đơn vị.\nSố thứ 20 của dãy là: 101 + 19 × 2 = 139.\nĐáp số: B."
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
        "subtopic": "Đếm số theo điều kiện",
        "answer": 1,
        "answerSource": "user",
        "explanation": "Hàng chục nhỏ hơn 3 nên hàng chục có thể là 2, 1.\nCác số có 2 chữ số với hàng chục là 2: 20, 21, 22, 23, 24, 25, 26, 27, 28, 29.\nCác số có 2 chữ số với hàng chục là 1: 10, 11, 12, 13, 14, 15, 16, 17, 18, 19.\nVậy có tất cả 20 số thỏa mãn bài toán.\nĐáp số: B."
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
        "subtopic": "Điền dấu cộng và trừ",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Ta có: 1 − 3 − 5 + 7 + 11 = 1 + 7 + 11 − 3 − 5 = 19 − 3 − 5 = 16 − 5 = 11.\nĐáp số: A."
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
        "subtopic": "Nhận biết kết quả chẵn",
        "answer": 0,
        "answerSource": "user",
        "explanation": "1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14\n= (1 + 14) + (2 + 13) + (3 + 12) + (4 + 11) + (5 + 10) + (6 + 9) + (7 + 8)\n= 15 + 15 + 15 + 15 + 15 + 15 + 15\n= (15 + 15) + (15 + 15) + (15 + 15) + 15\n= 30 + 30 + 30 + 15\n= 105.\nVì 105 là số lẻ nên kết quả phép tính đã cho là một số lẻ.\nĐáp số: A."
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
        "subtopic": "Đếm hình vuông",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-06/q16.e743c3e47201.svg",
        "explanationImageAlt": "Hình đánh số theo lời giải câu 16 do chủ dự án cung cấp",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta đánh số các hình vuông như dưới đây.\nHình vuông đơn vị: có 9 hình là 1, 2, 3, 4, 5, 6, 7, 8 và 9.\nHình vuông được ghép bởi 4 hình vuông đơn vị: có 2 hình là (1, 2, 7, 8) và (2, 3, 8, 9).\nVậy có tất cả 9 + 2 = 11 hình vuông.\nĐáp số: C."
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
        ],
        "subtopic": "Cạnh của hình phẳng và hình khối",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Hình tròn không có cạnh.\nĐáp số: A."
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
        "subtopic": "Quy luật dãy hình",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-06/q18.294692b1342c.svg",
        "explanationImageAlt": "Nhóm5 hình tam giác,vuông,tròn,thoi,tam giác lặp lại theo lời giải",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Quy luật: Nhóm 5 hình (△ □ ○ ◊ △) lặp lại.\nVậy hình cần điền vào dấu chấm hỏi là □.\nĐáp số: D."
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
        "subtopic": "Quan sát và đếm khối lập phương",
        "explanationImage": "./assets/solutions/timo-grade2-qualifying-06/q19.1d9614d798e0.svg",
        "explanationImageAlt": "Hình lời giải đánh dấu4 mặt vuông với mũi tên theo ảnh chủ dự án",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Ta có hình vẽ sau.\nĐáp số: C."
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
        ],
        "subtopic": "Tạo đường thẳng từ các điểm",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Số đường thẳng được tạo bởi 5 điểm trên một mặt phẳng là: 5 × (5 − 1) : 2 = 10 (đường).\nĐáp số: D."
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
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Chọn 1 món khai vị trong 2 món: có 2 cách.\nChọn 1 món chính trong 3 món: có 3 cách.\nChọn 1 món tráng miệng trong 3 món: có 3 cách.\nVậy số cách gọi 1 món khai vị, 1 món chính và 1 món tráng miệng là: 2 × 3 × 3 = 18 (cách).\nĐáp số: A."
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
        ],
        "subtopic": "Lập số lớn nhất và nhỏ nhất",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Số chia hết cho 10 có chữ số ở hàng đơn vị là 0.\nVậy số nhỏ nhất có 4 chữ số chia hết cho 10 tạo bởi các số đã cho là 3490.\nĐáp số: D."
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
        "imageAlt": "Dãy 2, 5, 8, 11, 14, 17, …",
        "subtopic": "Đếm số lẻ trong dãy số",
        "answer": 2,
        "answerSource": "user",
        "explanation": "Tính chẵn lẻ của dãy số là: Chẵn, Lẻ, Chẵn, Lẻ, Chẵn, Lẻ, …\nQuy luật: Nhóm 2 số (Chẵn, Lẻ) lặp lại.\n30 số đầu tiên gồm 30 : 2 = 15 nhóm.\nMỗi nhóm có 1 số lẻ nên trong 15 nhóm có 15 × 1 = 15 số lẻ.\nĐáp số: C."
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
        ],
        "subtopic": "Chọn cặp không phân biệt thứ tự",
        "answer": 0,
        "answerSource": "user",
        "explanation": "Chọn đứa trẻ thứ nhất: có 6 cách.\nChọn đứa trẻ thứ hai: có 6 cách.\nTuy nhiên các cặp đứa trẻ được chọn như trên sẽ được tính 2 lần (chọn bạn A rồi chọn bạn B cũng chính là cách chọn bạn B rồi chọn bạn A).\nVậy số cách khác nhau để chọn ra 2 đứa trẻ trong số 6 đứa trẻ là 6 × 5 : 2 = 15 (cách).\nĐáp số: A."
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
        ],
        "subtopic": "Đếm số có chữ số cho trước",
        "answer": 3,
        "answerSource": "user",
        "explanation": "Từ 1 đến 101 có 11 số chứa chữ số 0 là 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 101.\nĐáp số: D."
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
        "imageAlt": "Một khối lập phương màu xanh với mặt trên, mặt trước và mặt bên phải",
        "subtopic": "Cạnh của hình phẳng và hình khối"
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
        ],
        "subtopic": "Lập số lớn nhất và nhỏ nhất"
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
        "imageAlt": "Kệ sách ba ngăn: hàng trên 7 quyển, hàng giữa 8 quyển, hàng dưới 3 quyển theo ảnh",
        "subtopic": "Chia đều và cân bằng các nhóm"
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
        ],
        "subtopic": "Lập số chẵn được lặp chữ số"
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
        "imageAlt": "Bảng 3×3 với các hàng A, 1, B; 3, C, 7; D, 9, E",
        "subtopic": "Điền số vào bảng có tổng bằng nhau"
      }
    ]
  },
  {
    "id": "timo-grade2-national-01",
    "title": "Đề quốc gia 01",
    "sourceTitle": "ĐỀ SỐ 1 — VÒNG QUỐC GIA TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề quốc gia",
    "questions": [
      {
        "number": 1,
        "english": "According to the pattern shown below, what is the number in the space provided?",
        "translation": "Pattern: Quy luật; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-01/q01.cddbe8582e6d.svg",
        "imageAlt": "20, 23, 27, 32, 38, 45, 53, __"
      },
      {
        "number": 2,
        "english": "According to the pattern below, what is the English letter in the space provided?",
        "translation": "Pattern: Quy luật; English letter: Chữ cái tiếng Anh; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-01/q02.4dc53a4d3dc6.svg",
        "imageAlt": "F, S, I, Q, L, O, O, M, __"
      },
      {
        "number": 3,
        "english": "Mary needs 20 minutes to draw 1 picture and then rests for 5 minutes. How many minutes does Mary need to draw 4 pictures?",
        "translation": "Minute: Phút; Draw: Vẽ; Picture: Bức tranh; Rest: Nghỉ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Bài toán tính thời gian"
      },
      {
        "number": 4,
        "english": "If 11th August is Monday, which day of the week is 15th October of the same year?",
        "translation": "August: Tháng 8; Monday: Thứ Hai; Day of the week: Thứ trong tuần; October: Tháng 10; The same year: Cùng năm.",
        "responseType": "text",
        "options": [],
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 5,
        "english": "According to the pattern shown below, how many * are there in the 7th group?",
        "translation": "Pattern: Quy luật; 7th group: Nhóm thứ 7.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật sắp xếp hình",
        "image": "./assets/papers/timo-grade2-national-01/q05.45a572c97c4b.svg",
        "imageAlt": "Bốn lưới dấu sao: ô cuối phía dưới bên phải trống trong mỗi nhóm, đúng vị trí ảnh"
      },
      {
        "number": 6,
        "english": "Find the value of 1 + 4 − 7 + 10 − 13 + 16 − 19 + 22 − 25 + 28.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Find the value of 26 + 48 + 52 + 83 + 84 + 37.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Find the value of 14 × 15 + 14 × 8 − 10 × 14 + 17 × 14.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "Find the value of 22 − 7 − 6 + 11 − 9 − 3.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 10,
        "english": "If A and B are different 1-digit numbers, what is the value of B if the equation below is correct?",
        "translation": "Different: Khác nhau; 1-digit number: Số có 1 chữ số; Value: Giá trị; Equation: Phép tính; Correct: Đúng.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "image": "./assets/papers/timo-grade2-national-01/q10.1a96ab25c193.svg",
        "imageAlt": "Phép cộng dọc AA cộng BA bằng 98"
      },
      {
        "number": 11,
        "english": "What is the largest 3-digit odd number smaller than 500 with different digits?",
        "translation": "Largest: Lớn nhất; 3-digit odd number: Số lẻ có 3 chữ số; Smaller than: Nhỏ hơn; Different: Khác nhau; Digit: Chữ số.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số theo điều kiện",
        "sectionHeading": {
          "english": "Number Theory",
          "vietnamese": "Số học"
        }
      },
      {
        "number": 12,
        "english": "In a singing competition, 30 children have an even number of scores in total. For the first 15 children, each child has an odd number of scores. For the following 6 children, each child has an even number of scores. Determine whether the total scores of the remaining children is odd or even.",
        "translation": "Child / Children: Đứa trẻ; Score: Điểm số; Total: Tổng; Each: Mỗi; First: Đầu tiên; Following: Tiếp theo; Remaining: Còn lại; Determine: Xác định; Even: Chẵn; Odd: Lẻ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 13,
        "english": "Each box of eggs has 12 eggs. Mom asks Mary to buy 35 eggs. Her neighbor asks her to buy 29 eggs. At least how many boxes of eggs does Mary need to buy?",
        "translation": "Each: Mỗi; Box: Hộp; Egg: Quả trứng; At least: Ít nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chia nhóm theo sức chứa"
      },
      {
        "number": 14,
        "english": "Fill in the blanks with ‘+’ and ‘−’ to make the equation below correct. (Write down the complete equation on the answer sheet)",
        "translation": "Fill: Điền; Blanks: Chỗ trống; Equation: Phép tính; Correct: Đúng. (Viết lại toàn bộ phép tính vào phiếu trả lời).",
        "responseType": "text",
        "options": [],
        "subtopic": "Điền dấu cộng và trừ",
        "image": "./assets/papers/timo-grade2-national-01/q14.682fe10ba68c.svg",
        "imageAlt": "9 __ 10 __ 8 __ 5 = 6"
      },
      {
        "number": 15,
        "english": "The numbers below form an arithmetic sequence. What is the 11th number?",
        "translation": "Arithmetic sequence: Dãy số cách đều; 11th number: Số thứ 11.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số hạng trong dãy số",
        "image": "./assets/papers/timo-grade2-national-01/q15.3498ad516545.svg",
        "imageAlt": "200, 189, 178, 167, 156, …"
      },
      {
        "number": 16,
        "english": "A pyramid has 12 vertices. How many edges does this pyramid have?",
        "translation": "Pyramid: Hình chóp; Vertices: Đỉnh; Edges: Cạnh.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đỉnh, cạnh và mặt của hình khối"
      },
      {
        "number": 17,
        "english": "Cubes of the same size are placed as shown in the figure below. At least how many square faces can be seen if viewing the figure below from the top?",
        "translation": "Cube: Hình lập phương; Same size: Cùng kích thước; Placed: Được xếp; Figure: Hình vẽ; At least: Ít nhất; Square face: Mặt hình vuông; Viewing: Quan sát; From the top: Từ bên trên.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quan sát và đếm khối lập phương",
        "image": "./assets/papers/timo-grade2-national-01/q17.72c4210128af.svg",
        "imageAlt": "Cụm khối trắng xám có cột cao bên trái, các bậc ở giữa và ba khối hàng trước bên phải theo ảnh"
      },
      {
        "number": 18,
        "english": "How many line segments are there in the figure below?",
        "translation": "Line segment: Đoạn thẳng; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm đoạn thẳng",
        "image": "./assets/papers/timo-grade2-national-01/q18.c38bb3472cfd.svg",
        "imageAlt": "Các đoạn thẳng có chung điểm phía trái, hai đường xiên từ trên xuống và các điểm giao đánh dấu như ảnh"
      },
      {
        "number": 19,
        "english": "How many interior angles are there in the figure below?",
        "translation": "Interior angle: Góc trong; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm góc trong đa giác",
        "image": "./assets/papers/timo-grade2-national-01/q19.a4765f443116.svg",
        "imageAlt": "Đa giác khép kín có các chỗ lõm và hai phần nhô phía dưới, giữ đường biên như ảnh"
      },
      {
        "number": 20,
        "english": "According to the pattern shown below, what is the figure in the space provided?",
        "translation": "Pattern: Quy luật; Figure: Hình vẽ; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy hình",
        "image": "./assets/papers/timo-grade2-national-01/q20.3623124aee09.svg",
        "imageAlt": "Dãy hình vuông đặc, ngôi sao và chấm tròn, có một chỗ trống đúng vị trí trong ảnh"
      },
      {
        "number": 21,
        "english": "Neo has 6 $1 coins, 3 $2 coins and 6 $5 coins. At most how many $10 notes can he exchange?",
        "translation": "Coin: Đồng xu; At most: Nhiều nhất; Note: Tờ tiền; Exchange: Đổi.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đổi tiền"
      },
      {
        "number": 22,
        "english": "How many odd numbers are there from the 5th term to the 18th term in the sequence given below?",
        "translation": "Odd number: Số lẻ; 5th term: Số thứ 5; 18th term: Số thứ 18; Sequence: Dãy số.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm số lẻ trong dãy số",
        "image": "./assets/papers/timo-grade2-national-01/q22.10a65f3915ee.svg",
        "imageAlt": "3, 6, 11, 18, 27, 38, …"
      },
      {
        "number": 23,
        "english": "There are 3 ways from the zoo to the train station. There are 2 ways from the train station to the cinema. There are 3 ways from the cinema to the playground. How many different ways are there to go from the zoo to the playground passing through the train station and the cinema?",
        "translation": "Way: Đường đi; Zoo: Vườn thú; Train station: Ga tàu; Cinema: Rạp chiếu phim; Playground: Sân chơi; Different: Khác nhau; Passing through: Đi qua.",
        "responseType": "text",
        "options": [],
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?"
      },
      {
        "number": 24,
        "english": "After Mary gives 9 chocolates to Andy and Mary takes 12 chocolates from Eric, they will have an equal number of chocolates. How many chocolates does Eric have more than Andy originally?",
        "translation": "After: Sau khi; Give: Cho; Take: Lấy; Equal: Bằng nhau; More than: Nhiều hơn; Originally: Ban đầu.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chuyển bớt và so sánh số lượng"
      },
      {
        "number": 25,
        "english": "Choose 3 different digits from 0, 3, 4 and 9 to form a 3-digit numbers. What is the difference between the largest number and the smallest number that can be formed?",
        "translation": "Choose: Chọn; Different: Khác nhau; Digit: Chữ số; Form a 3-digit number: Tạo thành số có 3 chữ số; Difference: Hiệu; Largest: Lớn nhất; Smallest: Nhỏ nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lớn nhất và nhỏ nhất"
      }
    ]
  },
  {
    "id": "timo-grade2-national-02",
    "title": "Đề quốc gia 02",
    "sourceTitle": "ĐỀ SỐ 2 — VÒNG QUỐC GIA TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề quốc gia",
    "questions": [
      {
        "number": 1,
        "english": "When Evan was born, his mother was 25 years old. His sister was born 5 years later. When Evan’s mother is 55 years old, how old is Evan’s sister?",
        "translation": "Born: Sinh ra; Years old: Tuổi; Years: Năm; Later: Sau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 2,
        "english": "Given that 30th June, 2023 is Friday. Which day of the week is 8th August, 2023?",
        "translation": "June: Tháng 6; Friday: Thứ Sáu; Day of the week: Thứ trong tuần; August: Tháng 8.",
        "responseType": "text",
        "options": [],
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 3,
        "english": "What is the number represented by “?” in the following table?",
        "translation": "Represent: Biểu diễn; Table: Bảng.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật trong bảng số",
        "image": "./assets/papers/timo-grade2-national-02/q03.91bb3e37094b.svg",
        "imageAlt": "Bảng bốn hàng: 2,3,6; 5,3,15; 4,4,dấu hỏi; 6,5,30"
      },
      {
        "number": 4,
        "english": "From the pattern below, what should be the English letter filled in the blank?",
        "translation": "Pattern: Quy luật; English letter: Chữ cái tiếng Anh; Fill: Điền; Blank: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-02/q04.d7887017ca9d.svg",
        "imageAlt": "Dãy chữ D, H, J, N, P, chỗ trống"
      },
      {
        "number": 5,
        "english": "18 children are standing in a column. In the column, Alice and Henry stand next to each other. There are 9 children standing behind them. How many children are standing in front of them?",
        "translation": "Children: Đứa trẻ; Column: Hàng dọc; Next to each other: Cạnh nhau; Behind: Phía sau; In front of: Phía trước.",
        "responseType": "text",
        "options": [],
        "subtopic": "Bài toán vị trí trong hàng"
      },
      {
        "number": 6,
        "english": "Find the value of 15 − 8 − 9 + 12 − 6.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Find the value of 35 × 2 × 8 × 5.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Find the value of 9 × 33 + 9 × 44 − 9 × 20 − 9 × 17.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "Find the value of 2 + 36 + 4 + 38 + 16 + 34 + 5 + 25.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 10,
        "english": "If A and B are both 1-digit numbers, what is the value of A × B if the equation below is correct?",
        "translation": "1-digit number: Số có 1 chữ số; Value: Giá trị; Equation: Phép tính; Correct: Đúng.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "image": "./assets/papers/timo-grade2-national-02/q10.6f38c334dead.svg",
        "imageAlt": "Phép cộng dọc A cộng BA bằng 104"
      },
      {
        "number": 11,
        "english": "What is the smallest 4-digit even number with different digits?",
        "translation": "Smallest: Nhỏ nhất; 4-digit even number: Số chẵn có 4 chữ số; Different: Khác nhau; Digit: Chữ số.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số theo điều kiện",
        "sectionHeading": {
          "english": "Number Theory",
          "vietnamese": "Số học"
        }
      },
      {
        "number": 12,
        "english": "Determine whether the result of 4 × 7 − 3 × 6 + 5 × 4 + 9 × 8 − 6 × 2 − 7 × 9 is an odd or even number.",
        "translation": "Determine: Xác định; Result: Kết quả; Odd: Số lẻ; Even: Số chẵn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 13,
        "english": "The numbers below form an arithmetic sequence. What is the sum of the 5th number and the 9th number in the sequence?",
        "translation": "Arithmetic sequence: Dãy số cách đều; Sum: Tổng; 5th number: Số thứ 5; 9th number: Số thứ 9.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số hạng trong dãy số",
        "image": "./assets/papers/timo-grade2-national-02/q13.8f994f0f5b77.svg",
        "imageAlt": "89, 80, 71, 62, …"
      },
      {
        "number": 14,
        "english": "Christine gave Madison 12 color pencils. Alexis gave Christine 5 color pencils. Then they all have an equal number of pencils. How many color pencils did Christine have more than Madison originally?",
        "translation": "Gave: Cho; Color pencil: Bút chì màu; Equal number: Số lượng bằng nhau; More than: Nhiều hơn; Originally: Ban đầu.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chuyển bớt và so sánh số lượng"
      },
      {
        "number": 15,
        "english": "Fill in the blanks with ‘+’ and ‘−’ to make the equation below correct. (Write down the complete equation on the answer sheet)",
        "translation": "Fill: Điền; Blanks: Chỗ trống; Equation: Phép tính; Correct: Đúng. (Lưu ý: Thí sinh viết toàn bộ phép tính vào phiếu trả lời).",
        "responseType": "text",
        "options": [],
        "subtopic": "Điền dấu cộng và trừ",
        "image": "./assets/papers/timo-grade2-national-02/q15.2b2fccd55284.svg",
        "imageAlt": "15 __ 3 __ 7 __ 24 = 1"
      },
      {
        "number": 16,
        "english": "A pyramid has 15 vertices. How many faces does this pyramid have?",
        "translation": "Pyramid: Hình chóp; Vertices: Đỉnh; Faces: Mặt.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đỉnh, cạnh và mặt của hình khối"
      },
      {
        "number": 17,
        "english": "How many line segments are there in the figure below?",
        "translation": "Line segments: Đoạn thẳng; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm đoạn thẳng",
        "image": "./assets/papers/timo-grade2-national-02/q17.9025d2e05b16.svg",
        "imageAlt": "Hình vuông có bốn đoạn chéo ở các góc và các điểm đánh dấu như ảnh"
      },
      {
        "number": 18,
        "english": "Cubes of the same size are placed as shown in the figure below. At least how many square faces of small cubes can be seen if viewing the figure below from the right?",
        "translation": "Cube: Hình lập phương; Same size: Cùng kích thước; Placed: Được xếp; Figure: Hình vẽ; At least: Ít nhất; Square face: Mặt hình vuông; Viewing: Quan sát; From the right: Từ bên phải.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quan sát và đếm khối lập phương",
        "image": "./assets/papers/timo-grade2-national-02/q18.47b04d17aefa.svg",
        "imageAlt": "Cụm khối trắng xám có cột cao bên trái, cột bên phải và hai khối nhô ở hàng trước như ảnh"
      },
      {
        "number": 19,
        "english": "How many rectangles are there in the figure below?",
        "translation": "Rectangles: Hình chữ nhật; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm hình chữ nhật",
        "image": "./assets/papers/timo-grade2-national-02/q19.b676fa872248.svg",
        "imageAlt": "Hình chữ nhật lớn có hai đường đứng toàn chiều cao và hai đường chia phần bên phải như ảnh"
      },
      {
        "number": 20,
        "english": "A pyramid has 48 edges. How many vertices does this pyramid have?",
        "translation": "Pyramid: Hình chóp; Edges: Cạnh; Vertices: Đỉnh.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đỉnh, cạnh và mặt của hình khối"
      },
      {
        "number": 21,
        "english": "Choose 4 different digits from 0, 3, 4, 9 and 7 to form a 4-digit even number. What is the largest value of this number?",
        "translation": "Choose: Chọn; Different: Khác nhau; Digits: Chữ số; 4-digit even number: Số chẵn có 4 chữ số; Largest value: Giá trị lớn nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lớn nhất và nhỏ nhất"
      },
      {
        "number": 22,
        "english": "How many numbers are there from 1 to 100 such that it does not contain digit “1”?",
        "translation": "Contain: Chứa; Digit: Chữ số.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm số không chứa chữ số cho trước"
      },
      {
        "number": 23,
        "english": "If we choose 4 digits from 3, 9, 5, 7, 1, 8 without repetition and then combine them to form two 2-digit odd numbers, what is the minimum possible value of their difference?",
        "translation": "Choose: Chọn; Digit: Chữ số; Without repetition: Không lặp lại; Combine: Ghép lại; 2-digit odd numbers: Số lẻ có 2 chữ số; Minimum possible value: Giá trị nhỏ nhất có thể; Difference: Hiệu.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập hai số có hiệu nhỏ nhất"
      },
      {
        "number": 24,
        "english": "Jayden has 8 $1 coins, 3 $2 coins and 5 $5 coins. If one bowl costs $7, at most how many bowls can he buy?",
        "translation": "Coins: Đồng xu; Bowl: Cái bát; Cost: Có giá; At most: Nhiều nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Mua hàng theo số tiền có"
      },
      {
        "number": 25,
        "english": "Among the results of the following expressions, how many even number(s) is/are there between 25 and 55?",
        "translation": "Results: Kết quả; Expression: Phép tính; Even numbers: Số chẵn; Between: Ở giữa.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm kết quả theo điều kiện",
        "image": "./assets/papers/timo-grade2-national-02/q25.c8198577ee66.svg",
        "imageAlt": "Các phép tính 100÷4;15×4;6×7;3×9;2×10;4×17;60÷3"
      }
    ]
  },
  {
    "id": "timo-grade2-national-03",
    "title": "Đề quốc gia 03",
    "sourceTitle": "ĐỀ SỐ 3 — VÒNG QUỐC GIA TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề quốc gia",
    "questions": [
      {
        "number": 1,
        "english": "When Ethan was born, mum was 31 years old. His brother was born 3 years later. When mum is 49 years old, how old is Ethan’s brother?",
        "translation": "Born: Sinh ra; Years old: Tuổi; Later: Sau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 2,
        "english": "12th June 2022 is Sunday. Which day of the week is 9th July in the same year?",
        "translation": "June: Tháng 6; Sunday: Chủ nhật; Day of the week: Thứ trong tuần; July: Tháng 7; The same year: Cùng năm.",
        "responseType": "text",
        "options": [],
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 3,
        "english": "What is the value of the number to represent “?” in the following table?",
        "translation": "Value: Giá trị; Number: Số; Represent: Biểu diễn; Table: Bảng.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật trong bảng số",
        "image": "./assets/papers/timo-grade2-national-03/q03.24477fcfc1e8.svg",
        "imageAlt": "Bảng bốn hàng: 5,3,15;4,5,20;3,7,dấu hỏi;2,9,18"
      },
      {
        "number": 4,
        "english": "According to the pattern below, what is the English letter in the space provided?",
        "translation": "Pattern: Quy luật; English letter: Chữ cái tiếng Anh; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-03/q04.4aef97e7ca27.svg",
        "imageAlt": "D, G, I, L, N, __"
      },
      {
        "number": 5,
        "english": "29 children form a column. Eleanor and Nicole stand next to each other. There are 13 children in front of them. How many children are standing behind them?",
        "translation": "Children: Đứa trẻ; Column: Hàng dọc; Next to each other: Cạnh nhau; In front of: Phía trước; Behind: Phía sau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Bài toán vị trí trong hàng"
      },
      {
        "number": 6,
        "english": "Find the value of 13 − 7 − 9 + 16 − 5.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Find the value of 45 × 2 × 6 × 5.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "If A and B are both 1-digit numbers, what is the value of A × B if the equation below is correct?",
        "translation": "1-digit number: Số có 1 chữ số; Value: Giá trị; Equation: Phép tính; Correct: Đúng.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "image": "./assets/papers/timo-grade2-national-03/q08.1272523f3b6a.svg",
        "imageAlt": "Phép cộng dọc B cộng BA bằng 53"
      },
      {
        "number": 9,
        "english": "Find the value of 7 × 39 + 7 × 77 − 7 × 21 − 7 × 25.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 10,
        "english": "Find the value of 7 + 39 + 3 + 31 + 1 + 33 + 5 + 49 + 9 + 37.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 11,
        "english": "Wendy gave Alan 10 pencils. Fred gave Wendy 6 pencils. Then they all have equal number of pencils. How many pencils did Wendy have more than Alan originally?",
        "translation": "Gave: Cho; Pencils: Bút chì; Equal: Bằng nhau; More than: Nhiều hơn; Originally: Ban đầu.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chuyển bớt và so sánh số lượng",
        "sectionHeading": {
          "english": "Number Theory",
          "vietnamese": "Số học"
        }
      },
      {
        "number": 12,
        "english": "Determine the result of 5 × 7 − 3 × 9 + 5 × 4 + 9 × 8 − 6 × 2 − 7 × 9 is odd or even number.",
        "translation": "Determine: Xác định; Result: Kết quả; Odd: Số lẻ; Even: Số chẵn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 13,
        "english": "The numbers below form an arithmetic sequence. What is the sum of the 6th number and the 8th number in the sequence?",
        "translation": "Arithmetic sequence: Dãy số cách đều; Sum: Tổng; 6th number: Số thứ 6; 8th number: Số thứ 8.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số hạng trong dãy số",
        "image": "./assets/papers/timo-grade2-national-03/q13.96cfdc404dd0.svg",
        "imageAlt": "96, 89, 82, 75, …"
      },
      {
        "number": 14,
        "english": "Find the smallest 3-digit odd number with different digits.",
        "translation": "Smallest: Nhỏ nhất; 3-digit odd number: Số lẻ có 3 chữ số; Different digits: Các chữ số khác nhau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số theo điều kiện"
      },
      {
        "number": 15,
        "english": "Fill the lines with ‘+’ and ‘−’ to make the equation below correct. (Write down the complete equation on the answer sheet)",
        "translation": "Fill: Điền; Lines: Dòng kẻ; Equation: Phép tính; Correct: Đúng. (Lưu ý: Thí sinh viết toàn bộ phép tính vào phiếu trả lời).",
        "responseType": "text",
        "options": [],
        "subtopic": "Điền dấu cộng và trừ",
        "image": "./assets/papers/timo-grade2-national-03/q15.c3df28545450.svg",
        "imageAlt": "17 __ 9 __ 6 __ 12 = 14"
      },
      {
        "number": 16,
        "english": "How many squares are there in the figure below?",
        "translation": "Squares: Hình vuông; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm hình vuông",
        "image": "./assets/papers/timo-grade2-national-03/q16.be1b6db9409b.svg",
        "imageAlt": "Lưới các hình vuông và hình chữ nhật chồng nhau, có ô nhô bên trái và hai ô bên phải như ảnh"
      },
      {
        "number": 17,
        "english": "How many line segments are there in the figure below?",
        "translation": "Line segments: Đoạn thẳng; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm đoạn thẳng",
        "image": "./assets/papers/timo-grade2-national-03/q17.6bac666f8527.svg",
        "imageAlt": "Các đoạn xiên qua hai giao điểm, nối thành phần tam giác phía dưới, tám điểm như ảnh"
      },
      {
        "number": 18,
        "english": "At least how many small squares can be seen if viewing the figure below from the right?",
        "translation": "At least: Ít nhất; Small squares: Hình vuông nhỏ; Viewing: Quan sát; Figure: Hình vẽ; The right: Bên phải.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quan sát và đếm khối lập phương",
        "image": "./assets/papers/timo-grade2-national-03/q18.32197f81ea17.svg",
        "imageAlt": "Cụm khối trắng xám có cột cao bên trái, hai khối nhô phía trước và cột phía sau bên phải như ảnh"
      },
      {
        "number": 19,
        "english": "A pyramid has 29 vertices. How many faces does this pyramid have?",
        "translation": "Pyramid: Hình chóp; Vertices: Đỉnh; Faces: Mặt.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đỉnh, cạnh và mặt của hình khối"
      },
      {
        "number": 20,
        "english": "A pyramid has 19 vertices. How many edges does this pyramid have?",
        "translation": "Pyramid: Hình chóp; Vertices: Đỉnh; Edges: Cạnh.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đỉnh, cạnh và mặt của hình khối"
      },
      {
        "number": 21,
        "english": "What is the greatest 4-digit odd number composed of digits 0, 8, 6, 9 or 2? (Each digit can only be used once)",
        "translation": "Greatest: Lớn nhất; 4-digit odd number: Số lẻ có 4 chữ số; Composed of: Bao gồm; Digit: Chữ số; Once: Một lần.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lớn nhất và nhỏ nhất"
      },
      {
        "number": 22,
        "english": "How many different ways to express 17 as the difference of two natural numbers greater than 0 such that one of them is smaller than 18?",
        "translation": "Different ways: Các cách khác nhau; Express: Biểu diễn; Difference: Hiệu; Natural numbers: Số tự nhiên; Greater than: Lớn hơn; Smaller than: Nhỏ hơn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Biểu diễn số bằng hiệu hai số"
      },
      {
        "number": 23,
        "english": "Choose 4 digits, without repetition, from 3, 9, 5, 7, 1, 8 to form two 2-digit odd numbers. What is the minimum value of the difference of these pairs of numbers?",
        "translation": "Choose: Chọn; Digit: Chữ số; Without repetition: Không lặp lại; 2-digit odd numbers: Số lẻ có 2 chữ số; Minimum value: Giá trị nhỏ nhất; Difference: Hiệu; Pair of numbers: Cặp số.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập hai số có hiệu nhỏ nhất"
      },
      {
        "number": 24,
        "english": "Isaac has 8 $1 coins, 3 $2 coins and 5 $5 coins. If one cup costs $6, at most how many cups can he buy?",
        "translation": "Coins: Đồng xu; Cup: Chiếc cốc; Cost: Có giá; At most: Nhiều nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Mua hàng theo số tiền có"
      },
      {
        "number": 25,
        "english": "Among the values of the following expressions, how many even number(s) is / are between 30 and 50?",
        "translation": "Values: Giá trị; Expression: Phép tính; Even numbers: Số chẵn; Between: Ở giữa.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm kết quả theo điều kiện",
        "image": "./assets/papers/timo-grade2-national-03/q25.e85b25561f40.svg",
        "imageAlt": "Các phép tính 99÷3;19×2;51÷3;6×8;24×3;5×5;62÷2"
      }
    ]
  },
  {
    "id": "timo-grade2-national-04",
    "title": "Đề quốc gia 04",
    "sourceTitle": "ĐỀ SỐ 4 — VÒNG QUỐC GIA TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề quốc gia",
    "questions": [
      {
        "number": 1,
        "english": "When Ethan was born, mum was 28 years old. Sister was born 1 year later. When mum is 56 years old, how old will sister be?",
        "translation": "Born: Ra đời; Years old: Tuổi; Later: Sau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 2,
        "english": "7th May 2021 is Friday. Which day of the week is 1st June in the same year?",
        "translation": "May: Tháng 5; Friday: Thứ Sáu; June: Tháng 6; The same year: Cùng năm.",
        "responseType": "text",
        "options": [],
        "subtopic": "Các ngày trong tuần"
      },
      {
        "number": 3,
        "english": "What is the value of the number to represent “?” in the following table?",
        "translation": "Value: Giá trị; Number: Số; Represent: Biểu diễn; Table: Bảng.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật trong bảng số",
        "image": "./assets/papers/timo-grade2-national-04/q03.f1241de65eb7.svg",
        "imageAlt": "Bảng bốn hàng:3,2,6;5,4,20;7,6,dấu hỏi;9,8,72"
      },
      {
        "number": 4,
        "english": "According to the pattern below, what is the English letter in the space provided?",
        "translation": "Pattern: Quy luật; English letter: Chữ cái tiếng Anh; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-04/q04.405080070787.svg",
        "imageAlt": "K, N, P, S, U, __"
      },
      {
        "number": 5,
        "english": "27 children form a line. There are 10 children in front of Eleanor. How many child(ren) is / are behind her?",
        "translation": "Children: Đứa trẻ; Line: Hàng; In front of: Đằng trước; Behind: Đằng sau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Bài toán vị trí trong hàng"
      },
      {
        "number": 6,
        "english": "Find the value of 1 − 3 + 5 − 7 + 9 − 11 + 13.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Find the value of 7 × 2 × 7 × 5.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Find the value of A − B given that A and B are different 1-digit numbers.",
        "translation": "Value: Giá trị; Different 1-digit numbers: Các số có 1 chữ số khác nhau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "image": "./assets/papers/timo-grade2-national-04/q08.d07244ae090e.svg",
        "imageAlt": "Phép cộng dọc A cộng BB bằng 73"
      },
      {
        "number": 9,
        "english": "Find the value of 8 × 49 + 8 × 67 − 8 × 11 − 8 × 5.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 10,
        "english": "Find the value of 14 + 16 + 18 + 20 + 22 + 24 + 26 + 28.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 11,
        "english": "Hannah gave Peter 5 pencils. Lucy gave Peter 9 pencils. Then they all have equal number of pencils. How many pencils did Hannah have more than Peter originally?",
        "translation": "Gave: Cho; Pencils: Bút chì; Equal: Bằng nhau; More than: Nhiều hơn; Originally: Ban đầu.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chuyển bớt và so sánh số lượng",
        "sectionHeading": {
          "english": "Number Theory",
          "vietnamese": "Số học"
        }
      },
      {
        "number": 12,
        "english": "Determine the result of 5 × 5 + 9 × 7 − 4 × 4 + 8 × 8 − 7 × 1 − 2 × 6 is odd or even number.",
        "translation": "Determine: Xác định; Result: Kết quả; Odd: Số lẻ; Even: Số chẵn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 13,
        "english": "The numbers below form the arithmetic sequence. What is the sum of the 7th number and the 8th number?",
        "translation": "Arithmetic sequence: Dãy số cách đều; Sum: Tổng; 7th number: Số thứ 7; 8th number: Số thứ 8.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số hạng trong dãy số",
        "image": "./assets/papers/timo-grade2-national-04/q13.1b4f7c5fa250.svg",
        "imageAlt": "94, 86, 78, 70, 62, …"
      },
      {
        "number": 14,
        "english": "Find the smallest 3-digit odd number.",
        "translation": "Smallest: Nhỏ nhất; 3-digit odd number: Số lẻ có 3 chữ số.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số theo điều kiện"
      },
      {
        "number": 15,
        "english": "Fill the lines with ‘+’ and ‘−’ to make the equation below correct. (Write down the complete equation on the answer sheet)",
        "translation": "Fill: Điền; Lines: Dòng kẻ; Equation: Phép tính; Correct: Đúng. (Lưu ý: Thí sinh viết toàn bộ phép tính vào phiếu trả lời).",
        "responseType": "text",
        "options": [],
        "subtopic": "Điền dấu cộng và trừ",
        "image": "./assets/papers/timo-grade2-national-04/q15.5b7e644d94d1.svg",
        "imageAlt": "9 __ 18 __ 3 __ 7 = 23"
      },
      {
        "number": 16,
        "english": "How many square(s) is / are there in the figure below?",
        "translation": "Squares: Hình vuông; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm hình vuông",
        "image": "./assets/papers/timo-grade2-national-04/q16.b759e673b657.svg",
        "imageAlt": "Các ô vuông và phần hình chữ nhật xếp thành ba hàng lệch, giữ các đoạn chia như ảnh"
      },
      {
        "number": 17,
        "english": "How many line segment(s) is / are there in the figure below?",
        "translation": "Line segments: Đoạn thẳng; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm đoạn thẳng",
        "image": "./assets/papers/timo-grade2-national-04/q17.9b3cfcae3387.svg",
        "imageAlt": "Các đoạn xiên tạo phần tam giác, hai đoạn đi qua các giao điểm và tám điểm đánh dấu như ảnh"
      },
      {
        "number": 18,
        "english": "At least how many small square(s) can be seen if viewing the figure below from the right?",
        "translation": "Small squares: Hình vuông nhỏ; Viewing: Quan sát; Figure: Hình vẽ; The right: Bên phải.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quan sát và đếm khối lập phương",
        "image": "./assets/papers/timo-grade2-national-04/q18.892ce099c77d.svg",
        "imageAlt": "Cụm khối trắng xám với cột cao ở giữa phía sau, hai khối nhô trước trái và một khối nhô bên phải theo ảnh"
      },
      {
        "number": 19,
        "english": "How many interior angle(s) is / are there in the polygon below?",
        "translation": "Interior angles: Góc trong; Polygon: Đa giác.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm góc trong đa giác",
        "image": "./assets/papers/timo-grade2-national-04/q19.f3466a6cf1d3.svg",
        "imageAlt": "Đa giác có hai chỗ lõm phía trên, một góc nhô bên phải và bậc ở phía dưới theo ảnh"
      },
      {
        "number": 20,
        "english": "A prism has 18 vertices, how many face(s) does this prism have?",
        "translation": "Prism: Hình lăng trụ; Vertices: Đỉnh; Faces: Mặt.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đỉnh, cạnh và mặt của hình khối"
      },
      {
        "number": 21,
        "english": "What is the greatest 4-digit odd number composed of digits 0, 8, 5, 9 or 4? (Each digit can only be used once)",
        "translation": "Greatest: Lớn nhất; 4-digit odd number: Số lẻ có 4 chữ số; Composed of: Bao gồm; Digit: Chữ số; Once: Một lần.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lớn nhất và nhỏ nhất"
      },
      {
        "number": 22,
        "english": "Teacher has 17 pens. She wants to divide those pens between John and Bella so that each friend has at least 1 pen. In how many ways can she do that?",
        "translation": "Teacher: Cô giáo; Pens: Bút; Divide: Chia; At least: Ít nhất; Ways: Cách.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phân phối đồ vật vào các nhóm"
      },
      {
        "number": 23,
        "english": "Choose 4 digits, without repetition, from 2, 0, 5, 7, 1, 8 to form two 2-digit odd numbers. What is the minimum value of the difference?",
        "translation": "Choose: Chọn; Digits: Chữ số; Without repetition: Không lặp lại; 2-digit odd numbers: Số lẻ có 2 chữ số; Minimum value: Giá trị nhỏ nhất; Difference: Hiệu.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập hai số có hiệu nhỏ nhất"
      },
      {
        "number": 24,
        "english": "Natalie has 3 $1 coins, 4 $2 coins and 2 $5 coins, at most how many cup(s) can she buy for a cup that costs $4?",
        "translation": "Coins: Đồng xu; At most: Nhiều nhất; Cups: Cốc; Cost: Có giá.",
        "responseType": "text",
        "options": [],
        "subtopic": "Mua hàng theo số tiền có"
      },
      {
        "number": 25,
        "english": "According to the values of the following expressions, how many number(s) is / are between 30 and 50?",
        "translation": "Values: Giá trị; Expression: Biểu thức; Numbers: Số; Between: Ở giữa.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm kết quả theo điều kiện",
        "image": "./assets/papers/timo-grade2-national-04/q25.e1900d2b8c82.svg",
        "imageAlt": "Các phép tính99÷3;19+19;51−34;6×8;24+48;5×5;15+16"
      }
    ]
  },
  {
    "id": "timo-grade2-national-05",
    "title": "Đề quốc gia 05",
    "sourceTitle": "ĐỀ SỐ 5 — VÒNG QUỐC GIA TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề quốc gia",
    "questions": [
      {
        "number": 1,
        "english": "According to the pattern below, what is the English letter in the space?",
        "translation": "Pattern: Quy luật; English letter: Chữ cái tiếng Anh; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-05/q01.435a4936db27.svg",
        "imageAlt": "B, D, G, I, L, N, __"
      },
      {
        "number": 2,
        "english": "23 children form a column. There are 8 children behind Alice. How many child(ren) is / are in front of her?",
        "translation": "Column: Hàng dọc; Behind: Đằng sau; In front of: Đằng trước.",
        "responseType": "text",
        "options": [],
        "subtopic": "Bài toán vị trí trong hàng"
      },
      {
        "number": 3,
        "english": "When Edward was born, mum was 27 years old. Brother was born 1 year later. When mum is 46 years old, how old will brother be?",
        "translation": "Born: Sinh ra; Years old: Tuổi; Later: Sau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 4,
        "english": "What is the value of the number to represent “?” in the following table?",
        "translation": "Value: Giá trị; Represent: Biểu diễn; Table: Bảng.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật trong bảng số",
        "image": "./assets/papers/timo-grade2-national-05/q04.fd6756042c45.svg",
        "imageAlt": "Bảng bốn hàng1,2,2;3,4,12;5,6,30;7,8,dấu hỏi"
      },
      {
        "number": 5,
        "english": "According to the pattern below, how many # is / are there in the 6th Group?",
        "translation": "Pattern: Quy luật; 6th group: Nhóm thứ 6.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật sắp xếp hình",
        "image": "./assets/papers/timo-grade2-national-05/q05.19f50ae0a9ae.svg",
        "imageAlt": "Bốn lưới 2×2,4×4,6×6,8×8 với các dấu # tạo hai đường chéo và hàng cuối đúng ảnh"
      },
      {
        "number": 6,
        "english": "Find the value of 28 + 11 + 23 + 39 + 32 + 17.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Find the value of 6 × 23 + 6 × 38 + 6 × 56 − 6 × 18.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Find the value of 11 + 13 + 15 + 17 + 19 + 21 + 23 + 25.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "Find the value of 12 ÷ 5 + 9 ÷ 5 + 17 ÷ 5 − 3 ÷ 5.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 10,
        "english": "Find the value of 12 × 5 × 5 × 15 × 2.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 11,
        "english": "The numbers below follow the arithmetic sequence, what is the sum of the 6th number and the 9th number?",
        "translation": "Arithmetic sequence: Dãy số cách đều; Sum: Tổng; 6th number: Số thứ 6; 9th number: Số thứ 9.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số hạng trong dãy số",
        "image": "./assets/papers/timo-grade2-national-05/q11.02d14d77ec53.svg",
        "imageAlt": "99, 92, 85, 78, 71, …"
      },
      {
        "number": 12,
        "english": "Fill the lines with ‘+’ and ‘−’ to make the equation below correct. (Write down the complete equation on the answer sheet)",
        "translation": "Lines: Dòng kẻ; Equation: Phép tính; Correct: Đúng. (Lưu ý viết toàn bộ phép tính vào phiếu trả lời).",
        "responseType": "text",
        "options": [],
        "subtopic": "Điền dấu cộng và trừ",
        "image": "./assets/papers/timo-grade2-national-05/q12.c0b849a63619.svg",
        "imageAlt": "23 __ 7 __ 11 __ 3 = 22"
      },
      {
        "number": 13,
        "english": "Determine the result of 7 × 8 + 8 × 9 + 9 × 10 − 1 × 1 − 2 × 2 − 3 × 3 is odd or even.",
        "translation": "Determine: Xác định; Result: Kết quả; Odd: Lẻ; Even: Chẵn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 14,
        "english": "What is the smallest 3-digit number that can be divisible by 7 and 4?",
        "translation": "The smallest 3-digit number: Số nhỏ nhất có 3 chữ số; Divisible by: Chia hết cho.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số theo điều kiện"
      },
      {
        "number": 15,
        "english": "If A, B and C are 1-digit numbers, find the value of B + C.",
        "translation": "1-digit numbers: Các số có 1 chữ số; Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "image": "./assets/papers/timo-grade2-national-05/q15.f4934635345e.svg",
        "imageAlt": "Phép cộng dọc BA cộng CB bằng162"
      },
      {
        "number": 16,
        "english": "How many line segments are there in the figure below?",
        "translation": "Line segment: Đoạn thẳng; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm đoạn thẳng",
        "image": "./assets/papers/timo-grade2-national-05/q16.6639737e8dc2.svg",
        "imageAlt": "Đường gấp khúc hai đỉnh và một đoạn ngang qua bốn điểm giữa, các điểm đen theo ảnh"
      },
      {
        "number": 17,
        "english": "A prism has 27 edges, how many faces does this prism have?",
        "translation": "Prism: Hình lăng trụ; Edge: Cạnh; Faces: Mặt.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đỉnh, cạnh và mặt của hình khối"
      },
      {
        "number": 18,
        "english": "How many square(s) is / are there in the figure below?",
        "translation": "Square: Hình vuông; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm hình vuông",
        "image": "./assets/papers/timo-grade2-national-05/q18.19ee3a850497.svg",
        "imageAlt": "Các ô vuông xếp thành bậc từ phần trên trái xuống phần dưới phải theo ảnh"
      },
      {
        "number": 19,
        "english": "At least how many squares can be seen if viewing the figure below from top?",
        "translation": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From top: Từ phía trên.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quan sát và đếm khối lập phương",
        "image": "./assets/papers/timo-grade2-national-05/q19.8e2ef86e4a49.svg",
        "imageAlt": "Cụm khối nhỏ trắng xám, cột cao phía sau phải và hai khối nhô phía trước, quan sát từ trên theo ảnh"
      },
      {
        "number": 20,
        "english": "At most how many different triangle(s) can be formed by having 4 straight lines cut a circle?",
        "translation": "At most: Nhiều nhất; Different triangles: Các hình tam giác khác nhau; Formed: Được tạo ra; Straight lines: Đường thẳng; Cut: Cắt; Circle: Hình tròn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chia hình bằng đường thẳng"
      },
      {
        "number": 21,
        "english": "How many 3-digit number(s) having the unit digit that is larger than the hundreds digit is / are there?",
        "translation": "3-digit numbers: Số có 3 chữ số; Unit digit: Chữ số hàng đơn vị; Larger than: Lớn hơn; Hundreds digit: Chữ số hàng trăm.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm số theo quan hệ chữ số"
      },
      {
        "number": 22,
        "english": "According to the following answers, how many 2-digit numbers are there?",
        "translation": "Answers: Kết quả phép tính; 2-digit numbers: Số có 2 chữ số.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm kết quả theo điều kiện",
        "image": "./assets/papers/timo-grade2-national-05/q22.8b05e12dbeb4.svg",
        "imageAlt": "Các phép tính2×4;42÷7;36÷3;7×2;9×9;39÷3;72÷9"
      },
      {
        "number": 23,
        "english": "What is the greatest 4-digit odd number by using 0, 2, 4, 6 and 9? (Each digit can only be used once).",
        "translation": "The greatest 4-digit odd number: Số lẻ lớn nhất có 4 chữ số; Each digit can only be used once: Mỗi chữ số chỉ được dùng một lần.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lớn nhất và nhỏ nhất"
      },
      {
        "number": 24,
        "english": "There are 4 different flavors of ice-cream. Now mixing 3 types to make a 3-ball ice-cream. How many different type(s) of ice-cream is / are there? (Strawberry - vanilla - chocolate will be counted the same as strawberry - chocolate - vanilla).",
        "translation": "Different flavors: Các vị khác nhau; Mixing: Kết hợp; Different types of ice-cream: Các loại kem khác nhau; Counted the same: Được tính là giống nhau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chọn nhóm không phân biệt thứ tự"
      },
      {
        "number": 25,
        "english": "Choose 4 digits, without repetition, from 0, 1, 4, 5, 6 and 7 to form two 2-digit even numbers. What is the minimum value of the difference?",
        "translation": "Digits: Chữ số; Without repetition: Không lặp lại; 2-digit even numbers: Số chẵn có 2 chữ số; Minimum value of the difference: Hiệu nhỏ nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập hai số có hiệu nhỏ nhất"
      }
    ]
  },
  {
    "id": "timo-grade2-national-06",
    "title": "Đề quốc gia 06",
    "sourceTitle": "ĐỀ SỐ 6 — VÒNG QUỐC GIA TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề quốc gia",
    "questions": [
      {
        "number": 1,
        "english": "Alice wrote a 2-digit number on a piece of paper and asked Bobby to guess it.\nBobby asked: “Is the number 68?”\nAlice replied: “One of the digits is correct, the position of that digit is wrong.”\nBobby asked again: “Is the number 17?”\nAlice replied: “One of the digits is correct, the position of that digit is wrong.”\nBobby asked again: “Is the number 79?”\nAlice said: “One of the digits is correct, the position of that digit is correct.”\nWhat is the number written by Alice?",
        "translation": "2-digit number: Số có 2 chữ số; Digit: Chữ số; Number: Số; The position of that digit: Vị trí của chữ số đó; Correct: Đúng; Wrong: Sai.",
        "responseType": "text",
        "options": [],
        "subtopic": "Suy luận chữ số và vị trí"
      },
      {
        "number": 2,
        "english": "When Bruce was born, mum was 29 years old. When Bruce will be 28 years old, how old will mum be?",
        "translation": "Born: Sinh ra; Years old: Tuổi.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 3,
        "english": "According to the pattern shown below, what is the number in the blank?",
        "translation": "Pattern: Quy luật; Number: Số; Blank: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-06/q03.c45f7452a576.svg",
        "imageAlt": "12, 15, 21, 30, 42, 57, __"
      },
      {
        "number": 4,
        "english": "According to the pattern below, what is the English letter in the space?",
        "translation": "Pattern: Quy luật; English letter: Chữ cái tiếng Anh; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-06/q04.11f8a969885d.svg",
        "imageAlt": "P, M, J, G, __"
      },
      {
        "number": 5,
        "english": "According to the pattern below, how many ※ is / are there in the 7th Group?",
        "translation": "Pattern: Quy luật; 7th Group: Nhóm thứ 7.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật sắp xếp hình",
        "image": "./assets/papers/timo-grade2-national-06/q05.a80d78c09a3c.svg",
        "imageAlt": "Bốn hình dạng thoi tạo bởi các ô vuông, các ký hiệu ※ xen kẽ đúng vị trí trong ảnh"
      },
      {
        "number": 6,
        "english": "Find the value of 37 + 13 − 68 − 13 + 51.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Find the value of 24 + 62 + 16 + 29 + 8.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Find the value of 1 × 113 + 2 × 113 + 3 × 113 + 4 × 113.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "If A and B are both 1-digit numbers, find the value of B.",
        "translation": "1-digit number: Số có 1 chữ số; Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "image": "./assets/papers/timo-grade2-national-06/q09.3224f159759a.svg",
        "imageAlt": "Phép cộng dọc AA cộng AB bằng72"
      },
      {
        "number": 10,
        "english": "What is the number in the blank if the equation below is correct?",
        "translation": "Number: Số; Blank: Chỗ trống; Equation: Phép tính; Correct: Đúng.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số bị che trong phép tính",
        "image": "./assets/papers/timo-grade2-national-06/q10.e93b1845ff09.svg",
        "imageAlt": "Chỗ trống chia2 cộng9 bằng19"
      },
      {
        "number": 11,
        "english": "How many 2-digit even number(s) that is / are multiples of 3 is / are there?",
        "translation": "2-digit even number: Số chẵn có 2 chữ số; Multiple of 3: Bội của 3.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm số theo điều kiện"
      },
      {
        "number": 12,
        "english": "Fill the lines with ‘+’ and ‘−’ to make the equation below correct. (Write down the complete equation on the answer sheet)",
        "translation": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng; Write down the complete equation on the answer sheet: Viết phép tính hoàn chỉnh vào phiếu trả lời.",
        "responseType": "text",
        "options": [],
        "subtopic": "Điền dấu cộng và trừ",
        "image": "./assets/papers/timo-grade2-national-06/q12.e7a7327e1567.svg",
        "imageAlt": "15 __ 8 __ 6 __ 1 = 16"
      },
      {
        "number": 13,
        "english": "Fill the lines with ‘×’ and ‘+’ to make the equation below correct. (Write down the complete equation on the answer sheet)",
        "translation": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng; Write down the complete equation on the answer sheet: Viết phép tính hoàn chỉnh vào phiếu trả lời.",
        "responseType": "text",
        "options": [],
        "subtopic": "Điền dấu nhân và cộng",
        "image": "./assets/papers/timo-grade2-national-06/q13.eed3f7e4c7ea.svg",
        "imageAlt": "6 __ 4 __ 3 __ 2 = 29"
      },
      {
        "number": 14,
        "english": "If A is odd number, the result of A × (A + 1) × (A + 2) is odd or even?",
        "translation": "Odd: Lẻ; Determine: Xác định; Result: Kết quả; Even: Chẵn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 15,
        "english": "If A and B are both 1-digit numbers and C ≠ 0, find the value of A + B.",
        "translation": "1-digit number: Số có 1 chữ số; Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "image": "./assets/papers/timo-grade2-national-06/q15.f641b378befd.svg",
        "imageAlt": "Phép cộng dọc BA cộng AB bằngC87"
      },
      {
        "number": 16,
        "english": "According to the pattern below, what is the figure in the space (“__”)?",
        "translation": "Pattern: Quy luật; Figure: Hình vẽ; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy hình",
        "image": "./assets/papers/timo-grade2-national-06/q16.a2856d8ef542.svg",
        "imageAlt": "Dãy chấm tròn đặc, tam giác đặc, chấm tròn đặc, hình vuông rỗng và một chỗ trống theo ảnh"
      },
      {
        "number": 17,
        "english": "How many square(s) is / are there in the figure below?",
        "translation": "Square: Hình vuông; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm hình vuông",
        "image": "./assets/papers/timo-grade2-national-06/q17.c6b3f8b62cc1.svg",
        "imageAlt": "Lưới ô vuông có phần nhô trên phải và hai nhánh dưới, giữ từng ô như ảnh"
      },
      {
        "number": 18,
        "english": "The lengths of two sides for a triangle are 6cm and 10cm respectively and all length are integers. Find the maximum length of the other length.",
        "translation": "Length: Độ dài; Side: Cạnh; Triangle: Hình tam giác; Integer: Số nguyên; Maximum length: Độ dài lớn nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Độ dài các cạnh tam giác"
      },
      {
        "number": 19,
        "english": "At least how many squares can be seen if viewing the figure below from side?",
        "translation": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From side: Từ bên cạnh.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quan sát và đếm khối lập phương",
        "image": "./assets/papers/timo-grade2-national-06/q19.6c6d6b504881.svg",
        "imageAlt": "Khối trắng xám dạng hai cột cao nối bằng các khối đáy và hàng trước ba ô, theo góc nhìn bên cạnh của ảnh"
      },
      {
        "number": 20,
        "english": "At most how many pieces can be formed by using 4 lines to cut a circle?",
        "translation": "At most: Nhiều nhất; Pieces: Mảnh; Formed by: Tạo ra bởi; Line: Đường thẳng; Circle: Đường tròn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chia hình bằng đường thẳng"
      },
      {
        "number": 21,
        "english": "Choose 2 digits, without repetition, from 0, 3, 5, 7, 8 to form 2-digit numbers. Of these 2-digit numbers, how many of them are odd number?",
        "translation": "Digits: Chữ số; Without repetition: Không lặp lại; 2-digit numbers: Số có 2 chữ số; Odd number: Số lẻ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lẻ không lặp chữ số"
      },
      {
        "number": 22,
        "english": "What is the greatest 4-digit even number by using 0, 3, 5, 7 and 8? (Each digit can only be used once).",
        "translation": "Greatest: Lớn nhất; 4-digit even number: Số chẵn có 4 chữ số; Each digit can only be used once: Mỗi chữ số chỉ được sử dụng 1 lần.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lớn nhất và nhỏ nhất"
      },
      {
        "number": 23,
        "english": "Pick 3 from 9 competitors to get gold, silver, bronze reward. How many different combination(s) is / are there?",
        "translation": "Competitor: Vận động viên; Reward: Giải thưởng; Different combinations: Sự lựa chọn khác nhau.",
        "responseType": "text",
        "options": [],
        "subtopic": "Chọn và sắp xếp có thứ tự"
      },
      {
        "number": 24,
        "english": "Chris has ten $1 coins, nine $2 coins and three $5 coins, at most how many book(s) can he buy given that each book costs $4?",
        "translation": "Coin: Đồng xu; Each: Mỗi; At most: Nhiều nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Mua hàng theo số tiền có"
      },
      {
        "number": 25,
        "english": "Which number below is the greatest?",
        "translation": "Number: Số; Greatest: Lớn nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Sắp xếp số và xác định thứ hạng",
        "image": "./assets/papers/timo-grade2-national-06/q25.0ec5a6488fb1.svg",
        "imageAlt": "Các số20196951;20186421;2020345;20198462"
      }
    ]
  },
  {
    "id": "timo-grade2-national-07",
    "title": "Đề quốc gia 07",
    "sourceTitle": "ĐỀ SỐ 7 — VÒNG QUỐC GIA TIMO",
    "program": "TIMO",
    "subject": "Toán",
    "grade": "2",
    "mode": "Đề quốc gia",
    "questions": [
      {
        "number": 1,
        "english": "Amy’s father has 5 children, how many brothers and sisters does Amy have?",
        "translation": "Amy’s father: Bố của Amy; Brother: Anh/em trai; Sister: Chị/em gái.",
        "responseType": "text",
        "options": [],
        "subtopic": "Suy luận quan hệ gia đình"
      },
      {
        "number": 2,
        "english": "According to the pattern below, how many triangle(s) is / are there within the 26th symbol counting from the left?",
        "translation": "Pattern: Quy luật; Triangle: Hình tam giác; 26th symbol: Kí hiệu thứ 26; From the left: Từ bên trái.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật sắp xếp hình",
        "image": "./assets/papers/timo-grade2-national-07/q02.3897689dd7ea.svg",
        "imageAlt": "○ △ □ ○ △ □ ○ △ □ …"
      },
      {
        "number": 3,
        "english": "When Amy was born, mum was 34 years old. When Amy will be 15 years old, how old will mum be?",
        "translation": "Born: Sinh ra; Years old: Tuổi.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tuổi hiện tại và tương lai"
      },
      {
        "number": 4,
        "english": "In year 2018, how many month(s) is / are there with 31 days?",
        "translation": "Year: Năm; Month: Tháng; Day: Ngày.",
        "responseType": "text",
        "options": [],
        "subtopic": "Số ngày trong tháng"
      },
      {
        "number": 5,
        "english": "According to the pattern below, what is the English letter in the space?",
        "translation": "Pattern: Quy luật; English letter: Chữ cái tiếng Anh; Space: Chỗ trống.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quy luật dãy số",
        "image": "./assets/papers/timo-grade2-national-07/q05.df23974b5c4d.svg",
        "imageAlt": "A, E, I, M, __"
      },
      {
        "number": 6,
        "english": "Find the value of 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 7,
        "english": "Find the value of 17 × 11 + 17 × 3 − 17 × 4.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 8,
        "english": "Find the value of 2 − 5 + 8 − 11 + 14 − 17 + 20 − 23 + 26.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 9,
        "english": "Find the value of 1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1.",
        "translation": "Value: Giá trị.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm giá trị"
      },
      {
        "number": 10,
        "english": "A and B are both 1-digit numbers and A < B. What is the value of A + B?",
        "translation": "1-digit number: Số có 1 chữ số; Value: Giá trị; Equation: Phép tính.",
        "responseType": "text",
        "options": [],
        "subtopic": "Phép cộng với chữ số chưa biết",
        "image": "./assets/papers/timo-grade2-national-07/q10.e42be36add7c.svg",
        "imageAlt": "Phép cộng dọc B cộng AB bằng66"
      },
      {
        "number": 11,
        "english": "Determine the result of 3 + 7 + 11 + 15 + 19 + 23 + 27 + 31 is odd or even.",
        "translation": "Determine: Xác định; Result: Kết quả; Odd: Lẻ; Even: Chẵn.",
        "responseType": "text",
        "options": [],
        "subtopic": "Nhận biết kết quả chẵn"
      },
      {
        "number": 12,
        "english": "Fill the lines with ‘×’ and ‘−’ to make the equation below correct. (Write down the complete equation on the answer sheet).",
        "translation": "Line: Dòng kẻ; Equation: Phép tính; Correct: Đúng; Write down the complete equation on the answer sheet: Viết câu trả lời hoàn chỉnh vào phiếu trả lời.",
        "responseType": "text",
        "options": [],
        "subtopic": "Điền dấu nhân và trừ",
        "image": "./assets/papers/timo-grade2-national-07/q12.e89ee8a60e9b.svg",
        "imageAlt": "7 __ 4 __ 5 __ 3 = 13"
      },
      {
        "number": 13,
        "english": "The numbers below follow the arithmetic sequence, what is the 9th number?",
        "translation": "9th number: Số thứ 9; Arithmetic sequence: Dãy số cách đều.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số hạng trong dãy số",
        "image": "./assets/papers/timo-grade2-national-07/q13.5af46258f969.svg",
        "imageAlt": "12, 21, 30, 39, 48, …"
      },
      {
        "number": 14,
        "english": "How many 2-digit odd number(s) that is / are multiples of 3 is / are there?",
        "translation": "1-digit odd number: Số lẻ có 2 chữ số; Multiple of 3: Bội của 3.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm số theo điều kiện"
      },
      {
        "number": 15,
        "english": "What is the largest 2-digit number that can be divisible by 4 and 6?",
        "translation": "Largest 2-digit number: Số có 2 chữ số lớn nhất; Divisible by: Chia hết cho.",
        "responseType": "text",
        "options": [],
        "subtopic": "Tìm số theo điều kiện"
      },
      {
        "number": 16,
        "english": "How many squares are there in the figure below?",
        "translation": "Square: Hình vuông; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm hình vuông",
        "image": "./assets/papers/timo-grade2-national-07/q16.0a5c420360a8.svg",
        "imageAlt": "Lưới có hàng trên năm ô, hàng dưới bốn ô vuông"
      },
      {
        "number": 17,
        "english": "A prism has 8 vertices, how many face(s) does this prism have?",
        "translation": "Prism: Hình lăng trụ; Vertice: Đỉnh; Faces: Mặt.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đỉnh, cạnh và mặt của hình khối"
      },
      {
        "number": 18,
        "english": "It is known as the lengths of shorter sides for a right-angled triangle are 6cm and 8cm respectively. Find the length of the longest length.",
        "translation": "Length: Độ dài; Shorter side: Cạnh ngắn hơn; Right-angled triangle: Tam giác vuông; Longest length: Cạnh dài nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Độ dài các cạnh tam giác"
      },
      {
        "number": 19,
        "english": "At least how many squares can be seen if viewing the figure below from side?",
        "translation": "At least: Ít nhất; Square: Hình vuông; Figure: Hình vẽ; From side: Từ bên cạnh.",
        "responseType": "text",
        "options": [],
        "subtopic": "Quan sát và đếm khối lập phương",
        "image": "./assets/papers/timo-grade2-national-07/q19.b992898f1281.svg",
        "imageAlt": "Khối lập phương trắng, cột sau cao hai tầng và hai ô phía trước theo ảnh"
      },
      {
        "number": 20,
        "english": "How many line segment(s) is / are there in the figure below?",
        "translation": "Line segment: Đoạn thẳng; Figure: Hình vẽ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm đoạn thẳng",
        "image": "./assets/papers/timo-grade2-national-07/q20.da919878ee40.svg",
        "imageAlt": "Hai đoạn thẳng cắt nhau, một đường có ba điểm và đường kia có bốn điểm theo ảnh"
      },
      {
        "number": 21,
        "english": "According to the following answers, how many 2-digit numbers are there?",
        "translation": "Answer: Kết quả; 2-digit number: Số có 2 chữ số.",
        "responseType": "text",
        "options": [],
        "subtopic": "Đếm kết quả theo điều kiện",
        "image": "./assets/papers/timo-grade2-national-07/q21.e6cb48093e0b.svg",
        "imageAlt": "Chín biểu thức cộng trừ như ảnh"
      },
      {
        "number": 22,
        "english": "Choose 2 digits, without repetition, from 0, 3, 4, 5, 7 to form 2-digit numbers. Of these 2-digit numbers, how many of them are odd numbers?",
        "translation": "Digit: Chữ số; Without repetition: Không lặp lại; 2-digit numbers: Số có 2 chữ số; Odd number: Số lẻ.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lẻ không lặp chữ số"
      },
      {
        "number": 23,
        "english": "There are 2 ways from the market to the train station. There are 4 ways from the train station to the cinema. There are 3 ways from the cinema to the library. How many different way(s) is / are from the market to the library through the train station and cinema respectively?",
        "translation": "Way: Cách.",
        "responseType": "text",
        "options": [],
        "subtopic": "Có bao nhiêu cách kết hợp khác nhau?"
      },
      {
        "number": 24,
        "english": "What is the smallest 4-digit number by using 0, 2, 4, 6 and 8? (Each digit can only be used once).",
        "translation": "Smallest 4-digit number: Số có 4 chữ số nhỏ nhất; Each digit can only be used once: Mỗi chữ số chỉ được sử dụng một lần.",
        "responseType": "text",
        "options": [],
        "subtopic": "Lập số lớn nhất và nhỏ nhất"
      },
      {
        "number": 25,
        "english": "Peter has 6 $1 coins, 2 $2 coins and 4 $5 coins. At most how many souvenir(s) can he buy for a souvenir costed $6?",
        "translation": "Coin: Đồng xu; Souvenir: Quà lưu niệm; At most: Nhiều nhất.",
        "responseType": "text",
        "options": [],
        "subtopic": "Mua hàng theo số tiền có"
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
