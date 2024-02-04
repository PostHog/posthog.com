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
* User surveys

We've also got:

* CDP (ability to send data to other tools like data warehouses)
  * This is being used by thousands of customers, but we want to make it more reliable
* Data warehouse + ETL - both in MVP
  * We have a working MVP of this that we use internally for now

## Current priorities

### Q3 2023 - "The Great Unbundling"

At the start of 2023, we went from “product analytics with some extra stuff thrown in” to “Product OS”, and started charging for session replay separately.

It went great, we grew session replay revenue, usage and got way better feedback, which lead to a better product.

In Q3, we want to position externally as having multiple products more clearly than we did at the start of the year. That means – product analytics, session replays, feature flags, A/B testing, and perhaps CDP, each as their own first class product. It makes it easier for new folk to get what we do, means we can give more ownership (which means more speed) to our own teams, and it means we can compete on commercials very effectively.

However, PostHog really is the integration between all these things.

How do we do this with a small team?

We’re already doing this. It’s hard, but we’re already adding more companies per week than our billion dollar point solution competitors, and our retention is good.

Examples of “integration”:

- **HogQL** - get any visualizations we offer + build on us long term via the API + remove technical debt by standardizing our queries.

- **Notebooks** - new product = more people will find us + could provide standard way to save / search for research instead of using saved insights/dashboards/playlists.

- **Warehouse** - new product = more people will find us + increases order sizes dramatically + solves data parity issues in every product in a way no other product analytics point solution can do + enhances insights, notebooks, etc., with more data + enables building data apps in the long run.

- **CDP** - Product Analytics / HogQL / Notebooks / Warehouse all become more powerful.

### Q4 2023 - "Win the Internet"

Since Q3 is about to finish, we've started planning for Q4.

Currently, we are often mentioned as an alternative to product analytics tools.

We have the capabilities now, but we are winning the internet when we get more of this for our _other_ products (we don’t have to win everything, but we need to get into the comparison each time). This is _starting_ to happen, but to Win the Internet, we need to see this happening daily.

We’ve got multiple products that are early:

- **Warehouse**, so people can query however they want.

- **ETL** (simple imports of other data sources like Postgres or Stripe into our warehouse) are needed for the above to make sense.

- **Surveys** (being used a lot but not paid / lots of quality improvements we can make).

- **Feature flags and experiments** - we’ve just started making our first revenue. Let’s get 100% sure we have [product-market fit](/blog/product-market-fit-game) for these tools.

- **CDP** - we have been rebuilding our pipelines first, webhooks next, but eventually playing offense and having a standalone first-class CDP is where the greatest returns are.

- **Notebooks** has some awesomeness, but isn’t mass released / is starting to overlap a bit with PostHog 3000, and we’re refactoring insights in HogQL still. Figuring out the right combo of these things will lead to more word of mouth growth by taking us from just as good, to far better, for some of our existing products (#noteforce3000sql).

- With **web analytics**, we’ve been thinking it through carefully and getting the leader of this product up and running with PostHog engineering in general, but haven’t actually shipped anything here.

- And of course there is a lot of supporting work:
  - Helping teams with their per product onboarding and growth experiments, infra, ingestion, dev tooling, sales, support and marketing.
  - Promoting each product in its own right (i.e. through what we cover in marketing).
  - Keep nurturing the content / community growth, i.e. newsletter, and the /posts concept.

### Q1 2024 - "Double Down"

We have a bunch of awesome products generating revenue. Since last quarter:

- feature flags and experiments has got product market fit
- we've got a warehouse with early meaningful usage
- we figued out notebooks vs PostHog 3000 and have shipped a new UX for everyone
- web analytics has been shipped and is getting plenty of usage
- stability has remained excellent

A lot of new user-facing things got shipped last quarter. However, every product could be improved a lot.

This is a quarter of caring about the craft of your product.
- Major missing features vs competitors
- Scalability/stability
- Developer UX
- Talking to users and incorporating their feedback
- Nailing support for your product - fixing things

Products are not limited to people working on the app - it includes what customer success / marketing / ops are working on. Everything can be considered a product.

Each team should be aiming to feel proud of what they've built by the end of the quarter.