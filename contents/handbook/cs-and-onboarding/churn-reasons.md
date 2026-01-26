---
title: Common churn reasons
sidebar: Handbook
showTitle: true
---

There are a number of recurring themes on why a customer might churn. Below is a non-comprehensive list of reasons we've encountered and some ideas around how we could mitigate churn risk in each scenario where applicable.

# Situations where we have more control

## Champion is gone

When a champion leaves, depending on the size of the company and more importantly, the number of active users in a given account, this can have a major impact if PostHog was principally used primarily by our champion. The best way to combat this risk is to increase PostHog's footprint across the organization and increase the number of users adopting PostHog within the org. This may mean increasing the number of teams using PostHog at a given company and the number of products the company adopts. The more people using PostHog, the less risk it poses if our champion leaves.

We can create value by engaging with different team members, building relationships with more than one champion at a given company, and help deliver value across different teams to decrease the risk of a single champion having a significant impact once they're gone.

## Champion was not key decision maker

Sometimes we connect and build a great relationship with a champion who truly loves PostHog but they are not a key decision maker in their org. This can be great in terms of building a relationship and getting updates but tough in terms of ensuring there is influence to how PostHog is adopted at their company. In situations like this, it would be good to try and leverage contacts we do have to build relationships with key decision makers at the org. Note that a decision maker does not necessarily mean they are in a leadership or management role. It just means they have the capacity to make decisions and influence PostHog's adoption within the org.

## Customer replaces PostHog (whether internally or with a competitor)

Customers may churn for a number of reasons, some examples are:

- They needed to build feature parity internally
- We lack a critical feature they need
- Leadership loves using a competitor
- They're very price conscious and got a sweetheart deal

Whatever the reason may be, the best way to combat churn in this situation is to increase the number of products a customer is using and the overall value the customer gets from having all their data live in one app. It doesn't necessarily prevent this from happening completely, but it does help decrease the risk.

Ideally we try to resolve the situation when customers are considering alternatives, and advocate for changes we think could help with decreasing churn risks, but in situations where that isn't possible, having customers use PostHog's other product offerings might help customers only churn for a specific product usage and not as a customer as a whole.

## Customer experience has been poor

If you notice there has been a pattern where a customer has really struggled to get help or quick responses in the past, or if they've communicated this openly in your discussions, it is vital we turn this impression around by staying on top of things for the customer moving forward.

When there are opportunities to help a customer, it is recommended we provide the solution where possible, explain to the customer what we did so they have a clear understanding of the solution provided and how they can solve this themselves.

In situations where it requires us to advocate for feature requests, follow up on bug fixes, or stay on top of something for the customer, it is incredibly helpful to be proactive and frequently circle back to the customer to keep them up to date when possible rather than wait for them to follow up again. 

By staying on top of things on behalf of the customer and proactively communicate, it will help develop a sense of trust, especially when customers have had a poor experience, in particular a lack of communication and follow up.

## Customer hasn't been able to extract value out of PostHog

If a customer has communicated this with you, offer to work with their team to set them up for success. Make yourself available to understand their team needs, offer to set up regular meetings if they're open to it, and help them get the specific stats that would move the needle for them.

It is also possible their team may not understand how PostHog could be helpful. Offer workshops, training calls, and other things to give them concrete examples of how PostHog can help them accomplish their goals.

## Lack of features or speed of delivery for specific needs

If the customer is an ICP fit, and there is risk of churn due to lacking critical features or speed in which we deliver certain results, it might be worth looping in the relevant engineering team and product manager to discuss what our options are for each specific situation that arises from this. Sometimes the key PM will want to jump on a call with the customer to learn about their specific needs.

Openly communicate in the relevant teams channel that this is a churn risk if this feature is something we can't ship. Use this opportunity as a way to help our PMs get direct feedback. We never want to lose a customer because we failed to deliver a key feature they need but these kinds of discussions are helpful to our team to learn what matters to our customers and helps us figure out if we can prioritize them or not.

## Lack of trust for using PostHog as source of truth

We've heard the feedback that sometimes customers can't rely on PostHog as a source of truth because the data we collect is at odds with data they see elsewhere. This is a great opportunity to dive deeper on understanding what kind of stats they're seeing, what could be wrong with their implementation, and how we can possibly correct this so they have more trust in their PostHog data.

If a customer is relying on a different source of truth and possibly moving PostHog data to another external source, it can pose as a risk long term that they're not as tied to using PostHog, so fixing this so customers can rely on their PostHog data is important even if it doesn't pose an immediate threat.

## Privacy, compliance, or data governance reasons

Some customers require strict privacy, compliance, or data governance controls. In some situations, it might be out of our control in terms of providing a solution that will work e.g. some customers can't store specific data with 3rd party services and must keep all data on prem. It's important we clarify all data controls customers do have with PostHog so they can make as concise of an informed decision as possible regarding where and how PostHog can be used. PostHog is anonymous by default and even among some of our products, such as Session Replay, we mask certain data to protect privacy. Some customers may not be aware of this and assume they can't use certain products. Helping them understand what privacy controls is available will help them be more confident in adopting certain PostHog products in this situation.

Even if we don't control local laws, industry rulings, etc., we can help our customers better understanding how to optimize their [data collection](https://posthog.com/docs/privacy/data-collection), [mask information](https://posthog.com/docs/cdp/transformations/template-url-masking), add [privacy controls](https://posthog.com/docs/session-replay/privacy), or follow key compliance practices such as [cookieless tracking](https://posthog.com/tutorials/cookieless-tracking) or [GDPR](https://posthog.com/docs/privacy/gdpr-compliance).

As much as we can, we should help customers better understand what they can and can't do with regards to privacy when using PostHog, and what [data deletion](https://posthog.com/docs/privacy/data-storage#data-deletion) methods are available.

# Situations where we have less control

## Customer has been acquired

This doesn't necessarily pose as an immediate risk or assume the customer will churn but we've seen many times where a company gets acquired and eventually moves off for a number of reasons. It would be good to learn what risks exists when you've learned that one of your book of business has just been acquired.

## Customer ceases operations (for any number of reasons)

This unfortunately is completely out of our control. If a company ceases operations for any number of reasons, there's not much we can do here.

## Lack of ICP fit

This is a more recent development and it can be a tough situation. In situations like this, it would be good to understand where we underserved the customer and why it was difficult or wasn't a good fit given they don't match our ICP, and help relay feedback to our team.