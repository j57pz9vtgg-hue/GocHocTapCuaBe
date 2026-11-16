// Reading audio stays in IndexedDB on this browser; it is never sent to cloud sync.
function schoolReadingHeading(lessonId,headingId,number){
 const key=lessonId+':'+headingId;
 return `<h3 id="${headingId}" class="school-reading-heading"><span>${number}</span> Đọc <button type="button" class="school-reading-record" data-reading-record="${key}" aria-label="Ghi âm phần Đọc ${number}">● Ghi âm</button></h3><div class="school-reading-audio" data-reading-audio="${key}" aria-label="Bản ghi phần Đọc ${number}"><p role="status" aria-live="polite"></p></div>`;
}
(()=>{
 let database,active=null;
 const urls=new Map(),pendingSaves=new Set();
 function db(){return database||(database=new Promise((resolve,reject)=>{const request=indexedDB.open('goc-hoc-tap.reading-audio.v1',1);request.onupgradeneeded=()=>request.result.createObjectStore('recordings');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);}));}
 async function store(key,value,remove=false){key=globalThis.LearningAccounts?.audioKey(key)||key;const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction('recordings',value||remove?'readwrite':'readonly'),table=tx.objectStore('recordings'),request=remove?table.delete(key):value?table.put(value,key):table.get(key);let result;request.onsuccess=()=>result=request.result;tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
 function elements(key){return [...document.querySelectorAll('[data-reading-audio]')].filter(el=>el.dataset.readingAudio===key);}
 function status(key,message){elements(key).forEach(el=>el.querySelector('[role="status"]').textContent=message);}
 function release(key){if(urls.has(key)){URL.revokeObjectURL(urls.get(key));urls.delete(key);}}
 function show(key,record){release(key);if(!record?.blob)return;const url=URL.createObjectURL(record.blob);urls.set(key,url);for(const el of elements(key)){el.querySelector('.school-reading-playback')?.remove();const row=document.createElement('div');row.className='school-reading-playback';const audio=document.createElement('audio');audio.controls=true;audio.preload='metadata';audio.src=url;audio.setAttribute('aria-label','Nghe lại bài đọc');const remove=document.createElement('button');remove.type='button';remove.dataset.readingDelete=key;remove.textContent='Xóa bản ghi';row.append(audio,remove);el.append(row);}}
 function stop(){if(!active||active.stopping)return;active.stopping=true;if(active.recorder?.state==='recording')active.recorder.stop();else active.stream?.getTracks().forEach(track=>track.stop());clearInterval(active.timer);}
 async function start(button){
 const key=button.dataset.readingRecord;
 if(active){if(active.key===key){stop();return;}status(key,'Hãy dừng bản ghi đang chạy trước.');return;}
 if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined'){status(key,'Trình duyệt chưa hỗ trợ ghi âm. Hãy mở trang bằng HTTPS trên Chrome hoặc Safari mới.');return;}
 const session={key,button,started:Date.now(),stopping:false};active=session;button.disabled=true;status(key,'Đang xin quyền dùng micro…');
 try{
 const stream=await navigator.mediaDevices.getUserMedia({audio:true});session.stream=stream;
 if(session.stopping||!button.isConnected){stream.getTracks().forEach(track=>track.stop());active=null;return;}
 const mime=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(type=>MediaRecorder.isTypeSupported(type));
 const recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined),chunks=[];session.recorder=recorder;session.saved=new Promise(resolve=>session.finishSave=resolve);pendingSaves.add(session.saved);
 recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 recorder.onerror=()=>{session.failed=true;status(key,'Không ghi được âm thanh. Hãy thử lại.');stop();};
 recorder.onstop=async()=>{
 try{
 clearInterval(session.timer);stream.getTracks().forEach(track=>track.stop());active=null;button.disabled=false;button.textContent='● Ghi âm';button.setAttribute('aria-label','Ghi âm bài đọc');button.removeAttribute('aria-pressed');
 if(session.failed)return;
 const blob=new Blob(chunks,{type:recorder.mimeType||chunks[0]?.type||'audio/webm'});
 if(!blob.size){status(key,'Chưa thu được âm thanh. Hãy thử lại.');return;}
 const record={blob,updatedAt:Date.now()};show(key,record);
 try{await store(key,record);status(key,'Đã lưu bản ghi trên trình duyệt này. Bấm Ghi âm để ghi lại.');}catch{status(key,'Chưa lưu được bản ghi. Hãy tải bản ghi xuống trước khi rời trang.');elements(key).forEach(el=>{const link=document.createElement('a');link.href=urls.get(key);link.download='bai-doc.'+(blob.type.includes('mp4')?'m4a':'webm');link.textContent='Tải bản ghi';el.append(link);});}
 }finally{session.finishSave?.();pendingSaves.delete(session.saved);}
 };
 recorder.start();button.disabled=false;button.textContent='■ Dừng ghi';button.setAttribute('aria-pressed','true');button.setAttribute('aria-label','Dừng ghi âm bài đọc');session.started=Date.now();
 const tick=()=>{const seconds=Math.floor((Date.now()-session.started)/1000);status(key,`Đang ghi ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} · Tối đa 5 phút`);if(seconds>=300)stop();};tick();session.timer=setInterval(tick,1000);
 }catch(error){session.finishSave?.();pendingSaves.delete(session.saved);session.stream?.getTracks().forEach(track=>track.stop());active=null;button.disabled=false;status(key,error.name==='NotAllowedError'?'Micro chưa được cho phép. Hãy cho phép micro trong cài đặt trình duyệt rồi bấm Ghi âm.':'Không mở được micro. Kiểm tra micro rồi thử lại.');}
 }
 document.addEventListener('click',async event=>{const button=event.target.closest('[data-reading-record]');if(button){start(button);return;}const remove=event.target.closest('[data-reading-delete]');if(remove){const key=remove.dataset.readingDelete;remove.disabled=true;try{await store(key,null,true);release(key);elements(key).forEach(el=>el.querySelector('.school-reading-playback')?.remove());status(key,'Đã xóa bản ghi.');}catch{remove.disabled=false;status(key,'Chưa xóa được bản ghi. Hãy thử lại.');}}});
 function hydrate(){
 if(globalThis.LearningAccounts?.isBlocked())return;
 if(active&&!active.button.isConnected)stop();
 for(const key of urls.keys())if(!elements(key).length)release(key);
 document.querySelectorAll('[data-reading-audio]:not([data-reading-ready])').forEach(async el=>{el.dataset.readingReady='true';const key=el.dataset.readingAudio;try{const record=await store(key);if(el.isConnected&&record){show(key,record);status(key,'Bản ghi đã lưu trên trình duyệt này.');}}catch{status(key,'Không mở được bộ nhớ bản ghi trên trình duyệt này.');}});
 }
 new MutationObserver(hydrate).observe(document.body,{childList:true,subtree:true});hydrate();
 window.LearningReading={async settle(){stop();await Promise.all([...pendingSaves]);},async eraseCurrent(){
  await this.settle();const audioPrefix=globalThis.LearningAccounts?.audioKey('')||'',database=await db();
  await new Promise((resolve,reject)=>{const tx=database.transaction('recordings','readwrite'),request=tx.objectStore('recordings').openCursor();request.onsuccess=()=>{const cursor=request.result;if(!cursor)return;const key=String(cursor.key);if(audioPrefix?key.startsWith(audioPrefix):!key.startsWith('account:'))cursor.delete();cursor.continue();};tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});
  for(const key of [...urls.keys()])release(key);
 }};
 if(globalThis.LearningAccounts?.isBlocked())window.LearningReading.eraseCurrent().catch(()=>{});
 window.addEventListener('pagehide',stop);
})();

