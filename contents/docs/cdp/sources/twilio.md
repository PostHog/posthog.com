---
title: Linking Twilio as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Twilio
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Twilio credentials to pull your Twilio data into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Twilio.
3. Find your **Account SID** on the [Twilio Console dashboard](https://console.twilio.com). For the remaining credentials, choose an authentication method:
   - **API key (SID + secret)** — recommended, since it can be revoked independently. Create a [Standard API key](https://console.twilio.com/us1/account/keys-credentials/api-keys) and copy its `API key SID` and `API key secret`.
   - **Auth token** — alternatively, use the `Auth token` shown alongside your Account SID in the console.
4. Back in PostHog, enter your Account SID, pick the authentication method, fill in the matching credentials, and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Twilio data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `messages` | SMS, MMS, and other messages | Incremental |
| `calls` | Voice calls | Incremental |
| `recordings` | Call recordings | Incremental |
| `conferences` | Conference calls | Incremental |
| `addresses` | Addresses on the account | Full refresh |
| `applications` | TwiML applications | Full refresh |
| `incoming_phone_numbers` | Phone numbers owned by the account | Full refresh |
| `keys` | API keys on the account | Full refresh |
| `outgoing_caller_ids` | Verified outgoing caller IDs | Full refresh |
| `queues` | Call queues | Full refresh |
| `transcriptions` | Recording transcriptions | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
