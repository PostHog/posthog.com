## What should the relationship look like before you attempt cross-sell?

* You have an active relationship with the customer in question. You have regular touchpoints with them, and they are responsive to your outreach.
* You understand their product and PostHog implementation. You know which technologies they are using, and how PostHog fits into their setup.
* There are no major open issues with their PostHog implementation. They have implemented PostHog Analytics (and Session Reply) into their application(s) and are actively using those features. They are happy with their current setup and aren’t voicing major frustrations.
* There is no active risk to their renewal, and you aren’t already negotiating that renewal.
* You know which teams to talk to regarding Error Tracking, you have identified the people best suited to successfully implement Error Tracking.
* You understand their engineering processes and timelines (at least on a high level) and expect them to have resources available to look into Error Tracking.
* They are using one of the supported platforms for Error Tracking, https://posthog.com/docs/error-tracking/start-here
* **Ideally**: They have expressed pain points that Error Tracking could help resolve.

## Demonstrate the value

Once you've identified customers who'd benefit from Error Tracking, show them value in ways relevant to them.


#### Product Analytics

A few good starting points:
1. **Track error trends over time**: Create a trends insight for `$exception` events and create alerts when errors hit specific thresholds. You can get both historical trends and real-time notifications on high-impact exceptions to prioritize engineering work.
2. **See if errors are affecting conversion**: Combine errors with funnels to figure out if drop-off is happening because of errors – especially if errors are blocking users from getting through critical flows. You can tie this to customer lifetime value to show potential revenue loss. This is also useful for experiments - you want to make sure your variant didn't underperform because of a bug rather than the actual feature you're testing.
3. **Measure retention impact**: Track whether users who hit errors come back less frequently.

For all of these, you can layer on data like `$exception_types`, `$exception_values`, or `$exception_sources` to figure out which errors are most common and how they're impacting users.

#### Session Replay

Session Replay and Error Tracking work wonderfully together – probably the strongest integration we have. You can watch recordings of what users are doing in your app and get clear signals of errors they're hitting. You can search for specific events, jump straight to a given issue, and see what happened before and after – all of which provide valuable context for debugging.

When viewing a session, use the "Only show matching events" toggle to filter by exception-related events. You can use `$rageclick` to identify UI frustration that correlate with errors – this helps highlight silent frustrations users are experiencing that otherwise aren't communicated. You can also create dynamic cohorts of impacted users and take actions on them.

#### Other wonderful use cases

Feature Flags: Roll out or revert code updates based on users who've hit specific exceptions. This lets you quickly respond to errors by targeting affected user cohorts and minimize impact if users are having a bad experience. Feature flags can act as kill switches – quickly turn off problematic features without deploying changes.

Data Pipeline: Set up custom destinations to send your error tracking exceptions to other sources if the built-in alert function isn't enough.

AI: Leverage PostHog AI or Claude Code to help diagnose, summarize, and prioritize issues based on impact.

#### PostHog vs other error tracking
Historically, error tracking is something only engineering teams use. With PostHog, there's deliberate value for other teams. For example, marketing can figure out why conversions dipped and look at Session Replays tied to errors. This is incredibly valuable to quickly identify blockers. Other error tracking tools might give you clarity on bugs and errors, but PostHog gives you the complete picture of the user journey.

# Common blockers
**“This increases costs that we didn’t budget for”**
We should proactively give credits so customers can trial a new product. For example:
- Free trial: give credits to cover usage of a new product for X weeks / months – make sure this is timeboxed! 
- Match competitor pricing: if a competitor is significantly cheaper than PostHog, verify this and offer to bring customer over at competitor pricing for X months
- More credits: offer to give additional credits on top of new product usage

**“My champion doesn’t make decisions on this product”**
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

**“I don’t have the resource or time to implement error tracking”**
It’s important to position implementation as simple, especially if you’re asking your customer to try out a product for the first time. This is where you shine as a technical success person. Help your customer cut through the cognitive load of figuring out implementation.

Error tracking can be implemented with one click, or two lines of code*(*depending on the SDK). Hyperlink to the project settings to enable exception autocapture or share the snippet addition for the SDK they’re using. Follow up with a rough plan that is tied with their needs, such as:
1. Enable exception autocapture – see events flow through
2. Assess the errors, issue groupings – decide if you want to customise default properties so you’re getting higher quality signals
3. Work with errors - update the status, view stacktraces, watch session replays and assign to teammates 
4. Set up alerts

Create dashboards for your customer to help them understand the value of the product.

## Action items

* What are common Error Tracking dashboards PostHog and current Error Tracking customers are using? How can we help users get started with similar dashboards as easily as possible?
* A good starting point for Error Tracking are customers already using Analytics and Session Replay. What other combination of products does Error Tracking work well with?
* What is a high level story that shows the value of using Error Tracking in PostHog compared to other solutions the customer is using already? How does it help them to be able to correlate data from Error Tracking with e.g. Analytics and Session Replay?
  * e.g. as an eCommerce customer, being able to correlate exceptions related to shopping carts with the Analytics data about the value of that shopping cart would allow customers to prioritize fixing bugs based on lost revenue.
  * e.g. as a b2c company, prioritize errors happening as part of the signup funnel
* What metrics do we track to measure success of this initiative?
  * Percentage of CSM managed accounts using Error Tracking each quarter
  * New Error Tracking MRR for CSM managed accounts in X quarters
