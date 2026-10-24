'use strict';
(() => {
 const dialog=document.getElementById('settings');
 const preferenceKey='goc-hoc-tap.preferences.v1';
 const passwordKey='goc-hoc-tap.parent-password.v1';
 let previousFocus;
 function read(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
 function save(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
 const saved=read(preferenceKey);
 document.documentElement.dataset.theme=saved?.theme==='forest'?'forest':'space';
 function draw(){
 const hasPassword=!!read(passwordKey);
 dialog.innerHTML=`<button class="close" data-close-settings aria-label="Đóng cài đặt">×</button><div class="settings-heading"><span aria-hidden="true">⚙</span><div><h2 id="settings-title">Cài đặt phụ huynh</h2><p>Chăm chút góc học tập của bé</p></div></div><section class="settings-section"><h3>Chọn giao diện</h3><div class="theme-options"><button class="theme-option ${document.documentElement.dataset.theme==='space'?'selected':''}" data-theme-choice="space" aria-pressed="${document.documentElement.dataset.theme==='space'}"><img src="./assets/space-banner.png" alt=""><span>Vũ trụ xanh</span></button><button class="theme-option ${document.documentElement.dataset.theme==='forest'?'selected':''}" data-theme-choice="forest" aria-pressed="${document.documentElement.dataset.theme==='forest'}"><img src="./assets/forest-banner.png" alt=""><span>Khu rừng kỳ diệu</span></button></div><p id="theme-status" role="status"></p></section><section class="settings-section"><h3>${hasPassword?'Đổi mật khẩu':'Đặt mật khẩu phụ huynh'}</h3><form id="save-parent-password">${hasPassword?'<label for="current-password">Mật khẩu hiện tại</label><input id="current-password" type="password" autocomplete="current-password" required>':''}<label for="new-password">Mật khẩu mới (ít nhất 6 ký tự)</label><input id="new-password" type="password" minlength="6" maxlength="128" autocomplete="new-password" required><label for="confirm-password">Nhập lại mật khẩu</label><input id="confirm-password" type="password" minlength="6" maxlength="128" autocomplete="new-password" required><p class="settings-status" role="status"></p><div class="password-actions"><button class="primary">Lưu mật khẩu</button>${hasPassword?'<button type="button" class="secondary" id="remove-parent-password">Gỡ mật khẩu</button>':''}</div></form><p class="settings-note">Mật khẩu chỉ dùng để xem đáp án và lời giải, không dùng để đăng nhập. Mật khẩu lưu riêng trên trình duyệt này, chưa đồng bộ. Vì đây là web tĩnh, khóa này chỉ hỗ trợ phụ huynh hướng dẫn bé; không bảo vệ đáp án trước người biết xem mã nguồn. Nếu quên mật khẩu, phụ huynh có thể xóa dữ liệu trang trong cài đặt trình duyệt.</p></section><details class="settings-section usage"><summary>Hướng dẫn sử dụng ứng dụng</summary><ol><li>Chọn lớp, chương trình và môn học.</li><li>Chọn đề vòng loại, đề quốc gia hoặc luyện theo chủ đề.</li><li>Nhấn “Làm bài”, trả lời đủ câu hỏi rồi nhấn “Nộp bài”.</li><li>Xem điểm; bấm “Xem đáp án và lời giải” rồi nhập mật khẩu phụ huynh nếu đã cài. Có thể nhấn “Làm lại” để luyện thêm.</li><li>Phụ huynh vào Cài đặt để đổi giao diện hoặc đặt mật khẩu.</li></ol><p class="settings-note">Các đề hiện là nội dung minh họa, không phải đề TIMO/ASMO chính thức hoặc báo bài thật của trường. Điểm bài luyện chưa được lưu qua lần tải lại.</p></details>`;
 }
 document.addEventListener('click',e=>{
 if(e.target.closest('[data-action="settings"]')){previousFocus=document.activeElement;draw();dialog.showModal();}
 if(e.target.closest('[data-close-settings]'))dialog.close();
 const theme=e.target.closest('[data-theme-choice]');
 if(theme){const choice=theme.dataset.themeChoice;document.documentElement.dataset.theme=choice;const success=save(preferenceKey,{theme:choice});draw();dialog.querySelector(`[data-theme-choice="${choice}"]`).focus();dialog.querySelector('#theme-status').textContent=success?'Đã lưu giao diện.':'Đã đổi giao diện cho phiên này; trình duyệt không cho lưu dữ liệu.';}
 if(e.target.closest('#remove-parent-password'))removePassword();
 });
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
 function revealSolutions(){if(!state.practice||!state.submitted||!hasProvidedAnswers(state.practice.questions))return;state.solutionsVisible=true;renderPractice();app.querySelector('.result h2').focus();}
 document.addEventListener('click',e=>{
 if(e.target.closest('[data-action="solutions"]')){
 if(!state.practice||!state.submitted||!hasProvidedAnswers(state.practice.questions))return;
 if(!read(passwordKey)){revealSolutions();return;}
 solutionFocus=document.activeElement;
 solutionDialog.innerHTML=`<button class="close" data-close-solutions aria-label="Đóng">×</button><h2 id="solution-title">Xem đáp án và lời giải</h2><p class="settings-note">Phụ huynh nhập mật khẩu để cùng bé xem lại bài.</p><form id="unlock-solutions"><label for="solution-password">Mật khẩu phụ huynh</label><input id="solution-password" type="password" autocomplete="current-password" required><p class="settings-status" role="status"></p><button class="primary">Xem lời giải</button></form>`;
 solutionDialog.showModal();solutionDialog.querySelector('input').focus();
 }
 if(e.target.closest('[data-close-solutions]'))solutionDialog.close();
 });
 solutionDialog.addEventListener('close',()=>solutionFocus?.focus());
 solutionDialog.addEventListener('submit',async e=>{e.preventDefault();const button=e.target.querySelector('button'),status=e.target.querySelector('.settings-status');button.disabled=true;try{if(await verify(e.target.querySelector('input').value)){solutionDialog.close();revealSolutions();}else{status.textContent='Mật khẩu chưa đúng. Vui lòng thử lại.';}}catch{status.textContent='Không thể xác nhận mật khẩu. Hãy mở trang bằng HTTPS hoặc localhost.';}finally{button.disabled=false;}});
})();