// Dictation speech is started only by the learner's button; no microphone is needed.
function schoolDictationSpeech(text){return `<details class="school-dictation-speech" data-dictation-speech="${escapeHTML(text)}"><summary aria-label="Tùy chọn đọc tiếng Việt" title="Đọc tiếng Việt"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/></svg></summary><div class="school-dictation-options"><label>Tốc độ đọc <select data-dictation-rate aria-label="Tốc độ đọc tiếng Việt"><option value="0.65">Chậm</option><option value="0.85">Vừa</option><option value="1">Bình thường</option></select></label><div><button type="button" data-dictation-read>Đọc tiếng Việt</button><button type="button" data-dictation-pause disabled>Tạm dừng</button><button type="button" data-dictation-stop disabled>Dừng</button></div><p data-dictation-status role="status" aria-live="polite">Chọn Đọc tiếng Việt để nghe và chép theo.</p></div></details>`;}

(()=>{
 let active=null;
 function status(panel,text){panel.querySelector('[data-dictation-status]').textContent=text;}
 function reset(panel){panel.querySelector('[data-dictation-pause]').disabled=true;panel.querySelector('[data-dictation-pause]').textContent='Tạm dừng';panel.querySelector('[data-dictation-stop]').disabled=true;}
 function stop(message='Đã dừng đọc.'){if(!active)return;const old=active;active=null;globalThis.speechSynthesis?.cancel();reset(old.panel);status(old.panel,message);}
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-dictation-read],[data-dictation-pause],[data-dictation-stop]');if(!button)return;
  const panel=button.closest('[data-dictation-speech]'),synth=globalThis.speechSynthesis;
  if(!synth||typeof SpeechSynthesisUtterance==='undefined'){status(panel,'Trình duyệt chưa hỗ trợ đọc thành tiếng. Hãy thử Chrome hoặc Safari mới.');return;}
  if(button.hasAttribute('data-dictation-stop')){stop();panel.open=false;return;}
  if(button.hasAttribute('data-dictation-pause')){if(active?.panel!==panel)return;if(active.paused){synth.resume();active.paused=false;button.textContent='Tạm dừng';status(panel,'Đang đọc tiếng Việt…');}else{synth.pause();active.paused=true;button.textContent='Đọc tiếp';status(panel,'Đã tạm dừng. Bấm Đọc tiếp khi chép xong.');}panel.open=false;return;}
  stop();
  const utterance=new SpeechSynthesisUtterance(panel.dataset.dictationSpeech);utterance.lang='vi-VN';utterance.rate=Number(panel.querySelector('[data-dictation-rate]').value)||0.65;
  const voices=synth.getVoices(),voice=voices.find(v=>/^vi(-|_)?/i.test(v.lang));if(voice)utterance.voice=voice;
  const session={panel,utterance,paused:false};active=session;
  panel.querySelector('[data-dictation-pause]').disabled=false;panel.querySelector('[data-dictation-stop]').disabled=false;
  status(panel,'Đang đọc tiếng Việt…');
  utterance.onend=()=>{if(active!==session)return;active=null;reset(panel);status(panel,'Đã đọc xong. Bé có thể bấm đọc lại.');};
  utterance.onerror=()=>{if(active!==session)return;active=null;reset(panel);panel.open=true;status(panel,'Chưa đọc được tiếng Việt. Hãy kiểm tra âm lượng và giọng tiếng Việt của thiết bị rồi thử lại.');};
  try{synth.speak(utterance);if(active===session)panel.open=false;}catch{utterance.onerror();}
 });
 document.addEventListener('change',event=>{if(event.target.matches('[data-dictation-rate]')&&active?.panel===event.target.closest('[data-dictation-speech]'))stop('Đã đổi tốc độ. Bấm Đọc tiếng Việt để nghe lại.');});
 new MutationObserver(()=>{if(active&&!active.panel.isConnected)stop();}).observe(document.documentElement,{childList:true,subtree:true});
 window.addEventListener('pagehide',()=>stop());
})();
