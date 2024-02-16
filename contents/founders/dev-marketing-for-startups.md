---
date: 2023-02-16
title: Dev tool marketing for early-stage startups – what we’ve learned
author:
  - charles-cook
featuredImage: ../images/blog/transparency.jpeg
featuredImageType: full
tags:
  - Founders
  - Marketing
crosspost:
  - Blog  
---

Since starting PostHog in 2020, we’ve learned a bunch about what does and doesn’t work when it comes to marketing to engineers. There are plenty of articles about ‘developer marketing’ out there, but most of them are either generic or focused on late-stage companies. 

In this intro article, my intention is to share specific, actionable advice for early-stage startups building dev tools. I’ve bucketed advice into pre- and post-[product-market fit](/blog/product-market-fit-game).

I’ve also included a couple of channels that we haven’t nailed, but know other successful dev tool companies consider important. We’re still learning, and definitely haven’t figured everything out!

## 🤔 Pre-product-market fit

### Compete on content depth, not breadth

Trying to go head-to-head with much larger competitors on content output is a losing game, so focus on quality instead. You are not Cloudflare (yet). 1 great article >>> 25 mediocre ones. Quality is more important than hitting an arbitrary content schedule – and makes the writing process a lot more enjoyable. In terms of types of content, we write approx. ⅓ SEO articles, ⅓ tutorials, ⅓ anything goes. 

High quality pieces perform better in the long run, especially SEO ones. Treat your SEO portfolio like a VC treats their investments – invest time updating your best SEO pieces, don’t just write something and forget about it. 

### Ask yourself ‘is this content _genuinely useful_ to a developer?’

This applies to _everything_ you write. SEO articles are not exempt from this rule – saying ‘oh it’s SEO so being useful is less important so long as we have good keywords’ is bad marketing. If you wouldn’t be proud to share the content on your personal site, you shouldn’t publish it. 

### Treat your website like a product

This means keeping it separate from marketing, which is the opposite of what most companies do. While our marketing and website teams work closely together, the website team has the final say on what appears on posthog.com. This stops the website becoming too marketing-y and falling foul of marketing ‘best practices’ that most developers (and people in general) despise.   

### Be really careful about outsourcing

You should outsource the stuff that you can’t do internally, not the stuff that you can do but don’t have capacity for. If you don't, you'll spend an inordinate amount of time managing a freelancer – when this goes wrong, it's harder work than just doing it yourself. 

For example, we work with a freelancer on [deep dive technical topics](/blog/clickhouse-vs-postgres) that are interesting to our users but not strictly about PostHog itself. However, we’ve wasted a bunch of time hiring freelancers to write mediocre SEO content that we should have just done ourselves. 

### Enforce code reviews on your content

Every single piece of content at PostHog is edited by at least one other person. The writer has final say on what gets shipped, but it is everyone’s responsibility to give each other feedback. 

Line edits are easy and less useful feedback to give. Instead, start big picture and then go into the detail. If the article isn’t genuinely useful or interesting, punctuation doesn’t matter. Feedback can include ‘ditch this article entirely, it’s not working.’

### Hacker News is a double-edged sword

We’ve found that hitting the front page results in a giant, ego-boosting traffic boost, with a noticeable but small signup boost. It’s not dependable though – even if you’re great at it, you’ll have a 1 in 10 hit rate. You need to graduate to repeatable marketing at some point. 

Don’t upvote your own content, and don’t ask other people to – post it and pray. There are no secret tricks.

### Beware the attribution mirage

You can’t rely on UTM parameters to tell you where a user actually first heard about you. Example: user reads an article about PostHog on Hacker News -> searches 'posthog' -> clicks on a Google Ad. Our analytics will tell us "wow, Google Ads are awesome!" But that’s not the whole picture. 

In your product signup flow, include an optional free text box asking people where they first heard about you. About 10% of signups usually fill this in. Read the data and report on it every week. It’s manual but vitally important info.

## 🚀 Post-product-market fit

### Hire a developer who loves writing onto your marketing team 

You do not need a whole team of developers writing content, but have at least one to cover the more technical stuff (inc. tutorials). They’ll also help keep you connected to your users and not focused on purely top-of-funnel or general types of content. This has made a huge difference to the breadth of product content we’re able to cover. 

### Paid ads are not all bad 

Paid ads can be a useful tool for learning quickly if you are building a consumer app, but _not_ for dev tools (see ‘attribution mirage’ above), which is why I’ve put them in post-PMF. It is very easy to spend tons of money on shit, especially in Google Ads. NEVER USE THE DEFAULT SETTINGS on Google, LinkedIn, and Twitter especially. 

Hire a cheap agency – $5k/mo is achievable, especially if they're just managing channels and creative, and not throwing in 'value add' services like landing pages and SEO strategy. Don't hire an agency based in the US – they are triple the price. We aim to be 7/10 at paid ads, not amazing. Focus that energy on your content instead. 

Google is good for conversion, while LinkedIn ($$$), Twitter ($$), Reddit ($), and Quora ($) are good for general awareness. Avoid Product Hunt if you sell something that costs > $10/month (you’ll get loads of signups, but they hate spending money). Carbon Ads is very expensive and was a waste of time for us. 

### It’s ok to waste money on sponsorships

They are generally quite expensive, but unfortunately you need to spend money to learn here. Newsletters are the best place to start – they can be highly effective once you find the right one. Ask your engineers and users what newsletters they actually read, then sponsor those. Do bursts of activity – e.g. 3 months on, 3 months off. Switch up the copy so you don't exhaust the audience.

YouTube and podcasts are hard and a _much_ more expensive way to reach developers. Most dev-focused content on YouTube is for people learning to code, so beware.

## 💬 Two things we haven’t figured out yet

### Events are 10x more work than you think 

Don’t host your own – you do not have the budget to do this well. Do attend others though, if you have someone on your team who loves doing them and is an engineer. Sending marketing people to events only is not leveraged enough. For now, we give our entire team budget to attend events on PostHog's behalf and leave it at that. Sponsoring events is disproportionately expensive – and if your name appears on the same level as Google's, you are definitely wasting your money. 

### It's ok for other companies to be much better than you at social media

We’ve tried a few channels and are seeing promising results on Twitter, but it’s too early to share concrete feedback. One thing we have learned is to not try multiple channels at the same time – you just feel like you’ve done an ‘ok’ job at everything, and you don’t truly learn what works. We’ve found posting from personal accounts 10x more effective than posting from the company account. Bear in mind that the companies that do an excellent job at social media put _a lot_ of work into making it look effortless – don't underestimate the effort required. 

## What next?

- Read about [how our marketing team uses PostHog](/blog/posthog-marketing).

- Check out [PostHog’s Marketing Handbook](/handbook/growth/marketing) – and copy it if you want to!

- Have money? Hire someone who can write content and has a deep understanding of SEO. Do not hire an SEO consultant. Don’t have money? Learn how to SEO good with [Ahrefs](https://ahrefs.com/seo) (chapters 6 and 7 are wayyy less important).

- If you want to start doing paid ads, I can personally recommend [the Demand Curve program](https://www.demandcurve.com/growth-program) – it helped get us off the ground and gives you a solid understanding of how to manage your paid ads agency when you hire one.
