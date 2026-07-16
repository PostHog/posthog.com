---
title: I wrote a 70x faster SQL parser while barely looking at the code
date: 2026-06-24
author:
  - robbie-coomber
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/Blog_Job_Posts_70bb45215b.png
featuredImageType: full
category: Engineering
tags:
  - Engineering
  - AI
  - Inside PostHog
  - Research
---

After the success of using agents to [improve query performance through autoresearch](/blog/karpathy-autoresearch-query-engine-bug), I wanted to try something more ambitious.

I rewrote PostHog's SQL parser using multiple long-running Claude Code sessions in parallel. The result was 16K lines of "hand"-rolled parser code, 5K lines of tooling, a few more K of tests, and a ~70x speed up.

The new parser is equivalent to the previous one for all realistic queries, only differing for a tiny subset of queries written by an evil trickster deity (there’s a test for `SELECT SELECT FROM FROM WHERE WHERE AND AND` which is completely valid SQL).

Here's how I did it and what I learned along the way.

## Why does PostHog even have an SQL parser?

PostHog lets you [access your data directly with SQL](/docs/sql). We transpile your SQL to raw ClickHouse SQL because:

* We want to present a logical view of your data which is independent of the physical layout in the database.

* This lets us change things at the database layer without breaking existing queries.

* We can also add a bunch of performance optimizations and access controls.

The majority of PostHog tools (e.g. product analytics, session replay, error tracking) have queries written in SQL and they go through the exact same transpilation process. But before we can do this transpilation, we need to use a parser to turn the SQL into an AST (Abstract Syntax Tree) that then gets transpiled into ClickHouse SQL. 

The parser is the first thing that touches a query, meaning it operates on untrusted input. Everything downstream, like access controls and optimizations, operate on the tree it produces.

## Generating our parser with ANTLR

We didn't write this parser by hand because, at least pre-AI-coding, parsers were extremely difficult to maintain. Writing one without AI would have taken months and likely not been worth it, even if it had dramatically improved our p95 response time.

