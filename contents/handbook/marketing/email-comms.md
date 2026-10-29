---
title: Email comms
sidebar: Handbook
showTitle: true
---

Our email comms fall into broadcasts (one-off emails to specific lists, like a newsletter), campaigns (repeatable workflows that users move through), and API triggered emails (self-explanatory).

This page doesn't deal with [our build mode newsletter](https://newsletter.posthog.com/), which is sent through Substack and managed by the Content & Docs team. 

## We send email with PostHog Workflows

We've moved all our email marketing out of Customer.io and into [PostHog Workflows](/docs/workflows). Workflows reads the product data we already have in PostHog, so we no longer send data to a third party before we can use it. That gives us much more data to target and personalize emails with, and more ways to combine email with the rest of PostHog.

## Treat emails as code

Treat every email we send from PostHog like code. At least one peer must review it before it goes out.

For customer-facing comms, we recommend all comms are reviewed by a member of the <SmallTeam slug="developer-marketing" />. You can do this in two ways:

- **If you've already created the email,** ask for feedback in the #team-developer-marketing Slack channel.
- **If you'd like the team to create the email for you,** create a messaging issue in the [Marketing repo](https://github.com/PostHog/marketing/issues/new?template=messaging-template.md) or the [Requests for Comments Internal repo](https://github.com/PostHog/requests-for-comments-internal), and assign a member of the team. They'll figure it out from there. 

## Writing emails with AI

We care a lot about keeping AI slop out of our emails, so we recommend you don't use AI to write original email content.

