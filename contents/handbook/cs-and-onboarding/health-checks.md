---
title: Checking the health of a customer's deployment
sidebar: Handbook
showTitle: true
---

In a world where a lot of our high-paying customers have self-served without 
ever speaking with a PostHog human there is scope for them to implement PostHog 
in a less than optimal way.  This could result in people spending more than they
need to, or having inaccurate reporting data available to them.  Ultimately if 
left unchecked these things will lead to avoidable churn.

## Are they paying for things they don't need?

### Group analytics

[Group Analytics](/docs/product-analytics/group-analytics) can be a real value-add for B2B companies, allowing them to track
analytics at the company or workspace level rather than an individual person.  They 
do however need to [implement group tracking](/docs/product-analytics/group-analytics#how-to-create-groups) in their PostHog SDK.  Customers who haven't 
done this may end up paying for Group Analytics but not able to use it.

We have a [Vitally](https://posthog.vitally-eu.io/) risk indicator added to customers who are paying for Group Analytics 
but not using it.  

To help the customer you should figure out whether they are B2B or could otherwise benefit
from sending group information.  If so, reach out with guidance.  If not, reach out telling 
them that they can save by removing the Group Analytics add-on from the billing page.

### Autocapture

[Autocapture](/docs/product-analytics/autocapture) is a great way for users to get up and running with event capture without a huge engineering effort.  Autocapture can however get very noisy very quickly, and if users aren't leveraging these events they may not be getting value out of them.  You can understand a customer's Autocapture event volume from their Metabase customer usage dashboard (instructions above on how to get there).  There is a breakdown of the Key event volume Last 30 days which shows the number and % of Autocapture events they are sending across all projects.  If that is high (>50%) then check the Actions (by type) visualization on the same dashboard to see if they have any Autocapture actions defined.  If not they are likely to not be benefitting from Autocapture events.

If they aren't benefitting from Autocapture you should reach out to let them know how best to use it. Alternatively, they can tune or turn it off by following the [Autocapture configuration docs](/docs/product-analytics/autocapture#configuring-autocapture).

### Legacy Teams package

Customers on the legacy "Teams" package ($450/month) can save $200 by switching to the [Boost package](/platform-packages) ($250/month) if they don't need SAML SSO. The Teams package has been split into:

- [Boost package](/platform-packages) ($250/month)
- [Scale package](/platform-packages) ($750/month)

### Session replay targeting

When Session replay is enabled it will capture all sessions by default.  As every session is counted for billing purposes, customers may end up with a bunch of low value short recordings and still be paying for them.

If a customer has Session replay enabled, log in as them and look at their session replay [settings](/docs/session-replay/how-to-control-which-sessions-you-record).  At a minimum we recommend setting the minimum duration to 2 seconds or more but there are other tuning options which they may also benefit from.

## Are they running up-to-date SDKs?

Outdated SDKs miss out on bug fixes, performance improvements, and new features. A customer using a three-year-old SDK will hit issues we've already solved, which can silently erode trust over time.

Check SDK versions using the [SDK health check](/docs/health-checks/sdk-health) or in Metabase via the `Library version audit` table. At minimum, the SDK sending the bulk of their event volume shouldn't be more than 3 months behind the latest. Monthly updates are the best-practice habit to encourage. Some SDKs have breaking changes between versions, and if so, make sure you make the customer aware about the breaking change.

A light nudge on this also doubles as a natural re-engagement touchpoint for customers you haven't spoken to in a while.

## Have they implemented tracking incorrectly?

### Calling identify too often

A common pattern is for users to call `posthog.identify()` on every page, or in an endless loop.  Whilst this won't break their tracking (unless they use different distinct IDs in the identify call) they will end up with a drastically inflated event volume.  You can diagnose this by looking at their Metabase usage dashboard in the Key event volume visualization.  If either the volume of $identify or $set events is higher then 5% then something has likely gone wrong in the implementation.

You should get in touch and let them know that they only need to call `posthog.identify()` [once per session](/docs/product-analytics/identify#best-practices-when-using-identify).

### Calling groupidentify too often

As with `identify()` above users may also end up calling `posthog.group()` more than they should.  In the Key event volume visualization in Metabase if the $groupidentify count is higher than 5% they've likely set it to call once per page.  

You should get in touch and let them know that they only need to call `posthog.group()` [once per group per session](/docs/product-analytics/group-analytics#how-to-create-groups), or when the group changes.

To see where duplicate groupidentify calls are being generated, you can use the following SQL:

```
SELECT properties.$lib AS lib, count() AS groupidentify_event_count
FROM events
WHERE event = '$groupidentify'
  AND $session_id IN (
    SELECT $session_id
    FROM events
    WHERE event = '$groupidentify'
    GROUP BY $session_id
    HAVING count() > 1
  )
  AND timestamp >= now() - INTERVAL 30 DAY
  AND timestamp < now()
GROUP BY lib
ORDER BY groupidentify_event_count DESC
```

### Calling posthog.reset() before identifying the user

`Posthog.reset()` will generate a new anonymous distinct ID.  If this is called before a user is identified then two anonymous unlinked user may be created.  There is no easy way to proactively diagnose this however if a customer says that their tracking between web and app is off, this is a common culprit.

We have guidance on when to call `posthog.reset()` in the [JavaScript library features guide](/docs/libraries/js/features#resetting-a-user).

### Reverse Proxies 

It is best practice for a customer to use PostHog's [Managed Reverse Proxy](/docs/advanced/proxy/managed-reverse-proxy) or to configure their own for events to be sent from their own domain. 

When using either PostHog's managed reverse proxy or deploying a [non-managed reverse proxy](/docs/advanced/proxy#deploying-a-reverse-proxy), events should populate the "Library custom API host" property. Host mapping and domains can potentially be seen in Metabase. You should verify the setup with a customer.  

### Cookieless tracking

If a customer mentions their user/event count seems to be missing a lot of data from their website, ask them if they have implemented cookie opt-in and to share the part of their code where PostHog is initialized. Some customers may not be aware that we have specific recommendations for how to initiatlize PostHog for [cookieless tracking](/tutorials/cookieless-tracking). 

For example, if they implement PostHog on their website similar to as follows: 
```
posthog.init(...,
    opt_out_capturing_by_default: true
)

if (cookiePreference === 'accepted') {
    posthog.opt_in_capturing()
}
```

They will not be capturing anything for customers who visit their website and opt-out of cookies or ignore the cookie banner completely. We recommend instead they use the `cookieless_mode` parameter in their initializer as outlined in the [cookieless tracking tutorial](/tutorials/cookieless-tracking). If the customer wants to move forward with implementing cookieless mode, ensure they enable "Cookieless server hash mode" in their project settings under Project Settings > Web analytics.

Cookieless mode can help them have more accurate tracking totals because when using cookieless tracking, the PostHog SDK will generate a privacy-preserving hash, calculated on our servers.

## Are feature flags resilient?

### Falling back to working code
It is important that hitting the flags endpoint does not block an application from otherwise functioning correctly. If the flag fails to load or returns an unexpected value for any reason, such as `None`, `(empty string)`, or `false` you should [always fall back to working code.](/docs/feature-flags/best-practices#undefined-is-not-flag-is-off-nor-false)

### Server side local evaluation
Implementing [Server-side local evaluation](/docs/feature-flags/local-evaluation) will ensure that flags continue to return values regardless of the network status of the flags endpoint. By default, PostHog will attempt to evaluate the flag locally using definitions it loads on initialization and at the `poll interval`. If this fails, PostHog then makes a server request to fetch the flag value.

As a note, server side local evaluation is [billed differently](/docs/feature-flags/local-evaluation#step-2-initialize-posthog-with-your-feature-flags-secure-api-key) than other flag requests.

## Do they have a custom implementation that's causing issues?

Some customers build layers in between their app and PostHog, oftentimes as a precautionary measure or to accommodate a highly specific use case. While these custom configurations are mostly innocuous, sometimes they outlive the problem they were solving or create net new reliability issues. From the customer's POV, it can be difficult to discern the root cause of those issues, and it's on us to create clarity for them (even if those issues are self-inflicted). The last thing we want is for them to doubt PostHog's reliability when their custom implementation is the culprit. 

In this process of creating clarity for them, we should never cast blame or get defensive. Our goal is to diagnose the root cause of recently reported issues with a clear intention to help them understand what went wrong and how they can fix it. The evidence of self-inflicted issues is enough to push them towards a fix. More importantly, however, our respectful presentation of that evidence shows a good faith effort to help without the need to be right. 

### Creating a reliability audit

**Things you'll need:**
- Written history of past issues (tickets, Slack threads)
- Up to date documentation from the customer explaining their custom integrations
- Clarity on *when* those custom implementations were deployed to production
- Exa MCP (for reading through PostHog docs)
- Slack MCP (for reading through past threads)
- PostHog MCP
- Local clone of PostHog's product repo on your machine 

These will serve as context layers for your coding agent to help research and collate our own product's behavior and map it against their custom implementation. 

To get started, just ask your coding agent:

>/reliability-audit for {Customer} - here's their org ID: [xxx], Slack channel: [xxx], custom implementation documentation: [paste the full doc or link to it]. 

The `/reliability-audit` skill is available <PrivateLink url="https://us.posthog.com/project/2/skills/reliability-audit">here</PrivateLink>.

One helpful way to frame your audit is to organize it into these dimensions: issue, date, root cause, verdict, resolution, link to the original Slack thread / ticket. The idea of "verdict" is to give yourself a clear space to articulate whether the issue was due to their custom implementation or PostHog. 

While the format of what you deliver to the customer is entirely up to you, a Slack Canvas with a clear table and some descriptions can go a long way. <PrivateLink url="https://posthog.slack.com/docs/TSS5W8YQZ/F0B585Y1N9Y">Here's an example</PrivateLink>.

Your audit should push your customer to take action, so it may be helpful to include a clear articulation of what to keep versus change about their custom implementation. Make it easy for them to decide which parts of your audit they want to act on.

### Why it's worth doing this

Aside from restoring their confidence in PostHog's data integrity and reliability, it's radically hospitable. Even if the customer has expressed misplaced frustration at PostHog, you're still demonstrating a good faith effort to help them win by doing this audit. At the minimum, it unlocks goodwill and deepens their trust in you as their advocate at PostHog. 
