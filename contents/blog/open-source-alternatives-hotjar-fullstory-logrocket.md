---
date: 2022-04-05
title: Self-hosted (and open source) alternatives to Hotjar & LogRocket
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
author: ["hanna-crombie"]
categories: ["Guides", "Product analytics"]
---

Product analytics tools have one goal in mind: providing actionable insights on user behavior. They're all about hard numbers; views, clicks, conversions. But sometimes all those numbers can feel a bit sterile. Separated from the individual user narrative, statistics are an incomplete picture. Enter session recording.

Session recordings, also known as session replays, are video renderings of actions taken by your users in real-time. They capture mouse movement, clicks, taps, and scrolling across your site or app’s pages.

### Why is session recording useful?
Aside from making for some fascinating watching, session recordings offer an organic way to examine navigation. They facilitate a detailed level of investigation on user behavior. By studying exactly how users interact with your product from the entry point, you can identify friction areas and tailor your development in line with their needs.

Session recordings can help you to identify:
- Where users are getting stuck on your site
- Hesitation at different stages of your funnel
- How bugs come about
- How your users are interacting with individual elements of your product

This information in context can help you to optimize user experience, build user-led products and, ultimately, improve conversion and retention. Session recording is a great tool to have in your arsenal when you want to act on real world user data.

### Self-hosted vs. cloud session recording
Cloud session recording tools like Hotjar, FullStory and LogRocket can offer a convenient solution for users who want to kick off quickly. That said, the costs associated with cloud-hosting are an important factor to consider, not to mention the privacy concerns that come hand-in-hand with third-party providers.

