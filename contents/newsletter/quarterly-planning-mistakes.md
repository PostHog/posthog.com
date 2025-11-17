---
title: You're doing quarterly planning wrong
date: 2025-06-30
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/meme_blog_80492e8157.jpg
featuredImageType: full
tags:
  - Engineering
  - Product
  - Culture
crosspost:
  - Product engineers
  - Founders
  - Blog
---

Engineers often dread the end of the quarter because it means one thing: quarterly planning.

This can mean weeks of prep and tedious meetings, all of which distract from the actual work of shipping a product.

With 26 [small teams](/newsletter/small-teams) (and counting), we end up running quarterly planning a lot. We’ve had many opportunities to make mistakes and learn from them.

We're sharing these lessons here, so you can learn faster than we did.

## 1. You don’t need the perfect plan

We preface this entire piece with some wisdom written by our favorite generic exec, Charles, in [our handbook](/handbook/company/goal-setting):

> All objectives are bad - they have many compromises, are fallible, easy to game, or may be affected by external factors, so use the least bad ones.

Many engineers get stuck trying to make their goals perfect. They fail to realize that accomplishing goals isn't what matters; it's shipping a product that's valuable to users. Don't let wording, or picking a metric, block you.

There are two lessons to take from this.

The first is to **not spend too much time planning**. Our quarterly planning meetings take 60 to 90 mins max. About 20% is reviewing the past and 80% is talking about goals for next quarter. Prep takes about an hour and is entirely [async](/newsletter/how-we-work-async). This means less time spent in meetings. 🥳

The second is **not being afraid to change goals** midway through the quarter. Sometimes we get our goals wrong and that's ok. Circumstances change, delays happen, engineers need the freedom to adjust.

