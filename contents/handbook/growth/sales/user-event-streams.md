---
title: User event streams
sidebar: Handbook
showTitle: true
---

Using PostHog's data pipelines (CDP), you can create a real-time feed of customer activity directly in Slack. This lets you monitor how users in your book of business are engaging with PostHog without constantly checking dashboards or running queries.

This is valuable for getting a pulse on account health and engagement patterns. You'll see who's actively using the product, which features they're exploring, and when they might be hitting friction points. It's not meant to replace proper data analysis, but it gives you the "vibes" and can help you time your outreach more effectively. For example, if you notice someone reading a lot of feature flag docs and then creating several flags, you know they're actively working on something and might appreciate a quick check-in.

A word of caution: don't be a creep about this. Use it to inform when and how you reach out, not to surveil every click. If you notice someone's activity suggests they need help, check in naturally without revealing you're monitoring their every move.

## How to set up your event stream

### 1. Get your account organization IDs

Query PostHog's data warehouse to pull Salesforce data and create a CSV of all PostHog organization IDs for accounts you own. This gives you the list of orgs to monitor.

### 2. Create a CDP destination

Set up a new data pipelines destination using a webhook endpoint. This is where you'll send the filtered events.

### 3. Filter for your accounts

Configure the destination to filter for all events where the organization ID matches your CSV list of org IDs. This ensures you only see activity from your accounts.

### 4. Select relevant events

Add filters for events that represent meaningful user actions across product areas:

**Product analytics & insights:**
- insight created
- cohort created
- action created
- annotation created
- dashboard created

**Session replay:**
- recording analyzed
- viewed recordings from experiment

**Feature flags & experiments:**
- feature flag created
- experiment created
- experiment launched
- experiment completed
- experiment viewed

**Surveys:**
- survey launched

**AI & Max:**
- chat with ai
- AI generation (LLM)
- ai_hog_function_prompted
- ai_hog_function_accepted
- sql-editor-accepted-suggestion
- LLMa events for seeing user prompts

**Data pipelines:**
- batch export enabled
- batch import created
- export succeeded

**Error tracking:**
- error_tracking_issue_created

**Engagement & product intent:**
- person viewed
- user showed product intent
- Pageview (where url contains "docs")
- toolbar mode triggered

**Billing & account health:**
- billing product activated
- billing limits updated
- Hit billing limit
- billing addon removed
- billing subscription paid
- billing subscription cancelled
- billing invoice payment failed
- annual plan credit purchase
- billing trial activated
- autocapture_opt_out team setting updated
- session_recording_opt_in team setting updated
- autocapture_exceptions_opt_in team setting updated

**Team growth:**
- team member invited

### 5. Customize the payload

Modify the webhook payload to include:

- User email
- Event name
- Current URL
- Any other properties valuable for your real-time stream (e.g., organization name, event properties)
- You can link right to replays ([docs](/docs/cdp/destinations/customizing-destinations#adding-session-replay-links-to-slack-messages)), just know they may not be available immediately

### 6. Route to Slack

Send the data to a Slack App endpoint, Zapier, or Relay.app to transform and redirect the events to your personal channel like `your-name-alerts` or `your-name-user-event-stream`.

## What you'll get

A real-time feed of user activity that helps you:

- Identify active power users and champions
- Spot when accounts are exploring new features (cross-sell opportunity)
- Notice declining engagement patterns early
- Time your outreach when users are actively working on something
- Get a general sense of account health without diving into dashboards

Remember: this is supplementary context, not a replacement for proper account analysis and data review.
