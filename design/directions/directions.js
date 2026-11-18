/* Five divergent directions for the goal map and the interview. Same persona (Noor), same tokens; the structure varies. */
(() => {
  const D = window.DATA; const G = D.goals; const ORDER = ['L1', 'L2', 'L3'];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const q = (s) => `“${esc(s)}”`;
  const params = new URLSearchParams(location.search);
  const dir = params.get('d') || 'thread';
  const only = params.get('only');

  const status = `<div class="status"><span>9:41</span><div class="island"></div><div class="right"><span class="cell"><i style="height:4px"></i><i style="height:6px"></i><i style="height:8px"></i><i style="height:11px"></i></span><span class="wifi"></span><span class="battery"></span></div></div>`;
  const device = (inner, ambient = '') => `<div class="device"><div class="ambient ${ambient}"></div>${status}${inner}<div class="home"></div></div>`;
  const eyebrow = (l, r = '') => `<div class="eyebrow"><span class="label">${l}</span>${r ? `<span class="btn ghost compact" style="margin-right:-12px">${r}</span>` : ''}</div>`;
  const guide = (t, st = 'idle') => `<div class="guide"><div class="halo inline" data-state="${st}"></div><p class="heading" style="font-size:19px; line-height:26px">${t}</p></div>`;
  const why = (k) => { const m = D.methods[k]; return `<div class="why"><span class="small">${esc(m.note)}</span><span class="tag ${m.tag}">${m.tag}</span></div>`; };
  const tabs = (on) => `<div class="tabs">${[['Map'], ['Talk'], ['Week']].map(([l]) => `<div class="tab ${l === on ? 'on' : ''}"><i></i><span class="label">${l}</span></div>`).join('')}</div>`;
  const ICON = {
    mic: '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    key: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/></svg>',
    cam: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    doc: '<svg viewBox="0 0 24 24"><path d="M7 3h7l4 4v14H7z M14 3v4h4 M10 12h5M10 16h5"/></svg>',
  };
  const intake = (state = 'listening', label = 'Listening', sub = 'Speak, type, or add a photo or file.', on = 'mic') =>
    `<div class="intake"><div class="halo small" data-state="${state}"></div><div class="state"><span class="body">${label}</span><span class="small">${sub}</span></div>
      <div class="modes">${['key', 'cam', 'doc'].map((k) => `<span class="mode ${on === k ? 'on' : ''}">${ICON[k]}</span>`).join('')}</div></div>`;
  const attach = (a, cls = '') => `<span class="attach ${cls}"><span class="thumb ${a.kind}"></span><span><span class="n">${esc(a.name)}</span><br><span class="m">${esc(a.note)}</span></span></span>`;
  const amarks = (g) => (g.attachments || []).map((a) => `<span class="amark"><i class="${a.kind}"></i>${a.kind === 'photo' ? 'photo' : 'file'}</span>`).join(' ');
  const captured = (sc) => `<div class="captured"><span class="micro label">Life goal, in your words</span><span class="body">${esc(sc.captures.text)}</span><span class="small faint quote">from ${q(sc.captures.from)}</span></div>`;
  const sc1 = D.scenes[0];
  const LV = [['today', 'Today'], ['week', 'Week'], ['month', 'Month'], ['one_year', '1 yr'], ['five_year', '5 yr'], ['ten_year', '10 yr']];

  const DIRS = {};

  // ---------- A. Thread: vertical, bottom-up, one rail per life goal ----------
  DIRS.thread = {
    name: 'Thread', line: 'Vertical rail per life goal, read bottom-up: today under week under month under year. Dense, legible, literal.',
    map: () => device(`<div class="content with-tabs" style="gap:10px">
      ${eyebrow('Tuesday 18 Nov', 'Document')}
      <h1 class="title" style="font-size:24px; line-height:30px">Three life goals. Three threads.</h1>
      ${ORDER.map((id, i) => { const g = G[id]; const open = i === 0; return `<div class="a-goal">
        <div class="row"><span class="micro label">${esc(g.area)}</span>${amarks(g)}</div>
        <span class="h">${esc(g.text)}</span>
        <div class="thread cols">
          <div class="node"><span class="label">Today</span><div class="rail"><span class="dot lit"></span><span class="line"></span></div><div class="text"><span class="small" style="color:var(--color-text)">${esc(g.today)}</span></div></div>
          ${open ? `<div class="node"><span class="label">Week</span><div class="rail"><span class="dot"></span><span class="line"></span></div><div class="text"><span class="small">${esc(g.week)}</span></div></div>
          <div class="node"><span class="label">Month</span><div class="rail"><span class="dot"></span><span class="line"></span></div><div class="text"><span class="small">${esc(g.month)}</span></div></div>
          <div class="node"><span class="label">1 yr</span><div class="rail"><span class="dot"></span><span class="line"></span></div><div class="text"><span class="small">${esc(g.one_year)}</span></div></div>
          <div class="node"><span class="label">5 yr</span><div class="rail"><span class="dot"></span><span class="line"></span></div><div class="text"><span class="small">${esc(g.five_year)}</span></div></div>
          <div class="node"><span class="label">10 yr</span><div class="rail"><span class="dot end"></span></div><div class="text"><span class="small">${esc(g.ten_year)}</span></div></div>`
          : `<div class="node collapsed"><span class="label">Week</span><div class="rail"><span class="dot"></span><span class="line"></span></div><div class="text"><span class="small">${esc(g.week)}</span></div></div>
          <div class="node collapsed"><span class="label">↑ 10 yr</span><div class="rail"><span class="dot end"></span></div><div class="text"><span class="small">month · 1 yr · 5 yr · 10 yr</span></div></div>`}
        </div>
      </div>`; }).join('')}
    </div>${tabs('Map')}`),
    interview: () => device(`<div class="content" style="gap:12px">
      ${eyebrow('Near-term scene · 2 of 8 · Work', 'Pause')}
      <div class="rail-h">${[['Words', 'lit'], ['Life', 'next'], ['10 yr'], ['5 yr'], ['1 yr'], ['Month'], ['Week'], ['Today']].map(([l, c]) => `<div class="n ${c || ''}"><i></i><span class="micro">${l}</span></div>`).join('')}</div>
      ${guide(esc(sc1.question))}
      <p class="transcript">${esc(sc1.answer.split('. ').slice(0, 2).join('. '))}. ${attach(sc1.area === 'Work' ? G.L1.attachments[0] : {}, 'inline')} ${esc(sc1.answer.split('. ').slice(2).join('. '))}<span class="caret"></span></p>
      ${captured(sc1)}
      <div class="spacer"></div>
      ${why('interview.near_term_scene')}
      ${intake()}
    </div>`),
  };

  // ---------- B. Orbit: today at the centre, horizons as rings, life goals as stars ----------
  const orbitSvg = ({ stars = 3, lit = true, partial = false, small = false } = {}) => {
    const cx = 180, cy = 172; const R = [34, 60, 86, 112, 138]; const RL = ['Week', 'Month', '1 yr', '5 yr', '10 yr'];
    const angles = [-112, 28, 142];
    const pt = (a, r) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
    let s = R.map((r, i) => `<circle class="ring ${i === 0 && lit ? 'lit' : ''}" cx="${cx}" cy="${cy}" r="${r}"/>`).join('');
    s += RL.map((l, i) => `<text class="rl" x="${cx + 4}" y="${cy - R[i] - 3}">${l}</text>`).join('');
    ORDER.slice(0, stars).forEach((id, i) => {
      const a = angles[i]; const [sx, sy] = pt(a, 154); const on = i === 0 || !partial;
      s += `<line class="ray ${i === 0 ? 'on' : ''}" x1="${cx}" y1="${cy}" x2="${sx}" y2="${sy}"/>`;
      R.forEach((r) => { const [x, y] = pt(a, r); s += `<circle class="node ${i === 0 && r === R[0] ? 'on' : ''}" cx="${x}" cy="${y}" r="3.2"/>`; });
      s += `<circle class="star ${on ? '' : 'dim'}" cx="${sx}" cy="${sy}" r="5"/>`;
      const label = G[id].area; const ca = Math.cos((a * Math.PI) / 180), sa = Math.sin((a * Math.PI) / 180);
      const tx = sx, ty = sa < 0 ? sy - 12 : sy + 22;
      const anchor = 'middle';
      s += `<text class="sl ${on ? '' : 'dim'}" x="${tx}" y="${ty}" text-anchor="${anchor}">${esc(label)}</text>`;
    });
    s += `<circle class="center" cx="${cx}" cy="${cy}" r="5"/>`;
    return `<div class="orbit" style="height:${small ? 250 : 340}px; width:${small ? 265 : 361}px"><svg viewBox="0 0 360 340">${s}</svg></div>`;
  };
  DIRS.orbit = {
    name: 'Orbit', line: 'Today at the centre, horizons as rings outward, life goals as stars on the edge. The map is one picture; detail comes by tapping a ray.',
    map: () => { const g = G.L1; return device(`<div class="content with-tabs" style="gap:8px">
      ${eyebrow('Tuesday 18 Nov', 'Document')}
      ${orbitSvg()}
      <div class="b-sel">
        <div class="row"><span class="micro label">${esc(g.area)} · the ray</span>${amarks(g)}</div>
        <span class="body" style="font-size:16px; line-height:22px">${esc(g.text)}</span>
        <div class="path"><span class="micro on">Today</span><span class="sep"></span><span class="micro">Week</span><span class="sep"></span><span class="micro">Month</span><span class="sep"></span><span class="micro">1 yr</span><span class="sep"></span><span class="micro">5 yr</span><span class="sep"></span><span class="micro">10 yr</span></div>
        <span class="small" style="color:var(--color-text)">${esc(g.today)}</span>
        <span class="small faint">for ${q(g.week)}</span>
      </div>
    </div>${tabs('Map')}`, 'center'); },
    interview: () => device(`<div class="content" style="gap:8px">
      ${eyebrow('Life goals · 1 of 3 placed', 'Pause')}
      ${orbitSvg({ stars: 1, lit: false, small: true })}
      ${guide('Work. Nine months from now, past tense: what had happened?', 'idle')}
      <p class="transcript" style="font-size:17px; line-height:23px">${esc(sc1.answer.split('. ').slice(0, 2).join('. '))}. ${attach(G.L1.attachments[0], 'inline')}<span class="caret"></span></p>
      ${captured(sc1)}
      <div class="spacer"></div>
      ${intake('listening', 'Listening', 'A new star when a goal lands.')}
    </div>`, 'center'),
  };

  // ---------- C. Horizon: time runs left to right, goals are lanes ----------
  DIRS.horizon = {
    name: 'Horizon', line: 'Time runs left to right across the top (today → 10 years); each life goal is a lane. One horizon is in focus at a time; the rest are dots.',
    map: () => device(`<div class="content with-tabs" style="gap:10px">
      ${eyebrow('Tuesday 18 Nov', 'Document')}
      <div class="c-head"><h1 class="title" style="font-size:24px; line-height:30px">This week, on three lanes.</h1></div>
      <div class="hz"><div></div>${LV.slice(1).map(([k, l], i) => `<div class="col ${i === 0 ? 'on' : ''}"><i></i><span class="micro">${l}</span></div>`).join('')}</div>
      <div>
      ${ORDER.map((id) => { const g = G[id]; return `<div class="lane">
        <div class="lg"><span class="micro">${esc(g.area)}</span><span class="t">${esc(g.text)}</span>${amarks(g)}</div>
        <div class="cells">${LV.slice(1).map(([k], i) => `<div class="cell ${i === 0 ? 'on' : ''}"><i></i></div>`).join('')}
          <div class="focus"><span class="body">${esc(g.week)}</span><br><span class="small">today · ${esc(g.today)}</span></div>
        </div>
      </div>`; }).join('')}
      </div>
      <span class="micro faint" style="text-align:center">Swipe the horizon · tap a lane to read the whole row</span>
    </div>${tabs('Map')}`),
    interview: () => device(`<div class="content" style="gap:10px">
      ${eyebrow('Distilling · 10-year goals · 1 of 5', 'Pause')}
      <div class="hz"><div></div>${[['Life', 'done'], ['10 yr', 'on'], ['5 yr'], ['1 yr'], ['Month']].map(([l, c]) => `<div class="col ${c || ''}"><i></i><span class="micro">${l}</span></div>`).join('')}</div>
      ${guide(esc(D.LEVELS[0].guide).replace('I have drafted them from your scenes; ', ''))}
      <div>
      ${ORDER.map((id, i) => { const g = G[id]; return `<div class="lane">
        <div class="lg"><span class="micro">${esc(g.area)}</span><span class="t">${esc(g.text)}</span></div>
        <div class="cells noline"><div class="focus" style="padding-top:0"><span class="body" style="font-size:14px; line-height:19px; color:${i === 0 ? 'var(--color-text)' : 'var(--color-text-muted)'}">${esc(g.ten_year)}</span>${i === 0 ? '<br><span class="small accent">Saying it back… tap to change</span>' : ''}</div></div>
      </div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      ${why('interview.want_vs_should')}
      ${intake('listening', 'Listening', 'Say it back, or change one.')}
    </div>`),
  };

  // ---------- D. Stack: one life goal at a time, horizons as a deck in depth ----------
  const deck = (g, { frontKey = 'today', frontLabel = 'Today', showFront = true } = {}) => {
    const layers = [['life', 'Life goal', g.text], ['ten_year', '10 years', g.ten_year], ['five_year', '5 years', g.five_year], ['one_year', '1 year', g.one_year], ['month', 'This month', g.month], ['week', 'This week', g.week]];
    let html = '';
    layers.forEach(([k, l, t], i) => {
      const top = 0 + i * 58; const scale = 0.86 + i * 0.024; const op = 0.5 + i * 0.1;
      html += `<div class="cardx back ${k}" style="top:${top}px; transform:scale(${scale.toFixed(3)}); z-index:${i}"><span class="label" style="opacity:${op.toFixed(2)}">${l}</span><span class="t" style="opacity:${op.toFixed(2)}">${esc(t)}</span></div>`;
    });
    if (showFront) html += `<div class="cardx front" style="top:${layers.length * 58 + 8}px; z-index:20"><div class="row"><span class="label">${frontLabel}</span>${amarks(g)}</div><span class="t">${esc(g[frontKey])}</span><span class="small faint">first two minutes · ${esc(g.firstTwo)}</span></div>`;
    return `<div class="deck">${html}</div>`;
  };
  DIRS.stack = {
    name: 'Stack', line: 'One life goal at a time. Horizons are a deck receding into depth: 10 years at the back, today face-up in front. Swipe sideways for the next goal, pull a card forward to read it.',
    map: () => { const g = G.L1; return device(`<div class="content with-tabs" style="gap:8px">
      ${eyebrow('Tuesday 18 Nov', 'Document')}
      <div class="d-head"><span class="micro">${esc(g.area)} · 1 of 3</span><span class="small faint">Pull a card forward · swipe for the next goal</span></div>
      ${deck(g)}
      <div class="pager"><i class="on"></i><i></i><i></i></div>
    </div>${tabs('Map')}`); },
    interview: () => { const g = G.L1; return device(`<div class="content" style="gap:8px">
      ${eyebrow('Distilling · Work · 10-year card', 'Pause')}
      ${guide('Ten years. Behind the life goal, one card: what is true in ten years?', 'idle')}
      <div class="deck" style="height:300px">
        <div class="cardx life" style="top:0; transform:scale(0.92); opacity:0.7"><span class="label">Life goal</span><span class="t">${esc(g.text)}</span>${amarks(g)}</div>
        <div class="cardx front" style="top:70px"><span class="label">10 years</span><span class="t">${esc(g.ten_year)}<span class="caret" style="display:inline-block; width:2px; height:18px; background:var(--color-accent); margin-left:3px; vertical-align:-3px"></span></span><span class="small faint">your words · tap to change</span></div>
      </div>
      <div class="pager"><i class="on"></i><i></i><i></i></div>
      <div class="spacer"></div>
      ${why('interview.want_vs_should')}
      ${intake('listening', 'Listening', 'Say it, type it, or add a photo.')}
    </div>`); },
  };

  // ---------- E. Document: the goals as a typeset living record ----------
  const docSec = (g, n, { until = 'week', today = true, typing = false } = {}) => {
    const lines = [['ten_year', '10 yr'], ['five_year', '5 yr'], ['one_year', '1 yr'], ['month', 'Month'], ['week', 'Week']];
    const stop = lines.findIndex(([k]) => k === until);
    let html = `<div class="sec"><span class="num">${n}</span><span class="life">${esc(g.text)}</span>`;
    lines.slice(0, stop + 1).forEach(([k, l], i) => { html += `<div class="hline"><span class="micro">${l}</span><span class="t">${esc(g[k])}${g.attachments && i === 2 ? '<sup>' + g.attachments.map((a, j) => j + 1).join(',') + '</sup>' : ''}${typing && i === stop ? '<span class="caret" style="display:inline-block; width:2px; height:14px; background:var(--color-accent); margin-left:3px; vertical-align:-2px"></span>' : ''}</span></div>`; });
    if (today) html += `<div class="hline today"><span class="micro">Today</span><span class="t">${esc(g.today)}</span></div>`;
    html += `<p class="why">${q(g.why)}</p></div>`;
    return html;
  };
  DIRS.document = {
    name: 'Document', line: 'The map is a typeset living document in the user’s words: numbered life goals as headings, horizons as margin-labelled lines, attachments as footnotes. Editorial, calm, editable anywhere.',
    map: () => device(`<div class="content with-tabs" style="gap:6px">
      ${eyebrow('Life goals · in your words', 'Edit')}
      <div class="doc">
        ${docSec(G.L1, 'I')}
        ${docSec(G.L2, 'II', { until: 'month' })}
        <div class="sec" style="padding-bottom:0"><span class="num">III</span><span class="life" style="margin-bottom:0">${esc(G.L3.text)}</span></div>
      </div>
      <div class="e-foot"><span>¹ Didsbury room, photo</span><span>² Clinic numbers.pdf</span><span style="margin-left:auto">written 2 Nov</span></div>
    </div>${tabs('Map')}`),
    interview: () => device(`<div class="content" style="gap:8px">
      ${eyebrow('Interview · Work · 2 of 8', 'Pause')}
      <p class="e-margin">Work. Nine months from now, past tense: what had happened?</p>
      <div class="doc">
        <div class="sec" style="border-bottom:0">
          <span class="num">I</span>
          <span class="life">${esc(G.L1.text)}</span>
          <div class="hline"><span class="micro">Words</span><span class="t" style="font-style:italic">${esc(sc1.answer.split('. ').slice(0, 2).join('. '))}.<span class="caret" style="display:inline-block; width:2px; height:14px; background:var(--color-accent); margin-left:3px; vertical-align:-2px"></span></span></div>
          <div class="hline"><span class="micro">Attached</span><span class="t">${attach(G.L1.attachments[0])}</span></div>
        </div>
        <div class="sec" style="opacity:0.45"><span class="num">II</span><span class="life" style="color:var(--color-text-faint)">Relationships — next</span></div>
      </div>
      <div class="spacer"></div>
      ${why('interview.near_term_scene')}
      ${intake('listening', 'Listening', 'Speak; the record fills in. Type or attach any time.')}
    </div>`),
  };


  // ---------- Horizon, less crowded: three variants of the map ----------
  const STRIP = [['today', 'Today'], ['week', 'Week'], ['month', 'Month'], ['one_year', '1 yr'], ['five_year', '5 yr'], ['ten_year', '10 yr']];
  const strip = (on, { labels = true } = {}) => `<div class="hstrip">${STRIP.map(([k, l]) => `<div class="s ${k === on ? 'on' : ''}"><i></i>${labels ? `<span class="micro">${l}</span>` : ''}</div>`).join('')}</div>`;
  const laneLines = (sel = 'L1', on = 'week') => `<div class="lanes">${ORDER.map((id) => `<div class="ln ${id === sel ? 'on' : ''}"><span class="nm">${esc(G[id].area)}</span><div class="bar">${STRIP.map(([k]) => `<i class="${k === on ? 'on' : ''}"></i>`).join('')}</div></div>`).join('')}</div>`;

  DIRS['h-one-horizon'] = {
    name: 'Horizon · One horizon', line: 'The strip across the top selects a horizon; the screen shows only that horizon: three sentences, one per life goal, in large light type. Swipe the strip to travel in time.',
    map: () => device(`<div class="content with-tabs sparse">
      ${eyebrow('Tuesday 18 Nov')}
      ${strip('week')}
      <h1 class="hz-title">This week</h1>
      <div class="three">
        ${ORDER.map((id, i) => { const g = G[id]; return `<div class="one ${i === 0 ? 'lead' : ''}"><span class="micro nm">${esc(g.area)}</span><p class="sent">${esc(g.week)}</p></div>`; }).join('')}
      </div>
      <div class="spacer"></div>
      <span class="micro faint center">Swipe the strip · tap a goal</span>
    </div>${tabs('Map')}`),
    interview: () => DIRS.horizon.interview(),
  };

  DIRS['h-one-goal'] = {
    name: 'Horizon · One goal', line: 'One life goal at a time as the headline; the strip beneath picks the horizon; one sentence shows. Swipe sideways through horizons, up and down through goals.',
    map: () => { const g = G.L1; return device(`<div class="content with-tabs sparse">
      ${eyebrow('Tuesday 18 Nov')}
      <div class="spacer" style="flex:0.6"></div>
      <div class="stack" style="gap:6px"><span class="micro faint">${esc(g.area)} · 1 of 3</span><h1 class="hz-life">${esc(g.text)}</h1></div>
      <div class="spacer" style="flex:0.5"></div>
      ${strip('week')}
      <p class="sent big">${esc(g.week)}</p>
      <p class="small faint">today · ${esc(g.today)}</p>
      <div class="spacer"></div>
      <div class="pager"><i class="on"></i><i></i><i></i></div>
    </div>${tabs('Map')}`); },
    interview: () => DIRS.horizon.interview(),
  };

  DIRS['h-lanes'] = {
    name: 'Horizon · Lanes', line: 'The picture is three thin lanes running left to right with a dot at each horizon; the strip labels the columns. Tap a dot and its sentence appears below. Nothing else on screen.',
    map: () => { const g = G.L1; return device(`<div class="content with-tabs sparse">
      ${eyebrow('Tuesday 18 Nov')}
      <div class="spacer" style="flex:0.4"></div>
      ${strip('week')}
      ${laneLines('L1', 'week')}
      <div class="spacer" style="flex:0.5"></div>
      <div class="stack" style="gap:8px"><span class="micro faint">${esc(g.area)} · this week</span><p class="sent big">${esc(g.week)}</p><p class="small faint">for ${q(g.text)}</p></div>
      <div class="spacer"></div>
    </div>${tabs('Map')}`); },
    interview: () => DIRS.horizon.interview(),
  };

  const d = DIRS[dir] || DIRS.thread;
  const pair = document.getElementById('pair');
  if (only) { pair.classList.add('one'); pair.innerHTML = d[only](); }
  else pair.innerHTML = `<div><div class="cap"><b>${d.name}</b> · Map</div>${d.map()}</div><div><div class="cap"><b>${d.name}</b> · Interview</div>${d.interview()}</div>`;
  document.title = `${d.name} · direction`;
  window.DIRS = DIRS;
})();
