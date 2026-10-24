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
        "subtopic": "Cộng nhiều số"
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
        "subtopic": "Biểu thức cộng trừ liên tiếp"
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
        "subtopic": "Quan sát khối từ phía trước",
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
        "subtopic": "Đếm khối lập phương xếp chồng",
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
        "subtopic": "Phối hợp lựa chọn",
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
        topic = { id: `${group.id}-named-${encodeURIComponent(name)}`, name, entries: [] };
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
