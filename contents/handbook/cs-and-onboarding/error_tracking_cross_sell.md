## Demonstrate the value

The easiest way to help cross-sell a product is to quickly demonstrate its value once you've identified ideal candidates who would be a good fit. Below are a list of products where Error Tracking can add clear value to customers who are already heavily using these products.

#### Product Analytics

With Product Analytics, there are a few good starting points for error tracking that a customer may want to consider.

The first is setting up trends to track how error rates change over time. This could be creating an insight of `$exception` events and setting alerts when error counts hit specific thresholds. This can be a good way to not only track historical trends but getting real time notifications on high impact exceptions that could be affecting users.

Another useful thing customers should track are funnels where conversion between steps could have a drop off and how that might be impacted by errors. This can help highlight where errors are blocking users from completing critical flows. Leveraging lifetime value of a customer and multiplying the impact for funnel drop off can be a quick way to highlight potential revenue loss.

Customers can also track impacts on retention by measuring users who encounter errors and if they come back less frequently as a result.

For each of these, you can even layer on data such as `$exception_types`, `$exception_values`, or `$exception_sources` to identify which errors are most common. With these insights and funnels, you'll be able to quickly see how users are impacted, if conversions are decreasing, or if it impacts how often users return.

#### Session Replay

Session Replay and Error Tracking work wonderfully together, and arguably has the strongest integration among products that work well with error tracking, as you can view recordings of what users are doing inside your app and get a clear signal of errors they encounter as part of their interactions. You can search for specific events within a session, jump straight to a given issue, view before and after interactions, and diagnose behaviors and errors happening, providing valuable context for debugging.

When viewing a session, you can use the "Only show matching events" toggle to filter the session's events by ones connected to exceptions. For example, you can use Session Replay `$rageclick` tracking to identify UI frustration that may correlate with errors. This can help highlight potential frustration customers are experiencing that may otherwise not get communicated. You can also create dynamic cohorts of impacted users, then take actions on these users.

#### Other wonderful use cases

With Feature Flags, you can roll out or revert code updates based on users who've hit specific exceptions. This is useful for quickly responding to errors by targeting affected user cohorts. It allows you to minimize impact and quickly make changes if users are having a bad experience due to errors. Feature flags can act as kill switches, allowing you to quickly turn off problematic features without deploying changes.

You can set custom Data Pipeline destinations to send your error tracking exceptions to other sources that could be helpful for your team if the built-in alert function isn't enough.

Additionally having Error Tracking turned on means you can leverage AI (such as PostHog AI or Claude Code) to help diagnose, summarize, and prioritize issues based on impact.

#### Key value compared to other error tracking products

Historically, error tracking has been primarily used by engineering teams, but with PostHog, there is also deliberate value for other teams. For example, the marketing team can quickly identify why conversions might have dipped and specifically target Session Replays tied to errors. This is incredibly valuable to quickly identify blockers. With other error tracking software, you may be able to get clarity on bugs and errors, but with PostHog, you can get a complete picture of the user journey, and many non-engineers can benefit from this.