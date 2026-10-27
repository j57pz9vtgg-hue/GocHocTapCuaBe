const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const context={document:{addEventListener(){}}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/data.js'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'../assets/school-reports.js'),'utf8')+'\nglobalThis.api={schoolReports,getSchoolReports,getSubjects,getModes,officialPapers,schoolExerciseWorksheets,schoolLessonContents,readSchoolExerciseDraft,schoolExerciseStorageKey,schoolGeneralActivities,getSchoolReportEntries};',context);const api=context.api;
const oldWeek='Báo bài tuần 19/10/2026 - 23/10/2026',newWeek='Báo bài tuần 26/10/2026 - 30/10/2026',oldReports=(grade,subject)=>api.getSchoolReports(grade,subject,'',oldWeek);
test('Vietnamese Monday lesson matches the provided image remains unchanged',()=>{const rows=oldReports('1','Tiếng Việt')[0].entries;assert.equal(rows.length,6);assert.equal(rows[0].date,'2026-10-19');assert.equal(rows[0].day,'Thứ Hai');assert.equal(rows[0].title,'Bài 36: om ôm ơm');assert.equal(rows[0].periods,'8,9');assert.equal(rows[0].preparation[0],'Đọc SGK tr.84-85');});

test('other subjects use the same table and only supplied Monday lessons are added',()=>{
 for(const report of api.schoolReports)assert.equal(report.layout,'table');
 assert.equal(oldReports('1','Toán')[0].entries[0].title,'Bài 10: Phép cộng trong phạm vi 10 (T.1)');
 const science=oldReports('1','SCIENCE')[0].entries[0];assert.equal(science.title,'2.3 Changing Speed');assert.equal(science.links[0].url,'https://wordwall.net/resource/99907940');
 assert.equal(oldReports('1','ESL')[0].entries[0].title,'3.4 - Describing ongoing actions');
 assert.equal(oldReports('1','GLOBAL')[0].entries.length,1);
 assert.equal(api.schoolReports.filter(r=>r.start==='2026-10-19').flatMap(r=>r.entries).length,20);
});

test('owner Vietnamese worksheet is attached only to the matching lesson without invented keys',()=>{
 const sheets=api.schoolExerciseWorksheets;assert.deepEqual(Object.keys(sheets),['tieng-viet-2026-10-23']);
 const w=sheets['tieng-viet-2026-10-23'];assert.deepEqual(Array.from(w.sounds),['om','ôm','ơm','em','êm','im','um','ai','ay','ây','oi','ôi','ơi']);
 assert.equal(w.blanks.length,4);assert.equal(w.choices.length,2);assert.equal(w.reading.length,2);
 assert.equal(w.words[1][4],'chum');assert.equal(w.phrases[0][3],'gối xôi');
 assert.equal(w.choices[1][0],'Hải và Hà đi máy bay.');assert.equal('answer' in w,false);assert.equal('answers' in w,false);
});

test('Tuesday report joins split ESL pages and adds four source lessons without exercises',()=>{
 const rows=api.schoolReports.filter(r=>r.start==='2026-10-19').flatMap(r=>r.entries).filter(e=>e.date==='2026-10-20');assert.equal(rows.length,4);assert.ok(rows.every(e=>e.day==='Thứ Ba'));
 const math=rows.find(e=>e.subject==='MATHEMATICS');assert.equal(math.title,'4.1 Carroll diagrams and tally charts');assert.deepEqual(Array.from(math.preparation),['LB Page: 70-77','WB Page: 72-77']);assert.equal(math.sections[2].lines.length,3);
 const esl=rows.find(e=>e.subject==='ESL');assert.ok(esl.sections[0].lines[1].includes('guessing game'));assert.equal(esl.sections[2].heading,'Grammar');
 assert.equal(rows.find(e=>e.subject==='Toán').title,'Bài 10: Phép cộng trong phạm vi 10 (T.2)');
 assert.equal(rows.find(e=>e.subject==='Tiếng Việt').title,'Bài 37: em êm im um');assert.equal(rows.find(e=>e.subject==='Tiếng Việt').preparation[0],'Đọc SGK tr.86-87');
 for(const row of rows)assert.equal(api.schoolExerciseWorksheets[row.id],undefined);
});

test('remaining three days preserve all supplied subjects, split-page content and preparation',()=>{
 const all=api.schoolReports.filter(r=>r.start==='2026-10-19').flatMap(r=>r.entries);assert.equal(new Set(all.map(e=>e.id)).size,20);
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
 const lessons=api.schoolLessonContents;assert.deepEqual(Object.keys(lessons),['tieng-viet-2026-10-19','tieng-viet-2026-10-20','tieng-viet-2026-10-21-a','tieng-viet-2026-10-21-b','tieng-viet-2026-10-22']);const l=lessons['tieng-viet-2026-10-19'];
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

test('Lesson40 keeps review text and all four supplied story questions without inventing answers',()=>{
 const l=api.schoolLessonContents['tieng-viet-2026-10-22'];assert.equal(l.kind,'review');assert.equal(l.pages,'92–93');assert.equal(l.reviewWords.flat().length,13);assert.equal(l.flowerWords.length,10);assert.equal(l.writing,'Voi con có vòi dài.');assert.equal(l.storyTitle,'Hai người bạn và con gấu');assert.equal(l.storyQuestions.length,4);assert.equal(l.storyQuestions[2],'Vì sao con gấu bỏ đi?');assert.ok(l.reading.endsWith('Cả hai quay lại, ăn đến no nê.'));assert.equal('answers' in l,false);assert.equal(api.schoolExerciseWorksheets['tieng-viet-2026-10-22'],undefined);
});

test('newly supplied October26–30 week coexists with the original week and is selected independently',()=>{
 assert.equal(api.schoolReports.length,12);assert.deepEqual(Array.from(api.getModes('Báo bài của trường','1')),[newWeek,oldWeek,'Tất cả các tuần']);assert.deepEqual(Array.from(api.getModes('Báo bài của trường','2')),['Tất cả các tuần']);
 for(const [subject,count] of [['Toán',3],['Tiếng Việt',5],['SCIENCE',2],['GLOBAL',1],['ESL',4],['MATHEMATICS',3]]){
  const result=api.getSchoolReports('1',subject,'',newWeek);assert.equal(result.length,1);assert.equal(result[0].entries.length,count);assert.ok(result[0].entries.every(e=>e.subject===subject&&e.date>='2026-10-26'&&e.date<='2026-10-30'));assert.equal(api.getSchoolReports('1',subject).length,2);
 }
 const all=api.schoolReports.flatMap(r=>r.entries);assert.equal(all.length,38);assert.equal(new Set(all.map(e=>e.id)).size,38);assert.equal(api.officialPapers.length,14);assert.equal(api.officialPapers.reduce((n,p)=>n+p.questions.length,0),350);
});
test('new report preserves tests, split-page feelings vocabulary and the newly supplied Halloween preparation',()=>{
 const all=api.schoolReports.filter(r=>r.start==='2026-10-26').flatMap(r=>r.entries);
 assert.equal(all.find(e=>e.id==='science-2026-10-28').title,'UNIT TEST 2 - OCTOBER 28, 2026');assert.equal(all.find(e=>e.id==='esl-2026-10-29').title,'UNIT 3 TEST');
 assert.equal(all.find(e=>e.id==='science-2026-10-26').links[0].url,'https://wordwall.net/resource/102902774');assert.ok(all.find(e=>e.id==='esl-2026-10-27').sections[1].lines[0].includes('Happy, unhappy, angry, confused, excited'));
 assert.equal(all.find(e=>e.id==='tieng-viet-2026-10-29').sections[0].lines[0],'Bài 45: Kể chuyện: Sự tích hoa cúc trắng');
 const events=all.filter(e=>e.kind==='event');assert.equal(events.length,0);assert.equal(api.schoolGeneralActivities.length,1);assert.equal(api.schoolGeneralActivities[0].preparation[1],'Mang theo 1 giỏ/túi đựng kẹo để tham gia hoạt động Trick or Treat.');assert.equal('subject' in api.schoolGeneralActivities[0],false);
 for(const e of all){assert.equal(api.schoolLessonContents[e.id],undefined);assert.equal(api.schoolExerciseWorksheets[e.id],undefined);}
 assert.deepEqual(Object.keys(api.schoolExerciseWorksheets),['tieng-viet-2026-10-23']);
});

test('all-weeks lessons are ordered oldest first and same-day lessons by their first period without mutating source',()=>{
 const before=JSON.stringify(api.schoolReports);
 for(const subject of api.getSubjects('Báo bài của trường')){
  const rows=Array.from(api.getSchoolReportEntries('1',subject));
  for(let i=1;i<rows.length;i++){assert.ok(rows[i-1].date<=rows[i].date);if(rows[i-1].date===rows[i].date)assert.ok(parseInt(rows[i-1].periods,10)<=parseInt(rows[i].periods,10));}
  assert.ok(rows.every(e=>e.subject===subject&&!e.title.includes('HALLOWEEN')));
 }
 const vietnamese=Array.from(api.getSchoolReportEntries('1','Tiếng Việt'));assert.equal(vietnamese[0].id,'tieng-viet-2026-10-19');assert.equal(vietnamese.at(-1).id,'tieng-viet-2026-10-29');assert.ok(vietnamese.findIndex(e=>e.id==='tieng-viet-2026-10-21-a')<vietnamese.findIndex(e=>e.id==='tieng-viet-2026-10-21-b'));
 assert.equal(JSON.stringify(api.schoolReports),before);assert.equal(api.getSchoolReportEntries('1','Tiếng Việt','Halloween').length,0);assert.equal(api.getSchoolReportEntries('2','Tiếng Việt').length,0);
});

test('participating in festivals is excluded even when supplied inside a named subject row',()=>{
 const report=api.schoolReports.find(r=>r.subject==='Tiếng Việt'&&r.start==='2026-10-26');
 const entry={id:'qa-festival',date:'2026-10-30',day:'Thứ Sáu',periods:'7,8',subject:'Tiếng Việt',title:'HS THAM GIA LỄ HỘI HALLOWEEN',sections:[],preparation:[]};
 report.entries.push(entry);
 try{
  for(const week of [newWeek,'Tất cả các tuần']){
   assert.ok(api.getSchoolReportEntries('1','Tiếng Việt','',week).every(e=>e.id!==entry.id));
   assert.equal(api.getSchoolReportEntries('1','Tiếng Việt','Halloween',week).length,0);
  }
 }finally{report.entries.pop();}
});
