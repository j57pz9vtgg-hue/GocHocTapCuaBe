const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const data=fs.readFileSync(require('node:path').join(__dirname,'../assets/data.js'),'utf8'),code=fs.readFileSync(require('node:path').join(__dirname,'../assets/classification.js'),'utf8');
function load(record,base,store){const memory=store||new Map();if(record)memory.set('goc-hoc-tap.classification.v1',JSON.stringify(record));const context={document:{addEventListener(){}},localStorage:{getItem:key=>memory.get(key)||null,setItem:(key,value)=>memory.set(key,value),removeItem:key=>memory.delete(key)},state:{practice:null},renderHome(){},window:{LearningSync:{changed(){}}},console};vm.createContext(context);vm.runInContext(data+'\n'+(base?'const publishedTimoClassification = '+JSON.stringify(base)+';\n':'')+code+'\nglobalThis.api={classification:TimoClassification,groups:getTimoTopicGroups,papers:officialPapers};',context);context.api.store=memory;return context.api;}
const fixture=()=>({version:1,kind:'timo-classification',topics:[{id:'timo-group-1-review-test',groupId:'timo-group-1',grade:'2',name:'Chủ đề được duyệt'}],assignments:{'timo-grade2-qualifying-01:1':'timo-group-1-review-test'}});
test('automatic topic suggestion API is removed and reading topics never changes the bank',()=>{const api=load(),before=JSON.stringify(api.papers);assert.equal(api.classification.suggest,undefined);assert.equal(api.classification.renderInline,undefined);api.groups('2');assert.equal(api.classification.snapshot().topics.length,0);assert.equal(JSON.stringify(api.papers),before);});
test('approved overlay keeps all350 source references once within their five groups',()=>{const api=load(fixture()),groups=api.groups('2'),entries=Array.from(groups).flatMap(g=>Array.from(g.topics).flatMap(t=>Array.from(t.entries)));assert.equal(entries.length,350);assert.equal(new Set(entries.map(e=>e.id)).size,350);assert.deepEqual(Array.from(groups,g=>g.topics.reduce((n,t)=>n+t.entries.length,0)),[70,70,70,70,70]);assert.equal(groups[0].topics.find(t=>t.id==='timo-group-1-review-test').entries.length,1);assert.strictEqual(groups[0].topics.find(t=>t.id==='timo-group-1-review-test').entries[0].question,api.papers[0].questions[0]);});
test('backup validation rejects cross-group moves, unknown questions and duplicate names',()=>{const api=load();let f=fixture();f.assignments['timo-grade2-qualifying-01:6']=f.topics[0].id;assert.throws(()=>api.classification.validate(f));f=fixture();f.assignments['missing:1']=f.topics[0].id;assert.throws(()=>api.classification.validate(f));f=fixture();f.topics.push({...f.topics[0],id:'timo-group-1-review-duplicate'});assert.throws(()=>api.classification.validate(f));});
test('explicit classification references do not depend on answers or explanations',()=>{const api=load(fixture()),mapping=()=>JSON.stringify(api.groups('2').map(g=>g.topics.map(t=>({id:t.id,ids:t.entries.map(e=>e.id)}))));const before=mapping();for(const p of api.papers)for(const q of p.questions){delete q.answer;delete q.explanation;delete q.explanationImage;}assert.equal(mapping(),before);});
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

test('method-based schema covers all350 questions in five unchanged main groups',()=>{
 const c={};vm.runInNewContext(fs.readFileSync('assets/classification-base.js','utf8')+';globalThis.value=publishedTimoClassification;',c);
 const api=load(null,JSON.parse(JSON.stringify(c.value))),groups=api.groups('2');
 assert.deepEqual(Array.from(groups,g=>g.topics.filter(t=>t.id.includes('-review-')).length),[7,6,7,6,6]);
 assert.equal(api.classification.snapshot().topics.length,32);assert.equal(Object.keys(api.classification.snapshot().assignments).length,244);
 assert.deepEqual(Array.from(groups,g=>g.topics.find(t=>t.id.endsWith('-unclassified')).entries.length),[22,11,23,18,32]);
 assert.deepEqual(Array.from(groups,g=>g.topics.reduce((n,t)=>n+t.entries.length,0)),[70,70,70,70,70]);
 const ids=Array.from(groups).flatMap(g=>Array.from(g.topics).flatMap(t=>Array.from(t.entries,e=>e.id)));assert.equal(new Set(ids).size,350);
});
test('explicit owner reset replaces old local classification once, backs it up, and retains later edits',()=>{
 const c={};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../assets/classification-base.js'),'utf8')+';globalThis.value=publishedTimoClassification;',c);const base=JSON.parse(JSON.stringify(c.value));
 const old=fixture(),api=load(old,base);assert.equal(api.classification.usesPublished(),true);assert.equal(api.classification.snapshot().topics.length,32);
 assert.equal(api.store.get('goc-hoc-tap.classification-backup.'+base.resetId),JSON.stringify(old));
 assert.equal(api.store.get('goc-hoc-tap.classification-reset.v1'),base.resetId);
 const edited={...fixture(),scopeRevisions:base.scopeRevisions},again=load(edited,base,api.store);assert.deepEqual(JSON.parse(JSON.stringify(again.classification.snapshot())),edited);assert.equal(again.classification.usesPublished(),false);
});

function methodBase(){const c={};vm.runInNewContext(fs.readFileSync('assets/classification-base.js','utf8')+';globalThis.value=publishedTimoClassification;',c);return JSON.parse(JSON.stringify(c.value));}
function oldMethodBase(){return JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'fixtures/classification-before-all-min5.json'),'utf8'));}

