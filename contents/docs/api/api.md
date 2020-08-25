---
title: API Overview
sidebar: Docs
showTitle: true
---

This section of our Docs explains how to pull or push data from/to our API.

If you're looking to push event or user data into PostHog instead of using a tracking snippet or a language-specific library, there is a simple guide in the [Dedicated Events API](/docs/integrations/api) section.

PostHog has an API available on all tiers of pricing and for every self-hosted version.

## Authentication

### Personal API Keys (Recommended)

Personal API keys allow full access to your account, just like e-mail address and password, but you can create any number of them and each one can invalidated individually at any moment. This makes for greater control for you and improved security of stored data.

#### How to Obtain a Personal API key

1. Select 'Setup' on the left sidebar.
2. Navigate to the 'Personal API Keys' section.
3. Click "+ Create a Personal API Key".
4. Give your new key a label – it's just for you, usually to describe the key's purpose.
5. Click 'reate Key'.
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

### Username & Password (Deprecated)

**Important:** While you can still use this type of authentication, it's significantly more secure to use personal API keys, as described above.

Authentication can also be done using your own username and password. We suggest creating a new user within your team specifically for this.

With `curl`:
```bash
curl -u username:password https://posthog.example.com/api/person/
```

As a header:
```bash
AUTH=$(echo -ne "username:password" | base64 --wrap 0)

curl \
  --header "Authorization: Basic $AUTH" \
  https://posthog.example.com/api/person/
```

**Important:** The key under "API key" in the Setup page is write-only and public. You cannot use it for any of these endpoints.

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

In such cases just call the "next" URL to get the following set of results.
