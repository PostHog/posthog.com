---
date: 2024-11-01
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

Now though, we’re closing that Slack group to create a better, stronger, and more helpful PostHog community [here on our site](/questions). In this post, I’ll explain why we’re doing this, and what comes next. 

> **TL;DR:** We’re closing the Slack group on Feb 1st 2024 and inviting members to join us on the [PostHog community forum](/questions) instead, where over 1,500 users have already started asking questions. This decision only impacts the public Slack group, not the private Slack channels for users who pay for additional support.

## Why we're changing the way we do community

PostHog has grown incredibly fast over the last four years, and throughout that time the public Slack group has been the central hub of our community. It's been a place where we chat to users, listen to feature requests, answer questions, and solicit feedback. 

However, with over 5,000 members in the community, it's become hard to keep up with the conversations. Messages quickly disappear from the chat history, it is disconnected from our main support flow, and content isn't indexed by Google, which makes it a particularly bad platform for providing support. 

We've explored a few things to fix this, including joining a paid plan ($7.25+ per user, per month) and [building our own AI bot](/blog/aruba-hackathon#maxai-our-friendly-posthog-support-ai), but earlier this year we realized a new approach was needed.

So, we decided to build something better. 

## Introducing the PostHog community forum

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/blqgFrIaWY0?si=gSj1eNrGQ8l0ANlw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Rather than using an off-the-shelf forum platform, like vBulletin or phpBB, we decided to create our own forum using Strapi as a headless CMS. The forum has already been live for several months while we worked out the kinks, and has over 1,500 active members. 

The new forum provides a dedicated area where you can post questions for both the PostHog team and the wider community. Anyone can respond, and answers can be selected as the preferred solution to help guide other users in the future. All of this content is connected to our main support flow, lives permanently on our website, and is visible to search engines, which is enough on its own to make the forums a better place for seeking community support.

We've also integrated the forum into other parts of the site. You can, for example, post questions when browsing the PostHog docs, and we'll automatically aggregate them into sortable categories. This is especially helpful if you're following a guide and something isn't clear enough for you - just pop a question on it and we'll take a look.

Profiles are also a big part of the forum; a place where you can add info, track discussions you're involved in, and display achievements earned through the community. In fact, we're giving everyone who joins the PostHog community from the public Slack a unique achievement to say thanks for the support!

You can even open your profile to function as an Ask Me Anything (AMA) - something [James](https://posthog.com/community/profiles/71), [Cory](https://posthog.com/community/profiles/2), and [myself](https://posthog.com/community/profiles/59) have already done.

> **Ready to join the community?** [Create an account today](/questions) and, if you've previously signed up to the public Slack group, you'll get a unique achievement to display on your community profile!

## What happens next?

One option for the public Slack would have been to just leaving it running in parallel to the forums, but that would leave Slack users in limbo. Instead, we'll close the Slack in favor of the PostHog community forum. Currently you need to create an account to sign-up to the community, but soon we'll merge this with your normal PostHog account. 

On January 17, we'll archive all channels in the public PostHog Slack, so that no new discussion or replies can be posted. This will give you chance to move on-going conversations to a new location, such as the PostHog community, without losing anything. 

A week later, on January 24, we'll close the Slack group permanently and delete all existing content. 

Private Slack channels for paying users will continue to function as normal via Slack Connect, and we’ll continue to handle the majority of customer support via the in-app help. Obviously, the [GitHub repos](https://github.com/PostHog/) will also continue to function as normal and you can add comments or submit there too.  

We’d like to thank everyone who participated in the Slack group over the last four years. Your support and feedback has helped us immensely, and we’ve deeply enjoyed speaking with you. We very much hope that all of you will [join us in the new community soon](/questions)!
