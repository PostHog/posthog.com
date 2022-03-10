---
date: 2022-03-07
title: Collaborating on PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["paolodamico"]
featuredImage: ../images/blog/generic-release-notes.png
featuredImageType: full
categories: ["Product updates"]
---

PostHog is better with your team. We quickly realized that as more users join an organization, the incremental value derived by each user increases. Consider for instance when you create a dashboard. You only create it once, but then with each user that joins your organization, the dashboard becomes more valuable. We found clear signals of this in our data: organizations with multiple teammates retain on average 30%+ better. We also recognized that conservatively we could increase insight discovery (our [main Product metric](https://posthog.com/handbook/product/metrics)) by more than 20% by improving collaboration workflows [1]. For instance, we discovered that 50%+ of invited teammates never discover a single insight. If we could get these invited teammates properly onboarded, the overall value derived from PostHog would increase significantly.


Armed with the above we set out to make collaboration in PostHog as easily as possible, particularly gearing our efforts to making sure that larger teams are successful, with growing pains that tend to be negligible in small teams. We'll definitely continue improving on this, but we want to show you what we have today.


## Introducing Collaboration

### Use case one: Sharing

The most basic collaborative action for an analytics product is sharing insights. This is critical because usually in larger teams there are multiple stakeholders making or influencing product decisions. In order to make solid decisions, context must be shared (e.g. sharing with your marketing team the effect of marketing efforts on the product, like high quality signups).

To address the above we introduced robust permalinks to insights that can easily be shared across multiple mediums. These links can now be used to link to a specific insight (with all configurations), even if you have multiple projects.


![Concept of how insight links changed to permalinks today](../images/blog/collaborating-on-posthog_1.png)


Dashboards can easily be shared too, and even if you share a link to a dashboard in a different project, if the user has access to that project, they'll be automatically switched to that project.

For even larger teams, new challenges arise when collaborating with dashboards. In particular, we found a strong need to prevent accidental changes that would affect metrics for others. This was mentioned frequently for larger organizations. In small teams this is usually not problematic as it's common for a single person to own the analytics process. So we introduced granular permission controls to dashboards to provide confidence to users that dashboards haven't changed when they shouldn't.


<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_33_0-dashboard-permissions.png" width="500" alt="Screenshot of dashboard permissions" />


### Use case two: Discovering interesting stuff you weren't looking for
- Project home
- Default dashboard


### Use case three: Leverage what others discovered
- Saved insights + automatic insight naming
- Connect to Data Management

## What's next?
We continue to actively work on improving collaboration throughout the product and we have some specific plans in our short term [roadmap](https://posthog.com/handbook/people/team-structure/team-app#roadmap). However, we're a fast moving company and we continuously reprioritize based on user feedback, market and need changes, and strategy changes, so while our goal to make more people succcessful with PostHog will remain, the way we tackle this problem and the actual product changes may change.

With the disclaimer above in mind, here's some exciting stuff we hope to ship soon. 
### Slack Previews

Almost every team uses some sort of IM tool (think Slack, Discord, MS Teams, ...) and in particular, it's a place for discussions. We believe that adding a bunch more context directly in your IM tool when you share a link to a PostHog insight or dashboard will speed up discussions (e.g. a screenshot of the graph, general details, recent changes, ...). We're starting with Slack to test drive this concept, but if successful, expanding to other tools will make sense.
 
### Email subscriptions to dashboards and insights
As we analyzed dashboard usage in PostHog (and from conversations with users too), we discovered is quite common for teams to have 1-2 dashboards that represent critical metrics for their product and their company. These metrics are so important, that keeping an eye out on them continuously is strongly adviced (think revenue or number of sales for an e-commerce company, or retention for a pre-PMF startup). A very user friendly way of doing this is integrating with current workflows, and almost everyone uses email. So you'll be able to start your Mondays (or any other day) with a digest of how your product and company are doing.


### Embeddable graph images

You've seen the typical Medium post with a graph, well we have too and we hate they're not PostHog graphs. But aside from that superficial argument, teams have different workflows and tools where product context is shared (e.g. an intranet, Notion, Google Docs, code repositories, blog posts). Usually product decisions are at least data-informed (and we do hope this will help drive this behavior further), so we want to make sure that the context from product data is properly shared, accessible and preserved. In particular, we also want to make sure these context remains up-to-date.




As always, we welcome and highly encourage you to share any feedback you may have about this or any other feature. Give us a shout in our [community Slack](/slack) or join us directly for a [call](https://calendly.com/posthog-feedback) with our Product or Engineering team.


<div style="border: 1px solid #D9D9D9; margin-bottom: 16px; margin-top: 16px;"></div>

[1]: Based on the average number of discoveries per active user and the number of teammates that never perform a discovery, we estimated that we could get at least a ~12%+ increase in active discoverers, and 20%+ increase in weekly discoveries.