---
title: Implementing PostHog in an Enterprise
sidebar: Docs
showTitle: true
---

<br />

<small class="note-block centered">_Estimated Reading Time: 10 minutes ☕☕_</small>

<br />

Thinking of using PostHog at a larger organization and need more information first?

This tutorial is designed to give you a quick overview of how and why, the product and our organization work with people like you!

# What we can help enterprises with

PostHog provide an open source platform for product analytics. We can help your team to build a more successful product.

The pain points we typically solve for enterprises are:

* _Analytics in place, but complex to use_ "We have to write SQL to understand product usage"
* "We don't have a good grip

The solution we provide is a simple, broad platform that helps anyone on your team easily answer questions about product usage, without anyone writing any code. Questions like:

* "Is my new feature popular?"
* "How many users did we have yesterday?"
* "Is our retention getting better?"
* "Can I watch a user using a specific part of our product over their shoulder?"

We also help you _act_ on user behavior:

* "I need to roll out a change to users carefully"
* "Which users have used this particular feature?"
* "How do I get my product usage data into my CRM to help us renew or upsell an account?"

We are typically used by Product Managers, Software Developers, and Data Teams 

## Selecting the right PostHog product

TODO: insert section here once product names done

# Compliance

## Your data

Of the major product analytics providers, PostHog is unique in its ability to be self hosted in your existing infrastructure. Specifically, you can host PostHog in your private cloud environment, whilst having the instance managed remotely by our team. 

This means no one other than you needs access to your event or user data, making us by far the best option from a policy and privacy perspective. We've been built to be used this way from day one.

## Permissioning, sharing access and projects

PostHog Enterprise provides three types of user permissioning:

* Owner
* Administrator
* Member
* External users can be provided access to selected dashboards via a public URL (optional)

In addition, we provide the capability for multiple projects within a single organization.

Typically, it's best practice to set up new projects for:

* Production environment(s)
* Development environment(s)
  * Testing integration with your products where you may send duplicate or test data
* Sandbox environment(s)
  * To test beta functionality without exposing any production dat
  * To test plugins for more complex configurations without exposing any production data

## Single sign on

PostHog supports SAML SSO.

