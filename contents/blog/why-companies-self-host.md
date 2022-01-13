---
date: 2022-01-14
title: The 3 critical reasons companies choose self-hosted analytics
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
keywords: ["self host analytics","self hosted analytics"]
featuredImage: ../images/blog/hipaa-compliant-product-analytics.png
author: ["andy-vandervell"]
categories: ["General"]
---

PostHog is a self-hosted, [open-source analytics tool](/blog/best-open-source-analytics-tools). Transparency is one of our [core values](/handbook/company/culture) and we believe self-hosting is the best solution for many businesses, especially large enterprises with complex needs. But, why? Why do we believe in this idea when the likes of Mixpanel, Amplitude and Heap are busy doing the exact opposite?

This is a question we're always interrogating. As a business it's important we're on the right path and part of that journey is constantly talking to and listening to our customers, whether they're paying or open-source users. 

Those conversations never end, but through them we've found there are three fundamental reasons companies choose to self-host. If any of them apply to you, PostHog might be the product analytics platform you need.

## 1) Data privacy

General Data Protection Regulation - four mundane words with huge consequences. Introduced in May 2018, the EU's GDPR is changing the shape of privacy globally. Why? Not only is it one of the toughest, most comprehensive privacy regulations in the world, its rules are extra-territorial. It doesn't matter if your company isn't based in the EU, if you want to process the data of EU citizens then you have to comply.

Failure to comply is costly. Under its provisions, regulators can fine companies the greater of €20 million or 4% of global turnover. Amazon and WhatsApp were [fined €746 million](https://www.wired.co.uk/article/amazon-gdpr-fine) and [€225 million](https://www.bbc.co.uk/news/technology-58422465) respectively in 2021. Other nations, notably Japan, South Korea, Israel, Brazil and Canada have either introduced GDPR-like regulations or amended existing legislation to match, while California introduced the [CCPA](https://oag.ca.gov/privacy/ccpa) to protect residents of California.

<BorderWrapper>
    <Quote
        imageSource="/images/customers/rikin.png"
        size="md"
        name="Rikin Kachhia"
        title="Software Engineer, Hasura"
        quote={`“No other tools we looked at offered self-hosted deployments. Some of our systems deal with sensitive data and we didn’t want to get into compliance issues with third parties. Self-hosting just took that whole problem away.”`}
    />
</BorderWrapper>

This wave of regulation has big consequences for anyone tracking user behavior, doubly so in sectors like health and finance with additional data protections. While cloud-based product analytics is convenient, third-party data processing brings with it an additional level of risk, complexity and legal administration. And that complexity is magnified if your company is handling client data.

[Mention Me](/customers/mention-me), a marketing platform whose clients include global brands like Puma, FarFetch and Zipcar, had exactly this problem when choosing a product analytics provider. 

“We knew we needed to keep everything on our infrastructure," says Joe Saunderson, Software Engineer at Mention Me. "Our clients’ privacy is very important to us and we have obligations to store their data safely.” 

They investigated third-party providers, but found their approach to data privacy unclear, making self-hosting the best option.

[Pry](/customers/pry), a financial planning platform for small businesses, faced a similar problem in keeping control of the sensitive financial information of its clients. Co-founder Tiffany Wong concluded self-hosting was the answer as she can be "confident that our data is safe and shared with as few platforms as possible".

Issues around data portability are particularly crucial for healthcare companies. Any product capturing health information in the US is subject to HIPAA, which regulates how companies use protected health information (PHI). Companies need to use [HIPAA compliant analytics providers](/blog/hipaa-compliant-analytics) and sign a Business Associate Agreement (BAA) before any user tracking can occur. By self-hosting, companies keep control of their data and avoid the legal expense, time and energy drained in dealing with legal agreements.

## 2) More reliable data

Cloud-based and self-hosted analytics do the same thing, so surely they collect the same data? Wrong.

Knowledge sharing tool [Saga](/customers/saga) ran a side-by-side comparison between Mixpanel and a self-hosted instance of PostHog and found a huge difference in the number of events that were tracked.

"For one event we defined, Mixpanel reported 6,343 occurrences last month," explains Filip Stanev, co-founder of Saga. "PostHog reported what we know to be the true figure, 8,169 — almost 30% more than Mixpanel.”

So what's going on here?

Again, it's related to privacy, as our CTO and co-founder, Tim Glaser, explains:

"Event tracking is typically prevented by ad blockers, which block tracking that originates from third-party domains. Self-hosting your analytics avoids this problem because the tracking originates from your domain. 

"This behavior isn't limited to ad blockers, either. VPNs and privacy browsers, which aren't explicitly positioned as ad blockers, will generally block third-party trackers by default."

Data quality is a critical issue for businesses who are now recognising the competitive advantage of data-driven product decisions. A [recent analysis](https://mikkeldengsoe.substack.com/p/data-to-engineers) of the top 50 European tech companies indicates high-growth startups are hiring data analysts at a higher rate than ever - banking app Monzo more than doubled the size of its data team in the last two years, while food delivery app Glovo has 74 open data roles compared to 102 open engineering roles.

## 3) It's a principle

Sometimes, a company's demands are philosophical rather than practical. We believe in transparency. That's why our product is open source and it's why everything about how we run the business, from [how we conduct meetings](/handbook/getting-started/meetings) or our [compensation calculator](/handbook/people/compensation), is available for everyone to see in our [company handbook](/handbook).

PostHog customers frequently tell us that controlling their data through self-hosting is simply a core value of their business. They don't want to share their data with Google, Facebook or any other large third-party, both to protect their users but also the value of their proprietary data. For many this isn't a new desire, but until recently the option to self-host a powerful, fully-featured product analytics suite didn't exist.

## We get it, self-hosting is great, does that mean everyone should do it?

We are self-hosting evangelists and [deploying PostHog](/docs/self-host) is a quick and easy process, but we also recognise not everyone wants, needs or is ready to self-host. That's why we [also offer PostHog Cloud](/signup), a version of PostHog hosted and managed by us with automatic upgrades, and minimal setup.

We often find customers prefer to start on PostHog Cloud and migrate to self-hosting when they're ready. You can start using PostHog Cloud immediately and it's free to use up to 1 million events per month.

If data privacy isn't a priority and you just need reliable analytics as quickly as possible, cloud-hosting is always a sensible option until you're ready to transition. 

> PostHog is an open source product analytics tool which enables teams to build better products faster without sharing their user data with third parties. [Try PostHog for free today](/signup) or [schedule a demo](/book-a-demo) to learn more.
