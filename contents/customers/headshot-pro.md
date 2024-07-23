---
title: How Headshot Pro analyzes Google Adwords data in PostHog
customer: Headshot Pro
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/headshot_light_22c5a2ce27.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/headshot_dark_b36935a453.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/headshot_pro_posthog_56e4ed68be.png
industries:
  - AI
users:
  - Growth
  - Engineering
  - Product
toolsUsed:
  - Data warehouse
  - Product analytics
date: 2024-06-02
---

Founded by serial AI entrepreneur Danny Postma, [Headshot Pro](https://www.headshotpro.com/) has rapidly grown to become one of the most popular AI photo generation tools. Despite only launching earlier this year, the platform has already gathered over 80,000 users and generated more than 13 million images. 

“I used to have a whole bunch of side projects,” says Danny, “But Headshot Pro was so successful it’s become my main focus. I’ve started to build a team around it and that’s where our need for product analytics came from — I needed one source of truth for both marketing and developers to share.”

After asking for recommendations from other founders, Danny narrowed his list to just two contenders — [Mixpanel and PostHog](/blog/posthog-vs-mixpanel). Both platforms enabled in-depth analytics, but with PostHog this was only the start of what was possible. 

“We looked at Mixpanel but it was always too expensive,” says Danny. “Plus, I wanted an analytics tool where I could look at different types of data. If I get concerned about something I want to dig into it — and that’s why I joined the data warehouse beta when it first launched.”

### From beta warehouse to data warehouse

During the beta [our Data Warehouse team](/teams/data-warehouse) were naturally curious for feedback, so it wasn’t long before they reached out to speak with Danny about what he needed.

“Headshot Pro wasn’t using a data warehouse before PostHog,” says [Eric](/community/profiles/30209), our data warehouse team lead. “Instead, they were analyzing data in the respective platforms — and they really wanted to analyze their marketing data alongside product data. So, we helped them [get data from Google Adwords into PostHog](/docs/data-warehouse/tutorials).”

<BorderWrapper>
<Quote
    imageSource="/images/customers/eric.png"
    size="md"
    name="Eric Duong"
    title="Software Engineer & Data Warehouse Team Lead, PostHog"
    quote={`“Many teams could benefit from following Danny’s lead and bringing advertising data into PostHog and starting to track advertising performance alongside product usage.”`}
/>
</BorderWrapper>

The process for getting Adwords data into PostHog is simple: three times a day Google Adwords automatically exports data in JSON format to a Google storage location. The data warehouse then syncs with this location as a custom source, giving Danny’s team all the data they need to make decisions about where to focus resources. 

### Creating a single source of truth in PostHog 

“It’s been amazing having everything in one place,” says Danny. “We had previously decided to scale down one of our distribution channels because we couldn’t analyze data properly in the native platform and we didn’t believe it was working.” 

“However, once we had the data in PostHog, we realized it was actually a very profitable channel for us and we quickly started it back up. Now, we make sure to put everything in PostHog.”

Even in situations where it was already possible to analyze data in the original platforms, it’s still often been faster and more valuable to have the data in PostHog. 

“We’ve gone as far as just pulling in our bank data too,” says Danny. “Before, if I wanted to analyze business data, I may have to wait two months for my accountant to come up with it. Now, I see it day-by-day on a dashboard.”

“Honestly, my advice to new users would be: pull in everything you can. Avoid the clutter and the platform switching. Get it all into PostHog and it makes it so much easier to work with.”


