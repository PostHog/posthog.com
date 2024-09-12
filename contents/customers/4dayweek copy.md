---
title: How Airbus deployed PostHog across 4,000 applications
customer: Airbus
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/airbus_light_7d8cc90e62.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/airbus_dark_modified_8f1a80ceff.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/airbus_8311e8ea0e.jpg
industries:
  - Aerospace
users:
  - Product
  - Leadership
  - Engineering
toolsUsed:
  - Surveys
  - Product analytics
date: 2024-9-12
---

As Europe’s largest aerospace company, [Airbus](https://www.airbus.com/en) is a pioneer in its field and one of the best known brands in the world — with nearly 150,000 employees maintaining almost 10,000 individual applications. Despite reaching this scale however, in 2023 Airbus’ User Behaviour Analytics team realized it faced a significant challenge in terms of tracking its users. 

Put simply, there was no unified tool for tracking users and each application would frequently use its own stack entirely. 

“Many of our 10,000 apps are just for internal usage, but around 4,000 of them have external users who come to us to buy aircraft or services,” explains Francois Toulous, a Product Owner in Airbus’ User Behaviour Analytics team. “The challenge was that nobody was able to say who these users were, or what features they used. All we could do was look at login logs in Splunk to count them.”

As a result, Francois’ team realized that Airbus needed a single, dedicated tool with which to collect and analyze usage data from its applications. He began researching potential tools such as Piwik Pro, Matomo, and Google Analytics — but each of these proved unusable. 

“One of my colleagues wanted to use Matomo, but they eventually said we were too huge for them,” says Francois. “They ended up not even continuing the conversation because our scale was too big...and we realized we couldn’t use Google Analytics for GDPR reasons either.”

“That’s when we found PostHog — the only tool that could handle the hundreds of projects we needed to create.”

### A support experience unlike those other SaaS tools

After setting up PostHog, Francois’ team set about creating the hundreds of projects they would need to start scaling — but soon discovered that driving such massive adoption also created its own challenges. Each new project brought with it a new product owner, a new team, and a long list of admin tasks for them to complete, such as removing GeoIP details in order to comply with Airbus’ data privacy policies. 

“In order to drive mass adoption we knew we’d have to automate this process, so we reached out to PostHog’s support,” explains Francois. “It wasn’t like it would be at other tech companies though — very quickly we were speaking directly with engineers like Raquel.”

[Raquel, a full-stack engineer in PostHog’s growth team](https://posthog.com/community/profiles/28693), began building a solution to help Airbus onboard teams faster by only showing them the projects which are relevant to them. 

“Every time they spun up a new project there was a whole manual process,” explains Raquel. “With thousands of different projects planned, this wasn’t ideal. Additionally, because the users log in with SSO and JIT provisioning, they didn’t want to rely on invite emails.”

As a result, Raquel extended the PostHog API in two ways to help address Airbus’ needs. First, she added project access to invites so that they became attached to specific projects. Next she made invites automatically consume when a user logged in via JIT provisioning — so users are automatically added to relevant projects without needing emails. 

“Honestly, the support experience was really nice,” says Francois. “[Simon](https://posthog.com/community/profiles/28895) is always a great help too, telling us what we need to know. Compared to other tools I’ve used, the support has been perfect — and we were really happy to see Raquel could develop what we needed.”

### Adopting PostHog across over 4,000 applications at once

Now, with Airbus’ adoption growing and more projects starting on PostHog, Francois is looking to expand usage into other parts of the platform — such as [user surveys](https://posthog.com/surveys). 

“One of the things that makes PostHog such a great tool for us is that it includes everything we need in one place,” says Francois. “We can understand how people use applications with PostHog’s analytics, but we can also use surveys to measure [CSAT](https://posthog.com/templates/csat-survey), or [NPS](https://posthog.com/templates/nps-survey), or get our own UX scoring measurements.”

Combining surveys and analytics into a single tool also means that Airbus is able to unlock insights more easily than when relying on a dozen dedicated tools. 

“We’ve made all sorts of discoveries since adopting PostHog,” says Francois. “Some of our product owners have found that features they’d been supporting actually aren’t used by users at all, or only by a few people. We can target these users with surveys to understand them more, or just decommission the features saves us time, but also money that we can put into other projects.”

“That’s one of the strongest benefits of PostHog, for us — that we’re able to save time and money by understanding our users more.”

