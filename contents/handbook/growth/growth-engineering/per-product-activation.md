---
title: Per-product activation
sidebar: Handbook
showTitle: true
---

Because PostHog offers so many products, and people sign up with all sorts of different needs, we track activation separately for each product. 

Every product should have activation criteria - these are used to determine if a user has activated for a specific product yet. If they haven't, and they've showed [intent for that product](/handbook/growth/growth-engineering/product-intents), we can nudge them in the right direction. These are also used to understand what retention looks like for the product, and to figure out what PostHog can do to offer a better experience!

## How we track activation, and how to set up an activation query for a new product

This is the basic structure of our activation queries:

1. An organization triggered a 'product intent' -> This is the 'upfunnel' metric
2. An organization met the 'activation criteria', usually one, multiple, or a set of qualifying events in a given time period (e.g. 30 days) -> This is the 'downfunnel' metric
3. An organization triggered an event correlating with product usage 3 months after they showed product intent -> This is the retention / survived metric

Here is an example structure:

![image](https://res.cloudinary.com/dmukukwp6/image/upload/product_analytics_activation_ff38af6d30.png)

You can find all per-product activation queries on [this dashboard](https://us.posthog.com/project/2/dashboard/130345).

### Picking the right activation criteria

The ideal activation metric strikes a balance: enough companies should reach activation (so it's not too restrictive), while those who activate should have high retention (so it's not too easy). To find a couple of potential definitions, you want to look at product usage and think about what behaviour *could* correlate with successful activation (aka the "aha-moment"). This could be things such as

1. Has done a key event once (such as launched an experiment)
2. Has done a key event multiple times (such as analyzed 2 insights)
3. Has done a combination of key events (such as watched 5 recordings, and set a recording filter)

To pick the best activation definion, it's recommended to write the activation queries for multiple potential activation definitions (~5-10), and compare the activation and retention numbers. This leads to a much higher confidence in the activation metric than just picking your best guess.

Which definition is the best indicator for long term retention? You want to pick a definition that gets a sizable number of organizations to activate, but also to retain. But be careful: If you pick a activation definition where only 1% activate, and 100% of those 1% retain, your activation metric is too narrow!

Note on the retention / survived definition: For this, it's recommended you pick whatever tells you they are an active user. It can be the same as your activation definition, or something else. It can be as simple as someone logging in or creating new things in your product.

If you haven't already, make sure you also track [product intents](/handbook/growth/growth-engineering/product-intents) for your product. It's worth noting that adding new product intents will impact your activation rates and makes it harder to compare them historically, so please add new product intents with caution.

[Read this blog post](/product-engineers/activation-metrics) for a deep dive into how we first came up with our activation definions.

### Structure of the SQL query

Our activation SQL queries consist of two parts: A materialised view to count the eligible events, a SQL query on top of the materialised view to count the conversion percentages. We use materialised views to make these queries more performant.

We store the activation logic in SQL queries and not in code to make it easier to see our activation definitions, to experiment with new definitions, and to drill down to understand why a certain bucket might not perform so well.

**The following activation logic is stored in the materialised views:**

1. Count only the first product intent per organization (since product usage intents can be triggered multiple times by the same org), as well as filter out cross sell product intents
2. Check if an organization meets the activation definition within 30 days of showing product intent
3. Check if an organization meets the retetion / survived definition within 3 months of showing product intent

Here is an example (materialised view query)[https://us.posthog.com/project/2/sql?open_view=01966c82-9958-0000-7959-1728ad7dd6d4]. To write your own, we recommend copying the query and change the product & event filtering criteria as needed.

```sql
WITH showed_intent AS (
   SELECT
      organization_id,
      start_date,
      start_month
   FROM (
      SELECT
         person.properties.organization_id as organization_id, 
         toDate(timestamp) as start_date,
         toStartOfMonth(toDate(timestamp)) as start_month,
         ROW_NUMBER() OVER(PARTITION BY person.properties.organization_id ORDER BY toDate(timestamp)) as rn
      FROM events
      WHERE toDate(timestamp) >= now() - interval 12 month 
      AND (
          (event = 'onboarding product selected' AND properties.realm = 'cloud')
          OR 
          (event = 'user showed product intent' AND (
              toDate(timestamp) < toDate('2024-10-29')  -- Before today, ignore realm
              OR 
              (toDate(timestamp) >= toDate('2024-10-29') AND properties.realm = 'cloud')  -- Today and after, check realm
          ))
      )
      and person.properties.email not like '%posthog.com%'
      and properties.host not like '%localhost%'
      and distinct_id not like '%posthog%'
      and person.properties.email not in ('capturi@capturi.com','fuziontech@gmail.com')   
      AND properties.product_key = 'product_analytics'
      AND properties.type != 'cross_sell'
   ) sub
   WHERE sub.rn = 1
), downfunnel AS (
   SELECT
      person.properties.organization_id as organization_id,
      toDate(timestamp) as date_str,
      toStartOfMonth(toDate(timestamp)) as event_month,
      sum(CASE WHEN event ='insight saved' THEN 1 ELSE 0 END) as insight_saved, 
      sum(CASE WHEN event ='insight analyzed' THEN 1 ELSE 0 END) as insight_analyzed, 
      sum(CASE WHEN event = 'team member invited' THEN 1 ELSE 0 end) as team_member_invited,
      sum(CASE WHEN event = 'dashboard created' THEN 1 ELSE 0 end) as dashboard_created,
      sum(CASE WHEN event = 'cohort created' THEN 1 ELSE 0 end) as cohort_created,
      sum(CASE WHEN event = 'action created' THEN 1 ELSE 0 end) as action_created,
      sum(CASE WHEN event = 'first team event ingested' THEN 1 ELSE 0 end) as first_team_event_ingested,
      sum(CASE WHEN event = 'billing subscription activated' THEN 1 ELSE 0 end) as billing_subscription_activated
   FROM events
   WHERE toDate(timestamp) >= now() - interval 12 month
   AND event IN ('insight analyzed', 'insight saved', 'team member invited', 'first team event ingested',
   'dashboard created', 'cohort created', 'action created', 'billing subscription activated')
   GROUP BY 1,2
), 
event_sent_orgs AS (
   SELECT
      showed_intent.organization_id   
   from showed_intent
   join downfunnel on showed_intent.organization_id = downfunnel.organization_id
   where downfunnel.date_str >= showed_intent.start_date
      and downfunnel.date_str <= showed_intent.start_date + interval 30 day
   group by 1
   having 
      sum(coalesce(downfunnel.first_team_event_ingested, 0)) > 0
),
successful_orgs AS (
   SELECT
      showed_intent.organization_id   
   from showed_intent
   join downfunnel on showed_intent.organization_id = downfunnel.organization_id
   where downfunnel.date_str >= showed_intent.start_date
      and downfunnel.date_str <= showed_intent.start_date + interval 30 day
   group by 1
   having 
      sum(coalesce(downfunnel.insight_saved, 0)) > 2
      and sum(coalesce(downfunnel.dashboard_created, 0)) > 0 
      and sum(coalesce(downfunnel.first_team_event_ingested, 0)) > 0
),
retained AS (
   SELECT
      DISTINCT e.person.properties.organization_id as organization_id
   FROM events e
   JOIN showed_intent ON e.person.properties.organization_id = showed_intent.organization_id
   WHERE toDate(timestamp) >= showed_intent.start_date + interval 3 month
      and toDate(timestamp) <= showed_intent.start_date + interval 4 month
      AND event IN ('insight viewed', 'insight saved')
)
SELECT
   showed_intent.organization_id,
   showed_intent.start_month,
   IF(successful_orgs.organization_id IS NOT NULL, 1, 0) AS activated,
   IF(retained.organization_id IS NOT NULL,       1, 0) AS retained,
   org_icp_scores.icp_score AS org_icp_score
FROM showed_intent
LEFT JOIN successful_orgs 
  ON showed_intent.organization_id = successful_orgs.organization_id
LEFT JOIN retained 
  ON showed_intent.organization_id = retained.organization_id
LEFT JOIN org_icp_scores
  ON showed_intent.organization_id = org_icp_scores.organization_id
GROUP BY 1,2,3,4,5
ORDER BY 2
```

**The following logic is stored in the SQL query:**

1. Check if a organization is both activated AND retained to be counted in retention / survived
2. Calculate the conversion percentages from product intent -> activation -> retention / survived

To write your own, we also recommend copying one of the [existing queries](https://us.posthog.com/project/2/insights/ccIWa4br). All our activation queries follow the same structure, which we should also follow for new products. Once you've found a good definion of activation for your product, please do add the final activation query to the [activation per product dashboard](https://us.posthog.com/project/2/dashboard/130345).

```sql
SELECT
    start_month,
    -- how many orgs showed product intent that month
    countDistinctIf(organization_id, 1)                              AS total_starts,
    -- how many of those actually activated
    countDistinctIf(organization_id, activated = 1)                 AS total_orgs_activated,
    -- activation %
    round(
        countDistinctIf(organization_id, activated = 1) * 100.0
        / NULLIF(countDistinctIf(organization_id, 1), 0),
        2
    )                                                                AS activation_percentage,
    -- how many of the activated later retained
    countDistinctIf(organization_id, activated = 1 AND retained = 1) AS total_activated_orgs_survived,
    -- retention % of those activated
    CASE
      WHEN countDistinctIf(organization_id, activated = 1) = 0 THEN NULL
      WHEN round(
             countDistinctIf(organization_id, activated = 1 AND retained = 1) * 100.0
             / NULLIF(countDistinctIf(organization_id, activated = 1), 0),
             2
           ) = 0 THEN NULL
      ELSE round(
             countDistinctIf(organization_id, activated = 1 AND retained = 1) * 100.0
             / NULLIF(countDistinctIf(organization_id, activated = 1), 0),
             2
           )
    END                                                               AS retained_percentage_of_activated
FROM product_analytics_activation_base
GROUP BY start_month
ORDER BY start_month
```

## Why does this matter?

Tracking activation is important, because it tells us how many companies start using our products successfully each month, and how many retain. Measuring it month over month allows us to see trends, and whether improvements to the product actually made a difference.

If your activation metrics look good, it gives us the piece of mind to focus on new feature development. But if they trend downwards, it's probably a good time to look into our onboarding and "first time user" funnels to see in which areas our UX can be improved.
