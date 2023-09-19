---
title: Content
sidebar: Handbook
showTitle: true
---

Content is the main pillar of our marketing strategy. As our products are quite technical in nature, we believe that frequent and regular content output helps improve acquisition and ongoing product engagement. The [blog](/blog) is where we publish interesting product content, share feature updates, and tell PostHog stories.

**Other useful links:**
- [PostHog style guide](/handbook/growth/marketing/posthog-style-guide)
- [Exporting a blog post image](/handbook/growth/marketing/exporting-blog-post-image)

## Content strategy

Content is a long-term strategy and we're focused on high-quality content that's genuinely valuable to users. Our strategy is to go _deeper_ and create better content as we grow, not simply push out more articles for its own sake. For this reason, we never set ourselves specific content output targets.

We **win on depth**, not breadth – a few high-quality pieces > a larger number of medium quality pieces. We have four content buckets:

1. **Top-of-funnel SEO content:** Our goals with this content is to improve our topical authority, generate inbound demand, and create brand awareness. This content includes list articles like the [best GA4 alternatives for apps and websites](/blog/ga4-alternatives), comparisons like [PostHog vs LogRocket](/blog/posthog-vs-logrocket), in-depth technical deep dives like [ClickHouse vs Snowflake](/blog/clickhouse-vs-snowflake), and explainers like [What is a product engineer (and why they're awesome)](/blog/what-is-a-product-engineer). It's mostly written by the marketing team and posted on the blog.

2. **Tutorials:** The purpose of tutorials is to encourage new signups (because we show potential users how to solve their problems using PostHog), and help customers expand usage. Some tutorials are also SEO-optimized, especially when they cover general topics, such as [How to set up Next.js analytics, feature flags, and more](/tutorials/nextjs-analytics). It's mostly written by the marketing team and published in the tutorials section.

3. **Brand building:** Can be written by anyone on the team, with the marketing team acting as editors. The purpose is to drive one-off spikes in awareness through virality on sites like Hacker News and Reddit, share our culture / vision / philosophy. Examples include [10x engineers talk to users](/blog/10x-engineers-do-user-interviews), [What we've learned about dev tool marketing](/blog/dev-marketing-for-startups), and [Raising money is less stressful than bootstrapping](/blog/vc-or-bootstrap). This content is posted on the blog.

4. **Behind-the-scenes:** Content about what we're doing at PostHog. This can also be brand building content, but is more directly relevant to our existing customers. Examples include [All the cool things we built at our Rome hackathon](/blog/rome-hackathon) and the [weekly changelog blog post](/blog/posthog-changelog). This content is posted on the blog.

### Good to knows

- The marketing team is responsible for all the above – mostly Andy and Ian, but James Hawkins, Joe and Charles also contribute. The Website & Docs team owns our [reference documentation](/docs). 

- You can view planned content on the [Marketing project board](https://github.com/orgs/PostHog/projects/8?card_filter_query=label%3Acontent) using the "content" label filter. All planned content should have an issue.

- Join our [#content-ideas Slack channel](https://posthog.slack.com/archives/C015CRUQR7Y) to share ad-hoc ideas. If people like it, we'll turn it into an issue.

## Production workflow

* **Create a GitHub issue**: Create [a new blog post issue in the posthog.com repo](https://github.com/PostHog/posthog.com/issues/new?assignees=&labels=Marketing&template=blog-post-idea-template.md&title=Blog+post%3A+%7Btitle%7D). Use the **New blog post idea** issue template. Fill in the required information as well as adding any additional information that you feel is beneficial to someone reviewing the issue. Add this issue to [the Marketing GitHub project](https://github.com/orgs/PostHog/projects/8).

* **Write the blog post:** We write up a concise blog post about the discussion or tutorial (with the help of the transcript, if available). This is where we add more context to the topic and include links to other content for further reading. The length of a blog post can vary wildly. If based on a video a 60-minute interview usually yields a ~1,500-word blog post.

* **Get feedback:** Once written, if the blog post is to be published on the PostHog blog, push it to GitHub and create a Pull Request for feedback. See [Publishing](#publishing) for more information. If the blog post is going to be published on an external site, use Google Docs to get feedback.

* **Artwork:** Things that are more interesting to the eye are more likely to be clicked on. Each blog post or tutorial need an accompanying image. [Learn more in the Publishing section below.](#publishing)

### Publishing to the blog

Our [Marketing project board](https://github.com/orgs/PostHog/projects/8?card_filter_query=label%3Acontent) is our source of truth for all content. We use the 'content' label for all issues and PRs.

Submit a PR to [posthog/posthog.com](https://github.com/posthog/posthog.com) with the following content:

- A new Markdown file (md, mdx) in `/contents/blog/`

- Any assets added to a new folder under `contents/images/blog/`

- Each post should have artwork. If you deem your post worthy of custom art, add the [Artwork project board](https://github.com/orgs/PostHog/projects/14) to your post's issue. Please ensure you have a target publish date specified in the issue - at least 3 working days out, so we have time to produce artwork. Lottie will [create the artwork and add the image to your issue](/handbook/growth/marketing/exporting-blog-post-image).) Once that's done, be sure to save the post image to the relevant directory.

  - We encourage custom artwork on posts that will be (or are likely to be) amplified, whether paid or organic. But we also maintain a library of reusable artwork. Andy will select an appropriate image in this scenario.

   - Blog artwork is displayed in three places: above the post itself, on the `/blog` index page, and is also used as the post's [Open Graph image](https://ogp.me/). 

  - We have two display modes for how the post image and title appear. Use the `featuredImage` property in the post's frontmatter like in [this example](https://github.com/PostHog/posthog.com/blob/master/contents/blog/100-times-more-events.md).
    1. If the post's image has a white background or has text that needs to be unobfuscated, use `featuredImageType: standard`. (This will prevent our [Open Graph Image generator](/blog/dynamic-open-graph-images) from overlaying the title and author info on the image, and will [stack the artwork and blog title](/blog/yc-top-companies) on the actual blog post page.)
    1. Otherwise, use `featuredImageType: full`. This should generally be used unless you're sure you need the above option.

- Add the author of the post as an array (not a string), [like in this example](https://github.com/PostHog/posthog.com/blob/master/contents/blog/100-times-more-events.md). If this is your first time posting to the blog, add yourself to [authors.json](https://github.com/PostHog/posthog.com/blob/master/src/data/authors.json).

- Assign the post **just one** `category` and any relevant tags using `category` and `tags` in the frontmatter section, as follows:

  ```
  category: Startups
  ```
 
  ```
  tags:
    - Guides
    - Open source
  ```

The following are our pre-approved categories and tags. Please **don't create new ones without Andy's approval:**

> **Categories:**
>
> - **Inside PostHog:** Behind-the-scenes on our culture, what we’re doing
> - **Using PostHog:** Guides about doing stuff in PostHog
> - **PostHog news:** Product updates, release notes and announcements
> - **CEO diaries:** Insights from James Hawkins
> - **Startups:** Guides and insights on startup life
> - **HogMail:** The PostHog newsletter on the blog
> - **Product growth:** Guides about product analytics, growth hacking et al.
> - **Engineering:** Blogs about engineering at PostHog
> - **General:** Category for blog posts with no obvious category

>**Tags:**
>
> - **Guides:** Any and all guides from all categories (actionable)
> - **Explainers:** Blogs explaining a concept or idea (non-actionable)
> - **Product analytics:** Blogs about about product analytics
> - **Product metrics:** Blogs about metrics and what to track
> - **Product engineers:** Blog posts about product engineers
> - **Session recording:** Blogs about using session recording
> - **Feature flags:** Blogs about using feature flags
> - **Marketing**: Blogs about marketing
> - **Privacy:** Blogs about GDPR and other fun stuff
> - **Open source:** Blogs about open source products and projects
> - **Release notes:** PostHog release notes
> - **Product updates:** General product updates
> - **Comparisons:** Comparisons with PostHog and similar
> - **ClickHouse**: Blogs about ClickHouse
> - **Y Combinator:** Blogs about YC

- Add a meta description using `description` in the frontmatter section (optional)

- Set the date of the blog post to the intended publishing date in the format `YYYY-MM-DD`. Posts dated [in the future](https://github.com/PostHog/posthog.com/pull/2964) won't display on the site until their specified date, though a build is required day-of in order to publish the post. (The Website & Docs team or other Vercel admins can kick off a manual build.)

- Create an annotation on [app.posthog.com](https://app.posthog.com) for the content to track the effect.

Fully completed and correct frontmatter should look like this: 

 ```
 ---
date: 2021-06-10
title: PostHog raises $15 million Series B for open source product analytics
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/series-b/series-b-baby.png
featuredImageType: full
author:
  - joe-martin
  - andy-vandervell
category: PostHog news
tags:
  - Product updates
  - Release notes
---
 ```

## Distribution channels

We repurpose and distribute content in a mixture of channels - those we want to be good at, and those we put minimal effort into out of habit and good practice.

### High effort

- SEO - _Andy and Ian_
- Newsletter - _Andy and Ian_
- PostHog Twitter - _Andy (outsourced to Mouneil)_
- James' personal Twitter - _Andy (outsourced to Mouneil)_

### Low effort/hygiene

- PostHog LinkedIn - _whoever wrote the content_
- User Slack - _whoever wrote the content_
- Hacker News - _only for Show HN announcements, otherwise do not post here and hope others do it outside PostHog_
- LinkedIn paid ads - _Charles (outsourced to Hey)_
- Twitter paid ads - _Charles (outsourced to Hey)_
