---
date: 2025-12-31
title: 'How 2025 went for PostHog'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: CEO diaries
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
---

It's December 31st, 2025, and I've decided to hang out in a near-empty WeWork to write about how the year went. I want to clear my head before next year starts, and thought it make for an interesting read for others.

Here are my reflections:

## Money

Money is the outcome of doing things well for customers, in the long term. So let's take a closer look how 2025 went.

We got super close to tripling our revenue and only burned about $5M in the process. We have reached around 285,000 companies having installed our software and 545,000 users. Somewhat amusingly, we said we wanted to hit $100M in 2026, back when we had only around $100K in annual revenue. Somehow that is still the case - we aim to hit $100M next year still! The internal codename for this project has become "the hundy", somehow.

This growth is outrageously fast, but the funny thing is that this doesn't sound amazing compared to other companies going from $0 to $100M in a year. This has genuinely been a challenge to handle - "is this FOMO or a good idea for _our_ users" is a criticism I've received this year.

Recently I went on a short trip to Dubai with some of our investors and I chatted about this phenomen with Arnav from PeakXV. He said he could see a world where people look at AI-inference heavy companies as a different business model to SAAS, where it's acceptable to have a gross margin 25% of what has been standard in SAAS, but thus you just need to grow 4 times faster. Net profit growth being the metric, not "ARR" growth. It'll be interesting to see how we handle this through 2026 as we ship a bunch of AI first products and features.

Long ago we realized that our growth was largely from word of mouth. This comes out as a _lot_ of organic search volume, but mostly for the word "PostHog". We hired a friend and former colleague for a year or so and he went one level deeper - on finding out a user was recommended PostHog, he asked them _why_. They came back with four reasons: lots of products in one, the lowest prices, developer brand and a very technical and helpful customer service. We've been trying to do more and more of those things over time to grow.

We raised a ton of money too - $145M of capital for the business through our Series D and E this year. Psychologically this has been a big shift. We wouldn't have known how to reliably spend money to grow in 2023, we started to get an idea through 2024 and this was the year we acted on it. It means that our constraint has shifted from confidence to capital to our ability to find really strong engineers. That's a pretty strange feeling and a little unnerving. It can feel frustrating at times - we have _so_ many things to build at once that we believe in. I am very glad we are able to hire across so many countries. I couldn't imagine trying to do this in just commuting distance of one or two offices.

One thing we are realizing about hiring - we get lots of applications for the roles that we market to. We haven't really done much outbound recruitment at all. We write all the time about product engineering - we have a [newsletter](https://newsletter.posthog.com/) on this topic with over 100K subscribers, and we build tools for product engineers. However, when it comes to finding different engineering expertise - such as deeper infrastructure stuff - applicants are understandably rarer. We want to figure out outbound recruitment in 2026 to make sure we get people with some of the more specialist skills we need as we keeping scaling our stack.

## Cool things for customers

