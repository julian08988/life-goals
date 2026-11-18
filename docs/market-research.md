# Life Goals — Mobile Market Research

Status: research draft v0.1, 18 Nov 2026. Scope: mobile apps (iOS first, Android noted) in and around the Life Goals category: goals and vision, habits, AI journaling and coaching, mindset and affirmations, meditation and neuroplasticity, and the 2025–26 "aesthetic indie" breakouts. Companion to `product-concept.md`.

How to read the numbers. Every App Store rating and review count below was pulled from Apple's public lookup API on 18 Nov 2026 (US storefront). Download and revenue figures are tagged **official** (company or store), **reported** (founder or press, unaudited) or **estimate** (third-party model). Sensor Tower, AppFigures, AppMagic and data.ai app pages are all behind login; `app.sensortower.com/overview/<id>` returns an empty shell without a session, so Sensor Tower figures here come only from its public blog posts, its State of Mobile 2026 report, or press quoting it. Third-party estimates for the same app routinely disagree by 5–40x; treat them as bands. Where nothing public exists we say "unavailable". Review themes come from ~7,500 US App Store reviews (most-helpful and most-recent feeds, 160–300 per core app) read for this report; quotes are verbatim with the review's star rating.

Seed list resolution. **Stella** = *Stella – Manifest Anything* (Perl Productions LLC, Jan 2026), Sarah Perl's TikTok-born manifestation app; the other App Store "Stellas" (a Human Design app, a Spanish tutor, a library app, an AI video tool) are unrelated. **Adjacent**: there is no app called Adjacent in the goals/habits/mindset space (the only match is a 4-rating social app), so we treat it as the heading for the two adjacent breakouts, Brainrot and Gleam. Two apps from the brief are gone: **Dreamfora** (Seoul; ~2M downloads) dissolved in June 2025 and is delisted on both stores; **Jour** was sold to insurer Alan for $20M in 2021 and discontinued as a consumer app around Nov 2024.

---

## 1. Executive summary

