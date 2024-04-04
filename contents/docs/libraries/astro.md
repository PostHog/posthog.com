---
title: Astro
icon: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/astro.svg
---

PostHog makes it easy to get data about traffic and usage of your [Astro](https://astro.build/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your Astro app using the [JavaScript Web SDK](/docs/libraries/js).

## Installation

In your `src/components` folder, create a `posthog.astro` file:

```bash
cd ./src/components 
# or 'cd ./src && mkdir components && cd ./components' if your components folder doesnt exist 
touch posthog.astro
```

In this file, add your `Web snippet` which you can find in [your project settings](https://us.posthog.com/settings/project#snippet).

```astro file=posthog.astro
---

---
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init(
    '<ph_project_api_key>',
    {
      api_host:'<ph_instance_address>',
    }
  )
</script>
```

The next step is to a create a [Layout](https://docs.astro.build/en/core-concepts/layouts/) where we will use `posthog.astro`. Create a new file `PostHogLayout.astro` in your `src/layouts` folder:

```bash
cd .. && cd .. # move back to your base directory if you're still in src/components/posthog.astro
cd ./src/layouts
# or 'cd ./src && mkdir layouts && cd ./layouts' if your layouts folder doesn't exist yet
touch PostHogLayout.astro
```

Add the following code to `PostHogLayout.astro`:

```astro file=PostHogLayout.astro
---
import PostHog from '../components/posthog.astro'
---
<head>
	<PostHog />
</head>
```

Lastly, update `index.astro` to wrap your existing app components with the new Layout:

```astro file=index.astro
---
import PostHogLayout from '../layouts/PostHogLayout.astro';
---
<PostHogLayout>
  <!-- your existing app components -->
</PostHogLayout>
```

## Next steps

For any technical questions for how to integrate specific PostHog features into Astro (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js).

Alternatively, the following tutorials can help you get started:

- [How to set up Astro analytics, feature flags, and more](/tutorials/astro-analytics)
- [How to set up A/B tests in Astro](/tutorials/astro-ab-tests)
- [How to set up surveys in Astro](/tutorials/astro-surveys)

