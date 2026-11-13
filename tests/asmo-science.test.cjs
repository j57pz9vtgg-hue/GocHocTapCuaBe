const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={};vm.runInNewContext(fs.readFileSync('assets/data.js','utf8')+';globalThis.api={officialPapers,getPapers,getSubjects};',c);const a=c.api,keys='BCACABBBBDCADCBDCBA CCCCBA'.replace(/ /g,'').split('').map(k=>k.charCodeAt(0)-65);
test('ASMO national Science1 is available separately to grades1and2 with all25 screenshot keys',()=>{
 assert(a.getSubjects('ASMO').includes('Khoa học'));assert(!a.getSubjects('TIMO').includes('Khoa học'));
 assert.equal(keys.length,25);
 for(const grade of ['1','2']){const papers=a.getPapers('ASMO','Khoa học',grade,'Đề quốc gia');assert.equal(papers.length,2);const p=papers[0];assert.equal(p.id,`asmo-grade${grade}-science-national-01-20261113`);assert.deepEqual(Array.from(p.questions,q=>q.number),Array.from({length:25},(_,i)=>i+1));assert.deepEqual(Array.from(p.questions,q=>q.answer),keys);for(const q of p.questions){assert.equal(q.answerSource,'user');assert(!q.explanation);assert(q.english&&q.translation);}}
 assert.equal(a.getPapers('ASMO','Khoa học','3','Đề quốc gia').length,0);assert.equal(a.getPapers('ASMO','Khoa học','1','Đề vòng loại').length,0);assert.notEqual(a.getPapers('ASMO','Khoa học','1','Đề quốc gia')[0].id,a.getPapers('ASMO','Khoa học','2','Đề quốc gia')[0].id);
});
test('source option counts, missing image and owner correction are represented explicitly',()=>{
 const qs=a.getPapers('ASMO','Khoa học','1','Đề quốc gia')[0].questions,q=n=>qs[n-1];
 for(const n of [5,17])assert.equal(q(n).options.length,3);
 for(const n of [8,9,10,11,16,18,19,20])assert.equal(q(n).options.length,5);
 assert.equal(q(19).sourceImageMissing,true);assert(!q(19).image);assert(q(19).detail.includes('Chờ bổ sung hình'));assert.equal(q(19).answer,0);
 assert.equal(q(23).answer,2);assert.equal(q(23).options[2],'colonies / thuộc địa');assert.equal(q(25).options[2],'chrysalis / nhộng');assert.equal(q(25).answer,0);assert.equal(q(7).answer,1);assert.equal(q(3).answer,0);
});

test('ASMO topic practice references 44 unique questions from both papers, with minimum5 per named topic',()=>{
 const context={};vm.runInNewContext(fs.readFileSync('assets/data.js','utf8')+';globalThis.a={getPracticeTopicGroups,getAsmoScienceTopicGroups,getPapers,officialPapers};',context);const api=context.a;
 for(const grade of ['1','2']){const paper=api.getPapers('ASMO','Khoa học',grade,'Đề quốc gia')[0],groups=api.getPracticeTopicGroups('ASMO','Khoa học',grade);assert.equal(groups.length,1);const topics=groups[0].topics;assert.deepEqual(Array.from(topics,t=>t.entries.length),[11,8,7,10,8]);assert(topics.slice(0,4).every(t=>t.entries.length>=5));const entries=Array.from(topics).flatMap(t=>Array.from(t.entries));assert.equal(new Set(entries.map(e=>e.id)).size,44);for(const e of entries){const source=api.officialPapers.find(p=>p.id===e.paperId);assert.equal(e.id,source.id+':'+e.number);assert.strictEqual(e.question,source.questions[e.number-1]);}assert(topics[2].entries.some(e=>e.number===19&&e.question.sourceImageMissing));assert.deepEqual(Array.from(topics[4].entries,e=>e.number),[1,4,5,8,20,10,11,14]);}
 assert.equal(api.getPracticeTopicGroups('ASMO','Khoa học','3').length,0);assert.equal(api.getPracticeTopicGroups('ASMO','Toán','1').length,1);assert.equal(api.getPracticeTopicGroups('Violympic','Toán','1').length,0);
 // A future paper's question numbers must not inherit this paper's subject labels accidentally.
 api.officialPapers.push({id:'asmo-future-grade1',title:'Bộ khác',program:'ASMO',subject:'Khoa học',grade:'1',mode:'Đề quốc gia',questions:[{number:2,english:'Other source',options:['A','B']}]});
 const topics=api.getAsmoScienceTopicGroups('1')[0].topics;assert(!topics[0].entries.some(e=>e.paperId==='asmo-future-grade1'));assert(topics[4].entries.some(e=>e.paperId==='asmo-future-grade1'));
});

