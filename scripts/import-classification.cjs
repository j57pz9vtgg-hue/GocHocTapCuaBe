#!/usr/bin/env node
// Apply only the owner's classification metadata. Never import exam text, answers or solutions.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
function prepareOwnerClassification(input){
 const context={document:{addEventListener(){}},localStorage:{getItem:()=>null},console};vm.createContext(context);
 vm.runInContext(fs.readFileSync(path.join(root,'assets/data.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'assets/classification.js'),'utf8')+'\nglobalThis.api={validate:TimoClassification.validate,report:TimoClassification.buildSharingExport};',context);
 const value=JSON.parse(JSON.stringify(context.api.validate(input))),bank=context.api.report(),byId=new Map(bank.questions.map(q=>[q.id,q]));
 if(input.exportPurpose==='publish-owner-classification'){
  if(!Array.isArray(input.questions)||input.questions.length!==byId.size||new Set(input.questions.map(q=>q.id)).size!==byId.size)throw Error('Tệp phải có đủ các câu đã/chưa phân loại, không trùng hoặc thiếu mã câu.');
  for(const row of input.questions){
   const source=byId.get(row.id),topicId=value.assignments[row.id]||source?.groupId+'-unclassified';
   if(!source||row.paperId!==source.paperId||row.number!==source.number||row.grade!==source.grade||row.groupId!==source.groupId||row.topicId!==topicId||row.status!==(value.assignments[row.id]?'classified':'unclassified'))throw Error('Thông tin nguồn hoặc trạng thái phân loại không khớp: '+row.id);
  }
 }
 const revision=crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0,12);
 return {...value,revision};
}
if(require.main===module){
 try{
  const args=process.argv.slice(2),check=args.includes('--check'),filename=args.find(a=>a!=='--check');if(!filename)throw Error('Dùng: node scripts/import-classification.cjs <tệp JSON chủ dự án gửi> [--check]');
  const value=prepareOwnerClassification(JSON.parse(fs.readFileSync(filename,'utf8')));
  const baseline={};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/classification-base.js'),'utf8')+'\nglobalThis.current=publishedTimoClassification;',baseline);
  if(baseline.current?.resetId)value.resetId=baseline.current.resetId;
  if(!check)fs.writeFileSync(path.join(root,'assets/classification-base.js'),'// Shared classification supplied and approved by the project owner.\nconst publishedTimoClassification = '+JSON.stringify(value,null,2)+';\n');
  console.log(`${check?'Hợp lệ':'Đã cập nhật bản chung'}: ${value.topics.length} chủ đề, ${Object.keys(value.assignments).length} câu đã phân loại. ${check?'':'Tiếp theo: version-assets, kiểm tra, commit/push và xác minh Pages.'}`);
 }catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={prepareOwnerClassification};
