---
title: How Supabase 10Xed by switching from Plausible to PostHog
customer: Supabase
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/supabase_light_30e9fe4a90.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/supabase_dark_91fbc944e4.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/445225882_d7aa6795_3350_4e88_9ca7_091c61e86e39_0ed5ee1f16.jpg
industries:
  - Devtool
users:
  - Engineering
  - Growth
  - Marketing
toolsUsed:
  - Max AI
  - Experimentation
  - Product analytics
date: 2025-06-15
---

When he joined Supabase’s marketing team, Aleksi Immonen says most of the data he needed was fragmented across a handful of different tools and point solutions. The team used [Plausible](https://posthog.com/blog/posthog-vs-plausible) to track website traffic, for example, but had also built a bunch of their own internal tools — including one, called Logflare, for event tracking. 

“The result was that it was quite frustrating to do anything with the data,” says Aleksi. “We were self-hosting Plausible and we had some data there, but it was limited and the UI was just so slow it was almost unusable.”

“And our A/B testing process! It was so tedious. It took at least a month to do even a simple test because so many teams needed to be involved and it was such a specialized task.”

Data wasn’t just fragmented — it was also incomplete due to the limitations of each individual platform and differences in their interoperability. Events tracked in Logflare, for example, didn’t always match 1:1 with data from Plausible, and no individual team had ownership of it all — until Aleksi got involved, that is. 

“Nobody really knew what product data we were tracking, and what data we did have was just a mess of BigQuery tables,” he explains. “But I’d used PostHog at my last company, really liked it, and knew that it could replace all the other things we had in one. Plus, we wouldn’t have to self-host it either.” 

<BorderWrapper>
<Quote
    imageSource="/images/customers/aleksi.jpg"
    size="md"
    name="Aleksi Immonen"
    title="Growth Marketer, Supabase"
    quote={`“I think PostHog is just super. It’s great for data collection, A/B testing, and web analytics. Plus, I also just really love how James’ communicates on Twitter through memes.`}
/>
</BorderWrapper>


## Using product analytics and Max AI to get insights, fast

Before switching to PostHog, which it deployed server-side via the Node SDK, Supabase’s team struggled to do even basic analytics due to the inconsistencies in their data and the reliance on complex BigQuery tables.

Now, every Supabase team can use the same set of data and interact with it effortlessly — either by using existing insight types, writing their own SQL, or using [Max AI](/max) to generate SQL queries for them.

“Just doing anything with the product data was so hard before,” explains Aleksi. “Like, even basic product analytics was difficult and we didn’t really have web analytics capabilities at all because we couldn’t combine Google Analytics sessions with other data. Now, we’ve got things like stickiness analysis right there in PostHog — and I can do most things without needing complex SQL. It saves us so much time and energy.”

Max AI, PostHog’s built-in AI assistant, is especially useful for complex investigations. Not only can Max easily write SQL queries on your behalf (or fix errors if you want to work alongside it), but it can be given access to your product data to help you find what you need. 

“I like Max as an AI helper because I don’t want to spend my energy going into specifics of SQL,” says Aleksi. “Instead, I just write something quick and explain what I want, and I know that it’s going to help. I can ask it to correct SQL queries, or even help me understand the correlation between events. It makes everything a lot easier, and faster.”

## How PostHog helped Supabase 10X weekly sign-ups

PostHog has unlocked many other advantages for Supabase, says Aleksi, including the ability to more quickly run A/B tests and experiment with new designs. However, the biggest win has been the ability to identify new growth opportunities and double down on them early.

“Like PostHog itself, most of our growth comes from word of mouth,” explains Aleksi. “We don’t run any ads and we think they’re a pretty inefficient way to acquire new users compared to our community — but with PostHog we noticed that integrations with AI builders are also _really_ important for our growth.”

As soon as the team spotted this trend and the early trickle of sign-ups from AI builders, the next move was obviously to build partnerships with them. Fast forward to now, and not only does Supabase have a clear view on how AI builders contribute to growth, but the team also regularly spots new builders appearing in its web analytics dashboard.

“Once I see a new one has appeared and I can see how many sign-ups it brings, I can then look at all the stats and make decisions about how to partner with them,” says Aleksi. “Now, as a result, we’re getting more users every week and we have 10Xed our user acquisition.”

“That’s not a figure of speech, by the way. PostHog has literally helped us get 10X more weekly sign-ups than we did a year ago. It’s changed everything.”