---
title: Where we are now
sidebar: Handbook
showTitle: true
---

Revenue is growing very quickly, and we're on the way to being profitable.

Product-wise, how are we doing?

## We have a _lot_ of products out

Today, we make money from:

* Session replay
* Product analytics
* Feature flags
* A/B testing

We have also got:

* User surveys
  * We built this product in Q3 so it's early, has no pricing and isn't listed on our website yet
* CDP (ability to send data to other tools like data warehouses)
  * This is being used by thousands of customers but we want to make it more reliable
* Data warehouse + ETL - both in MVP
  * We have a working MVP of this that we use internally for now

## Current priorities

### Q3 2023 - "The Great Unbundling"

At the start of 2023, we went from “product analytics with some extra stuff thrown in” to “Product OS”, and started charging for session recording separately.

It went great, we grew session recording revenue, usage and got way better feedback, which lead to a better product.

In Q3, we want to position externally as having multiple products more clearly than we did at the start of the year. That means - product analytics, session recordings, feature flags, experimentation and perhaps CDP, each as their own first class product. It makes it easier for new folk to get what we do, means we can give more ownership (which means more speed) to our own teams, and it means we can compete on commercials very effectively.

However, PostHog really is the integration between all these things.

How do we do this with a small number of people?

We’re already doing this. It’s hard but we’re already adding more companies per week than our billion dollar point solution competitors, and our retention is good.

Examples of “integration”:
- **HogQL** - get any visualizations we offer + build on us long term via the api + remove technical debt by standardizing our queries
- **Notebooks** - new product = more people will find us + could provide standard way to save / search for research instead of using saved insights/dashboards/playlists
- **Warehouse** - new product = more people will find us + increases order sizes dramatically + solves data parity issues in every product in a way no other product analytics point solution can do + enhances insights, notebooks, etc with more data + enables building data apps in the long run
- **CDP** - Product Analytics / HogQL / Notebooks / Warehouse all become more powerful

### Q4 2023 - "Win the Internet"

Since Q3 is about to finish, we've started planning for Q4.

Currently, we are often mentioned as an alternative to product analytics tools.

We have the capabilities now, but we are winning the internet when we get more of this for our _other_ products (we don’t have to win everything but we need to get into the comparison each time). This is _starting_ to happen, but to Win the Internet, we need to see this happening daily.

We’ve got multiple products that are early:
- **Warehouse** so people can query however they want
- **ETL** (simple imports of other data sources like postgres or Stripe into our warehouse) are needed for the above to make sense
- **Surveys** (being used a lot but not paid / lots of quality improvements we can make / not on website yet)
- **Feature flags and experiments** - we’ve just started making our first revenue. Let’s get 100% sure we have product market fit for these tools.
- **CDP** - we have been rebuilding our pipelines first, webhooks next, but eventually playing offense and having a standalone first-class CDP is where the greatest returns are
- **Notebooks** has some awesomeness but isn’t mass released / is starting to overlap a bit with posthog 3k, and we’re refactoring insights in HogQL still  - figuring out the right combo of these things will lead to more word of mouth growth by taking us from just as good, to far better, for some of our existing products (#noteforce3000sql)
- With **web analytics** we’ve been thinking it through carefully and getting the leader of this product up and running with PostHog engineering in general, but haven’t actually shipped anything here
- And of course there is a lot of supporting work:
  - Helping teams with their per product onboarding and growth experiments, infra, ingestion, dev tooling, sales, support and marketing
  - Promoting each product in its own right (ie through what we cover in marketing)
  - Keep nurturing the content / community growth ie newsletter, and the /posts concept