---
title: Why Zealot switched to PostHog from Amplitude and BugSnag
customer: Zealot
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/logo_zealot_light_de961d2a17.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/logo_zealot_dark_c10566a321.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/zealot_posthog_error_tracking_14fb1ab6cb.jpg
industries:
  - Recruitment
users:
  - Engineering
  - Leadership
  - Founder
toolsUsed:
  - LLM observability
  - Session recording
  - Error tracking
  - Product analytics
date: 2025-04-02
---

As CTO and co-founder of Zealot, an AI-powered customer activation platform, Brandon Jakobson often sweats the details of product improvement. He’s constantly thinking about how the team can scale faster, ship more, and do more for users. 

“I’m deeply passionate about it and I have a lot of ideas for the future,” says Brandon. “How can we make sure our systems are always up, and that we’re always getting faster? Truthfully, it keeps me awake at night.”

Knowing product analytics are essential for making such decisions, Brandon initially installed both Amplitude and PostHog side-by-side. PostHog had initially been personally recommended, whereas Amplitude was the traditional tool for many of the large enterprises that use Zealot’s software. 

“Our customers are enterprises and they all use Amplitude, but I personally just love PostHog,” says Brandon. “One big difference is that when I’ve needed help with PostHog I get through to people like [David](https://posthog.com/community/profiles/30203) — the actual engineers building the tools, not a customer support agent.”

“Plus, [Amplitude](/blog/posthog-vs-amplitude) was very clunky and it was missing data points. We would notice it was having a hard time capturing some things when we used it in parallel with PostHog. Using PostHog just became second nature and we felt it was definitely exceeding Amplitude.”

As a result the team quickly doubled down on PostHog and Brandon immediately started inviting more of the team to use it. 

<BorderWrapper>
<Quote
    imageSource="/images/customers/brandon.png"
    size="md"
    name="Brandon Jakobson"
    title="Co-founder & CTO at Zealot"
    quote={`“I’m so glad you guys don’t price based on seats. As soon as I realized that, I invited my whole team.”`}
/>
</BorderWrapper>

## Switching from BugSnag to PostHog

As Brandon’s team got more familiar with PostHog, they steadily uncovered new features and how it could simplify their stack even further. Again, a personal recommendation helped Brandon discover a key feature he now uses every day — [error tracking](/error-tracking). 

Initially in beta, error tracking has since been released into general availability — and Brandon’s feedback even helped shape the eventual release despite the fact that Zealot was initially using BugSnag. 

“BugSnag was bought by a company called Smartbear and... their tooling was just really old,” explains Brandon. “Like, really old. Ancient, and ugly. But we put up with it because it did the job and we could get notifications about new errors.”

Responding to these BugSnag alerts caused a lot of friction, however. Brandon and his co-founder, Srikar, would spend inordinate amounts of time sifting through logs, cross-referencing timestamps, and investigating issues — all without knowing if they were looking at an “error”, or an **error**.

“Javascript throws errors for anything,” says Brandon. “If the wind blows, it’ll error. And we never knew if a user had encountered an actual visible error, or if it was just something unimportant. We’d have to look through all these details every time without even knowing if it was something we needed to fix.”

“But when we tried PostHog? Holy crap. I decided right then to switch. I was immediately confident in making the pull request straight away to remove BugSnag and Amplitude from our codebase completely.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/brandon.png"
    size="md"
    name="Brandon Jakobson"
    title="Co-founder & CTO at Zealot"
    quote={`“I can look at an error and see everyone who had it, then view their replays, in two clicks. That’s the part about PostHog that’s so cool: you get all these tools for free and the more you use, the more powerful they become.”`}
/>
</BorderWrapper>

## What is Product OS anyway?

A major reason Brandon was willing to make this switch was due to the way PostHog tools are interoperable and can be seamlessly used in combination. 

You can, for example, get an [alert](/docs/alerts) about an [error](/error-tracking), view a linked [session replay](/session-replay), and jump from there to a view of [the individual person](/docs/data/persons) or [the organization they belong to].

You can even use [Max AI](/docs/max-ai), the in-app AI agent, to search for similar errors and recordings using natural language.

“That was one thing I really liked in Amplitude,” says Brandon. “They have this AI you can chat to and I was saying that if PostHog released that then that’d be huge... but then I found out you guys have it too and it was so easy to [get into the beta for that](http://app.posthog.com/home#panel=feature-previews) and to start using it.”

“This is one of the things I love most about PostHog, that you have so many tools in one place and they all work together. It makes it a no-brainer for you to install PostHog early on and then, when you get to the point where you need a new tool or to get serious about your data — everything you need is already there.”

“We’re about to launch a whole suite of AI tools, for example. And it’s so great knowing that [LLM analytics](/docs/llm-analytics) is going to be there for us when we’re ready.”
