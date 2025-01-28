---
title: How to monitor LlamaIndex apps with Langfuse and PostHog
date: 2024-12-12
author:
  - lior-neu-ner
tags:
  - product analytics
  - LLM observability
---

[LlamaIndex](https://www.llamaindex.ai/) is a powerful framework for connecting LLMs with external data sources. By combining PostHog with [Langfuse](https://langfuse.com/), an open-source LLM observability platform, you can easily monitor your LLM app.

In this tutorial, we show you how to set this up by walking you through a simple [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) chat app.


## 1. Set up the sample app

For this tutorial, we create an app that answers questions about how to care for hedgehogs. The first step is to vectorize a [pdf on how to care for hedgehogs](https://www.pro-igel.de/downloads/merkblaetter_engl/wildtier_engl.pdf) using [Mistral's 8x22B model](https://docs.mistral.ai/getting-started/models/). 

To do this, install all the necessary dependencies for the app:

```python
pip install llama-index llama-index-llms-mistralai llama-index-embeddings-mistralai nest_asyncio langfuse --upgrade
```

Next, create a folder for the project as well as a python file called `app.py`:

```bash
mkdir hedgehog-app
cd hedgehog-app
touch app.py
```

Then, paste the following code into `app.py` to set up the app:

```python
# Set the API keys
import os
os.environ["MISTRAL_API_KEY"] = "<your_mistral_api_key>"
 
# Ensures that sync and async code can be used together without issues
import nest_asyncio
nest_asyncio.apply()
 
# Import and set up llama index
from llama_index.llms.mistralai import MistralAI
from llama_index.embeddings.mistralai import MistralAIEmbedding
from llama_index.core import Settings
 
# Define your LLM and embedding model
llm = MistralAI(model="open-mixtral-8x22b", temperature=0.1)
embed_model = MistralAIEmbedding(model_name="mistral-embed")
 
# Set the LLM and embedding model in the Settings object
Settings.llm = llm
Settings.embed_model = embed_model
```

You need to replace `<your_mistral_api_key>` with your actual key. To do this, you first need to [sign up for a Mistral account](https://console.mistral.ai/). Then [subscribe](https://console.mistral.ai/billing/) to a free trial or billing plan, after which you’ll be able to [generate an API key](https://console.mistral.ai/api-keys/).

## 2. Set up monitoring with Langfuse

Next, we set up Langfuse to trace our model generations. [Sign up](https://cloud.langfuse.com/auth/sign-up) for a free Langfuse account if you haven't already. Then create a new project and copy the [API keys](https://langfuse.com/faq/all/where-are-langfuse-api-keys).

Paste the keys into the top of `app.py` and instantiate Langfuse:

```python
# Set the API keys
import os
os.environ["MISTRAL_API_KEY"] = "<your_mistral_api_key>"
os.environ["LANGFUSE_SECRET_KEY"] = "sk-lf-..."
os.environ["LANGFUSE_PUBLIC_KEY"] = "pk-lf-..."
os.environ["LANGFUSE_HOST"] = "https://cloud.langfuse.com" 

# Import and instantiate Langfuse
from langfuse import Langfuse
langfuse = Langfuse()

# Rest of your existing code...
```

Then we register Langfuse's [`LlamaIndexCallbackHandler`](https://langfuse.com/docs/integrations/llama-index/get-started) in LlamaIndex's `Settings.callback_manager` just below the existing code where we import LlamaIndex.

```python

# Existing code...
from llama_index.llms.mistralai import MistralAI
from llama_index.embeddings.mistralai import MistralAIEmbedding
from llama_index.core import Settings

# Add these lines of code just below the above existing imports
from llama_index.core import Settings
from llama_index.core.callbacks import CallbackManager
from langfuse.llama_index import LlamaIndexCallbackHandler

langfuse_callback_handler = LlamaIndexCallbackHandler()
Settings.callback_manager = CallbackManager([langfuse_callback_handler])

# Rest of your existing code...
```

## 3. Build RAG on the hedgehog pdf

First download the [hedgehog care guide pdf](https://www.pro-igel.de/downloads/merkblaetter_engl/wildtier_engl.pdf) by running the following command in your project directory:

```bash
!wget 'https://www.pro-igel.de/downloads/merkblaetter_engl/wildtier_engl.pdf' -O './hedgehog.pdf'
```

Next, we load the pdf using the LlamaIndex [`SimpleDirectoryReader`](https://docs.llamaindex.ai/en/stable/module_guides/loading/simpledirectoryreader/), create vector embeddings using [`VectorStoreIndex`](https://docs.llamaindex.ai/en/stable/module_guides/indexing/vector_store_index/), and then convert it into a [queryable engine](https://docs.llamaindex.ai/en/stable/module_guides/deploying/query_engine/) that we can retrieve information from.

```python
# Add this to the bottom of app.py
from llama_index.core import SimpleDirectoryReader

hedgehog_docs = SimpleDirectoryReader(
    input_files=["./hedgehog.pdf"]
).load_data()

from llama_index.core import VectorStoreIndex

hedgehog_index = VectorStoreIndex.from_documents(hedgehog_docs)
hedgehog_query_engine = hedgehog_index.as_query_engine(similarity_top_k=5)
```

Finally, we can add code to query the engine and print the answer:

```python
# Add this to the bottom of app.py
response = hedgehog_query_engine.query("What is the best way to care for a hedgehog?")
print(response)
```

Test the app by running `python app.py`. You should see a response like the one below 🎉: 

```
The best way to care for a hedgehog is to provide it with a suitable 
habitat that includes nesting possibilities and a food supply located closely 
together within a small area. This can be achieved by creating a garden 
with a variety of natural structures such as hedges, bushes, groundcover 
plants, piles of leaves, and undergrowth.
```

All steps of the LLM chain are now tracked in Langfuse and you can view them in your [Langfuse dashboard](https://cloud.langfuse.com/).

<ProductScreenshot
    imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_12_06_at_1_29_21_PM_80ce94fb98.png" 
    imageDark = " https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_12_06_at_1_30_43_PM_fc294d1faf.png"
    classes="rounded"
    alt="Langfuse trace"
/>

## 4. Integrate Langfuse with PostHog

Next we [connect Langfuse to PostHog](/docs/ai-engineering/langfuse-posthog so that you can combine your LLM trace data with your PostHog analytics. This enables you to answer product questions such as:

- What are my LLM costs by customer, model, and in total?
- How many of my users are interacting with my LLM features?
- Does interacting with LLM features correlate with other metrics (retention, usage, revenue, etc.)?

Here's how to connect Langfuse to PostHog:

1. In your [Langfuse dashboard](https://cloud.langfuse.com/), click on your project settings and then on **Integrations**.
2. On the PostHog integration, click **Configure** and paste in your PostHog host and project API key (you can find these in your [PostHog project settings](https://us.posthog.com/settings/project)).
3. Click **Enabled** and then **Save**.

Langfuse will now begin sending your LLM analytics to PostHog once a day.

<ProductVideo
    videoLight= "https://res.cloudinary.com/dmukukwp6/video/upload/langfuse_light_fad1416026.mp4" 
    videoDark= "https://res.cloudinary.com/dmukukwp6/video/upload/langfuse_dark_c966222d86.mp4"
    alt="How to connect Langfuse to PostHog" 
    classes="rounded"
/>

## 5. Set up a PostHog dashboard

The last step is to set up a PostHog dashboard so that you can view your LLM insights. We've made this easy for you by creating a [dashboard template](/docs/product-analytics/dashboards). To create the dashboard template:

1. Go the [dashboard tab](https://us.posthog.com/dashboard) in PostHog.
2. Click the **New dashboard** button in the top right.
3. Select **LLM metrics – Langfuse** from the list of templates.

<ProductVideo
    videoLight = "https://res.cloudinary.com/dmukukwp6/video/upload/v1713967763/posthog.com/contents/docs/langfuse-dash.mp4" 
    videoDark = "https://res.cloudinary.com/dmukukwp6/video/upload/dasharod_dark_198e2a7f08.mp4"
    classes="rounded"
    alt="How to create Langfuse dashboard from a template in PostHog"
/>

## Further reading

- [How to compare AWS Bedrock prompts](/tutorials/compare-aws-bedrock-prompts)
- [How to set up LLM analytics for ChatGPT](/tutorials/chatgpt-analytics) 
- [How to compare AWS Bedrock foundational models](/tutorials/compare-aws-bedrock-foundational-models)

<NewsletterForm />
