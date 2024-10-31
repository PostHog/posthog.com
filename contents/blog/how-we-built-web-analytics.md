---
title: "Building a Google Analytics alternative: the hard parts"
date: 2024-10-24
author:
 - lior-neu-ner
 - robbie-coomber
rootpage: /blog
featuredImage: >- 
  https://res.cloudinary.com/dmukukwp6/image/upload/mobile_replay_7ff47733d8.png
featuredImageType: full
tags:
 - Guides
---

There's a divide between marketing and product tools. 

On one hand there's [web analytics](/web-analytics), tools like Google Analytics and Plausible exist to serve marketing teams. They focus on analytics for your marketing site, and focus on metrics like top sources of traffic, bounce rate, and so on.

On the other hand, there's [product analytics](/product-analytics). Tools like PostHog, Mixpanel, and Amplitude exist to serve product teams. They focus on analytics for your product, and focus on metrics like feature adoption rate, user retention, and so on.

But what ends up happening is that information is siloed in separate tools and separate teams. This makes it hard to get a complete picture of what's happening with your business. This makes it hard to answer questions like:

- What ad campaigns are giving you the best retention?
- What pages on your website are driving the highest paying customers?
- How do users who read your docs before signing up compare to those who don't?

 Our users were grumbling and they wanted us to fix this. So off <TeamMember name="Robbie Coomber" /> went to investigate how to build web analytics.

