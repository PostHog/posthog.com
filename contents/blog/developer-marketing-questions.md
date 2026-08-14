---
title: Questions people ask me about developer marketing
date: 2026-08-14
author:
  - joe-martin
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/vibes_based_marketing_aff77241ee.png
featuredImageType: full
category: Inside PostHog
tags:
  - Marketing
  - Growth
seo:
  metaTitle: Questions people ask me about developer marketing
  metaDescription: PostHog's marketing lead answers the questions he gets asked most about developer marketing, covering channels, billboards, merch, community, and who to hire first.
---

One of the baffling things about leading the marketing team at PostHog is how often I get asked for advice. People seem to look at PostHog and say "_Wow, they have billboards across San Francisco, they must really know what they're doing_" — but that's not how it feels on the inside.

There is no grand unified theory of marketing, here or anywhere else. Anyone who pretends otherwise is lying to you for money. Best I can figure, the only thing that makes marketing at PostHog different is that we're more transparent about this than most. I've never even been to San Francisco!

Regardless, I keep getting asked to hop on quick calls. I'm always happy to chat, but I thought it would be helpful to write down ~~the answers~~ my thoughts on the most common questions.

## "I built something and told people about it. What should I do now?"

Tell them again, probably.

When we were [repositioning PostHog](/blog/repositioning-posthog), we had the idea that every marketing message should land in three places, in three different ways. So launching our Slack agent, for example, didn't just go in the changelog one time — it also got [a video](/slack) and an automated recommendation for users on [our startup program](/startups). Like every launch we do it got [a GitHub issue](https://github.com/PostHog/requests-for-comments-public/issues/548) which extended past the initial launch moment to include pre and post launch tactics.

Marketing a feature is a piece of art: it never gets finished, just abandoned.

## "What channels should I use?" / "What works?"

The short answer is an unhelpful "It depends".

The long and still unhelpful answer is "It depends what you're good at."

Non-marketers expect channel advice to be tiered somehow: start with small stuff like social posts, then graduate to medium stuff like events, then big stuff like billboards, then prestige stuff like TV. In reality you can use any channel whenever you want, they are all big stuff, and you should move between them based on what you can do best and what you can do authentically.

"What you can do best" just means leaning into your strengths. At PostHog we didn't decide to build [a newsletter](/newsletter) and focus on content marketing for any reason other than those were things we knew how to do well. If we'd been a group of former TV executives we'd have probably done something different.

"What you can do authentically" is harder to define, but is something you should know intuitively. If a channel or your usage of it doesn't _feel_ like an authentic extension of your brand or your internal culture, listen to that. At PostHog we don't avoid webinars and gated whitepapers because those channels are ineffective — it's just that we think they're kind of lame and don't feel very PostHoggy.

![Two PostHog billboards](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_billboards_e88ae00afe.png)
<Caption>Credit for billboards belongs with <a href="/community/profiles/27881">Lottie</a></Caption>

## "OK, but what about those billboards?"

