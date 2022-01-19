---
title: Team Core Analytics
sidebar: Handbook
showTitle: true
hideAnchor: true
---

## People

[See team structure page](/handbook/people/team-structure/team-structure)

## Mission

Make PostHog the best platform to analyze your product data
## Goals & Key Results

- Performance - Maintain performance and availability of performing analysis, even for high scale customers.
    - p90 query performance across features < 5s. Count slow and buggy/failing queries as some large number (60s)
    - What is the biggest client we're able to support (# events/month, # persons/month)
- Confidence - Ensure quality of insights
    - attempts to surface similar results
    - measure difference between insight results that should return identical results
    - number of churned caused by insights
    - reduce # of data integrity support issues 
    - provide clear feedback when data does not seem to line up
    - messaging and docs around how insights should be used and what information is returned
- Completeness - Ensure features provide direct abilities to analyze their data. Users should not have to create unnecessary workarounds
    - number of feature requests on certain insights
    - Reduce the gap between feature differences of our platform compared to another
    - [Discoveries](https://app.posthog.com/insights/O4R-Frza?events=%5B%5D&actions=%5B%7B%22id%22%3A%2210784%22%2C%22math%22%3A%22total%22%2C%22name%22%3A%22Discoveries%22%2C%22type%22%3A%22actions%22%2C%22order%22%3A0%7D%5D&display=ActionsLineGraph&insight=TRENDS&interval=week&date_from=-90d&new_entity=%5B%5D&properties=%5B%5D&breakdown_type&filter_test_accounts=true#fromDashboard=20464)
## Scope

### In Scope
- anything that has a data analysis component

Non-exhaustive examples:
- How queries are built (ensuring performance and data quality).
- Aligning user interface for optimal queryability 
- Functionality that enables any type of data analysis (e.g. correlation, experimentation)
- Development & maintenance of any feature that supports data analysis (e.g. actions, cohorts)
- Any efforts to ensure data consistency.
- Documentation of all data analysis features.
- UI that enables analytics
- TBD: Sessions analysis
### Out of scope
- Navigation
- Collaboration
- UI/UX system consistency
- Event ingestion and processing
- Features unrelated to insight discovery
- Recordings
- Extensibility

## How we work?
- No islands. Make sure people work on tasks with at least 1 other person
- Scope work into small achievable chunks
- Reduce work in progress
- Shipping MVPs for internal testing ASAP and iterating quickly
- Collecting and measuring customer feedback pre and post feature development
- Instrumenting and follow up analysis
- Documenting and upselling new functionality thoroughly

## Slack channel

[#team-querying](https://posthog.slack.com/messages/team-querying)
