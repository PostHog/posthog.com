---
title: Behind the scenes of a billboard campaign
date: 2026-11-16
author:
  - liam-graham
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImageType: full
ogImage: generated
category: Inside PostHog
tags:
  - Marketing
  - Inside PostHog
seo:
  metaTitle: Behind the scenes of a billboard campaign
  metaDescription: How we bought, designed, got approval for, and measured a London billboard campaign aimed at developers around Old Street and Shoreditch.
---

As a mostly normal person, I always figured billboard campaigns were a huge waste of money for whatever company did them. That was until my comrade Charles came to me and said “I’m gonna be off for a month, so someone needs to take over our London billboard campaign”.

Suddenly, I was thrust into the role of managing how we executed a campaign that cost us approximately $400,000. I felt no pressure, since money is fake, but it was a lot to sort out.

Here’s a peek behind the curtain at how this sort of thing actually comes together.

## The buying process

First, Charles had to actually buy the inventory. He was advised to deal directly with the owners of the inventory rather than going via an agency. That meant getting in touch and negotiating directly with [Global](https://global.com/) for underground & station placements, and [JCDecaux](https://www.jcdecaux.com/) for above-ground.

The latter spend matches in your first year, and if it’s the first time an organization is advertising with them, payment is due upfront. That meant going to finance with a relatively complex £300,000 bill, which thrilled the entire team.

The goods and services exchanged for that money amounted to more than 3,000 tube card panels, above-ground placements (bus shelters, train stations, and billboards), and a big chunk of space in Old Street Station for two weeks.

We negotiated and purchased where we were gonna put the advertisements at the end of July, for a go-live date of late September/early October, three months before we had a design.

The objective was to plaster the brand around Old Street and Shoreditch, because it’s London’s startup hub. Our Ideal Customer Profile (ICP) is AI-pilled developers working at high-growth startups, hence why we chose that area over somewhere that just had maximum foot traffic.

## The brainstorming process

We have a small, invite-only Slack channel for billboard campaigns, where feedback goes. This runs against the grain of everything being public at PostHog, but in this specific instance, it helps keep out excessive noise and let those in charge make decisive calls.

I began by throwing out some very bad ideas for what we could go with. I, you see, think our name is hilarious and that we should lean into its colloquial meaning. Smarter people than I in the aforementioned group, however, disagree and think it’s a bad idea.

A few failed word docs with copy headlines and healthy disagreements later, it was settled that Lottie, our lead designer extraordinaire, and I would work on an idea that was already proposed weeks earlier by the exec team: a mock newspaper campaign. We’d draft inflammatory, fictitious news bits which our [ICP would chuckle at](https://x.com/camjodev/status/2105592791690809351).

Because the format is so copy-heavy, we were able to stuff several developer/builder culture inside jokes into every single asset. Since we didn’t care if the [average person understood](https://www.linkedin.com/feed/update/urn:li:activity:7516988578447675392/) the ads, only our ICP, that’s who we aggressively [tailored them for](https://x.com/tubeadcritic/status/2109902120568627394).

That nugget above changed my perspective on how I read billboard ads, and wrote for this campaign.

If an ad’s target audience feels something, nothing else matters. If a territory sales manager who eats crayons for dinner sees someone bowling in a Zoho CRM ad and thinks “*I* strike value”, that awareness campaign has done its job. The average joe on the street doesn’t need to understand it.

## What we designed

With copy in hand, Lottie got designing, choosing some classic British newspaper templates to imitate-while-not-crossing-the-line-of-getting-us-sued-for-copyright.

![Four mock newspaper posters on a tube platform, with headlines including "AI wrote this" and "CTOs forced to ration AI slop"](/images/billboard-campaign/newspaper-design-1.jpg)

![Four more mock newspaper posters on a tube platform, with headlines including "I married AI slop and I'd do it again" and "Permissions skipped dangerously"](/images/billboard-campaign/newspaper-design-2.jpg)

Where we settled was newspapers that had an air of some iconic publications, but with exclusively PostHog branding used in text spots. Harold of hide the pain fame became our story subject in all the stories once we realized that all of his photos are licensable.

![A PostHog logo billboard with Harold giving a thumbs up, next to a "Vibe coders reach agreement with AI" poster on a tube platform](/images/billboard-campaign/newspaper-design-harold.jpg)

There are a lot of rules for what can and can’t be used in advertisements on transit, particularly in the UK. We had to delicately tiptoe around some guidelines. “VIBE CODER KILLS PRODUCT” as a headline was funny, but didn’t make it through, for example.

Those rules also meant we had to have designs finalized even earlier than the submission deadline (three weeks): TfL response times can vary, so baking in an extra week for them to review assets was a strategic necessity.

![A "CTOs forced to ration AI slop" newspaper poster in a bus shelter at Shoreditch High Street station](/images/billboard-campaign/bus-shelter.jpg)

On more than one occasion, we were told something was rejected, asked again, and had it approved. Turns out you can just keep saying “can you check again” and the answer might change.

From beginning to end, the process of designing all of our assets took about 3 weeks. Most of this was spent working asynchronously, but about a week out, we had a couple of 2 hour video call jam sessions, where we made decisions together in real time.

Some involved deciding to pivot late on to a more simple, meme-flavored visual when we surmised that some placements weren’t conducive to newspaper print. That is how we ended up with this, a real photo:

![A large digital billboard at Old Street roundabout showing the PostHog logo and Harold giving a thumbs up](/images/billboard-campaign/meme-billboard.jpg)

## Stonks = up?

Back to my very first observation: how were we supposed to measure ROI? Fortunately, we had a couple of previous examples of how people did this, so I created a dashboard in PostHog (plug!) using a mix of lessons we learned from each using this prompt and some fine-tuning:

```
I've been running point on a London billboard campaign that we'll be rolling out soon.

Charles has sauced me this dashboard that he built to track our last billboard campaign: [link]

Ian also had a dashboard for previous billboard impact measurement: [link] Charles' takes precedence as the more recent example.

We also have this retro to go off of: [link]

Help me build a new analysis dashboard for this London campaign, step by step. Explain what KPIs were tracked in Charles and Ian's dashboards, and what we should keep or newly include.

October 5th to November 1st is when this will be running. We have placements primarily in and around Old Street Station.
```

I was thrilled with the depth of detail the bot went into for me. Charles then proceeded to tell me to delete all but five of the measures. Keep it simple.

This is the dashboard we have set up now:

![The PostHog dashboard for the London campaign, comparing weekly sessions and direct traffic in London against the rest of the UK, with Google search interest and signups that mention the Tube](/images/billboard-campaign/dashboard.png)

The unsatisfying truth is that the answer to “were billboards worth it?” is 70% vibes-based, since awareness is the goal.

Billboards are just one touchpoint on the way to a customer picking a product. We won’t be able to track every user that may have seen an ad, looked us up, and then a month later when they needed an all-in-one product analytics and warehouse provider for their app or website, signed up. Billboards can also help existing customers feel more strongly towards a company.

They’re a tool in the advertising arsenal; most useful when the rest of your army is fighting well on other fronts.

## Platform \~synergy\~

It was very helpful that my day job is social media: I was familiar with every asset and placement we had when social media mentions would pop up. This enabled some really good social wins for us, like when this rider almost got our ad yanked from a Metropolitan line train for looking like a fake ad:

![A post on X where TfL replies to a photo of our tube ad, saying it doesn't look like an official advert, and PostHog replies "mate we paid a lot of money for that"](/images/billboard-campaign/tfl-tweet.png)

We didn’t necessarily plan for this, but it certainly helped us boost awareness, and I’ll from this point forward insist on content teams being briefed before any OOH campaign goes live. I hope that, and the info shared above, is a nice takeaway for if you ever choose to run billboard ads, dear reader.
