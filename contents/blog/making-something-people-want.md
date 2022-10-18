---
date: 2022-10-18
title: How we made something people want
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["CEO diaries", "Inside PostHog"]
author: ["james-hawkins"]
featuredImage: ../images/blog/ceo-diary.png
featuredImageType: full
---

It's one thing to build _something_, it's another to build something that _people want_.

Every principle here, that applied at 2 people and 0 users, is still relevant today at ~35 and ~50K developers in the community. In fact, you have to push harder to make this happen when you get bigger. 

## We started with a problem we'd had

We pivoted, [a lot](pivot-to-posthog). We repeatedly set out to solve problems we'd had in our previous careers.

Every time we pivoted, we wanted to set up product analytics for the new piece of software we ended up working on.

These were our frustrations:

* We couldn't get to the underlying data, to debug
* Opaque pricing
* Sending our data to a 3rd party (privacy, and adblockers causing us to lose 50% of our data)
* We didn't want to have to set up the telemetry manually. We wanted to auto capture front end events.

So we solved the above with our initial launch on HN.

Since then, we got a lot of feedback to build the products next door to ours. The ones that have done best are the ones we've used ourselves, a lot.

## Throw away bad ideas

If an idea isn't working, it may be easire to (i) congraluate yourself for trying and (ii) delete the code and start again. A solution looking for a problem isn't a fun place to be. 

## Ship for real life people

As soon as we had decided to build PostHog, our next phase was to see if anyone would use it.

Before launching on HackerNews, we focussed on this loop:

1. Find someone who is interested in what we working on

This was the only time we had to do outreach at PostHog.

I knew we were targeting developers, so with that in mind "I need a developer to implement and hopefully give feedback on this". We had no focus on money yet.

I went through (i) friends and family that sprung to mind (ii) literally my phonebook (iii) 1st connections on LinkedIn (iv) every developer I'd ever worked with via LinkedIn (v) every developer who'd worked at every place I'd ever worked.

I decided Whatsapp / SMS > Email > LinkedIn, depending on if I had each person's contact details. With ideas that didn't work out, it was harder work to get people to try it!

All messages were totally cutomized to the person. Nothing automated.

Within a couple of days I had a few teams who were up for trying it.

We spent a further $2K on ads on Twitter to see if we could get a little self serve usage up and running - our main focus here was to (i) check nothing was broken, in case it went viral when we launched and (ii) get the repo to 100 stars. I'd stress we had a hard 4 week deadline we'd set ourselves, so we were spending money to avoid spending more time to let the above happen naturally.

2. Give user access to new feature

Our only focus early on, was to make sure the product did the bare minimum. The first ever team could (i) login and (ii) see a list of events streaming from their website. The reason they were willing to implement something with so little value, at that point (!), was that they believed in the vision!

3. User uses it and gives feedback

We set up a [community Slack](../slack) group.

With each customer that would join, we'd create a private channel.

This made us feel very close with users.

We realized we had to _act_ on feedback/bugs and feature requests. We knew that if we acted on them, we'd get more, which means we'd make more progress. If we didn't do this, then users would stop giving us feedback and we'd die!

4. Repeat

For every new feature, we aimed to get a few early adopter users on it, and through the above loop. Every time we did so, this led to bug reports, UX improvements or something totally different. A bit like QA-ing a pull request.

It is _much _ better to ship like this, rather than shipping in isolation. With this approach, what you build will be much more likely to work, and you'll gain a far deeper understanding of your customers too.

This _still_ applies. See our [community roadmap idea](https://github.com/PostHog/posthog.com/issues/4453) - we're looking to go further with this.

## How to engage with users

Once we launched, we made it _very_ easy to get in contact.

Slack has been the most important channel because:

* many users had it open all day at work - we saw 20x the response rate of email
* people are trained to use it informally - people don't spend a lot of time to polish their communication on it, which means peope are more likely to post something

There are some issues with using Slack like this:

* It isn't ticketed (without looking for 3rd party apps)
* Once you have lots of people in your group, you lose messages if you don't pay for their premium features (which are way too expensive for most free communities to use)

(Later on, we built [Squeak!](https://github.com/posthog/squeak) to solve some of these)

## Focus on specific types of user

18 months after the launch of the open source project, we were getting a  lot ofp aid demand for (i) premium features 
