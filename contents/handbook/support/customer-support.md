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

- **Support ticket** - Customers can create a support ticket directly within the PostHog app, under the help menu. This offers both users and PostHog engineers the best possible experience as Zendesk is automatically populated with a bunch of helpful context that makes troubleshooting easier. When in doubt, customers should be directed here.
- **Community questions** - users can also search [previously answered questions](/questions) that have been asked anywhere on posthog.com in our Docs. This is a great way to help us improve our Docs for simpler use-case type questions, but more complex questions should be re-routed via a support ticket. 
- **Dedicated Slack channels** - For higher-paying (or potential higher-paying) customers, we offer a dedicated channel on our main company Slack.

Sometimes, people reach out to us with support issues on Twitter/X. Regardless of whether someone reaches out to your personal account or to the company account the broad approach should be as follows:

1. Check first if they already have a ticket in Zendesk (either in-app or via /questions). There is nothing more annoying for a user than being asked to create a support ticket if they already have. If you don't have Zendesk access, ask someone in CS. 
2. If no tickets exist, explain that we can't provide support over social media and ask them to create a support ticket within the app - this is _much_ better than trying to solve their problem over Twitter as Zendesk pulls in a bunch of contextual information and is easier to collaborate in. Do this from the **PostHog** Twitter account - otherwise you will get personally contacted every time this user wants help. 
3. If yes, say that we can see their ticket and reassure them that all tickets are triaged and responded to. Let CS know that you have done this. Again, use the PostHog Twitter account.

Your objective should be to get the conversation into Zendesk ASAP, because it's easier to help the person there and to avoid setting a precedent that complaining visibly on social media results in an expedited response. An exception to this rule is if you are engaging with someone who has provided general feedback about PostHog - feel free to use your personal account if someone has a feature request or similar. If a user engage in a way which causes you _any_ distress, you can skip all of the above and just highlight it in Slack for CS to deal with. 

