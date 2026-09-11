---
title: Answer engine optimization (AEO)
sidebar: Handbook
showTitle: true
---

## What is AEO?

AEO is about making sure PostHog shows up when someone asks an LLM or a coding agent a question that's relevant to us – whether that's directly about our product, or indirectly about our use case, industry, or competitors – and that it shows up accurately, reflecting what we actually offer today and our current positioning.

More concretely, if someone asks Claude "what's a good session replay tool?", we want to be in that answer, described correctly, with a link back to a page that helps move them through our marketing funnel.

It's roughly what SEO is for search results, with a few important differences.

**We're much more in the dark.** In traditional search we generally know what people typed into the search bar, because search volume data exists, and we know roughly where we rank for it. With answer engines we know neither. There's no volume data for prompts, so we can't tell whether anyone actually asks the questions we track. And there's no fixed ranking to check; the same question can produce a different answer depending on the model, the phrasing, and sometimes just the run.

**The mechanics differ too.** Google sends a crawler, builds an index, and ranks pages. An answer engine does that AND generates prose from what it found, which means it can mention us without linking us, link us without mentioning us, or describe us slightly wrong.

So the work we do for AEO is trying to wrangle all those possibilities toward the best case scenario: our content gets crawled, we're mentioned accurately, we get a link back to a relevant page, and that person signs up.

## Why we care about AEO

Because it's already our biggest acquisition channel by self-reported attribution (meaning what people tell us in the signup form when we ask where they heard about us); bigger than Google, YouTube, Reddit and social combined, and still growing.

Two things make it matter more than that share suggests:

1. **It's systematically under-measured.** Assistants strip referrers, agents pass none at all, and plenty of people read a recommendation and then just type "posthog" into their browser. Whatever our analytics say about AI traffic, the real number is bigger; we only know about some of it because we ask people directly.
2. **Our ICP lives in these tools.** Developers increasingly ask a coding agent what to install, or a chatbot what to evaluate. This is where our audience is making decisions.

It's also a warmer introduction than most channels give us. Someone who asked a question and got told to use PostHog arrives already half-sold, which is not true of an ad for example.

## How AEO actually works and how do we measure it

There are roughly four stages to what we're calling the "AEO funnel".

### 1. Crawling

A bot has to fetch the page before a model can use it. Two different things fetch our content:

- **Index crawlers** (GPTBot, ClaudeBot, PerplexityBot) build the model's picture of the web ahead of time.
- **Live assistants** (Claude Desktop, ChatGPT, NotebookLM) fetch a page in the moment because a user asked something.

Crawled doesn't mean indexed, and indexed doesn't mean used in an answer. But nothing downstream can happen without this step: if a crawler is blocked, we're invisible no matter how good the content is.

### 2. Cited & mentioned

The model produces an answer and either mentions us, links us, both, or neither. Those are two different measurements:

- **Mention rate** (sometimes called visibility) is the share of tracked prompts where we get named in the answer at all, link or no link. Roughly: does the model think of us for this topic?
- **Citation rate** is the share where the answer actually links to a posthog.com URL as a source.

Both move independently.

It's important to note that while a mention doesn't send anyone to the site directly, that doesn't mean it sends nobody. Plenty of people read a mention and then Google us, or type posthog.com straight into the browser, which lands in our analytics labeled as Direct or Organic Search traffic. So mentions are very valuable and are likely doing a lot more work than they appear to, it's just hard to attribute.

### 3. Clicked

Someone acts on the answer and visits our website. This is the stage we measure the worst.

In Google for example, we have a "click-through rate". Search Console tells us how many times a page showed up in results (impressions), how many people clicked, and the ratio between the two.

With answer engines we have none of that.

The first challenge is that **referrers get stripped**. When you click a link, your browser normally passes along a "referrer" – a note telling the destination site which page sent you. That's how our analytics know a visit came from Google or Reddit rather than nowhere. Many assistants don't pass one at all, and coding agents pass nothing by design. The visit still happens, but it arrives looking like the person typed posthog.com straight into their address bar.

Even if referrers worked perfectly, we'd have no objective idea how many answers we appeared in out in the world, only across the handful of prompts we happen to track. No denominator means there's no click-through rate to calculate at all, however good our click data gets.

### 4. Converted

A conversion here means someone signed up after discovering us through an LLM or coding agent.

We currently measure this by looking at what people tell us on the signup form, plus referrer tagging when any survives. Neither dataset is complete on its own, so we take the deduplicated union of both, knowing that's likely a gross underrepresentation of reality, but it's the best proxy we have.

### TL;DR

We keep tabs on all four stages, while acknowledging the limitations alongside all these numbers.

| Stage | What we look at | Source |
| --- | --- | --- |
| Crawled | Bot and agent hits on our pages | PostHog bot/agent analytics |
| Cited, Mentioned | Citation rate and mention rate on tracked prompts (and soon: Agent Preference\*) | Gauge |
| Clicked | Website traffic | PostHog |
| Converted | Self-reported attribution + referrer tagging, deduplicated | PostHog |

Agent preference is a newer way to measure this. Instead of asking a chatbot to recommend tools and counting who gets named, it runs simulated coding sessions: an agent gets a realistic task like "add session replay to this Next.js app" and we watch what it actually installs. We'll start reporting on this soon.

**What good looks like:** all four stages hold their baseline or grow, and when one moves, we can tell which pages caused it and act on it quickly.

