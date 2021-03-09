---
title: API Overview
sidebar: Docs
showTitle: true
---

This section of our Docs explains how to pull or push data from/to our API. PostHog has an API available on all tiers of pricing and for every self-hosted version.

Please note that PostHog makes use of two different APIs, serving different purposes and using different mechanisms for authentication. 

One API is used for pushing data into PostHog. This uses the 'Team API Key' that is included in the [frontend snippet](/docs/integration/js-integration). This API Key is **public**, and is what we use in our frontend integration to push events into PostHog, as well as to check for feature flags, for instance. 

The other API is more powerful and allows you to perform any action as if you were an authenticated user utilizing the PostHog UI. It is mostly used for getting data out of PostHog, as well as other private actions such as creating a feature flag. This uses a 'Personal API Key' which you need to create manually (instructions [below](#authentication)). This API Key is **private** and you should not make it public nor share it with anyone. It gives you access to all the data held by your PostHog instance, which includes sensitive information.

These API Docs refer mostly to the **private API**, performing authentication as outlined below. The only exception is the [POST-Only Public Endpoints](/docs/api/post-only-endpoints) section. This section explicitly informs you on how to perform authentication. For endpoints in all other sections, authentication is done as described below.

## Authentication

### Personal API Keys (Recommended)

Personal API keys allow full access to your account, just like e-mail address and password, but you can create any number of them and each one can invalidated individually at any moment. This makes for greater control for you and improved security of stored data.

#### How to Obtain a Personal API key

1. Select 'Setup' on the left sidebar.
2. Navigate to the 'Personal API Keys' section.
3. Click "+ Create a Personal API Key".
4. Give your new key a label – it's just for you, usually to describe the key's purpose.
5. Click 'Create Key'.
6. There you go! At the top of the list you should now be seeing your brand new key. **Immediately** copy its value, as you'll **never** see it again after refreshing the page. But don't worry if you forget to copy it – you can delete and create keys as much as you want.

#### How to Use a Personal API key

There are three options:

1. Use the `Authorization` header and `Bearer` authentication, like so:
    ```JavaScript
    const headers = {
        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`
    }
    ```
2. Put the key in request body, like so:
    ```JavaScript
    const body = {
        personal_api_key: POSTHOG_PERSONAL_API_KEY
    }
    ```
3. Put the key in query string, like so:
    ```JavaScript
    const url = `https://posthog.example.com/api/user/?personal_api_key=${POSTHOG_PERSONAL_API_KEY}`
    ```

Any one of these methods works, but only the value encountered first (in the order above) will be used for authenticaition!

#### cURL example
```bash
POSTHOG_PERSONAL_API_KEY=qTjsppKJqYLr2YskbsLXmu46eW1oH0r3jZkmKaERlf0

curl \
--header "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \
https://posthog.example.com/api/person/
```

<br />

## `/user/`

The [`/user/` endpoint](./user) gives you a lot of useful information about the possible event names and properties you can use throughout the rest of the API. 

<br>

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

You can then just call the `"next"` URL to get the next set of results.