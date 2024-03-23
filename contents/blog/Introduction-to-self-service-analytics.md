---
date: 2021-11-30
title: Introduction to self-service analytics
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - joe-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/blog-generic-4.png
featuredImageType: full
category: Product growth
tags:
  - Explainers
---

There are lots of ways to do analytics. You can [do SQL](/blog/sql-for-analytics). You can do it in the cloud. You can not do it at all and hire an analytics agency or consultancy instead. But by far one of the most popular (and, we think, best) ways is _self-service_ analytics. 

That’s a term which covers a lot of popular analytics platforms, including PostHog, Mixpanel and [Amplitude](/blog/best-amplitude-alternatives). But what does it mean, exactly? 

To put it simply, a self-service analytics platform is one which empowers everyone within an organization to analyze product and user data themselves. Self-service analytics platforms therefore provide access to the data and the tools to interrogate it — all without resorting to dozens of unorganized spreadsheets, and specifically without requiring your team to have SQL skills.

In this article we’ll describe how product-led teams benefit from self-service analytics, what the alternatives are and discuss some of the popular tools in this space. 

## What are the alternatives to self-service analytics?

When you know what self-service analytics is, the main alternative should be obvious: it’s when not everyone in an organization is empowered to analyze data themselves. 

This is usually because an organization has a specific data analysis function instead, which is devoted to providing analytics as a service to the rest of the organization. It can be an external team, but most of the time it’s an internal team of data analysts, data scientists or business intelligence specialists. 

There are a few reasons organizations may prefer this approach: 

- *Security:* Limiting who has access to the raw data, which can include personally identifying information (PII), is generally wise and can be a matter of regulation in some industries.

- *Expertise:* A specialized team enables organizations to leverage expertise most effectively, not only for running queries but also in terms of data structure and management. The team can also interact with data directly, rather than requiring accessible tooling.

- *Efficiency:* In theory, routing requests through a centralized team should eliminate duplicate work.

It’s important to emphasize that efficiency gains in particular can be a controversial point in some organizations. Centralized teams aren’t always as efficient as they may seem and a reality in many organizations is that data specialists may spend a lot of time building simple dashboards for business leadership or may lack the wider context to prioritize effectively.

Issues can also come from elsewhere in the organization, as teams may lack visibility into the data team and be unable to leverage them. As always, communication is key. 

<BorderWrapper>
<Quote
    imageSource="/images/customers/andy.jpeg"
    size="md"
    name="Andy Su"
    title="Founder and CEO, Pry"
    quote={`“We look into things such as how valuable customers who come to us via ads are compared to those who are organic. We then use that information to make decisions about our advertising strategy.”`}
/>
</BorderWrapper>


## What are the benefits of self-service analytics?

As self-service analytics tools have become more sophisticated they have overcome many of the challenges outlined above. PostHog’s saved insights and shared dashboards eliminate the risk of duplicate work, for example, and make it easier for individuals to collaborate on data analysis. 

PostHog also includes security features to limit who has access to the data and can even redact sensitive information from session recordings so that user privacy is preserved. 

More generally, self-service analytics tools also offer other advantages:

- *Democratization:* Biases can occur for all sorts of reasons and you can never be sure where your next great idea will come from. Enabling more users to interact safely with data increases your chance of finding meaningful insights. 
- *Single source of truth:* If you don’t have a dedicated team which is managing your data well then it’s easy for decisions to be made based on out of date spreadsheets or faulty information. Self-service analytics tools ensure everyone sings from the same hymn sheet. 
- *Efficiency:* Most business intelligence (BI) tools require knowledge of SQL or equivalent programming languages. This means it can take a long time just to get the answer to simple questions, whereas self-service tools such as PostHog offer a more accessible UI.
- *Speed:* The reality of centralized data teams is that they rapidly become a bottleneck for the rest of the business. Opening analytics up with a self-service platform enables all teams to move faster and interact with data in real time. 

Ultimately, self-service analytics is important because it enables organizations to get more value from their data, faster — and usually more cost effectively too. Some organizations that maintain dedicated data teams will even adopt self-service analytics tools regardless, so they can free data teams up to pursue more bespoke analysis. 

## Are tools like Google Analytics good for self service analytics?

It’s complicated. 

Google Analytics is a self-service analytics platform but that doesn’t mean it is a good platform for understanding your user behaviour. This is because Google Analytics is a self-service _web_ analytics platform and so focuses on metrics such as pageviews, bounce rate and click-through rates. It lacks the ability to go deep into topics such as retention and user trends, or the ability to watch session recordings and create multivariate experiments. 

<BorderWrapper>
<Quote
    imageSource="/images/customers/anca.png"
    size="md"
    name="Anca Filip"
    title="Head of Product, Mention Me"
    quote={`“We used to use Google Analytics, but PostHog has helped us improve our product and get a much better understanding of our users than we've ever been able to before."`}
/>
</BorderWrapper>

For that, you need a _product_ analytics platform. 

There are lots of self-service product analytics platforms, but naturally we think PostHog is the best. Not only is PostHog entirely self-service, but it’s also an all-in-one toolset which offers a full suite of everything from session recording and feature flags to path analysis and cohorts. 

PostHog is also unique in that it can be self-hosted on your organization’s existing infrastructure — which means user data stays on your system so that it is safer and more compliant with privacy regulations. This isn’t possible with other self-service analytics platforms, such as Mixpanel or Amplitude, which can be competitive but require you to share data with their systems. 

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />


