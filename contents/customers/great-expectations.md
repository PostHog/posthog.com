---
title: 'How Great Expectations uses PostHog to improve content strategy'
customer: Great Expectations
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/gx_logo_light_ce286f1955.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/gx_logo_dark_5a1dba99f7.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog_great_expectations_f90a29aa4d.jpg
featuredCustomer: false
industries:
  - 'SaaS, Data'
users:
  - Growth
  - Engineering
  - Product
  - Marketing
toolsUsed:
  - PostHog Cloud
  - Insights
date: 2024-10-05
---

Founded in 2017, [Great Expectations (GX)](https://greatexpectations.io/) helps data teams have confidence in their data. Its SaaS platform, GX Cloud, is a fully managed end-to-end solution for managing the data quality process. As you’d expect, the team takes its own data seriously and decided in 2023 that they needed to gather data from across the entire user journey.

“We have our marketing site, our docs website, and our product,” explains Marketing Project Manager Erica Howard. “We needed to look holistically across all three of these. Prior to PostHog we hadn’t been able to follow the full user journey or track data in a granular way.”

[Implementing PostHog across all three domains](/tutorials/cross-domain-tracking) also meant that this wasn’t just solving a need for the marketing team either. Soon, every team in the company was using PostHog in some capacity to gather the data they needed.

“Our growth team also uses PostHog, plus some of our software engineers,” says Erica. “Personally, I came in cold and didn’t know PostHog at all — but once I’d seen one insight setup it was fairly easy to replicate and go from there. There’s a whole lot more I could do in PostHog, but getting started was pretty easy.”

### Analytics, annotations, and activation 

As soon as tracking was implemented across the three touch-points, the marketing and growth teams built reporting dashboards to track their most important metrics.

“We look at things like the number of unique users and their referral sources,” says Erica. “We also track the number of pageviews per user, session durations, pages per session, etc. We use [user paths](/docs/product-analytics/paths) a lot to see how people move through the site. We have dashboards for most things, plus specialized views looking at particular marketing pages.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/erica.jpg"
    size="md"
    name="Erica Howard"
    title="Marketing Project Manager, Great Expectations"
    quote={`“I had always wanted a tool like PostHog that let me really follow user journeys and things like that. Other tools, like Google Analytics, just let you look at overall visitors. PostHog goes so much further!”`}
/>
</BorderWrapper>

Given her role working across multiple marketing projects at once, Erica finds [annotations](/docs/data/annotations) especially useful because they enable teams to add comments directly to the data. Typically these comments add extra context about why a metric is spiking, such as pointing to a marketing campaign which began at that point in time.

“We’ve definitely made decisions off the back of these insights,” says Erica. “For example, we looked at the impact of having certain information on our homepage on user journeys and pageviews and responded accordingly.””

### CRMs, Content marketing and collaboration

Tracking this data hasn’t just helped shape what content the team features on the homepage — it’s also shaped the broader content strategy and how the team works with writers.

“When we look at our blog traffic we map in specific blog pages,” explains Erica. “We’ve learned that some of our blogs have a lot of longevity and will continue to drive traffic over many months or years, whereas some don’t. Putting all these in a line graph helps us foresee what will take off and keep growing, versus what just has a launch bump.”

In addition to helping GX spot which content works, PostHog also helps the team handle user information and leads too. 

“As an MVP we connected PostHog to Zapier to HubSpot,” says Erica. “That enriched HubSpot with user activity to help us segment our leads and run automated communications. Eventually, we formalized this pipeline by integrating PostHog with our Databricks warehouse, which now keeps HubSpot up to date. This Databricks integration also helps keep our data science team current on product usage and web traffic data.”

“It’s amazing, really. Before PostHog we tried some solutions which weren’t very user-friendly. PostHog is a lot quicker and works well with Hubspot so that we now have a whole new level of data availability...even if you’re just using the entry-level layer of PostHog then it’s still easy to analyze data with.”
