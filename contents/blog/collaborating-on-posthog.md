---
date: 2022-03-24
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
Sometimes you don't know what you're looking for, or you don't know where to start. There's many different avenues to improving your product, and in particular there might be opportunities for improvements across a myriad of places. For instance, we recently [discovered](https://github.com/PostHog/posthog/pull/7973) users seldom use our paths advanced features and these could introduce mental burden to users.

We created a project homepage with the goal of surfacing helpful insights very quickly that you may not have had in your radar. These insights can hopefully help you find product avenues worth improving. By making it the default page on PostHog, our aim is to help users make quick discoveries. We'll surface your most important product & company metrics here as well as popular insights. We're leveraging social proof from what other teammates are doing in your app to help you discover more product improvements.

In addition, if your team uses the recordings feature we'll also surface the most recent recordings here. We found that on average returning users to the recordings feature discover proportionally more than 3X than other users (more context [here](https://github.com/PostHog/posthog/issues/8595#issuecomment-1056916848)). This should also help drive qualitative discoveries about your product.


Mockup / screenshot here.


### Use case three: Leverage what others discovered
We found two general profiles of users of PostHog, people who are naturally curious and whose job leads them to discover insights all the time and across multiple dimensions, and people who use PostHog to answer specific questions as they arise. For people in the second camp, we wanted to improve the experience so they can leverage what natural discoverers already do. So we made it a lot easier to both save and find saved insights.

The first part, for people who create insights, we've made it really easy to save now. With one-click saving and automatic insight naming you can be sure to save any useful insight for others to discover. Keep in mind the more detailed title & description, the easier it will be for others to discover useful insights.

![Screenshot of automatic insight naming](../images/blog/collaborating-on-posthog_3.png)

And for people who love discovering insights that others helped create, we made it easier to search and find saved insights.

![Screenshot of saved insights](../images/blog/collaborating-on-posthog_2.png)

Finally worth mentioning that in the context of expanding knowledge sharing and making sure anyone can answer questions with PostHog, we introduced the new [Data Management](link_to_blog_post_here) feature, which aims to bring all the context on how your product is instrumented to your entire organization. No need to ask an engineer or the PM for which event you should use to answer a question.

## What's next?
We continue to actively work on improving collaboration throughout the product and we have some specific plans in our short term [roadmap](https://posthog.com/handbook/people/team-structure/team-app#roadmap). However, we're a fast moving company and we continuously reprioritize based on user feedback, market and need changes, and strategy changes, so while our goal to make more people successful with PostHog will remain, the way we tackle this problem and the actual product changes may change.

With the disclaimer above in mind, here's some exciting stuff we hope to ship soon. 
### Slack Previews

Almost every team uses some sort of IM tool (think Slack, Discord, MS Teams, ...) and in particular, it's a place for discussions. We believe that adding a bunch more context directly in your IM tool when you share a link to a PostHog insight or dashboard will speed up discussions (e.g. a screenshot of the graph, general details, recent changes, ...). We're starting with Slack to test drive this concept, but if successful, expanding to other tools will make sense.
 
### Email subscriptions to dashboards and insights
As we analyzed dashboard usage in PostHog (and from conversations with users too), we discovered is quite common for teams to have 1-2 dashboards that represent critical metrics for their product and their company. These metrics are so important, that keeping an eye out on them continuously is strongly advised (think revenue or number of sales for an e-commerce company, or retention for a pre-PMF startup). A very user friendly way of doing this is integrating with current workflows, and almost everyone uses email. So you'll be able to start your Mondays (or any other day) with a digest of how your product and company are doing.


### Embeddable graph images

You've seen the typical Medium post with a graph, well we have too and we hate they're not PostHog graphs. But aside from that superficial argument, teams have different workflows and tools where product context is shared (e.g. an intranet, Notion, Google Docs, code repositories, blog posts). Usually product decisions are at least data-informed (and we do hope this will help drive this behavior further), so we want to make sure that the context from product data is properly shared, accessible and preserved. In particular, we also want to make sure these context remains up-to-date.


As always, we welcome and highly encourage you to share any feedback you may have about this or any other feature. Give us a shout in our [community Slack](/slack) or join us directly for a [call](https://calendly.com/posthog-feedback) with our Product or Engineering team.


<div style="border: 1px solid #D9D9D9; margin-bottom: 16px; margin-top: 16px;"></div>

[1]: Based on the average number of discoveries per active user and the number of teammates that never perform a discovery, we estimated that we could get at least a ~12%+ increase in active discoverers, and 20%+ increase in weekly discoveries.