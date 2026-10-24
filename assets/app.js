'use strict';
const app = document.querySelector('#app');
const state = { grade: '3', program: programs[0], subject: subjects[0], mode: modes[0], practice: null, answers: {}, submitted: false, solutionsVisible: false, completed: {} };
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=(name,size=21)=> (referenceIcons[name]||referenceIcons.book).replace('width="24"',`width="${size}"`).replace('height="24"',`height="${size}"`);
const publicAsset=name=>`./assets/reference/media/${name}.webp`;
function activeTheme(){return referenceThemes.find(t=>t.id===document.documentElement.dataset.theme)||referenceThemes[0];}
try{const saved=JSON.parse(localStorage.getItem('goc-hoc-tap.preferences.v1')||'null');document.documentElement.dataset.theme=saved?.theme==='space'?'crystal':referenceThemes.some(t=>t.id===saved?.theme)?saved.theme:'arctic';}catch{document.documentElement.dataset.theme='arctic';}
state.search='';
const hasProvidedAnswers = questions => questions.length > 0 && questions.every(q => q.answerSource === 'user' && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length);
const key = () => [state.grade,state.program,state.subject,state.mode].join('|');
const options = (items, selected) => items.map(v=>`<option value="${escapeHTML(v)}" ${String(v)===selected?'selected':''}>${escapeHTML(v)}</option>`).join('');
function paperTitle(paper) {
 return state.mode===modes[2]?topics[state.subject][paper]:`${state.mode===modes[0]?'Đề vòng loại':'Đề quốc gia'} ${String(paper+1).padStart(2,'0')}`;
}
function formatDuration(seconds) {
 return `${Math.floor(seconds/60)} phút ${String(seconds%60).padStart(2,'0')} giây`;
}
function referencePixelIcon(name,size=22){
 if(activeTheme().id!=='pixel')return icon(name,size);
 const paths={book:'<path d="M2 4h8v1h4V4h8v17h-8v1h-4v-1H2z" fill="#083b54"/><path d="M4 3h6v1h4V3h6v15h-6v1h-4v-1H4z" fill="#fcffff" stroke="#0e8095"/><path d="M11 5h2v13h-2zM5 7h4v2H5zm0 4h4v1H5zm0 3h4v1H5z" fill="#52c5d5"/><path d="M16 4h2v2h2v2h-2v7h-2V8h-2V6h2z" fill="#ffc43d"/>',flag:'<path d="M5 2h3v20H5z" fill="#543325"/><path d="M8 3h6v2h7v8h-6v-2H8z" fill="#fc6385" stroke="#7e304f"/><path d="M9 4h4v2H9z" fill="#ffd8e3"/><path d="M3 21h7v2H3z" fill="#a56a34"/>',star:'<path d="M10 2h4v5h2v2h6v4h-3v6h-5v-2h-4v2H5v-6H2V9h6V7h2z" fill="#ffd047" stroke="#74491d"/><path d="M10 5h2v4H8v2H5v-1h5z" fill="#fff4b0"/>'};
 return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="crispEdges">${paths[name]||paths.book}</svg>`;
}
function renderReferenceHeader(){
 const theme=activeTheme().id,bookThemes=['crystal','cloud','forest','magic','treasure','cars'];
 const brandImage=theme==='pixel'?`<img src="${publicAsset('pixel-book')}" alt="">`:bookThemes.includes(theme)?`<img class="crystal-brand-icon" src="${publicAsset(theme+'-book')}" alt="">`:icon('book',44);
 return `<div class="catalog-masthead"><header class="site-header"><div class="header-inner"><button class="brand" aria-label="Góc học tập của bé — Danh sách đề" data-action="home">${brandImage}<span>Góc học tập <span class="brand-child">của bé</span></span><span class="brand-spark" aria-hidden="true">✦</span></button><div class="header-tools"><div class="search-box">${icon('search',21)}<input type="search" id="paper-search" aria-label="Tìm bài tập" placeholder="Tìm bài tập" value="${escapeHTML(state.search)}">${state.search?`<button class="icon-button" aria-label="Xóa tìm kiếm" data-action="clear-search">${icon('close',17)}</button>`:''}</div><button class="icon-button cloud-sync-button" data-action="local-data" aria-label="Dữ liệu trên thiết bị" title="Dữ liệu trên thiết bị">${icon('cloud',22)}</button><button class="icon-button appearance-button" data-action="theme-picker" aria-label="Chọn giao diện" title="Chọn giao diện">${icon('palette',22)}</button><button class="icon-button logout-button" data-action="home" aria-label="Về danh sách" title="Về danh sách">${icon('exit',21)}</button><button class="parent-button" data-action="parent-settings">${icon('users',23)}<span>Phụ huynh</span></button></div></div></header><div class="adventure-banner"><h1 class="banner-message">Học vui, chinh phục từng bài!</h1>${theme!=='pixel'?`<img class="modern-hero" src="${publicAsset(activeTheme().hero)}" alt="" aria-hidden="true">`:''}</div><div class="page-content catalog-filter-bar"><div class="study-filters" aria-label="Bộ lọc bài tập">${[['grade','Chọn lớp',Array.from({length:12},(_,i)=>[String(i+1),'Lớp '+(i+1)]),'grade'],['program','Chọn chương trình',programs.map(p=>[p,p]),'blocks'],['subject','Chọn môn học',subjects.map(p=>[p,p]),'blocks'],['mode','Chọn nội dung luyện tập',modes.map(p=>[p,p]),'clipboard']].map(([key,label,values,glyph])=>`<div class="filter-field">${['crystal','cloud','forest','toys','arctic'].includes(theme)?`<span class="crystal-filter-icon" aria-hidden="true">${icon(glyph,29)}</span>`:''}<label for="${key}">${label}</label><div class="filter-select"><select id="${key}" data-filter="${key}">${values.map(([value,text])=>`<option value="${escapeHTML(value)}" ${state[key]===value?'selected':''}>${text}</option>`).join('')}</select>${icon('down',18)}</div></div>`).join('')}</div></div></div>`;
}
function renderReferenceCard(i){
 const completed=state.completed[`${key()}-${i}`],theme=activeTheme().id;
 const id=[state.grade,state.program,state.subject,state.mode,i].join('|'),draft=attempts[id]&&!attempts[id].submitted;
 const number=i+1,colors=['#ffae21','#28a9ef','#f84e7b','#30bf66','#a143ec','#10b4b8','#ffc62e'];
 const badge=`<svg viewBox="0 0 40 44" shape-rendering="crispEdges"><path d="M10 2h20v3h5v5h3v24h-3v5h-5v3H10v-3H5v-5H2V10h3V5h5z" fill="#10234b"/><path d="M11 5h18v3h5v4h1v20h-3v5h-5v2H11v-3H7v-5H5V12h3V8h3z" fill="currentColor"/><path d="M11 7h15v2H12v4H9v9H7V12h3V9h1z" fill="#ffffff88"/></svg>`;
 return `<article class="exercise-card ${completed?'is-complete':''}"><div class="exercise-top"><span class="number-badge" style="color:${colors[i%colors.length]}" aria-hidden="true">${badge}<span>${['pixel','crystal','cloud','forest'].includes(theme)?number:String(number).padStart(2,'0')}</span></span><div class="exercise-name"><h2>${paperTitle(i)}</h2><span class="status ${completed?'done':draft?'in-progress':''}">${icon(completed?'check':'clock',13)}${completed?'Đã làm':draft?'Đang làm':'Chưa làm'}</span></div><span class="card-charm">${referencePixelIcon(['star','book','flag'][i%3],22)}</span></div><dl class="exercise-stats"><div><dt>Kết quả:</dt><dd>${completed?completed.result:'—'}</dd></div><div><dt>Thời gian:</dt><dd>${completed?formatDuration(completed.duration):'—'}</dd></div></dl>${theme!=='pixel'?`<span class="exercise-card-art" aria-hidden="true" style="background-position:${(i%4)*100/3}% ${Math.floor(i%16/4)*100/3}%"></span>`:''}<div class="card-actions">${completed?`<button class="view-result-button" data-review="${i}">Xem kết quả</button><button class="retry-button" data-paper="${i}">Làm lại</button>`:`<button class="start-button" data-paper="${i}">${draft?'Tiếp tục':'Làm bài'}</button>`}</div></article>`;
}
function renderHome(){
 const theme=activeTheme().id,all=state.mode===modes[2]?[0,1,2]:Array.from({length:15},(_,i)=>i);
 const normalized=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();
 const papers=all.filter(i=>normalized(paperTitle(i)).includes(normalized(state.search.trim()))),title=state.search.trim()?'Kết quả tìm kiếm':`${state.mode} ${state.program}`;
 app.innerHTML=`<a class="skip-link" href="#main-content">Đến nội dung chính</a>${renderReferenceHeader()}<main id="main-content" class="page-content"><section class="exercise-section" aria-labelledby="catalog-title">${theme==='toys'?`<div class="toys-catalog-banner"><h2 id="catalog-title">${title}</h2><p>Lớp ${state.grade} · ${state.subject}</p><span class="toys-catalog-count">${papers.length} ${state.mode===modes[2]?'chủ đề':'đề'}</span></div>`:`<h2 id="catalog-title" class="${theme==='arctic'?'arctic-catalog-title':'visually-hidden'}">${title}</h2>${theme==='arctic'?`<p class="arctic-catalog-subtitle">Lớp ${state.grade} · ${state.subject}</p>`:''}<span class="${theme==='arctic'?'arctic-catalog-count':'visually-hidden'}">${papers.length} ${state.mode===modes[2]?'chủ đề':'đề'}</span>`}${papers.length?`<div class="exercise-grid">${papers.map(renderReferenceCard).join('')}</div>`:`<div class="empty-state">${icon('book',38)}<h3>Chưa tìm thấy bài tập</h3><p>Thử từ khóa khác hoặc chọn lại nội dung luyện tập.</p><button class="primary-button" data-action="clear-search">Xóa tìm kiếm ${icon('arrow',18)}</button></div>`}</section></main><footer class="world-footer" aria-hidden="true"><img src="${publicAsset('pixel-ground')}" alt=""></footer>`;
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
 introDialog.innerHTML=`<button class="icon-button dialog-close" data-action="close-intro" aria-label="Đóng giới thiệu đề">${icon('close',22)}</button><div class="quiz-intro"><img src="${publicAsset(activeTheme().hero)}" alt="Giao diện ${activeTheme().name}"><span class="intro-kicker">Sẵn sàng khám phá chưa?</span><h2 id="paper-intro-title">${escapeHTML(selection.title)}</h2><p>Mỗi câu hỏi là một bước chân trên hành trình tri thức. Bé hãy đọc kỹ và chọn một đáp án nhé!</p><div class="quiz-info"><span>${icon('flag',19)}${selection.questions.length} câu hỏi</span><span>${icon('clock',19)}${selection.durationMinutes?selection.durationMinutes+' phút':'Không giới hạn'}</span><span>Lớp ${selection.grade}</span></div><p class="sample-notice">Bài làm được lưu trên trình duyệt này khi trình duyệt cho phép lưu dữ liệu.</p><button class="start-button intro-start" data-action="start-paper">${resume?'Tiếp tục làm bài':'Bắt đầu làm bài'} ${icon('arrow',20)}</button></div>`;
 introDialog.showModal();introDialog.querySelector('.intro-start').focus();
}
introDialog.addEventListener('close',()=>{pendingPaper=null;introTrigger?.focus();});
function startPendingPaper() {
 if(!pendingPaper)return;
 const selection=pendingPaper,previous=attempts[attemptKey(selection)],resume=previous&&!previous.submitted;
 state.answers={};state.submitted=false;state.solutionsVisible=false;
 if(resume&&previous.answers&&typeof previous.answers==='object')selection.questions.forEach((q,i)=>{const value=previous.answers[i];if(Number.isInteger(value)&&value>=0&&value<q.options.length)state.answers[i]=value;});
 state.practice={...selection,startedAt:resume&&Number.isFinite(previous.startedAt)&&previous.startedAt>0&&previous.startedAt<=Date.now()?previous.startedAt:Date.now()};
 introDialog.close();saveAttempt();renderPractice();app.querySelector('#active-paper-title').focus();window.scrollTo({top:0});
}
function renderQuestion(q,i,ready){
 const text=q.english||q.text||'',translation=q.translation||q.vietnamese||'';
 return `<fieldset class="paper-question question"><legend><strong>Câu ${i+1}.</strong> <span ${q.english?'lang="en"':''}>${escapeHTML(text)}</span></legend>${translation?`<p class="question-translation">${escapeHTML(translation)}</p>`:''}${q.detail?`<div class="question-illustration diagram-number-line">${escapeHTML(q.detail)}</div>`:''}${q.image&&/^\.\/assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|jpeg|svg)$/.test(q.image)?`<figure class="question-illustration"><img src="${escapeHTML(q.image)}" alt="${escapeHTML(q.imageAlt||'Hình minh họa câu hỏi '+(i+1))}"></figure>`:''}<div class="paper-options answers">${q.options.map((option,j)=>`<label class="${state.answers[i]===j?'chosen':''} ${ready&&state.solutionsVisible&&j===q.answer?'paper-correct':''} ${ready&&state.solutionsVisible&&state.answers[i]===j&&j!==q.answer?'paper-wrong':''}"><input type="radio" name="question-${i}" data-question="${i}" value="${j}" ${state.answers[i]===j?'checked':''} ${state.submitted?'disabled':''}><span class="answer-text">${String.fromCharCode(65+j)}. ${escapeHTML(option)}</span></label>`).join('')}</div>${ready&&state.solutionsVisible&&q.explanation?`<p class="paper-explanation explanation">${escapeHTML(q.explanation)}</p>`:''}</fieldset>`;
}
function renderPractice(){
 const p=state.practice,questions=p.questions,answered=Object.keys(state.answers).length,ready=hasProvidedAnswers(questions),score=questions.filter((q,i)=>state.answers[i]===q.answer).length;
 const book='pixel-book';
 app.innerHTML=`<main class="paper-world"><header class="paper-brand"><img src="${publicAsset(book)}" alt=""><strong>Góc học tập <em>của bé</em></strong><button data-action="home">${icon('back',18)} Về góc luyện tập</button></header><section class="paper-shell"><div class="paper-toolbar"><div class="paper-title"><span class="exam-number">${p.paper+1}</span><div><h2 tabindex="-1" id="active-paper-title">${escapeHTML(p.title)}</h2><small>Lớp ${p.grade} · ${p.program} · ${p.subject}</small></div></div><div class="paper-stat">${icon('flag',32)}<div><small>Tiến độ</small><strong id="answer-count">${answered}/${questions.length} câu</strong></div></div><div class="paper-stat">${icon('clock',32)}<div><small>Thời gian</small><strong class="unlimited-time">${p.durationMinutes?p.durationMinutes+' phút':'Không giới hạn'}</strong></div></div><button class="paper-submit" data-action="submit-paper" ${state.submitted||answered!==questions.length?'disabled':''}>Nộp bài ${icon('send',22)}</button></div>${state.submitted?`<section class="result result-view"><h2 tabindex="-1">${ready?`Bé làm đúng ${score}/${questions.length} câu!`:'Bé đã nộp bài!'}</h2><p>${!ready?'Chờ đáp án từ phụ huynh. Bài chưa được chấm điểm.':'Bé đã hoàn thành bài luyện tập.'}</p><div class="result-actions"><button class="start-button" data-action="home">Luyện bài khác ${icon('arrow',18)}</button><button class="secondary-button" data-action="retry">Làm lại</button>${ready&&!state.solutionsVisible?'<button class="primary-button" data-action="solutions">Xem đáp án và lời giải</button>':''}</div></section>`:''}<form id="quiz"><div class="exam-paper">${questions.map((q,i)=>renderQuestion(q,i,ready)).join('')}<div class="paper-end"><p>${state.submitted?'Bài đã được nộp.':'Trả lời đủ các câu hỏi để nộp bài.'}</p><button class="paper-submit" type="submit" ${state.submitted||answered!==questions.length?'disabled':''}>Nộp bài ${icon('send',20)}</button></div></div></form></section></main>`;
}
function home(){state.practice=null;state.search='';renderHome();window.scrollTo({top:0});}
document.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 const action=button.dataset.action;
 if(action==='help')document.querySelector('#help').showModal();
 if(action==='close-help')document.querySelector('#help').close();
 if(action==='home')home();
 if(action==='clear-search'){state.search='';renderHome();document.querySelector('#paper-search').focus();}
 if(action==='local-data')openLocalData();
 if(action==='close-intro')introDialog.close();
 if(action==='start-paper')startPendingPaper();
 if(action==='submit-paper')document.querySelector('#quiz').requestSubmit();
 if(action==='retry'){state.answers={};state.submitted=false;state.solutionsVisible=false;state.practice.startedAt=Date.now();saveAttempt();renderPractice();window.scrollTo({top:0});}
 if(button.dataset.subject){state.subject=button.dataset.subject;renderHome();app.querySelector(`[data-subject="${state.subject}"]`).focus();}
 if(button.dataset.mode!==undefined){state.mode=modes[Number(button.dataset.mode)];renderHome();app.querySelector(`[data-mode="${button.dataset.mode}"]`).focus();}
 if(button.dataset.review!==undefined)openSavedPaper(Number(button.dataset.review));
 if(button.dataset.paper!==undefined)openPaperIntro(Number(button.dataset.paper));
});
app.addEventListener('change',event=>{
 const input=event.target;
 if(input.dataset.filter){const id=input.id;state[input.dataset.filter]=input.value;state.search='';renderHome();const target=id?document.getElementById(id):app.querySelector(`input[name="program"][value="${state.program}"]`);target?.focus();}
 if(input.dataset.question!==undefined&&!state.submitted){state.answers[Number(input.dataset.question)]=Number(input.value);input.closest('.answers').querySelectorAll('label').forEach(label=>label.classList.toggle('chosen',label.contains(input)));const count=Object.keys(state.answers).length;document.querySelector('#answer-count').textContent=`${count}/${state.practice.questions.length} câu`;document.querySelectorAll('.paper-submit').forEach(button=>button.disabled=count!==state.practice.questions.length);saveAttempt();}
});
app.addEventListener('submit',event=>{event.preventDefault();if(!state.practice||state.submitted||Object.keys(state.answers).length!==state.practice.questions.length)return;state.submitted=true;const score=state.practice.questions.filter((q,i)=>state.answers[i]===q.answer).length;state.completed[`${key()}-${state.practice.paper}`]={result:hasProvidedAnswers(state.practice.questions)?`${score}/${state.practice.questions.length} câu đúng`:'Chờ đáp án',duration:Math.max(1,Math.floor((Date.now()-state.practice.startedAt)/1000))};saveAttempt();renderPractice();app.querySelector('.result h2').focus();window.scrollTo({top:0,behavior:'smooth'});});
app.addEventListener('keydown',event=>{const tab=event.target.closest('[role="tab"]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const current=Number(tab.dataset.mode), next=event.key==='Home'?0:event.key==='End'?modes.length-1:(current+(event.key==='ArrowRight'?1:-1)+modes.length)%modes.length;state.mode=modes[next];renderHome();app.querySelector(`[data-mode="${next}"]`).focus();});
app.addEventListener('input',event=>{if(event.target.id!=='paper-search')return;state.search=event.target.value;const position=event.target.selectionStart;renderHome();const input=document.querySelector('#paper-search');input.focus();try{input.setSelectionRange(position,position);}catch{}});
function openSavedPaper(paper){
 const selection={grade:state.grade,program:state.program,subject:state.subject,mode:state.mode,paper,title:paperTitle(paper),questions:getQuestions(state.subject,state.grade,state.mode,paper),durationMinutes:null},record=attempts[attemptKey(selection)];
 if(!record?.submitted)return;
 state.practice={...selection,startedAt:record.startedAt};state.answers=record.answers||{};state.submitted=true;state.solutionsVisible=false;renderPractice();app.querySelector('.result h2').focus();window.scrollTo({top:0});
}
function openLocalData(){const d=document.querySelector('#local-data');d.innerHTML=`<button class="icon-button dialog-close" data-action="close-local-data" aria-label="Đóng">${icon('close',22)}</button><h2>Dữ liệu trên thiết bị</h2><p class="parent-subtitle">Bài làm được lưu trên trình duyệt này. Ứng dụng hiện chưa kết nối dịch vụ đồng bộ trực tuyến.</p><button class="primary-button" data-action="export-local-data">Tải bản sao bài làm ${icon('arrow',18)}</button>`;d.showModal();}
document.addEventListener('click',e=>{if(e.target.closest('[data-action="close-local-data"]'))document.querySelector('#local-data').close();if(e.target.closest('[data-action="export-local-data"]')){const blob=new Blob([JSON.stringify({version:1,attempts},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='goc-hoc-tap-bai-lam.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}});
renderHome();
