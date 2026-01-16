---
title: 'Non-obvious SEO advice for startups'
date: 2025-02-20
author:
  - andy-vandervell
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/seo_meme_thumb_2894e1ee9b.png
featuredImageType: full
tags:
  - Growth
  - Marketing
crosspost:
  - Founders
  - Blog
---

There’s no shortage of SEO advice for startups out there. Things like:

*   **You need an up-to-date sitemap.** Sure, having one is better than not.   
*   **Think about search intent.** Really? You don’t say.
*   **Use keywords strategically.** This is meaningless.
*   **Add infographics.** Jesus wept.
*   **Write keyword-enriched meta descriptions.** Mmm, so enriched.

This kind of generic, table stakes stuff gives you lots of problems to obsess over, but it doesn’t help you make decisions.

What follows is my opinionated take on how startups should think about SEO, particularly the content marketing side of things.

It’s based on ~20 years experience working in publishing as a writer, editor, and #thinkboi, and what we’ve learned growing [PostHog](https://posthog.com/) to 10s of millions in revenue.[^1]

It’s meant for early-stage software startups, though it’s hopefully broadly applicable to any startup that’s scaling up, too.

## 1. Start with defensive SEO

Sometimes you just need to rank for things, so others don’t, such as:

*   Comparisons between your product and competitors  
*   How to integrate your product with other popular ones
*   The best tools in your product category
    
This is why we have articles comparing [PostHog and Sentry](/blog/posthog-vs-sentry), or guides to [open source analytics tools](/blog/best-open-source-analytics-tools).

Content like this can serve as sales collateral, but it’s also high-intent, so it helps you acquire new users and supports word-of-mouth. Even if someone doesn’t end up using your product, they might tell someone else about it.

Do this stuff early, so competitors don’t swoop in first.

> **Remember This:** People aren’t stupid, so don’t oversell your product. Our philosophy is to focus more on how our product is different, not why it’s better. “Better” is subjective anyway, so let people figure that out for themselves.

<br/>

## 2. Use as few SEO tools as possible

Only #SEOgurus need a complex stack of SEO tools. Here’s what I recommend for everyone else who is getting started:

