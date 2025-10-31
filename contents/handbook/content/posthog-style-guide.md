---
title: Style guide
sidebar: Handbook
showTitle: true
---

This style guide explains our guidelines for contributions to PostHog's documentation, tutorials, and blog.

## General principles

### Assume almost nothing

As you gain mastery of a product or feature, some things become second nature, but remember they weren't always so obvious. Call these out, and provide links to relevant docs or websites.

Make it easy for your reader to implement their feature or solve their issue, whether they are an expert or just starting out with PostHog. 

### Get to the point

If you're explaining something, don't wait three paragraphs to do so. Start with the explanation and expand later. Almost all articles can be improved by shortening (or removing) the intro.

Don't be boring.

### Make it easy to read

Most readers will scan a page before committing to reading it. They're looking for signs it'll answer their question(s) and quality. 

Use clear headings, diagrams and tables to demonstrate thoroughness.

### Avoid hedging

We are opinionated at PostHog. That means avoiding hedging like saying "it's complicated" or "it depends." This is frustrating for the reader and doesn't add value. Instead:

1. Have an opinion.
2. Provide an example.
3. Do the research until you can do 1. or 2.

## Style rules

### Use American English

PostHog is a global company. Our team and our customers are distributed around the world. For consistency, we use American English spelling and grammar.

### Use sentence case for titles and product names

Write "Documentation style guide", not "Documentation Style Guide" and "PostHog has product analytics and session replay apps", not "PostHog has Product Analytics and Session Replay apps".

### Capitalize proper names as appropriate

Write "Redis server", not "redis server".

### Capitalize acronyms and define where needed

Write "URLs", not "urls".

Many acronyms, like that one, will be familiar to developers. When in doubt, link the first use of an acronym to a definition, or provide one.

### Use sentence case for titles and product names

Write "Documentation style guide", not "Documentation Style Guide" and "PostHog has product analytics and session replay apps", not "PostHog has Product Analytics and Session Replay apps".

### Capitalize proper names as appropriate

Write "Redis server", not "redis server".

### Capitalize acronyms and define where needed

Write "URLs", not "urls".

Many acronyms, like that one, will be familiar to developers. When in doubt, link the first use of an acronym to a definition, or provide one.

### Use the Oxford comma 

Write "bananas, apples, and oranges", not "bananas, apples and oranges".

Why does this matter? Consider the old joke:

"There are two hard problems in computer science: naming things, cache invalidation, and off by one errors."

That doesn't work without the Oxford.

### Use "enable", not "allow"

**Allow** is another way of saying permit.

> **Example:** Your partner allows you to stay up late and play video games.

**Enable** means providing the means or opportunity. 

> **Example:** PostHog enables you to understand user behavior.

In most cases, PostHog *enables* users to do things.

### Add extra line breaks between long bullet points

Sections with long bullet point items are hard to read without extra line breaks (when looking at Markdown). For example, this passage:

import Tab from "components/Tab"
import ListNoNextLine from "./_snippets/list-no-nextline.md"
import ListNoNextMarkdown from "./_snippets/list-no-nextline-md.md"

<Tab.Group tabs={['Markdown', 'Preview']}>
    <Tab.List>
        <Tab>Markdown</Tab>
        <Tab>Preview</Tab>
    </Tab.List>
    <Tab.Panels>
        <Tab.Panel>
        <ListNoNextMarkdown/>
        </Tab.Panel>
        <Tab.Panel>
        <ListNoNextLine/>
        </Tab.Panel>
    </Tab.Panels>
</Tab.Group>


Is harder to read than this passage:

import ListWithNextLine from "./_snippets/list-with-nextline.md"
import ListWithNextMarkdown from "./_snippets/list-with-nextline-md.md"

<Tab.Group tabs={['Markdown', 'Preview']}>
    <Tab.List>
        <Tab>Markdown</Tab>
        <Tab>Preview</Tab>
    </Tab.List>
    <Tab.Panels>
        <Tab.Panel>
        <ListWithNextMarkdown/>
        </Tab.Panel>
        <Tab.Panel>
        <ListWithNextLine/>
        </Tab.Panel>
    </Tab.Panels>
</Tab.Group>

Both render as the same list, but one is easier to read in Markdown. This isn't necessary for shorter bullet-point lists.

### Use straight apostrophes and quote marks

Many writing tools, such as Google Docs, Notion and Word, add curly quotes and apostrophes. Please avoid using these. They can normally be turned off in the settings.

### "Open source" vs "open-source"

Both can be correct depending on usage.

Open source should be hyphenated when it appears before a noun.

> **Example:** "The open-source community is awesome"

But should be written without a hyphen in other contexts.

> **Example:** "PostHog loves being open source."

### Use British-style en dashes

While we default to American English in most things, we prefer using the British-style en dash ( – ) with a space either side rather than the longer em dash with no spaces (—) used in American English.

> **Example:** "Don’t up vote your own content, and don’t ask other people to – post it and pray."

Please don't use a hyphen instead of en dash. On Macs, holding down `Option` and the hyphen key will give you an en dash.

> **A short public service announcement from Andy:**
>
> As an editor, readability / aesthetics are more important to me than following grammar and style rules to the letter. British-style en dashes are a case in point.
> 
> Don't get me started on using hyphens instead (like - this) – that's just wrong. Here's that last sentence with an em dash instead... "Don't get me started on using hyphens instead (like - this)—that's just wrong". Doesn't that em dash look cramped and nasty? 
>
> Honestly, though, I don't care that much, but I will find and replace every em dash and orphaned hyphen on the website. It's fine. It's not a big deal. I'm cool about it.

## Adding images, short videos and YouTube embeds

Any images or short videos for your article should be uploaded to Cloudinary.

You can do this from posthog.com by signing in, clicking on your avatar in the top right, then clicking **Upload media** in the dropdown menu.

![Upload](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_12_at_12_55_04_2x_3d2fdcd501.png)

Copy the link (a max of 1600px is usually good) and paste it where you want the image or video to appear in your file.

See more details in the [uploading assets with Cloudinary handbook page](/handbook/engineering/posthog-com/assets).

### Best practices for images and videos

- In most cases, PNGs are the ideal file format. Images are optimized for the web and converted to `webp` automatically. That said, don't upload 4K resolution images. Be sensible.

- _Do not_ upload animated GIFs. They're large and lossy. Instead, record short clips as MP4s using [Screen Studio](https://www.screen.studio/) and add them to your markdown file as you would any normal image.

- When embedding YouTube videos, use YouTube's iframe embed code with the "Enabled privacy-enhanced mode" box ticked. This ensures Google doesn't drop a cookie on our website. You'll know it's enabled if the code includes "https://www.youtube-nocookie.com" in the URL.

- If your article needs custom artwork, please file a request. See [Art and branding requests](/handbook/brand/art-requests) for instructions.

## Technical and docs writing

See our [docs style guide](/handbook/content/docs-style-guide).