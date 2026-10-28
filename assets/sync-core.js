/* Deterministic per-field merge. Only learning data crosses devices. */
'use strict';
const LearningSyncCore=(()=>{
 const kinds=['attempt','worksheet','classification','preferences'];
 const plain=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
 const safe=k=>!['__proto__','prototype','constructor'].includes(k);
 const copy=x=>JSON.parse(JSON.stringify(x));
 const canonical=x=>Array.isArray(x)?x.map(canonical):plain(x)?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
 const equal=(a,b)=>JSON.stringify(canonical(a))===JSON.stringify(canonical(b));
 function compare(a,b){return (a?.t||0)-(b?.t||0)||(a?.n||0)-(b?.n||0)||String(a?.d||'').localeCompare(String(b?.d||''));}
 function flatten(value,path=[],out={}){
  if(plain(value)&&Object.keys(value).length){for(const key of Object.keys(value).sort()){if(!safe(key))throw Error('Invalid field');flatten(value[key],[...path,key],out);}}
  else out[JSON.stringify(path)]=value;
  return out;
 }
 function expand(fields){
  let out={};for(const [key,register]of Object.entries(fields).sort((a,b)=>JSON.parse(a[0]).length-JSON.parse(b[0]).length)){if(register.deleted)continue;const path=JSON.parse(key);if(!path.length){out=copy(register.value);continue;}let target=out;path.forEach((part,i)=>{if(!safe(part))throw Error('Invalid field');if(i===path.length-1)target[part]=copy(register.value);else {if(!plain(target[part]))target[part]={};target=target[part];}});}return out;
 }
 function normalize(kind,value){
  if(!plain(value))throw Error('Invalid learning record');
  if(kind==='classification')return {value:JSON.stringify(value)};
  if(kind==='preferences')return {theme:value.theme};
  if(kind==='worksheet'&&value.type==='school-math-v1')return copy(value);
  if(kind==='worksheet')return {blanks:Object.fromEntries((value.blanks||[]).map((v,i)=>[i,v])),choices:Object.fromEntries((value.choices||[]).map((v,i)=>[i,v])),updatedAt:value.updatedAt||0};
  const v=copy(value),answers={};for(const [index,answer]of Object.entries(v.answers||{}))answers[v.questionIds?.[Number(index)]??index]=answer;v.answers=answers;return v;
 }
 function decode(doc){
  let value=expand(doc.fields);if(doc.kind==='classification')return JSON.parse(value.value);
  if(doc.kind==='worksheet'&&value.type==='school-math-v1')return value;
  if(doc.kind==='worksheet')return {blanks:Array.from({length:4},(_,i)=>String(value.blanks?.[i]??'')),choices:Array.from({length:4},(_,i)=>value.choices?.[i]===true),updatedAt:value.updatedAt||0};
  if(doc.kind==='attempt'){const answers={};for(const [id,answer]of Object.entries(value.answers||{})){const i=Array.isArray(value.questionIds)?value.questionIds.indexOf(id):Number(id);if(i>=0&&Number.isInteger(i))answers[i]=answer;}value.answers=answers;}
  return value;
 }
 function epoch(kind,value){if(kind!=='attempt')return {id:'1',t:0,n:0,d:''};const id=String(value.syncRunId||value.startedAt||'legacy');return {id,t:Number(id.split('.')[0])||Number(value.startedAt)||0,n:0,d:id};}
 function update(previous,kind,key,value,clock){
  const e=epoch(kind,value);if(previous&&previous.epoch.id!==e.id&&compare(previous.epoch,e)>0)return previous;
  const base=previous?.epoch.id===e.id?previous:null,fields=copy(base?.fields||{}),next=flatten(normalize(kind,value));
  for(const path of new Set([...Object.keys(fields),...Object.keys(next)])){
   const exists=Object.hasOwn(next,path),old=fields[path];
   if(exists&&(!old||old.deleted||!equal(old.value,next[path])))fields[path]={...clock,value:next[path]};
   else if(!exists&&old&&!old.deleted)fields[path]={...clock,deleted:true};
  }
  return {schema:1,kind,key,epoch:e,fields};
 }
 function merge(a,b){
  if(!a)return b?copy(b):null;if(!b)return copy(a);if(a.kind!==b.kind||a.key!==b.key)throw Error('Mismatched records');
  if(a.epoch.id!==b.epoch.id)return copy(compare(a.epoch,b.epoch)>=0?a:b);
  const result=copy(a);for(const [path,value]of Object.entries(b.fields))if(!result.fields[path]||compare(value,result.fields[path])>0)result.fields[path]=copy(value);return result;
 }
 function validate(doc){
  if(!plain(doc)||doc.schema!==1||!kinds.includes(doc.kind)||typeof doc.key!=='string'||doc.key.length>500||!plain(doc.epoch)||typeof doc.epoch.id!=='string'||doc.epoch.id.length>150||!Number.isFinite(doc.epoch.t)||!Number.isInteger(doc.epoch.n)||typeof doc.epoch.d!=='string'||!plain(doc.fields)||Object.keys(doc.fields).length>5000)throw Error('Dữ liệu đồng bộ không hợp lệ.');
  for(const [path,r]of Object.entries(doc.fields)){const p=JSON.parse(path);if(!Array.isArray(p)||p.length>12||p.some(k=>typeof k!=='string'||!safe(k))||!plain(r)||!Number.isFinite(r.t)||r.t<0||!Number.isInteger(r.n)||typeof r.d!=='string'||r.d.length>100||(!r.deleted&&!Object.hasOwn(r,'value')))throw Error('Dữ liệu đồng bộ không hợp lệ.');}
  if(JSON.stringify(doc).length>700000)throw Error('Dữ liệu đồng bộ quá lớn.');return doc;
 }
 return {compare,flatten,normalize,decode,update,merge,validate,equal,kinds};
})();
if(typeof module!=='undefined')module.exports=LearningSyncCore;
