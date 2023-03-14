---
title: Why we love GitHub as our CMS
date: 2023-03-10
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/posthog-blog-image.png
featuredImageType: full
category: Inside PostHog
tags:
 - Marketing
---

As the amount of content you create grows, inevitably you need some way to manage this. Content management systems, or CMS, are the go-to software solution for this. Examples include WordPress, Drupal, Wix, Ghost, and many more. 

One that doesn’t get thought of as a CMS is GitHub. We use GitHub and love it for three main reasons:

1. Stores content and code together
2. Provides the necessary content creation workflow tools
3. Keeps us engineering-focused

## Content and code together

Content management systems often disconnect content from code. Content lives in the CMS, and code somewhere else. Often, the code is somewhere the marketing team can’t even access it. For example, millions of people use WordPress without ever seeing (or changing) a single line of code.

This disconnects the content from the site, and the user experience is worse because of it. The development of the site and content should align to create a great user experience. Content disconnected from code causes issues. Using GitHub to store everything together prevents this disconnection.

Keeping our content with our code forces both to work together. This prevents content from causing issues on the site. If a piece of content needs a new type of page, work on both to happen simultaneously and for them to launch at the same time. Launches can contain multiple pages, components, and pieces of content seamlessly. As a recent example, see the addition of our [PostHog for startups landing page](https://github.com/PostHog/posthog.com/pull/5451).

![Startup landing page](../images/blog/github-cms/startups.png)

With GitHub as a CMS, we can use code, frameworks, and packages directly without having to rely on integrations with a CMS. We can get the latest updates and innovations from the tools we use to help our website improve. Instead of the effort going into maintaining a CMS connection, it goes into making the site better.

Having code and content in one place enables us to open source. This is a [key value for us](/handbook/company/values#we-are-open-source). Among other things, it forces us to "work with the door open" and allow anyone to contribute. For example:

- Engineers can contribute to site documentation.
- Marketers can fix layout or template issues.
- Readers can fix typos and make suggestions, this makes up ~5% of merged pull requests on our [posthog.com repo](https://github.com/PostHog/posthog.com).

Every time one of these changes happens, it makes our site a bit better in a way that wouldn’t be possible if we weren’t using GitHub. 

## All the necessary tools for your content workflow

GitHub is built for software development, but many of the features work just as well for content development. Take our workflow for example:

1. Create content ideas as issues with a [template](https://github.com/PostHog/posthog.com/issues/new?assignees=andyvan-ph&labels=content&template=blog-post-idea-template.md&title=%7BContent+type%7D+-+%7Btitle%7D). Fill out a strapline, reasoning, and outline. Each issue has an owner.

2. Issues go into a content [project board](https://docs.github.com/en/issues/tracking-your-work-with-issues/planning-and-tracking-work-for-your-team-or-project#adding-issues-to-a-project-board) with columns for the backlog, coming soon (in priority order), in progress, in review, and done.

3. Content gets worked on. When done, the creator opens a pull request (with a [checklist](https://github.com/PostHog/posthog.com/blob/master/.github/pull_request_template.md)), and asks for reviews. [GitHub Actions](/blog/automating-a-software-company-with-github-actions) run for spellcheck and Vercel site previews.

4. Reviewers comment and make suggestions. Creator updates until approved.

5. Content gets merged and changes publish to the production site automatically.

GitHub and a text editor are all we need to go from idea to published content. The features of GitHub provide many benefits to our workflow such as:

- Automation for templates, checklists, spellcheck, review notifications, and site previews.
- Central location for ideas, drafts, team comments, finished content, and revisions.
- Tools for feedback including suggestions, full markdown comments, and comment history.

> The piece that is missing is a content calendar. The solution is to ship content as soon as it is ready. If the content relates to a launch, create a branch with all the changes and merge it as soon as the feature launches.

## Keeps us engineering-focused

At PostHog, [everybody codes](/handbook/company/values#everyone-codes), and our [ideal customers](/blog/creating-ideal-customer-profile) are developers. Using GitHub and combining content and code keeps this top of mind. GitHub is the ideal CMS for engineers and developers because they already use it, and it encourages non-technical people to be more technical.

Developers don’t want to spend time in a CMS. They want to use tools they already know and spend time in. Trying to get a busy developer to contribute on GitHub is easier than trying to get them to contribute in a CMS they aren’t familiar with. This means they make more changes to our site and review content more often. **~40% of [merged pull requests in the posthog.com repo](https://github.com/PostHog/posthog.com/pulls?q=is%3Aclosed) are from people outside of marketing, website, and docs.**

It also encourages our marketing team to be more technical. They must understand how the code and content interact. For example, missing metadata causes an error in the web app. The marketing team can figure out and solve this themselves, rather than asking the development team to do it.

![VSCode screenshot of this blog](../images/blog/github-cms/blog.png)

By using GitHub as a CMS, we stay engineering-focused. Everyone works like an engineer, and that enables us to understand and build a better product for them. This helps PostHog succeed in the long run. 

If your team values engineering focus, adopting GitHub as a CMS is a practical way to make it happen.

## Further reading

- [Developer marketing for early-stage startups – what we’ve learned](/blog/dev-marketing-for-startups)
- [How (and why) our marketing team uses PostHog](/blog/posthog-marketing)
- [Check out our posthog.com repo](https://github.com/PostHog/posthog.com) to explore what using GitHub as a CMS looks like in reality