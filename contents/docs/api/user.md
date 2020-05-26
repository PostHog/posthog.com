---
title: User
sidebar: Docs
showTitle: true
---


In PostHog, there is an API endpoint available to get all information on your own user and team.
This includes all possible event names, event properties, api key, app urls, current posthog version and more.


## List current user


```plaintext
GET /user
```


Example request:

```shell
curl https://posthog.example.com/api/user/
```

Example response:

```json
{
   "id":1,
   "distinct_id":"0xbG68iGlllrkj__NqQe5Vz4nsL9jgBE",
   "name":"",
   "email":"tim@posthog.com",
   "has_events":true,
   "email_opt_in":false,
   "anonymize_data":false,
   "team":{
      "app_urls":[
         "https://example.com",
      ],
      "api_token":"[example api token]",
      "signup_token":"[example signup token]",
      "opt_out_capture":false,
      "slack_incoming_webhook": null,
      "event_names":[
         "$autocapture",
         "created superuser",
         "$identify",
         "$pageleave",
         "$pageview",
         "ph_page_view",
         "someevent",
         "superuser created",
         "user logged in",
         "user signed up",
         "some event",
         "event"
      ],
      "event_properties":[
         "$os",
         "$browser",
         "$current_url",
         "$browser_version",
         "$screen_height",
         "$screen_width",
         "$lib",
         "$lib_version",
         "$insert_id",
         "$time",
         "distinct_id",
         "$device_id",
         "$initial_referrer",
         "$initial_referring_domain",
         "$user_id",
         "posthog_version",
         "token",
         "$ip",
         "$event_type",
         "$ce_version",
         "$host",
         "$pathname",
         "$search_engine",
         "$referrer",
         "$referring_domain",
         "is_first_user",
         "$anon_distinct_id",
         "$device",
         "utm_source",
         "utm_medium",
         "utm_campaign",
         "utm_content",
         "utm_term",
         "$had_persisted_distinct_id",
      ]
   },
   "posthog_version":"1.6.0"
}
```