## Which prompts we track, and why

Since prompt selection largely determines the result, it's worth being transparent about how we pick ours.

A **tracked prompt** is a question we run against the major models on a regular schedule, recording whether we get mentioned, whether we get cited, and who else shows up. The set is what our citation and mention rates are calculated against, so if the set is junk, so are the numbers.

**How we choose them:**

- **Google search volume as a proxy.** If a lot of people search something, it's reasonable to assume people ask LLMs something similar. Imperfect, but it's the only "volume" data that exists.
- **First-party data from real users.** Our onboarding form asks what people were actually doing when they found us, including the prompts they remember using. This is the closest thing to ground truth we have, and it's small but growing.
- **Bottom-of-funnel intent.** We weight toward prompts where someone is choosing a tool ("best session replay tools", "X vs Y") over prompts where they're learning a concept. The second kind is worth writing for, but it converts differently and shouldn't be mixed into the same number.
- **Organized by product and topic**, so we can see where we're weak rather than just getting one blended figure.

The limitation: search behavior isn't prompt behavior. People phrase things very differently to an LLM than to a search bar – longer, more conversational, with more context about their situation. Our set is a proxy for something we can't observe directly, and we keep refining it as more first-party data comes in.

**What we leave out:** anything where we already know the answer before we run it. That covers prompts with no evidence anyone asks them, and prompts rigged in our favor – showing up for "the best product analytics tool with a fun mascot and a weird name" isn't information.

We've pruned our prompt set aggressively for this reason. A smaller set focused on our ICP tells us more than a large set padded with unreliable and/or unrealistic prompts.

We do track branded prompts like "what is PostHog" as they're useful for checking how accurately we're positioned in the eyes of LLMs, but they're excluded from the visibility calculation.

**Want to poke at this yourself?** We're working on making all of it easier to see. In the meantime, let us know if you'd like access to Gauge, and there's a bot in `#marketing-reporting` you can tag `@AskGauge` to ask questions about our visibility data directly.

## What we control and what we don't

**We control:**

- Whether our content is crawlable at all (robots.txt, CDN rules, 404s)
- How easy our pages are to extract and quote (by using clear headings, front-loaded answers, self-contained sections, etc.)
- How much of a certain topic we cover (depth is an AEO lever; sites with more pages on a topic tend to get cited more on it)
- Technical hygiene: canonicals, duplicate URLs, redirects
- Whether our positioning and pricing are clear, accurate, and consistent across pages

**We don't control:**

- When models refresh their index, or what they retain from a crawl
- Our presence on third-party surfaces like Reddit (for the most part)
- Which prompts real people actually type
- Whether a mention comes with a link
- Industry-wide shifts (for example, models are suddenly citing fewer sources per answer and shifting toward first-party vendor content)

Underneath all of this: **there's no forcing a model to recommend us, or describe us the way we'd like.**

There's no submission form, no bidding system, no account manager to yell at. A model's picture of PostHog is assembled from not just our own content, but also what other people say (or don't say) about us on Reddit, YouTube, G2, comparison roundups, etc.

So the only real strategy is to try to be the source worth choosing: accurate, easy to quote, thorough, and consistent wherever we turn up.

And to accept that a good chunk of what shapes the answer is other people's opinion of us, which we have to earn.

## What we're currently doing about it

1. **Strengthening non-blog pages.** LLM traffic overwhelmingly lands on the homepage, docs, pricing and the evaluative pages such as `/demo`, `/products`, `/about`, so we're making sure those are optimized.
2. **Refreshing and optimizing existing blog content.** Pages decay; models favor current information, and what was the best answer two years ago usually isn't any more. Refreshing keeps our strongest pages holding their spot.
3. **Writing content where the gap is.** We prioritize topics where our visibility is weak and there's real search demand behind it.
4. **Fixing the technical stuff.** Duplicate URLs split citations across several versions of the same page, broken redirects strand pages that used to rank, and a blocked crawler makes everything above pointless.

The specifics change every quarter. For what's currently in flight ping `#team-editorial`.

## Finally: why you shouldn't panic about "brand X is beating us" threads

You've either run into one of these already or you will. They usually show a competitor crushing it on visibility or sentiment across some set of prompts.

It's worth internalizing how easy these are to manufacture, and why.

**There's no ground truth to check against.** No LLM provider publishes what people actually ask it. There's no equivalent of search volume data. So every AEO measurement, ours included, starts by assuming some set of prompts is representative, and nobody can verify that assumption, including the person who made it.

**Which means prompt selection is the result.** Pick prompts where you're strong and you win. Pick prompts where a competitor is strong and they win.

Neither is technically a lie; both are just true of a set somebody chose.

We could produce a thread showing us beating the competition just as easily, and we'd be doing exactly the same trick.

**The underlying data is noisy anyway.** The same prompt can return different answers on different runs, so any single sample is a snapshot rather than a measurement.

Two questions worth asking of any AEO claim, including ours:

1. Who picked the prompts, and is there any evidence people actually ask them?
2. Is this compared to itself over time, or to someone else's number? Citation rate is only meaningful against your own tracked set.

Our strategy is not perfect. We have a lot of blindspots and we try our best to stay honest and grounded about them, but be skeptical of anyone claiming they've "won at this".

There's far too much room to fudge the numbers for these to be taken too seriously.

Ping us in `#team-editorial` if anything here is still unclear.
