---
date: 2021-01-14
title: A story about pivots
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
---

PostHog has pivoted _a lot_.

After 5 pivots in 6 months, we got into [YCombinator](https://www.ycombinator.com/) last year, pivoted again whilst we were there and have now gone from the first commit to \$12M raised, thousands of deployments and a team across 10 countries, in well under a year.

This is that story and what we learned from it.

##You'll feel silly

It goes something like this:

1. Convince yourself then your family, friends and colleagues you have some great idea.
1. Quit your job.
1. Build it. Listen to the soundtrack from [The Social Network](https://www.imdb.com/title/tt1285016/) way too much.
1. Everyone thinks your thing is terrible. Hopefully you realize.

The nature of a startup is that you have to [talk to users](https://www.ycombinator.com/library/6g-how-to-talk-to-users). Or so we've heard.

My sole focus for weeks on end was just to get meetings with people that we felt may have the same problem we were trying to solve.

## It got good eventually, right?

In 9 months, we built 6 products and did more than 100 meetings with potential users.

The range of ideas we tried to solve looks broad, but the thing that connected all of them was that we focused on problems we felt we'd experienced in our previous professional lives.

So, what did we build?

### 1. Sales Territory Management Tool

At one stage in my life, I was the VP of Sales at an enterprise software company. On paper, it looked like a glamorous job - I used to fly around the world with the sales team, to go to important meetings with huge banks, in fancy skyscrapers, like the [ICC in Hong Kong](https://en.wikipedia.org/wiki/International_Commerce_Centre):

![International Commerce Center - a big skyscraper in Hong Kong](../images/blog/pivoting/international-commerce-centre.jpg)

I vividly remember the realization that over 90% of your sales pipeline, roughly, will never close. Even if you're really, really good at sales.

The _majority_ of your time is spent getting nowhere. All those hotels, flights, calls, fastidiously wearing a suit in inappropriately warm weather - very few of those things actually result in anything.

Sidenote: this is why [product led growth](../handbook/growth/strategy) is so much better.

If you're not getting anywhere with a potential customer after a few weeks or months of trying, your time is better spent elsewhere. Yet systems that are the core products of [\$17.1Bn revenue companies](https://en.wikipedia.org/wiki/Salesforce) come with a manually selected arbitrary number for the percentage probability that doesn't vary with time.

We pulled pipeline data from Hubspot or Salesforce, then used predictive analytics to work out how this curve looked based on historic data, then applied it to the current pipeline. Once a deal dropped below a certain threshold, we'd recommend you swap out that target company and pull a new one into the pipeline.

We confused a lot of people with this idea, because we ourselves were confused with whom we were targeting.

We got 15 sales leaders to agree to trying this out, sent them a link, then waited...

and waited...

just _one_ person even clicked the sign up link. The rest didn't even try it.

With hindsight, it was way overpowered for tiny teams and we'd only have had a great fit for huge ones with a lot of data. The only people interested in smaller teams were, to use [Crossing the Chasm's framework](https://en.wikipedia.org/wiki/Crossing_the_Chasm), innovators, which doesn't represent most of the market. And doing _only_ sales into big companies would be really tough - slower sales, a better product required, and a longer cycle time so reduced learning.

### 2. CRM with Predictive Analytics

We had a single real user.

One of our friends who ran a small sales team had been really engaged with the product. Why?

He had used it to _replace_ his CRM. 

Could we just do the whole lot in one place, and reimagine the CRM?

Perhaps it was too much to ask people to use a separate tool to manage their sales territories. The integration with Hubspot and Salesforce made the product feel quite complicated. People sure looked confused when we spoke to them! 

We positioned the product as a CRM for small companies, with predictive analytics for an even simpler experience managing everything. We tweaked the functionality to have more control over deals and contacts.

It suddenly got really hard to get anyone to talk to us.

There are many lightweight CRMs out there, and predictive analytics make more sense for those with more data not startups with hardly any.

This was around the time that [Superhuman](https://superhuman.com/) was getting pretty popular; we got overexcited, and kept using words like "blazing", "gorgeous", "brilliant". I think we got overexcited. I blame [VC Twitter](https://sifted.eu/articles/vc-brags-twitter/).

We didn't think through who we were building for. The market we were working on was very busy, so if I went back in time, I would have focused more on our differentiation - a product could make more sense than a platform to start out. Tim and I also just weren't strong enough at design to differentiate on that alone.

After hundreds of messages to potential users, we eventually got a single customer for $20/month, who then didn't actually pay the invoice. If you're pushing this hard and getting nowhere, you don't have the magic of [product market fit](https://www.youtube.com/watch?v=l-vfn97QTr0).

### 3. 1:1 Tool with Predictive Analytics

Back to basics - what the actual problem we were solving?

It was the prioritization of where to focus your sales efforts. If 90% of your deals deals won't close, you need to get good at not spending time on those that aren't going to close.

[Andrew Grove](https://en.wikipedia.org/wiki/Andrew_Grove) has an excellent book, [High Output Management](https://www.amazon.com/High-Output-Management-Andrew-Grove/dp/0679762884/ref=sr_1_1?dchild=1&keywords=high+output+management&qid=1610712757&s=books&sr=1-1). The premise is that your 1:1 meetings with your direct reports are your most leveraged time.

Yet, many managers in practise don't really end up preparing properly.

![A team that look a little bit like their happiness is staged](../images/blog/pivoting/amazing-team.jpg)

We changed the UX completely, and made an app that looked a bit like google docs, where you and your reports could each create an agenda in advance and take notes. The twist? The product would interpret your sales pipeline and would use predictive analytics to suggest specific deals to discuss that could be worth replacing or that had changed dramatically since the previous week.

We managed to get lots of meetings easily with this idea, and everyone reported not preparing to the standard they wanted. Did we have a silver bullet?

Despite giving out logins, only one team out of around 10 started using the tool. 

We were flumoxed. This tool was simple, people were excited, but no one used it.

For those that haven't read it, [The Mom Test](http://momtestbook.com/), which I wish I'd read sooner, explains our downfall here perfectly:

```
If they haven't solved the problem, ask why not. Have they tried searching for solutions and found them wanting? Or do they not even care enough to have Googled for it?

Rule of thumb: Anything involving the future is an over-optimistic lie.
```

If we'd have asked this question, we'd have saved a couple more weeks of time.

By this stage, we were thinking we just wanted to work with people that would at least try our stuff. These pesky heads of sales were just too capricious and we needed a break.

Software engineers, surely they'd be more willing to try something that we built. We moved on to a different idea we'd had.

### 4. Technical Debt Monitoring Tool using Surveys after each Pull Request

It turns out everyone has problems with technical debt, but solving it involves changing how teams prioritize.

We just weren't the right people to run this business. Although Tim had struggled with technical debt first hand, neither of us had struggled with actually solving it. If one of us had managed an engineering team before, we'd have perhaps been better placed to understand this area.

Along the way though, we learned a lot about how developers and product managers work together. We'd also created a large list of

If you can't stop thinking of other ideas, you probably are building something you don't like. 

### 5. Engineering Retention Tool using Surveys after each Pull Request

Those fickle engineers joining companies and leaving them whenever they want to.

This idea didn't come from us, which doomed it before it even really started.

This lasted all of 5 days. We had a bunch of meetings left over from (4) to validate it. Amusingly we had to do a YCombinator demo day dry run for this in front of 500 people who made up the YC batch.

We had a wildly unenthusiastic response from prospective users. The lowlight was during one of the meetings that we resorted to asking the CTO of an 80 person start up what his biggest problem was, "I've not really got any". Noice.

<div style='position:relative; padding-bottom:calc(56.25% + 44px)'><iframe src='https://gfycat.com/ifr/CheapFeistyDassierat' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div><p><a href="https://gfycat.com/discover/andy-samberg-gifs">from Andy Samberg GIFs</a></p>

### 6. Open Source Product Analytics Platform

Things got meta.

Along our journey (/series of failed ideas), we got frustrated having to send all our user data to 3rd parties. It felt wrong and it meant we'd lose a bunch of user data that would have been quite useful.

The [rest is history](../handbook/company/story).

## What you can learn from this

###Local versus global maxima

The hardest pivot to make was when we had the most traction. For us, that was dropping our technical debt tool.

It's easy to imagine a world where we just about scraped by with the tool, raised a small seed round from oversubscribed investors, and we'd still be struggling with something we weren't enjoying working on.

It was obvious our existing product wasn't working because our users told us as such. We had run out of ideas without starting the product from scratch, and we just didn't want to.

Ultimately, Tim and I realized we weren't the right people to be solving this problem.

###Thinking we wanted to change course, but not thinking about it enough

We pivoted so much we developed a knack for building an MVP and a new website in a single, glorious, all nighter and getting meetings by the first day to show it to people. That felt like progress, but in reality was just a bit dangerous. Similarly to how a child could operate a car.

We implemented an important rule:

1. If you decide to pivot, you have to wait at least until the next day to do it.

Our inclination was to pivot _very_ frequently, whereas it's more typical for people to really not want to do this. Know where you sit on this line. We had to add a small delay so we weren't acting impulsively.

This is normally [the other way around](https://www.inc.com/scott-mautz/jeff-immelt-just-nailed-why-too-many-startups-pivot-their-business-too-late.html) - people don't start over soon enough. During YCombinator, we saw companies say they were pivoting almost every time we saw them, but without having built and tested their new thing. Those companies had a really tough time by the end of the batch.

I'm now glad we were so decisive.

##Experts are just that

A meeting with the right person when you're at a literally pivotal moment can help you avoid a mistake that could cost you weeks, months or years of you and your team's lives.

For the pivot to open source product analytics, there were a few things that speaking to experts helped us clear up:

* We spoke to a couple of people who weren't industry insiders, but with very significant experience working with a broad range of startups. This helped us realize that open source was the strategy, and all the features we wanted were just that.
* We met with a bunch of founders of huge open source companies. This gave us a very opinionated stance on where to focus. Coming from a SaaS background, giving so much away so freely felt counterintuitive, but it's why our launch went really well.

People like this can be pretty friendly even if you don't know them and don't have a friendly introduction, if you're respectful of their time. Meaning, you've done your research, you're clearly at a major inflection point, and you're not trying to get a sale or investment from them. The latter just kind of happens naturally later on, but it wouldn't if we were exclusively interested in it.

It was remarkable how often we got a different view meeting people than just reading about their companies online. 

They'd explain why they went in a certain direction, or how they lost a bunch of time and money themselves doing the wrong thing. Don't just rely on the insanely-impressive growth studies you read about online.

You definitely learn more by doing than getting advice, but sprinkling an intensive period of it in at such a key moment is important.

## Don't be scared to build

We continuously built products and recruited users onto something real. What people did and what we though they'd do often diverged. [Jason Fried](https://twitter.com/jasonfried) goes so far as to say [you can't validate something that doesn't exist](https://twitter.com/jasonfried/status/1337095209620946944). The key is not to get scared about just building the thing you're talking about - Tim often only spent a week building things out, and during this time I was busy booking lots of meetings and finding potential users.

You _must_ be really quick to do this. Others we heard of during the batch intended on spending months building their new idea out. That idea is a lot more frightening than starting with some throwaway code. Getting some production use, even if [embarassingly early](/we-ship-whenever#why), is really important at least to know if your _concept_ is a compelling one.

## Have a user in mind

We didn't think about the users or companies we were building for. This is easy to over-think, but just a few hours of thought could have cut down the number of times we pivoted.

We focused on things we wanted ourselves, which was good, but some of those ideas just weren't applicable to _anyone_ else.

## Let's end on an overused quote

At least we didn't scatter this article with emojis.

"The people who are crazy enough to think they can change the world, are the ones who do." - Steve Jobs

You're going to look pretty crazy if you pivot. That's because most people are used to working on a career where they steadily build in a certain direction. Startups involve a lot of zig zagging. Don't worry about it - egos are expensive to maintain.