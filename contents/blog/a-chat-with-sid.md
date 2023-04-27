---
date: 2020-08-03
title: The Early Days of GitLab - A Chat with Sid Sijbrandij
rootPage: /blog
sidebar: Blog
showTitle: true
author:
  - james-hawkins
hideAnchor: true
category: Startups
---

It gets pretty easy to idolize the superstars of tech. One of the coolest things we've learned is that many of the most successful founders will find time to talk with you. To put this in context, GitLab is one of the world's leading open core companies, worth $2.75B. Kind of a big deal. We wanted to learn even more than we could discern from their handbook.

[Sid Sijbrandij](https://twitter.com/sytses), founder and CEO of GitLab, and has always been an inspiration to PostHog. Their culture gave us the confidence to build PostHog all-remote, and it influenced the style of product we're building. Once we saw Sid had [liked a few of our releases](https://twitter.com/PostHog/status/1288563434641072131) on Twitter, we thought we'd ask a friend of a friend to connect us.

After all, he's been featured in [Wired](https://www.wired.com/story/hybrid-remote-work-offers-the-worst-of-both-worlds/) and [Forbes](https://www.forbes.com/sites/cognitiveworld/2020/04/21/tips-from-gitlab-on-remote-work-for-innovative-teams/#537e9f0f4fae), so PostHog felt like the next step up.

## What we talked about

The call started late on a Friday afternoon. A Zoom backdrop with the tiled images of the entire GitLab [1,288 person team](https://about.gitlab.com/company/team/org-chart/) appeared and then did Sid with a glass of water. In true GitLab fashion, there were also two Product Managers on the call two as part of their shadowing program. He was remarkably concise, transparent and happy to answer anything at all. It was also evident that Sid has an encyclopedic knowledge of the GitLab handbook. The GitLab product perhaps isn't just a place to develop software, it's the way the company works.

We focused the discussion on things we couldn't learn from the web, where the topics were things we are thinking about. In the spirit of transparency, we thought we should write down what we learned.

## Making money

It transpires that even VC-backed companies have to do this, at some point. In GitLab's case, they've reached $100M ARR in 2020, growing 50x in 4 years. In other words, they smashed that.

### The first $1M in ARR - when and how?

GitLab started off bootstrapped for a long time. They already had 100K users when they started to raise money and revenue became more important.

"We shouldn't have focused on hosted to make money, around 85% of our revenue is from the source available version".

GitLab realized that the commercial value was more in the source available version, which big enterprises could deploy on their own infrastructure. You can't do that with GitHub. Back in 2012, Sid asked on [Hacker News](https://news.ycombinator.com/item?id=4428278) if people would use a hosted version, and received hundreds of sign ups. In 2013, they built the Enterprise Edition and started offering this as source-available.

"You've a huge amount of competition in the hosted space" - Sid, on where PostHog should focus on revenue growth. We agreed.

### Setting up your repos for open core

"It has been a real headache not getting this right in the first place".

Almost in the same breath about focussing on the source-avaible version, Sid's inner developer emerges!

At PostHog, we were worried that having a repo with the licensed and MIT version rolled into one place would harm adoption, even if a mirror with just the MIT version were available. Surely it'd mean that people wouldn't see the little MIT License next to the main repo? To date, PostHog went for an MIT repo and we were planning on having users find an alternate repo and upgrade themselves, but we had concerns this would make managing the deployment tough. For example, what if we received community pull requests to the MIT version that broke the paid version?

"Put all the non-MIT licensed code into one folder, and have the mirror just keep itself updated whilst deleting that folder automatically. This means to get someone to become a paying customer they don't have to find a new repo and upgrade themselves manually. If they want a trial, they can still have a trial this way".


### How do you manage to build a paid and free product at the same time?

"Good question. Our org chart reflects this."

The decision making around which functionality goes into the source available versus the MIT licensed repo is quite straightforward - a buyer based model is becoming the industry norm.

However, splitting engineering resources and time is a little less formulaic. GitLab's product managers make that call, and they are the ones responsible for sizing the engineering teams too.

### Pricing ideas that don't work

"Service-based pricing, charging feature-by-feature, those things didn't work". Be willing to iterate.

### Finding the budget

Many investors told us that it's one thing for a developer to install your software, but it's tough to get an executive to provide budget to a larger team without a sales presence. GitLab found that in the early days, this just happened organically - the software just spread to the point where someone would reach out.

In fact, we asked [GitHub's CTO](https://twitter.com/jasoncwarner) the same question. "The most effective way to sell me something is if I have 100 developers asking for it". Great!

### Approach to marketing

There was no significant spend on marketing for the first 100K users - this all came from adoption of the Community Edition. This has now changed significantly, however, "you have raised money earlier than us so perhaps should do both at once, I'm not anti-marketing".

## Culture

### How do you manage the product?

"Product have the final say. Engineering will have points of view, they need to raise these with Product. You end up with tons of huge meetings if you don't take this approach."

GitLab, like PostHog, have an engineering-focused product. Thus far, our approach has been developers building for developers, with a huge amount of autonomy. We're in fact the exact opposite.

Whilst we don't agree with this approach, we agree with the clarity. We let individual developers choose what to work on - it's their call, no one else's. That's perhaps a little unconventional.

### When did you introduce a management layer? What did you learn from that?

"Once we got past about 10 people. Don't do this too early." 

We agree.

## Don't ask what I did

"Being the pricing genius I am, I charged a (more than $100Bn valuation) company $1,500 per annum for 5,000 seats. The insurance to cover the contract was significantly more than the contract itself". Stay humble!

Sid summed up the call perfectly - "don't ask so much about what I did, but ask how I'd approach things now".

We shouldn't follow blindly how GitLab worked, but getting a good sense of what they learned is powerful. The real takeaway from GitLab overall is that the product isn't the software… it's the company.

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_


