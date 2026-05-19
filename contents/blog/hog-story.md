---
title: Why we built languages no one asked for
date: 2025-01-14
author:
 - danilo-campos
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/working_at_posthog_c7c74d7e65.png
featuredImageType: full
tags:
 - People
 - Culture
---

# The language no one asked for

If I had to pick a reason why most people hate most jobs, it’s easy: most jobs want you to turn off your imagination.

Most jobs want you to follow the leader, hit some OKR, do the thing someone wrote into an endless slideshow at the start of a quarter. Most jobs punish you for inconvenient insights and taking initiative.

Most jobs, deep down, want us to be meat robots.

But jobs at PostHog don’t work that way at all. In fact, if you’re deferring to your manager, awaiting direction, you’re failing here. At PostHog, you’re expected to recognize problems as they emerge and solve them directly, without asking anyone’s permission.

This requires an ongoing, healthy relationship with one’s own sense of creativity and vision – which kicks off lots of interesting consequences.

I’ll tell you about my favorite example so far:

A couple years back, Marius Andra – one of our longest-tenured engineers – declared war on JavaScript.

And won.

# PostHog problems

PostHog is a machine that ingests millions of events for each of our customers daily.

These events describe every sort of product behavior, from clicking on buttons to giving up altogether.

This is not a new problem. For as long as the web has existed, its crafters have wondered: who is using my product? How do I get them to do more of what I want? Did my changes help or hurt my goals?

Entire businesses rise and fall to help answer these questions, and even today PostHog competes in a dizzying field of options. To win, PostHog has to do one thing better than everyone:

Make data exploration both intuitive and consequential. We win when we’ve provided the insight for *your* win.

This, it turns out, is a problem difficult enough to kill a company.

## You can’t just hand out SQL access

Marius, like most of my colleagues, has certain values-driven absolutes. One of them is empowerment of the customer.

“The data belongs to you. We should let you ask whatever you want of it,” he says. To his eye this is obvious, factual, on the same shelf as gravity and thermodynamics. “But giving our database's connection string to our users isn’t good for shareholder value,” he sighs, an edge of wryness to this. He means it could knock our business out of existence.

“All of our customers are in one giant table, anyone could break things.”

So the self-determination of the customer and the facts of the technology are in immediate conflict, from the first chapters of the company. Clickhouse, our underlying database technology, provides access controls which could solve this in theory. But in practice, they were too fiddly.

It’s a common adage in computing that you can solve any problem by adding another layer of indirection. In this case, Marius imagined a new query language containing a read-only subset of conventional SQL, eventually named HogQL.

So the war on JavaScript began as an exercise in giving developers the power for arbitrary queries of their data, while guarding against the downsides that could bring down prod, or the business at large.

# Is it your job to have an imagination?

The conventional company does not want us inventing a new programming language *unless* some executive decides it's a good idea.

Top-down command assumes that leadership has both perfect knowledge of the problem space and complete vision into the capacities of the teams who report to them. Such leaders decree a direction and carrot-and-stick their way into compliance with it.

The downside of this approach, of course, is that it's impractical for leaders to know everything. Insight is unevenly distributed, respects no hierarchy, and can emerge at any point of any quarter.

In other words: in a top-down organization, the ceiling of collective intelligence is set by handful of executives and the arbitrary planning processes they impose. This stifles imagination and discourages curiosity.

In that environment, we're not paid to think, we're paid to perform and conform.

This approach would have delayed work on our languages for years, if they ever got started at all. It just seems like a scary amount of work.

## Crafting an interpreter

*Crafting Interpreters* is a friendly book that invites readers on an adventure. There is a long tradition of speaking to the computer through structured language, and any of us can join in. The process is not impossible to know, the ideas not as arcane as they appear.

The problems and solutions are just embedded deep inside tools most of us never touch.

Three years ago, Marius started reading this book for fun over a winter break. He was hooked, and the exercise planted a seed. His imagination had a new conceptual toolset.

