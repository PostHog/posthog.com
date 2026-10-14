---
title: "Do you even benchmark? Evaluating agents at scale against real data"
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

That's why we use benchmarks: repeatable, standardized sets of tasks that are scored to evaluate how a model or skill's performance. 

You have may have heard of the term before. Labs like Anthropic and OpenAI use benchmarks to measure and compare new models on release, like the popular [SWE-bench](https://www.swebench.com/). But this is just one category of benchmarks designed for evaluating LLMs on generalized tasks.

At PostHog, as a consumer of these LLMs, we want to know how well model X or Y will perform in *our* specific stack. To do so, we might run multiple models to perform code-reviews on the same PR in the PostHog repo and check how many known bugs they catch, how long they take, and what they cost. This helps us decide whether one model is actually an improvement over another.

In reality, benchmarking is never that easy. Evaluation is often subjective, behavior is unpredictable, and – perhaps most painful of all – agents love to cheat. They'll search for leaked context, memory, and database query logs to pass benchmark tests with as little work as possible.

In this post, I'll explain how we benchmark our agents at PostHog, what we learned, and where we messed up (so you don't have to), with links to real PRs. Most of our examples focus on evaluating agents on data research and code review tasks since that makes up a majority of our [self-driving](/self-driving) product and the 2.4 million+ agentic runs we spawned to build it.

---

## Step 1. Define the answer key

If a benchmark is like a standardized test, the first thing you need to do is create the answer key so you can grade your agents' results. 

This is the hardest part, in my opinion. For a benchmark to actually be useful, the criteria for what's "good" or not needs to match the complexity they will encounter on the job. Simple yes/no sanity checks won't cut it since agentic tasks are typically more complicated than that. 

