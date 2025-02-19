---
date: 2024-06-21
title: 'How we got our first 1,000 users'
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/math_meme_8b0013533e.jpg
featuredImageType: full
tags:
  - Growth
crosspost:
  - Blog
  - Newsletter
---

> This post is the first in a series where I’ll break down how we reached important milestones at PostHog.
> 
> - **Part 1:** How we got our first 1,000 users **(You are here)**
> - **Part 2:** How we grew from 1,000 to 10,000 users (coming soon)
> - **Part 3:** How we scaled to 100,000 users (coming soon)

One of my favorite weeks as CEO of PostHog was an [offsite in Aruba](/blog/aruba-hackathon), but it wasn't for the reason you expect. 

We chose Aruba because the team deserved to celebrate. We’d grown massively, so we increased the offsite budget and opted for a fancy hotel in the Caribbean as a reward for everyone’s hard work.

But I felt a little guilty when we arrived. 

The lobby had a *boat* in it. There was a *private beach*. You could drink *infinite piña coladas*. I knew we were spending $100k more than we *needed* to and a core part of my job is making sure we don't run out of money!

As any founder should, though, I:

1. Compartmentalized my feelings (they don't add to shareholder value)
2. Kept refreshing our revenue dashboard (TikTok told me manifesting is real)

![posthog aruba](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/aruba/aruba-hackathon-photos.jpeg)

It worked. Within two days, our annual recurring revenue (ARR) had grown enough to pay for the entire trip. Suddenly, I didn't feel guilty at all.

This clearly demonstrated to me the efficiency of our business model – a model that’s propelled us from 10 users to more than 100,000 in just over four years. Today, around 1,500 companies – ranging from hobbyists to Fortune 500s – sign up every week. 

This series is about sharing how we reached this point. It’s also about personal reflection – writing is thinking, after all. I’ll share the lessons I learned, and things I wish we’d done differently. 

If you have a question, please leave a comment – I’ll try and answer them all. [My DMs on X are open](https://x.com/james406), too.

## 🎉 Reaching 100 users in four weeks 

Getting our first 10 users was the hardest part.

Tim, my co-founder, and I wound up [pivoting five times](/founders/story-about-pivots) before we landed on PostHog. We found it very hard to get 10 companies to use our products, even when we thought we were solving a real problem!

When we pivoted to PostHog, we created a one-month plan. 

The goal? Find out if people disliked existing product analytics tools enough to try ours instead, and do so as quickly as possible.

![one month plan](https://res.cloudinary.com/dmukukwp6/image/upload/one_month_plan_1097da6295.png)

We optimized how we worked to ship as fast as possible, working from 9am to anywhere between midnight and 3am, 7 days a week. Our only break each day was a 10-minute walk to the local sandwich shop, and an episode of Parks and Recreation. 

If we failed to complete all four in a month, we would pivot again.

### Important decisions we made

On the product side, we decided to:

#### 1. Build a product for developers

We chose developers because (i) established competitors were focused on product managers and selling to execs, and (ii) it was an audience we understood and enjoyed working with.

#### 2. Focus on self-hosting

We believed developers cared more about controlling their own data, so we focused on this first. We might have grown faster had we launched with a cloud product as well, but this gave us focus.

#### 3. Be open source and transparent

We figured our target audience would appreciate the transparency, and the ability to inspect our code before self-hosting it. We chose a permissive MIT license to see if enterprises would use it – we felt they'd have rules around using non-permissive open-source licenses. We also [wrote a public company handbook](/handbook).

#### 4. Make it easy to deploy

We also built event autocapture into our SDKs, so users didn’t have to manually instrument events to get started – something we found annoying when we used competing product.

#### 5. Not to monetize at launch

Why? Because none of the multi-billion dollar open-source companies I researched monetized in the first five years. We were also happy with a VC-funded model, so we could afford to do this.

This decision had two important benefits:

1. It enabled us to move quickly. 
2. It managed early user expectations. 

We didn’t need to build a payment flow, or agonize over how to convert open-source users into paying customers, and people were more forgiving of issues.

This worked for *us*, but it isn't universally good advice. 

We were entering a crowded market with multiple competitors with around $100m in revenue, so we were confident we’d find a way to monetize eventually. 

Had we been building into a new market with less validation from competitors, a worse fundraising environment (like right now), or bootstrapping, then monetizing sooner would have been important.

### Finding and onboarding our first users

I started by asking friends because:

1. It’s the easiest way to find initial users. 
2. It’s better to build a real product for a real person than a hypothetical one.

Doing this surfaced lots of edge cases we wouldn’t have considered on our own.

We weren't self-serve at this stage. In fact, we had to create new users by manually editing the database. We set people up over Slack, WhatsApp, or in-person. We managed to get to 10 users mostly from using our personal networks.

Once we were confident friends could use the product and found it useful, we focused on making PostHog self-serve by creating a one-click Heroku deployment. We knew this wasn’t scalable – we were prioritizing validating our idea quickly.

![meetings](https://res.cloudinary.com/dmukukwp6/image/upload/meetings_a65d6cf7dd.png)

Next, I started reaching out to more people I knew, and expanded into some cold outreach via groups I was in, getting introductions, and messaging via LinkedIn. This got us to a couple dozen users within a few weeks. 

This stage was about figuring out if people we didn’t know would use the product, and keep coming back. This is where we failed on previously. If people sign up but don’t come back over and over, you’ve probably found a valid problem, but not solved it. That's either because your product needs reimagining, or it's painful or confusing to use.

Watch people using it, ask them about it, look for repeat usage, analyze why some users come back and others don't, and so on, until you figure this out. If you can't, then start over with a new idea. 

### The public launch

We knew we were ready for our Hacker News launch once:

1. Users could sign up and use the product without our help.
2. People we didn’t know signed up and found it useful.

[We posted on Hacker News](https://news.ycombinator.com/item?id=22376732), and it went well, mainly because we'd achieved the other steps first. We reached 300 deployments within a couple of days – five weeks after we started building.

![hackernews](https://res.cloudinary.com/dmukukwp6/image/upload/Hackernews_967c1eeb08.png)

We also spent ~$2,000 promoting the repo on Twitter which, combined with the successful launch on Hacker News, got our repo trending on GitHub.

After the massive bump on launch day, our growth settled to a level that was noticeably higher than before.

## 📈 Reaching 1,000 users in three months 

Our Hacker News launch gave us a steady trickle of word-of-mouth growth. We made some of [our first hires](/founders/posthog-first-five), and the next few months were about understanding why people liked PostHog, and what to build next. 

To figure that out, we asked people:

1. How they heard about us.
2. Why they signed up.
3. Why they had been recommended our product (if it applied).

And we kept [talking to all our existing users](/newsletter/talk-to-users) about what they did and didn’t like about the product, and the problems they wanted to solve.

Over the course of a few weeks, we gathered all this intel and mapped out what users loved, how to scale it, and anti-goals we should avoid. This lead us to focus on shipping more features engineers wanted, such as feature flags, that they also wanted to self-host.

Here’s an example of what this looks like for PostHog today. Notice that the anti-goals are all standard things that most companies follow, which is exactly why bigger companies often become unpopular at scale.

![goals](https://res.cloudinary.com/dmukukwp6/image/upload/goals_and_anti_goals_324c9044a8.png)

At this stage, I also started experimented with content as a marketing channel. I'm not good at coding, so figured I could help out this way.

I knew from these conversations that developers wouldn't appreciate being sold to, but I guessed they would find following our journey interesting. So, I wrote about what my co-founder and I were up to – [how we pivoted lots of times](/newsletter/pivot-your-startup), or what it was like moving to San Francisco for YC.

This got us a couple more hits on the front page of Hacker News, which proved it worked, so we kept doing it. That’s why, four years and 60,000 customers later, I'm writing this blog post, as the CEO, at half midnight.

### Getting our first sales

Our successful Hacker News launch also gave us the confidence to start thinking about pricing.

I did two things to get our very first sales:

1. I gauged interest about our paid offering with users that were already using our product and in our Slack community.

2. I created a pricing page on our website, listing our paid extra features and embedding my calendar into it, gradually making this self-serve over time. When someone booked a call, I'd see which extra features they really cared about, and if they wanted to buy.

It was easier to get sales from totally new users via our pricing page than from the existing community, though both approaches worked. I suspect this is because some existing users were using us because it was free.

![history](https://res.cloudinary.com/dmukukwp6/image/upload/first_six_months_0a5368c875.png)

In early pricing discussions, I negotiated ad-hoc with customers, going from "will anyone pay anything?" to a consistently used internal doc, which I iterated until it felt consistently right. 

We had two goals at this stage:

1. To figure out if people would pay anything for what we’d built.
2. Create a pricing model technical users like ourselves would appreciate, which meant it had to be self-serve and totally transparent. 

After a few weeks of trial and error, we had a public pricing table and started letting people put their card details in. Every time we made it more self-serve, we got a higher conversion rate.

### Launching PostHog Cloud

Once we’d nailed pricing, we launched PostHog Cloud in April 2020, two months after our initial launch on Hacker News. Now, getting started meant signing up and adding our autocapture snippet to their product. It took minutes.

We launched with a limited free tier (much less than the 1 million events we offer today) and a 30-day free trial. We also made it “no card required” at signup, which massively increased conversions.

Adding a cloud product with proper pricing massively improved our growth. It made self-serving even easier and increased confidence in the product. Keeping it low friction was important, though. Had we demanded people put in a card from the start, I’m certain people would have been put off.

We reached 1,000 users in May 2020, a few weeks after the launch of PostHog Cloud and four months from when we started building. In June, we organized our first ever company offsite in Italy, where we shipped early versions of our feature flag and heatmap features.

That's where this part of the story ends. We went from idea to a real product with thousands of users in around five months. In the next part of this series, I'll cover how we went from 1,000 to 10,000 users, which took around a year and a half.

## 🎓 Things I learned from reaching 1,000 users 

### 1. Deadlines are motivating

Our one-month plan had a hard deadline built-in. It forced us to make decisions about what we did and didn’t care about, and gave us a reason to push hard. It’s easy to drift without one.

### 2. Have a plan for finding your first users before you start building

It doesn’t need to be a detailed plan, but you should know who your users will be and how to reach them. We had a clearer plan for PostHog than our previous ideas.

### 3. Optimize for learning, not revenue (at the start)

Going self-serve too soon will reduce your opportunities to learn. The time we spent onboarding users by hand was incredibly valuable. We still do this with new PostHog products, like [our data warehouse](/docs/data-warehouse) that’s now in open beta.

### 4. Repeat users are more important than volume. 

You don’t need hundreds of users to validate an idea – a dozen or so who use your product over and over again is enough. Don’t invest in a big launch until you’re certain users will stick. In fact, you may find you never need a big launch if you do this well because you'll start getting lots of word-of-mouth growth.

### 5. Be concise when you ask for meetings 

Write two or three sentences, not a wall of text. Be direct. If you want feedback, state that. If you want to sell to them, be transparent about it. You can always come back to a prospect to sell to them after you've validated they have your problem.

### 6. Be ultra-responsive to users

You should aim to respond within 30 seconds if someone messages you back – yes, it's that extreme. Startups win on speed. Be glued to your messages.

### 7. New users are more likely to pay than existing ones

If you launch as a free product, you may find it harder to monetize existing users than fresh prospects. This isn’t an argument against launching a free product, just a reality. Factor this in when evaluating the success of your monetization efforts.

### 8. Transparent pricing increases confidence in your product

Launching without pricing was good for us, but usage and growth increased when we introduced pricing – a pattern that repeated when we started charging for [session replay](/session-replay), [feature flags](/feature-flags), and [surveys](/surveys). People take your product more seriously if it’s obvious you’re taking it seriously, too.

## More good reads 📖
Normally we share interesting things by other people, but for this issue I’m sharing a few older pieces I’ve written that cover the early days of PostHog:

- [The time before YC](/blog/before-yc)
- [The YC interview](/blog/the-yc-interview)
- [Pivot to PostHog](/blog/pivot-to-posthog)
- [After the Hacker News launch](/blog/after-the-hn-launch)_
- [How we justified quitting our jobs and financing PostHog early on](/founders/inflated-risk-seems-riskier)

<NewsletterForm />
