---
title: Linking SurveyMonkey as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: SurveyMonkey
---

The SurveyMonkey connector syncs your survey data into PostHog, including surveys, responses, pages, questions, and collectors.

## Creating a SurveyMonkey access token

PostHog authenticates with SurveyMonkey using a private app access token.

1. Go to the [SurveyMonkey developer dashboard](https://developer.surveymonkey.com/apps/) and create a private app.
2. Generate an access token for your app.
3. Grant the following read scopes:
   - `surveys_read`
   - `responses_read_detail`
   - `collectors_read`
4. Copy the access token — you'll paste it into PostHog in the next step.

## Linking SurveyMonkey

1. Go to the [Data pipeline sources page](https://app.posthog.com/data-management/sources) in PostHog.
2. Click **+ New source** and then click **Link** next to SurveyMonkey.
3. Paste your SurveyMonkey **access token**.
4. Select your **data center** (US, EU, or Canada) — this must match the region your SurveyMonkey account is hosted in.
5. _Optional:_ Add a prefix to your table names.
6. Click **Next**, choose the tables you want to sync, and then click **Import**.

The data warehouse then starts syncing your SurveyMonkey data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

## Data centers

SurveyMonkey hosts data in regional data centers. Select the region that matches your SurveyMonkey account:

| Region | API host                  |
| ------ | ------------------------- |
| US     | `api.surveymonkey.com`    |
| EU     | `api.eu.surveymonkey.com` |
| Canada | `api.surveymonkey.ca`     |

If you're unsure which data center your account uses, check your SurveyMonkey account settings or the URL you use to log in.

## Sync modes

SurveyMonkey tables support different sync modes depending on whether the SurveyMonkey API exposes server-side timestamp filters for the resource:

| Table              | Sync mode    | Incremental filter                            |
| ------------------ | ------------ | --------------------------------------------- |
| `surveys`          | Incremental  | `start_modified_at` (cursor: `date_modified`) |
| `survey_responses` | Incremental  | `start_modified_at` / `start_created_at`      |
| `survey_pages`     | Full refresh | —                                             |
| `survey_questions` | Full refresh | —                                             |
| `collectors`       | Full refresh | —                                             |

- **Incremental** – Only imports records modified (or created) since the last sync. More efficient for large accounts.
- **Full refresh** – Re-imports all records on every sync. Used for tables where the API doesn't support server-side date filtering.

## Available tables

| Table              | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `surveys`          | List of all surveys in your account                          |
| `survey_responses` | Individual response data for each survey                     |
| `survey_pages`     | Pages within each survey                                     |
| `survey_questions` | Questions within each survey (extracted from survey details) |
| `collectors`       | Collectors (distribution channels) for each survey           |