But you also can't just ask an [LLM judge](/docs/ai-evals) to grade another agent's output for you; agents will alwayas give you polite praise if you ask it whether something was helpful. (This is especially true if you're asking the same model that generated it.)

Here are the three approaches we tried in increasing order of difficulty and complexity.

### Option A – Easy: A list of potential bugs from one PR

The first approach is to take a task with clear answers and check which agents succeed, versus which ones fail. Each agent had three variables: the model, effort level, and harness.

We did this to evaluate our internal code review agent, called ReviewHog, that covers a significant part of PostHog PRs. ReviewHog needs to stay up to date for the best results, so we needed a base benchmark to check against when we change models or prompts.

The best solution we came up with initially was surprisingly effective and simple:

1. First, we took one large PR.
2. Then, we made a "frozen copy" of it.
3. Humans reviewed the frozen PR manually.
4. We then asked several review agents to review it.
5. This produced a pretty exhaustive list of potential bugs from every possible angle.

![Review the same frozen PR, collect a list of bugs, change one setting, and compare findings, time, and cost.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/01_manual_check_603fcae577.png)

So if there were 13 issues worth checking for (structure, performance, security, etc.), we could measure the models on a 0/13 scale, plus compare how much time and money each one cost. Here's an [example report](https://github.com/PostHog/posthog/blob/master/products/review_hog/eval/experiments/2026-08-model-glm53-flash/FINAL_REPORT.md) of us testing ReviewHog this way with GLM 5.3 Flash.

It worked (and still works) well, but it has an obvious limitation: the answer key is based on one single PR for one single change in one single repo. No matter how large that PR is, this approach would never be able to cover all the other types of bugs that could happen in all of our repos.

### Option B – Medium: A larger, golden set from multiple PRs

The second approach we used for benchmarking ReviewHog involved the same method, but across a larger percentage of real cases and with more varied examples.

Getting more PRs was easy; our team produces X per day.

But then we had an idea. What if instead of looking for synthetic bugs, we created an answer key by searching for *real* bugs that actually happened? It would be even better if those bugs caused real messes, like proper incidents.

So that's exactly what we did.

![Build a golden set from real incidents, recreate the PRs that introduced the bugs, and evaluate whether reviewers identify their causes.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/02_golden_set_b744f1abbe.png)

We looked through old PostHog tickets to create a golden set of 33 actual incidents. Each one includes:

- The PR that caused the incident
- The description of the problem
- The PR that was used as a fix for the incident

This meant we could review 33 PRs of different sizes, from different repos, and get a verifiable boolean metric: did ReviewHog find the bug that caused the incident?

ReviewHog was able to find and validate the bug for 62% of the PRs.

![Table of ReviewHog evaluation results on the incident golden set.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/13_golden_set_results_v6_6ad1a1f411.png)

These were pretty good results. The best combination we got at the time was with `GPT Sol 5.6` at `xhigh` for bug search, and `Claude Opus 5` at `xhigh` for bug validation, both using `pi` as the harness. You can check out our repo for the full [experiment results](https://github.com/PostHog/posthog/tree/master/products/review_hog/eval/experiments/2026-09-incident-golden-set).

> A big takeaway from this is to always use different model families for detection and validation. We got miserable results when we used either OpenAI or Anthropic models for both stages.

And, on another note, remember that these benchmarks are specific to *our* use cases. Just because this combination of model, harness, and effort worked well for ReviewHog doesn't mean it will be the optimal choice for another codebase or task.

Overall, the downsides of this "larger golden set" method were clear, but still acceptable:

- For 33 incidents, we needed to resurrect 66 PRs total: the PR that caused each incident and the PR that fixed it. This created lots of noise and triggered false alarms from our GitHub bots.
- We didn't re-add the bugs to the codebase. That would be bad. Instead, we kept them as isolated PRs by properly locking the branch for the agent.
- With open-source repos like ours, an agent with web access can still look up the public repo, merged PRs, and cheat. (More on this later.)

That said – and you probably thought about this, too – this only works  because code review tasks are fairly deterministic and easy to grade. The next problem we hit was how to grade agents for more abstract and subjective tasks.

### Option C – Hard: Targeted, contextual rubrics

Benchmarking gets a lot more complicated when you're trying to evaluate agents that can technically do *anything*.

A great example is scouts. If you don't know them yet, [scouts](/docs/self-driving/scouts) are custom agents we built that let you research *anything*. That could range from your [Product Analytics](/product-analytics) anomalies in PostHog, to mentions of your brand in social media, to recurring themes in your internal Slack. These tasks are as open-ended as it gets.

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

With these rubrics in place, we could reliably track scout success rates across a different agent configurations. The v1 of this tailored rubric system allowed us to test against:

- **Models.** Do scouts work better with the new model, or the old one?
- **Thinking effort.** Do scouts actually need to think at xhigh levels, if medium does it just fine with 30% fewer tokens?
- **Prompt changes.** If we create 5 different versions of the skill, which version works best for each task? 

![Trial start screen](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_10_13_at_11_09_44_0a21ad656f.png)

The result is a report with a close-to-clear answer. It's not 100% deterministic, but it's way better than just "vibes" and booleans.

Here's an example of a report I ran while writing this blog to check whether Sol or Luna performs better for one of our scouts. The results suggest we should stick with Sol for this one; Luna could do a better job on plenty of other tasks, but to know that, you need something measurable to rely on.

![Scout benchmark report comparing evaluation results across model configurations.](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_10_13_at_11_05_06_7f7a15b1aa.png)
![Scout benchmark report comparing rubrics](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_10_13_at_11_06_17_4a49c51a12.png)

If you want to see how our rubric generator and ranking work under the hood, check out our [code](https://github.com/PostHog/posthog/tree/master/products/signals/backend/scout_harness).

So all of those three approaches were just the first step of developing an answer key or grading system for the agents. After defining what's "good", we need to make these tests work and stay objective at scale.

## Step 2. Isolate benchmark runs

The surprisingly nasty problem we learned is that when you benchmark multiple models against real data, they'll quickly do everything they can to learn about and piggyback off of each other. They might source answers from [LLM traces](/docs/ai-observability/traces), DB queries, or any other logs the agentic run generates.

Here's an example of a data-anomalies scout being benchmarked. Run B4 investigated an anomaly and saved a memory at 15:18:08. When Run B12 ran later in the same workspace, it picked up that memory at 15:18:54 and used it instead of doing the work itself:

![Scout trace showing run B12 reusing a conclusion saved to shared memory by run B4.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/03_trace_b12_shared_memory_96ce3843c2.png)

This defeats the purpose of benchmarking since the results aren't reflecting the actual agent's performance. 

With multi-step agents that simulate human-agent conversation, state leaks into places that normal test runners don't even check. This next section is about the three approaches we tried to isolate runs to preserve benchmark integrity.

### Option A – Easy: Parallel runs with no shared state

This approach is only valid if your agents don't generate meaningful artifacts (like traces, memory files, and logs) beyond the output that gets graded. Potential examples include simple classifiers or summarizers. 

In these cases, you could run multiple variants at the same time; no shared state means no contaminiation.

In reality, these conditions are rare. Most agentic systems that are complex enough to need benchmarks will have many potential places for leaks, such as through observability tools or error logs.

So let's go back back to the B4 and B12 example above to explain the failure modes. 

Failure mode #1 is when cheating makes an agent appear better than it actually is. An agent using a faster but lighter model like Luna could easily just read and copy notes from an agent running on Opus.

Failure mode #2 is less obvious and can make a model seem worse than it actually is. Even if an agent doesn't actively try to cheat, shared state could still cause problems anyway. For example, an agent could decide to honestly skip a task because it sees that another agent already completed it. One time, during a benchmark run, Run B2 looked at candidate anomalies, saw that an earlier run had already covered the target bug, and skipped that candidate entirely:

![Scout trace showing run B2 skipping a candidate because an earlier run had already covered it.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/05_trace_b2_prior_run_4c6e841386.png)

In this case, a clever model would get a surprisingly low grade for not finding a basic issue. Or you would need to prepare your judges for similar cases, which would affect the benchmarking results anyway.

So, unless the agents you're evaluating don't produce any artifacts, you need a way to make each run invisible to the others.

### Option B – Medium: Sequential runs with state cleanup

A simple approach to isolate the runs is by keeping them bounded by time. In other words, run a trial, record the output, reset the agent's context, and then start the next run:

![Run a trial, save its results, reset its state, and repeat with the next configuration.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/04_sequential_runs_v2_59fbbb27b8.png)

That doesn't mean you can only run one agent – the chain could include hundreds of agents running in sequence or in parallel if they are all part of the same task. This is what we did for the initial ReviewHog benchmarks against a single frozen PR (Step 1, Option A).

The downsides of this are clear: you need to clean up the DB and logs after each run, and it's obviously slow, so testing different combinations of agents/efforts/skills takes a long time.

### Option C – Hard: Parallel runs with limited access

Most of us don't have unlimited time and patience, but need to evaluate agents that produce artifacts that can leak state.

The good news is that there is a way to get clean benchmarks. The bad news is that it's not simple – every trial needs complete isolation across *everything* the agent can touch:

- Identical starting context across all runs
- Private writable state (scratchpads, memory, vector stores, and DBs)
- Separate evaluation so scoring happens independently

DB state isn't the only leak. If your agent has tools to query ClickHouse, PostHog, logs, and so on, an earlier benchmark run leaves traces in those sources. A subsequent run can find those error spikes or query histories and use them as clues. True isolation means isolating telemetry and log scopes too.

![Isolate each trial's memory, outputs, and telemetry so agents cannot read other benchmark runs.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/06_isolate_everything_v4_a4b4878c87.png)

There's also a risk of *over*-isolating. If the benchmarking agent doesn't have as many tools as the real agent, it can get confused and skew the results unrealistically.

Here's an example of one of the first dry-runs we tested. It differs from the previous two traces; it wasn't cheating, just following instructions a bit too literally and promised not to write any inbox reports:

![Scout trace showing the agent retaining findings in memory but skipping inbox reports because dry-run reports would be discarded.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/07_trace_dry_run_8d886e28ed.png)

Because the dry-run agent doesn't execute all the steps an actual run would (creating new reports, editing data, and so on), it left blind spots we couldn't test. This was acceptable for scouts since we care more about how they retrieve information than how they store it. The same goes for coding/review agents since they usually work with a copy of the PR in "real" runs anyway, too.

If these types of blind spots are a blocker for your agent, the next best option is to create truly isolated environments where agents can access all tools – but this requires freezing state, too.

## Step 3. Freeze the environment

You can *technically* run hundreds of isolated agents with full tool access against the production database pretty reliably. But this will also interfere with the benchmark because it means state and data is not controlled between runs. You can't compare between them equally since it raises the question: "did this agent's score improve because of the variables we're testing, or because something in the data changed?"

We solved this by moving benchmarks from a "production environment that changes all the time" to a "production environment with the same starting state", i.e., frozen environments. To do this, we had to replicate or simulate our app, inject real (or real-enough) data, and make the agent believe it's a real thing. We call these offline benchmarks.

That's a lot. So why bother?

- Since frozen environments have a fixed starting point, you can easily reset them after every run, solving problems with data leaks. In our case, we run a copy of PostHog inside VMs, delete the VM after each benchmark, and spawn a new one.
- It also means that the agent is actually allowed to change the state, write, create, delete, etc. as we test the task end to end, leaving fewer blind spots.
- As a bonus, because the data stays fixed, the benchmark you did for model X a month or two ago will still be comparable to the benchmark for model Y you did today.

I'm using the word "offline" loosely here since the agents will still need connectivity to call AI endpoints and such. The point is that state is frozen, and can be reset at any time.

We went through three stages to get this working.

### Option A – Mocked MCP replies

The first thing we tried was to track and store traces from the tool calls agents made during their run, including things like what the agent asked and what it got back. For example, what query it ran with `execute_query(sql)` and what slice of the DB it returned:

![An agent calls a mocked MCP tool, which returns a saved response instead of querying a live service.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/08_mcp_mock_ace037214f.png)

This sounds straightforward and worked well for basic tech demos like returning static JSON to SQL queries, but failed miserably on any meaningful production-like work. This is because agents aren't deterministic; the query from Run 1 doesn't guarantee that Run 2 will run the same one.

It's not a big surprise, but it would still be cool if it worked out-of-the-box. Still, the case isn't that desperate, and we tried a couple of tweaks.

### Option B – Trajectory-based mocked MCP replies

The logical next step was to build mock database on \~50 runs instead of just a single run. We checked every trajectory the agent picked, and then mocked those instead.

This seemed promising for a while. To make it even more stable, I'd suggest adding synthetic (or real) data a bit before and/or after every query (so a 24h query still returns true data if the call is skewed a bit).

However, at PostHog, we mostly focus on benchmarking internal tasks, so we decided to go with a hybrid approach. This made it both simpler yet harder to use real data.

### Option C – Restored real-data slices

The solution that actually worked for us was to spin up an isolated PostHog sandbox seeded with a restored, real-world data slice.

On the surface, the idea was simple: query a couple of DB tables (Postgres, ClickHouse), store them as Parquet files in S3, and then restore them in the VM with a local PostHog instance to make it look like the real deal. The bonus: data never leaves PostHog infra.

![Restore a real data slice into an isolated PostHog environment, shifting timestamps together so each benchmark can query the prepared data.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/10_restored_data_slice_v8_ba0f337e6e.png)

The first problem was obvious: "24h" now and "24h" in two weeks are way different "24h". So every time we injected data, we had to correct it to the frozen timeline.

The second problem was less obvious: even if you correct the data, agents are still non-deterministic. That means testing a new model can make it look into tables and data sources you don't expect it to check.

For example, when preparing data for agent feedback, we would clearly sync tables with actual responses and tables with the scouts those responses were left about. But the moment you get a proper model, it will look inside, see that there aren't many users on this local instance, and get suspicious.

![September 30 scout trace showing a missing team roster and the decision to leave reviewers unassigned.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/11_trace_sept30_roster_5787996325.png)

On the other hand, you can, as always, overprepare and make it as realistic as possible on the MCP tools side, while the rest of the data in the local instance doesn't match the scale. Then the agent gets even more suspicious and starts thinking the data is synthetic.

![September 23 scout trace showing the agent questioning whether the data is synthetic.](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/12_trace_sept23_synthetic_ecd98649d3.png)

Basically, once the agent starts treating the investigation as a test, it starts behaving in strange ways like:

- Stopping at a good-enough explanation instead of running extra queries to verify it.
- Spending part of its budget investigating gaps or inconsistencies in the restored data instead of the actual task.
- Returning more speculative findings that it would normally leave out.

Any of those behaviors can negatively affect your benchmark's integrity, since they're not realistic. And, sadly, there's no silver bullet – you just have to run and tweak it over and over again until you stop seeing "the agent suspects something" traces anymore.

## Vibes are cheap, don't skip benching

If you take anything away from this, it's that agents will happily exploit whatever mess you leave behind and cheat. If you want to go with vibes to evaluate models, harnesses, and effort levels, that's okay; vibes can still get you pretty far in many cases.

Building quality benchmarks is properly doable. You just need to watch for unexpected parameters, iterate a lot, and pay attention to traces. In the end, you'll have a solid system that will let you move faster in the long run – especially if you don't repeat the mistakes we made.
