'use strict';
(() => {
  const data = window.DEMO_DATA;
  if (!data) { document.querySelector('main').insertAdjacentHTML('afterbegin', '<p>The audio gallery could not load. Please refresh the page.</p>'); return; }
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = path => path.split('/').map(encodeURIComponent).join('/');
  const duration = value => `${Math.round(Number(value))} s`;
  const grouped = group => data.records.filter(r => r.group === group);
  const player = (r, model) => {
    const m = model || {name:'SonicRender', audio:r.audio, duration:r.duration};
    return `<div class="player"><div class="player-head"><strong>${escape(m.name)}</strong><span>${duration(m.duration)}</span></div><audio controls preload="none" aria-label="${escape(m.name + ': ' + r.title)}" src="${url(m.audio)}">Your browser does not support audio playback.</audio><p class="player-error" hidden>Audio could not load. <a href="${url(m.audio)}">Open the audio file</a>.</p></div>`;
  };
  const details = r => {
    const sources = r.sources.map(s => `<p><strong>${escape(s.id)}</strong> · ${escape([s.voice,s.timbre,s.accent,s.traits].filter(Boolean).join('; '))}</p>`).join('');
    const events = r.events.map(e => `<li><span class="event-time">${e.window ? `${e.window[0]}–${e.window[1]} s` : 'Unspecified'}</span><div><span class="event-type">${escape([e.id,e.source,e.type,e.delivery].filter(Boolean).join(' · '))}</span>${escape(e.translation || e.display)}${e.translation ? `<span class="event-original" lang="${escape(e.lang || '')}">${escape(e.text)}</span>` : ''}</div></li>`).join('');
    return `<div class="sample-details"><details><summary>Scene script & timing</summary><div class="source-list">${sources}</div><ol class="event-list">${events}</ol></details><details><summary>ASG-Time</summary><pre class="original-asg">${escape(r.asg.replace(/>\s*</g, '>\n<'))}</pre></details></div>`;
  };
  const card = r => {
    const heading = `<div class="meta"><span>${escape(r.dataset || r.language || r.category)}</span><span>${duration(r.duration)}</span></div><h3>${escape(r.title)}</h3>`;
    if (r.group === 'public') return `<article class="sample-card" data-group="public" data-category="${escape(r.task)}">${heading}<span class="caption-label">${escape(r.caption_label)}</span><p class="description">${escape(r.summary)}</p>${player(r)}</article>`;
    return `<article class="sample-card listening-row" data-group="${r.group}" data-category="${escape(r.category)}"><div class="sample-heading">${heading}${player(r)}</div><div class="sample-copy"><p class="description">${escape(r.summary)}</p>${details(r)}</div></article>`;
  };
  ['public','complex','language'].forEach(group => { document.getElementById(group+'-grid').innerHTML = grouped(group).map(card).join(''); });
  const compare = grouped('comparison');
  document.getElementById('case-tabs').innerHTML = compare.map((r,i) => `<button type="button" role="tab" id="tab-${r.id}" aria-controls="panel-${r.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-case="${r.id}"><span>${String(i+1).padStart(2,'0')}</span>${escape(r.title)}</button>`).join('');
  document.getElementById('comparison-panels').innerHTML = compare.map((r,i) => `<article class="comparison-panel" id="panel-${r.id}" role="tabpanel" tabindex="0" aria-labelledby="tab-${r.id}" ${i ? 'hidden' : ''}><div class="comparison-copy"><div class="comparison-top"><h3>${escape(r.title)}</h3><span class="sample-id">${escape(r.id)} · ${r.events.length} events</span></div><p>${escape(r.summary)}</p></div><div class="model-grid">${r.models.map((m,j) => `<div class="model-cell ${j === 0 ? 'ours' : ''}">${player(r,m)}</div>`).join('')}</div>${details(r)}</article>`).join('');
  function pauseHidden() { document.querySelectorAll('[hidden] audio').forEach(a => a.pause()); }
  function selectCase(button) {
    document.querySelectorAll('[role=tab]').forEach(b => { const selected = b === button; b.setAttribute('aria-selected', selected); b.tabIndex = selected ? 0 : -1; });
    document.querySelectorAll('[role=tabpanel]').forEach(panel => { panel.hidden = panel.id !== 'panel-'+button.dataset.case; });
    pauseHidden();
  }
  document.querySelectorAll('[role=tab]').forEach(button => {
    button.addEventListener('click', () => selectCase(button));
    button.addEventListener('keydown', event => {
      const tabs = [...document.querySelectorAll('[role=tab]')];
      let i = tabs.indexOf(button);
      if (event.key === 'ArrowRight') i = (i+1)%tabs.length;
      else if (event.key === 'ArrowLeft') i = (i-1+tabs.length)%tabs.length;
      else if (event.key === 'Home') i = 0;
      else if (event.key === 'End') i = tabs.length-1;
      else return;
      event.preventDefault(); selectCase(tabs[i]); tabs[i].focus();
    });
  });
  document.querySelectorAll('[data-filter-group]').forEach(filters => {
    filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', b === button); });
      document.querySelectorAll(`.sample-card[data-group="${filters.dataset.filterGroup}"]`).forEach(card => { card.hidden = button.dataset.value !== 'all' && card.dataset.category !== button.dataset.value; });
      pauseHidden();
    }));
  });
  document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('play', () => { document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); }); document.getElementById('playback-status').textContent = 'Playing '+audio.getAttribute('aria-label'); });
    audio.addEventListener('error', () => { audio.nextElementSibling.hidden = false; });
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) document.querySelectorAll('.site-nav a').forEach(a => a.classList.toggle('active', a.hash === '#'+entry.target.id)); }); }, {rootMargin:'-15% 0px -60% 0px'});
    document.querySelectorAll('main>section').forEach(s => observer.observe(s));
  }
})();