test('sync accepts existing ASMO topic IDs only in the matching grade, subject and topic mode',()=>{
 const context={};vm.createContext(context);vm.runInContext(fs.readFileSync('assets/data.js','utf8'),context);const source=fs.readFileSync('assets/cloud-sync.js','utf8');vm.runInContext(source.slice(source.indexOf(' function accepts('),source.indexOf(' function recovery('))+';globalThis.accepts=accepts;',context);
 const value={answers:{0:1},questionIds:['asmo-grade1-science-national-01-20261113:2'],startedAt:1,updatedAt:2};
 assert(context.accepts('attempt','1|ASMO|Khoa học|Luyện theo chủ đề|asmo-science-life',value));assert(context.accepts('attempt','2|ASMO|Khoa học|Luyện theo chủ đề|asmo-science-animals',{...value,questionIds:['asmo-grade2-science-national-01-20261113:13']}));
 for(const key of ['3|ASMO|Khoa học|Luyện theo chủ đề|asmo-science-life','1|ASMO|Toán|Luyện theo chủ đề|asmo-science-life','1|ASMO|Khoa học|Đề quốc gia|asmo-science-life','1|ASMO|Khoa học|Luyện theo chủ đề|asmo-science-unknown'])assert.equal(context.accepts('attempt',key,value),false,key);
});

test('ASMO paper2 retains the original25-question order and matches the reordered confirmed answer screenshots by content',()=>{
 const expected='C,C,C,A,B,B,D,A,C,C,D,A,B,D,B,B,A,B,B,C,B,C,D,B,C'.split(',').map(k=>k.charCodeAt(0)-65);
 for(const grade of ['1','2']){const p=a.getPapers('ASMO','Khoa học',grade,'Đề quốc gia')[1];assert.equal(p.id,`asmo-grade${grade}-science-national-02-20261113`);assert.deepEqual(Array.from(p.questions,q=>q.number),Array.from({length:25},(_,i)=>i+1));assert.deepEqual(Array.from(p.questions,q=>q.answer),expected);assert(p.questions.every(q=>q.answerSource==='user'&&!q.explanation));const q=n=>p.questions[n-1];assert(q(1).english.includes('leap year'));assert(q(24).english.includes('owls'));assert(q(25).options[q(25).answer].startsWith('circulation'));assert(q(7).options[q(7).answer].startsWith('Thermometer'));assert.equal(q(8).options.length,3);assert.equal(q(24).options.length,3);}
});
test('topic deduplication skips only six reviewed repetitions, retaining related but distinct questions and both complete papers',()=>{
 const context={};vm.runInNewContext(fs.readFileSync('assets/data.js','utf8')+';globalThis.api={getAsmoScienceTopicGroups,getPapers,officialPapers};',context);const api=context.api;
 for(const grade of ['1','2']){const [first,second]=api.getPapers('ASMO','Khoa học',grade,'Đề quốc gia'),entries=Array.from(api.getAsmoScienceTopicGroups(grade)[0].topics).flatMap(t=>Array.from(t.entries)),ids=new Set(entries.map(e=>e.id));
  for(const [q2,q1]of [[4,12],[5,6],[13,15],[20,20],[21,8],[22,11]]){assert(!ids.has(second.id+':'+q2));assert(ids.has(first.id+':'+q1));assert.equal(second.questions[q2-1].english,first.questions[q1-1].english);assert.deepEqual(Array.from(second.questions[q2-1].options),Array.from(first.questions[q1-1].options));}
  assert(ids.has(first.id+':22'));assert(ids.has(second.id+':7')); // measuring-tool inverse questions stay separate.
  assert(ids.has(first.id+':20'));assert(ids.has(second.id+':10')); // artificial source versus any source of light.
  assert.equal(first.questions.length,25);assert.equal(second.questions.length,25);
  api.officialPapers.reverse();assert.deepEqual(new Set(api.getAsmoScienceTopicGroups(grade)[0].topics.flatMap(t=>t.entries.map(e=>e.id))),ids);api.officialPapers.reverse();
 }
});
