---
title: Asking better questions
sidebar: Handbook
showTitle: true
---

Good discovery doesn't just qualify a need for a single product; it uncovers systemic challenges in a company's process. The questions in this guide are designed to do exactly that. They connect a problem in one area (like an error) to its impact in another (like user retention or revenue), naturally revealing the value of PostHog's unified platform.

Instead of asking "Do you use feature flags?", we ask "How do you measure the impact of a new feature on your KPIs?". This prompts a story about their development and analytics process, allowing you to position PostHog's integrated solution.

---

## Product analytics

**Goal:** Connect quantitative data (the "what") to the qualitative context (the "why") and to concrete action.

-   **Bad:** "Do you track user funnels?"
-   **Good:** "When you see a significant drop-off in a key user funnel, what's your current process for understanding *why* those users are dropping off?"
    -   *Connects analytics to session replay.*
    -   **PostHog Solution:** Create a funnel insight to identify the drop-off point. From there, you can directly click to watch session replays of only the users who dropped off at that specific step, giving you immediate visual context for the friction.

-   **Bad:** "Do you look at user trends?"
-   **Good:** "When a dashboard shows you a user trend you didn't expect, how do you directly ask the specific users in that cohort for feedback to understand the behavior?"
    -   *Connects analytics to surveys.*
    -   **PostHog Solution:** From any analytics insight, you can save the group of users as a cohort. Then, create a survey targeted to fire only for users belonging to that specific cohort, ensuring your feedback request is highly relevant.

-   **Bad:** "Are you tracking feature adoption?"
-   **Good:** "How do you currently measure the impact of new features not just on adoption, but on your company's core metrics like retention, conversion, or revenue?"
    -   *Connects analytics to experiments and feature flags.*
    -   **PostHog Solution:** Wrap the new feature in a feature flag and run it as an experiment. The experiment dashboard will not only show you adoption but also let you measure the statistical impact on any number of custom goals, like a conversion funnel or a retention metric.

-   **Bad:** "Are you tracking user actions?"
-   **Good:** "Beyond just knowing *what* features users click on, how do you measure the direct correlation between specific feature usage and long-term business outcomes, like customer lifetime value or expansion revenue?"
    -   *Connects analytics to data warehouse/CRM integrations.*
    -   **PostHog Solution:** Use the data warehouse to join your PostHog event data with revenue data from Stripe or other sources. This allows you to create insights and cohorts that connect in-product actions directly to financial outcomes.

-   **Bad:** "Do you know who your power users are?"
-   **Good:** "How do you differentiate a 'power user' from a 'noisy user'? What's your process for identifying the specific sequence of actions that highly-retained customers take, so you can guide new users down that same 'golden path'?"
    -   *Connects analytics (paths, retention) to onboarding strategy.*
    -   **PostHog Solution:** Use the retention insight to identify a cohort of highly-retained users. Then, use the paths insight, filtered by that specific cohort, to visualize the common event sequences ("golden paths") these successful users take.

---

## Session replay

**Goal:** Connect the qualitative "why" from user sessions back to quantitative impact, efficient debugging, and taking action.

-   **Bad:** "Do you watch session recordings?"
-   **Good:** "When a user reports a bug or expresses frustration, how much time does your engineering team typically spend trying to reproduce the issue versus watching a recording of the exact session where it happened?"
    -   *Connects session replay to error tracking and developer efficiency.*
    -   **PostHog Solution:** With error tracking, each error is automatically linked to the session replay where it occurred. Engineers can go from error alert directly to the recording, eliminating the need to reproduce the bug manually.

-   **Bad:** "Can you see what users are doing?"
-   **Good:** "If a user gives a very low score on a satisfaction survey, what's your process for seeing what they were actually trying to do in the product right before they gave that feedback?"
    -   *Connects session replay to surveys.*
    -   **PostHog Solution:** In the survey results, each response is linked to the user's profile. You can click through to see their recent session replays, providing instant context for their qualitative feedback.

-   **Bad:** "Do you record high-value users?"
-   **Good:** "How do you focus your session replay budget on the most critical interactions, like users who encounter an error or high-value customers using a new feature for the first time?"
    -   *Connects session replay to feature flags and error tracking for targeted recording.*
    -   **PostHog Solution:** Configure session replay to record only when certain conditions are met, such as when a console error is logged, when a user is part of a specific cohort (e.g., 'High-Value Customers'), or when a specific feature flag is enabled for them.

