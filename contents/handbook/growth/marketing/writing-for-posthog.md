---
title: Writing for PostHog
sidebar: Handbook
showTitle: true
---

Good writing is subjective, but it helps to have some common themes. At PostHog, consider the following when writing or reviewing an article:

- **Does it get to the point?** If you're explaining something, don't wait three paragraphs to do so. Start with the explanation and expand later. Almost all articles can be improved by shortening (or removing) the intro.

- **Does it flow?** It's hard to describe, but obvious when you see it. Great articles feel effortless to read. At what point, as a reader, does your attention start to wander?

- **Is it scannable?** Most readers will scan a page before committing to reading it. They're looking for signs it'll answer their question(s) and quality. Use clear headings, diagrams and tables to demonstrate thoroughness.

- **Is it opinionated?** Not all articles are opinions, but all our work should be _opinionated_. Don't sit on the fence. It's better to be slightly wrong, or controversial, than say nothing.

- **Does it pass the Neil test?** Neil (@neilkakkar) is a real product engineer on the PostHog team, and he reads a lot of content! Do you think your article is something he would find either interesting or useful? If not, you may not be writing something relevant to our target audience. (You do not literally need to ask him to read every piece of content - he is very busy.) 

Above all, we write articles, not content. 

Our publishing process is something like this:

## Stage 1 – Create an issue / share an idea

Most articles start life as an idea in the `#content-ideas` Slack channel, or a GitHub issue.

