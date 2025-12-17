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

### Session replay targeting

When Session replay is enabled it will capture all sessions by default.  As every session is counted for billing purposes, customers may end up with a bunch of low value short recordings and still be paying for them.

If a customer has Session replay enabled, log in as them and look at their session replay [settings](/docs/session-replay/how-to-control-which-sessions-you-record).  At a minimum we recommend setting the minimum duration to 2 seconds or more but there are other tuning options which they may also benefit from.

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
It is important that hitting the flags endpoint does not block an application from otherwise functioning correctly. If the flag fails to load or returns an unexpected value for any reason, such as `None`, `(empty string)`, or `false` you should [always fall back to working code.](/docs/feature-flags/best-practices#9-fallback-to-working-code)

### Server side local evaluation
Implementing [Server-side local evaluation](/docs/feature-flags/local-evaluation) will ensure that flags continue to return values regardless of the network status of the flags endpoint. By default, PostHog will attempt to evaluate the flag locally using definitions it loads on initialization and at the `poll interval`. If this fails, PostHog then makes a server request to fetch the flag value.

As a note, server side local evaluation is [billed differently](/docs/feature-flags/local-evaluation#step-2-initialize-posthog-with-your-feature-flags-secure-api-key) than other flag requests.