We kept up with our price cuts - reducing prices for warehouse, data pipeline and surveys customers. These hurt in the short run but lead to more growth long run for us. The cool thing is that these moves aren't driven directly by Tim and me any more - they're just part of [our principles](https://posthog.com/handbook/engineering/feature-pricing). These changes all come from small teams making the decision, making it happen then measuring the impact.

We shipped a ridiculous amount of stuff - far too much to list. New products (workflows, error tracking, logs, PostHog AI) and features, stability and performance improvements for our existing stack. And a fun new operating-system inspired website!

We went from a tiny number of people in sales, customer success and support, to quite a few. We've long had top percentile or top quartile for all our company metrics compared to most benchmarks, except for net revenue retention which has been mediocre. We are very proud to say that adding these people has _dramtically_ increased our retention - as one data point, in our November board meeting, annual net revenue retention had climbed by 25 percentage points through the preceeding year. We thought this would happen and were delighted to see it.

## What was hard about 2025

### Our reliability was poor towards the end of the year

We had issues with feature flags towards the end of this year. We've increased the level of rust experience in the team and we've been priotizing reliability very highly as a result. It was an intense last quarter of the year, but one thing we can promise is that reliability is the top priority for this team.

We got caught out by [Shai Hulud](https://posthog.com/blog/nov-24-shai-hulud-attack-post-mortem). We've always considered ourselves a data company. An attack that instead treated us as an initial vector for an ecosystem-wide worm wasn't something we'd anticipated. It was super frustrating this happened as we take security very seriously and in general today we have a very cautious attitude towards it.

### PostHog AI is now awesome, but we launched PostHog AI too early, perhaps

I'll blame FOMO for this one. I think we rushed with pushing PostHog AI too early.

It did turn out to be very useful getting lots of usage, it gave us a ton of LLM traces to usem which meant we could figure out how to make it work better. It [turned out our architecture was wrong](https://posthog.com/blog/8-learnings-from-1-year-of-agents-posthog-ai) - we put a ton of effort into a workflow graph. This turned out to be a poor choice for orchestrating free-form work. In a graph, the LLM can't self-correct and context is easy to lose. We switched to a single query loop model, which means the agent can execute across dozens of steps while double checking its work continuously. Yes this is more expensive to run, but with breakthroughs like Open AI's o4-mini, much heavier use of reasoning makes this by _far_ the best approach.

This is still very much the start - we've far more we're going to implement here too. I am confident that it will be mindblowing.

### We got told we are too complicated, many times

We monitor our brand mentions online. When we look at _negative_ feedback, the most popular criticism is that the UX can be overwhelming. PostHog has nearly 20 products, so that's not surprising. However, it's increasingly an issue as we build more products and add more features to those we already have.

The mental model I used to hold of PostHog was similar to that I have of AWS - it is hundreds of products, you simply ignore 95% of them. They're all reliable and have most of the functionality of the competitors so you just pick them by default each time since you already have an account and it's often better to use them together. It's complex but you ignore most of it.

AI has changed this view - we've already demonstrated that agents can use our products together. My personal use of PostHog is now AI first.

I think a few factors coming together will make PostHog feel a lot simpler:

* Our AI wizard will make it way easier to get up and running, because it will just set up whichever products are relevant automatically
* Our Platform UX team will make using PostHog feel more similar to using ChatGPT. We will work very carefully to not _remove_ functionality - we'll make sure you can still click buttons and write your own SQL, but these may become the "backup" way to use PostHog.

I believe this will 

### We're big enough to hate

When you're really small, people will mostly ignore you, but a few will encourage you! It's pretty rare to get hate unless you're doing something egregious. As you get larger, especially after lots of fundraising, expectations are much higher. Rightfully so. Coping with this is harder. It feels like you've unlocked rocket launchers but have a bigger boss to kill. We have _much_ more resource now, but we also have more pressure to keep our growth high _and_ a much bigger surface area to look after.

From a brand perspective, the implications

This comes out in funny ways. For example, if we're ever having stability issues but marketing releases something fun like a video changelog, this makes us look distracted and focused on the wrong things. The reality is, if we don't continue to do marketing through all the ups _and_ downs, we'd lose momentum, growth, finance and ultimately the ability to ship. Yet we'll hear "shouldn't you be focused on X-critical-thing instead", quite understandably.

### Tim and I went full circle on our roles, ish

When we started PostHog, I was CEO and Tim was CTO. I did our original sales and marketing, Tim did engineering and support.

Then Tim took over sales.

Then we changed our titles both to just Co-CEO.

Then I took over a bunch of engineering teams. Then I dropped marketing. Now I just focus on AI products and the website. Tim is responsible for _everything_ else. We've swapped so much of our roles around. 

This has worked remarkably well for us - despite having the "wrong" experience, we are both having much more fun and have way more energy. It turned out that what we're actually best at, wasn't what we had experience at doing initially. Don't default into doing what you've done before - pick what you want to focus more on. You'll figure it out and you'll have more fun regardless. Even today, everyone in a leadership role at PostHog was hired doing individual contributor work first, often for years. I think evolution means it's human nature to put people into boxes prematurely.

## Marketing did some really cool new stuff

We've kept bashing away at our newsletter, getting more and more readership. I used to be the only person that would write, now I am very regularly "outwritten" by our own team. As arrogant as it sounds, I never thought that'd be possible - I thought I'd always have the easiest time writing at PostHog because I've a natural advantage. It turns out that we've managed to find stronger and much more focused writers than me.

We've been trying to figure out video - we've got some pretty cool changelogs coming out. I think these are a big deal - any "do more weird" type marketing is worth it, _if_ it is fun for our audience, and not just something we consider fun internally. The changelog we send is pretty important to our users, so creating a more delightful version of that seems like a decent win. It's early days still but I look forward to what we produce here through 2026. In parallel to this, we're working on creating a strong video presence next year - we want to create a genuinely enjoyable channel to watch for our audience.

Our docs have gotten _far_ better this year, I'm proud of them - I think we're now the kind of company I'd have looked up to when we were getting started. This has been an area where I think we're living in the future - we've spent much of the last 3 months writing docs _for agents_.  We shipped an AI onboarding wizard, which has been remarkably succesful. It goes through your code, looks for the most important features and implements PostHog's events for you.

This wizard will be a very important part of how we grow next year. We want to extend it to automate dashboards, insights, and much more. This will involve a ton of "context engineering" from the docs team, fuelling it with examples and code snippets, to add to its feature and library coverage.

We went nuts with events this year. We did some [big ones](https://youtu.be/4b3b0lkW7es?si=cAEDR84GRSm8zWHg), and many smaller ones - 45 in total. We hired Daniel Z who is a total nutjob for organizing these things. My working theory, at least, is that word of mouth is like Wikipedia where nearly all of it [is written by just 1% of editors](https://www.vice.com/en/article/wikipedia-editors-elite-diversity-foundation/?utm_source=chatgpt.com) - a handful of people recommend us many, many times. Going deeper by meeting our community in real life means we'll have a disproportionately stronger community as a result by tipping more people over that threshold, I hope! Results to be determined still but it feels good at this stage.

## Product

### We got confused, then unconfused about our data warehouse strategy

For the first half of the year, our focus was getting more data in. Lots of early stage startups now use our warehouse to import data to PostHog from Stripe, Postgres, Hubspot and Salesforce for example.

We then hit issues with larger customers wanting to move to a "well known" alternative such as Snowflake so they could use the modern data stack that they're familiar with. When this happens, it causes our customers to have to hire data analysts to write SQL and to lose the ability for anyone to self serve analytics, and for us it devalues our products somewhat. We started getting divided opinions internally on the right solution here. Initially Tim and I felt that by doing a good enough job of the warehouse, data pipelines and sql, that it'd negate the need for data engineers to be hired in the first place. However, this proved wrong - no matter what we did, we could see larger customers having this kind of scenario: someone in marketing can't attribute an ad campaign properly, they hire a data engineer to figure it out, the data engineer wants to set up snowflake, dbt, and some kind of BI tool. Since all of this interaction sits outside of PostHog right now, and we don't do much marketing to any of these groups of users, we weren't able to control the narrative.

The decision on what we should do finally came when the warehouse team themselves told us they thought this was a fight they wanted to win. Data is our moat, the all in one proposition makes a ton of sense, so logically we should do everything we can to make sure we can handle larger customers' warehouse needs for our range of use cases. We therefore need to meet the needs of the data team.

We've already started increasing this team size, and we think we need to work harder at winning the hearts of data engineers. Whilst lots of product engineers know about PostHog, in data engineering we're much less well known - we need to figure out where they are and get talking to them. It's all a work in progress, but for example, we're now figuring out if we can offer the ability to spin up a single tenant duckdb instance in our infra, so data engineers can plug their existing tools into our data nicely, and then documenting this all properly. 

### We're taking more risk with new products we build

There are two untapped product themes I'm most excited about exploring in 2026. These are all uncertain at the moment but they're areas I'm curious about.

The first is moving down from mostly providing _read only_ team or product level metrics, to _doing_ things for individuals in their jobs. I think this move to prosumer (team -> plg -> prosumer adoption) is something that many of the fastest growth AI companies have in common. We've done very well at meeting customers through product led growth in an industry that is historically dominated by top down sales, and we will now take the next step I hope.

A major part of this is coding. We are working on a this as a tool for PostHog Cloud and as a desktop app. We want PostHog to help ship fixes to small UX issues, bugs or errors automatically - so you are simply reviewing pull requests instead of creating new branches from scratch and losing 20 mins to managing an agent each time. PostHog AI having the ability to write code also unlocks many more potential use cases - such as a spreadsheet of users with some combination of behavior and attributes, generating board slides, a presentation for an account review for a customer, or even a simple marketing website complete with tracking.

Combining this with our existing, but nascent, workflows product feels like it could unlock a combinatorial effect in how many things we can achieve for our customers.

Helping provide more of the tracking and infrastructure for agents is the other key area to explore. So many people are building agents, but making it easier to spin them up, understand their behavior and improve them feels like a dark art still. We have shipped LLM analytics already, but it's largely prompt-focused. We think extending our functionality for agents would make a ton of sense if we want to be where the puck is going.

##  We hired lots of people

Surprisingly this went super smoothly. We felt very confident that we'd overengineered the living daylights out of our culture, and that's pretty much what happened. The handbook was a _huge_ deal to have in place. We changed a lot of stuff, but we had remarkably few issues with adding far more people and more teams. We went from around ~80 people at the end of 2024 to 179 ish by the end of 2025.

## We think 2026 will be one of our most challenging years

2026 is the year we go from being the underdog to being the same order of magnitude in terms of revenue. We have a far bigger customer base than many of them in terms of numbers.

We think the key is we have to get bigger at handling larger customers - everyone says you're a toy until you aren't! - _and_ we have to keep innovating and building furiously. We'd better get on with hiring then!
