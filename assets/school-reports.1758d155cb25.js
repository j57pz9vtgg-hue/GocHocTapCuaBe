// School reports transcribed only from owner-provided content. The removed October26–30 report stays removed.
const schoolReports = [
  {
    "id": "school-week-2026-10-19-vietnamese",
    "grade": "1",
    "subject": "Tiếng Việt",
    "start": "2026-10-19",
    "end": "2026-10-23",
    "title": "Báo bài tuần 19/10/2026 - 23/10/2026",
    "layout": "table",
    "entries": [
      {
        "id": "tieng-viet-2026-10-19",
        "date": "2026-10-19",
        "day": "Thứ Hai",
        "periods": "8,9",
        "subject": "Tiếng Việt",
        "title": "Bài 36: om ôm ơm",
        "sections": [],
        "preparation": [
          "Đọc SGK tr.84-85"
        ]
      }
    ]
  },
  {
    "id": "school-week-2026-10-19-toan",
    "grade": "1",
    "subject": "Toán",
    "start": "2026-10-19",
    "end": "2026-10-23",
    "title": "Báo bài tuần 19/10/2026 - 23/10/2026",
    "layout": "table",
    "entries": [
      {
        "id": "toan-2026-10-19",
        "date": "2026-10-19",
        "day": "Thứ Hai",
        "periods": "7",
        "subject": "Toán",
        "title": "Bài 10: Phép cộng trong phạm vi 10 (T.1)",
        "sections": [],
        "preparation": []
      }
    ]
  },
  {
    "id": "school-week-2026-10-19-science",
    "grade": "1",
    "subject": "SCIENCE",
    "start": "2026-10-19",
    "end": "2026-10-23",
    "title": "Báo bài tuần 19/10/2026 - 23/10/2026",
    "layout": "table",
    "entries": [
      {
        "id": "science-2026-10-19",
        "date": "2026-10-19",
        "day": "Thứ Hai",
        "periods": "1,2",
        "subject": "SCIENCE",
        "title": "2.3 Changing Speed",
        "sections": [
          {
            "lines": [
              "Find out how forces make things go faster or slower.",
              "Recognize that things will only speed up, slow down or change direction when something else causes it to do so",
              "Investigate carefully and safely"
            ]
          },
          {
            "heading": "Key Vocabulary",
            "lines": [
              "brakes, explain, fast, faster, pedals, slow, slower, slow down, speed, speed up"
            ]
          }
        ],
        "preparation": [
          "LB Page: 47 - 51",
          "WB Page: 25"
        ],
        "links": [
          {
            "label": "Pre-Learning Activities",
            "url": "https://wordwall.net/resource/99907940"
          }
        ]
      }
    ]
  },
  {
    "id": "school-week-2026-10-19-esl",
    "grade": "1",
    "subject": "ESL",
    "start": "2026-10-19",
    "end": "2026-10-23",
    "title": "Báo bài tuần 19/10/2026 - 23/10/2026",
    "layout": "table",
    "entries": [
      {
        "id": "esl-2026-10-19",
        "date": "2026-10-19",
        "day": "Thứ Hai",
        "periods": "3,4",
        "subject": "ESL",
        "title": "3.4 - Describing ongoing actions",
        "sections": [
          {
            "lines": [
              "Listen to and understand a description.",
              "Play a guessing game and speak about what people are doing."
            ]
          },
          {
            "heading": "Key Vocabulary",
            "lines": [
              "Wave, rip, cut, fold, write, use, kick, climb, balance, win, run, hop."
            ]
          },
          {
            "heading": "Grammar",
            "lines": [
              "Present continuous: I like/don’t like ____ing."
            ]
          }
        ],
        "preparation": []
      }
    ]
  },
  {
    "id": "school-week-2026-10-19-global",
    "grade": "1",
    "subject": "GLOBAL",
    "start": "2026-10-19",
    "end": "2026-10-23",
    "title": "Báo bài tuần 19/10/2026 - 23/10/2026",
    "layout": "table",
    "entries": []
  },
  {
    "id": "school-week-2026-10-19-mathematics",
    "grade": "1",
    "subject": "MATHEMATICS",
    "start": "2026-10-19",
    "end": "2026-10-23",
    "title": "Báo bài tuần 19/10/2026 - 23/10/2026",
    "layout": "table",
    "entries": []
  }
];
function getSchoolReports(grade,subject,query='',week='Tất cả các tuần'){
 const normalize=v=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase(),search=normalize(query.trim());
 return schoolReports.filter(r=>String(r.grade)===String(grade)&&(week==='Tất cả các tuần'||r.title===week)).map(report=>({...report,entries:report.entries.filter(e=>e.subject===subject&&(!search||normalize(JSON.stringify(e)+' '+report.title).includes(search)))})).filter(r=>r.entries.length||(r.layout==='table'&&r.subject===subject&&!search));
}
function schoolLessonMeta(entry){
 return `<time datetime="${entry.date}">${escapeHTML(entry.day)} · ${entry.date.slice(8)}/${entry.date.slice(5,7)}</time><span>Tiết ${escapeHTML(entry.periods)}</span>${entry.kind==='test'?'<strong class="school-kind">Kiểm tra</strong>':entry.kind==='event'?'<strong class="school-kind">Hoạt động</strong>':''}`;
}
function schoolLessonContent(entry){
 return `${entry.sections.map(section=>`<div class="school-lesson-section">${section.heading?`<h4>${escapeHTML(section.heading)}</h4>`:''}${section.lines.length?`<ul>${section.lines.map(line=>`<li>${escapeHTML(line)}</li>`).join('')}</ul>`:''}</div>`).join('')}${(entry.links||[]).map(link=>`<p><a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)} ↗</a></p>`).join('')}${entry.preparation.length?`<aside class="school-preparation"><h4>Chuẩn bị</h4><ul>${entry.preparation.map(line=>`<li>${escapeHTML(line)}</li>`).join('')}</ul></aside>`:''}${!entry.sections.length&&!entry.preparation.length&&!(entry.links||[]).length?'<p class="school-detail-note">Báo bài đã gửi chỉ cung cấp tên bài học/hoạt động này.</p>':''}`;
}
function renderSchoolReportTable(report){
 return `<div class="school-table-wrap"><table class="school-report-table" aria-label="${escapeHTML(report.title)}"><thead><tr><th scope="col">Ngày</th><th scope="col">Bài học</th><th scope="col">Tài liệu</th></tr></thead><tbody>${report.entries.length?report.entries.map(entry=>`<tr><th scope="row">${escapeHTML(entry.day)}<br><time datetime="${entry.date}">${escapeHTML(entry.date.slice(8)+'/'+entry.date.slice(5,7))}</time></th><td><strong>${escapeHTML(entry.title)}</strong>${entry.sections.length||(entry.links||[]).length?schoolLessonContent({...entry,preparation:[]}):''}</td><td></td></tr>`).join(''):'<tr><td colspan="3" class="school-table-pending">Chưa có nội dung báo bài. Đang chờ ảnh để bổ sung.</td></tr>'}</tbody></table></div>`;
}
function renderSchoolReports(){
 const reports=getSchoolReports(state.grade,state.subject,state.search,state.mode);
 if(!reports.length)return `<div class="empty-state"><h3>${state.search?'Chưa tìm thấy nội dung báo bài':'Chưa có báo bài cho lựa chọn này'}</h3><p>${state.search?'Thử từ khóa khác hoặc chọn lại môn học.':'Báo bài sẽ xuất hiện khi được bổ sung cho lớp và môn đã chọn.'}</p></div>`;
 return `<div class="school-reports">${reports.map(report=>`<section aria-label="${escapeHTML(report.title)}" class="school-week">${report.layout==='table'?renderSchoolReportTable(report):`<div class="school-lesson-grid">${report.entries.map(entry=>`<article class="school-lesson ${entry.kind?'school-'+entry.kind:''}"><header>${schoolLessonMeta(entry)}</header><h3><button type="button" class="school-lesson-open" data-school-lesson="${entry.id}" aria-haspopup="dialog">${escapeHTML(entry.title)}<span aria-hidden="true">Xem nội dung bài học →</span></button></h3></article>`).join('')}</div>`}</section>`).join('')}</div>`;
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
