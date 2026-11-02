/* Each page keeps a fixed storage namespace, so an old tab cannot write into another learner's work. */
'use strict';
(()=>{
 const prefix='goc-hoc-tap.',ownerKey=prefix+'sync-owner.v1',namespace=prefix+'account-data.v1.',migrationKey=prefix+'account-migration.v1';
 const scoped=key=>typeof key==='string'&&(/^goc-hoc-tap\.(attempts\.official\.v1|preferences\.v1|parent-password\.v1|classification\.v1|classification-reset\.v1|classification-reset-progress\.v1|published-classification-progress\.v1|current-view\.v1)$/.test(key)||['school-exercise.v1.','topic-order.v1.','classification-backup.'].some(p=>key.startsWith(prefix+p)));
 let raw,session,owner=null,ready=false;
 try{raw=localStorage;session=sessionStorage;owner=JSON.parse(raw.getItem(ownerKey)||'null');}catch{}
 const profile=typeof owner?.uid==='string'?owner.uid:'local',bucket=id=>namespace+encodeURIComponent(id)+'.',currentBucket=bucket(profile);
 function keys(store){return Array.from({length:store.length},(_,i)=>store.key(i));}
 function copyLegacy(store){for(const key of keys(store))if(scoped(key)&&store.getItem(currentBucket+key)===null)store.setItem(currentBucket+key,store.getItem(key));}
 try{
  if(!raw.getItem(migrationKey)){copyLegacy(raw);raw.setItem(prefix+'account-audio.v1.'+profile,'legacy');raw.setItem(migrationKey,profile);}
  copyLegacySession();ready=true;
 }catch{}
 function copyLegacySession(){const marker=namespace+'session-migrated';if(!session.getItem(marker)){const original=raw.getItem(migrationKey),adopted=raw.getItem(prefix+'account-first-login.v1');if(original===profile||original==='local'&&adopted===profile)copyLegacy(session);session.setItem(marker,'1');}}
 function facade(store){return {
  getItem(key){return store.getItem(scoped(String(key))?currentBucket+key:key);},
  setItem(key,value){store.setItem(scoped(String(key))?currentBucket+key:key,String(value));},
  removeItem(key){store.removeItem(scoped(String(key))?currentBucket+key:key);},
  key(index){return visible()[index]??null;},get length(){return visible().length;}
 };function visible(){return keys(store).flatMap(key=>key.startsWith(currentBucket)?[key.slice(currentBucket.length)]:key.startsWith(namespace)||scoped(key)?[]:[key]);}}
 function isCurrent(){try{return (JSON.parse(raw.getItem(ownerKey)||'null')?.uid||'local')===profile;}catch{return false;}}
 function activate(account){
  if(!ready||!isCurrent())throw Error('Chưa thể chuyển tài khoản. Hãy tải lại trang và kiểm tra bộ nhớ trình duyệt.');
  if(profile===account.uid){raw.setItem(ownerKey,JSON.stringify({uid:account.uid,email:account.email||''}));return false;}
  // Only the first login adopts unassigned work. Switching between people never copies work.
  if(profile==='local'){
   for(const store of [raw,session])for(const key of keys(store))if(key.startsWith(currentBucket)&&store.getItem(bucket(account.uid)+key.slice(currentBucket.length))===null)store.setItem(bucket(account.uid)+key.slice(currentBucket.length),store.getItem(key));
   raw.setItem(prefix+'account-first-login.v1',account.uid);
   raw.setItem(prefix+'account-audio.v1.'+account.uid,raw.getItem(prefix+'account-audio.v1.local')||'local');
  }
  raw.setItem(ownerKey,JSON.stringify({uid:account.uid,email:account.email||''}));return true;
 }
 function audioKey(key){let scope=profile;try{scope=raw.getItem(prefix+'account-audio.v1.'+profile)||profile;}catch{}return scope==='legacy'?key:'account:'+encodeURIComponent(scope)+':'+key;}
 globalThis.LearningAccounts={storage:facade(raw),session:facade(session),profileId:profile,activate,isCurrent,audioKey,reload};
 let reloading=false;
 async function reload(){if(reloading)return;reloading=true;document.documentElement.dataset.access='locked';document.querySelector('#site-shell')?.setAttribute('inert','');await window.LearningReading?.settle();location.reload();}
 window.addEventListener('storage',event=>{
  if(event.key===ownerKey&&!isCurrent()){event.stopImmediatePropagation();reload();return;}
  if(event.key?.startsWith(namespace)){
   event.stopImmediatePropagation();if(!isCurrent()){reload();return;}
   if(event.key.startsWith(currentBucket))window.dispatchEvent(new StorageEvent('storage',{key:event.key.slice(currentBucket.length),oldValue:event.oldValue,newValue:event.newValue,url:event.url,storageArea:event.storageArea}));
  }else if(scoped(event.key)&&event.storageArea===raw&&!event.isTrusted){/* translated event */}
  else if(scoped(event.key)){event.stopImmediatePropagation();}
 });
})();
