---
title: Integrating with Keywords AI
availability:
    free: full
    selfServe: full
    enterprise: full
---

> This integration is currently an [opt-in public beta](/docs/getting-started/enable-betas). This means it's not yet a perfect experience, but we'd love to know your thoughts. Please [share your feedback](http://us.posthog.com/home#supportModal) and [follow our roadmap](https://github.com/PostHog/posthog/issues/18547).

You can integrate with [Keywords AI](https://www.keywordsai.co) and bring data into PostHog for analysis. Additionally, we offer a dashboard template to help you quickly get insights into your LLM product. 

## How to install the integration

1. Sign up for [Keywords AI](https://keywordsai.co/) and add it to your app.
2. Copy PostHog host and project API key from your [PostHog project settings](https://us.posthog.com/settings/project).
3. In your Keywords AI requests in your code, add the following parameters:

```
{
// other parameters
"posthog_integration": {
        "posthog_api_key": "<ph_project_api_key>",
        "posthog_base_url": "<ph_client_api_host>"
    }
}
```

Keywords AI will now send events to PostHog under the name `keywords_ai_api_logging`. They send events as soon as they're available.

## Using the Keywords AI dashboard template

Once you've installed the integration, our Keywords AI [dashboard template](/docs/product-analytics/dashboards) helps you quickly set up relevant insights. You can see an [example dashboard here](https://us.posthog.com/shared/p1AymhS7EEm97nZOGA8nWmsdshhzYA).

To create your own dashboard from a template:

1. Go the [dashboard tab](https://us.posthog.com/dashboard) in PostHog.
2. Click the **New dashboard** button in the top right.
3. Select **LLM metrics – Keywords AI** from the list of templates.

<ProductVideo
    videoLight= "https://res.cloudinary.com/dmukukwp6/video/upload/v1723210093/posthog.com/contents/keywords-ai-light.mp4" 
    videoDark= "https://res.cloudinary.com/dmukukwp6/video/upload/v1723210093/posthog.com/contents/keywords-dark.mp4"
    alt="How to create keywords AI dashboard from a template" 
    classes="rounded"
/>
