---
date: 2026-05-01
title: PostHog's next chapter
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/classic_blog_1_299db11bad.png
featuredImageType: full
tags: CEO diaries
---

Building PostHog has been living the dream. We got into YC. We pivoted a bunch. We found product-market fit, onboarded hundreds of thousands of customers, and revenue grew fast.

Best of all, it's been fun. We found a [way of working we really like](/handbook/company/culture) (by design, I may add!), and we've grown by listening to users, and [doing the right thing](https://x.com/posthog/status/1815796915814179137) by them. They talked about it and more users showed up. It was predictable.

Then AI happened. Slowly at first, then all of a sudden, and nothing felt predictable anymore. The turning point for me came last summer. I spent six weeks travelling in California, Hawaii, and Canada, spending lots of time with my family and only a little time working.

One evening, having just put the kids to sleep, I started reading [The Optimist: Sam Altman, OpenAI, and the Race to Invent the Future](https://www.amazon.com/Optimist-Altman-OpenAI-Invent-Future/dp/1324075961) by Keach Hagey. In it, Hagey describes why Sutskever decided to co-found OpenAI. He believed the brain was a physical system that could, in principle, be recreated. It's just a thing, right? We can engineer a thing!

This got me thinking about the gap between the capabilities of an LLM and the human brain, and how AI might shape what we build next.

## The obvious limitations of LLMs

I'm hardly breaking new ground with these observations, but they bear repeating because they matter:

- **LLMs have no innate goal setting.** They mostly predict what text to spit out in response to a prompt. Skills are starting to change this, but it's nascent and primitive. An LLM without a prompt has no purpose.

- **AI is spiky.** Models are incredibly powerful in many ways, but my 2-year-old is still better able to interact with the real world than any robot. He is rounded. He can do the basics of everything, whereas LLMs completely lack certain capabilities.

- **LLMs don't self-improve.** You can fine tune them for specific use cases, but there's no organic improvement. Some disagree and argue ever expanding context windows offset this, but the model weights themselves are fixed unless you proactively do something. The technology around this feels immature to me.

These limitations are a big deal, but they're not inherently unsolvable. It's just stuff. People can build it. There's a massive commercial incentive to do so and enough prior art to convince people to try, and get the funding to do so.

Thinking about all of this in my job as a cofounder of an existing successful business, the implication was that AI will continue to get more powerful. Progress may not be linear, but it will happen.

I returned from my trip knowing I wanted to go deeper on AI product and engineering work, and do as little as possible of everything else. Basically, I wanted to go full founder mode and push the ambition of the AI work we were already doing.

Happily, this dovetailed nicely with what Tim, my co-founder and co-CEO, wanted to focus on. He'd also had a vacation that summer and his reflections took him in a different direction. He wanted to go wide and improve how we execute across everything: hiring, ops, finance, go-to-market, and engineering.

So that's what we did. My goal became making sure PostHog was on top of AI, and Tim made sure I could actually do that and think less about operational problems.

## FOMO came ahead of progress

We'd started by shipping a Clippy-esque chat assistant for PostHog. It could answer some questions you asked, or it could make changes to the page you were viewing, like adding filters to insights and dashboards, but it was a mixed experience.

It relied on agents answering questions in one shot, so it frequently made mistakes. Users would get empty graphs with no data, often because it would choose stale events and properties without context.

FOMO got the better of me and I pushed this in our marketing too early. It felt good enough to be sort of useful, and I felt the pressure of new companies generating gazillions in revenue seemingly overnight – many of them were PostHog customers!

It was a mixed start, but belief remained. We ran regular traces hours, where we looked at LLM calls (hey, you should try [PostHog's LLM Analytics](/llm-analytics)!) and worked out what went wrong when our users had a poor experience. We kept iterating.

The breakthrough was moving to a single query loop architecture, so the agent could iterate and make sense of all the atomic endpoints from our products. Now, if a graph was empty, the agent would question this and try to figure out if a different event or property was better.

Results and feedback dramatically improved. We kept iterating and users started sharing publicly how much they liked our efforts and retention improved.

After a while, we realized PostHog AI had become the best way to use our product in most cases, and we made it the default UX for new users. We also shipped an MCP, so users could query PostHog from their code editors. It's way more popular than we anticipated.

The other breakthrough was our [AI-powered onboarding wizard](/docs/ai-engineering/ai-wizard). It was very basic to start with, but the potential was obvious. Our docs team (we call them Context Engineers now) took over development and the progress has been remarkable. Our wizard can now set up a PostHog project from scratch, defining and implementing events and creating dashboards, 100% autonomously. It's kind of magical.

## What we're working on now

The momentum feels irresistible now and the data backs that up. Last week, the majority of dashboards were created by agents via PostHog AI, MCP, our API, or our onboarding wizard. That's a huge shift and the trend is accelerating – MCP usage is roughly doubling every month.

This trend is forcing us to rethink everything: our core UX, positioning, marketing. Everything. It's the most full-on time since we were getting the company off the ground during our YC batch in 2020. Right now, we're focused on:

### 1) Making PostHog easier for agents to use

Our MCP is already very powerful, but we're shipping skills that will help agents get more out of PostHog. We're also making the MCP much more efficient, so it uses fewer tokens.

We think PostHog's future is headless. You should be able to interact with us through Claude, inside a Slack thread, even via WhatsApp, or from within a video call, and our MCP is a key gateway for that. This is already happening.

### 2) Transitioning from reactive to proactive

Today, PostHog is basically a "chat with your data" layer atop a UI you can dip into when needed. It's powerful, but reactive. The future I imagine is more proactive. It's monitoring session replays, error tracking, and user conversion for problems, and shipping solutions while you sleep. The things you wish Claude Code and Codex could do, but can't because they don't truly understand your product.

There are a ton of things about to start appearing here, such as proactive agentic research on the different data types we track, computer vision on replays, and potentially our own in-house model training to predict and simulate user behavior in future.

### 3) Long-running agents that work for you and get what you care about

We want product development to feel increasingly self-driven by agents that you direct. This requires long-running agents that understand your product and your goals; agents that can take a huge list of problems that need solving and get to work for you, freeing you up to focus on more strategic work.

Our long-running agents will likely have global skills and context specific to you based on your codebase, your website, and your git history, for example. PostHog is already where your product context lives, and we want to enhance that in every way possible.

## Turning PostHog into a doing company

This is the common thread connecting all this work. The PostHog of the future isn't read-only analytics. We want to solve the low-level tasks in building software, the less creative but important work, so you can spend more time on high impact work.

We want [PostHog to code in response to problems we find](/code), taking users straight to the solution, and to handle support tickets given we already have all the context of what went wrong, and lots more! Watch out for an announcement about this soon.

These are big bets and our UX will be in flux as a result for a while. I'm sorry if the changes here are aggravating, but your feedback, the data, and our subjective experience suggest a little short-term pain will be worth it.

Growth has been fairly nuts, recently. We're getting back-to-back record weeks of signups, revenue growth and so on. The things we ship in the coming weeks and months will (hopefully) 10x that growth, and I can't wait to see how users get on with all the cool new things we're shipping.

<NewsletterForm />
