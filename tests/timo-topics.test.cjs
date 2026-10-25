const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const sandbox = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/data.js'), 'utf8') + '\nglobalThis.data = { timoTopicGroups, buildTimoTopicGroups, getTimoPaperIssues };', sandbox);
const { timoTopicGroups, buildTimoTopicGroups, getTimoPaperIssues } = sandbox.data;
// Metadata-only fixtures: no exam content, answers or explanations are invented.
const paper = (id = 'qa-1', extra = {}) => ({id, title: id, program: 'TIMO', subject: 'Toán', grade: '2', mode: 'Đề vòng loại', questions: Array.from({length: 25}, (_, i) => ({number: i + 1})), ...extra});
const entries = groups => Array.from(groups).flatMap(group => Array.from(group.topics).flatMap(topic => Array.from(topic.entries)));
const numbers = topic => Array.from(topic.entries, entry => entry.number);

test('the five owner-provided names and question boundaries are exact', () => {
 const groups = buildTimoTopicGroups([paper()], '2');
 assert.deepEqual(Array.from(groups, group => group.name), ['Logical thinking / Tư duy lô-gic','Arithmetic / Số học','Number Theory / Lý thuyết số','Geometry / Hình học','Combinatorics / Tổ hợp']);
 assert.deepEqual(Array.from(groups, group => numbers(group.topics[0])), [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]);
 assert.ok(Array.from(groups).every(group => group.topics[0].name === 'Chưa phân loại'));
});
test('each new paper adds all 25 original questions once, without copying answer fields', () => {
 const a = paper('a'), b = paper('b', {mode: 'Đề quốc gia'});
 const groups = buildTimoTopicGroups([a, b], '2');
 assert.equal(entries(groups).length, 50);
 assert.equal(new Set(entries(groups).map(entry => entry.id)).size, 50);
 assert.strictEqual(groups[0].topics[0].entries[0].question, a.questions[0]);
 assert.strictEqual(groups[4].topics[0].entries[9].question, b.questions[24]);
 assert.ok(entries(groups).every(entry => !Object.hasOwn(entry.question, 'answer') && !Object.hasOwn(entry.question, 'explanation')));
 assert.deepEqual(numbers(groups[1].topics[0]), [6,7,8,9,10,6,7,8,9,10]);
});
test('only owner-provided subtopic names move questions out of the unclassified bucket', () => {
 const source = paper();source.questions[0].subtopic = 'Tên do chủ dự án cung cấp';source.questions[4].subtopic = 'Tên do chủ dự án cung cấp';
 const groups = buildTimoTopicGroups([source], '2');
 assert.deepEqual(numbers(groups[0].topics[0]), [2,3,4]);
 assert.equal(groups[0].topics[1].name, 'Tên do chủ dự án cung cấp');
 assert.deepEqual(numbers(groups[0].topics[1]), [1,5]);
 assert.equal(entries(groups).length, 25);
});
test('class, program and subject are isolated; empty groups retain an unclassified bucket', () => {
 const groups = buildTimoTopicGroups([paper('other-grade',{grade:'3'}),paper('other-program',{program:'ASMO'}),paper('other-subject',{subject:'Tiếng Anh'})], '2');
 assert.equal(entries(groups).length, 0);
 assert.ok(Array.from(groups).every(group => group.topics.length === 1 && group.topics[0].name === 'Chưa phân loại'));
});
test('explicit numbering is used even for shuffled input, without mutating the paper', () => {
 const source = paper();source.questions.reverse();const before = JSON.stringify(source);
 for (const question of source.questions) Object.freeze(question);
 Object.freeze(source.questions);Object.freeze(source);
 const groups = buildTimoTopicGroups([source], '2');
 assert.deepEqual(numbers(groups[0].topics[0]), [1,2,3,4,5]);
 assert.equal(JSON.stringify(source), before);
});
test('positional numbering is supported when numbers are not separately specified', () => {
 const source = paper();source.questions = source.questions.map(() => ({}));
 assert.equal(getTimoPaperIssues(source).length, 0);
 assert.deepEqual(numbers(buildTimoTopicGroups([source], '2')[4].topics[0]), [21,22,23,24,25]);
});
test('missing, duplicate and out-of-range numbering is reported instead of silently classified', () => {
 const duplicate = paper();duplicate.questions[24].number = 24;
 assert.ok(getTimoPaperIssues(duplicate).some(issue => issue.includes('Trùng câu 24')));
 assert.ok(getTimoPaperIssues(duplicate).some(issue => issue.includes('Thiếu câu 25')));
 const short = paper();short.questions.pop();assert.ok(getTimoPaperIssues(short).some(issue => issue.includes('đủ 25')));
 const outside = paper();outside.questions[0].number = 26;assert.ok(getTimoPaperIssues(outside).some(issue => issue.includes('từ 1 đến 25')));
 assert.equal(entries(buildTimoTopicGroups([duplicate,short,outside], '2')).length, 0);
});
test('rebuilding does not accumulate duplicates or mutate group definitions', () => {
 const source = paper();buildTimoTopicGroups([source], '2');const groups = buildTimoTopicGroups([source], '2');
 assert.equal(entries(groups).length, 25);
 assert.equal(entries(timoTopicGroups).length, 0);
});

test('owner practice group overrides preserve source numbers and share the original question', () => {
 const source = paper();
 source.questions[14].practiceTopicGroup = timoTopicGroups[1].id;
 source.questions[14].subtopic = 'Tên do chủ dự án cung cấp';
 source.questions[13].practiceTopicGroup = 'unknown-group';
 const before = JSON.stringify(source), groups = buildTimoTopicGroups([source], '2');
 assert.strictEqual(groups[1].topics[1].entries[0].question, source.questions[14]);
 assert.equal(groups[1].topics[1].entries[0].number, 15);
 assert.deepEqual(numbers(groups[2].topics[0]), [11,12,13,14]);
 assert.equal(entries(groups).length, 25);
 assert.equal(new Set(entries(groups).map(entry => entry.id)).size, 25);
 assert.equal(JSON.stringify(source), before);
});