-   **Bad:** "Do you use replays for support?"
-   **Good:** "When a high-value customer is struggling with a new feature, how does your customer success team get context? Are they asking the customer for screenshots, or can they proactively review a playlist of that customer's recent sessions to understand the friction and offer help?"
    -   *Connects session replay to customer success workflows and analytics (cohorts).*
    -   **PostHog Solution:** Create a cohort for your high-value customers. Then, in session replay, you can filter the playlist to show only recordings from that cohort, allowing CS teams to proactively monitor their experience.

-   **Bad:** "Can you see where people click?"
-   **Good:** "For a critical flow like e-commerce checkout, when you see users dropping off, how do you determine if it's due to a confusing UI element versus a technical error they encountered on their specific browser?"
    -   *Connects session replay to analytics (funnels) and error tracking.*
    -   **PostHog Solution:** Use a funnel insight to find the drop-off. Watch the replays of users who dropped off. The replay's console log will show any technical errors, distinguishing UI friction from bugs.

---

## Feature flags

**Goal:** Connect feature rollouts to risk mitigation, targeted testing, and precise impact measurement.

-   **Bad:** "Do you use feature flags?"
-   **Good:** "What's your process for rolling out a major new feature? How do you de-risk the launch and ensure it doesn't negatively impact performance or user experience?"
    -   *Pitches feature flags as a strategic tool, not just a toggle.*
    -   **PostHog Solution:** Release the new feature with a feature flag, initially to just 1% of users or internal team members. Monitor analytics and error tracking dashboards for any negative impact before gradually increasing the rollout percentage.

-   **Bad:** "Can you do phased rollouts?"
-   **Good:** "When you release a new feature, how do you measure its direct impact on user engagement, and how do you compare the behavior of users who have the feature against those who don't?"
    -   *Connects feature flags to A/B testing and product analytics.*
    -   **PostHog Solution:** The feature flag becomes the basis for your analysis. In any analytics insight, you can break down the results by the feature flag's variant, directly comparing metrics like retention or conversion between the 'test' and 'control' groups.

-   **Bad:** "Do you have a beta program?"
-   **Good:** "How do you enable a new feature for just a specific cohort of users, like beta testers or high-value accounts, and then gather their specific feedback or watch their unique interactions?"
    -   *Connects feature flags to surveys and session replay.*
    -   **PostHog Solution:** Set the feature flag's condition to only enable for users in a specific cohort (e.g., 'Beta Testers'). You can then target a survey to that same cohort and filter session replays to see only their experiences.

-   **Bad:** "Do you have different customer plans?"
-   **Good:** "How do you manage feature access across different pricing tiers? What's the engineering effort required to ensure that 'enterprise-only' features are only visible to the right accounts?"
    -   *Connects feature flags to plan/entitlement management.*
    -   **PostHog Solution:** Create feature flags that are conditioned on a user property like `plan_type`. You can manage which plans see which features directly from the PostHog UI without requiring code changes for every tier update.

-   **Bad:** "Do you test new features?"
-   **Good:** "When you launch a new feature for one side of your marketplace, say for 'sellers', how do you ensure it doesn't negatively impact the 'buyer' experience, and how do you measure the adoption of that feature just within your seller cohort?"
    -   *Connects feature flags to analytics (cohorts), especially for Marketplace business types.*
    -   **PostHog Solution:** Roll out the feature with a flag targeted to your 'Seller' cohort. In your analytics dashboards, you can then filter for that cohort to see adoption metrics, while also monitoring global metrics for any unintended impact on 'Buyers'.

---

## A/B testing (experiments)

**Goal:** Connect hypotheses to data-driven validation and a seamless deployment workflow.

-   **Bad:** "Do you do A/B testing?"
-   **Good:** "When your analytics point to a potential area for improvement, like a drop-off in a funnel, what's your team's process for forming a hypothesis, testing a solution, and statistically measuring its impact?"
    -   *Connects experiments to product analytics.*
    -   **PostHog Solution:** After identifying the drop-off in a funnel, create an experiment to test your hypothesis. The experiment will automatically calculate statistical significance and show the impact on your primary funnel goal and any other secondary metrics.

