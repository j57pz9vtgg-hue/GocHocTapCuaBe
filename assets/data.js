const programs = ['TIMO', 'ASMO', 'Báo bài của trường'];
const subjects = ['Toán', 'Tiếng Việt', 'Tiếng Anh'];
const modes = ['Đề vòng loại', 'Đề quốc gia', 'Luyện theo chủ đề'];
const topics = {
  Toán: ['Số và phép tính', 'Tư duy logic', 'Hình học'],
  'Tiếng Việt': ['Từ và câu', 'Đọc hiểu', 'Chính tả'],
  'Tiếng Anh': ['Vocabulary', 'Grammar', 'Reading'],
};
function getQuestions(subject, grade, mode, paper) {
  const n = Number(grade), harder = mode === 'Đề quốc gia' ? 3 : 0;
  if (subject === 'Toán') return Array.from({length: 5}, (_, i) => {
    const a = n * (i + 2) + paper + harder, b = i + n;
    return { text: `${a} + ${b} = ?`, options: [a + b - 1, a + b, a + b + 2, a + b + 5].map(String), answer: 1, explanation: `${a} cộng ${b} bằng ${a + b}.` };
  });
  if (subject === 'Tiếng Việt') return [
    { text: 'Từ nào chỉ hoạt động?', options: ['Xanh', 'Chạy', 'Bàn', 'Đẹp'], answer: 1, explanation: '“Chạy” là từ chỉ hoạt động.' },
    { text: 'Từ trái nghĩa với “chăm chỉ” là gì?', options: ['Siêng năng', 'Cần cù', 'Lười biếng', 'Tốt bụng'], answer: 2, explanation: '“Lười biếng” có nghĩa trái ngược với “chăm chỉ”.' },
    { text: 'Câu hỏi kết thúc bằng dấu nào?', options: ['Dấu chấm', 'Dấu hỏi', 'Dấu phẩy', 'Dấu hai chấm'], answer: 1, explanation: 'Dấu hỏi dùng để kết thúc câu hỏi.' },
    { text: 'Từ nào viết đúng chính tả?', options: ['Học xinh', 'Học sinh', 'Học syng', 'Học xynh'], answer: 1, explanation: '“Học sinh” là cách viết đúng.' },
    { text: 'Từ nào chỉ một đồ dùng học tập?', options: ['Bông hoa', 'Cái bút', 'Con mèo', 'Đám mây'], answer: 1, explanation: 'Cái bút là đồ dùng học tập.' },
  ];
  return [
    { text: '“Quyển sách” trong tiếng Anh là gì?', options: ['Pen', 'Book', 'Chair', 'Cat'], answer: 1, explanation: 'Book có nghĩa là quyển sách.' },
    { text: 'Chọn từ đúng: I ___ a student.', options: ['is', 'are', 'am', 'be'], answer: 2, explanation: 'Chủ ngữ I đi với am.' },
    { text: 'Màu xanh lá trong tiếng Anh là gì?', options: ['Red', 'Blue', 'Green', 'White'], answer: 2, explanation: 'Green có nghĩa là màu xanh lá.' },
    { text: 'Số nào là “five”?', options: ['3', '4', '5', '6'], answer: 2, explanation: 'Five là số 5.' },
    { text: 'Chọn lời chào phù hợp vào buổi sáng.', options: ['Good night', 'Good morning', 'Goodbye', 'Thank you'], answer: 1, explanation: 'Good morning là lời chào buổi sáng.' },
  ];
}