Ten months later, confronted with the problem of *data exploration,* that seed burst forth.

# Offer power but make invalid behavior unrepresentable

Building a custom query language would provide PostHog with the opportunity to support complex, customer-specific behaviors, while also defining what behavior is *valid*.

You’re allowed to make arbitrary queries on data, but the interpreter of the language will ensure you’re only touching *your* data. You’re *not* allowed to destroy records, or drop tables.

This is a lot of power to hand to our users, and not something they could easily find in competitors. But was it worth the effort to realize this vision?

Ours is a culture that doesn't fear hard problems, but wasting energy isn't a virtue either.

An obvious and reasonable objection that came up in one of Marius’s [RFC’s](handbook): it would add layers of complexity we would then be responsible for understanding, forever. What happens when it fails, as computing systems inevitably do? How would we debug problems? 

But there were also rewards for this complexity. For one thing, a fully realized HogQL would enable us to nuke a huge pile of technical debt.

A central feature of PostHog product analytics is *insights*: these are the various graphs and tables you can customize and attach to dashboards. Each insight was a tangle of duplicated Python, and working with them was a pain.

The proposed HogQL was powerful enough to both use ourselves – to replace the internals of these [insights]() – while also being something our customers could use to perfectly tailor their own reporting.

HogQL even lowered the costs of building new features, like [Data Warehouse]().

These benefits overcame the uncertainty of the process. It was worth trying.

And it worked: today HogQL is used everywhere in PostHog, and you can use it yourself just as envisioned.

It was the first step to making PostHog into a *platform* where developers could host their own business logic for understanding user behavior in their products.

# Seeing The Matrix with Hog

Queries are necessary but not sufficient for such a platform.

You also need to be able to customize logic and interactions with other systems. This would address a problem nearly every PostHog customer encounters transforming and exporting data.

Deeper in *Crafting Interpreters,* Marius knew, lay the key.

The naive solution to giving developers customizable behavior would be letting them write JavaScript. But there are so many issues with running arbitrary JavaScript at scale.

" We had multiple problems with our JavaScript-based dynamic code execution engine. Security was the major one that just killed it at the end. But the other big problem was that JavaScript is kind of unpredictable. You start a script, and it can just leak promises everywhere," Marius told me.

This just wouldn’t work for code that could be triggered by any individual user event. “ There's some callback that's going to resolve like two hours later and you have no idea that it's out there, eating memory. You do that for tens of thousands of events every minute… That's going to crash.”

This wasn't speculative, either. Our own internal, JavaScript-based plugin engine had these problems all the time. It was impossible to expose the same power to external developers and also keep the product online.

JavaScript was limiting the scope of our ambition.

# What's a bytecode, anyway?

The first phase of our custom language, HogQL, was comparatively simple. The queries are interpreted according rules, then converted into *different* queries. It "runs" by poking the database and returning data.

But Hog, a language that would support logic, loops, making requests, and restructuring data, would need an independent environment from the database to do its work.

So Hog is compiled into *bytecode*, a series of instructions that run in a *virtual machine*, our HogVM. This gives us an environment for execution whose behavior we could completely specify and control.

The HogVM is implemented in both Python and TypeScript. Someday, if we need even more performance, it may be built again in Rust.

Because we control the language and the environment where it runs, we can do some interesting voodoo:

The state of any HogVM instance can be paused, written to a file, and resumed later. This gives us complete control of code execution. Not just the definition of valid or invalid behaviors, but also where and when code runs.

The immediate fruits of this control? [Data pipelines](), where developers can write completely custom logic for integrating PostHog with other tools.

Despite this small but free-form development sandbox, we don’t have to worry that some errant code will pile up and bring down the services that run it. We’ve designed the entire stack from top to bottom to address the precise problem in front of us.

It can’t do everything, but it can do what our customers need to manipulate and export data really well.

# The power to ignore resistance

