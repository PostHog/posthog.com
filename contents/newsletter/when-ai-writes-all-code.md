---
title: What happens to engineers when AI writes all the code?
date: 2026-09-14
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/eng_web_18f6a136e7.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: What happens to engineers when AI writes all the code?
  metaDescription: >-
    Agents now open 70% of PostHog's monorepo PRs. Here are the five things
    engineers do now instead of writing code, and why the loop matters more than
    the code.
---

We are plausibly coming to a moment where AI will write all the code. This is a reality for many developers already. Over the last 4 months at PostHog, we moved from around [20% of our monorepo PRs](/blog/10k-prs-a-month) being opened by agents to 70%.

This breaks the definition of engineer as "someone who writes code." But no one thinks engineers will go extinct as soon as this happens. Anthropic has claimed "[coding is largely solved](https://www.youtube.com/watch?v=We7BZVKbCVw)," yet it has 208 open roles with "engineer" in the title.

So what will engineers be doing?

## 1. Monitoring the situation

Engineers spend a lot of time monitoring running agents, fixing errors, responding to customer requests, evaluating competitors, checking dashboards, strategizing on their role in company priorities, learning new workflows, and babysitting outstanding PRs.

I sum this up as "monitoring the situation." The result of it is ideas and observations of how they can improve.

![Monitor the situation diagram](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/monitor_45b5fb8653.png)

Engineers did a lot of this before, especially [product engineers](/product-engineer/what-is-a-product-engineer), but AI has amplified it. AI increased the amount of information an engineer can process, but it also increased expectations from managers and customers about productivity and polish.

This means engineers can't be waiting for the right information to come to them. The best ones now create systems to get the information they need at the right time. This is part [loop engineering](/newsletter/loops) and part [context engineering](/newsletter/fix-your-agents). Engineers at PostHog have [standup bots](/blog/standup-bot-revenge), repo summary [scouts](/blog/what-is-a-scout), [custom setups](https://www.talyn.dev) for monitoring in-progress PRs, [feedback surveys](/surveys), [changelog](/changelog) automations, anomaly [alerts](/docs/alerts), and more.

Why is doing all this important? Because without this information, you will likely end up working on the wrong thing and not know it. Knowing all the possible things you could be working on enables you to prioritize and pick the right one.

<NewsletterForm />

## 2. Setting direction

Software might be [increasingly driving itself](/blog/what-if-your-product-built-itself), but you still need to say where you want it to go. This requires synthesizing and analyzing what you observed to figure out what is valuable and worth acting on.

![Set the direction diagram](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/orient_3e80439796.png)

Based on the input an engineer receives, there will be hundreds of potential paths. In the past, product managers or execs might have been responsible for picking the best ones, but it's now increasingly up to engineers.