This works out of the box for GitHub, GitLab, and Google. We are working on expanding this case by case. Just [raise an issue in GitHub](https://github.com/PostHog/posthog/issues/new/choose).

## Auditability

There are numerous places an audit trail is captured for the _usage_ of the product:

* Insights and query history at an individual or team level
* Global events history
* Your end users' event history
* Annotations history

All of these can be exported either through one or more of a CSV export, our API, or direct database access. Just [raise an issue in GitHub](https://github.com/PostHog/posthog/issues/new/choose) if you need further auditability.

In addition, the code and database are open source. This makes a deeper level of auditability possible than with other vendors.

## Security

Although PostHog Enterprise contains a mixture of open source and proprietary licensed code, it is possible to 

## GDPR

A significant advantage of PostHog Enterprise is that you're able not to send any of your user data to a 3rd party. This is *not* possible with all the other major cloud-based product analytics providers.

If you control or process data from EU citizens, you are required to comply, even if your company operates outside of the EU. If you are not  European or Mutlinational company targeting EU citizens, even if they visit your site, you are ok.

There are three important classifications:

* _Controllers_ are organizations that collect user data and decide what to do with it. 
* _Processors_ are organizations that help other organizations process their data by recommending decisions to make from it.
* _Subjects_ are the users whose data is being collected

!> In _some_ cases, an organization could be classified as both a controller and a processor.

By introducing PostHog Enterprise into your company, there's no need to send any user data to us as a vendor. This avoids the need to add another processor to your list and means you're introducing no further GDPR requierments by using the platform if you host it with your existing cloud provider.

# Implementation

## Project plan

### Key steps

* Stakeholder identification and alignment
* Initial deployment
  * Product tracking scope
  * Scalability scope
  * Success criteria
* Future rollout
* Commercials

TODO: put some advice in for each of these / insert a link to the customer success page

## Deployment

For any enterprise, we recommend you use a private cloud deployment of PostHog. This means PostHog is deployed in your _existing_ cloud environment, but is managed by us.

Why?

* We have no need to access your user data, so this reduces friction in getting started from a policy and privacy perspective
* For very high volume use cases, we can charge a flat fee, so we're more aligned with you as a partner for the long term
* This means you've no maintenance - we handle it all for you.
* We can ensure scalability - which is an important part of running PostHog successfully.
* We have a frequent shipping schedule, with updates typically every two weeks. We can keep your instance constantly update.
* It allows the quickest possible security critical updates.

It _is_ possible for you to deploy the open source version of PostHog, but it does not have the level of performance for high volume (typically 10K monthly users or more). Crucially, the data is in a different structure (Postgres is the database powering the open source version, ClickHouse powers the enterprise product), which means you cannot easily scale across your business or if your volume needs change.

TODO: write up and add link to deployment strategy

## Resources required

We recommend you appoint a group for us to collaborate with similar to the following:

* Relevant stakeholders to attend Quarterly Business Reviews.
* A software engineer who can work with us on a more frequent basis to resolve isues with implementation.
* A product manager who can provide ongoing feedback as a different category of user.
* A project manager if the rollout is larger.

PostHog will provide:

* A Deployment Specialist to ensure your isntance of PostHog is scaled and operating appropriately
* A Customer Success person to ensure the success of the project and commercial side of the engagement
* A Developer Experience person with a developer background to help with configuration and implementation
* Multiple engineers for more specialist questions
* Executive support to ensure long term sucess

Ideally, the above would be set up in a private Slack group, but we can provide alternative solutions as needed.

## Integrations

PostHog is a _platform_, and a key part of this is being extensible with the rest of your world.

For event ingestion, we provide SDKs for most major languages, API access for everything else and direct database access.

In addition, we have a growing range of plugins that mean instant integration with a range of other products such as data lakes and data pipelines. We also support Segment and Rudderstack as Customer Data Platform integrations.

A typical set up would be to use PostHog for all event capture directly from your product, and all your analytics needs. For higher volume applications, with a more challenging and broader variety of data, it may make sense to push events to PostHog from a pre-existing datapipline, or from a data lake - we can also export data to a data lake too, as needed.

TODO: add links to relevant sections of docs for above

# Support and SLAs

## Uptime monitoring and SLAs

* We provide the ability for enterprise customers to have 24x7x365 monitoring.
* We have a team of engineers on call 24x7x365 for critical issues.
* We have 24x5 coverage from our full team of engineers for less urgent questions.
* We can offer enterprise customers SLAs to cover 99.9% uptime.

## Support

We _do not_ believe in traditional customer support, where you receive responses about escalation designed to reduce interaction with the people that actually built the product. We _do_ believe in connecting our engineers with our users as closely as possible.

There is a rotation of engineers available from our core team to handle support enquiries, and a dedicated Developer Experience team who 

Our broader open source community also provides an opportunity for more informal support - with hundreds of developers in our group slack, over 100 contributors across all our code repositories in GitHub.

We can support:

* Questions on your implementation
* Identification of key growth metrics based on your product and business
* The initial and ongoing configuration so you're able to track the above as your business changes over time, and as we build more functionality
* Training sessions for end users

# Reporting

How do you know your implementation of PostHog is successful?

We do this through:

* _Quarterly business reviews_:
  * Your next quarter's product objectives (so we can ensure you're able to track appropriately)
  * Roadmap
  * New functionality that has been released
  * Your usage of the product
  * Feedback
* Usage reporting on a regular basis

# Partnering with us

Your experience working with us will be remarkable. Here's why:

* _Popularity_. PostHog has thousands of deployments around the world. There is a large community formed around the project, which you can find in our GitHub, and our User Slack Group. Your team are certainly not alone in using the product.
* _Support_. Our core team is distributed across more than 10 countries from PST to CET, meaning we've team members awake and working around the clock.
* _Transparency_. PostHog provides full transparency into
* _Collaboration_. Our roadmap is publicly available, and your team are able to get full access to the code, to raise feature requests and 
* _Financial stability_. We have raised significant funding from the world's best investors such as Google Ventures and YCombinator. We are growing very significantly as we've had so much traction.
* _End-user focus_. We are end user focussed. The reason we've raised significant financing is so we can focus on each product manager, each engineer and each data analyst using the platform first and foremost. So many enterprise software deployments fail fundamentally due to a lack of usability.
* _Experience_. Our team have worked on enterprise software implementation before, and many of us have worked in hypergrowth companies that have seen the challenges of software in environments that move quickly even at scale. We can work at your speed, however fast or slow that needs to be.