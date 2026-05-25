---
title: Solving paper cuts
date: 2026-05-25
author:
  - paul-dambra
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/519290681_b3c074ed_f976_4e91_8c37_498387c9dbe1_a48312c745.png
category: Startups
tags:
  - AI
---

One of the things I love about working at PostHog is our customer obsession. It's cliché to claim, as a company, that you're obsessed with your customers, but it's really true for us. So, it was a real wake-up call when, around six months ago, we noticed that a bunch of user feedback would regularly contain the word "paper cuts." When unrelated customers start using the same term, you have to sit up and listen.

One of the founders, Tim, started pushing the phrase "one more iteration," it's not about literally "one more iteration," but about the idea that you're always looking at a piece of work and asking yourself, "Does this need a little more?" and that includes whether or not it sparks joy, whether or not it makes sense to people. This was helpful in terms of changing how we talked about the work, but it wasn't enough to show our customers that we were reacting.

One of the little calls to action that I've loved throughout my career is the idea that invisible work doesn't get done. A common saying if you've worked with folk interested in Lean or Kanban. It occurred to me that the paper cuts were invisible work.

- We weren't getting a concrete list from people.
- We weren't putting that list anywhere.
- We weren't making it anyone's responsibility.

Good behavior and good habits from the teams would only get us so far. We're a very async-first company, and what I wanted to do was find the async-first way of solving this problem.

Since Slack is our daily driver for communication, I created a `#papercuts` channel. It's somewhere that's very cheap for people to add a tiny problem when they see it. All I asked people to do was dump the paper cut into that channel. If they think they know who to tag, who should act on it, great, tag it, but I didn't want any barrier to them getting the paper cut written down. The easiest thing is to drop the text or a GIF or a video or a link to the customer Slack message, just put it in the channel.

So now we had one central place where you could look and see all these tiny pieces of work. They really are genuinely, almost all of them, tiny, but now the work is visible. We made this part the responsibility of the support rotation our engineers work, and around the same time we were super lucky that coding models were improving month over month.

Once we had this central place where the work is visible, I made sure that the first few days and weeks had quick fixes so that people got in the habit of posting. And folk joined in. it was really cheap to jump in, tag PostHog which knows about your code and about your data. Often literally the word "fix" as a prompt is enough to get a workable PR through. At the end of every week, we do a report of how many items were raised, how many items were fixed, and a leaderboard of who's done the most fixes. Recently, we've hooked these messages into our new signals product, which will take the paper cuts and synthesize them and start to generate PRs for you even while you sleep.

The net result of that, since we started, has been that we've shipped 445 PRs just from identifying paper cuts. That's 63% of what's been reported in the channel that has been fixed. The items that were tagged as bugs were the majority and 71% of those reported bugs have been fixed. Anything tagged as an improvement, there's 130 of those, 52% of those have been fixed. What was surprising to me, there are 25 things that are just feature requests. It's not that the system doesn't work the way I expect; it's that I wish the system worked a different way. We've shipped a third of those feature requests, even though they weren't something we planned to do. They were just things we identified that would make PostHog better.

What's fascinating is I see this idea crop up in multiple places now. I've seen folk at Rippling and Anthropic talk about similar solutions they arrived at. As Jessica Kerr says: "When the world is ready for an idea, it doesn’t come to just one person"

But really, my favorite thing about this is that customers don't really say "paper cuts" to us anymore. Every day now in our Slack, people get to see that it's okay to point out where we could improve, see that we'll act on that, and celebrate each other doing a little bit extra to make things better for customers.