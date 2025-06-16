---
title: Quarterly planning mistakes for engineers to avoid
date: 2025-06-13
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/maxachu_6b6bcc0983.png
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---

### Unconventional advice from what we've learned at PostHog

Engineers often dread the end of the quarter because it means one thing: **quarterly planning**. 

If you're doing it wrong, this can mean weeks of prep and countless meetings, all of which distract from the actual work of shipping a product. 

With 26 small teams (and counting), we end up running quarterly planning a lot. We have had many opportunities to make mistakes and learn from them. We're sharing these lessons here (so you can learn faster than we did).

## 1. Thinking you need the perfect plan

We preface this entire piece with some wisdom from Charles from [our handbook](/handbook/company/goal-setting):

> All objectives are bad - they have many compromises, are fallible, easy to game, or may be affected by external factors, so use the least bad ones.

Many engineers get stuck trying to make their goals perfect. They fail to realize that accomplishing goals isn't what matters; it's shipping a product that's valuable to users. Don't let wording or picking a metric block you from this. 

There are two lessons to take from this.

The first is to **not spend too much time planning**. Our quarterly planning meetings take 1-1.5 hours max. 20% is reviewing the past and 80% is talking about goals for next quarter. Prep takes about an hour and is entirely async. This means less time spent in meetings 🥳.

The second lesson is **not being afraid to change goals** midway through the quarter. Sometimes we get our goals wrong and that's ok. Circumstances change, delays happen, engineers need the freedom to adjust.

