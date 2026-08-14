---
title: Writing a blog post
sidebar: Handbook
showTitle: true
---

Anyone at PostHog can write a blog post, and we'd love you to. You don't need approval, a slot in a content calendar, or permission from the <SmallTeam slug="editorial" />. You need an idea and a pull request.

It's worth doing. Content is the main pillar of [our marketing strategy](/handbook/content), so a good post does more for us than most other marketing we could buy. It's also good for you – a published, well-read piece with your name on it is durable and portable in a way a Slack message isn't – and it saves you explaining the same thing twice, because now you can link to it. We also just [make things public by default](/handbook/values#make-it-public).

This page covers the basics, whatever your role or topic. If you're an engineer writing about something you built, [writing blogs as an engineer](/handbook/engineering/writing-blogs) goes deeper on that case.

## Is my idea good enough?

Our audience is [the people we build for](/handbook/who-we-build-for): product engineers, founders, and the teams around them. That's a group you have a lot in common with, so the test is simple:

1. Would you send this to a friend who works at another startup?
2. Would it have been useful to you a year ago?

If yes to either, write it. The things that feel obvious to you are usually the things nobody else has written down.

If you want a sanity check first, share the idea in [`#content-and-video-ideas`](https://posthog.slack.com/archives/C015CRUQR7Y). This is optional, and writing the draft is usually faster than discussing whether to write the draft.

## Blog, newsletter, tutorial, or docs?

- **Blog** – an opinion, story, guide, or comparison. Goes in `/contents/blog`, or [`/founders`](/founders) and [`/product-engineers`](/product-engineers) if it fits a hub.
- **[Newsletter](/handbook/content/newsletter)** – build mode, our weekly issue. If your idea only makes sense this week, it's probably a newsletter. Talk to <TeamMember name="Ian Vanagas" /> first.
- **Tutorial** – "how to do X in PostHog," with code, in `/contents/tutorials`.
- **[Docs](/handbook/wizard-and-docs/docs-style-guide)** – the reference for how a feature works.

Tiebreaker: docs and tutorials answer "how do I do this?" Blogs answer "why should I care?"

## Writing a good one

### Titles

The title does most of the work – it's what someone judges in search results, in a feed, and in an AI answer. Write it early (a title you can't write is usually a post you haven't figured out yet) and rewrite it at the end.

Some that work, and why:

- [I wrote a 70x faster SQL parser while barely looking at the code](/blog/sql-parser) – a specific, surprising number and an admission you want explained.
- [WTF is a forward deployed engineer? (and why everyone is hiring them)](/blog/forward-deployed-engineer) – asks the question people are actually typing, then promises more than a definition.
- [How we're spending our marketing budget in 2026 (with actual $ figures)](/founders/actual-marketing-budget-2026) – the parenthetical is the whole pitch. Real numbers nobody else publishes.
- [8 best open source analytics tools you can self-host](/blog/best-open-source-analytics-tools) – not witty, but it matches how people search. That's the job for SEO posts.

The failure modes are being vague ("Our approach to marketing spend") and being clever at the cost of clear. If a reader can't tell what the post is about, the pun wasn't worth it.

### Intros

Almost every draft gets better when you delete the first two paragraphs. Skip the scene-setting, the "in today's fast-paced world," and the summary of what you're about to say. Open with the most interesting thing you know, then explain.

A good intro says what happened or what you're claiming, why the reader should care, and what they'll get out of reading on – in a few sentences.

### Think about the audience

Decide who the post is for and how it'll reach them *before* you write it, not after you publish. Most posts skew heavily one way:

- **Search and AI answers** – slow, compounding, and the bulk of our long-term traffic. Right for comparisons, "best X tools" lists, and evergreen guides where there's real search demand. Structure and clarity beat cleverness. See the [SEO guide](/handbook/content/seo-guide).
- **Social** – fast and spiky, and how opinionated or surprising posts find their first audience. See the [social media handbook](/handbook/content/social-media) and the [LinkedIn guide](/handbook/content/linkedin).

This changes what you write, not just how you promote it. The ideal SEO title and the ideal social title are rarely the same sentence.

### The rest

- **Lead with the answer, then add the nuance.** Good for skimmers, and it's how LLMs pick what to quote.
- **Use descriptive headings.** "We cut p99 latency by 90%" tells a skimmer more than "Results."
- **Be opinionated.** "It depends" is not a conclusion. See [avoid hedging](/handbook/content/posthog-style-guide#avoid-hedging).
- **Show your work.** Real numbers, screenshots, and code. Our first-hand experience is the whole advantage.
- **Add 3–5 internal links** with descriptive anchor text.
- **Don't let AI write it.** It's genuinely useful for research, outlining, line edits, and finding the weak spots in an argument. It's not useful for the prose – readers notice, and they discount everything after they notice.

For mechanics – en dashes, sentence case, image sizes – see the [style guide](/handbook/content/posthog-style-guide). Read it once, then stop worrying about it. Editorial fixes this during review.

## Submitting for review

Two ways, both fine:

1. **Google Docs.** Start from the [blog post template](https://docs.google.com/document/d/1Jc9p_L79mo3atAikl9LmJY6FXMe2H-hocyTbvxI74PE/edit) and share it in [`#team-editorial`](https://app.slack.com/client/TSS5W8YQZ/C09GU689J1X).

2. **A pull request.** Add your `.md` file to [`/contents/blog`](https://github.com/PostHog/posthog.com/tree/master/contents/blog) in the [posthog.com repo](https://github.com/PostHog/posthog.com) and drop the link in `#team-editorial`. If you're already talking to an editor, add them as a reviewer too.

Someone will pick it up shortly. Expect one or two rounds of feedback.

Before you submit, make sure you have a **hero image** (grab a template from the [blog graphics Figma](https://www.figma.com/file/tNuNQ0STmx0ve4f1sAv4Ka?node-id=0-1&type=design&mode=design), or [request art](/handbook/brand/art-requests) for something custom), correct [frontmatter](/handbook/content/metadata), and a post that follows the [style guide](/handbook/content/posthog-style-guide). Check the deployment preview on your PR to see how it renders.

Once it's approved, merge it. That publishes it.

## Resources

- [Blog post template](https://docs.google.com/document/d/1Jc9p_L79mo3atAikl9LmJY6FXMe2H-hocyTbvxI74PE/edit) – if you'd rather draft in Google Docs
- [Style guide](/handbook/content/posthog-style-guide) – how we write
- [Writing metadata](/handbook/content/metadata) – frontmatter, folders, and tags
- [SEO best practices](/handbook/content/seo-guide) – structure, headlines, and internal linking
- [Social media](/handbook/content/social-media) and [LinkedIn](/handbook/content/linkedin) – how to distribute it
- [Blog graphics Figma](https://www.figma.com/file/tNuNQ0STmx0ve4f1sAv4Ka?node-id=0-1&type=design&mode=design) – hero image templates
- [Art and branding requests](/handbook/brand/art-requests) – for custom artwork
- [MDX components](/handbook/engineering/posthog-com/markdown) – callouts, screenshots, and videos you can use in Markdown
