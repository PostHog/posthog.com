---
title: Writing a blog post
sidebar: Handbook
showTitle: true
---

Anyone at PostHog can write a blog post, and we'd love you to! You don't need approval or permission from the <SmallTeam slug="editorial" />.

**Why write a blog?** Content is the main pillar of [our marketing strategy](/handbook/content), so a good post does more for us than most other marketing we could buy. It's also good for you! A published, well-read piece with your name on it can help your career; past blogs have gotten lots of attention and community discussion on socials. Plus, blogs are reusable so it's great if you want to create a linkable artifact instead of repeating yourself dozens of times.

This page covers the basics, whatever your role or topic. If you're an engineer writing about something you built, [writing blogs as an engineer](/handbook/engineering/writing-blogs) goes deeper on tips for that sort of content.

## Is my idea worth writing about?

Our audience is [the people we build for](/handbook/who-we-build-for) including product engineers, founders, and the teams around them. That's a group you have a lot in common with, so odds are that yes, if you are excited enough to write something about it, it's probably worth doing. But two questions to guide you if you're still not sure:

1. Would you send this to a friend who works at another startup?
2. Would it have been useful to you a year ago?

If you want a sanity check first, you can share the idea in [`#content-and-video-ideas`](https://posthog.slack.com/archives/C015CRUQR7Y). (This is optional, and writing the draft is usually faster than discussing whether to write the draft.)

## What's the difference between a blog, a newsletter, a tutorial, or a doc?

- **Blog**: an opinion, story, guide, or comparison. Goes in `/contents/blog`, or [`/founders`](/founders) and [`/product-engineers`](/product-engineers) if it fits a hub.
- **[Newsletter](/handbook/content/newsletter)**: build mode, our weekly issue. Usually more for trending dev topics and designed to be highly actionable. Talk to <TeamMember name="Ian Vanagas" /> first if you want to write one since they're much higher lift than blogs.
- **Tutorial**: Anything that's like "how to do X in PostHog," with code, usually goes in `/contents/tutorials`.
- **[Docs](/handbook/wizard-and-docs/docs-style-guide)**: More like references for how a feature works.


## Tips for writing good blogs

### Titles

The title is the most important part of the blog. It's what someone judges in search results, in a feed, and in an AI answer. Some that worked well, and why:

- [I wrote a 70x faster SQL parser while barely looking at the code](/blog/sql-parser) – a specific, surprising number and an admission you want explained.
- [WTF is a forward deployed engineer? (and why everyone is hiring them)](/blog/forward-deployed-engineer) – asks the question people are actually typing, then promises more than a definition. Also FDE is just a really trendy title.
- [How we're spending our marketing budget in 2026 (with actual $ figures)](/founders/actual-marketing-budget-2026) – the parenthetical is the whole pitch. Real numbers nobody else publishes.

Avoid being vague or boring ("Our approach to marketing spend"), and don't put being funny/clever above being clear.

### Intro

Almost every draft gets better when you delete the first two paragraphs. Skip the scene-setting, the "in today's fast-paced world," and the summary of what you're about to say. Open with the most interesting thing you know, then explain.

A good intro says what happened or what you're claiming, why the reader should care, and what they'll get out of reading on in the first few sentences.

### Think about the audience

Decide who the post is for and how it'll reach them *before* you write it, not after you publish. It will influence how you write it. Most posts skew heavily in one way:

- **Search and AI answers** – slow, compounding, and the bulk of our long-term traffic. Right for comparisons, "best X tools" lists, and evergreen guides where there's real search demand. Structure and clarity beat cleverness. See the [SEO guide](/handbook/content/seo-guide).
- **Social** – fast and spiky, and how opinionated or surprising posts find their first audience. See the [social media handbook](/handbook/content/social-media) and the [LinkedIn guide](/handbook/content/linkedin).
- **Product marketing/email** – stuff that's going to be distributed for people already interested or using PostHog and on one of our product marketing email lists already.

### Everything else

- **Be opinionated.** "It depends" is not a conclusion. See [avoid hedging](/handbook/content/posthog-style-guide#avoid-hedging).
- **Show your work.** Real numbers, screenshots, and code. Our first-hand experience is super valuable evidence for an argument.
- **Add 3–5 internal links** with descriptive anchor text. You can use the `/suggest-links` command in the posthog.com repo for this.
- **Don't let AI write the whole thing.** We encourage using AI for research, outlining, and finding the weak spots in an argument, but avoid using it to actually write the sentences. Readers can tell, and we may ask you to rewrite it if it's too obvious.
- **Check the style guide.** For mechanics – en dashes, sentence case, image sizes – see the [style guide](/handbook/content/posthog-style-guide). Don't worry about following it too much though, we'll fix anything you miss during review.

## Submitting for review

You can either submit as:

1. **Google Docs.** Start from a Google Doc (we also have a [blog post template](https://docs.google.com/document/d/1Jc9p_L79mo3atAikl9LmJY6FXMe2H-hocyTbvxI74PE/edit) that lets you see how it will look on posthog.com) and share it in [`#team-editorial`](https://app.slack.com/client/TSS5W8YQZ/C09GU689J1X).

2. **A pull request.** Add your `.md` file to [`/contents/blog`](https://github.com/PostHog/posthog.com/tree/master/contents/blog) in the [posthog.com repo](https://github.com/PostHog/posthog.com) and drop the link in `#team-editorial`. If you're already talking to an editor, add them as a reviewer too.

Someone will pick it up shortly. Expect one or two rounds of feedback.

Before you submit, make sure you have a **hero image** (grab a template from the [blog graphics Figma](https://www.figma.com/file/tNuNQ0STmx0ve4f1sAv4Ka?node-id=0-1&type=design&mode=design), or [request art](/handbook/brand/art-requests) for something custom), correct [frontmatter](/handbook/content/metadata), and a post that follows the [style guide](/handbook/content/posthog-style-guide). Check the deployment preview on your PR to see how it renders.


## Resources

- [Blog post template](https://docs.google.com/document/d/1Jc9p_L79mo3atAikl9LmJY6FXMe2H-hocyTbvxI74PE/edit) – if you'd rather draft in Google Docs
- [Style guide](/handbook/content/posthog-style-guide) – how we write
- [Writing metadata](/handbook/content/metadata) – frontmatter, folders, and tags
- [SEO best practices](/handbook/content/seo-guide) – structure, headlines, and internal linking
- [Social media](/handbook/content/social-media) and [LinkedIn](/handbook/content/linkedin) – how to distribute it
- [Blog graphics Figma](https://www.figma.com/file/tNuNQ0STmx0ve4f1sAv4Ka?node-id=0-1&type=design&mode=design) – hero image templates
- [Art and branding requests](/handbook/brand/art-requests) – for custom artwork
- [MDX components](/handbook/engineering/posthog-com/markdown) – callouts, screenshots, and videos you can use in Markdown
