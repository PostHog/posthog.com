---
title: Collaborating with product teams (as a PMM)
date: 2026-05-28
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - sara-miteva
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/Template_cover_15_8cf985674a.jpg
featuredImageType: full
category: Inside PostHog
tags:
    - Marketing
---

Before [Cleo](/community/profiles/36864) and I joined as Product Marketers (PMMs), PostHog only had our [Marketing Lead, Joe](/community/profiles/29070), who was doing PMM work with a bunch of other stuff at the same time. This was the first time teams got dedicated PMMs, and also the first time some of them got to work with a PMM, so we had to find the best way to collaborate with them while respecting [our company culture](/handbook/company/culture).

One of the first things you learn when joining PostHog is that [collaboration sucks](https://newsletter.posthog.com/p/collaboration-sucks). You're the driver and you need to ship your own stuff. Collaborate only when necessary.

![collaboration sucks](https://res.cloudinary.com/dmukukwp6/image/upload/stop_collaborating_7550066220.webp)

Well, the relationship between Product Managers (PMs) and PMMs is one of those necessary situations when you *need to* collaborate to successfully launch and grow your products. Knowing that collaboration with PMs is one of the biggest pains for a PMM, I wanted to share some collaboration best practices from our experience so far.

## Initiate the first contact

As a PMM joining a product team that, in most cases, has already been established, you have the difficult task of making yourself visible and proving you came here for a reason. Most engineers, and even PMs, don't get to work with marketing people often, so they don't even know what your job is.

That's why I believe you, the PMM, should initiate the first contact. Book a call with your PM (even if you're going to continue to work with them async, the first intro should be a call), tell them what your job is, and ask for more context around the product. Here are some things worth covering in this first meeting:

- What is the current revenue of the product, and what is the revenue goal (for the quarter, year, etc.)?
- What is a bigger gap - activation or retention?
- Do you know if there were any previous marketing efforts around this product?
- Where do most users come from?
- Do you see any obvious marketing opportunities that I should focus on first?

Ask for the customer interview bank, any competitive research they might have, or any other resources that could be helpful for your particular product.

Since async is the default way of working in PostHog, I was very careful with scheduling meetings at first. However, the teams got very excited when I announced that I would be supporting their products, and were very eager to meet and give me as much information as they could.

![collaborating with PMs](https://res.cloudinary.com/dmukukwp6/image/upload/PM_COLLAB_9b73b35feb.png)

## Live in your team's channel

If you're using Slack or any similar tool, your team probably has a dedicated channel. This is the most important place you need to check every day, or at least every Monday.

The PMs and the engineers might not always know which feature is marketable. You should follow the threads and figure it out yourself. Jump in wherever you think there's an opportunity, and the team will most likely get excited that you want to show users what they've been working on.

## Spend time in person & in meetings

PostHog is fully remote, so you usually only meet teammates a couple of times a year. If this is the case with you, try to make the most of those moments. This year we went to Barbados, and I booked some dedicated time with both of my PMs to do a growth review and discuss the parts of the product we want to focus on next.

In addition to the in-person gatherings, you should regularly join your team's sprint planning (or any similar meetings). Even if they are too technical, you should show up and be present. The team should see that you're interested in what they're working on and hear you asking questions. If you feel bad for not contributing, you can always give them a short overview of what you're working on related to their product.

## Loop your PM in on your marketing activities

At PostHog, most of us create an individual [quarterly planning issue](https://github.com/issues/assigned?issue=PostHog%7Crequests-for-comments-public%7C524). I regularly send this issue to my PMs to get their thoughts on the things I'm planning to do in the upcoming quarter, related to their product.

Also, I regularly send them my campaign plans, creative directions, blogs, etc. The core assets are non-negotiable - the PM should always take a look at the product page, launch email, and launch blog.

Even if they don't have marketing feedback, they should be in the loop and they should get excited about the way you're promoting their product. Also, sometimes they have competitive research or data that will help you create your assets, and you'll only know this if you share what you're working on and get feedback.

## Monthly growth review

Recently, we started doing monthly 1:1 meetings with PMs where we go through the product growth for the last month and try to identify the biggest gaps. For example, for one of the products I was working on, we realized that retention is low, so we decided to start sending monthly updates to users that include everything the team has been working on and what's coming next.

## Don't allow yourself to become an afterthought

Yes, you're the one joining an already established team, but you should also express your preferred ways of working. If you notice you're getting included in conversations too late, react. This happened to me when I got pulled in to work on some integration launches. Once engineers started including me early, I had more context, and as a result, we were able to do much more before launch day.

## AI is your friend
There’s a lot you can automate with AI. Claude has become my go-to spot when I need to know the status of a certain product development, thanks to the Slack MCP. I ask it about feature status, team updates, etc. I do still go to Slack channels, but it’s much easier for me to surface all the context via a prompt. Here are some prompts I’ve used recently: 

![claude prompt 1](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_05_28_at_20_40_18_2x_4e594f0bbf.png)

![claude prompt 2](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_05_28_at_20_39_15_2x_7aae989bf0.png)

Also, scheduled tasks are pretty good for product updates. My most useful scheduled task is my *Weekly product digest,* where Claude collects everything that happened in the past week in the channels and GitHub PRs related to the products I work on. Here's a prompt you can use to schedule it yourself with Cowork:

```
Every Monday at 9 AM, build me a **Weekly Product Digest** from my product Slack channels — #team-logs, #team-replay, and #team-error-tracking — covering the previous 7 days.

Save it as a live Cowork artifact called *Weekly Product Digest* that I can re-open from the sidebar all week, and refresh it each Monday with the new week's data.

Pull three things, in this order:

1.  **Action items & @mentions of me.** Anything I'm tagged in or asked to do. Resolve my Slack user ID once at the start (my email is sara@posthog.com) and look for that ID in messages. For each item, show the channel, author, snippet (~200 chars), timestamp, and a "View in Slack" link.

2.  **Decisions & announcements.** Product decisions, launch updates, scope or policy changes — anything that signals "this changed." Skip routine status pings.

3.  **Team progress updates.** What the team is working on, milestones hit, blockers cleared. Group items by project/topic with a one-line synthesis under each heading. Skip lunch chatter, gif reactions, and off-topic threads.

If a section is genuinely empty, show *"Nothing this week"* in italic — don't hide it. I want to see that you actually checked.

**Layout:** light mode, clean and scannable. Header has the date range covered, the timestamp of the last update, and the three channels as monospace chips. Each item renders as a small card — channel + author + timestamp on top, snippet below, "View in Slack" link bottom-right opening in a new tab.

**After updating the artifact,** post a short chat summary (under 80 words) flagging the 1–3 things I should look at first — anything blocking a launch, anything I'm tagged on, or any decision that affects my plans. End with a reminder that the full digest is in the sidebar.

**If something breaks:** if a channel can't be reached, note it in the footer rather than failing the whole run. If Slack auth is broken, update the artifact with a banner saying Slack needs to be reconnected — don't invent data. Never produce a silently empty dashboard.
```

This scheduled task can help you stay on top of everything that's going on with your product, without having to scroll through endless Slack messages or analyze PRs.

I hope these tips help you, fellow PMM. Don't forget, we're in this together. Whatever you're struggling with, there are at least 100 PMMs out there who have the same problem. Happy collaborating!
