// Reading audio stays in IndexedDB on this browser; it is never sent to cloud sync.
function schoolReadingHeading(lessonId,headingId,number){
 const key=lessonId+':'+headingId;
 return `<h3 id="${headingId}" class="school-reading-heading"><span>${number}</span> Đọc <button type="button" class="school-reading-record" data-reading-record="${key}" aria-label="Ghi âm phần Đọc ${number}">● Ghi âm</button></h3><div class="school-reading-audio" data-reading-audio="${key}" aria-label="Bản ghi phần Đọc ${number}"><p role="status" aria-live="polite"></p></div>`;
}
(()=>{
 let database,active=null;
 const urls=new Map();
 function db(){return database||(database=new Promise((resolve,reject)=>{const request=indexedDB.open('goc-hoc-tap.reading-audio.v1',1);request.onupgradeneeded=()=>request.result.createObjectStore('recordings');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);}));}
 async function store(key,value,remove=false){const database=await db();return new Promise((resolve,reject)=>{const tx=database.transaction('recordings',value||remove?'readwrite':'readonly'),table=tx.objectStore('recordings'),request=remove?table.delete(key):value?table.put(value,key):table.get(key);let result;request.onsuccess=()=>result=request.result;tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
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
 const recorder=new MediaRecorder(stream,mime?{mimeType:mime}:undefined),chunks=[];session.recorder=recorder;
 recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 recorder.onerror=()=>{session.failed=true;status(key,'Không ghi được âm thanh. Hãy thử lại.');stop();};
 recorder.onstop=async()=>{
 clearInterval(session.timer);stream.getTracks().forEach(track=>track.stop());active=null;button.disabled=false;button.textContent='● Ghi âm';button.setAttribute('aria-label','Ghi âm bài đọc');button.removeAttribute('aria-pressed');
 if(session.failed)return;
 const blob=new Blob(chunks,{type:recorder.mimeType||chunks[0]?.type||'audio/webm'});
 if(!blob.size){status(key,'Chưa thu được âm thanh. Hãy thử lại.');return;}
 const record={blob,updatedAt:Date.now()};show(key,record);
 try{await store(key,record);status(key,'Đã lưu bản ghi trên trình duyệt này. Bấm Ghi âm để ghi lại.');}catch{status(key,'Chưa lưu được bản ghi. Hãy tải bản ghi xuống trước khi rời trang.');elements(key).forEach(el=>{const link=document.createElement('a');link.href=urls.get(key);link.download='bai-doc.'+(blob.type.includes('mp4')?'m4a':'webm');link.textContent='Tải bản ghi';el.append(link);});}
 };
 recorder.start();button.disabled=false;button.textContent='■ Dừng ghi';button.setAttribute('aria-pressed','true');button.setAttribute('aria-label','Dừng ghi âm bài đọc');session.started=Date.now();
 const tick=()=>{const seconds=Math.floor((Date.now()-session.started)/1000);status(key,`Đang ghi ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} · Tối đa 5 phút`);if(seconds>=300)stop();};tick();session.timer=setInterval(tick,1000);
 }catch(error){session.stream?.getTracks().forEach(track=>track.stop());active=null;button.disabled=false;status(key,error.name==='NotAllowedError'?'Micro chưa được cho phép. Hãy cho phép micro trong cài đặt trình duyệt rồi bấm Ghi âm.':'Không mở được micro. Kiểm tra micro rồi thử lại.');}
 }
 document.addEventListener('click',async event=>{const button=event.target.closest('[data-reading-record]');if(button){start(button);return;}const remove=event.target.closest('[data-reading-delete]');if(remove){const key=remove.dataset.readingDelete;remove.disabled=true;try{await store(key,null,true);release(key);elements(key).forEach(el=>el.querySelector('.school-reading-playback')?.remove());status(key,'Đã xóa bản ghi.');}catch{remove.disabled=false;status(key,'Chưa xóa được bản ghi. Hãy thử lại.');}}});
 function hydrate(){
 if(active&&!active.button.isConnected)stop();
 for(const key of urls.keys())if(!elements(key).length)release(key);
 document.querySelectorAll('[data-reading-audio]:not([data-reading-ready])').forEach(async el=>{el.dataset.readingReady='true';const key=el.dataset.readingAudio;try{const record=await store(key);if(el.isConnected&&record){show(key,record);status(key,'Bản ghi đã lưu trên trình duyệt này.');}}catch{status(key,'Không mở được bộ nhớ bản ghi trên trình duyệt này.');}});
 }
 new MutationObserver(hydrate).observe(document.body,{childList:true,subtree:true});hydrate();
 window.addEventListener('pagehide',stop);
})();
