---
title: Integrating with Langfuse
availability:
    free: full
    selfServe: full
    enterprise: full
---

You can integrate with [Langfuse](https://langfuse.com/) and bring data into PostHog for analysis. Additionally, we offer a dashboard template to help you quickly get insights into your LLM product. 

## How to install the integration

1. First add [Langfuse Tracing](https://langfuse.com/docs/tracing) to your LLM app ([Quickstart](https://langfuse.com/docs/get-started)).
2. In your [Langfuse dashboard](https://cloud.langfuse.com/), click on **Settings** and scroll down to the **Integrations** section to find the PostHog integration.
3. Click **Configure** and paste in your PostHog host and project API key (you can find these in your [PostHog project settings](https://us.posthog.com/settings/project)).
4. Click **Enabled** and then **Save**.

![How to set up the Langfuse PostHog integration](https://res.cloudinary.com/dmukukwp6/video/upload/v1713785335/posthog.com/contents/languse.mp4)

[Langfuse events](https://langfuse.com/docs/analytics/posthog#events) will now begin exporting into PostHog on an hourly schedule. 

## Using the Langfuse dashboard template

Once you've installed the integration, [dashboard templates](/docs/product-analytics/dashboards) help you quickly set up relevant insights. You can see an example [Langfuse dashboard here](https://eu.posthog.com/shared/HPOaK5zNVkP062nQJQJoooXe61l15w).

To create your own dashboard from a template:

1. Go the [dashboard tab](https://us.posthog.com/dashboard) in PostHog.
2. Click the **New dashboard** button in the top right.
3. Select **LLM metrics – Langfuse** from the list of templates.

![How to create an LLM analytics dashboard using the template](https://res.cloudinary.com/dmukukwp6/video/upload/v1713967763/posthog.com/contents/docs/langfuse-dash.mp4)