![Changing goals](https://res.cloudinary.com/dmukukwp6/image/upload/2025_06_13_13_13_42_6834ffc060.jpg)

We are big fans of making important changes as quickly as possible. Team changes are announced in Slack, we test in production, we get MVPs in the hands of users. When a team realizes they need a different goal, they have the autonomy to change it themselves and immediately start working on it. No elaborate “change of goals” meeting or processes.

Again, it's not about perfectly matching the original goals set, but building a great product. It's better to change a goal to something useful than be stuck working on something useless because you said you would 2 months ago.

## 2. Obsessing over metric-based OKRs

In 2022, we required “OKRs” as part of quarterly planning, but eventually walked it back. We found engineers were agonizing over finding the right metrics while also feeling like metrics didn't accurately reflect their subjective view of progress.

We also realized that after setting OKRs, engineers would go off and figure out what to build. They needed to translate an OKR into a plan they could work on. It's a lot clearer and faster to just write that down instead. Even if you are forced to use OKRs, writing down a plan is still useful for guiding your work.

We learned that setting OKRs just because “Google does it” doesn't mean it's the right thing to do. We evolved and teams are now free to set goals and measurement methods, including using precise metrics (even OKRs) where appropriate. This has resulted in team goals like this:

![OKRs](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/newsletter/mistakes/okrs.png)

This type of goal better aligns with our overall goal of shipping a great product that equips every developer to build successful products, not just making a number on a graph go up.

## 3. Letting others own your plan

Early in PostHog's life, an engineer wanted to build session replay. Our co-founder James thought it was a terrible idea. The engineer built it anyway and it ended up being wildly successful and led to our multi-product strategy.

Since then, engineers are in charge of figuring out what to build. Neither execs nor product managers tell engineers what to build. It's up to engineers to decide, but this means they need to form a strong opinion of what they want to build.

When it comes to quarterly planning, our process looks like the “[W framework](https://review.firstround.com/the-secret-to-a-great-planning-process-lessons-from-airbnb-and-eventbrite/)” created by Lenny Rachitsky and Nels Gilbreth. This process encourages teams and execs to work together in planning like this:

1. **Context**: Execs share direction, overall objectives, strategy, mission, ICP, and more with teams. At PostHog, this is done through our weekly all-hands, 1:1s, [company handbook](https://posthog.com/handbook), `#tell-posthog-anything` messages, comments on RFCs, and more.

2. **Plans**: Engineers decide what they want to build, how, and for whom. Throughout the quarter, engineers get feedback from customers, add items to [the roadmap](https://posthog.com/roadmap), and write RFCs for important product decisions. This means when it is time for quarterly planning, they already have a strong sense of what they want to build.

3. **Integration**: Execs add context from other teams, customers, and future plans. They make sure the plan is both realistic and ambitious enough. This usually happens just before or during the quarterly planning meeting.

4. **Buy-in**: Engineers make final tweaks, confirm buy-in, and get rolling. The last step of quarterly planning at PostHog is always a pull request to add the goals to the website which gets approved by the exec team.

![W framework](https://res.cloudinary.com/dmukukwp6/image/upload/w_d7da48e563.png)

This process creates enough direction to make both the company and the small team successful, while also giving teams the ownership and autonomy to make product decisions for themselves.

## 4. Being unclear about what success looks like

Quarterly planning aims to help you figure out what's important and increase your chances of achieving it next quarter. Neither can happen if you're not being clear about what the goal is.

There are a lot of traps to fall into when setting goals such as:

- Having too many.
- Making them too complicated.
- Making them impossible to measure.
- Being misaligned with what's actually important.

At PostHog, we mostly focus on **things we'll ship**. We try to have as few of these as possible and call out the areas we **don't** want to work on (anti-goals). We don't obsess over specific metrics, but if we do include them, we make sure they are targeted and measurable. 

Some examples of goals from Q2 2025 include:

- **😱 OMG so many destinations ([Team CDP](/teams/cdp#goals)):** We want to have so many destinations that we cover all the CDP cases people could dream of and, most importantly, the tooling and product to scale this automatically using AI, community templates, etc.

- **🧙 Automate the setup of 50% of PostHog installations ([Team Growth](/teams/growth#goals)):** More integrations and workflows with setup wizard. Be the default analytics provider for vibe coders. Be the default option in boilerplates for Next.js, React, and React Native. Improve the onboarding experience for self-hosted users.

- 🏃 **Improve build times for PostHog apps ([Team Infrastructure](/teams/infrastructure#goals)):** Make deployments great, fast, and more reliable. Use Argo UI extensions wherever it makes sense.

- **👩‍🔬 Find the needle in the haystack** **([Team Replay](/teams/replay#goals)):** Many of our customers have lots of recordings, but struggle to find the "useful" ones. We want to test and iterate on a bunch of different ideas to get customers to value faster.

Some might say these goals are "too vague" or "don't count as OKRs." Our response is that they work for us 🤷‍♂️ and that's what really matters. These goals support our focus on shipping things and getting feedback from users rather than obsessing over wording or arbitrary metrics.

## 5. Ignoring your plan after writing it

Quarterly planning is only as useful as the progress you make on it. If you're not checking in on your progress, you can't know if you'll be successful.

Our teams are constantly checking in and referencing the goals they set. The main place they do this is in our biweekly [engineering sprint planning](/handbook/company/sprints). 

These check-ins include each goal and its current status. Green indicates the goal is on track, yellow means it's at risk, and red signals it's significantly off track. Action points are required for any goal marked yellow or red.

![Sprint planning](https://res.cloudinary.com/dmukukwp6/image/upload/sprint_6442f2cbbc.png)

Regularly checking quarterly goals provides benefits like:

- Teams are reminded of what's important to work on.
- Changes, pivots, or interventions can be made for goals that are off track.
- Constant improvement to a team's ability to judge scope of work.
- Better understanding of capacity teams have for the next round of quarterly planning.
- Public accountability for goals.

Honestly, we find checking in is as important as quarterly planning itself.

## 6. Planning the whole quarter in advance

A quarterly plan is not a week-by-week guide to what we will ship. It is not some elaborate waterfall, list of issues, or agile plan. It is a set of goals that guide what a team will work on over the quarter.

Detailed plans fail due to unknown complexities and changing requirements. We've found that a week-by-week plan of what you are going to ship can create multiple issues like:

1. Wasted time from making inaccurate future plans.
2. Missed deadlines demotivate the team.
3. Lack of flexibility means not being able to spend time on more important work as it arises.
4. The deadline doomloop. Trying to hit a deadline leads to cut corners, tech debt, and burn out. 

The pressure to create a detailed plan often comes from a need for control. Relying on trust and feedback over process lessens this need for control. We empower people to make their own decisions, but that requires having a high bar for ourselves and our teammates, whether that is in hiring or day-to-day work.

## More mistakes to watch out for:

1. **Not taking hiring into account.** Hiring and onboarding new team members is a lot of work and is often underestimated. Our teams often include hiring-related goals in their quarterly plan to keep this in mind.

2. **Being opaque.** You should encourage other teams and execs to be transparent. You can lead by example by posting updates yourself. Without this information, teams don't have everything they need to plan successfully.

3. **Not having anti-goals.** When there is so much to build, it is often useful to write down what you *aren't* going to build. This improves focus on what really matters.

4. **Lacking vision.** Although you plan quarterly, you should have a longer-term product vision too (and be able to explain it). This isn't just for execs. Engineers should be able to explain how the long-term vision ties to their quarterly goals and aligns with broader company strategy and goals.

5. **Being dependent on other teams.** I've found that almost every time a goal is dependent on another team, it gets delayed or doesn't get done. The beauty of small teams is that they are autonomous. Dependency breaks this. Flag these in your plans before they become a problem.