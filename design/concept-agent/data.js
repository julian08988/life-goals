// Demo persona for the goal-agent concept. Entirely invented.
// Tomás Ferreira, 41, secondary-school chemistry teacher in Lisbon. Running partner Rui.
window.DATA = (() => {
  const user = { name: 'Tomás' };

  // The goal, as stated and as parsed.
  const goal = {
    said: 'Run the Lisbon half marathon in under two hours. Race day is the fifteenth of March.',
    text: 'Run the Lisbon half marathon in under two hours.',
    measure: 'Chip time under 1:59:59',
    deadline: '15 March',
    daysLeft: 117,
    agent: 'Sub-two',
  };

  // Building the agent: what it asks, what Tomás says, what it keeps.
  const build = [
    {
      key: 'why', step: '1 of 4', title: 'Why this, why now',
      question: 'Why this one, and why now? I will say this back to you on the days you want to stop.',
      answer: 'My father had his first heart attack at forty-four. I am forty-one and I get out of breath on the school stairs. I do not want Inês to watch what I watched.',
      keep: { label: 'The reason', text: 'My father had his first heart attack at forty-four. I am forty-one.' },
      method: 'why.reason',
    },
    {
      key: 'constraints', step: '2 of 4', title: 'Deadline and constraints',
      question: 'Fifteenth of March is fixed. What is fixed on your side? Hours, bodies, people.',
      answer: 'I teach until five. Tuesdays and Thursdays are parent evenings until seven. My left knee has gone twice before, both times when I ramped too fast. Sundays are free.',
      keeps: ['Weekdays: before 7:15 or after 17:30', 'Tue and Thu: evenings blocked', 'Left knee: no ramp above ten percent a week', 'Sunday: long run'],
      method: 'goal.specific',
    },
    {
      key: 'obstacles', step: '3 of 4', title: 'Obstacles',
      question: 'What will actually stop you? Not what might. What has.',
      answer: 'Rain. Marking that runs past nine. And honestly, evenings when I am just done.',
      pairs: [
        ['Rain', 'If it is raining at 6:30, then I run the covered loop at the stadium.'],
        ['Marking past nine', 'If marking is not finished by 20:30, then the run moves to 6:30 next morning and I say so tonight.'],
        ['Evenings when I am done', 'If I am done, then I put the shoes on and walk to the corner. The run decides itself there.'],
      ],
      method: 'obstacle.if_then',
    },
    {
      key: 'patterns', step: '4 of 4', title: 'Your pattern',
      question: 'Last question. How do you usually fail at this?',
      answer: 'I start strong and vanish in week three. Every time. Then I feel bad and do not come back.',
      keep: { label: 'The pattern', text: 'Starts strong, vanishes in week three, does not come back.' },
      reply: 'Then week three is when I will be loudest. And a miss will get a next step, not a verdict.',
      method: 'pattern.self',
    },
  ];

  const plan = {
    weeks: 14, runsPerWeek: 4,
    shape: 'Four runs a week. Three short before school, the long one on Sunday. Ten percent more each week, never more.',
    checkpoints: [
      ['18 Jan', '10 km under 55:00'],
      ['15 Feb', '15 km, any pace, no knee pain'],
      ['8 Mar', 'Last long run, 18 km'],
      ['15 Mar', 'Half marathon under 2:00'],
    ],
    pace: 'Target race pace 5:40 per km. Easy runs at 6:15.',
  };

  const commit = {
    character: 'Firm',
    cadence: ['6:45 the day’s demand', '19:30 check-in if nothing has come in', 'Sunday 18:00 weekly review'],
    evidence: 'Watch photo or distance and time, every run',
    stake: 'If I miss two in a row, the agent tells Rui.',
  };

  // Where things stand in week six.
  const now = {
    week: 6, day: 'Tuesday 20 Jan', daysLeft: 54,
    planPct: 0.46, youPct: 0.40,
    behind: 'Behind by 2 runs',
    demand: '8 km easy, before 7:15. Send the watch.',
    firstTwo: 'Shoes by the door; out before the kettle boils.',
    projected: '2:06', target: '1:59',
    thisWeek: { planned: 4, done: 2 },
    evidence: { km: '8.2', time: '48:10', pace: '5:52' },
  };

  const review = {
    week: 6,
    planned: { runs: 4, km: 32 }, done: { runs: 3, km: 26 },
    pace: ['5:58', '5:52'],
    status: 'One run short. Pace is ahead of plan. The knee is quiet.',
    nextWeek: 'Four runs, 34 km. The long run is 14 km on Sunday. Tuesday is the one you will want to skip.',
    misses: [['Thu', 'Marking past nine. The if-then did not fire; you did not say so that night.']],
  };

  const replan = {
    cause: 'Left knee flared on Sunday at 12 km.',
    change: 'Two weeks off running. Bike or pool, same mornings, same check-ins. The 15 km checkpoint moves ten days. The race does not move.',
    risk: 'Projected finish 2:01 if the ramp restarts on 3 Feb. Tight, still possible.',
  };

  const agents = [
    { id: 'sub2', name: 'Sub-two', goal: 'Run the Lisbon half marathon in under two hours.', character: 'Firm · daily', status: 'Behind by 2 runs', left: '54 days', pct: 0.40, plan: 0.46 },
    { id: 'card', name: 'Card clear', goal: 'Pay off the €6,400 credit card by 30 June.', character: 'Steady · Sundays', status: 'On plan · €4,120 left', left: '161 days', pct: 0.36, plan: 0.34 },
  ];

  const card = {
    demand: 'Transfer €340 before Sunday ends. Send the screenshot.',
    checkin: 'Sunday 18:00 · one question, one number',
    note: 'Two statements in. Interest is €61 a month lower than in December.',
  };

  const finish = {
    result: '1:57:42', date: '15 March', runs: 51, misses: 3, weeks: 14,
    learned: ['Week three passed because the agent was loudest there.', 'Three of three misses were marking nights; the if-then fixed two.', 'The knee held because the ramp never exceeded ten percent.'],
  };

  const methods = {
    'goal.specific': { note: 'A specific, hard goal with a date outperforms “do your best.” The date is the goal.', tag: 'strong' },
    'why.reason': { note: 'A reason you own outlasts a reason you were given. The agent repeats yours, not its own.', tag: 'moderate' },
    'obstacle.if_then': { note: 'Obstacle plus if-then plan. Wish, outcome, obstacle, plan beats wishing alone.', tag: 'strong' },
    'pattern.self': { note: 'Naming how you have failed before makes the plan fit you, not an average person.', tag: 'moderate' },
    'plan.checkpoints': { note: 'Sub-goals with dates give progress feedback. Feedback on progress is what keeps effort up.', tag: 'strong' },
    'commit.stake': { note: 'A commitment someone else can see raises follow-through. Make it specific and small.', tag: 'moderate' },
    'checkin.monitoring': { note: 'Progress you record and report gets reached more often. Reported beats private.', tag: 'strong' },
    'drift.candor': { note: 'Honest status plus a next step. Self-compassion after a miss raises persistence; verdicts lower it.', tag: 'moderate' },
    'recommit.choice': { note: 'A choice you make yourself is kept longer than one made for you. Three options, one must be picked.', tag: 'moderate' },
    'replan.flex': { note: 'Plans that bend keep the goal; plans that break lose it. Change the path, not the line.', tag: 'moderate' },
    'review.weekly': { note: 'Weekly numbers against plan, no verdicts. Neutral review keeps you in the game.', tag: 'moderate' },
    'finish.reflect': { note: 'Write down what worked before the next goal. Transfer is not automatic.', tag: 'emerging' },
  };

  return { user, goal, build, plan, commit, now, review, replan, agents, card, finish, methods };
})();