*   **An all-in-one SEO tool** – We use [Ahrefs](https://ahrefs.com/), but SEMrush or another may be as good or better. These tools cover most bases, such as rank tracking, keyword research, and competitor research.
    
*   **Google Search Console** – This is free and useful for finding problems and opportunities, including technical stuff like website performance.[^2]
    
*   **Keywords Everywhere** – An [inexpensive browser extension](https://keywordseverywhere.com/) that augments Google search, Trends, and Search Console with keyword data. It creates serendipity by putting useful data everywhere you go.
    
That’s it. There are dozens of tools you can use for different tasks, but 90% of your problems can be solved using the above.

> **Remember This:** SEO tools are just that: tools. They might make your life a little easier, but they won’t magically generate growth. An easy way to fail is to spend too much time learning or researching SEO tools, and not enough doing the important bit: the content.

<NewsletterForm />

## 3. Low volume + a problem you solve = winning

It’s way easier to rank for 100 low volume searches than a handful of lucrative, popular ones, especially early on.

Here’s an example:

*   We recently published a tutorial on setting up [analytics for Electron apps](/tutorials/electron-analytics).
*   There’s an estimated 30 searches a month for “electron analytics”. That’s tiny.
*   Ahrefs gives every search a keyword difficulty score out of 100. This scores 0.
*   We’re already seeing ~five unique users visiting this page each day.
*   That scales to around 1,850 unique users each year, give or take a few.
    
Now imagine 100 similar pages. That’s ~185,000 users visiting our website each year, each of whom has a very specific problem we can solve.

This is the ultimate power of SEO and why it’s worthwhile. There are a near infinite number of problems people search for out there, you just need to find them.

Getting good at ranking for low competition keywords will make it easier to rank for high competition ones, too.

> **Try This:** Use Keywords Everywhere to see what people search for, try different variations, and look at the related searches. Ahrefs has a good primer on [finding low competition keywords](https://ahrefs.com/blog/low-competition-keywords/), too.

<br/>

## 4. Google is dumber than you think

I don’t mean it isn’t sophisticated (it obviously is), but it’s easy to get lost in the web of pet theories about ranking factors.

If you want to sound smart at parties, and make good decisions about SEO, you only need to know two things:

1.  **Google isn’t good at understanding content.** When Google crawls your website, it’s creating a summary of what it’s about based on keywords, metadata, and links. But it doesn’t read and evaluate how good it is like a human.
    
2.  **Google learns what’s good by observing its users.** If you click on a result and then go straight back to Google, it was a bad result, and vice versa. Google uses this data to fine tune results so the results people like appears at the top.

We know this because Google admitted as much in [legal exhibits](https://www.justice.gov/d9/2023-11/417516.pdf):

> “What's crazy is that we don't actually understand documents. Beyond some basic stuff, we hardly look at documents. We look at people. If a document gets a positive reaction, we figure it is good. If the reaction is negative, it is probably bad.”

![how google works](https://res.cloudinary.com/dmukukwp6/image/upload/exhibit_screenshot_46fe2dcae1.png)

What does this mean for you?

*   Your website and content needs to be easy for machines to read.
*   Do nothing that will annoy people when they arrive. First impressions matter.
*   Make your website easy to use on any device.
*   The quality of your content really does matter.
    
> **Go Deeper:** I recommend reading [Turns out, Google is all about Links and Clicks](https://www.seoforgooglenews.com/p/google-is-all-about-links-clicks-keywords)  
> by Barry Adams, who knows way more about SEO than me, for more on how Google uses human behavior to qualify search results.

<br/>

## 5. Solve your user’s real problems

You can stumble upon small SEO wins by creating content that helps solve the real problems of your actual users.

So, before you dive into keyword research, topic clusters, topical authority, and other buzzy SEO-isms, go talk to your users and help them out.

One of the first tutorials anyone wrote for PostHog was this [event tracking guide](/tutorials/event-tracking-guide).

It now generates around 1,000 visitors from search every month, but it was never written with ranking in Google in mind.

> **Remember This:** Your docs are both a resource for your users and an influential acquisition channel. Any time spent expanding and improving them is time well spent, and useful docs are naturally SEO-optimized.

<br/>

## 6. You don't need perfect Core Web Vitals

![core web vitals](https://res.cloudinary.com/dmukukwp6/image/upload/web_vitals_f25a2f7235.png)

Seriously folks, stop trying to achieve perfect scores on your PageSpeed report.

[Core Web Vitals](https://support.google.com/webmasters/answer/9205520), for the uninitiated, are three metrics that Google uses to report on page experience: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).

But their impact on rankings are frequently overstated. Google doesn’t, for example:

*   Automatically show websites with the best Core Web Vitals scores above others.
*   Index your website faster because you have a perfect PageSpeed report.
*   Use the Core Web Vitals of a page as a tie breaker in search results.
    
We know this, again, because Google has said as much. In a [2023 video](https://www.youtube.com/watch?v=Ts7rPPIFhVg), a Google dev advocate noted \[emphasis added\]:

> “Google Search always **seeks to show the most relevant content, even if the page experience is not the best**. So page loading performance and also core web vitals aren't as important as some people might think they are. They are not irrelevant, but do not over focus on these things.”

This has been reiterated by John Mueller, Google’s search relations team lead, on [numerous](https://www.linkedin.com/posts/johnmu_understanding-google-page-experience-google-activity-7173305835299790849-fa4o) [occasions](https://www.linkedin.com/feed/update/urn:li:activity:7254734115789234176?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7254734115789234176%2C7254770152917929984%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287254770152917929984%2Curn%3Ali%3Aactivity%3A7254734115789234176%29):

> “A perfect score is a fun technical challenge, and you'll learn something along the way, I know the feeling (I worked on mine too), but it's not going to make your site's rankings jump up.”

For the record, here’s the not-so-perfect web vitals report for our website – generated by the [web vitals feature in PostHog](/docs/web-analytics/web-vitals).

![web vitals](https://res.cloudinary.com/dmukukwp6/image/upload/ph_web_vitals_46f6da823b.png)

We need to improve our “Interaction to Next Paint” further, but this hasn’t stopped us being successful.

> **Do This:** Your web vitals are a good proxy for the general user experience, but the algorithm cares more about the subjective experience of real people**.** Get your scores in a decent place, but put more time into your content and website UX.

<br/>

## 7. Your "great content" probably sucks

I can’t sugarcoat this one.

“What makes content good?” is too broad a topic to tackle here, but ask yourself…

Is your content really “great”? Not share it on LinkedIn with a hashtag great, but “share it with a friend you like and respect” great?

Be honest with yourself because “our content is great but it doesn’t rank” is the #1 complaint of anyone struggling with SEO, and it’s true less than 10% of the time.

Some mental checklists I like here:

*   Does it go beyond explaining a thing? AI can explain stuff, so this isn’t leveraged.[^3]
*   Is it opinionated? Make a recommendation. Hedging is boring / not useful.
*   Would someone who knows a lot about the topic share this?
*   Will it help someone make a decision about what to do?

> **Try This:** Go read and evaluate the top results for searches you’re interested in. What makes them stickier than other similar pages? How would you improve them? The more you do this, the better you’ll get at judging what good looks like.

<br/>

## 8. Double down when you have product-market fit

People often say you should invest in SEO as early as possible because it takes time to pay off. This is half right.

Yes, SEO is a long-term play, but it’ll pay off faster than you expect if your product has real traction in a specific audience.

We didn’t start investing in SEO at PostHog until January 2022, two years after it was founded. By this time, the company had:

1.  Real revenue and a product people definitely wanted.
    
2.  A clear and tested [ideal customer profile](/newsletter/ideal-customer-profile-framework) to work from.
    
3.  Strong retention in that cohort – i.e. the funnel wasn’t leaking from the bottom.
    
In short, we had [rock solid product-market fit](/founders/product-market-fit-game).

This made my job much easier. I didn’t have to throw mud at a wall, and we already had a good website with some authority on the right topics thanks to our public docs.

Above all, there was no danger of pivoting to a new product or audience, so I knew my long-term bets would have time to pay off.

![posthog seo](https://res.cloudinary.com/dmukukwp6/image/upload/posthog_seo_2bdba1ba71.png)

It took three months for our earliest work to show meaningful results. We started to see serious growth after six months. After a year we’d tripled traffic from SEO.

> **Remember This:** Focus on the basics until you have product-market fit. Build an easy-to-use website Google can index, write content that helps your users, and do some defensive SEO. Double down when you’re confident you have real traction.

<br/>

## 9. Yes, your startup still needs SEO

AI is the future right, so why bother investing in SEO? I suck at predicting the future, but here are the facts right now:

*   People have been saying [SEO is dead for over a decade](https://scobleizer.blog/2009/12/16/2010-the-year-seo-isnt-important-anymore/). It’s still not dead.
*   ChatGPT was visited 3.8 billion times in November 2024.
*   Google was visited 82.19 billion times.
*   One of those numbers is much bigger than the other.
*   LLMs need content to train on. Better yours than someone else’s.

Obviously, it would be foolish to bet the farm on SEO, but that would still be true if LLMs didn’t exist.

> **Do This:** Think about how you can create owned audiences and distribution channels. This newsletter is one method, an active Discord / Slack community could be another. SEO is an important channel, but it’s one of many.

<br/>

## 10. SEO is mostly about good habits

Successful SEO strategies are built on being relentless and disciplined. This means:

*   Updating content frequently to keep it fresh.
*   Manually adding internal links to everything you publish.
*   Crafting headlines that stand out in search.
*   Sweating the details of everything you write.
*   Constantly searching for new opportunities.
*   Backing up the things you write with real evidence and reliable sources.
*   Treating your SEO content like something a real person would enjoy reading.

And, yes, while there are ways to cheat your way to the top, I guarantee Google will find you out eventually.

_Words by [Andy Vandervell](https://www.linkedin.com/in/andyvandervell/), who ranks top of Google for his own name._

<br/>

## Certified #greatcontent

*   **[The impact of AI Overviews on SEO - Analysis of 19 studies](https://www.growth-memo.com/p/the-impact-of-ai-overviews-on-seo) –**  
*   **[On Product-Market Fit](https://cra.mr/on-product-market-fit) – David Cramer (Founder of Sentry)**
*   **[Make an Org Chart You Want to Ship](https://review.firstround.com/make-an-org-chart-you-want-to-ship-advice-from-linear-on-how-heirloom-tomatoes-should-inspire-team-design) – Nan Yo, Linear’s Head of Product**
*   **[13 Undesirable Behaviors in Software Engineers](https://newsletter.techleadmentor.com/p/13-undesirable-behaviors-in-software) –**

<NewsletterForm />

[^1]: I’m not going to list my CV here – see LinkedIn for that – but websites I’ve managed have ranked top of Google for “best black Friday deals” on Black Friday, “best Netflix series” in the middle of the pandemic, and “iPhone rumors” back when a new iPhone was still a big deal. I view myself as a writer and editor with a lot of SEO knowledge, rather than a full-time SEO expert, but I’ve been at this for a while.

[^2]: Here’s a good example: I recently noticed people searching for “posthog SDK” were ending up at this forum index page instead of our docs. To fix this, I opened a PR on our repo that renamed an existing docs page to ‘PostHog SDK comparison’. Within days, it was ranking top for that search, so people will end up in the right place now.

[^3]: This is particularly pertinent given all studies of AI Overviews in Google indicate they show most often on information keywords (i.e. questions, definitions, etc.).