---
title: "The short, strange history of MCP servers (and what comes next)"
date: 2026-11-10
author: ["juliana-meyer"]
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/the_short_strange_history_of_mcp_servers_2_84b061748a.png
featuredImageType: full
tags:
- PostHog news
- Inside PostHog
---

I feel like a historian of the present whenever I look back at the short history of MCP servers. The [first PRs](https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1) landed in the open-source repository in September 2024, and [Anthropic officially announced](https://www.anthropic.com/news/model-context-protocol) the protocol that November. That's forever ago in Silicon Valley years, given how fast most of us added MCPs to our stack. But it's also so, so recent: we're barely scratching the surface of this new age.

Today PostHog made our MCP Analytics generally available, the next chapter in this technology's history for us. As an amateur contemporary historian, I wanted to understand what that changes for people building products today. So I hit the field to talk to [Lucas Faria](/community/profiles/32387), an engineer on our MCP Analytics team, with two research questions:

- Why did we build MCP Analytics?
- How does it compare to how product analytics was done in the past?

Instead of using brushes and sieves to dig into this past, I pressed record on Granola and asked Lucas to take me back to the remote days of early 2026. This article is what we unearthed in that conversation, plus a few other internet excavations.

## The bronze age of clicks

It feels like yesterday that we built products on a "watch, learn, test, ship" loop, with only human users to worry about. It's what PostHog helps you do. Your questions were probably about engagement ("how many users clicked?") or retention ("how many came back?").

That engagement funnel now feels like the bronze age of building products. MCP servers brought a wave of agentic users who use your product differently. Agents don't click, scroll, or visit pages, so the tools you use to watch users see nothing. That doesn't mean the agents aren't there.

[Agents are having a blast with PostHog](/blog/how-ai-agents-behave). You can see the [growth for yourself](/mcp/leaderboard): from June to November 2026, weekly agent calls grew 12x, compared to 4.7x for weekly users. Agents became our fastest-growing users, yet we couldn't tell which tools they used, which ones broke, or what they were trying to do. When a tool call failed, we never knew why. So we built MCP Analytics to find out.

<div className="ph-callout mt-4 mb-6 p-4 border rounded bg-accent border-primary flex gap-4 items-start">

<img src="https://res.cloudinary.com/dmukukwp6/image/upload/v1737766204/Lucas_4c1aeaa135.png" alt="Lucas Faria" className="shrink-0 w-16 h-16 rounded-full object-cover m-0" />

<div className="ph-text text-[15px] [&_p]:text-[15px] [&>*:last-child]:mb-0 !leading-relaxed">

"It came first from our own internal demand. We needed to understand where our MCP calls were failing and why agents were making those calls." – [Lucas Faria](/community/profiles/32387)

</div>

</div>

Talking to Lucas, I kept noticing the parallels between building for humans and building for agents. Classic concepts from the Product Golden Age like onboarding, reliability, and user research still matter. They just leave different relics when your user is an agent.

## The great tool flood

Good onboarding doesn't show a new user everything your product does at once. It ramps them up gradually.

Agents don't get emotionally overwhelmed by too much information, but they do burn through tokens. For MCP servers, onboarding translates as a progressive disclosure of tools.

The early MCP specs standardized how agents discover a service's tools. A server published its full tool list, and the client loaded all of it into the agent's context. Connect the PostHog MCP, and the agent learned that PostHog creates feature flags, insights, dashboards, surveys, funnels, and so on.

But companies keep shipping new products, and the tool lists kept growing. Eventually, PostHog's server was sending more than 500 tools which exhausted the agent's limited context window.

So the protocol evolved, and servers changed what they exposed up front. PostHog uses a single <code>exec</code> tool that takes commands:

- **<code>search</code>:** "find me the tools related to surveys, feature flags, or product analytics."
- **<code>call</code>:** "run this tool with these arguments."

That made analytics harder, though. Before, every operation had its own tool name. Now nearly every call looks like the same tool.

<div className="ph-callout mt-4 mb-6 p-4 border rounded bg-accent border-primary flex gap-4 items-start">

<img src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_hedgehog_town_crier_7e431a16ab.png" alt="Town Crier hedgehog" className="shrink-0 w-16 h-16 object-contain m-0" />

<div>

<strong className="text-lg block mb-0.5">How do you know which tools agents actually use?</strong>
<div className="ph-text text-[15px] [&_p]:text-[15px] [&_*]:text-[15px] [&>*:last-child]:mb-0 [&_code]:text-[13px] [&_code]:bg-primary !leading-relaxed">

**Historian's tip:** MCP Analytics looks past the top-level <code>exec</code> tool and records the commands inside it. A call to <code>exec</code> a flag-create tool still shows up as the feature flag it created or the query it ran.

</div>

</div>

</div>

## The end of the handshake-ian era

Agents rarely make just one MCP call per conversation. Say an agent wants to understand an online store's conversion funnel. First it needs to know which pages exist, which events are captured, and which event fires at checkout. Each action is a separate tool call, feeding into one conversation.

The early MCP specs tied those calls together with a ritual borrowed from client-server protocols: the handshake. Before any tool calls, client and server introduced themselves, agreed on a protocol version, exchanged capabilities, and confirmed initialization. Everything after that belonged to one session.

In July 2026, the [2026-07-28 revision of the spec](https://blog.modelcontextprotocol.io/posts/2026-07-28/) dropped the mandatory handshake. Each request in the new spec carries its own metadata, like protocol version and client identity, and stands on its own in stateless requests.

<div className="ph-callout mt-4 mb-6 p-4 border rounded bg-accent border-primary flex gap-4 items-start">

<img src="https://res.cloudinary.com/dmukukwp6/image/upload/v1737766204/Lucas_4c1aeaa135.png" alt="Lucas Faria" className="shrink-0 w-16 h-16 rounded-full object-cover m-0" />

<div className="ph-text text-[15px] [&_p]:text-[15px] [&>*:last-child]:mb-0 !leading-relaxed">

"If you are trying to stay current on the latest rules, what is possible and what is not, you need to know which specs agents calling your MCP server are implementing. MCP analytics gives you that" – [Lucas Faria](/community/profiles/32387)

</div>

</div>

Stateless requests are easier to scale across server instances, but they cut the thread that tied a conversation together.

So we stitch the calls back together. The SDK adds an [optional <code>conversation_id</code> argument](/docs/mcp-analytics/conversation-id) and hashes it into a <code>$session_id</code> so we group calls into the same session. The result is close to session replay for agents calling your server: open a session and read every tool call, intent, and error in order.

<div className="ph-callout mt-4 mb-6 p-4 border rounded bg-accent border-primary flex gap-4 items-start">

<img src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_hedgehog_town_crier_7e431a16ab.png" alt="Town Crier hedgehog" className="shrink-0 w-16 h-16 object-contain m-0" />

<div>

<strong className="text-lg block mb-0.5">How do you know which calls belong to the same conversation on a stateless server?</strong>
<div className="ph-text text-[15px] [&_p]:text-[15px] [&_*]:text-[15px] [&>*:last-child]:mb-0 [&_code]:text-[13px] [&_code]:bg-primary !leading-relaxed">

**Historian's tip:** MCP Analytics [captures a conversation handle](/docs/mcp-analytics/conversation-id) as <code>$mcp_conversation_id</code> and hashes it into a stable <code>$session_id</code>. Calls from the same conversation stay grouped even when every request is independent.

</div>

</div>

</div>

## Excavating primary sources

Your reliability stack also changes when handling MCP servers. You probably started observing your MCP at the infrastructure layer: memory, CPU, latency, response time, maybe with [OpenTelemetry](https://opentelemetry.io/). Those numbers tell you whether your server is healthy. But you can't learn much about what the person behind the agent wanted, or where the request went wrong.

For that, a historian goes to the primary sources. The SDK adds a <code>context</code> argument to tool calls and asks the agent to explain, in a sentence, why it's making the call and how the call serves the user's goal. The SDK removes it before your code runs and stores it as <code>$mcp_intent</code>. The prompt also tells the agent to leave out personal details.

Group those intents by session, and you see what people mostly come to your server to do. Sometimes an agent calls five tools to answer one question, a sign you could build a single tool for the job. Sometimes you find a tool nobody calls. When things break, the tool quality view groups each tool's failures by cause. So you anticipate decisions based on data, instead of dealing with the aftermath of a broken tool.

<div className="ph-callout mt-4 mb-6 p-4 border rounded bg-accent border-primary flex gap-4 items-start">

<img src="https://res.cloudinary.com/dmukukwp6/image/upload/v1737766204/Lucas_4c1aeaa135.png" alt="Lucas Faria" className="shrink-0 w-16 h-16 rounded-full object-cover m-0" />

<div className="ph-text text-[15px] [&_p]:text-[15px] [&>*:last-child]:mb-0 !leading-relaxed">

"Today I made about three PRs fixing the MCP tools people use to create surveys, which had a fairly high error rate. I only found out which tools they were and what their errors were because of MCP Analytics." – [Lucas Faria](/community/profiles/32387)

</div>

</div>

<div className="ph-callout mt-4 mb-6 p-4 border rounded bg-accent border-primary flex gap-4 items-start">

<img src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_hedgehog_town_crier_7e431a16ab.png" alt="Town Crier hedgehog" className="shrink-0 w-16 h-16 object-contain m-0" />

<div>

<strong className="text-lg block mb-0.5">How do you know what agents are actually trying to do?</strong>
<div className="ph-text text-[15px] [&_p]:text-[15px] [&_*]:text-[15px] [&>*:last-child]:mb-0 [&_code]:text-[13px] [&_code]:bg-primary !leading-relaxed">

**Historian's tip:** MCP Analytics [captures the agent's stated intent](/docs/mcp-analytics/intent) on tool calls and groups calls into sessions, so you can read what a conversation was for, besides which tools it called. Intent clustering, now rolling out, groups those goals into themes.

</div>

</div>

</div>

## Oral history: interviewing agents

"What's the job to be done?" has been in the product playbook for ages. The sad truth is that getting feedback from users is hard. Put a survey in front of a person and most won't answer, because there isn't much in it for them.

Agents make different interviewees. An agent is motivated to finish its task as well as it can. There is no cognitive load, it's just computation running. That makes its feedback surprisingly actionable.

So we also ask agents what they tried to do but couldn't, because we didn't have the tool yet. Those reports map the gaps in your server and inform what to build next on your MCP roadmap.

<div className="ph-callout mt-4 mb-6 p-4 border rounded bg-accent border-primary flex gap-4 items-start">

<img src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_hedgehog_town_crier_7e431a16ab.png" alt="Town Crier hedgehog" className="shrink-0 w-16 h-16 object-contain m-0" />

<div>

<strong className="text-lg block mb-0.5">How can you ask agents for feedback?</strong>
<div className="ph-text text-[15px] [&_p]:text-[15px] [&_*]:text-[15px] [&>*:last-child]:mb-0 [&_code]:text-[13px] [&_code]:bg-primary !leading-relaxed">

**Historian's tip:** MCP Analytics adds an [opt-in virtual <code>get_more_tools</code> tool](/docs/mcp-analytics/missing-capability) that agents call when the available tools can't finish a task. Each call sends a <code>$mcp_missing_capability</code> event with the agent's description of what the user wanted.

</div>

</div>

</div>

## Historian's afterword

So what have my archaeological expeditions through the history of MCP analytics revealed?

<div className="ph-callout mt-4 mb-6 p-4 border rounded bg-accent border-primary flex gap-4 items-start">

<img src="https://res.cloudinary.com/dmukukwp6/image/upload/v1737766204/Lucas_4c1aeaa135.png" alt="Lucas Faria" className="shrink-0 w-16 h-16 rounded-full object-cover m-0" />

<div className="ph-text text-[15px] [&_p]:text-[15px] [&>*:last-child]:mb-0 !leading-relaxed">

"We're in a world where shipping code is now very easy and fast. The hard part is still understanding where you stand." – [Lucas Faria](/community/profiles/32387)

</div>

</div>

**Why did we build MCP Analytics?**
To see what agents actually do on our MCP server: which tools they call, which calls fail, and what the people behind them are trying to do.

**How does it compare to how product analytics was done in the past?**
The classic playbook of onboarding, sessions, and user research still applies, but the traces are different. Instead of clicks and pageviews, you track tool calls and the commands inside them. You stitch stateless requests back into sessions, read each agent's stated intent, and ask agents directly what they couldn't do.

MCP is about two years old, and a lot has changed in the last year alone. I feel like an observer of my own times, capturing history as it unfolds. The irony of writing the history of the present is that it's guaranteed not to age well. Predicting how today's events will shape tomorrow is a thankless task, and every word goes stale as I write it. Alas, I hope this account outlives me and tells future generations that, today, we're launching MCP Analytics in general availability. If you're already a customer, [install it through our Wizard](/docs/mcp-analytics/installation), or sign up to start.

<WizardCommand command="mcp-analytics" />