We did the billboards initially as an experiment. It felt like a channel we could have a lot of fun with and that fit our strategy, so we gave them a go. [People seem to really like them](https://www.uglygtm.com/blog/posthog-best-billboards), so we keep doing more and the [old billboards get recycled into merch](/merch).

People often ask how we measure the performance of the billboards, but that's kind of missing the point. They are not a channel that drives sign-ups. They are a channel that drives awareness. The measure of success isn't being able to tie an enterprise deal to a placement — it's seeing if people like them and talk about them.

## "You do great merch. How do you justify that and what suppliers do you use?"

<WistiaEmbed mediaId="dibqzlkov4" aspectRatio={2.3880597} />
<Caption>We take an outsized amount of pride in our merch</Caption>

Thanks! We put a lot of effort into merch.

Our merch doesn't really exist to be profitable. It exists to spark joy. Justifying its existence is really a matter of whether we have confidence in the concepts. It helps that we have [an incredibly stylish and talented graphics team](/teams/graphics) who design everything in-house.

In terms of suppliers, we have tried many over the years. Currently we work with [Micromerch](https://www.micromerch.com/). Much of our clothing stock is sourced from [AS Colour](https://ascolour.co.uk/) and, until recently, most of the modelling was done by our team (that's me in the [Scrabble t-shirt](/merch?product=scrabble-t-shirt)).

## "New users don't know about old features. What should I do?"

Oh my gosh, same. It's a legitimate challenge of building a product as broad as PostHog that there are users who _still_ think we're just a self-hosted product analytics tool.

Two things to remember:

- It is often more effective to upgrade an existing user than acquire a new one, and
- small gains compound, so don't overlook them.

Usually this means investing in your onboarding flows as a way to educate users about existing features as well as new ones. I've written elsewhere about [what PostHog's email onboarding looks like](/blog/how-we-built-email-onboarding) and we're increasingly taking those lessons into other channels too, such as in-app messaging or [the Wizard](/wizard).

## "How can I communicate small improvements without creating spam?"

Spam is a content or a targeting problem, not a volume problem. If your content is good enough and users can be targeted well enough, you could message them every day and be fine. With this in mind: [talk to your users](/blog/bribing-customers-to-talk-to-me) and ask them what content they would find valuable from what channels, when.

Not every improvement needs its own announcement, either. We batch small changes into [the changelog](/changelog), and save dedicated emails for things that change how someone actually works. Always question if an email actually needs to be sent before you send it.

## "If people just searched/prompted, they would find my thing (I think) but they aren't"

[Are you sure you're solving a problem that people actually need solved?](/founders/product-market-fit-game)

## "How do you approach AEO?"

I do [whatever Nat tells me](/blog/aeo-advice) to do.

## "How do I market products that haven't launched yet?"

We call that pre-marketing. It's something I've been specifically focused on this quarter, as you can see from [my current goals](https://github.com/PostHog/requests-for-comments-public/issues/569). The basic system is:

1. A [public roadmap](/roadmap) so people can see what we're building, or thinking of building.
2. A way for them to sign up to a waitlist and self-serve into available betas.
3. Automations which inform users on a waitlist when something moves to alpha or beta.
4. Automations which ask users for periodic feedback on alphas or betas.
5. Automations which relay this feedback to the relevant team internally.
6. A way for users to pitch new ideas into the roadmap.

Beyond this we also use some regular marketing surfaces, such as the monthly changelog email and onboarding emails, to highlight particular betas we're excited about.

We don't run paid marketing for betas.

## "How can we build a community around our product?"

I get asked this surprisingly often given that community is something I don't think we've historically done very well. Maybe that's because it's never clear what people mean by 'community'. Is it a packed event calendar, your social media mentions, the general vibe from your customers, or something else entirely?

Some of these things, like [in-person events](/events), PostHog does really well now. But we didn't always. The very first event we ever put on cost $10,000 to host and took me weeks to organize — but in the end only six people showed up and one of them was a personal friend of mine. My attic was full of leftover merchandise for months.

The lessons I took from this were:

- **You need to strongly define what your community is.** Asking what the users in it really want and what you want to achieve with it should tell you what to do next. We ran our first event because we assumed that a busy Slack channel meant people wanted to talk. In reality they wanted technical support, not a fireside chat.

- **I am not personally good at events.** Seriously, I panic at the idea of organizing my own birthday parties and this meant I wasn't approaching it authentically or capably. We needed [an expert](/community/profiles/34023).

## "Who should I hire as my first marketer?"

I'm incredibly biased, but I do think product marketers are the best first marketing hire for early stage teams.

Product marketing managers — or product marketing meddlers, if you prefer — focus on the most pressing issues for early stage teams, such as how to position your product in a marketplace, and how to translate marketing strategies into things users actually care about. In my experience product marketers are also very T-shaped and can pick up a wide variety of tactical work too. [The best ones tend to be good at lots of things](/blog/how-to-get-hired-marketing).

That said, hiring a marketer isn't something to rush into. None of [PostHog's first five hires](/founders/posthog-first-five) had ever done marketing before and it would have been far more damaging to hire the wrong person early on than to [go without a positioning statement](/blog/minimum-viable-product-marketing) for a few months.

<iframe
    width="560"
    height="315"
    src="https://www.youtube-nocookie.com/embed/8hMfu3kXR20"
    title="DeskHog Demo Video"
    className="rounded shadow-xl"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
></iframe>
<Caption>DeskHog was a vibes-led idea, not a data-led one</Caption>

## "What data do you track to know you're successful?"

This sometimes surprises people, but the marketing team at PostHog is not often very data-led. I think this stems from my early career as a journalist, where I was mentored to chase good stories over better metrics. There are definitely other team leads (like [Andy](/community/profiles/30208) and [Ian](/community/profiles/29296)) who are more attuned to the data than I am — but, again, there is no single unified theory here.

This isn't to say we are _data-blind_, however. Marketing is responsible for new user sign-ups and we track that figure and a few others closely. But where we can, we prefer to judge the success of things by other factors, like "Did users say they enjoyed this?" and "Do _we_ want to do this again?"

Data, like AI, is a tool. We use it when it makes sense to, but we don't use it as the solution to every problem.

![A water bottle with a sticker reading "There are so many things more important than profit"](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/profit_yuck_1945a5ea42.png)
<Caption>My water bottle is a constant inspiration</Caption>

## "How do you track ROI for these campaigns?"

I personally do not care about, or track, the money we make very much. I prefer to focus on things that are worth doing or interesting for reasons other than profit.

If anything, the PostHog marketing team is often under pressure to [_spend_ more money](/blog/on-doing-more-weird). If you want to make more money, all I can say is: try charging more, or try [spending money to make money](/founders/actual-marketing-budget-2026).

## "What am I missing?" / "What advice do you have?"

**One:** Don't succumb to all the same influences and self-help business books as everyone else and expect to learn anything new. I learned more about marketing reading Masters of Doom and hanging out with artists than I did reading No Rules Rules and going to conferences.

**Two:** Take a chance hiring young or unusual people when you can. Same reasoning: you're never going to create something original by hiring people with tired, predictable playbooks. Plus, it's an unalloyed Good Thing!

**Three:** Start every marketing decision by asking "Does this feel right for our culture?" because everything comes back to that eventually anyway.

**Four:** [Orwell's sixth rule](https://sites.duke.edu/scientificwriting/orwells-6-rules/) applies to all of the thoughts above.

## "Shouldn't this have been a Reddit AMA or something?"

Maybe, IDK.
