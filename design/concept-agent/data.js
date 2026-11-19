// Demo persona for the goal-agent concept. Entirely invented.
// Lena Varga, 33, backend engineer at an insurer in Vienna. Full-time job, no audience, no influencer network.
// Dossier cases are public founders; figures are rounded from their own posts and revenue pages and marked as such.
window.DATA = (() => {
  const user = { name: 'Lena' };

  const goal = {
    said: 'Build an app that makes ten thousand dollars a month. I want it within a year.',
    text: 'Build an app that makes $10k a month.',
    measure: '$10,000 MRR for one full calendar month, Stripe or Shopify payouts as proof',
    deadlineStated: '30 Nov 2027',
    deadline: '31 May 2028',
    monthsStated: 12, months: 18,
    agent: 'Ten-k',
    start: '1 Dec 2026',
  };

  // Source one: YOU. The agent interviews; the record is researched in the background meanwhile.
  const you = [
    {
      key: 'time', step: '1 of 3', title: 'Time and money',
      question: 'Start with what is fixed. Hours you actually have each week, and money you are willing to lose.',
      answer: 'I work full time, thirty-eight and a half hours, insurance backend. Tuesday and Thursday evenings and Saturday until three; call it twelve hours. I have eleven thousand saved and I would burn four of it, not more.',
      keeps: ['12 h a week: Tue 19–22, Thu 19–22, Sat 9–15', 'Budget €4,000 over the whole run', 'The job stays'],
      ticker: [['done', 'Founder posts, podcasts, revenue pages · 2,300 documents'], ['done', '41 cases match “solo, software, $10k a month”'], ['on', 'Keeping the 10 with public numbers']],
      method: 'goal.specific',
    },
    {
      key: 'reach', step: '2 of 3', title: 'Audience and network',
      question: 'Who would hear about it if you launched tomorrow? Followers, lists, people who owe you a favour.',
      answer: 'Honestly nobody. Two hundred LinkedIn connections, mostly colleagues. Thirty-eight followers on X. No newsletter. My friend Dóra runs a physio practice and my sister translates for a living. That is the network.',
      keeps: ['Audience 0 · 210 LinkedIn, 38 X, no list', 'Network: one practice owner, one freelancer, no one with reach', 'Organic launch reach ≈ 0'],
      ticker: [['done', '10 cases kept'], ['done', 'Sorting by audience at the start'], ['on', '6 of 10 began with more than 20k followers']],
      method: 'record.gap',
    },
    {
      key: 'ship', step: '3 of 3', title: 'Abilities and pattern',
      question: 'What can you ship alone, and how did the last two die?',
      answer: 'Backend is my job. I can ship a Next.js app, I cannot design and I have never run an ad. The last two I built for four or five months each, posted on Reddit, thirty users and zero. Then I stopped opening the repo.',
      keeps: ['Ships alone: backend, APIs, webhooks, Next.js · not design, not ads', 'Pattern: builds 4–5 months, launches into silence, stops'],
      reply: 'The record has a name for that. Failure mode one, six of the twelve that failed. Every no-audience case that got there had paying customers before the product existed.',
      ticker: [['done', 'Failure set: 12 cases, 5 modes'], ['done', '3 expert frameworks'], ['done', 'Dossier ready']],
      method: 'pattern.self',
    },
  ];

  // Source two: THE RECORD. A dossier researched for this exact goal.
  const record = {
    scanned: '2,300 documents', matched: 41, kept: 10, failed: 12, frameworks: 3,
    cases: [
      { n: 1, who: 'Jon Yongfook', what: 'Bannerbear', path: 'SEO and integrations (Zapier), API niche', aud: '~3k', time: '~18 mo', note: 'Open revenue page; two pivots before the API.' },
      { n: 2, who: 'Damon Chen', what: 'Testimonial.to', path: 'Charged in month one, Product Hunt, build in public', aud: '~2k', time: '~12 mo', note: 'Paying customers before the product was finished.' },
      { n: 3, who: 'Tyler Tringas', what: 'Storemapper', path: 'Shopify App Store search', aud: 'none', time: '~24 mo', note: 'The marketplace listing was the only channel.' },
      { n: 4, who: 'Ruben Gamez', what: 'Bidsketch', path: 'SEO content, long tail', aud: 'none', time: '~24 mo', note: 'Two years of writing before it compounded.' },
      { n: 5, who: 'Tony Dinh', what: 'TypingMind', path: 'X launch', aud: '100k+', time: '~2 mo', note: 'The audience was the distribution.' },
      { n: 6, who: 'Marc Lou', what: 'ShipFast', path: 'X launch', aud: '50k+', time: '~1 mo', note: 'The audience was the distribution.' },
      { n: 7, who: 'Pieter Levels', what: 'Photo AI', path: 'X launch', aud: '300k+', time: 'weeks', note: 'The audience was the distribution.' },
      { n: 8, who: 'Danny Postma', what: 'HeadshotPro', path: 'SEO plus paid ads, one-off $29', aud: '~30k', time: '~3 mo', note: 'Paid worked: instant value, one-off price.' },
      { n: 9, who: 'Solo iOS developer', what: 'habit app, revenue post 2024', path: 'ASO and Apple Search Ads', aud: 'none', time: '~14 mo', note: 'Reviews drove rank; ads only after retention held.' },
      { n: 10, who: 'Two founders', what: 'Slack stand-up app, post 2023', path: 'Slack directory plus cold email', aud: 'none', time: '~20 mo', note: 'Directory listing and forty cold emails a week.' },
    ],
    caveat: 'Figures rounded from founders’ public posts and revenue pages. The live agent re-sources them.',
    // The common path of the cases that had no audience (3, 4, 9, 10; 1 in part).
    path: [
      ['Weeks 1–3', 'Pick a market where buyers already search and pay: a marketplace or a search-led niche.'],
      ['Weeks 3–8', 'Talk to 20–30 buyers. Pre-sell before code.'],
      ['Weeks 8–16', 'Ship a narrow paid product in 6–8 weeks. Charge from day one.'],
      ['Months 4–12', 'One channel for six months. Measure listing → install → trial → paid.'],
      ['Month 12+', 'Paid acquisition only once retention is known.'],
    ],
    timeline: 'No-audience cases: 14–30 months to $10k a month, median about 20. Audience cases: weeks to 3 months.',
    numbers: [
      ['$25–45', 'ARPU, Shopify apps'], ['6–10%', 'listing → install'], ['30–40%', 'trial → paid'], ['4–8%', 'monthly churn'], ['1 : 8', 'reviews : installs'], ['≈ 295', 'paying at $34 for $10k'],
    ],
    failures: [
      ['6 of 12', 'Built four or more months before talking to a buyer.'],
      ['5 of 12', 'Launch-post distribution with no audience.'],
      ['3 of 12', 'Paid ads before retention was known · €5–20k burned.'],
      ['3 of 12', 'Free plan with no pressure to upgrade.'],
      ['2 of 12', 'The platform shipped the feature natively.'],
    ],
    experts: [
      ['Rob Walling · Start Small, Stay Small · MicroConf', 'Stair-step: begin with a marketplace add-on, not a standalone SaaS.'],
      ['Jason Cohen · Designing the ideal bootstrapped business', 'Recurring revenue, B2B, buyers you can reach, price at or above $30 a month.'],
      ['April Dunford · Obviously Awesome', 'Position against the alternative the buyer already uses, not against “nothing.”'],
    ],
  };

  // Where the two sources meet: your answer against the record, and the question the gap produces.
  const confront = [
    {
      key: 'deadline', title: 'Your date against the record',
      you: 'Within a year.',
      rec: 'Four of ten got there inside twelve months. All four started with 20k followers or more. The six without took 14 to 30 months.',
      ask: 'Keep twelve months and the record gives you about one chance in ten. Or eighteen months, with a $3k gate at month twelve. Or build an audience first and start the clock later. Which?',
      options: [['keep', 'Keep 12 months', '30 Nov 2027 · about 1 in 10'], ['eighteen', '18 months, $3k gate at month 12', '31 May 2028 · the record’s path'], ['audience', 'Audience first, clock later', 'Six months of writing before day one']],
      pick: 'eighteen', method: 'record.gap',
    },
    {
      key: 'pattern', title: 'Your pattern against the record',
      you: 'I build for four or five months, launch into silence, then stop opening the repo.',
      rec: 'Failure mode one, six of twelve. The no-audience cases that got there, Storemapper, the Slack app, the iOS app, all had buyers talking to them before the product existed.',
      ask: 'So: twenty-five merchants talk to you before you write code, with a hard gate of three prepaid. Yes, or this plan does not start.',
      options: [['yes', 'Yes. The gate stands.', 'Code is locked until 3 have paid'], ['build', 'I want to build first', 'Then this agent is not the agent for this goal']],
      pick: 'yes', method: 'obstacle.if_then',
    },
  ];

  // The plan. Six steps, each with a dated deliverable, its origin in the record, the fact about Lena that selected it,
  // the rejected alternative, and the decision or kill rule.
  const plan = {
    months: 18, end: '31 May 2028',
    shape: 'A Shopify app, pre-sold before it is built, grown by its listing and reviews; paid ads on top only once retention is known. Twelve hours a week, €4,000, eighteen months.',
    steps: [
      {
        n: 1, dates: '1–14 Dec 2026', title: 'Shopify App Store, not a standalone SaaS', short: 'Choose the market',
        deliver: ['Scan 3 App Store categories; score each on a sheet', 'Pick one niche by 14 Dec'],
        criteria: ['≥ 3 apps with ≥ 100 reviews (demand)', 'Top-3 average rating ≤ 4.4 (unmet need)', '≥ 20 one-star reviews naming the same gap', 'Nothing native on Shopify’s roadmap'],
        record: 'Storemapper (3), the Slack app (10), the iOS app (9): every no-audience case borrowed a marketplace’s search. Walling’s stair-step.',
        you: 'Audience 0. Twelve hours a week. Backend-strong; Polaris supplies the design you cannot do.',
        not: 'A standalone SaaS with a landing page and a launch post. That is cases 5–7, who had 50k+ followers. It is also how your last two died.',
        rule: 'Decision 14 Dec: no category meets all four → Chrome Web Store scan, same sheet, two weeks.',
      },
      {
        n: 2, dates: '15 Dec 2026 – 24 Jan 2027', title: '25 conversations, 3 prepaid, before code', short: 'Pre-sell',
        deliver: ['200 stores in the niche listed (Storeleads export, DE/AT/CH first)', '20 cold emails every Thursday', '25 conversations by 24 Jan', '3 founding plans prepaid: $19 a month for life'],
        criteria: ['Reply rate ≥ 10% or the email is rewritten the same week', 'A conversation is 20 minutes with a store owner, not a reply'],
        record: 'Testimonial.to (2) charged in month one. Failure mode one, six of twelve, built first.',
        you: 'Your pattern, twice. The network cannot carry a launch, so outreach is the audience.',
        not: 'Build an MVP first so there is something to show. Your last two had something to show.',
        rule: 'Gate 24 Jan: 3 prepaid → build · 1–2 → two more weeks · 0 → niche two. Kill 7 Mar: second niche misses → Shopify path dies.',
      },
      {
        n: 3, dates: '25 Jan – 14 Mar 2027', title: 'Seven weeks, charging from day one', short: 'Build',
        deliver: ['84 hours: Remix + Polaris template, Shopify Billing API in week one', 'Only what the 3 prepaid merchants asked for', 'Submit for App Store review by 14 Mar'],
        criteria: ['Any feature not named by a paying merchant waits', 'Week 4: the 3 founders use it on live stores'],
        record: 'Bannerbear (1), Testimonial.to (2), the iOS app (9): all charged from the first user. Failure mode four: free plans with no pressure.',
        you: 'Twelve hours a week is 84 hours in seven weeks; the template buys back the design time. €4k cannot fund a free tier.',
        not: 'A free plan to get installs. Three of twelve failed exactly there.',
        rule: 'Decision 14 Mar: not submitted → two weeks, then the 3 founders are refunded and the agent asks why before what.',
      },
      {
        n: 4, dates: '1 Apr – 30 Jun 2027', title: 'The listing is the audience', short: 'Listing and reviews',
        deliver: ['Listing: category keyword in the title, 5 screenshots, 90-second video', '7-day trial · $19 / $39 / $79', 'Review ask on day 10 of every trial', 'Checkpoint 30 Jun: 50 paying · $1.7k MRR · 25 reviews'],
        criteria: ['Listing → install ≥ 6%', 'Trial → paid ≥ 30%', 'Churn ≤ 8% a month'],
        record: 'Storemapper (3): rank followed reviews. The iOS app (9): one review per eight installs. The record’s funnel numbers.',
        you: 'No one to tell. Rank in the store’s search is the only reach you have.',
        not: 'Product Hunt and a Reddit post. Failure mode two, five of twelve; also your two launches.',
        rule: 'Kill 30 Jun: fewer than 15 paying → sunset, refund, reopen step one with what was learned.',
      },
      {
        n: 5, dates: '1 Jul – 30 Nov 2027', title: 'One channel, compounding', short: 'Compound',
        deliver: ['Integrations merchants ask for first: Klaviyo, then Zapier', '2 SEO pages a week answering merchant questions', 'Checkpoint 30 Sep: $4k MRR', 'Gate 30 Nov: ≥ $3k MRR (the month-12 gate you chose)'],
        criteria: ['Every page targets a query with ≥ 50 searches a month', 'Integration ships only with ≥ 5 merchant requests'],
        record: 'Bannerbear (1): integrations and SEO were the second engine at month 9. Bidsketch (4): the long tail compounds in year two.',
        you: 'Backend is your job; integrations are cheap for you and expensive for competitors.',
        not: 'A second product. Bannerbear pivoted twice before one worked; you have twelve hours.',
        rule: 'Gate 30 Nov: under $3k MRR → the eighteen-month line is reset to a $5k line, said out loud, once.',
      },
      {
        n: 6, dates: '1 Dec 2027 – 31 May 2028', title: 'Paid ads only on top of retention', short: 'Paid on top',
        deliver: ['Shopify App Store ads, €600 a month', 'Weekly: cost per install, trial → paid, payback months', 'Checkpoint 31 Jan 2028: $7k MRR', 'Finish 31 May 2028: $10k MRR ≈ 295 paying at $34'],
        criteria: ['Payback < 4 months', 'Month-3 retention ≥ 80%'],
        record: 'Failure mode three: three cases burned €5–20k before retention. HeadshotPro (8) paid worked because value was instant. The iOS app (9) waited.',
        you: '€4k total; €600 × 6 is the budget. You have never run an ad, so the rules run them.',
        not: 'Ads at launch to get the first users. You would learn nothing about retention and be out of money by June.',
        rule: 'Kill: payback over 4 months two months running → ads stop; the line stands on organic.',
      },
    ],
    gates: [
      ['14 Dec 2026', 'No category meets the four criteria', 'Chrome Web Store scan, two weeks'],
      ['24 Jan 2027', 'Fewer than 3 prepaid', '1–2: two more weeks · 0: niche two'],
      ['7 Mar 2027', 'Second niche misses', 'Shopify path dies · Chrome Web Store or stop'],
      ['30 Jun 2027', 'Fewer than 15 paying', 'Sunset, refund, reopen step one'],
      ['30 Nov 2027', 'Under $3k MRR', 'Line reset to $5k, said once'],
      ['Monthly from Dec 2027', 'Payback over 4 months, twice', 'Ads stop; organic carries the line'],
    ],
  };

  const commit = {
    character: 'Firm',
    cadence: ['Tue · Thu 18:45 the evening’s demand', '22:15 check-in if nothing has come in', 'Sat 15:30 the week’s numbers', 'Sun 18:00 weekly review'],
    evidence: 'Sheet row, sent-mail screenshot, Partner dashboard or Stripe, every session',
    stake: 'Miss two sessions in a row and the agent emails Dóra the numbers.',
  };

  // Week eight: pre-sell, gate in five days.
  const now = {
    week: 8, weeks: 78, day: 'Tuesday 19 Jan 2027', daysLeft: 498,
    planPct: 0.10, youPct: 0.085,
    behind: 'Behind by 1 prepaid.', sub: 'Gate 24 Jan · 5 days · 2 of 3 prepaid',
    demand: 'Tonight 19–22: email the 20 stores in rows 81–100. Send the sheet.',
    firstTwo: 'Open the sheet, paste the template, send the first one before you read it twice.',
    projected: 'At this rate: 3 prepaid on 2 Feb, nine days past the gate.',
    evidence: { sent: 20, replies: 4, calls: 1 },
    checkin: { line: 'The sheet did not come in. How many went out?', sub: '2 of 3 prepaid. Gate in 5 days.' },
  };

  const drift = {
    when: 'Week 3 · Thursday 22:10', title: 'Four of twenty emails.', planPct: 0.045, youPct: 0.03, daysLeft: 533,
    lines: ['Eleven hours in the repo this week, one on outreach.', 'You said: “I build for four or five months, launch into silence, then stop opening the repo.” This is week three.'],
  };

  const replan = {
    when: 'Gate · 24 Jan 2027',
    cause: '2 of 3 prepaid at the gate. The rule says: one to two prepaid, two more weeks, same niche.',
    change: 'New gate 7 Feb. Build starts 8 Feb; submission moves to 28 Mar; listing live mid-April; the 30 Jun checkpoint moves to 14 Jul. The line does not move.',
    risk: 'If 7 Feb misses, niche two starts five weeks late and the 7 Mar kill still stands.',
    moves: [['30 Jun', '14 Jul', 'Checkpoint · 50 paying'], ['31 May 2028', '31 May 2028', 'Finish · $10k MRR · unchanged']],
  };

  const review = {
    week: 8,
    nums: [['20', '/20', 'emails'], ['6', '', 'replies'], ['2', '/3', 'prepaid']],
    hours: '11 of 12 hours',
    status: 'Outreach held. One prepaid short with five days to the gate. Reply rate 30 percent against the record’s 10–15: the niche is live.',
    missed: ['Sat', 'Built onboarding instead of calling the two Graz replies. Code before the gate is the pattern.'],
    next: 'Three calls booked by Tuesday, one prepaid by Sunday, zero commits until the gate passes.',
  };

  const agents = [
    { id: 'tenk', name: 'Ten-k', goal: 'Build an app that makes $10k a month.', character: 'Firm · Tue Thu Sat', status: 'Behind by 1 prepaid', left: '498 days', pct: 0.085, plan: 0.10 },
    { id: 'sub50', name: 'Sub-fifty', goal: 'Run 10 km under 50 minutes by 12 September.', character: 'Steady · Mon Wed Sun', status: 'On plan · 52:40 last test', left: '236 days', pct: 0.31, plan: 0.30 },
  ];
  const second = { demand: 'Wednesday 6:30: 6 km at 5:30 per km. Send the watch.', checkin: 'Sunday 18:00 · one number, one line', note: 'Three tests in. Pace is down forty seconds since November.' };

  const finish = {
    result: '$10,140', unit: 'MRR', date: '31 May 2028', weeks: 78, reviews: 44, gates: 3, misses: 2,
    line: '298 paying merchants. The listing did it; ads carried the last third.',
    learned: ['Twenty-five conversations before code is why the first version sold.', 'Rank followed reviews; the day-10 ask was the channel.', 'Ads ran five months and paid back in 3.1; organic still carried 70 percent.'],
  };

  const methods = {
    'goal.specific': { note: 'A specific, hard goal with a date outperforms “do your best.” The date is part of the goal.', tag: 'strong' },
    'record.gap': { note: 'Base rates from people who did it beat your own estimate. Reference-class forecasting.', tag: 'moderate' },
    'two.sources': { note: 'Plans built from your facts and from base rates outperform plans built from either alone.', tag: 'moderate' },
    'obstacle.if_then': { note: 'Name the obstacle, then the plan. Wish, obstacle, plan beats wishing alone.', tag: 'strong' },
    'pattern.self': { note: 'Naming how you have failed before makes the plan fit you, not an average person.', tag: 'moderate' },
    'plan.checkpoints': { note: 'Sub-goals with dates give progress feedback. Feedback on progress is what keeps effort up.', tag: 'strong' },
    'plan.kill': { note: 'Pre-committed stopping rules prevent escalation of commitment. Decide the exit before you are in it.', tag: 'moderate' },
    'commit.stake': { note: 'A commitment someone else can see raises follow-through. Make it specific and small.', tag: 'moderate' },
    'checkin.monitoring': { note: 'Progress you record and report gets reached more often. Reported beats private.', tag: 'strong' },
    'drift.candor': { note: 'Honest status plus a next step. Self-compassion after a miss raises persistence; verdicts lower it.', tag: 'moderate' },
    'recommit.choice': { note: 'A choice you make yourself is kept longer than one made for you. Three options, one must be picked.', tag: 'moderate' },
    'replan.flex': { note: 'Plans that bend keep the goal; plans that break lose it. Change the path, not the line.', tag: 'moderate' },
    'review.weekly': { note: 'Weekly numbers against plan, no verdicts. Neutral review keeps you in the game.', tag: 'moderate' },
    'finish.reflect': { note: 'Write down what worked before the next goal. Transfer is not automatic.', tag: 'emerging' },
  };

  return { user, goal, you, record, confront, plan, commit, now, drift, replan, review, agents, second, finish, methods };
})();
