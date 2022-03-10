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

The most basic collaborative action for an analytics product is sharing insights. This is critical because usually in larger teams there are multiple stakeholders making or influencing product decisions. In order to make solid decisions, context must be shared. From user conversations, here are the most common use cases we found:
- Sharing with your marketing team the effect of marketing efforts on the product (e.g. high quality signups).
- Sharing with your executive team key metrics on the product.
- Sharing with other engineers or PM findings that need a discussion (e.g. a drop in conversion).

To address the above we introduced robust permalinks to insights that can easily be shared across multiple mediums. These links can now be used to link to a specific insight (with all configurations), even if you have multiple projects.


![Concept of how insight links changed to permalinks today](../images/blog/collaborating-on-posthog_1.png)


Dashboards can easily be shared too, and even if you share a link to a dashboard in a different project, if the user has access to that project, they'll be automatically switched to that project.

For even larger teams, new challenges arise when collaborating with dashboards. In particular, we found a strong need to prevent accidental changes that would affect metrics for others. In small teams this is usually not problematic as it's common for a single person to own the analytics process. So we introduced granular permission controls to dashboards

- Permalinks
- Granular dashboard permissions


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
 
### Email subscriptions to dashboards and insights


### Embeddable graph images



### Universal search
TBD

### Activity feed
TBD




As always, we welcome and highly encourage you to share any feedback you may have about this or any other feature. Give us a shout in our [community Slack](/slack) or join us directly for a [call](https://calendly.com/posthog-feedback) with our Product or Engineering team.


<div style="border: 1px solid #D9D9D9; margin-bottom: 16px; margin-top: 16px;"></div>

[1]: Based on the average number of discoveries per active user and the number of teammates that never perform a discovery, we estimated that we could get at least a ~12%+ increase in active discoverers, and 20%+ increase in weekly discoveries.