Instead, we use [ANTLR](https://github.com/antlr/antlr4), a state-of-the-art, open source parser generator. You provide your grammar declaratively in a [.g4](https://github.com/PostHog/posthog/blob/master/posthog/hogql/grammar/HogQLParser.g4) file and ANTLR generates most of the parser code for you. We use the C++ version, so it’s already in a “fast” language. Unlike our [flags rewrite](/blog/even-faster-more-reliable-flags), the speedup wouldn't just come from moving to Rust.

ANTLR is extremely powerful and flexible, but the trade-off is that it does a lot more work for each token that it visits. It compiles your grammar into an [ATN](https://en.wikipedia.org/wiki/Augmented_transition_network) (essentially an [NFA](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton)-with-a-stack) and has a generic interpreter walk a graph at runtime. There’s no hand-written `parseExpression()`; everything happens through an additional layer of abstraction and indirection. 

Additionally, ANTLR supports arbitrary dynamic lookahead, so if there are multiple possible alternatives it has to simulate every interpretation in lockstep until only one interpretation is valid. It’s extremely well optimized but a graph-walking interpreter can never be as fast as a hand-rolled recursive-descent parser.

## Write a new parser, make no mistakes

With AI, it is much more possible to write and maintain a hand-rolled parser. Sadly, it's not as easy as telling Claude to "write a new parser in Rust, make no mistakes." It did, in fact, make a lot of mistakes, kept doubting whether such a rewrite was even possible, and wanted to call it a day after each round of coding. To be honest, I didn’t really know if it was possible either.

I tested two approaches in parallel:

1. One focused on performance. I knew that, if it worked, the fastest possible parser would be recursive-descent with a Pratt expression loop, adding lookahead and backtracking only where necessary.

2. The other focused on an approach most likely to result in a successful parser. It followed ANTLR’s behavior as closely as possible, but implemented the transitions in explicit code rather than as generic graph traversal.

In the end, both of those approaches worked about as well as each other, but I wouldn’t know this until I’d been working on it for a couple of days.

My goal was complete agreement with the oracle (i.e. the existing C++ parser) for all realistic queries and to get as close as possible for contrived ones. Having an oracle was critical for how I developed the new parser, because I could essentially do test-driven-development by finding some SQL that the parsers disagreed on, fixing the new parser to agree, and repeating.

## Generating disagreement (many ways)

Generating disagreements, or test cases, was pretty easy to start with, because we already had many regression tests written while developing the original parser. Once those were all passing, that’s where things started to get interesting.

### Property-based testing

I had previously found bugs in our SQL transpiler using [Hypothesis](https://github.com/hypothesisworks/hypothesis), a PBT (property-based testing) library. You define some property of your code plus the inputs it takes and it will try to generate inputs where that property does not hold. 

To give a specific example, the property of my new parser is that it agrees with the oracle. The input is an SQL query. This means that Hypothesis is going to try to find an SQL query where my new parser does not agree with the oracle.

I had to tell Hypothesis how to generate interesting SQL so I (with Claude) wrote a tool to codegen an SQL generator based on the ANTLR grammar file. I have to admit that I chuckled a bit when writing a new SQL parser led to writing a new parser for `.g4` files too. Later on, I also added a step to add extra permutations to the generated SQL like swapping tokens or adding parentheses.

### Prompt engineering against brittle fixes

PBT could reliably generate new test cases, and my development loop was working well, but Claude kept making brittle fixes. For example, it would fix one case by adding a one-token lookahead and later realize that it needed a two-token lookahead instead. I was regularly hitting a maxed context window and compacting, so I suspect it had just “forgotten” what the actual grammar or reference parser looked like.

This could be solved by some basic prompt engineering. I simply told it to load both the grammar file and the relevant C++ source code into context immediately before writing any code to fix a particular divergence. This took me longer than I’d like to admit to figure out.

### Maxing out and thinking hard

At this point, I wanted to keep my CPU maxed on PBT and my Claude inference maxed writing the parser, so I wrote some tooling to have the PBT run constantly in the background, writing new failing test cases to a file rather only surfacing them. Claude could fetch them when it had nothing else to work on.

I had a few other ways of generating failing test cases such as pulling anonymized queries from our production query log. Hilariously one of the most effective was to tell Claude to “think really hard about edge cases" in a background agent. 

The two parallel parser approaches shared their regression suites, so any failing test case found in one session was shared with the other.

Hypothesis will also "reduce" test cases for you, turning them into a minimal reproduction, but I couldn’t use that with SQL from other sources. For those I used [ShrinkRay](https://github.com/DRMacIver/shrinkray) instead.

Later on, I added code-coverage-guided test case generation, which gives a better distribution of generated SQL. With coverage feedback, the generator can tell which constructs it hasn't exercised yet and bias towards those. This wasn't necessary to hit 100% accuracy on a production corpus, but it did help me find some very subtle test cases.

## The final iteration loop

The final iteration of my loop looked something like this:

- ⁠Generate new test failures from PBT, real corpus, regression tests, and "think really hard about edge cases"
- Add a shrunk version of the failures to an expanding list of regression tests
- Think hard about the best way to fix this, prefer general solutions if possible, read the grammar and C++ source for how the reference parser handles it
- Make the fix and print a one-paragraph summary for the human operator to read
- Run the regression suite to make sure everything passes
- Re-run the loop autonomously

Due to the new parser being so much faster, I could run this loop in "shadow mode" with our existing C++ parser in production and report if there are any divergences. 

When comparing with the production query log, I only ever tested ~50K queries. In shadow mode, I was able to test millions of parses quickly and there were zero divergences. I’d planned to leave it running for a few days, but that was such a strong result that I switched over production traffic (with a 0.1% “reverse shadow”) after a couple of hours.

## A 454x faster parser and a look into the future

It now produced identical output (AST + source position) to the C++ ANTLR-based parser, and the performance results (in yellow) almost don't look real:

![Benchmark results showing the new parser](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_06_16_at_11_33_56_2x_3fda05e8db.png)

On production queries, it was on average 454x faster than the previous parser. The 70x in the title comes from a benchmark on my laptop, but in production we mostly parse longer SQL that didn’t hit the parser cache.

This was an update for me. It felt extremely empowering to be able to build something that would have taken months for someone with specific knowledge in a couple of days. 

And although I didn’t write any of the code by hand, I wouldn’t call this “vibe-coded” at all. My PBT setup with code-genned inputs based on the grammar file, with coverage-guided generation, is pretty close to the state-of-the-art for parser fuzzing.

It’s interesting to think about what this means for tools like ANTLR. I suspect an AI-based approach like mine will become the new normal. A parser generator will provide the oracle and then an LLM “hand”-rolls a higher performance parser using PBT/fuzzing to make them match.

What specifically did I end up with? Formally, my new parser is a "hand"-written, predominantly predictive recursive-descent parser with a Pratt expression core, an LL(2) cursor widened at specific spots by bounded non-consuming look-ahead probes, plus localized ordered-choice speculative backtracking reserved for the few decisions that need it. It was entirely written by Claude Opus 4.7, in Rust, in May 2026.

[Discuss on Hacker News](https://news.ycombinator.com/item?id=48663544)