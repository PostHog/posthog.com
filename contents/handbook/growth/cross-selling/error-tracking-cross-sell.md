---
title: Error tracking cross sell
sidebar: Handbook
showTitle: true
---

## Identifying Error Tracking cross-sell opportunities

Our first example here is for cross-selling Error tracking, which generally has the below requirements.  Feel free to copy this as a format for other bundle motions where applicable. 

### Product specific pre-reqs
- You understand their engineering processes and timelines (at least on a high level) and expect them to have resources available to look into Error Tracking.
- They have implemented PostHog Analytics (and ideally Session Replay) into their application(s) and are actively using those features.
- They are using one of the [supported platforms for Error Tracking](/docs/error-tracking/start-here)
- You know which teams to talk to regarding Error Tracking, you have identified the people best suited to successfully implement Error Tracking.
- They have expressed pain points that Error Tracking can help resolve.

## Motion

1. Qualify if an account is suitable for this motion by understanding how they detect, prioritise, and fix errors today. If your stakeholder can't answer or isn't interested, find another stakeholder. If the answer is that don't have a tool to do this, don't link their errors to impact on key user actions within their app or that they prioritise based on error volume or another metric that is equally uncorrelated with impact on UX, this is a good opportunity for this motion. 
2. Suggest that they turn on exception capture for the relevant environment, with a billing limit or free trial set so there is no cost. In exchange offer to find the impactful errors they are missing and help them move towards a UX based methodology for error prioritisation by combining errors with PostHog product analytics data.
3. Create dashboards of the new error data that correlates errors with drop-offs in [conversion events](/docs/data/actions) (signups, checkouts, whatever is relevant here)
4. Share your analysis as a Loom or other low time commitment format for review, emphasising the uplift in conversion events if these errors were prioritised. If required present these findings back to the stakeholders.
5. If required help your stakeholder build a business case for the additional spend by linking the missed conversion events to value.  For example, if the average LTV of a signed up user is 50$, multiply the dropoff in sign up events by 50 to get a rough ROI of finding and fixing these errors.
6. Pitch this value as a reason to remove the billing limit and expand usage of error tracking.

### Product usage signals

Customers don't always ask for Error Tracking directly, but their usage patterns can indicate a potential need. When you review customer accounts and chat with users, look for these signals:
* Using session replay to investigate user issues, suggesting they don't have a way to detect errors automatically.
* Frequently searching through event logs or funnel drop-offs to find technical issues or user drop points.
* Setting up alerts primarily on custom events (rather than exceptions), which could indicate they lack out-of-the-box error visibility.
* Creating dashboards or insights that combine product usage with support data, showing a need to correlate bugs with user experience.
* Tagging engineering or support teams in insights to ask them to "investigate".
* Using manual workarounds to monitor application health, such as exporting incidents from PostHog to spreadsheets or other tools.
* Asking how to attribute support tickets or complaints to specific user sessions, which could be easier with automated error tracking.

### Chat with users

Engage with users. Look for cues that signal gaps that Error Tracking can fill:
* "We keep seeing bugs in production but it's hard to know where they're coming from"
* "I'm not sure if we're catching all the errors our users encounter"
* "We use logs to try and track down issues, but it's pretty manual"
* "We get complaints from users, but it's hard to reproduce what happened"
* "We only find out about errors when customers report bugs"
* "Is there a way to get notified when critical errors happen in real time?"
* "We need to understand how errors are affecting our revenue or user growth"
* "It's difficult to connect the dots between bugs and their actual impact on users"

### Website signals

* Visiting docs pages, such as:
  * https://posthog.com/docs/error-tracking/start-here
  * https://posthog.com/docs/error-tracking
  * https://posthog.com/docs/error-tracking/installation/react
* Visiting tutorial pages:
  * https://posthog.com/tutorials/react-error-tracking
  * https://posthog.com/tutorials/error-tracking