![Marketing and product teams](https://res.cloudinary.com/dmukukwp6/image/upload/989ry1_cc27ac90e3.jpg)
![Siloed data](https://res.cloudinary.com/dmukukwp6/image/upload/989ry1_cc27ac90e3.jpg)
![Siloed data](https://res.cloudinary.com/dmukukwp6/image/upload/download_2_e0046b3acb.jpeg)

## The gap between product and web analytics

Up until now, PostHog only offered product analytics. You may think to yourself, "Well, why not just use product analytics for web analytics?" and the answer to this is "Yes you can, but...".

<!-- Could maybe add a line here about how robbie built a dashboard -->

There are two things holding back product analytics from being a world class tool for web analytics:

1. **Cost**
2. **Performance**

But why is there a difference? Fundamentally, in web analytics you care about _what_ people are doing on your website and _how many_ people are doing it, but in product analytics the _who_ is also important. 
![Web analytics vs product analytics](https://res.cloudinary.com/dmukukwp6/image/upload/web_vs_prodyuct_21a8b644e9.png)

Ultimately, this makes product analytics more complex and expensive. So Robbie had to adapt our existing architecture to fix these.

Let's dive into the two main issues between web and product analytics and how Robbie fixed them

### 1. Costs

Product analytics is more expensive than web analytics because it has to deal with person profiles. Each event is associated with a unique person, and events need to aggregated for each person, regardless of if they're using app across multiple devices, platforms, or sessions.

In web analytics, everything is session-based. A session consists of multiple events. Each event has properties set on it, such as the URL, device, and geolocation. When you query data, properties are read from the event. 

This also means that in web analytics, there's no concept of a "person". So you cannot query based on person properties. For example, you cannot filter queries based on the date a user first signed up.

![Web events vs product events](https://res.cloudinary.com/dmukukwp6/image/upload/events_6caabf2705.png)

Person properties change frequently too, since every event may have data that could be relevant to the user. For example, the URL of the last page they visited, or the most recent browser they used are important properties to store.

This requires creating and storing a person profile for each user. Usually, we use [ClickHouse](https://posthog.com/blog/how-we-turned-clickhouse-into-our-eventmansion) for our data storage. However, ClickHouse is optimized for storing larges amounts of data that never changes (like events). But since person properties can change frequently, we store them in Postgres.

![Processing events for web analytics vs product analytics](https://res.cloudinary.com/dmukukwp6/image/upload/Untitled_2023_07_04_1645_efb32323b9.png)

Including PostGres in our data pipeline introduces more overhead. There are also other edge cases to consider. For example, it's possible for a user to have multiple profiles created for them (for example, if they log in on different devices). We then need to merge these duplicate profiles.

All these extra steps in our pipeline mean that processing, storing, and querying data is more expensive for product analytics. Thus if we were to use our existing product analytics architecture for web analytics, the costs of it would be too high.

### 2. Why web analytics performance is faster

People have high expectation for web analytics query performance. This is for a few reasons:

1. Google analytics (the benchmark) is fast.
2. The queries you view for web analytics are mostly the same each time. For example, people always want to know about unique visitors or bounce rate.

On the other hand, product analytics users have slightly lower expectations for performance. They're a bit more generous with their waiting time since queries are usually custom and complex. For example, someone may create a query to see how users interacted with a specific feature in their product.

But why is product analytics slower? When you have millions of events, the best way to optimize query performance is do sampling. But this is not possible for product analytics. Let's have a look at why:

As mentioned above, we use ClickHouse to store our events. It stores rows in blocks called "granules", and each granule contains about 8,000 rows. When you need to read a single row, you need to load an entire granule.

Now, in web analytics, it's easy to sample events from a single session since all the events are highly likely to be stored together in a single granule.

However, for product analytics, their data is likely to spread across multiple granules. This is because a single user is likely to have multiple IDs over time (for example, if they logged in on different devices). As a result, if you need to sample events from a single user, you still need to load all the granules. So you don't get the performance benefits of sampling.

![image of clickhouse granules](https://res.cloudinary.com/dmukukwp6/image/upload/granules_f969035f22.png)

## Our solution

### 1. How we improved costs
Robbie came up with [anonymous events](https://posthog.com/blog/anonymous-events). These are to be used for web analytics, while our existing product analytics would continue to use our regular events (now called **identified events**).

Anonymous events and identified events differ in an important way: For anonymous events, we don't create a person profile. This means we can write our events directly to ClickHouse first, without needing to deal with Postgres at all. This massively reduces our processing costs.

Anonymous event you can still:
- Set event properties
- Aggregate and filter events by event properties e.g. URL, geographic location, UTM source.
- Create insights like trends, funnels, SQL insights and more.

However, since they don't have a person profile, you cannot:
- Filter on person properties
- Create cohorts based on person properties
- Use person properties for targeting [feature flags](/feature-flags), [A/B tests](/experiments), or [surveys](/surveys)

### 2. How we improved performance

Using anonymous events improved the processing time of writing events to ClickHouse. However, Robbie still needed to improve query performance.

Unfortunately, Robbie was still not able to implement sampling as all events are stored in the same ClickHouse granules, regardless of whether they are anonymous or identified. Refactoring the database so it can support event sampling is going to be a heavy lift, but in the meantime Robbie came up with a workaround.

To start, Robbie built an initial version of the web analytics dashboard to get a feel for the default performance of the queries. It showed important web metrics like number of unique visitors, bounce rate, top sources of traffic, visitors by device type, and more.

Next, Robbie noticed that metrics such as session duration, session bounce rate, and top pages could be precomputed. He implemented a robust processing pipeline that calculates these metrics for each session in the background once a session has ended. These precomputed results are then stored in a separate table in ClickHouse for fast querying.

This means that when you query these metrics, you don't need to query every event and do your calculations at query time. Instead, you can just read from the table. This massively sped up query performance.

![How we improve performance](https://res.cloudinary.com/dmukukwp6/image/upload/perf_6cafe5250e.png)

Robbie still has plans to improve performance. Besides implementing event sampling, he also wants to improve query performance by loading all the data on the page in a single query, instead of multiple separate queries for each metric (and if this sounds interesting to you, [we're hiring!](/careers/product-engineer)).

## End result

Ultimately, all of Robbie's efforts means that we've been able to save a huge amount of costs on anonymous events – a saving which we're passing onto our customers. Anonymous events are currently 4x cheaper than identified events!

The performance improvements have also increased the initial dashboard load time by more than 50%, meaning that our users can get insights their faster.

See, we told you Robbie wasn't lazy!

![Great job, Robbie!](https://res.cloudinary.com/dmukukwp6/image/upload/Group_10118_c7ca47feb9.png)
