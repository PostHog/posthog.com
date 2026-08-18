---
title: Writing blogs
sidebar: Handbook
showTitle: true
---

Anyone at PostHog can write a blog post, and we'd love you to! You don't need approval or permission from the <SmallTeam slug="editorial" />.

This page covers the basics, whatever your role or topic. If you're an engineer writing about something you built, [writing blogs as an engineer](/handbook/engineering/writing-blogs) goes deeper on tips for that sort of content.

## Why write a blog?

Content is the main pillar of [our marketing strategy](/handbook/content), and blogs are a key piece of that.

It's also good for your career! People who've written good blogs at PostHog have received lots of industry attention and discussion on socials.

Finally, sometimes it's just useful to create a blog as a linkable artifact to explain a topic instead of repeating yourself dozens of times. It can be an "in" to talk to customers or an explanation of how something works at PostHog.

## Is my idea worth writing about?

Our audience is [the people we build for](/handbook/who-we-build-for) including product engineers, founders, and the teams around them. That's a group you have a lot in common with, so if you are excited enough to write something, it's probably worth a blog. But if you're still not sure, you can share the idea in [`#content-and-video-ideas`](https://posthog.slack.com/archives/C015CRUQR7Y).

## Should I write a blog, a newsletter, a tutorial, or a doc?

- **Blog**: An opinion, story, guide, or comparison. Most common.
- **[Newsletter](/handbook/content/newsletter)**: build mode, our weekly Substack issue. Usually more for trending dev topics and designed to be highly actionable. Talk to <TeamMember name="Ian Vanagas" /> first if you want to write one since they're much higher lift than blogs.
- **Tutorial**: Anything that's like "how to do X in PostHog." Usually guides with a single path to follow along through them. Go in `/contents/tutorials`.
- **[Docs](/handbook/wizard-and-docs/docs-style-guide)**: Features, context, resources, and references for tools. Canonical and structured.

## Tips for writing good blogs

Read the [style guide](/handbook/content/posthog-style-guide) for how we write, and [brand foundations](/handbook/brand/foundations) for how we sound. Those two are the source of truth – the rest of this section is only the stuff that's specific to blogs.

### Titles

Having something interesting to say matters more than the title – you can usually find a title to fit a good idea, but no title saves a boring one. That said, the title is what someone judges in search results, in a feed, and in an AI answer, so it's worth spending time on. Some that worked well, and why:

- [I wrote a 70x faster SQL parser while barely looking at the code](/blog/sql-parser) has a specific, surprising number and makes you curious about how.
- [WTF is a forward deployed engineer? (and why everyone is hiring them)](/blog/forward-deployed-engineer) asks about a trendy job title and promises more than a boring definition. It ranked for the "forward deployed engineer" search term which means it gets a lot of traffic from Google.
- [How we're spending our marketing budget in 2026 (with actual $ figures)](/founders/actual-marketing-budget-2026) is good because of the "with actual $ figures".

Avoid being vague or boring ("Our approach to marketing spend"); if a generic B2B SaaS company would write it, we shouldn't, but don't put being funny/clever above being clear.

### How it'll reach people

Decide who the post is for and how it'll reach them *before* you write it, not after you publish. It really influences how you write it. Most blogs will be shared through one of these:

- **Social** – fast and spiky, and how opinionated or surprising posts find their first audience. See the [social media handbook](/handbook/content/social-media) and the [LinkedIn guide](/handbook/content/linkedin).
- **SEO (search and AI answers)** – slow, compounding, and the bulk of our long-term traffic. Right for comparisons, "best X tools" lists, and evergreen guides where there's real search demand. See the [SEO guide](/handbook/content/seo-guide).
- **Product marketing/email** – stuff that's going to be distributed for people already interested in or using PostHog and on one of our product marketing email lists already.

### Drafting

- **Preview as you write.** Draft in this [Google Docs template](https://docs.google.com/document/d/1Jc9p_L79mo3atAikl9LmJY6FXMe2H-hocyTbvxI74PE/edit) to see roughly how the post will look on posthog.com.
- **Don't let AI write the whole thing.** We encourage using AI for research, outlining, and finding the weak spots in an argument, but avoid using it to actually write the sentences. Readers can tell, and we may ask you to rewrite it if it's too obvious.
- **Consider adding internal links for SEO.** The [SEO guide](/handbook/content/seo-guide) covers how many to add and what anchor text to use.
- **Don't sweat the mechanics.** En dashes, sentence case, image sizes – we'll fix anything you miss during review.

## Submitting for review

All blogs must be reviewed by someone on the Editorial Team before publishing.

Before you submit, make sure you have:
1. A **hero image** (grab a template from the [blog graphics Figma](https://www.figma.com/file/tNuNQ0STmx0ve4f1sAv4Ka?node-id=0-1&type=design&mode=design), or [request art](/handbook/brand/art-requests) for something custom), correct [frontmatter](/handbook/content/metadata), and a post that follows the [style guide](/handbook/content/posthog-style-guide). Check the deployment preview on your PR to see how it renders.
2. An author entry in [`src/data/authors.json`](https://github.com/PostHog/posthog.com/blob/master/src/data/authors.json). The `handle` you add there is what goes in the `author` field of your frontmatter – see [metadata](/handbook/content/metadata) for the format.

To submit, simply create **a pull request.** Add your `.md` file to [`/contents/blog`](https://github.com/PostHog/posthog.com/tree/master/contents/blog) in the [posthog.com repo](https://github.com/PostHog/posthog.com). It will automatically add the Editorial Team as reviewers.

If you're already talking to an editor about this blog post, add them individually as a reviewer, too. Otherwise, someone will pick it up shortly. Expect one or two rounds of feedback. If you don't hear back from us within a day, ping the [`#team-editorial`](https://app.slack.com/client/TSS5W8YQZ/C09GU689J1X) channel in slack.

Once it's approved, go ahead and merge to publish!

## Resources

- [Blog post template](https://docs.google.com/document/d/1Jc9p_L79mo3atAikl9LmJY6FXMe2H-hocyTbvxI74PE/edit) – if you'd rather draft in Google Docs
- [Style guide](/handbook/content/posthog-style-guide) – how we write
- [Brand foundations](/handbook/brand/foundations) – how we sound
- [Writing metadata](/handbook/content/metadata) – frontmatter, folders, and tags
- [SEO best practices](/handbook/content/seo-guide) – structure, headlines, and internal linking
- [Social media](/handbook/content/social-media) and [LinkedIn](/handbook/content/linkedin) – how to distribute it
- [Blog graphics Figma](https://www.figma.com/file/tNuNQ0STmx0ve4f1sAv4Ka?node-id=0-1&type=design&mode=design) – hero image templates
- [Art and branding requests](/handbook/brand/art-requests) – for custom artwork
- [MDX components](/handbook/engineering/posthog-com/markdown) – callouts, screenshots, and videos you can use in Markdown
