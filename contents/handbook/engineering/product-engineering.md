---
title: How to do product, as an engineer
sidebar: Handbook
showTitle: true
---

## Good product engineers, bad product engineers

Good product engineers:
* Ship quickly so they have a fast feedback loop
* Understand the company strategy, and prioritize based on this _and_ what they believe users want
* Can easily propose ideas for what to build
* Make sure the things they've built are being used
* Follow up after they've built something to improve it if needed
* Are good at descoping things and getting products or features into people's hands quickly
* Have users that they're friendly with
* Manage to build things without lots of internal meetings

Bad product engineers
* Consider research something that takes two weeks rather than two hours
* Can't explain our compay strategy
* Can't explain who their product is built for
* Don't know their product's competitors
* Only work on things they've been told to work on
* Don't know the names of any of their users
* Never challenge why they're being told to work on something
* Don't talk to users about what they're going to build, or what they've built
* Don't track if the things they've built are being used
* Spend 6 months on a huge feature before a user can try it
* Never remove features or complexity, often by shipping features that aren't used and leaving them
* Focus on internal alignment over company strategy and what users need

## How to

### How to validate ideas

Just shipping is often the best way to validate an idea. This gives you the best evidence (do people _actually_ use it, and what do they think), but _potentially_ at the highest cost as you have to build it! The challenge with this approach is making sure you descope the first version of the product or feature enough that users will at least try to use it so you get enough signal that they care, without damaging our brand because the experience is so poor.

Just shipping makes sense when it's very obviously in line with our company strategy (which is generally proven), and you can descope it successfully. This is almost _everything_ that you may ever build here. 

There are plenty of other techniques, that you can do in parallel:

* Use the public roadmap - if you have a rough idea, create a GitHub issue and create an item on posthog.com/roadmap - this will guage demand
* Ask internally for help. There are lots of people that can help you - the CS team talk to users all the time, the support team have a strong sense of pain points, other product engineers have all talked to users, James and Tim have a broader view of how PostHog is doing, the marketing team can help you get usage or validate demand.
* Interviews - our Product Managers regularly run interviews, ask to be included and give a heads up what you're trying to learn about. Or just message users directly! You can even embed your calendar in our surveys product to get ou will need lots of existing potentially relevant customers for this to make sense.
* Listen to the internet - we have a #brand-mentions channel in Slack that monitors for social mentions by customers, or get us to post a question here if you need.
* Seek internal feedback - we dogfood all our own products to grow our company, so ask for _internal_ relevant users.

### Ship things iteratively and follow up

* Use staggered rollouts - we have a product _designed_ to help you do this. Depending on how risky a new feature is, start with internal users, or 
* Data - check if the thing you just built is being used. Remember to add some events.
* Session replay - watch users using your thing. This can often highlight confusing UX.
* Interviews
* Support
* Listen to the internet

### Iterate with users

* Responding well to users and why this matters
  * Getting people to respond to you
    * Tone
    * Incentive
    * Medium
  * Closing the loop

### Talk to users

* Open ended questions
* Look for evidence if users have _actually done anything_ about the problems they say they have