Use [this issue template](https://github.com/PostHog/posthog.com/issues/new?assignees=andyvan-ph&labels=content&projects=&template=blog-post-idea-template.md&title=%7Btitle%7D). Add it to the Content & Marketing project board.

It's worth putting some serious effort into this step. A little time spent defining the "what, why and how" of an article beforehand will pay off down the line.

If you're unsure, post your idea in `#content-ideas` first.

It's particularly important to figure out what search terms you're targeting if it's an SEO article. See [SEO best practices](/handbook/growth/marketing/seo-guide) for more on this.

Ask other team members for feedback on the idea. We rarely say no unless there's a very good reason, but this is an opportunity to refine the idea, headline, and search terms (if applicable).

## Stage 2 – Submitting your first draft

All articles should be submitted as Markdown files (*.md) in a pull request (PR) on the [posthog.com repo](https://github.com/PostHog/posthog.com). 

You'll need to download GitHub Desktop and Visual Studio Code for this. See [Developing the website](https://posthog.com/handbook/engineering/posthog-com/developing-the-website) for how to clone the repo. You don't need a local version of posthog.com as well, but it can be useful.

New posts should be:

- Written in American English using Markdown ([good syntax guide](https://www.markdownguide.org/basic-syntax/))  
- Added to the correct content folder
- Include the necessary frontmatter
- Include links to other articles
- Have internal links to them from other pages
- Follow [our style guide](/handbook/growth/marketing/posthog-style-guide)
- Linked to the corresponding issue (so the issue is closed when the PR is merged)

> **Useful resources:** 
> - [List of tags for each section](/handbook/growth/marketing/tags-and-categories)
> - [Embeddable components you can use](/handbook/growth/marketing/components) (tables, CTAs, etc.)
> - [Andy's guide to SEO best practices](/handbook/growth/marketing/seo-guide)

### Frontmatter

This is the default frontmatter for most posts:

```
---
title: "Your headline here"
date: YYYY-MM-DD
author: ["your-name"]
featuredImage: IMAGE URL
featuredImageType: full
tags:
  - Content tag here
  - Content tag here
  - Content tag here
  - Content tag here
  - Content tag here
---
```

The frontmatter for tutorials is similar, but they don't require a featured image:

```
---
title: "Your headline here"
date: YYY-MM-DD
author: ["your-name"]
tags:
  - Content tag here
  - Content tag here
---
```

### Folders and URLs

The URL is defined by the `folder` it's placed in and the `filename.md` of the markdown file – e.g. a post in the `founders` folder with the filename `i-love-hedgehogs.md` would have the URL `https://posthog.com/founders/i-love-hedgehogs`.

Folders also decide _where_ on the website articles appear.

The main folders are:

- `/contents/blog` – Blog posts
- `/contents/founders` – Articles for the [Founder content hub](/founders).
- `/contents/product-engineers` – Articles for the [Product engineer content hub](/product-engineers)
- `/contents/tutorials` – Tutorials
- `/content/cusomters` – Customer stories
- `/contents/spotlight` – Startup spotlight

**Important:** Some articles can rightfully belong in both the founder hub _and_ the product engineers hub. In this case, choose the most appropriate hub folder and then add the `crosspost:` field to your frontmatter so it appears in both. So, add `crosspost: product-engineers` to post a founder's hub article in product engineers as well, and vice versa. You can also add tags from either hub like normal.

### Adding images, short videos and YouTube embeds

Any images or short videos for your article should be uploaded to the appropriate folder under `/contents/images`. Folders include:

- `/contents/images/blog` – for the blog
- `/contents/images/hubs` – for both content hubs
- `/contents/images/tutorials` – for tutorials

**Best practices:**
- In most cases, PNGs are the ideal file format. Images are optimized for the web and converted to `webp` automatically. That said, don't upload 4K resolution images. Be sensible.

- Please add a subfolder for your article, so the root folder doesn't become a mess.

- _Do not_ upload animated GIFs. They're large and lossy. Instead, record short clips as MP4s using [Screen Studio](https://www.screen.studio/) and add them to your markdown file as you would any normal image.

- When embedding YouTube videos, use YouTube's iframe embed code with the "Enabled privacy-enhanced mode" box ticked. This ensures Google doesn't drop a cookie on our website. You'll know it's enabled if the code includes "https://www.youtube-nocookie.com" in the URL.

- If your article needs custom artwork, please file a request with Lottie. See: [Art and branding requests](/handbook/design/art-requests) for instructions.

## Stage 3 – Feedback and reviews

It's normal for articles to go through at least two rounds of review and amends before being published.

Unless the post is very short, or especially polished, the first round is mainly about high-level feedback. Be clear about areas that need more work, or specific points you want feedback on.

After initial edits, more effort goes into line edits and polish – "production value", structure and flow.


## Stage 4 – Merging and promotion

Once reviewers have approved the PR, it's ready to merge.

Please actually check the PR checklist – e.g. check you've updated the date before merging, add keywords to the Ahrefs rank tracker if it's an SEO article, etc.

You are responsible for promoting and tracking the performance of your own work. 

Consider:
- Posting it in the community Slack
- Sharing it in the #founders-club Slack
- Writing a good tweet 
- Sharing it on LinkedIn
- Posting it on Hacker News or Reddit (be cautious here)
- Asking other team members to like, share, subscribe etc.
- Purchasing fake traffic from Fiver (don't actually do this)
- Creating a dashboard of numbers and stuff

## Stage 5 – SEO specific admin

If your article is an SEO piece, remember to add the relevant keywords to the Ahrefs rank tracker, so we can monitor how the page ranks over time.

If you haven't already, you should also ensure there are internal links pointing to the new page when it's published – see [our SEO guide](/handbook/growth/marketing/seo-guide) for more on that.

> **A short public service announcement from Andy:**
>
> "As an editor, readability / aesthetics are more important to me than following grammar and style rules to the letter. Case in point, while we write in US English, we should always use British-style en dashes with spaces (like – this) rather than US-style em dashes (like—this) because they look nicer. Don't get me started on using hyphens instead (like - this) – that's just wrong. Here's that last sentence with an em dash instead... "Don't get me started on using hyphens instead (like - this)—that's just wrong". Doesn't that em dash look cramped and nasty? Honestly, though, I don't care that much, but I will find and replace every em dash and orphaned hyphen on the website. It's fine. It's not a big deal. I'm cool about it."