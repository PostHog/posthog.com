---
title: Writing metadata
sidebar: Handbook
showTitle: true
---

Every piece of writing we do has metadata included in it.

## URLs and content folders

The URL is defined by the folder it's placed in and the `filename.md` of the markdown file - e.g. a post in the `founders` folder with the filename `i-love-hedgehogs.md` would have the URL `/founders/i-love-hedgehogs`.

Folders also decide _where_ on the website articles appear.

The main folders are:

- `/contents/docs` - Docs.
- `/contents/blog` - A catch-all posts section. Company announcements, technical deep dives, SEO-focused comparisons, and more.
- `/contents/founders` - Posts written for founders.
- `/contents/product-engineers` - Posts written for product engineers.
- `/contents/newsletter` - Newsletters republished from Product for Engineers.
- `/contents/tutorials` - Tutorials
- `/contents/customers` - Customer stories
- `/contents/spotlight` - Startup spotlight
- `/contents/handbook` - The PostHog company handbook

**Important:** Some articles can rightfully belong in both the founder hub _and_ the product engineers hub. In this case, choose the most appropriate hub folder and then add the `crosspost:` field to your frontmatter so it appears in both. So, add `crosspost: product-engineers` to post a founder's hub article in product engineers as well, and vice versa. You can also add tags from either hub like normal.

## Frontmatter


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
date: YYYY-MM-DD
author: ["your-name"]
tags:
  - Content tag here
  - Content tag here
---
```

> **Note:** Each handle in the `author` field must match a handle in the `authors.json` file. If you're a first-time author, add yourself to `authors.json` in the [authors data file](https://github.com/PostHog/posthog.com/blob/master/src/data/authors.json) using this format:
> ```json
> {
>   "handle": "your-handle", // This is what you'll use in the author field
>   "name": "Your name",
>   "role": "Your role at PostHog",
>   "link_type": "linkedin", // Or "twitter", "github", etc.
>   "link_url": "https://www.linkedin.com/in/yourprofile",
>   "profile_id": 12345 // Your community profile ID from posthog.com/community/profiles/[ID]
> }
> ```

## Tags

Below is a complete list of tags, organized by section. 

You can use tags from the Founder's hub in product engineer posts, and vice versa, if you're crossposting the article.

### Founder's hub

- Being a founder
- Culture
- Fundraising
- Growth
- Marketing
- Ops & finance
- People
- Product
- Revenue
- Sales & CS

### Product engineer's hub

- Experiments
- Feature management
- Growth engineering
- Product analytics
- User research
- Engineering

### Blog

- CEO diaries
- PostHog news
- Inside PostHog
- Using PostHog
- Comparisons
- General

### Guides & tutorials

- product os
- product analytics
- session replay
- feature flags
- experimentation (labeled A/B testing on website)
- surveys
- cdp
- LLM analytics

Note, there are other tags we've used in the past here, but they're largely optional.

### Creating new tags

Creating a new tag is as simple as adding the text to a post – it also means typos can generate new tag pages, so please be observant.

It's best to avoid a proliferation of tags, so please raise an issue before creating a new one.