test('five-scope migration backs up old grouping, replaces grade2 groups and preserves other grades',()=>{
 const base=methodBase(),old=oldMethodBase();old.topics.push({id:'timo-group-2-review-user-method',groupId:'timo-group-2',grade:'2',name:'Nhóm riêng'},{id:'timo-group-1-review-grade3-custom',groupId:'timo-group-1',grade:'3',name:'Lớp 3 riêng'});old.assignments['timo-grade2-qualifying-01:6']='timo-group-2-review-user-method';
 const memory=new Map([['goc-hoc-tap.classification-reset.v1',base.resetId]]),api=load(old,base,memory),snapshot=api.classification.snapshot();
 assert.equal(snapshot.assignments['timo-grade2-qualifying-01:6'],'timo-group-2-review-method-sum-pairing');assert(!snapshot.topics.some(t=>t.id==='timo-group-2-review-user-method'));assert(snapshot.topics.some(t=>t.id==='timo-group-1-review-grade3-custom'));assert.equal(api.groups('2')[0].topics.filter(t=>t.id.includes('-review-')&&t.entries.length).length,7);assert(api.classification.scopeMigrationPrevious());assert.equal(api.store.get('goc-hoc-tap.classification-backup.scope-'+base.revision),JSON.stringify(api.classification.validate(old)));
 snapshot.topics.find(t=>t.id==='timo-group-1-review-method-number-growing-gaps').name='Tên chỉnh riêng';delete snapshot.assignments['timo-grade2-qualifying-01:1'];
 const again=load(snapshot,base,memory);assert.equal(again.classification.snapshot().topics.find(t=>t.id==='timo-group-1-review-method-number-growing-gaps').name,'Tên chỉnh riêng');assert(!again.classification.snapshot().assignments['timo-grade2-qualifying-01:1']);
});
test('stale cloud classifications cannot restore former grouping in any of five scopes',()=>{
 const base=methodBase(),api=load(null,base),old=oldMethodBase();api.classification.acceptSynced(old);const current=api.classification.snapshot();assert.equal(current.scopeRevisions['2|timo-group-1'],base.scopeRevisions['2|timo-group-1']);assert.equal(current.topics.filter(t=>t.groupId==='timo-group-1'&&t.grade==='2').length,7);assert.equal(current.assignments['timo-grade2-national-02:3'],undefined);assert.equal(current.assignments['timo-grade2-qualifying-01:1'],'timo-group-1-review-method-number-growing-gaps');assert.deepEqual(JSON.parse(JSON.stringify(current.assignments)),base.assignments);assert.deepEqual(JSON.parse(JSON.stringify(current.scopeRevisions)),base.scopeRevisions);
});

test('every named topic has at least5 source questions and a supplied example solution',()=>{
 const a=load(null,methodBase()),groups=a.groups('2');
 for(const group of groups){const topics=group.topics.filter(t=>!t.id.endsWith('-unclassified'));assert(topics.length);assert(topics.every(t=>t.entries.length>=5));assert(topics.every(t=>t.entries.some(e=>e.question.explanation?.trim())));const ids=group.topics.flatMap(t=>t.entries.map(e=>e.id));assert.equal(new Set(ids).size,70);}
 const assignments=a.classification.snapshot().assignments;
 assert.equal(assignments['timo-grade2-qualifying-06:2'],'timo-group-1-review-method-number-constant');
 assert.equal(assignments['timo-grade2-qualifying-02:4'],assignments['timo-grade2-qualifying-06:2']);
 assert.equal(assignments['timo-grade2-qualifying-07:4'],'timo-group-1-review-method-number-growing-gaps');
 assert.equal(assignments['timo-grade2-qualifying-04:3'],undefined);assert.equal(assignments['timo-grade2-national-02:3'],undefined);
 assert.equal(assignments['timo-grade2-national-07:7'],'timo-group-2-review-method-common-factor');
 assert.equal(assignments['timo-grade2-qualifying-05:10'],undefined); // Fibonacci adds a different prerequisite.
 assert.equal(assignments['timo-grade2-qualifying-05:18'],undefined); // Triangles do not join the square-counting group.
 assert.equal(assignments['timo-grade2-national-05:25'],undefined); // Minimum difference differs from constructing one extreme number.
});

test('numeric and letter interleaved sequences share the odd-even separation method',()=>{
 const base=methodBase(),id='timo-group-1-review-method-letter-interleaved',topic=load(null,base).groups('2')[0].topics.find(t=>t.id===id);
 assert.equal(topic.entries.length,8);assert.equal(topic.name,'Hai quy luật xen kẽ: tách vị trí lẻ và chẵn');
 for(const qid of ['timo-grade2-qualifying-04:5','timo-grade2-qualifying-05:5'])assert(topic.entries.some(e=>e.id===qid));
 const old=structuredClone(base);delete old.assignments['timo-grade2-qualifying-04:5'];delete old.assignments['timo-grade2-qualifying-05:5'];old.scopeRevisions['2|timo-group-1']='all-methods-min5-2026-11-11';old.topics.find(t=>t.id===id).name='Dãy chữ: hai quy luật xen kẽ';
 old.topics.find(t=>t.id==='timo-group-2-review-method-sum-pairing').name='Tên riêng được giữ';
 const api=load(old,base,new Map([['goc-hoc-tap.classification-reset.v1',base.resetId]]));
 assert.equal(api.classification.snapshot().assignments['timo-grade2-qualifying-05:5'],id);assert.equal(api.classification.snapshot().topics.find(t=>t.id==='timo-group-2-review-method-sum-pairing').name,'Tên riêng được giữ');
 api.classification.acceptSynced(old);assert.equal(api.classification.snapshot().assignments['timo-grade2-qualifying-04:5'],id);
});
