---
title: "Do you even benchmark? How we evaluate agents at scale (with real examples)"
date: 2026-10-14
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - alex-lebedev
category: Engineering
tags:
    - Inside PostHog
    - Engineering
    - AI
    - AI observability
seo:
    metaTitle: "How to benchmark AI agents at scale against real data"
    metaDescription: "How we benchmark AI agents at PostHog: defining criteria, isolating runs so agents can't cheat, and running offline on real data."
---
We spend 2 trillion+ LLM tokens per month, with the lion's share going to running agents. We know what they do and how good they are *most* of the time, but we spend way too much money on them to trust their output based on vibes alone.

That's why we use benchmarks: repeatable tasks that are scored to evaluate a model or skill's performance.

You've probably heard of the term "benchmark" before. Labs like Anthropic and OpenAI use them to measure, compare, and market new models on release, like the popular [SWE-bench](https://www.swebench.com/) which is designed to evaluate model performance on general coding tasks.

But benchmarks aren't just for frontier labs. They're useful for anyone who wants to understand how well an AI tool works in their given stack so that they can make informed decisions. For example, you might run three different models with the same code review prompt on the same PR to choose the best one based on how many known bugs they catch, how long they take, and what they cost.

The idea is similar to running controlled experiments, but in reality, benchmarking is never that easy. Evaluation is often subjective, behavior is unpredictable, and – perhaps most painful of all – agents love to cheat. They'll search for leaked context, memory, and database query logs to pass benchmark tests with as little work as possible.

In this post, I'll explain how we benchmark our agents at PostHog, what we learned, and where we messed up (so you don't have to) – all with links to real PRs.

---

## A. Define the answer key

If a benchmark is like a standardized test, the first thing you need is an answer key:  the list of correct answers you grade your against.

This is the hardest part, in my opinion. If you ask an [LLM judge](/docs/ai-evals) whether an agent's output is "helpful", you'll get polite, useless praise. Especially if the same model generated it.

For a benchmark to actually be useful, the criteria for what's "good" or not needs to match the complexity they will encounter on the job. Simple yes/no sanity checks won't cut it since agentic tasks are typically more complicated than that. 

Here are the three approaches we tried in increasing order of difficulty and complexity.

### Level 1: A list of potential bugs from one PR

Our first approach was to take a task with clear answers and check which agents succeed, versus which ones fail. Each agent had three variables: the model, effort level, and harness.

We did this to evaluate our internal code review agent called ReviewHog, which covers a significant part of PostHog PRs. ReviewHog needs to stay up to date for the best results, so we needed a base benchmark to check against when we change models or prompts.

The best solution we came up with initially was surprisingly effective and simple:

1. First, we took one large PR.
2. Then, we made a "frozen copy" of it.
3. Humans reviewed the frozen PR manually.
4. We then asked several review agents to review it.
5. This produced a pretty exhaustive list of potential bugs from every possible angle.

![Review the same frozen PR, collect a list of bugs, change one setting, and compare findings, time, and cost.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/01_manual_check_603fcae577.png)

So if there were 13 issues worth checking for (structure, performance, security, etc.), we could measure the models on a 0/13 scale, plus compare how much time and money each one cost. Here's an [example report](https://github.com/PostHog/posthog/blob/master/products/review_hog/eval/experiments/2026-08-model-glm53-flash/FINAL_REPORT.md) of us testing ReviewHog this way with GLM 5.3 Flash.

It worked (and still works) well, but it has an obvious limitation: the answer key is based on one single PR for one single change in one single repo. No matter how large that PR is, this approach would never be able to cover all the other types of bugs that could happen in all of our repos.

### Level 2: A larger, golden set from multiple PRs

The second approach we used for benchmarking ReviewHog involved the same method, but across a larger percentage of real cases and with more varied examples.

Getting more PRs was easy; our team produces [10K PRs a month](/blog/10k-prs-a-month).

But then we had an idea. What if instead of looking for synthetic bugs, we created an answer key by searching for *real* bugs that actually happened? It would be even better if those bugs caused real messes, like proper incidents, since those are exactly the types of things we want these code review agents to prevent.

