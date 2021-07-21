---
title: Blog
sidebar: Handbook
showTitle: true
---

The [blog](/blog) is for telling PostHog stories and updates around our product positioning.

Accessible content with jokes, memes and gifs have done well.

## Successful Hacker News topics

A successful post on Hacker News can currently increase traffic by 5-10%.

Stories about PostHog's early hustling days have done well.

- Feb 20, 2020 [Launch HN: PostHog (YC W20) – open-source product analytics](https://news.ycombinator.com/item?id=22376732)
- Feb 28, 2020 [Our experience moving to SF to do YC](https://posthog.com/blog/moving-to-sf/)
- Jun 2020 [How we raised $3M for an open source project](https://posthog.com/blog/raising-3m-for-os)
- Jan 2020 [A story about pivots](https://posthog.com/blog/story-about-pivots)

## Future topic areas

We want to start writing stories about our team, customers and community.

To view and contribute blog post ideas join our #ideas-for-blog-post Slack channel.

Todo: organize the blog post ideas into topic categories and priority list.

## Publishing

Submit a PR to [posthog/posthog.com](https://github.com/posthog/posthog.com) with the following content:

- With a new Markdown file (md, mdx) in `/contents/blog/`
- Any assets [optimized](docs/contribute/updating-documentation) and added to a new folder under `contents/images/blog/`
- Each post should have a `featuredImage`. Request one using our [Design Request](/handbook/company/working-with-design) process. (Team Design will [create, optimize and add the image to your issue](/handbook/growth/marketing/exporting-blog-post-image).) Once that's done, be sure to save the post image to the relevant directory.
- The post added to relevant sidebar in `src/sidebars/sidebars.json`
- Add the author of the post ([like in this example](https://github.com/PostHog/posthog.com/blob/master/contents/blog/100-times-more-events.md)). (If this is your first time posting to the blog, add yourself to [Authors.md](https://github.com/PostHog/posthog.com/blob/master/contents/authors.md).)
- Set the date of the blog post to the intended publishing date. (This gives Team Design a heads up on how much time we have to produce a post image.)

Create an annotation on [app.posthog.com](https://app.posthog.com) for the content to track the effect.

Share the live content with out PostHog Users Slack group first, in the `#editorial` channel.

Arrange further promotion via the newsletter, social channels and 3rd party communities.

## PostHog Array

The PostHog Array is our product release series.

It's named the PostHog Array, because hedgehogs are collectively known as an *array* of hedgehogs.

Yakko adds new items to the Array ;) by gathering changes and highlights from PRs and the engineering team.

Each array includes:
- a community MVP
- a summary of new features, improvements and fixes
- important announcements e.g. deprecations
- detailed overview of each change with an image/video
- community shoutout for other contributors
- open roles
- complete list of PRs included

Before merging and distributing the release post, check with Tim that the new version has been released.
