const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={};vm.runInNewContext(fs.readFileSync('assets/data.js','utf8')+';globalThis.api={officialPapers,getPapers,getSubjects};',c);const a=c.api,keys='BCACABBBBDCADCBDCBA CCCCBA'.replace(/ /g,'').split('').map(k=>k.charCodeAt(0)-65);
test('ASMO national Science1 is available separately to grades1and2 with all25 screenshot keys',()=>{
 assert(a.getSubjects('ASMO').includes('Khoa học'));assert(!a.getSubjects('TIMO').includes('Khoa học'));
 assert.equal(keys.length,25);
 for(const grade of ['1','2']){const papers=a.getPapers('ASMO','Khoa học',grade,'Đề quốc gia');assert.equal(papers.length,1);const p=papers[0];assert.equal(p.id,`asmo-grade${grade}-science-national-01-20261113`);assert.deepEqual(Array.from(p.questions,q=>q.number),Array.from({length:25},(_,i)=>i+1));assert.deepEqual(Array.from(p.questions,q=>q.answer),keys);for(const q of p.questions){assert.equal(q.answerSource,'user');assert(!q.explanation);assert(q.english&&q.translation);}}
 assert.equal(a.getPapers('ASMO','Khoa học','3','Đề quốc gia').length,0);assert.equal(a.getPapers('ASMO','Khoa học','1','Đề vòng loại').length,0);assert.notEqual(a.getPapers('ASMO','Khoa học','1','Đề quốc gia')[0].id,a.getPapers('ASMO','Khoa học','2','Đề quốc gia')[0].id);
});
test('source option counts, missing image and owner correction are represented explicitly',()=>{
 const qs=a.getPapers('ASMO','Khoa học','1','Đề quốc gia')[0].questions,q=n=>qs[n-1];
 for(const n of [5,17])assert.equal(q(n).options.length,3);
 for(const n of [8,9,10,11,16,18,19,20])assert.equal(q(n).options.length,5);
 assert.equal(q(19).sourceImageMissing,true);assert(!q(19).image);assert(q(19).detail.includes('Chờ bổ sung hình'));assert.equal(q(19).answer,0);
 assert.equal(q(23).answer,2);assert.equal(q(23).options[2],'colonies / thuộc địa');assert.equal(q(25).options[2],'chrysalis / nhộng');assert.equal(q(25).answer,0);assert.equal(q(7).answer,1);assert.equal(q(3).answer,0);
});

test('ASMO topic practice references all25 source questions once, with minimum5 per named topic',()=>{
 const context={};vm.runInNewContext(fs.readFileSync('assets/data.js','utf8')+';globalThis.a={getPracticeTopicGroups,getAsmoScienceTopicGroups,getPapers,officialPapers};',context);const api=context.a;
 for(const grade of ['1','2']){const paper=api.getPapers('ASMO','Khoa học',grade,'Đề quốc gia')[0],groups=api.getPracticeTopicGroups('ASMO','Khoa học',grade);assert.equal(groups.length,1);const topics=groups[0].topics;assert.deepEqual(Array.from(topics,t=>t.entries.length),[6,5,5,9]);assert(topics.slice(0,3).every(t=>t.entries.length>=5));const entries=Array.from(topics).flatMap(t=>Array.from(t.entries));assert.equal(new Set(entries.map(e=>e.id)).size,25);for(const e of entries){assert.equal(e.id,paper.id+':'+e.number);assert.strictEqual(e.question,paper.questions[e.number-1]);}assert(topics[2].entries.some(e=>e.number===19&&e.question.sourceImageMissing));assert.deepEqual(Array.from(topics[3].entries,e=>e.number),[1,4,5,8,9,10,17,20,21]);}
 assert.equal(api.getPracticeTopicGroups('ASMO','Khoa học','3').length,0);assert.equal(api.getPracticeTopicGroups('ASMO','Toán','1').length,0);assert.equal(api.getPracticeTopicGroups('Violympic','Toán','1').length,0);
 // A future paper's question numbers must not inherit this paper's subject labels accidentally.
 api.officialPapers.push({id:'asmo-future-grade1',title:'Bộ khác',program:'ASMO',subject:'Khoa học',grade:'1',mode:'Đề quốc gia',questions:[{number:2,english:'Other source',options:['A','B']}]});
 const topics=api.getAsmoScienceTopicGroups('1')[0].topics;assert(!topics[0].entries.some(e=>e.paperId==='asmo-future-grade1'));assert(topics[3].entries.some(e=>e.paperId==='asmo-future-grade1'));
});

test('sync accepts existing ASMO topic IDs only in the matching grade, subject and topic mode',()=>{
 const context={};vm.createContext(context);vm.runInContext(fs.readFileSync('assets/data.js','utf8'),context);const source=fs.readFileSync('assets/cloud-sync.js','utf8');vm.runInContext(source.slice(source.indexOf(' function accepts('),source.indexOf(' function recovery('))+';globalThis.accepts=accepts;',context);
 const value={answers:{0:1},questionIds:['asmo-grade1-science-national-01-20261113:2'],startedAt:1,updatedAt:2};
 assert(context.accepts('attempt','1|ASMO|Khoa học|Luyện theo chủ đề|asmo-science-life',value));assert(context.accepts('attempt','2|ASMO|Khoa học|Luyện theo chủ đề|asmo-science-animals',{...value,questionIds:['asmo-grade2-science-national-01-20261113:13']}));
 for(const key of ['3|ASMO|Khoa học|Luyện theo chủ đề|asmo-science-life','1|ASMO|Toán|Luyện theo chủ đề|asmo-science-life','1|ASMO|Khoa học|Đề quốc gia|asmo-science-life','1|ASMO|Khoa học|Luyện theo chủ đề|asmo-science-unknown'])assert.equal(context.accepts('attempt',key,value),false,key);
});
