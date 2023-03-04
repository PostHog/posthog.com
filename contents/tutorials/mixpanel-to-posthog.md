---
title: How to migrate from Mixpanel to PostHog
date: 2023-03-03
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-1.png
topics: ["configuration", "events"]
---

Mixpanel is a product analytics tool, if you’re looking to migrate to PostHog, this is the tutorial for you.

You need both a Mixpanel account with data and a PostHog instance. We will use [a tool](https://github.com/stablecog/mixpanel-to-posthog), built by the team at [Stablecog](https://stablecog.com/), to migrate the data and users over.

## Gathering details

In Mixpanel, go to the project with the data you want to migrate. 

1. Create a service account. Go to "Organization Settings," click the "Service Accounts" tab, click the "Add Service Account" button, enter a name, then click "Create."
2. Hold on to the **username** and **secret** for now. 
3. You also need your **Project ID** which you can get from your "Project Settings."

![Mixpanel](../images/tutorials/mixpanel-to-posthog/mixpanel.png)

Next, get the details for PostHog. 

1. Get your **project API key** from the getting started flow or your project settings. 
2. Create a **personal API key**. Go to your account settings (click the photo in the top right corner, then the gear next to your email), click the "Create personal API key" button, add a name, and press save.
3. Finally, note your **instance address** (either `https://app.posthog.com` or `https://eu.posthog.com` or a custom domain)

With all this, we are ready to set up the migration tool.

## Setting up the script

Go to the [Mixpanel to Posthog Data Migrator repository](https://github.com/stablecog/mixpanel-to-posthog) and [clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository). Once done, go to the newly created `mixpanel-to-posthog` folder, create a `.env` file, and add the details you collected.

```
MIXPANEL_USERNAME=ian.a2b789.mp-service-account
MIXPANEL_PASSWORD=fCPFrpZYdzB9nlZ9kqabZcXuxSLKhjld
MIXPANEL_PROJECT_ID=2880604
POSTHOG_PROJECT_KEY=<ph_project_api_key>
POSTHOG_API_KEY=phx_lz19ZGZWrVcwZol6qLmIvHBBHzc9lQbvN8b3U2zVufZ
POSTHOG_ENDPOINT=<ph_instance_address>
```

Next, in the terminal, make sure you have [installed Go](https://go.dev/doc/install), then run the tool in the folder location.

```bash
go run .
```

This triggers some prompts about Mixpanel’s API URL, dates (to avoid rate limits and system crashes), and any data you missed. This should look like this:

![Script](../images/tutorials/mixpanel-to-posthog/script.png)

Once successful, you can find your new data in your PostHog instance.

![PostHog](../images/tutorials/mixpanel-to-posthog/posthog.png)

## Further reading

- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [Calculating average session duration, time on site, and other session-based metrics](/tutorials/session-metrics)
- [Get feedback and book user interviews with site apps](/tutorials/feedback-interviews-site-apps)