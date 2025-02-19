---
title: How to do cookieless tracking with PostHog
sidebar: Docs
showTitle: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/cookieless-tracking.png
featuredVideo: 'https://www.youtube-nocookie.com/embed/3V3fbz6sgPk'
featuredTutorial: false
date: 2024-06-14
author:
  - joe-martin
tags:
  - configuration
  - product os
---

Normally, PostHog stores some information about the user in their browser using a cookie. This approach is typical for analytics tools and enables user tracking across sessions, caching feature flag data, and more. 

There are some situations where you don't want to use cookies and do cookieless tracking instead. These include when:

- You have concerns about user privacy or regulation such as [GDPR](/docs/integrate/gdpr) or [HIPAA](/docs/privacy/hipaa-compliance).

- You have your own system for identifying users across multiple sessions, rely on server-side tracking, or don’t need to track user identities at all.

- You hate cookie banners.

This tutorial shows how to configure PostHog's [JavaScript Web SDK](/docs/libraries/js) to do cookieless tracking by using page memory to store user data.

> **Note:** When using cookies, PostHog stores data as a first-party cookie. We don't track users across different sites (like largely blocked [third-party cookies](https://en.wikipedia.org/wiki/Third-party_cookies) do). It also means the same cookie works across subdomains like `posthog.com` and `eu.posthog.com`.

<GDPRForm />

## Step 1: Decide where to store the data

It is helpful first to know what data is being stored and why. Specifically, PostHog stores the following information in the user’s browser:

- User `distinct_id`
- Session ID
- Device ID
- Active [feature flags](/docs/user-guides/feature-flags)
- [Super properties](/docs/integrate/client/js#super-properties)
- Configuration options (e.g., whether [session recording](/docs/user-guides/recordings) is enabled)

If you want to use PostHog without cookies, you must store some of this data elsewhere. Although PostHog has [multiple persistence options](/docs/libraries/js#persistence), the most straightforward is to store it in page memory. We show you how to do this in the next step.

Storing in memory avoids cookies, but once the user leaves the page, the data isn't saved. Returning users get new IDs, flags must be re-fetched, and configuration options are reset.

## Step 2: Configure persistence

Managing cookies only matters if you use the [JavaScript Web SDK](/docs/libraries/js). Other SDKs don't use cookies.

If you haven't set up the JavaScript Web SDK yet, you can install the `posthog-js` library using a package manager or copy the snippet below and paste it into your `<head>` tag:

```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',
      {
        api_host:'<ph_client_api_host>', 
      }
    )
</script>
```

For cookieless tracking, the important part is the initialization. To change from the default `localStorage+cookie` persistence, to `memory`, add the `persistence` config option to your initialization. You can also [bootstrap](/docs/feature-flags/bootstrapping) the `distinctId` and `featureFlags` from the server to avoid regenerating and re-requesting them.

Here’s how to do that if you want to store data in page memory:

```js
posthog.init('<ph_project_api_key>',
  {
    api_host:'<ph_client_api_host>', 
    persistence: 'memory',
    bootstrap: { // optional
      distinctID: 'user distinct id',
      featureFlags: {
        'feature-flag-1': true,
        'feature-flag-2': false,
      },
    },
  }
)
```

> **Tip:** If you want to change your persistence settings after initializing PostHog, you can use `posthog.set_config()`. This is helpful if you are setting up a cookie banner:
> ```js
> const handleCookieConsent = (consent) => {
>    posthog.set_config({ persistence: consent === 'yes' ? 'localStorage+cookie' : 'memory' });
>    localStorage.setItem('cookie_consent', consent);
> };
> ```

## Step 3: Remove your cookie banner

Now that PostHog isn’t using cookies you can, optionally and if you’re not using cookies for any other services, completely remove your cookie banner. [Ursula von der Leyen](/blog/is-google-analytics-illegal-microsite) would be proud!

## Limitations

Nothing comes for free and limiting what PostHog can store between page loads does affect how the product works. Below are some of the likely consequences of cookieless tracking:

* **Higher anonymous user count** - each pageload that is not [bootstrapped](/docs/feature-flags/bootstrapping) with a known `distinctId` counts as a new user and not a returning one.

* **Session replay count** - as we can't track a "session" (multiple pageloads over time), session recordings are only as long as the in-memory session and resets (i.e. start a new recording) whenever the browser reloads. In addition, multiple window tracking is not possible.

* **Cache optimizations** - PostHog stores some information in browser storage to load faster, for example, the last loaded values for feature flags. Without this, there can be a delay between the page loading and things like feature flags being available to query (unless flags are bootstrapped).

* **Flag consistency** - Because setting peristence to `memory` resets the user `distinct_id`, if you don't implement bootstrapping or another identification method, the same user might see multiple flag variants across sessions. This can lead to an inconsistent experience if you are doing a percentage rollout or running an A/B test.

## Further reading

- [Building a tracking cookies consent banner in React](/tutorials/react-cookie-banner)
- [Building a Vue cookie consent banner](/tutorials/vue-cookie-banner)
- [Building a Next.js cookie consent banner](/tutorials/nextjs-cookie-banner)

<NewsletterForm />