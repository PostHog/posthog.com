## Demonstrate the value

Once you've identified customers who'd benefit from Error Tracking, show them value in ways relevant to them.


#### Product Analytics

A few good starting points:
1. **Track error trends over time**: Create a trends insight for `$exception` events and create alerts when errors hit specific thresholds. You can get both historical trends and real-time notifications on high-impact exceptions to prioritize engineering work.
2. **See if errors are affecting conversion**: Combine errors with funnels to figure out if drop-off is happening because of errors – especially if errors are blocking users from getting through critical flows. You can tie this to customer lifetime value to show potential revenue loss. This is also useful for experiments - you want to make sure your variant didn't underperform because of a bug rather than the actual feature you're testing.
3. **Measure retention impact**: Track whether users who hit errors come back less frequently.

For all of these, you can layer on data like `$exception_types`, `$exception_values`, or `$exception_sources` to figure out which errors are most common and how they're impacting users.

#### Session Replay

Session Replay and Error Tracking work wonderfully together, and arguably has the strongest integration among products that work well with error tracking, as you can view recordings of what users are doing inside your app and get a clear signal of errors they encounter as part of their interactions. You can search for specific events within a session, jump straight to a given issue, view before and after interactions, and diagnose behaviors and errors happening, providing valuable context for debugging.

When viewing a session, you can use the "Only show matching events" toggle to filter the session's events by ones connected to exceptions. For example, you can use Session Replay `$rageclick` tracking to identify UI frustration that may correlate with errors. This can help highlight potential frustration customers are experiencing that may otherwise not get communicated. You can also create dynamic cohorts of impacted users, then take actions on these users.

#### Other wonderful use cases

With Feature Flags, you can roll out or revert code updates based on users who've hit specific exceptions. This is useful for quickly responding to errors by targeting affected user cohorts. It allows you to minimize impact and quickly make changes if users are having a bad experience due to errors. Feature flags can act as kill switches, allowing you to quickly turn off problematic features without deploying changes.

You can set custom Data Pipeline destinations to send your error tracking exceptions to other sources that could be helpful for your team if the built-in alert function isn't enough.

Additionally having Error Tracking turned on means you can leverage AI (such as PostHog AI or Claude Code) to help diagnose, summarize, and prioritize issues based on impact.

#### Key value compared to other error tracking products

Historically, error tracking has been primarily used by engineering teams, but with PostHog, there is also deliberate value for other teams. For example, the marketing team can quickly identify why conversions might have dipped and specifically target Session Replays tied to errors. This is incredibly valuable to quickly identify blockers. With other error tracking software, you may be able to get clarity on bugs and errors, but with PostHog, you can get a complete picture of the user journey, and many non-engineers can benefit from this.

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

