/* Life Goals — concept: goal agent. Hash-routed, no build step.
   One goal → an agent built from two sources (you, and the record of people who got there) → a relentless operator until the line. */
(() => {
  const D = window.DATA;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  if (params.get('bare') === '1') document.body.classList.add('bare');

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const G = D.goal; const N = D.now; const R = D.record; const P = D.plan;

  // ---------- Building blocks ----------
  const eyebrow = (label, right = '') =>
    `<div class="eyebrow"><span class="label">${label}</span>${right ? `<a class="btn ghost compact" style="margin-right:-12px" href="${right.href}">${right.text}</a>` : ''}</div>`;
  const guide = (text, state = 'idle') => `<div class="guide"><div class="halo inline" data-state="${state}"></div><p class="heading">${text}</p></div>`;
  const why = (key) => { const m = D.methods[key]; return `<div class="why line"><span class="small">${esc(m.note)}</span><span class="tag ${m.tag}">${m.tag}</span></div>`; };
  const tabs = (on) =>
    `<div class="tabs">${[['today', 'Today', '#/home'], ['plan', 'Plan', '#/plan'], ['agents', 'Agents', '#/agents']]
      .map(([k, l, h]) => `<a class="tab ${on === k ? 'on' : ''}" href="${h}"><i></i><span class="label">${l}</span></a>`).join('')}</div>`;
  const agentbar = (name, character, state = 'idle') =>
    `<div class="agentbar"><div class="halo small" data-state="${state}" style="--size:34px"></div><div class="n"><span class="body">${esc(name)}</span><span class="micro">${esc(character)}</span></div></div>`;

  const dist = (plan, you, { start = 'Start', end = 'Finish', labels = true } = {}) => {
    const a = Math.min(plan, you) * 100; const b = Math.max(plan, you) * 100; const diff = Math.abs(plan - you) > 0.005;
    return `<div class="dist">
      <div class="track">
        <div class="done" style="width:${you * 100}%"></div>
        ${diff ? `<div class="gap" style="left:${a}%; width:${b - a}%"></div>` : ''}
        <span class="pt start"></span><span class="pt end"></span>
        <span class="pt plan" style="left:${plan * 100}%"></span>
        <span class="pt you" style="left:${you * 100}%"></span>
        ${labels ? `<span class="lbl you" style="left:${you * 100}%">You</span>${diff ? `<span class="lbl plan" style="left:${plan * 100}%">Plan</span>` : ''}` : ''}
      </div>
      <div class="legend"><span class="micro">${esc(start)}</span><span class="micro on">${esc(end)}</span></div>
    </div>`;
  };

  const ICON = {
    key: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/></svg>',
    cam: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z M14 3v4h4 M10 12h5M10 16h5"/></svg>',
    num: '<svg viewBox="0 0 24 24"><path d="M9 4v16M15 4v16M4 9h16M4 15h16"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  };
  const intake = ({ state = 'idle', label = 'Tap to answer', sub, next = '', nextText = 'Next', showNext = false } = {}) =>
    `<div class="intake ${showNext ? 'has-next' : ''}" id="intake"><div class="halo small" data-state="${state}" id="halo"></div>
      <div class="state"><span class="body" id="intakeLabel">${label}</span><span class="small" id="intakeSub">${sub ?? 'Speak, type, or add a photo or file.'}</span></div>
      <div class="modes" id="modes">${['key', 'cam', 'doc'].map((k) => `<span class="mode" data-mode="${k}">${ICON[k]}</span>`).join('')}</div>
      ${next ? `<a class="btn primary compact" id="nextBtn" href="${next}" style="margin-left:4px; ${showNext ? '' : 'display:none'}">${nextText}</a>` : ''}
    </div>`;
  function wireIntake(root, { onStart, typeTarget } = {}) {
    const halo = root.querySelector('#halo');
    if (halo && onStart) halo.addEventListener('click', onStart);
    root.querySelectorAll('#modes .mode').forEach((m) => m.addEventListener('click', () => {
      const wasOn = m.classList.contains('on');
      root.querySelectorAll('#modes .mode').forEach((x) => x.classList.remove('on'));
      if (!wasOn) m.classList.add('on');
      if (m.dataset.mode === 'key' && typeTarget) { const box = root.querySelector(typeTarget); if (box) box.style.display = wasOn ? 'none' : ''; }
    }));
  }
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

  const ticker = (rows, { title = 'The record · researching', ready = false } = {}) =>
    `<div class="ticker"><div class="hd"><span class="micro">${title}</span><span class="micro dim">${ready ? `${R.kept} cases · ${R.failed} failures · ${R.frameworks} frameworks` : 'in the background'}</span></div>
      ${rows.map(([s, t]) => `<div class="tk ${s}"><i></i><span class="small">${esc(t)}</span></div>`).join('')}</div>`;

  // A spoken-answer screen. `live` renders mid-answer; `done` the end state.
  function answerScreen({ name, tip, eyebrowText, question, answer, keptHtml, footHtml = '', method, next, nextText = 'Next', done, live, right = { text: 'Later', href: '#/home' }, ambient }) {
    return {
      name, tip, ambient,
      html: `
      <div class="content sp" style="gap:18px">
        ${eyebrow(eyebrowText, right)}
        ${guide(esc(question), done || live ? 'idle' : 'speaking')}
        <div class="typebox" id="typebox" style="display:none"><span class="ph">Type your answer…</span></div>
        <p class="transcript" id="transcript"><span class="said"></span><span class="caret"></span></p>
        <div class="reveal" id="kept" style="display:none">${keptHtml}</div>
        <div class="spacer"></div>
        ${footHtml || why(method)}
        ${intake({ state: done || live ? 'listening' : 'idle', label: done || live ? 'Listening' : 'Tap to answer', sub: live ? 'Speak. Take your time.' : done ? 'Pause to finish, or keep going.' : undefined, next, nextText, showNext: done })}
      </div>`,
      mount(root) {
        const t = root.querySelector('#transcript');
        if (live) { t.querySelector('.said').textContent = answer.split('. ').slice(0, 2).join('. ') + '.'; return; }
        const finish = () => {
          root.querySelector('#kept').style.display = '';
          const nb = root.querySelector('#nextBtn'); if (nb) nb.style.display = '';
          root.querySelector('#intake').classList.add('has-next');
          root.querySelector('#intakeLabel').textContent = 'Listening'; root.querySelector('#intakeSub').textContent = 'Pause to finish, or keep going.';
        };
        const start = () => {
          const halo = root.querySelector('#halo'); if (halo.dataset.state === 'listening') return;
          halo.dataset.state = 'listening'; root.querySelector('.guide .halo').dataset.state = 'idle';
          root.querySelector('#intakeLabel').textContent = 'Listening'; root.querySelector('#intakeSub').textContent = 'Speak. Take your time.';
          typeInto(t, answer, { done: false, onDone: finish });
        };
        if (done) typeInto(t, answer, { done: true, onDone: finish });
        wireIntake(root, { onStart: start, typeTarget: '#typebox' });
      },
    };
  }

  // ---------- Screens ----------
  const S = {};

  S.state = (done) => answerScreen({
    name: 'State the goal', tip: 'The first screen is a question, not a map. One goal with a finish line and a date. Tap the <b>halo</b>; Lena’s answer is typed in for the demo.',
    eyebrowText: 'One goal', right: { text: 'Agents', href: '#/agents' },
    question: 'One goal. Say it with a finish line and a date.',
    answer: G.said,
    keptHtml: `<div class="kept"><span class="micro">Heard</span><p class="sent">${esc(G.text)}</p><span class="small faint">${esc(G.measure)} · ${esc(G.deadlineStated)}</span></div>`,
    method: 'goal.specific', next: '#/goal', nextText: 'That is it', done, ambient: 'center',
  });

  S.goal = () => ({
    name: 'The finish line', tip: 'The goal read back as a line with the stated date. The record will test that date later. <b>Build the agent</b> starts the two-source build.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('The finish line', { text: 'Change', href: '#/state?done=1' })}
      <div class="spacer" style="flex:0.5"></div>
      <h1 class="big-title">${esc(G.text)}</h1>
      <div class="stack" style="gap:4px"><span class="sent">${esc(G.measure)}.</span><span class="sent">${esc(G.deadlineStated)}, as stated. ${G.monthsStated} months.</span></div>
      ${dist(0, 0, { start: G.start, end: G.deadlineStated })}
      <div class="spacer"></div>
      <p class="small faint">An agent will be built for this goal from two sources: you, and the record of people who got there. About twenty minutes.</p>
      <div class="stack" style="gap:10px; padding-bottom:28px"><a class="btn primary block" href="#/build">Build the agent</a></div>
    </div>`,
  });

  S.sources = () => ({
    name: 'Two sources', tip: 'The Build phase has two columns that start empty and fill side by side: YOU (interview) and THE RECORD (deep research the agent runs in the background).', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('Building the agent', { text: 'Later', href: '#/goal' })}
      ${guide('Two sources, one plan. I ask you about you. While you answer, I read how people who actually got there did it. Then I put the two side by side.', 'speaking')}
      <div class="sources" style="padding-top:8px">
        <div class="src"><span class="h">You</span><span class="k">Time and money</span><span class="k">Audience and network</span><span class="k">Abilities and pattern</span></div>
        <div class="src"><span class="h rec">The record</span><span class="k">Cases, 5–10, with numbers</span><span class="k">The common path and timeline</span><span class="k">Failure modes · what experts say</span></div>
      </div>
      <div class="spacer"></div>
      ${why('two.sources')}
      <div class="stack" style="gap:10px; padding-bottom:28px"><a class="btn primary block" href="#/build/time?live=1">Start</a></div>
    </div>`,
  });

  // YOU, with the record's research ticking underneath.
  const Y = Object.fromEntries(D.you.map((y) => [y.key, y]));
  const keeps = (ks) => `<div class="keeps">${ks.map((k) => `<div class="k"><i></i><span class="body">${esc(k)}</span></div>`).join('')}</div>`;
  S.you = (key, p) => {
    const y = Y[key]; const order = ['time', 'reach', 'ship']; const i = order.indexOf(key);
    const next = i < 2 ? `#/build/${order[i + 1]}?done=1` : '#/record';
    const ready = key === 'ship';
    return answerScreen({
      name: `Build · you · ${y.title}${p.live ? ' · researching' : ''}`,
      tip: p.live ? 'Research in progress: the agent asks about Lena while the ticker shows the record being assembled in the background.' : `Answer kept as facts. ${ready ? 'The dossier is ready; the agent already answers from it.' : 'The ticker shows the record narrowing.'}`,
      eyebrowText: `You · ${y.step} · ${y.title}`, question: y.question, answer: y.answer,
      keptHtml: keeps(y.keeps) + (y.reply ? `<div class="guide" style="padding-top:14px"><div class="halo inline" data-state="speaking"></div><p class="heading" style="font-size:16px; line-height:23px">${esc(y.reply)}</p></div>` : ''),
      footHtml: ticker(y.ticker, { ready, title: ready ? 'The record · ready' : 'The record · researching' }),
      method: y.method, next, nextText: ready ? 'Read the record' : 'Next', done: p.done, live: p.live,
    });
  };

  // THE RECORD: the dossier, four screens.
  const recNav = (on) => `<div class="deck-dots">${['cases', 'path', 'fails', 'experts'].map((k) => `<a href="#/record/${k}"><i class="${k === on ? 'on' : ''}"></i></a>`).join('')}</div>`;
  const recTitle = (t) => `<h1 class="big-title" style="font-size:28px; line-height:34px">${t}</h1>`;
  S.recordCases = () => ({
    name: 'The record · cases', tip: 'Ten public cases for this exact goal, with what carried them, audience at the start, and time to $10k a month. The three audience launches are dimmed: not Lena’s path.',
    html: `
    <div class="content sp" style="gap:16px">
      ${eyebrow('The record · 1 of 4 · cases', { text: 'You', href: '#/build/ship?done=1' })}
      ${recTitle('Ten who got there.')}
      <div class="cases">${R.cases.map((c) => `<div class="case ${c.path === 'X launch' ? 'dim' : ''}"><span class="n">${c.n}</span><span class="who">${esc(c.who)} <span>· ${esc(c.what)}</span></span><span class="t">${esc(c.time)}<span>${esc(c.aud)} audience</span></span><span class="path">${esc(c.path)}</span></div>`).join('')}</div>
      <span class="caveat">${esc(R.caveat)}</span>
      <div class="spacer"></div>
      ${recNav('cases')}
      <div class="footbar" style="padding-bottom:8px"><span class="small faint">Next: the common path</span><a class="btn primary compact" href="#/record/path">Next</a></div>
    </div>`,
  });
  S.recordPath = () => ({
    name: 'The record · path and numbers', tip: 'The common path of the no-audience cases, the typical timeline, and the funnel numbers the plan will use.',
    html: `
    <div class="content sp" style="gap:18px">
      ${eyebrow('The record · 2 of 4 · the path', { text: 'You', href: '#/build/ship?done=1' })}
      ${recTitle('How the no-audience cases did it.')}
      <div class="rows">${R.path.map(([w, t]) => `<div class="r"><span class="micro">${esc(w)}</span><span class="small">${esc(t)}</span></div>`).join('')}</div>
      <p class="small faint">${esc(R.timeline)}</p>
      <div class="grid3">${R.numbers.map(([v, l]) => `<div class="n"><span class="v">${esc(v)}</span><span class="micro">${esc(l)}</span></div>`).join('')}</div>
      <div class="spacer"></div>
      ${recNav('path')}
      <div class="footbar" style="padding-bottom:8px"><span class="small faint">Next: how the rest failed</span><a class="btn primary compact" href="#/record/fails">Next</a></div>
    </div>`,
  });
  S.recordFails = () => ({
    name: 'The record · failure modes', tip: 'Twelve failed cases, five modes, ranked. The first one is Lena’s own pattern; the agent will say so next.',
    html: `
    <div class="content sp" style="gap:18px">
      ${eyebrow('The record · 3 of 4 · failure modes', { text: 'You', href: '#/build/ship?done=1' })}
      ${recTitle('Twelve who did not.')}
      <div class="rows fails" style="gap:14px">${R.failures.map(([n, t], i) => `<div class="r ${i === 0 ? 'one' : ''}"><span class="micro">${esc(n)}</span><span class="small">${esc(t)}</span></div>`).join('')}</div>
      <p class="small faint">Mode one is your pattern, in your words, twice.</p>
      <div class="spacer"></div>
      ${recNav('fails')}
      <div class="footbar" style="padding-bottom:8px"><span class="small faint">Next: what experts say</span><a class="btn primary compact" href="#/record/experts">Next</a></div>
    </div>`,
  });
  S.recordExperts = () => ({
    name: 'The record · experts and sources', tip: 'Three frameworks the plan leans on, paraphrased and sourced, and the size of the search. Then the record meets Lena’s answers.',
    html: `
    <div class="content sp" style="gap:18px">
      ${eyebrow('The record · 4 of 4 · experts', { text: 'You', href: '#/build/ship?done=1' })}
      ${recTitle('What the experts add.')}
      <div class="ex">${R.experts.map(([s, t]) => `<div class="e"><span class="micro">${esc(s)}</span><span class="body">${esc(t)}</span></div>`).join('')}</div>
      <div class="srcs"><span class="micro"><b>${esc(R.scanned)}</b> scanned</span><span class="micro"><b>${R.matched}</b> matched</span><span class="micro"><b>${R.kept}</b> kept</span><span class="micro"><b>${R.failed}</b> failed cases</span><span class="micro"><b>${R.frameworks}</b> frameworks</span></div>
      <div class="spacer"></div>
      ${recNav('experts')}
      <div class="stack" style="gap:10px; padding-bottom:8px"><a class="btn primary block" href="#/confront/deadline">Put it against your answers</a></div>
    </div>`,
  });

  // CONFRONT: your answer, the record, the question the gap produces.
  const C = Object.fromEntries(D.confront.map((c) => [c.key, c]));
  S.confront = (key) => {
    const c = C[key]; const isLast = key === 'pattern';
    const nextFor = { deadline: '#/confront/pattern', pattern: '#/plan' };
    return {
      name: `Confront · ${c.title}`, tip: 'Where the two sources meet. Your words on top, the record beneath, and the next question comes from the gap. One choice must be made.',
      html: `
      <div class="content sp" style="gap:18px">
        ${eyebrow(`You against the record · ${key === 'deadline' ? '1' : '2'} of 2`, { text: 'Record', href: '#/record' })}
        <div class="vs">
          <div class="side you"><span class="micro">You said</span><p class="sent">${esc(c.you)}</p></div>
          <div class="side rec"><span class="micro">The record</span><p class="sent">${esc(c.rec)}</p></div>
        </div>
        ${guide(esc(c.ask), 'speaking')}
        <div class="choices tight" id="choices">${c.options.map(([k, t, s]) => `<div class="ch ${k === c.pick ? 'on' : ''}" data-k="${k}"><span class="body">${esc(t)}</span><span class="small">${esc(s)}</span></div>`).join('')}</div>
        <div class="spacer"></div>
        ${why(c.method)}
        <div class="footbar"><div class="halo small" data-state="listening"></div><a class="btn primary compact" id="pickBtn" href="${nextFor[key]}">${isLast ? 'See the plan' : 'Decide'}</a></div>
      </div>`,
      mount(root) {
        root.querySelectorAll('.ch').forEach((ch) => ch.addEventListener('click', () => {
          root.querySelectorAll('.ch').forEach((x) => x.classList.remove('on')); ch.classList.add('on');
          const b = root.querySelector('#pickBtn');
          if (key === 'pattern') { b.textContent = ch.dataset.k === 'build' ? 'Stop here' : 'See the plan'; b.setAttribute('href', ch.dataset.k === 'build' ? '#/agents' : '#/plan'); }
        }));
      },
    };
  };

  // THE PLAN with origins.
  S.plan = () => ({
    name: 'The plan', tip: 'Six steps, dated, each with its gate. Every step carries its origin in the record and the fact about Lena that selected it; tap a step for “why this, not that.”',
    html: `
    <div class="content with-tabs sp plan-ov" style="gap:14px">
      ${eyebrow(`The plan · ${P.months} months`, { text: 'Gates', href: '#/plan/gates' })}
      ${agentbar(G.agent, 'proposes', 'speaking')}
      <p class="sent lede">${esc(P.shape)}</p>
      <div class="steps">${P.steps.map((s) => `<a class="st" href="#/plan/step/${s.n}"><span class="n">${s.n}</span><div class="t"><span class="body">${esc(s.title)}</span><span class="small">${esc(s.dates)} · <b>${esc(s.rule.split(':')[0])}</b></span></div></a>`).join('')}</div>
      ${dist(0, 0, { start: G.start, end: `${P.end} · $10k MRR` })}
      <div class="spacer"></div>
      <div class="footbar" style="padding-bottom:8px"><a class="btn ghost compact" href="#/confront/pattern" style="margin-left:-12px">Push back</a><a class="btn primary compact" href="#/commit">Agree</a></div>
    </div>
    ${tabs('plan')}`,
  });

  S.step = (n) => {
    const s = P.steps.find((x) => x.n === Number(n)) || P.steps[0];
    const prev = s.n > 1 ? `#/plan/step/${s.n - 1}` : '#/plan'; const next = s.n < 6 ? `#/plan/step/${s.n + 1}` : '#/plan/gates';
    const notFirst = s.not.split('. ')[0]; const notRest = s.not.split('. ').slice(1).join('. ');
    return {
      name: `Plan · step ${s.n} · why this, not that`, tip: 'One step per screen: the deliverable with numbers and dates, where it comes from in the record, which fact about Lena selected it, the rejected alternative, and the gate.',
      html: `
      <div class="content with-tabs step">
        ${eyebrow(`Step ${s.n} of 6 · ${esc(s.dates)}`, { text: 'Plan', href: '#/plan' })}
        <h1 class="sent big">${esc(s.title)}</h1>
        <div class="dl">${s.deliver.map((d) => `<div class="d"><i></i><span class="small">${esc(d)}</span></div>`).join('')}</div>
        <div class="crit">${s.criteria.map((c) => `<span class="micro">${esc(c)}</span>`).join('')}</div>
        <div class="org rec"><span class="micro">The record</span><span class="small">${esc(s.record)}</span></div>
        <div class="org"><span class="micro">You</span><span class="small">${esc(s.you)}</span></div>
        <div class="org not"><span class="micro">Not that</span><span class="small"><b>${esc(notFirst)}.</b> ${esc(notRest)}</span></div>
        <div class="org rule"><span class="micro">Gate</span><span class="small">${esc(s.rule)}</span></div>
        <div class="spacer"></div>
        <div class="deck-dots">${P.steps.map((x) => `<a href="#/plan/step/${x.n}"><i class="${x.n === s.n ? 'on' : ''}"></i></a>`).join('')}</div>
        <div class="footbar" style="padding-bottom:8px"><a class="btn ghost compact" href="${prev}" style="margin-left:-12px">Back</a><a class="btn primary compact" href="${next}">${s.n < 6 ? 'Next step' : 'All gates'}</a></div>
      </div>
      ${tabs('plan')}`,
    };
  };

  S.gates = () => ({
    name: 'Decision points and kill criteria', tip: 'Every gate on one screen: date, the condition, what happens. Decided now, before Lena is inside it.',
    html: `
    <div class="content with-tabs sp" style="gap:18px">
      ${eyebrow('Decision points and kill criteria', { text: 'Plan', href: '#/plan' })}
      ${recTitle('Decided before, not during.')}
      <div class="rows gates" style="gap:14px">${P.gates.map(([d, c, w]) => `<div class="r"><span class="micro">${esc(d)}</span><div class="t"><span class="small">${esc(c)}</span><span class="small c">→ ${esc(w)}</span></div></div>`).join('')}</div>
      <div class="spacer"></div>
      ${why('plan.kill')}
      <div class="footbar" style="padding-bottom:8px"><a class="btn ghost compact" href="#/plan/step/1" style="margin-left:-12px">Steps</a><a class="btn primary compact" href="#/commit">Agree</a></div>
    </div>
    ${tabs('plan')}`,
  });

  S.commit = () => ({
    name: 'Commitment', tip: 'The agent’s character, its cadence on Lena’s real hours, what counts as evidence, and one stake she chose. <b>Commit</b> starts it Tuesday at 18:45.',
    html: `
    <div class="content sp">
      ${eyebrow('Commitment', { text: 'Back', href: '#/plan' })}
      ${agentbar(G.agent, `${D.commit.character} · Tue Thu Sat`, 'idle')}
      ${keeps([...D.commit.cadence, D.commit.evidence])}
      <div class="kept"><span class="micro">Stake · yours</span><p class="sent">${esc(D.commit.stake)}</p></div>
      <div class="spacer"></div>
      ${why('commit.stake')}
      <div class="stack" style="gap:10px; padding-bottom:28px">
        <a class="btn primary block" href="#/home">Commit</a>
        <span class="small faint center">Starts Tuesday 1 Dec, 18:45. You can change the intensity, not the gates.</span>
      </div>
    </div>`,
  });

  // THE AGENT AT WORK
  S.home = (state = 'behind') => {
    const behind = state === 'behind';
    return {
      name: behind ? 'Agent home · behind' : 'Agent home · on plan', tip: 'Home is one agent: honest status in large type, the distance line with where the plan says you should be, tonight’s demand with numbers. The rate line says what the gap means.',
      html: `
      <div class="content with-tabs sp">
        ${eyebrow(N.day, { text: 'Settings', href: '#/settings' })}
        ${agentbar(G.agent, `Week ${N.week} of ${N.weeks} · step 2, pre-sell · ${D.commit.character}`, 'idle')}
        <div class="stack" style="gap:4px"><h1 class="big-title">${behind ? esc(N.behind) : 'On plan.'}</h1><span class="small faint">${esc(N.sub)}</span></div>
        ${dist(N.planPct, behind ? N.youPct : N.planPct, { start: G.start, end: `${G.deadline} · ${N.daysLeft} days` })}
        <div class="demand">
          <span class="micro">Tonight · Tue 19–22</span>
          <p class="sent">${esc(N.demand)}</p>
          <span class="small">${esc(N.firstTwo)}</span>
        </div>
        <div class="spacer"></div>
        <div class="row" style="justify-content:space-between; align-items:baseline; gap:12px">
          <span class="small faint">${behind ? esc(N.projected) : 'Gate 24 Jan on track.'}</span>
          <a class="btn primary compact" href="#/evidence" style="flex:none">Send the sheet</a>
        </div>
      </div>
      ${tabs('today')}`,
    };
  };

  S.checkinLock = () => ({
    name: 'Check-in · lock screen', tip: 'The agent initiates. 22:15, nothing came in. One line, plain. Tap it.', ambient: 'center',
    html: `
    <div class="lock">
      <span class="date">${esc(N.day)}</span>
      <span class="time">22:15</span>
      <div class="notif">
        <div class="halo small" data-state="speaking" style="--size:36px"></div>
        <div class="t">
          <div class="row"><span class="micro">${esc(G.agent).toUpperCase()}</span><span class="micro">now</span></div>
          <span class="body">${esc(N.checkin.line)}</span>
          <span class="small">${esc(N.checkin.sub)}</span>
        </div>
      </div>
      <a class="hint small" href="#/checkin">Tap the notification to answer</a>
    </div>`,
    mount(root) { root.querySelector('.notif').addEventListener('click', () => { location.hash = '#/checkin'; }); },
  });

  S.checkin = () => ({
    name: 'Check-in', tip: 'Agent-initiated. Three honest answers or speak. Each leads somewhere: evidence, or the drift screen.',
    html: `
    <div class="content sp">
      ${eyebrow('Check-in · 22:15', { text: 'Later', href: '#/home' })}
      ${guide(esc(N.checkin.line), 'speaking')}
      <div class="stack" style="gap:6px">
        <span class="micro faint">Tonight’s demand</span>
        <p class="sent">${esc(N.demand)}</p>
      </div>
      <div class="ctrl">
        <a class="chip on" href="#/evidence">All 20, did not send the sheet</a>
        <a class="chip" href="#/evidence">Fewer than 20</a>
        <a class="chip" href="#/drift">None</a>
      </div>
      <div class="spacer"></div>
      ${why('checkin.monitoring')}
      ${intake({ state: 'listening', label: 'Listening', sub: 'Or just say it.' })}
    </div>`,
  });

  S.evidence = (done) => ({
    name: 'Evidence', tip: 'Three ways to prove the session: a screenshot (sent folder, the sheet, the Partner dashboard), numbers, or voice. The agent reads the numbers off the image.',
    html: `
    <div class="content sp">
      ${eyebrow('Evidence · tonight’s outreach', { text: 'Back', href: '#/home' })}
      ${guide(done ? 'Got it. Twenty sent, four replies already.' : 'Show me the session.', done ? 'idle' : 'speaking')}
      <div class="ev" id="ev">
        <div class="tgt ${done ? 'on' : ''}" data-k="photo">${done ? '<div class="thumb" data-v="20"></div>' : `<div class="ic">${ICON.cam}</div>`}<div class="t"><span class="body">Screenshot</span><span class="small">${done ? 'Read: 20 sent · 4 replies · 1 call booked' : 'Sent folder, the sheet, or the Partner dashboard'}</span></div><span class="val ${done ? '' : 'ph'}">${done ? '20 sent' : '—'}</span></div>
        <div class="tgt" data-k="num"><div class="ic">${ICON.num}</div><div class="t"><span class="body">Numbers</span><span class="small">Sent · replies · calls · prepaid</span></div><span class="val ph">—</span></div>
        <div class="tgt" data-k="voice"><div class="ic">${ICON.mic}</div><div class="t"><span class="body">Say it</span><span class="small">“Twenty out, four back, one call Thursday”</span></div><span class="val ph">—</span></div>
      </div>
      <div class="spacer"></div>
      <div class="footbar">
        <span class="small faint">${done ? 'Kept for Sunday’s review.' : 'No evidence, no tick.'}</span>
        <a class="btn primary compact" id="sendBtn" href="#/evidence/ok" style="${done ? '' : 'opacity:0.4; pointer-events:none'}">Send</a>
      </div>
    </div>`,
    mount(root) {
      root.querySelectorAll('.ev .tgt').forEach((t) => t.addEventListener('click', () => {
        root.querySelectorAll('.ev .tgt').forEach((x) => x.classList.remove('on')); t.classList.add('on');
        const v = t.querySelector('.val'); v.classList.remove('ph');
        v.textContent = t.dataset.k === 'photo' ? '20 sent' : t.dataset.k === 'num' ? '20 · 4 · 1' : '0:07';
        if (t.dataset.k === 'photo') { const th = document.createElement('div'); th.className = 'thumb'; th.dataset.v = '20'; t.querySelector('.ic')?.replaceWith(th); t.querySelector('.t .small').textContent = 'Read: 20 sent · 4 replies · 1 call booked'; }
        const b = root.querySelector('#sendBtn'); b.style.opacity = ''; b.style.pointerEvents = '';
      }));
    },
  });

  S.evidenceOk = () => ({
    name: 'Evidence accepted', tip: 'Status recomputed in plain words against the gate. The line moves by what was proven, not by what was said.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('Accepted')}
      ${agentbar(G.agent, `Week ${N.week} · ${D.commit.character}`, 'speaking')}
      <div class="spacer" style="flex:0.4"></div>
      <h1 class="big-num">${N.evidence.sent}<small>sent</small></h1>
      <p class="sent lead">Four replies, one call Thursday with a candle store in Graz. Reply rate holds at thirty percent.</p>
      <p class="sent">Still 2 of 3 prepaid. Thursday’s call is the third, or it is not.</p>
      ${dist(N.planPct, N.planPct - 0.008, { start: G.start, end: `${G.deadline} · ${N.daysLeft} days` })}
      <div class="spacer"></div>
      <div class="stack" style="gap:10px; padding-bottom:28px"><a class="btn primary block" href="#/home">Back to the agent</a></div>
    </div>`,
  });

  S.drift = () => {
    const d = D.drift;
    return {
      name: 'Drift', tip: 'Candor without a verdict: the numbers, where the hours actually went, Lena’s own words about her pattern. One way out: choose.',
      html: `
      <div class="content sp">
        ${eyebrow(d.when, { text: 'Later', href: '#/home' })}
        ${agentbar(G.agent, 'Firm', 'speaking')}
        <h1 class="big-title">${esc(d.title)}</h1>
        ${dist(d.planPct, d.youPct, { start: G.start, end: `${G.deadline} · ${d.daysLeft} days` })}
        <div class="stack" style="gap:10px">${d.lines.map((l) => `<p class="sent">${esc(l)}</p>`).join('')}</div>
        <div class="spacer"></div>
        ${why('drift.candor')}
        <div class="stack" style="gap:10px; padding-bottom:28px"><a class="btn primary block" href="#/recommit">Choose what happens now</a></div>
      </div>`,
    };
  };

  S.recommit = () => ({
    name: 'Recommit', tip: 'Three options, one must be picked. Recommitting re-arms the stake and locks the repo until the gate. Moving the gate is allowed once, said out loud.',
    html: `
    <div class="content sp">
      ${eyebrow('Choose', { text: 'Back', href: '#/drift' })}
      ${guide('Three ways from here. Pick one; I will hold you to it.', 'idle')}
      <div class="choices" id="choices">
        <div class="ch on" data-k="recommit"><span class="body">Recommit: 20 emails Thursday, repo locked until the gate</span><span class="small">Miss two sessions in a row and Dóra gets the numbers.</span></div>
        <div class="ch" data-k="move"><span class="body">Move the gate two weeks</span><span class="small">Said once, out loud. Every later date moves with it; the line does not.</span></div>
        <div class="ch" data-k="stop"><span class="body">Stop this agent</span><span class="small">It ends tonight. The record and the dossier stay.</span></div>
      </div>
      <div class="spacer"></div>
      ${why('recommit.choice')}
      <div class="footbar">
        <div class="halo small" data-state="listening"></div>
        <a class="btn primary compact" id="pickBtn" href="#/home">Recommit</a>
      </div>
    </div>`,
    mount(root) {
      const labels = { recommit: ['Recommit', '#/home'], move: ['Move the gate', '#/replan'], stop: ['Stop the agent', '#/agents'] };
      root.querySelectorAll('.ch').forEach((c) => c.addEventListener('click', () => {
        root.querySelectorAll('.ch').forEach((x) => x.classList.remove('on')); c.classList.add('on');
        const b = root.querySelector('#pickBtn'); b.textContent = labels[c.dataset.k][0]; b.setAttribute('href', labels[c.dataset.k][1]);
      }));
    },
  });

  S.replan = () => {
    const r = D.replan;
    return {
      name: 'Replan · a gate fired', tip: 'The 24 Jan gate fired with 2 of 3. The pre-decided rule runs: the path shifts, the dates after it shift, the line does not. Risk stated in one line.',
      html: `
      <div class="content sp">
        ${eyebrow(r.when, { text: 'Later', href: '#/home' })}
        ${agentbar(G.agent, 'Firm', 'speaking')}
        <div class="stack" style="gap:6px"><span class="micro faint">What happened</span><p class="sent lead">${esc(r.cause)}</p></div>
        <div class="stack" style="gap:6px"><span class="micro faint">What the rule does</span><p class="sent" style="font-size:18px; line-height:25px">${esc(r.change)}</p></div>
        <div class="rows moves">${r.moves.map(([a, b, t]) => `<div class="r"><span class="micro">${a === b ? '' : `<span>${esc(a)}</span>`}${esc(b)}</span><span class="small">${esc(t)}</span></div>`).join('')}</div>
        <p class="small faint">${esc(r.risk)}</p>
        <div class="spacer"></div>
        ${why('replan.flex')}
        <div class="footbar"><a class="btn ghost compact" href="#/recommit" style="margin-left:-12px">Niche two instead</a><a class="btn primary compact" href="#/home">Take the two weeks</a></div>
      </div>`,
    };
  };

  S.review = () => {
    const r = D.review;
    return {
      name: 'Weekly accountability review', tip: 'Sunday 18:00. Numbers against plan, where the hours went, the miss named with its cause, status in a sentence, next week’s demand. No verdicts.',
      html: `
      <div class="content with-tabs sp review" style="gap:14px">
        ${eyebrow(`Week ${r.week} review · Sunday 18:00`, { text: 'Agents', href: '#/agents' })}
        ${agentbar(G.agent, `Week ${r.week} of ${N.weeks} · ${r.hours}`, 'speaking')}
        <div class="nums">${r.nums.map(([v, d, l], i) => `<div class="n ${i === 1 ? 'ahead' : ''}"><span class="v">${v}<small>${d}</small></span><span class="micro">${l}</span></div>`).join('')}</div>
        <p class="sent lead" style="font-size:18px; line-height:25px">${esc(r.status)}</p>
        <div class="pairs"><div class="p"><span class="micro">Missed · ${esc(r.missed[0])}</span><span class="body">${esc(r.missed[1])}</span></div></div>
        <div class="demand"><span class="micro">Next week</span><p class="sent" style="font-size:18px; line-height:25px">${esc(r.next)}</p></div>
        <div class="spacer"></div>
        ${why('review.weekly')}
        <div class="footbar" style="padding-bottom:8px"><div class="agentbar"><div class="halo small" data-state="listening"></div><div class="n"><span class="body" style="font-weight:400">Anything to add?</span><span class="micro">Say it, or set the week.</span></div></div><a class="btn primary compact" href="#/home">Set the week</a></div>
      </div>
      ${tabs('today')}`,
    };
  };

  S.agents = () => ({
    name: 'Agents', tip: 'One agent per goal, each with its own character and cadence. Status at a glance; the line shows plan versus you. Tap one.',
    html: `
    <div class="content with-tabs sp">
      ${eyebrow('Agents')}
      <h1 class="big-title">Two agents.</h1>
      <div class="agents">
        ${D.agents.map((a) => `<a class="ag ${a.id === 'tenk' ? 'on' : ''}" href="${a.id === 'tenk' ? '#/home' : '#/agent/second'}">
          <div class="top"><span class="body">${esc(a.name)}</span><span class="micro">${esc(a.character)}</span></div>
          <p class="sent">${esc(a.goal)}</p>
          ${dist(a.plan, a.pct, { labels: false, start: '', end: '' })}
          <div class="st"><span class="small ${a.pct < a.plan ? 'warn' : ''}">${esc(a.status)}</span><span class="small">${esc(a.left)}</span></div>
        </a>`).join('')}
        <a class="new" href="#/state"><span class="small">+ New goal, new agent</span></a>
      </div>
    </div>
    ${tabs('agents')}`,
  });

  S.second = () => {
    const a = D.agents[1];
    return {
      name: 'Second agent · Sub-fifty', tip: 'A different character and cadence for a different kind of goal: steady, three mornings, one number. Same shape of screen.',
      html: `
      <div class="content with-tabs sp">
        ${eyebrow('Wednesday 20 Jan', { text: 'Settings', href: '#/settings' })}
        ${agentbar(a.name, 'Week 11 of 44 · Steady', 'idle')}
        <h1 class="big-title">On plan.</h1>
        ${dist(a.plan, a.pct, { start: '6 Nov', end: '12 Sep · 50:00' })}
        <div class="demand">
          <span class="micro">Tomorrow · 6:30</span>
          <p class="sent">${esc(D.second.demand)}</p>
          <span class="small">${esc(D.second.note)}</span>
        </div>
        <div class="spacer"></div>
        <div class="row" style="justify-content:space-between; align-items:baseline">
          <span class="small faint">${esc(D.second.checkin)}</span>
          <a class="btn primary compact" href="#/evidence">Send the watch</a>
        </div>
      </div>
      ${tabs('today')}`,
    };
  };

  S.finish = () => {
    const F = D.finish;
    return {
      name: 'Finish line', tip: 'The result, the count, what the agent learned about Lena. Then archive, or hand it to the next goal.', ambient: 'center',
      html: `
      <div class="content sp" style="gap:18px">
        ${eyebrow(`${esc(F.date)} · finish line`)}
        ${agentbar(G.agent, 'done', 'speaking')}
        <h1 class="big-num">${F.result}<small>${F.unit}</small></h1>
        <p class="sent lead">${esc(F.line)}</p>
        ${dist(1, 1, { start: G.start, end: F.date })}
        <div class="finish-stats">
          <div class="n"><span class="v">${F.weeks}</span><span class="micro">weeks</span></div>
          <div class="n"><span class="v">${F.reviews}</span><span class="micro">reviews</span></div>
          <div class="n"><span class="v">${F.gates}</span><span class="micro">gates fired</span></div>
          <div class="n"><span class="v">${F.misses}</span><span class="micro">misses</span></div>
        </div>
        <div class="learned">${F.learned.map((l) => `<span class="small">${esc(l)}</span>`).join('')}</div>
        <div class="spacer"></div>
        ${why('finish.reflect')}
        <div class="footbar"><a class="btn ghost compact" href="#/agents" style="margin-left:-12px">Archive</a><a class="btn primary compact" href="#/state">Next goal</a></div>
      </div>`,
    };
  };

  S.settings = () => ({
    name: 'Settings · intensity', tip: 'Per agent: intensity changes how often it speaks and how blunt it is; the gates and the line never move from here. Tap a segment.',
    html: `
    <div class="content with-tabs" style="gap:0">
      ${eyebrow(`${esc(G.agent)} · settings`, { text: 'Back', href: '#/home' })}
      <div class="scroll" style="margin-top:8px">
        <div class="section" style="padding-top:12px">
          <span class="label">Intensity</span>
          <div class="seg" id="seg"><span data-k="gentle">Gentle</span><span class="on" data-k="firm">Firm</span><span data-k="relentless">Relentless</span></div>
          <span class="small seg-note" id="segNote">One demand a session, one check-in if nothing comes in. Plain words, no verdicts.</span>
        </div>
        <div class="section">
          <span class="label">Cadence · on your hours</span>
          <div class="srow"><div class="t"><span class="body">Session demand</span><span class="small">Tue, Thu, Sat · spoken, one line</span></div><span class="small val">18:45</span></div>
          <div class="srow"><div class="t"><span class="body">Check-in</span><span class="small">Only if nothing has come in</span></div><span class="small val">22:15</span></div>
          <div class="srow"><div class="t"><span class="body">Weekly review</span><span class="small">Numbers against plan</span></div><span class="small val">Sun 18:00</span></div>
          <div class="srow"><div class="t"><span class="body">Quiet hours</span><span class="small">Nothing during the job</span></div><span class="small val">8:00–18:30</span></div>
        </div>
        <div class="section">
          <span class="label">Proof and stakes</span>
          <div class="srow"><div class="t"><span class="body">Evidence required</span><span class="small">No screenshot or numbers, no tick</span></div><span class="switch on" data-toggle></span></div>
          <div class="srow"><div class="t"><span class="body">Stake</span><span class="small">Email Dóra after two misses in a row</span></div><span class="switch on" data-toggle></span></div>
          <div class="srow"><div class="t"><span class="body">Why this step</span><span class="small">Show the evidence note and tag</span></div><span class="switch on" data-toggle></span></div>
        </div>
        <div class="section">
          <span class="label">The line and the record</span>
          <div class="srow"><div class="t"><span class="body">Finish line</span><span class="small">$10k MRR · ${esc(G.deadline)}</span></div><span class="micro faint">Locked</span></div>
          <div class="srow"><div class="t"><span class="body">Re-research the record</span><span class="small">Fresh cases, same criteria</span></div><span class="micro accent">Run</span></div>
          <div class="srow" style="border-bottom:0"><div class="t"><span class="body">Stop this agent</span><span class="small">Ends tonight; the record stays</span></div><span class="micro faint">Stop</span></div>
        </div>
      </div>
    </div>
    ${tabs('today')}`,
    mount(root) {
      const notes = {
        gentle: 'One demand a session. No late check-in; it waits for Sunday. Softer words, same numbers.',
        firm: 'One demand a session, one check-in if nothing comes in. Plain words, no verdicts.',
        relentless: 'Demand, a mid-session nudge, the check-in, and it asks why before what. Stake fires after one miss.',
      };
      root.querySelectorAll('#seg span').forEach((s) => s.addEventListener('click', () => {
        root.querySelectorAll('#seg span').forEach((x) => x.classList.remove('on')); s.classList.add('on');
        root.querySelector('#segNote').textContent = notes[s.dataset.k];
      }));
      root.querySelectorAll('[data-toggle]').forEach((s) => s.addEventListener('click', () => s.classList.toggle('on')));
    },
  });

  // ---------- Router ----------
  const ROUTES = [
    { path: '/state', screen: (p) => S.state(p.done), group: 'State the goal', label: 'State the goal' },
    { path: '/goal', screen: () => S.goal(), label: 'The finish line' },
    { path: '/build', screen: () => S.sources(), group: 'Build · two sources', label: 'Two sources' },
    { path: '/build/time', screen: (p) => S.you('time', p), label: 'You · time and money' },
    { path: '/build/reach', screen: (p) => S.you('reach', p), label: 'You · audience and network' },
    { path: '/build/ship', screen: (p) => S.you('ship', p), label: 'You · abilities and pattern' },
    { path: '/record', screen: () => S.recordCases(), label: 'The record · cases' },
    { path: '/record/cases', screen: () => S.recordCases(), hidden: true, nav: '/record' },
    { path: '/record/path', screen: () => S.recordPath(), label: 'The record · path and numbers' },
    { path: '/record/fails', screen: () => S.recordFails(), label: 'The record · failure modes' },
    { path: '/record/experts', screen: () => S.recordExperts(), label: 'The record · experts, sources' },
    { path: '/confront/deadline', screen: () => S.confront('deadline'), label: 'Confront · your date' },
    { path: '/confront/pattern', screen: () => S.confront('pattern'), label: 'Confront · your pattern' },
    { path: '/plan', screen: () => S.plan(), group: 'The plan', label: 'The plan, with origins' },
    { path: '/plan/step/1', screen: () => S.step(1), label: 'Step 1 · why this, not that' },
    { path: '/plan/step/2', screen: () => S.step(2), label: 'Step 2 · pre-sell gate' },
    { path: '/plan/step/3', screen: () => S.step(3), hidden: true },
    { path: '/plan/step/4', screen: () => S.step(4), label: 'Step 4 · the listing' },
    { path: '/plan/step/5', screen: () => S.step(5), hidden: true },
    { path: '/plan/step/6', screen: () => S.step(6), label: 'Step 6 · paid on top' },
    { path: '/plan/gates', screen: () => S.gates(), label: 'Decision points and kill criteria' },
    { path: '/commit', screen: () => S.commit(), label: 'Commitment' },
    { path: '/home', screen: () => S.home('behind'), group: 'The agent at work', label: 'Agent home' },
    { path: '/home/on', screen: () => S.home('on'), hidden: true },
    { path: '/checkin/lock', screen: () => S.checkinLock(), label: 'Check-in · lock screen' },
    { path: '/checkin', screen: () => S.checkin(), label: 'Check-in' },
    { path: '/evidence', screen: (p) => S.evidence(p.done), label: 'Evidence' },
    { path: '/evidence/ok', screen: () => S.evidenceOk(), label: 'Evidence accepted' },
    { path: '/drift', screen: () => S.drift(), group: 'When it slips', label: 'Drift' },
    { path: '/recommit', screen: () => S.recommit(), label: 'Recommit' },
    { path: '/replan', screen: () => S.replan(), label: 'Replan · a gate fired' },
    { path: '/review', screen: () => S.review(), group: 'Rhythm', label: 'Weekly review' },
    { path: '/agents', screen: () => S.agents(), label: 'Agents' },
    { path: '/agent/second', screen: () => S.second(), label: 'Second agent' },
    { path: '/finish', screen: () => S.finish(), group: 'End', label: 'Finish line' },
    { path: '/settings', screen: () => S.settings(), label: 'Settings · intensity' },
  ];
  window.ROUTES = ROUTES;

  const screenEl = document.getElementById('screen');
  const ambientEl = document.getElementById('ambient');
  const noteEl = document.getElementById('stageNote');
  const navEl = document.getElementById('railNav');

  function parseHash() {
    const raw = location.hash.replace(/^#/, '') || '/state';
    const [path, qs] = raw.split('?');
    const sp = new URLSearchParams(qs || '');
    return { path, p: { done: sp.get('done') === '1', live: sp.get('live') === '1' } };
  }
  const resolve = (path) => ROUTES.find((x) => x.path === path) || ROUTES[0];

  function render() {
    stopTyping();
    const { path, p } = parseHash();
    const route = resolve(path);
    const scr = route.screen(p);
    ambientEl.className = `ambient ${scr.ambient || ''}`;
    screenEl.innerHTML = scr.html;
    scr.mount && scr.mount(screenEl);
    noteEl.innerHTML = `<b>${scr.name}</b> — ${scr.tip}`;
    document.title = `${scr.name} · Goal agent`;
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
