---
date: 2023-09-28
title: Burning money on paid ads for a dev tool – what we've learned
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - charles-cook
featuredImage: ../images/blog/transparency.jpeg
featuredImageType: full
category: Startups
tags:
  - Guides
---

Since starting PostHog in 2020, we’ve learned a bunch about what does and doesn’t work when it comes to [marketing to engineers](/blog/dev-marketing-for-startups). Paid ads is a slightly scary area because it is _very_ easy to waste a bunch of money doing stuff that doesn't work. And a lot of it doesn't work. 

This article shares specific, actionable advice for early-stage startups building dev tools in particular. I'm assuming that you've already decided that running paid ads is something that makes sense for your company. 

I've split this into two sections – general misconceptions and then what we've learned, channel-by-channel. 

## Clearing up some misconceptions

### Paid ads =/= marketing

Paid ads are a _subset_ of marketing. Every time you talk about your product in _any_ kind of context, you are doing marketing. This includes your website, turning up to events, writing content, posting on Twitter, chatting in an external Discord group, creating a YouTube tutorial, etc.

This means taking paid ads seriously (because of the $$$), but don't spend all your time here. At PostHog, paid ads take up ~10% of our marketing team's time in an average week. We spend 80%+ on writing. 

### All paid ads are basically the same

Very crudely, your ads will have one of two objectives – _conversion_ or _awareness_. 

Conversion means that you want people to click on your ad and then do something like sign up for your product. You can define conversion how you like – this is just a typical example. Conversion is easy to measure, which is why marketers like it. However, you are generally only _capturing_ demand from people already aware of your product. 

Awareness means you want people to see your ad. Maybe they won't click on it – that's ok. Your objective is to just get the word out so that someone is exposed to your product enough times that at some point they Google 'super cool product' and come sign up. Awareness-based ads are a small part of _creating_ demand. This takes more effort to measure, but is totally possible - see below.  

We split our budget 50-50 between the two. This is not a 'rule' – just don't spend it all on conversion. 

### Paid ads don't work on developers

Everyone who works at a tech company basically thinks they are immune to ads because they are super good at internetting, and have never seen an ad for a new product, clicked on it, and then signed up. Your _quantitative_ attribution data in PostHog, or whatever analytics tool you are using, will seem to back this up. 

This is why we ask all users where they heard about PostHog whenever they sign up or book a demo – it's a simple (optional) free text field. Enough of our users say 'ad on Google' or similar that we know paid ads do actually reach a large chunk of them. Especially ones with money to spend on behalf of their company. However, you need to take the time to collect and digest this _qualitative_ attribution data in the first place. 

### An agency will solve all your problems

I'm a big fan of hiring an agency if you're a startup – paying $5-10k/mo for a small, outsourced team is way more efficient at this stage than hiring one paid ads specialist. Look in Europe – US agencies can be 2-3x more expensive. We use [Hey](https://www.heydigital.co/) and like them. 

_However,_ I really recommend you get personally familiar with each of the main channels I've listed below first. Working with an agency isn't just set and forget – you need to constantly give feedback, ask questions, and suggest new ideas if you want to get the most out of them. 

I personally like [the Demand Curve course](https://www.demandcurve.com/growth-program), which will give you a great grounding in all the major paid ad channels – it helped get us off the ground and means we're much better equipped to give our agency feedback. Outsource the legwork, not your critical thinking. 

## Channel-by-channel tips

This is not a comprehensive guide on how to set up each channel (use Demand Curve or similar for this) - these are just some non-obvious things we wish we'd known at the start. 

### Google Search

- Good for conversion, bad for awareness.
- Do not let Google enable any of their bullshit AI-type suggested/dynamic/whatever keyword generator tools – they always result in weirdly worded ads that were clearly not written by a human. Use your _own_ research about what keywords your target user is likely to search for, not what Google suggests.
- If you have an SEO article that ranks well (top 3) make sure you aren't bidding on the same keywords – it's wasted money.
- Bidding on your own brand may feel like a waste of money, but it's super cheap and defends you against competitor ads. 

### Google Display

- Good if you a) want to attract bots and irrelevant 'conversions', and b) you want zero control over where Google actually shows them (hello spammy healthcare Android apps!).
- Do not be seduced by the incredible cheap cost per acquisition (CPA).
- Avoid. 

