/* Firebase configuration identifies the public web app; authorization is enforced by firestore.rules. */
'use strict';
(() => {
 const C=LearningSyncCore,base=new URL('.',document.currentScript.src);
 const config={apiKey:'AIzaSyC3HTcaHccwJs9TD9xjOrvRGquwjKxfHXs',authDomain:'gochoctapcuabe01-14d32.firebaseapp.com',projectId:'gochoctapcuabe01-14d32',storageBucket:'gochoctapcuabe01-14d32.firebasestorage.app',messagingSenderId:'421072877747',appId:'1:421072877747:web:239b8005a221752dbc18c6'};
 const prefix='goc-hoc-tap.',ownerKey=prefix+'sync-owner.v1',enabledKey=prefix+'sync-enabled.v1',deviceKey=prefix+'sync-device.v1';
 const attemptStore=prefix+'attempts.official.v1',worksheetPrefix=prefix+'school-exercise.v1.',classificationStore=prefix+'classification.v1',preferenceStore=prefix+'preferences.v1';
 const classificationKey=publishedTimoClassification.resetId||'classification';
 const read=(key,fallback=null)=>{try{return JSON.parse((globalThis.LearningAccounts?.storage||localStorage).getItem(key))??fallback;}catch{return fallback;}};
 const write=(key,value)=>{(globalThis.LearningAccounts?.storage||localStorage).setItem(key,JSON.stringify(value));};
 let device=read(deviceKey);if(!device){device=crypto.randomUUID();try{write(deviceKey,device);}catch{}}
 device=device+'.'+crypto.randomUUID();
 let owner=read(ownerKey),enabled=read(enabledKey,false),records={},dirty=new Set(),counter=0,logicalTime=0,applying=false;
 let auth,db,collection,user=null,unsubscribe=null,authUnsubscribe=null,sdkPromise=null,serverReady=false,flushing=false,timer=null,generation=0,retryDelay=2000,phase='off',message='',lastSynced=null,busy=false,emailMode='login',emailDraft='',emailNotice='',deleteFormOpen=false,deletionPending=false,deletionRunning=false;
 const id=(kind,key)=>kind+'_'+encodeURIComponent(key);
 const metaKey=()=>prefix+'sync-state.v1.'+owner.uid;
 function persist(){if(owner)write(metaKey(),records);}
 function notify(){draw();window.dispatchEvent(new Event('learning-sync-status'));}
 function status(next,text=''){phase=next;message=text;notify();}
 function clock(time=Date.now()){logicalTime=Math.max(time,logicalTime);return {t:logicalTime,n:++counter,d:device};}
 function observe(doc){for(const r of Object.values(doc.fields)){logicalTime=Math.max(logicalTime,r.t);counter=Math.max(counter,r.n);}}
 function loadRecords(){records={};dirty=new Set();if(!owner)return;for(const [key,value]of Object.entries(read(metaKey(),{})))try{C.validate(value);if(value.kind==='classification'&&value.key!==classificationKey)continue;if(value.kind==='attempt'&&!accepts(value.kind,value.key,C.decode(value)))continue;records[key]=value;dirty.add(key);observe(value);}catch{}}
 loadRecords();
 function collect(){
  const result=[];for(const [key,value]of Object.entries(attempts))if(value&&typeof value==='object')result.push(['attempt',key,value]);
  for(let i=0;i<(globalThis.LearningAccounts?.storage||localStorage).length;i++){const key=(globalThis.LearningAccounts?.storage||localStorage).key(i);if(key?.startsWith(worksheetPrefix)){const value=read(key);if(value)result.push(['worksheet',key.slice(worksheetPrefix.length),value]);}}
  const classification=read(classificationStore);if(classification)result.push(['classification',classificationKey,classification]);
  const prefs=read(preferenceStore);if(prefs?.theme)result.push(['preferences','theme',{theme:prefs.theme}]);return result;
 }
 function localValue(kind,key){if(kind==='attempt')return attempts[key];if(kind==='worksheet')return read(worksheetPrefix+key);if(kind==='classification')return read(classificationStore);if(kind==='preferences')return read(preferenceStore);}
 function accepts(kind,key,value){
  if(!value||typeof value!=='object'||Array.isArray(value))return false;
  if(kind==='classification'){if(key!==classificationKey)return false;TimoClassification.validate(value);return true;}
  if(kind==='preferences')return key==='theme'&&referenceThemes.some(t=>t.id===value.theme);
  if(kind==='worksheet'&&typeof isSchoolPlanId==='function'&&isSchoolPlanId(key))return validSchoolPlanDraft(key,value);
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
      state.submitted=value.submitted===true&&Object.keys(state.answers).length>0;
      if(state.submitted&&Number.isFinite(value.finishedAt))p.finishedAt=value.finishedAt;
      if(state.submitted||value.submitted!==current?.submitted){const top=scrollY;renderPractice();scrollTo({top,behavior:'instant'});}
      else{
       app.querySelectorAll('[data-question]').forEach(el=>{el.checked=state.answers[Number(el.dataset.question)]===Number(el.value);el.closest('label')?.classList.toggle('chosen',el.checked);});
       app.querySelectorAll('[data-free-question]').forEach(el=>{const v=state.answers[Number(el.dataset.freeQuestion)]??'';if(el.value!==v)el.value=v;});
       const count=Object.keys(state.answers).length;const label=app.querySelector('#answer-count');if(label)label.textContent=`${count}/${p.questions.length} câu`;app.querySelectorAll('[data-action="submit-paper"]').forEach(el=>el.disabled=state.submitted||count===0);
       if(focusIndex!==undefined&&Number.isInteger(caret)){const el=app.querySelector(`[data-free-question="${focusIndex}"]`);el?.focus({preventScroll:true});try{el?.setSelectionRange(caret,caret);}catch{}}
      }
     }
     saveCurrentView();
    }else if(!state.practice)renderHome();
   }else if(doc.kind==='worksheet'){
    write(worksheetPrefix+doc.key,value);
    if(value.type==='school-plan-v1'){refreshSchoolPlanView(doc.key);return;}
    if(value.type==='school-math-v1'){applySchoolMathDraft(doc.key,value);return;}
    const panel=document.querySelector('#school-report-content');if(panel?.dataset.lessonId===doc.key){panel.querySelectorAll('[data-school-blank]').forEach(el=>{const caret=el.selectionStart,v=value.blanks[Number(el.dataset.schoolBlank)]||'';if(el.value!==v){el.value=v;if(el===document.activeElement)try{el.setSelectionRange(caret,caret);}catch{}}});panel.querySelectorAll('[data-school-choice]').forEach(el=>{el.checked=value.choices[Number(el.dataset.schoolChoice)]===true;});}
   }else if(doc.kind==='classification')TimoClassification.acceptSynced(value);
   else {write(preferenceStore,value);document.documentElement.dataset.theme=value.theme;if(!state.practice)renderHome();}
  }finally{applying=false;}
 }
 function changed(kind,key,value){
  if(applying||deletionPending||!LearningAccounts.isCurrent()||!owner||!accepts(kind,key,value))return;
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
 function backup(){const key=prefix+'sync-backup.v1.'+owner.uid;if((globalThis.LearningAccounts?.storage||localStorage).getItem(key)===null)write(key,{version:1,at:Date.now(),records:collect()});}
 function schedule(delay=1200){clearTimeout(timer);if(!enabled||!user||!serverReady)return;if(!navigator.onLine){status('offline','Đang ngoại tuyến. Bài làm đã lưu trên máy và sẽ tự đồng bộ khi có mạng.');return;}status('syncing');timer=setTimeout(flush,delay);}
 function explain(error){
  const code=String(error?.code||'');
  if(code.includes('unauthorized-domain'))return 'Cần thêm j57pz9vtgg-hue.github.io vào Firebase → Authentication → Settings → Authorized domains.';
  if(code.includes('operation-not-allowed')||code.includes('configuration-not-found'))return 'Cần bật Google hoặc Email/Password trong Firebase → Authentication → Sign-in method.';
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
   const changes=snapshot.docChanges();
   if(changes.some(item=>item.doc.id===LearningAccountDeletion.markerId&&item.type!=='removed')){quarantineDeletion();return;}
   for(const item of changes){
    if(item.type==='removed')continue;const remote=C.validate(JSON.parse(item.doc.data().body));if(item.doc.id!==id(remote.kind,remote.key))throw Error('Invalid record ID');
    if(remote.kind==='classification'&&remote.key!==classificationKey)continue;
    if(remote.kind==='attempt'&&!accepts(remote.kind,remote.key,C.decode(remote)))continue;
    const k=item.doc.id,merged=C.merge(records[k],remote);observe(remote);
    if(!C.equal(records[k],merged)){records[k]=merged;persist();apply(merged);}
    if(!C.equal(merged,remote))dirty.add(k);
   }
   if(!snapshot.metadata.fromCache){serverReady=true;schedule(100);}else if(!navigator.onLine)status('offline','Đang ngoại tuyến. Bài làm được giữ trên máy.');
  }catch(error){status('error',error.message||explain(error));}
 }
 function stop(){generation++;serverReady=false;clearTimeout(timer);unsubscribe?.();unsubscribe=null;collection=null;}
 async function signedIn(account){
  if(deletionRunning){user=account;return;}
  stop();const authGeneration=generation;user=account;if(!enabled||!account){status(enabled?'signedout':'off');return;}
  if(!LearningAccounts.isCurrent()){LearningAccounts.reload();return;}
  try{
   if(state.practice&&!saveAttempt())throw Error('Chưa lưu được bài làm. Hãy kiểm tra bộ nhớ trình duyệt trước khi đổi tài khoản.');
   await window.LearningReading?.settle();
   if(authGeneration!==generation||auth.currentUser?.uid!==account.uid)return;
   if(LearningAccounts.activate(account)){LearningAccounts.reload();return;}
  }catch(error){user=null;status('error',error.message);return;}
  try{
   owner={uid:account.uid,email:account.email||''};write(ownerKey,owner);
   if(LearningAccounts.isBlocked()){deletionPending=true;deleteFormOpen=true;await window.LearningReading?.eraseCurrent();status('error','Tài khoản này đang được xóa. Chọn Tiếp tục xóa hoặc đổi sang tài khoản khác.');return;}
   loadRecords();backup();seed();
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
  enabled=false;try{write(enabledKey,false);}catch{}stop();user=null;const panel=document.querySelector('#learning-sync-panel');if(panel)delete panel.dataset.syncView;status('off');if(auth)await auth.signOut();
 }

 async function switchAccount(){
  if(busy)return;busy=true;notify();
  try{
   if(state.practice&&!saveAttempt())throw Error('Chưa lưu được bài làm. Hãy kiểm tra bộ nhớ trình duyệt.');
   emailMode='login';emailDraft='';
   await disconnect();emailNotice='Đăng nhập hoặc đăng ký tài khoản của người dùng khác. Bài làm hiện tại được giữ riêng cho tài khoản cũ.';
   const box=document.querySelector('#learning-sync-panel');if(box)delete box.dataset.syncView;
  }catch(error){emailNotice=error.message;}
  finally{busy=false;notify();document.querySelector('[data-sync-email]')?.focus();}
 }
 async function quarantineDeletion(){
  if(deletionRunning)return;deletionPending=true;stop();
  try{await window.LearningReading?.settle();LearningAccounts.blockWrites();await window.LearningReading?.eraseCurrent();LearningAccounts.clearData();LearningAccounts.reload();}
  catch{status('error','Tài khoản đang được xóa. Hãy tải lại trang để dọn dữ liệu trên thiết bị này.');}
 }
 function deletionForm(){
  return `<form class="sync-email-form sync-delete-form" data-sync-delete-form><h4>${deletionPending?'Tiếp tục xóa tài khoản':'Xóa tài khoản'}</h4><p>Bạn sẽ xóa vĩnh viễn tài khoản <strong>${escapeHTML(user.email||'')}</strong>, bài làm và tiến độ đã đồng bộ, cùng dữ liệu và bản ghi âm của tài khoản này trên thiết bị này. Các tài khoản khác được giữ nguyên. Tài khoản Google hoặc email gốc của bạn không bị xóa.</p><label>Nhập lại email tài khoản cần xóa<input type="email" data-delete-email autocomplete="off" autocapitalize="off" spellcheck="false" required></label>${hasPasswordProvider(user)?'<label>Mật khẩu đồng bộ để xác nhận<input type="password" data-delete-password autocomplete="current-password" required maxlength="128"></label>':'<p>Bạn sẽ xác nhận lại bằng tài khoản Google đang đăng nhập.</p>'}<label class="sync-delete-ack"><input type="checkbox" data-delete-ack required> Tôi hiểu rằng không thể khôi phục dữ liệu đã xóa.</label><p class="sync-email-status" role="status" aria-live="polite"></p><div class="sync-actions"><button class="sync-danger-button" type="submit">${deletionPending?'Tiếp tục xóa':'Xóa vĩnh viễn tài khoản này'}</button>${!deletionPending?'<button class="secondary-button" type="button" data-sync-delete-cancel>Hủy</button>':''}</div><p class="settings-note">Nếu xóa bị gián đoạn, đăng nhập lại đúng tài khoản để tiếp tục. Các thiết bị khác dọn bản lưu khi kết nối lại với bản web mới.</p></form>`;
 }
 async function deleteAccount(form){
  if(busy)return;
  const account=auth?.currentUser,email=form.querySelector('[data-delete-email]').value.trim(),password=form.querySelector('[data-delete-password]')?.value||'';
  if(!account||account.uid!==owner?.uid||!LearningAccounts.isCurrent()){emailNotice='Hãy đăng nhập đúng tài khoản cần xóa.';draw();return;}
  if(!form.reportValidity())return;
  if(email.toLowerCase()!==String(account.email||'').toLowerCase()){emailNotice='Email xác nhận chưa trùng với tài khoản đang đăng nhập.';draw();return;}
  busy=true;deletionRunning=true;emailNotice='';notify();
  const assertIdentity=()=>{if(auth.currentUser?.uid!==account.uid||!LearningAccounts.isCurrent())throw Error('Tài khoản đang mở đã thay đổi. Chưa thể tiếp tục xóa.');};
  try{
   if(!navigator.onLine)throw Error('Cần kết nối mạng để xóa tài khoản.');
   if(hasPasswordProvider(account))await account.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(account.email,password));
   else await account.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
   assertIdentity();await window.LearningReading?.settle();stop();
   await LearningAccountDeletion.run({db,account,timestamp:()=>firebase.firestore.FieldValue.serverTimestamp(),assertIdentity,onMarked:async()=>{deletionPending=true;LearningAccounts.blockWrites();status('loading','Đang xóa tài khoản và bài làm…');},beforeAuthDelete:async()=>{await window.LearningReading?.eraseCurrent();LearningAccounts.clearData();}});
   enabled=false;write(enabledKey,false);LearningAccounts.clearOwner();
   records={};dirty.clear();owner=null;user=null;await auth.signOut();LearningAccounts.reload();
  }catch(error){
   const code=String(error?.code||'');
   emailNotice=code.includes('permission-denied')?'Chưa có quyền xóa dữ liệu. Hãy cập nhật Firestore Rules theo Hướng dẫn bật đồng bộ lần đầu rồi thử lại.':code.includes('requires-recent-login')?'Hãy nhập lại mật khẩu hoặc xác nhận Google để tiếp tục xóa.':code?explainEmail(error):error.message||'Chưa xóa xong tài khoản. Hãy thử lại.';
   status('error',emailNotice);
   if(!deletionPending&&auth.currentUser){deletionRunning=false;await signedIn(auth.currentUser);status('error',emailNotice);}
  }finally{deletionRunning=false;busy=false;form.querySelectorAll('[data-delete-password]').forEach(el=>el.value='');notify();}
 }
 function hasPasswordProvider(account){return account?.providerData?.some(p=>p.providerId==='password')===true;}
 function explainEmail(error){
  const code=String(error?.code||'');
  if(code.includes('email-already-in-use'))return 'Email này đã có tài khoản. Hãy chọn Đăng nhập. Nếu trước đây dùng Google, kết nối Google rồi thêm mật khẩu cho chính tài khoản đó.';
  if(code.includes('invalid-email'))return 'Địa chỉ email chưa hợp lệ.';
  if(code.includes('weak-password')||code.includes('password-does-not-meet-requirements'))return 'Mật khẩu chưa đủ mạnh. Hãy dùng ít nhất 6 ký tự hoặc theo chính sách của dự án Firebase.';
  if(['invalid-credential','invalid-login-credentials','wrong-password','user-not-found'].some(c=>code.includes(c)))return 'Email hoặc mật khẩu chưa đúng. Hãy kiểm tra lại hoặc chọn Quên mật khẩu.';
  if(code.includes('user-disabled'))return 'Tài khoản này đã bị vô hiệu hóa.';
  if(code.includes('too-many-requests'))return 'Bạn đã thử quá nhiều lần. Vui lòng chờ một lúc rồi thử lại.';
  if(code.includes('requires-recent-login'))return 'Hãy ngắt đồng bộ, kết nối lại tài khoản Google rồi thêm mật khẩu.';
  if(code.includes('provider-already-linked'))return 'Tài khoản này đã có mật khẩu. Bạn có thể dùng Đăng nhập hoặc Quên mật khẩu.';
  return explain(error);
 }
 function validEmailInput(box){
  const input=box?.querySelector('[data-sync-email]');
  if(input){input.value=input.value.trim();if(!input.reportValidity())return null;return input.value;}
  return user?.email||null;
 }
 async function submitEmail(form){
  if(busy)return;const email=validEmailInput(form),mode=form.dataset.syncEmailForm,password=form.querySelector('[data-sync-password]')?.value||'',confirmation=form.querySelector('[data-sync-confirm]')?.value;
  if(!email||!form.reportValidity())return;
  if(mode!=='login'&&password!==confirmation){emailNotice='Hai mật khẩu chưa giống nhau.';draw();return;}
  emailDraft=email;emailNotice='';busy=true;status('loading','Đang xác nhận tài khoản…');
  try{
   enabled=true;write(enabledKey,true);await prepare();
   if(mode==='link'){
    if(!user||!auth.currentUser||auth.currentUser.uid!==user.uid)throw {code:'auth/requires-recent-login'};
    const result=await auth.currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(email,password));user=result.user;
    status(phase==='loading'?'syncing':phase,'Đã thêm đăng nhập bằng email và mật khẩu cho cùng tài khoản.');
   }else if(mode==='register')await auth.createUserWithEmailAndPassword(email,password);
   else await auth.signInWithEmailAndPassword(email,password);
  }catch(error){emailNotice=explainEmail(error);status('error',emailNotice);}
  finally{busy=false;document.querySelectorAll('#learning-sync-panel [data-sync-password],#learning-sync-panel [data-sync-confirm],#learning-sync-panel [data-delete-password]').forEach(el=>el.value='');notify();}
 }
 async function resetEmailPassword(){
  if(busy)return;const box=document.querySelector('#learning-sync-panel'),email=validEmailInput(box);if(!email){emailNotice='Nhập email của bạn trước khi chọn Quên mật khẩu.';draw();return;}
  emailDraft=email;emailNotice='';busy=true;notify();
  try{await prepare();await auth.sendPasswordResetEmail(email);emailNotice='Nếu email này đã đăng ký, hệ thống sẽ gửi hướng dẫn đặt lại mật khẩu. Hãy kiểm tra cả thư rác.';}
  catch(error){emailNotice=String(error?.code||'').includes('user-not-found')?'Nếu email này đã đăng ký, hệ thống sẽ gửi hướng dẫn đặt lại mật khẩu. Hãy kiểm tra cả thư rác.':explainEmail(error);}
  finally{busy=false;notify();}
 }
 function emailForm(mode){
  const link=mode==='link',register=mode==='register',email=link?user.email:emailDraft;
  return `<form class="sync-email-form" data-sync-email-form="${mode}"><h4>${link?'Thêm mật khẩu cho tài khoản này':'Đồng bộ bằng email và mật khẩu'}</h4>${link?'<p class="settings-note">Dùng cùng tài khoản đang kết nối, giữ nguyên dữ liệu đã đồng bộ.</p>':''}<label>Email<input data-sync-email name="email" type="email" autocomplete="username" inputmode="email" autocapitalize="off" spellcheck="false" maxlength="254" value="${escapeHTML(email||'')}" ${link?'readonly':''} required></label><label>Mật khẩu đồng bộ<input data-sync-password name="password" type="password" autocomplete="${mode==='login'?'current-password':'new-password'}" autocapitalize="off" spellcheck="false" minlength="6" maxlength="128" required></label>${mode!=='login'?'<label>Nhập lại mật khẩu<input data-sync-confirm type="password" autocomplete="new-password" autocapitalize="off" minlength="6" maxlength="128" required></label>':''}<p class="sync-email-status" role="status" aria-live="polite">${escapeHTML(emailNotice)}</p><div class="sync-actions"><button type="submit" class="primary-button">${link?'Thêm mật khẩu':register?'Đăng ký':'Đăng nhập'}</button>${!link?`<button type="button" class="secondary-button" data-sync-email-mode="${register?'login':'register'}">${register?'Đã có tài khoản? Đăng nhập':'Chưa có tài khoản? Đăng ký'}</button>`:''}</div>${!link?'<button type="button" class="sync-text-button" data-sync-reset>Quên mật khẩu?</button>':''}<p class="settings-note">Đây là mật khẩu tài khoản đồng bộ, riêng với mật khẩu mở ứng dụng và mật khẩu phụ huynh.</p></form>`;
 }
 function draw(){
  const box=document.querySelector('#learning-sync-panel');if(!box)return;
  const labels={off:'Chưa kết nối đồng bộ',loading:'Đang mở kết nối…',signedout:'Hãy đăng nhập bằng Google hoặc email để đồng bộ',syncing:'Đang đồng bộ…',synced:'Đã đồng bộ'+(lastSynced?' lúc '+new Date(lastSynced).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}):''),offline:'Đang ngoại tuyến',error:'Cần kiểm tra kết nối'};
  const password=hasPasswordProvider(user),view=user?user.uid+':'+password+':delete:'+deleteFormOpen+':pending:'+deletionPending:'signedout:'+emailMode;
  if(box.dataset.syncView!==view||!box.querySelector('.sync-status')){
   box.dataset.syncView=view;
   box.innerHTML=`<h3>Đồng bộ giữa các máy</h3><p>Dùng cùng một tài khoản Google hoặc email trên các máy để tiếp tục bài làm. Khi mất mạng, bài làm vẫn lưu trên máy và sẽ tự đồng bộ khi có mạng trở lại.</p>${user?`<p class="sync-account">${escapeHTML(user.email||'Tài khoản đã kết nối')}</p>`:''}<p class="sync-status" role="status" aria-live="polite"></p>${owner?`<p class="settings-note">Dữ liệu trên máy: <strong>${escapeHTML(owner.email||'Tài khoản hiện tại')}</strong>. Mỗi tài khoản có bài làm và tiến độ riêng.</p><button type="button" class="secondary-button" data-sync-switch>Đổi tài khoản</button>`:''}<div class="sync-actions">${!user?'<button type="button" class="primary-button" data-sync-connect>Kết nối tài khoản Google</button>':'<button type="button" class="primary-button" data-sync-now>Đồng bộ ngay</button><button type="button" class="secondary-button" data-sync-disconnect>Ngắt đồng bộ</button>'}</div>${user&&deleteFormOpen?deletionForm():!user?`<p class="sync-method-divider">Hoặc</p>${emailForm(emailMode)}`:!password?emailForm('link'):'<button type="button" class="sync-text-button" data-sync-reset>Gửi email đặt lại mật khẩu</button><p class="sync-email-status" role="status" aria-live="polite"></p>'}${user&&!deleteFormOpen?'<button type="button" class="sync-text-button sync-delete-link" data-sync-delete-open>Xóa tài khoản</button>':''}<p class="settings-note">Đồng bộ bài làm, lịch dự kiến, phân loại chủ đề và giao diện. Mật khẩu phụ huynh và vị trí đang xem giữ riêng trên mỗi máy. Ngắt đồng bộ vẫn giữ bài làm trên thiết bị.</p><a href="./firebase-setup.html" target="_blank" rel="noopener">Hướng dẫn bật đồng bộ lần đầu</a>`;
  }
  box.querySelector('.sync-status').textContent=message||labels[phase]||labels.off;
  const notice=box.querySelector('.sync-email-status');if(notice)notice.textContent=emailNotice;
  box.querySelectorAll('button,input').forEach(el=>el.disabled=busy);if(deletionPending){const sync=box.querySelector('[data-sync-now]');if(sync)sync.disabled=true;}
 }
 window.LearningSync={changed,connect,disconnect,draw,prepare};
 document.addEventListener('submit',event=>{if(event.target.matches('[data-sync-delete-form]')){event.preventDefault();deleteAccount(event.target);return;}if(event.target.matches('[data-sync-email-form]')){event.preventDefault();submitEmail(event.target);}});
 document.addEventListener('click',e=>{
  if(e.target.closest('[data-sync-delete-open]')&&!busy){deleteFormOpen=true;emailNotice='';draw();}
  if(e.target.closest('[data-sync-delete-cancel]')&&!busy&&!deletionPending){deleteFormOpen=false;emailNotice='';draw();}
  if(e.target.closest('[data-sync-connect]')){emailNotice='';connect();}
  if(e.target.closest('[data-sync-switch]')){switchAccount();}
  if(e.target.closest('[data-sync-disconnect]')){emailNotice='';disconnect().catch(error=>status('error',explain(error)));}
  if(e.target.closest('[data-sync-reset]'))resetEmailPassword();
  const toggle=e.target.closest('[data-sync-email-mode]');if(toggle&&!busy){emailDraft=document.querySelector('#learning-sync-panel [data-sync-email]')?.value.trim()||emailDraft;emailMode=toggle.dataset.syncEmailMode;emailNotice='';draw();}
  if(e.target.closest('[data-sync-now]')){if(state.practice)saveAttempt();if(serverReady)schedule(0);else if(auth?.currentUser)signedIn(auth.currentUser);}
  if(e.target.closest('[data-action="access-logout"]'))disconnect().catch(()=>{});
 });
 document.querySelector('#local-data').addEventListener('close',()=>{document.querySelectorAll('#learning-sync-panel [data-sync-password],#learning-sync-panel [data-sync-confirm],#learning-sync-panel [data-delete-password]').forEach(el=>el.value='');});
 window.addEventListener('online',()=>{if(enabled&&user){if(serverReady)schedule(0);else signedIn(user);}});
 window.addEventListener('offline',()=>{if(enabled&&user)status('offline','Đang ngoại tuyến. Bài làm đã lưu trên máy và sẽ tự đồng bộ khi có mạng.');});
 window.addEventListener('focus',()=>{if(enabled&&user&&serverReady)schedule();});
 window.addEventListener('storage',event=>{
  if(applying)return;
  if(event.key===ownerKey){const next=read(ownerKey);if(next?.uid!==LearningAccounts.profileId){stop();LearningAccounts.reload();}return;}
  if(event.key===enabledKey&&!read(enabledKey,false)){enabled=false;stop();user=null;status('off');return;}
  if(event.key===attemptStore){const value=read(attemptStore,{});Object.assign(attempts,value);for(const [key,v]of Object.entries(value))changed('attempt',key,v);rebuildCompletedAttempts();}
  else if(event.key?.startsWith(worksheetPrefix))changed('worksheet',event.key.slice(worksheetPrefix.length),read(event.key));
  else if(event.key===classificationStore)changed('classification',classificationKey,read(event.key));
  else if(event.key===preferenceStore)changed('preferences','theme',read(event.key));
 });
 function start(){if(enabled)prepare().catch(()=>{});}
 window.addEventListener('learning-access-open',start);
 if(document.documentElement.dataset.access==='open')start();
})();
