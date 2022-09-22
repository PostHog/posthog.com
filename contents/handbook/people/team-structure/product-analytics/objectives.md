Input from the execs:

> - Objective: Get 80% of active b2b customers to add their marketing website
>   - Why? Increase # events coming in, which increases revenue. Our hypothesis is that marketing websites have 10-100x more events than applications.
> - Objective: Implement most frequently requested features with 3+ happy companies for the feature launch
>   - Key results:
>     - Implement the following:
>       - Multiple breakdowns
>       - Cohort style queries (did x event x times), but within a query itself
>       - Composite events: ‘Any event’, ‘New user’ (users first event), ‘top events’
>       - User composition (ie pie chart where you can select properties)/
>       - Superscale querying - Get 98% of each company’s insights P99 below an acceptable time (to be worked out by the team)
> - Why?
>   - Quality/parity with other product analytics tools. Delighting customers especially power users, will lead to word of mouth growth.



## Proposed Objective 1: Nail Data Exploration

NB! This objective still needs analysis and clarification

### Why?

Product reason:

- We have a pretty good interface for data *visualization* (trends, funnels, retention, etc), but not so much for data 
  *exploration* (events, persons). Users have been asking for more.
- The biggest pain comes from not being able to move between different types of related data. Imagine [this scenario](https://github.com/PostHog/posthog/issues/7963#issuecomment-1010235411) (© @rcmarron)
> 1) "I wonder which organizations have used feature Y"
> 2) Search for that event/action and change the tab to organizations
> 3) "Interesting CompanyXYZ is using it, I wonder who"
> 4) Flip to persons + add an organization filter for CompanyXYZ
> 5) See the persons
> 6) "I wonder how/why they're using it"
> 7) Click recordings + see the recordings
> It would be pretty clunky/impossible to explore your data in that way with today's interface. 
- Currently you need to re-create this same filtered query on 3-4 different pages and manually copy over the properties. 
  It's doable, but not a great experience. 

Code reason:
- We have a lot of bespoke bridges to show related data in the interface (people on insights, recordings on people).
- Every new one adds more complexity. 
- This compounded by ever so slightly different use of filters on different data types.
- The further we continue down this path, the harder it'll be to have a fully integrated product across all data.

Meta reason:
- We now have separate product teams. 
- If we're not careful, we'll end up with inoperable products. 
- This builds the first shared bridge between all of them.

### How?
- Universal Search: https://github.com/PostHog/posthog/issues/7963
- An "explore" interface/table, which supports input from various swappable data sources, with a unified set of filters applied to data.
- Support for custom columns and [formulas](https://github.com/PostHog/posthog/issues/11913) on those tables.
- Ability to save as a cohorts, save as an action, or export as a CSV when the data permits.
- The ability to link to these tables from anywhere. "Explore further" links wherever we show *any* data in the interface.

### Future steps.
- Replace all other data tables in the app (events list, persons list, etc) with this interface.
- Interconnect all the ideas here: https://github.com/PostHog/posthog/issues/3765
- Add this power to the toolbar. E.g. add an action, see user recordings and explore further.
- If we add a bit of text parsing as a follow-up project, this would lead the way to an interface like this:

![image](https://user-images.githubusercontent.com/53387/191732592-569aa93e-7757-4f09-a109-3f7eb5eff2b7.png)

## Proposed Objective 2: Nail Web Analytics
- Why? A lot of our customers are only using us to track their product, and not their marketing website.
  Our hypothesis is that marketing websites have 10-100x more events than applications.

- Analysis:
  - We are not seen as a web analytics company, and have previously worked to avoid that title.
  - There is a large overlap between web and product analytics. Our infrastructure can handle both usecases.
  - Google is sunsetting the traditional "google analytics" web analytics product ("universal analytics"), and moving
    everyone to GA4. A lot of people are not happy with this, and are jumping ship. We could capture a lot of new users.
  - If we build an analytics product that serves the needs of web marketers and integrates with the rest of our stack,
    we're well suited for a lot of new growth.

- Steps:
  - Figure out why are 80% of our B2B customers not using us for their marketing website?
    Is it missing features? Cost? Perception? Something else?
  - What are the needs of typical marketing websites and marketers? A guess: better ad and source tracking.
    Which of these are reasonable to build on our platform?
  - Do we want to move into this segment, or should we avoid it? Is it a distraction from our mission of helping people
    build better products? Might this result in a lot of low volume low quality free users?
  - Actually implement what comes out of this analysis

This objective includes a lot of product work to figure out what needs to be done. Thus it's the second objective
of the quarter. The idea is to give product and design enough time to get ahead of the engineers, who will start with
objective 1.


