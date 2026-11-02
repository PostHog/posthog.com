---
title: How we built an FDE brain
date: 2026-11-02
author:
  - jon-su
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/Blog_Job_Posts_70bb45215b.png
featuredImageType: full
category: Inside PostHog
tags:
  - AI
  - Inside PostHog
  - Engineering
seo:
  metaTitle: 'How we built an FDE brain'
  metaDescription: "How PostHog's forward deployed engineers made their work compound: a markdown repo of customer questions, decisions, and playbooks that agents can query."
---

When I joined PostHog's [Forward Deployed Engineering](/blog/forward-deployed-engineer) team three months ago, a well-meaning friend told me: "FDEs are glorified consultants. The FDE model doesn't scale."

It's an age-old adage. A services model delivers value through projects, so more value needs more projects. And more projects need more FDEs (see scientifically proven graph below). But we don't accept the status quo easily at PostHog. So we set out to see if we could solve this dilemma.

![Customer value versus FDE headcount](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/customer_value_graph_8ece181b27.png)

## The problem

We believe headcount only becomes the bottleneck because of operational inefficiency. That's a solvable problem. The inefficiencies come from three common causes:

1. **Every engagement is scoped from scratch:** When a new project comes in, the team scopes it from zero. Give the same project to 10 teams and you'll get 10 different scopes and methods.
2. **The same questions, solved from scratch:** When a customer asks a question, nobody records the answer. So when the same question comes up again, someone researches it from zero. Lessons from one engagement never reach the next.
3. **Tribal knowledge and scattered context:** Nobody records why a decision was made. That context gets lost, or scattered across Google Drive, Notion, buried Slack threads, and emails. Worst of all, it sits on someone's local machine.

## The solution

Our founding FDE [Joshua](/community/profiles/32997) came up with the idea of an FDE brain. It builds on Andrej Karpathy's [LLM Wiki design](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). That approach turns raw documents into a markdown knowledge base an LLM can query.

