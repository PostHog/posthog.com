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
  * Context everywhere you need it (e.g. in session recordings where they came from: Team West
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
   * **Identifying hidden trends in metrics **(e.g. did you know there was a 20% increase in signups from the US this week, 90% drop in purchases made on your android app this week)
* **Complications**:
   * To do anomaly detection well, we may also need to effectively forecast or limit how anomaly detection can be used (e.g. if there are major seasonal variations in the metric, these need to be accounted for)

### Unified querying across events, persons, sessions, groups etc: Team West

In progress...

* **Priority**: 
* **Goal**:
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

### ...