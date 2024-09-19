---
title: How to speed up PostHog insights
date: 2024-10-19
author:
  - tim-glaser
showTitle: true
sidebar: Docs
tags:
  - product analytics
---

PostHog is incredibly good at making queries run fast, much faster than in other types of data warehouses, and faster than if you were running queries in your own infrastructure.
This is because we dedicate huge amounts of infrastructure to running your insight. We also use a specialised database called an OLAP database (Clickhouse in our case) which is optimized for running analytics queries quickly.
However, sometimes insights can still be slow. Here are some things you can do to speed up queries

## Select a specific event

Filtering by "All events" is useful, but is also much 

## Reduce the time period you're filtering on

## Change the person properties mode

![Screenshot 2024-09-19 at 17 06 03](https://github.com/user-attachments/assets/b4451fcf-a35e-4ce0-964c-71fd10312330)

## Use sampling

## Avoid "weekly active users" or "monthly active users"

These are useful, but also expensive to calculate because it does a trailing average. Instead, aggregate by "unique users" and set the "grouped by" to "week" or "month".

## Turn off comparisons

Comparisons double the amount of work we need to do in the background.
