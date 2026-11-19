# Research dossier: "Build an app that generates $10,000 per month"

Status: research v0.1, 19 Nov 2026. First dossier for the "agent for one goal" prototype. Companion to `concept-comparison.md` (goal-agent concept).

**Persona this is written for.** Solo founder, full-time job, no audience, no influencer network, few contacts for organic growth, can build with AI coding tools.

**What "$10k a month" means here.** Gross monthly recurring revenue (MRR) or close to it, from a product the founder built. Gross is before the store's 15–30% cut, taxes and costs. Where a source says "revenue per month" and not "MRR", it is flagged.

**Confidence tags** (per claim):
- **[H]** first-party dataset (RevenueCat, Adapty, Superwall) or a founder's own write-up with consistent corroboration.
- **[M]** one credible founder write-up or interview, self-reported, no independent verification; or a secondary source that cites a primary.
- **[L]** anonymous post, aggregator, vendor-authored content, single consultant's data, or my own inference.
- "Computed" means arithmetic I did from sourced inputs. "Inference" means judgment, not a sourced fact.

---

## 0. Executive summary

1. **The base rate is low and the distribution is steep.** About 4.6% of newly launched subscription apps reach $10k MRR within two years (RevenueCat, 115k apps) [H]. Adapty finds 8 in 10 new subscription apps never earn $10k in total in year one, and the top 10% of apps take 94.5% of revenue [H]. Verified-revenue data from TrustMRR shows 2.3% of listed startups above $10k/month (opt-in, biased toward winners) [M].
2. **Winners are not fast on average.** For apps that do reach it, median launch-to-$10k is 109 days (RevenueCat) [H], but that excludes the ~95% that don't. Documented solo founders with day jobs took 1–3 years (ProjectionLab ~2.5 years, ScreenshotOne 28 months, HabitKit ~2 years, Bannerbear ~2 years from quitting) [M-H].
3. **Without an audience, the documented routes are search- and marketplace-led**, not social: App Store search (ASO), Chrome / Google Workspace / Zapier-type marketplaces, and Google search content. Direct outreach is how many B2B founders past $10k got customer #1 to #10, not how they scaled [M].
4. **Price and niche matter more than features.** Founders who got there either charged $30–$300/month to businesses, or ran a subscription (not a one-time price) in a niche with search demand. $5–$9/month consumer subscriptions need ~1,000+ payers [computed].
5. **Almost every case had multiple failed attempts first** (Bannerbear: 7 launched, 0 revenue; HabitKit's founder: first app got a dozen downloads in 6 months; Vythm: 8 years; Arthur: 4 of 5 apps small or failed). Build for many cheap attempts, not one perfect one.
6. **Search results for this topic are polluted with synthetic "case studies".** See section 8; the agent must filter these.

---

## 1. Cases that reached roughly $10k/month

Fifteen cases, ordered by path. "Time to $10k" is measured from the date stated in the source; where the source doesn't say, it says so. Team size is the founder's own statement. Prices are as stated.

### Mobile and consumer subscription

**1. Frank AI Chat Assistant (iOS GPT wrapper), jbuilds** [M]
- Built: a fast iOS wrapper around a GPT-style assistant, side project.
- Users: App Store Optimization on a rolling monthly basis was "90% of my initial strategy." Product Hunt took 1–2 hours and "didn't do much." No marketing spend. One email to users in a year netted 29 subs. 100,000 users, organic.
- Time to $10k: not stated precisely. As of 5 Feb 2024 he reported "around $10k MRR MoM for the last 13 months," so roughly the first months after a Jan 2023 launch. That was the first wave of ChatGPT-wrapper demand, which will not repeat on the same terms [inference].
- Team: solo. Starting audience: none ("I didn't have any users back then"). Pricing: not stated.
- What nearly killed it: not stated. Product needed a major revamp (GPT-4 vision, web version) to keep going.
- Source: https://www.indiehackers.com/post/100-000-users-and-10k-mrr-mom-over-13-months-on-a-super-fast-ai-assistant-4aeaa0ac0e

**2. HabitKit (habit tracker), Sebastian Röhl** [M-H: three consistent sources]
- Built: minimalist habit tracker with a GitHub-style grid, Flutter, local-only data, no sign-up.
- Users: ASO is "completely" his revenue source ("my growth, my revenue is currently completely based on the ranking in the App Store and Google Play"). Puts HabitKit at the start of the app name. Native review prompt right after the first habit is checked off. About $100/month of Apple Search Ads as a ranking-boost bet. Built in public on X, Bluesky, Threads, which brought podcasts and connections; a 30-second segment in a video with 1M+ views lifted rankings; MKBHD feature Dec 2024.
- Time to $10k: launched 27 Nov 2022; $10k MRR in Nov 2024 per Systemaic's teardown, while Röhl's own Indie Hackers post says $15k monthly revenue in Nov 2024. Sources differ by definition (MRR vs revenue). About 2 years.
- Team: solo. Starting audience: small (a June 2021 prototype post on r/androiddev got 166 upvotes). Pricing: $2/month on iOS ($1 on Android; Android price test failed), $32 lifetime. Revenue is therefore not pure MRR [inference].
- Seasonality: $15k/month in summer, up to $30k in Dec–Jan (resolution season).
- What nearly killed it: he quit his job in 2022 with a 12-month runway; six months in the first app had under a dozen downloads. He went back to his old job in 2023 and left again in Feb 2024.
- Sources: https://www.starterstory.com/stories/how-i-built-it-15k-month-mobile-app , https://happybootstrapping.com/p/30000-per-month-sebastian-ruhls-journey , https://www.indiehackers.com/post/tech/building-a-mobile-app-portfolio-to-15k-mo-5jpsSF0k2OZKIntPYgTT , https://www.systemaic.com/teardowns/habitkit

**3. Cardstock (baseball-card scanner) then Scanémon, Kyle Fowler** [M, with a timeline inconsistency]
- Built: one-job scanner app for a collector niche; AI tools used to clone it for Pokémon cards (Scanémon).
- Users: validated on r/baseballcards (12–15 people interested), launched there (12 paid downloads at $4.99 = $60). Then two weeks of keyword research with Sensor Tower's free trial; "baseball card scanner" in title and subtitle gave #1 for that term for two to three years. When rankings collapsed (May 2024), he moved to a scripted TikTok slideshow format, 150+ paid creators (~$1 CPM, 27M views for $2,600).
- Time to $10k: not stated. ASO alone gave "$10K/month" for roughly two years; the write-up also says he shelved the idea in 2019 and finished six years later, which doesn't line up with a May 2024 ranking loss. Use the mechanism, not the dates.
- Team: solo plus a friend and contract creators. Starting audience: none. Pricing: $4.99 one-time first; after switching to subscriptions ($5/month, $50/year, $99 lifetime) he says revenue went from steady $10k months to $30k+. About $42k/month across two apps.
- What nearly killed it: ASO ranking loss; also nearly abandoned the project for years.
- Source: https://superwall.com/blog/how-i-make-usd42k-mo-passively-with-simple-no-code-apps-copy-me (Superwall is a paywall vendor; promotional context).

**4. Versy and a 5-app portfolio, Arthur Spalanzani (22, student)** [L-M: self-reported, author sells an ASO tool]
- Built: five apps (bible, affirmations, pregnancy tracker, salary calculator, bill splitter). "$10K MRR at peak" is for the portfolio, Versy being the best.
- Users: ASO (localized, reviews prompted in onboarding, 400+ ratings at 4.7), Apple Search Ads in Brazil/LATAM with local pricing, TikTok Ads for Glow. Hit the Apple Ads volume wall: profitable on exact-match keywords but not enough searches.
- Time to $10k: not stated. Team: solo. Starting audience: none (Glow was "built in public on YouTube", small).
- Numbers he gives: onboarding conversion ~25%; store listing converting 80% impression-to-tap in Apple Ads.
- What nearly killed it / failed: Lua (pregnancy tracker): 20 trials, zero conversions; he is not the target user. Instagram reel with 1.4M views produced almost no downloads (app name not first search result; 30% of viewers in India). Divvy: ~100 downloads/month. Glow: ad fatigue, saturated niche.
- His lesson, directly relevant to this project: "I'd also validate the ad channel before building the app. If I can't figure out how I'll get traffic, I shouldn't build it."
- Source: https://tap-and-swipe.com/case-studies/arthur-spalanzani-app-portfolio

**5. Vythm (music visualizer), anonymous r/AppBusiness poster** [L-M]
- Built: after games that "totally flopped," a fluid-simulation app (sold for $44k), then music visualizers; "my most successful app yet." 8 years total, ~4 years iterating on user feedback on Vythm.
- Users: Apple Search Ads at ~$800/month since early 2025: "I roughly break even within 3 months but in the long run the ASA campaigns are going to be profitable due to recurring revenue."
- Time to $10k: roughly 4 years on this app. Team: solo. Starting audience: not stated.
- Source (search snippet only; the page returned an error when fetched): https://www.reddit.com/r/AppBusiness/comments/1r4j9bp/after_8_years_i_finally_hit_10k_mrr_what_a_ride/

### Utility and micro-SaaS (B2B and prosumer)

**6. ProjectionLab (financial planning), Kyle Nolan** [H: founder's own milestone posts]
- Built: personal finance simulator that he wanted for himself. Solo, nights and weekends on top of a full-time software job, "80+ hr weeks for the better part of two years."
- Users: Hacker News post (front page; "more than a dozen people immediately signed up for Premium" with 0 paid users before), Reddit, word of mouth, shoutouts from personal finance bloggers. "I didn't even have an email list you could sign up for until like version 2 or 3." Said he should have built a community earlier.
- Time to $10k: 9 months to $1k, then 4 to $2k, 7 to $5k, 2 to $6k, 2 to $8.5k, 2 to $10k: 2+ years (post dated 16 Jun 2023).
- Pricing: ~$9 and $45 plans, raised several times with existing users grandfathered.
- What nearly killed it: a flat $1k–$3k stretch while rebuilding from MVP, and burnout (sleep, family, gym).
- Sources: https://www.indiehackers.com/post/my-side-project-hit-10k-mrr-1152736a51 , https://www.indiehackers.com/post/building-marketing-kyle-nolan-of-projectionlab-5k-mo-on-focusing-on-product-over-marketing-3b38edfe22

**7. Bannerbear (image-generation API), Jon Yongfook** [H: his own "journey to $10K" page and podcast]
- Built: left a corporate job Jan 2019; 12-startups-in-12-months attempt, 7 launched with no revenue model; Previewmojo (OG images) $400 MRR; relaunched as an API in March 2020 ($488 MRR); $6,109 by Oct 2020; $10,455 Jan 2021.
- Users: Zapier integration and the no-code community (tutorials, word of mouth), Twitter, blog, newsletter (1,500 subs), Product Hunt launches, "50% coding, 50% marketing" for seven months straight ("one week of code, then one week tweeting and posting").
- Time to $10k: ~10 months from the API relaunch, about 2 years from quitting. Team: solo. Starting audience: small, built while building 8 other products. Price: lowest tier $49; he deliberately raised from $9.
- What nearly killed it: burning savings on products with no revenue; a Shopify app that failed; marketing to two opposite users (low-volume Zapier users and high-volume API agencies).
- Sources: https://www.bannerbear.com/journey-to-10k-mrr/ , https://www.indiehackers.com/podcast/208-jon-yongfook

**8. ScreenshotOne (screenshot API), Dmytro Krasun** [H: own LinkedIn post and blog; M for detail]
- Built: screenshot API, quit his engineer job; bought the domain 5 Jan 2022, wrote SEO content before launch (long Puppeteer how-to posts), launched end of May 2022. Zero sales in the first month; first customer 4 Jul 2022 (a friend on Twitter).
- Users: SEO (content first, then rewrite from Google Search Console queries), Google Ads for validation, Twitter (~10k followers by the time of his $2.5k MRR Starter Story interview), Product Hunt (backlink), Zapier/Make listings, YouTube tutorials made by users.
- Time to $10k: 28 months after launch, with 263 customers (Sept 2024); about $38 per customer per month [computed]. Later 280 customers at ~$12k.
- Team: solo. Starting audience: none at start. What nearly killed it: month of "barely slept" marketing with no sales; he was close to giving up.
- His validation rule: "once you have at least 10 paying customers from outside network... that's for me like an ultimate validation."
- Sources: https://www.linkedin.com/posts/dmytrokrasun_it-took-me-28-months-after-the-launch-of-activity-7242058347309371392-PE95 , https://www.starterstory.com/stories/screenshotone , https://www.starterstory.com/stories/how-i-built-it-12k-month-micro-saas , https://dmytrokrasun.com/posts/my-simple-seo-strategy/

**9. Bank Statement Converter, Angus Cheng** [M-H: interview with numbers from his own blog]
- Built: PDF bank statement to Excel converter, live within a week of the idea; quit his job end of 2020.
- Users: Google Search Ads first ($858 spend for $248 revenue; later ~$1,000/month spend for ~$200 back; stopped after ~6 months), cold email to accounting firms for 3 months ("2 or 3 sales", ROI "$0.05 for every $1," and he got banned from Google Workspace for volume), then blog posts (one hit Hacker News front page, brought backlinks and Google rank). Content became the engine.
- Time to $10k: about 2 years; $11,000 MRR at interview. Now one day a week; costs about $1,000/month. Pricing: $30–$100/month plans (moved from page credits to a $20 quarterly subscription early, then raised prices).
- Team: solo after his business partner dropped out ("a bit too boring"). Starting audience: none.
- Source: https://www.indiehustle.co/p/a-simple-website-making-11000-mrr

**10. Merch Wizard / KDP Wizard (Chrome extensions for Amazon sellers), Rick Blyth** [M]
- Built: niche extensions for Amazon Merch and KDP sellers, as a side hustle while employed. Started with free tools and a $12.99 one-off extension that earned over $3,000 in a weekend build.
- Users: pre-launch email list from free tools, niche Facebook communities, SEO, word of mouth; "multi-five-figure" organic launch of the second extension.
- Time to $10k: Starter Story lists a June 2018 start; an aggregator puts $10k MRR about a year after first customer [L]. Sold for a reported $500k+ via Empire Flippers [L, aggregator].
- Team: solo. Starting audience: small, in the niche. Source: https://www.starterstory.com/stories/micro-saas-founder-rick-blyth , https://startupfounderstories.com/stories/rick-blyth-merch-wizard-6-figure-exit

**11. Scene2Sheets (Notion to Google Sheets add-on), Leandro Zubrezki** [M] — near miss at $9k
- Built: Google Workspace Marketplace add-on in two weeks, no AI. After 8 years of freelancing he quit during COVID.
- Users: the marketplace listing itself, then Reddit (F5Bot keyword alerts, genuine replies), blog posts for SEO. Product Hunt and a Hacker News front page gave traffic and backlinks but "not paying customers."
- Numbers: $9k/month, 450+ paying customers, 70k users, ~5k visitors/month, ~$120k lifetime revenue over four years, with most of it in the last one to two years. About 90% margin.
- Pricing: removing the free plan moved revenue from about $5k to $8k in two months.
- Team: solo. Starting audience: none. Time to $10k: not reached; ~4 years to $9k.
- Source: https://www.starterstory.com/stories/how-i-built-it-9k-month-micro-saas

**12. Scrape Creators (social scraping API), Adrian Horning** [M-L: secondary write-up]
- Built: launched June 2024; passed $10k MRR within 12 months; credit-based usage pricing.
- Users: personalized X (Twitter) DMs and Google (some programmatic SEO pages, blog). He already had a personal brand in the scraping community, so this is not a no-audience case.
- Time to $10k: ~12 months. Team: solo. Prior side projects "didn't stick."
- Source: https://www.wearefounders.uk/from-side-projects-to-10k-mrr-how-adrian-horning-built-scrape-creators/

**13. ZenMaid (software for maid services), Amar Ghose** [M] — outbound example, not a $10k-timeline case
- Built: scheduling software for cleaning companies, from his own experience running a maid service.
- Users: cold emails and calls to cleaning companies found on Yelp; ~20 pre-commitments, only two converted at first; hundreds of calls to reach the first 100 customers. Domain knowledge made calls credible. Pricing from $49/month with a 14-day trial.
- Time to $10k: not stated (company now reported at ~$200k/month, started 2013, two founders). Included for the outbound mechanism and the value of insider knowledge.
- Source: https://www.starterstory.com/zenmaid-breakdown

**14. Atlysio (Chrome extension for customer-comment research), Daniel** [L-M: founder-reported video, no dashboard]
- Built: a Reddit-comment scraper for himself at the end of 2024; 3,000 weekly active users appeared with no plan; added Stripe, $2.99/month plus a $19.99 lifetime deal (19 buyers); later 30+ sources after a LinkedIn user asked for YouTube and Amazon.
- Users: Chrome Web Store discovery, SEO, word of mouth, user-made YouTube workflow videos, affiliates. About 500 paying customers, "crossed $10K MRR" (video captured Oct 2026).
- Time to $10k: roughly 1–2 years. Team: solo. Starting audience: none stated.
- Source: https://provenstartups.com/projects/atlysio-customer-voice-research

**15. Vibe-coded SEO content generator, anonymous, r/vibecoding** [L]
- Built with Claude Code by a non-developer; ran free for ~3 months (about $2k of API cost) to get 3,000 free users, then converted with "founders" pricing at a "quite low" rate. Nearly $10k/month. 300+ hours in 3 months.
- Users: YouTube Shorts ("best X for Y"), Reddit threads in the niche, X posts, tutorials and videos; slimmed the product to a 3-step flow (discover, write, publish).
- Time to $10k: ~3 months, but the author notes the poster was already running a marketer-led community and says he "didn't pay for ads." Treat as an upper bound on speed, unverified. Source: https://www.reddit.com/r/vibecoding/comments/1rzdf03/i_vibe_coded_to_almost_10k_a_month_mrr_heres/

### Additional cases (shorter; not counted in the 15)

- **supastarter** (SaaS boilerplate, Jonathan Wilke): $1k in 3 months after Aug 2021; $10k/month three years in, "a few hours a week," day job plus small agency. Channels not described in the source. [M] https://www.indiehackers.com/post/tech/growing-a-side-hustle-into-a-10-000-month-saas-boilerplate-business-67jkonWWKtbWFhtPQJDC
- **Leave Me Alone** (email unsubscribe, two founders): $500/month to $10k/month in 3 years after switching from selling unsubscribes to subscriptions plus a $7 week pass. [M] https://leavemealone.com/blog/from-indie-side-project-to-profitable-business/
- **HelpKit** (Notion help centers, Dominik Sobe): $10k/month, 400+ customers; early customers from cold email, DMs, build in public, Product Hunt. Time not stated. [M] https://www.nichepursuits.com/dominik-sobe-helpkit/
- **Shopify app, Aditya Malani:** reported $12k/month in 12 months by offering a free app, talking to merchants, then ASO inside the Shopify store. [L-M, podcast summary] https://share.snipd.com/episode/767132f3-4cbd-4aab-af61-de2863acb6d2
- **Origami** (AI sales research): reported $10k MRR in 30 days via ~77 cold emails a day and ~100 LinkedIn DMs; but a two-founder team that ran an agency for 12 months first and sells outreach tooling. Not representative of the persona. [L] https://origami.chat/blog/origami-cold-email-0-to-10k-mrr-playbook
- **Payout** ($80k MRR in 4 months with Claude Code; iOS developer) [L, single secondary]; **Vugola** ($11.2k MRR, 400 users, X-led, built with Lovable/Claude/Codex) [L, a repost snippet only].

### Anti-cases (what failure looks like in the same channels)

- **Askie** (voice-first AI chat for kids; engineer with a full-time job): ~$5.9k MRR, 564 subscribers, ~90% of growth from ASO, ~5% from Apple Search Ads at $30–40/day; Meta ads at $150 then ~$1,000/day produced "1–2 purchases a day" (his words: ~0.02 ROAS). [M] https://www.reddit.com/r/AppBusiness/comments/1uepqwe/3_months_later_my_kids_ai_app_went_from_33k_to/
- **ezInvoices** (Shopify app, full-time job): 587 merchants, $735.66 revenue in 12 months. [H, own post] https://ezapps.io/blogs/my-shopify-app-after-one-year
- **Sober Tracker and other health apps (Ivan):** ~$3k in a rolling 28 days after moving from $5 lifetime to weekly/monthly/yearly subscriptions ($0.99 / $2.99 / $14.99), ASO-led. [M] https://www.mrrstory.com/stories/from-10day-to-3kmo-his-simple-subscription-switch
- **Dimmly / Trovelo:** $700 MRR across two iOS apps after a year, on $6.99 one-time upgrades. [M] https://www.reddit.com/r/SideProject/comments/1slnens/solo_dev_at_700_mrr_across_2_ios_apps_how_do_you/

### What the cases have in common (my tally from the 15; [L] because it counts self-reports)

| Feature | Count (of 15) |
|---|---|
| Solo or near-solo | 13 (ZenMaid had two founders; Cardstock a friend plus contractors) |
| Clearly no audience at the start | 10 (the other 5 had a small niche following: HabitKit, Bannerbear, Merch Wizard, Scrape Creators, the vibe-coded SEO tool) |
| One-job product | 15 |
| Prior failed or flat products before this one | at least 7 (Bannerbear, HabitKit, Versy, Vythm, Merch Wizard, Scene2Sheets, Scrape Creators) |
| Main scalable channel is a search system (App Store, Google, store or marketplace listing, paid search) | about 10 |
| Main channel is social or creator-led | 2 (Cardstock after ASO failed; the vibe-coded SEO tool) |
| Needed 2 or more years to reach or approach $10k | 7 |

---

## 2. Common paths, ranked by fit for "no audience" (plus day job, AI build skills)

Ranking is my judgment from the cases and datasets above [L]. Each path's numbers are tagged.

### Path A. ASO-led niche subscription app (iOS first)
- **Evidence:** Frank, HabitKit, Cardstock, Versy, Askie (near miss). ASO was named as the main channel by 5 of the 15 founders.
- **Realistic timeline:** RevenueCat says median 109 days to $10k *for apps that make it* [H]; the documented indie journeys took 1–4 years. Plan for 6–18 months to learn whether it works. RevenueCat commentary: even strong categories take 100+ days to confirm a top performer [H].
- **Numbers to expect:** median download-to-paid at day 35 is 2.0% (top decile >9.1%); hard paywalls convert 10.7% vs freemium 2.1% with near-identical one-year retention [H]. 55% of 3-day trial cancellations happen on day 0 [H]. Trials of 17–32 days convert 42.5% vs ~25% for under 4 days [H]. Year-1 retention medians: yearly 20–40%, monthly 6–14%, weekly 1–2% [H]. Median refund rate roughly 3–5% by category [H].
- **Revenue per install is the real unit economic:** median revenue per install at day 60 is $0.34; hard-paywall apps $3.09; low-priced freemium $0.11 [H].
- **Cash needed:** low, in the hundreds of dollars (Apple developer fee, keyword tool trial, RevenueCat or Superwall at small volume) [inference]. Paid-ads budget optional.
- **Failure modes:** ranking collapse (Cardstock May 2024); 15,000 new subscription apps launch per month vs ~2,000 in Jan 2022 [H]; apps launched in 2025+ generate 3% of subscription revenue while pre-2020 apps generate 69% [H]; AI apps earn 41% more per payer but churn 30% faster [H]; seasonality (HabitKit 2x swings); apps not updated in 3+ months are far less likely to hit $10k [M, Victoire's estimate]; single-language apps hit $10k at 4.0% vs 14.3% for 5–9 languages [M].
- **Suits:** someone who can iterate weekly on onboarding, paywall and metadata; comfortable with a low-touch consumer product; no sales appetite. Works best in niches where people already search by a specific noun ("baseball card scanner", "habit tracker").

### Path B. Marketplace and plugin ecosystems (Chrome Web Store, Google Workspace Marketplace, Zapier/Make/Notion, Shopify, Slack)
- **Evidence:** Merch Wizard, Scene2Sheets, Atlysio, ScreenshotOne and Bannerbear (Zapier/Make); anti-case ezInvoices. Rob Walling's stair-step advice names plugins and app stores as a first step: one-time sale, one channel [M].
- **Timeline:** Scene2Sheets took ~4 years to $9k; Merch Wizard ~1–1.5 years; Atlysio ~1–2 years. Shopify's typical documented arc is 3–6 months under $500 MRR, then $1–3k in year one [L, AdsX].
- **Numbers:** $10–$50/month pricing means 200–1,000 customers. Scene2Sheets: ~450 paying out of 70k users. Shopify: top 1% of 22,546 apps take an estimated 72% of revenue; only ~36% appear to earn anything; half have zero reviews [M, RevenueHunt estimates]. A 2021 Shopify analysis estimated ~11% of developers at $10k–$50k/month [L, dated].
- **Cash:** near zero (Shopify has a one-off $19 fee, takes 0% on the first $1M lifetime [M]).
- **Failure modes:** reviews and keywords decide visibility; platform rule changes; commoditization; free users who never pay (Scene2Sheets removed its free plan and revenue rose).
- **Suits:** founders who can spot "gap in someone else's product" (Notion has no export; Merch sellers lack batch edit) and who can build a narrow integration in 2 weeks with AI tools.

### Path C. SEO-led single-purpose tools (web)
- **Evidence:** ScreenshotOne (28 months), Bank Statement Converter (~2 years), the vibe-coded SEO generator (3 months, anecdotal). Programmatic SEO examples found are small (PageFactory $1k MRR in 4 months; SEOmatic $2k) [M]; no verified solo pSEO case at $10k turned up in this research.
- **Timeline:** 12–28 months to $10k in the documented cases. Content published before launch accelerated ScreenshotOne.
- **Numbers:** B2B tool pricing $30–$100/month means ~100–330 customers [computed].
- **Cash:** hosting and tools; ScreenshotOne $600–800/month servers at $2.5k MRR; Bank Statement Converter ~$1,000/month at $11k.
- **Failure modes:** AI Overviews. Ahrefs (Dec 2025): where an AI Overview appears, position-1 click-through is down about 58% versus a forecast [H-M]; Seer Interactive: organic CTR on AI Overview queries fell 61% [M]. A consultant's nine-client study saw top-of-funnel traffic −34% while bottom-of-funnel (pricing, comparison, branded) fell ~6% [L]. Implication: target "I need this tool now" queries, not definitions or how-tos. Also: paid ads lost money for Bank Statement Converter.
- **Suits:** founders who can write, accept 12+ months, and want a product that works asynchronously around a job.

### Path D. B2B niche tool sold through direct outreach
- **Evidence:** an Indie Hackers analysis of 290 founder posts (Reddit-sourced, model-coded) found that founders past $10k/month started with cold email or LinkedIn DMs about a third of the time vs ~1 in 10 below $10k, and only 8% started in communities (vs about a third below $10k). Among solo founders selling to businesses, 4 of 9 past $10k began with outreach vs 7 of 68 under $10k [L-M; author flags selection bias and that it cannot separate outreach as learning from outreach as scale]. Outreach founders charged ~$90/month at the median vs ~$20 for community founders.
- **Cases:** ZenMaid (calls to Yelp-listed cleaners), Bannerbear's early users, HelpKit. Counter-case: Bank Statement Converter's cold email to accountants yielded 2–3 sales in 3 months.
- **Timeline:** the same analysis puts the median for $10k+ founders at ~10 months vs 4 for under-$1k founders; 22% of $10k+ founders were solo vs 82% for under-$1k [L-M].
- **Numbers:** $90/month means ~111 customers for $10k [computed]. Reply rates from vendors: 4.7–5.3% for tightly targeted cold email [L]. A founder reported ~100 LinkedIn DMs, ~25 calls, 4–5 paying customers at $20/month [L, vendor-affiliated].
- **Cash:** low ($20–$100/month for email and list tools), but significant time (10+ hours/week early on) [inference].
- **Failure modes:** deliverability (account bans), wrong niche, low-urgency problem ("an optimization play, not hair-on-fire" in one failed founder's post-mortem [M]), founders unable to do calls during work hours.
- **Suits:** people with domain access or credibility in an industry (ZenMaid), comfortable asking for money, fewer than ~300 total customers needed.

### Path E. Paid acquisition with LTV math
- **Evidence:** mixed to negative at small scale. Vythm: Apple Search Ads at ~$800/month, break-even ~3 months after spend [M]. Arthur: ASA profitable but capped by search volume; TikTok ads for Glow fatigued. Askie: Meta ads $150/day then $1,000/day, 1–2 purchases a day. Bank Statement Converter: Google Ads $858 for $248, then $1,000/month for ~$200. Adapty advises $20–30/day for creative testing, $150–200/day for conversion validation, and warns CPI on purchase optimization can be 5–10x install CPI with 60–90-day payback requiring runway [M].
- **Unit-economics rule (computed from RevenueCat):** at a median day-60 revenue per install of $0.34, any install cost near $1–$2 loses money; only hard-paywall or high-priced apps ($3.09 median RPI) can afford typical CPIs. Check cost per *paying user* against monthly revenue per payer after the store's cut and expected lifetime.
- **Timeline:** months of testing; profitable only after organic conversion is proven.
- **Cash needed:** realistically $3k–$20k including a 60–90-day float [inference].
- **Failure modes:** attribution gaps on iOS (up to 50% daily gaps), creative fatigue, refunds up to 14% of revenue for some apps (Adapty note) [M].
- **Suits:** founders with savings who have already proven trial-to-paid and day-35 retention organically. Poor fit as a first move for someone with no audience and limited cash.

### Path F. Programmatic SEO at scale
- **Evidence:** none verified at $10k for solo founders in this research; PageFactory and SEOmatic stalled at $1–2k in the sources found. Ian Nuttall (pSEO specialist, large X audience) reached ~$8k MRR with URL Monitor from X-sourced customers, not pSEO pages.
- **Failure modes:** same AI Overview headwinds as Path C, plus content-quality risk.
- **Verdict:** use pSEO as a layer on a product that already converts (Scrape Creators did), not as the first bet.

### Audience-for-hire (creator and UGC programs)
- Cardstock paid ~$1 CPM to 150+ TikTok creators (27M views, $2,600). Arthur's organic Instagram attempt shows views without a searchable name or the right geography convert poorly [M]. Treat this as a second-stage tactic after a store listing and onboarding already convert.

### Ranking for this persona [inference]

| Rank | Path | Why for this persona |
|---|---|---|
| 1 | A. ASO niche subscription app | No audience needed; async; tools help with metadata and localization; cheap to try many niches; but 4.6% base rate and subscription math is tough at $5–$10/month |
| 2 | B. Marketplace/plugin | Built-in demand, search inside the store; 2-week MVPs with AI tools; B2B-ish pricing possible |
| 3 | C. SEO-led single-purpose tool | Slow but compounding and async; B2B pricing; AI Overview risk means pick transactional queries |
| 4 | D. B2B niche tool via outreach | Highest price and fewest customers needed, strongest for first 10 customers; needs domain access and hours |
| 5 | E. Paid UA | Only after organic conversion proven and cash exists |
| 6 | F. pSEO | No verified solo case |

Paths combine. Documented winners layered two or three of A–D (ScreenshotOne: SEO + Twitter + marketplaces + PH; Bannerbear: Zapier + content + early outreach; Scene2Sheets: marketplace + SEO + Reddit).

---

## 3. Base rates

| Metric | Figure | Source | Conf. |
|---|---|---|---|
| New subscription apps reaching $1k MRR in 2 years | 17.3% | RevenueCat State of Subscription Apps 2026 (115k apps, $16B) | H |
| New subscription apps reaching $10k MRR in 2 years | 4.6% (about 1 in 20) | same | H |
| By category, $10k rate | Gaming 8.9%, Photo & Video 7.3%, Business 1.6% | same | H |
| Median days to $1k / $10k (apps that reach it) | 58 / 109 | same | H |
| Top 25% of apps reach $10k in | ~29 days (RevenueCat talk; median 104 days in the same talk) | https://www.youtube.com/watch?v=PFVjiNLmrdY | M |
| Median monthly revenue at one year | ~$72; top quartile >$429; top decile >$2,574 | RevenueCat as quoted by Grumpi | M |
| Median year-over-year MRR growth | 5.3%; top decile >306% | RevenueCat | H |
| Median download-to-paid, day 35 | 2.0% (top decile >9.1%); North America 2.6% | RevenueCat | H |
| New apps' first-year revenue (total) | 57.7% under $1k; 22.4% $1k–$10k; 12% $10k–$100k; 7.9% $100k+ | Adapty State of In-App Subscriptions 2026 (16k apps, $3B) | H |
| Revenue concentration | top 10% of apps take 94.5% (up from 92.7% in 2023) | Adapty | H |
| Median monthly revenue per new app | $492, down 22% year over year while launches rose 31% | Adapty | H |
| Apps earning under $500/month | 66% of revenue-earning apps | Superwall (9,770 apps) | H |
| Apps climbing one revenue tier within a year | ~1 in 4; median 3 months from $500 to $10k for those that climb | Superwall | H |
| Paywall A/B tests that win | 40% at every size; apps past $500k/month run 30–50x more tests | Superwall | H |
| Tests per app per year at $10k vs below | 4.9 vs 1.4 | Superwall | H |
| Apps launched Oct 2025 to Mar 2026 (≥20 US ratings) reaching $10k in Sept 2026 | 6.7% (452 of 6,786); 91% under $5k; top 1% take 63% of the cohort's revenue | Victoire's own estimates of gross revenue; survivor-filtered | M |
| Half of the winners | single-app publishers (228 of 452) | Victoire | M |
| Localization | 14.3% of apps in 5–9 languages hit $10k vs 4.0% single-language | Victoire | M |
| Maintenance | 9.2% of apps updated in last 30 days hit $10k vs 3.6% untouched 3+ months | Victoire | M |
| TrustMRR startups with verified 30-day revenue >$10k | 241 of 10,646 (2.3%); 54.9% are $0 | Marc Lou's post of TrustMRR data, 15 Nov 2026; opt-in dataset | M |
| "Serious indie hackers" at $10k+/month | ~3% (defensible range 2–5%) | Steal What Works, synthesized estimate | L |
| Shopify apps | top 1% of 22,546 take ~72% of est. revenue; ~36% appear to earn anything | RevenueHunt June 2026, estimates | M |
| Days for H&F and Utilities to confirm a top performer | over 100 | RevenueCat commentary | H |

**What distinguishes those who do, per the reports and cases:**
- They iterate on monetization and onboarding, not only features: Adapty says apps running 50+ experiments earn 18.7x more than those running one [H]; Superwall says only 40% of tests win and winners just run more [H]; RevenueCat says day 0 is the best shot at a subscriber and 55% of 3-day trial cancels happen then [H].
- They price like businesses: annual and monthly plans, trials of 7+ days at $10k+, median US annual price rising from $34.99 to $59.99 as apps climb [H].
- They localize and keep updating (Victoire) [M].
- Winners are disproportionately one-app or few-app publishers (77% have three apps or fewer) [M]: focus beats portfolio spreading, even though portfolios of cheap tests are how several founders found the winner.
- Outliers in time: a self-reported cohort found $10k+ founders took a median ~10 months to the milestone vs 4 months for under $1k founders, were mostly B2B, and charged more [L-M].
- Documented TrustMRR "growing $10k+" startups include both audience-led and zero-audience founders [L: one analysis, n=20].

---

## 4. What experts repeatedly say

Paraphrased unless quoted; each linked to the source I actually read.

**Niche selection**
- **Rob Walling (Software by Rob, Startups for the Rest of Us):** start with simple one-time-sale products on a single sales channel (plugin repository, SEO, app store), repeat until you own your time, then move to SaaS because SaaS is complex and competitive. https://www.startupsfortherestofus.com/episodes/episode-283-stair-stepping-into-a-different-audience [M]
- **Ruben Gamez (Bidsketch, SignWell):** has built two businesses without an audience; start with research, talk to potential customers about the problem (not the solution), talk to founders who sold into the space, and treat "no interest in a community" as a negative signal. https://www.startupsfortherestofus.com/episodes/episode-711-finding-early-customers-horizontal-vs-vertical-prosumer-saas-and-more-listener-questions-with-ruben-gamez [M]
- **Dmytro Krasun:** picked API products because it was his skill, and treated existing paid competitors as a good sign; check there are enough customers for your $10k goal; first ten paying strangers are the real validation. https://www.starterstory.com/stories/how-i-built-it-12k-month-micro-saas [M]
- **Kyle Fowler (as written up by Superwall):** validate on a subreddit (10–15 interested people was enough); do one to two weeks of ASO keyword research and put the terms in title and subtitle; in underserved niches that alone can reach $10k/month. https://superwall.com/blog/how-i-make-usd42k-mo-passively-with-simple-no-code-apps-copy-me [M]
- **Arthur Spalanzani:** pick categories with a lot of money where revenue is spread across multiple apps; avoid ones where one app has 80%; skip niches where you can't understand the customer. https://tap-and-swipe.com/case-studies/arthur-spalanzani-app-portfolio [L-M]
- **Kyle Nolan:** build something you will use yourself; it sustained motivation. https://www.indiehackers.com/post/building-marketing-kyle-nolan-of-projectionlab-5k-mo-on-focusing-on-product-over-marketing-3b38edfe22 [M]

**Pricing**
- **Patrick McKenzie (patio11):** "charge more"; $9 or $19 a month cannot support a meaningful business without massive distribution; anchor price to the value (a month's service for the cost of one missed appointment); lowest tier generated about 7x the support load per account of the top tier; delay free tiers. https://training.kalzumeus.com/newsletters/archive/saas_pricing [H]
- **Jon Yongfook:** raised his lowest plan from $9 to $49 before he had traction because the first $9 customer churned in days and cheap pricing attracts hobbyists; "Never half-ass two things. Whole-ass one thing." https://www.bannerbear.com/blog/don-t-charge-a-month-for-your-product/ [H]
- **Leandro Zubrezki:** removing the free plan lifted revenue about 60% in two months. https://www.starterstory.com/stories/how-i-built-it-9k-month-micro-saas [M]
- **Kyle Fowler:** moving from $4.99 once to $5/month recurring turned $10k months into $30k+. [M]
- **Ivan (Sober Tracker):** selling $5 lifetime "diluted my revenue potential." [M]

**Retention**
- **RevenueCat's report commentary (Alice Muir Kocourková):** the first renewal is the true inflection; accelerate time-to-value before renewal. Yearly plans retain 3–10x better than weekly by year one. https://www.revenuecat.com/state-of-subscription-apps [H]
- **Sebastian Röhl:** prompt for the rating at the user's first success. [M]
- **Superwall (Nick Godwin):** trial reminder lifts trial starts 4% with no effect on trial-to-paid; run more tests. https://superwall.com/blog/state-of-app-monetization-2026 [H]
- **Adapty:** apps experiment 40x more at the top; Sylvain Gauchet (Reading.com / Growth Gems) stresses onboarding and messaging. [M]

**Distribution before product**
- **Arthur Spalanzani:** "validate the ad channel before building the app." [L-M]
- **Rob Fitzpatrick (The Mom Test):** ask about the past, not hypotheticals; a good meeting ends with a commitment (money, time, or an introduction); compliments are worth nothing. https://theinnovationshow.io/episode/ep-231-the-mom-test-with-rob-fitzpatrick/ [M]
- **Pieter Levels (@levelsio):** cap prototypes at about a month and validate by launching; a Stripe pre-order link beats opinions. https://levels.io/startups [M]
- **Jon Yongfook:** 50% coding, 50% marketing, alternated weekly, was the single most important thing from $1k to $10k. https://www.indiehackers.com/podcast/208-jon-yongfook [H]
- **Dmytro Krasun:** start SEO content before launch. [M]
- **Kyle Nolan:** in hindsight, build a community earlier. [M]

**Where experts disagree:** audience-first (build an audience, then product) is popular on X; Walling, Gamez and half the cases here say you don't need one but you do need a specific reachable buyer. Kyle Nolan grew with almost no marketing but at 80-hour weeks and two years; Jon Yongfook says 50% marketing is the lever. Treat these as different time-versus-effort trades.

---

## 5. Decision tree

Inputs are the eight answers from section 6. Output is one primary path, one backup, and a reason. All rules are my inference [L], grounded in the evidence in sections 1–4.

```
START
│
├─ Q1 hours/week available
│   ├─ < 5 h/week ─────────────► Path C (SEO tool) or B (marketplace), narrow scope;
│   │                             expect 24+ months; ASO needs weekly iteration → skip A unless
│   │                             niche is tiny and you ship one app only
│   ├─ 5–15 h/week ────────────► continue
│   └─ > 15 h/week ────────────► continue (can run outreach D or heavy iteration A)
│
├─ Q2 cash you can lose (12 months)
│   ├─ < $500 ─────────────────► A, B, C only (no paid UA)
│   ├─ $500–$5,000 ────────────► A, B, C, D; small ASA test ($20–40/day) only after paywall converts
│   └─ > $5,000 ───────────────► add E later, after organic conversion is proven
│
├─ Q5 domain knowledge / insider access
│   ├─ YES: you work in or know an industry with a painful workflow
│   │    └─ Q7 B2B? ── yes ──► D (direct outreach to 20–30 named people), then B/C for scale
│   │                 ── no  ──► A in that niche (you can judge the customer; Arthur's lesson)
│   └─ NO ──► continue
│
├─ Q4 existing distribution (list, community, followers)
│   ├─ ≥1,000 engaged followers or a community in the niche
│   │    ──► launch there first; pair with A or B; revenue from audience can fund SEO/ASO
│   └─ none ──► A or B first (store search IS the distribution)
│
├─ Q7 B2B vs consumer
│   ├─ Prefer B2B ──► Q3 skills:
│   │       ├─ can write/SEO ─► C
│   │       ├─ can talk/sell ─► D
│   │       └─ can build integrations ─► B
│   └─ Prefer consumer ──► A (iOS first), with annual plan + hard paywall test
│
├─ Q3 skills
│   ├─ strong design/UX ─► A (listing, onboarding, screenshots are the game)
│   ├─ strong engineering only ─► B or C (utility, API, integration); price $30+/mo
│   └─ strong writing/video ─► C or a creator layer after A
│
├─ Q6 risk tolerance (long, uncertain feedback)
│   ├─ low ─► B or C with paid-from-day-one pricing; avoid consumer hits-driven niches
│   └─ high ─► run a portfolio of 3–5 cheap A/B tests (Arthur, Bannerbear 12-in-12), then focus
│
└─ Q8 timeline to $10k
    ├─ ≤ 6 months ─► only D with a domain-insider and a known buyer list, or A with a
    │                 proven niche + paid UA budget; both below 10% likely; set expectations
    ├─ 6–18 months ─► A, B, D (the median documented range)
    └─ 18–36 months ─► any of A–D; C especially; plan for side-project pace
```

**Default for the stated persona (no audience, day job, AI build skills, no strong domain, cash <$2k, B2C or B2B open):**
1. Pick niches by *search nouns with existing paid competitors* (Krasun's heuristic; Spalanzani's "revenue spread across multiple apps").
2. Build one-job tools in 2–4 weeks with AI coding tools; ship to a store or marketplace where search is the distribution (Paths A or B).
3. Charge from day one, ideally $30+/month for B2B or a hard paywall with annual plan for consumer.
4. Get 10 paying strangers as the gate (Krasun). Measure day-35 download-to-paid vs 2.0% median, trial-to-paid, first-renewal retention.
5. Run 3–5 niche attempts before concentrating; keep a decision log. Layer SEO or outreach on the one that converts.

**Suggested gates for an agent to track** (inference, built from the numbers above):

| Gate | Evidence for the bar |
|---|---|
| First dollar from a stranger within ~45 days of launch | Cardstock (12 paid on launch day), ScreenshotOne (~5 weeks), ProjectionLab (a dozen Premium signups the day it hit Hacker News) |
| $1k MRR within 2–6 months | RevenueCat median 58 days among apps that reach it; ProjectionLab 9 months |
| Day-35 download-to-paid ≥2% | RevenueCat median 2.0% |
| $5k MRR by ~12–18 months | ProjectionLab 19 months to $5k |
| Kill or pivot a niche at ~100 days without $1k MRR | RevenueCat: H&F/Utilities take 100+ days to confirm |

---

## 6. The eight circumstance questions (interview wording)

Ask conversationally, one at a time. Each answer feeds the tree in section 5.

1. **Time:** "In a normal week, how many hours can you realistically give to this, and are they in blocks (weekends) or scattered evenings? Are there seasons, like a work crunch, where it drops to nothing?"
2. **Cash:** "How much money could you spend on this over the next 12 months and be okay never seeing it again? Include ads, tools, freelancers, and fees. Is there any month where you would need it back?"
3. **Skills:** "Which of these can you do yourself today: build a working app or site, design a screen people trust, write a page that ranks or persuades, record short videos, or talk to a stranger about money? Which would you hate doing?"
4. **Existing distribution:** "Do you have any group that already listens to you: an email list, a Discord or Slack you're active in, a social account people respond to, a professional network that buys software? Roughly how many people, and have any of them ever bought something because you recommended it?"
5. **Domain knowledge:** "Where do you know something most people don't: your job, an industry, a hobby with spending, a daily annoyance you've solved yourself? Who are the five people who would pay for a fix to it, and could you message them this week?"
6. **Risk tolerance:** "If after six months you had under $500 a month, would you keep going, switch niche, or stop? How do you feel about a plan where most attempts fail, but you try several cheap ones?"
7. **B2B or consumer:** "Would you rather sell a $5–10 subscription to many individuals, or $30–150 a month to fewer businesses? Are you comfortable on calls and in inboxes with business buyers?"
8. **Timeline:** "By when do you want $10k a month: six months, a year, three years? What is the real constraint: leaving your job, a purchase, proving something to yourself? What would count as success at 12 months if $10k is still far away?"

Follow-ups the agent can add when needed: "Is the $10k gross or what you take home?", "Are you willing to charge in month one?", "Which app store or marketplace do you already use heavily?"

---

## 7. Implications for the "agent for one goal" (short)

- **Make the plan a sequence of gated experiments, not a build list.** The cases that worked chose a channel before they built (Spalanzani), spoke to strangers early (Krasun, Fitzpatrick), and iterated monetization weekly (Superwall, Adapty). Those are agent-trackable behaviours.
- **The most useful numbers to compute with the user** are: customers needed at their price (computed above: $5 = 2,000; $10 = 1,000; $30 = ~333; $50 = 200; $100 = 100 payers for $10k gross), conversion needed, and hours per week available.
- **Honest base rate to show:** ~1 in 20 for subscription apps within two years; 2–3% in verified-revenue databases; the agent should say so and still show the documented ways people got there.
- **Failure-mode watchlist to surface in check-ins:** zero stranger sales after 4–6 weeks live, ranking drop (check keywords weekly), month-one churn, trial cancellations on day 0, and burnout (ProjectionLab: sleep, family, gym).

---

## 8. Source quality notes and rejected sources

**Synthetic or unverifiable "case studies" were prominent in the search results; excluded from the cases:**
- The "Indie Hacker Podcast with Fexingo" on castro.fm and Apple Podcasts (hosts "Lucas and Luna"; guests such as "Sarah Chen / FormScout," "Jake," "Sarah Jenkins / PageWatch," and a Shopify inventory forecaster) and spoken.md transcripts of similar episodes (a locksmith SaaS at $30k/month, a home-inspector SaaS at $4M ARR). Repeated formulaic structure, recycled names, and no verifiable founder or product. Treat as AI-generated.
- Medium post by Aryan Banswar, which states it is a "fictional but realistic case study."
- marketingplaybook.co.uk "$99 SaaS hit $10K MRR using LinkedIn DMs": anonymous founder, round funnel numbers, no product named.
- growthhacksuite.com "GMass solopreneur case study": no named founder or product.
- startupfounderstories.com entry for SaaS Pegasus (Cory Zue): internal inconsistencies (founder location, MRR figures); used only its aggregate "295 documented journeys" framing as [L].
- cohortcalc.com unit-economics article: calculator with assumed inputs, not data.

**Where I leaned on vendor or interested sources:** Superwall, Adapty, RevenueCat (all sell tools to app developers; datasets are large but skew to apps using their SDKs and to iOS); Tap & Swipe (author sells an ASO tool); Origami (sells outreach tooling); TrustMRR (opt-in). Victoire's numbers are the author's own revenue estimates and only include apps that reached 20 US ratings.

**Known gaps:**
- No Sensor Tower or Appfigures raw dashboard data was available without a login; their 2025 consumer-spend totals disagree (Sensor Tower $167B, Appfigures $155.8B, both estimates) and are not needed for the conclusions.
- No verified solo case found for programmatic SEO at $10k, for Slack apps, or for paid-UA-led solo apps at $10k.
- The "what nearly killed it" column is "not stated" for several cases because the sources didn't say.
- Survivorship bias runs through everything: people who quit at $200 MRR rarely write retrospectives.

---

## 9. Source list (primary and strongest secondary)

- RevenueCat, State of Subscription Apps 2026: https://www.revenuecat.com/state-of-subscription-apps ; Business of Apps summary: https://www.businessofapps.com/insights/only-1-in-20-new-subscription-apps-reaches-10000-in-monthly-revenue/
- Adapty, State of In-App Subscriptions 2026: https://adapty.io/state-of-in-app-subscriptions/ ; concentration post: https://adapty.io/blog/app-subscription-revenue-concentration/ ; Meta ads framework: https://adapty.io/blog/first-10k-meta-ads-subscription-apps/
- Superwall, State of App Monetization 2026: https://superwall.com/blog/state-of-app-monetization-2026
- Victoire, "How much does an app make in its first year? 2026": https://victoire.dev/blog/how-much-do-apps-make-first-year
- Grumpi, indie app revenue numbers: https://getgrumpi.com/blog/how-much-do-indie-apps-make
- TrustMRR via Marc Lou: https://marclou.com/tweets/i-checked-10-646-startups-and-54-9-made-0 ; TrustMRR stats: https://trustmrr.com/stats
- Isaac Harold, 290 founders' MRR posts: https://www.indiehackers.com/post/i-went-through-290-founders-mrr-posts-the-ones-past-10k-got-their-first-customers-a-different-way-ff0f3e5904
- Shopify app economy: https://revenuehunt.com/state-of-the-shopify-app-economy/ ; https://www.adsx.com/blog/how-much-shopify-app-developers-make
- AI Overviews and clicks: https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/ ; https://searchengineland.com/google-ai-overviews-drive-drop-organic-paid-ctr-464212 ; https://www.tomislavglogovac.com/ai-overviews-34/
- Apple Search Ads for indies: https://rushilo.com/blog/apple-search-ads-worth-it-indie-developers
- Case sources are linked inline in section 1.