Similarly our FDE brain is a GitHub repository full of markdown files. Its job is to capture the work that [compounds across customers](/handbook/forward-deployed-engineering/how-we-work#compounding-work).

Every engagement teaches us something we can reuse as a starting point for the next one. We call this compounding work, because it benefits future customers too. Examples include:
- a recurring question
- a design pattern that worked
- where a process failed and what lesson was learned

We follow a rule of thumb we call the "compounding ladder". Knowledge usually starts as a customer question. Once answered, we generalize it into a reference answer for similar questions. Over time, we spot lessons as that answer gets used in the wild. Eventually it becomes a written standard and playbook for the team, backed by reusable skills.

![The compounding ladder](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/compounding_ladder_42349d4523.png)


The brain's job is to capture this knowledge in a strict, schema-governed repository. That way the team's knowledge gains weight with every project. And it stays accessible to the FDE team and other PostHog teams.

The long-term goal is a self-improving loop. Future engagements start further ahead. We also feed product intelligence back into PostHog. Sometimes that's a bug fix. Sometimes it's input for a product team building a new feature or closing a gap.

## How it works

![The hourglass model](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hourglass_model_4da204d81c.png)

Our FDE brain follows an hourglass design, also known as a narrow waist design.

The brain's repository (on the right) holds the team's playbooks, project lessons, decision records, and customer folders. It also holds our internal skills and tooling. Almost 90% of it is plain markdown. The only magic we've added is a machine-enforced schema for each record type.

Here's the schema for our `deliverable` record type. A deliverable records an artifact we shipped to a customer during an engagement:

```
# Deliverable schema.
# Location: customers/<customer>/deliverables/

type: deliverable
definition: A finalized artifact shipped to a customer.
lives: "What you delivered goes where the customer wants it, in the format they prefer, and this record links to that live copy."   # what is specific to where this type lives; its store's own line comes first (structure.yaml `store_lives:`)

# Frontmatter assembly (compose_frontmatter): on-disk key order + drop-if-empty optionals.
frontmatter:
  order: [title, type, customer, status, audience, author, created, updated, delivery, engagement_type, product, milestone, shipped, live_url, approved_by, impact, supersedes, overrides, improvements, proof_source, proof]
  optional: [product, milestone, shipped, live_url, approved_by, impact, supersedes, proof_source, proof]

required_fields:
  - delivery
  - engagement_type
  - overrides
  - improvements

# A required field binds records created on or after its date, so the
# deliverables that predate the requirement stay valid without a backfill.
required_since:
  overrides: 2026-09-18
  improvements: 2026-09-18

optional_fields:
  - milestone      # the piece of the engagement this record belongs to, as its short code; a customer's manifest may require it
  - shipped
  - live_url            # the live copy: the notebook, dashboard, insight or pull request this record is the source of
  - approved_by
  - impact         # what the deliverable changed for the customer, when there is a measure
  - proof_source   # a trusted source of the customer that proves it (operational/config/ledger.yaml)
  - proof          # the check that source's type asks for: a query, a command, or a link and a quote
  - supersedes

status_values:
  - draft
  - review
  - shipped
  - superseded

# In what format was the deliverable shipped
delivery_values:
  - slack-canvas
  - slack-message
  - notebook
  - notebook-brief
  - email
  - proposal
  - document
  - report
  - docx
  - codebase-prompt
  - guide
  - dashboard
  - insight
  - annotation
  - pull-request

reference_fields:
  - supersedes
customer_required: true
```

This gives every record a predefined shape. Query it with an LLM (or anything else) and you get the same answer every time.

Day to day, each FDE works wherever they prefer, and in-progress work can live in different systems. The end goal is to promote that work into the team brain. Then the knowledge is visible and transparent internally. Ideally, the brain is where all FDE work ends up, as a centralized source of truth.

For example, I work in Zed, inside a personal vault that mirrors our team brain. Engagement context might get discussed in Slack. Customer meetings get transcribed in Granola. Or you might be working on actual code.

That's why we call it an hourglass. The work happens in lots of places. But it all passes through one narrow entry point, our capture pipeline. It turns that work into a strictly defined, shared record in the brain.

Here's how we promote work from local environments into the brain:

1. A local Claude Skill turns my work into the right record type, then opens a PR for it.
2. A GitHub workflow polls Granola daily for our standup meetings. It creates `meeting` and team `decision` records from the transcripts.
3. I use the Slack MCP to pull customer comms from Slack into the brain as `reference` records.


But wait, doesn't requiring a pull request for every addition slow us down? Well, yes and no.

To stop pull requests becoming the bottleneck, we added validation gates that must pass before a merge. Because the checks run upfront, contributors know they're unlikely to break anything. And every contribution meets a quality bar.

The gates we currently have:

- `validate`: Blocks a PR when a record does not meet its predefined schema
- `engine`: Blocks a PR when the tests for the repo fail
- `prose`: Blocks a PR when Vale finds an error in a customer deliverable
- `pr-checks`: Blocks a PR whose title isn't a conventional commit or whose description is missing template sections
- `changeset`: Blocks a PR that changes a core system file without a changeset

On top of these gates, an automated PR triage system checks which files a PR changes. Then it picks a path:

- auto-merge
- a quick review from the contributor
- a full peer review from another FDE

![PR triage flow](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/pr_triage_bd1548f7a1.png)

## Our biggest lesson

Early on, we learned that people like to work in different ways and places. So we made the brain surface-agnostic. You can query it from a local Git copy, API routes, or a local or remote MCP. Even the PostHog agent in Slack can read from it!

![Every surface that can query the FDE brain](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/fde_brain_6d06ae5e06.png)

## What's next

We didn't build the brain only as a team knowledge base. Earlier, we said an FDE team's value is usually tied to individual customer projects.

The bigger FDE vision is to bring customer learnings and feedback back into PostHog as product intelligence. That benefits every PostHog customer. Real customer work is a stress test for PostHog in the wild. It's sometimes the quickest way to expose real integration problems or product gaps. We think this [compounding work](/handbook/forward-deployed-engineering/how-we-work#compounding-work) is where FDE work will create the most value.

So we need to take what worked for one customer and scale it out to N customers. The FDE brain is the mechanism we built to do that.

Here are some experiments we're running to feed improvements back to PostHog and our customers:

1. We sync our curated FDE skills from the brain into the PostHog Skill store. Customer Success and Technical Account Managers can then use the same tooling with their own customers.

![FDE audit skills in the PostHog Skill store](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/skill_store_fde_audit_skills_c720f6984d.png)

2. Once skills are hardened in production, we ship them in the [PostHog Wizard](/docs/ai-engineering/ai-wizard), which every customer can self-serve. One example is the Wizard's [audit subcommands](/docs/ai-engineering/ai-wizard#audit-subcommands). They let any customer run an automated health check on their PostHog setup.

3. We also recently built a Papercuts Candidate [Scout](/blog/what-is-a-scout), a small agent that runs on a cron. It looks for product problems: bugs, SDK gaps, or missing docs. Every week it reads deliverables in the brain and our team Slack channel. When it finds a product gap, it writes up the finding with evidence from an FDE engagement. It can also open a fix for the gap as a follow-up. One recent fix from this Scout was [not counting a missing user agent string as a bot on server and mobile SDK events](https://github.com/PostHog/posthog/pull/119634).

![The Papercuts Candidate Scout's finding on server and mobile events classed as bots](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/papercuts_scout_finding_af1e3386e8.png)

The biggest benefit of the FDE brain is a solid foundation anyone can build on. People can add their own tools, automations, and interfaces without touching the brain's structure. So, do you think the FDE model can scale?
