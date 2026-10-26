const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const context={document:{addEventListener(){}}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/data.js'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'../assets/school-reports.js'),'utf8')+'\nglobalThis.api={schoolReports,getSchoolReports,getSubjects,getModes,officialPapers};',context);const api=context.api;
test('removed weekly report has no lessons or selectable week for any subject',()=>{
 assert.equal(api.schoolReports.some(r=>r.start==='2026-10-26'),false);
 for(const subject of api.getSubjects('Báo bài của trường')){
  assert.equal(api.getSchoolReports('1',subject).length,subject==='Tiếng Việt'?1:0);
  assert.equal(api.getSchoolReports('1',subject,'','Báo bài tuần 26–30/10/2026').length,0);
 }
 assert.deepEqual(Array.from(api.getModes('Báo bài của trường','1')),['Báo bài tuần 19/10/2026 - 23/10/2026','Tất cả các tuần']);
 assert.deepEqual(Array.from(api.getSubjects('TIMO')),['Toán']);
 assert.equal(api.officialPapers.length,14);
 assert.equal(api.officialPapers.reduce((n,p)=>n+p.questions.length,0),350);
});

test('Vietnamese Monday lesson matches the provided image and no other subjects are imported',()=>{const rows=api.getSchoolReports('1','Tiếng Việt')[0].entries;assert.equal(rows.length,1);assert.equal(rows[0].date,'2026-10-19');assert.equal(rows[0].day,'Thứ Hai');assert.equal(rows[0].title,'Bài 36: om ôm ơm');assert.equal(rows[0].periods,'8,9');assert.equal(rows[0].preparation[0],'Đọc SGK tr.84-85');});
