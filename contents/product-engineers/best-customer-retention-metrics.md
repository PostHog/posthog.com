date: 2023-05-09
title: 'The most useful customer retention metrics, ranked'
author:
  - james-temperton
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-marketing/marketing-hog.jpg
featuredImageType: full
tags:
  - Product analytics
  - Product metrics
  - Product engineers
  - Growth
crosspost:
  - Founders
  - Blog
---
You put a lot of work into getting people to use your product, but how much work do you put into keeping them? 

In this guide we’ll cover the key customer retention metrics, who they’re useful for, and how to calculate them. We’ve also put together some benchmarks to measure your business against, and tips on how to improve retention. 

## 1. Customer retention and churn

### What are customer retention and churn?

These are the two most important retention metrics. Customer retention, often referred to as logo churn, is a simple measure of how well your business retains customers. Customer churn is the inverse: how many customers business loses. 

How often you measure these two metrics depends on your business: if you run a monthly subscription business, for example, measure retention monthly. If your customers pay annually, measure it annually. Why? Think of it like this: if the vast majority of your customers are locked into annual contracts, they can’t churn that quickly. Measure churn based on a timeframe that makes sense for your business to collect data you can actually use.

### How is it useful?

Almost any business that relies on repeat customers should be measuring retention and churn. There are some exceptions. If you run a car dealership, for example, you probably don’t need to be measuring retention and churn as cars are, typically, very rare purchases. Likewise, if you’re running a funeral home, customer retention and churn probably isn’t your most important metric.

### How to you calculate customer retention and churn

Once you know the timeframe you want to measure, get hold of the following data:

* The number of customers at the start of your timeframe (let’s call this S)
* The number of customers at the end of your timeframe (E)
* The number of customers added in your timeframe (A)

You can then calculate your customer retention rate by doing a simple sum ((E − A) ÷ S) x 100.

For example, HogTube, a subscription-based, hedgehog-themed YouTube rival, had 1,000 customers (S) on April 1, 2023. By May 1, it had 1,300 customers (E) and added 500 customers in that month. HogTube’s monthly customer retention rate would be:

((1,300 − 500) /1,000) x 100 = 80%. That gives you a customer retention rate of 80%. Your churn rate is just the inverse, 20%.

### What’s a good customer retention rate?

