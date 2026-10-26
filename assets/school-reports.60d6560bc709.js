// School reports are added only from owner-provided content.
// The owner removed the entire 26–30/10/2026 report.
const schoolReports = [];
function getSchoolReports(grade,subject,query='',week='Tất cả các tuần'){
 const normalize=v=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase(),search=normalize(query.trim());
 return schoolReports.filter(r=>String(r.grade)===String(grade)&&(week==='Tất cả các tuần'||r.title===week)).map(report=>({...report,entries:report.entries.filter(e=>e.subject===subject&&(!search||normalize(JSON.stringify(e)+' '+report.title).includes(search)))})).filter(r=>r.entries.length);
}
function schoolLessonMeta(entry){
 return `<time datetime="${entry.date}">${escapeHTML(entry.day)} · ${entry.date.slice(8)}/${entry.date.slice(5,7)}</time><span>Tiết ${escapeHTML(entry.periods)}</span>${entry.kind==='test'?'<strong class="school-kind">Kiểm tra</strong>':entry.kind==='event'?'<strong class="school-kind">Hoạt động</strong>':''}`;
}
function schoolLessonContent(entry){
 return `${entry.sections.map(section=>`<div class="school-lesson-section">${section.heading?`<h4>${escapeHTML(section.heading)}</h4>`:''}${section.lines.length?`<ul>${section.lines.map(line=>`<li>${escapeHTML(line)}</li>`).join('')}</ul>`:''}</div>`).join('')}${(entry.links||[]).map(link=>`<p><a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)} ↗</a></p>`).join('')}${entry.preparation.length?`<aside class="school-preparation"><h4>Chuẩn bị</h4><ul>${entry.preparation.map(line=>`<li>${escapeHTML(line)}</li>`).join('')}</ul></aside>`:''}${!entry.sections.length&&!entry.preparation.length&&!(entry.links||[]).length?'<p class="school-detail-note">Báo bài đã gửi chỉ cung cấp tên bài học/hoạt động này.</p>':''}`;
}
function renderSchoolReports(){
 const reports=getSchoolReports(state.grade,state.subject,state.search,state.mode);
 if(!reports.length)return `<div class="empty-state"><h3>${state.search?'Chưa tìm thấy nội dung báo bài':'Chưa có báo bài cho lựa chọn này'}</h3><p>${state.search?'Thử từ khóa khác hoặc chọn lại môn học.':'Báo bài sẽ xuất hiện khi được bổ sung cho lớp và môn đã chọn.'}</p></div>`;
 return `<div class="school-reports">${reports.map(report=>`<section aria-labelledby="${report.id}-title" class="school-week"><header class="school-week-heading"><h2 id="${report.id}-title">${escapeHTML(report.title)}</h2><p>Lớp ${escapeHTML(report.grade)} · ${escapeHTML(subjectDisplayName(state.subject))}</p></header><div class="school-lesson-grid">${report.entries.map(entry=>`<article class="school-lesson ${entry.kind?'school-'+entry.kind:''}"><header>${schoolLessonMeta(entry)}</header><h3><button type="button" class="school-lesson-open" data-school-lesson="${entry.id}" aria-haspopup="dialog">${escapeHTML(entry.title)}<span aria-hidden="true">Xem nội dung bài học →</span></button></h3></article>`).join('')}</div></section>`).join('')}</div>`;
}
let schoolLessonTrigger=null;
function openSchoolLesson(id){
 const report=schoolReports.find(r=>String(r.grade)===state.grade&&r.entries.some(e=>e.id===id)),entry=report?.entries.find(e=>e.id===id);if(!entry||state.program!=='Báo bài của trường'||entry.subject!==state.subject)return;
 let dialog=document.querySelector('#school-lesson-dialog');
 if(!dialog){dialog=document.createElement('dialog');dialog.id='school-lesson-dialog';dialog.className='school-lesson-dialog';dialog.setAttribute('aria-labelledby','school-lesson-title');document.body.append(dialog);dialog.addEventListener('close',()=>{if(schoolLessonTrigger?.isConnected)schoolLessonTrigger.focus({preventScroll:true});if(typeof saveCurrentView==='function')saveCurrentView()});}
 schoolLessonTrigger=document.querySelector(`[data-school-lesson="${entry.id}"]`)||document.activeElement;
 dialog.innerHTML=`<header><div><p>${escapeHTML(report.title)} · Lớp ${report.grade} · ${escapeHTML(subjectDisplayName(entry.subject))}</p><h2 id="school-lesson-title">${escapeHTML(entry.title)}</h2></div><button type="button" data-close-school-lesson aria-label="Đóng nội dung bài học">×</button></header><div class="school-lesson school-lesson-detail"><header>${schoolLessonMeta(entry)}</header>${schoolLessonContent(entry)}</div>`;
 dialog.dataset.lessonId=entry.id;dialog.showModal();if(typeof saveCurrentView==='function')saveCurrentView();
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-school-lesson]');if(button)openSchoolLesson(button.dataset.schoolLesson);if(event.target.closest('[data-close-school-lesson]'))document.querySelector('#school-lesson-dialog')?.close();});
