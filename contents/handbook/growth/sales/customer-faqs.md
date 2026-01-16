---
title: How to respond to frequently asked questions
sidebar: Handbook
showTitle: true
---

Here's how to respond to common customer requests. These usually arrive in the form of new contact form submissions but may also be asked by existing customers too.

## Can you increase my rate limits?

Here's how we'd break down use cases:
- if the use case is exporting all the data so they can do further transformation or activation in other tools -> use batch exports
- if the use case is ultimately going to be accessing our API programmatically with a pre-defined query -> use endpoints product
- if the use case is essentially wrapping PostHog and allowing the customer to query whatever they want (in other words, if they want a different UI for querying PostHog data) -> use `/query` API endpoint

```mermaid
flowchart TD
    A{Is the API hitting <code style='padding: 4px; border-radius: 8px;'>/query</code> rate limits?}
    B{Does the use case fit endpoints?<br />(i.e. B2B2C user-facing analytics, data-powered APIs, internal home-grown dashboards)}
    C["Explain the use case in #team-data-modeling <br />(we're keen to talk to beta users!)"]
    D{Should they use batch exports instead?}
    E[Redirect them to start paying for batch exports.]
    F[1. Assume we're not increasing rate limits.<br />2. Reach out to #team-clickhouse with query details.]
    G["Go to the relevant team for that API<br />(Feature flags, Surveys, ..)"]

    A -->|Yes| B
    A -->|No| G
    B -->|Yes| C
    B -->|No| D
    D -->|Yes| E
    D -->|No| F
```

See [RFC #438](https://github.com/PostHog/requests-for-comments/pull/438) for more context.

## Do you have plans to add more hosting options outside of the US and EU?

Right now, no. The vast majority of our customers are happy to host on one or the other, with EU being the preferred domain for GDPR compliance. This is not a "never", just not in the near future.

## Do you have a dummy account we can mess around with?

No, the best way to trial PostHog is to start sending your own data into it. When a trial is filled with dummy data, which isn't relevant to the specific team, the overall engagement and success of the trial is lower.

## Does PostHog follow the MEDDPICC sales methodology?

Yes! But like everything we do here, it's not what you would expect. At PostHog, MEDDPICC means "Make every deal a delightful PostHog implementation - Charles Cook"
