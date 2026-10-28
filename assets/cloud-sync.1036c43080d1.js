/* Firebase configuration identifies the public web app; authorization is enforced by firestore.rules. */
'use strict';
(() => {
 const C=LearningSyncCore,base=new URL('.',document.currentScript.src);
 const config={apiKey:'AIzaSyC3HTcaHccwJs9TD9xjOrvRGquwjKxfHXs',authDomain:'gochoctapcuabe01-14d32.firebaseapp.com',projectId:'gochoctapcuabe01-14d32',storageBucket:'gochoctapcuabe01-14d32.firebasestorage.app',messagingSenderId:'421072877747',appId:'1:421072877747:web:239b8005a221752dbc18c6'};
 const prefix='goc-hoc-tap.',ownerKey=prefix+'sync-owner.v1',enabledKey=prefix+'sync-enabled.v1',deviceKey=prefix+'sync-device.v1';
 const attemptStore=prefix+'attempts.official.v1',worksheetPrefix=prefix+'school-exercise.v1.',classificationStore=prefix+'classification.v1',preferenceStore=prefix+'preferences.v1';
 const classificationKey=publishedTimoClassification.resetId||'classification';
 const read=(key,fallback=null)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
 const write=(key,value)=>{localStorage.setItem(key,JSON.stringify(value));};
 let device=read(deviceKey);if(!device){device=crypto.randomUUID();try{write(deviceKey,device);}catch{}}
 device=device+'.'+crypto.randomUUID();
 let owner=read(ownerKey),enabled=read(enabledKey,false),records={},dirty=new Set(),counter=0,logicalTime=0,applying=false;
 let auth,db,collection,user=null,unsubscribe=null,authUnsubscribe=null,sdkPromise=null,serverReady=false,flushing=false,timer=null,generation=0,retryDelay=2000,phase='off',message='',lastSynced=null,busy=false;
 const id=(kind,key)=>kind+'_'+encodeURIComponent(key);
 const metaKey=()=>prefix+'sync-state.v1.'+owner.uid;
 function persist(){if(owner)write(metaKey(),records);}
 function notify(){draw();window.dispatchEvent(new Event('learning-sync-status'));}
 function status(next,text=''){phase=next;message=text;notify();}
 function clock(time=Date.now()){logicalTime=Math.max(time,logicalTime);return {t:logicalTime,n:++counter,d:device};}
 function observe(doc){for(const r of Object.values(doc.fields)){logicalTime=Math.max(logicalTime,r.t);counter=Math.max(counter,r.n);}}
 function loadRecords(){records={};dirty=new Set();if(!owner)return;for(const [key,value]of Object.entries(read(metaKey(),{})))try{C.validate(value);if(value.kind==='classification'&&value.key!==classificationKey)continue;records[key]=value;dirty.add(key);observe(value);}catch{}}
 loadRecords();
 function collect(){
  const result=[];for(const [key,value]of Object.entries(attempts))if(value&&typeof value==='object')result.push(['attempt',key,value]);
  for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key?.startsWith(worksheetPrefix)){const value=read(key);if(value)result.push(['worksheet',key.slice(worksheetPrefix.length),value]);}}
  const classification=read(classificationStore);if(classification)result.push(['classification',classificationKey,classification]);
  const prefs=read(preferenceStore);if(prefs?.theme)result.push(['preferences','theme',{theme:prefs.theme}]);return result;
 }
 function localValue(kind,key){if(kind==='attempt')return attempts[key];if(kind==='worksheet')return read(worksheetPrefix+key);if(kind==='classification')return read(classificationStore);if(kind==='preferences')return read(preferenceStore);}
 function accepts(kind,key,value){
  if(!value||typeof value!=='object'||Array.isArray(value))return false;
  if(kind==='classification'){if(key!==classificationKey)return false;TimoClassification.validate(value);return true;}
  if(kind==='preferences')return key==='theme'&&referenceThemes.some(t=>t.id===value.theme);
  if(kind==='worksheet'&&schoolMathWorksheets[key])return validSchoolMathDraft(key,value);
  if(kind==='worksheet')return !!schoolExerciseWorksheets[key]&&Array.isArray(value.blanks)&&value.blanks.length<=4&&value.blanks.every(v=>typeof v==='string'&&v.length<=20)&&Array.isArray(value.choices)&&value.choices.length<=4&&value.choices.every(v=>typeof v==='boolean');
  const [grade,program,subject,mode,paper]=key.split('|');
  if(key.split('|').length!==5||!/^([1-9]|1[0-2])$/.test(grade)||!programs.includes(program)||!getSubjects(program).includes(subject)||!modes.includes(mode)||!value.answers||typeof value.answers!=='object'||Array.isArray(value.answers)||!Number.isFinite(value.startedAt)||!Number.isFinite(value.updatedAt))return false;
  if(!getPapers(program,subject,grade,mode).some(p=>p.id===paper)&&!/^timo-group-[1-5]-/.test(paper))return false;
  return (!value.questionIds||Array.isArray(value.questionIds)&&value.questionIds.length<=1000&&value.questionIds.every(v=>typeof v==='string'&&v.length<200))&&Object.keys(value.answers).length<=1000&&Object.values(value.answers).every(v=>Number.isInteger(v)&&v>=0&&v<20||typeof v==='string'&&v.length<=200);
 }
 function recovery(kind,key,before,after){
  if(!owner||!before||C.equal(before,after))return;
  // Keep overwritten local versions on this device, never passwords or source answer keys.
  if(kind!=='classification'&&!(kind==='attempt'&&C.normalize(kind,before).syncRunId!==C.normalize(kind,after).syncRunId))return;
  const k=prefix+'sync-recovery.v1.'+owner.uid,history=read(k,[]);history.push({kind,key,value:before,at:Date.now()});write(k,history.slice(-20));
 }
 function apply(doc){
  const value=C.decode(doc);if(!accepts(doc.kind,doc.key,value))throw Error('Bản đồng bộ không khớp nội dung học hiện tại.');
  const current=localValue(doc.kind,doc.key);if(current&&C.equal(C.normalize(doc.kind,current),C.normalize(doc.kind,value)))return;
  recovery(doc.kind,doc.key,current,value);applying=true;
  try{
   if(doc.kind==='attempt'){
    attempts[doc.key]=value;write(attemptStore,attempts);rebuildCompletedAttempts();
    if(state.practice&&attemptKey(state.practice)===doc.key){
     const p=state.practice,oldRun=String(p.syncRunId||p.startedAt),newRun=String(value.syncRunId||value.startedAt);
     if(oldRun!==newRun){state.practice=null;state.answers={};state.submitted=false;renderHome();}
     else{
      const focused=document.activeElement,focusIndex=focused?.dataset?.freeQuestion,caret=focused?.selectionStart;
      state.answers={};p.questions.forEach((q,i)=>{const j=p.questionIds?value.questionIds?.indexOf(p.questionIds[i]):i,v=value.answers?.[j];if(validResponse(q,v))state.answers[i]=v;});
      state.submitted=value.submitted===true&&Object.keys(state.answers).length===p.questions.length;
      if(state.submitted&&Number.isFinite(value.finishedAt))p.finishedAt=value.finishedAt;
      if(state.submitted||value.submitted!==current?.submitted){const top=scrollY;renderPractice();scrollTo({top,behavior:'instant'});}
      else{
       app.querySelectorAll('[data-question]').forEach(el=>{el.checked=state.answers[Number(el.dataset.question)]===Number(el.value);el.closest('label')?.classList.toggle('chosen',el.checked);});
       app.querySelectorAll('[data-free-question]').forEach(el=>{const v=state.answers[Number(el.dataset.freeQuestion)]??'';if(el.value!==v)el.value=v;});
       const count=Object.keys(state.answers).length;const label=app.querySelector('#answer-count');if(label)label.textContent=`${count}/${p.questions.length} câu`;app.querySelectorAll('.paper-submit').forEach(el=>el.disabled=count!==p.questions.length);
       if(focusIndex!==undefined&&Number.isInteger(caret)){const el=app.querySelector(`[data-free-question="${focusIndex}"]`);el?.focus({preventScroll:true});try{el?.setSelectionRange(caret,caret);}catch{}}
      }
     }
     saveCurrentView();
    }else if(!state.practice)renderHome();
   }else if(doc.kind==='worksheet'){
    write(worksheetPrefix+doc.key,value);
    if(value.type==='school-math-v1'){applySchoolMathDraft(doc.key,value);return;}
    const panel=document.querySelector('#school-report-content');if(panel?.dataset.lessonId===doc.key){panel.querySelectorAll('[data-school-blank]').forEach(el=>{const caret=el.selectionStart,v=value.blanks[Number(el.dataset.schoolBlank)]||'';if(el.value!==v){el.value=v;if(el===document.activeElement)try{el.setSelectionRange(caret,caret);}catch{}}});panel.querySelectorAll('[data-school-choice]').forEach(el=>{el.checked=value.choices[Number(el.dataset.schoolChoice)]===true;});}
   }else if(doc.kind==='classification')TimoClassification.acceptSynced(value);
   else {write(preferenceStore,value);document.documentElement.dataset.theme=value.theme;if(!state.practice)renderHome();}
  }finally{applying=false;}
 }
 function changed(kind,key,value){
  if(applying||!owner||!accepts(kind,key,value))return;
  try{const k=id(kind,key),previous=records[k],next=C.update(previous,kind,key,value,clock());if(C.equal(previous,next))return;records[k]=next;dirty.add(k);persist();schedule();}
  catch{status('error','Không lưu được hàng chờ đồng bộ. Bài làm vẫn ở trên thiết bị này.');}
 }
 function seed(){
  for(const [kind,key,value]of collect())if(accepts(kind,key,value)){
   const k=id(kind,key),previous=records[k];
   // Legacy local timestamps must not outrank existing cloud work merely by signing in later.
   const time=previous?Date.now():(value.updatedAt||0);
   records[k]=C.update(previous,kind,key,value,previous?clock(time):{t:time,n:0,d:device});observe(records[k]);dirty.add(k);
  }persist();
 }
 function backup(){const key=prefix+'sync-backup.v1.'+owner.uid;if(localStorage.getItem(key)===null)write(key,{version:1,at:Date.now(),records:collect()});}
 function schedule(delay=1200){clearTimeout(timer);if(!enabled||!user||!serverReady)return;if(!navigator.onLine){status('offline','Đang ngoại tuyến. Bài làm đã lưu trên máy và sẽ tự đồng bộ khi có mạng.');return;}status('syncing');timer=setTimeout(flush,delay);}
 function explain(error){
  const code=String(error?.code||'');
  if(code.includes('unauthorized-domain'))return 'Cần thêm j57pz9vtgg-hue.github.io vào Firebase → Authentication → Settings → Authorized domains.';
  if(code.includes('operation-not-allowed')||code.includes('configuration-not-found'))return 'Cần bật Google trong Firebase → Authentication → Sign-in method.';
  if(code.includes('permission-denied'))return 'Chưa có quyền đồng bộ. Hãy tạo Cloud Firestore và đăng quy tắc bảo mật theo hướng dẫn.';
  if(code.includes('popup-blocked'))return 'Trình duyệt đang chặn cửa sổ Google. Cho phép cửa sổ bật lên rồi bấm kết nối lại.';
  if(code.includes('popup-closed')||code.includes('cancelled-popup'))return 'Bạn đã đóng đăng nhập Google. Bài làm vẫn được lưu trên máy.';
  if(code.includes('resource-exhausted'))return 'Đã chạm giới hạn Firebase hôm nay. Bài làm được giữ trên máy để đồng bộ lại sau.';
  if(code.includes('network')||code.includes('unavailable'))return 'Chưa kết nối được dịch vụ. Bài làm đã lưu trên máy; sẽ tự thử lại khi có mạng.';
  return 'Chưa đồng bộ được. Kiểm tra kết nối và phần thiết lập Firebase trong hướng dẫn; bài làm vẫn được giữ trên máy.';
 }
 async function flush(){
  if(flushing||!serverReady||!user||!enabled)return;flushing=true;const token=generation;clearTimeout(timer);timer=null;
  try{
   for(const k of [...dirty]){
    if(token!==generation||!navigator.onLine)break;const local=records[k];if(!local){dirty.delete(k);continue;}
    const ref=collection.doc(k);
    const result=await db.runTransaction(async tx=>{const snapshot=await tx.get(ref),remote=snapshot.exists?C.validate(JSON.parse(snapshot.data().body)):null;const merged=C.merge(local,remote);C.validate(merged);if(!remote||!C.equal(remote,merged))tx.set(ref,{schema:1,kind:merged.kind,key:merged.key,body:JSON.stringify(merged),updatedAt:firebase.firestore.FieldValue.serverTimestamp()});return merged;});
    if(token!==generation)return;
    records[k]=C.merge(records[k],result);observe(result);persist();apply(records[k]);
    if(C.equal(records[k],result))dirty.delete(k);
   }
   retryDelay=2000;if(token===generation){if(!navigator.onLine)status('offline','Đang ngoại tuyến. Bài làm đã lưu trên máy và sẽ tự đồng bộ khi có mạng.');else if(dirty.size)schedule();else{lastSynced=Date.now();status('synced');}}
  }catch(error){if(token===generation){status('error',explain(error));clearTimeout(timer);timer=setTimeout(flush,retryDelay);retryDelay=Math.min(retryDelay*2,60000);}}
  finally{flushing=false;if(token!==generation&&dirty.size&&enabled&&user&&serverReady)schedule();}
 }
 function receive(snapshot,token){
  if(token!==generation||!user)return;
  try{
   for(const item of snapshot.docChanges()){
    if(item.type==='removed')continue;const remote=C.validate(JSON.parse(item.doc.data().body));if(item.doc.id!==id(remote.kind,remote.key))throw Error('Invalid record ID');
    if(remote.kind==='classification'&&remote.key!==classificationKey)continue;
    const k=item.doc.id,merged=C.merge(records[k],remote);observe(remote);
    if(!C.equal(records[k],merged)){records[k]=merged;persist();apply(merged);}
    if(!C.equal(merged,remote))dirty.add(k);
   }
   if(!snapshot.metadata.fromCache){serverReady=true;schedule(100);}else if(!navigator.onLine)status('offline','Đang ngoại tuyến. Bài làm được giữ trên máy.');
  }catch(error){status('error',error.message||explain(error));}
 }
 function stop(){generation++;serverReady=false;clearTimeout(timer);unsubscribe?.();unsubscribe=null;collection=null;}
 async function signedIn(account){
  stop();user=account;if(!enabled||!account){status(enabled?'signedout':'off');return;}
  if(owner&&owner.uid!==account.uid){status('error','Máy này đang giữ dữ liệu của tài khoản '+(owner.email||'Google đã kết nối')+'. Hãy kết nối lại đúng tài khoản đó để tránh trộn bài làm.');await auth.signOut();status('error','Máy này đang giữ dữ liệu của '+(owner.email||'tài khoản đã kết nối')+'. Hãy kết nối đúng tài khoản để tránh trộn bài làm.');return;}
  try{
   owner={uid:account.uid,email:account.email||''};write(ownerKey,owner);loadRecords();backup();seed();
   collection=db.collection('users').doc(account.uid).collection('learning');status('syncing');const token=generation;
   unsubscribe=collection.onSnapshot({includeMetadataChanges:true},snapshot=>receive(snapshot,token),error=>{if(token===generation){serverReady=false;status('error',explain(error));}});
  }catch(error){status('error',explain(error));}
 }
 function loadScript(name){return new Promise((resolve,reject)=>{const el=document.createElement('script');el.src=new URL('vendor/firebase-10.14.1/'+name,base).href;el.onload=resolve;el.onerror=()=>{el.remove();reject(Error('SDK unavailable'));};document.head.append(el);});}
 async function prepare(){
  if(sdkPromise)return sdkPromise;
  sdkPromise=(async()=>{
   await loadScript('firebase-app-compat.2ac3f051aa8c.js');await loadScript('firebase-auth-compat.444be4c9e8bb.js');await loadScript('firebase-firestore-compat.a0f75faf230a.js');
   const instance=firebase.initializeApp(config,'learning-sync');auth=instance.auth();db=instance.firestore();db.settings({experimentalAutoDetectLongPolling:true});await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
   authUnsubscribe=auth.onAuthStateChanged(signedIn);notify();return auth;
  })().catch(error=>{sdkPromise=null;status('error',explain(error));throw error;});return sdkPromise;
 }
 async function connect(){
  if(busy)return;busy=true;status('loading');
  try{enabled=true;write(enabledKey,true);await prepare();const provider=new firebase.auth.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});await auth.signInWithPopup(provider);}
  catch(error){status('error',explain(error));}finally{busy=false;notify();}
 }
 async function disconnect(){
  enabled=false;try{write(enabledKey,false);}catch{}stop();user=null;status('off');if(auth)try{await auth.signOut();}catch{}
 }
 function exportData(){return {version:3,kind:'learning-data',exportedAt:new Date().toISOString(),records:collect(),recovery:owner?read(prefix+'sync-recovery.v1.'+owner.uid,[]):[]};}
 function draw(){
  const box=document.querySelector('#learning-sync-panel');if(!box)return;
  const labels={off:'Chưa kết nối đồng bộ',loading:'Đang mở kết nối…',signedout:'Hãy đăng nhập Google để đồng bộ',syncing:'Đang đồng bộ…',synced:'Đã đồng bộ'+(lastSynced?' lúc '+new Date(lastSynced).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}):''),offline:'Đang ngoại tuyến',error:'Cần kiểm tra kết nối'};
  box.innerHTML=`<h3>Đồng bộ giữa các máy</h3><p>Dùng cùng một tài khoản Google trên các máy để tiếp tục bài làm. Khi mất mạng, bài làm vẫn lưu trên máy và sẽ tự đồng bộ khi có mạng trở lại.</p>${user?`<p class="sync-account">${escapeHTML(user.email||'Tài khoản Google đã kết nối')}</p>`:''}<p class="sync-status" role="status" aria-live="polite">${escapeHTML(message||labels[phase]||labels.off)}</p><div class="sync-actions">${!user?`<button type="button" class="primary-button" data-sync-connect ${busy?'disabled':''}>${busy?'Đang kết nối…':'Kết nối tài khoản Google'}</button>`:`<button type="button" class="primary-button" data-sync-now>Đồng bộ ngay</button><button type="button" class="secondary-button" data-sync-disconnect>Ngắt đồng bộ</button>`}</div><p class="settings-note">Đồng bộ bài làm, phân loại chủ đề và giao diện. Mật khẩu và vị trí đang xem giữ riêng trên mỗi máy. Ngắt đồng bộ vẫn giữ bài làm trên thiết bị.</p><a href="./firebase-setup.html" target="_blank" rel="noopener">Hướng dẫn bật Firebase lần đầu</a>`;
 }
 window.LearningSync={changed,connect,disconnect,draw,prepare,exportData};
 document.addEventListener('click',e=>{
  if(e.target.closest('[data-sync-connect]'))connect();
  if(e.target.closest('[data-sync-disconnect]'))disconnect();
  if(e.target.closest('[data-sync-now]')){if(state.practice)saveAttempt();if(serverReady)schedule(0);else if(auth?.currentUser)signedIn(auth.currentUser);}
  if(e.target.closest('[data-action="access-logout"]'))disconnect();
 });
 window.addEventListener('online',()=>{if(enabled&&user){if(serverReady)schedule(0);else signedIn(user);}});
 window.addEventListener('offline',()=>{if(enabled&&user)status('offline','Đang ngoại tuyến. Bài làm đã lưu trên máy và sẽ tự đồng bộ khi có mạng.');});
 window.addEventListener('focus',()=>{if(enabled&&user&&serverReady)schedule();});
 window.addEventListener('storage',event=>{
  if(applying)return;
  if(event.key===ownerKey){const next=read(ownerKey);if(owner&&next?.uid!==owner.uid){disconnect();location.reload();}return;}
  if(event.key===enabledKey&&!read(enabledKey,false)){disconnect();return;}
  if(event.key===attemptStore){const value=read(attemptStore,{});Object.assign(attempts,value);for(const [key,v]of Object.entries(value))changed('attempt',key,v);rebuildCompletedAttempts();}
  else if(event.key?.startsWith(worksheetPrefix))changed('worksheet',event.key.slice(worksheetPrefix.length),read(event.key));
  else if(event.key===classificationStore)changed('classification',classificationKey,read(event.key));
  else if(event.key===preferenceStore)changed('preferences','theme',read(event.key));
 });
 function start(){if(enabled)prepare().catch(()=>{});}
 window.addEventListener('learning-access-open',start);
 if(document.documentElement.dataset.access==='open')start();
})();