![Changing goals](https://res.cloudinary.com/dmukukwp6/image/upload/meme_blog_80492e8157.jpg)

We’re big fans of making important changes as quickly as possible. Team changes are [announced in Slack](/newsletter/communication-mistakes#6-not-making-communication-actionable), we [test in production](/product-engineers/testing-in-production), we get MVPs in the hands of users.

When a team realizes they need a different goal, they have [the autonomy to change it](/newsletter/product-management-is-broken) themselves and immediately start working on it without an elaborate “change of goals” process.

Again, it's not about perfectly matching the original goals set, but building a great product. It's better to change a goal to something useful than be stuck working on something useless because you said you would two months ago.

## 2. You have to prepare asynchronously

Goals planning can really go off the rails in meetings, especially if:

1. You have multiple meetings to decide on your goals (just say no!)

2. People arrive having done no prep or “thinking” beforehand

Done like this, goals planning drags on forever and you end up rushing the important bits (i.e. what your goals should be) because you’ve sucked up a bunch of time thinking aloud and arguing about details.

![Don't be like Max](https://res.cloudinary.com/dmukukwp6/image/upload/dont_be_like_max_1_6d4c3e4635.png)

We avoid this by ensuring that everyone writes down what they think before the meeting in a single shared doc that includes:

1. **Reflecting on the past quarter.** The person responsible for each goal writes a reflection on how it went, lessons they learned, etc.
2. **HOGS.** Our version of SWOT, which covers:
  - **Hopes:** What are you most excited about this quarter?
  - **Obstructions:** Is there anything embarrassing about your product?
  - **Growth:** What single thing would move the needle the most this quarter?
  - **Sneak attack:** Say a competitor beats your team's product, what would that product do differently?
3. **Potential goals.** Based on the previous two sections, the team writes potential goals for next quarter, along with the motivation for it, and what they'll ship to achieve it.

People can then read what everyone thinks, ask follow-up questions, and pitch ideas before the meeting, instead of arriving with zero context.

As a result, our quarterly planning meetings are about discussing the thinking that's already been done, and making decisions.

It’s more efficient, fun, and satisfying.

## 3. Obsessing over metrics

In 2022, we required “OKRs” as part of quarterly planning, but eventually walked it back. We found engineers were agonizing over finding the right metrics, while also feeling like metrics didn't accurately reflect their subjective view of progress.

We also realized that after setting OKRs, engineers would go off and [figure out what to build](/newsletter/how-we-decide-what-to-build). They needed to translate an OKR into a plan they could work on. It's a lot clearer and faster to just write that down instead. Even if you are forced to use OKRs, writing down a plan is still useful for guiding your work.

We learned that setting OKRs just because “Google does it” doesn't mean it's the right thing to do. Teams are now free to set goals and measurement methods, including using precise metrics (even OKRs) where appropriate. This has resulted in team goals that focus more on "what we'll ship" like this:

![OKRs](https://res.cloudinary.com/dmukukwp6/image/upload/make_onboarding_better_1_7f47fcec5e.png)

This type of goal better aligns with our overall goal of shipping a great product that equips every developer to build successful products, not just making a number on a graph go up.

## 4. Focus on what you’re going to ship

There are a lot of traps to fall into when setting goals such as:

- Having too many.
- Making them too complicated.
- Making them impossible to measure.
- Being misaligned with what's actually important.

At PostHog, we mostly focus on **things we'll ship**. We try to have as few of these as possible and call out the areas we **don't** want to work on (anti-goals).

Some examples of goals from Q2 2025 include:

- **😱 OMG so many destinations ([Team CDP](/teams/cdp#goals)):** "We want to have so many destinations that we cover all the CDP cases people could dream of and, most importantly, the tooling and product to scale this automatically using AI, community templates, etc."

- **🧙 Automate the setup of 50% of PostHog installations (Team Growth):** "More integrations and workflows with setup wizard. Be the default analytics provider for vibe coders. Be the default option in boilerplates for Next.js, React, and React Native. Improve the onboarding experience for self-hosted users."

- 🏃 **Improve build times for PostHog apps ([Team Infrastructure](/teams/infrastructure#goals)):** "Make deployments great, fast, and more reliable. Use Argo UI extensions wherever it makes sense.""

- **👩‍🔬 Find the needle in the haystack** **([Team Replay](/teams/replay#goals)):** "Many of our customers have lots of recordings, but struggle to find the 'useful' ones. We want to test and iterate on a bunch of different ideas to get customers to value faster."

Some might say these goals are "too vague" or "don't count as OKRs." Our response is that they work for us 🤷‍♂️ and that's what really matters. These goals support our focus on [shipping things](/newsletter/this-is-why-youre-not-shipping) and [getting feedback](/newsletter/talk-to-users) from users rather than obsessing over wording or arbitrary metrics.

As a checking mechanism, we run monthly [growth reviews](/handbook/product/per-product-growth-reviews) for every product that look at key product and revenue metrics, like usage, [MRR](/docs/new-to-posthog/revenue), [retention](/docs/new-to-posthog/retention), and [NPS score](/templates/nps-survey). Teams can then adjust their goals if what they’re working on isn’t having a positive impact on things they care about most.

## 5. Don’t ignore your plan after writing it

Quarterly planning is only as useful as the progress you make on it. If you're not checking in on your progress, you can't know if you'll be successful.

Our teams are constantly checking in and referencing the goals they set. The main place they do this is in our biweekly [engineering sprint planning](/handbook/company/sprints). 

These check-ins include each goal and its current status:

- 🟢 Green indicates the goal is on track

- 🟡 Yellow means it's at risk

- 🔴 Red signals it's significantly off track.

Action points are required for any goal marked yellow or red.

![Sprint planning](https://res.cloudinary.com/dmukukwp6/image/upload/sprint_6442f2cbbc.png)

Regularly checking on progress means:

- Teams are reminded of what's important to work on.

- Changes, [pivots](/newsletter/pivot-your-startup), or interventions can be made for goals that are off track.

- Constant improvement to a team's ability to judge scope of work.

- It’s easy to identify capacity problems – i.e. when we need to hire.

- [Public accountability](/newsletter/product-management-is-broken#4-accountability-through-feedback-loops) for goals.

## 6. Letting others own your plan

Early in PostHog's life, an engineer wanted to build session replay. Our co-founder James thought it was a terrible idea. The engineer built it anyway and it ended up being wildly successful and changed the direction of the company.

Since then, [engineers are in charge](/newsletter/product-management-is-broken) of [figuring out what to build](/newsletter/how-we-decide-what-to-build). Neither execs nor product managers tell engineers what to build. It's up to engineers to decide, but this means they need to form a strong opinion of what they want to build.

When it comes to quarterly planning, our process looks like the “[W framework](https://review.firstround.com/the-secret-to-a-great-planning-process-lessons-from-airbnb-and-eventbrite?utm_source=posthog-newsletter&utm_medium=post&utm_campaign=quarterly-planning)” created by Lenny Rachitsky and Nels Gilbreth. This process encourages teams and execs to work together in planning like this:

1. **Context**: Execs share direction, overall objectives, strategy, mission, [ICP](/newsletter/ideal-customer-profile-framework), and more with teams. At PostHog, this is done through our weekly all-hands, 1:1s, [company handbook](/handbook), `#tell-posthog-anything` messages, [comments on RFCs](/newsletter/choosing-technologies#4-we-make-decisions-asynchronously), and more.

2. **Plans**: Engineers decide what they want to build, how, and for whom. Throughout the quarter, engineers [get feedback from customers](/newsletter/talk-to-users), add items to [the roadmap](/roadmap), and write RFCs for important product decisions. This means when it is time for quarterly planning, they already have a strong sense of what they want to build.

3. **Integration**: Execs add context from other teams, customers, and future plans. They make sure the plan is both realistic and ambitious enough. This usually happens just before or during the quarterly planning meeting.

4. **Buy-in**: Engineers make final tweaks, confirm buy-in, and get rolling. The last step of quarterly planning at PostHog is always a pull request to add the goals to the website which gets approved by the exec team.

![W framework](https://res.cloudinary.com/dmukukwp6/image/upload/execs_teams_1_da91e86f2f.png)

This process creates enough direction to make both the company and the small team successful, while also giving teams the ownership and autonomy to make product decisions for themselves.

## More mistakes to watch out for:

1. **Not taking hiring into account.** [Hiring](/newsletter/43-lessons-about-hiring-for-startups) and onboarding new team members is a lot of work and is often underestimated. Our teams often include hiring-related goals in their quarterly plan to keep this in mind.

2. **Being opaque.** You should encourage other teams and execs to be [transparent](/founders/first-1000-users#3-be-open-source-and-transparent). You can lead by example by posting updates yourself. Without this information, teams don't have everything they need to plan successfully.

3. **Not having anti-goals.** When there is so much to build, it is often useful to write down what you *aren't* going to build. This improves focus on what really matters.

4. **Short-term thinking.** Although you plan quarterly, you should have a longer-term product vision too (and be able to explain it). This isn't just for execs. Engineers should be able to explain how the long-term vision ties to their quarterly goals and aligns with broader company strategy and goals.

5. **Being dependent on other teams.** I've found that almost every time a goal is dependent on another team, it gets delayed or doesn't get done. The beauty of small teams is that they are autonomous. Dependency breaks this. Flag these in your plans before they become a problem.

<NewsletterCTA />