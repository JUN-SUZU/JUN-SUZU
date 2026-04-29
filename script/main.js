// Minimal JS: UI interactions only
(function(){
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if(menuToggle && mainNav){
    menuToggle.addEventListener('click', ()=>{
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  // Contact form: submit via fetch and show friendly notice
  const contactForm = document.getElementById('contactForm');
  const formNotice = document.getElementById('formNotice');
  const saveDraft = document.getElementById('saveDraft');
  if(contactForm){
    contactForm.addEventListener('submit', async (event)=>{
      event.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : '';
      const body = new FormData(contactForm);

      if(formNotice){
        formNotice.textContent = '送信中です。';
        formNotice.classList.remove('notice-ok');
      }
      if(submitButton){
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';
      }

      try{
        await fetch(contactForm.action, {
          method: 'POST',
          body,
          mode: 'no-cors',
        });

        if(formNotice){
          formNotice.textContent = '送信しました。内容を確認して返信します。';
          formNotice.classList.add('notice-ok');
        }
        contactForm.reset();
        localStorage.removeItem('contactDraft');
      }catch(error){
        if(formNotice){
          formNotice.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
          formNotice.classList.remove('notice-ok');
        }
      }finally{
        if(submitButton){
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    });
  }
  if(saveDraft){
    saveDraft.addEventListener('click', ()=>{
      if(!window.localStorage) return alert('このブラウザでは下書き保存できません');
      const inputs = document.querySelectorAll('#contactForm [name]');
      const data = {};
      inputs.forEach(i=>{ data[i.name]=i.value; });
      localStorage.setItem('contactDraft', JSON.stringify(data));
      if(formNotice){
        formNotice.textContent = '下書きをローカルに保存しました。';
        formNotice.classList.add('notice-ok');
      }
    });
  }

  // Restore draft if present
  if(window.localStorage){
    const draft = localStorage.getItem('contactDraft');
    if(draft){
      try{
        const data = JSON.parse(draft);
        Object.keys(data).forEach(k=>{
          const el = document.querySelector('#contactForm [name="'+k+'"]');
          if(el) el.value = data[k];
        });
      }catch(e){}
    }
  }
})();
