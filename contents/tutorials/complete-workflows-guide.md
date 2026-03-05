---
title: 'A complete guide to Workflows: Emails, i18n, push notifications, webhooks, and more'
date: 2026-03-03
sidebar: Docs
showTitle: true
hideAnchor: true
author:
    - sara-miteva
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/b42_blog_repost_1aa6acf050.png
featuredImageType: full
category: Product
tags:
    - Workflows
    - Automation
    - Tutorials
seo:
    {
        metaTitle: 'A complete guide to Workflows: Emails, i18n, push notifications, webhooks, and more',
        metaDescription: 'Learn how B42 uses PostHog Workflows to automate customer journeys, trigger emails from product events, build templates, translate and personalize content, send push notifications, debug issues, and more.',
    }
---
[Workflows](/workflows) lets you trigger actions directly from your product data – things like sending emails, calling webhooks, or updating user properties when something happens in your app.

The guide below was written by [Alexander Hodes from B42](https://www.linkedin.com/in/alexander-hodes/), who shared how his team uses PostHog Workflows to run customer journey automations. It covers a few practical patterns they discovered along the way, including multilingual messaging, personalization, and push notifications via webhooks.

We liked how concrete and practical it is, so we’re reposting it here.

> Originally published on [DEV.to by Alexander Hodes](https://dev.to/b42/posthog-workflows-tips-and-tricks-51kp).

---
At the beginning of the year, PostHog released [Workflows](/docs/workflows) from beta. At B42, we had been using PostHog for analytics for over a year, but our customer journeys ran in a separate tool. Now after migrating to PostHog Workflow we have everything in one tool. After the Workflows release, we migrated everything in 2 days. Here's what we learned.

The cool thing is that workflows can be built independently of your code. Only the events need to be triggered. This makes it easy for non-developers to build workflows and customer journeys.

## Getting started
### Sending emails 

Email sending is very easy to [configure and set up](/docs/workflows/configure-channels#quest-item-create-a-channel). Four DNS entries need to be made, which are displayed directly in the setup window. Once the entries are verified, the email address is marked as verified and can be used for email sending.

![email setup screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr1_c1a2a6db00.webp)

### Building email templates

[Templates](/docs/workflows/library) are very helpful for sending emails. When creating templates, various components such as text, buttons, HTML elements, or images can be used.

With templates, the email structure can be built once, so that when integrating an email step, only the text needs to be changed.

![building templates with workflows](https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr2_3ee0cfb7c7.webp)

In the template itself, global settings such as colors, font, or alignment can also be configured.

![editing email templates with workflows](https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr3_72d043fc04.webp)

### Building workflows

Building workflows is very intuitive. First, a [trigger](/docs/workflows/workflow-builder#triggers) for the workflow is selected. This can be a specific event, a manual trigger, a webhook, tracking pixel, or schedule.

Further steps and actions can be added, like emails, webhooks or third party integrations like Slack.

![building a workflow from a trigger](https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr4_0c7b0dd08e.webp)

There's always an exit. You can also define earlier exists if certain conditions match.

## Small hacks

During the implementation of workflows, we encountered some smaller challenges, such as messaging in different languages or sending push notifications.

### i18n

Currently, it's not yet directly possible to translate texts. However, [conditional branches](/docs/workflows/workflow-builder#audience-splits) can be used to check variables and customize the further course of the flow depending on conditions.

We check the user's language with conditional branches, which we store in the person. This allows us to split the flow based on language and ensure that the user receives emails or push notifications in the correct language.

![adding conditional branches with workflows](https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr5_bf612110fe.webp)

As a prerequisite, you need to sync the language code of the user with PostHog. The default value can be used for a fallback language like English.

### Sending push notifications

Sending push notifications is currently not yet possible. As a workaround, webhooks can be used. You can integrate an endpoint in your application that receives a POST request with a specific body, for example:

```json
{
    "title": "Hello Max",
    "message": "Welcome to our application",
    "deeplink": "http://localhost:3000/welcome"
}
```

If Firebase Cloud Messaging is already integrated in your backend and the users' message tokens are stored, you can directly send the push notification to the user. Here’s an example Express handler that validates a secret and forwards the payload to your push service:

```ts
import { Response, Request } from 'express'

const secret = 'random-secret-string'

export async function POST(req: Request, res: Response) {
    // Validate secret that not everybody can send push notifications
    if (req.headers['x-webhook-secret'] !== secret) {
        return res.status(401).json({
            error: 'Invalid webhook secret',
        })
    }

    const userId = req.body.userId
    const message = req.body.message
    const title = req.body.title
    const deeplink = req.body.deeplink

    if (!userId || !message || !title) {
        return res.status(400).json({
            error: 'Missing userId, message, or title',
        })
    }

    // send push notification
    await sendPushNotification({ userId, title, message, deeplink })

    return res.status(200).json({ success: true })
}
```
#### Variables for content personalization

Variables from the event or user can also be used in the JSON body to personalize the content.

<p className="text-center">
    <img
        src="https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr6_aabec89aef.webp"
        alt="variables for content personalization"
    />
</p>

#### Using custom header fields

To prevent your webhook from being misused, you can also send custom header fields, such as `x-webhook-secret=random-value`. If the value doesn't match the defined secret, you can return a 401 Unauthorized error.

#### Outlook

It probably won't be long before push notifications are directly supported in PostHog, making the workaround obsolete. This is already mentioned in the roadmap and documentation.

However, the webhook can continue to be used to execute internal processing or processes.

### Using variables in emails or webhooks

Like push notifications, emails can be personalized with template syntax.

Typical use cases include the email address, which can be retrieved with `{{ person.properties.email }}`. This accesses the person property email.

<p className="text-center">
    <img
        src="https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr7_366d85f87a.webp"
        alt="adding variables to emails"
    />
</p>

The same can be done for other variables like the name `{{person.properties.firstname}}`. If-conditions can also be used or workflow variables can be accessed `{{ variables.NAME }}`.

### Automations

In addition to messaging workflows, [automation workflows](/docs/workflows/workflow-builder#posthog-actions) exist. These can be used to set user properties once an event has been executed. A typical use case is when the user has completed onboarding.

![automating workflows screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr8_f2a7b9719f.webp)

### Using delays

Another exciting feature is [delays](/docs/workflows/workflow-builder#delays), which allow waiting for a defined period after an event. For example, after an event like user_created, a welcome email can be sent to the user after five minutes.

![delays with workflows](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/b42_workflows_scr9_a44289298d.webp)

### Webhook logs

For webhooks, it's recommended to activate logs. This logs the requests as well as the status codes of the responses. This makes debugging and error analysis much easier.

![webhook logs](https://res.cloudinary.com/dmukukwp6/image/upload/b42_workflows_scr10_2441a55027.webp)

## Common issues & solutions

There are some common issues which we experienced during implementation.

**Issue**: Workflow not triggering > **Solution**: Check event name matches exactly (case-sensitive)

**Issue**: Variables not rendering > **Solution**: Ensure property exists before workflow trigger

**Issue**: Email not sending > **Solution**: Check if the sender is selected correctly

**Issue**: Webhook request without body > **Solution**: Check if `Content-Type` header is set correctly, e.g. `application/json`
