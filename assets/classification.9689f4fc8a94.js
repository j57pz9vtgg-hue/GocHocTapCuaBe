// Published topic classification and manual topic management. No automatic suggestion engine.
const TimoClassification=(()=>{
 const storageKey='goc-hoc-tap.classification.v1';
 const empty=()=>({version:1,kind:'timo-classification',topics:[],assignments:{}});
 let saved=empty(),draft=null,trigger=null,lastGroup=null,hasLocalOverride=false;
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();
 const html=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function validate(value){
  if(!value||value.version!==1||value.kind!=='timo-classification'||!Array.isArray(value.topics)||value.topics.length>500||!value.assignments||typeof value.assignments!=='object'||Array.isArray(value.assignments))throw Error('Tệp phân loại không hợp lệ.');
  const topics=[],ids=new Set(),names=new Set(),entries=new Map();
  for(const grade of new Set(officialPapers.map(p=>String(p.grade))))for(const g of buildTimoTopicGroups(officialPapers,grade))for(const t of g.topics)for(const e of t.entries)entries.set(e.id,{groupId:g.id,grade});
  for(const t of value.topics){
   if(!t||typeof t.id!=='string'||!/^timo-group-[1-5]-review-[a-zA-Z0-9-]+$/.test(t.id)||ids.has(t.id)||!/^timo-group-[1-5]$/.test(t.groupId)||!t.id.startsWith(t.groupId+'-review-')||typeof t.grade!=='string'||!/^([1-9]|1[0-2])$/.test(t.grade)||typeof t.name!=='string'||!t.name.trim()||t.name.trim().length>100||norm(t.name.trim())==='chua phan loai')throw Error('Tên hoặc mã chủ đề không hợp lệ.');
   const nameKey=[t.grade,t.groupId,norm(t.name.trim())].join('|');if(names.has(nameKey))throw Error('Có tên chủ đề trùng trong cùng nhóm.');
   names.add(nameKey);ids.add(t.id);topics.push({id:t.id,groupId:t.groupId,grade:t.grade,name:t.name.trim()});
  }
  const byId=new Map(topics.map(t=>[t.id,t])),assignments={};
  if(Object.keys(value.assignments).length>10000)throw Error('Tệp phân loại quá lớn.');
  for(const [id,topicId] of Object.entries(value.assignments)){
   const e=entries.get(id),t=byId.get(topicId);
   if(!e||!t||e.groupId!==t.groupId||e.grade!==t.grade)throw Error('Câu hỏi không thuộc đúng lớp hoặc nhóm chủ đề lớn.');
   assignments[id]=topicId;
  }
  return {version:1,kind:'timo-classification',topics,assignments};
 }
 try{if(typeof publishedTimoClassification!=='undefined')saved=validate(publishedTimoClassification);}catch{}
 try{
  const raw=localStorage.getItem(storageKey),resetId=typeof publishedTimoClassification!=='undefined'?publishedTimoClassification.resetId:null;
  if(resetId&&localStorage.getItem('goc-hoc-tap.classification-reset.v1')!==resetId){
   if(raw)localStorage.setItem('goc-hoc-tap.classification-backup.'+resetId,raw);
   localStorage.removeItem(storageKey);localStorage.setItem('goc-hoc-tap.classification-reset.v1',resetId);
  }else if(raw){saved=validate(JSON.parse(raw));hasLocalOverride=true;}
 }catch{}
 function apply(groups,grade){
  for(const group of groups){
   const all=group.topics.flatMap(t=>t.entries),custom=saved.topics.filter(t=>t.grade===String(grade)&&t.groupId===group.id);
   const byId=new Map(custom.map(t=>[t.id,{id:t.id,name:t.name,entries:[]}]));
   for(const t of group.topics)t.entries=t.entries.filter(e=>!byId.has(saved.assignments[e.id]));
   for(const e of all)byId.get(saved.assignments[e.id])?.entries.push(e);
   group.topics.push(...byId.values());
  }
  return groups;
 }
 function getDialog(){
  let d=document.querySelector('#classification-dialog');if(d)return d;
  d=document.createElement('dialog');d.id='classification-dialog';d.className='classification-dialog';d.setAttribute('aria-labelledby','classification-title');document.body.append(d);
  d.addEventListener('close',()=>{draft=null;if(trigger?.isConnected)trigger.focus();else document.querySelector(`[data-classify-group="${lastGroup}"]`)?.focus({preventScroll:true})});
  d.addEventListener('click',onClick);
  d.addEventListener('change',onChange);
  return d;
 }
 function buildSharingExport(){
  const groups=[],questions=[];
  for(const grade of [...new Set(officialPapers.filter(p=>p.program==='TIMO'&&p.subject==='Toán').map(p=>String(p.grade)))]){
   for(const group of apply(buildTimoTopicGroups(officialPapers,grade),grade)){
    const groupQuestions=[];
    for(const topic of group.topics)for(const entry of topic.entries){
     const q=entry.question,item={id:entry.id,paperId:entry.paperId,paperTitle:entry.paperTitle,round:entry.mode,grade,number:entry.number,groupId:group.id,groupName:group.name,topicId:topic.id,topicName:topic.name,status:topic.id===group.id+'-unclassified'?'unclassified':'classified',english:q.english||q.text||'',translation:q.translation||q.vietnamese||'',detail:q.detail||'',image:q.image||'',imageAlt:q.imageAlt||'',responseType:q.responseType||'choice',options:q.options||[],optionImages:q.optionImages||[]};
     questions.push(item);groupQuestions.push(item);
    }
    groups.push({grade,id:group.id,name:group.name,total:groupQuestions.length,classified:groupQuestions.filter(q=>q.status==='classified').length,unclassified:groupQuestions.filter(q=>q.status==='unclassified').length,topics:group.topics.map(t=>({id:t.id,name:t.name,questionIds:t.entries.map(e=>e.id)}))});
   }
  }
  questions.sort((a,b)=>a.paperId.localeCompare(b.paperId)||a.number-b.number);
  const classified=questions.filter(q=>q.status==='classified').length;
  return {...JSON.parse(JSON.stringify(saved)),exportPurpose:'publish-owner-classification',exportedAt:new Date().toISOString(),scope:'all-official-timo-math-questions',summary:{total:questions.length,classified,unclassified:questions.length-classified},groups,questions};
 }
 function footer(){return '<div class="classification-backup"><label class="classification-file">Nhập bản sao<input type="file" accept="application/json,.json" data-class-import></label></div>';}
 function heading(title,description){return `<header><div><h2 id="classification-title">${html(title)}</h2><p>${html(description)}</p></div><button type="button" data-class-close aria-label="Đóng phân loại">×</button></header>`;}
 function questionPreview(e,checkbox){
  const q=e.question,image=q.image&&/^\.\/assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|jpeg|svg)$/.test(q.image)?`<img loading="lazy" src="${html(q.image)}" alt="${html(q.imageAlt||'Hình câu hỏi')}">`:'';
  return `<div class="classification-question"><label><input type="checkbox" ${checkbox} value="${html(e.id)}"><span><small>${html(e.paperTitle)} · Câu ${e.number}</small><strong lang="en">${html(q.english||q.text)}</strong>${q.translation||q.vietnamese?`<span>${html(q.translation||q.vietnamese)}</span>`:''}</span></label>${q.detail?`<p class="classification-detail">${html(q.detail)}</p>`:''}${image}</div>`;
 }
 function openReview(groupId,keepTrigger=false){
  const group=getTimoTopicGroups(state.grade).find(g=>g.id===groupId);if(!group)return;
  if(!keepTrigger)trigger=document.activeElement;lastGroup=groupId;draft={groupId,grade:state.grade};
  const d=getDialog();d.innerHTML=heading('Quản lý chủ đề',group.name)+`<div class="classification-body"><p class="classification-local">Các câu đã được phân loại theo chủ đề mặc định. Chỉnh sửa trên trình duyệt này được lưu riêng.</p><div class="classification-status" role="status" tabindex="-1"></div><h3>Chủ đề hiện có</h3><ul class="classification-topic-list">${group.topics.filter(t=>t.id.includes('-review-')).map(t=>`<li><span>${html(t.name)} (${t.entries.length} câu)</span><span class="classification-topic-actions"><button type="button" data-class-edit="${html(t.id)}">Đổi tên / chỉnh sửa</button><button type="button" class="classification-delete" data-class-delete="${html(t.id)}">Xóa chủ đề</button></span></li>`).join('')}</ul><p>Chưa phân loại: ${group.topics.find(t=>t.id===group.id+'-unclassified')?.entries.length||0} câu.</p></div><footer>${footer()}<div class="classification-actions"><button type="button" data-class-close>Đóng</button></div></footer>`;
  if(!d.open)d.showModal();else d.scrollTop=0;
 }
 function status(message){const el=getDialog().querySelector('.classification-status');if(el){el.textContent=message;el.focus();}}
 function commit(next,remote=false){
  const value=validate(next),old=saved;
  if(state.practice?.topicId)saveAttempt();
  try{localStorage.setItem(storageKey,JSON.stringify(value));}catch{throw Error('Không lưu được phân loại. Hãy kiểm tra dung lượng hoặc quyền lưu dữ liệu của trình duyệt.');}
  saved=value;hasLocalOverride=true;
  if(!remote)window.LearningSync?.changed('classification',publishedTimoClassification.resetId||'classification',value);
  if(typeof preserveClassifiedProgress==='function')preserveClassifiedProgress(old,value);
  if(state.practice?.topicId)refreshClassifiedPractice();else renderHome();return value;
 }
 function openEditor(id){
  const group=getTimoTopicGroups(state.grade).find(g=>g.topics.some(t=>t.id===id)),topic=group?.topics.find(t=>t.id===id);if(!topic)return;
  lastGroup=group.id;draft={groupId:group.id,grade:state.grade,editing:id};
  const d=getDialog();d.innerHTML=heading('Chỉnh sửa chủ đề',group.name)+`<div class="classification-body"><div class="classification-status" role="status" tabindex="-1"></div><label>Tên chủ đề<input type="text" data-edit-name maxlength="100" value="${html(topic.name)}"></label><p>Chọn câu cần đưa lại về Chưa phân loại. Bỏ chọn các câu muốn giữ trong chủ đề này.</p>${topic.entries.map(e=>questionPreview(e,'data-edit-question')).join('')}</div><footer><div class="classification-actions"><button type="button" data-class-back>Quay lại</button><button type="button" class="classification-primary" data-class-save-editor>Lưu thay đổi</button></div></footer>`;
  if(!d.open)d.showModal();
 }
 function openDelete(id){
  const topic=saved.topics.find(t=>t.id===id&&t.grade===state.grade);if(!topic)return;
  const count=Object.values(saved.assignments).filter(value=>value===id).length;
  draft={groupId:topic.groupId,grade:topic.grade,deleting:id};
  const d=getDialog();d.innerHTML=heading('Xóa chủ đề',topic.name)+`<div class="classification-body"><div class="classification-status" role="status" tabindex="-1"></div><p>Xóa chủ đề <strong>${html(topic.name)}</strong> và đưa ${count} câu hỏi về <strong>Chưa phân loại</strong> trong cùng nhóm lớn để phân loại lại.</p><p>Câu hỏi, đáp án, lời giải và bài làm đã lưu được giữ nguyên.</p></div><footer><div class="classification-actions"><button type="button" data-class-back>Hủy</button><button type="button" class="classification-delete" data-class-confirm-delete>Xóa chủ đề và đưa câu về Chưa phân loại</button></div></footer>`;
 }
 function deleteTopic(){
  if(!draft?.deleting)return;
  const id=draft.deleting,groupId=draft.groupId,next=JSON.parse(JSON.stringify(saved));
  next.topics=next.topics.filter(t=>t.id!==id);
  let count=0;for(const [questionId,topicId] of Object.entries(next.assignments))if(topicId===id){delete next.assignments[questionId];count++;}
  commit(next);openReview(groupId,true);status(`Đã xóa chủ đề và đưa ${count} câu về Chưa phân loại.`);
 }
 function saveEditor(){
  const next=JSON.parse(JSON.stringify(saved)),t=next.topics.find(t=>t.id===draft.editing);if(!t)return;
  const name=getDialog().querySelector('[data-edit-name]').value.trim();if(!name)throw Error('Vui lòng nhập tên chủ đề.');t.name=name;
  for(const e of getDialog().querySelectorAll('[data-edit-question]:checked'))if(next.assignments[e.value]===t.id)delete next.assignments[e.value];
  const groupId=draft.groupId;commit(next);openReview(groupId,true);status('Đã lưu thay đổi chủ đề.');
 }
 function onClick(event){
  const b=event.target.closest('button');if(!b)return;
  try{
   if(b.hasAttribute('data-class-close'))getDialog().close();
   if(b.hasAttribute('data-class-edit'))openEditor(b.dataset.classEdit);
   if(b.hasAttribute('data-class-delete'))openDelete(b.dataset.classDelete);
   if(b.hasAttribute('data-class-confirm-delete'))deleteTopic();
   if(b.hasAttribute('data-class-back'))openReview(draft.groupId,true);
   if(b.hasAttribute('data-class-save-editor'))saveEditor();

  }catch(e){status(e.message);}
 }
 async function onChange(event){
  const input=event.target,d=getDialog();
  if(input.hasAttribute('data-class-import')&&input.files[0]){
   try{
    const file=input.files[0];if(file.size>2*1024*1024)throw Error('Chỉ nhận bản sao nhỏ hơn2MB.');
    const value=validate(JSON.parse(await file.text()));
    // Import is a preview. Only the explicit apply button writes local classification.
    const groupId=draft.groupId;
    draft={groupId,grade:state.grade,importValue:value};
    d.innerHTML=heading('Duyệt bản sao phân loại','Kiểm tra trước khi thay phân loại đang lưu trên trình duyệt này')+`<div class="classification-body"><div class="classification-status" role="status" tabindex="-1"></div><p>Bản sao có ${value.topics.length} chủ đề, ${Object.keys(value.assignments).length} câu đã phân loại.</p><ul>${value.topics.map(t=>`<li>Lớp ${html(t.grade)} · ${html(timoTopicGroups.find(g=>g.id===t.groupId)?.name)} · ${html(t.name)} (${Object.values(value.assignments).filter(id=>id===t.id).length} câu)</li>`).join('')}</ul><p>Khi áp dụng, bản sao sẽ thay thế phân loại hiện tại. Bài làm được giữ theo mã câu nguồn.</p></div><footer><div class="classification-actions"><button type="button" data-class-back>Hủy</button><button type="button" class="classification-primary" data-class-confirm-import>Áp dụng bản sao</button></div></footer>`;
    d.querySelector('[data-class-confirm-import]').addEventListener('click',()=>{try{const g=draft.groupId;commit(draft.importValue);openReview(g,true);status('Đã nhập bản sao phân loại.');}catch(e){status(e.message)}});
   }catch(e){status('Không thể nhập: '+e.message);}
  }
 }
 document.addEventListener('click',event=>{const b=event.target.closest('[data-classify-group]');if(b)openReview(b.dataset.classifyGroup);const edit=event.target.closest('[data-edit-classified-topic]');if(edit){trigger=edit;openEditor(edit.dataset.editClassifiedTopic)}});
 return {apply,validate,openReview,buildSharingExport,acceptSynced:value=>commit(value,true),usesPublished:()=>!hasLocalOverride,snapshot:()=>JSON.parse(JSON.stringify(saved))};
})();
