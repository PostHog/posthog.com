---
title: 'The deadline doom loop'
date: 2025-01-09
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/deadlines_815f69faba.png
featuredImageType: full
tags:
  - Culture
  - Product
  - Being a founder
  - Engineering
crosspost:
  - Founders
  - Blog
---

Most companies love to set artificial deadlines. They’re the easiest way to “increase urgency”.

But they have a nasty habit of manifesting into meaningful deadlines. Deadlines that generate mountains of debt and slow you down over time.

I call this the **deadline doom loop**, and it’s one of the reasons we don’t have product deadlines at [PostHog](https://posthog.com/).

Here’s how the loop plays out:

### Phase 1: “We’re gonna make it!” 👍

Product teams figure out what to work on, make estimates, and sacrifice their first born to the ScrumAgileEtc Maste.r.

Execs set a deadline to “speed up” the engineers. Sales offer the deadline to customers. Customers are excited; execs are delighted.

### Phase 2: “Are we gonna make it?” 🤷
Months pass and the plan is slowly dying on contact with reality:

- It turns out building the feature is way more complex than first thought.
- There’s an incident. The best engineers get pulled in to solve it.
- An exec has an amazing unworkable idea. Time and energy is lost.
- A competitor launches a cool new feature. “What’s our plan for this?”
- “We must prioritize [unplanned feature] to close this massive deal.”

Engineers warn their managers that things aren’t going to plan. Managers sugarcoat their warnings, or ignore them entirely.

### Phase 3: “We’re not gonna make it!” 🥵
There’s a reckoning. Arguments and finger pointing ensue. Eventually, a new deadline is agreed enforced. “We must not miss again!”

Customers are annoyed and sales rejig their promises to customers. Hello, commercial debt! It’s like technical debt, but for creating difficult customer situations.

They’re placated via constant updates and alignment meetings. The customers who complain the loudest get what they want, even if it makes the product worse.

### Phase 4: “We (sort of) made it.” 😵‍💫
A brutal crunch gets the feature over the line to the new deadline.

Everyone’s relieved it’s over, but customers are underwhelmed. What you shipped is far less than sales promised, and it only partially solves their problem.

Some customers found other solutions because you took too long, others use yours for a while and give up. Some just realize the problem wasn’t that important after all.

### Phase 5: “We’re gonna make it this time!” 🙏
The big launch didn’t move the needle. A lengthy retrospective blames faulty processes. “The right process will fix this.”

Spoiler: it doesn’t.

Every pass through the doom loop makes the company slower. Deadlines cease to have any meaning.

A mountain of technical debt makes progress tortuous. The best engineers quit, frustrated by the slowness and exhausted by the crunch.

The company eventually grinds to a halt and starts churning customers.[^1]

## Principles for escaping the doom loop

![doomloop](https://res.cloudinary.com/dmukukwp6/image/upload/cycle_of_sadness_385ee8bd79.png)

This an extreme (and simplified) version of the doom loop, but you’ve all seen some version of this, right?

Typically, it’s the output of an excessively sales and / or marketing-led culture, one that defaults to:

- Overpromising to customers in marketing materials
- Short-term thinking and incentives
- Excessive coordination with unaligned stakeholders
- A lack of trust / preference for process as compensation
- Deadlines as a means to create urgency and “ship faster”

This culture doesn’t increase urgency, or help you ship faster, it just inflicts scar tissue that slows you down.

The alternative, an approach that helps us ship faster, relies on a few key principles:

1. **Small product teams** – Ideally, six or fewer. A team of six [cracked engineers](/founders/cracked-manifesto) will ship faster than a team twice its size. Small teams = less coordination, fewer meetings, and more time coding – see [The magic of small engineering teams](/newsletter/small-teams).

2. **Engineers make product decisions** – [Product engineers who own product decisions](/newsletter/product-management-is-broken) ship faster and better. This approach attracts ambitious, talented engineers with an intrinsic motivation for building great products.

3. **Trust and feedback over process** – Autonomy is more important than control. We expect people to give each other constructive feedback, and be generous with their praise when it’s deserved. Small teams make this easier, too.

Importantly, none of this relies on setting deadlines, or promising them to customers.

This feels scary at first. You can’t grow revenue, or raise more money, without customers, so you should keep them happy, right?

But here’s the trick delivery managers don’t want to tell you…

1. You can tell customers that you don’t set deadlines because it means your team can ship faster.

2. You can ship things very early and often, gathering feedback constantly and building trust with your customers.

3. You can leave the customers that require set deadlines to someone else. Focus on the long-term.

There are things you can do to help customers accept this way of working, too.

At PostHog, we use transparency to create trust. Our code is open source, so customers can follow along through pull requests and issues we share.

We also work very closely with highly-engaged customers on new features, and prioritize their most urgent needs. Listening to customers, and being transparent with them, is more effective than arbitrary promises.

## Things you need to make this work

![things you need](https://res.cloudinary.com/dmukukwp6/image/upload/things_f42683683b.png)

There are two key points here.

### 1. Be clear about what you need from people

For example, we have this guidance for our [product engineers](/blog/what-is-a-product-engineer):

**Good product engineers:**

- Ship quickly, so they have a fast feedback loop
- Understand the company strategy
- Use this context to prioritize and propose ideas for what to build
- Make sure the things they've built are being used
- Follow up after they've built something to improve it if needed
- Have users that they're friendly with

**Bad product engineers:**

- Spend six months on a huge feature before a user can try it
- Consider research something that takes weeks rather than hours
- Only work on things they've been told to work on
- Can't explain who their product is built for, or its competitors
- Don't talk to users about their roadmap, or what they've built
- Focus on internal alignment over company strategy / what users need

How do you know the team are doing this? What process do we implement?

None!

The moment you implement a process to do so, you're re-creating the doom loop you’re trying to avoid. Resist your urge to “[trust, but verify](https://en.wikipedia.org/wiki/Trust,_but_verify)”.

"Trust and feedback over process" is key here. We want our team to push each other on the above.

Frequently, you'll hear our engineers asking each other "what's stopping us from putting this into a user's hands now?"[^2]

### 2. Set a high bar for hiring

This is vital.

We expect a wider skillset from our engineers than just writing code, so we hire people that have wider skills. This means lots of ex-founders, ex-CTOs that just want to build stuff, and people with more experience.

As I tell people during interviews, being an engineer at PostHog is like driving a car.

If you like driving – i.e. being actively engaged and adjusting to feedback from the road (users) – it's fun. But you can't nap. You must stay switched on as no one will spoon-feed you product requirements.[^3]

How we interview and [what we look for when hiring](/newsletter/how-to-get-job-startup) is geared around finding people who like driving.

## What this feels like

Here’s what happens when you do all this:

- **You work with customers that trust you.** This feels great.
- **You build momentum.** Less process = shipping faster.
- **Your product improves quickly.** Customers love it.
- **The word gets out.** More customers turn up.
- **Motivation grows.** People want to work for you.
- **You remain fast at scale.** Happy, motivated engineers ship fast.
- **Less technical debt.** Happy engineers = higher retention.

This is the **no deadline boom loop**.

Is it for everyone? Probably not. Maybe this wouldn’t work for us if we were more enterprise focused, or we had 10,000 employees, or we built cars.

But we’re yet to lose a customer because we couldn’t promise dates, and we do have a bunch of Fortune 500 companies as meaningful, paying customers.

We’re doubling down on this approach as we grow – splitting up teams when they get too big and keeping them focused.

As of writing, we’re [78 people split across 21 small teams](/teams). If and when it stops working, I’ll write about it.

*Words by [James Hawkins](https://x.com/james406), who you can call on (989)POST-HOG.*[^4]

<NewsletterForm />


[^1]: AAA videogame development is a great example of the deadline doom loop in action. Successful studios frequently doom loop their way into oblivion, normally after being acquired by a large, corporate software publisher.

[^2]: Other things PostHog engineers talk about: the latest mechanical keyboard, what the latest M(n) chip is like + how to convince us to upgrade them to it.

[^3]: This is one of the reasons we generally don't hire people that have only worked at huge companies. Experience at huge companies AND startups is fine, though, and this is a preference, not immovable rule.

[^4]: In San Francisco.