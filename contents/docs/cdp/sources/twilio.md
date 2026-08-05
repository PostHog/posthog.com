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

<CalloutBox icon="IconFlask" title="Alpha release" type="action">

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

<CalloutBox icon="IconWarning" title="Key type and region requirements" type="caution">

- Create the key in the same Twilio account or subaccount as the Account SID you enter. A key from another account can't authenticate against it.
- PostHog connects to `api.twilio.com`, so the account must be in Twilio's default `us1` region. Keys created in another region don't work.
- A Standard API key can read every table except `keys`. Twilio restricts the [Keys resource](https://www.twilio.com/docs/iam/api-keys) to your Auth token and to Main API keys, so choose one of those if you want to sync `keys`.

</CalloutBox>

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
| `keys` | API keys on the account. Needs your Auth token or a Main API key | Full refresh |
| `outgoing_caller_ids` | Verified outgoing caller IDs | Full refresh |
| `queues` | Call queues | Full refresh |
| `transcriptions` | Recording transcriptions | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
