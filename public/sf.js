// Ponte tra l'interfaccia (app.js) e il backend: salvataggio su Supabase, Whis, analisi foto.
(function () {
  const t = {};
  const debounce = (k, fn, ms) => { clearTimeout(t[k]); t[k] = setTimeout(fn, ms); };
  const put = body => fetch('/api/state', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {});
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  window.SF = {
    save(data) { debounce('s', () => put({ data }), 1200); },
    saveChat(chat) { debounce('c', () => put({ chat: chat.slice(-60) }), 800); },
    md(s) {
      return esc(s)
        .replace(/^#{1,4} (.+)$/gm, '<b>$1</b>')
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
        .replace(/^[-•] (.+)$/gm, '\u2022 $1')
        .replace(/\n/g, '<br>');
    },
    async whis(message, history, context, onDelta) {
      const r = await fetch('/api/whis', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message, history, context }) });
      if (!r.ok || !r.body) throw new Error('whis ' + r.status);
      const rd = r.body.getReader(), dec = new TextDecoder();
      for (;;) { const { done, value } = await rd.read(); if (done) break; onDelta(dec.decode(value, { stream: true })); }
    },
    async analyze(dataUrl, meal) {
      const r = await fetch('/api/analyze-meal', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ image: dataUrl, meal }) });
      if (!r.ok) throw new Error('analyze ' + r.status);
      return (await r.json()).items;
    }
  };

  const boot = () => { const s = document.createElement('script'); s.src = '/app.js?v=1'; document.body.appendChild(s); };
  fetch('/api/state', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : null)
    .then(j => { if (j) { window.__SF_STATE = j.data && Object.keys(j.data).length ? j.data : null; window.__SF_CHAT = j.chat || null; window.__SF_HEALTH = j.health || null; } })
    .catch(() => {})
    .finally(boot);

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
})();
