---
date: 2021-01-21
title: A story about pivots
author:
  - james-hawkins
featuredImage: ../images/blog/story-about-pivots.png
featuredImageType: full
tags:
  - Founders
  - Product-market fit
  - Product  
---

PostHog has pivoted _a lot_.

After 5 pivots in 6 months, we got into [Y Combinator](https://www.ycombinator.com/) last year, pivoted again whilst we were there and have now gone from the first commit to thousands of deployments, a team across 10 countries and $12M raised, in well under a year. We've a long way to go, but we're delighted at how it has gone so far.

This is that story and what we learned from it.

## You'll feel silly

It goes something like this:

1. Convince yourself then your family, friends and colleagues you have some great idea.
1. Quit your job.
1. Build it. Listen to the soundtrack from [The Social Network](https://www.imdb.com/title/tt1285016/) way too much.
1. Everyone thinks your thing is terrible. Hopefully you realize.

The nature of a startup is that you have to [talk to users](https://www.ycombinator.com/library/6g-how-to-talk-to-users). Or so we've heard.

My sole focus for weeks on end was just to get meetings with people that we felt may have the same problem we were trying to solve.

## It got good eventually, right?

In 9 months, we built 6 products and did more than 100 meetings with potential users.

The range of ideas we tried to solve looks broad, but the thing that connected all of them was that we tackled problems we'd experienced in our previous professional lives.

So, what did we build?

### 1. Sales Territory Management Tool

At one stage in my life, I was the VP of Sales at an enterprise software company. On paper, it looked like a glamorous job - I used to fly around the world with the sales team, and met with huge enterprise clients in fancy skyscrapers, like the [ICC in Hong Kong](https://en.wikipedia.org/wiki/International_Commerce_Centre):

![International Commerce Center - a big skyscraper in Hong Kong](../images/blog/pivoting/international-commerce-centre.jpg)

Despite this, the _majority_ of your time in sales is spent getting nowhere. All those hotels, flights, calls, fastidiously wearing a suit in inappropriately warm weather - very few of those things result in anything.

Sidenote: this is why [product led growth](../handbook/growth/strategy) is so much better.

If you're not getting anywhere with a potential customer after a few weeks or months of trying, your time is better spent elsewhere. Yet systems that are the core products of [$17.1Bn revenue companies](https://en.wikipedia.org/wiki/Salesforce) come with a manually selected arbitrary number for the percentage probability that doesn't vary with time.

We pulled pipeline data from Hubspot or Salesforce, then used predictive analytics to work out how this curve looked based on historic data, then applied it to the current pipeline. Once a deal dropped below a certain threshold, we'd recommend you swap out that target company and pull a new one into the pipeline.

We confused a lot of people with this idea, because we were confused with whom we were targeting.

We got 15 sales leaders to agree to trying this out, sent them a link, then waited...

and waited...

just _one_ person even clicked the sign up link. The rest didn't even try it.

With hindsight, it was way overpowered for tiny teams and we'd only have had a great fit for huge ones with a lot of data.

The only people interested in smaller teams were enthusiasts, but there wasn't an easy jump from that to a bigger market. We could have just worked on selling the product to big companies, but that would be [tough](https://www.ycombinator.com/library/3O-why-big-deals-are-bad-for-startups).

### 2. CRM with Predictive Analytics

One of our friends who ran a small sales team was a clear outlier. He had been using our first product a lot. We asked ourselves - why?

He had used it to _replace_ his CRM. 

Could we just do the whole lot in one place, and reimagine the CRM - would that make things feel simpler?

We positioned the product as a CRM for small companies, with predictive analytics for an even simpler experience managing everything. We tweaked the functionality to have more control over deals and contacts.

It suddenly got really hard to get anyone to talk to us.

There are many lightweight CRMs out there, and predictive analytics make more sense for those with more data, not startups with hardly any.

This was around the time that [Superhuman](https://superhuman.com/) was getting pretty popular; we got overexcited, and kept using words like "blazing", "gorgeous", "brilliant". I blame too much time wasted reading [VC Twitter](https://sifted.eu/articles/vc-brags-twitter/).

We didn't think through who we were building for. The market we were working on was very busy, so if I went back in time, I would have focused more on our differentiation - a product could make more sense than a platform. Tim and I also just weren't strong enough at design to differentiate on that alone.

After hundreds of messages to potential users, we eventually got a single customer for $20/month, who then didn't actually pay the invoice. If you're pushing this hard and getting nowhere, you don't have the magic of [product market fit](https://www.youtube.com/watch?v=l-vfn97QTr0).

### 3. 1:1 Tool with Predictive Analytics

Back to basics - what was the actual problem we were solving?

It was the prioritization of where to focus your sales efforts. If 90% of your sales deals won't close, you need to get good at not spending time on those that aren't going to close.

[Andrew Grove](https://en.wikipedia.org/wiki/Andrew_Grove) has an excellent book, [High Output Management](https://www.amazon.com/High-Output-Management-Andrew-Grove/dp/0679762884/ref=sr_1_1?dchild=1&keywords=high+output+management&qid=1610712757&s=books&sr=1-1). The premise is that your 1:1 meetings with your direct reports are your most leveraged time.

Yet, many managers in practice don't prepare, at all.

![A team that look a little bit like their happiness is staged](../images/blog/pivoting/amazing-team.jpg)

We changed the UX completely, and made an app that looked a bit like google docs, where you and your reports could each create an agenda in advance and take notes. The twist? The product would interpret your sales pipeline and would use predictive analytics to suggest specific deals to discuss that could be worth replacing or that had changed dramatically since the previous week.

We managed to get lots of meetings easily with this idea, and everyone reported not preparing to the standard they wanted. Did we have a silver bullet?

Despite giving out logins, only one team out of around 10 started using the tool. 

We were flumoxed. This tool was simple, people were excited, but no one used it.

For those that haven't read it, [The Mom Test](http://momtestbook.com/), which I wish I'd read sooner, explains our downfall here perfectly:

```
If they haven't solved the problem, ask why not.
Have they tried searching for solutions and found them wanting?
Or do they not even care enough to have Googled for it?

Rule of thumb: Anything involving the future is an over-optimistic lie.
```

If we'd have asked this question, we'd have saved a couple more weeks.

By this stage, we were thinking we just wanted to work with people that would at least try our stuff. These pesky heads of sales were just too capricious and we needed a break.

Software engineers, surely they'd be more willing to try something that we built. We moved on to a different idea we'd had. Voilà:

### 4. Technical Debt Monitoring Tool using Surveys after each Pull Request

We'd seen the impact of technical debt not being paid off at the right rate in our past, and had the perspective that automation isn't key to solving it. We believed that engineers knew when it was worth tackling.

I spoke with every developer or engineering leader I'd ever worked with, and many I hadn't. They all said this problem was a huge pain point.

So we built a survey tool that integrated with git repositories. After each pull request, it would ask the developer to answer a few quick questions - did anything slow them down, what type of problem was it, and roughly how much time was wasted. The tool would then visualize the code base against time lost to help surface where to start.

We got quite a lot of users, and we got into Y Combinator with this idea. Three weeks into the batch, we had reached 600 users, with a 50% response rate to the surveys.

We had started trying to charge people for the product. But we kept getting feedback that although it was a nice way to log issues, it just wasn't helping solve the problem. A few teams converted at very low order values with a lot of pushing, but it was clear we had a problem.

It turns out everyone has problems with technical debt, but solving it involves changing how teams prioritize. Product teams weren't using the tool, and they were often dictating what people built.

After a meetup with our YC friends at a cool [food truck spot](http://sparksocialsf.com/), we took a long walk back to our house in [Castro](https://en.wikipedia.org/wiki/Castro_District,_San_Francisco). We were thinking about how to solve our product woes. Could it turn into a piece of roadmapping software? Would it need to integrate with the roadmap software already in use? We just didn't feel excited about building these things out.

![James and Tim at a group ycombinator meetup about to walk home](../images/blog/pivoting/about-to-run-out-of-product-ideas.jpeg)

A couple of days later, driving between Mountain View and San Francisco, we realized that we just weren't the right people to run this business.

Although Tim had struggled with technical debt first hand, neither of us had solved it. If one of us had managed an engineering team before, we'd have perhaps been better placed to understand things. Our basic skills were good enough to get quite far with the idea, but we didn't have the belief to take it further.

Along the way, we learned a lot about how developers and product managers work together. We'd also created a big list of future ideas we'd had whilst building all the above things out. If you can't stop thinking of other ideas, you probably are building something you don't like. This all came into play for idea 6 later on (the good one).

So what did we do next?

### 5. Engineering Retention Tool using Surveys after each Pull Request

Those fickle engineers joining companies and leaving them whenever they want to ;)

This idea didn't come from us, which doomed it before it even really started.

This lasted all of 5 days. We had a bunch of meetings left over from (4) to validate it. Amusingly we had to do a Y Combinator demo day dry run for this in front of 500 people who made up the YC batch.

We had a wildly unenthusiastic response from prospective users. The lowlight was during one of the meetings that we resorted to asking the CTO of an 80 person start up what his biggest problem was, "I've not really got any". Noice, noice.

<div style='position:relative; padding-bottom:calc(56.25% + 44px)'><iframe src='https://gfycat.com/ifr/CheapFeistyDassierat' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div><p><a href="https://gfycat.com/discover/andy-samberg-gifs">from Andy Samberg GIFs</a></p>

### 6. Open Source Product Analytics Platform

Things got meta.

Along our journey (/series of failed ideas), we got frustrated having to send all our user data to 3rd parties to understand our product usage. It felt wrong and it meant we'd lose a bunch of user data that would have been quite useful.

So we built [PostHog](https://posthog.com).

There were a load of features we wanted conceptually - but it was when we realized that the _strategy_ was being open source first and foremost that we felt more excited than we ever had before. When that clicked, we knew we'd just fallen in love with this idea.

We started building on [January 23rd, 2020](https://github.com/PostHog/posthog/commits/master?after=9ae6854254085bbe10cc4f9c98820d9efed52424+306).

When did we know this idea was right? 

When we saw real life actual people on the internet start using our thing, without us having to manually get them to do so.

Even better was seeing a community starting to appear. We got [our first ever issue from someone else](https://github.com/PostHog/posthog/issues/100) on February 15th, and our first community discussion [on the 23rd](https://github.com/PostHog/posthog/issues/149). This started to spiral. We now get a stream of issues every day in our [PostHog Users Slack](/slack) or the [repo](https://github.com/posthog/posthog).

Growth suddenly went from being the hardest part of what we were doing, to being quite easy - we started getting swamped with product work. The problem was keeping up rather than getting something to happen.

The [rest is history](../handbook/company/story).

## What you can learn from this

### Local versus global maxima

The hardest pivot to make was when we had the most traction. For us, that was dropping our technical debt tool.

It's easy to imagine a world where we just about scraped by with the tool, raised a small seed round from oversubscribed investors, and we'd still be struggling with something we weren't enjoying working on.

It was obvious our existing product wasn't working because our users told us as such. We had run out of ideas without starting the product from scratch, and we just didn't want to.

Ultimately, Tim and I realized we weren't the right people to be solving this problem.

### Thinking we wanted to change course, but not thinking about it enough

We pivoted so much we developed a knack for building an MVP and a new website in a single, glorious, all nighter and getting meetings by the first day to show it to people. That felt like progress, but in reality was just a bit dangerous. Similarly to how a child could operate a car.

We implemented an important rule:

1. If you decide to pivot, you have to wait at least until the next day to do it.

We inclined to pivot _very_ frequently, whereas it's more typical for people to not want to do so until way too late. Know where you sit on this line. We had to add a small delay so we weren't acting impulsively.

This is normally [the other way around](https://www.inc.com/scott-mautz/jeff-immelt-just-nailed-why-too-many-startups-pivot-their-business-too-late.html) - people don't start over soon enough. During Y Combinator, we saw companies say they were pivoting almost every time we saw them, but without having built and tested their new thing. Those companies had a really tough time by the end of the batch.

I'm now glad we were so decisive.

## Experts are just that

A meeting with the right person when you're at a literally pivotal moment can help you avoid a mistake that could cost you weeks, months or years of your life and your team's lives.

For the pivot to open source product analytics, there were a few things that speaking to experts helped us clear up:

* We spoke to a couple of people who weren't industry insiders, but with very significant experience working with a broad range of startups. This helped us realize that open source was the strategy, and all the features we wanted were just that.
* We met with a bunch of founders of huge open source companies. This gave us a very opinionated stance on where to focus. Coming from a SaaS background, giving so much away so freely felt counterintuitive, but it's why our launch went well.

People like this can be pretty friendly even if you don't know them and don't have a friendly introduction, if you're respectful of their time. Meaning, you've done your research, you're clearly at a major inflection point, and you're not trying to get a sale or investment from them. The latter just kind of happens naturally later on, but it wouldn't if we were exclusively interested in it.

It was remarkable how often we got a different view meeting people than just reading about their companies online. 

They'd explain why they went in a certain direction, or how they lost a bunch of time and money themselves doing the wrong thing. Don't just rely on the insanely-impressive growth studies you read about online.

You learn more by doing than getting advice, but sprinkling an intensive period of it in at such a key moment is important.

## Don't be scared to build

We continuously built products and recruited users onto something real. What people did and what we thought they'd do often diverged. [Jason Fried](https://twitter.com/jasonfried) goes so far as to say [you can't validate something that doesn't exist](https://twitter.com/jasonfried/status/1337095209620946944). The key is to not get scared about just building the thing you're talking about - Tim often only spent a week building things out, and during this time I was busy booking lots of meetings and finding potential users.

You _must_ be quick to do this. Others we heard of during the batch intended on spending months building their new idea out. That idea is a lot more frightening than starting with some throwaway code. Getting some production use, even if [embarrassingly early](/blog/we-ship-whenever#why), is important to know if your _concept_ is a compelling enough one that early users are willing to put up with some pain to try to solve the problem you're tackling.

## Have a user in mind

We didn't think about the users or companies we were building for. This is easy to over-think, but just a few hours of thought could have cut down the number of times we pivoted.

We focused on things we wanted ourselves, which was good, but some of those ideas just didn't apply to _anyone_ else.

## Let's end on an overused quote

Hey, at least we didn't scatter this article with emojis.

"The people who are crazy enough to think they can change the world, are the ones who do." - Steve Jobs

You're going to look pretty crazy if you pivot. That's because most people are used to working on a career where they steadily build in a certain direction. Startups involve a lot of zig zagging.

We stopped working on several ideas that probably could have worked out, _if_ we'd been willing to persist and to keep tweaking them. This makes us look non committal, but - as with anything - you learn a lot by doing; we knew we'd find something good but weren't done searching until the 6th idea.

Those very early decisions are the most leveraged you will ever take for your startup. Whatever you stick with may well be the thing you do for the next 10 years, and the stronger product market fit you can find early on, the easier everything else will be later. It's a lot easier to sell something that people want.

It turns out that PostHog has been about building something people want, that we also wanted to work on. If you're reading this article and having a tough time working out if you should pivot, drop us [an email](mailto:blog@posthog.com).

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_

