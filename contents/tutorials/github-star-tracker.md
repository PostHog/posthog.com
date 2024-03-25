---
title: How to track GitHub stars in PostHog
date: 2024-03-25
author: ["ian-vanagas"]
tags:
  - events
---

GitHub stars are a popular way to track the success of open-sourced projects. Beyond seeing how many stars a repo has, GitHub does little to help you track or analyze these stars. 

To help you make better use of stars, this tutorial shows you how capture them using a combination of PostHog, GitHub webhooks, and [Val Town](https://val.town/), platform for writing, running, and scheduling JavaScript functions in your browser.

## Creating a webhook handler in Val Town

Our webhook handler will simply accept a `POST` request, get the data we want from that request, and capture a PostHog event with that data. Val Town is great for doing this because we can reuse the `capturePostHogEvent` we created earlier and you can fork, modify, and run [the code I already wrote here](https://www.val.town/v/ianvph/posthogGitHubStarCapture):

<iframe src="https://www.val.town/embed/ianvph/posthogGitHubStarCapture" height="630" frameBorder="0" allowFullScreen></iframe>

Once done, create a `phProjectAPIKey` environment variable in [your Val Town settings](https://www.val.town/settings/environment-variables) using your PostHog project API key which you can get in [your project settings](https://us.posthog.com/settings/project#variables). Finally, click the 3 dots next to the save and preview buttons then copy the HTTP endpoint link.

![Val created](https://res.cloudinary.com/dmukukwp6/image/upload/v1711401477/posthog.com/contents/images/tutorials/github-star-tracker/val.png)

## Setting up your webhook in GitHub

With the HTTP endpoint link from Val Town, go the settings page of the repository you want to track. Once there: 

1. Click "Webhooks" in the sidebar and then "Add webhook." 
2. Paste your HTTP endpoint link into the Payload URL and choose `application/json` as the content type.
3. Change events that trigger the webhook to selected events, then unselect "Pushes" and select "Stars."
4. Click "Add webhook."

![Webhook](https://res.cloudinary.com/dmukukwp6/image/upload/v1711401480/posthog.com/contents/images/tutorials/github-star-tracker/webhook.png)

> **Note:** You can also choose other GitHub events like deployments, forks, issues, pushes, pull requests, releases, and more.

Now, you can go to your repo, star it, and you should see an event with the relevant information captured into PostHog. 

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1711401484/posthog.com/contents/images/tutorials/github-star-tracker/event-light.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1711401485/posthog.com/contents/images/tutorials/github-star-tracker/event-dark.png" 
  alt="Event in PostHog" 
  classes="rounded"
/>

You can use this information to track and visualize the popularity of your repositories. You can also combine with [the Slack webhook](/docs/webhooks/slack) to send this information to Slack every time it happens.

## Further reading

- [How to capture events from Calendly webhooks](/tutorials/calendly-webhooks)
- [How to capture new RSS items in PostHog (releases, blogs, status)](/tutorials/rss-item-capture)
- [Using the PostHog API to capture events](/tutorials/api-capture-events)