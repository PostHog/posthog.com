---
title: The hard parts of building a Google Analytics alternative
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

Last month we finally launched [web analytics](/web-analytics), our Google Analytics alternative 🎉 

You would think for a company that already does [product analytics](/product-analytics), adding web analytics would be easy. Alas, this is not the case. It took <TeamMember name="Robbie Coomber" /> a year to do it, and it's not because he's lazy. 

They're fundamentally different products and thus require different architectures. In this post, we dive into the differences between the two, the challenges we faced, and how we solved them.

![Photo of Robbie being lazy](placeholder)
<Caption>Robbie. He's definitely not lazy.</Caption>

## The difference between web and product analytics

When people talk about **web analytics**, they're referring to tracking visitors to your marketing website. They care about things like page views, bounce rate, and top sources of traffic.

On the other hand, **product analytics** tracks how people are using your web or mobile app. It gives you insights into metrics such as feature adoption rate, user retention, and churn.

In practice, this means that for web analytics you care about _what_ people are doing on your website and _how many_ people are doing it, whereas in product analytics the _who_ is also important.

![Web analytics vs product analytics](https://res.cloudinary.com/dmukukwp6/image/upload/web_vs_prodyuct_21a8b644e9.png)


Fundamentally, this makes web analytics simpler. You only need to track sessions, without attributing previous events to the user. On the other hand, for product analytics it's important to identify and track individual users over time. 

A person can have multiple IDs
<!-- <todo add diagram of events. For product you have person in the middle and events associated to them. In web analytics, you just have events with no person in the middle. Maybe as a database > -->

This introduces complexities for product analytics, such as the order of events matters (diagram of robbie example)

Diagram?
What if you wanted to write a query "get all subsequent pageviews where the user's first pageview was a blog post"?
In web analytics, you cant do this at all. Whereas in product analytics, you can do this by joining on the person ID.

## What would happen if we just used our product analytics architecture for web analytics?

Because of the additional architecture requred for product analytics, if we ran our web analytics on the same architecture, the performace and price would be worse:

person processing makes the rest of the infrastructure more complex because we need to ensure that all events for the same user are processed in order (otherwise an event might see person properties that were set in the future)


## 1. Why web analytics perforamnce is faster

People have high expectation for web analytics query performance. This is for a few reasons:

1. Google analytics is fast.
2. The queries you view with web analytics are simpler. And they're the same each time. For exmaple, page views or bounce rate.

On the other hand, users have different expectations for product analytics. They're a bit more generous with their waiting time since queries are custom and complex, e.g. the number of users who have used feature X in the last 30 days.

1. The queries are more complex.
2. They're not the same each time.

(They still expect some performance though)

When you have millions of events, the best way to optimize query performance is do sampling. Sample relies on sorting (why?. For web-analytics, this is simpler since it's is session based. You only need to sample events from a single session.

However, for product analytics, if you need to sample events from a single user, this is much harder since a user can have multiple IDs over time. For example, if they logged in on different devices, sessions from each device would have different IDs.

This means that their sessions are likely split across multiple granules and not sorted (and you cannot sort since it requires changing row, which is expensive). As opposed to session, which is sorted and in a single granule.

So if you want to sample, say, 10% of data, you still need to load all of granules, instead of a single one.

![image of clickhouse granules](image)

All these contributes to performance delays, meaning that sampling is not a viable solution for product analytics. Ultimately, this affects performance.

## 2. Why web analytics is cheaper than product analytics

To understand why web analytics is cheaper than product analytics, first we need to understand how we store our data.

We use [ClickHouse](https://posthog.com/blog/how-we-turned-clickhouse-into-our-eventmansion) to store our events. ClickHouse is an OLAP database. It stores rows in blocks called "granules", and each granule contains about 100k rows. It's optimized for reading data. However, it's writing and editing data is an expensive operation, since you need to load an entire block even if you want to change a single row. This means ideally once a row is inserted, you don't change it, else performance will degrade.

So with ClickHouse, you should avoid as much as possible changes to rows. But Person properties can change a lot. It could be every event causes an update. 

To work around this, we store aggregated user data in Postgres, for example the initial URL, name, email etc, which is faster to write to.

This means our event processing pipeline also includes Postgres

![diagram of our pipeline, clickhouse and postgres](image)

Sorting across multiple sessions is hard. 


To work around this, we store aggregated user data in Postgres. This way we can change individual rows without impacting performance. For example, we store person properties like the initial URL in Postgres. 
e.g. you might have this event sets the initial URL, but this later event need to have that person properties 

Postgres increases our processing and length of our pipleine queue, ultimately increasing our costs.


Why is it expensive to process profile 
- It’s hard to update things in click house and hard to do something that only affects one row (we talked about this earlier). So we store them in Postgres
    - Remember, reading and writing Is expensive because you need to read the whole block (granule) and then rewrite the whole thing)




## Our solution

Robbie came up with [anonymous events](https://posthog.com/blog/anonymous-events). These would be used for web analytics, while our existing product analytics would continue to the regular events (now call **"identified events"**).

<!-- ![diagram of anonymous events vs identified events](anonymous events)  -->
<!-- - use the "events type explained image", with a person in the middle for identified events. Showing that events get their properties from the person  -->


Anonymous events and identified events differ in an important way: For anonymous events, we don't create a person profile. This means we can write our events directly to ClickHouse first, without needing to write to Postgres at all. This massively reduces our processing costs.


Anonymous event enable us to:
Set event properties
Aggregate and filter events by event properties e.g. URL, geographic location, UTM source.
Create insights like trends, funnels, SQL insights and more.

However, their limitations are that you cannot:
Set person properties
Create cohorts
Filter on person properties
Use person properties for targeting feature flags, A/B tests, or surveys
Query the persons table using SQL insights
Use group analytics


### 2. How we improved performance

**Since we dont need to set person properties (but we do still have other properties) on events themselves, we dont care about the order. e.g. in product analytics , you can filter events  by initial current url, but not possible in web analytics and you dont need it**

Order of events doesn’t matter for session properties. We use click house for this. Session properties only change in a specific way. We either care first or last value. e.g. for referring domain, or session ending. Then we only care about first or last value.

For example, initial url example. (add diagram for this)



## Problem 1 : Pricing

**How much does Postgres contribute to costs? Exactly percentages. Find out**


Why is it expensive to process profile 
- It’s hard to update things in click house and hard to do something that only affects one row (we talked about this earlier). So we store them in Postgres
    - Remember, reading and writing Is expensive because you need to read the whole block (granule) and then rewrite the whole thing)
- If you care about person processing, ordering matters e.g. you might have this event sets the initial URL, but this later event need to have that person properties 
- There’s also ways to merge users which can be difficult 
- Pipeline team can tell you. Basically it increases length of the cue
- Person properties can change a lot. It could be every event causes an update.
- They change every session. e.g. the most recent refferer changes. We store this in Postgres in and not in clikchouse
- TLDR: Postgres is extra work. A lot of the costs of the events come here. Why though? (Ask pipeline though)

our solution:
What breaks 
- So introduced anonymous events. Which doesn’t do person processing, so no Postgres. Which means it’s cheaper for us. 

**Since we dont need to set person properties (but we do still have other properties) on events themselves, we dont care about the order. e.g. in product analytics , you can filter events  by initial current url, but not possible in web analytics and you dont need it**

Plausible has session properties. They do it at session-level not person level.

Order of events doesn’t matter for session properties. We use click house for this. Session properties only change in a specific way. We either care first or last value. e.g. for referring domain, or session ending. Then we only care about first or last value.

For example, initial url example. (add diagram for this)


So introduced anonymous events. Which doesn’t do person processing, so no Postgres. Which means it’s cheaper for us. Up to 4x cheaper.


## Problem 2: Performance
Robbie built initalial dashboard to get a feel for it:
- Our starting point was bad. We just used 10 queries  with product analytics 

Build a dashboard.
e.g. make a graph of unique users. We can put topline stats, like (visitors, pageviews etc.). you write them using HogQL.
The first version was just a dashboard, which contained the same stuff. It was to get a sense internally if it was useful, the right direction 

### WHy we can't do sampling
- Sampling is the easiest way. That’s what plausible and vercel scale about 20 million page views.
    - This is next step. We need to figure out how to use sampling on an identity that can change. I think we can just store all the older data with person-ids . So we only sample older data but not newer one (so you can’t)

### What we did instead
How did you fix query performance
- Our starting point was bad. We just used 10 queries  with product analytics 
    - 
- Starting point was to play around with sampling, but we couldn’t use it for the reasons we discussed above. Session duration would be wrong.
- So I threw it out for now (and we don’t do it).. We still have to think about it for upgrade works for

- Then I created sessions table in clickhouse. Aggregate information for a single session - precompute it ahead of time. It’s faster to query since you dont need to query every event, you just look at the session. So you dont need to do this at query time
- This sped up some queries

- Next steps
    - Loading all the data on the page is one pass, instead of 10 separate queries
    - Combininng should take a bit longer (getting first data on the page), but massively speed up getting all data on the page

- Its twice as fast as it used to be

# End result

We should show pricing comparison on other websites


---
notes

Web analytics is a fundamentally different problem to product analytics. t's more expensive (4x more times expesnsive) and slower, which means we're less performance and more expensive than products that focus solely on web analytics (e.g. Plausible, Fathom. Add link to comparison)