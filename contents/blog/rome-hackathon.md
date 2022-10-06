---
date: 2022-10-05
title: "All the cool things we built at our Rome hackathon"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["ian-vanagas"]
featuredImage: ../images/blog/planning-a-company-offsite/planning-offsite.jpeg
featuredImageType: full
categories: ["Inside PostHog", "Engineering", "Product updates"]
---

As an all-remote team, we know how important getting together in person is (we’ve [written about this before](/blog/asynchronous-remote-companies)). Our [product analytics team](/handbook/people/team-structure/product-analytics) (plus Luke, Annika, Cory, and Lottie) recently got back from an offsite in Rome. On top of eating a lot of pizza and gelato, refocusing and aligning work, and 360 feedback sessions, they had a hackathon and built a bunch of new things. 

We are showcasing them here. Some are sneak previews, others are works-in-progress, and they’ll likely change. We wanted to give you an idea of what our team actually does at an offsite hackathon.

One outcome of the offsite was a new focus on [nailing data exploration](handbook/people/team-structure/product-analytics#objective-1-nail-data-exploration). Many of the projects built related to this objective (on top of being fun and sparking joy). 

Here’s what the team built at their Rome hackathon.

## Frontend injected apps

Have you ever wanted to add floating pineapples to every page on your site? Marius worked on a way to make this dream a reality. More specifically, he built the ability to inject code into your page through [posthog-js](https://posthog.com/docs/integrate/client/js).

![Pineapple mode](../images/blog/rome-hackathon/pineapple-mode.gif)

To do so, PostHog app developers add a `web.ts` file with the code they want to inject through PostHog into their app. This enables them to add features like notification banners and custom forms (or pineapples). 

Read more details in the [PR here](https://github.com/PostHog/posthog/pull/12003).

## Feedback app

As a more serious example of what the frontend injected apps look like, Marius and Luke built a feedback app.

The feedback app is injected into your site through PostHog. It can be modified quickly by changing the `web.ts` file, without having to ship changes to your site. On your site, it takes input from users and delivers responses to their own tab in PostHog.

![Feedback app](../images/blog/rome-hackathon/feedback-app.png)

You can find the first PR for the feedback app [here](https://github.com/PostHog/feedback-app/pull/1).

## FaceHog (HogBook? Hoggr?) notifications

A problem some PostHog users face is others changing their carefully crafted insights and feature flags. They can mess these up or completely ruin them, and the original creator wouldn’t have any idea. Worse still, users could delete them without notice.

To limit this happening, Paul worked on “FaceHog,” a notification log of changes to insights, dashboards, feature flags, and experiments you have created.

![Facehog](../images/blog/rome-hackathon/facehog.gif)

Now if your evil twin decides to change or delete your insights or roll out your feature to more people, you’ll get a notification.

You can find more of the details in the [PR here](https://github.com/PostHog/posthog/pull/12037). 

## Person feed

The person page currently shows properties, events, session recordings, and more all in separate tabs. Michael and Cory felt it would be better to see all of that data at a glance. They designed and built the person feed to help achieve this.

![Person feed](../images/blog/rome-hackathon/persons-feed.png)

The person feed is a chronological feed of a person’s behavior. It amalgamates sessions, recordings, events, and properties onto one page. PostHog users can see the events that constitute a session along with a session recording if it exists. They can see the properties of the person in the sidebar as they go, giving them context on that person's events.

Potential future improvements include pinning the most relevant property fields. This feature is still a work in progress, but you can see the [draft PR here](https://github.com/PostHog/posthog/pull/12053).

## Hedgehog mode

To increase the amount of fun in PostHog, Ben and Lottie worked on Hedgehog mode. Hedgehog mode spawns a hedgehog to hang out and walk around on your page. Internal testing shows it helps meet important team KPIs like increased joy, lower stress, and more hedgehog thoughts.

![Hedgehog mode](../images/blog/rome-hackathon/hedgehog-mode.gif)

Some day the hedgehog might help you identify popular areas and potential areas for creating actions, but for now they are just hanging out. See the [PR here](https://github.com/PostHog/posthog/pull/12059). 

## Join us

We like to be transparent with what we build. The details on what we are building are found in the PRs linked as well as more expansively on each of the team pages in [our handbook](/handbook/people/team-structure/team-structure). We do this because we value feedback a lot, and would like to hear your thoughts.

If you want to provide more than just feedback and building projects like these in team hackathons interests you, we’re hiring full stack engineers. Check out all the details on our [career page](/careers/full-stack-engineer).