const programs = ['TIMO', 'ASMO', 'Báo bài của trường'];
const subjects = ['Toán', 'Tiếng Việt', 'Tiếng Anh'];
const modes = ['Đề vòng loại', 'Đề quốc gia', 'Luyện theo chủ đề'];
const topics = {
  Toán: ['Số và phép tính', 'Tư duy logic', 'Hình học'],
  'Tiếng Việt': ['Từ và câu', 'Đọc hiểu', 'Chính tả'],
  'Tiếng Anh': ['Vocabulary', 'Grammar', 'Reading'],
};
function getQuestions(subject, grade, mode, paper) {
  // Chỉ là câu hỏi minh họa. Đáp án/lời giải phải được chủ dự án cung cấp.
  if (subject === 'Toán') return [
    { text: '6 + 3 = ?', options: ['8', '9', '11', '14'] },
    { text: '9 + 4 = ?', options: ['12', '13', '15', '18'] },
    { text: '12 + 5 = ?', options: ['16', '17', '19', '22'] },
    { text: '15 + 6 = ?', options: ['20', '21', '23', '26'] },
    { text: '18 + 7 = ?', options: ['24', '25', '27', '30'] },
  ];
  if (subject === 'Tiếng Việt') return [
    { text: 'Từ nào chỉ hoạt động?', options: ['Xanh', 'Chạy', 'Bàn', 'Đẹp'] },
    { text: 'Từ trái nghĩa với “chăm chỉ” là gì?', options: ['Siêng năng', 'Cần cù', 'Lười biếng', 'Tốt bụng'] },
    { text: 'Câu hỏi kết thúc bằng dấu nào?', options: ['Dấu chấm', 'Dấu hỏi', 'Dấu phẩy', 'Dấu hai chấm'] },
    { text: 'Từ nào viết đúng chính tả?', options: ['Học xinh', 'Học sinh', 'Học syng', 'Học xynh'] },
    { text: 'Từ nào chỉ một đồ dùng học tập?', options: ['Bông hoa', 'Cái bút', 'Con mèo', 'Đám mây'] },
  ];
  return [
    { text: '“Quyển sách” trong tiếng Anh là gì?', options: ['Pen', 'Book', 'Chair', 'Cat'] },
    { text: 'Chọn từ đúng: I ___ a student.', options: ['is', 'are', 'am', 'be'] },
    { text: 'Màu xanh lá trong tiếng Anh là gì?', options: ['Red', 'Blue', 'Green', 'White'] },
    { text: 'Số nào là “five”?', options: ['3', '4', '5', '6'] },
    { text: 'Chọn lời chào phù hợp vào buổi sáng.', options: ['Good night', 'Good morning', 'Goodbye', 'Thank you'] },
  ];
}

// Names and structure approved as placeholders; do not invent TIMO lesson content or keys.
const timoTopicGroups = Array.from({ length: 5 }, (_, group) => ({
  id: `timo-group-${group + 1}`,
  name: `Chủ đề lớn ${String(group + 1).padStart(2, '0')}`,
  topics: Array.from({ length: 6 }, (_, topic) => ({
    id: `timo-topic-${group + 1}-${topic + 1}`,
    name: `Chủ đề nhỏ ${String(topic + 1).padStart(2, '0')}`,
  })),
}));
