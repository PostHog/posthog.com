---
title: Content
sidebar: Handbook
showTitle: true
---

The [blog](/blog) is for telling PostHog stories and sharing updates around our product. We feature a combination of PostHog company news, deep dives on specific product-related topics, PostHog app highlights and stories about company building and the team. 

We currently aim to ship 2 pieces of content per week, one that is product-focused and one that is company-related. Mo writes the company-related content, while product-related content is written by a relevant team member (e.g. developer, product manager) and then edited by Mo. 

We manage an upcoming monthly list of content on a rolling basis [in this sheet](https://docs.google.com/spreadsheets/d/1-6QYxi46d5y88BQ8vdGWmgrFZBbCMs1CAIc5JGLuf4Y/edit?copiedFromTrash#gid=0). We use a list of [the most common keywords](https://github.com/PostHog/meta/issues/14) driving people to PostHog as indicators of which content would be valuable. 

If you have any good blog post ideas join our #ideas-for-blog-post Slack channel - the more opinionated the better!

## Publishing

Submit a PR to [posthog/posthog.com](https://github.com/posthog/posthog.com) with the following content:

- With a new Markdown file (md, mdx) in `/contents/blog/`
- Any assets [optimized](docs/contribute/updating-documentation) and added to a new folder under `contents/images/blog/`
- Each post should have a `featuredImage`. Request one using our [Design Request](/handbook/company/working-with-design) process. (Team Design will [create, optimize and add the image to your issue](/handbook/growth/marketing/exporting-blog-post-image).) Once that's done, be sure to save the post image to the relevant directory.
- You can also choose how the `featuredImage` will be displayed. If your `featuredImage` has text on it (or has a white background), add `featuredImageType: standard` to have the [image sit above the title](https://posthog.com/blog/yc-top-companies). If the `featuredImage` has no text on it, use `featuredImageType: full` to [overlay the title and author name](https://posthog.com/blog/intro-phil-leggetter) on the image.
- The post added to relevant sidebar in `src/sidebars/sidebars.json`
- Add the author of the post ([like in this example](https://github.com/PostHog/posthog.com/blob/master/contents/blog/100-times-more-events.md)). (If this is your first time posting to the blog, add yourself to [Authors.md](https://github.com/PostHog/posthog.com/blob/master/contents/authors.md).)
- Set the date of the blog post to the intended publishing date. (This gives Team Design a heads up on how much time we have to produce a post image.)

Create an annotation on [app.posthog.com](https://app.posthog.com) for the content to track the effect.

Share the live content with out PostHog Users Slack group first, in the `#editorial` channel.

## Distribution

Arrange further promotion via the newsletter, social channels and 3rd party communities.

This section excludes Paid Ads, which are covered elsewhere in the Handbook.

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
