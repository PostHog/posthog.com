---
title: Quarterly planning mistakes to avoid
date: 2025-06-04
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

### Unconventional advice from what we’ve learned at PostHog

At a startup, quarters seem to fly by. Many teams dread the end of the quarter because it means one thing: **quarterly planning**. 

If you’re doing it wrong, this can mean weeks of planning and prep, countless meetings, and ultimately unsatisfying results. 

As a company with many small teams, we end up running quarterly planning a lot and we’ve made a lot of mistakes over the years. Our team is happy with our process now (98% of the team said they “understand PostHog's goals and can see how my work contributes to them.”) and we manage to ship a lot.

Here’s a bunch of mistakes we’ve made around quarterly planning so you can avoid them.

## 1. Being top down

Early in PostHog’s life, an engineer wanted to build session replay. Our co-founder James, thought it was a terrible idea. The engineer built it anyway and it ended up being wildly successful and led to our multi-product strategy.

Since then, engineers are in charge of figuring out what to build. Neither execs nor product managers tell engineers what to build, it’s up to them to decide.

When it comes to quarterly planning, our planning process looks like the “[W framework](https://review.firstround.com/the-secret-to-a-great-planning-process-lessons-from-airbnb-and-eventbrite/)” created by Lenny Rachitsky and Nels Gilbreth:

1. **Context**: Execs share direction, overall objectives, strategy, mission, ICP, and more with teams.
2. **Plans**: Teams decide what they want to build, how, and for whom.
3. **Integration**: Execs add context from other teams, customers, and future plans. They make sure the plan is both realistic and ambitious enough.
4. **Buy-in**: Teams make final tweaks, confirm buy-in, add goals to the website, and get rolling.

![W framework](https://res.cloudinary.com/dmukukwp6/image/upload/w_d7da48e563.png)

This creates enough direction and context to make both the company and the small team successful, while also enabling the teams that are closest to the products to make decisions for themselves. 

## 2. Not being clear about what success looks like

The goal of quarterly planning is to help you figure out what’s important and increase your chances of getting it done next quarter. You can’t do either of these things if you’re not being clear about what the objective is.

There are a lot of traps to fall into when setting objectives such as:

- Having too many objectives.
- Having objectives that are too complicated, complex, or misaligned.
- Having objectives that are impossible to measure.

We solve this by having as few objectives as possible, focusing more on things we’ll ship, making metrics specific and measurable, and using counter metrics or anti-goals. 

Some examples of objectives from Q2 2025 include:

- **😱 OMG so many destinations ([Team CDP](/teams/cdp#goals)):** We want to have so many destinations that we cover all the CDP cases people could dream of and, most importantly, the tooling and product to scale this automatically using AI, community templates, etc.

- **🧙 Automate the setup of 50% of PostHog installations ([Team Growth](/teams/growth#goals)):** More integrations and workflows with **s**etup wizard. Be the default analytics provider for vibe coders. Be the default option in boilerplates for NextJS, React & React Native. Improve the onboarding experience for self hosting users.

- 🏃 **Improve build times for PostHog apps ([Team Infrastructure](/teams/infrastructure#goals)):** Make deployments great, fast, and more reliable and use Argo UI extensions wherever it makes sense.

- **👩‍🔬 Find the needle in the haystack** **([Team Replay](/teams/replay#goals)):** Many of our customers have lots of recordings, but struggle to find the "useful" ones. We want to test and iterate on a bunch of different ideas to get customers to value faster.

As you can see, there’s no one perfect way to write a goal. We generally favor shipping things and getting feedback from users rather than obsessing over metrics, but either way we know what success looks like.

## 3. Not checking in throughout the quarter

Quarterly planning is only as useful as the progress you make on it. By making success clear, you make progress (or lack thereof) clearer also. 

Our teams are constantly checking in and referencing the goals they set during quarterly planning. The main place they do this is in our biweekly [engineering sprint planning](/handbook/company/sprints). 

These check-ins include each goal and its current status. Green indicates the goal is on track, yellow means it's at risk, and red signals it's significantly off track. Action points are required for any goal marked yellow or red.

![Sprint planning](https://res.cloudinary.com/dmukukwp6/image/upload/sprint_6442f2cbbc.png)

Regularly checking quarterly goals provides multiple benefits:

- The team is reminded of what’s important to work on.
- Changes, pivots, or interventions can be made for goals that are off track.
- Constant improvement to a team’s ability to judge scope of work.
- Better understanding of capacity teams have for the next round of quarterly planning.

## 4. Thinking you need to be perfect

In our handbook on [quarterly goals](/handbook/company/goal-setting), Charles writes:

> All objectives are bad - they have many compromises, are fallible, easy to game, or may be affected by external factors, so use the least bad ones.

Some teams get stuck trying to make their goals perfect. They fail to realize perfectly achieving your goals isn’t what matters, it’s shipping a product that’s valuable to our users. Spending a ton of time perfecting our goals doesn’t really help us here. 

There are two learnings we take from this.

The first is do **not spend too much time planning**. Our quarterly planning process doesn’t take a massive amount of time. Prep includes filling out HOGS (our version of SWOT):

1. Hope: What are you most excited about this quarter?
2. Obstruction: Is there anything embarrassing about your product?
3. Growth: What single thing would move the needle the most this quarter?
4. Sneak attack: Say a competitor beats your team’s product, what would that product do differently?

The meeting itself should then take 1 hour max. 20% is reviewing the past (HOGS) and 80% is talking about goals for next quarter. It isn’t days of prep and hours of meetings. 

The second is **not being afraid to change our goals** midway through the quarter. Sometimes we get our goals wrong and that’s ok. Circumstances change, delays happen. Teams are able to adjust their goals as the quarter goes on. 

We are big fans of making important changes as quickly as possible. Team changes are announced in Slack, we test in production, we get MVPs in the hands of users. If we realize a goal is wrong or we need a different goal, teams have the autonomy to make the change themselves and immediately start working on it. No elaborate “change of goals” meeting or processes.

Again, it’s not about perfectly matching the original goals set, but working towards building a great product. It’s better to change a goal to something useful than be stuck working on something useless because you said you would do it 2 months ago.

## 5. Having too detailed quarterly plans

A quarterly plan is not a week by week guide to what we will ship. It is not some elaborate waterfall or agile plan. It is a set of objectives and goals that guide what a team will work on over the quarter.

Too detailed quarterly plans can create multiple issues like:

1. Wasting a lot of time inaccurately planning things far in the future.
2. Missing deadlines becomes demotivating to the team.
3. Not having the flexibility to spend time on more important work as it arises.
4. Cutting corners, creating tech debt, and burning out trying to make deadlines.

A lot of the desire to have detailed quarterly plans comes from a need for control. We work to hire great people so we can give them autonomy and trust them to make the right decisions. 

## 6. Enforcing metric-based OKRs

It is up to teams if they call the output of their quarterly planning goals, objectives, or OKRs. This last one is a bit loaded though and we specifically avoid metric-based OKRs like “increase activation 20%.” 

In 2022, we did require “OKRs” as part of quarterly planning, but eventually walked it back. We realized teams were agonizing over finding the right metrics while also feeling like metrics didn’t accurately reflect their subjective view of progress. 

We also realized that setting an OKR inevitably leads to figuring out what to build. It’s a lot clearer and fast to just write that down instead. 

We learned that one size fits all rarely works, neither does following conventional wisdom because “Google does it”. Instead, we’ve given teams the freedom to set goals and how they measure them – including using precise metrics where appropriate. This has resulted in team goals like this:

![OKRs](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/newsletter/mistakes/okrs.png)

## More mistakes to watch out for:

1. **Not taking hiring into account.** Hiring and boarding a team is a lot of work that often is underestimated. Teams also include hiring-related goals in their quarterly plan to keep this in mind.

2. **Being opaque**. Execs often hoard information and this means teams don’t have everything they need to plan successfully. Encouraging more transparency helps solve it.

3. **Not having anti-goals.** When there is so much to build, it is often useful to write down what you *aren’t* going to build. This improves focus on what really matters.

4. **Lacking vision.** Although we are planning quarterly, execs (and teams) should have a vision for what the product should look like in the long run. It should align with broader company strategy and objectives.

5. **Being dependent on other teams.** I’ve found that almost every time a goal is dependent on another team, it gets delayed or doesn’t get done. The beauty of small teams is that they are autonomous. Dependency breaks this.