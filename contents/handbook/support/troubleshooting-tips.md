---
title: Troubleshooting tips
sidebar: Handbook
showTitle: true
---

A collection of tips & tricks on helping to troubleshoot customer issues. 

### General
- Add `distinct_id` as a column to see how the `distinct_id` changes (use SQL expression column). This is useful when troubleshooting identify / person profile related issues. 
- To breakdown events by anonymous vs identified, use this SQL snippet: `IF(person.properties.$creator_event_uuid IS NOT NULL, 'Identified', 'Anonymous') AS user_type`
- Debug mode: append `?__posthog_debug=true` to a site that has posthog running, e.g. https://app.mywebsite.com/login?__posthog_debug=true. This can show lots of useful information like logs and config.
- To check a customer's PostHog configuration:
  - In session replay, enable doctor and look for `posthog config` event.
  - Open the customer's site in debug mode (see above)
- To check if a customer is using a reverse proxy, look at their api_host configuration. If it shows `us.i.posthog` or `eu.i.posthog` – then they are not using a reverse proxy.


### Feature flags
- Check team activity to see if users have made any changes to the flag. Take note of the timestamp of any changes and see if it explains any discrepancies.


### Funnels

Common funnel troubleshooting steps
- Ensure you understand the conversion goal the user is tracking, clarifying this often helps, even if the user knows they’re doing the right thing
  - Are they reasoning about it right?
  - Have they chosen the correct events?
  - Are their events sent when they think/expect them to be sent?
  - Are they filtering the correct events for that flow?
- If it’s a mix between frontend and backend events, they must ensure identification is done right
- For reports about unexpected drop-offs, look at each event in the funnel separately to understand if they’ve dropped off on their own (using a Trends insight helps).
- **[Attribution type](/docs/product-analytics/funnels#attribution-types) ([example ticket](https://posthoghelp.zendesk.com/agent/tickets/31332))**: Users often report that their experiment funnels show a lot of `false` or `none` values for the feature flag breakdown. This is commonly the cause because they have “First touchpoint” selected as attribution, but they want “Last touchpoint.” This is only relevant when they’re using funnel analysis outside of the experiment, since the experiment already only takes into account users who had the expected variant by the end of the funnel.
- **Search for events by the user’s IP address** (which you can find in the event properties for the Web SDK). This works if the whole flow happens on the frontend, sometimes you can find that the same IP address has multiple distinct_id, which means that user may have multiple identities which funnels count separately.
- **Create funnels for each interval in their funnel**: Something that would have given us more helpful information sooner would have been creating a funnel for step 1 to step 2 and another funnel for step 2 to step 3. This was what ultimately confirmed there was a user identification problem.
- **Funnels and user paths use different queries ([example ticket](https://posthoghelp.zendesk.com/agent/tickets/30982))**: If a user reports seeing different numbers in funnels and user paths, that’s expected, these use different queries in the backend and measure different outcomes.
- **Look for identification splits**: If they’re identifying users in different environments (backend vs frontend) different libraries (Web vs Segment), or even with multiple IDs (logged out vs logged in), or even cross-subdomain without proper persistence (cookies) or different implementation configuration, all of these could cause a desync between identities which can break a funnel.

### Connecting frontend and backend identities

To connect frontend and backend identities, you only need to use the same `distinct_id` in both frontend and backend events. How you sync these depends on your system but here are some ways:

**Recommended: Set the `distinct_id` based on a known user ID:**
If you have a stable internal user ID, set `posthog.identify('your-user-id')` on the frontend, and use that same ID in backend events. This ensures alignment across both environments
- Alias: identify with id 1 -> alias with id 2 as alias and id 1 as distinct_id
- Wrong: identify with id 1 -> identify with id 2 -> alias

**Use a signed token or cookie:**
Store the `distinct_id` in a cookie or session token shared between frontend and backend, especially if you're using server-side rendering or middleware that handles both sides.

**Pass the ID from frontend to backend:**
When a user logs in or performs a tracked action, capture their `distinct_id` in the frontend (e.g., using `posthog.get_distinct_id()`), then include it in API requests or session headers so your backend can reuse it when sending events. Careful, you’re relying on PostHog’s distinct_id here, which may not be an expected value.

A potential pitfall is `posthog.reset()`.
