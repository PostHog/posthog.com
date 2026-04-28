---
title: Feature request tracking
sidebar: Handbook
showTitle: true
---

When working with our customers, they will occasionally ask for features which aren't in the product yet. We won't build a niche feature for a single big customer, but if we can see a request being of benefit to multiple customers, we should capture, track, and feed it back to our product teams.

# Urgent vs non-urgent requests

Urgency is a context-driven measure of risk.  A feature request could be defined as _urgent_ if a customer is at risk of churn or otherwise uphappy about the missing feature.  Equally, a feature request from a newly onboarded customer can also serve as a great way to build a solid foundation of trust and showcase how we work at PostHog.  

If we determine a feature request to be truly urgent, then we should communicate this to the relevant team in their Slack channel (usually #team-xyz). Adding the urgency, ARR, and tagging the team lead is a good approach to get some focus.  Remember that you still own the customer and may need to follow up with product teams as they don't have the same customer context that you do.  If you are unsure about how urgent a feature request may be, ask in the team Slack channel. Don't create false urgency where there is none. 

For non-urgent requests, we should capture them in Vitally using the process on this page, and then share them with the teams in their Slack channels ahead of quarterly planning.

# Tracking feature requests in Vitally

## Current feature request list

We track feature requests a custom object in Vitally. You can see the current list of feature requests <PrivateLink url="https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/413939d5-0d20-40d5-963e-5987dcbae345">here</PrivateLink>. It's filterable by team, and shows the accounts and combined ARR of those accounts who have asked for the feature. There's also a <PrivateLink url="https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/a5747096-f417-4536-9ca3-4a1d0ef09534">Kanban board view</PrivateLink> which helps you track the progress of requests.

## Adding a customer to an existing request

1. Open up the request by clicking on the title of it
2. Under Accounts near the top of the request click to Select an Account
3. If the customer has specific context or a link to a Slack discussion then add it into the text area at the bottom of the request UI.  Also add in the contact information of the person asking for it, if it's not a Slack thread.

## Creating a new request

If you've checked the list above and can't see an existing request then you should create a new one.  You can do this in two ways:

1. When looking at the list of features, there is a Create new button in the top left of the UI.
2. When looking at an account, you can see the feature requests they are connected to in the related objects section of the UI.  There's a Create new button at the top of that UI as well.

Most of the fields are self-explanatory, and the status should almost always be set to `Requested` if it's a new one, unless the team is actively working on it.  Make sure you add as much context in the text area at the bottom as possible, with links to Slack/Zendesk tickets.
