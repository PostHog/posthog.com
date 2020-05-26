---
title: API
sidebar: Docs
showTitle: true
---

This section of our docs explains how to pull or push data from our API.

If you are looking to push event or user data into PostHog instead of using a tracking snippet or a language specific library, there is a simple guide in the [dedicated events API](/docs/integrations/api) section.

PostHog has an API available on all tiers of pricing and for every self-hosted version.

## Authentication

Authentication is via Basic Auth using your own username and password. We suggest creating a new user within your team specifically for this.

With curl:
```bash
curl -u username:password https://posthog.example.com/api/person/
```

As a header
```bash
AUTH=$(echo -ne "username:password" | base64 --wrap 0)

curl \
  --header "Authorization: Basic $AUTH" \
  https://posthog.example.com/api/person/
```

*Important!*: The API key in the Setup page is write only and public. You can not use that for any of these endpoints.

## /user

The [user endpoint](./user) gives you a lot of useful information about the possible event names and properties you can use throughout the rest of the api. 

## Pagination

Sometimes requests are paginated. If that's the case, it'll be in the following format:

```json
{
    "next": "https://posthog.example.com/api/person/?cursor=cD0yMjgxOTA2",
    "previous": null,
    "results": [
        ...
    ]
}
```

In those cases, you can just call the "next" url to get the following set of results.