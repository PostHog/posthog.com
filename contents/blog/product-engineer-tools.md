---
date: 2022-12-23T00:00:00.000Z
title: The essential tools used by product engineers
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
  - Guides
  - Product engineers
---

Like every role, [product engineers](/blog/what-is-a-product-engineer/) have a set of essential tools for their work. Their need to gather insights, ideate, and deploy solutions independently makes creating an efficient stack all the more important. Here we explore the popular engineering, product, and automation tools that will help you gather insights and deploy product improvements fast.

## Tools for talking to users

Product engineers focus on users, which means you **must** talk to them. The tools for doing this aren’t groundbreaking, but they are useful for accomplishing the goal of building a product users' value.

Tools like Zoom, Google Meet, and Slack (especially shared channels) are obvious starting points, but consider [Superhuman](https://superhuman.com/) for streamlining email, and tools like [Cron](https://cron.com/), Calendly, and [SavvyCal](https://savvycal.com/) for improving your calendar workflow. Automation tools like [customer.io](https://customer.io/), aha.io, [n8n.io](https://n8n.io/), and Zapier are also useful.

![User interview](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-engineer-tools/user-interview.jpeg)
<Caption>We use a combination of Zapier, customer.io, Calendy, feature flags, and our <a href="https://github.com/PostHog/user-interview-app">interview app</a> to automate scheduling user interviews.</Caption>

We recommend avoiding survey tools, though. While general user information is valuable to product and marketing teams, product engineers need direct feedback on what you are building.

## Tools for understanding user behavior

Product engineers supplement talking to users with product analytics and usage data. This data measures the impact of features and changes to the product. It also helps to discover areas for improvement. Usage data is useful for setting goals, measuring results, and prioritizing future work.

For example, you set an OKR to increase feature usage by paid users. To measure and improve this, you need data on the usage of the feature and the areas surrounding the feature. With that data, you can analyze the feature usage conversion, retention, correlated behavior, and more.

[PostHog](/product#top-features) has a suite of product analytics tools built for this. Product engineers (like [Y Combinator’s](/customers/ycombinator)) use PostHog to capture, organize, analyze, and visualize product usage data. PostHog also has session recordings for going into the details of an individual’s experience with the product.

![Session recordings](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-engineer-tools/session-recordings.png)
<Caption>PostHog's <a href="/product/session-recording">session recordings</a> visualize what users are actually doing in your product</Caption>

On top of PostHog, customer data platform or ETL tools like [Segment](/docs/libraries/segment), [Hightouch](/blog/hightouch-posthog-reverse-etl-integration), [Airbyte](/docs/apps/airbyte-export), Integrate.io, and Fivetran are useful for moving and combining data between sources and storage locations. This enables you to have the data you need for analysis, where you need it.

## Tools for organizing knowledge and priorities

Insights from users and data help product engineers develop high-impact ideas to build, but you'll need a way to organize all these ideas. Note-taking and task management tools help with this, but many can also weigh down individuals and teams by introducing unnecessary work that gets in the way of shipping products (**cough** Jira). The ones for product engineers ideally don’t do this.

An example specifically built for product engineers is [Linear](https://linear.app/). Linear is a task management app focused on helping teams build great products. It does this by having engineer-focused design and functionality, while still being a product tool. In practice, this means being keyboard first, streamlined for technical use cases, engineering-focused automations and integrations, and quick loading speeds.

![Linear](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-engineer-tools/linear.png)
<Caption>The benefits of Linear built specifically for product engineers.</Caption>

Like the “talking to users” tools, many of these tools won’t shock you. Other note-taking and task management tools product engineers rely on include GitHub, Google Docs, Trello, Notion, Asana, and Coda. Use what you're comfortable with, but we recommend trying Linear if you haven't already.

## Tools for going fast with CI/CD and testing

Successful product engineers ship new features to users fast. This means writing new code, integrating it with existing code, and deploying it, all as fast as possible. The best product engineers are often shipping multiple updates per day. You need a strong continuous integration and deployment pipeline (CI/CD) to ensure a smooth transition from local development to production.

Tools used for this include GitHub, GitLab, CircleCI, Jenkins, Docker, [Depot](https://depot.dev/), [codefresh](https://codefresh.io/), and more. These tools automate development tasks such as builds, testing, and deployment to help you ship fast.

Because product engineers ship fast, you also must make sure you aren’t breaking things. You likely don’t have the time or resources for a dedicated QA team so you rely heavily on automated testing in its place. Implementing test frameworks like [Jest](https://jestjs.io/), [Cypress](https://www.cypress.io/), and [Playwright](https://playwright.dev/) are all critical for product engineers to continue moving fast without ruining the existing user experience.

![Tests](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-engineer-tools/actions.png)
<Caption>We use GitHub Actions to run our Cypress, Jest, Django, and Storybook tests to ship fast while maintaining quality.</Caption>

Even with all this preventative work, breaking changes can still happen. Feature flags help prevent this. Luckily, if you’re using PostHog for analytics, you can also use it for [feature flags](/product/feature-flags) to help roll out and roll back changes quickly.

## Tools for automating away infrastructure work

Along with CI/CD is the automation of infrastructure work. Product engineers want to ship fast, and dealing with optimizing infrastructure prevents this. You care about spinning up new infrastructure quickly more than optimizing it.

Many infrastructure-as-a-service companies exist, including the big ones like Google Cloud, AWS, Cloudflare, Heroku, and Azure. There are many alternatives to these that product engineers might prefer because of their deployment speed and tailored use cases (such as serverless or edge computing). These include [Netlify](https://www.netlify.com/), [Render](https://render.com/), [fly.io](http://fly.io), [Vultr](https://www.vultr.com/), and [Railway](https://railway.app/).

A trend popular among product engineers is bringing the code framework and infrastructure closer together, optimizing both for each other. The best example of this is [Vercel](https://vercel.com/), which also develops the [Next.js](https://nextjs.org/) framework popular with product engineers. Vercel helps deploy highly performant frontend code fast and is tightly integrated with Next.js to maximize benefits from the framework's design.

![Vercel and Next.js](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-engineer-tools/vercel.png)
<Caption>The benefits of integrating infrastructure and code from Vercel and Next.js.</Caption>

Other examples of these code and infrastructure combos include [Supabase](https://supabase.com/), [PlanetScale](https://planetscale.com/), and [Hasura](/customers/hasura). They abstract away infrastructure work while providing speed and tailored offerings. Software engineers and large teams might find their limited customization and options constraining, but product engineers love them.

## Tools for owning bugs and incidents

As Uncle Ben from Spiderman once said “with great product power, comes great product responsibility” (I’m paraphrasing). Ownership over the complete product experience is important for product engineers. This means being responsible for bugs, issues, and incidents in your product.

Good tools for this include:
- [Grafana](https://grafana.com/), [Better Stack](https://betterstack.com/), [Metabase](https://www.metabase.com/), and more to provide observability into issues in your code. 
- [Sentry](https://sentry.io/welcome/) and [LogRocket](https://logrocket.com/) to monitor errors. 
- [Incident.io](http://Incident.io) and [PagerDuty](https://www.pagerduty.com/) to help teams respond to incidents when they happen.

![Sentry](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/product-engineer-tools/sentry.png)
<Caption>Sentry provides multiple tools (including stack traces) for monitoring errors and problems in your code.</Caption>

Product engineers are reliant on these because you are responsible for the products you ship. You can't pawn maintenance off on other team members. Making sure you keep track of performance and deal with issues effectively is vital. It also ensures you remain focused on shipping high-quality code the first time.

## What is the point of all these tools?

The point of all of these tools is to help product engineers ship better products that solve users’ problems and provides them value faster. If the tools aren’t helping you do this, they aren’t doing their jobs.

Using all the tools we listed here is overkill. Product engineers are not product managers, and limiting the amount of time in these tools ensures that. You must always dedicate the majority of your time to writing and shipping code.

Many of these tools trade customizability (and money) for speed and specificity. Software engineers, especially in large organizations, don't want this trade, but product engineers do. The process of shipping fast, iterating, breaking (and fixing) code along the way is core to what product engineers do. It is core to how successful products get built.

## Further reading

- [What is a product engineer (and why they matter)](/blog/what-is-a-product-engineer/)
- [Startups, stop treating engineers like a different species](/blog/stop-treating-engineers-differently)
- [Product engineer vs software engineer: what's the difference?](/blog/product-engineer-vs-software-engineer)
