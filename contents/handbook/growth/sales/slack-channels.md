---
title: Shared Slack Channels with Customers
sidebar: Handbook
showTitle: true
---

We offer shared Slack channels to customers and prospective customers in several circumstances:
- Prospective, [new customers](/handbook/growth/sales/new-sales) can have a shared Slack channel for the duration of [a trial period](/handbook/growth/sales/trials), and keep a shared Slack channel after the trial if they qualify with <$20k in annual, committed spend OR a subscribe to a support package which includes a shared Slack.
- [Product-led customers](/handbook/growth/sales/product-led-sales) can earn a shared Slack channel by growing beyond <$20k in annualized spend.
- [Existing customers](/handbook/growth/sales/expansion-and-retention) can earn a shared Slack channel by committing to <$20k in annual spend OR growing beyond <$20k in annualized spend.

We use shared Slack channels to provide timely support and to build relationships with those at our customers shipping things with PostHog. 

Shared Slack channels allow many folks at PostHog to support our customers.  And, a shared Slack channel must be configured correctly in order for this support to work.

## Setting up a Shared Slack Channel via Slack Connect

We use [Slack Connect](https://slack.com/resources/using-slack/getting-started-with-slack-connect) to share Slack channels with our customers. 

To get a shared Slack channel going, follow these steps:

1. Create a new Slack channel - the expected syntax for the name is `posthog-[customername]`.
2. When determining the `[customername]`, make sure make it searchable (avoid acronyms, if possible).
3. Obviously, invite the relevant customer folks! Be sure that you're inviting them to the *channel* you've created and not our Slack workspace. 
4. Invite certain leaders who want to help monitor the channel, including: Tim, Charles, Abigail, Simon and anyone else internal who may be connected to the customer. PostHog folks will sometimes join the channel if they're interested in the customer or the use-case
5. Invite [Pylon](/handbook/engineering/support-hero#pylon-to-create-zendesk-tickets-from-slack-posts) to ensure those from PostHog and the customer can create support tickets from Slack threads - Use the a slash command in Slack to invite Pylon `/invite @pylon` . Pylon will join and prompt you with some questions. Note that this is a `customer channel`, and select yourself as the channel owner. You can check to see if the connection is established in the ["Account Mapping" section in Pylon](https://app.usepylon.com/apps/530aefd1-b625-4e7d-91c0-320c2ede2b51?tab=account-mapping). 
6. Set your preferences to "Get notifications for all messages" in the channel -- this will ensure you don't miss a message and allow for speedy support. 
7. Ensure that the Slack channel name is recorded on the relevant Salesforce Account record in the `Slack Channel` field -- If the `[customername]` in Slack is different from the Account record name in Salesforce, Pylon will not automatically match the two.
8. Grab the Admin Panel link (from Vitally under PostHog Default Dashboard) and in the channel add this as a new link. Name it Org Link and add a new folder called Support. This is helpful to our Support Team for quickly accessing the customer's account when questions are posted in Slack. 

If you have any questions as you go, ping your colleagues for support in your team channel.

## Using MS Teams via Pylon

Some customers may wish to use MS Teams rather than Slack - we can sync our Slack with Teams via Pylon to do this. First you will need an MS Teams licence - ask Simon for one. Then, set up a Slack channel according to the instructions above. Then, [follow the instructions here](https://docs.usepylon.com/pylon-docs/integrations/chat/microsoft-teams) to get set up. Before adding the customer into the channel, remember to test it on both sides to ensure the integration is working correctly.

## Onboard Your Customer to Slack Support

Welcome them to the channel when they join! 

Set context for the channel's purpose and timing (if applicable). Let them know that they may hear from anyone at PostHog who is monitoring the channel, and also don't miss the opportunity to train them how to open a ticket with the Pylon app. 

A message like this one does wonders to help them understand how to open a ticket if you're not online to help yourself:

>We also have an app here that will open a ZenDesk ticket if I'm sleeping. You only have to add the :ticket: emoji to the thread and it will open a ZenDesk ticket automatically, and capture the back and forth in the specific Slack thread that received that emoji. You can also `@support` in a thread to open a ticket as well. It's a good habit to get into in order to make sure our distributed team can help.

The [New sales playbook has more](https://posthog.com/handbook/growth/sales/new-sales#4-product-evaluation) on ensuring that the customer is set up for success.