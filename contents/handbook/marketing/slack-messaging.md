---
title: Slack messaging
sidebar: Handbook
showTitle: true
---

> This page isn't accurate - we have deprecated Pylon and don't have a comparable broadcast capability in SupportHog or elsewhere.  In the meantime if you want to get a Slack message out to customers ask account owners to do it on your behalf in [#group-cs-sales-support](https://posthog.slack.com/archives/C090RCG671C)

We share [Slack channels with many of our customers and partners](/handbook/growth/sales/slack-channels) via Slack Connect, managed through [Pylon](/handbook/growth/sales/slack-channels), our own tool. These channels are normally used for support and relationship building, but Pylon's **broadcast** functionality also lets us send a single message to every customer or partner Slack channel at once.

This is a powerful way to amplify [product announcements](/handbook/marketing/product-announcements) and other comms directly to the people building on PostHog, alongside our usual [email](/handbook/marketing/email-comms) and [in-app](/handbook/marketing/in-app) channels.

> **Slack broadcasts do not reach our [PostHog Discord](https://posthog.com/questions).** The Discord community is managed by the IRL Events team, not Marketing, and is a separate audience. If you want your message to reach Discord too, coordinate with the IRL Events team.

## When to use a Slack broadcast

Broadcasts go to every shared customer and partner channel, so they're best reserved for messages that are genuinely relevant to that whole audience. Good candidates include:

- Major [product announcements](/handbook/marketing/product-announcements) and new product launches.
- Pricing or plan changes that affect customers.
- [Maintenance and incident comms](/handbook/marketing/incident-comms) where customers should be aware of disruption.
- Invitations to betas, events, or programs aimed at existing customers.

Because every customer sees the same message, keep broadcasts infrequent and high-signal. As a rough guide, **no more than one broadcast every couple of weeks** as it's easy to tip over into spamming people. If a message is only relevant to a subset of accounts, it's usually better to let the account owner share it directly.

## Check with Sales before sending

Broadcasts reach live customer and partner channels, and Sales or the TAMs may know of sensitive accounts that should be excluded from a particular comm. Always give them a chance to flag any before you send:

1. Share a brief update in <PrivateLink url='https://posthog.slack.com/archives/C090RCG671C'>#group-cs-sales-support</PrivateLink> describing the comm you're about to send and who it will reach.
2. Allow at least **24 hours** for salespeople and TAMs to respond with any accounts that should be excluded or any other concerns.
3. **Ping more than once.** A single message is easy to miss. Follow up a couple of times, and give a final heads-up with the scheduled send time (e.g. "this is going out at X") so people have a last chance to flag anything.
4. If no feedback is received within that window, go ahead and send - you don't need to wait for explicit sign-off or be blocked.

Pylon broadcasts should be treated like email messages and added to the Marketing Messaging calendar as standard.
This step is required, but it keeps PMMs unblocked while giving the people closest to our customers a simple way to catch anything sensitive.

### Excluding channels before you send

Beyond accounts that sales or CS flags, scan the audience yourself for channels that shouldn't receive the message:

- **Drop legacy and archived channels.** Pylon's audience often includes old or inactive channels. They're usually obvious from the name – exclude them so the message only lands in live channels.
- **Check for recent negative sentiment.** It's worth quickly asking an LLM to scan the `#posthog-*` channels and surface any negative sentiment from the last two weeks. This usually turns up a handful worth excluding.
- **Consider excluding people already using the feature.** If the broadcast is nudging people towards something, exclude accounts that already use it – or word the message so it still works for them (e.g. framing it as "in case you missed these features" rather than assuming they haven't seen them).

## How to send a broadcast in Pylon

1. Log into Pylon using SSO with your PostHog email address.
2. Find the broadcasts feature in Pylon and create a new broadcast.
3. Select the audience – typically all customer and/or partner Slack channels. Double-check the audience before sending, as the message goes to live customer channels.
4. Write your message. Keep it short, friendly, and link out to the [changelog](/changelog), blog post, or docs for the full detail.
5. **Send the message as yourself, not as PostHog.** Pylon lets you choose the sender - sending from a real person feels more personal and gets a better response than a faceless company message.
6. Preview, then send.

## Before you send

- **Write copy that follows our [style guide](/handbook/content/posthog-style-guide).** These messages land in customer-facing channels, so they should read like a helpful heads-up from a teammate, not a press release.
- **A light, self-aware tone works well.** Leaning into the fact that it's an automated broadcast (rather than pretending otherwise) tends to land well and pre-empts any "stop spamming us" reactions.
- **Link, don't dump.** Point people to the canonical source (changelog, blog, docs) rather than pasting long updates into Slack.
- **Coordinate with related comms.** A broadcast usually accompanies an email and/or in-app announcement. Make sure timing and messaging are consistent across channels.
- **Remember the audience is live customers.** Once sent, a broadcast cannot be unsent from people's Slack, so review carefully.

## After you send

Broadcasts generate replies, and how they reach you isn't always obvious:

- **Replies land in a thread in your private Slackbot**, which isn't shareable with the rest of the team. If a customer replies *outside* the thread in their channel, you won't see it at all unless you're already a member of that channel.
- **Expect a lot of questions.** Use judgement on what to answer yourself versus what to hand off:
  - Simple, generic questions (e.g. "where can I read more?") are fine to answer directly.
  - Account-specific questions (e.g. "how would *we* use this?") are usually better routed to the account's TAM or CSM, who have the context to answer well.
