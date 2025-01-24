---
title: LLM traces and generations (beta)
availability:
  free: full
  selfServe: full
  enterprise: full
---

Once you install PostHog's LLM observabilty SDK, it autocaptures LLM generations and traces. You can then view these in PostHog.

## Generations

Generations are an event that capture an LLM request. The [generations tab](https://us.posthog.com/llm-observability/generations) lists them along with the properties autocaptured by the PostHog like the person, model, total cost, token usage, and more.

When you expand a generation, it includes the properties and metadata that every event has along with a conversation history with the role (system, user, assistant) as well as input and output content.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_14_47_43_2x_9223a3b730.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_14_47_17_2x_0cc9075dd5.png"
  alt="LLM generations"
  classes="rounded"
/>

## Traces

Traces are a collection of generations that capture a full interaction between a user and an LLM. The [traces tab](https://us.posthog.com/llm-observability/traces) lists them along with the properties autocaptured by the PostHog like the person, total cost, total latency, and more.

Clicking on a trace opens a timeline of the interaction with all the generation events enabling you to see the entire conversation, details about the trace, and the individual generation events.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_14_56_05_2x_5704304722.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_23_at_14_56_22_2x_705d03500f.png"
  alt="LLM generations"
  classes="rounded"
/>