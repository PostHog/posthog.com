---
title: How to do cookieless tracking with PostHog
sidebar: Docs
showTitle: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/cookieless-tracking.png
featuredTutorial: false
date: 2025-08-27
author:
  - joe-martin
  - robbie-coomber
tags:
  - configuration
  - product os
---

Normally, PostHog stores some information about the user in their browser using a cookie. This approach is typical for analytics tools and enables user tracking across sessions, caching feature flag data, and more. 

There are some situations where you don't want to use cookies and do cookieless tracking instead. For example, when you have concerns about user privacy or to comply with regulation such as [GDPR](/docs/integrate/gdpr) or [HIPAA](/docs/privacy/hipaa-compliance) (or you just hate cookie banners).

This tutorial shows how to configure PostHog's [JavaScript Web SDK](/docs/libraries/js) to do cookieless audience measurement.

> **Note:** When using cookies, PostHog stores data as a first-party cookie. We don't track users across different sites (like largely blocked [third-party cookies](https://en.wikipedia.org/wiki/Third-party_cookies) do). It also means the same cookie works across subdomains like `posthog.com` and `eu.posthog.com`.

<GDPRForm />

## If you want to delete your cookie banner

If you never want to show a cookie banner, you can set the cookieless mode to `"always"`. In this mode:

* PostHog never stores data in cookies or local/session storage.
* You cannot call `identify()`, as a distinct ID would be considered Personal Data under GDPR and other similar privacy regulations.
* PostHog will measure the number of users on your site using a privacy-preserving hash, calculated on PostHog's servers.

To set this mode, add the following config option to your PostHog initialization:

```js
posthog.init('<ph_project_api_key>', {
    cookieless_mode: 'always', // +
    api_host:'<ph_client_api_host>',
    defaults: '<ph_posthog_js_defaults>'
})
```

This helps you comply with privacy regulations at the expense of a less detailed data capture. 

## If you want to show a cookie banner

If you want to maintain the full tracking capability of PostHog, you'll need to show a cookie banner and only enable cookies when the user consents. To do this, you can set the cookieless mode to `"on_reject"`, create a cookie banner, and connect it to PostHog's consent management methods. 

With this:
* PostHog never stores data in cookies or local/session storage until the user opts in
* PostHog doesn't capture any events until after consent is either given or denied.
* If consent is denied, PostHog will still be able to count those users with a privacy-preserving hash.

To enable this mode, add the following config option to your PostHog initialization:

```js
posthog.init('<ph_project_api_key>', {
    cookieless_mode: 'on_reject', // +
    api_host:'<ph_client_api_host>',
    defaults: '<ph_posthog_js_defaults>'
})
```

Then connect PostHog to your cookie banner and display it when consent is pending:

```js
if (posthog.get_explicit_consent_status() === 'pending') {
  // show a cookie banner
}
```

Finally, when the user makes a choice, opt them in or out:

```js
function handleCookieConsent(consent) {
   if (consent) {
     posthog.opt_in_capturing()
   } else {
     posthog.opt_out_capturing()
   }
}
```

This automatically sets the correct cookieless mode as well as changes the consent status to hide the cookie banner. 

## Counting unique users without cookies

When using cookieless tracking, PostHog doesn't store a distinct ID in the user's browser. Instead, PostHog generates this ID on our servers, using a hash:

```
hash(team_id, daily_salt, ip_address, user_agent, hostname)
```

A hash is an irreversible function, and a salt is a random value that changes daily which we delete once that day's events have been processed.

This means that whilst the IP address and User Agent are Personal Data, the hash is not considered Personal Data because it is impossible to obtain any Personal Data from the hash.


## Limitations

Nothing comes for free unfortunately. Limiting what PostHog can store in cookies has implications like:

* **Higher user count:** Users that do not give cookie consent appear as different people each day. A new daily salt means that the hash is different. This means high unique user counts beyond one day (like weekly or monthly unique users). Additionally, not being able to `identify()` users means that it is impossible to link together multiple devices or browsers from the same user.

* **Hash collisions:** Because the hash is based on a limited set of inputs, it is possible that two different users will generate the same hash. This means that two different users could be counted as one user. The most likely scenario would be two users with the same IP address (e.g. in a corporate network) and the same user agent (e.g. using the same browser version on the same OS).

* **Session replay and surveys:** Both are disabled if the user has not given cookie consent. This is because both features rely on storing data in cookies/local storage.

* **Cache optimizations:** PostHog stores some information in browser storage to load faster, for example, the last loaded values for feature flags. Without this, there can be a delay between the page loading and things like feature flags being available to query (unless flags are [bootstrapped](/docs/feature-flags/bootstrapping)).

## Further reading

- [Building a tracking cookies consent banner in React](/tutorials/react-cookie-banner)
- [Building a Vue cookie consent banner](/tutorials/vue-cookie-banner)
- [Building a Next.js cookie consent banner](/tutorials/nextjs-cookie-banner)

<NewsletterForm />