### Twitter

- Good for awareness, bad for conversion.
- We prefer promoting our own organic tweets over creating specific ads - promote an individual (e.g. founder) over the company account for better engagement. 
- Good paid channel for reaching devs generally.
- Cheap but the targeting is quite basic (Twitter make you think it's much more sophisticated than it is).
- Turn off replies to ads (or have thick skin!)

### LinkedIn

- Good for awareness, bad for conversion.
- It is very easy to do ads that stand out here because 90% are so boring and corporate.
- Good paid channel for reaching founder-type devs – and people who are more self-promotery, basically.
- Expensive but hands-down the best targeting of any platform. 

### Reddit

- Very cheap but poor for awareness or conversion. Very rudimentary ad tools.
- Instead, invest the time in being an active member of relevant subreddits where you contribute actual value to those people. This takes a lot more work.
- Redditors hate ads nearly as much as HN readers do. Nearly. 

### Quora

- Dark horse – good for conversion and awareness.
- Quite cheap, good targeting.
- Seriously, I don't know why more people don't use Quora. 

### Product Hunt

- Good for awareness and conversion _if_ you have a cheap (<$10/mo) product.
- Full of indiehackers/entrepreneurs/wannapreneurs, most of whom do not want to spend any money.
- Kinda ok targeting but the majority of the audience is non-technical - tread carefully. 

### Carbon Ads

- Expensive. Lots of people rave about them. We don't.
- We got neither awareness nor conversion when we ran campaigns there.

### Bing

- Fun fact – this is the only route to advertise on DuckDuckGo!
- Unfun fact – you can only advertise on the Bing ads network, and they decide where the ads go. You can't say 'serve ads on DuckDuckGo only'.
- Quite cheap. Good only if you want to target users at large enterprises where they are forced to use Bing. 

### Sponsoring newsletters

Not 'paid ads' in the traditional sense, but I wanted to share a few creators who write genuinely good content and we've had success working with. You're looking at $1,000-$10,000 per issue depending on reach. Aim to do short bursts of activity, not long-running campaigns (as you'll saturate their audience):

- [TLDR](https://tldr.tech/)
- [Pointer](https://www.pointer.io/)
- [Bytes](https://bytes.dev/), [React newsletter](https://reactnewsletter.com/)
- [Tech Lead Digest](https://techleaddigest.net/), [Programming Digest](https://programmingdigest.net/)
- [Software Lead Weekly](https://softwareleadweekly.com/)
- [Architecture Notes](https://architecturenotes.co/)
- [Hackernewsletter](https://hackernewsletter.com/)

Smaller newsletters that we also have supported:

- [Level Up](https://levelup.patkua.com/)
- [Console](https://console.dev/)
- [FOSS Weekly](https://fossweekly.beehiiv.com/)

### A couple we haven't tried yet

Over the next few months, we're planning to try out paid ads on G2 and Stack Overflow. We think G2 will be useful for reaching larger companies who are running more formal processes to replace their tools by trying several options first. Stack Overflow we have heard is (anecdotally) good for general awareness-building, but not conversion. Both are quite expensive but very focused options to consider for dev tools. I'll update this article with our findings!

## How to get started with paid ads

Experiment, experiment, experiment. Start by running 2-3 small experiments at a time across multiple channels. Each experiment will need ~$500 and 2 weeks to run to get meaningful data. 

Which channels to start with depend slightly on the type of product you have. If you're completely unsure, I'd go:
- Google Search – brand keywords (ie. your product's name)
- Google Search – relevant keywords to your product
- Twitter/Quora – cheap awareness campaigns

Then you can branch out into other channels. For reference, at PostHog we got Google, Twitter, and LinkedIn going in the first couple of months, and then focused on getting good results from them. After that, we added new channels slowly - every 3 months or so - to make sure we were still doing a good job on existing channels. 

## Moar reading

- Make sure you're covering [all your marketing bases](/blog/dev-marketing-for-startups).
- Read about [how our marketing team uses PostHog](/blog/posthog-marketing).
- Check out [PostHog’s Marketing Handbook](/handbook/growth/marketing) – and copy it if you want to!

> **If you enjoyed this article**, [subscribe to Product for Engineers](https://newsletter.posthog.com/), where we share more like this every two weeks or so.
