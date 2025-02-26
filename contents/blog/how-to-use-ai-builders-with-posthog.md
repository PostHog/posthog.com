---
date: 2025-02-25
title: How to use AI builders with PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["Kevan-Gilbert"]
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/ai_builders_and_posthog_9549411880.png
featuredImageType: full
tags:
  - AI 
---

Today's fleet of AI builders (like [Lovable](https://lovable.dev/), [Bolt.new](https://bolt.new/) and [Replit](http://replit.com/) and others) can help developers get up and running quickly with testable prototypes. Where previous generations might have had garages as the birthplaces of legendary startups, this decade's startups will be founded inside a Waymo on a 30-minute commute. We've seen this speed-building on display during the recent PostHog-sponsored [ElevenLabs Worldwide Hackathon](https://hackathon.elevenlabs.io/).

Once you've got that prototype built, though, there's a whole journey ahead: ship it, test it, learn from it — and build it into a successful product. That's what PostHog is for.

#### How does PostHog tracking work with AI builders?
PostHog is out-of-the-box compatible with most AI builders, and instructions can be found in our [getting started guide](/docs/getting-started/install?tab=snippet). 

More technical users will also find value in [LLM observability](/docs/ai-engineering/observability), so if your app is making its own calls to LLMs, you can better track the costs and performance.

#### Why use PostHog to track and test your AI-built prototype?
By bringing your AI-built prototyping into PostHog, you will:
- Get a window into customer and user behaviour
- Make sure your iterations and changes are grounded in user insight, rather than whim alone
- Stick with your prototype and learn how to improve it, rather than walking away when it gets hard.

It's the "now what" part that PostHog helps with.

### 1. Learn how users think
Connecting your new app with PostHog can give you tons of insights into human interactions. My personal favourite is [session replay](/session-replay), as it gives me a better sense of how actual users read, click, mouse, type and think about what I've made, as if time froze. It's not quantitative analysis of bulk user activity, but that qualitative view feels like I'm sitting down with a visitor in old-fashioned user testing sessions. It allows me to immediately make iterations based on misunderstandings and mis-clicks.

Our friends at ElevenLabs told me a story about how they integrated PostHog on their public site, and launched some PostHog surveys. But early responses were strange: users were typing gibberish, funny stories — one user even pasted in an entire scriptural text! — but these were definitely not survey responses. It was baffling. It wasn't until they looked at PostHog session replay data that they realized why users were doing this. Users came to their site expecting to interact with ElevenLabs popular text-to-speech features. When they saw the bottom-right-hand-corner survey windows, they assumed that was the text-to-speech box! (Solving the problem became as easy as updating the instructions in a text label.)

### 2. Explore integrations
In our current moment, AI builders don't often connect natively to other apps. Agentic workflows are changing this, but as of this writing, it will be the work of developers to create third-party connections. It's in the integrations layer that you're likely to unlock more value for your users, and offer features that are game-changing. We recommend our friends Moe's work at [Pica](https://www.picaos.com/), who has already been building integrations into Lovable and other platforms, that will allow you to level up your AI prototypes. (Yes, there's a PostHog integration in Pica!)

### 3. Build a business

Your AI builder has just given you a huge gift. You moved from idea to demo in the time it used to take a two-person founding team several months to accomplish, without requiring a pre-seed investment round or a diet of ramen noodles. You did it in an afternoon. 

The work of a moving from idea to demo is great — and yet, it’s also only the start of an important journey:

```Thinking of a great app idea < Building that product < Shipping that product < Finding real users < Finding product market fit < Building an enduring company ```

Our journey as a company has shown us success doesn’t come from code alone: it’s through a unique-to-you mix of pivots, partnerships, investment, luck and plain old love for what you’re doing. We’re excited the new fleet of accessible AI builders are getting more people into building products — and, we invite you to see this as just start of a story, one where you can keep growing. [PostHog’s handbook](/handbook/) is a great place to start. 

### 4. Don't delete until you've learned something

"I'm not planning on building a successful business in software," you might say. "I was just messing around with AI tools."

We see this attitude a lot with AI builders. The tools help creators quickly express an idea — and then walk away. They've made a throwaway experiment. Their curiosity was satisfied. **They were their own audience.**

There's nothing wrong with a pivot, with failing fast, with learning by shipping. But "build and abandon" is not a strategy for learning or success. Walking away from a prototype, before you’ve even gathered meaningful data about what’s working and what’s not — that’s a missed opportunity. 

**If you're going to build, learn something from it.**
In his book Principles (which [influenced us](/handbook/story) greatly), Ray Dalio talks about getting in the habit of recording his observations and insights from every decision he made. In your case, you've just built in AI. What did it reveal to you? About the problem space, about coding and development, about users, about building a business, about yourself...the rapid development cycles can get you insights faster, but only if you're paying attention.  Note these down so the next challenge you move onto, you're more likely to succeed in your experiments.`