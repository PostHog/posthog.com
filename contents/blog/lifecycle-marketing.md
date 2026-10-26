---
date: 2026-10-26
title: I don't know anything about lifecycle marketing
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - joe-martin
category: Inside PostHog
tags:
  - Workflows
---

PostHog's onboarding email flow is the thing I'm asked about most internally, and the thing I'm least confident in. It's [been through nine major versions](/blog/how-we-built-email-onboarding) since I mapped the original Mailchimp mess in 2022 and ever since I’ve had a steady stream of replies from users who seem to like our emails.

But I always worry: could it be better? Most of it was built on intuition and best guesses, and I'd be the first to admit I rarely have a concrete idea of how marketing is supposed to work.

Right now I’m planning the next major overhaul. We're moving the whole thing from Customer.io to PostHog Workflows, rewriting most of the content, and responding to [some feedback](https://github.com/PostHog/requests-for-comments-public/issues/597) I got at our last offsite. This time I want every decision to be a deliberate one, not just something I decided in a vacuum.

At the end of this article I’ll describe what’s changing and why. But first, I decided to go and ask some people who know what they're doing.

## So I asked people who actually know

[Lottie](/community/profiles/27881) has been running a [series of LinkedIn posts](https://www.linkedin.com/in/lottiecoxon/recent-activity/articles/) where she interviews other design leads about how they work. It's a good format, so I stole it. I spoke to three lifecycle marketers:

- [Marc Thomas](https://www.linkedin.com/in/iammarcthomas/), a lifecycle consultant who built the flows at [Balsamiq](https://www.sequenzy.com/email-examples/brands/balsamiq)
- [James Lester](https://www.linkedin.com/in/james-l-88560512b/), who leads Growth at Fyxer AI
- [Jeff Hardison](https://www.linkedin.com/in/jeff-hardison/), VP of Marketing at Sanity, who ran lifecycle at [Calendly](https://www.sequenzy.com/email-examples/brands/calendly)

I asked them all roughly the same things. Here’s what they said.

### How complex should your flow be?

Over five years, our onboarding flow has grown from a handful of emails into a tree of roughly 100. In theory every new branch gets us more data and better targeting. In practice every new branch is another thing to maintain. Where's the line?

Marc thinks traditional multi-branch trees (which is exactly what we have) over-index on setup events that don't reflect real value. Waiting for a trigger like "has created an insight" before deciding what to send _feels_ useful, but it doesn't tell you whether the user got anything out of it, or why they did it.

His advice is a single, simple trunk sequence with one goal. Don't try to drive people who've done X to do Y. Tell everyone to do the one thing that actually moves MRR.

James agreed, for a simpler reason: 100-branch flows are noisy, slow to learn from, and break every time the product changes. He suggests aiming for two or three high-leverage branches with outcomes you actually measure.

### What should you measure?

With email it's easy to fixate on the basics: open rates, click-through rates, unsubscribe rates. That's especially tempting for us, because ours are really good. Maybe I'm just being vain?

Coming from a Growth background, James disagreed with this approach. He thinks you should track activation, product usage, and MRR rather than opens and clicks, and run holdout groups for anything new so you're comparing against sending nothing at all.

He also quoted Jeff Bezos at me, on listening to customers when they and the data disagree. It's the first time a Bezos quote has ever sounded worth listening to.

### How should you personalize content?

Right now, our onboarding personalizes based on product behavior, not person properties. If you've used Product Analytics, a tip on getting more out of it is probably useful. If your first name happens to be in our database, that's not a reason to use it.

Jeff thinks you should personalize as much as possible. At Calendly, changing just the first paragraph of a newsletter by role doubled activation and conversions. Marc only branches if the user journeys are dramatically different. James has never seen one-to-one AI personalization beat a well-crafted email written for a specific segment.

### Are experiments worth more than taste?

Most of our emails are guided by taste, not experiments. The only consistent finding from the few tests we have run is that hand-drawn hedgehogs beat product screenshots by a point or two as the lead image. I suspect we could have told you that without testing it.

Jeff puts far more weight on testing. He thinks you should test everything, constantly, including dark patterns, whether you like them or not. At Calendly they stopped sending trial-expiry reminders, for example, because the reminders measurably hurt conversion.

Marc called subject-line tests busy work at our scale and argued for big swings instead, like different pricing framing on day three, as that’s the only way you’ll see genuine results.

### How much can you email?

When I started building our onboarding flow there was a lot of internal pushback about emailing people _too much_. The common wisdom is that engineers in particular hate being over-messaged, so you should send as few emails as possible.

I've come to believe that's a content problem, not a volume problem. Engineers will happily read a lot of emails, as long as each one is worth reading. Still: how far can you push it?

Marc thinks emails should be heavily front-loaded. He cited examples where the likelihood of converting fell to 10-20% between days five and 14, then to about 1% after that. Find your own conversion cliff, he says, and put your effort before it.

He also splits flows into two parallel tracks: a hard onboarding track that's direct and action-oriented for about 30 days, and a brand track that keeps you in front of people for a year. At Balsamiq the brand track was a 27-email loop aimed at lapsed users: industry content on Monday, a feature on Wednesday, a customer story on Thursday. It brought a lot of them back over time.

### Who should own email marketing?

At PostHog this has never really been a question, partly because [we work with fuzzy ownership](/handbook/company/fuzzy-ownership) and partly because we don't have a defensive internal culture. I own email marketing mostly because I built it, but people across the company contribute to it freely.

Elsewhere, it apparently isn't so simple. James's very first question was who controls email at PostHog, because he's seen engineers self-serve sends at other companies and hurt users. His advice was that marketing should own email wholly and run it from a calendar.

Jeff went further. In his experience, email becomes a political hot potato as product-led companies grow and sales starts asking for more and more from it. He suggested writing a pitch document up front listing what you will and won't do, including a section for the things leadership mandates you do anyway.

### How do you cross-sell for a multi-product company?

This was the one I most wanted answered. PostHog ships [12-plus products](/products), and getting people from one to two has always been harder than it looks. We've built entire flows to encourage it and never been sure they're worth the overhead.

James's advice was to stop trying to map all of them. If 90% of your users start with X and power users then move to Y, don't worry about A, B, or C. Get people to adopt X and Y and let everything else compound downstream.

Marc was similar: don't market products in a set order. Build flows around the moments where someone's behavior suggests they need something else.

### Can you market to agents through email?

We've been talking a lot internally about the shift from marketing to humans to marketing to agents. We've already made changes because of it, like making every docs page available as markdown and making the changelog easier for agents to find.

Email is the obvious next question. If an AI is triaging your inbox and replying on your behalf, how do you write emails that work for it?

Nobody had a strong take. None of the three had been thinking about it, and even when pressed, the best anyone offered was plain-text versions and a good sender reputation. Jeff suggested I ask Claude.

That's reassuring and a bit lonely. We already treat [the changelog](/changelog) and our docs as agent-readable surfaces. Beyond the basics, we'll keep this cheap until someone, possibly us, figures out what works?

## What happens next

So, what are we actually going to do?

**We're leaving Customer.io.** The flow currently runs as roughly 100 emails in Customer.io, held together by 46 delays, 50-odd decision events, and a data pipeline that pushes PostHog events across so the emails know what a user has done. The pipeline works, mostly, but only because we've cut back how much data we send to stop it degrading. Even then it breaks, users get the wrong email, and I hear about it in my inbox.

We're moving the whole thing into [PostHog Workflows](/workflows), partly because you should use your own product and partly because it deletes the pipeline entirely. Workflows runs on the same data as everything else in PostHog, so an email can trigger on anything a user does, not just the handful of events I remembered to set up six months ago. It can also do things Customer.io can't, like flip a feature flag or trigger a survey off the back of an email.

**We're rewriting the emails.** Parts of the current flow were written when the most interesting thing a new user could do was create a dashboard. Patching it email by email would leave us with a flow that's half 2023 and half 2026, which is worse than either. So it's all getting rewritten, and this is what the next version looks like:

- **One trunk, minimal branching.** Emails get front-loaded into the first few weeks, timed against our own conversion cliff once we've found it. Long-term nurture moves into its own repeating loop. We've got years of content for product engineers to draw on, and we'll watch for it going stale.

- **Problems, not product paths.** The trunk focuses on getting people to use PostHog AI and the MCP. Instead of assuming everyone goes Product Analytics, then Session Replay, then whatever's next, the content talks about the problems you can solve by asking PostHog. Cross-sell is the agent's job.

- **Freemail personalization.** People who sign up with a Gmail address to build a side project get a different, more relevant experience from people signing up at larger companies.

- **Business metrics, not clicks.** We'll measure emails against activation and product usage, and run holdouts on anything new.

- **Big tests, not small ones.** No more subject-line tweaks, and no dark patterns, however measurable the lift.

- **No email gatekeeping.** Anyone at PostHog can still send emails. We'll get better at feedback instead.

- **UTMs, alt text, and plain text on everything.** For whatever's reading it, until we find a better way to market to agents.

- **One weekly digest instead of four.** Nobody I spoke to mentioned this. I just think it's a good idea.

Finally, I'm also going to be getting out of the way. At a recent PostHog offsite it was [pointed out](https://github.com/PostHog/requests-for-comments-public/issues/597) that while I know a lot about how our email marketing works internally, that makes me a potential point of failure because all of that knowledge lives just in my head and all the user response lives in my inbox.

That's the opposite of how ownership is meant to work at PostHog. We run on [fuzzy ownership](/handbook/company/fuzzy-ownership), which only works if anyone can pick something up and improve it. Right now anyone with Customer.io access _can_ send an email, but not everyone feels enabled to.

So I'm not going to do what James and Jeff suggested, which is to fence email off as marketing territory. I'm going to do the reverse:

- **Make the flows more visible.** In Workflows, the flows sit inside the product everyone already uses, not in a tool only I can give access to.

- **Make them small.** One trunk and a handful of short, separate flows means anyone can read one in five minutes and understand what it's for. They can also ask PostHog AI for help.

- **Write down the thinking.** That’s what this article is part of, but I’ll also be demoing it internally too.

The goal is that when someone wants to send an email, or change one, I don’t end up as a blocker. They'll be able to see what's already there, why it exists, and what good looks like. Occasionally one will still go out that I'd have written differently, but that's fine. I'd rather give feedback after the fact than become the approval step that slows everyone down.

If it works, I'll write it up with the numbers like last time. If it doesn't, I'll write that up too. Either way, it'll be easier for someone else to fix.
