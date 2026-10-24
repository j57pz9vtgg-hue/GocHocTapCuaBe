const programs = ['TIMO', 'ASMO', 'Báo bài của trường'];
const subjects = ['Toán', 'Tiếng Việt', 'Tiếng Anh'];
const modes = ['Đề vòng loại', 'Đề quốc gia', 'Luyện theo chủ đề'];

function getSubjects(program) {
  return program === 'TIMO' ? ['Toán'] : subjects;
}

// Only add official papers and answer keys supplied by the project owner.
// Each paper needs a stable id, program, subject, grade, mode, title and questions.
const officialPapers = [];
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

// Preserve the approved five-group structure; names/content will be supplied by the owner.
const timoTopicGroups = Array.from({ length: 5 }, (_, group) => ({
  id: `timo-group-${group + 1}`,
  name: `Chủ đề lớn ${String(group + 1).padStart(2, '0')}`,
  topics: [],
}));
