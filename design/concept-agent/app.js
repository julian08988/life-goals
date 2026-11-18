/* Life Goals — concept: goal agent. Hash-routed, no build step.
   One goal → one agent built for it → a relentless operator until the finish line. */
(() => {
  const D = window.DATA;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  if (params.get('bare') === '1') document.body.classList.add('bare');

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const q = (s) => `“${esc(s)}”`;

  // ---------- Building blocks ----------
  const eyebrow = (label, right = '') =>
    `<div class="eyebrow"><span class="label">${label}</span>${right ? `<a class="btn ghost compact" style="margin-right:-12px" href="${right.href}">${right.text}</a>` : ''}</div>`;
  const guide = (text, state = 'idle') => `<div class="guide"><div class="halo inline" data-state="${state}"></div><p class="heading">${text}</p></div>`;
  const why = (key) => { const m = D.methods[key]; return `<div class="why line"><span class="small">${esc(m.note)}</span><span class="tag ${m.tag}">${m.tag}</span></div>`; };
  const tabs = (on) =>
    `<div class="tabs">${[['today', 'Today', '#/home'], ['agents', 'Agents', '#/agents'], ['review', 'Review', '#/review']]
      .map(([k, l, h]) => `<a class="tab ${on === k ? 'on' : ''}" href="${h}"><i></i><span class="label">${l}</span></a>`).join('')}</div>`;
  const agentbar = (name, character, state = 'idle') =>
    `<div class="agentbar"><div class="halo small" data-state="${state}" style="--size:34px"></div><div class="n"><span class="body">${esc(name)}</span><span class="micro">${esc(character)}</span></div></div>`;

  // The distance line. plan/you in 0..1. Labels optional.
  const dist = (plan, you, { start = 'Start', end = 'Finish', labels = true } = {}) => {
    const a = Math.min(plan, you) * 100; const b = Math.max(plan, you) * 100;
    return `<div class="dist">
      <div class="track">
        <div class="done" style="width:${you * 100}%"></div>
        ${Math.abs(plan - you) > 0.005 ? `<div class="gap" style="left:${a}%; width:${b - a}%"></div>` : ''}
        <span class="pt start"></span><span class="pt end"></span>
        <span class="pt plan" style="left:${plan * 100}%"></span>
        <span class="pt you" style="left:${you * 100}%"></span>
        ${labels ? `<span class="lbl you" style="left:${you * 100}%">You</span>${Math.abs(plan - you) > 0.005 ? `<span class="lbl plan" style="left:${plan * 100}%">Plan</span>` : ''}` : ''}
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

  // A spoken-answer screen: guide asks, the user answers (typed in for the demo), something is kept.
  function answerScreen({ name, tip, eyebrowText, question, answer, keptHtml, method, next, nextText = 'Next', done, right = { text: 'Later', href: '#/home' }, ambient }) {
    return {
      name, tip, ambient,
      html: `
      <div class="content sp">
        ${eyebrow(eyebrowText, right)}
        ${guide(esc(question), done ? 'idle' : 'speaking')}
        <div class="typebox" id="typebox" style="display:none"><span class="ph">Type your answer…</span></div>
        <p class="transcript" id="transcript"><span class="said"></span><span class="caret"></span></p>
        <div class="reveal" id="kept" style="display:none">${keptHtml}</div>
        <div class="spacer"></div>
        ${why(method)}
        ${intake({ state: done ? 'listening' : 'idle', label: done ? 'Listening' : 'Tap to answer', sub: done ? 'Pause to finish, or keep going.' : undefined, next, nextText, showNext: done })}
      </div>`,
      mount(root) {
        const t = root.querySelector('#transcript');
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
  const G = D.goal; const N = D.now;

  S.state = (done) => answerScreen({
    name: 'State the goal', tip: 'The first screen is a question, not a map. One goal, said out loud. Tap the <b>halo</b>; Tomás’s answer is typed in for the demo.',
    eyebrowText: 'One goal', right: { text: 'Agents', href: '#/agents' },
    question: 'One goal. Say it with a finish line and a date.',
    answer: G.said,
    keptHtml: `<div class="kept"><span class="micro">Heard</span><p class="sent">${esc(G.text)}</p><span class="small faint">${esc(G.measure)} · ${esc(G.deadline)}</span></div>`,
    method: 'goal.specific', next: '#/goal', nextText: 'That is it', done, ambient: 'center',
  });

  S.goal = () => ({
    name: 'The finish line', tip: 'The goal read back as a line with a date. Nothing else exists yet. <b>Build the agent</b> starts the four-question build.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('The finish line', { text: 'Change', href: '#/state?done=1' })}
      <div class="spacer" style="flex:0.5"></div>
      <h1 class="big-title">${esc(G.text)}</h1>
      <div class="stack" style="gap:4px"><span class="sent">${esc(G.measure)}.</span><span class="sent">${esc(G.deadline)}. ${G.daysLeft} days.</span></div>
      ${dist(0, 0, { start: 'Today', end: G.deadline })}
      <div class="spacer"></div>
      <p class="small faint">An agent will be built for this goal and nothing else. Four questions, about ten minutes.</p>
      <div class="stack" style="gap:10px; padding-bottom:28px"><a class="btn primary block" href="#/build/why">Build the agent</a></div>
    </div>`,
  });

  const B = Object.fromEntries(D.build.map((b) => [b.key, b]));
  S.why = (done) => answerScreen({
    name: 'Building · why', tip: 'The agent asks for the reason it will repeat back on bad days. It is kept in Tomás’s words.',
    eyebrowText: `Building · ${B.why.step} · ${B.why.title}`, question: B.why.question, answer: B.why.answer,
    keptHtml: `<div class="kept"><span class="micro">${esc(B.why.keep.label)} · it will hear this back</span><p class="sent">${esc(B.why.keep.text)}</p></div>`,
    method: B.why.method, next: '#/build/constraints', done,
  });
  S.constraints = (done) => answerScreen({
    name: 'Building · deadline and constraints', tip: 'Fixed things become rules the plan cannot break: hours, blocked evenings, the knee.',
    eyebrowText: `Building · ${B.constraints.step} · ${B.constraints.title}`, question: B.constraints.question, answer: B.constraints.answer,
    keptHtml: `<div class="keeps">${B.constraints.keeps.map((k) => `<div class="k"><i></i><span class="body">${esc(k)}</span></div>`).join('')}</div>`,
    method: B.constraints.method, next: '#/build/obstacles', done,
  });
  S.obstacles = (done) => answerScreen({
    name: 'Building · obstacles', tip: 'Each real obstacle gets an if-then the agent will fire at the right moment.',
    eyebrowText: `Building · ${B.obstacles.step} · ${B.obstacles.title}`, question: B.obstacles.question, answer: B.obstacles.answer,
    keptHtml: `<div class="pairs">${B.obstacles.pairs.map(([o, p]) => `<div class="p"><span class="micro">${esc(o)}</span><span class="body">${esc(p)}</span></div>`).join('')}</div>`,
    method: B.obstacles.method, next: '#/build/patterns', done,
  });
  S.patterns = (done) => answerScreen({
    name: 'Building · your pattern', tip: 'How Tomás has failed before shapes where the agent is loudest. The agent answers in one line.',
    eyebrowText: `Building · ${B.patterns.step} · ${B.patterns.title}`, question: B.patterns.question, answer: B.patterns.answer,
    keptHtml: `<div class="kept"><span class="micro">${esc(B.patterns.keep.label)}</span><p class="sent">${esc(B.patterns.keep.text)}</p></div><div class="guide" style="padding-top:16px"><div class="halo inline" data-state="speaking"></div><p class="heading" style="font-size:17px; line-height:24px">${esc(B.patterns.reply)}</p></div>`,
    method: B.patterns.method, next: '#/plan', nextText: 'See the plan', done,
  });

  S.plan = () => ({
    name: 'The proposed plan', tip: 'Shape, checkpoints with dates, pace. One screen. <b>Agree</b> moves to the commitment.',
    html: `
    <div class="content sp">
      ${eyebrow('The plan', { text: 'Change', href: '#/build/constraints?done=1' })}
      ${agentbar(G.agent, 'proposes', 'speaking')}
      <p class="sent lead">${esc(D.plan.shape)}</p>
      <div class="cps">${D.plan.checkpoints.map(([d, t], i, a) => `<div class="c ${i === a.length - 1 ? 'last' : ''}"><span class="micro">${esc(d)}</span><span class="body">${esc(t)}</span></div>`).join('')}</div>
      <p class="small faint">${esc(D.plan.pace)}</p>
      <div class="spacer"></div>
      ${why('plan.checkpoints')}
      <div class="footbar"><a class="btn ghost compact" href="#/build/patterns?done=1" style="margin-left:-12px">Push back</a><a class="btn primary compact" href="#/commit">Agree</a></div>
    </div>`,
  });

  S.commit = () => ({
    name: 'Commitment', tip: 'The agent’s character, its cadence, what counts as evidence, and one stake Tomás chose. <b>Commit</b> starts it tomorrow at 6:45.',
    html: `
    <div class="content sp">
      ${eyebrow('Commitment', { text: 'Back', href: '#/plan' })}
      ${agentbar(G.agent, `${D.commit.character} · daily`, 'idle')}
      <div class="keeps">
        ${D.commit.cadence.map((c) => `<div class="k"><i></i><span class="body">${esc(c)}</span></div>`).join('')}
        <div class="k"><i></i><span class="body">${esc(D.commit.evidence)}</span></div>
      </div>
      <div class="kept"><span class="micro">Stake · yours</span><p class="sent">${esc(D.commit.stake)}</p></div>
      <div class="spacer"></div>
      ${why('commit.stake')}
      <div class="stack" style="gap:10px; padding-bottom:28px">
        <a class="btn primary block" href="#/home">Commit</a>
        <span class="small faint center">It starts tomorrow at 6:45. You can change the intensity, not the date.</span>
      </div>
    </div>`,
  });

  S.home = (state = 'behind') => {
    const behind = state === 'behind';
    return {
      name: behind ? 'Agent home · behind' : 'Agent home · on plan', tip: 'Home is one agent: honest status in large type, the distance line with where the plan says you should be, today’s demand. Tap the dots or the line.',
      html: `
      <div class="content with-tabs sp">
        ${eyebrow(N.day, { text: 'Settings', href: '#/settings' })}
        ${agentbar(G.agent, `Week ${N.week} of ${D.plan.weeks} · ${D.commit.character}`, 'idle')}
        <h1 class="big-title">${behind ? esc(N.behind) + '.' : 'On plan.'}</h1>
        ${dist(N.planPct, behind ? N.youPct : N.planPct, { start: '6 Nov', end: `${G.deadline} · ${N.daysLeft} days` })}
        <div class="demand">
          <span class="micro">Today · before 7:15</span>
          <p class="sent">${esc(N.demand)}</p>
          <span class="small">${esc(N.firstTwo)}</span>
        </div>
        <div class="spacer"></div>
        <div class="row" style="justify-content:space-between; align-items:baseline">
          <span class="small faint">${behind ? `At this rate: ${N.projected}, not ${N.target}.` : `Projected ${N.target}. Hold it.`}</span>
          <a class="btn primary compact" href="#/evidence">Send the run</a>
        </div>
      </div>
      ${tabs('today')}`,
    };
  };

  S.checkinLock = () => ({
    name: 'Check-in · lock screen', tip: 'The agent initiates. 19:40, nothing has come in. One line, plain. Tap it.', ambient: 'center',
    html: `
    <div class="lock">
      <span class="date">${esc(N.day)}</span>
      <span class="time">19:40</span>
      <div class="notif">
        <div class="halo small" data-state="speaking" style="--size:36px"></div>
        <div class="t">
          <div class="row"><span class="micro">${esc(G.agent).toUpperCase()}</span><span class="micro">now</span></div>
          <span class="body">The 8 km did not come in. What happened?</span>
          <span class="small">Two of four this week. 54 days to the line.</span>
        </div>
      </div>
      <a class="hint small" href="#/checkin">Tap the notification to answer</a>
    </div>`,
    mount(root) { root.querySelector('.notif').addEventListener('click', () => { location.hash = '#/checkin'; }); },
  });

  S.checkin = () => ({
    name: 'Check-in', tip: 'Agent-initiated. Three honest answers or speak. Each leads somewhere: evidence, a next step, or the drift screen.',
    html: `
    <div class="content sp">
      ${eyebrow('Check-in · 19:40', { text: 'Later', href: '#/home' })}
      ${guide('The 8 km did not come in. What happened?', 'speaking')}
      <div class="stack" style="gap:6px">
        <span class="micro faint">This week · ${N.thisWeek.done} of ${N.thisWeek.planned}</span>
        <p class="sent">${esc(N.demand)}</p>
      </div>
      <div class="ctrl">
        <a class="chip on" href="#/evidence">Did it, did not send</a>
        <a class="chip" href="#/drift">Skipped it</a>
        <a class="chip" href="#/evidence">Did half</a>
      </div>
      <div class="spacer"></div>
      ${why('checkin.monitoring')}
      ${intake({ state: 'listening', label: 'Listening', sub: 'Or just say it.' })}
    </div>`,
  });

  S.evidence = (done) => ({
    name: 'Evidence', tip: 'Three ways to prove the run: watch photo, numbers, voice. Tap one. The agent reads the numbers off the photo.',
    html: `
    <div class="content sp">
      ${eyebrow('Evidence · today’s run', { text: 'Back', href: '#/home' })}
      ${guide(done ? 'Got it. 8.2 km in 48:10.' : 'Show me the run.', done ? 'idle' : 'speaking')}
      <div class="ev" id="ev">
        <div class="tgt ${done ? 'on' : ''}" data-k="photo">${done ? '<div class="thumb"></div>' : `<div class="ic">${ICON.cam}</div>`}<div class="t"><span class="body">Watch photo</span><span class="small">${done ? 'Read: 8.2 km · 48:10 · 5:52/km' : 'I read distance, time and pace off it'}</span></div><span class="val ${done ? '' : 'ph'}">${done ? '8.2 km' : '—'}</span></div>
        <div class="tgt" data-k="num"><div class="ic">${ICON.num}</div><div class="t"><span class="body">Numbers</span><span class="small">Distance and time</span></div><span class="val ph">—</span></div>
        <div class="tgt" data-k="voice"><div class="ic">${ICON.mic}</div><div class="t"><span class="body">Say it</span><span class="small">“Eight point two, forty-eight ten”</span></div><span class="val ph">—</span></div>
      </div>
      <div class="spacer"></div>
      <div class="footbar">
        <span class="small faint">${done ? 'Evidence is kept for the review.' : 'No evidence, no tick.'}</span>
        <a class="btn primary compact" id="sendBtn" href="#/evidence/ok" style="${done ? '' : 'opacity:0.4; pointer-events:none'}">Send</a>
      </div>
    </div>`,
    mount(root) {
      root.querySelectorAll('.ev .tgt').forEach((t) => t.addEventListener('click', () => {
        root.querySelectorAll('.ev .tgt').forEach((x) => x.classList.remove('on')); t.classList.add('on');
        const v = t.querySelector('.val'); v.classList.remove('ph');
        v.textContent = t.dataset.k === 'photo' ? '8.2 km' : t.dataset.k === 'num' ? '8.2 · 48:10' : '0:06';
        if (t.dataset.k === 'photo') { t.querySelector('.ic')?.replaceWith(Object.assign(document.createElement('div'), { className: 'thumb' })); t.querySelector('.t .small').textContent = 'Read: 8.2 km · 48:10 · 5:52/km'; }
        const b = root.querySelector('#sendBtn'); b.style.opacity = ''; b.style.pointerEvents = '';
      }));
    },
  });

  S.evidenceOk = () => ({
    name: 'Evidence accepted', tip: 'Status recomputed in plain words. The gap on the line closes by one run.', ambient: 'center',
    html: `
    <div class="content sp">
      ${eyebrow('Accepted')}
      ${agentbar(G.agent, `Week ${N.week} · ${D.commit.character}`, 'speaking')}
      <div class="spacer" style="flex:0.4"></div>
      <h1 class="big-num">${N.evidence.km}<small>km</small></h1>
      <p class="sent lead">${N.evidence.time}, at ${N.evidence.pace} per km. Easy pace, as asked.</p>
      <p class="sent">Behind by one run now, not two. Thursday closes it.</p>
      ${dist(N.planPct, N.planPct - 0.03, { start: '6 Nov', end: `${G.deadline} · ${N.daysLeft} days` })}
      <div class="spacer"></div>
      <div class="stack" style="gap:10px; padding-bottom:28px"><a class="btn primary block" href="#/home">Back to the agent</a></div>
    </div>`,
  });

  S.drift = () => ({
    name: 'Drift', tip: 'Candor without a verdict: the numbers, the projection, the reason in Tomás’s own words, and the pattern he named. One way out: choose.',
    html: `
    <div class="content sp">
      ${eyebrow('Week 3 · Thursday 20:10', { text: 'Later', href: '#/home' })}
      ${agentbar(G.agent, 'Firm', 'speaking')}
      <h1 class="big-title">Two of four. Week three.</h1>
      ${dist(0.21, 0.15, { start: '6 Nov', end: `${G.deadline} · 86 days` })}
      <div class="stack" style="gap:10px">
        <p class="sent">At this rate the line is ${N.projected}, not ${N.target}.</p>
        <p class="sent">You said this is the week you vanish. You also said: ${q(B.why.keep.text)}</p>
      </div>
      <div class="spacer"></div>
      ${why('drift.candor')}
      <div class="stack" style="gap:10px; padding-bottom:28px"><a class="btn primary block" href="#/recommit">Choose what happens now</a></div>
    </div>`,
  });

  S.recommit = () => ({
    name: 'Recommit', tip: 'Three options, one must be picked. Recommitting re-arms the stake. Moving the line is allowed, once, and said out loud.',
    html: `
    <div class="content sp">
      ${eyebrow('Choose', { text: 'Back', href: '#/drift' })}
      ${guide('Three ways from here. Pick one; I will hold you to it.', 'idle')}
      <div class="choices" id="choices">
        <div class="ch on" data-k="recommit"><span class="body">Recommit to four a week</span><span class="small">Thursday 6:30 and Sunday long. Miss two in a row and Rui hears from me.</span></div>
        <div class="ch" data-k="move"><span class="body">Move the line to 2:05</span><span class="small">Three runs a week. Said once, out loud, and the agent rebuilds the plan.</span></div>
        <div class="ch" data-k="stop"><span class="body">Stop this agent</span><span class="small">It ends tonight. The record stays.</span></div>
      </div>
      <div class="spacer"></div>
      ${why('recommit.choice')}
      <div class="footbar">
        <div class="halo small" data-state="listening"></div>
        <a class="btn primary compact" id="pickBtn" href="#/home">Recommit</a>
      </div>
    </div>`,
    mount(root) {
      const labels = { recommit: ['Recommit', '#/home'], move: ['Move the line', '#/replan'], stop: ['Stop the agent', '#/agents'] };
      root.querySelectorAll('.ch').forEach((c) => c.addEventListener('click', () => {
        root.querySelectorAll('.ch').forEach((x) => x.classList.remove('on')); c.classList.add('on');
        const b = root.querySelector('#pickBtn'); b.textContent = labels[c.dataset.k][0]; b.setAttribute('href', labels[c.dataset.k][1]);
      }));
    },
  });

  S.replan = () => ({
    name: 'Replan', tip: 'Reality changed: the knee. The path changes, the line does not. Risk stated in one line.',
    html: `
    <div class="content sp">
      ${eyebrow('Replan · Monday', { text: 'Later', href: '#/home' })}
      ${agentbar(G.agent, 'Firm', 'speaking')}
      <div class="stack" style="gap:6px"><span class="micro faint">What changed</span><p class="sent lead">${esc(D.replan.cause)}</p></div>
      <div class="stack" style="gap:6px"><span class="micro faint">New path</span><p class="sent">${esc(D.replan.change)}</p></div>
      <div class="cps">
        <div class="c"><span class="micro strike">15 Feb</span><span class="body"><span class="strike">15 km</span> &nbsp;→ 25 Feb</span></div>
        <div class="c last"><span class="micro">15 Mar</span><span class="body">Half marathon under 2:00 · unchanged</span></div>
      </div>
      <p class="small faint">${esc(D.replan.risk)}</p>
      <div class="spacer"></div>
      ${why('replan.flex')}
      <div class="footbar"><a class="btn ghost compact" href="#/recommit" style="margin-left:-12px">Move the line instead</a><a class="btn primary compact" href="#/home">Take the new path</a></div>
    </div>`,
  });

  S.review = () => {
    const R = D.review;
    return {
      name: 'Weekly accountability review', tip: 'Sunday 18:00. Numbers against plan, the miss named with its cause, status in a sentence, next week’s demand. No verdicts.',
      html: `
      <div class="content with-tabs sp" style="gap:20px">
        ${eyebrow(`Week ${R.week} review · Sunday 18:00`, { text: 'Agents', href: '#/agents' })}
        ${agentbar(G.agent, `Week ${R.week} of ${D.plan.weeks}`, 'speaking')}
        <div class="nums">
          <div class="n"><span class="v">${R.done.runs}<small>/${R.planned.runs}</small></span><span class="micro">runs</span></div>
          <div class="n"><span class="v">${R.done.km}<small>/${R.planned.km}</small></span><span class="micro">km</span></div>
          <div class="n ahead"><span class="v">${R.pace[1]}</span><span class="micro">pace · was ${R.pace[0]}</span></div>
        </div>
        <p class="sent lead">${esc(R.status)}</p>
        ${R.misses.map(([d, t]) => `<div class="pairs"><div class="p"><span class="micro">Missed · ${d}</span><span class="body">${esc(t)}</span></div></div>`).join('')}
        <div class="demand"><span class="micro">Next week</span><p class="sent" style="font-size:18px; line-height:25px">${esc(R.nextWeek)}</p></div>
        <div class="spacer"></div>
        ${why('review.weekly')}
        <div class="footbar" style="padding-bottom:8px"><div class="agentbar"><div class="halo small" data-state="listening"></div><div class="n"><span class="body" style="font-weight:400">Anything to add?</span><span class="micro">Say it, or set the week.</span></div></div><a class="btn primary compact" href="#/home">Set the week</a></div>
      </div>
      ${tabs('review')}`,
    };
  };

  S.agents = () => ({
    name: 'Agents', tip: 'One agent per goal, each with its own character and cadence. Status at a glance; the line shows plan versus you. Tap one.',
    html: `
    <div class="content with-tabs sp">
      ${eyebrow('Agents')}
      <h1 class="big-title">Two agents.</h1>
      <div class="agents">
        ${D.agents.map((a) => `<a class="ag ${a.id === 'sub2' ? 'on' : ''}" href="${a.id === 'sub2' ? '#/home' : '#/agent/card'}">
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

  S.agentCard = () => {
    const a = D.agents[1];
    return {
      name: 'Second agent · Card clear', tip: 'A different character and cadence for a different kind of goal: steady, weekly, one number. Same shape of screen.',
      html: `
      <div class="content with-tabs sp">
        ${eyebrow('Sunday 25 Jan', { text: 'Settings', href: '#/settings' })}
        ${agentbar(a.name, `Month 2 of 6 · Steady`, 'idle')}
        <h1 class="big-title">On plan.</h1>
        ${dist(a.plan, a.pct, { start: '€6,400', end: '€0 · 30 Jun' })}
        <div class="demand">
          <span class="micro">This week · by Sunday night</span>
          <p class="sent">${esc(D.card.demand)}</p>
          <span class="small">${esc(D.card.note)}</span>
        </div>
        <div class="spacer"></div>
        <div class="row" style="justify-content:space-between; align-items:baseline">
          <span class="small faint">${esc(D.card.checkin)}</span>
          <a class="btn primary compact" href="#/evidence">Send the transfer</a>
        </div>
      </div>
      ${tabs('today')}`,
    };
  };

  S.finish = () => {
    const F = D.finish;
    return {
      name: 'Finish line', tip: 'The result, the count, what the agent learned about Tomás. Then archive, or hand it to the next goal.', ambient: 'center',
      html: `
      <div class="content sp">
        ${eyebrow(`${esc(F.date)} · finish line`)}
        ${agentbar(G.agent, 'done', 'speaking')}
        <h1 class="big-num">${F.result}</h1>
        <p class="sent lead">Under two hours. ${esc(G.text)}</p>
        ${dist(1, 1, { start: '6 Nov', end: F.date })}
        <div class="finish-stats">
          <div class="n"><span class="v">${F.weeks}</span><span class="micro">weeks</span></div>
          <div class="n"><span class="v">${F.runs}</span><span class="micro">runs</span></div>
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
    name: 'Settings · intensity', tip: 'Per agent: intensity changes how often it speaks and how blunt it is; the date never moves from here. Tap a segment.',
    html: `
    <div class="content with-tabs" style="gap:0">
      ${eyebrow(`${esc(G.agent)} · settings`, { text: 'Back', href: '#/home' })}
      <div class="scroll" style="margin-top:8px">
        <div class="section" style="padding-top:12px">
          <span class="label">Intensity</span>
          <div class="seg" id="seg"><span data-k="gentle">Gentle</span><span class="on" data-k="firm">Firm</span><span data-k="relentless">Relentless</span></div>
          <span class="small seg-note" id="segNote">One demand a day, one check-in if nothing comes in. Plain words, no verdicts.</span>
        </div>
        <div class="section">
          <span class="label">Cadence</span>
          <div class="srow"><div class="t"><span class="body">Morning demand</span><span class="small">Spoken, one line</span></div><span class="small val">6:45</span></div>
          <div class="srow"><div class="t"><span class="body">Evening check-in</span><span class="small">Only if nothing has come in</span></div><span class="small val">19:30</span></div>
          <div class="srow"><div class="t"><span class="body">Weekly review</span><span class="small">Numbers against plan</span></div><span class="small val">Sun 18:00</span></div>
          <div class="srow"><div class="t"><span class="body">Quiet hours</span><span class="small">No messages</span></div><span class="small val">21:00–6:30</span></div>
        </div>
        <div class="section">
          <span class="label">Proof and stakes</span>
          <div class="srow"><div class="t"><span class="body">Evidence required</span><span class="small">No photo or numbers, no tick</span></div><span class="switch on" data-toggle></span></div>
          <div class="srow"><div class="t"><span class="body">Stake</span><span class="small">Tell Rui after two misses in a row</span></div><span class="switch on" data-toggle></span></div>
          <div class="srow"><div class="t"><span class="body">Why this step</span><span class="small">Show the evidence note and tag</span></div><span class="switch on" data-toggle></span></div>
        </div>
        <div class="section">
          <span class="label">The line</span>
          <div class="srow"><div class="t"><span class="body">Finish line</span><span class="small">${esc(G.measure)} · ${esc(G.deadline)}</span></div><span class="micro faint">Locked</span></div>
          <div class="srow" style="border-bottom:0"><div class="t"><span class="body">Stop this agent</span><span class="small">Ends tonight; the record stays</span></div><span class="micro faint">Stop</span></div>
        </div>
      </div>
    </div>
    ${tabs('today')}`,
    mount(root) {
      const notes = {
        gentle: 'One demand a day. No evening check-in; it waits for the review. Softer words, same numbers.',
        firm: 'One demand a day, one check-in if nothing comes in. Plain words, no verdicts.',
        relentless: 'Demand, midday nudge, evening check-in, and it asks why before it asks what. Stake fires after one miss.',
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
    { path: '/build/why', screen: (p) => S.why(p.done), group: 'Build the agent', label: 'Why this, why now' },
    { path: '/build/constraints', screen: (p) => S.constraints(p.done), label: 'Deadline and constraints' },
    { path: '/build/obstacles', screen: (p) => S.obstacles(p.done), label: 'Obstacles' },
    { path: '/build/patterns', screen: (p) => S.patterns(p.done), label: 'Your pattern' },
    { path: '/plan', screen: () => S.plan(), label: 'The proposed plan' },
    { path: '/commit', screen: () => S.commit(), label: 'Commitment' },
    { path: '/home', screen: () => S.home('behind'), group: 'The agent at work', label: 'Agent home' },
    { path: '/home/on', screen: () => S.home('on'), hidden: true },
    { path: '/checkin/lock', screen: () => S.checkinLock(), label: 'Check-in · lock screen' },
    { path: '/checkin', screen: () => S.checkin(), label: 'Check-in' },
    { path: '/evidence', screen: (p) => S.evidence(p.done), label: 'Evidence' },
    { path: '/evidence/ok', screen: () => S.evidenceOk(), label: 'Evidence accepted' },
    { path: '/drift', screen: () => S.drift(), group: 'When it slips', label: 'Drift' },
    { path: '/recommit', screen: () => S.recommit(), label: 'Recommit' },
    { path: '/replan', screen: () => S.replan(), label: 'Replan' },
    { path: '/review', screen: () => S.review(), group: 'Rhythm', label: 'Weekly review' },
    { path: '/agents', screen: () => S.agents(), label: 'Agents' },
    { path: '/agent/card', screen: () => S.agentCard(), label: 'Second agent' },
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
    return { path, p: { done: sp.get('done') === '1' } };
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
