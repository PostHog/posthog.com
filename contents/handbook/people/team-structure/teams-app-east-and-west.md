---
title: Teams App East & West
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## People

[See team structure page](/handbook/people/team-structure/team-structure)

## Overall goal for app and platform

## Sub team - App East

### Objective

Increase discoveries through greater core product quality, more joy and sharing insights

### Motivation

We believe that quality leads to more usage and more value from the product, focussing on quality today will drive more discoveries in the long term. Teams with more users discover the most on PostHog enabling insight sharing outside of the PostHog will increase the value teams get form our product.

### Objective owner

Marius

### Key results (End of July 2022), examples:

- Step change in the experience of insights and dashboards (from proactive feedback from customers and qualitative research)
- Significant reduction (i.e. 20%) in user reports around user experience quality
- Subscribe and share dashboards and insights through slack or email
- Stat-sig increase in Discoveries via experiments

## Top medium term priorities
1. **App Platform (Iteration 1)**: Our plugins ecosystem has driven some initial traction however, there are a number of frequently requested features which cannot be built on top of this ecosystem (Context: [product context doc] (https://docs.google.com/document/d/1IbxrazOKYidQQjqxJ8phJ-XMi1IeRRikbT3g0dwgkOc/edit#heading=h.fi42es92skqe))
    * **Why urgent:** Following the hackathon, there is a lot of momentum around launching "apps" including improvements to existing plugin documentation (with significant work done already from the marketing side)
    * **Why important:**: Extensibility is a key priority for the company to nail enterprise, supporting more sophisticated apps will enable our customers to extend PostHog for their specific needs with less overhead
    * **Status:** Design and eng PoC in progress
1. **Reduce time wasted picking dates** - Reduce time spent picking dates by building a reusable component and implementing universally across the product (Context: https://github.com/PostHog/product-internal/pull/305/files)
    * **Why urgent**: Increasing quality is critical for nailing enterprise, anything we can do to reduce the effort required to increase and maintain quality of the experience will have a exponential impact over time
    * **Why important**: The quality of our product is key to gain and retain big clients, inconsistencies and reliability issues will cause our customers to lose trust
    * **Status:** Initial Design Explorations
1. **Export visualizations** People share their findings from PostHog regularly via links or screenshots, the results are often inconsistent and go out-of-date quickly (Context: TBD)
    * **Why urgent:** [There's a steady increase in organizations with multiple users of the past months](https://app.posthog.com/insights/qyMSn6Nf), sharing outside of is key to growing overall engagement particularly with larger teams
    * **Why important:** Results of analytics should inform every area of a company, from leadership to marketing, product and engineering, making it easy to share specific findings in a format people are familiar with enables people to get more value out of PostHog
    * **Status:** Product Context Gathering
1. **Insight & Dashboard subscriptions** - People don't have time  to visit PostHog and view dashboards every day, we can make this easier to consume this important data by sending them regular updates, to where they are (Context: TBD)
    * **Why urgent:** Blocked by Export visualizations, this will help teams (including our own keep on top of our key metrics)
    * **Why important:** This will reduce the barriers to getting quick regular value from PostHog for people who are interested in the same set of things, helping us grow engagement particularly in larger organizations
    * **Status:**  Product Context Gathering
1. **Session recordings stored outside Clickhouse**: We store recordings in ClickHouse today, but it’s not the ideal storage location for this data
    * **Why urgent**: Customer’s Clickhouse storage can fill up based on a front end change - breaking PostHog. This has happened to several customers already, and it’s a pretty terrible experience, this will also enable us to scale much further and start charging for session recordings, increasing revenue opportunities
    * **Why important**: The reason above, and by completing this, we could expand recording retention significantly - which enables a set of features around sharing and interacting with recordings.
    * **Status**: Hackathon-ed

## Sub team - App West

### Objective

Increase discoveries through better self-serve setup, completeness and scale of our core insights

### Motivation

Discovering new and valuable insights and recordings through PostHog is the primary value our users derive from PostHog, our best levers to this are improving onboarding and enabling our core insights to give people the answers people need (at scale). 

### Objective owner

Eric

### Key results (End of July 2022), examples:

- Enable billion event scale querying
- Unlock analysis by sessions
- Enable powerful universal querying across entities in PostHog
- Increase the signup to data ingestion rate (Onboarding)
- Increase the signup to subscription rate (Subscribing)

## Top medium term priorities
1. **Persons on events** - enabling significantly higher scale and more accurate querying by migrating persons to events table (Context: TBD)
    * **Why urgent**: This is an immediate blocker to onboarding very large clients, and a dependency for large query performance improvements using caching
    * **Why important**: Scale is a significant differentiator for us and enables us to open up a new market for large self-hosted enterprise customers
    * **Status:** In Progress
1. **Onboarding (Iterative experiments)**: The onboarding process to PostHog is difficult, leading us to loose potentially valuable customers each day, including enterprise customers (Context: TBD)
    * **Why urgent** We're losing out on potentially 100s of potentially valuable customers who could be successful with PostHog each week, because of the difficulty of getting data into PostHog
    * **Why important?** Any improvement to onboarding now will have a long term affect on the success as we will have more happy customers which will drive more word of mouth
    * **Status:** In Progress
1. **Subscription conversion** On cloud and self-hosting we are not effective in enabling people to find, understand the value of and convert to subscribed features (Context: TBD)
    * **Why urgent:** The sooner we do this we have a higher potential to capture more revenue and retain more users by enabling them to access valuable extra features
    * **Why important:** Improving the subscription conversion rate will directly improve revenue in the long term
    * **Status:** Design & Product Context Gathering
1. **Multivariate Feature Flag support for top libraries** - Today we only support Multivariate feature flags on limited libraries, this means many of our biggest customers have to use workarounds for experimentation and feature flags (Context:[ Popularity of libraries by team](https://metabase.posthog.net/question/262-client-library-usage))
    * **Why urgent:** A number of large clients are currently working around this limitation using custom implementation for experiments, this will be hard to maintain
    * **Why important:** We're limiting adoption of experimentation and mutivariate feature flags, as well as overall adoption of PostHog by offering limited library support
    * **Status:** Ready to implement (no design or additional product context required)
1. **Session analysis**: PostHog lacks basic session analysis functionality, making it difficult to measure user engagement with a product (Context: [Product Context](https://docs.google.com/document/d/1rj0yMbxwR_BYCTJNct4x-iCn6yv2mJfNy28OV6bxkAA/edit?usp=sharing))
    * **Why urgent:** Customers have been frequently asking to bring back reliable session measurement functionality, it blocks them from moving away from Google Analytics
    * **Why important:** Measuring engagement is key for our customers to understand user behavior and improve the product for the most and least engaged users, many customers cannot use session recording and have no alternative method in PostHog
    * **Status:** Product Context Gathering
1. **Simplifying events and actions**: Events and actions are very separate concepts which cause confusion and make it difficult to  create good data management (Context: [Product context](https://github.com/PostHog/product-internal/pull/300))
    * **Why urgent:** Most large customers signing up are confused between events and action making it harder to get started and maintain consistency across their organization
    * **Why important:** Data management is critical for enterprise customers to be successful, the separate concepts of actions and events causes confusion and inefficiency in getting insights from PostHog
    * **Status:** Technical and Experience Design
1. **Universal querying** - enabling advanced querying across all areas of the platform, removing barriers between features and insights (Context: TBD)
    * **Why urgent:** We have put significant work into improving cohort querying, yet this same level of querying will not be available within other areas of PostHog
    * **Why important:** Two key aspects of quality are completeness and consistency, enabling a complete querying experience (such as in new cohorts) across every insight and entity in PostHog will improve quality and make discovering new insights easier and faster
    * Status: Product Context Gathering (initial PoC developed in hackathon)
