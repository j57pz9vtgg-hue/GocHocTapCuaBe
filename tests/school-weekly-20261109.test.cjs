'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const C=require('../assets/sync-core.js');
const id='tieng-viet-week-2026-11-09',oldId='tieng-viet-2026-10-23',week='Báo bài tuần 09/11/2026 - 13/11/2026';
const plain=value=>JSON.parse(JSON.stringify(value));
function load(){
 const context={document:{addEventListener(){}},schoolMathWorksheets:{},window:{}};
 vm.createContext(context);
 for(const name of ['data','school-reports'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/'+name+'.js'),'utf8'),context);
 const cloud=fs.readFileSync(path.join(__dirname,'../assets/cloud-sync.js'),'utf8');
 vm.runInContext(cloud.slice(cloud.indexOf(' function accepts('),cloud.indexOf(' function recovery('))+';globalThis.api={accepts,schoolReports,getSchoolReports,getSchoolReportEntries,schoolExerciseWorksheets,schoolLessonContents,schoolExerciseStorageKey,readSchoolExerciseDraft,saveSchoolExerciseDraft};',context);
 return {context,...context.api};
}
test('November9-13 Vietnamese materials form one Grade1 weekly entry without inventing a daily timetable',()=>{
 const a=load(),reports=a.getSchoolReports('1','Tiếng Việt','',week);
 assert.equal(reports.length,1);
 const report=reports[0];assert.equal(report.start,'2026-11-09');assert.equal(report.end,'2026-11-13');assert.equal(report.title,week);assert.equal(report.grade,'1');assert.equal(report.subject,'Tiếng Việt');assert.equal(report.entries.length,1);
 const entry=report.entries[0];assert.equal(entry.id,id);assert.equal(entry.weekStart,'2026-11-09');assert.equal(entry.weekEnd,'2026-11-13');assert.equal(entry.day,'Tuần');assert.equal(entry.periods,'');assert(!entry.projected);
 assert.equal(a.getSchoolReportEntries('2','Tiếng Việt','',week).length,0);
 assert.equal(a.getSchoolReportEntries('1','Toán','',week).some(e=>e.id===id),false);
});
test('weekly Vietnamese exercise preserves all reading text, three printed tone marks and both matching columns',()=>{
 const w=load().schoolExerciseWorksheets[id];assert.equal(w.kind,'weekly-vietnamese');assert.equal(w.blankCount,6);
 assert.deepEqual(plain(w.sounds),['et','êt','it','ut','ưt','ap','ăp','âp','op','ôp','ơp']);
 assert.deepEqual(plain(w.words),[['lũ lụt','bắp cải','hộp sữa','lớp học','con vịt'],['lắp ráp','bút sáp','nắp chai','quả mít','vết mực']]);
 assert.deepEqual(plain(w.reading),['Lớp học của em ngăn nắp.','Bà cho mẹ quả mít to.']);
 assert.deepEqual(plain(w.blanks),[{before:'v',after:' mực',tone:'sắc'},{before:'chim v',after:'',tone:'nặng'},{before:'h',after:' thở',tone:'sắc'}]);
 assert.deepEqual(plain(w.columnA),['Bé hồi hộp','Ba cho bé','Mẹ xào']);
 assert.deepEqual(plain(w.columnB),['cái xe đạp màu tím.','bắp cải.','khi mở hộp quà.']);
});
test('weekly review preserves four source phonics groups and the exact weather passage without introducing answer keys',()=>{
 const a=load(),l=a.schoolLessonContents[id];assert.equal(l.kind,'weekly-review');
 assert.deepEqual(plain(l.groups),[
  {sounds:['et','êt','it'],blend:{initial:'v',sound:'et',word:'vẹt'},words:['con vẹt','bồ kết','quả mít']},
  {sounds:['ut','ưt'],blend:{initial:'s',sound:'ut',word:'sút'},words:['bút chì','mứt dừa','nứt nẻ']},
  {sounds:['ap','ăp','âp'],blend:{initial:'đ',sound:'ap',word:'đạp'},words:['xe đạp','cặp da','cá mập']},
  {sounds:['op','ôp','ơp'],blend:{initial:'h',sound:'op',word:'họp'},words:['con cọp','lốp xe','tia chớp']}
 ]);
 assert.equal(l.reading,'Trời xám xịt, mưa sầm sập như trút. Sấm sét ì ầm xa xa. Cây cỏ ngả rạp vào nhau. Một lúc sau, mưa lộp độp rồi dứt hẳn. Mặt trời ló khỏi chân mây. Vạn vật như thức dậy, đầy ắp sắc màu.');
 function noKeys(value){if(!value||typeof value!=='object')return;for(const [key,child]of Object.entries(value)){assert(!['answer','answers','correct','solution','explanation','answerSource'].includes(key),'Unexpected key: '+key);noKeys(child);}}
 noKeys(l);noKeys(a.schoolExerciseWorksheets[id]);
});
test('six worksheet responses survive sync and independent edits to fill-ins and matching selections merge',()=>{
 const value={blanks:['','','','','',''],choices:[],updatedAt:1};
 const put=(previous,next,t,device='a')=>C.update(previous,'worksheet',id,next,{t,n:1,d:device});
 const base=put(null,value,1),left=put(base,{...value,blanks:['bản nháp','','','','',''],updatedAt:2},2),right=put(base,{...value,blanks:['','','','','','2'],updatedAt:3},3,'b');
 const restored=C.decode(C.validate(JSON.parse(JSON.stringify(C.merge(left,right)))));
 assert.deepEqual(restored.blanks,['bản nháp','','','','','2']);assert.equal(restored.blanks.length,6);assert.deepEqual(restored.choices,[false,false,false,false]);
 const cleared=put(C.merge(left,right),{...restored,blanks:['bản nháp','','','','',''],updatedAt:4},4);
 assert.equal(C.decode(C.merge(cleared,right)).blanks[5],'');
 const old=C.decode(C.update(null,'worksheet',oldId,{blanks:['x','','',''],choices:[false,true,false,false],updatedAt:1},{t:1,n:1,d:'old'}));
 assert.deepEqual(old.blanks,['x','','','']);assert.equal(old.blanks.length,4);assert.deepEqual(old.choices,[false,true,false,false]);
});
test('cloud validation accepts only the known six-field weekly sheet and retains old worksheet bounds',()=>{
 const a=load(),draft={blanks:['','','','','','2'],choices:[],updatedAt:1};
 assert.equal(a.accepts('worksheet',id,draft),true);
 assert.equal(a.accepts('worksheet',id,{...draft,blanks:Array(7).fill('')}),false);
 assert.equal(a.accepts('worksheet',id,{...draft,blanks:['x'.repeat(21)]}),false);
 assert.equal(a.accepts('worksheet',id,{...draft,blanks:[1]}),false);
 assert.equal(a.accepts('worksheet',id,{...draft,choices:Array(5).fill(false)}),false);
 assert.equal(a.accepts('worksheet','tieng-viet-week-unknown',draft),false);
 assert.equal(a.accepts('worksheet',oldId,{blanks:Array(4).fill(''),choices:Array(4).fill(false)}),true);
 assert.equal(a.accepts('worksheet',oldId,{blanks:Array(5).fill(''),choices:[]}),false);
});
test('new worksheet autosave uses the account storage facade and keeps the old worksheet draft separate',()=>{
 const a=load(),values=new Map(),changed=[],oldDraft={blanks:['cũ','','',''],choices:[false,true,false,false]},answers=['nháp1','nháp2','nháp3','1','2','0'];
 values.set(a.schoolExerciseStorageKey(oldId),JSON.stringify(oldDraft));
 a.context.LearningAccounts={storage:{getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)}};
 a.context.localStorage={getItem(){throw Error('Account facade required');},setItem(){throw Error('Account facade required');}};
 a.context.window.LearningSync={changed:(...args)=>changed.push(args)};
 const status={textContent:''},panel={dataset:{lessonId:id},querySelectorAll:selector=>selector==='[data-school-blank]'?answers.map(value=>({value})):[],querySelector:()=>status};
 a.saveSchoolExerciseDraft(panel);assert.deepEqual(plain(a.readSchoolExerciseDraft(id).blanks),answers);
 assert.deepEqual(plain(a.readSchoolExerciseDraft(oldId)),oldDraft);assert.equal(changed.length,1);assert.equal(changed[0][0],'worksheet');assert.equal(changed[0][1],id);assert.deepEqual(plain(changed[0][2].blanks),answers);
 const old=load().schoolExerciseWorksheets[oldId];
 assert.deepEqual(plain(old.blanks),[['cái t',''],['máy b',''],['m',' sấy'],['gà m','']]);
 assert.deepEqual(plain(old.choices),[['Bé và chị chơi đu quay.','Bé và chị chơi nhảy dây.'],['Hải và Hà đi máy bay.','Hải và Hà đi bơi.']]);
 assert.equal(old.words[1][4],'chum');assert.equal(old.phrases[0][3],'gối xôi');
});
