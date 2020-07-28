---
title: API Overview
sidebar: Docs
showTitle: true
---

This section of our docs explains how to pull or push data from our API.

If you are looking to push event or user data into PostHog instead of using a tracking snippet or a language specific library, there is a simple guide in the [dedicated events API](/docs/integrations/api) section.

PostHog has an API available on all tiers of pricing and for every self-hosted version.

## Authentication

### Authenticate safely with personal API keys

Personal API keys allow full access to your account, just like e-mail address and password, but you can create any number of them and each one can invalidated any moment. This makes for greater control for you and improved security of stored data.

### How to obtain a personal API key

1. Select Settings > Setup in PostHog.
2. Find the Personal API Keys section.
3. Click "+ Create a Personal API Key".
4. Give your new key a label – it's just for you, so you can later recall the key's purpose.
5. Click "Create Key".
6. There you go! At the top of the list you should now be seeing your brand new key. **Immediately** copy its value, as you'll **never** see it again after refreshing the page. No worries if you forget to copy though – you can delete and create keys as much as you want.

### How to use a personal API key

There are two options:

1. Use the `Authorization` header and `Bearer` authentication, like so:
    ```JavaScript
    const headers = {
        Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
        ...
    }
    ```
2. Put the key in request body, like so:
    ```JavaScript
    const body = {
        personal_api_key: POSTHOG_PERSONAL_API_KEY,
        ...
    }
    ```

Either one works, though the header takes precedence!

#### cURL example
```bash
POSTHOG_PERSONAL_API_KEY=qTjsppKJqYLr2YskbsLXmu46eW1oH0r3jZkmKaERlf0

curl \
--header "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \
https://posthog.example.com/api/person/
```

## /user

The [user endpoint](./user) gives you a lot of useful information about the possible event names and properties you can use throughout the rest of the api. 

## Pagination

Sometimes endpoints return paginated data. If that's the case, it'll be in the following format:

```json
{
    "next": "https://posthog.example.com/api/person/?cursor=cD0yMjgxOTA2",
    "previous": null,
    "results": [
        ...
    ]
}
```

In those cases, you can just call the `next` URL to get the next set of results.