-   **Bad:** "Can you test changes?"
-   **Good:** "Once an experiment proves a new feature is a winner, how seamless is your process to roll that feature out to 100% of your users? How many hand-offs or new tickets does that require?"
    -   *Connects experiments to feature flags.*
    -   **PostHog Solution:** Because experiments are built on feature flags, rolling out a winning variant is a one-click action. You simply click "Roll out" in the experiment UI, and the underlying feature flag is updated to serve the winning variant to 100% of users, no code changes or new tickets needed.

-   **Bad:** "Do you test your marketing pages?"
-   **Good:** "When you want to test a change to your signup flow, how do you ensure the results are statistically significant, and how do you analyze the downstream impact of that change on long-term user retention, not just on the initial conversion rate?"
    -   *Connects experiments to analytics (retention).*
    -   **PostHog Solution:** In the experiment setup, you can add multiple goal metrics. You'd set the signup funnel as your primary goal, but also add your 7-day and 30-day retention insights as secondary goals to ensure your change doesn't harm long-term engagement.

---

## Error tracking

**Goal:** Connect bugs and errors to their actual business and user impact, enabling effective prioritization.

-   **Bad:** "Do you use error tracking?"
-   **Good:** "When your team is planning a sprint and evaluating which bugs to fix, how do you prioritize them? How do you know if a bug affected 5 users or 5,000, and whether it impacted a free user or one of your largest customers?"
    -   *Connects error tracking to product analytics and user segmentation.*
    -   **PostHog Solution:** The error tracking dashboard automatically shows you the count of unique users affected by each error. You can click into any error to see the list of affected users and cross-reference that with user properties like `plan_type` or `MRR` to prioritize based on business impact.

-   **Bad:** "Do you get error alerts?"
-   **Good:** "When your team gets an error alert, what's their first step to understanding the context? Are they digging through text logs, or can they watch a full replay of the user session that triggered the error?"
    -   *Connects error tracking to session replay.*
    -   **PostHog Solution:** Every error captured in PostHog is automatically linked to the session replay where it occurred. Engineers can jump from the error details page directly to the recording to see the user's actions leading up to the bug.

-   **Bad:** "How do you handle bugs?"
-   **Good:** "When you see a spike in errors after a new deployment, how do you quantify the business impact? Can you see if those errors are blocking conversions in your checkout funnel or just affecting a few users on an internal admin page?"
    -   *Connects error tracking to analytics (funnels, user segmentation).*
    -   **PostHog Solution:** From the error details page, you can create a cohort of affected users. Then, you can use this cohort in any analytics insight, such as a funnel, to see if these users converted at a lower rate than users who did not experience the error.

---

## Surveys

**Goal:** Connect direct user feedback to the context of their actual, in-product behavior.

-   **Bad:** "Do you run surveys?"
-   **Good:** "How do you gather feedback from the *right* users at the *right* time? For example, how would you ask users who just used a new feature what they thought of it, right in the moment?"
    -   *Connects surveys to event-based targeting in product analytics.*
    -   **PostHog Solution:** Create a survey and set its targeting rules to appear only after a user triggers a specific event (e.g., `new_feature_used`). This ensures the feedback is timely and contextual.

-   **Bad:** "Do you get qualitative feedback?"
-   **Good:** "When a user provides a really insightful (or very critical) open-ended response in a survey, how do you link that feedback to their actual recent activity in the product to get the full context of their experience?"
    -   *Connects surveys to session replay.*
    -   **PostHog Solution:** Every survey response is linked to the user's profile. From the results view, you can one-click into their recent session replays to see exactly what they were doing before, during, and after submitting the feedback.

-   **Bad:** "Do you do NPS surveys?"
-   **Good:** "What is your process for automatically sending a follow-up survey to users who downgrade or churn? How do you connect their open-text feedback to their actual product usage from the week before they left to understand the 'why' behind the churn?"
    -   *Connects surveys to analytics (funnels, retention) and session replay.*
    -   **PostHog Solution:** Create a cohort of users who have entered a churn or downgrade funnel. Target a survey to this cohort. When you receive responses, you can jump into their session replays to see their exact final user journey.

---

## Data warehouse & pipelines

**Goal:** Uncover the pain of data silos and highlight the value of a unified, enriched data source.

-   **Bad:** "Do you have a data warehouse?"
-   **Good:** "When your teams need to answer complex questions, how do they combine user behavior data from your product with commercial data from other systems, like subscription revenue from Stripe or support tickets from Zendesk?"
    -   *Highlights the need for a unified view and connects PostHog to the entire business data stack.*
    -   **PostHog Solution:** Use the data warehouse to connect sources like Stripe, HubSpot, and your production database. Then you can write a single query to join product usage events with LTV, support ticket volume, or CRM status to get a complete picture of a user.

