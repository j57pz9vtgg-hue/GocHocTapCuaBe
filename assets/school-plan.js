// Tentative dates are separate from confirmed school reports and never create lesson content.
function schoolPlanISO(date){return date.toISOString().slice(0,10);}
function schoolPlanDate(iso){return new Date(iso+'T00:00:00Z');}
function schoolPlanOffset(iso,days){const date=schoolPlanDate(iso);date.setUTCDate(date.getUTCDate()+days);return schoolPlanISO(date);}
function schoolPlanDay(iso){return ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'][schoolPlanDate(iso).getUTCDay()];}
function schoolPlanWeek(iso){const date=schoolPlanDate(iso),start=schoolPlanOffset(iso,-((date.getUTCDay()+6)%7)),end=schoolPlanOffset(start,4),display=x=>x.slice(8)+'/'+x.slice(5,7)+'/'+x.slice(0,4);return {start,end,title:`Lịch dự kiến tuần ${display(start)} - ${display(end)}`};}
function schoolPlanDateLabel(iso){if(!/^\d{4}-\d{2}-\d{2}$/.test(iso)||!Number.isFinite(schoolPlanDate(iso).getTime()))return 'Chọn ngày học.';return schoolPlanDay(iso)+', '+iso.slice(8)+'/'+iso.slice(5,7)+'/'+iso.slice(0,4);}
const schoolPlanBaseEntries=(()=>{
 const entries=[];let number=51;
 for(let week=0;number<=83;week++){
  const monday=schoolPlanOffset('2026-11-09',week*7);
  for(const [offset,periods]of [[0,'8,9'],[1,'8,9'],[2,'1,2'],[2,'3,4'],[3,'5,6']]){
   if(number>83)break;entries.push({id:`planned-tieng-viet-lesson-${number}`,date:schoolPlanOffset(monday,offset),periods,title:`Bài ${number}`,lessonNumber:number++,subject:'Tiếng Việt',projected:true,sections:[],preparation:[]});
  }
  const friday=schoolPlanOffset(monday,4);entries.push({id:`planned-tieng-viet-practice-${friday}`,date:friday,periods:'7,8',title:'Thực hành',subject:'Tiếng Việt',projected:true,sections:[],preparation:[]});
 }
 return entries;
})();
function isSchoolPlanId(id){return schoolPlanBaseEntries.some(e=>e.id===id);}
function validSchoolPlanDraft(id,value){
 if(!isSchoolPlanId(id)||!value||value.type!=='school-plan-v1'||typeof value.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value.date)||typeof value.title!=='string'||!value.title.trim()||value.title.length>180||typeof value.periods!=='string'||value.periods.length>40||!Number.isFinite(value.updatedAt)||value.updatedAt<0)return false;
 const date=schoolPlanDate(value.date);if(!Number.isFinite(date.getTime())||schoolPlanISO(date)!==value.date||![1,2,3,4,5].includes(date.getUTCDay()))return false;
 if(value.periods){if(!/^\d{1,2}(,\d{1,2})*$/.test(value.periods))return false;const numbers=value.periods.split(',').map(Number);if(numbers.some(n=>n<1||n>12)||new Set(numbers).size!==numbers.length)return false;}
 return Object.keys(value).every(k=>['type','date','title','periods','updatedAt'].includes(k));
}
function schoolPlanEntry(id){
 const base=schoolPlanBaseEntries.find(e=>e.id===id);if(!base)return null;let draft;
 try{draft=JSON.parse(localStorage.getItem(schoolExerciseStorageKey(id))||'null');}catch{}
 const entry=validSchoolPlanDraft(id,draft)?{...base,...draft}:{...base};return {...entry,day:schoolPlanDay(entry.date)};
}
function schoolReportSources(){
 const grouped=new Map();
 for(const base of schoolPlanBaseEntries){const entry=schoolPlanEntry(base.id),week=schoolPlanWeek(entry.date);if(!grouped.has(week.start))grouped.set(week.start,{id:'school-plan-week-'+week.start,grade:'1',subject:'Tiếng Việt',layout:'table',projected:true,...week,entries:[]});grouped.get(week.start).entries.push(entry);}
 return [...schoolReports,...grouped.values()];
}
function refreshSchoolPlanView(id){
 if(state.program!=='Báo bài của trường'||state.grade!=='1')return;
 const entry=schoolPlanEntry(id),selected=schoolReportSelection?.id===id;
 if(selected&&state.mode!=='Tất cả các tuần')state.mode=schoolPlanWeek(entry.date).title;
 else if(!getModes(state.program,state.grade,state.subject).includes(state.mode))state.mode=getModes(state.program,state.grade,state.subject)[0];
 renderHome();
}
function saveSchoolPlanDraft(id,value){
 if(!validSchoolPlanDraft(id,value))throw Error('Vui lòng nhập tên bài, ngày từ thứ Hai đến thứ Sáu và các tiết từ 1 đến 12, cách nhau bằng dấu phẩy.');
 localStorage.setItem(schoolExerciseStorageKey(id),JSON.stringify(value));schoolReportSelection={id,kind:schoolReportSelection?.id===id?schoolReportSelection.kind:'lesson'};window.LearningSync?.changed('worksheet',id,value);refreshSchoolPlanView(id);
}
function openSchoolPlanEditor(id){
 const entry=schoolPlanEntry(id);if(!entry)return;
 let dialog=document.getElementById('school-plan-editor');if(!dialog){dialog=document.createElement('dialog');dialog.id='school-plan-editor';dialog.className='school-plan-editor';document.body.append(dialog);}
 dialog.dataset.entryId=id;dialog.innerHTML=`<h2>Sửa lịch dự kiến</h2><form><label>Tên bài<input name="title" value="${escapeHTML(entry.title)}" maxlength="180" required></label><label>Ngày học<input name="date" type="date" lang="vi-VN" value="${entry.date}" required></label><p data-plan-date-hint>${schoolPlanDateLabel(entry.date)}</p><label>Tiết học<input name="periods" value="${escapeHTML(entry.periods)}" maxlength="40" placeholder="Ví dụ: 8,9" inputmode="numeric"></label><p>Chọn ngày từ thứ Hai đến thứ Sáu. Đổi ngày sang tuần khác sẽ tự chuyển bài vào tuần tương ứng.</p><p role="status" aria-live="polite"></p><div class="school-plan-editor-actions"><button type="button" data-plan-cancel>Hủy</button><button type="button" data-plan-reset>Khôi phục lịch gốc</button><button type="submit">Lưu lịch</button></div></form>`;
 dialog.showModal();dialog.querySelector('[name="title"]').focus();
}
document.addEventListener('click',event=>{
 const edit=event.target.closest('[data-school-plan-edit]');if(edit){openSchoolPlanEditor(edit.dataset.schoolPlanEdit);return;}
 const dialog=event.target.closest('#school-plan-editor');if(!dialog)return;
 if(event.target.closest('[data-plan-cancel]'))dialog.close();
 if(event.target.closest('[data-plan-reset]')){const base=schoolPlanBaseEntries.find(e=>e.id===dialog.dataset.entryId);for(const key of ['title','date','periods'])dialog.querySelector(`[name="${key}"]`).value=base[key];dialog.querySelector('[data-plan-date-hint]').textContent=schoolPlanDateLabel(base.date);dialog.querySelector('[role="status"]').textContent='Đã điền lịch gốc. Bấm Lưu lịch để áp dụng.';}
});
document.addEventListener('input',event=>{if(event.target.matches('#school-plan-editor [name="date"]'))event.target.closest('dialog').querySelector('[data-plan-date-hint]').textContent=schoolPlanDateLabel(event.target.value);});
document.addEventListener('submit',event=>{
 const dialog=event.target.closest('#school-plan-editor');if(!dialog)return;event.preventDefault();
 const fields=new FormData(event.target),value={type:'school-plan-v1',title:String(fields.get('title')||'').trim(),date:String(fields.get('date')||''),periods:String(fields.get('periods')||'').replace(/\s/g,''),updatedAt:Date.now()};
 try{saveSchoolPlanDraft(dialog.dataset.entryId,value);dialog.close();document.querySelector(`[data-school-plan-edit="${dialog.dataset.entryId}"]`)?.focus({preventScroll:true});}catch(error){dialog.querySelector('[role="status"]').textContent=error.name==='QuotaExceededError'?'Chưa lưu được. Hãy kiểm tra dung lượng lưu trữ của trình duyệt.':error.message;}
});
window.addEventListener('storage',event=>{const prefix='goc-hoc-tap.school-exercise.v1.';if(event.key?.startsWith(prefix)&&isSchoolPlanId(event.key.slice(prefix.length)))refreshSchoolPlanView(event.key.slice(prefix.length));});