> Sometimes users ask about the progress of [certain issues](https://github.com/PostHog/posthog) that are important to them on GitHub. We don't consider GitHub to be a proper 'support' channel, but it is a useful place to gauge the popularity of feature requests or the prevalence of issues. 

### Support is done by actual engineers

All support at PostHog is done by actual, full-time engineers. We have two types of engineers: 

- Support engineers, who are focused solely on support across multiple products and sit in [the Support team](/teams/support)
- Product engineers, who are focused on products and take on support responsibilities in a [support hero rotation](/handbook/engineering/support-hero)

#### What do Support Engineers do?

Right now, support engineers provide the first level of support for the following teams:

- Product analytics
- Web analytics
- Session replay
- Feature flags
- Experiments
- Surveys
- Data warehouse
- Batch exports
- Sales & CS (Customer Success)

Support engineers respond to and solve as many tickets as they can for these products, or escalate tickets to the appropriate product engineer if needed. For all other products, the engineers on those teams are directly responsible for support. The support runbook is maintained on the [Support Hero page](/handbook/engineering/support-hero). 

When we hire new support engineers they will usually spend the first few weeks focused just on product and web analytics tickets, until they've started to build more familiarity with the platform as a whole. 

#### What do Support Heroes do?

One person on each product team takes on the **[Support Hero](/handbook/engineering/support-hero)** role each week. This is a rotating responsibility, where the person involved spends a significant chunk of their time responding to support queries across Slack, email and Zendesk, and sharing that feedback with the team and/or building features and fixes in response. We find each stint as Support Hero throws up a lot of really valuable feedback.

## Response targets, SLAs, and CSAT surveys

### Response Targets

We have a high volume of tickets and we're a small team, so we're not able to respond to all issues equally. For this reason we prioritize tickets according to the customer's plan. We set a response target for each plan so that we can be sure that tickets are being handled effectively. 

Note that tickets are automatically prioritized in Zendesk and users are updated with information about response targets to set appropriate expectations. In all cases, tickets are routed to the appropriate team and that team is responsible for meeting the response target.

The response times listed below are targets for an initial response, and it's possible we will respond faster. These targets are listed in calendar hours Monday - Friday. Please note that we do not offer any level of weekend customer support.

| Plan level | Target response time  | 
|-----------|----------------------|
| Free | Community support only | 
| Pay-as-you-go | 72 hours | 
| Boost | 48 hours  | 
| Scale | 24 hours  |
| Enterprise | 8 hours | 

Within Zendesk, we will further prioritize tickets based on their selected severity. If you come across a ticket that doesn't have the severity set appropriately [according to our severity level guidelines](/docs/support-options#severity-levels), then you should update the ticket with the appropriate severity level.


As a general rule, we aim to prioritize customers who pay for support, or who are otherwise considered a priority customer, to ensure they get the best possible support experience.

> **_NOTE:_** If a user has recently upgraded to the Enterprise plan, their tickets may not automatically be tagged as Enterprise in the PostHog Priority field in Zendesk. If this happens, manually set the Priority field to Enterprise to ensure they get in the proper queue.


### Follow-up / next reply response targets

Our follow-up response targets and next reply targets are the same as the initial response targets. We believe that customers should receive regular updates on the status of their query - even if the update is that we're working on it and there's nothing meaningful to report at present.

### Escalated ticket response targets

When support engineers need to escalate issues to other engineering teams for deeper investigation, the investigations can take longer but we should still check in with the customer to let them know! For escalated tickets, our response targets are the same as for all other tickets.

> **_NOTE:_** The targets are for a reply to the user. If the escalation turns out to be a bug or feature request, the reported issue doesn't have to be solved by the response target date, we just need to reply to the user. That reply may be to let them know it won't be fixed right away, but that we have opened a bug report or feature request. If we've opened a feature request or a bug report, you can refer the user to the GitHub issue for updates, and `Solve` the ticket. If you're replying with info that should resolve the issue, leave it in a `Pending` state (will be auto-solved in 7 days if the user doesn't reply.) If the user replied to confirm the issue is resolved, `Solve` the ticket. Use `On-Hold` sparingly, e.g. if you intend to get back to the user soon (more than a week, less than a month.)

### CSAT Surveys

We send out CSAT surveys after a ticket has been closed for at least 3 days using [this Automation](https://posthoghelp.zendesk.com/admin/objects-rules/rules/automations/22328357692571). The emails contain a link to https://survey.posthog.com/ with their `distinct_id`, `ticketId`, and the assigned team as query parameters, which are being used alongside their satisfaction rating to capture a `survey sent` event. The code for the survey website is in the [PostHog-csat](https://github.com/PostHog/posthog-csat) repo and the responses can be viewed in [this dashboard](https://us.posthog.com/project/2/dashboard/130687). 

As an incentive, we offer to feed one hedgehog for every survey sent. <TeamMember name="Ben Haynes" photo /> is the current holder of the hedgehog feeding rights, and takes care of this by making a monthly donation to [the Herts Wildlife Trust](https://www.hertswildlifetrust.org.uk/).

## Guidelines for doing support at PostHog

### Dealing with difficult or abusive users 

We very occasionally receive messages from people who are abusive, or who we suspect may have a mental illness. These can come via the app, or [Community Questions](/questions). We do not expect support engineers to deal with abuse of any kind, ever. 

If this happens, notify <TeamMember name="Charles Cook" photo />, <TeamMember name="Abigail Richardson"/> or <TeamMember name="Fraser Hopper" photo />. They will either take this on, or advise you on how to reply.

### Dealing with legal requests from users

We very rarely receive messages from people wishing to make a legal claim against PostHog, such as cease and desist letters. These can come via the app, or [Community Questions](/questions). Do not respond to these requests. Instead, notify <TeamMember name="Charles Cook" photo /> or <TeamMember name="Fraser Hopper" photo /> immediately. They will either take this on, or advise you on how to reply.

### Dealing with billing issues

Issues related to billing are handled exclusively by our billing engineers. Billing support is currently lead by <TeamMember name="Eleftheria Trivyzaki" photo />. Most tickets get routed directly to the billing team, however some issues require technical investigation before the billing issue can be resolved. In such cases, add <TeamMember name="Eleftheria Trivyzaki" /> as a follower to the support ticket from the outset, and leave an internal note briefly explaining what will eventually be required. Complete whatever technical investigation is required and then let the customer know you are handing them over to the billing team.

### Users asking for demos, consultations or partnerships

We often receive requests for demos, consultations or other sales-related requests. Most of the time these can be escalated to the [Sales team](/handbook/growth/sales/overview) if they arrive via Zendesk. If they arrive directly via email you can forward them to sales@posthog.com.

We also often get requests for partnerships, backlinks, or messages trying to sell us baby Yahama pianos. Sometimes, people want to invest in PostHog. Most of these are obviously spam and can be ignored, but if you think an opportunity may be genuine then you can forward it to <TeamMember name="Joe Martin" photo /> so he can take over. 

### Users asking for their data to be deleted

Most of the time users can self-serve deletion requests and should be encouraged to do so in order to save time and ensure they take responsibility for deleting their own data. Users can delete their [environment](https://us.posthog.com/settings/environment-danger-zone), [project](https://us.posthog.com/settings/project-danger-zone), and [organization](https://us.posthog.com/settings/organization-danger-zone) in the appropriate 'Danger Zone' section of their settings page if they have the correct permissions. Admins can remove members from their organization in [the Members page](https://us.posthog.com/settings/organization-members).

If a user refuses to delete their own data, you must first confirm they have the permissions to do this by checking their email address matches that  an organization admin. As an extra layer of security, you should also ask them to confirm their address by emailing you directly from it (e.g. not through Zendesk.) Only then should you delete any data on their behalf. 

If a user asks for us to delete all of their _personal_ data in compliance with GDPR, you should confirm their identity as described above and delete the user from PostHog. Finally, you should notify <TeamMember name="Joe Martin" photo /> so he can delete customer data from our email marketing systems, and <TeamMember name="Fraser Hopper" photo /> so he can coordinate further data deletion across our systems.

#### Targeted deletion requests

Occasionally users will mistakenly share sensitive data which should not have been shared via event/person properties.  As such they wish to be more targeted in their deletion by removing only certain properties or events instead of an entire project.  

> Before taking any deletion action, they should ensure that they are no longer sending the sensitive data to us either by [redacting information client-side](https://posthog.com/docs/libraries/js/features#redacting-information-in-events) or setting up a [CDP transformation](https://posthog.com/docs/cdp/transformations/property-filter-plugin).  If they don't do this first they will continue to send us the sensitive data even after deletion is actioned.

Due to the the nature of how our infrastructure works, events and properties cannot be amended once they are stored in Clickhouse.  As such, the only way to remove sensitive data is to delete the person profile associated with the events where the sensitive data has been captured.  This can be achieved [in the app or via the API](https://posthog.com/docs/data/persons#deleting-person-data).  As per our [deletion docs](https://posthog.com/docs/privacy/data-deletion#asynchronous-data-deletion), the person profile will be removed immediately but the events will take some time (days or even weeks) to be removed.

> If they aren't using person profiles, they won't be able to use this method and as such will need to revert back to deleting the entire project containing the sensitive data.

**For customers spending $20K and above a year** our Clickhouse team may be able to craft a more targeted event deletion/property amendment query.  There are no guarantees here and it is very time consuming hence why we will only explore this for high-paying customers.  If you have a customer in this situation and the above methods won't work for them; escalate a support ticket to the Clickhouse team with as much detail as possible on the event and property names where the data is leaked so that they can create a query to process the deletion.  To expedite this you should ask the customer for a SQL query which correctly identifies the events or properties to be deleted, or help them in crafting that.  Also verify that the numbers returned by this query match what the customer expects to see.  Once started this can also take some time (days or weeks) so you should set those expectations with the customer.

> If they need to remove data immediately, the only way to do this is the delete the project.  There are no other alternatives.

#### Handling sales leads

If a support ticket should be handled by one of the sales/onboarding teams, use the `Create a lead` macro in Zendesk to respond to the customer. The macro adds the `sf-lead` tag to the ticket, which will automatically create a new lead in Salesforce. This automation is documented in the [Sales area of the handbook](/handbook/growth/sales/crm#zendesk-integration).

## Community

Support =/= community - we consider them to be separate things.

### Tutorials

We want to help teams of all sizes learn how to ask the right product analytics questions to grow their product. To help, we create content in the form of [tutorials](/tutorials), [blog posts](/blog), and [videos](https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA).

We've also created a bunch of useful [templates](/templates) that cover many of the most popular PostHog use cases.  
