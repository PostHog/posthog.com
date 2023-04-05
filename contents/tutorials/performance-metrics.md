---
title: Understanding page load time metrics in performance monitoring
sidebar: Docs
showTitle: true
author: ['lior-neu-ner']
date: 2023-04-12
featuredImage: todo
tags: []
---

Waiting for slow websites is like watching paint dry. It's the bane of productivity, the destroyer of efficiency, and the enemy of progress.

In this tutorial, we'll show you how to understand different metrics on how quickly your pages load and how to identify opportunities for improvement using Posthog's [performance monitoring in session recordings tool](https://posthog.com/blog/posthog-changelog#performance-monitoring-in-session-recordings).

## Setup

First, ensure that session recordings are [enabled]((https://posthog.com/docs/session-replay/manual)). Next, navigate to the Recordings tab on your Posthog Dashboard. Finally, click on the Network tab in the sidebar next to or below the video.

![](https://i.imgur.com/nr0QSSy.png)

Here you'll see all the network requests that are made during the page load and user session, as well as how long they took. You'll also see the time taken for First Contentful Paint, DOM interactive, and Page Loaded. 

![](https://i.imgur.com/Qlqt4c0.png)

We'll go through what each one of these three metrics mean and how to improve them.

## First Contentful Paint
[First Contentful Paint](https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint) (FCP) measures the time from when the page starts loading to when any element of the page's content is rendered on the screen. Note that it does not measure the time it takes entire page to load.

[![FCP happens in the second frame, as that's when the first text and image elements are rendered to the screen.](https://web-dev.imgix.net/image/admin/3UhlOxRc0j8Vc4DGd4dt.png?auto=format&w=1600)](https://web.dev/fcp/)
*FCP happens in the second frame, as that's when the first text and image elements are rendered to the screen. [Source](https://web.dev/fcp)* 


[According to Chrome team](https://web.dev/fcp/), a good FCP time is 1.8 seconds while anything above 3 seconds is considered poor. Factors that can affect FCP are:
* Page Size and Complexity
* Server Response Time ([Time to First Byte](https://web.dev/ttfb/)) 
* JavaScript and other client-side scripts, particularly if they are resource-intensive and take a long time to execute.
* Caching, since it can reduce the time it takes to download and render resources.
*  Network Latency

## Dom Interactive
[Dom Interactive](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState) means that all HTML content on the page has been downloaded and parsed and is ready to be manipulated by JavaScript code. However, sub-resources such as scripts, images, stylesheets and frames are still loading. In general, DOM Interactive happens before FCP (since FCP requires the browser to have downloaded and rendered at least some content of the page). Any subsequent changes to the DOM beyond the inital page load also trigger DOM Interactive and thus it can be called multiple times.

Factors affecting DOM Interactive are:
* Page Size and Complexity. The larger and more complex a page is, the longer it takes for the browser to parse and process the HTML content, leading to a slower DOM Interactive time.
* Number and Size of Scripts. The more scripts a page has and the larger their size, the longer it takes for the browser to download and execute them, which can delay DOM Interactive.
* Server Response Time: Slow server response times can delay the delivery of the page's resources, including the HTML content, leading to slower DOM Interactive times.
* Third-party Scripts.
* Network Latency.

## Page Loaded
The whole page has [loaded](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) and is ready for the user to interact with it, including all dependent resources such as stylesheets and images. 

Note that this is not the same as [Time to Interactive](https://web.dev/tti/) (TTI), which is a more comprehensive metric. When the Page Loaded event is trigged, some page elements may still be loading or processing, and the page may not be fully responsive to user interactions. This is in contrast to TTI, which measures how long it takes to be able to interact with all the page's features and functionality (although Page Loaded is a big contributing factor to TTI).

For example, imagine you are filling out a complex form on a website with many input fields, but the form is slow to respond when you try to interact with it. Even after the page has finished loading, the validation scripts that check if you've entered the correct information might still be running in the background, causing the form to be slow or unresponsive. TTI measures how long it takes for the page to become fully interactive and responsive to user inputs.

While there is no benchmark for what is a good time for Page Loaded, a [good time for TTI](https://developer.chrome.com/docs/lighthouse/performance/interactive/#how-lighthouse-determines-your-tti-score) is under 3.8 seconds while over 7.3 seconds is considered slow.


## So what's more important? FCP, Dom Interactive, or Page Loaded?
All of them are important for a good user experience! However, you may decide to focus on a specific metric depending on your goal. For example:

- For a page with a large banner image above the fold, a high FCP time means that the user has to wait too long before any visual content appears on the screen.
- If your goal is to improve your [PageSpeed Insights](https://pagespeed.web.dev/) performance score, then Page Loaded will be the most important since this contributes the most to [Total Blocking Time](https://web.dev/tbt/), which has the [highest weighting](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/?utm_source=lighthouse&utm_medium=lr#weightings) when calculating the performance score.
- If you're building an e-commerce site with many input fields and complex validation, then a high DOM Interactive time means that the form is slow to respond to user input. 


## Optimization cheat sheet
If you're looking to improve any of the above metrics, here is a handy cheat sheet for where to look for opportunities. Each value in the table indicates how likely the metrics are to be affeted.

| What?   | First Contetful Paint  | DOM Interactive | Page Loaded |
|--------|--------|--------|--------|
| Page Size   | 🟢 High  | 🟢 High   | 🟢 High |
| Server Response Time   | 🟢 High  | 🟢 High | 🟢 High |
| Network Latency   | 🟢 High  | 🟢 High | 🟢 High |
| Downloading Javacript  | 🟡 Medium (only if it blocks rendering) | 🟢 High | 🟢 High |
| Executing Javacript  | 🟡 Medium (only if it blocks rendering) | 🟢 High | 🟢 High |
| CSS Files: Downloading and Parsing  | 🟢 High | 🟡 Medium | 🟡 Medium |
| Images: Downlading and Rendering| 🟡 Medium (only if they are part of the initial content) | 🔴 Low | 🟢 High |
| Fonts: Downloading and Rendering  | 🟡 Medium (only if they are part of the initial content)  | 🔴 Low |  🔴 Low  |

## Identifying Opportunities on Your Own Site
Posthog's performance monitoring tool shows you the size and speed of different requests made during page load. You can also filter these by request type, such as API, JS, image, and CSS requets.

Combine this with the cheat sheet above and you'll be able to pinpoint what are the contributing factors to your metric times.

For example:
![](https://i.imgur.com/JPeZeTe.png)

Here we can see an API request that is happening during page load (indicated by the `LOAD` text next to it). Since it is blocking the initial rendering, it is contributing to the high FCP time as well as the Page Loaded time.


## Further reading

- [How to use session recordings to get a deeper understanding of user behavior](https://posthog.com/tutorials/explore-insights-session-recordings)
- [How to use session recordings to improve your support experience](https://posthog.com/tutorials/session-recordings-for-support)
- [How to use filters + session recordings to understand user friction](https://posthog.com/tutorials/filter-session-recordings)