-   **Bad:** "Do you sync data between tools?"
-   **Good:** "How much engineering time is spent building and maintaining data pipelines to get information from one tool to another? What's the business cost of decisions that are delayed because teams are waiting for that data?"
    -   *Uncovers the hidden costs of a disjointed tool stack.*
    -   **PostHog Solution:** Use PostHog's data pipelines to handle the ingestion and export of data. This allows engineers to focus on your product, not on maintaining brittle, custom-built data connections.

-   **Bad:** "Do you need to join data?"
-   **Good:** "When your leadership team asks for a report connecting product engagement metrics to financial outcomes like LTV or ARR, how long does it take your data team to pull that together from your different systems like Stripe, Salesforce, and your product database?"
    -   *Connects data warehouse to the entire business data stack and highlights the value for executive reporting.*
    -   **PostHog Solution:** Once your data sources are connected in the data warehouse, you can build a saved insight that joins this data. You can then add this to an executive dashboard and set up a subscription to have it sent to stakeholders automatically.

---

## LLM observability

**Goal:** Connect AI feature performance to user experience, cost, and ultimately, ROI.

-   **Bad:** "Are you building with LLMs?"
-   **Good:** "As you build out your AI features, how are you currently measuring the ROI? How do you connect the cost and latency of your LLM calls to the actual user engagement and satisfaction with those features?"
    -   *Connects LLM observability to product analytics and business metrics.*
    -   **PostHog Solution:** PostHog automatically tracks the cost and performance of your LLM calls. You can then use these properties in any analytics insight, for example, creating a funnel to see if users who experience high latency are less likely to convert.

-   **Bad:** "Do you monitor your prompts?"
-   **Good:** "When a user gets a poor or unexpected response from your AI, what is your process for tracing that single interaction back to the specific prompt, the LLM response, and the user's session to debug the issue?"
    -   *Connects LLM observability to session replay and error tracking.*
    -   **PostHog Solution:** Every LLM interaction can be reviewed. This view is automatically linked to the user's session replay and any errors that occurred, giving you the full context of the prompt, the response, the cost, and the user's experience in one place.

-   **Bad:** "Are your AI features expensive?"
-   **Good:** "When you're trying to optimize the cost of your AI features, how do you identify which specific user actions or prompts are generating the most expensive LLM calls, and how do you correlate that cost to the value the user is getting from the response?"
    -   *Connects LLM observability to analytics and cost management.*
    -   **PostHog Solution:** Create a trend insight to show the total cost of your LLM calls, broken down by a custom event property like `prompt_type` or by user. This helps you pinpoint exactly where your AI spend is going.

---

## Web analytics

**Goal:** Connect top-of-funnel marketing activity to down-funnel product engagement and long-term customer value.

-   **Bad:** "Are you tracking website traffic?"
-   **Good:** "How do you currently connect the marketing channel that first brought a user to your website with their long-term engagement and retention patterns once they're inside your product?"
    -   *Connects web analytics to product analytics (especially retention and cohorts).*
    -   **PostHog Solution:** PostHog's web analytics automatically captures UTM parameters and persists them. You can then build a retention insight and break it down by the `Initial UTM Source` property to see which channels bring in the stickiest users.

-   **Bad:** "Do you track marketing campaigns?"
-   **Good:** "Beyond just tracking conversions, how do you analyze the *entire journey* of users from a specific campaign—from their first landing page view all the way to becoming a power user of a key feature?"
    -   *Connects web analytics to product analytics (paths, funnels).*
    -   **PostHog Solution:** Use a paths insight, filtering for users whose initial UTM campaign matches your target campaign. This will show you the complete journey of how those specific users navigate from marketing pages into your product.

-   **Bad:** "Which marketing channels work best?"
-   **Good:** "When a marketing campaign successfully drives a lot of signups, what's your process for tracking whether those users become highly-retained, high-LTV customers, or if they tend to churn out after a week?"
    -   *Connects web analytics to product analytics (retention, LTV).*
    -   **PostHog Solution:** Create a cohort of users from a specific marketing campaign. Then, use this cohort in retention and LTV insights (if you've connected revenue data) to measure the true long-term value of the campaign, not just the initial signups. 