Negotiating the security impact of hosting your data in the cloud can be a headache to say the least, particularly when searching for solutions that help you to stay compliant with [GDPR](https://posthog.com/blog/best-gdpr-compliant-analytics-tools) or [HIPAA](https://posthog.com/blog/best-hipaa-compliant-analytics-tools) regulations. If sending data to third-party systems is of concern, a self-hosted option may well be the most convenient way to go.

Open source software gives you the freedom to study, modify and run the tools you are using freely. By implementing a self-hosted version of session recording, you can ensure all of your data remains on your platform.

Here, we’ve got the lowdown on some of the best open source and self-hosted session recording tools available, so you can choose the right one for you.

## 1. [PostHog](https://posthog.com/)

PostHog is an all-in-one product analytics platform which empowers any business to make efficient data-driven decisions. It offers all the tools required to measure user success and build better products, including feature flags, funnels, [session recording](https://posthog.com/product/session-recording), heat maps, A/B testing, trends and much more. PostHog’s tools work together natively, offering extensive, actionable user insights.

### Who is PostHog for?

PostHog is the best tool for product-minded developers, data engineers and product teams. The fully comprehensive suite of analytics tools make it an ideal choice for any company that wants to gain wide-ranging insights into their usage and engagement metrics while keeping all of their data in one manageable platform. The user interface is extremely intuitive and no SQL knowledge is required, making it very easy for all members of your team to pick up the tooling and build a better understanding of your users.

We may be a little biased here, but you can sign up for free to see how the platform works for yourself!

### Strengths

- Fully-featured product analytics suite
- Unlimited scaling
- Front-end events captured out of the box
- Easy [migration](https://posthog.com/tutorials/free-hotjar-alternative) to your existing infrastructure
- CSS selectors block sensitive data to protect user privacy
- Customisable data retention
- Enable session recording for specific user segments for more granular insights

### How much does it cost?

PostHog (self-hosted and cloud) is available for free up to 1 million captured events each month.

[Session recording](https://posthog.com/docs/user-guides/recordings) is included at no extra cost in both plans.

Custom plans are also available for scaling and enterprise customers who are working with very large volumes of data. The transparent [pricing calculators](https://posthog.com/pricing?realm=self-hosted) allow you to see what you can expect to pay based on your event capture volume.

### Is it open source?

Yes! PostHog’s open source plans are available under an MIT license. Find out more about [PostHog’s self-hosting plans](https://posthog.com/signup/self-host).

## 2. [OpenReplay](https://openreplay.com/)

OpenReplay is an open source session replay stack which provides insights into user actions inside web apps. It does lack additional analysis tools to give a more cohesive view of the user experience at large and assist with optimized product development. 
Their tooling is particularly effective for application state and customer support however – features like DevTools and co-browsing sessions are useful for monitoring performance.

### Who is OpenReplay for?

OpenReplay is a developer-friendly tool. It allows engineers to see how users are interacting with their web apps and respond to issues faster.

### Strengths

- Co-browsing feature to assist users at critical moments
- Network activity inspection
- Performance and state monitoring
- Error tracking

### How much does it cost?

OpenReplay’s self-hosted plan is available for free.

They also offer a cloud option starting at $3.95 per month for 1,000 recordings with 30 days data retention.

### Is it open source?

Yes. OpenReplay’s open source library is available under the ELv2 license, via [the OpenReplay repo](https://github.com/openreplay/openreplay).

## 3. [UXWizz](https://www.uxwizz.com/)


UXWizz is a paired-down product analytics platform offering features like visitor insights, session recording, segments and A/B testing.

A lightweight version of session recording is available, which only stores the URL of the page and the user actions. This is designed to optimize your data storage and remove some of the manual maintenance otherwise required by UXWizz.

### Who is UXWizz for?

UXWizz’s is a good choice for individuals, and marketing and product teams in small businesses who want quick, qualitative insights into their user analytics from one simple and accessible dashboard.

### Strengths

- Broad range of engagement-focused insights
- Low database usage with lightweight version

### How much does it cost?

UXWizz is available as a self-hosted solution only and pricing ranges from £79 to £1,199 for a lifetime license, including 1 year support. Additional updates and support are priced as add-on subscriptions.

### Is it open source?

No. UXWizz is not open source.

## 4. [UXlens](https://uxlens.com/)

UXlens is a developer-first session recording tool which provides insight into user interface and conversion issues. It does not include any additional analytics tools but features useful segment filtering features that help businesses locate blocks in their funnel.

### Who is UXlens for?

UXlens is an ideal choice for UX designers and product teams who want to study the impact of their UI on the user journey.

### Strengths

- Customisable filters to track sessions on specific user segments
- Input elements masked by default to protect user data
- UI to assist with complex filter building

### How much does it cost?

UXlens sessions recording tool is available as a self-hosted solution for free.

A cloud-hosted version is also available starting at $5 per month.

### Is it open source?

No. UXlens is not open source.

## 5. [Matomo](https://matomo.org/)

Matomo is an open web analytics platform. Touted as an alternative to Google Analytics, Matomo is largely focused on understanding marketing website analytics. Session recording is available as an add-on via the [on-premise marketplace](https://plugins.matomo.org/HeatmapSessionRecording).

### Who is Matomo for?

Matomo is built with marketing and content teams in mind, offering insights into website content engagement for optimization of user journeys.

### Strengths

- Funnels, acquisition analysis and other insight features
- Unlimited session recordings
- Out-of-the-box solution meaning no developer required to get set up

### How much does it cost?

The session recording add-on for a self-hosted Matomo solution has a 30-day free trial, after which the cost ranges from $199 to $599 per year depending on the number of users in your team.

Session recording is also included in Matomo’s cloud Business plan. Pricing is calculated depending on the volume of your site traffic. 

### Is it open source?

Yes. Matomo is available under a AGPLv3 license. Check out [the Matomo repo](https://github.com/matomo-org/matomo) for more info.

## 6. [SessionStack](https://www.sessionstack.com/)

SessionStack is a user session insights tool with a focus on critical issues and error tracing. Without additional analytics features, it doesn’t necessarily give a cohesive overview of the user experience at large or assist with product development. Their tooling is particularly effective for customer support use cases; error messages and co-browsing sessions help teams to pinpoint issues and track down problems related to specific users, devices or releases.

### Who is SessionStack for?

SessionStack enables product managers, customer support teams and engineers to harness user navigation insights to identify friction points and bugs, and to assist users in real-time.

### Strengths

- Notification alerts when issues arise
- Network traffic monitoring
- Ability to co-browse with users to offer guidance
- Cloud-hosting and self-hosting options available

### How much does it cost?
Cloud plans with SessionStack start from $99 a month for up to 1,000 sessions. A self-hosted deployment option is available on custom plan, which includes implementation support and customisable data volume and retention. Pricing for SessionStack’s self-hosted plan is not publicly available.

### Is it open source?

SessionStack’s code is not open source. They do offer a self-hosted deployment option which allows customers to keep their user data off the cloud, but you can expect to pay a premium for the privilege.