Our [requests for comments](/newsletter/choosing-technologies#4-we-make-decisions-asynchronously) repos are an example of what this looks like. They contain nearly 1,000 direction-setting decisions on topics like [dashboard MCP improvements](https://github.com/PostHog/requests-for-comments-public/pull/551), [environments](https://github.com/PostHog/requests-for-comments-public/pull/176), and [picking programming languages](http://github.com/PostHog/requests-for-comments-public/pull/71). We can look at [an RFC for a unified health page](https://github.com/PostHog/requests-for-comments-public/pull/475/changes) as a specific example. It filters information through:

- **Personal experience and opinions.** Rafa wrote it and the decision was ultimately his, with others adding their thoughts. As a specific example, he predicts: "We have 4 of them right now, but 3 of them were created in the last couple months, so they might start proliferating."

- **Importance to users, customers, and company.** The problem statement details the many surfaces for diagnostic information and the problem this creates for users: discoverability, each health page providing an incomplete picture, and the developer overhead of maintaining each one.

- **Technical feasibility.** The design outlines the specific architecture using Dagster to run checks and store them in Postgres. It also includes how [PostHog AI](/ai) can use this data to provide suggestions.

- **How it fits into the broader competitive landscape.** Unifying the health page automates a problem the Onboarding team regularly runs into with customers when setting them up for long-term success. Healthier setups are better for our customers and for us.

Without a clear direction, you can feel productive without actually making progress. AI makes this worse by enabling you to add anything you can think of easily. The direction and experience of your entire product can become clouded by features that aren't what users actually want or you can be quickly led down the wrong path that's hard to reverse.

## 3. Deciding how to build and implement

Engineers might not be writing code, but they are still deciding what code gets written. A direction leads to many smaller decisions. Each decision is a hypothesis of what can be built to make progress towards the direction you're going.

What this often looks like is deciding on scope. This requires knowing the codebase, what's possible, what agents are capable of, and their blind spots.

![Decide how to build and implement diagram](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/decide_f04198da11.png)

The importance of this is made clear when I compare myself against real engineers. As a marketer, I monitor the situation and think about the direction products should be going in. I make feature requests and can use agents to implement them, but just the ability to generate code, even in the right direction, is not necessarily good engineering.

For example, I wanted the ability to send AI user interviews as a link rather than an email. Although I could have asked an agent to build it, Paul's reply shows the knowledge I lacked for making a good implementation decision.

![Slack conversation feature request](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/f6f82d12_8492_47d0_ae26_02d32ef6a170_1630x988_7450bd71cb.webp)

I wouldn't have known to accept `distinct_id` and `session_id` as query parameters, to throttle requests, or to look at hosted surveys for inspiration like Paul did. At best, my agents would have taken many more tokens to get to the same solution. At worst, they would have introduced bugs and attack vectors.

It's this understanding of the problem area, implementation details, and structure that enables engineers to ask the right questions and follow up to get a solution shipped.

## 4. Evaluating the work of your agents

This is the point where engineers would have been writing the code. Now, they just tell the agent to do it and that's it, right?

Sadly, not yet. Engineers still need to evaluate whether it was **built right**.

![Evaluate the work of your agents diagram](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/evaluate_8fe7fd9afc.png)

This is done through [code reviews](/newsletter/code-review-tips) and asking questions like:

- Did the agent actually follow directions?

- How is the code quality of this change?

- Did the tests pass? If not, how do I make them pass?

With the volume of changes coming from agents, this quickly becomes a bottleneck. If you are generating 20 PRs per day, reading every line and running them by hand is unrealistic. You need new systems, like review and testing agents, to keep up while ensuring the code you ship is good.

For example, many of our engineers have their own custom-built code review and PR management setups. Tom on our warehouse sources team built [Talyn](https://www.talyn.dev/) as a "mission control" for his PRs, our DevEx team built [speedy virtual machines](https://github.com/PostHog/posthog/tree/master/tools/hogbox-preview) to preview changes, and we've already written about Paul's [code review setup](/newsletter/code-review-tips).

Systems like these are necessary when engineers are seeing a dramatic increase in the amount of pull requests they need to review. At PostHog, we went from 1,441 PRs merged in January to 4,869 in August while only growing engineering headcount 10%.

## 5. Improving the entire loop

This process doesn't just end. It loops repeatedly. What you build and ship leads to new observations like "are people using what we built?"

The loop isn't just linear either. Stages feed back on each other:

- The information you find valuable while **setting direction** informs how you **monitor the situation**: what information you pay more attention to and what you ignore.

- How well a **decision** gets built informs the scope of **what you'll decide for agents to build next**. Seeing an agent flail and make mistakes leads you to reduce the scope of its future tasks.

- The functionality and usage of **what you built** informs whether it was the **right direction**, giving you experience and updating your knowledge on agent capabilities, technical feasibility, and customer demand.

It's not just one big loop, but many smaller loops as well. The consequence of this is engineers doing more work on the system that builds the product than the product itself. They build the [software factory](/newsletter/software-factories) rather than the software.

![Feedback loops diagram](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/feedback_50ac41a398.png)

The growing capability of agents means there are cases where you can skip much of the loop too. Agents often only really need direction and the right tools to ship a valuable fix. With these, they can then figure out what to build, how to build it, and evaluate whether it actually worked. Here's a real example from PostHog:

- **Direction** is encoded into a prompt for a [Scout](/blog/what-is-a-scout), a long-running agent that makes sense of all your data. In this case, we have one that aims to improve our [MCP server](/docs/model-context-protocol), an important surface for our ICP of AI-pilled developers.

- Based on **observations** from `mcp feedback submitted` events and `mcp_tool_call` error rates, the Scout finds agents want to define catalog events before they have been ingested and use an ugly workaround to do so. Related observations are grouped and become a report.

- This report triggers an agent to **[write a fix](https://github.com/PostHog/posthog/pull/90832)**, which is **reviewed** by another agent before escalating for human review. It wasn't auto-approved because the review found 2 "must fix" issues.

- After the fix ships, another agent **evaluates** whether issues are actually solved. It does this by keeping notes in its scratchpad about what was reported, what shipped, and validates that the fix holds before considering a report closed.

In this case, the monitoring, deciding, and evaluation were all handled by the agent, the direction to improve the MCP server was implicitly guiding it, and our product improved without us needing to do anything. We call this making your product [self-driving](/self-driving).

But even this case is reliant on your skills and knowledge as an engineer. Writing code might be cheap, but your system for building a product isn't. All your sources of information, your way of setting direction, your implementation knowledge, the way you evaluate what was built, and the connections between these stages becomes what makes you and your product unique.

![Full loop diagram](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/full_d125a57485.png)

<Caption>Yes, this is a version of the <a href="https://en.wikipedia.org/wiki/OODA_loop">OODA loop</a>. Credit John Boyd.</Caption>

This is all still engineering work. It just doesn't look like it once did.

<NewsletterForm />
