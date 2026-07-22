---
title: Writing blogs as an engineer
sidebar: Handbook
showTitle: true
---

We write and publish a lot of content at PostHog. <SmallTeam slug="editorial" /> focuses on this, but we also publish writing on our blog from anyone, including engineers. These usually look like:

1. Guides like [A beginner's guide to testing AI agents](/blog/testing-ai-agents) 

2. Technical blogs about experiences and lessons learned like [Karpathy's Autoresearch found a 3-year-old bug in our query engine (and improved performance by 11%)](/blog/karpathy-autoresearch-query-engine-bug), [Untangling Tokio and Rayon in production: From 2s latency spikes to 94ms flat](/blog/untangling-rayon-and-tokio), and [8 learnings from 1 year of agents](/blog/8-learnings-from-1-year-of-agents-posthog-ai)

3. Opinionated blogs like [Being AI-native matters more than experience](/blog/ai-native-hiring) and [AI is killing no-code experiments](/blog/ai-is-killing-no-code-experiments)

Why do we encourage writing blog posts?

- You're doing cool things, others should know about it. PostHog [values making it public](/handbook/values#make-it-public).
- It helps us attract users, customers, and talented teammates. 
- It's a reference point you can point at for future engineers, customers, and teammates.

##  What to write about

PostHog's audience ([ICP](/handbook/who-we-build-for)) is the same as you: the people building products at high-growth startups. This means the posts you're interested in are likely the same as what they're interested in. 

There's a couple of frames that can help you decide if something is interesting enough to write about:

1.  Is it interesting enough to write up and sending to an engineering friend? 
2. Would it be useful for you two years ago? 

If yes, then it's probably interesting enough to blog about. There's a huge amount that is obvious to you but not obvious to others. You're more of an expert than you think you are, especially when it comes to your personal experiences. 

## How to write

Start by thinking about a reader's perspective: What will be interesting or useful to them? What do you want readers to come away remembering? 

Don't worry about some "PostHog designated style," there is no such thing. Write like you would in an email, Slack message, or RFC. Read through [our style guide](/handbook/content/posthog-style-guide) though, especially the first **General principles** section, but don't obsess over perfectly following it. The <SmallTeam slug="editorial" /> can help you and there's always exceptions. 

AI is helpful for research, outlining, line-editing, and finding weak spots, but please don't get it to write the entire piece for you. Readers can tell when something is written by AI and discount it. 

If you need a skeleton of post, many technical blogs look like this:

1. **Hook:** The surprising result or pain you experience.
2. **Context:** What the state of things were. Enough so readers can follow.
3. **Journey:** The investigation of what you tried, what failed, and what succeeded. Include the "takeaways" as part of the journey.
4. **Resolution:** What actually changed? Give specifics, numbers, and/or visuals if you can.

Use descriptive titles along the way rather generic ones like "Background" or "What we learned." If someone was skimming the piece, would the title give them the details they were looking for?

## The details about publishing

The general workflow for a post looks like this:

1. Have an idea.

2. Share in the [`#content-and-video-ideas`](https://posthog.slack.com/archives/C015CRUQR7Y) Slack channel. This is optional, but useful if you want feedback on the idea first. You can also just write up an outline or draft right away.

3. Open pull request of your draft in [posthog.com](https://github.com/PostHog/posthog.com). Blogs go in the [`/contents/blog` folder](https://github.com/PostHog/posthog.com/tree/master/contents/blog) (you can see the format from other blogs there).

4. Get review from someone from the <SmallTeam slug="editorial" /> and (optionally) a relevant teammate. If you're not sure who to ask, message the [`#team-editorial`](https://app.slack.com/client/TSS5W8YQZ/C09GU689J1X) Slack channel with a link to your PR.

5. Iterate on feedback (usual 1-2 rounds).

6. Fix formatting and styling details (<SmallTeam slug="editorial" /> can help with this). Check the deployment preview to see how it looks.

7. Merge and it's automatically published on [posthog.com](/blog).

Once published, you can share it on social ([LinkedIn](/handbook/content/linkedin), X, Bluesky, etc.), with relevant coworkers, and in relevant communities (like HackerNews, but be careful not to spam or ask for upvotes). This might feel a little cringe, but it's critical for actually getting people to read your writing.

Remember, you're the driver on all of this. You don't need someone's approval to write a blog.
