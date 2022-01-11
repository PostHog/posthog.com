---
title: Support Hero and rotations
sidebar: Handbook
showTitle: true
---

We have two types of rotations for engineering:

1. Support Hero, first line responder to customer questions and bug reports
2. Secondary on-call, responsible for prioritizing and solving escalated issues, Sentry errors and alerts.

When someone is _Support Hero_, they are also the secondary on-call person for their team

## 1. Support Hero

Every week, we assign one person to be the "Support Hero." If this is you this week, congratulations! Support hero is an intense but super fun week where you get to talk to a bunch of users, get the statisfaction of helping them out and contribute to a lot of different parts of our system.

All other work takes a back seat while you're doing support, so don't plan on doing any 'normal' work.

### Availability

You should work your 'normal' hours during this week. Right now people in other timezones will jump in ad-hoc to catch messages that fall outside of the Support Hero's hours. Just make sure that as support hero you are doing the bulk of the debugging/fixing.

If you are planning on taking a day off or you won't be available, please find someone to swap with and update the rotation on PagerDuty. Be sure to schedule an override for both swaps and **do not alter the rotation order** to avoid affecting other members.

### Rotation

You can view the Support Hero rotation [in PagerDuty here](https://posthog.pagerduty.com/schedules#PPLGE4G).

### Channels

There are a couple of channels that customer requests come in so make sure you keep an eye on all of them, but the **most stuff will happen in [Papercups](#papercups)**:

- [PostHog Users's Slack](https://posthog.com/slack), specifically #_customer_support, where all messages will come in from the other channels (also on [Papercups](#papercups)).
- GitHub issues, with [the main repo](https://github.com/posthog/posthog/issues) being the most important one.
- Sentry issues, either [directly](https://sentry.io/organizations/posthog/issues/?project=1899813) or in #sentry in our main Slack.

### Communication

As an engineer, when a question comes in your first instinct is to give them an answer as quickly as possible. That means we often forget pleasantries, or will ignore a question until we've found the answer. Hence the following guidelines:

- Always respond to a question within a reasonable timeframe during your working day (<15 minutes is great, <1 hour is okay, anything over a day is too late)
  - If you're ready to look into the issue and you think it might take a while/require a fix, just mention that and say you'll get back to them
  - If you have no idea how to answer or fix their issue, @mention someone who does
- Start your response with `Hey [insert name], ...` and make sure you're polite, not everyone you talk to is an engineer and as accepting of terse messages
  - If it's an email (if the source in #_customer_support is email), make sure you format your message as an email and only send a single message, not multiple
- Follow up!
    - [Papercups](#papercups) has an overview of Slack conversations that haven't been closed or answered yet. Occasionally have a look to see if you've missed anything
- Housekeeping. Once a customer issue/question has been addressed, close the conversation on [Papercups](#papercups) to make it easy to identify outstanding conversations.

### Prioritizing requests

1. Respond to and debug issues for _Priority_ customers (customers on Scale and Enterprise, either current or in our sales process, plus any high-paying Cloud customers)
2. Respond to and debug issues for _Subscriber_ customers (paying subscribers on Cloud, usually paying $1-500/month)
3. Respond to and debug issues for _Community_ users (all other free Open Source or free Cloud users)
4. Fix issues, create PRs

We tag customers in [Papercups](#papercups) according to these categories so you can easily filter them - you can view the tags in the right hand pane in the [Papercups](#papercups) app:

<img width="219" alt="Screenshot 2021-11-05 at 15 51 02" src="https://user-images.githubusercontent.com/70321811/140539495-565598d1-9245-429b-b860-1d0ea1906ca9.png" />

At the moment, Charles manually tags customers based on Stripe and HubSpot data once a week. The vast majority of customers fall into the Community category, so make sure you are giving Focus customers enough time if you see a query come in from them.

## Categorizing requests

It's really valuable for us to understand what types of requests we've had so we can priroitize our investments in certain areas and work out if we're making things better for our users (e.g. we use this as a measure of how easy it is to deploy PostHog).

When you initially respond to an issue add a "conversation tag" with the following categories:
* Performance
* Deployments
  * Scaling
  * Setup 
  * Maintenance
  * Hobbyist
  * Migrations
  * Supporting Managed Instances
* Instrumentation
* User Experience Confusion
* Data Integrity
* API
* Plugins
* Recordings
* Toolbar
* Feature-flags
* Not-a-bug
* Billing
* Feature request
* Other

If something falls into two categories, but predominantly one, just tag the one you think is most relevant. If the ticket covers multiple topics, tag with all the relevant tags.

### Escalating issues

You should always try to figure out the issues customers are having by yourself before escalating. This means gathering more information from the customer, reproducing the issue and ideally fixing the issue yourself by creating a PR. Only if you are completely swamped, you really don't have any knowledge about the area (most common with deployment questions) or you can't figure out what's going on should you escalate to secondary on call.

### How to help customers

- The reason it's so great to have engineers do support is that you can actually help customers solve their issues, rather than just escalating it. Hence you should aim to **go deep** and **actually solve people's issues**, whether that involves going deep on our functionality or spending half a day writing a PR to fix someone's issue
- On app.posthog.com, you can log in as a user to help debug their issues.
    - Do this by going to https://app.posthog.com/admin/posthog/user/, finding the relevant user and clicking 'log in as them'
    - To go back to your old user, just log out
    - If they have asked for help it is safe to assume they've given permission for you to log in as them.
    - You can also check to see sentry errors tied to the user via the `user.username` parameter for e.g. [for test@posthog.com](https://sentry.io/organizations/posthog2/issues/?project=1899813&query=is%3Aunresolved+user.username%3Atest%40posthog.com&statsPeriod=14d)
- When trying to debug an issue with a customer and it's not immediately obvious, it's usually much faster to do a Zoom session. You also tend to get other useful product feedback.
- When dealing with slowness, ask users to send a screenshot of their "System Status" page (under settings)
  - If they have a lot of volume and they're still on Postgres they should probably upgrade to Clickhouse
- Sometimes questions will have been asked earlier in the User's Slack so it's worth searching through that if you're not sure.

#### Debugging deployments

See the handbook page [Deployments Support](/handbook/engineering/deployments-support) and user-facing [Deployments Troubleshooting](/docs/self-host/deploy/troubleshooting) page.

#### Ingestion issues

If a user is sending events to PostHog and these are not getting ingested, despite them receiving a success response, try the following:

1. Check if the plugin server is alive and healthy (suggest a restart if not - this is safe)
2. Ask if they have Sentry set up and see any errors
3. If Sentry is not available, tell them to [connect to ClickHouse](/docs/self-host/deploy/troubleshooting#how-do-i-connect-to-clickhouse) and query for the columns `error_location` and `error` on the table `events_dead_letter_queue`

### Papercups

We use [Papercups](https://papercups.io/) as our internal platform to get an overview of our support requests. This ensures that we don't miss anyone, especially when their request is passed from one person to another at PostHog, or if they message us over the weekend.

Papercups is an open source live customer support app. It allows us to manage all our customer conversations in one place and reply through Slack, web, or via mobile app.

##### How to access Papercups
You can access the app via [app.papercups.io](https://app.papercups.io). If you don’t have access, ask Charles.

The first time you sign into Papercups, please make sure you include your name and [profile picture](https://posthog.com/handbook/company/team) so our users know who they are chatting to!

##### How to use Papercups

You’ll spend most of your time in the “Conversations” view, where you’ll find all customer conversations divided by _status_.

Goal of the Support Hero person on duty is to:

* keep the quantity of items in the _All_ section as small as possible (this is important so we can keep our focus on workable items only)

* make sure all the conversations get a response in a reasonable time (we don’t want to drop customer requests on the floor)

* provide actionable information as _Note_ for all the items you cannot close before the end of your shift (this is important as hand-off to the next person on-call)

Here's a q quick overview of Papercups' main features:

- _Main conversations view_: when you sign into Papercups, you can either [view all conversations](https://app.papercups.io/conversations/all), or just those [assigned to you](https://app.papercups.io/conversations/me). If you are the first person to respond to a query, you will be automatically assigned that conversation. Don't forget to close a conversation by ticking the box in the top right when you are done, so we know which queries have been resolved!
- _Slack integration (1)_: You can reply directly to PostHog app questions either in the Papercups app itself or in the private _customer support_ channel in the [PostHog Users Slack](http://posthog.com/slack) - both work.
- _Slack integration (2)_: In the PostHog Users Slack, messages posted in the _general_ and _feedback_ channels are also synced with the Papercups app. As above, this means you can reply to users in that Slack channel directly or in Papercups. Please try to reply in a Slack thread to any questions. This makes it easier for other users to navigate the channel without a lot of noise, and also prevents Papercups creating a new conversation for each response (as Papercups treats each thread in Slack as a conversation).
- _Email integration_: Any emails that come into hey@ get synced with Papercups and Slack, so you can reply on either of those platforms, or directly to the email. If you reply via email, please make sure you at least bcc hey@ so we know that someone has responded!
- _Notes_: You can leave a 'Private Note' in the right hand pane in Papercups if you need to make a note of something for future reference, e.g. a relevant GitHub issue.
- _Sharing_: If you click 'Share Conversation' at the bottom of the right hand pane in the Papercups app, you can link directly to a conversation. This is useful for sharing context with other team members.
- _Analytics_: 'Reporting' in the left hand panel shows some interesting analytics, such as how many queries we're receiving, average response time etc. We don't report on these yet as we're still figuring out the best way for us to do support.

Papercups is an open source company, so if there are any additional features you'd like to see then you can check out their [repo on GitHub](https://github.com/papercups-io/papercups/issues). They are building new features quickly, so it's worth checking in to see what new functionality is available from time to time.

##### How to deal with spam, marketing, partnership proposals, etc.

Like every other email address in this world, hey@ gets quite a bit of spam (and we reroute this to Papercups). When this happens, simply mark the conversation as closed.

For marketing, partnership proposals or anything like that, please double check with Charles or James before taking an action.


## Secondary on-call

Every team has a Secondary on-call rotation. Unlike support hero, you are still expected to do feature work. During the week that you are on-call, you are responsible for prioritizing and solving escalated issues, sentry errors and alerts that happen within your team. It also means helping out the support hero where necessary.

### Rotation

- [Core Experience Rotation](https://posthog.pagerduty.com/schedules#PXUZ9XL)
- [Core Analytics Rotation](https://posthog.pagerduty.com/schedules#P04FUTJ)
- [Platform Rotation](https://posthog.pagerduty.com/schedules#PM8YSH8)

PagerDuty doesn't let us have a rotation that automatically selects the person that is support hero to also be the secondary on-call for their team. This means we'll occasionally need to manually shuffle the schedule around.
