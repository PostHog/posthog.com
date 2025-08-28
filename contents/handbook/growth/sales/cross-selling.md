---
title: Cross sell motions
sidebar: Handbook
showTitle: true
---

Here's a collection of cross sell motions for specific products that can help you identify and work opportunities to expand an account's usage. 

## Error tracking for product analytics accounts

# Pre-requisites

1. Product analytics usage with clear conversion goals
2. Technical stakeholders who can influence engineering resource prioritisation
3. SDK implemented [with error tracking capabilities](https://posthog.com/docs/error-tracking/start-here#quest-item-capture-your-first-exception)

# Motion

1. Qualify if an account is suitable for this motion by understanding how they detect, prioritise, and fix errors today. If your stakeholder can't answer or isn't interested, find another stakeholder. If the answer is that don't have a tool to do this, don't link their errors to impact on key user actions within their app or that they prioritise based on error volume or another metric that is equally uncorrelated with impact on UX, this is a good opportunity for this motion. 
2. Suggest that they turn on exception capture for the relevant environment, with a billing limit or free trial set so there is no cost. In exchange offer to find the impactful errors they are missing and help them move towards a UX based methodology for error prioritisation by combining errors with PostHog product analytics data.
3. Create dashboards of the new error data that correlates errors with drop-offs in conversion events (signups, sales, whatever is relevant here)
4. Share your analysis as a Loom or other low time commitment format for review, emphasising the uplift in conversion events if these errors were prioritised. If required present these findings back to the stakeholders.
5. If required help your stakeholder build a business case for the additional spend by linking the missed conversion events to value.  For example, if the average LTV of a signed up user is 50$, multiply the dropoff in sign up events by 50 to get a rough ROI of finding and fixing these errors.