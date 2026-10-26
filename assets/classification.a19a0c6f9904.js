// Local, review-first topic suggestions. No answer or explanation is used by the matcher.
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
 // Narrow matches take precedence. A question with no match remains unclassified.
 const rules={
  'timo-group-1':[
   ['Bài toán ngày tháng',/day of the week|yesterday|tomorrow|last month|which month|january|february|march|april|calendar|days in/,'Nội dung ngày, tháng hoặc thứ trong tuần'],
   ['Bài toán tuổi',/years? old|birthday|was born|how old/,'Nội dung tuổi hoặc năm sinh'],
   ['Quy luật hình ảnh',/figure.*(?:sequence|pattern|counting|space)|next figure|group.*(?:hat|flower|sun|figure)|(?:5th|7th|10th|15th).*group|nhom.*(?:hinh|hoa|mu|mat troi)|day hinh/,'Nội dung quy luật hình hoặc nhóm hình'],
   ['Quy luật dãy số',/pattern|sequence|day so|bang so|number.*blank/,'Nội dung quy luật số']
  ],
  'timo-group-2':[
   ['Tính nhanh nhóm tròn chục',/round.*ten|make.*ten|tron chuc|nhom.*chuc/,'Nội dung tính nhanh hoặc nhóm tròn chục'],
   ['Cân bằng hai vế',/both sides|two sides.*equal|can bang|hai ve/,'Nội dung cân bằng hai vế'],
   ['Tìm chữ số ẩn',/1-digit|one-digit|hidden|bell|blank|find.*x|value of x|chuong|che|o trong/,'Đề bài có số hoặc chữ số chưa biết'],
   ['Tính giá trị biểu thức',/value|calculate|result|sum|evaluate|gia tri|tinh/,'Đề bài yêu cầu tính giá trị']
  ],
  'timo-group-3':[
   ['Số chẵn - số lẻ',/even|odd|chan|le hay/,'Đề bài có điều kiện chẵn/lẻ'],
   ['Cấu tạo số',/1-digit|one-digit|digit|chu so|cau tao so/,'Nội dung chữ số và cấu tạo số'],
   ['Xác định thứ tự số',/sequence|term|order|day so|thu tu/,'Nội dung số hạng hoặc thứ tự số']
  ],
  'timo-group-4':[
   ['Khối lập phương',/viewing|viewed|from (?:the )?(?:front|right|side|top)|cubes?|cuboid|lap phuong|nhin.*(?:ben|phai|truoc|tren)/,'Nội dung hình khối hoặc quan sát khối'],
   ['Đếm góc và cạnh',/vertices|edges?|faces?|angles?|prism|goc|canh.*dem/,'Nội dung góc, đỉnh, cạnh hoặc mặt'],
   ['Đếm đoạn thẳng',/line segment|how many.*straight line|doan thang/,'Đề bài đếm đoạn hoặc đường thẳng'],
   ['Đếm tam giác',/how many.*triang|dem.*tam giac/,'Đề bài đếm tam giác'],
   ['Đếm hình vuông',/how many.*square|hinh vuong/,'Đề bài đếm hình vuông']
  ],
  'timo-group-5':[
   ['Bài toán trồng cây',/plant.*tree|tree.*plant|trong cay/,'Nội dung trồng cây'],
   ['Phân loại',/classif|categor|phan loai/,'Nội dung phân loại'],
   ['Tư duy logic ngược nâng cao',/originally|backward|ban dau|suy luan nguoc/,'Nội dung tìm trạng thái ban đầu hoặc suy luận ngược'],
   ['Đếm số cách sắp xếp',/how many.*ways|different ways|arrang|combinations?|competitor|gold|silver|bronze/,'Nội dung đếm cách chọn hoặc sắp xếp']
  ]
 };
 function suggest(group){
  const buckets=new Map(),unmatched=[];
  for(const entry of group.topics.find(t=>t.id===group.id+'-unclassified')?.entries||[]){
   const q=entry.question,text=norm([q.english,q.text,q.translation,q.vietnamese,q.detail,q.imageAlt].filter(Boolean).join(' '));
   const rule=(rules[group.id]||[]).find(([,pattern])=>pattern.test(text));
   if(!rule){unmatched.push(entry);continue;}
   if(!buckets.has(rule[0]))buckets.set(rule[0],{name:rule[0],reason:rule[2],entries:[]});
   buckets.get(rule[0]).entries.push(entry);
  }
  return {proposals:[...buckets.values()],unmatched};
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
 function downloadJSON(value,name){
  const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 function sharingPanel(){
  const report=buildSharingExport();
  return `<section class="classification-share"><h3>Gửi phân loại để cập nhật ứng dụng</h3><p>Xuất toàn bộ ${report.summary.total} câu trong cả5 nhóm lớn: ${report.summary.classified} câu đã phân loại, ${report.summary.unclassified} câu chưa phân loại. Tệp giữ mã câu nguồn và tên chủ đề bạn đã duyệt.</p><p>Bấm <strong>Xuất bản sao phân loại</strong> ở phía dưới để tải tệp JSON, rồi gửi tệp này trong cuộc trò chuyện. Phân loại sẽ dùng chung trên máy khác sau khi tôi cập nhật và xuất bản ứng dụng từ tệp bạn gửi.</p></section>`;
 }
 function footer(){return '<div class="classification-backup"><button type="button" data-class-export>Xuất bản sao phân loại</button><label class="classification-file">Nhập bản sao<input type="file" accept="application/json,.json" data-class-import></label></div>';}
 function heading(title,description){return `<header><div><h2 id="classification-title">${html(title)}</h2><p>${html(description)}</p></div><button type="button" data-class-close aria-label="Đóng phân loại">×</button></header>`;}
 function questionPreview(e,checkbox){
  const q=e.question,image=q.image&&/^\.\/assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|jpeg|svg)$/.test(q.image)?`<img loading="lazy" src="${html(q.image)}" alt="${html(q.imageAlt||'Hình câu hỏi')}">`:'';
  return `<div class="classification-question"><label><input type="checkbox" ${checkbox} value="${html(e.id)}"><span><small>${html(e.paperTitle)} · Câu ${e.number}</small><strong lang="en">${html(q.english||q.text)}</strong>${q.translation||q.vietnamese?`<span>${html(q.translation||q.vietnamese)}</span>`:''}</span></label>${q.detail?`<p class="classification-detail">${html(q.detail)}</p>`:''}${image}</div>`;
 }
 function openReview(groupId,keepTrigger=false){
  const group=getTimoTopicGroups(state.grade).find(g=>g.id===groupId);if(!group)return;
  if(!keepTrigger)trigger=document.activeElement;lastGroup=groupId;
  const {proposals,unmatched}=suggest(group);draft={groupId,grade:state.grade,proposals};
  const d=getDialog();d.innerHTML=heading('Đề xuất phân loại',group.name)+`<div class="classification-body"><p>Đây là đề xuất dựa trên từ khóa trong câu hỏi. Hãy mở từng nhóm để kiểm tra, sửa tên và chọn câu trước khi duyệt. Chỉ các câu được chọn mới chuyển chủ đề.</p><p class="classification-local">Phân loại đã duyệt lưu trên trình duyệt này. Dùng bản sao để chuyển sang thiết bị khác.</p>${sharingPanel()}<div class="classification-status" role="status" tabindex="-1"></div>${proposals.map((p,i)=>`<section class="classification-proposal" data-proposal="${i}"><label>Tên chủ đề đề xuất<input type="text" maxlength="100" value="${html(p.name)}" data-proposal-name="${i}"></label><p>${html(p.reason)}</p><details><summary>Xem và duyệt ${p.entries.length} câu hỏi</summary><label class="classification-select-all"><input type="checkbox" data-select-proposal="${i}">Chọn tất cả trong nhóm</label>${p.entries.map(e=>questionPreview(e,`data-proposal-question="${i}"`)).join('')}</details></section>`).join('')}${unmatched.length?`<p>${unmatched.length} câu chưa có đề xuất phù hợp sẽ giữ trong Chưa phân loại.</p>`:''}${!proposals.length?'<p>Không có đề xuất mới. Những câu chưa rõ nội dung vẫn được giữ nguyên.</p>':''}${group.topics.filter(t=>t.id.includes('-review-')).length?`<h3>Chủ đề đã duyệt</h3><ul class="classification-topic-list">${group.topics.filter(t=>t.id.includes('-review-')).map(t=>`<li><span>${html(t.name)} (${t.entries.length} câu)</span><span class="classification-topic-actions"><button type="button" data-class-edit="${html(t.id)}">Đổi tên / chỉnh sửa</button><button type="button" class="classification-delete" data-class-delete="${html(t.id)}">Xóa chủ đề</button></span></li>`).join('')}</ul>`:''}</div><footer>${footer()}<div class="classification-actions"><button type="button" data-class-close>Đóng</button><button type="button" class="classification-primary" data-class-apply ${proposals.length?'':'disabled'}>Áp dụng các câu đã chọn</button></div></footer>`;
  if(!d.open)d.showModal();else d.scrollTop=0;
 }
 function status(message){const el=getDialog().querySelector('.classification-status');if(el){el.textContent=message;el.focus();}}
 function commit(next){
  const value=validate(next),old=saved;
  if(state.practice?.topicId)saveAttempt();
  try{localStorage.setItem(storageKey,JSON.stringify(value));}catch{throw Error('Không lưu được phân loại. Hãy kiểm tra dung lượng hoặc quyền lưu dữ liệu của trình duyệt.');}
  saved=value;hasLocalOverride=true;
  if(typeof preserveClassifiedProgress==='function')preserveClassifiedProgress(old,value);
  if(state.practice?.topicId)refreshClassifiedPractice();else renderHome();return value;
 }
 function approve(){
  if(!draft)return;
  const d=getDialog(),next=JSON.parse(JSON.stringify(saved));let count=0;
  for(let i=0;i<draft.proposals.length;i++){
   const p=draft.proposals[i],ids=[...d.querySelectorAll(`[data-proposal-question="${i}"]:checked`)].map(e=>e.value);if(!ids.length)continue;
   const name=d.querySelector(`[data-proposal-name="${i}"]`).value.trim();if(!name||name.length>100||norm(name)==='chua phan loai')throw Error('Nhập tên chủ đề từ1 đến100 ký tự, khác Chưa phân loại.');
   let t=next.topics.find(t=>t.grade===draft.grade&&t.groupId===draft.groupId&&norm(t.name)===norm(name));
   if(!t){t={id:draft.groupId+'-review-'+crypto.randomUUID(),groupId:draft.groupId,grade:draft.grade,name};next.topics.push(t);}
   const allowed=new Set(p.entries.map(e=>e.id));for(const id of ids)if(allowed.has(id)){next.assignments[id]=t.id;count++;}
  }
  if(!count)throw Error('Bạn chưa chọn câu nào để áp dụng.');
  const groupId=draft.groupId;commit(next);openReview(groupId,true);status(`Đã duyệt và chuyển ${count} câu. Các câu bỏ chọn vẫn ở Chưa phân loại.`);
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
   if(b.hasAttribute('data-class-apply'))approve();
   if(b.hasAttribute('data-class-edit'))openEditor(b.dataset.classEdit);
   if(b.hasAttribute('data-class-delete'))openDelete(b.dataset.classDelete);
   if(b.hasAttribute('data-class-confirm-delete'))deleteTopic();
   if(b.hasAttribute('data-class-back'))openReview(draft.groupId,true);
   if(b.hasAttribute('data-class-save-editor'))saveEditor();
   if(b.hasAttribute('data-class-export')){
    const report=buildSharingExport();downloadJSON(report,'goc-hoc-tap-phan-loai.json');
    status(`Đã xuất ${report.summary.total} câu (${report.summary.classified} đã phân loại, ${report.summary.unclassified} chưa phân loại). Hãy gửi tệp JSON vừa tải trong cuộc trò chuyện để cập nhật dữ liệu chung của ứng dụng.`);
   }
  }catch(e){status(e.message);}
 }
 async function onChange(event){
  const input=event.target,d=getDialog();
  if(input.hasAttribute('data-select-proposal'))for(const e of d.querySelectorAll(`[data-proposal-question="${input.dataset.selectProposal}"]`))e.checked=input.checked;
  if(input.hasAttribute('data-proposal-question')){
   const index=input.dataset.proposalQuestion,items=[...d.querySelectorAll(`[data-proposal-question="${index}"]`)],all=d.querySelector(`[data-select-proposal="${index}"]`);all.checked=items.every(e=>e.checked);all.indeterminate=!all.checked&&items.some(e=>e.checked);
  }
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
 function renderInline(index){
  const p=state.practice,id=p?.questionIds?.[index],groupId=p?.topicId?.match(/^timo-group-[1-5]/)?.[0];if(!id||!groupId)return '';
  const group=getTimoTopicGroups(p.grade).find(g=>g.id===groupId);if(!group)return '';
  const proposal=suggest({...group,topics:[{id:groupId+'-unclassified',entries:[{id,question:p.questions[index]}]}]}).proposals[0];
  const current=saved.assignments[id]||groupId+'-unclassified',topics=saved.topics.filter(t=>t.groupId===groupId&&t.grade===p.grade);
  const target=proposal?topics.find(t=>norm(t.name)===norm(proposal.name))?.id||'new':current;
  return `<details class="inline-classification" data-inline-index="${index}"><summary>Phân loại câu này</summary><div class="inline-classification-fields"><p>${proposal?'Đề xuất: '+html(proposal.name):'Chọn chủ đề hoặc tạo chủ đề mới cho câu này.'}</p><label for="class-topic-${index}">Chuyển vào chủ đề<select id="class-topic-${index}" data-inline-topic><option value="${groupId}-unclassified" ${target===groupId+'-unclassified'?'selected':''}>Chưa phân loại</option>${topics.map(t=>`<option value="${html(t.id)}" ${target===t.id?'selected':''}>${html(t.name)}</option>`).join('')}<option value="new" ${target==='new'?'selected':''}>Tạo chủ đề mới</option></select></label><label data-inline-new ${target==='new'?'':'hidden'} for="class-name-${index}">Tên chủ đề mới<input id="class-name-${index}" type="text" data-inline-name maxlength="100" value="${html(proposal?.name||'')}"></label><button type="button" data-inline-apply>Áp dụng cho câu này</button><span role="status" data-inline-status></span></div></details>`;
 }
 function applyInline(button){
  const box=button.closest('[data-inline-index]'),index=Number(box.dataset.inlineIndex),p=state.practice,id=p?.questionIds?.[index],groupId=p?.topicId?.match(/^timo-group-[1-5]/)?.[0];if(!id||!groupId)return;
  const next=JSON.parse(JSON.stringify(saved)),selected=box.querySelector('[data-inline-topic]').value;let target=selected;
  try{
   if(selected==='new'){
    const name=box.querySelector('[data-inline-name]').value.trim();if(!name)throw Error('Vui lòng nhập tên chủ đề mới.');
    let topic=next.topics.find(t=>t.groupId===groupId&&t.grade===p.grade&&norm(t.name)===norm(name));
    if(!topic){topic={id:groupId+'-review-'+crypto.randomUUID(),name,groupId,grade:p.grade};next.topics.push(topic);}target=topic.id;
   }
   if(target===groupId+'-unclassified')delete next.assignments[id];else{
    if(!next.topics.some(t=>t.id===target&&t.groupId===groupId&&t.grade===p.grade))throw Error('Chủ đề không hợp lệ.');next.assignments[id]=target;
   }
   commit(next);const message=document.querySelector('[data-inline-classification-notice]');if(message)message.textContent='Đã lưu phân loại câu hỏi.';
  }catch(e){box.querySelector('[data-inline-status]').textContent=e.message;}
 }
 document.addEventListener('keydown',event=>{if(event.key==='Enter'&&event.target.matches('[data-inline-name]')){event.preventDefault();event.target.closest('.inline-classification').querySelector('[data-inline-apply]').click();}});
 document.addEventListener('change',event=>{if(event.target.hasAttribute('data-inline-topic'))event.target.closest('.inline-classification').querySelector('[data-inline-new]').hidden=event.target.value!=='new';});
 document.addEventListener('click',event=>{const button=event.target.closest('[data-inline-apply]');if(button)applyInline(button);});
 document.addEventListener('click',event=>{const b=event.target.closest('[data-classify-group]');if(b)openReview(b.dataset.classifyGroup);const edit=event.target.closest('[data-edit-classified-topic]');if(edit){trigger=edit;openEditor(edit.dataset.editClassifiedTopic)}});
 return {apply,suggest,validate,openReview,renderInline,buildSharingExport,usesPublished:()=>!hasLocalOverride,snapshot:()=>JSON.parse(JSON.stringify(saved))};
})();
