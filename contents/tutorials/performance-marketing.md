---
title: How to track performance marketing in PostHog
sidebar: Docs
showTitle: true
author: ['ian-vanagas']
date: 2022-12-02
featuredImage: ../images/tutorials/banners/performance-marketing.png
topics: ['funnels', 'insights']
--- 

Performance marketing is paying for ads, attention, and clicks to your site where you try to convert them into users and customers. It is paying for users to see your site. Companies use channels like Google, Facebook, other social media, ad networks, and sponsorships to do this. 

Performance marketing is different from word-of-mouth or organic marketing where potential users run into you without having to pay for it. It also isn’t brand marketing, which focuses on awareness (which is difficult to measure) to get users. Performance marketing focuses on traffic and conversion (which is easier to measure).

Performance marketing campaigns have many different goals such as traffic, lead generation, and signups. In this tutorial, we’ll cover how to track each of them and your overall performance marketing efforts.

## Tracking performance marketing with UTMs

The first step in performance marketing is ensuring proper tracking. To do this, you must add Urchin Tracking Modules (UTM) to your links in each channel. These are pieces of information in your URL with details about where the user came from. They look like `https://posthog.com/tutorials?utm_source=google`.

PostHog automatically captures UTMs our JavaScript library (and snippet). The ones we support are `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, and `msclkid`. Pageview events have these added as a property, and users have them added as an person property (both most recent and initial).

Any UTM that isn’t one of these is not automatically tracked and you’ll have to capture it yourself. You can do this by checking the URL from the UTM then:

- capturing a specific event for that UTM
- capturing a pageview with the UTM as a property
- setting an initial UTM person property (once)

Many channels for performance marketing allow you to customize your UTMs, and we recommend doing that to get the best data possible.

> **Tip:** for sponsorships, we often create custom links like `posthog.com/sponsored` which redirect to links with UTMs because they are easier to type and look better while allowing us to be consistent in measuring with UTMs.

## Tracking traffic from performance marketing

Once you’ve set up UTMs, you can start to use them to track data from different sources of performance marketing. Assuming you have pageview events coming from different sources, you can create a few different insights relevant to performance marketing. 

The first is pageviews broken down by UTM source. To do this, create an insight, filter pageview where UTM Source is set, and breakdown by UTM source. This  gives you a breakdown of traffic from specific sources. 

![UTM source set](../images/tutorials/performance-marketing/utm-source-set.png)

The problem with this is that UTM sources might not be ads you are running. Any site or link can set a UTM source, so you might have sources other than ads.

To see specifically, the traffic from channels, add another filter that explicitly calls out the channels you use. For example, if you run ads on Facebook and LinkedIn, you can set UTM source to equal “facebook” and “linkedin.” 

![Specific UTMs](../images/tutorials/performance-marketing/utm-source-breakdown.png)

Even better, use the UTM campaign, content, medium, or check for a specific click ID being set. PostHog captures any Google `gclid`, Facebook `fbclid`, or Microsoft `msclkid` parameters in the URL. Change your filter from UTM source to campaign (or one of the others) and pick your campaign. 

![UTM campaign and click ID](../images/tutorials/performance-marketing/utm-campaign.png)

Doing a combination of these to fit the performance marketing you are doing helps you track the total traffic from individual performance marketing campaigns. 

## Tracking signups from performance marketing

Every company has a goal for its performance marketing. For some, it is activation. For others, it is leads. For us at PostHog, it is signups. In this section, feel free to replace the signup event (in our case, action) with the relevant goal (event or action) for your performance marketing. 

Tracking signups is relatively similar to tracking traffic, we just replace the pageview event with our signup action. 

To filter, you can again use a UTM attribute. You included it as a property in your signup event, you can use the event property as a filter. If not, you can use a UTM value (or initial UTM value) in person properties. This option is used more because PostHog automatically adds this value to persons.

> A person has both initial UTM properties and most recent ones. The initial property is the first UTM value set for a person. The most recent property is the last UTM value set for a person. Events only have a single UTM property for the most recent value. 

In this example, we’ve chosen the unique number of users who completed the “user signed up” event, then filtered the group of users for those with the initial UTM source being set. 

![Signup with UTM](../images/tutorials/performance-marketing/signup-utm.png)

You can use other UTM filters from the prior section to get the signup numbers (or whatever your goal is) from your performance marketing.

> **Tip:** at PostHog, we include a “where did you hear about us” field in our signup flow, which helps a lot as an extra layer to our marketing tracking (including performance marketing).

## Tracking performance marketing conversion

Now that we have information on performance marketing leading to traffic and our key metric (signups), we can also look at the conversion between the two. We want to make sure our performance marketing converts into signups and customers. To do this, we are going to create some funnels.

In insights, go to the funnels tab. We’ll want our first step to be a pageview with a filter of an initial UTM value of some sort (like we’ve done before). Our second step is a visit to our signup page. Our third, and final, step is our key metric (signups). Altogether, this will look something like this:

![Performance marketing funnel](../images/tutorials/performance-marketing/funnel-basic.png)

After creating this funnel, we can change this in a bunch of ways. First, we can break conversion down by our UTM properties to see conversion for different channels, sources, and more.

![Breakdown funnel](../images/tutorials/performance-marketing/funnel-breakdown.png)

Second, we can change the graph type to “Historical trends” to give us a better idea of how our performance marketing conversion is doing over time.

![Historical trends type funnel](../images/tutorials/performance-marketing/funnel-type.png)

On top of these, there are lots of settings to tweak your funnel such as “Conversion rate calculation,” “Conversion window limit,” and “Date range” to match the insights you want to get about your performance marketing. 

## What are the benefits of measuring your performance marketing?

As you’ve seen, PostHog has many tools for measuring performance marketing. This helps you figure out if it is making a difference in your business. Here are some recommendations on how you can use performance marketing measurements to make channels to improve your business.

### Comparing channels

Each of the ways of measuring performance in this tutorial allows you to breakdown by channel. This enables you to compare channels to find out which ones are working and which aren’t.

You can compare traffic, signups, and conversion with your spend on each channel. Making sure the best channels get the most spend ensures efficiency. You can double down on ones that are working, and lower spend on ones that aren’t. If there are problem areas, you can quickly identify and fix them.

Having a channel comparison also helps make future marketing strategy choices. A good performing channel encourages more investment into organic there or hiring people to help improve it. Knowing where you do best is key to creating a competitive advantage.

### Test new channels, and improve existing ones

Having measurements for performance marketing in place enables you to test new channels and improve existing ones. Without measurement, you won’t know how channels are doing. This leads to unnecessary waste and inaccurate decisions.

Performance marketing trends are always changing. New channels are opening up. New ads are tested. What works now won’t always work. Measuring performance lets you analyze trends and adjust strategies based on what’s currently working.

### Grow your business

The ultimate goal of performance marketing is to help you make more money and grow your business. Measuring and tracking performance helps to ensure you’re on the right path toward achieving that goal.

## Further reading

- [Building an AARRR pirate funnel (how and why)](/blog/aarrr-pirate-funnel)
- [How to calculate and lower churn rate](/tutorials/churn-rate)
- [How to build, analyze and optimize conversion funnels](/tutorials/funnels)

<NewsletterTutorial compact/>
