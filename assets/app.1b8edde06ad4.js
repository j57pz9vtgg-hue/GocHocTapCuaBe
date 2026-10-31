'use strict';
const app = document.querySelector('#app');
const state = { grade: '3', program: programs[0], subject: subjects[0], mode: modes[0], practice: null, answers: {}, submitted: false, solutionsVisible: false, completed: {} };
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=(name,size=21)=> (referenceIcons[name]||referenceIcons.book).replace('width="24"',`width="${size}"`).replace('height="24"',`height="${size}"`);
const publicAsset=name=>`./assets/reference/media/${name}.webp`;
function activeTheme(){return referenceThemes.find(t=>t.id===document.documentElement.dataset.theme)||referenceThemes[0];}
try{const saved=JSON.parse(localStorage.getItem('goc-hoc-tap.preferences.v1')||'null');document.documentElement.dataset.theme=saved?.theme==='space'?'crystal':referenceThemes.some(t=>t.id===saved?.theme)?saved.theme:'arctic';}catch{document.documentElement.dataset.theme='arctic';}
state.search='';
state.topicGroup=0;
let practiceClock=null;
const validResponse=(q,value)=>q.responseType==='text'?typeof value==='string'&&value.trim().length>0&&value.length<=200:Number.isInteger(value)&&value>=0&&value<q.options.length;
const hasProvidedAnswers = questions => questions.length > 0 && questions.every(q => q.answerSource === 'user' && validResponse(q,q.answer));
const matchesProvidedAnswer=(q,value)=>q.answerSource==='user'&&validResponse(q,q.answer)&&validResponse(q,value)&&(q.responseType==='text'?value.trim()===q.answer.trim():value===q.answer);
const key = () => [state.grade,state.program,state.subject,state.mode].join('|');
const options = (items, selected) => items.map(v=>`<option value="${escapeHTML(v)}" ${String(v)===selected?'selected':''}>${escapeHTML(v)}</option>`).join('');
function paperTitle(paper) {
 return getPapers(state.program,state.subject,state.grade,state.mode)[paper]?.title||'';
}
function formatDuration(seconds) {
 return `${Math.floor(seconds/60)} phút ${String(seconds%60).padStart(2,'0')} giây`;
}
function elapsedPracticeSeconds(practice=state.practice){
 if(!practice||!Number.isFinite(practice.startedAt))return 0;
 const end=Number.isFinite(practice.finishedAt)?practice.finishedAt:Date.now();
 return Math.max(0,Math.floor((end-practice.startedAt)/1000));
}
function formatPracticeClock(seconds){
 const hours=Math.floor(seconds/3600),minutes=Math.floor(seconds%3600/60),rest=seconds%60;
 return `${hours?String(hours).padStart(2,'0')+':':''}${String(minutes).padStart(2,'0')}:${String(rest).padStart(2,'0')}`;
}
function stopPracticeClock(){if(practiceClock!==null){clearInterval(practiceClock);practiceClock=null;}}
function refreshPracticeClock(){const target=app.querySelector('[data-practice-clock]');if(target&&state.practice)target.textContent=formatPracticeClock(elapsedPracticeSeconds());}
function referencePixelIcon(name,size=22){
 if(activeTheme().id!=='pixel')return icon(name,size);
 const paths={book:'<path d="M2 4h8v1h4V4h8v17h-8v1h-4v-1H2z" fill="#083b54"/><path d="M4 3h6v1h4V3h6v15h-6v1h-4v-1H4z" fill="#fcffff" stroke="#0e8095"/><path d="M11 5h2v13h-2zM5 7h4v2H5zm0 4h4v1H5zm0 3h4v1H5z" fill="#52c5d5"/><path d="M16 4h2v2h2v2h-2v7h-2V8h-2V6h2z" fill="#ffc43d"/>',flag:'<path d="M5 2h3v20H5z" fill="#543325"/><path d="M8 3h6v2h7v8h-6v-2H8z" fill="#fc6385" stroke="#7e304f"/><path d="M9 4h4v2H9z" fill="#ffd8e3"/><path d="M3 21h7v2H3z" fill="#a56a34"/>',star:'<path d="M10 2h4v5h2v2h6v4h-3v6h-5v-2h-4v2H5v-6H2V9h6V7h2z" fill="#ffd047" stroke="#74491d"/><path d="M10 5h2v4H8v2H5v-1h5z" fill="#fff4b0"/>'};
 return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="crispEdges">${paths[name]||paths.book}</svg>`;
}
function renderReferenceHeader(){
 const theme=activeTheme().id,bookThemes=['crystal','cloud','forest','magic','treasure','cars'];
 const brandImage=theme==='pixel'?`<img src="${publicAsset('pixel-book')}" alt="">`:bookThemes.includes(theme)?`<img class="crystal-brand-icon" src="${publicAsset(theme+'-book')}" alt="">`:icon('book',44);
 return `<div class="catalog-masthead"><header class="site-header"><div class="header-inner"><button class="brand" aria-label="Góc học tập của bé — Danh sách đề" data-action="home">${brandImage}<span>Góc học tập <span class="brand-child">của bé</span></span><span class="brand-spark" aria-hidden="true">✦</span></button><div class="header-tools"><div class="search-box">${icon('search',21)}<input type="search" id="paper-search" aria-label="Tìm bài tập" placeholder="Tìm bài tập" value="${escapeHTML(state.search)}">${state.search?`<button class="icon-button" aria-label="Xóa tìm kiếm" data-action="clear-search">${icon('close',17)}</button>`:''}</div><button class="parent-button settings-control" data-action="settings" aria-label="Cài đặt">${icon('settings',22)}<span>Cài đặt</span></button></div></div></header><div class="adventure-banner"><h1 class="banner-message">Học vui, chinh phục từng bài!</h1>${theme!=='pixel'?`<img class="modern-hero" src="${publicAsset(activeTheme().hero)}" alt="" aria-hidden="true">`:''}</div><div class="page-content catalog-filter-bar"><div class="study-filters" aria-label="Bộ lọc bài tập">${[['grade','Chọn lớp',Array.from({length:12},(_,i)=>[String(i+1),'Lớp '+(i+1)]),'grade'],['program','Chọn chương trình',programs.map(p=>[p,p]),'blocks'],['subject','Chọn môn học',getSubjects(state.program).map(p=>[p,subjectDisplayName(p)]),'blocks'],['mode',state.program==='Báo bài của trường'?'Chọn nội dung':'Chọn nội dung luyện tập',getModes(state.program,state.grade).map(p=>[p,p]),'clipboard']].map(([key,label,values,glyph])=>`<div class="filter-field ${key==='mode'&&state.program==='Báo bài của trường'?'school-week-filter':''}">${['crystal','cloud','forest','toys','arctic'].includes(theme)?`<span class="crystal-filter-icon" aria-hidden="true">${icon(glyph,29)}</span>`:''}<label for="${key}">${label}</label><div class="filter-select"><select id="${key}" data-filter="${key}">${values.map(([value,text])=>`<option value="${escapeHTML(value)}" ${state[key]===value?'selected':''}>${text}</option>`).join('')}</select>${icon('down',18)}</div></div>`).join('')}</div></div></div>`;
}
function renderReferenceCard(i){
 const completed=state.completed[`${key()}-${i}`],theme=activeTheme().id;
 const id=attemptKey({...state,paper:i}),draft=attempts[id]&&!attempts[id].submitted;
 const number=i+1,colors=['#ffae21','#28a9ef','#f84e7b','#30bf66','#a143ec','#10b4b8','#ffc62e'];
 const badge=`<svg viewBox="0 0 40 44" shape-rendering="crispEdges"><path d="M10 2h20v3h5v5h3v24h-3v5h-5v3H10v-3H5v-5H2V10h3V5h5z" fill="#10234b"/><path d="M11 5h18v3h5v4h1v20h-3v5h-5v2H11v-3H7v-5H5V12h3V8h3z" fill="currentColor"/><path d="M11 7h15v2H12v4H9v9H7V12h3V9h1z" fill="#ffffff88"/></svg>`;
 return `<article class="exercise-card ${completed?'is-complete':''}"><div class="exercise-top"><span class="number-badge" style="color:${colors[i%colors.length]}" aria-hidden="true">${badge}<span>${['pixel','crystal','cloud','forest'].includes(theme)?number:String(number).padStart(2,'0')}</span></span><div class="exercise-name"><h2>${escapeHTML(paperTitle(i))}</h2><span class="status ${completed?'done':draft?'in-progress':''}">${icon(completed?'check':'clock',13)}${completed?'Đã làm':draft?'Đang làm':'Chưa làm'}</span></div><span class="card-charm">${referencePixelIcon(['star','book','flag'][i%3],22)}</span></div><dl class="exercise-stats"><div><dt>Kết quả:</dt><dd>${completed?completed.result:'—'}</dd></div><div><dt>Thời gian:</dt><dd>${completed?formatDuration(completed.duration):'—'}</dd></div></dl>${theme!=='pixel'?`<span class="exercise-card-art" aria-hidden="true" style="background-position:${(i%4)*100/3}% ${Math.floor(i%16/4)*100/3}%"></span>`:''}<div class="card-actions">${completed?`<button class="view-result-button" data-review="${i}">Xem kết quả</button><button class="retry-button" data-paper="${i}">Làm lại</button>`:`<button class="start-button" data-paper="${i}">${draft?'Tiếp tục':'Làm bài'}</button>`}</div></article>`;
}
function normalizedTopicSearch(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();}
function renderTopicBadge(index){
 if(activeTheme().id!=='pixel')return `<span class="topic-number theme-topic-number" aria-hidden="true">${String(index+1).padStart(2,'0')}</span>`;
 const colors=['#ffae21','#f84e7b','#30bf66','#28a9ef','#a143ec','#ff8627'];
 return `<span class="topic-number" aria-hidden="true" style="color:${colors[index%colors.length]}"><svg viewBox="0 0 40 44" shape-rendering="crispEdges"><path d="M10 2h20v3h5v5h3v24h-3v5h-5v3H10v-3H5v-5H2V10h3V5h5z" fill="#10234b"/><path d="M11 5h18v3h5v4h1v20h-3v5h-5v2H11v-3H7v-5H5V12h3V8h3z" fill="currentColor"/><path d="M11 7h15v2H12v4H9v9H7V12h3V9h1z" fill="#ffffff88"/></svg><span>${String(index+1).padStart(2,'0')}</span></span>`;
}
function renderTimoTopics(){
 const query=normalizedTopicSearch(state.search.trim());
 const groups=getTimoTopicGroups(state.grade).map((group,index)=>{const visible=group.topics.filter(topic=>topic.entries.length||topic.id.includes('-review-')||!group.topics.some(t=>t.entries.length)).slice().sort((a,b)=>Number(a.id.endsWith('-unclassified'))-Number(b.id.endsWith('-unclassified')));return {...group,index,matches:visible.filter(topic=>!query||normalizedTopicSearch(group.name+' '+topic.name).includes(query))};}).filter(group=>!query||group.matches.length||normalizedTopicSearch(group.name).includes(query));
 if(!groups.length)return `<div class="empty-state"><h3>Chưa tìm thấy chủ đề</h3><button class="primary-button" data-action="clear-search">Xóa tìm kiếm ${icon('arrow',18)}</button></div>`;
 const selected=groups.some(group=>group.index===state.topicGroup)?state.topicGroup:state.topicGroup===null&&!query?null:groups[0].index;
 return `<div class="timo-topic-browser" aria-label="Các chủ đề luyện tập TIMO">${groups.map((group,row)=>{
 const open=selected===group.index;
 return `<section class="timo-topic-group" style="--topic-row:${row+1}"><button class="topic-group-toggle ${open?'selected':''}" data-topic-group="${group.index}" id="${group.id}-toggle" aria-expanded="${open}" aria-controls="${group.id}-panel">${renderTopicBadge(group.index)}<span class="topic-group-label">${escapeHTML(group.name)}</span>${icon(open?'down':'arrow',19)}</button><div class="topic-group-panel" id="${group.id}-panel" aria-labelledby="${group.id}-title" ${open?'':'hidden'}><h3 id="${group.id}-title">${escapeHTML(group.name)}</h3><div class="topic-small-grid">${!group.matches.length?'<div class="topic-content-empty">Chưa có chủ đề nhỏ</div>':group.matches.map((topic,index)=>{
 return `<article class="topic-small-card"><div class="topic-small-heading">${renderTopicBadge(index)}<h4>${escapeHTML(topic.name)}</h4></div><p class="topic-state"><span aria-hidden="true"></span>${topic.entries.length} câu hỏi</p>${activeTheme().id==='pixel'?`<img class="topic-book" src="${publicAsset('pixel-book')}" alt="">`:`<span class="topic-book topic-theme-art" aria-hidden="true" style="background-image:url('${publicAsset(activeTheme().id+'-sprites')}');background-position:${(index%4)*100/3}% ${Math.floor(index/4)*100/3}%"></span>`}<button class="topic-practice" data-topic-open="${escapeHTML(topic.id)}" aria-label="Luyện tập ${escapeHTML(topic.name)}, ${escapeHTML(group.name)}">Luyện tập</button></article>`;
 }).join('')}</div></div></section>`;
 }).join('')}</div>`;
}
// Store only question IDs so reordering never changes the source question or its options.
const topicOrderMemory=new Map();
function shuffleTopicEntries(entries,grade,topicId){
 const ordered=entries.slice();
 if(ordered.length<2)return ordered;
 const key='goc-hoc-tap.topic-order.v1.'+JSON.stringify([grade,topicId]);
 let previous=topicOrderMemory.get(key);
 try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(Array.isArray(saved))previous=saved;}catch{}
 for(let i=ordered.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ordered[i],ordered[j]]=[ordered[j],ordered[i]];}
 if(previous&&previous.length===ordered.length&&ordered.every((entry,i)=>entry.id===previous[i]))ordered.push(ordered.shift());
 const ids=ordered.map(entry=>entry.id);topicOrderMemory.set(key,ids);
 try{localStorage.setItem(key,JSON.stringify(ids));}catch{}
 return ordered;
}
function reshuffleTopicPractice(selection){
 const entries=shuffleTopicEntries(selection.questions.map((question,i)=>({id:selection.questionIds[i],question,source:selection.sources[i]})),selection.grade,selection.topicId);
 return {...selection,questions:entries.map(entry=>entry.question),questionIds:entries.map(entry=>entry.id),sources:entries.map(entry=>entry.source)};
}
function openTopicIntro(topicId){
 const group=getTimoTopicGroups(state.grade).find(group=>group.topics.some(topic=>topic.id===topicId));
 const topic=group?.topics.find(topic=>topic.id===topicId);if(!topic)return;
 if(topic.entries.length){
  const entries=shuffleTopicEntries(topic.entries,state.grade,topic.id);
  showPracticeIntro({grade:state.grade,program:'TIMO',subject:'Toán',mode:modes[2],paper:timoTopicGroups.findIndex(item=>item.id===group.id),topicId:topic.id,title:`${group.name} / ${topic.name}`,questions:entries.map(entry=>entry.question),questionIds:entries.map(entry=>entry.id),sources:entries.map(({number,paperId,paperTitle})=>({number,paperId,paperTitle})),durationMinutes:null});
  return;
 }
 pendingPaper=null;introTrigger=document.activeElement;
 introDialog.innerHTML=`<button class="icon-button dialog-close" data-action="close-intro" aria-label="Đóng giới thiệu chủ đề">${icon('close',22)}</button><div class="topic-empty-intro"><img class="${activeTheme().id==='pixel'?'':'topic-intro-banner'}" src="${publicAsset(activeTheme().id==='pixel'?'pixel-book':activeTheme().hero)}" alt=""><h2 id="paper-intro-title">${escapeHTML(topic.name)}</h2><p>${escapeHTML(group.name)} · TIMO · Lớp ${state.grade} · ${escapeHTML(state.subject)}</p><p>Chưa có nội dung luyện tập.</p><button class="primary-button" data-action="close-intro">Đóng</button></div>`;
 introDialog.showModal();introDialog.querySelector('[data-action="close-intro"]').focus();
}
function renderHome(){
 stopPracticeClock();
 const isTimoTopics=state.program==='TIMO'&&state.mode===modes[2];
 const theme=activeTheme().id,all=getPapers(state.program,state.subject,state.grade,state.mode).map((_,i)=>i);
 const normalized=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();
 const papers=all.filter(i=>normalized(paperTitle(i)).includes(normalized(state.search.trim()))),title=state.search.trim()?'Kết quả tìm kiếm':`${state.mode} ${state.program}`;
 app.innerHTML=`<a class="skip-link" href="#main-content">Đến nội dung chính</a>${renderReferenceHeader()}<main id="main-content" class="page-content"><section class="exercise-section" aria-labelledby="catalog-title"><h2 id="catalog-title" class="visually-hidden">${title}</h2>${state.program==='Báo bài của trường'?renderSchoolReports():isTimoTopics?renderTimoTopics():papers.length?`<div class="exercise-grid">${papers.map(renderReferenceCard).join('')}</div>`:!state.search.trim()?`<div class="empty-state">${icon('book',38)}<h3>Chưa có đề chính thức</h3></div>`:`<div class="empty-state">${icon('book',38)}<h3>Chưa tìm thấy bài tập</h3><p>Thử từ khóa khác hoặc chọn lại nội dung luyện tập.</p><button class="primary-button" data-action="clear-search">Xóa tìm kiếm ${icon('arrow',18)}</button></div>`}</section></main><footer class="world-footer" aria-hidden="true"><img src="${publicAsset('pixel-ground')}" alt=""></footer>`;
 // Anchor shared tools to the masthead, independent of theme-specific header wrappers.
 app.querySelector(".catalog-masthead").append(app.querySelector(".header-tools"));
 restoreSchoolMathCompletion();
 saveCurrentView();
}
// Per-tab navigation state stores references, never a copy of the exam or passwords.
const currentViewKey='goc-hoc-tap.current-view.v1';
let currentViewReady=false,currentViewRestored=false,viewScrollTimer;
function viewQuestionIds(selection){
 if(selection.questionIds)return selection.questionIds;
 const paper=getPapers(selection.program,selection.subject,selection.grade,selection.mode)[selection.paper];
 return selection.questions.map((q,i)=>`${paper?.id}:${q.number??i+1}`);
}
function viewSelection(selection){
 return {grade:selection.grade,program:selection.program,subject:selection.subject,mode:selection.mode,topicId:selection.topicId,paperId:getPapers(selection.program,selection.subject,selection.grade,selection.mode)[selection.paper]?.id,questionIds:viewQuestionIds(selection)};
}
function saveCurrentView(){
 if(!currentViewReady||document.documentElement.dataset.access!=='open')return;
 const p=state.practice,settings=document.querySelector('#settings');
 const record={version:1,filters:{grade:state.grade,program:state.program,subject:state.subject,mode:state.mode,search:state.search,topicGroup:state.topicGroup},scroll:window.scrollY};
 if(p){
  record.practice={...viewSelection(p),answers:{...state.answers},searchQuery:p.searchQuery||'',startedAt:p.startedAt,finishedAt:p.finishedAt,submitted:state.submitted,syncRunId:p.syncRunId};
  const index=[...app.querySelectorAll('.paper-question')].findIndex(el=>el.getBoundingClientRect().bottom>110);
  if(index>=0)record.anchor={id:viewQuestionIds(p)[index],top:app.querySelectorAll('.paper-question')[index].getBoundingClientRect().top};
 }
 if(introDialog.open&&pendingPaper)record.intro=viewSelection(pendingPaper);
 if(state.program==='Báo bài của trường'&&schoolReportSelection)record.schoolReportSelection={...schoolReportSelection};
 if(settings.open)record.settings={tab:settings.querySelector('[aria-selected="true"]')?.dataset.settingsTab,scroll:settings.scrollTop};
 try{sessionStorage.setItem(currentViewKey,JSON.stringify(record));}catch{}
}
function selectionFromView(saved){
 if(saved?.program==='Violympic'&&saved.mode==='Vòng 4')saved={...saved,mode:'Vòng loại'};
 if(!saved||saved.grade!==state.grade||saved.program!==state.program||saved.subject!==state.subject||saved.mode!==state.mode||!getModes(saved.program,saved.grade).includes(saved.mode))return null;
 if(saved.topicId){
  if(saved.program!=='TIMO'||saved.subject!=='Toán'||saved.mode!==modes[2])return null;
  const topicId=resolveTimoTopicId(saved.topicId);
  const group=getTimoTopicGroups(state.grade).find(g=>g.topics.some(t=>t.id===topicId));
  const topic=group?.topics.find(t=>t.id===topicId);if(!topic?.entries.length)return null;
  const byId=new Map(topic.entries.map(e=>[e.id,e])),entries=[];
  for(const id of Array.isArray(saved.questionIds)?saved.questionIds:[]){if(byId.has(id)){entries.push(byId.get(id));byId.delete(id);}}
  entries.push(...byId.values());
  return {grade:state.grade,program:'TIMO',subject:'Toán',mode:modes[2],paper:timoTopicGroups.findIndex(g=>g.id===group.id),topicId:topic.id,title:`${group.name} / ${topic.name}`,questions:entries.map(e=>e.question),questionIds:entries.map(e=>e.id),sources:entries.map(({number,paperId,paperTitle})=>({number,paperId,paperTitle})),durationMinutes:null};
 }
 const papers=getPapers(saved.program,saved.subject,saved.grade,saved.mode),paper=papers.findIndex(p=>p.id===saved.paperId);
 if(paper<0)return null;
 return {grade:state.grade,program:state.program,subject:state.subject,mode:saved.mode,paper,title:papers[paper].title,questions:papers[paper].questions,durationMinutes:null};
}
async function restoreCurrentView(){
 if(currentViewRestored)return;currentViewRestored=true;
 let record;try{record=JSON.parse(sessionStorage.getItem(currentViewKey)||'null');}catch{}
 if(record?.version!==1){currentViewReady=true;saveCurrentView();return;}
 const f=record.filters;
 const restoredMode=f?.program==='Violympic'&&f.mode==='Vòng 4'?'Vòng loại':f?.program==='Báo bài của trường'&&f.mode==='Báo bài tuần'?getModes(f.program,f.grade)[0]:f?.mode;
 if(!f||!/^([1-9]|1[0-2])$/.test(f.grade)||!programs.includes(f.program)||!getSubjects(f.program).includes(f.subject)||!getModes(f.program,f.grade).includes(restoredMode)){currentViewReady=true;saveCurrentView();return;}
 Object.assign(state,{grade:f.grade,program:f.program,subject:f.subject,mode:restoredMode,search:typeof f.search==='string'?f.search.slice(0,200):'',topicGroup:f.topicGroup===null?null:Number.isInteger(f.topicGroup)&&f.topicGroup>=0&&f.topicGroup<5?f.topicGroup:0});
 const saved=record.practice,selection=selectionFromView(saved);
 if(selection&&Number.isFinite(saved.startedAt)&&saved.startedAt>0){
  state.practice={...selection,searchQuery:typeof saved.searchQuery==='string'?saved.searchQuery.slice(0,200):'',startedAt:Math.min(saved.startedAt,Date.now())};state.answers={};state.solutionsVisible=false;
  const ids=viewQuestionIds(selection),previous=attempts[attemptKey(selection)];
  state.practice.syncRunId=saved.syncRunId||previous?.syncRunId||String(saved.startedAt);
  const merged=selection.topicId&&(saved.topicId!==selection.topicId||previous?.mergedTopicProgress);
  selection.questions.forEach((q,i)=>{const old=Array.isArray(saved.questionIds)?saved.questionIds.indexOf(ids[i]):-1,value=saved.answers?.[old];if(validResponse(q,value))state.answers[i]=value;else if(merged){const oldIndex=Array.isArray(previous?.questionIds)?previous.questionIds.indexOf(ids[i]):-1,kept=previous?.answers?.[oldIndex];if(validResponse(q,kept))state.answers[i]=kept;}});
  state.submitted=!merged&&saved.submitted===true&&Object.keys(state.answers).length===selection.questions.length;
  if(state.submitted)state.practice.finishedAt=Number.isFinite(saved.finishedAt)?Math.max(state.practice.startedAt,saved.finishedAt):state.practice.startedAt;
  renderPractice();saveAttempt();
 }else{state.practice=null;renderHome();}
 if(state.program==='Báo bài của trường'&&!state.practice){const selected=record.schoolReportSelection||(record.schoolExerciseId?{id:record.schoolExerciseId,kind:'exercises'}:null);if(selected){const id=selected.kind==='exercises'&&selected.id==='tieng-viet-2026-10-19'?'tieng-viet-2026-10-23':selected.id;activateSchoolReport(id,selected.kind,false);}}
 const intro=selectionFromView(record.intro);if(intro&&!state.practice)showPracticeIntro(intro);
 if(record.settings&&!state.practice){app.querySelector('[data-action="settings"]')?.click();document.querySelector(`#settings [data-settings-tab="${['appearance','password','guide'].includes(record.settings.tab)?record.settings.tab:'appearance'}"]`)?.click();}
 // Restore after fonts and diagrams settle, and only after the access gate has opened.
 await Promise.race([Promise.allSettled([document.fonts.ready,...[...app.querySelectorAll('img')].map(img=>img.decode())]),new Promise(resolve=>setTimeout(resolve,1500))]);
 requestAnimationFrame(()=>{
  let top=Number.isFinite(record.scroll)?Math.max(0,record.scroll):0;
  if(state.practice&&record.anchor&&Number.isFinite(record.anchor.top)){const i=viewQuestionIds(state.practice).indexOf(record.anchor.id),el=app.querySelectorAll('.paper-question')[i];if(el)top=window.scrollY+el.getBoundingClientRect().top-record.anchor.top;}
  window.scrollTo({top,behavior:'instant'});
  if(record.settings)document.querySelector('#settings').scrollTop=Number.isFinite(record.settings.scroll)?record.settings.scroll:0;
  currentViewReady=true;saveCurrentView();
 });
}
window.addEventListener('learning-access-open',restoreCurrentView);
window.addEventListener('pagehide',()=>{if(state.practice)saveAttempt();saveCurrentView();});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){if(state.practice)saveAttempt();saveCurrentView();}});
window.addEventListener('scroll',()=>{clearTimeout(viewScrollTimer);viewScrollTimer=setTimeout(saveCurrentView,150);},{passive:true});

