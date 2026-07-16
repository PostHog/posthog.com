---
title: Customer support
sidebar: Handbook
showTitle: true
---

You can build a good company by focusing on getting lots of customers. To build a *great* company, you must delight your existing customers. This means that the journey doesn't simply end once we sign up a user - even more important is to ensure that PostHog is consistently delivering value for them.

## How we ensure amazing customer support

### It's easy for customers to reach us

We have a few different routes for users to contact us. As an open source company, our bias is towards increasing the bandwidth of communication with our users and making it easy for them to reach us through a clearly defined, simple set of channels. 

These are the ways in which customers can currently reach us:

- **Support ticket** - Customers can create a support ticket directly within the PostHog app, under the help menu. This offers both users and PostHog engineers the best possible experience as the ticket is automatically populated with a bunch of helpful context that makes troubleshooting easier. When in doubt, customers should be directed here.
- **Dedicated Slack channels** - For higher-paying (or potential higher-paying) customers, we offer a dedicated channel on our main company Slack.

> Sometimes users ask about the progress of [certain issues](https://github.com/PostHog/posthog) that are important to them on GitHub. We don't consider GitHub to be a proper 'support' channel, but it is a useful place to gauge the popularity of feature requests or the prevalence of issues. 

### Support is done by actual engineers

All support at PostHog is done by actual, full-time engineers. We have two types of engineers: 

- Support engineers, who are focused solely on support across multiple products and sit in the <SmallTeam slug="support" />
- Product engineers, who are focused on products and take on support responsibilities in a [support hero rotation](/handbook/engineering/support-hero)

#### What do Support Engineers do?

Right now, support engineers provide the first level of support for most engineering teams and [specialize in certain products](/handbook/support/support-smes).

Support engineers respond to and solve as many tickets as they can for these products, or escalate tickets to the appropriate product engineering team if needed. There are certain products where the engineers on those teams are directly responsible for support:
 - Security
 - Merch
 - Wizard & Docs
 - Clickhouse and infrastructure teams
 - Any team whose product is not yet in GA

When we hire new support engineers they will usually spend the first few weeks focused just on analytics related tickets, until they've started to build more familiarity with the platform as a whole.

#### What do Support Heroes do?

One person on each product team takes on the **[Support Hero](/handbook/engineering/support-hero)** role each week. This is a rotating responsibility, where the person involved spends a significant chunk of their time responding to support queries in PostHog Support and sharing that feedback with the team and/or building features and fixes in response. We find each stint as Support Hero throws up a lot of really valuable feedback.

## Response targets, SLAs, and CSAT surveys

### Response targets

We have a high volume of tickets and we're a small team, so we're not able to respond to all issues equally. For this reason we prioritize tickets according to the customer's plan. We set a response target for each plan so that we can be sure that tickets are being handled effectively. 

Note that tickets are automatically prioritized in PostHog Support and users are updated with information about response targets to set appropriate expectations. In all cases, tickets are routed to the appropriate team and that team is responsible for meeting the response target.

The response times listed below are targets for an initial response, and it's possible we will respond faster. These targets are listed in calendar hours Monday - Friday. Please note that we do not offer any level of weekend customer support.

| Plan level | Target response time  | 
|-----------|----------------------|
| Free | Community support only | 
| Pay-as-you-go | 72 hours | 
| Boost | 48 hours  | 
| Scale | 24 hours  |
| Enterprise | 8 hours | 

Within PostHog Support, we will further prioritize tickets based on their selected priority. If you come across a ticket that doesn't have the priority set appropriately [according to our severity level guidelines](/docs/support-options#severity-levels), then you should update the ticket with the appropriate priority.

As a general rule, we aim to prioritize customers who pay for support, or who are otherwise considered a priority customer, to ensure they get the best possible support experience.


### Follow-up / next reply response targets

Our follow-up response targets and next reply targets are the same as the initial response targets. We believe that customers should receive regular updates on the status of their query - even if the update is that we're working on it and there's nothing meaningful to report at present.

### Escalated ticket response targets

When support engineers need to escalate issues to other engineering teams for deeper investigation, the investigations can take longer but we should still check in with the customer to let them know! For escalated tickets, our response targets are the same as for all other tickets.

> **_NOTE:_** The targets are for a reply to the user. If the escalation turns out to be a bug or feature request, the reported issue doesn't have to be solved by the response target date, we just need to reply to the user. That reply may be to let them know it won't be fixed right away, but that we have opened a bug report or feature request. If we've opened a feature request or a bug report, you can refer the user to the GitHub issue for updates, and `Solve` the ticket. If you're replying with info that should resolve the issue, leave it in a `Pending` state (will be auto-solved in 7 days if the user doesn't reply.) If the user replied to confirm the issue is resolved, `Solve` the ticket. Use `On-Hold` sparingly, e.g. if you intend to get back to the user soon (more than a week, less than a month.)

### CSAT surveys

We send out a [CSAT survey](https://us.posthog.com/project/2/surveys/019f37dc-7c9a-0000-d86a-aa8bf46f4917) after a ticket has been resolved for at least 1 day using [this workflow for tickets set to resolved](https://us.posthog.com/project/2/workflows/019f3834-8dbd-0000-4b19-073031109b21/workflow) and [this workflow for tickets set to pending](https://us.posthog.com/project/2/workflows/019c5746-a12b-0000-3145-a62dca023f64/workflow). The emails contain a link to the hosted survey with their `distinct_id`, `ticket_id`, and `ticket_number` as query parameters, which are being used alongside their satisfaction rating to capture a `survey sent` event.

As an incentive, we offer to feed one hedgehog for every survey sent, and we do this by making a quarterly donation to [the Suffolk Prickles Hedgehog Rescue Charity](https://suffolkprickles.org/).

## Guidelines for doing support at PostHog

### Dealing with difficult or abusive users 

We very occasionally receive messages from people who are abusive, or who we suspect may have a mental illness. These can come via the app, or [Community Questions](/questions). We do not expect support engineers to deal with abuse of any kind, ever. 

If this happens, notify <TeamMember name="Charles Cook" photo />, <TeamMember name="Abigail Richardson"/> or <TeamMember name="Fraser Hopper" photo />. They will either take this on, or advise you on how to reply.

### Dealing with legal requests from users

We very rarely receive messages from people wishing to make a legal claim against PostHog, such as cease and desist letters. These can come via the app, or [Community Questions](/questions). Do not respond to these requests. Instead, notify <TeamMember name="Charles Cook" photo /> or <TeamMember name="Fraser Hopper" photo /> immediately. They will either take this on, or advise you on how to reply.


## Community

Support =/= community - we consider them to be separate things.

### Tutorials

We want to help teams of all sizes learn how to ask the right product analytics questions to grow their product. To help, we create content in the form of [tutorials](/tutorials), [blog posts](/blog), and [videos](https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA).

We've also created a bunch of useful [templates](/templates) that cover many of the most popular PostHog use cases.  


## Common issues & questions

### Dealing with billing issues

Issues related to billing are handled exclusively by our billing engineers. Billing support is currently lead by <TeamMember name="Eleftheria Trivyzaki" photo />. Most tickets get routed directly to billing support, however some issues require technical investigation before the billing issue can be resolved. In such cases, let <TeamMember name="Eleftheria Trivyzaki" /> know by messaging #team-support in Slack, and leave a private note on the ticket briefly explaining what will eventually be required. Complete whatever technical investigation is required and then let the customer know you are handing them over to billing support.

### Users asking for demos, consultations or partnerships

We often receive requests for demos, consultations or other sales-related requests. Most of the time these can be escalated to the [Sales team](/handbook/growth/sales/overview) if they arrive via PostHog Support.

We also often get requests for partnerships, backlinks, or messages trying to sell us baby Yahama pianos. Sometimes, people want to invest in PostHog. Most of these are obviously spam and can be ignored, but if you think an opportunity may be genuine then you can forward it to <TeamMember name="Joe Martin" photo /> so he can take over. 

### Users asking for their data to be deleted

Most of the time users can self-serve deletion requests and should be encouraged to do so in order to save time and ensure they take responsibility for deleting their own data. Users can delete their [environment](https://us.posthog.com/settings/environment-danger-zone), [project](https://us.posthog.com/settings/project-danger-zone), and [organization](https://us.posthog.com/settings/organization-danger-zone) in the appropriate 'Danger Zone' section of their settings page if they have the correct permissions. Admins can remove members from their organization in [the Members page](https://us.posthog.com/settings/organization-members).

If a user refuses to delete their own data, you must first confirm they have the permissions to do this by checking their email address matches that of an organization admin. As an extra layer of security, you should also ask them to confirm their address by emailing you directly from it (e.g. not through PostHog Support.) Only then should you delete any data on their behalf. 

If a user asks for us to delete all of their _personal_ data in compliance with GDPR, you should confirm their identity as described above and delete the user from PostHog. Finally, you should notify <TeamMember name="Joe Martin" photo /> so he can delete customer data from our email marketing systems, and <TeamMember name="Fraser Hopper" photo /> so he can coordinate further data deletion across our systems.

#### Targeted deletion requests

Occasionally users will mistakenly share sensitive data which should not have been shared via event/person properties.  As such they wish to be more targeted in their deletion by removing only certain properties or events instead of an entire project.  

> Before taking any deletion action, they should ensure that they are no longer sending the sensitive data to us either by [redacting information client-side](https://posthog.com/docs/libraries/js/features#redacting-information-in-events) or setting up a [CDP transformation](https://posthog.com/docs/cdp/transformations/property-filter-plugin).  If they don't do this first they will continue to send us the sensitive data even after deletion is actioned.

Due to the the nature of how our infrastructure works, events and properties cannot be amended once they are stored in Clickhouse.  As such, the only way to remove sensitive data is to delete the person profile associated with the events where the sensitive data has been captured.  This can be achieved [in the app or via the API](https://posthog.com/docs/data/persons#deleting-person-data).  As per our [deletion docs](https://posthog.com/docs/privacy/data-deletion#asynchronous-data-deletion), the person profile will be removed immediately but the events will take some time (days or even weeks) to be removed.

> If they aren't using person profiles, they won't be able to use this method and as such will need to revert back to deleting the entire project containing the sensitive data.

**For customers spending $20K and above a year** our Clickhouse team may be able to craft a more targeted event deletion/property amendment query.  There are no guarantees here and it is very time consuming hence why we will only explore this for high-paying customers.  If you have a customer in this situation and the above methods won't work for them; escalate a support ticket to the Clickhouse team with as much detail as possible on the event and property names where the data is leaked so that they can create a query to process the deletion.  To expedite this you should ask the customer for a SQL query which correctly identifies the events or properties to be deleted, or help them in crafting that.  Also verify that the numbers returned by this query match what the customer expects to see.  Once started this can also take some time (days or weeks) so you should set those expectations with the customer.

> If they need to remove data immediately, the only way to do this is the delete the project.  There are no other alternatives.


#### How should I handle organization ownership transfers?

In case a user requests for organization permissions to be altered (e.g. the only member with owner membership left the company) follow these steps:

1. The ticket should be assigned ideally to Platform features
2. Ask the user to get the current owner to log in and update ownership.
3. If the owner left and they can get access to the current owner’s email, ask them do a password reset and then login as the owner and perform the action themselves.
4. If not, we should email the account owner’s email to see if we get a bounce back. Also check how long it is since they logged in.
5. If accessing the current owner's email is not an option, we should have the person requesting access verify their domain ownership by providing a TXT record example for posthog verification.
6. Once verified, membership can be updated for the request. 
7. Note, if they’re on a paid plan we might also need to switch the contact on Stripe via a separate request to billing @posthog.com

#### How should I handle 2FA reset?

Locate the user's profile in admin and send them a 2FA reset link. The link expires in 24 hours, so let the user know they'll need to use it within that window.

#### How do I handle a bug report or feature request?

For feature requests from low priority users, [give them this link](https://github.com/PostHog/posthog/issues/new/choose) and suggest they open a feature request.

For bug reports from normal and high priority users (assuming you've confirmed it's a bug, and that there's not already an open bug report):

1. [Open a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml) on our GitHub repo
2. Be sure to include a link to the insight (or other), below the repo steps
3. Include a link to the ticket in the `additional info` section of the bug comment.
4. Reply to the user to thank\* them for alerting us to the bug. Let them know you've opened a bug report and provide a link to it.
5. Let them know they can follow the bug report on GitHub for updates.
6. When sending the reply, change the ticket from `Open` to `Pending`
7. In Slack, go to the team channel for the team that handles the feature that the bug report applies to (e.g. `#team-product-analytics`) and alert them with a post like "New bug report from a high priority customer: `https://github.com/PostHog/posthog/issues/nnnnnn`"

`*` consider sparking additional joy with a [credit for merch](/handbook/company/merch-store#merch-giveaways)

Steps for feature requests from normal and high priority users are pretty much the same, but [use this form](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&projects=&template=feature_request.yml) instead. If you find that there's already a matching feature request open, reply with a link to the feature request, and let them know they can upvote it by adding a "`+1`" comment.


#### Handling sales leads

If a support ticket should be handled by one of the sales / CS / onboarding teams, message #group-cs-sales-support to let the teams know.


#### How should I handle self-hosted setups?

It's fine to politely direct users to the docs for [self-serve open-source support](/docs/self-host/open-source/support#support-for-open-source-deployments-of-posthog) and ask them to file a GitHub issue if they believe something is broken in the docs or deployment setup. We do not otherwise provide support for self-hosted PostHog.

