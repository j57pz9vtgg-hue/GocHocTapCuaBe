const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const context={document:{addEventListener(){}}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/data.js'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'../assets/school-reports.js'),'utf8')+'\nglobalThis.api={schoolReports,getSchoolReports,getSubjects,getModes,officialPapers,schoolExerciseWorksheets,schoolLessonContents,readSchoolExerciseDraft,schoolExerciseStorageKey};',context);const api=context.api;
test('removed weekly report has no lessons or selectable week for any subject',()=>{
 assert.equal(api.schoolReports.some(r=>r.start==='2026-10-26'),false);
 for(const subject of api.getSubjects('Báo bài của trường')){
  assert.equal(api.getSchoolReports('1',subject).length,1);
  assert.equal(api.getSchoolReports('1',subject,'','Báo bài tuần 26–30/10/2026').length,0);
 }
 assert.deepEqual(Array.from(api.getModes('Báo bài của trường','1')),['Báo bài tuần 19/10/2026 - 23/10/2026','Tất cả các tuần']);
 assert.deepEqual(Array.from(api.getSubjects('TIMO')),['Toán']);
 assert.equal(api.officialPapers.length,14);
 assert.equal(api.officialPapers.reduce((n,p)=>n+p.questions.length,0),350);
});

test('Vietnamese Monday lesson matches the provided image remains unchanged',()=>{const rows=api.getSchoolReports('1','Tiếng Việt')[0].entries;assert.equal(rows.length,6);assert.equal(rows[0].date,'2026-10-19');assert.equal(rows[0].day,'Thứ Hai');assert.equal(rows[0].title,'Bài 36: om ôm ơm');assert.equal(rows[0].periods,'8,9');assert.equal(rows[0].preparation[0],'Đọc SGK tr.84-85');});

test('other subjects use the same table and only supplied Monday lessons are added',()=>{
 for(const report of api.schoolReports)assert.equal(report.layout,'table');
 assert.equal(api.getSchoolReports('1','Toán')[0].entries[0].title,'Bài 10: Phép cộng trong phạm vi 10 (T.1)');
 const science=api.getSchoolReports('1','SCIENCE')[0].entries[0];assert.equal(science.title,'2.3 Changing Speed');assert.equal(science.links[0].url,'https://wordwall.net/resource/99907940');
 assert.equal(api.getSchoolReports('1','ESL')[0].entries[0].title,'3.4 - Describing ongoing actions');
 assert.equal(api.getSchoolReports('1','GLOBAL')[0].entries.length,1);
 assert.equal(api.schoolReports.flatMap(r=>r.entries).length,20);
});

test('owner Vietnamese worksheet is attached only to the matching lesson without invented keys',()=>{
 const sheets=api.schoolExerciseWorksheets;assert.deepEqual(Object.keys(sheets),['tieng-viet-2026-10-23']);
 const w=sheets['tieng-viet-2026-10-23'];assert.deepEqual(Array.from(w.sounds),['om','ôm','ơm','em','êm','im','um','ai','ay','ây','oi','ôi','ơi']);
 assert.equal(w.blanks.length,4);assert.equal(w.choices.length,2);assert.equal(w.reading.length,2);
 assert.equal(w.words[1][4],'chum');assert.equal(w.phrases[0][3],'gối xôi');
 assert.equal(w.choices[1][0],'Hải và Hà đi máy bay.');assert.equal('answer' in w,false);assert.equal('answers' in w,false);
});

test('Tuesday report joins split ESL pages and adds four source lessons without exercises',()=>{
 const rows=api.schoolReports.flatMap(r=>r.entries).filter(e=>e.date==='2026-10-20');assert.equal(rows.length,4);assert.ok(rows.every(e=>e.day==='Thứ Ba'));
 const math=rows.find(e=>e.subject==='MATHEMATICS');assert.equal(math.title,'4.1 Carroll diagrams and tally charts');assert.deepEqual(Array.from(math.preparation),['LB Page: 70-77','WB Page: 72-77']);assert.equal(math.sections[2].lines.length,3);
 const esl=rows.find(e=>e.subject==='ESL');assert.ok(esl.sections[0].lines[1].includes('guessing game'));assert.equal(esl.sections[2].heading,'Grammar');
 assert.equal(rows.find(e=>e.subject==='Toán').title,'Bài 10: Phép cộng trong phạm vi 10 (T.2)');
 assert.equal(rows.find(e=>e.subject==='Tiếng Việt').title,'Bài 37: em êm im um');assert.equal(rows.find(e=>e.subject==='Tiếng Việt').preparation[0],'Đọc SGK tr.86-87');
 for(const row of rows)assert.equal(api.schoolExerciseWorksheets[row.id],undefined);
});

test('remaining three days preserve all supplied subjects, split-page content and preparation',()=>{
 const all=api.schoolReports.flatMap(r=>r.entries);assert.equal(new Set(all.map(e=>e.id)).size,20);
 for(const [date,count] of [['2026-10-21',5],['2026-10-22',4],['2026-10-23',3]])assert.equal(all.filter(e=>e.date===date).length,count);
 const birds=all.find(e=>e.id==='esl-2026-10-21');assert.ok(birds.sections[2].lines[0].endsWith('quantifiers.'));
 const friday=all.find(e=>e.id==='science-2026-10-23');assert.equal(friday.links[0].url,'https://wordwall.net/resource/99907940');assert.ok(friday.sections[1].lines[0].includes('speed up'));
 assert.equal(all.find(e=>e.id==='tieng-viet-2026-10-22').sections[0].lines[0],'Bài 40: Kể chuyện: Hai người bạn và con gấu');
 assert.equal(all.find(e=>e.id==='global-2026-10-23').preparation[0],'LB: 46-49');
 assert.equal(all.find(e=>e.id==='tieng-viet-2026-10-23').title,'Thực hành');
 for(const r of api.schoolReports)assert.ok(r.entries.every(e=>e.subject===r.subject));
 assert.deepEqual(Object.keys(api.schoolExerciseWorksheets),['tieng-viet-2026-10-23']);
});

test('Lesson36 matches the two supplied textbook pages without invented explanations or exercises',()=>{
 const lessons=api.schoolLessonContents;assert.deepEqual(Object.keys(lessons),['tieng-viet-2026-10-19','tieng-viet-2026-10-20','tieng-viet-2026-10-21-a','tieng-viet-2026-10-21-b']);const l=lessons['tieng-viet-2026-10-19'];
 assert.equal(l.recognition,'Hương cốm thơm thôn xóm.');assert.equal(l.blend.word,'xóm');assert.equal(l.words.length,6);assert.deepEqual(Array.from(l.pictureWords),['đom đóm','chó đốm','mâm cơm']);
 assert.equal(l.reading.join(' '),'Hôm qua, cô Mơ ở xóm Hạ đến thăm nhà Hà. Cô cho Hà giỏ cam. Hà chọn quả cam to phần bố. Mẹ khen và thơm lên má Hà.');assert.equal(l.speaking,'Xin lỗi');assert.equal(l.writing[1],'chó đốm mâm cơm');assert.equal('answers' in l,false);
});

test('moving the worksheet copies saved answers once and preserves subsequent Friday edits',()=>{
 const values=new Map(),old=api.schoolExerciseStorageKey('tieng-viet-2026-10-19'),next=api.schoolExerciseStorageKey('tieng-viet-2026-10-23');
 context.localStorage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
 const original={blanks:['ai','','ay',''],choices:[false,true,true,false]};values.set(old,JSON.stringify(original));
 assert.deepEqual(JSON.parse(JSON.stringify(api.readSchoolExerciseDraft('tieng-viet-2026-10-23'))),original);assert.equal(values.get(next),values.get(old));
 values.set(next,JSON.stringify({blanks:['mới'],choices:[]}));assert.equal(api.readSchoolExerciseDraft('tieng-viet-2026-10-23').blanks[0],'mới');assert.equal(values.get(old),JSON.stringify(original));
 assert.equal(api.schoolExerciseWorksheets['tieng-viet-2026-10-19'],undefined);assert.ok(api.schoolLessonContents['tieng-viet-2026-10-19']);
});

test('Lesson37 preserves both supplied pages and two helping-friends illustrations',()=>{
 const l=api.schoolLessonContents['tieng-viet-2026-10-20'];assert.equal(l.number,37);assert.equal(l.pages,'86–87');assert.deepEqual(Array.from(l.sounds),['em','êm','im','um']);assert.equal(l.blend.word,'đếm');assert.equal(l.words.length,8);
 assert.deepEqual(Array.from(l.pictureWords),['tem thư','thềm nhà','tủm tỉm']);assert.equal(l.writing[1],'thềm nhà tủm tỉm');assert.ok(l.reading.join(' ').includes('đem cho nó túm rơm.'));assert.equal(l.speaking,'Giúp bạn');assert.equal(l.speakingImages.length,2);assert.equal(l.artLabels.length,7);assert.equal(api.schoolExerciseWorksheets['tieng-viet-2026-10-20'],undefined);
});

test('Lesson38 follows pages88–89, including the fawn and hedgehog reading',()=>{
 const l=api.schoolLessonContents['tieng-viet-2026-10-21-a'];assert.equal(l.number,38);assert.equal(l.pages,'88–89');assert.deepEqual(Array.from(l.sounds),['ai','ay','ây']);assert.equal(l.recognition,'Hai bạn thi nhảy dây.');assert.equal(l.blend.word,'hai');assert.equal(l.words[2],'nảy');assert.deepEqual(Array.from(l.pictureWords),['chùm vải','máy cày','đám mây']);assert.equal(l.writing[1],'chùm vải đám mây');assert.ok(l.reading.join(' ').includes('Bạn nhím đấy, con ạ'));assert.equal(l.speaking,'Xin lỗi');assert.equal(l.artLabels.length,6);
});

test('Lesson39 joins pages90–91 and preserves the mother and daughter dialogue',()=>{
 const l=api.schoolLessonContents['tieng-viet-2026-10-21-b'];assert.equal(l.number,39);assert.equal(l.pages,'90–91');assert.deepEqual(Array.from(l.sounds),['oi','ôi','ơi']);assert.equal(l.recognition,'Voi con mời bạn đi xem hội.');assert.equal(l.blend.word,'voi');assert.deepEqual(Array.from(l.pictureWords),['chim bói cá','thổi còi','đồ chơi']);assert.equal(l.writing[1],'thổi còi đồ chơi');assert.equal(l.reading[3],'– Lớn lên, con vẫn là con gái nhỏ của mẹ.');assert.equal(l.speaking,'Xe của mẹ và xe của bé');assert.equal(l.artLabels.length,6);
});
