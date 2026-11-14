'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const C=require('../assets/sync-core.js');
const id='toan-week-2026-11-09',week='Báo bài tuần 09/11/2026 - 13/11/2026';
const plain=value=>JSON.parse(JSON.stringify(value));
const empty=()=>({type:'school-math-v1',answers:{},drawings:{},updatedAt:1});
function load(){
 const context={document:{addEventListener(){}},window:{addEventListener(){}},escapeHTML:value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
 vm.createContext(context);
 for(const name of ['data','school-reports','school-math'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/'+name+'.js'),'utf8'),context);
 const cloud=fs.readFileSync(path.join(__dirname,'../assets/cloud-sync.js'),'utf8');
 vm.runInContext(cloud.slice(cloud.indexOf(' function accepts('),cloud.indexOf(' function recovery('))+';globalThis.api={accepts,schoolReports,getSchoolReports,getSchoolReportEntries,schoolMathWorksheets,schoolMathGrade,schoolMathAnswerAuthorization,validSchoolMathDraft,renderSchoolWeeklyMath,applySchoolMathCompletion};',context);
 return {context,...context.api};
}
test('weekly Math entry belongs only to Grade1 Toán for November9-13 and has no inferred daily periods',()=>{
 const a=load(),reports=a.getSchoolReports('1','Toán','',week),report=reports.find(r=>r.id==='school-week-2026-11-09-toan');
 assert(report);assert.equal(report.grade,'1');assert.equal(report.subject,'Toán');assert.equal(report.start,'2026-11-09');assert.equal(report.end,'2026-11-13');assert.equal(report.entries.length,1);
 const entry=report.entries[0];assert.equal(entry.id,id);assert.equal(entry.weekStart,'2026-11-09');assert.equal(entry.weekEnd,'2026-11-13');assert.equal(entry.day,'Tuần');assert.equal(entry.periods,'');assert(!entry.projected);
 assert.equal(a.getSchoolReportEntries('2','Toán','',week).some(e=>e.id===id),false);
 assert.equal(a.getSchoolReportEntries('1','MATHEMATICS','',week).some(e=>e.id===id),false);
 assert.equal(a.getSchoolReportEntries('1','Tiếng Việt','',week).some(e=>e.id===id),false);
});
test('weekly Math retains all four house expressions and the provided subtraction chain without answer keys',()=>{
 const w=load().schoolMathWorksheets[id];assert.equal(w.kind,'weekly-grade1-math');assert.equal(w.title,'Bài tập Toán tuần 09–13/11/2026');
 assert.deepEqual(plain(w.houses),['9 − 5','7 − 4','8 − 2','5 − 5']);assert.deepEqual(plain(w.chain),{start:9,subtract:[3,5,1]});
 function noKeys(value){if(!value||typeof value!=='object')return;for(const [key,child]of Object.entries(value)){assert(!['answer','answers','correct','expected','solution','explanation','answerSource'].includes(key),'Unexpected source key: '+key);noKeys(child);}}
 noKeys(w);
});
test('weekly worksheet opens with four house selections, nine empty numeric responses and an explicit pending-answer notice',()=>{
 const a=load(),entry=a.getSchoolReportEntries('1','Toán','',week).find(e=>e.id===id),html=a.renderSchoolWeeklyMath(entry,empty());
 assert.equal((html.match(/data-math-toggle=/g)||[]).length,4);for(let i=0;i<4;i++)assert(html.includes('data-math-toggle="house-'+i+'"'));
 assert.equal((html.match(/data-math-answer=/g)||[]).length,9);
 const responses=[...html.matchAll(/<input\b[^>]*data-math-answer=[^>]*>/g)].map(m=>m[0]);assert.equal(responses.length,9);assert(responses.every(s=>/value=""/.test(s)));
 assert(html.includes('Tô màu ngôi nhà ghi phép tính có kết quả lớn nhất.'));assert(html.includes('Viết số thích hợp vào ô trống.'));assert(html.includes('Viết số thích hợp vào chỗ chấm:'));
 assert(html.includes('Chờ đáp án'));assert(!html.includes('data-math-complete'));assert(!html.includes('data-action="submit-paper"'));assert(!html.includes('math-completion'));
});
test('weekly draft validation and cloud acceptance reuse math storage without accepting foreign or malformed records',()=>{
 const a=load(),draft={...empty(),answers:{'house-1':true,'chain-0':'nháp','story-0-a':'7'}};
 assert(a.validSchoolMathDraft(id,draft));assert(a.accepts('worksheet',id,draft));
 assert(!a.validSchoolMathDraft('toan-week-unknown',draft));assert(!a.accepts('worksheet','toan-week-unknown',draft));
 assert(!a.validSchoolMathDraft(id,{...draft,type:'other'}));assert(!a.validSchoolMathDraft(id,{...draft,answers:{'chain-0':9}}));assert(!a.validSchoolMathDraft(id,{...draft,answers:{'chain-0':'x'.repeat(2001)}}));
 assert(!a.validSchoolMathDraft(id,{...draft,drawings:{pad:[[[900,0]]]}}));
});
test('math sync preserves independent house colouring and numeric responses without adding a score',()=>{
 const base=C.update(null,'worksheet',id,empty(),{t:1,n:1,d:'a'}),left=C.update(base,'worksheet',id,{...empty(),answers:{'house-2':true,'chain-0':'nháp'},updatedAt:2},{t:2,n:1,d:'a'}),right=C.update(base,'worksheet',id,{...empty(),answers:{'story-1-c':'0'},updatedAt:3},{t:3,n:1,d:'b'});
 const restored=C.decode(C.validate(JSON.parse(JSON.stringify(C.merge(left,right)))));
 assert.deepEqual(restored.answers,{'house-2':true,'chain-0':'nháp','story-1-c':'0'});assert.equal(restored.type,'school-math-v1');assert.deepEqual(restored.drawings,{});assert(!('score'in restored));assert(!('result'in restored));
 const changed=C.update(C.merge(left,right),'worksheet',id,{...restored,answers:{...restored.answers,'house-2':false,'story-1-c':''}},{t:4,n:1,d:'a'}),again=C.decode(C.merge(changed,right));assert.equal(again.answers['house-2'],false);assert.equal(again.answers['story-1-c'],'');
});
test('inferred grading remains confined to the two authorized Grade2 worksheets and never marks the new weekly sheet',()=>{
 const a=load();assert.deepEqual(plain(a.schoolMathAnswerAuthorization.numbers),[4,5]);assert.deepEqual(plain(a.schoolMathAnswerAuthorization.ids),['grade2-mathematics-2026-10-29-4','grade2-mathematics-2026-10-29-5']);
 const draft={...empty(),answers:{'house-0':true,'chain-0':'9'},completedAt:123};assert.throws(()=>a.schoolMathGrade(id,draft));assert.throws(()=>a.schoolMathGrade('unknown',draft));
 for(const authorized of a.schoolMathAnswerAuthorization.ids)assert(Array.isArray(a.schoolMathGrade(authorized,empty())));
 let removed=0;const panel={dataset:{mathWorksheet:id},querySelector(selector){assert.equal(selector,'.math-completion');return {remove(){removed++;}};},querySelectorAll(){throw Error('Pending-key weekly sheet must not mark responses');}};
 assert.doesNotThrow(()=>a.applySchoolMathCompletion(panel,draft));assert.equal(removed,1);
});