A good customer retention rate – or churn rate – really depends on the type of company you are and the type of industry you’re in. For small to medium-sized SaaS companies, which bill monthly, anything between [3% and 7%](https://www.kalungi.com/blog/saas-churn-rate-benchmarks) is a good churn rate. [Data from Fullview](https://www.fullview.io/blog/average-churn-rate-for-saas-companies) shows that a monthly churn of more than 8% makes growing a business really hard work. 

More established enterprise B2B SaaS companies, which likely sell to larger companies that pay annually and spend big, need to have lower churn. At these bigger companies, monthly churn should be [closer to 1%](https://www.vitally.io/post/saas-churn-benchmarks).

Most companies, for obvious reasons, keep churn rates secret. [Buffer](https://buffer.com/metrics), which is notoriously transparent, had a monthly churn of 5.42% in March 2024, and an average revenue per user of $27.16 during the same month. 

Higher churn at early-stage startups is totally normal and fine, so long as you’re able to grow fast and improve your product. If and when churn slows, that’s a good sign you’ve found [product-market fit](/founders/product-market-fit-game). 

One reason why Netflix continues to dominate the streaming industry is its incredibly low monthly churn. In December 2023 it was just 2%, a figure it maintained for pretty much the whole year. Apple TV+, by comparison, had a monthly churn of 8% in December 2023. 

This effectively means that Netflix spends a lot less time and money attracting new subscribers to replace people who’ve left. Apple TV+’s 8% monthly churn might not sound that much higher, but churn compounds. Annually, if Apple TV+ did nothing to attract new subscribers, it would lose almost 80% of its customers. Netflix, on the other hand, would lose 22.1%.

Want to go deep on retention and churn? Check out our [in-depth guide to churn analysis](/product-engineers/churn-rate-vs-retention-rate). Or find out how to measure churn [and lower it using PostHog](/tutorials/churn-rate).


## 2. Customer Lifetime Value (CLTV)

### What is CLTV?

Also known as LTV, this metric looks at an entire customer journey, combining repeat purchases, upsells, and potential future revenue. While it’s not a direct measure of customer retention or churn, things that reduce churn almost always lead to higher CLTV. If you keep customers happier for longer, you increase the revenue they generate and lower churn.

### How is it useful?

This is another really important metric for subscription-based businesses. That means SaaS and e-commerce, but also bricks and mortar enterprises like hair salons and gyms. A strong understanding of CLTV will help identify high-value customers and enable you to build the best possible products and services for them.

A clear understanding of your CLTV also gives you a clear understanding of who your most valuable customers are and how they behave. You can then, for example, work to move more people into that cohort, or work out how to better serve your most loyal customers.

### How to calculate your CLTV

Take the average revenue per user (ARPU) within a specific timeframe, say monthly or annually, and multiply it by your average customer lifespan. 

For example, if your ARPU is $50 per month and your average customer lifespan is 12 months, then your CLTV would be $50 x 12, or $600.

### What’s a good CLTV?

To work this out you need to know your CAC. That’s your customer acquisition cost, or, simply put, the average cost to your business of snagging a new paying customer. If your CAC is lower than your CLTV then you’ve got a healthy business that’s able to acquire new paying customers without losing money. If it’s not, you're in trouble.

As a guide, at early-stage startups the CLTV might be lower as you acquire new customers and find product-market fit. According to data compiled by search optimization firm [First Page Sage](https://firstpagesage.com/seo-blog/the-ltv-to-cac-ratio-benchmark/), the average CLTC to CAC ratio at B2B SaaS companies is 4:1 At B2C SaaS companies it’s 2.5:1.

And this kind of healthiness compounds: acquiring customers without spending a ton on marketing allows you to focus more on improving and expanding your existing product, delighting your most loyal customers, and improving overall customer satisfaction.

## 3. Revenue churn rate

### What is revenue churn rate?

It’s not just customers who churn, revenue churns with them. This metric helps you understand how much money your business makes from each user over time. It can help you spot where you’re losing revenue due to downgrades, people failing to renew, or, worst of all, cancellations. 

While your customer churn rate looks at the number of customers you lose in a given period, your revenue churn specifically focuses on the dollar value of recurring period lost, or gained, in a certain period.

### How is it useful?

Any subscription-based business should be measuring their revenue churn rate. These days, that’s pretty much all businesses from coffee subscription businesses to B2B SaaS companies and everything in between. Businesses that sell big, high-value items (think houses, industrial equipment) likely don’t need to focus on revenue churn.

### How to calculate revenue churn rate

You can calculate your revenue churn rate based on either gross or net revenue. A focus on gross revenue is simpler as it’ll show you how much revenue is churning out of your business, but a focus on net revenue will show both the amount of revenue lost from, say, customers downgrading, but also the revenue gained from customer upgrading.

Let’s do the math. For your gross revenue churn rate, take your churned revenue in a month and divide it by the monthly recurring revenue (MRR) from the previous month, and multiply that total by 100. 

For example, Hogflix, an imaginary hedgehog-themed Netflix competitor, had an MRR of $100,000 in May. In April, its churned revenue was $17,000. Divide $17,000 by $100,000 to get 0.17, then multiply that by 100. Voila, Hogflix has a gross revenue churn rate of 17%.

To work out your net revenue churn, find your churned revenue in a period and subtract your expansion revenue and divide that total by your monthly recurring revenue in the previous period. Now multiply that new total by 100.

For example, Hogflix had an MRR of $100,000 in May. In April, its churned revenue was $17,000 and its expansion revenue was $3,000. So subtract $3,000 from $17,000 to get $15,000 and divide that by $100,000 to get 0.15. Multiply that by 100 to get 15%.

### What’s a good revenue churn rate?

This depends again on how much your customers pay and how often they pay. If your business is based on monthly subscriptions, and your average revenue per account is $10 or less per month, then aim for monthly net revenue churn of around 6% or less. 

The more customers pay, the lower your churn should be. At $250 average revenue per account per month, aim for a net revenue churn [of 1.4% or less](https://techcrunch.com/2022/04/20/study-up-on-churn-rate-basics-to-set-customer-and-revenue-benchmarks/), according to data compiled by analytics platform ChartMogul. This sort of churn rate also assumes that your customers are paying annually and, therefore, churn less often because they can’t ditch their contract.

## 4. Net Promoter Score (NPS)

### What is NPS? 

Developed in the early-2000s and popularized by an article in _[Harvard Business Review](https://hbr.org/2003/12/the-one-number-you-need-to-grow)_, the Net Promoter Score continues to be a very popular way of measuring customer loyalty. It’s based on one question: ‘How likely are you to recommend [company/product/service] to a friend or colleague on a scale of 0 to 10?’** **Customers are then put into one of three buckets. 

* **Promoters**, who gave a score of 9 or 10, are loyal enthusiasts and very likely to recommend you. 
* **Passives**, who gave a score of 7 or 8, aren’t super happy or unhappy but are also unlikely to promote your business. 
* **Detractors**, those who rated you between 0 and 6, could potentially damage your business through word-of-mouth.

As you might imagine from a metric that relies on people answering a single question, the NPS is both alluring and [shaky](https://www.wsj.com/articles/the-dubious-management-fad-sweeping-corporate-america-11557932084). Alluring because, amongst a sea of often confusing data points it can seemingly provide clarity. But shaky because, well, a single data point isn’t enough to go on. As a result, it’s important to combine it with other metrics, including user surveys and interviews, to really understand what’s going on.

### How is it useful?

Pretty much all subscription-based businesses should be measuring their NPS as customer satisfaction is a key driver of churn. This is especially true for e-commerce businesses – if your online store is poorly designed and hard to use, your chances of repeat business will plummet. 

![NPS survey](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/nps-csat-ces/nps-survey.png)

This isn’t the most useful metric for very early-stage startups. NPS relies on having a large number of established customers to provide meaningful data. CSAT and CES scores, however, are very useful metrics for early-stage startups. More on those a little lower down.

### How to calculate your NPS 

The NPS score is calculated by subtracting the percentage of Detractors from the percentage of Promoters. For example, if 80% of your customers were promoters and 5% detractors, your NPS score would be 75. Anything above 0 is good, above 20 is great, and above 50 is very good.

### What’s a good NPS?

According to [Satmetrix](https://www.satmetrix.com/wp-content/uploads/2023/07/NICE-Net-Promoter-Benchmarks-2023.pdf), the average NPS score for software and apps is 27. But there’s a really wide range – at Dropbox, it’s 27, at Slack it’s 53, and at Square it’s 70. At PostHog, the NPS for our product analytics is 46.7, for our session replay it’s 56.6, and for feature flags it’s 65.9.

## 5. Customer satisfaction score (CSAT)

### What is a CSAT?

Your customer satisfaction score, or CSAT, is similar to your NPS, but is specifically a great customer retention metric to use before you’ve found product-market fit. Satisfaction tends to be short-lived, whereas loyalty takes time to build. And that’s why CSAT is a great metric for early-stage startups.

### How is it useful?

Any businesses that interact in a very direct, tangible way with customers should be measuring their CSAT: think retailers, restaurants, and customer support. On the flipside, businesses that rely on very transactional relationships with customers (gas stations) or high-value, single-purchase businesses (car dealerships) should place higher importance on other metrics.

### How to calculate your CSAT score

Again, ask a straightforward question: ‘How simple are you with our product?’ and give people a range from 0 to 10 or 0 to 5 – or use smiley faces to represent a 0 to 5 scale. You should collect CSAT responses right after someone uses a specific feature.

![CSAT survey](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/nps-csat-ces/csat-survey.png)

Here’s the math. Positive responses sit in the range of 4 to 5 if your scale is from 1 to 5 and 8, 9, or 10 if your scale is from 1 to 10. Your CSAT score is the total number of positive responses divided by the total number of responses. So if you survey 100 people and 80 people give you a positive score that’s a CSAT score of 80%.

### What’s a good CSAT score?

A good CSAT score is typically between 75% to 85%. According to [Fullview](https://www.fullview.io/blog/csat-benchmarks-by-industry#toc-csat-benchmarks-for-software-companies), the average CSAT score for SaaS companies is 78%.

## 6. Customer Effort Score (CES)

### What is a CES?

Another variation on the NPS and CSAT theme, your customer effort score, or CES, is a measure of how easy, or not, your product is to use. This is something of a leading indicator: a low CES score suggests you will probably have low retention because your product is hard to use – unless, miraculously, people are using it in spite of it being badly designed. As such, this is a really good metric to measure at a startup once you’ve found product-market fit.

### How is it useful?

This is a crucial metric for e-commerce and SaaS companies. If you’ve built a product or platform that should be easy to use and spark joy, then CES is a hugely important metric. On the flipside, if your business has very limited touchpoints with customers, if you run an insurance firm, for example, then measuring your CES might not be that revelatory.

### How to calculate your CES

It’s a similar process as with NPS and CSAT, but again with a slightly different question: ‘How easy was it to use our product?’ Give people a scale of 0 to 5 or 0 to 10. Your CES score is then the sum of all responses divided by the number of responses. So if you survey 100 people, and the sum of all their responses is 350, then your CES score is 3.5.

![CES survey](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/nps-csat-ces/ces-survey.png)

### What’s a good CES?

The definition of a ‘good’ CES score varies between companies and industries. On a scale of 1 to 10, anything above 7 is good. On a scale of 0 to 5, anything 4 and above is good. In both instances, anything below shows either that there’s some room for improvement or, for very low scores, that something is badly wrong.

> ### The problem with NPS, CSAT, and CES
>
>These metrics, and other similar single-question retention metrics, is that they only give you a snapshot. A low CES score would suggest people are finding your product, or a feature of it, hard to use. But you won’t know why or how to fix it.
>
> Similarly, a low or high CSAT score doesn’t tell you how likely you are to retain a user. They could leave because of pricing, for example. [Dig deeper](https://newsletter.posthog.com/p/how-to-uncover-your-users-real-problems) through surveys, session replays, and user interviews to find the real pain points and the things that spark joy.
>
> Want more detail on NPS, CSAT, and CES? Check out our [in-depth guide](/product-engineers/nps-vs-csat-vs-ces).

## 7. Feature adoption rate

### What is feature adoption rate?

This is actually a whole group of metrics for all the different features of your product. Feature adoption rates measure the percentage of users who, as the name suggests, use certain features. Let’s say you’ve invested a lot of time and money developing a new product feature. Wouldn’t it suck if nobody used it? This customer retention metric helps you understand the most popular features of your product, and the ones that not many people use.

### How is it useful?

This is a super retention metric for SaaS companies, both B2C and B2B, and particularly businesses with both free and premium tiers. A good understanding of feature adoption rate will help you see which premium features are most-used, for example. On the flipside, e-commerce services, which broadly speaking have one ‘feature’ should focus on other retention metrics.

### How to calculate your feature adoption rate

The formula for working this out is simple: take the number of users of a specific feature in the last month and divide it by the total number of product users, then multiply that total by 100. 

You can quickly get pretty granular here and pull out some really useful information. Combine this kind of analysis with, say, user segmentation, and you can see which segments love which features.

### What’s a good feature adoption rate?

This one is hard to benchmark as the variation between features and companies is vast. An analysis by [Pendo](https://www.pendo.io/product-benchmarks/) found that a “best in class” feature adoption rate amongst B2B SaaS companies was 28%.

## 8. DAU/MAU ratio

### What is the DAU/MAU ratio?

It’s the ratio of daily active users over monthly active users. This engagement metric measures stickiness and shows the percentage of your users who are using your product every day. If you’ve got a high DAU/MAU ratio, then people are returning to your product often. While these aren’t strictly user retention metrics, proactively addressing unexpected drops in active users or user engagement can give you more evidence of what’s working and what’s not.

### How is it useful?

This is the big one for social media platforms and online and mobile games. Basically any businesses with products or services that are meant to keep people hooked should be paying very close attention to their DAU/MAU ratio.

### How to calculate your DAU/MAU ratio

Simply divide your daily active users by your monthly active users. To get a percentage, multiply the total by 100. For example, say HogFlix has 1,000 DAUs and 4,000 MAUs. Divide 1,000 by 4,000 to get 0.25. Multiply that by 25%. This means that 25% of Hogflix’s monthly active users are using the product every day.

### What’s a good DAU/MAU ratio?

This metric was popularized by Facebook before it became Meta and is an important measure of success for online platforms big and small. As of March 2023 Facebook, the social network, had a DAU/MAU ratio of around 68%. That’s very good. In Q1 2023, Snapchat had a DAU/MAU of around 51%. Public companies almost always publish daily and monthly active users in their financial reports, so finding this data is often quite easy.

Want to go in-depth on DAU/MAU ratio? [Check out our guide](/tutorials/dau-mau-ratio).

## Further reading 📖

Engineers understand the products they’re building better than anyone – and speaking to users about problems they’re encountering and then fixing them can save time and really spark joy. Here’s our guide for [how to get the most out of those conversations](/newsletter/talk-to-users).

Not all engineers are comfortable using analytics day-to-day. It shouldn’t be that way. These are the most common complaints we hear [and how to deal with them](/newsletter/misconceptions-about-analytics).

Our guide to A/B testing for software engineers has loads of great tips [for successfully testing new product features](/product-engineers/ab-testing-guide-for-engineers).