When you use an agent to edit email copy, ask it to use the [`no-slop` skill](https://us.posthog.com/project/2/skills/no-slop?owner_id=3301) from the PostHog skills store. The skill removes or flags common AI writing patterns and applies the [PostHog style guide](/handbook/content/posthog-style-guide).

## Building emails in Workflows

We usually send emails as HTML blocks. Use the [PostHog HTML Email Maker](https://us.posthog.com/project/2/skills/posthog-html-email-maker?owner_id=3301) skill to style your HTML blocks so they match the rest of our emails. It works great if you just feed it the copy and image you want as raw text!

All new broadcasts and automations should use these defaults:

- **Messaging limit:** Enable the default messaging limit, which ensures each user gets no more than one email every two days. Apply this limit to all campaigns and broadcasts, unless the message is urgent.
- **UTM tracking:** Enable UTM tracking on all new broadcasts and automations, so we can measure what each email does. We have setup default UTM parameters in PostHog that should be applied automatically.

## Addressing emails

We prefer emails to come from a named person where possible, so users can reply with feedback. Only use generic addresses, such as hey@posthog.com, for very broad comms.

If you're sending the email and are happy to receive replies, feel free to set yourself as a sender. If you'd prefer not to, use the email of the <SmallTeam slug="developer-marketing" /> team lead.

## Targeting emails

Since we started moving to Workflows, Workflows has automatically paused some broadcasts for loud comms, such as SDK update notices. Those broadcasts targeted huge numbers of users, and many of the email addresses are no longer in use. If this keeps happening, it harms our [sending reputation](/docs/workflows/sending-reputation) and our emails end up in spam.


We solve this using the [Active PostHog users (last 90 days)](https://us.posthog.com/project/2/cohorts/671128) cohort. It includes everyone with an email address who showed an engagement signal in the last 90 days, such as logging in, sending data, making an MCP call, loading the toolbar, or creating a feature flag.

**Add this cohort to all broadcasts by default.**

## Before you send

- **Send yourself a test.** Check it on mobile and in dark mode, click every link, and make sure every Liquid variable has a fallback.
- **Get a review.** Again: we treat emails as code. 
- **Pick the right message category.** Every email needs the correct category so unsubscribes work. Never label a marketing email as transactional or `Service updates` to get around opt-outs.
- **Add alt text to every image.** Some email clients block images, so never put important information only in an image.

## After you send

- **Watch bounces and complaints.** Check them after every large send. If Workflows pauses a broadcast, find out why before you resume it. The cause is usually the audience.
- **Measure the result.** Add an [annotation](https://us.posthog.com/project/2/data-management/annotations) on the send date. About a week later, check the [engagement events](/docs/workflows/engagement-events) for opens, clicks, and unsubscribes, and use what you learn in the next email.

## Linking to the PostHog app or PostHog AI

To point users at a page in the PostHog app via email, use this format: `https://app.posthog.com/` and do not include the project path. 

For example:
`https://app.posthog.com/endpoints` instead of `https://app.posthog.com/project/2/endpoints`.

The `app.posthog.com` prefix works for both US and EU instances, and the project path resolves itself for the recipient.

To preload a prompt for PostHog AI, use this format:
`https://app.posthog.com/#panel=max:!Your%20question%20here`

For example:
`https://app.posthog.com/#panel=max:!What's%20my%20churn%20rate?`

## Email broadcasts
We regularly send three types of email broadcasts. 

1. Changelog, a product announcement email sent bi-weekly (every two weeks) via PostHog Workflows. 
2. PostHog for Startups, an email to users of our startup program. Sent monthly, via PostHog Workflows.
3. Launch emails, which are 'random acts of marketing', but fairly consistent with every product team shipping alpha, beta, and GA features each quarter.

Occasionally we send other ad-hoc email broadcasts for specific activities such as outages, reminders, announcements, or deprecations. 

### Changelog
The changelog email is part of [the new release process](/handbook/marketing/product-announcements) and is used for [product announcements](/handbook/marketing/product-announcements).

Every two weeks, we use PostHog Workflows to send a broadcast with the highlights from [the weekly changelog](/changelog). We pick three or four of the most impactful changes, and the top spot usually goes to a new beta feature. We share a test with the team before we send it to users. 

We categorize these emails as `Changelog updates` in Workflows, so users can manage their subscriptions. To keep deliverability high, we target users in the [active users cohort](#targeting-emails). 

### PostHog for Startups
Each month, we send an email to users in our PostHog for Startups program. We share a test with the team before we send it to users.

The email usually has three sections: new guides relevant to startups, new betas they can try, and a spotlight on a new org in the program. We end by asking for feedback.

We categorize these emails as `Actually useful marketing emails` in Workflows, so users can unsubscribe if they wish. This email usually comes directly from Joe. 

### Launch emails
Most product and feature launch emails come from the Product Marketer who sent them – but sometimes campaigns trigger from others, such as billing@posthog.com.

The exceptions and other solutions are:
- Sending emails from hey@posthog.com – this is what we usually do for BIG sends, because it would overwhelm the sender's inbox with 'out-of-office' auto-replies.
- Sending emails from beta-feedback@posthog.com – this is a Google group tied to the automation in <PrivateLink url="https://posthog.slack.com/archives/C011L071P8U">#posthog-feedback</PrivateLink> by a Slack bot. Any responses to this address get posted in that channel and anyone can reply to them using the info in there.
- Sending emails from a specific person, but setting the reply-to address as one of the above. This is not common, but it's there if you want to use it.

>We specifically do not want emails we think people will reply to going into hey@posthog.com because it is sporadically monitored at best, and hard to collaborate through. See [addressing emails](#addressing-emails) for more on who emails should come from.

If you're sending a launch email (alpha, beta, GA), add an annotation in <PrivateLink url="https://us.posthog.com/project/2/data-management/annotations">our PostHog project</PrivateLink> on the send date, so we can see its impact on our metrics later.

When we ask users to share feedback through email, it should either link to beta-feedback@posthog.com, the [support modal](http://app.posthog.com/home#supportModal), or to ourselves personally. Never hey@posthog.com.

This keeps the noise out of everyone else's way, while the right people still see useful feedback. If a user sends you feedback, share it with the relevant product team or in <PrivateLink url="https://posthog.slack.com/archives/C011L071P8U">#posthog-feedback</PrivateLink>.

>When adding yourself as a send-from address in Workflows, set the display name to '[your name] **from PostHog**'.

### Other broadcasts
Any ad-hoc customer email broadcasts are owned by the <SmallTeam slug="developer-marketing" />, and are usually sent via PostHog Workflows. These can include product updates, outage alerts, or other PostHog news.

These emails are usually categorized as `Service updates` in Workflows when they include important account or product information. They have a dedicated unsubscribe option in the footer, which makes it clear that we don't recommend users unsubscribe from them. 

Important service updates are the _only_ type of email we may send to unsubscribed users, and only when it's warranted.

> `Service updates` emails are often part of an [engineering incident](/handbook/engineering/operations/incidents). We handle comms for those too. 

Whenever we need to send an email broadcast like this, we begin by creating an issue using the [messaging template](https://github.com/PostHog/marketing/issues/new?template=messaging-template.md) in the marketing repo. If it involves personal information, we discuss it in <PrivateLink url="https://github.com/PostHog/company-internal">Company Internal</PrivateLink> instead. This lets us summarize information and get approval from teams while keeping our work open source. Issues are closed when an email is sent.

If you'd like to work with Marketing on an email activity, start by opening an issue with the [messaging template](https://github.com/PostHog/marketing/issues/new?template=messaging-template.md).

## Email campaigns
We run many email campaigns to help users get more out of PostHog. All of these campaigns now live in PostHog Workflows, not Customer.io. The most developed and documented of these are our four onboarding campaigns.  

### Onboarding emails
When we talk about onboarding emails, we usually mean the flow for PostHog Cloud sign-ups, but we run other onboarding flows too.

#### PostHog Cloud onboarding emails
The latest revision is [Onboarding 8](https://github.com/PostHog/requests-for-comments/issues/414). You can [read about old revisions on the blog](/blog/how-we-built-email-onboarding). 

The onboarding flow regularly changes as we test new ideas. Any changes to it are, as with all other email campaigns, documented in [the marketing repo](https://github.com/PostHog/marketing/issues?q=is%3Aissue+label%3Amessaging). 

We aim for all content in this flow to be relevant and helpful to users, without being salesy. All emails come directly from Joe and he triages replies daily, answering or redirecting as needed. The campaign starts when a user signs up for the first time. Its goal is for users to reach `billing product activated` within 7 days of opening any email in the flow. 

We tag all these email flows as `onboarding` in Workflows and categorize them as `Welcome emails` so that users can easily manage their preferences.

#### Self-hosted and open source onboarding emails
We sunset our paid self-hosted product a long time ago, but some users still try to use the legacy version. So we run a dedicated self-hosted onboarding campaign of three emails over six weeks. These emails come from the `hey@posthog.com` email address. 

The goal of this flow is to set expectations for what the self-hosted experience is like and to encourage users to move to PostHog Cloud. 

Our open source onboarding email is almost identical to the self-hosted onboarding flow, but leaves out the sunsetting of the self-hosted product. 

#### Waitlist, alpha, and beta onboarding emails
A user can join a waitlist or opt in to a feature preview through [the feature preview menu](https://app.posthog.com/settings/user-feature-previews), or through a waitlist form on a product page or [the roadmap](/roadmap). When they do, a `$feature_enrollment_update` event enters them into the Waitlist, Alpha, Beta onboarding flow in Workflows. The flow immediately segments on the `$feature_enrollment_stage` property:

- **Concept:** an immediate, simple confirmation that they're on the waitlist.
- **Alpha:** an immediate email warning of rough edges and asking for feedback.
- **Beta:** a 5-day wait, then an email asking for feedback on the beta.

When a feature moves from concept to alpha or beta, users who registered interest are automatically opted in to the new stage and a `user moved feature preview stage` event fires. We then email them to say the feature is enabled, and ask for feedback.

> **Launching a beta?** Let the Brand team know in <PrivateLink url="https://posthog.slack.com/archives/C083V7C6GKE">the team Slack</PrivateLink>. The team can then add your beta to the beta onboarding flow and plan any marketing announcements.


#### Onboarding - new hires
This is an internal email flow for new hires, which triggers whenever a new user signs up with a PostHog email address. We currently exclude most old-time hires from this flow, to avoid flooding their inboxes. 

This campaign runs for a new hire's first 30 days and sends them 7 emails with information to help them get set up at PostHog. 

There's no way to unsubscribe from these emails, but if you're triggering them with test accounts then let the Brand team know and they can exclude you from the campaign. 

### Other email campaigns
We also run several smaller campaigns. These include:

- **The replay recommender** is a campaign which encourages users who have ingested a large number of unwatched replays to watch some of the recordings. 
- **Teams upsells & cancellations** are two separate campaigns. The first triggers when a team invites their sixth and ninth team member, suggesting the Teams package. The second triggers when the package is disabled, comes from Zach, and requests feedback. 
- **G2 review Requester** is described in [Testimonials & G2](/handbook/marketing/testimonials)
- **Startup & YC updates** is a series of campaigns for the startups and YC programs. These notify users when they join the program, and when they use 50%, 75%, and 100% of their available credit. 

## API triggered emails
API triggered emails are owned by the <SmallTeam slug="billing" /> and live in PostHog Workflows. Tag them as `[TRANSACTIONAL]`, so they're easy to tell apart from marketing emails. They cover billing and security updates, such as an upcoming bill or a change to 2FA settings. We trigger them by API to keep them relevant and deliverable. 

Transactional emails use Liquid to personalize their content. All transactional emails should use Liquid in the main body to tell the user which project or organization the email is about, with suitable fallbacks. For example:

```
We turned the free allowance for {{ trigger.product_name | default: "a product" }} on {% if trigger.team_name %}{{ trigger.team_name }}{% else %}your account{% endif %} off and on again, giving you another month of free usage.
```
