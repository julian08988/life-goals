/* Life Goals — clickable UI flow prototype. Hash-routed, no build step. */
(() => {
  const D = window.DATA;
  const G = D.goals;
  const ORDER = ['L1', 'L2', 'L3'];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  if (params.get('bare') === '1') document.body.classList.add('bare');

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const q = (s) => `“${esc(s)}”`;

  // ---------- Small building blocks ----------
  const status = () => '';
  const eyebrow = (label, right = '') =>
    `<div class="eyebrow"><span class="label">${label}</span>${right ? `<a class="btn ghost compact" style="margin-right:-12px" href="${right.href}">${right.text}</a>` : ''}</div>`;
  const guide = (text, state = 'idle') =>
    `<div class="guide"><div class="halo inline" data-state="${state}"></div><p class="heading">${text}</p></div>`;
  const why = (key) => {
    const m = D.methods[key];
    return `<div class="why"><span class="small">${esc(m.note)}</span><span class="tag ${m.tag}">${m.tag}</span></div>`;
  };
  const tabs = (on) =>
    `<div class="tabs">${[['map', 'Map', '#/map'], ['talk', 'Talk', '#/talk'], ['week', 'Week', '#/week']]
      .map(([k, l, h]) => `<a class="tab ${on === k ? 'on' : ''}" href="${h}"><i></i><span class="label">${l}</span></a>`).join('')}</div>`;

  // Interview progress rail: Words → Life → 5 yr → 1 yr → 6 mo → Month → Week → Today
  const RAIL = [['words', 'Words'], ['life', 'Life'], ['five_year', '5 yr'], ['one_year', '1 yr'], ['six_month', '6 mo'], ['month', 'Month'], ['week', 'Week'], ['today', 'Today']];
  const railH = (current) => {
    const idx = RAIL.findIndex(([k]) => k === current);
    return `<div class="rail-h">${RAIL.map(([k, l], i) =>
      `<div class="n ${i < idx ? 'lit' : i === idx ? 'lit' : i === idx + 1 ? 'next' : ''}"><i></i><span class="micro">${l}</span></div>`).join('')}</div>`;
  };

  const LEVEL_SHORT = { today: 'Today', week: 'This week', month: 'This month', six_month: '6 mo', one_year: '1 year', five_year: '5 years', life: 'Life goal', words: 'Your words' };

  // Full bottom-up thread for one life goal, dense two-column variant.
  const threadFor = (g, { litToday = true, doneToday = false, full = false } = {}) => {
    const rows = [
      ['today', g.today, 'body', litToday ? 'lit' : ''],
      ['week', g.week, 'small', ''],
      ['month', g.month, 'small', ''],
      ['six_month', g.six_month, 'small', ''],
      ['one_year', g.one_year, 'small', ''],
      ['five_year', g.five_year, 'small', ''],
      ['life', g.text, 'body', ''],
    ];
    const nodes = rows.map(([k, t, cls, dot]) =>
      `<a class="node ${k === 'today' && doneToday ? 'done' : ''} ${k === 'life' ? 'lifegoal' : ''}" href="#/document" title="Open in the document"><span class="label">${LEVEL_SHORT[k]}</span><div class="rail"><span class="dot ${dot}"></span><span class="line"></span></div><div class="text"><span class="${cls}">${esc(t)}</span></div></a>`
    ).join('');
    const words = `<a class="node words" href="#/document"><span class="label">Your words</span><div class="rail"><span class="dot end"></span>${full ? '<span class="line"></span>' : ''}</div><div class="text"><span class="small">${q(g.scene)}</span></div></a>`;
    const reason = full ? `<a class="node reason" href="#/document"><span class="label">Why</span><div class="rail"><span class="dot end"></span></div><div class="text"><span class="small">${q(g.why)}</span></div></a>` : '';
    return `<div class="thread cols ${full ? "full" : ""}">${nodes}${words}${reason}</div>`;
  };

  const course = (right = 'One correction') =>
    `<div class="course"><div class="row" style="gap:14px; align-items:center"><span class="label" style="white-space:nowrap">Course</span>
      <svg viewBox="0 0 260 28" preserveAspectRatio="none" style="flex:1; height:24px">
        <line x1="0" y1="20" x2="260" y2="20" stroke="rgba(255,255,255,0.08)" />
        <path d="M0 19 C 30 18, 55 17, 80 16 S 125 18, 145 17.5 S 190 11, 220 9 S 250 7, 260 6" fill="none" stroke="#9FD3FF" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="145" cy="17.5" r="3" fill="#07080B" stroke="#4FA3E3" stroke-width="1" />
        <circle cx="260" cy="6" r="2.5" fill="#9FD3FF" />
      </svg><span class="micro faint" style="white-space:nowrap">${right}</span></div></div>`;

  // Typing simulation. Returns markup; `typeInto` animates after mount.
  const typingState = {};
  function typeInto(el, full, { done, onDone, speed = 22 }) {
    const said = el.querySelector('.said');
    const caret = el.querySelector('.caret');
    if (done || reduced) { said.textContent = full; if (caret) caret.remove(); onDone && onDone(true); return; }
    let i = 0;
    const words = full.split(' ');
    const tick = () => {
      if (i >= words.length) { caret && caret.remove(); onDone && onDone(false); return; }
      said.textContent = words.slice(0, i + 1).join(' ');
      i += 1;
      typingState.timer = setTimeout(tick, speed * (words[i - 1] || '').length + 60);
    };
    tick();
  }
  const stopTyping = () => { if (typingState.timer) clearTimeout(typingState.timer); typingState.timer = null; };

  // ---------- Screens ----------
  const S = {};

  S.welcome = () => ({
    name: 'Welcome', tip: 'Tap <b>Begin</b>.',
    ambient: 'center',
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
        <a class="btn primary block" href="#/interview/scene/1">Begin</a>
        <span class="small faint">About forty minutes, spoken. You can pause any time.</span>
      </div>
    </div>`,
  });

  S.scene = (n, done) => {
    const sc = D.scenes[n - 1];
    const nextHref = n < 3 ? `#/interview/scene/${n + 1}` : '#/interview/life-goals';
    const method = sc.kind === 'End-of-life scene' ? 'interview.end_of_life_scene' : 'interview.near_term_scene';
    return {
      name: `Interview · ${sc.area}`, tip: 'Tap the <b>halo</b> to speak. Noor’s answer is typed in for the demo; the life goal is lifted out live.',
      html: `
      <div class="content iv">
        ${eyebrow(`${sc.kind} · ${sc.step} · ${sc.area}`, { text: 'Pause', href: '#/map' })}
        ${railH('words')}
        ${guide(esc(sc.question), done ? 'idle' : 'speaking')}
        <p class="transcript" id="transcript"><span class="said"></span><span class="caret"></span></p>
        <div class="captured reveal" id="captured" style="display:none">
          <span class="micro label">Life goal, in your words</span>
          <span class="body">${esc(sc.captures.text)}</span>
          <span class="small">from ${q(sc.captures.from)}</span>
        </div>
        <div class="spacer"></div>
        ${why(method)}
        <div class="listen">
          <div class="left">
            <div class="halo medium" data-state="${done ? 'listening' : 'idle'}" id="halo"></div>
            <div class="stack" style="gap:2px">
              <span class="body" id="listenLabel">${done ? 'Listening' : 'Tap to answer'}</span>
              <span class="small faint" id="listenSub">${done ? 'Pause to finish, or keep going.' : 'Speak. Take your time.'}</span>
            </div>
          </div>
          <a class="btn ${done ? 'secondary' : 'ghost'} compact" id="nextBtn" href="${nextHref}" style="${done ? '' : 'display:none'}">Next</a>
          <a class="btn ghost compact" id="typeBtn" href="${nextHref}" style="margin-right:-12px; ${done ? 'display:none' : ''}">Type instead</a>
        </div>
      </div>`,
      mount(root) {
        const halo = root.querySelector('#halo');
        const t = root.querySelector('#transcript');
        const cap = root.querySelector('#captured');
        const finish = () => {
          cap.style.display = '';
          root.querySelector('#nextBtn').style.display = '';
          root.querySelector('#typeBtn').style.display = 'none';
          root.querySelector('#listenLabel').textContent = 'Listening';
          root.querySelector('#listenSub').textContent = 'Pause to finish, or keep going.';
        };
        const start = () => {
          if (halo.dataset.state === 'listening') return;
          halo.dataset.state = 'listening';
          root.querySelector('.guide .halo').dataset.state = 'idle';
          root.querySelector('#listenLabel').textContent = 'Listening';
          root.querySelector('#listenSub').textContent = 'Speak. Take your time.';
          typeInto(t, sc.answer, { done: false, onDone: finish });
        };
        if (done) typeInto(t, sc.answer, { done: true, onDone: finish });
        halo.addEventListener('click', start);
      },
    };
  };

  S.lifeGoals = () => ({
    name: 'Interview · Life goals', tip: 'Three life goals lifted from the scenes, each tied to Noor’s own sentence. <b>Change</b> shows an edit state; <b>These are mine</b> continues.',
    html: `
    <div class="content iv">
      ${eyebrow('Life goals · 3 found', { text: 'Pause', href: '#/map' })}
      ${railH('life')}
      ${guide('Three life goals, in your words. Keep what is yours; change what is not.', 'idle')}
      <div class="list" id="goals">
        ${ORDER.map((id) => { const g = G[id]; return `
        <div class="goal kept" data-id="${id}">
          <div class="top"><span class="micro faint">${esc(g.area)}</span><div class="acts"><span class="on">Keep</span><span>Change</span></div></div>
          <span class="body">${esc(g.text)}</span>
          <span class="small src">from ${q(g.scene)}</span>
        </div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('interview.life_goals')}
      <div class="foot">
        <div class="left" style="display:flex; align-items:center; gap:14px"><div class="halo small" data-state="listening"></div><span class="small faint">Or say it.</span></div>
        <a class="btn primary compact" href="#/interview/level/five_year">These are mine</a>
      </div>
    </div>`,
    mount(root) {
      root.querySelectorAll('.goal').forEach((el) => {
        el.querySelectorAll('.acts span').forEach((chip) => chip.addEventListener('click', (e) => {
          e.stopPropagation();
          const editing = chip.textContent === 'Change';
          el.classList.toggle('editing', editing);
          el.classList.toggle('kept', !editing);
          el.querySelectorAll('.acts span').forEach((c) => c.classList.toggle('on', c === chip));
          const src = el.querySelector('.src');
          src.innerHTML = editing ? '<span class="edit-hint">Listening for your version…</span>' : `from ${q(G[el.dataset.id].scene)}`;
        }));
      });
    },
  });

  S.level = (key) => {
    const i = D.LEVELS.findIndex((l) => l.key === key);
    const L = D.LEVELS[i];
    const parentKey = i === 0 ? 'life' : D.LEVELS[i - 1].key;
    const next = i < D.LEVELS.length - 1 ? `#/interview/level/${D.LEVELS[i + 1].key}` : '#/interview/set';
    const parentText = (g) => (parentKey === 'life' ? g.text : g[parentKey]);
    const method = key === 'week' ? 'interview.week' : key === 'five_year' ? 'interview.want_vs_should' : 'interview.parent_picker';
    return {
      name: `Interview · ${L.long}`, tip: `One ${L.long.toLowerCase()} per life goal, each shown under its parent. Tap a line to hear it or change it; <b>Confirm</b> continues.`,
      html: `
      <div class="content iv">
        ${eyebrow(`Distilling · ${L.plural} · ${i + 1} of 5`, { text: 'Pause', href: '#/map' })}
        ${railH(key)}
        ${guide(esc(L.guide), 'idle')}
        <div class="list">
          ${ORDER.map((id) => { const g = G[id]; return `
          <div class="goal kept" data-id="${id}">
            <span class="small parent"><i>↑</i>${esc(parentText(g))}</span>
            <span class="body">${esc(g[key])}${key === 'week' ? `</span><span class="small faint">${esc(g.ifThen)}` : ''}</span>
          </div>`; }).join('')}
        </div>
        <div class="spacer"></div>
        ${why(method)}
        <div class="foot">
          <div class="left" style="display:flex; align-items:center; gap:14px"><div class="halo small" data-state="listening"></div><span class="small faint">Say it back, or change one.</span></div>
          <a class="btn primary compact" href="${next}">Confirm</a>
        </div>
      </div>`,
      mount(root) {
        root.querySelectorAll('.goal').forEach((el) => el.addEventListener('click', () => {
          const on = el.classList.toggle('editing');
          const b = el.querySelector('.body');
          if (on) { b.dataset.orig = b.innerHTML; b.innerHTML = `${b.dataset.orig}<br><span class="small edit-hint">Listening for your version…</span>`; }
          else b.innerHTML = b.dataset.orig;
        }));
      },
    };
  };

  S.set = () => ({
    name: 'Interview · Map set', tip: 'The whole hierarchy exists before the first day. <b>Open your map</b> goes home.',
    ambient: 'center',
    html: `
    <div class="content" style="gap:16px">
      ${eyebrow('Interview · complete')}
      ${railH('today')}
      <div class="stack" style="gap:6px">
        <h1 class="title">Your map is set.</h1>
        <p class="body muted">Three life goals, every level filled, in your words. Tomorrow morning the guide sets today with you.</p>
      </div>
      <div class="stack-md">
        ${ORDER.map((id) => { const g = G[id]; return `
        <a class="gcard" href="#/thread/${id}">
          <span class="micro label">${esc(g.area)}</span>
          <span class="body heading" style="font-size:17px; line-height:24px; font-weight:400">${esc(g.text)}</span>
          <div class="levels"><span class="micro on">5 yr</span><span class="sep"></span><span class="micro on">1 yr</span><span class="sep"></span><span class="micro on">6 mo</span><span class="sep"></span><span class="micro on">Month</span><span class="sep"></span><span class="micro on">Week</span><span class="sep off"></span><span class="micro">Today</span></div>
          <div class="now"><span class="micro">Week</span><span class="small">${esc(g.week)}</span></div>
        </a>`; }).join('')}
      </div>
      <div class="spacer"></div>
      <div class="stack" style="gap:10px; padding-bottom:28px">
        <a class="btn primary block" href="#/map">Open your map</a>
        <a class="btn ghost block" href="#/document">Read the full record</a>
      </div>
    </div>`,
  });

  S.map = () => ({
    name: 'Map home', tip: 'Life goals first. Each card opens its thread; the morning row opens the course.',
    html: `
    <div class="content with-tabs" style="gap:10px">
      <div class="eyebrow"><span class="label">Tuesday 18 Nov</span><div style="display:flex; gap:4px; margin-right:-12px"><a class="btn ghost compact" href="#/document">Document</a><a class="btn ghost compact" href="#/settings">Settings</a></div></div>
      <div class="row"><h1 class="title">Your life goals.</h1><a class="morning-row" href="#/morning/1"><div class="l"><div class="halo small" data-state="speaking" style="--size:28px"></div><span class="small" style="color:var(--color-text)">Morning</span></div></a></div>
      <div class="stack" style="gap:8px">
        ${ORDER.map((id) => { const g = G[id]; return `
        <a class="gcard tight" href="#/thread/${id}">
          <span class="micro label">${esc(g.area)}</span>
          <span class="heading">${esc(g.text)}</span>
          <span class="small whyline">${q(g.why)}</span>
          <div class="now"><span class="micro">Today</span><span class="small">${esc(g.today)}</span></div>
        </a>`; }).join('')}
      </div>
    </div>
    ${tabs('map')}`,
  });

  S.thread = (id) => {
    const g = G[id] || G.L1;
    return {
      name: 'Life goal thread', tip: 'One life goal, bottom-up: today sits under the week, month, six months, year, five years, the goal, the sentence it came from, and the reason. Tap any node to open it in the document.',
      html: `
      <div class="content with-tabs" style="gap:12px">
        ${eyebrow(`Life goal · ${esc(g.area)} · the thread`, { text: 'Map', href: '#/map' })}
        <div class="open fullbox">
          ${threadFor(g, { full: true })}
        </div>
        <div class="why tight"><span class="small">Why this step: it is this week’s “visit three rooms,” for this month’s “sign a room.”</span><span class="tag strong">strong</span></div>
      </div>
      ${tabs('map')}`,
    };
  };

  S.document = () => ({
    name: 'Life goals document', tip: 'The living record of the interview. Every level, every goal, in Noor’s phrasing. Tap a line to edit; the level above and below update with you.',
    html: `
    <div class="content with-tabs" style="gap:14px">
      ${eyebrow('Life goals document', { text: 'Map', href: '#/map' })}
      <div class="stack" style="gap:2px">
        <h1 class="title">In your words.</h1>
        <span class="small faint">Written 2 Nov · changed Sunday · tap a line to edit</span>
      </div>
      <div class="scroll"><div class="doc">
        ${ORDER.map((id, idx) => { const g = G[id]; return `
        <div class="sec">
          <span class="micro label">${esc(g.area)}</span>
          <a class="docline life" href="#/thread/${id}"><span class="micro">Life</span><span class="t">${esc(g.text)}</span></a>
          <p class="small passage">${q(g.scene)}<br>${q(g.why)}</p>
          <div class="docline"><span class="micro">5 yr</span><span class="t small">${esc(g.five_year)}</span></div>
          <div class="docline"><span class="micro">1 yr</span><span class="t small">${esc(g.one_year)}</span></div>
          <div class="docline"><span class="micro">6 mo</span><span class="t small">${esc(g.six_month)}</span></div>
          <div class="docline"><span class="micro">Month</span><span class="t small ${idx === 0 ? 'edit' : ''}">${esc(g.month)}${idx === 0 ? ' <span class="micro">· editing</span>' : ''}</span></div>
          <div class="docline"><span class="micro">Week</span><span class="t small">${esc(g.week)}</span></div>
          <div class="docline"><span class="micro">If…</span><span class="t small">${esc(g.ifThen)}</span></div>
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

  // ---------- Morning course ----------
  S.morning1 = () => ({
    name: 'Morning · Hear the thread', tip: 'The guide says each life goal and today’s step under it, then asks Noor to say it back.',
    ambient: 'center',
    html: `
    <div class="content" style="gap:16px">
      ${eyebrow('Morning course · 1 of 5 · 6:31', { text: 'Later', href: '#/map' })}
      <div class="player">
        <div class="halo large" data-state="speaking"></div>
        <p class="spoken">Good morning, Noor. Three life goals, three steps. Clinic: call Didsbury and book Thursday. <span class="next">Maya: write the three sentences for Priya. Body: the five-k loop before she wakes.</span></p>
      </div>
      <div class="list">
        ${ORDER.map((id) => { const g = G[id]; return `<div class="item"><span class="small muted">${esc(g.today)}</span><span class="micro faint">for ${q(g.month)}</span></div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('morning.hear_goals')}
      <div class="foot">
        <div style="display:flex; align-items:center; gap:14px"><div class="halo small" data-state="idle"></div><span class="small faint">Say them back when I stop.</span></div>
        <a class="btn secondary compact" href="#/morning/2">Yesterday</a>
      </div>
    </div>`,
  });

  S.morning2 = () => {
    const g = G.L3;
    return {
      name: 'Morning · Correct the drift', tip: 'Yesterday’s run slipped. A miss gets a step, not a verdict. Pick an option to continue.',
      html: `
      <div class="content" style="gap:12px">
        ${eyebrow('Morning course · 2 of 5 · yesterday', { text: 'Later', href: '#/map' })}
        ${course('One drift')}
        ${guide('Yesterday’s run did not happen; Maya was up at five. Two of three runs still hold. What is today’s step?', 'speaking')}
        <div class="open">
          <div class="thread cols">
            <div class="node"><span class="label">Yesterday</span><div class="rail"><span class="dot"></span><span class="line"></span></div><div class="text"><span class="body faint" style="text-decoration:line-through">${esc(g.yesterday.text)}</span><span class="small faint">${esc(g.yesterday.note)}</span></div></div>
            <div class="node"><span class="label">This week</span><div class="rail"><span class="dot"></span><span class="line"></span></div><div class="text"><span class="small">${esc(g.week)} · two done</span></div></div>
            <div class="node"><span class="label">Life goal</span><div class="rail"><span class="dot end"></span></div><div class="text"><span class="small">${esc(g.text)}</span></div></div>
          </div>
        </div>
        <div class="chips">
          <a class="chip on" href="#/morning/3">Run today, before Maya wakes</a>
          <a class="chip" href="#/morning/3">Move it to Thursday</a>
          <a class="chip" href="#/morning/3">Two runs is this week</a>
        </div>
        <div class="spacer"></div>
        ${why('morning.correction')}
        <div class="foot">
          <div style="display:flex; align-items:center; gap:14px"><div class="halo small" data-state="listening"></div><span class="small faint">Or just say it.</span></div>
        </div>
      </div>`,
    };
  };

  S.morning3 = (done) => {
    const g = G.L1;
    return {
      name: 'Morning · Set today’s heading', tip: 'Noor names today’s one thing for the clinic. Every action shows the goal it serves before it can be saved.',
      html: `
      <div class="content" style="gap:16px">
        ${eyebrow('Morning course · 3 of 5 · today', { text: 'Later', href: '#/map' })}
        ${guide('The clinic. This week is three rooms. What is today’s one thing?', 'idle')}
        <p class="transcript" id="transcript"><span class="said"></span><span class="caret"></span></p>
        <div class="captured reveal" id="captured" style="display:none">
          <span class="micro label">Today · serves</span>
          <span class="small"><b style="font-weight:500; color:var(--color-text)">${esc(g.week)}</b></span>
          <span class="small">→ ${esc(g.month)} → ${esc(g.six_month)}</span>
          <span class="small faint">→ ${esc(g.text)}</span>
        </div>
        <div class="spacer"></div>
        ${why('morning.first_two_minutes')}
        <div class="listen">
          <div class="left">
            <div class="halo medium" data-state="${done ? 'listening' : 'idle'}" id="halo"></div>
            <div class="stack" style="gap:2px"><span class="body" id="listenLabel">${done ? 'Listening' : 'Tap to answer'}</span><span class="small faint">First two minutes, not the finish.</span></div>
          </div>
          <a class="btn secondary compact" id="nextBtn" href="#/morning/4" style="${done ? '' : 'display:none'}">Next</a>
        </div>
      </div>`,
      mount(root) {
        const t = root.querySelector('#transcript');
        const text = `Call the Didsbury practice and book a viewing for Thursday. First two minutes: ${g.firstTwo.charAt(0).toLowerCase()}${g.firstTwo.slice(1)}`;
        const finish = () => { root.querySelector('#captured').style.display = ''; root.querySelector('#nextBtn').style.display = ''; };
        const halo = root.querySelector('#halo');
        halo.addEventListener('click', () => { if (halo.dataset.state === 'listening') return; halo.dataset.state = 'listening'; root.querySelector('#listenLabel').textContent = 'Listening'; typeInto(t, text, { done: false, onDone: finish }); });
        if (done) typeInto(t, text, { done: true, onDone: finish });
      },
    };
  };

  S.morning4 = () => ({
    name: 'Morning · Obstacle and if-then', tip: 'One obstacle, one if-then, per step. The plans are Noor’s from the interview, re-said for today.',
    html: `
    <div class="content" style="gap:16px">
      ${eyebrow('Morning course · 4 of 5 · obstacles', { text: 'Later', href: '#/map' })}
      ${guide('What gets in the way today, and then what? One line each.', 'idle')}
      <div class="list">
        ${ORDER.map((id) => { const g = G[id]; return `
        <div class="item">
          <span class="small faint">${esc(g.today)}</span>
          <span class="body">${esc(g.ifThen)}</span>
        </div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('morning.obstacle_if_then')}
      <div class="foot">
        <div style="display:flex; align-items:center; gap:14px"><div class="halo small" data-state="listening"></div><span class="small faint">Change any of them out loud.</span></div>
        <a class="btn primary compact" href="#/morning/5">Keep these</a>
      </div>
    </div>`,
  });

  S.morning5 = () => ({
    name: 'Morning · Today is set', tip: 'Three headings, each with the goal it serves. <b>Open the map</b> returns home.',
    ambient: 'center',
    html: `
    <div class="content" style="gap:16px">
      ${eyebrow('Morning course · 5 of 5')}
      <div class="player" style="padding-top:8px">
        <div class="halo medium" data-state="speaking"></div>
        <p class="spoken">Today is set. Three steps, three life goals.</p>
      </div>
      <div class="stack-md">
        ${ORDER.map((id) => { const g = G[id]; return `
        <a class="gcard" href="#/thread/${id}">
          <span class="body" style="color:var(--color-text)">${esc(g.today)}</span>
          <div class="serves"><span class="micro">serves</span><span class="small">${esc(g.week)}</span></div>
          <div class="serves"><span class="micro" style="opacity:0">serves</span><span class="small faint">${esc(g.text)}</span></div>
        </a>`; }).join('')}
      </div>
      <div class="spacer"></div>
      <div class="stack" style="gap:10px; padding-bottom:28px">
        <a class="btn primary block" href="#/map">Open the map</a>
        <span class="small faint" style="text-align:center">Four minutes. See you tomorrow at 6:30.</span>
      </div>
    </div>`,
  });

  // ---------- Week ----------
  S.week = () => ({
    name: 'Week', tip: 'Dense two-column week: every item carries its thread up to a life goal. Tap an item to open its thread.',
    html: `
    <div class="content with-tabs" style="gap:12px">
      <div class="eyebrow">
        <div class="stack" style="gap:2px"><span class="label">Week of 17–23 Nov</span><span class="heading">This week’s thread.</span></div>
        <a class="btn ghost compact" style="margin-right:-12px" href="#/review/1">Review</a>
      </div>
      ${course('One correction')}
      <div class="open">
        ${threadFor(G.L1)}
        <span class="micro hint">Tap a node to hear it · hold to edit</span>
      </div>
      ${['L2', 'L3'].map((id) => { const g = G[id]; return `
      <a class="slot" href="#/thread/${id}">
        <span class="body">${esc(g.week)}</span>
        <span class="small lg">for ${q(g.month)} → <b>${esc(g.text)}</b></span>
      </a>`; }).join('')}
    </div>
    ${tabs('week')}`,
  });

  // ---------- Talk it through ----------
  S.talk = () => ({
    name: 'Talk It Through', tip: 'Four questions the guide answers. Pick one, or tap the halo and speak.',
    ambient: 'center',
    html: `
    <div class="content with-tabs" style="gap:16px">
      ${eyebrow('Talk it through', { text: 'Map', href: '#/map' })}
      <div class="spacer"></div>
      <div class="voice-state" style="gap:28px">
        <div class="halo large" data-state="listening"></div>
        <div class="stack" style="gap:8px; text-align:center; align-items:center">
          <p class="spoken" style="max-width:320px">What is on your mind?</p>
          <span class="small faint">I answer from your own words and end with one step.</span>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="composer-col">
        <div class="chips" style="justify-content:center">
          ${Object.entries(D.talks).map(([k, t]) => `<a class="chip" href="#/talk/${k}">${t.chip}</a>`).join('')}
        </div>
        <div class="composer"><div class="input empty">Or type it</div></div>
      </div>
    </div>
    ${tabs('talk')}`,
  });

  S.talkAnswer = (k) => {
    const t = D.talks[k] || D.talks.now;
    const g = G[t.next.goal];
    return {
      name: `Talk · ${t.chip}`, tip: 'The answer threads to Noor’s words and ends in one step with a time. <b>Set it</b> puts it on today.',
      html: `
      <div class="content with-tabs" style="gap:12px">
        ${eyebrow(`Talk it through · ${t.chip}`, { text: 'Map', href: '#/map' })}
        <div class="user small">${esc(t.user)}</div>
        <div class="answer">
          <div class="halo inline" data-state="speaking" style="margin-top:7px"></div>
          <div class="stack" style="gap:8px">
            <p class="small q" style="font-size:15px; line-height:21px">${esc(t.guide)}</p>
            <p class="small cite">${q(t.cite)}</p>
          </div>
        </div>
        <div class="levels">
          <span class="micro on">Today</span><span class="sep"></span><span class="micro on">Week</span><span class="sep"></span><span class="micro on">Month</span><span class="sep"></span><span class="micro">6 mo</span><span class="sep"></span><span class="micro">1 yr</span><span class="sep"></span><span class="micro">5 yr</span><span class="sep"></span><span class="micro on">Life</span>
        </div>
        <div class="spacer"></div>
        <div class="nextstep">
          <div class="row"><span class="micro label">Next step · ${esc(t.next.by)}</span><span class="micro faint">${esc(g.area)}</span></div>
          <span class="body">${esc(t.next.text)}</span>
          <div class="row" style="padding-top:4px"><div style="display:flex; align-items:center; gap:10px"><div class="halo small" data-state="listening" style="--size:36px"></div><a class="btn ghost compact" href="#/talk">Not that</a></div><a class="btn primary compact" href="#/map">Set it</a></div>
        </div>
        ${why(t.method)}
      </div>
      ${tabs('talk')}`,
    };
  };

  // ---------- Weekly review ----------
  S.review1 = () => ({
    name: 'Weekly Review · Close the week', tip: 'One sentence per priority, no verdicts. <b>Next week</b> continues.',
    html: `
    <div class="content" style="gap:16px">
      ${eyebrow('Weekly review · Sunday · 1 of 3', { text: 'Later', href: '#/map' })}
      ${guide('Three priorities this week. One sentence on each. No verdicts, just what happened.', 'speaking')}
      ${course('Two of three')}
      <div class="list">
        ${D.lastWeek.map((p) => { const g = G[p.goal]; return `
        <div class="pri">
          <span class="body">${esc(p.text)}</span>
          <span class="small thr">for ${q(g.month)} → <b>${esc(g.text)}</b></span>
          <div class="state"><i class="${p.status === 'done' ? '' : 'carried'}"></i><span class="small">${esc(p.note)}</span></div>
        </div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('review.close_week')}
      <div class="foot">
        <div style="display:flex; align-items:center; gap:14px"><div class="halo small" data-state="listening"></div><span class="small faint">Say what happened.</span></div>
        <a class="btn secondary compact" href="#/review/2">Next week</a>
      </div>
    </div>`,
  });

  S.review2 = () => ({
    name: 'Weekly Review · Pick three (orphan gate)', tip: 'Three priorities, each tied to a monthly goal. The fourth has no goal above it and cannot be saved here; attach it or leave it off.',
    html: `
    <div class="content" style="gap:14px">
      ${eyebrow('Weekly review · Sunday · 2 of 3', { text: 'Later', href: '#/map' })}
      ${guide('Three for next week, each under a monthly goal. You said four.', 'idle')}
      <div class="list">
        ${[['L1', 'View Didsbury Thursday; if it fits, ask for the contract.'], ['L2', 'Hours conversation with Priya, Wednesday after handover.'], ['L3', 'Two runs, Tuesday and Thursday at six.']].map(([id, t]) => { const g = G[id]; return `
        <div class="pri slim">
          <span class="body">${esc(t)}</span>
          <span class="small thr one">for ${q(g.month)} → <b>${esc(g.area)}</b></span>
        </div>`; }).join('')}
      </div>
      <div class="gate slim">
        <span class="body">Sort out the car insurance.</span>
        <span class="small no-parent"><i></i>No goal above it. It cannot go on the week.</span>
        <div class="parents chips" id="parents">
          ${ORDER.map((id) => `<span class="chip" data-id="${id}">Attach to ${esc(G[id].area.toLowerCase())}</span>`).join('')}
          <span class="chip" data-id="off">Leave it off</span>
        </div>
      </div>
      <div class="spacer"></div>
      ${why('review.pick_three')}
      <div class="foot">
        <div style="display:flex; align-items:center; gap:14px"><div class="halo small" data-state="listening"></div></div>
        <a class="btn primary compact" id="setBtn" href="#/review/3" style="opacity:0.4; pointer-events:none">Set the week</a>
      </div>
    </div>`,
    mount(root) {
      root.querySelectorAll('#parents .chip').forEach((c) => c.addEventListener('click', () => {
        root.querySelectorAll('#parents .chip').forEach((x) => x.classList.remove('on'));
        c.classList.add('on');
        const gate = root.querySelector('.gate .no-parent');
        gate.innerHTML = c.dataset.id === 'off' ? '<i></i>Left off. Nothing orphaned on the week.' : `<i style="border-style:solid; background:var(--color-accent); border-color:var(--color-accent)"></i>Attached. It now has a goal above it.`;
        const b = root.querySelector('#setBtn'); b.style.opacity = ''; b.style.pointerEvents = '';
      }));
    },
  });

  S.review3 = () => ({
    name: 'Weekly Review · Week set', tip: 'Three priorities with when and where. <b>Done</b> returns to the map.',
    ambient: 'center',
    html: `
    <div class="content" style="gap:16px">
      ${eyebrow('Weekly review · Sunday · 3 of 3')}
      <div class="player" style="padding-top:8px">
        <div class="halo medium" data-state="speaking"></div>
        <p class="spoken">Next week is set. Three priorities, three life goals, each with a when.</p>
      </div>
      <div class="stack-md">
        ${[['L1', 'View Didsbury Thursday; if it fits, ask for the contract.', 'Thu 17:30 · Didsbury'], ['L2', 'Hours conversation with Priya.', 'Wed 15:45 · after handover'], ['L3', 'Two runs at six.', 'Tue · Thu · shoes by the door']].map(([id, t, w]) => { const g = G[id]; return `
        <a class="gcard" href="#/thread/${id}">
          <div class="row"><span class="micro label">${esc(g.area)}</span><span class="micro accent">${esc(w)}</span></div>
          <span class="body" style="color:var(--color-text)">${esc(t)}</span>
          <div class="serves"><span class="micro">serves</span><span class="small">${esc(g.month)}</span></div>
        </a>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('review.if_then')}
      <div class="stack" style="gap:10px; padding-bottom:28px">
        <a class="btn primary block" href="#/map">Done</a>
      </div>
    </div>`,
  });

  // ---------- Settings ----------
  S.settings = () => ({
    name: 'Settings', tip: 'Demo persona toggle, morning time, review day, voice, evidence notes, data.',
    html: `
    <div class="content with-tabs" style="gap:0">
      ${eyebrow('Settings', { text: 'Map', href: '#/map' })}
      <div class="section" style="padding-top:12px">
        <span class="label">Demo</span>
        <div class="srow"><div class="t"><span class="body">Demo persona</span><span class="small">Noor Haddad, physiotherapist. Turn off to start your own interview.</span></div><span class="switch on" data-toggle></span></div>
      </div>
      <div class="section">
        <span class="label">Rhythm</span>
        <div class="srow"><div class="t"><span class="body">Morning course</span><span class="small">Four minutes, spoken</span></div><span class="small val">6:30</span></div>
        <div class="srow"><div class="t"><span class="body">Weekly review</span><span class="small">Close the week, set the next</span></div><span class="small val">Sunday</span></div>
      </div>
      <div class="section">
        <span class="label">Voice</span>
        <div class="srow"><div class="t"><span class="body">Guide voice</span><span class="small">Low, unhurried</span></div><span class="small val">Sage</span></div>
        <div class="srow"><div class="t"><span class="body">Why this step</span><span class="small">Show the evidence note and confidence tag</span></div><span class="switch on" data-toggle></span></div>
      </div>
      <div class="section">
        <span class="label">Your words</span>
        <div class="srow"><div class="t"><span class="body">Export the document</span><span class="small">Plain text, every level</span></div><span class="micro accent">Export</span></div>
        <div class="srow" style="border-bottom:0"><div class="t"><span class="body">Delete everything</span><span class="small">On this device and the account</span></div><span class="micro faint">Delete</span></div>
      </div>
    </div>
    ${tabs('map')}`,
    mount(root) { root.querySelectorAll('[data-toggle]').forEach((s) => s.addEventListener('click', () => s.classList.toggle('on'))); },
  });

  // ---------- Router ----------
  const ROUTES = [
    { path: '/welcome', screen: () => S.welcome(), group: 'Onboarding', label: 'Welcome' },
    { path: '/interview/scene/1', screen: (d) => S.scene(1, d), group: 'Interview', label: 'Scene · Work' },
    { path: '/interview/scene/2', screen: (d) => S.scene(2, d), label: 'Scene · Relationships' },
    { path: '/interview/scene/3', screen: (d) => S.scene(3, d), label: 'Scene · Body (end of life)' },
    { path: '/interview/life-goals', screen: () => S.lifeGoals(), label: 'Life goals, captured' },
    { path: '/interview/level/five_year', screen: () => S.level('five_year'), label: 'Distil · 5 years' },
    { path: '/interview/level/one_year', screen: () => S.level('one_year'), label: 'Distil · 1 year' },
    { path: '/interview/level/six_month', screen: () => S.level('six_month'), label: 'Distil · 6 months' },
    { path: '/interview/level/month', screen: () => S.level('month'), label: 'Distil · This month' },
    { path: '/interview/level/week', screen: () => S.level('week'), label: 'Distil · This week' },
    { path: '/interview/set', screen: () => S.set(), label: 'Map set' },
    { path: '/map', screen: () => S.map(), group: 'Every day', label: 'Map home' },
    { path: '/thread/L1', screen: () => S.thread('L1'), label: 'Life goal thread' },
    { path: '/thread/L2', screen: () => S.thread('L2'), hidden: true },
    { path: '/thread/L3', screen: () => S.thread('L3'), hidden: true },
    { path: '/document', screen: () => S.document(), label: 'Life goals document' },
    { path: '/morning/1', screen: () => S.morning1(), group: 'Morning course', label: 'Hear the thread' },
    { path: '/morning/2', screen: () => S.morning2(), label: 'Correct the drift' },
    { path: '/morning/3', screen: (d) => S.morning3(d), label: 'Set today’s heading' },
    { path: '/morning/4', screen: () => S.morning4(), label: 'Obstacle, if-then' },
    { path: '/morning/5', screen: () => S.morning5(), label: 'Today is set' },
    { path: '/week', screen: () => S.week(), group: 'Week and talk', label: 'Week' },
    { path: '/talk', screen: () => S.talk(), label: 'Talk it through' },
    { path: '/talk/now', screen: () => S.talkAnswer('now'), label: 'Talk · answer' },
    { path: '/talk/why', screen: () => S.talkAnswer('why'), hidden: true },
    { path: '/talk/first', screen: () => S.talkAnswer('first'), hidden: true },
    { path: '/talk/course', screen: () => S.talkAnswer('course'), hidden: true },
    { path: '/review/1', screen: () => S.review1(), group: 'Weekly review', label: 'Close the week' },
    { path: '/review/2', screen: () => S.review2(), label: 'Pick three · orphan gate' },
    { path: '/review/3', screen: () => S.review3(), label: 'Week set' },
    { path: '/settings', screen: () => S.settings(), group: 'Settings', label: 'Settings' },
  ];
  window.ROUTES = ROUTES;

  const screenEl = document.getElementById('screen');
  const ambientEl = document.getElementById('ambient');
  const noteEl = document.getElementById('stageNote');
  const navEl = document.getElementById('railNav');

  function parseHash() {
    const raw = location.hash.replace(/^#/, '') || '/welcome';
    const [path, qs] = raw.split('?');
    return { path, done: new URLSearchParams(qs || '').get('done') === '1' };
  }

  function render() {
    stopTyping();
    const { path, done } = parseHash();
    const route = ROUTES.find((r) => r.path === path) || ROUTES[0];
    const scr = route.screen(done);
    ambientEl.className = `ambient ${scr.ambient || ''}`;
    screenEl.innerHTML = scr.html;
    scr.mount && scr.mount(screenEl);
    noteEl.innerHTML = `<b>${scr.name}</b> — ${scr.tip}`;
    document.title = `${scr.name} · Life Goals`;
    navEl.querySelectorAll('a').forEach((a) => a.classList.toggle('on', a.getAttribute('href') === `#${route.path}`));
    screenEl.scrollTop = 0;
  }

  function buildNav() {
    let html = '<div class="h">Journey</div>';
    let i = 0;
    ROUTES.forEach((r) => {
      if (r.hidden) return;
      i += 1;
      if (r.group) html += `<div class="h" style="padding-top:14px">${r.group}</div>`;
      html += `<a href="#${r.path}"><i>${String(i).padStart(2, '0')}</i><span>${r.label}</span></a>`;
    });
    navEl.innerHTML = html;
  }

  buildNav();
  window.addEventListener('hashchange', render);
  render();
})();
