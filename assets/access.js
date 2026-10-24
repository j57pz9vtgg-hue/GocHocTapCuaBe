'use strict';
(() => {
 const verifier={"salt": "AKQqkTrgPd2c/rRsqaD92g==", "proof": "m1mWXjmzNP41cKRLASrZ0lBNpoEUM9Vhyrfg6qKMpXU=", "iterations": 210000};
 const rememberKey='goc-hoc-tap.access.remember.v1';
 const sessionKey='goc-hoc-tap.access.session.v1';
 const screen=document.querySelector('#access-screen');
 const shell=document.querySelector('#site-shell');
 const form=document.querySelector('#access-form');
 const password=form.querySelector('#access-password');
 const remember=form.querySelector('#access-remember');
 const status=form.querySelector('#access-status');
 const submit=form.querySelector('[type="submit"]');
 const toggle=form.querySelector('[data-access-toggle]');
 const submitText=submit.querySelector('span');
 function read(storage,key){try{return JSON.parse(storage.getItem(key)||'null')}catch{return null}}
 function remove(storage,key){try{storage.removeItem(key)}catch{}}
 function valid(record){return record?.version===1&&record.proof===verifier.proof}
 function unlock(){
  screen.hidden=true;shell.hidden=false;shell.inert=false;
  document.documentElement.dataset.access='open';
  form.reset();password.type='password';toggle.setAttribute('aria-pressed','false');toggle.setAttribute('aria-label','Hiện mật khẩu');status.textContent='';password.removeAttribute('aria-invalid');
  window.scrollTo({top:0});
  window.dispatchEvent(new Event('learning-access-open'));
 }
 function lock(){
  for(const dialog of document.querySelectorAll('dialog[open]'))dialog.close();
  shell.hidden=true;shell.inert=true;screen.hidden=false;
  document.documentElement.dataset.access='locked';
  form.reset();password.type='password';toggle.setAttribute('aria-pressed','false');toggle.setAttribute('aria-label','Hiện mật khẩu');status.textContent='';password.removeAttribute('aria-invalid');
  window.scrollTo({top:0});
 }
 function restore(){
  if(valid(read(localStorage,rememberKey))||valid(read(sessionStorage,sessionKey))){unlock();return;}
  remove(localStorage,rememberKey);remove(sessionStorage,sessionKey);lock();
 }
 async function derive(value){
  if(!crypto.subtle)throw new Error('Vui lòng mở trang bằng HTTPS để đăng nhập.');
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(value),'PBKDF2',false,['deriveBits']);
  const salt=Uint8Array.from(atob(verifier.salt),c=>c.charCodeAt(0));
  const result=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:verifier.iterations,hash:'SHA-256'},key,256));
  return btoa(String.fromCharCode(...result));
 }
 toggle.addEventListener('click',()=>{
  const reveal=password.type==='password';password.type=reveal?'text':'password';
  toggle.setAttribute('aria-pressed',String(reveal));toggle.setAttribute('aria-label',reveal?'Ẩn mật khẩu':'Hiện mật khẩu');password.focus({preventScroll:true});
 });
 password.addEventListener('input',()=>{status.textContent='';password.removeAttribute('aria-invalid')});
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(submit.disabled)return;
  submit.disabled=true;submitText.textContent='Đang đăng nhập…';status.textContent='';
  try{
   if(await derive(password.value)!==verifier.proof){password.setAttribute('aria-invalid','true');status.textContent='Mật khẩu chưa đúng. Vui lòng thử lại.';password.focus({preventScroll:true});password.select();return;}
   const record=JSON.stringify({version:1,proof:verifier.proof});
   if(remember.checked){
    try{localStorage.setItem(rememberKey,record)}catch{status.textContent='Trình duyệt không cho ghi nhớ. Bỏ chọn “Ghi nhớ đăng nhập” để tiếp tục.';return;}
    remove(sessionStorage,sessionKey);
   }else{
    remove(localStorage,rememberKey);
    try{sessionStorage.setItem(sessionKey,record)}catch{}
   }
   unlock();
   const main=document.querySelector('#main-content');main?.setAttribute('tabindex','-1');main?.focus({preventScroll:true});
  }catch(error){status.textContent=error.message||'Không thể đăng nhập. Vui lòng thử lại.';}
  finally{submit.disabled=false;submitText.textContent='Đăng nhập';}
 });
 document.addEventListener('click',event=>{
  if(!event.target.closest('[data-action="access-logout"]'))return;
  remove(localStorage,rememberKey);remove(sessionStorage,sessionKey);
  if(typeof state!=='undefined'&&state.practice)saveAttempt();
  if(typeof home==='function')home();lock();password.focus({preventScroll:true});
 });
 window.addEventListener('storage',event=>{if(event.key===rememberKey)restore()});
 window.addEventListener('pageshow',event=>{if(event.persisted)restore()});
 restore();
 submit.disabled=false;
})();