const attemptStorageKey='goc-hoc-tap.attempts.official.v1';
let attempts={};
try { const saved=JSON.parse(localStorage.getItem(attemptStorageKey)||'{}'); if(saved&&typeof saved==='object'&&!Array.isArray(saved))attempts=saved; } catch {}
// Preserve drafts from the initial round-only dropdown when moving Round4 into Vòng loại.
let violympicModeMigrated=false;
for(const [oldKey,oldRecord]of Object.entries(attempts)){
 const parts=oldKey.split('|');if(parts.length!==5||parts[1]!=='Violympic'||parts[3]!=='Vòng 4'||!oldRecord||typeof oldRecord!=='object')continue;
 parts[3]='Vòng loại';const target=parts.join('|');
 if(!attempts[target]||(Number(oldRecord.updatedAt)||0)>(Number(attempts[target].updatedAt)||0)){attempts[target]={...oldRecord};violympicModeMigrated=true;}
}
if(violympicModeMigrated)try{localStorage.setItem(attemptStorageKey,JSON.stringify(attempts));}catch{}
const attemptKey=selection=>[selection.grade,selection.program,selection.subject,selection.mode,selection.topicId||getPapers(selection.program,selection.subject,selection.grade,selection.mode)[selection.paper]?.id||''].join('|');
// Preserve source-ID answers from both former groups, retaining the old record as a backup.
let topicAttemptsMigrated=false;
for(const [oldKey,oldRecord] of Object.entries(attempts)){
 const parts=oldKey.split('|');if(parts.length!==5||!oldRecord||oldRecord.migratedTo||!Array.isArray(oldRecord.questionIds))continue;
 const [grade,program,subject,mode,oldId]=parts,newId=resolveTimoTopicId(oldId);
 if(newId===oldId||program!=='TIMO'||subject!=='Toán'||mode!==modes[2])continue;
 const topic=getTimoTopicGroups(grade).flatMap(g=>g.topics).find(t=>t.id===newId);if(!topic)continue;
 const newKey=[grade,program,subject,mode,newId].join('|'),target=attempts[newKey];
 const allowed=new Map(topic.entries.map(e=>[e.id,e.question])),ids=[],answers={};
 for(const record of [target,oldRecord]){
  if(!Array.isArray(record?.questionIds))continue;
  record.questionIds.forEach((id,i)=>{if(!allowed.has(id))return;let index=ids.indexOf(id);if(index<0){index=ids.length;ids.push(id);}const value=record.answers?.[i];if(validResponse(allowed.get(id),value))answers[index]=value;});
 }
 const starts=[target?.startedAt,oldRecord.startedAt].filter(value=>Number.isFinite(value)&&value>0&&value<=Date.now());
 attempts[newKey]={questionIds:ids,answers,startedAt:starts.length?Math.min(...starts):Date.now(),updatedAt:Date.now(),submitted:false,mergedTopicProgress:true};
 oldRecord.migratedTo=newKey;topicAttemptsMigrated=true;
}
// Return the three owner-identified questions to Number Theory without losing saved responses.
const returnedNumberTheoryIds=['timo-grade2-qualifying-05:15','timo-grade2-national-05:15','timo-grade2-national-06:15'];
const returnTargetKey='2|TIMO|Toán|Luyện theo chủ đề|timo-group-3-unclassified';
for(const [sourceKey,returnSource] of Object.entries(attempts)){
 if(sourceKey===returnTargetKey||!sourceKey.startsWith('2|TIMO|Toán|Luyện theo chủ đề|')||!Array.isArray(returnSource?.questionIds)||returnSource.returnedNumberTheoryQuestions||!returnedNumberTheoryIds.some(id=>returnSource.questionIds.includes(id)))continue;
 const target=attempts[returnTargetKey],ids=Array.isArray(target?.questionIds)?target.questionIds.slice():[],answers={...target?.answers};
 const topic=getTimoTopicGroups('2').find(g=>g.id==='timo-group-3')?.topics.find(t=>t.id==='timo-group-3-unclassified');
 let copied=false;
 for(const id of returnedNumberTheoryIds){
  const oldIndex=returnSource.questionIds.indexOf(id),question=topic?.entries.find(e=>e.id===id)?.question,value=returnSource.answers?.[oldIndex];
  if(!question||!validResponse(question,value))continue;
  let index=ids.indexOf(id);if(index<0){index=ids.length;ids.push(id);}
  if(!validResponse(question,answers[index])){answers[index]=value;copied=true;}
 }
 if(copied)attempts[returnTargetKey]={...target,questionIds:ids,answers,startedAt:target?.startedAt||returnSource.startedAt||Date.now(),updatedAt:Date.now(),submitted:false,mergedTopicProgress:true};
 returnSource.returnedNumberTheoryQuestions=true;topicAttemptsMigrated=true;
}
if(topicAttemptsMigrated)try{localStorage.setItem(attemptStorageKey,JSON.stringify(attempts));}catch{}
// Preserve responses from former topic buckets when a device first receives an owner-published revision.
if(typeof publishedTimoClassification!=='undefined'&&TimoClassification.usesPublished()){
 try{
  const revision=publishedTimoClassification.revision,marker='goc-hoc-tap.published-classification-progress.v1';
  if(revision&&localStorage.getItem(marker)!==revision){
   const previous={assignments:{}},resetId=publishedTimoClassification.resetId,resetMarker='goc-hoc-tap.classification-reset-progress.v1';
   if(resetId&&localStorage.getItem(resetMarker)!==resetId){
    const questions=new Map(officialPapers.flatMap(p=>p.questions.map(q=>[p.id+':'+q.number,q])));
    for(const record of Object.values(attempts))if(Array.isArray(record?.questionIds))record.questionIds.forEach((id,i)=>{if(questions.has(id)&&validResponse(questions.get(id),record.answers?.[i]))previous.assignments[id]='former-topic';});
   }
   if(Object.values(attempts).some(record=>Array.isArray(record?.questionIds)))preserveClassifiedProgress(previous,TimoClassification.snapshot());
   if(resetId)localStorage.setItem(resetMarker,resetId);
   localStorage.setItem(marker,revision);
  }
 }catch{}
}


