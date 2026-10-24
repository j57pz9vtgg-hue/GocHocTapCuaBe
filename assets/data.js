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
