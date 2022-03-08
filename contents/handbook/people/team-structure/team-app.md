## Mission

Makers everywhere get better at building products because of PostHog

# Roadmap

## 3 year goals
* You can explore data across all insights and dimensions
* You can trivially share any insight anywhere
* Onboarding is as easy as a video game
* Tight integration with developer workflows
* No more complex than it is today
* Using PostHog sparks joy
* We support trillion event querying

## 6 Month Goals
* You can explore data across all insights and dimensions
  * Automatically discover relevant insights: Team West
  * Unified querying across events, persons, sessions, groups etc: Team West
  * Context everywhere you need it (e.g. in session recordings where they came from): Team West
  * Session analysis that works: Team West
* You can trivially share any insight anywhere
   * Slack previews in insight: Team East
   * Download as PNG and share (including logo): Team East
   * Subscribe to a dashboard or insight: Team East
   * Insight delta: Team West
* Onboaridng is as easy as a video game
   * Fun in-app tour for new users: Team West
   * Good default insights and never an empty graph (Demo environment): Team East
   * Significantly improve onboarding conversion rate metric: Team West
* Tight integration with developer workflows
   * Not a focus for next 6 months (maybe hackathon project) 
* No more complex than it is today
   * Deprecate, hide of simplify existing complex insights: Team West
   * Simplify actions: Team East
   * UI consistent and docs inline: Team East
* Using PostHog sparks joy
    * Something with a hedgehog: Team East
* We support trillion event querying
    * Persons on events to support billion level querying: Team East


## Roadmap Details

### Automatically discover relevant insights: Team West

* **Priority**: Mid (TBC)
* **Goal**:
   * Users discover valuable new insights without needing to search for them
         * Primary Metric: % insights analyzed, which were automatically generated
* **Motivation**:
   * **Customer**:
         * This feature has not been heavily requested by our existing customers today
         * [Customers need to understand when there is a drop in onboarding or high level of exceptions so they can take immediate action](https://github.com/PostHog/posthog/issues/2773)
   * **Data**:
         * [25% of insights are analyzed by someone who didn’t create them today](https://app.posthog.com/insights/WrEI3Q8i), indicating people are looking for existing analyses to quickly get valuable information
   * **Industry**:
         * Datadog have an [anomaly detection tool](https://www.datadoghq.com/blog/introducing-anomaly-detection-datadog/)
         * Amplitude has [anomaly + forecasting capabilities](https://help.amplitude.com/hc/en-us/articles/360044072251-Anomaly-and-Forecast)
* **Use cases**:
   * **Finding related insights** **to answer common questions** (e.g. people who viewed this insight also viewed this insight, this is the most common breakdown of this metric)
   * **Identifying hidden trends in metrics** (e.g. did you know there was a 20% increase in signups from the US this week, 90% drop in purchases made on your android app this week)
* **Complications**:
   * To do anomaly detection well, we may also need to effectively forecast or limit how anomaly detection can be used (e.g. if there are major seasonal variations in the metric, these need to be accounted for)

### Unified querying across events, persons, sessions, groups etc: Team West

https://github.com/PostHog/posthog/issues/7963

* **Priority**: 
* **Goal**:
   * 
       * 
* **Motivation**:
   * **Customer**:
         * 
   * **Data**:
         * 
   * **Industry**:
         * 
* **Use cases**:
   * 
* **Complications**:
   * 

### Context everywhere you need it (e.g. in session recordings where they came from)

* **Priority**: 
* **Goal**:
   * 
       * 
* **Motivation**:
   * **Customer**:
         * 
   * **Data**:
         * 
   * **Industry**:
         * 
* **Use cases**:
   * 
* **Complications**:
   * 

### Session analysis that works

### Slack previews in insight: Team East

### Download as PNG and share (including logo): Team East

### Subscribe to a dashboard or insight: Team East

* **Priority**: High (TBC)
* **Goal**:
   * Important insights meet people where they are
       * % Insights analyzed from dashboard / insight notifications
* **Motivation**:
   * **Customer**:
         * For one of our largest customers, their CEO regularly checks various PostHog dashboards to understand perofrmance of the business, but PostHog is not a standard part of thier workflow and they often forget credentials or lean on others to get the data they need
         * They are not comfortable using shared dashboards as the data is internal 
   * **Data**:
         * [20% of users who view dashboards view them >5x per week](https://app.posthog.com/insights/A8Cbv2Z0) indicating that our users have the intent to regularly check dashboards
   * **Industry**:
         * [Amplitude email dashboards](https://join.slack.com/share/enQtMzIyMjI5NDczMzQ3My1mMDE2NGExZGRjNTA1YmFiYTFmNGE2MzI4OGRmYjQxZmQ3M2E0YmUzNjBkMGNhZGQ4YWMzMTBlMmIyZWZjZDgy)
         * [Heap scheduled email reports](https://help.heap.io/analysis-examples/organize-and-share-data/schedule-email-reports-for-you-your-team/)
         * [Metabase dashboard subscriptions](https://www.metabase.com/docs/latest/users-guide/dashboard-subscriptions.html)
* **Use cases**:
   * Company executives, managers and leaders need to stay informed in how their product is performing but do not have the skills or the time to dive into PostHog
   * Team members can keep track of important metrics to ensure features roll out effectively
   * Important team / company metrics can be regularly communicated so everyone is aware of the priorities and can take quick action when metrics change
* **Complications**:
   * Some self-hosted instances won't have email configured
   * Data on the dashboard may have changed since we sent the notification


###  Insight delta: Team West

### Fun in-app tour for new users: Team West

### Good default insights and never an empty graph (Demo environment): Team East

### Significantly improve onboarding conversion rate metric: Team West