- **Nobody owns long-horizon life goals on mobile.** The apps that actually had a hierarchy (Dreamfora: dreams → milestones → habits → tasks; Lifetick: values → SMART goals → weekly steps; GoalsOnTrack) are dead or have one rating. No goal-hierarchy or planning app appears in the top 50 grossing of Health & Fitness, Productivity or Lifestyle (Apple RSS, 17 Nov 2026). The category leaders are habit and self-care apps that use "goals" as a keyword.
- **The money in the neighbourhood is in warmth and ritual, not tracking.** Finch (4.95★, 777K US ratings, est. ~$1M/month, bootstrapped), Monkey Taps' I am and Motivation (739K and 1.08M ratings, est. $200–600K/month each, no investors) and Me+ (249K ratings) are the revenue stories. Classic trackers (Strides, Streaks, Habitica, Productive) earn $5–80K/month and are flat or declining.
- **2026 breakouts are creator-distribution plays with a one-sentence hook.** Stella: $341K MRR and 12.4K paid subs on a RevenueCat dashboard (founder, Jul 2026), zero ad spend, 4M followers. Brainrot: ~$400K/month and ~2M downloads (founder). Gleam: $1M+ ARR. All three use a quiz-then-hard-paywall funnel with weekly plus annual SKUs; all three are paying for it in reviews (Brainrot's sample: 46% one-star; Gleam's co-founder paused the app because it "felt more like building a marketing agency").
- **Future-self audio is validated and already crowded.** Stella, Aya, Manifest ($3.4M a16z seed), MyFutureSelf and Untold all sell a narrated version of your dream life, and the review corpus shows it works viscerally ("5 mins in and I am crying", 5★). None of them connects it to a goal hierarchy, a weekly plan or an obstacle-and-next-step; that is the open seam.
- **Own-voice playback is the single strongest mechanism in the entire review corpus, and it belongs to a buggy 2014 app.** ThinkUp reviewers independently say own-voice affirmations are "more believable", create "buy-in", and work for sleep; discomfort fades in weeks. ThinkUp earns <$5K/month (est.), I am drew one-star reviews for removing read-aloud of self-written affirmations. Mechanism ≠ business: it needs a bigger ritual around it.
- **Memory is the AI product; "generic" is the kill word.** In Rosebud, Mindsera, Untold and Stoic the top praise is "it remembers / sees patterns", the top complaint is "like talking to a person with dementia". Meditation users actively reject bolted-on AI (Headspace's Ebb: "unethical"; Calm: "I saw AI art") while journal users love the same tech when it remembers them. The line is personal vs. generic, not AI vs. human.
- **Interrogate-then-paywall is the number one one-star driver across all 34 apps sampled.** A 10–20 minute intimate quiz, then a hard paywall or card-required trial with price hidden from the ad: "The app just interrogated me for 20 minutes and then asked for money" (Stella, 1★). Price itself is tolerated; hidden, weekly and post-cancellation billing is not. RevenueCat 2026 Health & Fitness medians: 2.9% download→paid, 37.7% trial→paid, 68% of plans annual, $39.94/yr median, 25% first annual renewal.
- **Streak guilt is complained about everywhere, including inside Streaks and Finch**, and no app in the set offers a non-streak progress model: "This app shames you for missing one day" (Gratitude, 1★); "gives you anxiety over something that ought not to matter" (I am, 2★). "Course, not Streaks" is a real, unoccupied position.
- **Voice is paywalled everywhere and usually half-duplex.** Rosebud, Mindsera and Day One all put voice behind their top tier (Mindsera even blocks the OS keyboard mic for free users); users benchmark against ChatGPT's conversational voice and punish tap-record-wait-TTS flows. Voice capture that becomes readable text is loved (Untold, 94% 4–5★ in sample).
- **The meditation library business is shrinking at the top and the Dispenza niche is empty.** Headspace sold to Sword Health for ~$300M (vs. $3B in 2021); Calm revenue est. −24% in 2025; Appfigures literally says "think twice" before building a meditation app. Dispenza's own app is an event companion (3.4★, 46 ratings); his audio sells à la carte on the web. Waking Up proves an evidence-framed, "no woo" audience pays $150/yr.
- **Retention reality:** median 70% of wellness-app users abandon within 100 days (JMIR 2024); Health & Fitness D30 ≈ 3.3% (AppsFlyer Q3 2026). The top stated reasons to quit are data-entry burden and "goal achieved / needs changed", which argue directly for voice capture and a hierarchy that re-plans rather than ends.
- **Design earns loyalty but redesigns destroy it.** Calm, beautiful UI appears in roughly a third to half of positive reviews (mymind, Streaks, Opal, Finch, Reflectly); the single biggest rating cliff for mature apps is a redesign or core-mechanic swap under paying users (Opal mid-2026, Unrot, Habitica, Productive). Data loss of reflective content is the angriest review type of all.

---

## 2. Category map

Rating and count: US App Store, 18 Nov 2026. "Chart" is the position shown on the app's store page the same day. Downloads/revenue: see tag; "est." = third-party estimate, with the source and a confidence note.

| App | Category | Platform | Price model (US IAP list) | Rating (ratings) | Est. downloads / revenue (source, confidence) | Launch | Owner / funding |
|---|---|---|---|---|---|---|---|
| Stella – Manifest Anything | Manifestation / future-self audio | iOS; Android Aug 2026 (10K+) | Hard paywall; $6.99–9.99/wk, $12.99–29.99/mo; 3–7d trial; #119 H&F | 4.7 (5.7K) | $341K MRR, 12.4K paid, ~200K dl (founder, Jul 2026, reported); 500K+ installs (AppInsider est., low) | Jan 2026 | Perl Productions (Sarah Perl), bootstrapped, no ads |
| Brainrot: Screen Time Control | Screen time, gamified pet | iOS (Android unconfirmed) | Hard paywall; $4.99/wk, $3.99–8.99/mo, $19.99–59.99/yr; #151 Productivity | 4.5 (23.1K) | ~$400K/mo, ~2M dl (founder, reported); $10–50K/mo (Peekly/AppGoblin est.); 40x gap | May 2025 | Smolworks (Yoni Smolyar), bootstrapped |
| Gleam: Social Intelligence | Social-skills lessons | iOS; Android May 2026 (100K+) | Near-hard paywall; $12.99/mo, $39.99–89.99/yr; 3–14d trials | 4.7 (12.2K) | $1M+ ARR, 400K users (founder, reported); $17–140K/mo Oct 2026 (AppGazers est.) | May 2025 | C137 LLC (Zhang, Liu), bootstrapped; team paused it |
| Unrot: Earn your Screen Time | Screen time, earn-to-scroll | iOS | Sub only; $9.99/wk, $34.99–69.99/yr | 4.7 (57.1K) | $5–40K/mo (Peekly/Adapty est., low, conflicting) | Jun 2025 | Unrot OÜ (Estonia), undisclosed |
| mymind | Visual "second brain" | iOS, Android, web | No free plan; $4.99–12.99/mo, $79–129/yr (web billing) | 4.0 (417) | ~$880K/yr (GetLatka est., low); never disclosed | 2020 | mymind Inc (van Schneider, Winshell), bootstrapped |
| Aya: Manifest Your Dream Self | Manifestation audio | iOS; Android (100K+) | Hard paywall; $9.99/wk, $19.99–29.95/mo, $149.99/yr + $1.99–4.99 unlocks | 4.8 (3.2K) | ~$50K/mo, ~50K dl/mo (apppricer est.); 726K installs (AppGoblin est.) | Apr 2026 | Lit Apps LLC (anonymous, WY agent) |
| Manifest | Voice-to-affirmation AI companion | iOS | Freemium → ~$70/yr | 4.8 (2.8K) | <$5K–117K/mo (Peekly, conflicting est.); 500K+ installs (est.) | May 2024 | Transcend Labs (Amy Wu), $3.4M seed (a16z Speedrun) |
| MyFutureSelf | AI future-self coach, 90-day plan | iOS, Android | Hard paywall; $6.99/wk, $9.99/mo, $19.99–29.99/yr | 4.7 (1.3K) | $120K ARR, 3.2K subs, 60K dl (company, Aug 2026, reported) | Jul 2025 | Success AI (Sarti, Hickin), bootstrapped |
| Critique AI | AI critique coach + habits | iOS, Android | Hard paywall; $6.99–9.99/wk, $19.99–49.99/yr | 4.7 (9.8K) | ~$10–15K/mo, 40–90K dl/mo (FluxBuilder/AppRank est.) | Mar 2025 | With Bytes (Pierre Dalati, 4.3M TikTok) |
| Strides | Goals + habits tracker | iOS/iPad/Mac/Watch; Android Oct 2026 | Free 3 trackers; $4.99/mo, $39.99/yr, $99–149 lifetime | 4.8 (19.3K) | 1M+ lifetime (AppInsider est.); revenue unavailable | 2013 | Goals LLC (Kyle Richey), solo, bootstrapped |
| Lifetick | SMART goals, values layer (web-first) | iOS, web | Free 2 goals; $39.99/yr | 1.0 (1) | unavailable | 2024 (web 2008) | Meridian 86 (AU) |
| Dreamfora | Dreams → milestones → habits → tasks | delisted | was free + ~€6.99 | n/a | ~2M dl, ~160K MAU (ex-employee, reported); ~$1.4M raised | 2018–2025 | Dreamfora Co (Seoul), dissolved Jun 2025 |
| Goals: AI Coach | Conversational coach + goals/habits | iOS | Free 20 goals; $19.99/yr, $39.99 lifetime; AI coach $6.99–13.99/mo | 4.7 (266) | unavailable | 2019 | TakeOnePiece LLC, indie |
| Life Designer: Plan the Future | Values / vision / mindset course | iOS | $39.99/yr, 3-day trial | 4.8 (26) | unavailable | Feb 2026 | Intelligent Change (Five Minute Journal), bootstrapped |
| Vision Board & Goal Tracker | Vision board wallpaper | iOS | $2.99–6.99/wk, $14.99–24.99/yr, $49.99 lifetime | 4.7 (3.8K) | <$5K/mo (apppricer est.) | 2023 | Sovereign Apps |
| Finch: Self-Care Pet | Self-care pet, gentle habits | iOS; Android (10M+) | Soft paywall; $9.99/mo, $35–70/yr; #21 H&F | 4.9 (776.7K) | ~$1M/mo, ~300K iOS dl/mo (Sensor Tower via third parties, Jun 2026, est.); $30–40M ARR (newsletter, unconfirmed) | 2021 | Finch Care PBC, friends-and-family only |
| Fabulous | Routine journeys (Duke/Ariely) | iOS; Android (10M+, 3.8★) | $39.99–59.99/yr | 4.4 (89.6K) | ~$70–100K/mo US iOS (Sensor Tower relayed, est.); "37M users" (official, cumulative) | 2017 (Android 2015) | Fabulous SAS (Paris), VC-backed, undisclosed |
| Habitica | RPG habit tracker | iOS; Android (5M+) | Free; $4.99/mo, $47.99/yr; gems | 4.3 (3.7K) | 4M+ users (official); $3–16K/mo iOS (est.) | 2015 (2013 web) | HabitRPG, Kickstarter, open source |
| Streaks | Habit tracker | iOS/Watch/Mac/Vision | $5.99 one-time; #1 Paid H&F | 4.8 (27.4K) | ~$5K/mo (Peekly est.) | 2015 | Crunchy Bagel (Zervaas), indie, ADA 2016 |
| Productive | Habit tracker | iOS; Android (1M+, 3.7★) | $10.99/mo, $39.99–79.99/yr | 4.6 (91.1K) | $10–83K/mo iOS (AppGazers est.); declining | 2015 | Bending Spoons (ex-Apalon/IAC) |
| Me+ Lifestyle Routine | Templated routine planner | iOS; Android (10M+) | $9.99/mo, $39.99/yr; 7d trial; ads on free | 4.8 (249K) | multi-$100K/mo US, 1.6–1.9M active (Sensor Tower blog 2024, est.) | 2022 | Enerjoy (Singapore), undisclosed |
| Rosebud | AI journal with memory | iOS, Android (100K+), web | No free (since 30 Sep 2026); $12.99/mo, $107.99/yr; Thrive $24.99–59.99/mo | 4.9 (3.4K) | $1M ARR, 7.5K payers (official, mid-2025) | 2023 web / Aug 2024 iOS | Just Imagine, $6M seed (Bessemer) |
| Reflectly | Mood journal | iOS; Android (1M+) | Freemium; $4.99–59.99 | 4.6 (81.7K) | 6.6M installs, ~305K MAU, <$10K/mo (AppGoblin est.) | 2017 | Kodeon roll-up (Toronto) |
| Mindsera | AI journal, frameworks | iOS, Android, web | Free basic; $14.99/mo, $99–129/yr | 4.8 (286) | €209K revenue Aug 2024–Dec 2025 (official filing); 80K users | 2023 web / Oct 2025 iOS | Mindsera OÜ, bootstrapped |
| stoic. | Journal + routines + AI tier | iOS; Android | Freemium; $6.99/mo, $27–40/yr; AI $12.99/mo; $299 lifetime | 4.8 (36.3K) | 4M+ dl (official); ~$20–40K/mo (est.) | 2017 | Stoic app inc, YC S19 |
| Day One | Journal; AI Daily Chat + Voice Mode | iOS, Android, Mac | Free basic; Silver $49.99/yr; Gold $74.99/yr (AI) | 4.8 (119K) | 15M dl, 500K MAU (official) | 2011 | Automattic |
| Untold – Voice Journal | Voice-first AI journal | iOS; Android (5K+) | $12.99/mo, $107.99/yr | 4.9 (2.3K) | ~$1K/mo (AppRank est., low confidence) | 2023 | Thoughts ACC, pre-seed (Adverb, Soma) |
| Clarity: CBT Self Help Journal | CBT thought record | iOS; Android (500K+) | Free core; Pro ~$60/yr | 4.8 (29.5K) | 3M+ dl (official); $5–60K/mo (est., wide) | 2015 | Inquiry Health, 2 people |
| I am – Daily Affirmations | Affirmations, widgets | iOS; Android (10M+) | Ads + $14.99/mo, $59.99/yr; #42 free H&F | 4.8 (739.5K) | $200–600K/mo, ~2.5M MAU (multiple est.); peak $227K/week US (Sensor Tower blog 2024) | 2014 | Monkey Taps (Spain/US), no investors |
| Motivation – Daily quotes | Quotes, widgets | iOS; Android (10M+) | $3.99/wk–$47.99/yr; #46 free H&F | 4.8 (1.08M) | similar band to I am (est.) | 2014 | Monkey Taps |
| ThinkUp | Own-voice affirmations | iOS; Android (100K+) | 3 free recordings; $7.99/mo, $39.99/yr, $99.99 lifetime | 4.7 (7.5K) | <$5K/mo (Peekly est.) | 2014 | Precise Wellness, bootstrapped |
| Gratitude: Self-Care Journal | Gratitude + affirmations + vision board | iOS; Android (5M+) | Free core; $4.99/mo, $29.99–39.99/yr | 4.9 (45K) | 8M+ dl (official); ~$5K+/mo (est., low) | 2018 | Hapjoy (Mumbai), bootstrapped |
| Headspace | Meditation library + Ebb AI | iOS, Android | $12.99/mo, $69.99/yr; #91 free H&F | 4.8 (973.7K) | ~$40M app-store revenue 2025 (AppMagic/Sensor Tower est.); sold ~$300M | 2012 | Sword Health (2026) |
| Calm | Meditation, sleep stories | iOS, Android | $16.99/mo, $79.99/yr, $499.99 lifetime; #60 free H&F | 4.8 (2.0M) | ~$210M 2025, −24% (Business of Apps est.) | 2013 | Private, $2B valuation 2020 |
| Balance | Personalised meditation | iOS; Android (1M+) | $11.99/mo, $69.99/yr, $399.99 lifetime | 4.9 (120.8K) | ~$400K/mo iOS (AppRank est.) | 2019 | Elevate Labs, $17M raised |
| Waking Up | Secular meditation + theory | iOS, Android | $19.99/mo, $149.99/yr; no-questions scholarships; #42 grossing H&F | 4.9 (42.8K) | $0.7–1.0M/mo iOS (est.) | 2018 | Sam Harris, creator-owned |
| Insight Timer | Meditation marketplace | iOS, Android | Free; $59.99/yr; #15 grossing H&F | 4.9 (449K) | ~$40M/yr (est.); 30M members (official) | 2009 | Insight Network, ~$40M raised |
| Making Your Mind Matter (Dispenza) | Retreat companion | iOS, Android | Free, event code | 3.4 (46) | n/a | 2016 | Encephalon Inc |
| Opal | Screen time | iOS; Android (500K+); Mac | Freemium; $19.99/mo, $99.99/yr; #86 free Prod. | 4.7 (91.7K) | $10M ARR, 1M DAU (official, 2025) | 2020 | Opal OS, $14M raised |
| BePresent | Screen time | iOS, Android | No free; $59.99/yr; #56 free Prod. | 4.8 (71.9K) | $1.5M ARR, 1M users (founder, Oct 2025) | 2022 | Screen Detox, 2 people |
| Cal AI (reference) | AI calorie tracker | iOS, Android | ~$30/yr; #9 free H&F | 4.8 (376K) | $30M revenue 2025 (official) | 2024 | Sold to MyFitnessPal (Dec 2025) |
| Focus Friend (reference) | Focus timer with bean | iOS, Android | $1.99/mo, $14.99/yr | 4.8 (10.5K) | 1.9M installs, $800K in 6 weeks (Appfigures est.) | Jul 2025 | Hank Green |

---

## 3. Deep dives

### 3.1 Stella – Manifest Anything (the closest analogue to the Scene Player)

**What it does.** You describe your dream life in a long guided questionnaire; Stella generates a personalised audio story narrated as your future self, with your name and the people you love, over ambient sound, plus one daily affirmation. Optional voice clone so the story plays in your own voice. Deliberately one feature.

**Signature interaction.** Press play and hear your own future described in first person, past tense. The founder's rule: "an app that fits in one sentence shows in a 10-second video."

**Monetization.** Hard paywall after the quiz; ten "Unlimited" SKUs from $6.99/week to $29.99/month, 3–7 day trial; ~$28/subscriber/month effective (derived from founder's MRR ÷ subs). Zero paid ads; growth from 4M TikTok/Instagram followers and a comment-keyword DM bot. $341K MRR / 12.4K paid / 6.1K trials (RevenueCat screenshot, Jul 2026); ~6% download-to-paid vs. a 2.9% category median, because the audience pre-existed.

**What users love.** Crying within minutes is the dominant motif: "I have had the app for MINUTES and I'm already sobbing" (5★). "It hits different when you hear your dreams... like an audiobook" (5★). The own-voice clone is called out as a differentiator: "I love how I can use my own voice clown to create my stories!" (5★). Time saved vs. recording affirmations manually; the calm, dreamy aesthetic.

**What users hate.** 59 of 88 low reviews in the sample are paywall/price: "The app just interrogated me for 20 minutes and then asked for money" (1★); "$336 a year for an app that isn't a guarantee!" (1★). Billing outside Apple's subscription list. AI hallucinating details with no edit path: "constantly refers to one of my sons as a daughter" (3★); "I cannot edit my Manifestations" (1★). Playback bugs. Imagery that is "a rich white girl" (3★). Privacy unease at the questionnaire. Several 5★ ratings are explicit protest ratings.

**Steal.** First-person, past-tense, sensory script; the user's own voice as the premium option; one hook you can demo in ten seconds; a creator-led, ad-free distribution plan.

**Avoid.** Quiz-then-paywall; weekly billing; uneditable scripts (every mis-stated detail collapses the spell); stock imagery of one demographic. Always end the scene in an obstacle and a next action (the concept doc's WOOP rule), which Stella never does.

### 3.2 Brainrot: Screen Time Control (what a 2025 indie launch looks like)

**What it does.** A cute brain pet that visibly rots as you doomscroll; Apple Screen Time API blocking with friction (breathe before opening) rather than hard locks. Streak-unlocked themes.

**Signature interaction.** Watching the avatar decay; being asked to breathe before Instagram opens.

**Monetization.** "All features require a subscription." $4.99/week default, annual $19.99–59.99 with 3-day trial, 50%-off exit offer, Superwall paywall tests. Founder-reported ~$400K/month and ~2M downloads; trackers estimate $10–50K/month (unverified either way). Growth: 100–150K Instagram followers from build-in-public vlogs, waitlist launch ($26K in first 30 days), then UGC and ~50 concurrent Meta ads.

**What users love.** Measurable results: "From 22h a week to about 3" (5★). Friction rather than lockdown. The avatar as "a clever and hilarious reminder" (5★). A transparent solo developer.

**What users hate.** 99 of 158 low reviews: paywall after a long survey with no free tier or trial. "How ironic. I download this app to save time, but ended up wasting more of it" (1★). Rating prompt before first use: "diabolically evil" (1★). Exit discount "feels scammy." Charged weekly for months after deleting. Shame-based intro copy: "scare tactics... an immediate turn off" (1★). Widget advertised but broken.

**Steal.** A mascot or visual that changes state with your behaviour (the Constellation can do this without a cartoon); build-in-public founder content before launch; a hook that renders in the first second of a video.

**Avoid.** Diagnosing the user as a failure in onboarding; guilt copy; paywall before any value; review prompts before use.

### 3.3 Gleam: Social Intelligence ("Duolingo for social skills")

**What it does.** Five-minute gamified lessons and scenario quizzes on small talk, flirting and interviews, with AI feedback and a voice-practice mode.

**Signature interaction.** Duolingo-style card lessons with streaks and energy; a safe space to practise speaking.

**Monetization.** $12.99/month, $39.99–89.99/year with 3/7/14-day trials by cohort; card up front in early versions; a limited free tier now exists. $1M+ ARR, 400K users (founder), Product Hunt #9 of the day. Grew on ~10-minute TikTok "storytime" videos; co-founder later said the team "stopped working on Gleam five months ago" to build a paywall-free product because the growth loop felt like running a marketing agency.

**What users love.** Transfer to real life: "I even look forward to the next day to do another lesson" (5★). Clean UI. "My Social Anxiety has Improved So Much" (5★). Proud TikTok origin: "Aye who came from that TikTok" (5★).

**What users hate.** Card details before seeing anything, price hidden until the trial screen; "$70 to tell you to 'force a genuine smile'" (1★); AI-generated art read as "AI slop by tech bros" (1★), with users inferring the whole app is machine-made; trial-end reminder promised and not sent; a redesign that "gutted" the favourite quests feature; wrong-gender copy.

**Steal.** Session length (five minutes), a visible skill tree, and the safe-space framing for practising something emotionally hard, which is exactly what Catch and Reframe is.

**Avoid.** AI-generated illustration anywhere a human could be expected; hidden pricing; gutting features users love.

### 3.4 mymind (the tasteful-indie benchmark)

**What it does.** "Save everything, organise nothing": one-tap save from the share sheet, AI tagging and visual arrangement, "Serendipity" resurfacing of old saves. Privacy-first, ad-free.

**Signature interaction.** A quiet, gallery-like grid of your own saved things, algorithm-free.

**Monetization.** No free plan beyond a trial; $4.99/$7.99/$12.99 per month, $79–129/year, mostly web-billed; ~$880K/year (GetLatka estimate), bootstrapped by Tobias van Schneider and Jason Winshell, Product Hunt #2 of the day (559 upvotes), no ads, no TikTok.

**What users love.** Design above function: "The interface is breathtaking" (5★); 32 of 97 positive reviews mention aesthetics. "I leave mymind feeling happy and inspired, rather than drained" (5★). ADHD relief: "if you have adhd this is what its like to NOT have adhd" (5★). Human support.

**What users hate.** Price ("$119/year is steep", 4★), years of iOS bugs versus a polished web app ("Fantastic Product, Subpar App", 3★), free-tier limits that "feel like a trap" (1★), capture friction, no widget, billing after cancellation. Several 1–2★ reviews say it is no better than Notes, which is the concept doc's "not a notes app" failure mode in the wild.

**Steal.** Typographic restraint, generous negative space, dark mode done well, "Serendipity" (spaced resurfacing of your own content, which maps to Future-Self Scenes), the no-ads/no-data-selling stance as brand.

**Avoid.** Web-first polish with a neglected iOS app; letting design carry an experience that could be replicated in Notes.

### 3.5 Finch: Self-Care Pet (the retention and warmth benchmark)

**What it does.** A bird that grows as you complete self-care goals; breathing, reflection and soundscape micro-exercises; daily affirmations; friends as "Finch buddies."

**Signature interaction.** Caring for the bird rather than defending a streak. Soft, non-punitive tone.

**Monetization.** Soft paywall with a genuinely usable free tier; Finch Plus $9.99/month, $35–70/year; ~$1M/month and ~300K iOS downloads/month by mid-2026 (Sensor Tower via third parties), >2.7M Android US active users (Sensor Tower blog Q3 2025); 686+ live Meta/Google ads. Bootstrapped by ex-Quora founders; 75% women aged 25–35 (newsletter claim).

**What users love.** "Changed my life" is the most common superlative (20 of 279 high reviews). "incentivized me to be productive and compassionate with myself" (5★). "the experience difference from the Free and Premium version... is so small" (5★). Clinician-recommended. "Adorable, Helpful, and Not Annoying" (5★).

**What users hate.** Streak loss despite daily use: "it took my 250 streak down to one" (1★). Grind drift: "less about accomplishing real goals and more about checking off insignificant tasks to send my little birb" (3★). Onboarding quiz that didn't personalise anything: "I was expecting it to tailor the app... Nope!" (3★). Per-member pricing, loud sounds, forced pronoun choice.

**Steal.** Tone. A free tier that doesn't feel crippled. Meeting the user "where I'm at". Reviewers of five other apps in the set wrote "just go to Finch".

**Avoid.** Gamification that turns goals into busywork; any quiz whose answers do not visibly shape what comes next.

### 3.6 Rosebud (the AI-journal leader)

**What it does.** Free-form entries, a "Dig Deeper" button for AI follow-ups, long-term memory across entries, weekly reports, "Ask Rosebud", personas. Voice transcription, read-aloud and a Call Mode, all in the paid Bloom tier.

**Signature interaction.** Writing or speaking a messy entry and getting a follow-up question that references something you said a month ago.

**Monetization.** Bloom $12.99/month or $107.99/year, Thrive tiers to $59.99/month; AI metered by a weekly budget even for payers; free plan retired 30 Sep 2026 because AI and memory costs made free users unsustainable. $1M ARR / 7.5K payers (official, 2025), $6M seed led by Bessemer with Tim Ferriss. Wirecutter's pick for the app that "made us think the most deeply".

**What users love.** Memory: "She really is like a good therapist, seeing patterns, remembering details you shared last month" (5★). Spirals: "transformative in precluding my tendency to spiral" (5★). Voice for non-typers and arthritis sufferers. "weekly report felt like a pat on the back from my future self" (5★).

**What users hate.** Usage caps on an annual plan: "I paid $150 for an annual subscription only to find out that after two weeks I can't use it again until July 15th" (2★); "for $20/month I can have unlimited messages with chat gpt" (1★). Memory regressions: "like I'm talking to a person with dementia" (1★). Lost voice recordings ("effectively ERASED my voice", 1★). Half-duplex voice: "you have to tap the mic and then send" (2★). Generic, sycophantic replies.

**Steal.** Memory as the visible product (a "what I know about you" layer the user can edit); the weekly report framed from the future self; follow-up questions rather than summaries.

**Avoid.** Metered AI on a paid plan; paywalled voice; text-first with voice bolted on; sycophancy without a knob.

### 3.7 Untold – Voice Journal (voice-first done right, at tiny scale)

**What it does.** Hit record, talk; live transcription; optional follow-up questions; a "Perspective" afterwards through one of a dozen lenses (Cognitive Restructuring, ACT, Positive Psychology, a poem); AI-generated meditations, "morning manifestations" and sleep stories built from your own entries in a selectable synthetic narrator.

**Signature interaction.** Speaking for ten minutes and reading it back as text.

**Monetization.** $12.99/month, $107.99/year after a long free era; pre-seed from Adverb and Soma; ~$1K/month (AppRank est., low confidence), 2.3K ratings, 5K+ Android installs. Uses OpenAI, Anthropic and Hume (voice emotion).

**What users love.** 94% 4–5★ in sample, the highest in the set. "I open it up, hit record, and when I'm done... it creates a transcription. Simple but brilliant" (5★). "the psychological perspective and the cognitive restructuring... Those were very helpful parts" (3★). Personalised meditations "so to the heart of things it made me feel really seen" (5★). "within the first session i was sobbing" (5★). One user: "my therapist told me it's time to say all the things out loud... so I can hear myself and be a witness" (5★).

**What users hate.** Paywall landing on years of personal data ("Heartless & Unprofessional – Added Paywall With No Warning", 1★) plus a training-data scare; lost 1–2 hour recordings stuck uploading; "way too much homework" (3★); perspective-taking prompts in abuse situations; a red rebrand.

**Steal.** The entire capture flow; generated-from-your-own-words audio (nobody asked for a generic library); naming the lens you are applying.

**Avoid.** Launching free-forever by implication; synthetic stranger narration where the user's own voice would be stronger; unbounded follow-up homework.

### 3.8 ThinkUp (the own-voice proof point)

**What it does.** Record affirmations in your own voice, add music and an image, listen on a loop (recommended 15+ affirmations, 5 minutes a day, 21 days). No AI.

**Signature interaction.** Hearing yourself say it.

**Monetization.** Three free recordings, then $7.99/month, $39.99/year, $99.99 lifetime; <$5K/month (est.), ~4 people, last Android update Aug 2025.

**What users love.** "It's so impactful hearing them back in your own voice! It's like you're hearing yourself think amazing things and it creates such buy-in" (5★). "Makes it so much more believable" (3★). "The first time I heard my own voice, it was very uncomfortable, however after doing this for 3 months..." (5★). Used for falling asleep ("reprogram my subconscious mind using my own voice") and by a parent for a child who "absolutely lights up hearing her own voice".

**What users hate.** Lost recordings, repeatedly ("Twice, I spent an hour recording affirmations and they all disappeared", 1★); lifetime purchases not honoured; music louder than the voice; playback stops when the screen locks; public-embarrassment risk ("your phone blares 'I am comfortable with my sexuality' to 20 strangers", 3★).

**Steal.** The thesis. Own-voice rehearsal is the most believable self-talk intervention in the corpus and the discomfort hurdle is real but short.

**Avoid.** Every one of its failures is engineering: durable cloud backup of audio, loudness normalisation, background playback, headphone-first defaults, entitlement restores.

### 3.9 I am and Motivation (Monkey Taps; the affirmation money machine)

**What it does.** Text affirmations and quotes delivered by lock-screen and home-screen widgets and scheduled notifications; categories, themes, your own affirmations. No voice, no AI.

**Signature interaction.** The widget. Users describe the mechanism as interruption, not opening the app: "The more I got interrupted with a positive thought, the more I questioned why I believed such horrible negativity" (5★).

**Monetization.** Ads for free users plus $14.99/month, $59.99/year, lifetime $89.99–149.99 (I am) and $3.99/week to $47.99/year (Motivation), 3-day trials; 700+ concurrent Meta ads, AI-generated UGC TikToks, Apple features. Two apps at 739K and 1.08M US ratings, 10M+ Android installs each; estimates $200–600K/month per app; no investors, ~25 staff.

**What users love.** Passive delivery; "Only two weeks after having this app send me notifications and stay as a widget... I started believing the affirmations" (5★). Saying it out loud: "Engaging my voice was the key difference... Not just saying the things in my head but out loud" (5★). Own affirmations on the widget.

**What users hate.** Trial auto-renewal without the promised reminder ("$95 charge on my card", 1★); ten-minute quiz into paywall; toxic positivity ("I am a magnet for money", 3★); streak anxiety; removing read-aloud of self-written affirmations ("This was great for falling asleep to affirmations", 1★); filters ignored (a Muslim user receiving Christian quotes, 1★); repetition; widget bugs; lost custom content.

**Steal.** Lock-screen widget as the primary surface (today's priority plus its ancestor goal); scheduled, user-controlled delivery; the user's own words, not a library.

**Avoid.** Generic content of any kind; streak notifications; an unkept "we'll remind you before renewal" promise.

### 3.10 Strides (the best pure goal tracker)

**What it does.** Four tracker types (habit, target by date with pace, average, project milestones), 150+ templates, a daily "Due" list, charts, widgets, Watch and Mac apps. Solo developer since 2012; Android finally launched Oct 2026.

**Signature interaction.** "Ahead or behind pace" on a dated target.

**Monetization.** Free for 3 trackers (down from 7); $4.99/month, $39.99/year, $99–149 lifetime. ~1M lifetime installs (est.); revenue unavailable.

**What users love.** Flexibility; the widget ("by far the most aesthetic", 5★); gentle nudges for ADHD ("those nudges are PRICELESS!", 5★); a developer who fixes bugs in 24 hours; "It isn't one of those apps that yell at you that you didn't exercise on a Tuesday" (5★); "daily, weekly, and monthly practice" layering (5★).

**What users hate.** Shrunken free tier and the move to subscription; weekly-frequency goals handled badly; streak visibility ("option to turn off 'streaks'", 4★; "constantly tracking my success against my failures", 3★); dated UI; sync data loss.

**Steal.** Pace-against-target as the Course Line's underlying maths; multi-horizon layering; reminder tone.

**Avoid.** Tracking as the product. Even its happiest users ask for the streak counter to go away.

### 3.11 Near neighbours in one paragraph each

**Manifest** (Transcend Labs, $3.4M a16z Speedrun seed): hold a pastel orb and speak what's on your mind; AI mirrors it into affirmations and a personalised audio meditation; a star mascot cheers. Launched free in 2024, then paywalled and raised to ~$70/year; 14 of 27 low reviews are from loyal users locked out of their own past sessions ("THEIR app saved my life" turned 1★). The closest existing voice-in, audio-out reframing loop; the lesson is not to launch free and retract.

**MyFutureSelf** (Success AI, $120K ARR, built with Claude and Cursor): onboarding builds a profile of who you want to become, optionally an aged selfie; an AI mentor modelled on that person chats or voice-calls you through a 90-day roadmap. "the guided meditations and chats with my future self are crazy powerful" (5★); 10 of 15 low reviews are trial/paywall, the rest data loss and pre-set tasks that cannot be deleted. Proof the identity-based framing lands; proof again that the funnel kills it.

**Life Designer** (Intelligent Change, Feb 2026, 26 ratings): a five-pillar course (who you are, mindset and reframing limiting beliefs, core values, ideal day, 10-year life vision with a letter to your future self), voice memos, $39.99/year. Top-down vision structure very close to section 4 of the concept doc, but a journal/course with no cascade to monthly or weekly action.

**Goals: AI Coach** (TakeOnePiece, 266 ratings): a conversational "Growth Coach" applying 16 named methods (Tiny Habits, CBT thinking tools, WOOP-adjacent SMART, self-compassion) to turn a goal into steps and habits, with a "North Star" life goal that users single out ("helping focus goals and habits so that they align", 5★). Text chat, AI priced as a separate tier, one-time lifetime option praised. The nearest existing "coach plus hierarchy" product, at negligible scale.

**Dreamfora** (dead): the most direct "dream → milestones → habits → tasks" competitor, with AI plan generation and a social feed, reached ~2M downloads and ~160K MAU on ~$1.4M of funding and still shut down in June 2025. Reviews complained it "feels like social media". A hierarchy without a daily emotional ritual did not retain or monetise.

---

## 4. Patterns

### What the winners share

- **A ritual, not a tool.** Finch's morning check-in, Stoic's morning/evening routine, Waking Up's daily meditation, I am's scheduled widget refresh, Stella's nightly story. Trackers that only ask for logging (Strides, Productive, Habitica) are loved by a niche and flat.
- **Warmth and permission.** The "changed my life" reviews cluster around apps described as "gentle", "not annoying", "meets me where I'm at" (Finch, Strides, Balance's "kind voice for my inner critic"). Shame copy and penalties (Brainrot's intro, Habitica's HP loss, Fabulous's day-one resets) are named as the reason people quit even when the tool worked.
- **Personal over generic.** Memory (Rosebud, Mindsera), the user's own words (Untold's generated meditations, I am's custom affirmations, Motivation's own quotes on the widget), the user's own voice (ThinkUp, Stella). "Generic" and "recycled" are the words attached to every incumbent library's decline.
- **A named, human voice.** Andy (Headspace), Tamara (Calm), Ofosu (Balance), Sam (Waking Up) are praised by name; "Sam's calm voice at some point becomes yours" (5★) is the exact internalisation effect Life Goals wants from own-voice playback. Detected synthetic narrators are punished ("the new voices are not people but software", 1★).
- **Widgets and lock screen as the real surface.** Monkey Taps' inflection in Q4 2020 coincided with iOS 14 widgets; Strides, Streaks and Me+ users credit widgets for consistency. Widget bugs are correspondingly severe complaints.
- **Pricing that keeps its promises.** Annual anchors at $40–70 with a 5–9 day trial are the category norm (RevenueCat: 68% annual, $39.94 median, trial→paid 37.7%). Premium works with a strong reason (Waking Up $150, Opal $100, Rosebud $108). Goodwill comes from one-time options (Streaks, Goals: AI Coach), scholarships (Waking Up), and a free tier that is not crippled (Finch, Opal: switching to freemium took Opal to 1M DAU and $10M ARR). Hard paywalls convert 10.7% vs 2.1% freemium with identical year-one retention (RevenueCat 2026), which is why the indies use them, and why their reviews look the way they do.
- **Visual calm.** Dark or soft palettes, large type, little chrome (Waking Up, Balance, mymind, Opal pre-redesign, Stella). "Overstimulating" is a complaint against Fabulous and Habitica from the ADHD users those apps target.

### Why most goal apps stall

- **The goal is captured once and then only logged.** Dreamfora and Lifetick had hierarchies and no daily emotional re-presentation; both stalled. JMIR's 525K-participant review finds "goal achieved / needs changed" and data-entry burden among the top abandonment reasons; a living hierarchy and voice capture address both.
- **Streaks convert a bad week into shame.** Requests to hide or protect streaks appear in Streaks, Finch, Strides, I am, Gratitude, Productive. No app offers a direction-of-travel model.
- **The paywall arrives before the value.** The quiz-then-paywall funnel is the proximate cause of most one-star reviews across 34 apps, and in Health & Fitness it is also the model converting best. The tension is real; the resolution is to deliver the emotional payoff (the first scene playback) before the paywall and to be transparent about price in the ad.
- **AI either forgets or flatters.** Memory regressions and sycophancy are review-bombed; safety deflection to hotlines (Mindsera) and forced negative prompts (Stoic's "what will you struggle with today?") are specific failures for anything that wants to sit with negative self-talk.
- **Reflective data gets lost.** Gratitude (years of entries), ThinkUp (hours of recordings), Rosebud, Motivation: local-only storage with paywalled backup produces the angriest reviews in the corpus.
- **Redesigns and mechanic swaps.** Opal's mid-2026 redesign ("World Record for Worst Update Ever", 1★), Unrot's coin→battery→coin swap, Habitica's guild removal: the biggest single rating cliff for mature apps.

### What the breakout indies reveal about the 2026 launch playbook

1. **Audience or content before product.** Stella (five years of TikTok), Brainrot (build-in-public Instagram), Critique AI (a 4.3M-follower co-founder), BePresent (founder-face TikTok across seven accounts to $1.5M ARR with two people). Blake Anderson (Cal AI, Rizz, Umax; $15M ARR bootstrapped in 2024): "validate through content before code".
2. **One sentence, ten seconds.** Rotting brain; earn your scroll; hear your future self; Duolingo for social skills. The result must be on screen in the first second of the video.
3. **Micro-UGC at scale.** $10–30 per post plus view bonuses; Cal AI ran ~250 creators on retainers; Umax's $250 promos to small accounts produced ~200K downloads in a week.
4. **Hard paywall, weekly plus annual, trial only on annual, Superwall split tests.** Then paid social once a format works (Brainrot ~50, Unrot ~117, Motivation ~700 live Meta ads).
5. **Aesthetic is table stakes; two visual families dominate.** Cute mascot plus gamification (Brainrot, Unrot, Manifest's star, Gleam) or calm, dreamy, audio-first (Stella, Aya). Both avoid dashboards and feeds.
6. **The costs are now visible.** 9–10% of Stella's reviews and the majority of Unrot's, Aya's and MyFutureSelf's are about weekly billing and quiz-then-paywall; Unrot's recent-review average fell to ~3; Gleam's founders walked away. The 2027 version of this playbook will need the hook without the trap.

---

## 5. Whitespace and positioning

**Crowded.** Habit tracking (dozens of polished apps, flat revenue). Generic affirmations and quotes (Monkey Taps owns distribution). Meditation libraries (contracting). Text-first AI journaling (Rosebud, Mindsera, Day One, Stoic, 18 funded startups averaging ~$343K/year revenue per Trends.vc). Manifestation audio for a Gen-Z female audience (Stella, Aya, Manifest, Copia, plus fast followers every quarter). CBT thought records (Clarity is free forever).

**Differentiated, with evidence from the corpus.**

- A **goal hierarchy that cascades to this week** with visible ancestry: no live app at scale does it; the closest (Goals: AI Coach's "North Star", Strides' daily/weekly/monthly layering) are the features users single out in those apps.
- **Own-voice future-self rehearsal that ends in an obstacle and a next action**: Stella and ThinkUp prove the emotional mechanism; nobody pairs it with planning, and the Kappes & Oettingen finding (pure positive fantasy lowers effort) is a genuine, explainable point of difference versus manifestation apps.
- **Catch and Reframe in context**: reframing exists (Clarity, Untold's Cognitive Restructuring lens, Rosebud), but never linked to the goal the thought is attacking, and never voice-first.
- **No streaks**: universally requested, nowhere delivered.
- **Evidence-framed neuroplasticity practice**: Dispenza has no consumer app; Waking Up shows the "no woo, explain the mechanism" audience pays $150/year; Balance's reviewers value "the education of the effects of meditation on the brain".
- **Voice that is free and full-duplex**: every incumbent paywalls voice and most are half-duplex.

**Positioning options.**

1. **"The weekly plan that remembers why."** Lead with the Week Weave and Constellation: three priorities, each threaded to a life goal, planned by voice on Sunday. Audience: founders, operators, ambitious 25–45s who already own a goals doc. Premium annual ($79–99) with a 7-day trial; Sunsama ($204/year) and Waking Up ($150) show this audience pays. Risk: planning is a harder ten-second demo than audio.
2. **"Your future self, in your voice."** Lead with the Scene Player as the hook (the thing people show friends), with the hierarchy as the retention engine underneath. Most TikTok-native option; directly contests Stella and Aya but with own voice, editable scripts, and obstacle-plus-next-step. Risk: being read as a manifestation app by the evidence-minded audience; mitigated by language and by the plan that follows every scene.
3. **"Course, not compliance."** The anti-streak, anti-shame goals app: Finch's warmth for adults with ambitions. Differentiator is tone and progress model; the risk is sounding soft to a performance-oriented buyer.
4. **"Mental rehearsal, explained."** A Dispenza-inspired but evidence-framed practice (Morning Rehearsal, the opt-in four-week program) as the spine, goals as the content. Owns an empty niche with a passionate audience, but narrows the market and inherits the guru-adjacency risk the Waking Up reviews illustrate.
5. **Coach layer later.** Lifetick, Goalify and Weekdone show a B2B check-in layer exists; Jour's fate (bought for B2B, consumer app killed) shows the risk of letting it lead.

Recommendation implied by the data: build 1 as the substance and 2 as the demo. The ten-second video is the Scene Player in the user's voice; what the user does every week is the Week Weave. Say "no streaks" out loud in the store listing; it is noticed.

---

## 6. Implications for design mockups

Must-have interactions to design first:

- **Scene Player** with the user's own waveform, a visible "edit script" affordance (Stella's biggest content complaint), and a mandatory tail: one obstacle, one next action.
- **Voice capture that becomes text instantly** (Untold's flow), full-duplex where possible; never worse than the OS keyboard mic; free.
- **Week Weave** with the thread from priority → monthly → yearly → life goal as the UI constraint; an unattached slot cannot be saved.
- **Lock-screen widget**: today's priority and its ancestor goal, plus a one-tap "I'm in my head" entry into Catch and Reframe. Monkey Taps' whole business is this surface.
- **Course Line**, not a grid: direction of travel against the monthly goal, a "back on course" action after a miss, no counter.
- **Catch and Reframe** that names the distortion, writes the reframe in distanced self-talk, and lights the goal being attacked.
- **"What I know about you"**: an editable memory panel; Rosebud's praise and its worst complaint both come from memory.
- **Onboarding that visibly uses its answers** and delivers the first scene playback before any paywall; price shown in the first minute.
- **Backup and export of audio** as a free, automatic, visible promise.

Visual benchmarks to open before designing: Stella (scene playback, dreamy calm, feminine-coded, so note what to subtract); Manifest (the orb as voice affordance); Untold (capture flow, perspectives); Finch (tone, free-tier generosity); Balance and Waking Up (dark, minimal, text-forward, named voices); mymind (typography, negative space, Serendipity resurfacing); Opal's pre-mid-2026 design and the review fallout after; Strides and Streaks (widgets, completion rings as the thing to avoid); I am (lock-screen widget as product); Headspace's Ebb (how not to place AI in the nav); Gentler Streak (the only mainstream "gentle progress" visual language in the Health & Fitness category).

---

## 7. Appendix: "Paper" for mockups

"Paper" almost certainly means **paper.design**, Stephen Haney's (Radix UI, Modulz) code-native design canvas: every layer is real HTML/CSS, so "what you design is the code that ships." $4.2M seed (Accel, Feb 2025), $34M Series A (Accel and ICONIQ, Jul 2026), public and GA with a web app and a desktop app for macOS, Windows and Linux (v0.5.19, 13 Nov 2026). The old FiftyThree/WeTransfer Paper iPad sketchbook still exists under Evernote but is a drawing journal, and Dropbox Paper is a docs tool; neither is what Julian heard about. Pricing: Free (unlimited editors, 100 MCP tool calls per week), Pro $20 per editor per month ($16 yearly; 1M MCP calls per week, video export), Organizations custom.

Agent-in-the-loop is Paper's whole bet and its strongest point. A local MCP server ships with the desktop app with one-click setup for Claude Code, Cursor (`/add-plugin paper-desktop`), Codex, Copilot and VS Code, and a remote MCP at `mcp.paper.design` (launched 16 Nov 2026) serves cloud agents. Around twenty granular tools (`write_html`, `get_jsx`, `get_screenshot`, `update_styles`, `create_artboard`, token management) let an agent draw screens as editable layers, screenshot them to self-verify, and read comments addressed to it. There is no built-in UI-generation chatbot; generation is delegated to your coding agent, which suits a gstack `/design-shotgun` workflow well. The free tier's 100 calls per week will not survive a real multi-screen session, so budget for Pro.

Fit for iOS mockups: usable, not ideal. There is a Phone frame preset and local fonts (SF Pro) render, but there is no iOS component kit, device chrome, SF Symbols or Dynamic Island template; export is React/Tailwind/CSS, not SwiftUI or React Native; reusable components still have not shipped (the biggest gap for a 15-screen app); no prototyping; and designers report alpha-grade rough edges (no scale tool, weak SVG, image fills). For a SwiftUI or Expo app, Figma with the iOS 26 UI kits and the new `use_figma` MCP write access, or pen.dev (free, repo-resident, Cursor-native) are safer first picks; Google Stitch is the best free concept generator with a Mobile mode; Play, the only iOS-native design tool, was acquired by Apple and shut down in April 2026. Paper is worth a free-tier trial for agent-driven exploration of the Constellation and Scene Player if Julian is comfortable rebuilding iOS chrome in HTML.

---

## 8. Sources

Store data: Apple iTunes Search/Lookup API and `apps.apple.com` listings for every app above (18 Nov 2026); Apple RSS top-grossing feeds for genres 6013/6007/6012 (17 Nov 2026); App Store customer-review RSS feeds (most helpful, most recent) for 34 apps.

Breakout indies
- Stella: https://ijackdoit.com/articles/stella · https://aihustletracker.com/en/cases/stella-sarah-perl/ · https://apppricer.com/app/6757347283 · https://www.appbrain.com/app/stella-manifest-anything/com.priestess.manifestation
- Brainrot: https://www.indiehackers.com/post/tech/this-chronic-side-hustler-just-hit-26k-in-30-days-fYbp8x4WWqltdifUwCZJ · https://www.starterstory.com/stories/how-i-built-it-400k-month-ios-app · https://thebrainrotapp.com/faq.html · https://appgoblin.info/apps/6744338972 · https://peekly.app/apps/fb1122d6-eeb6-4d8b-907b-4721d232aef0
- Gleam: https://www.socialgrowthengineers.com/from-abandoned-app-to-100k-mrr-in-30-days · https://www.producthunt.com/products/gleam-2 · https://appgazers.com/reports/apps/ios-6745815058 · https://play.google.com/store/apps/details?id=com.gleam.gleamapp
- Unrot: https://adapty.io/paywall-library/unrot/ · https://www.unrot.com/faq · https://productivity-apps.com/apps/unrot
- Aya: https://apppricer.com/app/6760195623 · https://appgoblin.info/apps/6760195623
- Manifest: https://techcrunch.com/2024/10/17/can-ai-make-us-feel-less-alone-the-founder-of-manifest-thinks-so/ · https://speedrun.a16z.com/companies/manifest · https://peekly.app/apps/7c334b93-83bc-4b5a-9d8e-f95fb3fa1854
- Critique AI: https://apprank.io/critique-ai-habit-tracker-5634 · https://fluxbuilder.com/explore/critique-ai-habit-tracker/
- MyFutureSelf: https://www.starterstory.com/stories/myfutureself · https://linkedin.com/company/my-future-self · https://apppricer.com/app/6745573360
- mymind: https://vanschneider.com/blog/last-house-standing/ · https://mymind.com/pricing · https://getlatka.com/companies/mymind.com · https://www.producthunt.com/products/my-mind
- Launch playbook: https://www.betterlaunch.co/playbooks/episodes/blake-3apps · https://gtmsauce.com/benchmarks/creator-pay · https://chartjump.com/guides/how-to-market-an-app · https://www.forbes.com/sites/josipamajic/2024/10/07/hacking-the-app-store-gen-zs-15m-arr-bootstrapped-success-story/ · https://reelsfarm.com/blog/bepresent-tiktok-marketing-case-study · https://superwall.com/blog/copy-this-strategy-itll-blow-up-your-app

Goals and habits
- Finch: https://review-rounds.com/finch-business-model-bootstrapped-self-care-pet-app/ · https://www.systemaic.com/teardowns/finch-self-care · https://sensortower.com/blog/2025-q3-android-top-5-health%20and%20fitness-units-us-600af518241bc16eb8dce802 · https://blog.sparrowapps.io/p/finch-how-a-self-care-app-hit-30m-arr-without-vc-money
- Fabulous: https://pitchbook.com/profiles/company/98434-54 · https://provenstartups.com/projects/fabulous-guided-routine-app · https://appgazers.com/reports/apps/ios-1203637303
- Habitica: https://en.wikipedia.org/wiki/Habitica · https://appgazers.com/reports/apps/android-com.habitrpg.android.habitica
- Streaks: https://crunchybagel.com/apple-design-awards-2016/ · https://peekly.app/apps/058bf133-5478-4f4b-8f05-033ec52a7913
- Strides: https://www.stridesapp.com · https://play.google.com/store/apps/details?id=com.strides.android · https://appinsider.io/app/strides-habit-tracker-goals-672401817
- Productive / Bending Spoons: https://www.bloomberg.com/news/articles/2024-01-10/iac-divests-mosaic-apps-to-bending-spoons-in-deal-valued-at-100-million-plus · https://appgazers.com/reports/apps/ios-983826477
- Me+: https://sensortower.com/blog/2024-q2-ios-top-5-wellness%20apps-revenue-sk-63e274e1e1714cfff10eaa2f · https://sensortower.com/blog/2024-q1-unified-top-5-self-therapy%20and%20journaling-units-us-63dcdd28e1714cfff1e3bd68
- Lifetick: https://lifetick.com/pricing.html · Dreamfora: https://thevc.kr/dreamfora · https://www.reddit.com/r/ProductivityApps/comments/1najs02/what_happened_to_dreamfora/
- Goals: AI Coach: https://apppricer.com/app/1474850893 · Life Designer: https://apps.apple.com/us/app/id6757914192 · https://www.waterstones.com/product/life-designer-journal-oat/5060825621977
- GoalsOnTrack, Momentum, Sunsama: https://blog.goalsontrack.com/ · https://www.hellomomentum.app/pricing · https://www.sunsama.com/pricing

AI journaling and mindset
- Rosebud: https://techcrunch.com/2025/06/04/rosebud-lands-6m-to-scale-its-interactive-ai-journaling-app/ · https://help.rosebud.app/account/changes-to-the-free-plan · https://help.rosebud.app/tools-for-growth/voice-journaling · https://www.nytimes.com/wirecutter/reviews/best-journaling-apps/ · https://macaron.im/blog/rosebud-ai-journaling-app-review-2026
- Mindsera: https://ariregister.rik.ee/eng/company/17043441/Mindsera-O%C3%9C · https://mindsera.com/help/comparison/free-plan-vs-paid-plan · https://www.theguardian.com/technology/2026/apr/12/experiment-with-ai-journalling
- Reflectly / Kodeon: https://betakit.com/kodeon-acquires-mental-wellness-app-breethe-in-largest-acquisition-to-date/ · https://appgoblin.info/apps/1241229134
- stoic: https://www.ycombinator.com/companies/stoic · https://apprank.io/stoic-journal-mental-health-6037
- Day One: https://dayoneapp.com/press/ · https://dayoneapp.com/blog/introducing-daily-chat/ · https://dayoneapp.com/guides/premium-subscription/day-one-pricing-features-guide/
- Untold: https://www.untoldapp.com/ · https://usemurmr.com/blog/untold-journal-app-review/ · https://adverb.substack.com/p/adverb-turns-two
- Jour: https://techcrunch.com/2021/09/21/alan-acquires-jour-and-launches-mental-health-service-alan-mind/ · https://www.saashub.com/jour-status
- Monkey Taps: https://monkeytaps.app/ · https://app.sensortower.com/publisher/android/Monkey%2BTaps%2BLLC/ · https://sensortower.com/blog/2024-q2-unified-top-5-self-therapy%20and%20journaling-units-ro-63dcdd28e1714cfff1e3bd68 · https://www.socialgrowthengineers.com/ai-ugc-is-making-a-lock-screen-widget-go-viral · https://www.airbridge.io/en/app-revenue/motivation · https://appgoblin.info/apps/874656917
- ThinkUp: https://apps.apple.com/us/app/thinkup-daily-affirmations-app/id906660772 · https://peekly.app/apps/d57d7963-df24-426e-938a-66ecb0f9ad51
- Gratitude: https://www.gratefulness.me/ · https://google.play/business/case-studies/gratitude/
- Clarity: https://www.thinkwithclarity.com/ · Woebot / Youper: https://woebothealth.com/faq/ · https://www.ixcoach.com/learn/what-happened-to-youper
- Category: https://trends.vc/opportunities/ai-journaling-apps · https://techinch.com/blog/the-best-journaling-apps · https://www.technologyreview.com/2024/12/23/1107402/get-advice-from-your-future-self/

Meditation and market
- Headspace: https://www.businessofapps.com/data/headspace-statistics/ · https://www.bloomberg.com/news/articles/2026-09-16/headspace-meditation-app-being-acquired-by-ai-startup-sword-for-300-million · https://sword.com/newsroom/sword-acquires-headspace · https://www.headspace.com/ai-mental-health-companion · https://www.figma.com/blog/headspace-ebb-ai-companion/ · https://www.blog.udonis.co/statistics/headspace
- Calm: https://www.businessofapps.com/data/calm-statistics/ · https://sensortower.com/blog/2025-q4-unified-top-5-health-and-fitness-revenue-us-600af518241bc16eb8dce802 · https://appfigures.com/resources/insights/20240510?f=3 · https://www.fastcompany.com/91522961/why-calm-ceo-david-ko-is-stepping-down-after-scaling-the-meditation-app
- Balance: https://apprank.io/balance-meditation-sleep-6590 · https://techcrunch.com/2019/09/04/elevate-labs-launches-balance/
- Waking Up: https://www.wakingup.com/scholarship/all · https://apprank.io/waking-up-meditation-wisdom-6395 · https://www.builtbyfoundry.io/blog/sam-harris-waking-up-meditation-app-empire
- Insight Timer: https://louredmond.com/podcast-1/2025/03/11/insight-timer-ceo-christopher-plowman-on-teacher-earnings-how-the-platform-is-changing · https://help.insighttimer.com/support/solutions/articles/67000664579-How-much-does-Insight-Timer-cost-
- Dispenza: https://apps.apple.com/us/app/making-your-mind-matter/id1137496794 · https://play.google.com/store/apps/details?id=com.joe.dispenza · https://support.drjoedispenza.com/hc/en-us/articles/360020018457 · https://undark.org/2023/11/08/uncertain-meditation-science/
- Opal / BePresent: https://www.speedinvest.com/knowledge/scaling-smart-how-opal-built-a-10m-arr-business-in-just-2-years · https://www.revenuecat.com/blog/growth/kenneth-schlenker-sub-club-podcast-2026 · https://www.arr.club/bepresent
- Cal AI / Focus Friend: https://techcrunch.com/2026/03/02/myfitnesspal-has-acquired-cal-ai-the-viral-calorie-app-built-by-teens/ · https://appfigures.com/resources/insights/20250905
- Market and benchmarks: https://sensortower.com/blog/health-and-fitness-apps-ai · https://investgame.net/wp-content/uploads/2026/02/2026-02-26-sensor_tower__state_of_mobile_2026__en_wp.pdf · https://sensortower.com/blog/state-of-mobile-health-and-fitness-in-2025 · https://www.businessofapps.com/data/wellness-app-market/ · https://www.businessofapps.com/data/health-fitness-app-benchmarks/ · https://www.revenuecat.com/state-of-subscription-apps · https://www.revenuecat.com/blog/growth/hard-paywall-vs-freemium · https://spreadcast.app/resources/app-retention-benchmarks · https://www.jmir.org/2024/1/e56897 · https://mhealth.jmir.org/2022/1/e30583 · https://mhealth.jmir.org/2019/8/e12983 · https://www.businessinsider.com/gen-z-gospel-of-wealth-manifesting-tiktok-dating-2024-11

Paper and design tools
- https://paper.design/ · https://paper.design/pricing · https://paper.design/docs/mcp · https://paper.design/build-log · https://paper.design/roadmap · https://paper.design/blog/series-a · https://www.iconiq.com/growth/insights/partnering-with-paper-the-ai-native-design-canvas · https://mahdif.com/blog/paper-is-awesome-but-not-perfect/ · https://www.airframe.ai/product/paper-design/analysis · https://developers.figma.com/docs/figma-mcp-server/write-to-canvas/ · https://docs.pencil.dev/getting-started/ai-integration · https://appleinsider.com/articles/26/06/29/apple-design-award-winner-acquired-by-apple-for-new-swift-tools · https://github.com/garrytan/gstack/blob/main/docs/skills.md

Data gaps, stated plainly: no direct Sensor Tower, AppFigures, AppMagic or data.ai figures for any app (all login-gated); founder-reported revenue (Brainrot, Stella, Gleam) is unaudited and differs from tracker estimates by up to 40x; no app in the set publishes retention curves; Unrot's and Aya's operators are anonymous; Lifetick has no reviews; Dreamfora's and Jour's shutdown financials are undisclosed.
