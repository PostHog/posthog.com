---
date: 2020-02-25T00:00:00.000Z
title: Pivot to PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - james-hawkins
category: CEO diaries
tags:
  - Y Combinator
---

YC has been running for 15 years, and getting bigger every year.

That means there are more than 2,000 companies in their network. Many are still small, many are dead, but many of them are huge – 102 are valued at more than $150M. The reason this is awesome if you are in the YC network is that it gives you a lot of customers that are slightly more likely to be friendly.

We focused on building pipeline, again – aiming for our 2 meetings a day routine. We went to as many of the meetings as we could in person.

A lot of these meetings went well – the product was getting stronger. We started talking money with people.

That’s when we realized, we had a problem.

We had 5 friendly companies in a row turn us down on price. We wanted to charge $39/month/user, but had clients telling us they’d pay just $5/month/developer. We could build a business like that, but it’d be tough to reach the kind of growth we wanted.

The final straw was when we dropped to $300/month for a team of 30 with one of the teams that was the most positive in the meeting (all based in SF, where the average software engineer salary is around $150K) and got told there was “no chance” of that working. Refusing to pay $10/month to power a $150,000 employee meant to us that our solution wasn’t good enough.

We came to the next group office hours saying we thought we needed to pivot – we couldn’t see a way to make the product more valuable. At the time, we decided we would produce a roadmap for tech debt – created by the engineering team, using surveys. The group convinced us to focus on using the surveys for engineering retention.

We used the rest of the meetings in our calendar to validate these ideas, but received little enthusiasm. We were starting to feel like a solution in search of a problem. We just stopped feeling excited about what we were doing.

Tim and I went to a YC dinner. It was an excellent talk by Mathilde, the CEO of Front. We decided in the car that we needed to start over.

Since we started in August, we kept a list of every single problem and startup idea that we’d had. It’s a long list – 3 pages. The reason we wrote them down is that writing them down stops you wasting time talking about them in more depth when you need to focus on something else.

One of the things that struck us was implementing product analytics was really frustrating – we wanted to be able to auto-capture all the front end events. We also, crucially, didn’t like sending user data to 3rd parties.

The last pre-booked meeting I had was with the founder of Sentry. They have a [BSL](https://blog.sentry.io/2019/11/06/relicensing-sentry) license – their paid and open source versions are identical. I went to the meeting to talk about engineering retention, but it fell flat. Then I asked what they do about product analytics. “We would never send all our data to 3rd parties, we have a bunch of people who run our own data platform”. That was all the encouragement we needed to go with our gut.

We decided to build open source product analytics.

YC also let you book office hours with one partner at a time. This lets you go into more depth in whatever issue you want to talk about.

We spoke to our partners about the idea. They felt that auto-capture wasn’t really the highlight – it’s just a feature, but that the open source thing was pretty exciting. When Dalton described it as a 10/10 idea, his enthusiasm was infectious, and out we went to build it. Like, that evening.

We went home, and rebranded to [PostHog](https://posthog.com), and got a new website live. Tim started the product. Aaron started booking discovery meetings. We were up until 3am.

What followed was the most intense 3 weeks of work of our lives. We started working from around 9am to anywhere between midnight and 3am, 7 days a week.

Our only break each day would be a 10 minute walk to the local sandwich shop, and a single episode of Parks and Recreation.

![A PostHog lunch break](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/02/sandwich-scaled.jpg)

We kept exercising and eating healthily, but we had to make up for lost time to make the most of the opportunity of demo day.

We decided there would be two major goals. The first would be a Hacker News launch. The second would be landing a large paid pilot. 

Our partners encouraged us to speak to the best people in the world at running open source companies – we reached out, and every single one of them said yes! In general, we’ve found that people are really helpful when you’re seeking advice and not trying to sell them something.

We emailed or met the founders of GitLab, Mattermost, and Docker, on top of the meeting with the folks from Sentry we’d already had. They helped us understand how open source business models work. They also made us realize that we needed to work on the community before anything else – that with a lot of usage, and a vibrant community, what follows is inbound interest.

In parallel, we took $1K, and spent it on some paid ads on a few display networks online. We wanted to get the product in more people’s hands to iron out some bugs. We got really positive feedback from the developer community, and a few constructive ideas, which we put into the product before the Hacker News launch.

January 23rd was when we started writing code for PostHog. We set a deadline for the Hacker News launch of February 20th. We had one day off in this period – we went hiking at the hills around Stinson Beach with friends:

![Hiking at Stinson Beach with friends](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/02/cbcffff9-af00-41d7-896d-65ac04a4b9a3.jpg)

We wanted to have complete documentation, SDKs, and the product all in existence for that date. Surprise, surprise, after a 3.45am finish the night before, it was done.

We put the post live and told a couple of early users. It immediately started getting upvotes and made it to the front page.

We got significantly over 100 sign ups (and may have had more – we let users opt out of our tracking), and within a week of the repo going public, we were at 800 stars. We had a bunch of inbound demand ranging from indie developers through to multinational corporates who liked our product from a data privacy perspective.

More pleasingly, we had a bunch of GitHub issues raised, and even a PR or two from people we didn’t know. That was a good sign that we could build a community.

We were off to the races!

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_