function rebuildCompletedAttempts(){
 state.completed={};
for(const [savedKey,record] of Object.entries(attempts)){
 const parts=savedKey.split('|');if(parts.length!==5||!record||!record.submitted||!record.answers||typeof record.answers!=='object')continue;
 const [grade,program,subject,mode,paperId]=parts;
 if(!programs.includes(program)||!getSubjects(program).includes(subject)||!modes.includes(mode))continue;
 const paper=getPapers(program,subject,grade,mode).findIndex(item=>item.id===paperId);if(paper<0)continue;
 const questions=getQuestions(subject,grade,mode,paper,program),score=questions.filter((q,i)=>matchesProvidedAnswer(q,record.answers[i])).length;
 state.completed[`${[grade,program,subject,mode].join('|')}-${paper}`]={result:hasProvidedAnswers(questions)?`${score}/${questions.length} câu đúng`:'Chờ đáp án',duration:Number.isFinite(record.updatedAt)&&Number.isFinite(record.startedAt)?Math.max(0,Math.floor(((Number.isFinite(record.finishedAt)?record.finishedAt:record.updatedAt)-record.startedAt)/1000)):0};
}

}
rebuildCompletedAttempts();

function saveAttempt() {
 if(!state.practice)return;
 const p=state.practice;
 p.syncRunId=p.syncRunId||String(p.startedAt);
 attempts[attemptKey(p)]={answers:{...state.answers},questionIds:p.questionIds,finishedAt:p.finishedAt,submitted:state.submitted,startedAt:p.startedAt,syncRunId:p.syncRunId,updatedAt:Date.now()};
 saveCurrentView();
 try{localStorage.setItem(attemptStorageKey,JSON.stringify(attempts));window.LearningSync?.changed('attempt',attemptKey(p),attempts[attemptKey(p)]);return true;}catch{return false;}
}
let pendingPaper=null, introTrigger=null;
const introDialog=document.querySelector('#paper-intro');
function openPaperIntro(paper) {
 const selection={grade:state.grade,program:state.program,subject:state.subject,mode:state.mode,paper,title:paperTitle(paper),questions:getQuestions(state.subject,state.grade,state.mode,paper,state.program),durationMinutes:null};
 showPracticeIntro(selection);
}
function showPracticeIntro(selection){
 if(!selection.questions.length)return;
 pendingPaper=selection;introTrigger=document.activeElement;
 const previous=attempts[attemptKey(selection)],resume=previous&&!previous.submitted;
 const sourcePaper=getPapers(selection.program,selection.subject,selection.grade,selection.mode)[selection.paper];
 introDialog.innerHTML=`<button class="icon-button dialog-close" data-action="close-intro" aria-label="Đóng giới thiệu đề">${icon('close',22)}</button><div class="quiz-intro"><img src="${publicAsset(activeTheme().hero)}" alt="Giao diện ${activeTheme().name}"><span class="intro-kicker">Sẵn sàng khám phá chưa?</span><h2 id="paper-intro-title">${escapeHTML(selection.title)}</h2>${sourcePaper?.instructions?`<p class="source-game-instructions">${escapeHTML(sourcePaper.instructions)}</p><p class="sample-notice">Đang cập nhật đề. Chưa có đáp án để chấm hoặc trừ điểm theo trò chơi gốc.</p>`:'<p>Mỗi câu hỏi là một bước chân trên hành trình tri thức. Bé hãy đọc kỹ và chọn một đáp án nhé!</p>'}<div class="quiz-info"><span>${icon('flag',19)}${selection.questions.length} câu hỏi</span><span>${icon('clock',19)}${selection.durationMinutes?selection.durationMinutes+' phút':'Không giới hạn'}</span><span>Lớp ${selection.grade}</span></div><p class="sample-notice">Bài làm được lưu trên trình duyệt này khi trình duyệt cho phép lưu dữ liệu.</p><button class="start-button intro-start" data-action="start-paper">${resume?'Tiếp tục làm bài':'Bắt đầu làm bài'} ${icon('arrow',20)}</button></div>`;
 introDialog.showModal();introDialog.querySelector('.intro-start').focus();
}
introDialog.addEventListener('close',()=>{pendingPaper=null;introTrigger?.focus();});
function startPendingPaper() {
 if(!pendingPaper||!pendingPaper.questions.length)return;
 const selection=pendingPaper,previous=attempts[attemptKey(selection)],resume=previous&&!previous.submitted;
 state.answers={};state.submitted=false;state.solutionsVisible=false;
 if(resume&&previous.answers&&typeof previous.answers==='object')selection.questions.forEach((q,i)=>{const originalIndex=selection.topicId&&Array.isArray(previous.questionIds)?previous.questionIds.indexOf(selection.questionIds[i]):i;const value=originalIndex>=0?previous.answers[originalIndex]:undefined;if(validResponse(q,value))state.answers[i]=value;});
 state.practice={...selection,syncRunId:resume?(previous.syncRunId||String(previous.startedAt)):Date.now()+'.'+crypto.randomUUID(),startedAt:!selection.topicId&&resume&&Number.isFinite(previous.startedAt)&&previous.startedAt>0&&previous.startedAt<=Date.now()?previous.startedAt:Date.now()};
 introDialog.close();saveAttempt();renderPractice();app.querySelector('#active-paper-title').focus();window.scrollTo({top:0});
}
function isNationalTopicQuestion(index){
 const practice=state.practice;if(!practice?.topicId)return false;
 const paperId=practice.sources?.[index]?.paperId||practice.questionIds?.[index]?.split(':')[0];
 return officialPapers.some(paper=>paper.id===paperId&&paper.mode===modes[1]);
}
function renderQuestion(q,i,ready){
 ready=q.answerSource==='user'&&validResponse(q,q.answer);
 const text=q.english||q.text||'',translation=q.translation||q.vietnamese||'';
 const section=!state.practice?.topicId&&state.practice?.program==='TIMO'?timoTopicGroups.find(group=>group.first===(q.sourceNumber??q.number??i+1)):null;
 const sectionHeading=q.sectionTitle?`<h3 class="paper-section-heading">${escapeHTML(q.sectionTitle)}</h3>`:section?`<h3 class="paper-section-heading"><span lang="en">${escapeHTML(q.sectionHeading?.english||section.english)}</span> / <em>${escapeHTML(q.sectionHeading?.vietnamese||section.vietnamese)}</em></h3>`:'';
 return `${sectionHeading}<fieldset class="paper-question question ${q.optionColumns===2?'options-two-columns':''} ${q.largeOptionImages?'options-figure-cards':''}"><legend><strong>Câu ${state.practice?.topicId?i+1:(q.sourceNumber??q.number??i+1)}.</strong> ${isNationalTopicQuestion(i)?'<span class="national-question-star" role="img" aria-label="Câu hỏi Vòng quốc gia" title="Câu hỏi Vòng quốc gia"><span aria-hidden="true">★</span></span> ':''}<span ${q.english?'lang="en"':''}>${escapeHTML(text)}</span></legend>${translation?`<p class="question-translation">${escapeHTML(translation)}</p>`:''}${q.detail?`<div class="question-illustration diagram-number-line">${escapeHTML(q.detail)}</div>`:''}${q.image&&/^\.\/assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|jpeg|svg)$/.test(q.image)?`<figure class="question-illustration"><img src="${escapeHTML(q.image)}" alt="${escapeHTML(q.imageAlt||'Hình minh họa câu hỏi '+(i+1))}"></figure>`:''}${q.responseType==='text'?`<div class="free-answer"><label for="free-answer-${i}">Câu trả lời</label><input id="free-answer-${i}" class="free-answer-input" type="text" data-free-question="${i}" value="${escapeHTML(state.answers[i]??'')}" maxlength="200" autocomplete="off" spellcheck="false" placeholder="Nhập câu trả lời" ${state.submitted?'disabled':''} required>${ready&&state.solutionsVisible?`<p class="provided-answer">Đáp án: ${escapeHTML(q.answer)}</p>`:''}</div>`:`<div class="paper-options answers">${q.options.map((option,j)=>`<label class="${state.answers[i]===j?'chosen':''} ${ready&&state.solutionsVisible&&j===q.answer?'paper-correct':''} ${ready&&state.solutionsVisible&&state.answers[i]===j&&j!==q.answer?'paper-wrong':''}"><input type="radio" name="question-${i}" data-question="${i}" value="${j}" ${state.answers[i]===j?'checked':''} ${state.submitted?'disabled':''}><span class="answer-text ${q.optionImages?.[j]?'answer-with-figure':''}">${String.fromCharCode(65+j)}. ${q.optionImages?.[j]&&/^\.\/assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|jpeg|svg)$/.test(q.optionImages[j])?`<img src="${escapeHTML(q.optionImages[j])}" alt="${escapeHTML(option)}" width="28" height="28">`:escapeHTML(option)}</span></label>`).join('')}</div>`}${ready&&state.solutionsVisible&&q.explanation?`<p class="paper-explanation explanation">${escapeHTML(q.explanation)}</p>${q.explanationImage&&/^\.\/assets\/[a-zA-Z0-9_./-]+\.svg$/.test(q.explanationImage)?`<figure class="question-illustration solution-illustration"><img src="${escapeHTML(q.explanationImage)}" alt="${escapeHTML(q.explanationImageAlt||'Hình lời giải do phụ huynh cung cấp')}"></figure>`:''}`:''}</fieldset>`;
}
function applyPracticeSearch(value){
 const p=state.practice;if(!p)return;
 p.searchQuery=String(value||'').slice(0,200);
 const tokens=normalizedTopicSearch(p.searchQuery.trim()).split(/\s+/).filter(Boolean);
 let visible=0;
 app.querySelectorAll('.paper-question').forEach((element,i)=>{
  const q=p.questions[i],source=p.sources?.[i],label=`Câu ${p.topicId?i+1:q.sourceNumber??q.number??i+1}`;
  const text=normalizedTopicSearch([label,q.english,q.text,q.translation,q.vietnamese,q.detail,q.imageAlt,source?.paperTitle,...(q.options||[])].filter(Boolean).join(' '));
  element.hidden=!tokens.every(token=>text.includes(token));if(!element.hidden)visible++;
 });
 app.querySelectorAll('.paper-section-heading').forEach(heading=>{
  let next=heading.nextElementSibling,hasVisible=false;
  while(next&&!next.classList.contains('paper-section-heading')){if(next.classList.contains('paper-question')&&!next.hidden)hasVisible=true;next=next.nextElementSibling;}
  heading.hidden=!hasVisible;
 });
 const count=app.querySelector('[data-practice-search-count]');if(count)count.textContent=tokens.length?`${visible}/${p.questions.length} câu phù hợp`:`${p.questions.length} câu hỏi`;
 const clear=app.querySelector('[data-practice-search-clear]');if(clear)clear.hidden=!p.searchQuery;
 const empty=app.querySelector('.paper-search-empty');if(empty)empty.hidden=!tokens.length||visible>0||!p.questions.length;
 saveCurrentView();
}
function renderPracticeSearch(){
 return `<aside class="paper-search-tools" aria-label="Tìm kiếm câu hỏi"><div class="paper-search-box">${icon('search',20)}<input type="search" id="practice-question-search" aria-label="Tìm câu hỏi trong bài" aria-controls="quiz" maxlength="200" placeholder="Tìm câu hỏi…" value="${escapeHTML(state.practice.searchQuery||'')}"><button type="button" data-practice-search-clear aria-label="Xóa tìm kiếm câu hỏi" ${state.practice.searchQuery?'':'hidden'}>${icon('close',18)}</button></div><p data-practice-search-count role="status" aria-live="polite"></p></aside>`;
}
function renderPractice(){
 stopPracticeClock();
 const p=state.practice,questions=p.questions,answered=Object.keys(state.answers).length,ready=hasProvidedAnswers(questions),score=questions.filter((q,i)=>matchesProvidedAnswer(q,state.answers[i])).length;
 const practiceTheme=activeTheme().id;
 const book=['crystal','cloud','forest','magic','treasure','cars','museum'].includes(practiceTheme)?practiceTheme+'-book':'pixel-book';
 app.innerHTML=`<main class="paper-world"><header class="paper-brand"><button class="paper-home-book" data-action="home" aria-label="Về góc luyện tập" title="Về góc luyện tập"><img src="${publicAsset(book)}" alt=""></button><strong>Góc học tập <em>của bé</em></strong></header>${renderPracticeSearch()}<section class="paper-shell"><div class="paper-toolbar"><div class="paper-title"><span class="exam-number">${p.paper+1}</span><div><h2 tabindex="-1" id="active-paper-title">${escapeHTML(p.title)}</h2></div></div><div class="paper-stat">${icon('flag',32)}<div><small>Tiến độ</small><strong id="answer-count">${answered}/${questions.length} câu</strong></div></div><div class="paper-stat">${icon('clock',32)}<div><small>Thời gian</small><strong class="unlimited-time practice-elapsed" data-practice-clock role="timer" aria-label="Thời gian làm bài" aria-live="off">${formatPracticeClock(elapsedPracticeSeconds(p))}</strong></div></div>${state.submitted?`<div class="result paper-result-inline" role="status"><h2 tabindex="-1">${ready?`<small>Làm đúng</small><strong>${score}/${questions.length} câu</strong>`:'<small>Đã nộp bài</small><strong>Chờ đáp án</strong>'}</h2></div>`:''}<div class="paper-toolbar-actions">${state.submitted?`<button class="secondary-button" data-action="retry">Làm lại</button>${questions.some(q=>q.answerSource==='user'&&validResponse(q,q.answer))&&!state.solutionsVisible?'<button class="primary-button" data-action="solutions">Xem đáp án và lời giải</button>':''}`:''}<button class="paper-submit" data-action="submit-paper" ${state.submitted||answered!==questions.length?'disabled':''}>Nộp bài ${icon('send',22)}</button></div></div><form id="quiz"><div class="exam-paper"><p class="paper-search-empty" hidden>Không tìm thấy câu hỏi phù hợp. Hãy thử từ khóa khác hoặc xóa tìm kiếm.</p>${p.topicId?`<div class="practice-classification-tools"><button type="button" data-classify-group="${p.topicId.match(/^timo-group-[1-5]/)?.[0]}">Quản lý chủ đề</button>${questions.some((_,i)=>isNationalTopicQuestion(i))?'<span class="national-question-key"><span aria-hidden="true">★</span> Câu Vòng quốc gia</span>':''}<span data-inline-classification-notice role="status"></span></div>`:""}${!questions.length?`<p>Đã phân loại hết câu hỏi trong chủ đề này. Bấm quyển sách để về góc luyện tập.</p>`:""}${questions.map((q,i)=>renderQuestion(q,i,ready)).join('')}</div></form></section></main>`;
 applyPracticeSearch(p.searchQuery||'');
 refreshPracticeClock();if(!state.submitted&&questions.length)practiceClock=setInterval(refreshPracticeClock,1000);
 saveCurrentView();
}
function home(){state.practice=null;state.search='';renderHome();window.scrollTo({top:0});}
document.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.hasAttribute('data-practice-search-clear')){const input=app.querySelector('#practice-question-search');if(input){input.value='';applyPracticeSearch('');input.focus();}return;}
 if(button.dataset.topicGroup!==undefined){
  const group=Number(button.dataset.topicGroup),collapse=window.matchMedia('(max-width:760px)').matches&&state.topicGroup===group;
  state.topicGroup=collapse?null:group;renderHome();app.querySelector(`[data-topic-group="${group}"]`)?.focus({preventScroll:true});return;
 }
 if(button.dataset.topicOpen){openTopicIntro(button.dataset.topicOpen);return;}
 const action=button.dataset.action;
 if(action==='help')document.querySelector('#help').showModal();
 if(action==='close-help')document.querySelector('#help').close();
 if(action==='home'){if(document.querySelector('#settings').open)document.querySelector('#settings').close();home();}
 if(action==='clear-search'){state.search='';renderHome();document.querySelector('#paper-search').focus();}
 if(action==='local-data')openLocalData();
 if(action==='close-intro')introDialog.close();
 if(action==='start-paper')startPendingPaper();
 if(action==='submit-paper')document.querySelector('#quiz').requestSubmit();
 if(action==='retry'){if(state.practice.topicId)state.practice=reshuffleTopicPractice(state.practice);state.answers={};state.submitted=false;state.solutionsVisible=false;state.practice.startedAt=Date.now();state.practice.syncRunId=Date.now()+'.'+crypto.randomUUID();delete state.practice.finishedAt;saveAttempt();renderPractice();window.scrollTo({top:0});}
 if(button.dataset.subject){state.subject=button.dataset.subject;renderHome();app.querySelector(`[data-subject="${state.subject}"]`).focus();}
 if(button.dataset.mode!==undefined){state.mode=modes[Number(button.dataset.mode)];renderHome();app.querySelector(`[data-mode="${button.dataset.mode}"]`).focus();}
 if(button.dataset.review!==undefined)openSavedPaper(Number(button.dataset.review));
 if(button.dataset.paper!==undefined)openPaperIntro(Number(button.dataset.paper));
});
app.addEventListener('change',event=>{
 const input=event.target;
 if(input.dataset.filter){const id=input.id;state[input.dataset.filter]=input.value;if(!getSubjects(state.program).includes(state.subject))state.subject=getSubjects(state.program)[0];if(!getModes(state.program,state.grade).includes(state.mode))state.mode=getModes(state.program,state.grade)[0];state.search='';renderHome();const target=id?document.getElementById(id):app.querySelector(`input[name="program"][value="${state.program}"]`);target?.focus();}
 if(input.dataset.question!==undefined&&!state.submitted){state.answers[Number(input.dataset.question)]=Number(input.value);input.closest('.answers').querySelectorAll('label').forEach(label=>label.classList.toggle('chosen',label.contains(input)));const count=Object.keys(state.answers).length;document.querySelector('#answer-count').textContent=`${count}/${state.practice.questions.length} câu`;document.querySelectorAll('.paper-submit').forEach(button=>button.disabled=count!==state.practice.questions.length);saveAttempt();}
});
app.addEventListener('submit',event=>{event.preventDefault();if(!state.practice||!state.practice.questions.length||state.submitted||Object.keys(state.answers).length!==state.practice.questions.length)return;state.submitted=true;state.practice.finishedAt=Date.now();stopPracticeClock();const score=state.practice.questions.filter((q,i)=>matchesProvidedAnswer(q,state.answers[i])).length;state.completed[`${key()}-${state.practice.paper}`]={result:hasProvidedAnswers(state.practice.questions)?`${score}/${state.practice.questions.length} câu đúng`:'Chờ đáp án',duration:elapsedPracticeSeconds(state.practice)};saveAttempt();renderPractice();app.querySelector('.result h2').focus();window.scrollTo({top:0,behavior:'smooth'});});
app.addEventListener('keydown',event=>{const tab=event.target.closest('[role="tab"]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const current=Number(tab.dataset.mode), next=event.key==='Home'?0:event.key==='End'?modes.length-1:(current+(event.key==='ArrowRight'?1:-1)+modes.length)%modes.length;state.mode=modes[next];renderHome();app.querySelector(`[data-mode="${next}"]`).focus();});
app.addEventListener('input',event=>{const input=event.target;
 if(input.id==='practice-question-search'){applyPracticeSearch(input.value);return;}
 if(input.dataset.freeQuestion!==undefined&&!state.submitted){const i=Number(input.dataset.freeQuestion),q=state.practice?.questions[i];if(!q||q.responseType!=='text')return;const value=input.value.slice(0,200);if(validResponse(q,value))state.answers[i]=value;else delete state.answers[i];const count=Object.keys(state.answers).length;document.querySelector('#answer-count').textContent=`${count}/${state.practice.questions.length} câu`;document.querySelectorAll('.paper-submit').forEach(button=>button.disabled=count!==state.practice.questions.length);saveAttempt();return;}
 if(event.target.id!=='paper-search')return;state.search=event.target.value;const position=event.target.selectionStart;renderHome();const searchInput=document.querySelector('#paper-search');searchInput.focus();try{searchInput.setSelectionRange(position,position);}catch{}});
function openSavedPaper(paper){
 const selection={grade:state.grade,program:state.program,subject:state.subject,mode:state.mode,paper,title:paperTitle(paper),questions:getQuestions(state.subject,state.grade,state.mode,paper,state.program),durationMinutes:null},record=attempts[attemptKey(selection)];
 if(!record?.submitted)return;
 state.practice={...selection,syncRunId:record.syncRunId||String(record.startedAt),startedAt:record.startedAt,finishedAt:Number.isFinite(record.finishedAt)?record.finishedAt:record.updatedAt};state.answers=record.answers||{};state.submitted=true;state.solutionsVisible=false;renderPractice();app.querySelector('.result h2').focus();window.scrollTo({top:0});
}
function openLocalData(){const d=document.querySelector('#local-data');d.innerHTML=`<button class="icon-button dialog-close" data-action="close-local-data" aria-label="Đóng">${icon('close',22)}</button><h2>Đồng bộ và dữ liệu</h2><div id="learning-sync-panel"></div><hr><h3>Bản sao trên thiết bị</h3><p>Bạn có thể tải bản sao bài làm và phân loại đang lưu trên máy này.</p><button class="primary-button" data-action="export-local-data">Tải bản sao dữ liệu ${icon('arrow',18)}</button>`;window.LearningSync?.draw();d.showModal();window.LearningSync?.prepare().catch(()=>{});}

document.addEventListener('click',e=>{if(e.target.closest('[data-action="close-local-data"]'))document.querySelector('#local-data').close();if(e.target.closest('[data-action="export-local-data"]')){const blob=new Blob([JSON.stringify(window.LearningSync?.exportData()||{version:2,kind:'official',attempts},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='goc-hoc-tap-bai-lam.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}});
renderHome();

function preserveClassifiedProgress(previous,next){
 const records=Object.entries(attempts).filter(([key,record])=>key.split('|').length===5&&key.includes('|TIMO|Toán|Luyện theo chủ đề|')&&Array.isArray(record?.questionIds)).sort((a,b)=>(a[1].updatedAt||0)-(b[1].updatedAt||0));
 const touched=new Map();
 for(const id of new Set([...Object.keys(previous.assignments),...Object.keys(next.assignments)])){
  if(previous.assignments[id]===next.assignments[id])continue;
  const entry=officialPapers.flatMap(p=>p.questions.map(q=>({id:p.id+':'+q.number,question:q,grade:String(p.grade)}))).find(e=>e.id===id);if(!entry)continue;
  const group=getTimoTopicGroups(entry.grade).find(g=>g.topics.some(t=>t.entries.some(e=>e.id===id)));
  const topic=group?.topics.find(t=>t.entries.some(e=>e.id===id));if(!topic)continue;
  const targetKey=[entry.grade,'TIMO','Toán',modes[2],topic.id].join('|');
  let value;
  for(const [key,record] of records){if(!key.startsWith(entry.grade+'|'))continue;const i=record.questionIds.indexOf(id);if(i>=0&&validResponse(entry.question,record.answers?.[i]))value=record.answers[i];}
  const original=attempts[targetKey];
  if(!touched.has(targetKey))touched.set(targetKey,{...original,questionIds:original?.questionIds?.slice()||[],answers:{...original?.answers},submitted:false,mergedTopicProgress:true,startedAt:original?.startedAt||Date.now(),updatedAt:Date.now()});
  const target=touched.get(targetKey);let index=target.questionIds.indexOf(id);if(index<0){index=target.questionIds.length;target.questionIds.push(id);}
  if(validResponse(entry.question,value)&&!validResponse(entry.question,target.answers[index]))target.answers[index]=value;
 }
 for(const [key,record] of touched){attempts[key]=record;window.LearningSync?.changed('attempt',key,record);}
 try{localStorage.setItem(attemptStorageKey,JSON.stringify(attempts));}catch{}
}

function refreshClassifiedPractice(){
 const p=state.practice;if(!p?.topicId){renderHome();return;}
 const scroll=window.scrollY,oldIds=p.questionIds,oldAnswers=new Map(oldIds.map((id,i)=>[id,state.answers[i]]));
 let selection=selectionFromView(viewSelection(p));
 if(!selection&&!getTimoTopicGroups(p.grade).some(g=>g.topics.some(t=>t.id===p.topicId))){
  const groupId=p.topicId.match(/^timo-group-[1-5]/)?.[0];
  if(groupId)selection=selectionFromView({...viewSelection(p),topicId:groupId+'-unclassified'});
 }
 const newIds=selection?.questionIds||[],changed=oldIds.length!==newIds.length||oldIds.some((id,i)=>id!==newIds[i]);
 state.practice={...p,...(selection||{questions:[],questionIds:[],sources:[]})};state.answers={};
 const record=attempts[attemptKey(state.practice)];
 state.practice.questions.forEach((q,i)=>{const value=oldAnswers.get(newIds[i]),savedIndex=record?.questionIds?.indexOf(newIds[i]);if(validResponse(q,value))state.answers[i]=value;else if(validResponse(q,record?.answers?.[savedIndex]))state.answers[i]=record.answers[savedIndex];});
 if(changed){state.submitted=false;state.solutionsVisible=false;delete state.practice.finishedAt;}
 saveAttempt();renderPractice();window.scrollTo(0,scroll);
}
