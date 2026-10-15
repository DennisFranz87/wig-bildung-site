window.SEMPLAN="https://wig.semplan2.de/?client=542314b3-5bdd-46f9-86e0-35c25edf8923";window.API_BASE=(location.hostname==='www.wig-bildung.de'||location.hostname.endsWith('.pages.dev')||location.hostname==='localhost')?'':'https://www.wig-bildung.de';
(function(){
  var cb=document.getElementById('consent');function cget(){try{return localStorage.getItem('wig_consent')}catch(e){return null}}function cset(v){try{localStorage.setItem('wig_consent',v)}catch(e){}}
  function applyConsent(v){if(v==='all'){if(window.__loadPixel)window.__loadPixel();if(window.gtag)gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});(window.dataLayer=window.dataLayer||[]).push({event:'consent_all'});}else{(window.dataLayer=window.dataLayer||[]).push({event:'consent_min'});}if(cb)cb.hidden=true}
  var cv=cget();if(cv)applyConsent(cv);else if(cb){setTimeout(function(){cb.hidden=false;requestAnimationFrame(function(){cb.classList.add('show')})},900)}
  var ca=document.getElementById('c-all'),cm=document.getElementById('c-min'),co=document.getElementById('c-open');
  if(ca)ca.addEventListener('click',function(){cset('all');applyConsent('all')});
  if(cm)cm.addEventListener('click',function(){cset('min');applyConsent('min')});
  if(co)co.addEventListener('click',function(e){e.preventDefault();try{localStorage.removeItem('wig_consent')}catch(x){}if(cb){cb.hidden=false;cb.classList.add('show');window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})}});
  document.querySelectorAll('.has-dd').forEach(function(li){var b=li.querySelector('.dd-toggle');b.addEventListener('click',function(e){e.stopPropagation();var o=li.classList.toggle('open');b.setAttribute('aria-expanded',o)});li.addEventListener('keydown',function(e){if(e.key==='Escape'){li.classList.remove('open');b.setAttribute('aria-expanded',false)}})});
  document.addEventListener('click',function(e){if(!e.target.closest('.has-dd'))document.querySelectorAll('.has-dd.open').forEach(function(li){li.classList.remove('open');li.querySelector('.dd-toggle').setAttribute('aria-expanded',false)})});
  var hd=document.querySelector('header.site');function sc(){hd.classList.toggle('scrolled',window.scrollY>10)}window.addEventListener('scroll',sc,{passive:true});sc();
  function count(el){if(el.dataset.done)return;el.dataset.done=1;var t=+el.getAttribute('data-count'),s=null;function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/1200,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
  function reveal(el){el.classList.add('in');el.querySelectorAll('[data-count]').forEach(count);if(el.hasAttribute('data-count'))count(el)}
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){reveal(e.target);io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.01}):null;
  document.querySelectorAll('.rv').forEach(function(el){io?io.observe(el):reveal(el)});
  document.querySelectorAll('[data-count]').forEach(function(el){if(!el.closest('.rv'))count(el)});
  var dl=window.dataLayer=window.dataLayer||[];
  function track(ev,extra){var o={event:ev};if(extra)for(var k in extra)o[k]=extra[k];dl.push(o);if(window.fbq){if(ev==='lead_form_submit')fbq('track','Lead',{content_name:(extra&&extra.course)||'',content_category:(extra&&extra.kind)||''});else if(ev==='phone_click'||ev==='whatsapp_click')fbq('track','Contact',{content_name:ev});else if(ev==='booking_click')fbq('trackCustom','BookingClick',{content_name:(extra&&extra.course)||''});}}
  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-track]');if(!a)return;
    track(a.getAttribute('data-track'),{course:a.getAttribute('data-course')||document.body.getAttribute('data-course')||'',href:a.getAttribute('href')});
  });
  // Termine
  var box=document.getElementById('termine'),ALL=[];
  function seatsOf(t){var m=/(\d+)\s*\/\s*(\d+)/.exec(t.seats||'');var free=(t.free!=null)?t.free:(m?(+m[2]-+m[1]):null);var tot=m?+m[2]:null;return{free:free,tot:tot}}
  function seatsHtml(t){var s=seatsOf(t);if(s.free==null)return'';var cls=s.free<=0?'full':(s.free<=3?'few':'');var txt=s.free<=0?'ausgebucht':(s.free+' Plätze frei');return'<span class="seats '+cls+'">'+txt+'</span>'}
  function dayPlan(t){if(!t.days||!t.days.length)return'';var pr=t.praesenz||0,on=t.online||0;
    var parts=[];if(pr)parts.push(pr+' × Präsenz in Krefeld');if(on)parts.push(on+' × Live-Online');var sum=parts.join(' · ');
    return'<details class="plan"><summary><span>'+t.days.length+' Unterrichtstage</span><span class="muted">'+sum+'</span></summary><ol>'+t.days.map(function(d){return'<li><b>'+d.date+'</b><span>'+d.time+'</span><em class="'+d.mode+'">'+(d.mode==='online'?'Live-Online':'Präsenz Krefeld')+'</em></li>'}).join('')+'</ol></details>'}
  function card(t,full){
    var meta=[];if(t.nr)meta.push('Kurs-Nr. '+t.nr);if(t.points)meta.push(t.points+' RbP-Punkte');if(t.price)meta.push(t.price);
    return'<div class="termin'+(full?' full':'')+'"><div class="date"><b>'+t.date.replace(' - ','<br>bis ')+'</b><span>'+t.time+'</span></div>'+
    '<div class="what"><strong>'+t.title+'</strong><span>'+t.location+(meta.length?' · '+meta.join(' · '):'')+'</span>'+(full?dayPlan(t):'')+'</div>'+
    '<div class="act">'+seatsHtml(t)+'<a class="btn sm" href="'+t.url+'" target="_blank" rel="noopener" data-track="booking_click" data-course="'+(t.slug||'')+'">Info &amp; Anmeldung</a></div></div>'}
  function render(list){
    if(!box)return;var full=box.hasAttribute('data-full'),grouped=box.hasAttribute('data-grouped');
    if(!list.length){box.innerHTML='<div class="empty">Aktuell sind keine Termine für diesen Kurs im Seminarplan. <a href="/kontakt/">Fragen Sie uns nach dem nächsten Start.</a></div>';return}
    if(!grouped){box.innerHTML=list.map(function(t){return card(t,full)}).join('');return}
    var groups=[],map={};list.forEach(function(t){var k=t.slug||t.title;if(!map[k]){map[k]={title:t.title,slug:t.slug,items:[]};groups.push(map[k])}map[k].items.push(t)});
    box.innerHTML=groups.map(function(g){return'<div class="tgroup"><h3>'+g.title+(g.slug?' <a class="tlink" href="/kurse/'+g.slug+'/">Zur Kursseite →</a>':'')+'</h3>'+g.items.map(function(t){return card(t,full)}).join('')+'</div>'}).join('')}
  function apply(f){if(!box)return;var slug=f!=null?f:(box.getAttribute('data-slug')||''),limit=parseInt(box.getAttribute('data-limit')||'0',10);var l=ALL.filter(function(t){return !slug||t.slug===slug});if(limit)l=l.slice(0,limit);render(l)}
  function fillNext(){document.querySelectorAll('[data-next]').forEach(function(el){var sl=el.getAttribute('data-next'),t=ALL.filter(function(x){return x.slug===sl})[0];if(!t)return;var s=seatsOf(t);el.innerHTML='<b>Nächster Start:</b> '+t.date.split(' - ')[0].replace(/^\S+\s/,'')+(s.free!=null?' · '+(s.free<=0?'ausgebucht':s.free+' Plätze frei'):'')})}
  function load(url,next){fetch(url,{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){ALL=j.termine||[];apply(null);fillNext()}).catch(function(){if(next)load(next);else if(box)box.innerHTML='<div class="empty">Termine konnten nicht geladen werden. <a href="'+(window.SEMPLAN||'#')+'" target="_blank" rel="noopener">Zum Seminarplan</a></div>'})}
  if(box||document.querySelector('[data-next]'))load((window.API_BASE||'')+'/api/termine','/termine.json');
  var fl=document.getElementById('tfilter');
  if(fl)fl.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;fl.querySelectorAll('button').forEach(function(x){x.classList.add('ghost')});b.classList.remove('ghost');apply(b.getAttribute('data-f'))});
  // Formular
  var f=document.getElementById('leadform');
  if(f){
    var q=new URLSearchParams(location.search).get('kurs');
    if(q){var sel=f.querySelector('select[name=kurs]');if(sel){var opt=[].slice.call(sel.options).find(function(o){return o.value.toLowerCase().indexOf(q.replace(/-/g,' ').split(' ')[0])>=0});if(opt)sel.value=opt.value;}}
    f.addEventListener('submit',function(e){
      e.preventDefault();var msg=document.getElementById('formmsg');msg.className='form-msg';
      if(!f.checkValidity()){f.reportValidity();return}
      var data={};new FormData(f).forEach(function(v,k){data[k]=v});data.kind=f.getAttribute('data-kind');data.page=location.pathname;
      var btn=f.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Wird gesendet …';
      fetch((window.API_BASE||'')+'/api/kontakt',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(r){return r.json()}).then(function(j){
        if(j.ok){msg.className='form-msg ok';msg.textContent='Vielen Dank. Ihre Anfrage ist bei uns eingegangen, wir melden uns zeitnah.';f.reset();track('lead_form_submit',{kind:data.kind,course:data.kurs||''});}
        else throw new Error(j.error||'');
      }).catch(function(err){
        msg.className='form-msg err';
        var body=encodeURIComponent(Object.keys(data).filter(function(k){return k!=='website'&&k!=='dsgvo'}).map(function(k){return k+': '+data[k]}).join('\n'));
        msg.innerHTML='Das Formular konnte gerade nicht gesendet werden. Bitte schreiben Sie uns direkt: <a href="mailto:kontakt@wig-bildung.de?subject=Anfrage%20Website&body='+body+'">kontakt@wig-bildung.de</a> oder rufen Sie an.';
      }).finally(function(){btn.disabled=false;btn.textContent=f.getAttribute('data-kind')==='pocket'?'Bestellung anfragen':'Anfrage senden'});
    });
  }
})();
