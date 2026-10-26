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
function renderSchoolLessonCard(entry,index){
 const theme=activeTheme().id;
 return `<article class="exercise-card school-report-card"><div class="exercise-top">${renderTopicBadge(index)}<div class="exercise-name"><h2>${escapeHTML(entry.title)}</h2></div></div><dl class="exercise-stats"><div><dt>Ngày:</dt><dd>${escapeHTML(entry.day)} · ${escapeHTML(entry.date.slice(8)+'/'+entry.date.slice(5,7))}</dd></div></dl>${theme!=='pixel'?`<span class="exercise-card-art" aria-hidden="true" style="background-position:${(index%4)*100/3}% ${Math.floor(index%16/4)*100/3}%"></span>`:''}<div class="card-actions"><button class="start-button" data-school-lesson="${entry.id}" aria-controls="${entry.id}-lesson-notice">Xem bài học</button><button class="start-button" data-school-exercises="${entry.id}" aria-controls="${entry.id}-exercises-notice">Làm bài tập</button></div><p id="${entry.id}-lesson-notice" class="school-exercises-notice" role="status" hidden></p><p id="${entry.id}-exercises-notice" class="school-exercises-notice" role="status" hidden></p></article>`;
}
function renderSchoolReports(){
 const reports=getSchoolReports(state.grade,state.subject,state.search,state.mode),entries=reports.flatMap(report=>report.entries);
 if(!entries.length)return `<div class="empty-state"><h3>${state.search?'Chưa tìm thấy nội dung báo bài':'Chưa có nội dung báo bài'}</h3><p>${state.search?'Thử từ khóa khác hoặc chọn lại môn học.':'Đang chờ ảnh báo bài để bổ sung cho môn đã chọn.'}</p></div>`;
 return `<div class="exercise-grid school-report-grid">${entries.map((entry,index)=>renderSchoolLessonCard(entry,index)).join('')}</div>`;
}
function openSchoolLesson(id){
 const report=schoolReports.find(r=>String(r.grade)===state.grade&&r.entries.some(e=>e.id===id)),entry=report?.entries.find(e=>e.id===id);
 if(!entry||state.program!=='Báo bài của trường'||entry.subject!==state.subject)return;
 const notice=document.getElementById(entry.id+'-lesson-notice');
 if(notice){notice.textContent='Đang chờ nội dung bài học mới để bổ sung.';notice.hidden=false;}
}
document.addEventListener('click',event=>{
 const exercise=event.target.closest('[data-school-exercises]');
 if(exercise){const notice=document.getElementById(exercise.dataset.schoolExercises+'-exercises-notice');if(notice){notice.textContent='Bài học này chưa có bài tập. Đang chờ bổ sung.';notice.hidden=false;}}
 const button=event.target.closest('[data-school-lesson]');if(button)openSchoolLesson(button.dataset.schoolLesson);
});