It would be a reductive to say that *no one* wanted Marius to build this. Culturally, PostHog loves challenges and adventure. There was consensus these were interesting ideas for very cool technology. There was earnest curiosity about upside as much as cost.

But also little consensus about how big that cost might be. One of the big questions: does anyone even want to learn *yet another language*? In this equation, it’s easy for doubts to creep in.

Reviewing years of discussions, Marius could see both the costs and rewards clearly. He was spending a huge amount of time between his imagination and experimentation, and every circuit he made between these realms made him more confident.

“None of this is sorcery, it's just directed engineering effort,” he wrote in a particularly contentious discussion. I could see him struggling to convey the vision, and his counterparts struggling to trust in it, especially against the formidable pressures of keeping a startup alive.

But this lack of shared certainty did not close the path forward. It was enough that Marius was confident enough to keep making progress.

Again, PostHog’s approach to management is to let the people closest to a problem make the decisions on how to solve it. As part of this process, we’re encouraged to solicit opinions on from others who may be affected or who have experience in this space.

But crucially, the handbook [says](https://posthog.com/handbook/company/communication#requests-for-comment-rfcs) this about requests for comment:

> You don't need to reach full agreement to decide, particularly if the decision is reversible. Instead, it should be when the decision maker has considered the feedback and is confident in their decision.
>
> As the decision maker, you should use your judgment as to which comments you want to respond fully to. It's fine to politely decline a question if you think it's not required for the decision being made.

This policy is organizational insurance against the sort of committee thinking and filibustering that de-rails bold decisions. Instead, PostHog explicitly empowers the prime mover of a new direction to take action regardless of opinion.
 
Personal judgment matters, of course. You could use this policy self-destructively, shredding important relationships and social fabric.
 
But in the case of creating our languages, it gave Marius enough room to lay the foundations for the next generation of PostHog technology, even as not everyone shared his certainty.
 
Now, thanks to HogQL and Hog, PostHog gained:
 
 - Much easier to maintain insights in product analytics. These are core features, and the improved developer experience has compound returns each time we onboard someone to that team
 - Data warehouse: the ability to collect, absorb and join data not just from PostHog, but from other services as well. This impacts the value of the company as a whole: we can be a complete solution in this space
 - Data pipelines: completely customizable logic for packaging and transmitting PostHog data, in real time, to external platforms
 - Dashboard reporting which is user-customizable down to the query-level
 - The ability to let our customers, in short, create their own business logic for data collection and reporting, without the overhead of maintaining an entire bespoke reporting platform themselves

These are consequential returns for the investment of building these languages. We now have rich soil for the next generation of PostHog products, just as we’re hitting the point of our trajectory where we need to hire and build more than we ever have.

How many companies failed to carve out resources to invest in the future, caught in a constant [doom loop of tech debt and artificial deadlines](deadlines piece)? I’ve seen it plenty. I bet you have too.

# The business case for imagination

So what can we learn here?

No executive asked for this – we only have three or four anyway. They don’t have the bandwidth to approve every decision, so executive buy-in is not a prerequisite for experimentation or new strategy.

Not everyone understood the true costs or benefits of these investments. Again, not an obstacle. Vetoes are explicitly prevented by our approach to work.

While the organization’s culture was supportive, Marius was also strategic. He built these systems incrementally, solving immediate business problems, creating ROI as early as possible. He didn't disappear for two years on a secret project.

Each stage of progress earned more shared curiosity, confidence and enthusiasm for the next one.

My thing is, it’s a criminal waste of talent that so many companies want to shut down your imagination. Even startups!

So many companies want to be an extension of the will of the founders or the executive team, a plaything more than a system for discovery and success. In that context, any sort of independent thought is threatening and counterproductive.

I’ve always thought that confining imagination to the top of the org chart was like setting money on fire. Why pay all these people not to use their brains?

So it’s exciting to find such a blatant proof for the opposite case: providing enough context to make great decisions, and empowering individual perspectives to experiment, iterate, and build a cleaner path to the future.

It really seems to work.