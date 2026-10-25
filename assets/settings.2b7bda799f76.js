'use strict';
(() => {
 const dialog=document.getElementById('settings');
 const preferenceKey='goc-hoc-tap.preferences.v1';
 const passwordKey='goc-hoc-tap.parent-password.v1';
 let previousFocus;
 let activeTab='appearance';
 const tabs=[['appearance','Giao diện'],['password','Mật khẩu'],['guide','Hướng dẫn']];
 function read(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
 function save(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
 function draw(){
 const hasPassword=!!read(passwordKey);
 dialog.innerHTML=`<button class="icon-button dialog-close close" data-close-settings aria-label="Đóng cài đặt">${icon('close',26)}</button><div class="settings-heading"><span aria-hidden="true">⚙</span><div><h2 id="settings-title">Cài đặt</h2><p>Chăm chút góc học tập của bé</p></div></div><section class="settings-section"><h3>Chọn giao diện</h3><fieldset class="learning-theme-picker"><legend class="visually-hidden">Giao diện ứng dụng</legend>${referenceThemes.map(t=>`<label class="${activeTheme().id===t.id?'selected-theme':''}"><img src="${publicAsset(t.hero)}" alt=""><span><input type="radio" name="learning-theme" value="${t.id}" ${activeTheme().id===t.id?'checked':''}>${t.name}</span></label>`).join('')}</fieldset><p id="theme-status" role="status"></p></section><section class="settings-section parent-password-panel"><h3>${hasPassword?'Đổi mật khẩu':'Đặt mật khẩu phụ huynh'}</h3><form id="save-parent-password">${hasPassword?'<label for="current-password">Mật khẩu hiện tại</label><input id="current-password" type="password" autocomplete="current-password" required>':''}<label for="new-password">Mật khẩu mới (ít nhất 6 ký tự)</label><input id="new-password" type="password" minlength="6" maxlength="128" autocomplete="new-password" required><label for="confirm-password">Nhập lại mật khẩu</label><input id="confirm-password" type="password" minlength="6" maxlength="128" autocomplete="new-password" required><p class="settings-status" role="status"></p><div class="password-actions"><button class="primary-button primary">Lưu mật khẩu</button>${hasPassword?'<button type="button" class="secondary-button secondary" id="remove-parent-password">Gỡ mật khẩu</button>':''}</div></form><p class="settings-note">Mật khẩu trong tab này chỉ dùng để xem đáp án và lời giải, riêng với mật khẩu đăng nhập. Mật khẩu lưu riêng trên trình duyệt này, chưa đồng bộ. Vì đây là web tĩnh, khóa này chỉ hỗ trợ phụ huynh hướng dẫn bé; không bảo vệ đáp án trước người biết xem mã nguồn. Nếu quên mật khẩu, phụ huynh có thể xóa dữ liệu trang trong cài đặt trình duyệt.</p></section><section class="settings-section usage"><h3>Hướng dẫn sử dụng ứng dụng</h3><ol><li>Chọn lớp, chương trình và môn học.</li><li>Chọn đề vòng loại, đề quốc gia hoặc luyện theo chủ đề.</li><li>Nhấn “Làm bài”, trả lời đủ câu hỏi rồi nhấn “Nộp bài”.</li><li>Khi đã có đáp án được cung cấp, xem điểm và bấm “Xem đáp án và lời giải”, rồi nhập mật khẩu phụ huynh nếu đã cài. Bài chưa có đáp án hiển thị “Chờ đáp án”. Có thể nhấn “Làm lại” để luyện thêm.</li><li>Phụ huynh vào Cài đặt để đổi giao diện hoặc đặt mật khẩu.</li></ol><p class="settings-note">Đề và đáp án do phụ huynh cung cấp. Bài làm được lưu trên trình duyệt này khi trình duyệt cho phép lưu dữ liệu; chưa đồng bộ sang thiết bị khác.</p><div class="settings-tools"><h3>Dữ liệu và điều hướng</h3><button type="button" class="secondary-button" data-action="local-data">${icon('cloud',18)} Dữ liệu trên thiết bị</button><button type="button" class="secondary-button" data-action="home">${icon('back',18)} Về danh sách bài tập</button><button type="button" class="secondary-button" data-action="access-logout">${icon('back',18)} Đăng xuất</button></div></section>`;

 const topbar=document.createElement('div');topbar.className='settings-topbar';topbar.append(dialog.querySelector('[data-close-settings]'),dialog.querySelector('.settings-heading'));dialog.prepend(topbar);
 const panels=Array.from(dialog.querySelectorAll(':scope > .settings-section'));
 const tablist=document.createElement('div');tablist.className='parent-tabs settings-tabs';tablist.setAttribute('role','tablist');tablist.setAttribute('aria-label','Cài đặt phụ huynh');
 tablist.innerHTML=tabs.map(([id,label])=>`<button type="button" role="tab" id="settings-tab-${id}" aria-controls="settings-panel-${id}" data-settings-tab="${id}">${label}</button>`).join('');
 panels.forEach((panel,i)=>{const id=tabs[i][0];panel.id=`settings-panel-${id}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',`settings-tab-${id}`);panel.tabIndex=0;});
 dialog.insertBefore(tablist,panels[0]);selectTab(activeTab);
 }
 function selectTab(id,focus=false){
 activeTab=id;
 dialog.querySelectorAll('[data-settings-tab]').forEach(button=>{const selected=button.dataset.settingsTab===id;button.setAttribute('aria-selected',String(selected));button.classList.toggle('active',selected);button.tabIndex=selected?0:-1;});
 tabs.forEach(([key])=>{dialog.querySelector(`#settings-panel-${key}`).hidden=key!==id;});
 dialog.scrollTop=0;
 if(focus)dialog.querySelector(`[data-settings-tab="${id}"]`).focus();
 }
 dialog.addEventListener('keydown',e=>{
 const current=e.target.closest('[data-settings-tab]');if(!current||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();
 const index=tabs.findIndex(([id])=>id===current.dataset.settingsTab),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
 selectTab(tabs[next][0],true);
 });
 document.addEventListener('click',e=>{
 if(e.target.closest('[data-action="settings"], [data-action="theme-picker"], [data-action="parent-settings"]')){previousFocus=document.activeElement;activeTab=e.target.closest('[data-action="parent-settings"]')?'password':'appearance';draw();dialog.showModal();dialog.scrollTop=0;dialog.querySelector('[data-close-settings]').focus({preventScroll:true});}
 if(e.target.closest('[data-close-settings]'))dialog.close();
 const tab=e.target.closest('[data-settings-tab]');if(tab)selectTab(tab.dataset.settingsTab,true);
 if(e.target.closest('#remove-parent-password'))removePassword();
 });
 dialog.addEventListener('change',e=>{if(e.target.name!=='learning-theme')return;const choice=e.target.value;if(!referenceThemes.some(t=>t.id===choice))return;document.documentElement.dataset.theme=choice;const success=save(preferenceKey,{theme:choice});if(state.practice)renderPractice();else renderHome();draw();dialog.querySelector('input[name="learning-theme"]:checked').focus();dialog.querySelector('#theme-status').textContent=success?'Đã lưu giao diện.':'Giao diện chỉ áp dụng trong phiên hiện tại.';});
 dialog.addEventListener('close',()=>{previousFocus?.focus()});
 const bytesToBase64=bytes=>btoa(String.fromCharCode(...bytes));
 const base64ToBytes=text=>Uint8Array.from(atob(text),c=>c.charCodeAt(0));
 async function hash(password,salt){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return bytesToBase64(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:120000,hash:'SHA-256'},key,256)));}
 dialog.addEventListener('submit',async e=>{
 e.preventDefault();const form=e.target,status=form.querySelector('.settings-status'),button=form.querySelector('button');button.disabled=true;
 try{
 if(!crypto.subtle)throw new Error('Mật khẩu cần HTTPS hoặc localhost. Hãy mở ứng dụng trên GitHub Pages.');
 if(form.id==='save-parent-password'){
 
 const stored=read(passwordKey);if(stored&&!(await verify(form.querySelector('#current-password').value))){status.textContent='Mật khẩu hiện tại chưa đúng.';return;}
 const password=form.querySelector('#new-password').value,confirmation=form.querySelector('#confirm-password').value;
 if(password.length<6||password.length>128){status.textContent='Mật khẩu cần từ 6 đến 128 ký tự.';return;}
 if(password!==confirmation){status.textContent='Hai mật khẩu chưa giống nhau.';return;}
 const salt=crypto.getRandomValues(new Uint8Array(16)),digest=await hash(password,salt);
 if(!save(passwordKey,{salt:bytesToBase64(salt),digest,version:1}))throw new Error('Trình duyệt không cho lưu mật khẩu. Vui lòng cho phép lưu dữ liệu trang.');
 draw();dialog.querySelector('.settings-status').textContent='Đã lưu mật khẩu. Khi xem đáp án và lời giải sẽ cần mật khẩu này.';
 }
 }catch(error){status.textContent=error.message||'Không thể cập nhật cài đặt. Vui lòng thử lại.';}finally{button.disabled=false;}
 });

 async function verify(password){const stored=read(passwordKey);if(!stored)return true;return await hash(password,base64ToBytes(stored.salt))===stored.digest;}
 async function removePassword(){const status=dialog.querySelector('.settings-status');try{if(!(await verify(dialog.querySelector('#current-password').value))){status.textContent='Nhập đúng mật khẩu hiện tại để gỡ.';return;}localStorage.removeItem(passwordKey);draw();dialog.querySelector('.settings-status').textContent='Đã gỡ mật khẩu.';}catch{status.textContent='Không thể gỡ mật khẩu trên trình duyệt này.';}}
 const solutionDialog=document.querySelector('#solution-dialog');
 let solutionFocus;
 function revealSolutions(){if(!state.practice||!state.submitted||!state.practice.questions.some(q=>q.answerSource==='user'&&validResponse(q,q.answer)))return;state.solutionsVisible=true;renderPractice();app.querySelector('.result h2').focus();}
 document.addEventListener('click',e=>{
 if(e.target.closest('[data-action="solutions"]')){
 if(!state.practice||!state.submitted||!state.practice.questions.some(q=>q.answerSource==='user'&&validResponse(q,q.answer)))return;
 if(!read(passwordKey)){revealSolutions();return;}
 solutionFocus=document.activeElement;
 solutionDialog.innerHTML=`<button class="icon-button dialog-close close" data-close-solutions aria-label="Đóng">×</button><h2 id="solution-title">Xem đáp án và lời giải</h2><p class="settings-note">Phụ huynh nhập mật khẩu để cùng bé xem lại bài.</p><form id="unlock-solutions"><label for="solution-password">Mật khẩu phụ huynh</label><input id="solution-password" type="password" autocomplete="current-password" required><p class="settings-status" role="status"></p><button class="primary-button primary">Xem lời giải</button></form>`;
 solutionDialog.showModal();solutionDialog.querySelector('input').focus();
 }
 if(e.target.closest('[data-close-solutions]'))solutionDialog.close();
 });
 solutionDialog.addEventListener('close',()=>solutionFocus?.focus());
 solutionDialog.addEventListener('submit',async e=>{e.preventDefault();const button=e.target.querySelector('button'),status=e.target.querySelector('.settings-status');button.disabled=true;try{if(await verify(e.target.querySelector('input').value)){solutionDialog.close();revealSolutions();}else{status.textContent='Mật khẩu chưa đúng. Vui lòng thử lại.';}}catch{status.textContent='Không thể xác nhận mật khẩu. Hãy mở trang bằng HTTPS hoặc localhost.';}finally{button.disabled=false;}});
})();
