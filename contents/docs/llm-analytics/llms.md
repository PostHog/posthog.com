---
title: LLM analytics (beta)
availability:
    free: full
    selfServe: full
    enterprise: full
---

We've teamed up with various LLM platforms to track metrics for LLM apps. This makes it easy to answer questions like:

- What are my LLM costs by customer, model, and in total?
- How many of my users are interacting with my LLM features?
- Are there generation latency spikes?
- Does interacting with LLM features correlate with other metrics (retention, usage, revenue, etc.)?

Currently, we support integrations for the following platforms:

- [Langfuse](https://langfuse.com)
- [Helicone](https://www.helicone.ai/)

## How to install

### Langfuse

1. First add [Langfuse Tracing](https://langfuse.com/docs/tracing) to your LLM app ([Quickstart](https://langfuse.com/docs/get-started)).
2. In your [Langfuse dashboard](https://cloud.langfuse.com/), click on **Settings** and scroll down to the **Integrations** section to find the PostHog integration.
3. Click **Configure** and paste in your PostHog host and project API key (you can find these in your [PostHog project settings](https://us.posthog.com/settings/project)).
4. Click **Enabled** and then **Save**.

![How to set up the Langfuse PostHog integration](https://res.cloudinary.com/dmukukwp6/video/upload/v1713785335/posthog.com/contents/languse.mp4)

Langfuse will now begin exporting your data into PostHog once a day. 

### Helicone

1. Sign up for [Helicone](https://www.helicone.ai/) and add it to your app.
2. Similar to how you set `Helicone-Auth` [header](https://docs.helicone.ai/getting-started/integration-method/openai-proxy#openai-v1) when configuring your LLM client, add two new headers `Helicone-Posthog-Key` and `Helicone-Posthog-Host` with your PostHog host and API key (you can find these in your [PostHog project settings](https://us.posthog.com/settings/project)):

<MultiLanguage>

```python
client = OpenAI(
  api_key="your-api-key-here",  # Replace with your OpenAI API key
  base_url="https://oai.hconeai.com/v1",  # Set the API endpoint
  default_headers= { 
    "Helicone-Auth": f"Bearer {HELICONE_API_KEY}",
    "Helicone-Posthog-Key": "<ph_project_api_key>",
    "Helicone-Posthog-Host": "<ph_client_api_host>",
  }
)
```

```node
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: "https://oai.hconeai.com/v1",
    baseOptions: {
      headers: {
          "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
          "Helicone-Posthog-Key": "<ph_project_api_key>",
          "Helicone-Posthog-Host": "<ph_client_api_host>",
      },
    },
});

const openai = new OpenAIApi(configuration);
```

```bash
 curl --request POST \
     --url https://oai.hconeai.com/v1/chat/completions \
     --header 'Authorization: Bearer <<YOUR_OPENAI_API_KEY>> \
     --header 'Content-Type: application/json' \
     --header 'Helicone-Posthog-Key: Bearer <ph_project_api_key> \
     --header 'Helicone-Posthog-Host: Bearer <ph_client_api_host> \
     --header 'Helicone-Auth: Bearer <<YOUR_HELICONE_API_KEY>> \
     --data '{
         "model": "gpt-3.5-turbo",
         "messages": [
             {
                 "role": "system",
                 "content": "Say Hello!"
             }
         ],
         "temperature": 1,
         "max_tokens": 10
 }'
```

</MultiLanguage>

Helicone events will now be exported into PostHog as soon as they're available.

## Dashboard templates

Once you've installed an integration, [dashboard templates](/docs/product-analytics/dashboards) help you quickly set up relevant insights. Here examples for [Langfuse](https://eu.posthog.com/shared/HPOaK5zNVkP062nQJQJoooXe61l15w) and [Helicone](https://us.posthog.com/shared/NueyVUHeGCGnrQaM-eRO09HzHFwcCw).

To create your own dashboard from a template:

1. Go the [dashboard tab](https://us.posthog.com/dashboard) in PostHog.
2. Click the **New dashboard** button in the top right.
3. Select **LLM metrics – [name of the integration you installed]** from the list of templates.

![How to create an LLM analytics dashboard using the template](https://res.cloudinary.com/dmukukwp6/video/upload/v1713967763/posthog.com/contents/docs/langfuse-dash.mp4)
