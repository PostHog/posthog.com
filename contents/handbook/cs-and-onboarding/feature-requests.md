---
title: Feature request tracking
sidebar: Handbook
showTitle: true
---

When working with our customers, they will occasionally ask for features which aren't in the product yet. We won't build a niche feature for a single big customer, but if we can see a request being of benefit to multiple customers, we should capture, track and feed it back to our product teams.

# Urgent vs Non-urgent requests

If a customer is at risk of churn, or otherwise unhappy about the missing feature, then we should communicate this to the relevant team in their Slack channel (usually #team-xyz). Adding in the urgency, ARR and tagging the team lead is a good approach here to get some focus.  Remember that you still own the customer and may need to follow up with product teams to get the right level of focus as they don't have all of the customer context that you do.  Don't create false urgency where there is none - we only want to use this approach when things are _actually_ urgent.

For non-urgent requests we should capture them in Customer analytics using the process on this page, and then share them with the teams in their Slack channels ahead of quarterly planning.

# Tracking feature requests in Customer analytics

We track feature requests in PostHog itself, on the Feature requests tab of <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/feature-requests">Customer analytics</PrivateLink>. This replaces the custom object we used to keep in Vitally, so don't add new requests there.

Each request holds:

- A **title** and a Markdown **description** - the customer-facing statement of the ask.
- One or more **accounts** - every customer who has asked for it.
- One or more **product areas** - how a request gets routed to a team, for example Session replay, Experiments, or Data warehouse & sources.
- A **status** - `Requested`, `Planned`, `Completed`, `Won't fix`, or `Duplicate`.
- An optional **priority** - High, Medium, or Low.
- **Evidence** for each account.

## Evidence

Evidence is the biggest change from how we worked in Vitally. Context attaches to each account instead of to one shared text field, so you can still tell who asked for what, and when.

Each evidence item takes an internal summary, a customer quote, the name of the source (Slack, a support ticket, a call), a link to that source, the date the customer asked, and optional screenshots. Add the contact information of the person asking for it, if it's not a Slack thread.

## Adding a customer to an existing request

1. Search the list first. There are hundreds of open requests, and a duplicate splits the evidence for a single ask.
2. Open the request and add the account to it.
3. Add an evidence item for that account with the quote, the source, and the link.

## Creating a new request

If you've checked the list and can't see an existing request then you should create a new one. You can do this in two ways:

1. From the Feature requests tab, using the button to create a new request.
2. From an account, where you can also see the requests that account is already linked to.

The title and the description are customer-facing, so write them for a product team that has none of your context. Leave the status at `Requested` unless a team is already working on it, and only set a priority when you have a reason to.

If a request turns out to be a duplicate, set its status to `Duplicate` and move the evidence onto the request you're keeping, rather than deleting it. You can archive a request you no longer want in the list and restore it later, and both edits and status changes keep a history.

## Using MCP and the API

Everything above is available through MCP, so you can ask PostHog AI to find, create, and update requests instead of using the UI. This is most useful for checking whether anyone else has asked for something before you file it, and for filing a request straight out of a Slack thread or a support conversation.

The same object is on the REST API at `/api/projects/:project_id/feature_requests/`, using the `customer_analytics:read` and `customer_analytics:write` scopes.

Signals coverage for feature requests is in progress. Until that lands, keep sharing requests with the teams in their Slack channels ahead of quarterly planning.
