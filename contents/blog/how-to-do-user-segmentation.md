---
date: 2021-10-28
title: How to do user segmentation
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: marcus-hyett
featuredImage: ../images/blog/blog-generic-3.png
featuredImageType: standard
---

# How to do user segmentation


## What is user segmentation?

User segmentation is the process of looking at your user base and breaking it down into groups of similar users, based on characteristics of the users or their behaviors. These groups can be used to perform focused analysis to identify opportunities to improve and grow your product.

For example: For a global e-commerce company like Amazon, they might have user segments such as: Users in the US, Users who subscribe to fast shipping, Users who use the mobile app


## Why is user segmentation essential?

Every organization needs to understand their users in order to serve them best, segmenting users allows you to prioritize and focus on how you serve their unique needs. User segmentation is essential for:



* **Personalization:** Most products serve a wide range of different users tailoring the experience to certain users means they’ll be more engaged and more successful (e.g. recommending products that can be delivered to your region)
* **Marketing:** You need marketing that’s relevant to your users (e.g. sending special offers to potential customers in the Japan in English will lead to low conversion rates)
* **Prioritization:** In order to make your product more successful, you can have more impact by focusing on solving specific problems for specific segments of users rather than trying to build a one-size-fits all solution (e.g. building a price comparison tool for price conscious customers)


## What are the 4 different types of user segmentation?

There are 4 key types of segmentation you can use to identify groups of users, you can use multiple segmentation types based on your use case.



* **Demographic:** Looking at attributes of the person (e.g. age, household income, gender)
* **Geographic:** Considering where they are from or where they are currently (e.g. delivery town or country of residence)
* **Behavioral:** Considering how they use the product (e.g. frequency of use, average order values)
* **Technographic:** What technologies do they use to interact with the product** **(e.g. mobile, desktop or voice assistant)


## How do you do user segmentation?

In PostHog you can easily perform the 4 different types of segmentation in order to perform deeper analysis and grow your product.

We’re going to continue to use the example of a Global Ecommerce company like Amazon.

### Demographic

We need to understand whether older users make more purchases than younger users - to

prioritize which segment to focus on building new features for so we can drive more purchases

**Step 1: Pass through demographic information about users in your events**

In order to breakdown by demographic information you first need to pass it through when you identify your users (if you’ve already done this skip to the next step).

In your ```posthog.identify``` call all you need to do is set the demographic properties you wish to analyze later on:


```
posthog.identify('Alice', {'$set': {'age-group': '20 - 30'}})
```

**Step 2: Open the trends tool and analyze purchases**

Go to “Insights” and trends within posthog then select the event which represents purchases (or the event you wish to focus on:

![image](https://user-images.githubusercontent.com/85295485/139251602-edd20f46-4a46-4770-99fe-c082dcee4c76.png)

**Step 3: Break down purchases by user age **

Go to the “breakdown by” configuration and select “age group” (or the name of your property) from the person properties list and set the visualization to value to give us a clear ranking of the top age groups by purchase

![image](https://user-images.githubusercontent.com/85295485/139251553-376ae7bb-f4fb-4c10-ada5-5a9d21866b16.png)

_Conclusion: You can instantly see that most purchases are coming from users in the 30 - 40 segment, so we might want to focus our new features on this segment to drive even more purchases_

### Geographic

We need to understand in which countries users are looking at products but not buying them - so we can work out which countries we should launch currency support for next

**Step 1: Enable GeoIP plugin to automatically augment events with geographic context**

If you haven’t done so already, enable the GeoIP plugin in the plugins tab within your posthog instance. This will enable you to automatically enrich events and persons with geographic data.

![image](https://user-images.githubusercontent.com/85295485/139251434-fc87aebe-ef99-46c8-bdfb-ef9aa19a273d.png)

**Step 2: Open the trends tool and analyze purchases and views**

Go to “insights” and “trends” to create a new insight, since we want to know the conversion rate between viewing and purchasing a product, we need to add two events to this graph, one for product viewed and one for purchase

![image](https://user-images.githubusercontent.com/85295485/139251400-12b1b1a0-1a6a-4924-8448-7f099777cd5c.png)

We also create a simple formula to calculate the conversion rate, we divide (B) Purchases by (A) Products viewed

**Step 3: Break down by user countries**

Using “breakdown by” select Country Name from the user properties to show you the average conversion rates per country

![image](https://user-images.githubusercontent.com/85295485/139251355-889cd03c-efdb-42de-a8fb-15ac54066e02.png)

_Conclusion: You can see we have a solid conversion rate in the US however the conversion rate in Ireland is lower, so we might want to invest in supporting the local currency (Euros) in Ireland to get more purchases_

### Behavioral

We need to understand who our “power buyers” are - so we can tailor a marketing campaign around for them and keep them loyal to our product

**Step 1: Open the trends tool and identify power buyers**

As before, go to “insights” and “trends” and select your event to be “purchase”, in order to identify our “power buyers” we can breakdown by “email” or another unique property of a user. Switch the visualization to value and this will show us the users making the most purchases in the last 30days

![image](https://user-images.githubusercontent.com/85295485/139251311-a3d9699b-f54c-443c-979b-4765b1e8b8c9.png)

**Step 2: Create a cohort for power buyers**

It’s clear that we have a group of really active users which make more than 20 purchases per month. We can now create go to “cohorts” anc create a new cohort for these “power buyers”

![image](https://user-images.githubusercontent.com/85295485/139251205-98bade90-b82e-403e-b3b1-19d756013a81.png)

**Step 3: Download the cohort for your marketing campaign**

Go to cohorts and click the button to download the details of this cohort of users, you can then import this into your marketing tools to send emails and keep the “power buyers” engaged with your product

![image](https://user-images.githubusercontent.com/85295485/139251119-bb163c8e-ce84-44c2-b3bd-5b4d7c78bece.png)


### Technographic

We have a website that we have designed for desktop, we need to understand if we should invest in optimizing it for mobile users by creating a device segmentation.

**Step 1: Open the trends tool and look at page views**

As before open up “insights” and “trends” and use the default the pageview event

![image](https://user-images.githubusercontent.com/85295485/139251087-73cae3ff-b7bc-47ac-bfc4-a87a22485959.png)


**Step 2: Break down by browser **

Configure to breakdown by “Browser” and use the value visualization

**Step 3: Review the mobile vs desktop usage**

You can now see the different browsers, some for iOS and Android representing mobile browsers and others for desktop browsers like Chrome and Microsoft Edge.

![image](https://user-images.githubusercontent.com/85295485/139251025-09167d5d-762e-4245-8fee-b1643f74d511.png)

_Conclusion: Nearly all our usage is coming from people on desktop devices so it doesn’t seem worthwhile investing in a mobile optimized site for this segment right now_


## How can I get started with User Segmentation on Posthog today?

Signup for a free account on posthog.com and start analyzing your users and create user segmentations that enable you to grow your business.
