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
