---
date: 2023-20-12
title: "We're building a better PostHog community by closing our public Slack"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Product updates
author: ["joe-martin"]
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
---

One of the great things about being open source is that we’ve grown a vibrant community around the project. Since launch we’ve accepted code from over 500 contributors and swapped ideas with thousands of users in our public Slack group. 

Now though, we’re closing our public Slack group in order to create a better, stronger, and more helpful PostHog community here on our site. In this post I’ll explain why we’re doing this, and what comes next. 

> **Tl;dr:** We’re closing the Slack group on XX/XX/XX and inviting members to join us on the [PostHog community forum](/questions) instead, where over 1,500 users have already started asking questions. This decision only impacts the public Slack group, not the private Slack channels for users who pay for additional support.

## Why we're changing the way we do community

PostHog has grown incredibly fast over the last four years, and throughout that time the public Slack group has been the central hub of our community. It's been a place where we chat to users, listen to feature requests, answer questions, and solicit feedback. 

However, with over 5,000 members in the community, it's become hard to keep up with the conversations. Messages quickly disappear from the chat history and content isn't indexed by Google, which makes it a particularly bad platform for community support. 

We've explored a few things to fix this, including joining a paid plan ($7.25+ per user, per month) and [building our own AI bot](/blog/aruba-hackathon#maxai-our-friendly-posthog-support-ai), but earlier this year we realized a new approach was needed.

So, we decided to build something better. 

## Introducing the PostHog community forum

<iframe width="560" height="315" src="https://www.youtube.com/embed/blqgFrIaWY0?si=gSj1eNrGQ8l0ANlw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Rather than using an off-the-shelf forum platform, like vBulletin or phpBB, we decided to create our own forum using Strapi as a headless CMS. The forum has already been live for several months while we worked out the kinks, and has over 1,500 active members. 

The new forums provide a dedicated area where you can post questions for both the PostHog team and the wider community. Anyone can respond, and answers can be selected as the preferred solution to help guide other users too. All of this content lives permanently on our website and is visible to search engines, which is enough on its own to make the forums a better place for seeking community support.

We've also integrated the forum into other parts of the site. You can, for example, post questions when browsing the PostHog docs, and we'll automatically aggregate questions into sortable categories. This is especially helpful if you're trying something new and an existing explanation isn't clear enough for you. 

Profiles are also a big part of the forum; a place where you can add info, track discussions you're involved in, and display awards earned through the community. You can even open your profile to function as an Ask Me Anything (AMA) - something [James](https://posthog.com/community/profiles/71), [Cory](https://posthog.com/community/profiles/2), and [myself](https://posthog.com/community/profiles/59) have already done.

> Ready to join the community? You can now [login using your PostHog account](/questions)! 

## What happens next?

One option for the public Slack would have been to just leaving it running in parallel to the forums, but that would leave Slack users in limbo. Instead, we plan to close the Slack in favour of the PostHog community forum.

On XX/XX/XX we'll archive all channels in the public PostHog Slack, so that no new discussion or replies can be posted. This will give you chance to move on-going conversations to a new location, such as the PostHog community, without losing anything. 

A week later, on XX/XX/XX, we'll close the Slack group permanently and delete all existing content. 

Private Slack channels for paying users will continue to function as normal via Slack Connect, and we’ll continue to handle the majority of customer support via the in-app help. Obviously the GitHub repos will also continue to function as normal and you can chat with us there too.  

We’d like to thank everyone who participated in the Slack group over the last four years, whose support and encouragement has helped us immensely. We’ve deeply enjoyed speaking to many of you and the feedback you’ve given us has been invaluable — we very much hope that all of you will join us in the new community and continue to follow our progress there!
