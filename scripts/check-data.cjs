#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const sandbox={};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/data.js'),'utf8')+'\nglobalThis.review={officialPapers,programs,modes,getSubjects,getTimoPaperIssues};',sandbox);
const {officialPapers,programs,modes,getSubjects,getTimoPaperIssues}=sandbox.review;
const issues=[],ids=new Set();
for(const paper of officialPapers){
 const label=paper?.id||'(chưa có id)';
 if(!paper||typeof paper.id!=='string'||!/^[a-zA-Z0-9_-]+$/.test(paper.id)){issues.push(`${label}: id không hợp lệ.`);continue;}
 if(ids.has(paper.id))issues.push(`${label}: trùng id đề.`);ids.add(paper.id);
 if(!programs.includes(paper.program)||!getSubjects(paper.program).includes(paper.subject))issues.push(`${label}: chương trình/môn học không hợp lệ.`);
 if(!modes.includes(paper.mode)||!Number.isInteger(Number(paper.grade))||Number(paper.grade)<1||Number(paper.grade)>12||!paper.title?.trim())issues.push(`${label}: thiếu lớp, nội dung hoặc tên đề hợp lệ.`);
 if(paper.program==='TIMO'&&[modes[0],modes[1]].includes(paper.mode))issues.push(...getTimoPaperIssues(paper).map(issue=>`${label}: ${issue}`));
 if(!Array.isArray(paper.questions)||!paper.questions.length){issues.push(`${label}: chưa có câu hỏi.`);continue;}
 paper.questions.forEach((q,i)=>{
  if(!q||(typeof q.english!=='string'&&typeof q.text!=='string')||!Array.isArray(q.options)||q.options.length<2||q.options.some(option=>typeof option!=='string'))issues.push(`${label}, câu ${i+1}: thiếu nội dung hoặc lựa chọn.`);
  if(q&&Object.hasOwn(q,'answer')&&(q.answerSource!=='user'||!Number.isInteger(q.answer)||q.answer<0||q.answer>=(q.options?.length||0)))issues.push(`${label}, câu ${i+1}: đáp án không hợp lệ hoặc chưa xác nhận nguồn từ chủ dự án.`);
 });
}
if(issues.length){process.stderr.write(issues.join('\n')+'\n');process.exitCode=1}else process.stdout.write(`Dữ liệu hợp lệ: ${officialPapers.length} đề chính thức.\n`);
