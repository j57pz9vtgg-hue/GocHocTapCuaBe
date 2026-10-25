const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const data=fs.readFileSync(require('node:path').join(__dirname,'../assets/data.js'),'utf8'),code=fs.readFileSync(require('node:path').join(__dirname,'../assets/classification.js'),'utf8');
function load(record,base){const context={document:{addEventListener(){}},localStorage:{getItem:()=>record?JSON.stringify(record):null},console};vm.createContext(context);vm.runInContext(data+'\n'+(base?'const publishedTimoClassification = '+JSON.stringify(base)+';\n':'')+code+'\nglobalThis.api={classification:TimoClassification,groups:getTimoTopicGroups,papers:officialPapers};',context);return context.api;}
const fixture=()=>({version:1,kind:'timo-classification',topics:[{id:'timo-group-1-review-test',groupId:'timo-group-1',grade:'2',name:'Chủ đề được duyệt'}],assignments:{'timo-grade2-qualifying-01:1':'timo-group-1-review-test'}});
test('review-first suggestions never mutate the bank or apply themselves',()=>{const {classification,groups,papers}=load(),before=JSON.stringify(papers);for(const g of groups('2')){const s=classification.suggest(g);const ids=Array.from(s.proposals).flatMap(p=>Array.from(p.entries,e=>e.id));assert.equal(ids.length,new Set(ids).size);assert.ok(ids.every(id=>g.topics.flatMap(t=>Array.from(t.entries,e=>e.id)).includes(id)));}assert.equal(classification.snapshot().topics.length,0);assert.equal(JSON.stringify(papers),before);});
test('approved overlay keeps all350 source references once within their five groups',()=>{const api=load(fixture()),groups=api.groups('2'),entries=Array.from(groups).flatMap(g=>Array.from(g.topics).flatMap(t=>Array.from(t.entries)));assert.equal(entries.length,350);assert.equal(new Set(entries.map(e=>e.id)).size,350);assert.deepEqual(Array.from(groups,g=>g.topics.reduce((n,t)=>n+t.entries.length,0)),[70,70,70,70,70]);assert.equal(groups[0].topics.find(t=>t.id==='timo-group-1-review-test').entries.length,1);assert.strictEqual(groups[0].topics.find(t=>t.id==='timo-group-1-review-test').entries[0].question,api.papers[0].questions[0]);});
test('backup validation rejects cross-group moves, unknown questions and duplicate names',()=>{const api=load();let f=fixture();f.assignments['timo-grade2-qualifying-01:6']=f.topics[0].id;assert.throws(()=>api.classification.validate(f));f=fixture();f.assignments['missing:1']=f.topics[0].id;assert.throws(()=>api.classification.validate(f));f=fixture();f.topics.push({...f.topics[0],id:'timo-group-1-review-duplicate'});assert.throws(()=>api.classification.validate(f));});
test('proposals use question content without inspecting provided answers or explanations',()=>{const api=load(),before=api.groups('2').map(g=>api.classification.suggest(g).proposals.map(p=>({name:p.name,ids:p.entries.map(e=>e.id)})));for(const p of api.papers)for(const q of p.questions){delete q.answer;delete q.explanation;delete q.explanationImage;}const after=api.groups('2').map(g=>api.classification.suggest(g).proposals.map(p=>({name:p.name,ids:p.entries.map(e=>e.id)})));assert.deepEqual(JSON.parse(JSON.stringify(after)),JSON.parse(JSON.stringify(before)));});

test('sharing export includes every classified and unclassified source question exactly once without private fields',()=>{
 const api=load(fixture()),report=api.classification.buildSharingExport();
 assert.deepEqual(JSON.parse(JSON.stringify(report.summary)),{total:350,classified:1,unclassified:349});
 assert.equal(new Set(report.questions.map(q=>q.id)).size,350);assert.equal(report.groups.length,5);
 assert.ok(report.groups.every(g=>g.total===70&&g.total===g.classified+g.unclassified));
 const bank=new Map(api.papers.flatMap(p=>p.questions.map(q=>[p.id+':'+q.number,{q,p}])));
 for(const row of report.questions){const source=bank.get(row.id);assert.ok(source);assert.equal(row.paperId,source.p.id);assert.equal(row.number,source.q.number);assert.equal(row.english,source.q.english||source.q.text||'');assert.ok(!Object.hasOwn(row,'answer')&&!Object.hasOwn(row,'explanation'));}
 assert.equal(report.questions.filter(q=>q.status==='classified').length,1);
 const prohibited=new Set(['answer','answers','answerSource','explanation','explanationImage','attempts','password','digest','salt']);
 function check(value){if(!value||typeof value!=='object')return;for(const [key,child] of Object.entries(value)){assert.ok(!prohibited.has(key));check(child);}}check(report);
 assert.equal(api.classification.validate(report).topics.length,1);
});
test('new devices use the published owner classification and existing local work is retained',()=>{
 const base=fixture();base.revision='owner-test';
 const fresh=load(null,base);assert.equal(fresh.groups('2')[0].topics.find(t=>t.id===base.topics[0].id).entries.length,1);
 const local={version:1,kind:'timo-classification',topics:[],assignments:{}};
 assert.equal(load(local,base).groups('2')[0].topics.length,1);
});
test('owner publishing importer checks the complete source snapshot and ignores question-body edits',()=>{
 const {prepareOwnerClassification}=require('../scripts/import-classification.cjs');
 const report=JSON.parse(JSON.stringify(load(fixture()).classification.buildSharingExport()));
 const result=prepareOwnerClassification(report);assert.deepEqual(result.assignments,fixture().assignments);assert.equal(result.revision.length,12);
 report.questions[0].english='';assert.deepEqual(prepareOwnerClassification(report),result);
 const incomplete=structuredClone(report);incomplete.questions.pop();assert.throws(()=>prepareOwnerClassification(incomplete));
 const wrong=structuredClone(report);wrong.questions[0].status=wrong.questions[0].status==='classified'?'unclassified':'classified';assert.throws(()=>prepareOwnerClassification(wrong));
});
