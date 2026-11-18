// Demo persona for the prototype. Entirely invented.
// Noor Haddad, 36, physiotherapist in Manchester, one daughter (Maya, 6).
window.DATA = (() => {
  const user = { name: 'Noor', reviewDay: 'Sunday', morningTime: '6:30' };

  // Interview scenes. Each prompt has the guide's spoken question and Noor's spoken answer.
  // `captures` is the life goal the guide lifts out of the answer, in Noor's words.
  const scenes = [
    {
      id: 'work',
      kind: 'Near-term scene',
      area: 'Work',
      step: '2 of 8',
      question: 'Work. It is nine months from now and it went the way you wanted. Past tense: what had happened?',
      answer:
        'I saw my own patients two evenings a week in a room with my name on the door. Forty-minute slots, not fifteen. I actually fixed people instead of patching them. I still did three days at the hospital but it stopped being the whole of me.',
      captures: { goal: 'L1', text: 'I run my own clinic where people are treated like people, not appointments.', from: 'I saw my own patients two evenings a week in a room with my name on the door.' },
      why: 'I am tired of fifteen-minute slots. I want the time to actually fix someone.',
    },
    {
      id: 'relationships',
      kind: 'Near-term scene',
      area: 'Relationships',
      step: '3 of 8',
      question: 'Relationships. Same nine months, same past tense. What had happened?',
      answer:
        'I picked Maya up from school three days a week and she talked the whole way home. We ate together every night I was in. My dad was at work my whole childhood and I know exactly how that felt, so I did it differently.',
      captures: { goal: 'L2', text: 'Maya grows up knowing I was there, not just providing.', from: 'I picked Maya up from school three days a week and she talked the whole way home.' },
      why: 'My dad was at work. I know how that felt.',
    },
    {
      id: 'body',
      kind: 'End-of-life scene',
      area: 'Your body',
      step: '3 of 3',
      question: 'Now the long view. You are old and looking back. What did your body let you do, late in life?',
      answer:
        'At seventy I still walked up mountains and nobody had to carry my bag. My mum stopped walking at sixty-five and her world got small, one room at a time. Mine did not. Maya and I did the Mont Blanc circuit when she was in her twenties.',
      captures: { goal: 'L3', text: 'I stay strong enough to hike mountains at seventy.', from: 'At seventy I still walked up mountains and nobody had to carry my bag.' },
      why: 'My mum stopped walking at sixty-five and her world got small.',
    },
  ];

  // The hierarchy, fully populated. Keys: life goal → levels.
  const goals = {
    L1: {
      id: 'L1',
      area: 'Work',
      text: 'I run my own clinic where people are treated like people, not appointments.',
      why: 'I am tired of fifteen-minute slots. I want the time to actually fix someone.',
      scene: 'I saw my own patients two evenings a week in a room with my name on the door.',
      ten_year: 'The clinic is the place in south Manchester people send their mothers to. I work four days and teach one.',
      five_year: 'The clinic has two rooms, a second physio, and a waiting list I can say no to.',
      one_year: 'I see my own patients three days a week in a rented room, with twenty regulars.',
      month: 'Find and sign a room I can rent two evenings a week.',
      attachments: [
        { kind: 'photo', name: 'Didsbury room, listing photo', note: 'Taken from the agent’s page' },
        { kind: 'doc', name: 'Clinic numbers.pdf', note: 'Two pages, rent and slots' },
      ],
      week: 'Visit three rooms and ask each landlord about evening rates.',
      ifThen: 'If it is Thursday at 17:30, then I drive to the Didsbury practice straight from work.',
      today: 'Call the Didsbury practice and book a viewing for Thursday.',
      firstTwo: 'Open the number, say my name and that I am looking for two evenings a week.',
      todayDone: false,
    },
    L2: {
      id: 'L2',
      area: 'Relationships',
      text: 'Maya grows up knowing I was there, not just providing.',
      why: 'My dad was at work. I know how that felt.',
      scene: 'I picked Maya up from school three days a week and she talked the whole way home.',
      ten_year: 'Maya is sixteen and still tells me things. We have walked a long trail together, just us.',
      five_year: 'Maya is eleven and still tells me things. We have a Sunday that is ours.',
      one_year: 'I do school pick-up three days a week and we eat together every night I am home.',
      month: 'Agree the new hours with Priya, in writing.',
      attachments: [
        { kind: 'photo', name: 'Maya’s school timetable', note: 'Photo of the fridge' },
      ],
      week: 'Have the hours conversation with Priya on Wednesday.',
      ifThen: 'If it is Wednesday after handover, then I ask Priya for ten minutes before she leaves.',
      today: 'Write the three sentences I will say to Priya.',
      firstTwo: 'Open a note and write the first sentence: I want to finish at four on Tuesdays and Thursdays.',
      todayDone: false,
    },
    L3: {
      id: 'L3',
      area: 'Your body',
      text: 'I stay strong enough to hike mountains at seventy.',
      why: 'My mum stopped walking at sixty-five and her world got small.',
      scene: 'At seventy I still walked up mountains and nobody had to carry my bag.',
      ten_year: 'I have walked the Mont Blanc circuit with Maya, carrying my own pack.',
      five_year: 'I hike twenty-five kilometres with a pack, two days in a row, no knee pain.',
      one_year: 'I run ten kilometres and hike twenty with a pack; the knee rehab is finished.',
      month: 'Twelve runs this month, two of them on the hill loop.',
      attachments: [
        { kind: 'doc', name: 'Knee rehab plan.pdf', note: 'From the physio, eight weeks' },
      ],
      week: 'Three runs: Tuesday, Thursday, and the long one Saturday.',
      ifThen: 'If the alarm goes at 5:50, then my shoes are already by the door and I put them on before coffee.',
      today: 'Run the five-kilometre loop before Maya wakes up.',
      firstTwo: 'Shoes on, out of the door, walk to the end of the road before starting the watch.',
      todayDone: false,
      yesterday: { text: 'Run the five-kilometre loop before Maya wakes up.', slipped: true, note: 'Maya was up at five with a cough.' },
    },
  };

  // Horizons, far to near. Quarterly is a review cadence, not a goal level.
  const LEVELS = [
    { key: 'ten_year', label: '10 years', long: '10-year goal', plural: '10-year goals', guide: 'Ten years. For each life goal, what is true in ten years? I have drafted them from your scenes; say them back, change what is not yours.' },
    { key: 'five_year', label: '5 years', long: '5-year goal', plural: '5-year goals', guide: 'Five years. Halfway there. One thing that is true in five years, for each.' },
    { key: 'one_year', label: '1 year', long: '1-year goal', plural: '1-year goals', guide: 'One year. Each one is a step toward a five-year goal. Be specific: what is true in twelve months?' },
    { key: 'month', label: 'This month', long: 'Monthly goal', plural: 'This month', guide: 'This month. One thing that moves each one-year goal.' },
    { key: 'week', label: 'This week', long: 'Weekly priority', plural: 'This week', guide: 'This week. One priority per goal, each with a when and a where.' },
  ];
  const REVIEWS = [
    { key: 'morning', label: 'Every morning', what: 'Set today under the week' },
    { key: 'weekly', label: 'Sunday', what: 'Close the week, pick three' },
    { key: 'quarterly', label: 'Quarterly', what: 'Re-read the year and the month' },
    { key: 'yearly', label: 'Yearly', what: 'Re-read the ten and the five' },
  ];

  const lastWeek = [
    { goal: 'L1', text: 'Shortlist five rooms within twenty minutes of Maya’s school.', status: 'done', note: 'Five on the list. Two are too dear.' },
    { goal: 'L2', text: 'Write down what I actually want to ask Priya.', status: 'done', note: 'Two Tuesdays and Thursdays, finish at four.' },
    { goal: 'L3', text: 'Three runs.', status: 'open', note: 'Two done. Saturday went to the cough.' },
  ];

  const talks = {
    now: {
      chip: 'Work on now',
      user: 'Maya is at Mum’s till six. I have ninety minutes. What do I actually do?',
      guide: 'Today’s named thing is the Didsbury call, for “Find and sign a room I can rent two evenings a week.” Your first two minutes: open the number, say your name and that you want two evenings a week. Ninety minutes covers the call and pricing the other two rooms. Say the first sentence out loud now.',
      cite: 'I saw my own patients two evenings a week in a room with my name on the door.',
      next: { text: 'Call Didsbury, then price the other two rooms.', by: 'by 17:00', goal: 'L1' },
      method: 'talk.closing',
    },
    why: {
      chip: 'Why this?',
      user: 'Why am I even driving to Didsbury tonight? I have done a full shift.',
      guide: 'The viewing is this week’s “Visit three rooms,” which serves “Find and sign a room,” which is the room with your name on the door. You said the reason was being tired of fifteen-minute slots. Does that still hold tonight?',
      cite: 'I am tired of fifteen-minute slots. I want the time to actually fix someone.',
      next: { text: 'Drive to Didsbury at 17:30, or move the viewing to Saturday morning and say so now.', by: 'decide now', goal: 'L1' },
      method: 'talk.closing',
    },
    first: {
      chip: 'Which first?',
      user: 'I have the Priya conversation, the room viewing, the car insurance and a run. Which first?',
      guide: 'Three of those attach. Priya serves “agree the new hours in writing,” the viewing serves “sign a room,” the run is this week’s third. The car insurance attaches to nothing you have set; it waits. Priya first: you moved it last week, and it unlocks the pick-ups.',
      cite: 'I picked Maya up from school three days a week and she talked the whole way home.',
      next: { text: 'Ask Priya for ten minutes after Wednesday handover.', by: 'Wednesday 15:45', goal: 'L2' },
      method: 'talk.closing',
    },
    course: {
      chip: 'Stay on course',
      user: 'Third run missed in two weeks. Maybe I am just not a runner any more.',
      guide: 'Two missed in two weeks, true. “Not a runner” came up before; you reframed it to “a mother of a six-year-old who runs when the house is asleep.” Still accurate? Then this is timing, not talent. Keep three and move Saturday to lunchtime, or set two runs and say so out loud.',
      cite: 'At seventy I still walked up mountains and nobody had to carry my bag.',
      next: { text: 'Two runs this week: Tuesday 6:00 and Thursday 6:00. Saturday is open.', by: 'set now', goal: 'L3' },
      method: 'talk.closing',
    },
  };

  const methods = {
    'interview.opening': { note: 'Answer out loud. Spoken answers are remembered better and expose vague goals.', tag: 'strong' },
    'interview.near_term_scene': { note: 'Describe a concrete day, not a result. Concrete scenes become plans; vague wishes do not.', tag: 'moderate' },
    'interview.end_of_life_scene': { note: 'This names what matters to you. Stating core values helps you hold to them under pressure.', tag: 'moderate' },
    'interview.life_goals': { note: 'Each goal is saved in your words and tied to your own sentence. Written, specific goals are acted on more.', tag: 'moderate' },
    'interview.parent_picker': { note: 'Every goal needs a parent. Near goals tied to far goals keep you going longer.', tag: 'strong' },
    'interview.want_vs_should': { note: 'Goals you want outlast goals you should. Say it; if it drains you, rewrite it.', tag: 'moderate' },
    'interview.week': { note: 'Add when and where. If-then plans roughly double follow-through.', tag: 'strong' },
    'morning.hear_goals': { note: 'Say the thread back. Recalling a goal keeps it active; re-reading does not.', tag: 'strong' },
    'morning.first_two_minutes': { note: 'Picture the first two minutes, not the finish. Process rehearsal raises follow-through.', tag: 'moderate' },
    'morning.obstacle_if_then': { note: 'Name the obstacle, then the plan. Wish plus obstacle plus plan beats wishing alone.', tag: 'strong' },
    'morning.correction': { note: 'A miss gets a step, not a verdict. Self-compassion after failure raises persistence.', tag: 'moderate' },
    'talk.opening': { note: 'Say the problem out loud. Explaining it exposes the real question.', tag: 'moderate' },
    'talk.closing': { note: 'Every talk ends in one step with a time. Decided steps get done.', tag: 'strong' },
    'review.close_week': { note: 'One sentence per priority, no guilt. Neutral review keeps you in the game.', tag: 'moderate' },
    'review.pick_three': { note: 'Three priorities, each tied to a monthly goal. Subgoals with a parent get done.', tag: 'strong' },
    'review.if_then': { note: 'Say when and where. If-then plans roughly double follow-through.', tag: 'strong' },
  };

  return { user, scenes, goals, LEVELS, REVIEWS, lastWeek, talks, methods };
})();
