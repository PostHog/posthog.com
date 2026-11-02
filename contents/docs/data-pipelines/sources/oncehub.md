---
title: Linking OnceHub as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Oncehub
---

The OnceHub connector syncs your scheduling and booking data – bookings, booking calendars, contacts, users, teams, event types, booking pages, master pages, and user scheduling availability – from the OnceHub Booking Calendars and Booking Pages APIs into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to OnceHub.

3. Next, you need an API key from OnceHub. In your OnceHub account, go to **Settings → API & Webhooks** and generate an API key. The key is shown only once at creation, so copy it right away.

4. Back in PostHog, paste the API key and click **Next**.

5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using OnceHub data in PostHog.

## Available tables

| Table                          | Description                                                               | Sync method  |
| ------------------------------ | ------------------------------------------------------------------------- | ------------ |
| `bookings`                     | Scheduled meetings including status, timing, and customer information     | Full refresh |
| `booking_calendars`            | Scheduling links that accept bookings for users or teams                  | Full refresh |
| `contacts`                     | Customers who have interacted with OnceHub scheduling pages               | Full refresh |
| `users`                        | Team members in your OnceHub account                                      | Full refresh |
| `teams`                        | Teams of users in your OnceHub account                                    | Full refresh |
| `event_types`                  | Event types (services) from classic Booking Pages, referenced by bookings | Full refresh |
| `booking_pages`                | Classic Booking Pages used to schedule meetings                           | Full refresh |
| `master_pages`                 | Master pages grouping several booking pages behind one entry point        | Full refresh |
| `user_scheduling_availability` | Per-user scheduling availability with weekly hours and date overrides     | Full refresh |

All tables use **full refresh** – all data is reloaded on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
