const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/app.js','utf8'),ctx={};vm.runInNewContext(fs.readFileSync('assets/data.js','utf8')+'\n'+source.match(/^const validResponse=.*$/m)[0]+'\n'+source.match(/^const matchesProvidedAnswer=.*$/m)[0]+'\n'+source.slice(source.indexOf('function practiceGradingSummary('),source.indexOf('const key ='))+'\n'+source.slice(source.indexOf('function topicAttemptSummary('),source.indexOf('function renderPracticeTopics('))+'\nglobalThis.api={officialPapers,practiceGradingSummary,topicAttemptSummary};',ctx);const a=ctx.api;
const fixture=()=>Array.from({length:29},()=>({options:['A','B'],answer:1,answerSource:'user'}));
test('a fully keyed fixture grades its complete key set',()=>{const qs=fixture(),answers=Object.fromEntries(qs.map((q,i)=>[i,q.answer??0])),r=a.practiceGradingSummary(qs,answers);assert.equal(r.correct,29);assert.equal(r.provided,29);assert.equal(r.pending,0);assert.equal(r.value,'29/29 câu');assert.equal(r.result,'29/29 câu đúng');});
test('partial submission and wrong answers are scored only against provided keys',()=>{const qs=fixture(),r=a.practiceGradingSummary(qs,{0:1,1:0,27:0});assert.equal(r.correct,1);assert.equal(r.provided,29);assert.equal(r.pending,0);assert.equal(r.value,'1/29 câu');});
test('complete TIMO papers retain their original full-paper result',()=>{const qs=a.officialPapers.find(p=>p.program==='TIMO').questions,answers=Object.fromEntries(qs.map((q,i)=>[i,q.answer])),r=a.practiceGradingSummary(qs,answers);assert.equal(r.pending,0);assert.equal(r.value,'25/25 câu');assert.equal(r.result,'25/25 câu đúng');});
test('missing or unauthorized keys stay pending and never produce a fabricated score',()=>{const qs=[{options:['A','B'],answer:0,answerSource:'inferred'},{options:['A','B']}],r=a.practiceGradingSummary(qs,{0:0,1:0});assert.equal(r.correct,0);assert.equal(r.provided,0);assert.equal(r.value,'Chờ đáp án');assert.equal(r.result,'Chờ đáp án');});

test('a partly keyed paper still shows the known score and pending count',()=>{const qs=fixture();delete qs[27].answer;delete qs[27].answerSource;const answers=Object.fromEntries(qs.map((q,i)=>[i,q.answer??0])),r=a.practiceGradingSummary(qs,answers);assert.equal(r.provided,28);assert.equal(r.pending,1);assert.equal(r.result,'28/28 câu đúng · 1 câu chờ đáp án');});

test('topic cards with no answers remain unstarted even when migration created an empty draft',()=>{
 const topic={entries:[{id:'a',question:{options:['A','B'],answer:0,answerSource:'user'}}]};
 for(const record of [undefined,{questionIds:['a'],answers:{},startedAt:1},{questionIds:['old'],answers:{0:0},submitted:true}]){const r=a.topicAttemptSummary(topic,record);assert.equal(r.status,'new');assert.equal(r.label,'Chưa làm');assert.equal(r.result,'—');}
});
test('topic results follow source IDs across shuffled saved order and include unanswered questions in the score',()=>{
 const topic={entries:['a','b','c'].map((id,i)=>({id,question:{options:['A','B'],answer:i%2,answerSource:'user'}}))},record={questionIds:['old','b','a'],answers:{0:1,1:1,2:0},submitted:true};
 const done=a.topicAttemptSummary(topic,record);assert.equal(done.status,'done');assert.equal(done.answered,2);assert.equal(done.result,'2/3 câu đúng');
 const reordered=a.topicAttemptSummary({entries:[...topic.entries].reverse()},record);assert.equal(reordered.result,done.result);
 const draft=a.topicAttemptSummary(topic,{...record,submitted:false});assert.equal(draft.status,'progress');assert.equal(draft.answered,2);assert.equal(draft.result,'—');
});
test('a submitted topic without owner keys shows pending answers instead of a fabricated score',()=>{
 const topic={entries:[{id:'a',question:{options:['A','B'],answer:1,answerSource:'inferred'}}]},r=a.topicAttemptSummary(topic,{questionIds:['a'],answers:{0:1},submitted:true});assert.equal(r.status,'done');assert.equal(r.result,'Chờ đáp án');
});
