---
title: "Devtools advice in the age of robots"
date: 2025-05-23
author:
  - danilo-campos
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/f_webp,h_2040,w_3627,c_fill,g_auto,q_auto/math_meme_8b0013533e
featuredImageType: full
tags:
    - Engineering
    - LLM
---

The way software gets made is changing. Developers are using LLM tools to build quick-and-dirty prototypes to test assumptions and validate demand.

So developer tools will need to evolve.

For example, here’s AI luminary Andrej Karpathy's [call to action](https://x.com/karpathy/status/1914489538006933770) on docs:

> docs also have to change in the content. Eg instead of instructing a person to go to some page and do this or that, they could show curl commands to run - actions that  are a lot easier for an LLM to carry out.

Here's a bit of what we've learned about this. You can totally steal it to use yourself, we don't mind.

## Commands the agent can run

As Karpathy notes, `curl` commands are a great start: you can ship them this afternoon, and you can be clever by auto-populating their values with a project's details.

![Airtable's documentation](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_05_22_at_1_20_44_PM_22007ac69e.png)

[Airtable](https://airtable.com/developers/web/api/introduction) is perhaps the canonical example of rich, pre-populated commands folded into documentation. Each database gets a fully-customized reference full of examples for every CRUD operation.

In the AI age, this approach could be combined with plaintext documentation the developer can copy and paste into an agent chat. The agent would then have everything it needed to pull real data from a service. With this data added to the context, the agent can write much more effective code.

But you can take it further: beyond existing CLI tools, you can [write your own](/blog/envoy-wizard-llm-agent) that specifically target agent sessions and the developers who run them. [Steal our wizard code](https://github.com/PostHog/wizard) and get started.

## Constrain the path

Human or robot, there are just so many ways to write bad code.

Our job in serving developers is to prevent this. Bad code is a landmine hidden on a developer’s path to success, waiting to detonate. Agents can introduce security vulnerabilities, ship private API keys in client code, or just make a subtly bad call that leads to data loss and instability.

No developer can know everything, so the possibility of these details being missed is ever-present, even if you’re serving a more experienced audience.

The fix is constraining what’s possible.

One way to do this is the same way we did it before the age of robots:

**Starter code**.

A great starter project packages a bunch of design decisions *on behalf of the developer*, robot or not. Which things happen on the client, which things happen on the server, which things are secret, how secrets are managed… it's just better if the developer-agent team doesn't have to reinvent the wheel for this stuff.

We have conventions for a reason. We have *best practices* because there are worse practices.

On the stable ground of a thoughtfully designed project, developers and their agents can work on the final 20% of a project that *is* fully unique to their plans.

## Build an interface

At its best, automation relieves tedium.

When they’re set up to succeed, agents can relieve *loads* of tedium for developers, doing repetitive tasks and boring setup in a flash.

The most exotic approach we’ll nod to here is the [MCP](/docs/model-context-protocol) server. This is *new*, but beneath the surface, it’s not *that new*.

An MCP server creates an interface between your existing technology and a coding agent. It provides these surfaces:

- [Tools](https://modelcontextprotocol.io/docs/concepts/tools): buttons and levers the agent can operate for the user. They might enable an agent to create, update or delete resources in a developer’s project.
- [Resources](https://modelcontextprotocol.io/docs/concepts/resources): data the agent can use to be more effective. Maybe a dump of a database schema, or authentication keys for a project.
- [Prompts](https://modelcontextprotocol.io/docs/concepts/prompts): you can provide consistent yet customized guidance to an agent, and its developer, via MCP.

So that’s the new part.

But under the hood, you’re building an interface to your existing services. If you’ve built an API or delivered client code, you already know how to do this.

Again, if you want some code to steal or learn from, you can [grab ours](https://github.com/PostHog/posthog/tree/master/services/mcp). It runs on Cloudflare Workers using [Durable Objects](https://developers.cloudflare.com/durable-objects/), so you can adapt and deploy your own version easily.

We’ll talk some more about [MCP next time](/blog/machine-copy-paste-mcp-intro). But for now: play around with these ideas a bit. What else can you do to [make a developer’s robot friend more helpful](/newsletter/building-ai-features)?