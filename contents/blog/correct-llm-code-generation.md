---
title: "You can have LLM code that's actually good"
date: 2026-01-06
author:
  - danilo-campos
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/robot_6d2cab1b66.png
featuredImageType: full
tags:
    - Engineering
    - LLM
---

You know what’s boring?

Integrating PostHog.

It’s a task you’ll do once, but you’ll need to do it right, so that means carefully reading docs. Depending on your project’s framework and its version, there might be some caveats or edge cases you need to think about.
 
That sucks. So we built the wizard: a command line tool that scans your project structure and tailors a correct implementation of PostHog for you.

This wizard can understand your business goals, where churn happens, and the conditions for your success, all as expressed by the structure of your code.

And it can do this with just one command in your terminal.

Try it out with your [Next.js projects](https://posthog.com/docs/libraries/next-js). We’re adding more frameworks and languages as you read this.

But delivering custom code generation at this scale is hard. Getting to the point where we can do this with both correctness and consistency came through hard-won lessons.

I spent a decent chunk of 2025 worried none of this would work. The world of LLMs is strange: there’s not always an objectively correct way to do things. Last year’s best practice might be obsolete with this year’s models and technology.

But with enough stubbornness, we cracked this: we can generate correct yet automated PostHog integrations that give you time back in your life.

You can use LLMs to generate correct and predictable code, too. Here’s everything we learned. 

## The dead-end of v1

Our [first wizard](/blog/envoy-wizard-llm-agent) made you happy and we love that.

But architecturally, it was a dead-end.

Maintaining it was a bear: documentation for the LLM was embedded in its code. Because of how fast both software frameworks and PostHog itself evolves, the documentation was constantly falling out of sync with our website, not the mention the web frameworks it targeted.

Worse still, the wizard relied on a sort of Pareto luck: 80% of the time it could make the right edits. The rest of the time, it completely failed. It was a single-shot edit driven by an LLM, but scaffolded by a bunch of conventional code that hoped to find the right files. If your project was just a little weird, even just part of a monorepo, you were out of luck.

Most damning, the wizard didn’t know if it succeeded. It crossed its fingers.

All of this presented a low ceiling. We could install code snippets, but we couldn’t be more ambitious for you. We needed better tools.

## Agents change the game

Norbert Wiener, father of cybernetics, [writes](https://en.wikipedia.org/wiki/The_Human_Use_of_Human_Beings):

> the structure of the machine or organism is an index of the performance that may be expected from it.

This observation, echoing 75 years from the past, *rang true*: we had a CLI that was built to explore a specific set of paths that might contain relevant files. It could read them and write them. But this was a straitjacket. We couldn’t possibly code ahead of all the permutations that it might encounter.

Its performance was capped by its structure.

So we needed new structure.

Instead of a car on a rail, we needed something that could steer, even backtrack, steadily circling in on its goal.

A tool like the [Claude Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview) is perfect for this: it’s structured to both explore and integrate feedback. If a file isn’t where an agent expects, it can run a bash command to go looking for it.

By contrast to our crude CLI, the agent was nimble as a spider. It could detect coding errors, and it could trigger linters, type checkers, and prettiers. It could come at a problem from multiple angles.

The agent had all of the information encoded in the language model to inform its moves, and a broad set of tools it could use to make those moves.

Agents need less luck. But they do need loads of context.


## Bringing the light of context

I’d get emails over the summer: the wizard had correctly integrated PostHog, but it was using a newer approach than we’d documented on the website.

This, understandably, made folks uneasy. *Did the robot hallucinate this pattern?*

The future of the wizard needed to be hand-in-glove with whatever we’d written on posthog.com. Both sources had to agree.

Today, the wizard is always primed with up-to-the-second documentation from the website. If a framework gets a new way of integrating analytics, all we need is a website update for both humans and the wizard to do better. This saves a ton of labor, and it lets us trim back the wizard to something lighter. No more docs embedded in the code.

But prose documentation alone, it turned out, was not enough. We needed a little more detail to ensure correctness. So for every framework we support, we build a [toy project](https://github.com/PostHog/examples/tree/main/basics) in code. These are not starter projects and you should not ship them: most obviously, the authorization flows are completely fake. They accept any password. Still, they demonstrate a PostHog integration in motion, giving the agent richer influence for doing the right thing.

The last wrinkle for a robot making thousands of project edits per month was harder: how do you do the work *predictably?*

LLMs are non-deterministic systems. That’s the devil’s agreement of working with them. An agent can come up with many patterns and sequences for accomplishing the same goal.

What worked best for us was bread-crumbing the prompts, revealing them in sequence. Instead of revealing the entire goal right away, we disclose bits at a time.

You can do this without any fancy agent orchestration.

## MCP delivery

[MCP](/blog/machine-copy-paste-mcp-intro) ties this all together in a way that creates amazing outcomes from our agent, while allowing all the content investments we’re making to be reusable elsewhere – say, your Cursor or Claude Code session.

Everyone thinks about [`tools`](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) in MCP servers, but they can do other things too, like deliver [`resources`](https://modelcontextprotocol.io/specification/2025-06-18/server/resources). Resources bind data to a deterministic, consistent URI. You can be assured that `posthog://my-great-prompt` will always lead to the content you want.

This allows the dog to take *itself* for a walk. For each stage of an integration, the agent gets a set of tasks. Once those tasks are complete, the agent is told to load the next piece of of the prompt.

Here’s an example, from the second-to-last stage of integration:

```
Check the project for errors. Read the package.json file for any type checking or build scripts that may provide input about what to fix. Remember that you can find the source code for any dependency in the node_modules directory.

Once all other tasks are complete, run any linter or prettier-like scripts found in the package.json.

[...]

**Upon completion, access the following resource to continue:** posthog://workflows/basic-integration/conclude
```

The result is that every integration follows the same general path and procedure, one that we know delivers great results. 

Most importantly, *where* this content comes from is completely up to you in the design of an MCP server. We combine PostHog website content with sample code and prompts from a GitHub repo. The MCP can synthesize as many sources as you need into a single, one-stop surface for an agent to learn what it needs.

This is the most crucial job for successful LLM code generation: models are expensive to train, so the information they encode rots. In the case of PostHog integration code, it rots *fast*. Patching the rot with fresh context changes everything.

MCP provides a *universal surface* to meet this goal. No lock-in. You can change agents, you can use multiple kinds of agents.

## What comes next?

The hard bit was a reliable delivery vehicle.

We had some false starts. I shipped a beta of the new wizard that didn’t actually bundle the Claude Agent CLI binary.

But I didn’t notice because I had Claude Code installed locally, and the wizard just used that.

*And then,* it still worked in production for many people, because they *also* had Claude Code installed.

It’s weird out here.

Now the problem is designing just enough context that the wizard can serve way more languages and frameworks. So while we crack away at that, steal what’s interesting:

- The wizard repo is in a state of transition. Next.js is complete. You can compare our new approach to the old one by looking at the [diff in this pull request](https://github.com/PostHog/wizard/pull/214/files). Look how much we get to delete!
- Our [examples repo](https://github.com/PostHog/examples) is full of example code and the [prompts](https://github.com/PostHog/examples/tree/main/llm-prompts/basic-integration) we’re using
- The [PostHog MCP server](https://github.com/PostHog/posthog/tree/master/services/mcp) uses the examples repo to construct its resource offerings