* Visiting the error tracking product page (https://posthog.com/error-tracking) and clicking "Get started - free"
* Reading blog posts about error tracking:
  * https://posthog.com/blog/posthog-vs-sentry
  * https://posthog.com/blog/best-sentry-alternatives
* Asking PostHog AI about error tracking
* Asking MCP about error tracking

### Discovery questions

When reviewing accounts, ask:

* **Product feedback**: "How have you been using session replays and is there anything you would like this product to do differently?" This can reveal gaps that Error Tracking might fill.
* **Incomplete implementations**: Are there any products a customer started to configure but didn't finish? Understanding why can highlight pain points Error Tracking could address.
* **Product churn**: Are there any products a customer used and then stopped? Understanding why can help identify if Error Tracking could solve the underlying issues.
* **Decision-making timeline**: Are they doing annual engineering roadmaps or quarterly goals? This helps you time cross-sell conversations appropriately.
* **Competitive landscape**: Use the [SDK scanner](https://sdk-scanner.posthog.dev/) to check if they're using a competitor for error tracking, which can help you position PostHog's integrated approach.

## Demonstrate the value

Once you've identified customers who'd benefit from Error Tracking, show them value in ways relevant to them.

### Product Analytics

A few good starting points:
1. **Track error trends over time**: Create a trends insight for `$exception` events and create alerts when errors hit specific thresholds. You can get both historical trends and real-time notifications on high-impact exceptions to prioritize engineering work.
2. **See if errors are affecting conversion**: Combine errors with funnels to figure out if drop-off is happening because of errors – especially if errors are blocking users from getting through critical flows. You can tie this to customer lifetime value to show potential revenue loss. This is also useful for experiments - you want to make sure your variant didn't underperform because of a bug rather than the actual feature you're testing.
3. **Measure retention impact**: Track whether users who hit errors come back less frequently.

For all of these, you can layer on data like `$exception_types`, `$exception_values`, or `$exception_sources` to figure out which errors are most common and how they're impacting users.

### Session Replay

Session Replay and Error Tracking work wonderfully together – probably the strongest integration we have. You can watch recordings of what users are doing in your app and get clear signals of errors they're hitting. You can search for specific events, jump straight to a given issue, and see what happened before and after – all of which provide valuable context for debugging.

When viewing a session, use the "Only show matching events" toggle to filter by exception-related events. You can use `$rageclick` to identify UI frustration that correlate with errors – this helps highlight silent frustrations users are experiencing that otherwise aren't communicated. You can also create dynamic cohorts of impacted users and take actions on them.

### Other use cases

- **Feature Flags**: Roll out or revert code updates based on users who've hit specific exceptions. This lets you quickly respond to errors by targeting affected user cohorts and minimize impact if users are having a bad experience. Feature flags can act as kill switches – quickly turn off problematic features without deploying changes.
- **Data Pipeline**: Set up custom destinations to send your error tracking exceptions to other sources if the built-in alert function isn't enough.
- **AI**: Leverage PostHog AI or Claude Code to help diagnose, summarize, and prioritize issues based on impact.
- **Surveys**: Use the capture exception template to request feedback from the user when they encounter errors. 
- **Error tracking integrations**: strengthen adoption of PostHog's error tracking by integrating with [external issue tracking](/docs/error-tracking/integrations) the customer is already using. 

### PostHog vs other error tracking
Historically, error tracking is something only engineering teams use. With PostHog, there's deliberate value for other teams. For example, marketing can figure out why conversions dipped and look at Session Replays tied to errors. This is incredibly valuable to quickly identify blockers. Other error tracking tools might give you clarity on bugs and errors, but PostHog gives you the complete picture of the user journey.

## Common blockers
### **“This increases costs that we didn’t budget for”**

We should proactively give credits so customers can trial a new product. For example:
- Free trial: give credits to cover usage of a new product for X weeks / months – make sure this is timeboxed! 
- Match competitor pricing: if a competitor is significantly cheaper than PostHog, verify this and offer to bring customer over at competitor pricing for X months
- More credits: offer to give additional credits on top of new product usage

### **“My champion doesn’t make decisions on this product”**

You should first try to build a relationship with the persona that will be users of the product. For error tracking, this will be engineers who work on areas where exceptions are critical (link to persona page).

Ask your champion how they are currently tackling the common use cases. Identify team members you want an introduction to and ask your champion for a warm connection. You can position it as a learning opportunity, asking for feedback, or a pitch (if you have a really strong understanding of the specific value-add). Help your champion with the internal pitch. 

For error tracking, these questions are helpful to start the conversation:
- When an error occurs, how easy is it for you to see exactly which user actions led up to it and how it affected the experience?
  - Debugging relies often relies on reproducing error	
  - Error Tracking tied directly to replays makes root cause and impact obvious.
- If you’ve built your own error tracking, how much effort goes into maintaining and correlating it with analytics?
  - Time wasted maintaining infra, blind spots in analysis.
  - Lightweight SDK that's tightly integrated with other products.
- How do you decide which errors to fix first?
  - Prioritizing by gut feeling or frequency, not business impact.
  - Error Tracking + Product & Revenue Analytics can show which errors have the greatest impact.

If you’re not sure who the persona should be, ask the product team! 

### **“I don’t have the resource or time to implement error tracking”**

Position implementation as simple, especially if you’re asking your customer to try out a product for the first time. This is where you shine as a technical success person. Help your customer cut through the cognitive load of figuring out implementation.

Error tracking can be implemented with one click, or two lines of code*(*depending on the SDK). Hyperlink to the project settings to enable exception autocapture or share the snippet addition for the SDK they’re using. Follow up with a rough plan that is tied with their needs, such as:
1. Enable exception autocapture – see events flow through
2. Assess the errors, issue groupings – decide if you want to customise default properties so you’re getting higher quality signals
3. Work with errors - update the status, view stacktraces, watch session replays and assign to teammates 
4. Set up alerts

You can also help create dashboards to help your customer understand the value of the product.

## Action items

- What are common Error Tracking dashboards PostHog and current Error Tracking customers are using? How can we help users get started with similar dashboards as easily as possible?
- A good starting point for Error Tracking are customers already using Analytics and Session Replay. What other combination of products does Error Tracking work well with?
- What is a high level story that shows the value of using Error Tracking in PostHog compared to other solutions the customer is using already? How does it help them to be able to correlate data from Error Tracking with e.g. Analytics and Session Replay?
  - e.g. as an eCommerce customer, being able to correlate exceptions related to shopping carts with the Analytics data about the value of that shopping cart would allow customers to prioritize fixing bugs based on lost revenue.
  - e.g. as a b2c company, prioritize errors happening as part of the signup funnel
- What metrics do we track to measure success of this initiative?
  - Percentage of CSM managed accounts using Error Tracking each quarter
  - New Error Tracking MRR for CSM managed accounts in X quarters

## Technical recommendations

- Error tracking for the web is significantly less useful without proper sourcemaps. You can see under "Symbol sets" in the configuration menu if the required files are being uploaded correctly.
- Encourage customers to set up roles so that issues can be assigned internally to the right people.
- Use the SDK Doctor to make sure they're on the latest SDK versions.

