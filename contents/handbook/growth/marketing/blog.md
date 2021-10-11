---
title: Content
sidebar: Handbook
showTitle: true
---

The [blog](/blog) is for telling PostHog stories and sharing updates around our product. We feature a combination of PostHog company news, deep dives on specific product-related topics, PostHog app highlights and stories about company building and the team. 

We currently aim to ship 2 pieces of content per week, one that is product-focused and one that is company-related. Mo writes the company-related content, while product-related content is written by a relevant team member (e.g. developer, product manager) and then edited by Mo. 

We manage an upcoming monthly list of content on a rolling basis [in this sheet](https://docs.google.com/spreadsheets/d/1-6QYxi46d5y88BQ8vdGWmgrFZBbCMs1CAIc5JGLuf4Y/edit?copiedFromTrash#gid=0). We use a list of [the most common keywords](https://github.com/PostHog/meta/issues/14) driving people to PostHog as indicators of which content would be valuable. 

If you have any good blog post ideas join our #ideas-for-blog-post Slack channel - the more opinionated the better!

## Workflow

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

## Publishing

Our [content calendar](https://docs.google.com/spreadsheets/d/1-6QYxi46d5y88BQ8vdGWmgrFZBbCMs1CAIc5JGLuf4Y/edit) is our source of truth for blog content.

Submit a PR to [posthog/posthog.com](https://github.com/posthog/posthog.com) with the following content:

- With a new Markdown file (md, mdx) in `/contents/blog/`
- Any assets [optimized](/docs/contribute/updating-documentation) and added to a new folder under `contents/images/blog/`
- Each post should have a `featuredImage`. Request one by tagging the [Artwork project board](https://github.com/orgs/PostHog/projects/14). Please ensure you have a target publish date specified in the [content calendar](https://docs.google.com/spreadsheets/d/1-6QYxi46d5y88BQ8vdGWmgrFZBbCMs1CAIc5JGLuf4Y/edit) - at least 3 working days out, so we have time to produce artwork. (Lottie or Cory will [create, optimize and add the image to your issue](/handbook/growth/marketing/exporting-blog-post-image).) Once that's done, be sure to save the post image to the relevant directory.
- You can also choose how the `featuredImage` will be displayed. If your `featuredImage` has text on it (or has a white background), add `featuredImageType: standard` to have the [image sit above the title](https://posthog.com/blog/yc-top-companies). If the `featuredImage` has no text on it, use `featuredImageType: full` to [overlay the title and author name](https://posthog.com/blog/intro-phil-leggetter) on the image.
- The post added to the sidebar in `src/sidebars/sidebars.json`
- Add the author of the post ([like in this example](https://github.com/PostHog/posthog.com/blob/master/contents/blog/100-times-more-events.md)). (If this is your first time posting to the blog, add yourself to [Authors.md](https://github.com/PostHog/posthog.com/blob/master/contents/authors.md).)
- Assign the post a category using `categories` in the frontmatter section. The available categories are **General**, **Company & culture**, **Engineering**, **Release notes**, **CEO diaries**. Categories should be listed as an array and can be written one of two ways:

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

## Distribution

The [blog post GitHub issue template](https://github.com/PostHog/posthog.com/blob/master/.github/ISSUE_TEMPLATE/blog-post-idea-template.md) outlines how the content should be amplified and distributed. This can and should be edited for each post using the team's experience and ideas to identify what's best on a post-by-post basis.

This section excludes [Paid Ads](/handbook/growth/marketing/paid), which are covered elsewhere in the Handbook.
