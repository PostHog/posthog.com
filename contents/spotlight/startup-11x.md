---
title: How 11x runs their entire AI company with PostHog
date: 2025-03-11
author:
  - kevan-gilbert
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/11x_4957aaa87c.png
featuredImageType: full
category: Startups
---

# How 11x runs their entire AI company with PostHog

PostHog is the everything-platform that AI company 11x uses to run their entire operation - from engineering to product to sales.

It's in their engineers' workflows: "Customer encountering an error? Check the PostHog replays."

It's in their leadership mindset: "Got a goal to meet? Track it in PostHog."

It's even on physical screens at the front of their office: live PostHog dashboards showing the company's North Star metrics.

## From basic tracking to company cockpit

11x builds AI digital workers that handle sales tasks like email outreach and customer calls. With hundreds of customers each training and supervising automated agents, they need powerful tools to track performance across their platform.

"When I first started at 11x, PostHog wasn't being leveraged at all," explains Keith Fearon, Head of Growth. "But with PostHog, what you put into it is what you get out of it."

Keith started by unifying their Salesforce data with product usage data in PostHog. This connected customer "break clauses" with actual product activity, allowing the team to see links between usage patterns and customer retention.

"PostHog gives us almost a cockpit for our customers and our product," he says.

## Session replay: "Like time travel" for engineers

At 11x, engineers rely on [session replay](/product/session-replay) to quickly solve customer issues instead of building complex error logging systems.

"PostHog is like time travel," says Keith. "Otherwise we are banging our heads against the wall, spending days trying to debug."

In one case, when a customer complained about unexpected behavior, an engineer reviewed the session replay and discovered the customer had changed their own app settings and forgotten about it.

"We hadn't even thought about this," Keith explains. "We can just rewatch. All of our engineers use it now. It saves us building out error logs. We just rely on PostHog to be our timeline activity log."

## Security monitoring

Session replay even helped 11x identify and stop a security breach attempt. The team noticed 85% of their platform usage was coming from one small customer.

"I could see they were trying to make unauthorized API calls to our platform," says Keith. "When we kicked them out, they threatened to sue us - but we were able to use our console logs to show their activity and prove they had violated our terms of service."

(It should be noted that while Keith’s use is ingenious here, PostHog can’t legally guarantee that you, too, will be able to stop hackers at home.)

## Consolidating tools, saving money

Before standardizing on PostHog, 11x was using a mix of tools:
- Custom-built feature flags
- HotJar for session recordings
- FullStory for product analytics

"It was a hodgepodge of tools we were able to consolidate into one," Keith says. "And PostHog is the same price as each of them individually."

## North Star metrics on display

Keith's favorite use case is their office dashboard display. An automation runs daily to pull North Star metrics from PostHog to TV screens in their office.

"Every day, it's so motivating to see that go up," he says, pointing to a rising graph of customer meetings booked. "The most exciting thing is, if it's not going up, I can do something about it."

## What's next for 11x and PostHog

While 11x is getting tremendous value from PostHog, Keith feels they're "barely using it." They haven't yet implemented [surveys](//surveys) or [A/B experiments](/experiments), and only recently discovered [LLM observability](/docs/ai-engineering/observability) - particularly relevant for an AI company.

As 11x continues growing (they've relocated from London to San Francisco, raised $76 million, and now serve nearly 600 customers), PostHog remains central to their product-led approach.

## Build your own office dashboard

Want to create an office metrics display like 11x? Here's their setup:

**Ingredients:**
- One Mac mini
- One external display
- One PostHog dashboard (11x uses their North Star metrics dashboard)
- A script to refresh at your preferred interval

**More success stories from PostHog for Startups**
- [How BeforeSunset AI achieved 'Product of the Month' on Product Hunt](/spotlight/startup-before-sunset-ai)
- [How Bugprove uses influencer marketing to grow word of mouth](/spotlight/startup-bugprove)
- [How Risotto got into Y Combinator and built an AI product](/spotlight/startup-risotto)
