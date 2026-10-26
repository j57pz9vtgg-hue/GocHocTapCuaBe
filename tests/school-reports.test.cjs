const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const context={document:{addEventListener(){}}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/data.js'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'../assets/school-reports.js'),'utf8')+'\nglobalThis.api={schoolReports,getSchoolReports,getSubjects,getModes,officialPapers,schoolExerciseWorksheets};',context);const api=context.api;
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

test('Vietnamese Monday lesson matches the provided image remains unchanged',()=>{const rows=api.getSchoolReports('1','Tiếng Việt')[0].entries;assert.equal(rows.length,1);assert.equal(rows[0].date,'2026-10-19');assert.equal(rows[0].day,'Thứ Hai');assert.equal(rows[0].title,'Bài 36: om ôm ơm');assert.equal(rows[0].periods,'8,9');assert.equal(rows[0].preparation[0],'Đọc SGK tr.84-85');});

test('other subjects use the same table and only supplied Monday lessons are added',()=>{
 for(const report of api.schoolReports)assert.equal(report.layout,'table');
 assert.equal(api.getSchoolReports('1','Toán')[0].entries[0].title,'Bài 10: Phép cộng trong phạm vi 10 (T.1)');
 const science=api.getSchoolReports('1','SCIENCE')[0].entries[0];assert.equal(science.title,'2.3 Changing Speed');assert.equal(science.links[0].url,'https://wordwall.net/resource/99907940');
 assert.equal(api.getSchoolReports('1','ESL')[0].entries[0].title,'3.4 - Describing ongoing actions');
 for(const subject of ['GLOBAL','MATHEMATICS'])assert.equal(api.getSchoolReports('1',subject)[0].entries.length,0);
 assert.equal(api.schoolReports.flatMap(r=>r.entries).length,4);
});

test('owner Vietnamese worksheet is attached only to the matching lesson without invented keys',()=>{
 const sheets=api.schoolExerciseWorksheets;assert.deepEqual(Object.keys(sheets),['tieng-viet-2026-10-19']);
 const w=sheets['tieng-viet-2026-10-19'];assert.deepEqual(Array.from(w.sounds),['om','ôm','ơm','em','êm','im','um','ai','ay','ây','oi','ôi','ơi']);
 assert.equal(w.blanks.length,4);assert.equal(w.choices.length,2);assert.equal(w.reading.length,2);
 assert.equal(w.words[1][4],'chum');assert.equal(w.phrases[0][3],'gối xôi');
 assert.equal(w.choices[1][0],'Hải và Hà đi máy bay.');assert.equal('answer' in w,false);assert.equal('answers' in w,false);
});