So that's what we did.

![Build a golden set from real incidents, recreate the PRs that introduced the bugs, and evaluate whether reviewers identify their causes.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/02_golden_set_b744f1abbe.png)

We looked through old PostHog tickets to create a golden set of 33 actual incidents, the PRs that caused them, descriptions of the problem, and the PR that fixed the incident. We analyzed each of them with ReviewHog and other bots to compare their performance, and the results were pretty good:

- ReviewHog found the incident-causing bugs in 62% of the cases
- In 47% of the cases, ReviewHog was the only bot that discovered those bugs, while other bots missed them
- In 9% of the cases, ReviewHog skipped the bug because another bot raised it before ReviewHog started the review, so ReviewHog marked it as "already known"
- In 6% of cases, the bugs were found by other bots, while ReviewHog didn't find them

![Table of ReviewHog evaluation results on the incident golden set.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/13_golden_set_results_v10_d6a344ba14.png)

The best combination we got at the time was with `GPT Sol 5.6` at `xhigh` for bug search, and `Claude Opus 5` at `xhigh` for bug validation, both using `pi` as the harness. You can check out our repo for the full [experiment results](https://github.com/PostHog/posthog/tree/master/products/review_hog/eval/experiments/2026-09-incident-golden-set).

> A big takeaway from this is to always use different model families for detection and validation. We got miserable results when we used either OpenAI or Anthropic models for both stages.

Remember, these benchmarks are specific to *our* use cases. Just because this combination of model, harness, and effort worked well for ReviewHog doesn't mean it will be the optimal choice for another codebase or task. That's the whole point of creating specific benchmarks for your specific stack and tasks.

Overall, there were still some downsides of this "larger golden set" method, but it was still acceptable:

- For 33 incidents, we needed to resurrect 66 PRs total: the PR that caused each incident and the PR that fixed it. This created lots of noise and triggered false alarms from our GitHub bots.
- We didn't re-add the bugs to the codebase. That would be bad. Instead, we kept them as isolated PRs by properly locking the branch for the agent.
- With open-source repos like ours, an agent with web access can still look up the public repo, merged PRs, and cheat. (More on this later.)

That said – and you probably thought about this, too – this only works because code review tasks are fairly deterministic and relatively easier to grade. The next problem we hit was how to grade agents for more abstract and subjective tasks.

### Level 3: Targeted, contextual rubrics

Benchmarking gets a lot more complicated when you're trying to evaluate agents that can technically do *anything*.

A great example is [scouts](/docs/self-driving/scouts), which are our implementation of scheduled custom agents that let you research *anything*. That could range from your [Product Analytics](/product-analytics) anomalies in PostHog, to mentions of your brand in social media, to recurring themes in your internal Slack. These tasks are as open-ended as it gets.

Much like how an A-B-C-D format answer key makes sense for grading multi-select quizzes but not for grading an essay, we needed to come up with a different way to evaluate scouts on open-ended tasks.

The obvious answer was rubrics – scoring and evaluation guides that describe the ideal answer, rather than containing the answer itself. But feneric rubrics like "Rate accuracy from 1 to 5" fall apart immediately when evaluating agents. They do a great job of measuring how confident and fluent the model sounds, not whether it did useful work.

Our solution was to build a rubric *generator* that creates guidelines based on the agent's context. We do this in two steps for scouts.

First, all scouts follow the same procedures, even if they work across wildly different domains. So we have one set of static rubrics shared across all scouts that checks whether the scout produced a report covering what it found, how actionable the findings are, and what to do next. 

We then also generate rubrics tailored to that specific scout based on context that was been provided to the scout so far such as:

- What area it covers (a specific product feature in PostHog, external data sources like Instagram, etc.)
- What skills and instructions it needs to follow
- What it did in previous runs, what tools it used, and what reports it generated

For example, to benchmark a scout analyzing the stability of the [Session Replay](/session-replay) player, we don't just check its report formatting. We also grade whether it spotted actual playback failure symptoms, queried data correctly, and whether the bug it flagged actually affected real users – criteria specific to Session Replay.

![Replay player reliability rubrics](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_10_13_at_11_08_47_bd2ae1b7e7.png)

With these rubrics in place, we could reliably track scout success rates across different agent configurations. The v1 of this tailored rubric system allowed us to test against:

- **Models.** Do scouts work better with the new model, or the old one?
- **Thinking effort.** Do scouts actually need to think at xhigh levels, if medium does it just fine with 30% fewer tokens?
- **Prompt changes.** If we create 5 different versions of the skill, which version works best for each task? 

![Trial start screen](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_10_13_at_11_09_44_0a21ad656f.png)

The result is a report with a close-to-clear answer. It's not 100% deterministic, but it's way better than just "vibes".

Here's an example of a report I ran while writing this blog to check whether Sol or Luna performs better for one of our scouts. The results suggest we should stick with Sol for this one; Luna could do a better job on plenty of other tasks, but to know that, you need something measurable to rely on.

![Scout benchmark report comparing evaluation results across model configurations.](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_10_13_at_11_05_06_7f7a15b1aa.png)
![Scout benchmark report comparing rubrics](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_10_13_at_11_06_17_4a49c51a12.png)

If you want to see how our rubric generator and ranking work under the hood, check out our [code](https://github.com/PostHog/posthog/tree/master/products/signals/backend/scout_harness).

So all of those three approaches were just the first step of developing an answer key or grading system for the agents. After defining what's "good", we need to make these tests work and stay objective at scale.

## B. Isolate benchmark runs

The surprisingly nasty problem we learned is that when you benchmark multiple models against real data, they'll quickly do everything they can to learn about and piggyback off of each other. They might source answers from [LLM traces](/docs/ai-observability/traces), DB queries, or any other logs the agentic run generates.

Here's an example of a data-anomalies scout being benchmarked. Run B4 investigated an anomaly and saved a memory at 15:18:08. When Run B12 ran later in the same workspace, it picked up that memory at 15:18:54 and used it instead of doing the work itself:

![Scout trace showing run B12 reusing a conclusion saved to shared memory by run B4.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/03_trace_b12_shared_memory_96ce3843c2.png)

This defeats the purpose of benchmarking since the results aren't reflecting the actual agent's performance. 

With multi-step agents that simulate human-agent conversation, state leaks into places that normal test runners don't even check. This next section is about the three approaches we tried to isolate runs to preserve benchmark integrity.

### Level 1: Parallel runs with no shared state

This approach is only valid if your agents don't generate meaningful artifacts (like traces, memory files, and logs) beyond the output that gets graded. Potential examples include simple classifiers or summarizers. 

In these cases, you could run multiple variants at the same time; no shared state means no contamination.

But in most cases (at least, for us at PostHog), our agents are complex and have many potential places to leak information such as through observability tools or error logs.

So let's go back to the B4 and B12 example above to explain the failure modes. 

Failure mode #1 is when cheating makes an agent appear better than it actually is. An agent using a faster but lighter model like Luna could easily just read and copy notes from an agent running on Opus.

Failure mode #2 is less obvious and, funnily enough, can make a model seem worse than it actually is. Even if an agent doesn't actively try to cheat, shared state could still cause problems anyway. For example, an agent could decide to honestly skip a task because it sees that another agent already completed it. One time, during a benchmark run, Run B2 looked at candidate anomalies, saw that an earlier run had already covered the target bug, and skipped that candidate entirely:

![Scout trace showing run B2 skipping a candidate because an earlier run had already covered it.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/05_trace_b2_prior_run_4c6e841386.png)

In this case, a clever model would get a surprisingly low grade for not finding a basic issue. Or you would need to prepare your judges for similar cases, which would affect the benchmarking results anyway.

So, unless the agents you're evaluating don't produce any artifacts, you need a way to make each run invisible to the others.

### Level 2: Sequential runs with state cleanup

A simple approach to isolate the runs is to just run them sequentially with cleanup in between– run a trial, record the output, reset the agent's context, and then start the next run

![Run a trial, save its results, reset its state, and repeat with the next configuration.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/04_sequential_runs_v2_59fbbb27b8.png)

That doesn't mean you can only run one agent – the chain could include hundreds of agents running in sequence or in parallel if they are all part of the same task. This is what we did for the initial ReviewHog benchmarks against a single frozen PR (Step 1, Option A).

The downsides of this are clear: you need to clean up the DB and logs after each run, and it's obviously slow, so testing different combinations of agents/efforts/skills takes a long time.

### Level 3: Parallel runs with total isolation

Most of us don't have unlimited time and patience to do sequential runs. The good news is that there is a way to get clean benchmarks in parallel. The bad news is that it's not simple – every trial needs complete isolation across *everything* the agent can touch:

- Identical starting context across all runs
- Private writable state (scratchpads, memory, vector stores, and DBs)
- Separate evaluation so scoring happens independently

DB state isn't the only leak. If your agent has tools to query ClickHouse, PostHog, logs, and so on, an earlier benchmark run leaves traces in those sources. A subsequent run can find those error spikes or query histories and use them as clues. True isolation means isolating telemetry and log scopes too.

![Isolate each trial's memory, outputs, and telemetry so agents cannot read other benchmark runs.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/06_isolate_everything_v4_a4b4878c87.png)

There's also a risk of *over*-isolating. If the benchmarking agent doesn't have as many tools as the real agent, it can get confused and skew the results unrealistically.

Here's an example of one of the first dry-runs we tested. It differs from the previous two traces; it wasn't cheating, just following instructions a bit too literally and promised not to write any inbox reports:

![Scout trace showing the agent retaining findings in memory but skipping inbox reports because dry-run reports would be discarded.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/07_trace_dry_run_8d886e28ed.png)

Because the dry-run agent doesn't execute all the steps an actual run would (creating new reports, editing data, and so on), it left blind spots we couldn't test. This was acceptable for our case with scouts, since we care more about how they retrieve information than how they store it.

If these types of blind spots *are* a blocker for your agent and critical to your evaluation, the next best option is to create truly isolated environments where agents can access all tools – but this requires freezing state.

## C. Freeze the environment (a.k.a., offline evals)

You can *technically* run hundreds of isolated agents with full tool access against the production database pretty reliably. But this will also interfere with the benchmark because it means state and data is not controlled between runs. You can't compare between them equally since it raises the question: "did this agent's score improve because of the variables we're testing, or because something in the data changed?"

We solved this by moving benchmarks from a "production environment that changes all the time" to a "production environment with the same starting state", i.e., frozen environments. To do this, we had to replicate or simulate our app, inject real (or real-enough) data, and make the agent believe it's a real thing. We call these offline benchmarks.

That's a lot. So why bother?

- Since frozen environments have a fixed starting point, you can easily reset them after every run, solving problems with data leaks. In our case, we run a copy of PostHog inside VMs, delete the VM after each benchmark, and spawn a new one.
- It also means that the agent is actually allowed to change the state, write, create, delete, etc. as we test the task end to end, leaving fewer blind spots.
- As a bonus, because the data stays fixed, the benchmark you did for model X a month or two ago will still be comparable to the benchmark for model Y you did today.

I'm using the word "offline" loosely here since the agents will still need connectivity to call AI endpoints and such. The point is that state is frozen, and can be reset at any time.

We went through three stages to get this working.

### Level 1: Mocked MCP replies

The first thing we tried was to create mock MCP calls of the agent. So when agent thinks it's querying the DB, it's actually just getting a pre-stored answer to what it asked for before in prod. For example, what query it ran with `execute_query(sql)` and what slice of the DB it returned:

![An agent calls a mocked MCP tool, which returns a saved response instead of querying a live service.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/08_mcp_mock_ace037214f.png)

This sounds straightforward and worked well for basic tech demos like returning static JSON to SQL queries, but it failed miserably on any meaningful production-like work. This is because agents aren't deterministic; the query from Run 1 doesn't guarantee that Run 2 will run the same one. And since we had to mock MCP replies in advance, if the agent asks something different or new compared to the runs from prod we recorded, we couldn't always provide a reasonable answer.

It's not a big surprise, but it would still be cool if it worked out-of-the-box. Still, the case isn't that desperate, and we tried a couple of tweaks.

### Level 2: Trajectory-based mocked MCP replies

The logical next step was to build mock database on \~50 runs instead of just a single run. In this version, we based the mock replies on every trajectory the agent picked (i.e., the complete, ordered sequence of steps, reasoning, tool calls, and observations it produced from start to finish).

This seemed promising for a while. Thanks to the trajectory-based approach, we were able to guess most of the queries well at first. But eventually in the run, some drift would happen here and there due to nondeterminism, and then an outlier query would return nothing. The agent then gets confused, the run fails, etc. 

For how much effort this approach takes, it's not really worth it if you already have access to real data. If you do choose this route, I'd suggest adding synthetic (or real) data a bit before and/or after every query so that a 24h query still returns true data if the call is skewed a bit.

For us, since most of our benchmarking needs at PostHog were for internal tasks, we do have access to lots of real data. So we decided to stop messing with mocked MCP replies and go with an approach more grounded in real data.

### Level 3: Restored real-data slices

The solution that actually worked for us was to spin up an isolated PostHog sandbox seeded with a restored, real-world data slice.

On the surface, the idea was simple: query a couple of DB tables (Postgres, ClickHouse), store them as Parquet files in S3, and then restore them in the VM with a local PostHog instance to make it look like the real deal. The bonus: data never leaves PostHog infra.

![Restore a real data slice into an isolated PostHog environment, shifting timestamps together so each benchmark can query the prepared data.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/10_restored_data_slice_v8_ba0f337e6e.png)

The first problem we encountered was with timestamps. If an agent in a frozen environment asks for the last 24h of events, we'll have prepared enough data for it to work fine for today, or at least for a few hours. But then if you run the test again tomorrow, the agent will fail because it's using real UTC time on static data. A query for September 17 won't return anything if the frozen environment only contains data from September 15-16. 

The solution for that was simple enough; every time we injected data, we'd correct it to match the frozen timeline by shifting it.

The second problem was less obvious. Even though we tried to make the data slices as realistic as possible, there were still certain types of data that we didn't want to replicate, nor did we expect the need to. But thanks to non-deterministism, new models would still sometimes try to look into those tables and data sources that we didn't slice. 

For example, we chose not to slice user tables because _____. But an agent would sometimes decide it wanted to look inside, see that there aren't many users on this local instance, and immediately suspect something was strange.

![September 30 scout trace showing a missing team roster and the decision to leave reviewers unassigned.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/11_trace_sept30_roster_5787996325.png)

On the other hand, you can always *overprepare* and make it as realistic as possible on the MCP tools side, while the rest of the data in the local instance doesn't match the scale. Then the agent gets even more suspicious and starts thinking the data is synthetic.

![September 23 scout trace showing the agent questioning whether the data is synthetic.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/12_trace_sept23_synthetic_ecd98649d3.png)

Once the agent starts treating the investigation as a test, it starts behaving in strange ways like:

- Stopping at a good-enough explanation instead of running extra queries to verify it.
- Spending part of its budget investigating gaps or inconsistencies in the restored data instead of the actual task.
- Returning more speculative findings that it would normally leave out.

Any of those behaviors can negatively affect your benchmark's integrity since they're not realistic. And, sadly, there's no silver bullet – you just have to run and tweak it over and over again until you stop seeing "the agent suspects something" traces anymore.

---

Building quality benchmarks may sound like a lot of work, and I'd be lying if I said it wasn't. But it's entirely worth it. You'll end up with a solid system that will let you move faster in the long run – especially if you don't repeat the mistakes we made.

 Parts A and B are now part of PostHog and going through internal testing. We're still working on Part C, freezing environments, but wanted to share our learnings so far. 

If you take anything away from this blog, it's that agents will happily exploit whatever mess you leave behind and cheat. Watch for unexpected parameters, iterate a lot, and pay attention to traces. 

Vibes can still take you pretty far in the short run, especially for smaller and simpler use cases. But for anyone who wants to get serious about evaluating AI at scale – it's time to bench.