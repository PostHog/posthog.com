---
date: 2022-10-20
title: How we made something people want
author:
  - james-hawkins
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-ceo-diary-blog.png
featuredImageType: full
tags:
  - Founders
  - Product
  - Product-market fit
crosspost:
  - Blog
---

It's one thing to build _something_, it's another to build something that _people want_.

This principle, and the ones that follow in this post, applied at 0 users and are still relevant today at ~50K developers in our community. In fact, we have had to push harder to make them happen as we have gotten bigger. 

## We started with a problem we'd had

We pivoted, [a lot](/blog/story-about-pivots). We repeatedly set out to solve problems we'd had in our previous careers.

Every idea failed. However, a pattern emerged:

Every time we pivoted, we had to set up product analytics again.

Every time we set up product analytics again, we got frustrated by the following:

* No access to underlying data (to debug)
* Opaque pricing
* Sending our data to a 3rd party (privacy, and adblockers causing us to lose 50% of our data)
* Setting up the telemetry manually, which we didn't want to do. We wanted to auto capture front end events.

So we solved the above with our [initial launch on Hacker News (HN)](https://news.ycombinator.com/item?id=22376732).

## Ideas that sound bad, might be genius

We got a lot of feedback to build the products next door to ours.

I thought [this fateful request](https://github.com/PostHog/posthog/issues/149) for session recordings was a bad idea, and I pushed users too quickly to something else I had in mind.

Then Karl appeared.

Karl is, amongst other things, one of our engineers. What users were asking for made sense to him. So, during a hackathon, he shipped this (huge) feature in a week or two.

It was instantly popular.

It taught us that consolidating multiple tools into the platform made us much more valuable to users. It taught us that we could pull that off. We could now compete in cloud and wouldn't be reliant on self-hosting for the whole business.

Code won.

## Throw away bad ideas

The most perfect pre-product-market-fit startup, is a machine that repeatedly (i) learns (ii) ships (iii) goes back to step (i).

If you ship something, and learn that it's not popular (which will happen _most_ of the time), then you have a decision – do I _iterate_ this thing, or do I _start over_?

Startup lore is that most people will bias heavily towards iteration when they should just start over. Dalton, one our partners at YC, [has a great talk on this topic](https://www.ycombinator.com/library/6p-all-about-pivoting). It's understandable – you don't want to lose face by changing ideas.

Having an ego is expensive. For us, it was better value to throw the majority of our ideas away.

## Who does what

This must be simple for the greatest speed.

I found users, built the website and docs, and the occasional wireframe.

Tim (my cofounder and our CTO) dealt with existing users by shipping stuff.

## Ship for real life people

As soon as we had decided to build PostHog, our next phase was to see if anyone would use it.

Before launching on HN, we focused on this [growth loop](/product-engineers/growth-loops):

### 1. Find someone who is interested in what we are working on

This was the only time we had to do outreach at PostHog. Once we had product market fit, this need disappeared.

I knew we were targeting developers, so I needed to find some. Beyond that, I'd need them to implement and hopefully give feedback on the product. What we weren't trying to do was to get money this early on.

I went through (i) friends and family that sprung to mind (ii) my literal phone book (iii) 1st connections on LinkedIn (iv) every developer I'd ever worked with via LinkedIn (v) every developer who'd worked at every place I'd ever worked.

I decided WhatsApp / SMS > Email > LinkedIn, depending on if I had each person's contact details. With ideas that didn't work out, it was harder work to get people to try it!

All messages were totally customized to the person. Nothing automated. I was clear I was just hoping that we could get them as an early, free user – because we were preparing the product for a big launch.

Within a couple of days I had a few teams who were up for trying it.

We spent a further $2K on ads on Twitter to see if we could get a little self serve usage up and running – our main focus here was to (i) check nothing was broken, in case it went viral when we launched and (ii) get the repo to 100 stars. I'd stress we had a hard 4-week deadline we'd set ourselves, so we were spending money to avoid spending more time to let the above happen naturally. This step wasn't necessary, so please don't copy it if you have no capital.

### 2. Give user access to new feature

Early on, our only focus was to make sure the product did the bare minimum. The first ever team could (i) login (well, after we fixed the login screen – that was the first bug) and (ii) see a list of events streaming from their website.

The reason they were willing to let us implement something with so little value, at that point (!), was that they were friends with us and perhaps believed in the vision.

### 3. User uses it and gives feedback

We set up a [community Slack](../slack) group.

When new customers joined, we'd create a private channel. In the early days when we were a team of two, this is where users went from my responsibility, to Tim's.

This made us feel very close with users.

We realized we had to _act_ on feedback/bugs and feature requests. We knew that if we acted on them, we'd get more, which means we'd make more progress. If we didn't do this, then users would stop giving us feedback and we'd die!

### 4. Repeat

For every new feature, we aimed to get a few early adopter users on it, and through the above loop. Every time we did, this led to bug reports, UX improvements, or something unexpected. A bit like QA-ing a pull request.

It is _much _ better to ship like this, rather than shipping in isolation. With this approach, what you build will be much more likely to work, and you'll gain a far deeper understanding of your customers too.

This _still_ applies. See our [community roadmap idea](https://github.com/PostHog/posthog.com/issues/4453) – we're looking to go further with this.

## How to engage with users

Once we launched, we made it _very_ easy to give us feedback. Slack turned out to be the best channel because:

* Many users had it open all day at work - we saw 20x the response rate of email

* There's a low bar to posting because people use it informally – people don't spend a lot of time to polish their communication on it. We wanted more communication, rather than less, especially in the early days

There are some issues with using Slack like this:

* It isn't ticketed (without looking for 3rd party apps) - this can be painful now we've several thousand people in there

* Once you have lots of people in your group, you lose messages if you don't pay for their premium features (which are way too expensive for most free communities to use)

(Later on, we built [Squeak!](https://github.com/posthog/squeak) to solve some of these)

## Enter the Ideal Customer Profile (ICP) – focus on specific types of user

We spent the first 18 months focused on the open source project. We made a mistake though – we didn't get specific about who we were building for. We'd have said "developers are all the same, aren't they?" We were blind to our need of an [Ideal Customer Profile](/newsletter/ideal-customer-profile-framework) (ICP).

Bluntly, defining an ICP felt bureaucratic and like something a Fortune 500 would do. I put it in my mental bucket of things I don't care about, alongside words such as "synergy", "resources" and "alignment".

Alas, I was wrong. I think we could have saved about 30% of our time if we'd done this sooner.

Defining an ICP is something I'd do from day 1 if I were starting over.

Something we only cracked once we focused on our paid product was the importance of defining an Ideal Customer Profile. It's _still_ a work in progress.

Broadly, create a very, *very* specific list of characteristics and behaviors of the users you are building for. Look at [PostHog's current ICP](/handbook/strategy/overview#target-customers-for-2022) if you want an example.

## Listen to users

You may feel cleverer than users – you built the thing, right?

Wrong! You need them, not the other way around. 

Check your ego and listen to users, stay fast and you'll learn the most by doing. That's how you build something people want.
