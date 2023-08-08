---
title: How to troubleshoot missing events
date: 2023-08-08
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-10.png
tags: ['guides']
---

Missing events can be a pain to troubleshoot. This guide aims to help you diagnose and address the issue efficiently. There are three potential areas where the problem might originate:

1. The library is being used incorrectly. (this is usually the issue)
2. There is a bug within the library being used.
3. Events are not ingested after being received by PostHog.

## The library is being used incorrectly. (this is usually the issue)

1. Visit [webhook.site](https://webhook.site/) and copy “Your unique URL”.
2. Replace [posthog.com](https://app.posthog.com) (or [eu.posthog.com](https://eu.posthog.com) if using the EU Cloud) with “Your unique URL”.
3. Make sure that the SDK sends a couple of events.
4. See if the incoming events arrive as expected.

## There is a bug within the library being used.

1. Open the devtools and switch to the network tab.
2. Look for the request that appears to be incorrect.
3. [Send a support ticket via the app](https://app.posthog.com/home#supportModal=bug%3Aingestion) (or contact the  [EU-Cloud support](https://eu.posthog.com/home#supportModal=bug%3Aingestion)) including the network request.

## Events are not ingested after being received by PostHog.

1. Open the devtools and switch to the network tab.
2. Right click one of the network requests to posthog.com (or eu.posthog.com if using the EU Cloud) and select Copy -> Copy as cURL.
3. Try to send the cURL directly.
4. Wait 1 hour and check if the event is still not visible in PostHog.
5. Also make sure your cloud is not experiencing an [active incident](https://status.posthog.com) as that could cause an ingestion lag.
6. [Send a support ticket via the app](https://app.posthog.com/home#supportModal=support%3Aingestion) (or contact the [EU-Cloud support](https://eu.posthog.com/home#supportModal=support%3Aingestion)) and include the copied cURL command.

##  Still encountering issues?
If those steps did not fix the issue, feel free to [get in touch with the support](https://app.posthog.com/home#supportModal=support%3Aingestion) (or contact the [EU-Cloud support](https://eu.posthog.com/home#supportModal=support%3Aingestion)). We try to respond to as many of these as we can.

Use the following format when reporting bugs:
```
# Library: 
posthog-python https://posthog.com/docs/libraries/python

# Library initialization:
from posthog import Posthog
posthog = Posthog(phc_yourAPIKey, host='app.posthog.com')

# What was called:
posthog.capture(
    "Bob", 
    "user signed up", 
    {
        "login_type": "email", 
        "is_free_trial": "true"
    }
)

# What was expected to happen:
To see a network call like <x>

# What actually happened:
The network call looked like this, specifically "login_type" property was missing.
```

## How to cleanup a cURL command

1. The copied cURL command will look like this:
```
curl 'http://localhost:3000/e?ip=1&_=1691496272289&ver=1.53.4' \
  -H 'Origin: http://localhost:3000' \
  --data-raw 'data=W3siZXZlbnQiOiJjaGFuZ2UgYmlsbGluZyBjeWNsZSIsInByb3BlcnRpZXMiOnsiJG9zIjoiTWFjIE9TIFgiLCIkYnJvd3NlciI6IkNocm9tZSIsIiRkZXZpY2VfdHlwZSI6IkRlc2t0b3AiLCIkY3VycmVudF91cmwiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvcHJpY2luZyIsIiRob3N0IjoibG9jYWxob3N0OjMwMDAiLCIkcGF0aG5hbWUiOiIvcHJpY2luZyIsIiRicm93c2VyX3ZlcnNpb24iOjExNSwiJGJyb3dzZXJfbGFuZ3VhZ2UiOiJlbi1HQiIsIiRzY3JlZW5faGVpZ2h0Ijo5MDAsIiRzY3JlZW5fd2lkdGgiOjE0NDAsIiR2aWV3cG9ydF9oZWlnaHQiOjc5MCwiJHZpZXdwb3J0X3dpZHRoIjo3OTcsIiRsaWIiOiJ3ZWIiLCIkbGliX3ZlcnNpb24iOiIxLjUzLjQiLCIkaW5zZXJ0X2lkIjoicnNsdm9pYXlocjEydXRvbSIsIiR0aW1lIjoxNjkxNDk2MjcxLjc5NywiZGlzdGluY3RfaWQiOiIxODlkNTA4YjBmNDRkNzAtMDBmN2E5MmRkNmE0MzgtMWE1MjU2MzQtMTNjNjgwLTE4OWQ1MDhiMGY1NTJlZSIsIiRkZXZpY2VfaWQiOiIxODlkMTM4ZmMxZjJjMzYtMGQ4MmQ4Njc4NjA4YmUtMWI1MjU2MzQtMTNjNjgwLTE4OWQxMzhmYzIwM2M2NCIsIiRyZWZlcnJlciI6IiRkaXJlY3QiLCIkcmVmZXJyaW5nX2RvbWFpbiI6IiRkaXJlY3QiLCJ0b2tlbiI6InRlc3QiLCIkc2Vzc2lvbl9pZCI6IjE4OWQ1MDhjZmIxMWViMi0wZjkyMjU2YTk1OTBhNS0xYTUyNTYzNC0xM2M2ODAtMTg5ZDUwOGNmYjI0MWZiIiwiJHdpbmRvd19pZCI6IjE4OWQ1MDhjZmIzNDc0Yy0wNmQ2Mzc2NWI3NGEzZi0xYTUyNTYzNC0xM2M2ODAtMTg5ZDUwOGNmYjQ0NzVlIiwiJHBhZ2V2aWV3X2lkIjoiMTg5ZDUwOGFlMjYzOWJmLTAyYjFjNzgwZTRmMDktMWE1MjU2MzQtMTNjNjgwLTE4OWQ1MDhhZTI3NDMxZCJ9LCJvZmZzZXQiOjQ5Mn1d' \
  --compressed
```

2. Copy the base64 encoded string

3. Visit [base64decode.org](https://www.base64decode.org/) and paste the encoded string

4. Click decode and paste the decoded output into this format:

```
POST https://[your-instance].com/capture/
Content-Type: application/json
Body:
{
    "api_key": "<ph_project_api_key>",
    "event": "[event name]",
    "distinct_id": "[your users' distinct id]",
    "properties": {
        "key1": "value1",
        "key2": "value2"
    },
    "timestamp": "[optional timestamp in ISO 8601 format]"
}
```