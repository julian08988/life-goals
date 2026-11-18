/* Life Goals — clickable UI flow prototype v1. Hash-routed, no build step.
   Direction: Horizon, sparse. Time runs left to right on a strip; each life goal is a lane.
   One horizon or one goal in focus at a time; detail by tap or swipe. */
(() => {
  const D = window.DATA;
  const G = D.goals;
  const ORDER = ['L1', 'L2', 'L3'];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  if (params.get('bare') === '1') document.body.classList.add('bare');

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const q = (s) => `“${esc(s)}”`;

  // ---------- Vocabulary ----------
  // Horizons on the strip, near to far. "life" is the far end: the life goal itself.
  const STRIP = [['today', 'Today'], ['week', 'Week'], ['month', 'Month'], ['one_year', '1 yr'], ['five_year', '5 yr'], ['ten_year', '10 yr'], ['life', 'Life']];
  const TITLE = { today: 'Today', week: 'This week', month: 'This month', one_year: 'One year', five_year: 'Five years', ten_year: 'Ten years', life: 'Life goals' };
  const DIST = ['ten_year', 'five_year', 'one_year', 'month', 'week']; // distilling order, far to near
  const textAt = (g, k) => (k === 'life' ? g.text : g[k]);
  // What Noor says when she edits a drafted sentence (demo only).
  const EDITS = { month: 'Find and sign a room I can rent two evenings a week, before the 30th', ten_year: 'The clinic is where south Manchester sends its mothers. Four days a week, and I teach one', week: 'Visit three rooms this week and ask about evening rates, Didsbury first' };

  // ---------- Building blocks ----------
  const eyebrow = (label, right = '') =>
    `<div class="eyebrow"><span class="label">${label}</span>${right ? `<a class="btn ghost compact" style="margin-right:-12px" href="${right.href}">${right.text}</a>` : ''}</div>`;
  const guide = (text, state = 'idle') => `<div class="guide"><div class="halo inline" data-state="${state}"></div><p class="heading">${text}</p></div>`;
  const why = (key) => { const m = D.methods[key]; return `<div class="why line"><span class="small">${esc(m.note)}</span><span class="tag ${m.tag}">${m.tag}</span></div>`; };
  const tabs = (on) =>
    `<div class="tabs">${[['map', 'Map', '#/map'], ['talk', 'Talk', '#/talk'], ['week', 'Week', '#/week']]
      .map(([k, l, h]) => `<a class="tab ${on === k ? 'on' : ''}" href="${h}"><i></i><span class="label">${l}</span></a>`).join('')}</div>`;

  // The strip: one lit horizon. `doneUpTo` marks horizons already distilled (interview). `links` makes dots navigate.
  const strip = (on, { doneUpTo = null, links = null } = {}) => {
    const doneIdx = doneUpTo ? STRIP.findIndex(([k]) => k === doneUpTo) : -1;
    return `<div class="hstrip" id="strip">${STRIP.map(([k, l], i) => {
      const done = doneIdx >= 0 && i >= doneIdx && k !== on;
      const inner = `<i></i><span class="micro">${l}</span>`;
      return links ? `<a class="s ${k === on ? 'on' : ''} ${done ? 'done' : ''}" href="${links(k)}" data-k="${k}">${inner}</a>` : `<div class="s ${k === on ? 'on' : ''} ${done ? 'done' : ''}" data-k="${k}">${inner}</div>`;
    }).join('')}</div>`;
  };

  // The lanes: one thin line per life goal, a dot per horizon. `filled` = horizons already set.
  const lanes = (ids, { sel = null, on = null, filled = [], landing = null, names = false, compact = false } = {}) =>
    (ids.length === 0 ? '' : `<div class="lanes ${names ? 'names' : ''} ${compact ? 'compact' : ''}">${ids.map((id) => `<div class="ln ${id === sel ? 'on' : ''} ${id === landing ? 'landing' : ''}"><span class="nm">${esc(G[id].area)}</span><div class="bar">${STRIP.map(([k]) => `<i class="${k === on ? 'on' : filled.includes(k) ? 'filled' : ''}"></i>`).join('')}</div></div>`).join('')}</div>`);

  const ICON = {
    key: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/></svg>',
    cam: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z M14 3v4h4 M10 12h5M10 16h5"/></svg>',
  };
  // Multimodal intake: voice first (halo), typing and photo/file one tap away.
  const intake = ({ state = 'idle', label = 'Tap to answer', sub, next = '', nextText = 'Next', showNext = false } = {}) =>
    `<div class="intake ${showNext ? 'has-next' : ''}" id="intake"><div class="halo small" data-state="${state}" id="halo"></div>
      <div class="state"><span class="body" id="intakeLabel">${label}</span><span class="small" id="intakeSub">${sub ?? 'Speak, type, or add a photo or file.'}</span></div>
      <div class="modes" id="modes">${['key', 'cam', 'doc'].map((k) => `<span class="mode" data-mode="${k}">${ICON[k]}</span>`).join('')}</div>
      ${next ? `<a class="btn primary compact" id="nextBtn" href="${next}" style="margin-left:4px; ${showNext ? '' : 'display:none'}">${nextText}</a>` : ''}
    </div>`;
  const attach = (a) => `<span class="attach inline"><span class="thumb ${a.kind}"></span><span><span class="n">${esc(a.name)}</span><br><span class="m">${esc(a.note)}</span></span></span>`;

  function wireIntake(root, { onStart, attachTarget, typeTarget, photo, file } = {}) {
    const halo = root.querySelector('#halo');
    if (halo && onStart) halo.addEventListener('click', onStart);
    root.querySelectorAll('#modes .mode').forEach((m) => m.addEventListener('click', () => {
      const k = m.dataset.mode; const wasOn = m.classList.contains('on');
      root.querySelectorAll('#modes .mode').forEach((x) => x.classList.remove('on'));
      if (!wasOn) m.classList.add('on');
      if (k === 'key' && typeTarget) {
        const box = root.querySelector(typeTarget); if (box) box.style.display = wasOn ? 'none' : '';
        const lbl = root.querySelector('#intakeLabel'); if (lbl) lbl.textContent = wasOn ? 'Tap to answer' : 'Typing';
      }
      if ((k === 'cam' || k === 'doc') && attachTarget) {
        const t = root.querySelector(attachTarget); const a = k === 'cam' ? photo : file;
        if (t && a && !t.querySelector(`[data-k="${k}"]`)) t.insertAdjacentHTML('beforeend', ` <span data-k="${k}">${attach(a)}</span>`);
      }
    }));
  }

  // Typing simulation for spoken answers.
  const typingState = {};
  function typeInto(el, full, { done, onDone, speed = 22 }) {
    const said = el.querySelector('.said'); const caret = el.querySelector('.caret');
    if (done || reduced) { said.textContent = full; if (caret) caret.remove(); onDone && onDone(true); return; }
    let i = 0; const words = full.split(' ');
    const tick = () => {
      if (i >= words.length) { caret && caret.remove(); onDone && onDone(false); return; }
      said.textContent = words.slice(0, i + 1).join(' '); i += 1;
      typingState.timer = setTimeout(tick, speed * (words[i - 1] || '').length + 60);
    };
    tick();
  }
  const stopTyping = () => { if (typingState.timer) clearTimeout(typingState.timer); typingState.timer = null; };

  // ---------- Screens ----------
  const S = {};

  S.welcome = () => ({
    name: 'Welcome', tip: 'Tap <b>Begin</b>.', ambient: 'center',
    html: `
    <div class="content" style="gap:0">
      <div class="spacer"></div>
      <div class="voice-state" style="gap:40px">
        <div class="halo large" data-state="speaking"></div>
        <div class="stack" style="gap:14px; text-align:center; align-items:center">
          <h1 class="display" style="max-width:330px">Keep your life goals in sight. Work towards them every day.</h1>
          <p class="body muted" style="max-width:300px">Built on neuroscience and behavioral research.</p>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="stack" style="gap:10px; padding-bottom:40px; align-items:center">
        <a class="btn primary block" href="#/interview/start">Begin</a>
        <span class="small faint">About forty minutes. Speak, type, or show me things.</span>
      </div>
    </div>`,
  });

  S.start = () => ({
    name: 'Interview · Start', tip: 'The guide explains the shape of the next forty minutes. Nothing on the strip yet. Tap the halo or <b>Start</b>.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('Interview', { text: 'Later', href: '#/welcome' })}
      ${strip('life')}
      <div class="spacer" style="flex:0.6"></div>
      <div class="player" style="gap:18px">
        <div class="halo medium" data-state="speaking"></div>
        <p class="spoken" style="font-size:20px; line-height:27px; max-width:320px">I will ask about a few days in your life. You talk; I write it down in your words. Then we work from life down to this week.</p>
      </div>
      <div class="spacer"></div>
      ${why('interview.opening')}
      ${intake({ state: 'idle', label: 'Answer out loud', sub: 'Or type. Photos and files too.', next: '#/interview/scene/1', nextText: 'Start', showNext: true })}
    </div>`,
  });

  // Interview scenes: the guide asks, Noor answers; the life goal is lifted out and lands as a lane.
  // `done` renders the end state; `live` renders mid-answer (listening).
  S.scene = (n, done, live = false) => {
    const sc = D.scenes[n - 1]; const gid = sc.captures.goal;
    const nextHref = n < 3 ? `#/interview/scene/${n + 1}` : '#/interview/life-goals';
    const method = sc.kind === 'End-of-life scene' ? 'interview.end_of_life_scene' : 'interview.near_term_scene';
    const placed = ORDER.slice(0, n - 1);
    const g = G[gid];
    return {
      name: live ? `Interview · ${sc.area} · listening` : `Interview · ${sc.area}`, tip: 'Tap the <b>halo</b> to speak (Noor’s answer is typed in for the demo). The life goal is lifted out in her words and lands as a new lane. Keyboard, camera and file switch the intake.',
      html: `
      <div class="content sp">
        ${eyebrow(`${sc.kind} · ${sc.step} · ${sc.area}`, { text: 'Pause', href: '#/map' })}
        ${guide(esc(sc.question), done || live ? 'idle' : 'speaking')}
        <div class="typebox" id="typebox" style="display:none"><span class="ph">Type your answer…</span></div>
        <p class="transcript sp" id="transcript"><span class="said"></span><span class="caret"></span></p>
        <div class="captured sp reveal" id="captured" style="display:none">
          <span class="micro label">Life goal, in your words · a new lane</span>
          <span class="sent">${esc(sc.captures.text)}</span>
        </div>
        <div class="spacer"></div>
        <div id="lanesWrap">${lanes(done ? [...placed, gid] : placed, { names: true, landing: done ? gid : null })}</div>
        ${why(method)}
        ${intake({ state: done || live ? 'listening' : 'idle', label: done || live ? 'Listening' : 'Tap to answer', sub: live ? 'Speak. Take your time.' : undefined, next: nextHref, showNext: done })}
      </div>`,
      mount(root) {
        const t = root.querySelector('#transcript');
        if (live) { t.querySelector('.said').textContent = sc.answer.split('. ').slice(0, 2).join('. ') + '.'; return; }
        const finish = () => {
          root.querySelector('#captured').style.display = '';
          const nb = root.querySelector('#nextBtn'); if (nb) nb.style.display = ''; root.querySelector('#intake').classList.add('has-next');
          root.querySelector('#intakeLabel').textContent = 'Listening'; root.querySelector('#intakeSub').textContent = 'Pause to finish, or keep going.';
          root.querySelector('#lanesWrap').innerHTML = lanes([...placed, gid], { names: true, landing: gid });
        };
        const start = () => {
          const halo = root.querySelector('#halo'); if (halo.dataset.state === 'listening') return;
          halo.dataset.state = 'listening'; root.querySelector('.guide .halo').dataset.state = 'idle';
          root.querySelector('#intakeLabel').textContent = 'Listening'; root.querySelector('#intakeSub').textContent = 'Speak. Take your time.';
          typeInto(t, sc.answer, { done: false, onDone: finish });
        };
        if (done) typeInto(t, sc.answer, { done: true, onDone: finish });
        const atts = g.attachments || [];
        wireIntake(root, { onStart: start, attachTarget: '#transcript', typeTarget: '#typebox', photo: atts.find((a) => a.kind === 'photo') || G.L1.attachments[0], file: atts.find((a) => a.kind === 'doc') || G.L1.attachments[1] });
      },
    };
  };

  S.lifeGoals = () => ({
    name: 'Interview · Life goals, three lanes', tip: 'The strip is at “Life”. Three lanes, three sentences in Noor’s words. Tap a sentence to change it; <b>These are mine</b> starts distilling.',
    html: `
    <div class="content sp">
      ${eyebrow('Life goals · 3 lanes', { text: 'Pause', href: '#/map' })}
      ${strip('life')}
      ${lanes(ORDER, { on: 'life' })}
      <div class="three" id="three">
        ${ORDER.map((id, i) => { const g = G[id]; return `<div class="one ${i === 0 ? 'lead' : ''}" data-id="${id}"><span class="micro nm">${esc(g.area)}</span><p class="sent">${esc(g.text)}</p></div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('interview.life_goals')}
      ${intake({ state: 'listening', label: 'Listening', sub: 'Say “change the second one,” or tap it.', next: '#/interview/level/ten_year', nextText: 'These are mine', showNext: true })}
    </div>`,
    mount(root) { wireThree(root); },
  });

  // Tap a sentence: it becomes the lead and shows an editing hint.
  function wireThree(root) {
    root.querySelectorAll('.three .one').forEach((el) => el.addEventListener('click', () => {
      root.querySelectorAll('.three .one').forEach((x) => { x.classList.remove('lead'); x.querySelector('.edit-hint')?.remove(); });
      el.classList.add('lead'); el.insertAdjacentHTML('beforeend', '<span class="small edit-hint accent">Listening for your version…</span>');
    }));
  }

  // Distilling: one horizon per screen, far to near. The strip fills Life → 10 yr → 5 yr → 1 yr → Month → Week.
  S.level = (key, edit = false) => {
    const i = DIST.indexOf(key); const L = D.LEVELS.find((l) => l.key === key);
    const parentKey = i === 0 ? 'life' : DIST[i - 1];
    const next = i < DIST.length - 1 ? `#/interview/level/${DIST[i + 1]}` : '#/interview/set';
    const filled = ['life', ...DIST.slice(0, i)];
    const method = key === 'week' ? 'interview.week' : key === 'ten_year' ? 'interview.want_vs_should' : 'interview.parent_picker';
    const short = (t) => (t.length > 30 ? `${t.slice(0, 30).trim()}…` : t);
    return {
      name: edit ? `Interview · ${L.plural} · editing` : `Interview · ${L.plural}`, tip: edit ? 'Noor tapped the first sentence and is saying her own version. The draft fades; her words replace it.' : `The <b>${L.label}</b> dot lights on the strip and fills along each lane. One sentence per life goal, shown under its parent. Tap a sentence to change it; <b>Confirm</b> moves one horizon nearer.`,
      html: `
      <div class="content sp">
        ${eyebrow(`Distilling · ${i + 1} of 5`, { text: 'Pause', href: '#/map' })}
        ${strip(key, { doneUpTo: parentKey })}
        ${lanes(ORDER, { on: key, filled, compact: true })}
        ${guide(esc(L.guide.split('. ').slice(0, 2).join('. ').replace(/\.*$/, '.')), 'idle')}
        <div class="three md" id="three">
          ${ORDER.map((id, idx) => { const g = G[id]; const editing = edit && idx === 0; return `<div class="one ${idx === 0 ? 'lead' : ''}" data-id="${id}"><span class="micro nm">${esc(g.area)} · under ${q(short(textAt(g, parentKey)))}</span>${editing ? `<div class="edit-line"><span class="old">${esc(g[key])}</span><p class="sent">${esc(EDITS[key] || g[key])}<span class="caret"></span></p></div>` : `<p class="sent">${esc(g[key])}</p>`}${key === 'week' ? `<span class="small faint ifthen">${esc(g.ifThen)}</span>` : ''}</div>`; }).join('')}
        </div>
        <div class="spacer"></div>
        ${why(edit ? 'interview.life_goals' : method)}
        ${intake({ state: 'listening', label: edit ? 'Listening for your version' : 'Listening', sub: edit ? 'Pause to keep it.' : 'Say it back, or change one.', next: edit ? `#/interview/level/${key}` : next, nextText: edit ? 'Keep this' : 'Confirm', showNext: true })}
      </div>`,
      mount(root) { wireThree(root); wireIntake(root, {}); },
    };
  };

  S.set = () => ({
    name: 'Interview · Map set', tip: 'Every dot on every lane is filled before the first day. <b>Open your map</b> goes home.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('Interview · complete')}
      ${strip('today', { doneUpTo: 'week' })}
      ${lanes(ORDER, { on: 'today', filled: STRIP.map(([k]) => k), compact: true })}
      <div class="spacer" style="flex:0.5"></div>
      <div class="stack" style="gap:8px">
        <h1 class="hz-title">Your map is set.</h1>
        <p class="sent">Three life goals, six horizons each, in your words. Tomorrow at 6:30 the guide sets today with you.</p>
      </div>
      <div class="spacer"></div>
      <div class="stack" style="gap:10px; padding-bottom:28px">
        <a class="btn primary block" href="#/map">Open your map</a>
        <a class="btn ghost block" href="#/document">Read the record</a>
      </div>
    </div>`,
  });

  // Map home: one horizon in focus. Home opens on "Life": the three life goals, in the user's words.
  S.horizon = (k) => ({
    name: k === 'life' ? 'Map home · life goals' : `Map · ${TITLE[k]}`,
    tip: k === 'life' ? 'Home. The strip is at <b>Life</b>: three life goals in Noor’s words, nothing else. Tap a dot on the strip to travel in time; tap a sentence to put that goal in focus.' : `The strip is at <b>${TITLE[k].toLowerCase()}</b>: three sentences, one per life goal. Tap a sentence for the goal in focus.`,
    html: `
    <div class="content with-tabs sp">
      ${eyebrow('Tuesday 18 Nov', { text: 'Record', href: '#/document' })}
      ${strip(k, { links: (h) => `#/map/${h}` })}
      <h1 class="hz-title">${TITLE[k]}</h1>
      <div class="three">
        ${ORDER.map((id, i) => { const g = G[id]; return `<a class="one ${i === 0 ? 'lead' : ''}" href="#/goal/${id}/${k}"><span class="micro nm">${esc(g.area)}</span><p class="sent">${esc(textAt(g, k))}</p></a>`; }).join('')}
      </div>
      <div class="spacer"></div>
      <a class="morning-row" href="#/morning/1" style="align-self:center"><div class="l"><div class="halo small" data-state="speaking" style="--size:28px"></div><span class="small" style="color:var(--color-text)">Morning course · four minutes</span></div></a>
    </div>
    ${tabs('map')}`,
  });

  // First run: the map before the interview has written anything.
  S.emptyMap = () => ({
    name: 'First run · empty map', tip: 'Before the interview. The strip exists, the lanes do not. One sentence and one action.', ambient: 'center',
    html: `
    <div class="content with-tabs sp">
      ${eyebrow('Your map')}
      ${strip('life')}
      <h1 class="hz-title">Life goals</h1>
      <div class="empty-note">
        <p class="sent">Nothing here yet. The interview writes this in your words, from life down to this week.</p>
      </div>
      <div class="spacer"></div>
      <div class="stack" style="gap:10px; padding-bottom:8px">
        <a class="btn primary block" href="#/interview/start">Start the interview</a>
        <span class="small faint center">About forty minutes. You can pause.</span>
      </div>
    </div>
    ${tabs('map')}`,
  });
  S.emptyWeek = () => ({
    name: 'First run · empty week', tip: 'The week before the first Sunday review: today is set, the rest waits for Sunday.',
    html: `
    <div class="content with-tabs sp">
      ${eyebrow('Week of 17–23 Nov', { text: 'Reviews', href: '#/reviews' })}
      <div class="days">${[['Mon', ''], ['Tue', 'on'], ['Wed', ''], ['Thu', ''], ['Fri', ''], ['Sat', ''], ['Sun', '']].map(([d, c]) => `<div class="d ${c}"><i></i><span class="micro">${d}</span></div>`).join('')}</div>
      <h1 class="hz-title">This week</h1>
      <div class="empty-note">
        <p class="sent">Your first week starts with today. Sunday’s review picks three priorities, one per life goal.</p>
      </div>
      <div class="wk" style="padding-top:6px">
        <a class="it" href="#/goal/L1/today"><span class="micro">Today</span><div class="stack" style="gap:3px"><span class="sent">${esc(G.L1.today)}</span><span class="small">for ${q(G.L1.week)}</span></div></a>
      </div>
      <div class="spacer"></div>
      <a class="btn ghost compact" href="#/review/1" style="align-self:center">Set the week now</a>
    </div>
    ${tabs('week')}`,
  });

  // Nudges: the lock-screen notification and the in-app nudge over the map.
  S.nudgeLock = () => ({
    name: 'Nudge · lock screen', tip: 'The morning notification. One line, the time, nothing to tap but the app.', ambient: 'center',
    html: `
    <div class="lock">
      <span class="date">Tuesday 18 November</span>
      <span class="time">6:30</span>
      <div class="notif">
        <div class="halo small" data-state="speaking" style="--size:36px"></div>
        <div class="t">
          <div class="row"><span class="micro">LIFE GOALS</span><span class="micro">now</span></div>
          <span class="body">Good morning, Noor. Four minutes to set today.</span>
          <span class="small">Three life goals, three steps. Yesterday’s run moved.</span>
        </div>
      </div>
      <a class="hint small" href="#/morning/1">Tap the notification to open the morning course</a>
    </div>`,
    mount(root) { root.querySelector('.notif').addEventListener('click', () => { location.hash = '#/morning/1'; }); },
  });
  S.nudgeInApp = () => ({
    name: 'Nudge · in app', tip: 'Thursday 17:20. The if-then fires ten minutes before its time, over the map. Two answers, or speak.',
    html: `
    <div class="dim" style="display:contents">
    <div class="content with-tabs sp">
      ${eyebrow('Thursday 20 Nov', { text: 'Record', href: '#/document' })}
      ${strip('today', { links: (h) => `#/map/${h}` })}
      <h1 class="hz-title">Today</h1>
      <div class="three">
        ${ORDER.map((id, i) => { const g = G[id]; return `<a class="one ${i === 0 ? 'lead' : ''}" href="#/goal/${id}/today"><span class="micro nm">${esc(g.area)}</span><p class="sent">${esc(g.today)}</p></a>`; }).join('')}
      </div>
    </div>
    </div>
    <div class="sheet">
      <div class="top">
        <div class="halo small" data-state="speaking" style="--size:32px"></div>
        <p class="sent">It is 17:20. Didsbury at 17:30, straight from work. Still on?</p>
      </div>
      <span class="small faint" style="padding-left:44px">for ${q(G.L1.week)}</span>
      <div class="ctrl" style="padding-left:44px"><a class="chip on" href="#/map/today">On my way</a><a class="chip" href="#/talk/why">Move it</a></div>
    </div>
    ${tabs('map')}`,
  });

  // Goal in focus: one life goal as the headline; the strip picks the horizon; one sentence.
  S.goal = (id, k = 'week') => {
    const g = G[id] || G.L1; const idx = ORDER.indexOf(g.id);
    return {
      name: `Goal in focus · ${g.area}`, tip: 'One life goal as the headline; the strip beneath picks the horizon; one sentence. Tap the strip to travel in time; the dots below swap goals.',
      html: `
      <div class="content with-tabs sp">
        ${eyebrow(`${esc(g.area)} · ${idx + 1} of 3`, { text: 'Map', href: '#/map' })}
        <div class="spacer" style="flex:0.4"></div>
        <h1 class="hz-life">${esc(g.text)}</h1>
        <div class="spacer" style="flex:0.4"></div>
        ${strip(k, { links: (h) => `#/goal/${g.id}/${h}` })}
        <div class="stack" style="gap:8px">
          <p class="sent big">${esc(textAt(g, k))}</p>
          ${k === 'today' ? `<p class="small faint">first two minutes · ${esc(g.firstTwo)}</p>` : k === 'week' ? `<p class="small faint">${esc(g.ifThen)}</p>` : k === 'life' ? `<p class="small faint quote">${q(g.why)}</p>` : ''}
        </div>
        <div class="spacer"></div>
        <div class="deck-dots">${ORDER.map((x) => `<a href="#/goal/${x}/${k}"><i class="${x === g.id ? 'on' : ''}"></i></a>`).join('')}</div>
      </div>
      ${tabs('map')}`,
    };
  };

  S.document = () => ({
    name: 'Life goals document', tip: 'The living record: every horizon, every goal, in Noor’s phrasing; photos and files as footnotes. Tap a line to edit; speak the change or type it.',
    html: `
    <div class="content with-tabs" style="gap:12px">
      ${eyebrow('The record', { text: 'Map', href: '#/map' })}
      <div class="stack" style="gap:2px"><h1 class="title">In your words.</h1><span class="small faint">Written 2 Nov · changed Sunday · tap a line to edit</span></div>
      <div class="scroll"><div class="doc">
        ${ORDER.map((id, idx) => { const g = G[id]; return `
        <div class="sec">
          <span class="micro label">${esc(g.area)}</span>
          <a class="docline life" href="#/goal/${id}/life"><span class="micro">Life</span><span class="t">${esc(g.text)}</span></a>
          <p class="small passage">${q(g.scene)}<br>${q(g.why)}</p>
          <div class="docline"><span class="micro">10 yr</span><span class="t small">${esc(g.ten_year)}</span></div>
          <div class="docline"><span class="micro">5 yr</span><span class="t small">${esc(g.five_year)}</span></div>
          <div class="docline"><span class="micro">1 yr</span><span class="t small">${esc(g.one_year)}${(g.attachments || []).length ? `<sup class="accent" style="font-size:9px"> ${g.attachments.map((a, j) => j + 1).join(',')}</sup>` : ''}</span></div>
          <div class="docline"><span class="micro">Month</span><span class="t small ${idx === 0 ? 'edit' : ''}">${esc(g.month)}${idx === 0 ? ' <span class="micro">· editing</span>' : ''}</span></div>
          <div class="docline"><span class="micro">Week</span><span class="t small">${esc(g.week)}</span></div>
          <div class="docline"><span class="micro">If…</span><span class="t small">${esc(g.ifThen)}</span></div>
          ${(g.attachments || []).length ? `<div class="docline"><span class="micro">Notes</span><span class="t small faint">${g.attachments.map((a, j) => `${j + 1} ${esc(a.name)}`).join(' · ')}</span></div>` : ''}
        </div>`; }).join('')}
      </div></div>
      <div class="composer" style="padding-bottom:6px">
        <div class="halo small" data-state="listening"></div>
        <div class="input">Say “change this month’s clinic step”</div>
      </div>
    </div>
    ${tabs('map')}`,
    mount(root) {
      root.querySelectorAll('.docline:not(.life)').forEach((el) => el.addEventListener('click', () => {
        root.querySelectorAll('.docline .t.edit').forEach((t) => { t.classList.remove('edit'); t.querySelector('.micro')?.remove(); });
        const t = el.querySelector('.t'); t.classList.add('edit'); t.insertAdjacentHTML('beforeend', ' <span class="micro">· editing</span>');
      }));
    },
  });

  // ---------- Morning course (four steps) ----------
  S.morning1 = () => ({
    name: 'Morning · Hear the thread', tip: 'The guide says each life goal and today’s step under it, then asks Noor to say it back.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('Morning · 1 of 4 · 6:31', { text: 'Later', href: '#/map' })}
      ${strip('today')}
      <div class="player" style="padding-top:0; gap:14px">
        <div class="halo medium" data-state="speaking"></div>
        <p class="spoken" style="font-size:20px; line-height:27px">Good morning, Noor. Three life goals, three steps.</p>
      </div>
      <div class="three">
        ${ORDER.map((id) => { const g = G[id]; return `<div class="one"><span class="micro nm">${esc(g.area)}</span><p class="sent" style="font-size:18px; line-height:25px">${esc(g.today)}</p></div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('morning.hear_goals')}
      ${intake({ state: 'idle', label: 'Say them back', sub: 'When I stop.', next: '#/morning/2', nextText: 'Yesterday', showNext: true })}
    </div>`,
  });

  S.morning2 = () => {
    const g = G.L3;
    return {
      name: 'Morning · Correct the drift', tip: 'Yesterday’s run slipped. A miss gets a step, not a verdict. Pick an option, or say it.',
      html: `
      <div class="content sp">
        ${eyebrow('Morning · 2 of 4 · yesterday', { text: 'Later', href: '#/map' })}
        ${guide('Yesterday’s run did not happen; Maya was up at five. Two of three runs still hold. What is today’s step?', 'speaking')}
        <div class="stack" style="gap:6px">
          <span class="micro nm faint">${esc(g.area)} · this week</span>
          <p class="sent">${esc(g.week)}</p>
          <p class="small faint" style="text-decoration:line-through">${esc(g.yesterday.text)}</p>
        </div>
        <div class="ctrl">
          <a class="chip on" href="#/morning/3">Run today, before Maya wakes</a>
          <a class="chip" href="#/morning/3">Move it to Thursday</a>
          <a class="chip" href="#/morning/3">Two runs is this week</a>
        </div>
        <div class="spacer"></div>
        ${why('morning.correction')}
        ${intake({ state: 'listening', label: 'Listening', sub: 'Or just say it.' })}
      </div>`,
    };
  };

  S.morning3 = (done) => {
    const g = G.L1;
    return {
      name: 'Morning · Set today’s heading', tip: 'Noor names today’s one thing for the clinic; the chain it serves appears before it can be saved. The if-then is said in the same breath.',
      html: `
      <div class="content sp">
        ${eyebrow('Morning · 3 of 4 · today', { text: 'Later', href: '#/map' })}
        ${guide('The clinic. This week is three rooms. What is today’s one thing, and when?', 'idle')}
        <div class="typebox" id="typebox" style="display:none"><span class="ph">Type today’s step…</span></div>
        <p class="transcript sp" id="transcript"><span class="said"></span><span class="caret"></span></p>
        <div class="chain reveal" id="captured" style="display:none">
          <span class="micro label">serves</span>
          <div class="r"><span class="micro">Week</span><span class="small">${esc(g.week)}</span></div>
          <div class="r"><span class="micro">Month</span><span class="small">${esc(g.month)}</span></div>
          <div class="r far"><span class="micro">Life</span><span class="small">${esc(g.text)}</span></div>
        </div>
        <div class="spacer"></div>
        ${why('morning.obstacle_if_then')}
        ${intake({ state: done ? 'listening' : 'idle', label: done ? 'Listening' : 'Tap to answer', sub: 'First two minutes, and the if-then.', next: '#/morning/4', showNext: done })}
      </div>`,
      mount(root) {
        const t = root.querySelector('#transcript');
        const text = `Call the Didsbury practice and book a viewing for Thursday. ${g.ifThen}`;
        const finish = () => { root.querySelector('#captured').style.display = ''; root.querySelector('#nextBtn').style.display = ''; root.querySelector('#intake').classList.add('has-next'); };
        const start = () => { const halo = root.querySelector('#halo'); if (halo.dataset.state === 'listening') return; halo.dataset.state = 'listening'; root.querySelector('#intakeLabel').textContent = 'Listening'; typeInto(t, text, { done: false, onDone: finish }); };
        if (done) typeInto(t, text, { done: true, onDone: finish });
        wireIntake(root, { onStart: start, typeTarget: '#typebox', attachTarget: '#transcript', photo: g.attachments[0], file: g.attachments[1] });
      },
    };
  };

  S.morning4 = () => ({
    name: 'Morning · Today is set', tip: 'Three steps, each with its if-then. <b>Open the map</b> returns home.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('Morning · 4 of 4')}
      ${strip('today')}
      <h1 class="hz-title">Today is set.</h1>
      <div class="three">
        ${ORDER.map((id) => { const g = G[id]; return `<a class="one" href="#/goal/${id}/today"><span class="micro nm">${esc(g.area)}</span><p class="sent" style="font-size:18px; line-height:25px; color:var(--color-text)">${esc(g.today)}</p><span class="small faint">${esc(g.ifThen)}</span></a>`; }).join('')}
      </div>
      <div class="spacer"></div>
      <div class="stack" style="gap:10px; padding-bottom:28px">
        <a class="btn primary block" href="#/map">Open the map</a>
        <span class="small faint" style="text-align:center">Four minutes. See you tomorrow at 6:30.</span>
      </div>
    </div>`,
  });

  // ---------- Week: the seven days, with the three priorities placed ----------
  S.week = () => ({
    name: 'Week', tip: 'The week as seven days; the three priorities placed where they happen. Tap one to open its goal at “week”.',
    html: `
    <div class="content with-tabs sp">
      ${eyebrow('Week of 17–23 Nov', { text: 'Reviews', href: '#/reviews' })}
      <div class="days">${[['Mon', 'has'], ['Tue', 'on'], ['Wed', 'has'], ['Thu', 'has'], ['Fri', ''], ['Sat', 'has'], ['Sun', '']].map(([d, c]) => `<div class="d ${c}"><i></i><span class="micro">${d}</span></div>`).join('')}</div>
      <h1 class="hz-title">This week</h1>
      <div class="wk">
        ${[['L1', 'Thu', 'Visit three rooms; Didsbury at 17:30.'], ['L2', 'Wed', 'The hours conversation with Priya, after handover.'], ['L3', 'Tue Thu Sat', 'Three runs. Tuesday’s is today, before Maya wakes.']].map(([id, when, t]) => { const g = G[id]; return `<a class="it" href="#/goal/${id}/week"><span class="micro">${when}</span><div class="stack" style="gap:3px"><span class="sent">${esc(t)}</span><span class="small">for ${q(g.month)}</span></div></a>`; }).join('')}
      </div>
      <div class="spacer"></div>
      <span class="micro faint center">Two of three last week · one correction</span>
    </div>
    ${tabs('week')}`,
  });

  // ---------- Talk it through ----------
  S.talk = () => ({
    name: 'Talk It Through', tip: 'Four questions the guide answers. Pick one, speak, type, or show a photo or file.', ambient: 'center',
    html: `
    <div class="content with-tabs sp">
      ${eyebrow('Talk it through', { text: 'Map', href: '#/map' })}
      <div class="spacer"></div>
      <div class="voice-state" style="gap:28px">
        <div class="halo large" data-state="listening"></div>
        <p class="spoken" style="max-width:320px; text-align:center">What is on your mind?</p>
      </div>
      <div class="spacer"></div>
      <div class="ctrl" style="justify-content:center">${Object.entries(D.talks).map(([k, t]) => `<a class="chip" href="#/talk/${k}">${t.chip}</a>`).join('')}</div>
      ${intake({ state: 'listening', label: 'Listening', sub: 'I answer from your words and end with one step.' })}
    </div>
    ${tabs('talk')}`,
  });

  S.talkAnswer = (k) => {
    const t = D.talks[k] || D.talks.now; const g = G[t.next.goal];
    return {
      name: `Talk · ${t.chip}`, tip: 'The answer threads to Noor’s words and ends in one step with a time. <b>Set it</b> puts it on today.',
      html: `
      <div class="content with-tabs sp" style="gap:18px">
        ${eyebrow(`Talk · ${t.chip}`, { text: 'Map', href: '#/map' })}
        <div class="user small">${esc(t.user)}</div>
        <div class="answer">
          <div class="halo inline" data-state="speaking" style="margin-top:7px"></div>
          <div class="stack" style="gap:8px">
            <p class="small q" style="font-size:15px; line-height:22px">${esc(t.guide)}</p>
            <p class="small cite">${q(t.cite)}</p>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="stack" style="gap:6px">
          <span class="micro label">Next step · ${esc(t.next.by)} · ${esc(g.area)}</span>
          <p class="sent">${esc(t.next.text)}</p>
        </div>
        <div class="row"><a class="btn ghost compact" href="#/talk" style="margin-left:-12px">Not that</a><a class="btn primary compact" href="#/map/today">Set it</a></div>
        ${why(t.method)}
      </div>
      ${tabs('talk')}`,
    };
  };

  // ---------- Reviews ----------
  S.reviews = () => ({
    name: 'Reviews', tip: 'The review cadences; each re-reads a horizon on the strip. Quarterly is a review, not a goal level.',
    html: `
    <div class="content with-tabs sp">
      ${eyebrow('Reviews', { text: 'Map', href: '#/map' })}
      ${strip('month')}
      <h1 class="hz-title">On a rhythm.</h1>
      <div class="ql">
        <a class="it" href="#/morning/1"><span class="micro">Every morning · 4 min</span><span class="sent">Set today under the week.</span></a>
        <a class="it" href="#/review/1"><span class="micro">Sunday · 12 min</span><span class="sent">Close the week, pick three.</span></a>
        <a class="it" href="#/quarter"><span class="micro ok">Quarterly · due · 25 min</span><span class="sent">Re-read the year and the month.</span></a>
        <a class="it" href="#/quarter"><span class="micro">Yearly · 1 hr</span><span class="sent">Re-read the ten and the five.</span></a>
      </div>
    </div>
    ${tabs('map')}`,
  });

  S.review1 = () => ({
    name: 'Weekly Review · Close the week', tip: 'One sentence per priority, no verdicts. <b>Next week</b> continues.',
    html: `
    <div class="content sp">
      ${eyebrow('Weekly review · 1 of 3', { text: 'Later', href: '#/map' })}
      ${guide('Three priorities this week. One sentence on each. No verdicts, just what happened.', 'speaking')}
      <div class="ql">
        ${D.lastWeek.map((p) => { const g = G[p.goal]; return `<div class="it"><span class="micro ${p.status === 'done' ? 'ok' : ''}">${esc(g.area)} · ${p.status === 'done' ? 'done' : 'carried'}</span><span class="sent">${esc(p.text)}</span><span class="small">${esc(p.note)}</span></div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('review.close_week')}
      ${intake({ state: 'listening', label: 'Listening', sub: 'Say what happened.', next: '#/review/2', nextText: 'Next week', showNext: true })}
    </div>`,
  });

  S.review2 = () => ({
    name: 'Weekly Review · Pick three (orphan gate)', tip: 'Three priorities, each under a monthly goal. The fourth has no goal above it and cannot be saved; attach it or leave it off.',
    html: `
    <div class="content sp" style="gap:18px">
      ${eyebrow('Weekly review · 2 of 3', { text: 'Later', href: '#/map' })}
      ${guide('Three for next week, each under a monthly goal. You said four.', 'idle')}
      <div class="ql" style="gap:14px">
        ${[['L1', 'View Didsbury Thursday; if it fits, ask for the contract.'], ['L2', 'Hours conversation with Priya, Wednesday after handover.'], ['L3', 'Two runs, Tuesday and Thursday at six.']].map(([id, t]) => { const g = G[id]; return `<div class="it"><span class="micro ok">${esc(g.area)} · under “${esc(g.month.slice(0, 40).trim())}…”</span><span class="sent" style="font-size:17px; line-height:24px">${esc(t)}</span></div>`; }).join('')}
        <div class="it"><span class="micro" id="gateLabel">No goal above it · cannot go on the week</span><span class="sent" style="font-size:17px; line-height:24px; color:var(--color-text-muted)">Sort out the car insurance.</span>
          <div class="ctrl" id="parents" style="padding-top:6px">${ORDER.map((id) => `<span class="chip" data-id="${id}">Attach to ${esc(G[id].area.toLowerCase())}</span>`).join('')}<span class="chip" data-id="off">Leave it off</span></div>
        </div>
      </div>
      <div class="spacer"></div>
      ${why('review.pick_three')}
      <div class="footbar">
        <div class="halo small" data-state="listening"></div>
        <a class="btn primary compact" id="setBtn" href="#/review/3" style="opacity:0.4; pointer-events:none">Set the week</a>
      </div>
    </div>`,
    mount(root) {
      root.querySelectorAll('#parents .chip').forEach((c) => c.addEventListener('click', () => {
        root.querySelectorAll('#parents .chip').forEach((x) => x.classList.remove('on')); c.classList.add('on');
        const l = root.querySelector('#gateLabel'); l.textContent = c.dataset.id === 'off' ? 'Left off · nothing orphaned on the week' : `Attached · under ${G[c.dataset.id].area.toLowerCase()}`; l.classList.add('ok');
        const b = root.querySelector('#setBtn'); b.style.opacity = ''; b.style.pointerEvents = '';
      }));
    },
  });

  S.review3 = () => ({
    name: 'Weekly Review · Week set', tip: 'Three priorities with when and where. <b>Done</b> returns to the map.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('Weekly review · 3 of 3')}
      <div class="days">${[['Mon', ''], ['Tue', 'has'], ['Wed', 'has'], ['Thu', 'has'], ['Fri', ''], ['Sat', ''], ['Sun', '']].map(([d, c]) => `<div class="d ${c}"><i></i><span class="micro">${d}</span></div>`).join('')}</div>
      <h1 class="hz-title">Next week is set.</h1>
      <div class="wk">
        ${[['L1', 'Thu 17:30', 'View Didsbury; if it fits, ask for the contract.'], ['L2', 'Wed 15:45', 'Hours conversation with Priya, after handover.'], ['L3', 'Tue · Thu', 'Two runs at six. Shoes by the door.']].map(([id, when, t]) => { const g = G[id]; return `<a class="it" href="#/goal/${id}/week"><span class="micro">${when}</span><div class="stack" style="gap:3px"><span class="sent">${esc(t)}</span><span class="small">for ${q(g.month)}</span></div></a>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('review.if_then')}
      <div class="stack" style="gap:10px; padding-bottom:28px"><a class="btn primary block" href="#/map">Done</a></div>
    </div>`,
  });

  S.quarter = () => ({
    name: 'Quarterly Review', tip: 'The strip is at one year. For each lane: is the year still the year, and did the months move it? Name the drift, re-aim the month.',
    html: `
    <div class="content sp">
      ${eyebrow('Quarterly review · Q4', { text: 'Later', href: '#/reviews' })}
      ${strip('one_year')}
      ${guide('Three months in. Is the year still the year?', 'speaking')}
      <div class="ql" style="gap:16px">
        ${[['L1', 'ok', 'on the year', 'Twelve regulars of twenty; the month is “sign a room.”'], ['L2', '', 'drifted', 'Pick-up is one day, not three. The hours talk slipped twice.'], ['L3', 'ok', 'on the year', 'Three runs most weeks; rehab finished.']].map(([id, st, lbl, note]) => { const g = G[id]; return `<div class="it"><span class="micro ${st}">${esc(g.area)} · ${lbl}</span><span class="sent" style="font-size:17px; line-height:24px">${esc(g.one_year)}</span><span class="small">${esc(note)}</span></div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${intake({ state: 'listening', label: 'Listening', sub: 'Say where you are on each.', next: '#/map/month', nextText: 'Re-aim the month', showNext: true })}
    </div>`,
  });

  // ---------- Settings ----------
  S.settings = () => ({
    name: 'Settings', tip: 'Demo persona toggle, rhythm, voice and intake, evidence notes, data.',
    html: `
    <div class="content with-tabs" style="gap:0">
      ${eyebrow('Settings', { text: 'Map', href: '#/map' })}
      <div class="scroll" style="margin-top:8px">
      <div class="section" style="padding-top:12px">
        <span class="label">Demo</span>
        <div class="srow"><div class="t"><span class="body">Demo persona</span><span class="small">Noor Haddad, physiotherapist. Turn off to start your own interview.</span></div><span class="switch on" data-toggle></span></div>
      </div>
      <div class="section">
        <span class="label">Rhythm</span>
        <div class="srow"><div class="t"><span class="body">Morning course</span><span class="small">Four minutes, spoken</span></div><span class="small val">6:30</span></div>
        <div class="srow"><div class="t"><span class="body">Weekly review</span><span class="small">Close the week, set the next</span></div><span class="small val">Sunday</span></div>
        <div class="srow"><div class="t"><span class="body">Quarterly review</span><span class="small">Re-read the year and the month</span></div><span class="small val">First Sunday</span></div>
      </div>
      <div class="section">
        <span class="label">Voice and intake</span>
        <div class="srow"><div class="t"><span class="body">Guide voice</span><span class="small">Low, unhurried</span></div><span class="small val">Sage</span></div>
        <div class="srow"><div class="t"><span class="body">Photos and files</span><span class="small">Read into the record, kept on device</span></div><span class="switch on" data-toggle></span></div>
        <div class="srow"><div class="t"><span class="body">Why this step</span><span class="small">Show the evidence note and confidence tag</span></div><span class="switch on" data-toggle></span></div>
      </div>
      <div class="section">
        <span class="label">Your words</span>
        <div class="srow"><div class="t"><span class="body">Export the record</span><span class="small">Plain text, every horizon</span></div><span class="micro accent">Export</span></div>
        <div class="srow" style="border-bottom:0"><div class="t"><span class="body">Delete everything</span><span class="small">On this device and the account</span></div><span class="micro faint">Delete</span></div>
      </div>
      </div>
    </div>
    ${tabs('map')}`,
    mount(root) { root.querySelectorAll('[data-toggle]').forEach((s) => s.addEventListener('click', () => s.classList.toggle('on'))); },
  });

  // ---------- Router ----------
  const ROUTES = [
    { path: '/welcome', screen: () => S.welcome(), group: 'Onboarding', label: 'Welcome' },
    { path: '/interview/start', screen: () => S.start(), group: 'Interview', label: 'Start' },
    { path: '/interview/scene/1', screen: (p) => S.scene(1, p.done, p.live), label: 'Scene · Work' },
    { path: '/interview/scene/2', screen: (p) => S.scene(2, p.done, p.live), label: 'Scene · Relationships' },
    { path: '/interview/scene/3', screen: (p) => S.scene(3, p.done, p.live), label: 'Scene · Body (end of life)' },
    { path: '/interview/life-goals', screen: () => S.lifeGoals(), label: 'Life goals · three lanes' },
    { path: '/interview/level/ten_year', screen: () => S.level('ten_year'), label: 'Distil · 10 years' },
    { path: '/interview/level/five_year', screen: () => S.level('five_year'), label: 'Distil · 5 years' },
    { path: '/interview/level/one_year', screen: () => S.level('one_year'), label: 'Distil · 1 year' },
    { path: '/interview/level/month', screen: (p) => S.level('month', p.edit), label: 'Distil · This month' },
    { path: '/interview/level/week', screen: () => S.level('week'), label: 'Distil · This week' },
    { path: '/interview/set', screen: () => S.set(), label: 'Map set' },
    { path: '/map', screen: () => S.horizon('life'), group: 'Every day', label: 'Map home · life goals' },
    { path: '/map/week', screen: () => S.horizon('week'), label: 'Horizon in focus · this week' },
    { path: '/goal/L1/week', screen: () => S.goal('L1', 'week'), label: 'Goal in focus' },
    { path: '/document', screen: () => S.document(), label: 'The record' },
    { path: '/morning/1', screen: () => S.morning1(), group: 'Morning course', label: 'Hear the thread' },
    { path: '/morning/2', screen: () => S.morning2(), label: 'Correct the drift' },
    { path: '/morning/3', screen: (p) => S.morning3(p.done), label: 'Set today’s heading' },
    { path: '/morning/4', screen: () => S.morning4(), label: 'Today is set' },
    { path: '/week', screen: () => S.week(), group: 'Week and talk', label: 'Week' },
    { path: '/talk', screen: () => S.talk(), label: 'Talk it through' },
    { path: '/talk/now', screen: () => S.talkAnswer('now'), label: 'Talk · answer' },
    { path: '/talk/why', screen: () => S.talkAnswer('why'), hidden: true },
    { path: '/talk/first', screen: () => S.talkAnswer('first'), hidden: true },
    { path: '/talk/course', screen: () => S.talkAnswer('course'), hidden: true },
    { path: '/reviews', screen: () => S.reviews(), group: 'Reviews', label: 'Review cadences' },
    { path: '/review/1', screen: () => S.review1(), label: 'Weekly · close the week' },
    { path: '/review/2', screen: () => S.review2(), label: 'Weekly · pick three, orphan gate' },
    { path: '/review/3', screen: () => S.review3(), label: 'Weekly · week set' },
    { path: '/quarter', screen: () => S.quarter(), label: 'Quarterly review' },
    { path: '/settings', screen: () => S.settings(), group: 'Settings', label: 'Settings' },
    { path: '/empty/map', screen: () => S.emptyMap(), group: 'First run and nudges', label: 'First run · empty map' },
    { path: '/empty/week', screen: () => S.emptyWeek(), label: 'First run · empty week' },
    { path: '/nudge/lock', screen: () => S.nudgeLock(), label: 'Nudge · lock screen' },
    { path: '/nudge/inapp', screen: () => S.nudgeInApp(), label: 'Nudge · in app' },
  ];
  window.ROUTES = ROUTES;

  const screenEl = document.getElementById('screen');
  const ambientEl = document.getElementById('ambient');
  const noteEl = document.getElementById('stageNote');
  const navEl = document.getElementById('railNav');

  function parseHash() {
    const raw = location.hash.replace(/^#/, '') || '/welcome';
    const [path, qs] = raw.split('?');
    const sp = new URLSearchParams(qs || '');
    return { path, p: { done: sp.get('done') === '1', live: sp.get('live') === '1', edit: sp.get('edit') === '1' } };
  }

  function resolve(path) {
    const r = ROUTES.find((x) => x.path === path);
    if (r) return r;
    let m = path.match(/^\/goal\/(L[123])\/(\w+)$/);
    if (m && TITLE[m[2]]) return { path, screen: () => S.goal(m[1], m[2]), nav: '/goal/L1/week' };
    m = path.match(/^\/map\/(\w+)$/);
    if (m && TITLE[m[1]]) return { path, screen: () => S.horizon(m[1]), nav: m[1] === 'week' ? '/map/week' : '/map' };
    return ROUTES[0];
  }

  function render() {
    stopTyping();
    const { path, p } = parseHash();
    const route = resolve(path);
    const scr = route.screen(p);
    ambientEl.className = `ambient ${scr.ambient || ''}`;
    screenEl.innerHTML = scr.html;
    scr.mount && scr.mount(screenEl);
    noteEl.innerHTML = `<b>${scr.name}</b> — ${scr.tip}`;
    document.title = `${scr.name} · Life Goals`;
    const navPath = route.nav || route.path;
    navEl.querySelectorAll('a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === `#${navPath}`));
  }

  function buildNav() {
    let html = '<div class="h">Journey</div>'; let i = 0;
    ROUTES.forEach((r) => {
      if (r.hidden) return; i += 1;
      if (r.group) html += `<div class="h" style="padding-top:14px">${r.group}</div>`;
      html += `<a href="#${r.path}"><i>${String(i).padStart(2, '0')}</i><span>${r.label}</span></a>`;
    });
    navEl.innerHTML = html;
  }

  buildNav();
  window.addEventListener('hashchange', render);
  render();
})();
