---
date: 2021-05-25
title: Big Five - a simple framework for product market fit
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/100x/100x.png
---

By: [James Hawkins](https://twitter.com/james406), Co-Founder / CEO @ PostHog

Last Friday, James, Tim and Charles had a board meeting with PostHog's lead investors.

The focus of the board meeting was how to get to Product-Market fit - ie the point that _paying_ customers love us.

PostHog already has Product-Community fit - we have thousands of people signing up organically, we have over 150 contributors across all our repos, and we have a busy Slack community.

What came out of the session was a pretty simple way to achieve Product-Market fit - that we wanted to share.

# Pain thresholds vary

A fundamental weakness of PostHog is that it's built by human beings. The rumours are true.

PostHog Scale, the paid self-host product, is new and the deployment is challenging. We have teams ingesting tens of millions events each month, or more, in a self-hosted environment.

In particular, we noticed that often this happens:

* Engineers find PostHog and deploy it. They work with us to make sure it's scaled and operating fairly well. We collaborate closely with them - we expect issues, so we focus on being very quick at resolving them.
* Once deployed, they invite their Product Manager, or Growth team. They send more events into the product and set up more complex dashboards. This often creates downtime. This user group are less tolerant of technical issues. 
* We end up retaining the company, but they're not delighted.

# What is the Big Five?

## Pick five target companies.

They should be very similar to each other.

For us, we chose:

* Software companies providing developer tools
* Currently or in future want to self-host their product analytics
* Using or likely to use a data warehouse in future
* Ideally at scale up stage - so they have multiple users with different profiles

We felt that those building developer tools are very likely to care about not sending user data to a 3rd party. They are likely to care about end users, so have a need for product analytics. Those two things combined makes PostHog, in theory, a great fit. They also tend to be early adopters, and we've seen we've had a lot of organic requests for our paid product from this industry. They also have budget and are happy to pay for product analytics. 

There are some downsides. Firstly, we will want to go bigger than just the devtools product analytics market. However, that's not a problem - we're after a great starting point and it's big enough to achieve that. Secondly, companies that are early adopters _may_ have a lower bar for quality. However, this in fact helps - it means we can land and iterate - and, in addition, the bar for non developers at these companies is higher, hence the next step:

## Identify target users within the Big Five

There are likely to be different user types involved in your product. 

For us, this was:

* Engineers
* Product Manager
* Data engineers

## Everyone in the company does everything they can to delight these users

We created a checklist that represents what we believe would need to happen for all three of these users to be delighted.

It looked like this:



Then we had to communicate everything to the team.


# Want to measure delight? Focus on disappointing users (!)

How do you measure delight? You ask them:

"If we took PostHog away, would you feel (a) not disappointed (b) somewhat disappointed (c) very disappointed?"

Get every role to a (c), and you're nailing it.