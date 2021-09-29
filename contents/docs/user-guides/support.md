---
title: Support
sidebar: Docs
showTitle: true
---

PostHog provides enhanced support to paying customers. Our goal with this is:

* Reduce time and effort of deploying and managing PostHog ongoingly
* Reduce the risk of managing PostHog
* Productize frequent

Broadly, our Enterprise support is bespoke, whereas Open Source, Cloud and Scale are much more fixed.

|Support type|Open Source|Cloud|Scale|Enterprise|
|---|---|---|---|---|
|[Community](#community-support)|✔️|✔️|✔️|✔️|
|[Dedicated Slack](#dedicated-slack)|x|Minimum $2k/month spend|✔️|✔️|
|[Dedicated email](#dedicated-email)|x|x|x|✔️|
|[Training sessions](#training-sessions)|x|x|x|✔️|
|[Deployment developer pairing](#deployment-developer-pairing)|x|x|✔️|✔️|
|[Configuration assistance](#configuration-assistance)|x|x|x|✔️|
|[Standard Terms and Conditions](#standard-terms-and-conditions)|MIT Licence|✔️|✔️|✔️|
|[Master Services Agreement](#master-services-agreement-msa)|x|x|x|✔️|
|[Security assessment](#security-assessment)|Standard assessment provided|Standard assessment provided|Standard assessment provided|✔️|
|[Bespoke pricing](#bespoke-pricing)|x|x|x|✔️|
|[Payment via invoicing](#payment-via-invoicing)|x|x|Minimum $2k/month spend|✔️|
|[Downtime developer pairing](#downtime-developer-pairing)|x|x|x|✔️|
|[Region-specific private cloud infrastructure managed by PostHog](#region-specific-cloud-infrastructure-managed-by-posthog)|x|x|x|✔️|

## Community Support

Whilst Community Support offers no guarantees, there are two places to ask questions if you're getting stuck and want to see if someone in the community could help you:

* We have >1,300 developers in [our public Slack group](../slack).
* Feel free to open an issue in our [main project's GitHub repo](https://github.com/posthog/posthog).

We are very grateful for folks that do this the other way around and help answer others' questions. You may just end up with some [merch](https://merch.posthog.com/) for particularly good answers :)

## Dedicated Slack

Our preference is to support customers through a private Slack channel. This is because it helps teams realize they're on the same side - it's just more fun for everyone, which helps drive engagement.

From our side we will select the right team for you - typically this would be:

* Customer Success contact (whoever you spoke with ahead of becomign a paying customer)
* Support hero engineer (we have an on call engineer between 2am PT / 9am GMT and 5pm PT / 12am GMT)
* Platform team engineers (help with deeper infrastructure or ingestion questions)
* Product manager (helps us to understand feature requests, or can clarify current feature set)

[These are the kinds of people](/handbook/company/team) you'd be working with.

Notice - we do *not* have non technical support people who triage issues. We directly connect you to people who are building, designing or who sold the deal. This has scaled to support thousands of companies very effectively - we always aim to productize solutions to problems.

From your side, it's important you bring your A team. We recommend you add:

* A stakeholder from engineering
* A stakeholder from data engineering / data analysis if relevant
* A stakeholder from product management
* 2-3 power users
* A stakeholder from customer success if relevant
* A stakeholder from sales if relevant

It's best not to let your team get too much bigger as it can create a lot of noise. We don't support for example you adding 125 end users of PostHog to this group - you need to triage your own issues with larger volumes.

## Dedicated email

For Enterprise customers that can't use Slack easily, we can offer priority email support instead. 

## Training sessions

We run a set number of group training sessions with your end users. We will walk them through how to make your product more successful.

These are useful at first for the initial adoption of PostHog. As you organically add more people to the platform, we can make sure everyone understands how to drive the most value.

## Deployment developer pairing

We generally do not have access to the infrastructure of our customers. Deployment developer pairing means we can have a developer join a call with one of your developers (ideally with a screenshare, although we can do audio only), to help you quickly get up and running. This is in addition to our extensive [documentation](/docs).

The objective is that you spend as little time as possible worrying about deploying PostHog.

## Configuration assistance

We help you define meaningful dashboards for your company and regularly check in that the configuration of PostHog is helping you improve your product.

We ask to be a user in your PostHog team so we can suggest ways to get more value out of the product. Typically this means ensuring teams build out:

* Dashboards that cover Acquisition, Activation, Retention, Referral and Revenue
* Deep dive dashboards to help you understand fluctuations in the above
* Give guidance on using session recording, heatmaps and paths appropriately (where relevant), specific to your product
* Help you understand the impact on your core metrics of changes deployed behind feature flags

## Standard Terms and Conditions

PostHog's open source product is MIT-licensed.

PostHog Cloud, PostHog Scale and PostHog Enterprise have [standard terms](/terms).

If you need non-standard terms or Service Level Agreements (SLAs), for example, if you need to run a legal review of our terms and anticipate requesting changes, we can offer a Master Services Agreement for Enterprise customers.

## Master Services Agreement (MSA)

We can offer a Master Services Agreement to Enterprise customers to cover:

* Bespoke pricing
* Custom Service Level Agreements
* Custom legal requirements (if your legal team wants to review)
* Custom information security requirements

We will _not_ automatically accept all changes, but we will be willing to review changes on our Enterprise product. For our other products, we will not do this since the contract sizes are generally much smaller.

## Security assessment

We have an extensive range of internal [security policies](/handbook/company/security) that apply to all products.

For Enterprise customers, we are happy to complete security assessments. This can take the form of us enabling your team internally (who are responsible for info security since they're hosting it), or it can mean us just answering questions, or even adapating our policies if required and mutually agreed.

## Bespoke pricing

At this time we can offer bespoke pricing for Enteprise customers.

For example, we have been asked if we can offer a set fee with a large usage cap rather than usage-based pricing, in order to make budget approval simpler.

## Payment via invoicing

We prefer to take payments via card (we use Stripe to process them). However, for companies with invoices over $2,000/month, we are able to support manual invoicing if needed. Just email billing@posthog.com and we'll set this up.

## Downtime developer pairing

We can provide SLAs for emergency video call (or audio) call sessions between one of our engineers and your team in the case that you have either:

* data loss (pipeline downtime)
* complete failure of PostHog to load
* this does _not_ cover bugs, partial outages of the product or query slowness

## Region-specific cloud infrastructure managed by PostHog

We recommend customers with data-control requirements to self deploy PostHog, giving complete flexibility as to the location you deploy in. However, for Enterprise customers we can host PostHog for you in a private cloud environment, in a region and with a provider of your choosing.
