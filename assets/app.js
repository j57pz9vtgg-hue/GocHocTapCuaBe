'use strict';
const app = document.querySelector('#app');
const state = { grade: '3', program: programs[0], subject: subjects[0], mode: modes[0], practice: null, answers: {}, submitted: false, solutionsVisible: false, completed: {} };
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = (name, size=21) => {const paths={close:'<path d="m6 6 12 12M6 18 18 6"/>',flag:'<path d="M5 22V3c5-4 9 4 14 0v12c-5 4-9-4-14 0"/>',back:'<path d="M19 12H5m6-6-6 6 6 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',book:'<path d="M12 7C8 4 5 4 2 5v16c4-1 7-1 10 1 3-2 6-2 10-1V5c-3-1-6-1-10 2Zm0 0v15"/>',math:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 10h2m4 0h2m-8 4h2m4 0h2m-8 4h2m4 0h2"/>',language:'<path d="M4 5h12M10 3v2M6 5c0 6 7 10 7 10M14 5c0 6-7 10-7 10M14 21l4-10 4 10m-6-4h4"/>',settings:'<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m9 3 1 2h4l1-2 3 2-1 2 2 3 2 1v3l-2 1-2 3 1 2-3 2-1-2h-4l-1 2-3-2 1-2-2-3-2-1v-3l2-1 2-3-1-2Z"/>',sprout:'<path d="M12 22v-8C4 15 2 9 3 4c7-1 10 3 9 10 0-8 3-12 9-12 1 7-2 12-9 12M7 22h10"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>'};return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.book}</svg>`;};
const hasProvidedAnswers = questions => questions.length > 0 && questions.every(q => q.answerSource === 'user' && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length);
const key = () => [state.grade,state.program,state.subject,state.mode].join('|');
const options = (items, selected) => items.map(v=>`<option value="${escapeHTML(v)}" ${String(v)===selected?'selected':''}>${escapeHTML(v)}</option>`).join('');
function paperTitle(paper) {
 return state.mode===modes[2]?topics[state.subject][paper]:`${state.mode===modes[0]?'Đề vòng loại':'Đề quốc gia'} ${String(paper+1).padStart(2,'0')}`;
}
function formatDuration(seconds) {
 return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
}
function renderHome() {
 const papers=state.mode===modes[2]?[0,1,2]:Array.from({length:15},(_,i)=>i);
 app.innerHTML = `<main class="page dashboard"><section class="world-banner" aria-label="Góc học tập của bé"><div class="banner-controls"><button data-action="settings" class="settings-button">${icon('settings',18)} Cài đặt</button></div><h1><span aria-hidden="true">${icon('book',29)}</span>Góc học tập của bé</h1></section><section class="filter-bar" aria-label="Chọn nội dung học"><div><label for="grade">Chọn lớp</label><select id="grade" data-filter="grade">${Array.from({length:12},(_,i)=>`<option value="${i+1}" ${state.grade===String(i+1)?'selected':''}>Lớp ${i+1}</option>`).join('')}</select></div><div><label for="program">Chọn chương trình</label><select id="program" data-filter="program">${options(programs,state.program)}</select></div><div><label for="subject">Chọn môn học</label><select id="subject" data-filter="subject">${options(subjects,state.subject)}</select></div><div><label for="mode">Chọn nội dung luyện tập</label><select id="mode" data-filter="mode">${options(modes,state.mode)}</select></div></section><section class="practice-catalog" aria-label="Danh sách bài luyện tập"><div class="paper-grid">${papers.map(i=>{const completed=state.completed[`${key()}-${i}`];return `<article class="study-card paper-tile ${completed?'is-complete':''}"><div class="tile-heading"><span class="tile-number">${String(i+1).padStart(2,'0')}</span><div><h2>${paperTitle(i)}</h2><span class="tile-status ${completed?'submitted':''}">${icon('clock',13)} ${completed?'Đã nộp':'Chưa làm'}</span></div></div><dl class="tile-metrics"><div><dt>Kết quả:</dt><dd>${completed?completed.result:'—'}</dd></div><div><dt>Thời gian:</dt><dd>${completed?formatDuration(completed.duration):'—'}</dd></div></dl><div class="tile-illustration" aria-hidden="true"><span class="space-sticker sticker-${i%15}"></span><img class="woodland-mascot" src="./assets/bunny-study.png" alt="" loading="lazy"></div><button class="card-start" data-paper="${i}">${completed?'Làm lại':'Làm bài'}</button></article>`}).join('')}</div></section></main>`;
}
const attemptStorageKey='goc-hoc-tap.attempts.v1';
let attempts={};
try { const saved=JSON.parse(localStorage.getItem(attemptStorageKey)||'{}'); if(saved&&typeof saved==='object'&&!Array.isArray(saved))attempts=saved; } catch {}
const attemptKey=selection=>[selection.grade,selection.program,selection.subject,selection.mode,selection.paper].join('|');
for(const [savedKey,record] of Object.entries(attempts)){
 const parts=savedKey.split('|');if(parts.length!==5||!record||!record.submitted||!record.answers||typeof record.answers!=='object')continue;
 const [grade,program,subject,mode,paperText]=parts,paper=Number(paperText);
 if(!programs.includes(program)||!subjects.includes(subject)||!modes.includes(mode)||!Number.isInteger(paper)||paper<0||paper>14)continue;
 const questions=getQuestions(subject,grade,mode,paper),score=questions.filter((q,i)=>record.answers[i]===q.answer).length;
 state.completed[`${[grade,program,subject,mode].join('|')}-${paper}`]={result:hasProvidedAnswers(questions)?`${score}/${questions.length} câu đúng`:'Chờ đáp án',duration:Number.isFinite(record.updatedAt)&&Number.isFinite(record.startedAt)?Math.max(1,Math.floor((record.updatedAt-record.startedAt)/1000)):0};
}

function saveAttempt() {
 if(!state.practice)return;
 const p=state.practice;
 attempts[attemptKey(p)]={answers:{...state.answers},submitted:state.submitted,startedAt:p.startedAt,updatedAt:Date.now()};
 try{localStorage.setItem(attemptStorageKey,JSON.stringify(attempts));return true;}catch{return false;}
}
let pendingPaper=null, introTrigger=null;
const introDialog=document.querySelector('#paper-intro');
function openPaperIntro(paper) {
 const selection={grade:state.grade,program:state.program,subject:state.subject,mode:state.mode,paper,title:paperTitle(paper),questions:getQuestions(state.subject,state.grade,state.mode,paper),durationMinutes:null};
 pendingPaper=selection;introTrigger=document.activeElement;
 const previous=attempts[attemptKey(selection)],resume=previous&&!previous.submitted;
 introDialog.innerHTML=`<button class="intro-close" data-action="close-intro" aria-label="Đóng giới thiệu đề">${icon('close',23)}</button><img class="intro-banner" src="./assets/arctic-banner.png" alt="Chim cánh cụt và gấu Bắc Cực khám phá hồ băng giữa núi tuyết"><p class="intro-kicker">Sẵn sàng khám phá chưa?</p><h2 id="paper-intro-title">${escapeHTML(selection.title)}</h2><p class="intro-description">Mỗi câu hỏi là một bước chân trên hành trình tri thức. Bé hãy đọc kỹ và chọn một đáp án nhé!</p><div class="intro-meta"><span>${icon('flag',20)} ${selection.questions.length} câu hỏi</span><span>${icon('clock',20)} ${selection.durationMinutes?selection.durationMinutes+' phút':'Không giới hạn'}</span><span>Lớp ${selection.grade}</span></div><p class="intro-note">Bài làm được lưu trên trình duyệt này khi trình duyệt cho phép lưu dữ liệu.</p><button class="intro-start" data-action="start-paper">${resume?'Tiếp tục làm bài':'Bắt đầu làm bài'} ${icon('arrow',21)}</button>`;
 introDialog.showModal();introDialog.querySelector('.intro-start').focus();
}
introDialog.addEventListener('close',()=>{pendingPaper=null;introTrigger?.focus();});
function startPendingPaper() {
 if(!pendingPaper)return;
 const selection=pendingPaper,previous=attempts[attemptKey(selection)],resume=previous&&!previous.submitted;
 state.answers={};state.submitted=false;state.solutionsVisible=false;
 if(resume&&previous.answers&&typeof previous.answers==='object')selection.questions.forEach((q,i)=>{const value=previous.answers[i];if(Number.isInteger(value)&&value>=0&&value<q.options.length)state.answers[i]=value;});
 state.practice={...selection,startedAt:resume&&Number.isFinite(previous.startedAt)&&previous.startedAt>0&&previous.startedAt<=Date.now()?previous.startedAt:Date.now()};
 introDialog.close();saveAttempt();renderPractice();app.querySelector('h1').focus();window.scrollTo({top:0});
}
function renderQuestion(q,i,ready) {
 const mainText=q.english||q.text||'',translation=q.translation||q.vietnamese||'';
 return `<fieldset class="exam-question question"><legend class="question-accessible">Câu ${i+1}</legend><p class="question-title"><strong>Câu ${i+1}.</strong> <span ${q.english?'lang="en"':''}>${escapeHTML(mainText)}</span></p>${translation?`<p class="question-translation" lang="vi">${escapeHTML(translation)}</p>`:''}${q.detail?`<div class="question-detail">${escapeHTML(q.detail)}</div>`:''}${q.image&&/^\.\/assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|jpeg|svg)$/.test(q.image)?`<figure class="question-figure"><img src="${escapeHTML(q.image)}" alt="${escapeHTML(q.imageAlt||'Hình minh họa câu hỏi '+(i+1))}"></figure>`:''}<div class="answers">${q.options.map((option,j)=>`<label class="${state.answers[i]===j?'chosen':''} ${ready&&state.solutionsVisible&&j===q.answer?'correct':''} ${ready&&state.solutionsVisible&&state.answers[i]===j&&j!==q.answer?'incorrect':''}"><input type="radio" name="question-${i}" data-question="${i}" value="${j}" ${state.answers[i]===j?'checked':''} ${state.submitted?'disabled':''}><span class="answer-text"><span class="answer-letter">${String.fromCharCode(65+j)}.</span> ${escapeHTML(option)}</span></label>`).join('')}</div>${ready&&state.solutionsVisible&&q.explanation?`<p class="explanation">${escapeHTML(q.explanation)}</p>`:''}</fieldset>`;
}
function renderPractice() {
 const p=state.practice,questions=p.questions,answered=Object.keys(state.answers).length;
 const ready=hasProvidedAnswers(questions),score=questions.filter((q,i)=>state.answers[i]===q.answer).length;
 app.innerHTML=`<main class="practice-page exam-page"><button class="back" data-action="home">${icon('back',17)} Về góc luyện tập</button><div class="practice-heading"><span>${escapeHTML(p.program)} / Lớp ${escapeHTML(p.grade)} / ${escapeHTML(p.subject)}</span><h1 tabindex="-1">${escapeHTML(p.title)}</h1><p>${questions.length} câu hỏi · ${p.durationMinutes?p.durationMinutes+' phút':'Không giới hạn thời gian'}</p></div>${state.submitted?`<section class="result" aria-live="polite"><div><h2 tabindex="-1">${ready?`Bé làm đúng ${score}/${questions.length} câu!`:'Bé đã nộp bài!'}</h2><p>${!ready?'Chờ đáp án từ phụ huynh. Bài chưa được chấm điểm.':score===questions.length?'Tuyệt vời! Bé đã hoàn thành thật tốt.':'Mỗi lần luyện tập là một bước tiến. Bé cố gắng nhé!'}</p></div><button class="primary" data-action="home">Luyện bài khác ${icon('arrow',16)}</button></section>`:''}<form id="quiz"><div class="quiz-progress"><span id="answer-count">${state.submitted?'Kết quả bài luyện':`Đã trả lời ${answered}/${questions.length} câu`}</span><progress value="${answered}" max="${questions.length}" aria-label="Số câu đã trả lời"></progress></div><div class="question-sheet">${questions.map((q,i)=>renderQuestion(q,i,ready)).join('')}</div>${state.submitted&&ready&&!state.solutionsVisible?'<div class="solution-access"><p>Đáp án và lời giải dành cho phụ huynh cùng bé xem lại.</p><button type="button" class="primary" data-action="solutions">Xem đáp án và lời giải</button></div>':''}<div class="quiz-actions">${state.submitted?'<button type="button" class="primary" data-action="retry">Làm lại</button>':`<p>Trả lời đủ các câu hỏi để nộp bài.</p><button class="primary" type="submit" ${answered!==questions.length?'disabled':''}>Nộp bài ${icon('arrow',17)}</button>`}</div></form></main>`;
}
function home(){state.practice=null;renderHome();window.scrollTo({top:0});}
document.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 const action=button.dataset.action;
 if(action==='help')document.querySelector('#help').showModal();
 if(action==='close-help')document.querySelector('#help').close();
 if(action==='home')home();
 if(action==='close-intro')introDialog.close();
 if(action==='start-paper')startPendingPaper();
 if(action==='retry'){state.answers={};state.submitted=false;state.solutionsVisible=false;state.practice.startedAt=Date.now();saveAttempt();renderPractice();window.scrollTo({top:0});}
 if(button.dataset.subject){state.subject=button.dataset.subject;renderHome();app.querySelector(`[data-subject="${state.subject}"]`).focus();}
 if(button.dataset.mode!==undefined){state.mode=modes[Number(button.dataset.mode)];renderHome();app.querySelector(`[data-mode="${button.dataset.mode}"]`).focus();}
 if(button.dataset.paper!==undefined)openPaperIntro(Number(button.dataset.paper));
});
app.addEventListener('change',event=>{
 const input=event.target;
 if(input.dataset.filter){const id=input.id;state[input.dataset.filter]=input.value;renderHome();const target=id?document.getElementById(id):app.querySelector(`input[name="program"][value="${state.program}"]`);target?.focus();}
 if(input.dataset.question!==undefined&&!state.submitted){state.answers[Number(input.dataset.question)]=Number(input.value);input.closest('.answers').querySelectorAll('label').forEach(label=>label.classList.toggle('chosen',label.contains(input)));const count=Object.keys(state.answers).length;document.querySelector('#answer-count').textContent=`Đã trả lời ${count}/${state.practice.questions.length} câu`;document.querySelector('progress').value=count;document.querySelector('#quiz button[type="submit"]').disabled=count!==state.practice.questions.length;saveAttempt();}
});
app.addEventListener('submit',event=>{event.preventDefault();if(!state.practice||state.submitted||Object.keys(state.answers).length!==state.practice.questions.length)return;state.submitted=true;const score=state.practice.questions.filter((q,i)=>state.answers[i]===q.answer).length;state.completed[`${key()}-${state.practice.paper}`]={result:hasProvidedAnswers(state.practice.questions)?`${score}/${state.practice.questions.length} câu đúng`:'Chờ đáp án',duration:Math.max(1,Math.floor((Date.now()-state.practice.startedAt)/1000))};saveAttempt();renderPractice();app.querySelector('.result h2').focus();window.scrollTo({top:0,behavior:'smooth'});});
app.addEventListener('keydown',event=>{const tab=event.target.closest('[role="tab"]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const current=Number(tab.dataset.mode), next=event.key==='Home'?0:event.key==='End'?modes.length-1:(current+(event.key==='ArrowRight'?1:-1)+modes.length)%modes.length;state.mode=modes[next];renderHome();app.querySelector(`[data-mode="${next}"]`).focus();});
renderHome();
