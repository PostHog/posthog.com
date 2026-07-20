---
title: Support hero
sidebar: Handbook
showTitle: true
---

Every week, one person in each engineering team is designated the Support Hero. If this is you this week, congratulations!

As Support Hero, your job is to investigate and resolve issues reported by customers. A single case of suspicious data or a show-stopping bug can really undermine one's confidence in a data product, so it's important that we get to the bottom of all issues.

One of the many awesome things about PostHog is that support is dealt with by engineers and they ship fixes and improvements in real-time when you contact them. It is impossible to overstate how valuable it is for customers when they ask a question and get a shipped feature within a day.

You'll see some teams using a term of endearment for Support Hero, examples being "Infra Hero" or… "Luigi". Don't ask – we don't know.

Our support engineers, in the <SmallTeam slug="support" />, triage tickets for [most teams](/handbook/support/customer-support#what-do-support-engineers-do). They will resolve tickets if possible, and escalate to the engineering team responsible if they need further help.

## When is my turn?

Most engineering teams run an incident.io schedule, check out the [escalation schedules](/handbook/engineering/operations/on-call-rotation#escalation-schedules).

The schedules consist of contiguous blocks, but that definitely doesn't mean working 24/7 – you should just work your normal hours.

## What if I'm scheduled for a week when I won't be available?

Swap with a teammate in advance! Find a volunteer by asking in Slack, then use incident.io schedule overrides. You can trade whole weeks, but also just specific days. Remember not to alter the rotation's core order, as that's an easy way to accidentally shift the schedule for everyone.

## What do I do as Support Hero?

Each engineering team has its own list of tickets in PostHog support. Your view will be bookmarked in your `#support-<team-name>` channel for easy access.

Your job is simple: ship features and fixes, resolve ticket after ticket from your team's list, and respond to open-source PRs assigned to your team.

There are three sources of tickets:

1. In-app bug reports/feedback/support tickets sent from the [Support panel](https://us.posthog.com/home#panel=support).
1. Slack or MS Teams threads that have been raised via @SupportHog in [customer support channels](/handbook/growth/sales/slack-channels).
1. Reports in the `#papercuts` Slack channel that relate to your team's area.

### Answering tickets

Before you start a rotation, make sure your team is [set up correctly for support](#setting-your-team-up-for-support) — see the section below.

It's also worth getting familiar with how to work in PostHog Support: [where your tickets live](/handbook/support/posthog-support#where-do-the-tickets-live), [how to prioritize tickets](/handbook/support/posthog-support#prioritizing-tickets), what each [ticket status](/handbook/support/posthog-support#ticket-statuses) means, how to [work on a ticket](/handbook/support/posthog-support#working-on-a-ticket), when to use [private notes](/handbook/support/posthog-support#private-notes), and how to [transfer a ticket to another team](/handbook/support/posthog-support#transferring-a-ticket-to-another-team).

If you're ever unsure how to handle a particular ticket, need advice on wording, or anything's unclear, ping `#team-support` — we're always happy to help!

#### End of your rotation

By the end of your rotation you should make sure that every ticket **in your view** tagged `top_20`, `churn_risk`, or `plan_enterprise` is either **resolved or handed over to the next support hero** — as a minimum.

When handing over, assign any tickets you want the next hero to pick up to **your team's role** in PostHog Support. Anything left assigned to you personally won't show up in your team's view, so it won't reach them.


### Shipping features

Some tickets ask for new features. If the feature is useful for users matching [our ICP](/handbook/who-we-build-for), then decide whether to just build it. Otherwise, create a feature request issue in GitHub or +1 on an existing one – you can then send a link to the user, giving them a way of tracking progress. Also make sure to let the <SmallTeam slug="customer-success" /> know, since they will track feature requests for paying customers.

Sometimes a feature already exists, but a user doesn't know about it or how to use it. In this case, you should either send them a link to the relevant docs page or [update the docs](/handbook/engineering/writing-docs) to make it clearer.

### Fixing bugs

Others tickets report bugs or suspected bugs. Get to the bottom of each one - you never know what you'll find. If the issue decidedly affects only that one user under one-in-a-million circumstances, it might not be worth fixing. But if it's far-reaching, a proper fix is in order. And then there are "bugs" which turn out to be pure cases of confusing UX. Try to improve these too.

If not much is happening, feel free to do feature work – but in the case of a backlog in PostHog Support, drop other things and roll up your sleeves. When you're Support Hero, supporting users comes first.

It might be an intense week, but you're also going to solve so many real problems, and that feels great.

### Papercuts

Check the `#papercuts` Slack channel during your rotation and pick up any reports that relate to your team's area. For each one, pick one of the following:

- **Reply** to the reporter acknowledging the papercut, then either get a fix shipped or open a GitHub issue to track it if it needs more scoping. How you get the fix out is up to you – prompting PostHog Code is often the fastest path, but feel free to fix it however you like.
- **React with ❌** to reject the papercut (for example, if the behavior is intentional). A brief reply explaining why is appreciated.
- **React with ✅** once you've shipped a fix or improvement.

Papercuts are also routed to the Signals inbox, so before you start work, check whether an auto-generated PR is already waiting – it may save you most of the effort.

### Responding to external PRs

When capacity allows, the support hero serves as the first point of contact for external (open-source) PRs that affect your team's product. While we want to be good open-source citizens, **customer support always takes priority** — if you're dealing with a heavy support load, it's acceptable for PR reviews to be delayed or handled more briefly.

#### How external PRs are assigned

External PRs typically reach your team through one of two methods:

- **CODEOWNERS automation**: If your team has CODEOWNERS configured, PRs modifying your team's files will automatically be assigned to your team
- **Manual assignment**: For teams without CODEOWNERS set up, external PRs may be manually assigned to your team handle by other engineers who spot them

#### Best practices for handling external PRs

These are guidelines to aim for when you have bandwidth after handling customer support. Adapt them based on your workload:

##### Initial response (when possible)

- Acknowledge the PR with a thank you comment when you can
- Quick check: Are there obvious blockers like failed tests or merge conflicts? If so, politely ask the contributor to address them first
- If your support queue is overwhelming, it's okay to delay this or keep it brief

##### Review approach

- Be welcoming and constructive - contributors are volunteering their time
- Provide actionable feedback when you have time for a thorough review
- Consider the effort/reward tradeoff - some PRs may need more work than they're worth
- It's better to politely decline quickly than to let a PR sit without feedback for weeks

##### Communication tips

- Set realistic expectations based on your current workload
- Remember that external contributors can't ping us directly like teammates can
- If you know you won't get to a PR this week, a quick "Thanks for the contribution! Our team is currently focused on customer issues but we'll review this when we can" is better than silence

##### Common blockers to address upfront (when doing a full review)

- Ask contributors to respond to Greptile feedback before your review
- Require merge conflicts to be resolved before reviewing
- Ensure tests are passing (or understand why they're not)
- Check that the PR follows our existing code patterns and conventions

##### When to escalate or defer

- If the PR touches critical infrastructure or security-sensitive code
- If you're unsure about the product implications
- If your support load is too high to give it proper attention
- If a PR requires extensive back-and-forth that you don't have bandwidth for

##### Consider rewarding with merch

- A PR doesn't need to be merged to be reward-able
- Someone took time to care about PostHog and merch is a great way to say thank you

#### Managing expectations

The reality is that support hero weeks vary significantly in intensity across teams and time periods. Some weeks you might have capacity to thoroughly review several PRs; other weeks, you might barely have time to acknowledge them. That's okay. The goal is to engage with external contributions in good faith within your available bandwidth, not to maintain a perfect response rate at the expense of customer support or your well-being.

If you find yourself overwhelmed, remember:

- Customer issues come first
- A brief acknowledgment is better than nothing
- It's acceptable to hand off complex PRs to the next support hero
- Teams aren't expected to handle unlimited PRs

The key principle: We want to be responsive to our open-source community when we can, but not at the cost of our primary support responsibilities or team sustainability.

## What about SDK support?

The SDK Support Hero rotation is owned by the <SmallTeam slug="client-libraries" />. See the dedicated [SDK support rotation](/handbook/engineering/sdks/support-rotation) page for details on how the rotation works, including how to prioritize time and handle mobile SDK issues.


## Tips for being a great Support Hero

### Don't ask users to do work that you can do!

If folks are asking us for help, then we know the product already didn't meet their needs. Asking them to do leg-work that we could do is adding insult to injury.

For example don't ask them what version of posthog-js they're using or what their posthog config is when you can find out for yourself. Or visit their website and check the console instead of asking them if they had any errors.

If you do then have to ask them to do something, make sure you explain why you need it and what you're going to do with it.

### How do I communicate?

There are two valid modes (which overlap!)

1. excited, like a labrador puppy, to discover a new way to improve the product
2. clinical and clear

#### Excited like a labrador puppy

The first is great for when you're talking to someone with feedback or who doesn't seem frustrated. It's important because every single support interaction is an opportunity to ship a fix or an improvement. And the excitement is how we show enough interest to properly hear the feedback.

example: "You can't do that right now, but it sounds super useful. Out of interest what does it unlock for you?"

#### Clinical and clear

The second is great for when the issue is tricky or the customer seems frustrated. Sometimes this goes as far as communicating in bullet points instead of paragraphs. When something isn't working the person might (quite rightly) have low tolerance for a support interaction.

example: "Ah, I see what you mean, that's not ideal! Sorry. I'll dig in to that now and let you know what I find by the end of tomorrow."

#### General tone

As an engineer, when answering a question, your first instinct is to give them an answer as quickly as possible. That means we often forget pleasantries, or will ignore a question until we've found the answer. So, the following guidelines:

-   Always respond to a question within a reasonable timeframe during your working day. Our SLAs are [explained here](/handbook/support/customer-support#response-targets), but you should always try to respond to tickets quickly.
  - If you're ready to look into the issue, and you think it might take a while/require a fix, just mention that and say you'll get back to them
  - If you have no idea how to answer or fix their issue, @mention someone in a public Slack channel who does
  - They need to know we've understood them. And have a clear picture of what their onward journey is. Are they waiting for us? How Long? Or - are we waiting for them? what for?
-   Start your response with `Hey [insert name], ...` and make sure you're polite, not everyone you talk to is an engineer and as accepting of terse messages
  - If they expressed frustration, acknowledging it ("Sorry for the confusion", "Apologies for the trouble" etc.) can earn goodwill quickly.
  - Be sure to thank them for reporting problems, giving feedback, creating issues, PRs, etc.
  - Even if you're using the support portal think about whether they'll see the message in Slack or email. A Slack message that reads like an email seems weirdly formal.
-   Follow up!
-   Housekeeping. Once a customer issue/question has been addressed, resolve the ticket in PostHog Support to make it easy to identify outstanding conversations.
-   If a user has been particularly helpful, such as raising a security or bug report, feel free to offer a small credit for the merch store.

If you have any questions about how or when to communicate with users, you can always ask in #team-support for help!

## Setting your team up for support

If you're a support hero, there are a few things to make sure are in place so that support works as intended for your team:

- Your team name and team membership are correct on the [teams page](/teams).
- The [feature ownership page](/handbook/engineering/feature-ownership) is up to date with the features and products your team owns.
- You have a Slack channel named `#team-<team-name>`, in exactly the same format as your team name on the teams page.
- You have a Slack channel named `#support-<team-name>`, in exactly the same format as your team name on the teams page.
- The PostHog Slack app is in your `#support-<team-name>` channel (invite it with `/invite @PostHog`) — without it, ticket notifications can't be posted there.
- Support hero notifications are configured. Call `/support-hero <incident_io_schedule_id> [optional_hero_nickname]` in your team's Slack channel to activate or reconfigure at any time. Call `/support-hero` with no arguments to find out who's currently handling tickets.

A couple more things to make sure of (these may happen magically in future):

- Your team shows up with the correct name and membership in [roles settings](https://us.posthog.com/project/2/settings/organization-roles).
- You have a view for your team in [PostHog Support](https://us.posthog.com/project/2/support/tickets), and that view is bookmarked in your `#support-<team-name>` channel.