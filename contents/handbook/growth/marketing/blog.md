---
title: Content
sidebar: Handbook
showTitle: true
---

Content is a key pillar of our marketing strategy. As our products are quite technical in nature, we believe that frequent and regular content output helps improve acquisition and ongoing product engagement. The [blog](/blog) is where we publish interesting product content, share feature updates, and tell PostHog stories.

## Content & SEO strategy

Content SEO is a long-term strategy. We are focused on generating a sustained output of high quality content that is genuinely valuable to users.

We use [SEMRush](https://www.semrush.com/) to track and optimize our ranking for the keywords that we think are target customers are using to search for solutions like PostHog online. If you need access, please ask Charles. 

The top keywords are then used as the basis of our content strategy. Broadly speaking, we aim for:

- 80% SEO-optimized content, written by the Marketing team. The purpose of these is to build our domain authority and generate a sustained improvement in posthog.com's keyword rankings. 
- 20% brand building and community engagement, written by anyone on the team. These can be about anything, and their purpose is to drive one-off spikes in awareness through virality on sites like Hacker News. 

Andy is currently the main person responsible for our content output.

We manage an upcoming monthly list of content on a rolling basis [in this sheet](https://docs.google.com/spreadsheets/d/1-6QYxi46d5y88BQ8vdGWmgrFZBbCMs1CAIc5JGLuf4Y/edit?copiedFromTrash#gid=0). Further details about our specific content SEO plans can be found on the [Marketing project](https://github.com/orgs/PostHog/projects/8) in GitHub - we don't make the details of these publicly available as it is information that could be beneficial to our competitors. 

If you have any good blog post ideas join our [#ideas-for-blog-post team Slack channel](https://posthog.slack.com/archives/C015CRUQR7Y). Community members can suggest them to Andy Vandervell directly or via [the User slack channel](/slack)!

## Content categories

As we have a few different places where content lives on our site, follow these guidelines to figure out where your content fits best. Sometimes you will find that the content you've created fits better in Docs rather than on the Blog. 

- **Blog post** = Virtually all SEO-specific content (e.g. 7 best open source analytics solutions); brand building content (e.g. for Hacker News).
- **Docs - Tutorial** = Anything that explains 'how to do X' _that is specific to PostHog_. This includes content created for SEO purposes that explains how do something in PostHog (e.g. how to build an AARRR funnel).
- **Docs - User guide** = Specific guides to PostHog features (e.g. Actions, Funnels). 
- **Docs - Everything else** = Everything else product-specific that isn't covered above (e.g. deployment documentation). 

## Production workflow

Our content production workflow is as follows:

* **Create a GitHub issue**: Create [a new blog post issue in the posthog.com repo](https://github.com/PostHog/posthog.com/issues/new?assignees=&labels=Marketing&template=blog-post-idea-template.md&title=Blog+post%3A+%7Btitle%7D). Use the **New blog post idea** issue template. Fill in the required information as well as adding any additional information that you feel is beneficial to someone reviewing the issue. Add this issue to [the Marketing GitHub project](https://github.com/orgs/PostHog/projects/8).
* **Shoot a video (optional):** This could be an interview, talk, panel discussion, or tutorial recording. We’ll eventually edit this down to about half or a third of its size.
  * Content interviews usually take 40-60 minutes, and we generate 20-30 questions for each interviewee. These questions range from their career history to their current role and product, plus a few personal questions to add flavor to the interview. Here’s [an example](https://www.youtube.com/watch?v=gMYWond64lM) of one we did with Eltje.
  * We also do intro interviews, which is where we get to know new hires. These can take anywhere from 15-30 minutes and have fewer questions than a content interview.
  * HogTalks are Zoom sessions where we invite an expert to speak on a specific topic. We package these videos for upload to our YouTube channel - no blog post required, just a transcript where appropriate. Here’s [an example](https://www.youtube.com/watch?v=JvjK-YA9Ieo). 
  * The engineering team sometimes creates tutorials that we use to explain certain PostHog features. These can be turned into blog posts in their own right. Here’s [an example](https://www.youtube.com/watch?v=3_yH24Bh0HE). 
* **Get the transcript (optional):** We use [Rev.com](https://rev.com) to pull the transcript from the video. Rev also lets you get a quick draft in just a few minutes, though we recommend waiting for the proper version, which can take anywhere from a few hours if ‘rushed’ - which costs extra - to a day or two.
* **Write the blog post:** We write up a concise blog post about the discussion or tutorial (with the help of the transcript, if available). This is where we add more context to the topic and include links to other content for further reading. The length of a blog post can vary wildly. If based on a video a 60-minute interview usually yields a ~1,500-word blog post.
* **Get feedback:** Once written, if the blog post is to be published on the PostHog blog, push it to GitHub and create a Pull Request for feedback. See [Publishing](#publishing) for more information. If the blog post is going to be published on an external site, use Google Docs to get feedback.
* **Artwork:** We put an emphasis on the visual quality of the content we ship. If you're writing a blog post, you'll need an image to accompany it. If you're creating a video, you'll need a poster image (the still image that displays before you click play). Add the [Artwork project board](https://github.com/orgs/PostHog/projects/14) in your issue or PR at least several days in advance of when you'll need it. [Learn more in the Publishing section below.](#publishing)
  * **Note:** Not all posts get custom artwork. We prioritize creating custom art for posts that are anticipated to receive high traffic, will likely end up on HackerNews, or will be promoted on social media or in promoted posts. However we do have a library of hedgehog-themed art and topic-based artwork that may be used or repurposed for posts that don't receive custom artwork.
* **Extract the audio from the edited video (optional):** This goes into the podcast.
* **Amplify the content:** After the blog post is complete, we pull snippets from it and schedule them for publishing across social media platforms and encourage the rest of the PostHog team to share within their networks. The blog post GitHub issue provides an "amplification checklist" that should be followed. Note that we generally discourage the use of hashtags on Twitter, especially when used mid-tweet. 

### Publishing

Our [content calendar](https://docs.google.com/spreadsheets/d/1-6QYxi46d5y88BQ8vdGWmgrFZBbCMs1CAIc5JGLuf4Y/edit) is our source of truth for blog content.

Submit a PR to [posthog/posthog.com](https://github.com/posthog/posthog.com) with the following content:

- With a new Markdown file (md, mdx) in `/contents/blog/`
- Any assets [optimized](/docs/contribute/contribute-to-website) and added to a new folder under `contents/images/blog/`
- Each post should have a `featuredImage`. Request one by tagging the [Artwork project board](https://github.com/orgs/PostHog/projects/14). Please ensure you have a target publish date specified in the [content calendar](https://docs.google.com/spreadsheets/d/1-6QYxi46d5y88BQ8vdGWmgrFZBbCMs1CAIc5JGLuf4Y/edit) - at least 3 working days out, so we have time to produce artwork. (Lottie or Cory will [create, optimize and add the image to your issue](/handbook/growth/marketing/exporting-blog-post-image).) Once that's done, be sure to save the post image to the relevant directory.
- You can also choose how the `featuredImage` will be displayed. If your `featuredImage` has text on it (or has a white background), add `featuredImageType: standard` to have the [image sit above the title](https://posthog.com/blog/yc-top-companies). If the `featuredImage` has no text on it, use `featuredImageType: full` to [overlay the title and author name](https://posthog.com/blog/intro-phil-leggetter) on the image.
- The post added to the sidebar in `src/sidebars/sidebars.json`
- Add the author of the post as an array (not a string), [like in this example](https://github.com/PostHog/posthog.com/blob/master/contents/blog/100-times-more-events.md). If this is your first time posting to the blog, add yourself to [authors.json](https://github.com/PostHog/posthog.com/blob/master/src/data/authors.json).
- Add a keywords field to the frontmatter. Keywords should be added as an array, not a string. This enables [our internal linker](https://github.com/PostHog/internallinker) to automatically link internal pages with similar keywords.
- Assign the post categories (you can use more than one) using `categories` in the frontmatter section. The available categories are **Inside PostHog**, **Product Updates**, **Engineering**, **Product Analytics**, **Guides**, **Open Source**, **Privacy**, **Startups** and **CEO diaries**. Categories should be listed as an array and can be written one of two ways:

  ```
  categories:
    - CEO diaries
    - General
  ```
 
  ```
  categories: ["CEO diaries", "General"]
  ```
  
- Add a meta description using `description` in the frontmatter section (optional)
- Set the date of the blog post to the intended publishing date in the format `YYYY-MM-DD`. (This gives Team Design a heads up on how much time we have to produce a post image.)
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
keywords: ["fundraise", "fundraising"]
featuredImage: ../images/blog/series-b/series-b-baby.png
featuredImageType: full
author: ["joe-martin"]
categories: ["Product Analytics", "Guides"]
---
 ```

### Distribution

The [blog post GitHub issue template](https://github.com/PostHog/posthog.com/blob/master/.github/ISSUE_TEMPLATE/blog-post-idea-template.md) outlines how the content should be amplified and distributed. This can and should be edited for each post using the team's experience and ideas to identify what's best on a post-by-post basis.

This section excludes [Paid Ads](/handbook/growth/marketing/paid), which are covered elsewhere in the Handbook.
