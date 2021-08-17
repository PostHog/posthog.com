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

* **Shoot a video (optional):** This could be an interview, talk, panel discussion, or tutorial recording. We’ll eventually edit this down to about half or a third of its size.
  * Content interviews usually take 40-60 minutes, and we generate 20-30 questions for each interviewee. These questions range from their career history to their current role and product, plus a few personal questions to add flavor to the interview. Here’s [an example](https://www.youtube.com/watch?v=gMYWond64lM) of one we did with Eltje.
  * We also do intro interviews, which is where we get to know new hires. These can take anywhere from 15-30 minutes and have fewer questions than a content interview.
  * HogTalks are Zoom sessions where we invite an expert to speak on a specific topic. We package these videos for upload to our YouTube channel - no blog post required, just a transcript where appropriate. Here’s [an example](https://www.youtube.com/watch?v=JvjK-YA9Ieo). 
  * The engineering team sometimes creates tutorials that we use to explain certain PostHog features. These can be turned into blog posts in their own right. Here’s [an example](https://www.youtube.com/watch?v=3_yH24Bh0HE). 
* **Get the transcript:** We use [Rev.com](https://rev.com) to pull the transcript from the video. Rev also lets you get a quick draft in just a few minutes, though we recommend waiting for the proper version, which can take anywhere from a few hours if ‘rushed’ - which costs extra - to a day or two.
* **Write the blog post:** Using the transcript, we write up a concise blog post about the discussion or tutorial. This is where we add more context to the topic and include links to other content for further reading. The length of a blog post can vary wildly depending on how long the video is (which is a function of how thoughtful and in-depth the questions are), but a 60-minute interview usually yields a ~1,500-word blog post. This is also the part where we publish it to GitHub for feedback and request artwork from our design team.
* **Design requests:** If the content requires a visual element, create a [design request](https://posthog.com/handbook/company/working-with-design) (at least 2 days in advance) to have a graphic produced. For example, if the content is a YouTube video, we'll make a thumbnail image. If it's a blog post, we'll create a post image that is featured at the top of the post.

* **Extract the audio from the edited video:** This goes into the podcast.
* **Post to social media:** After the blog post is complete, we pull snippets from it and schedule them for publishing across your platforms. Post a link to the article/video on our `#editorial` channel in the PostHog Users Slack group. This group should always the first to hear about new content.




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

This section excludes [Paid Ads](/handbook/growth/marketing/paid), which are covered elsewhere in the Handbook.
