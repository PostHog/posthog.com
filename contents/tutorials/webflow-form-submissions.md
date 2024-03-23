---
title: How to capture Webflow form submissions
date: 2023-06-22
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - configuration
  - surveys
---

With PostHog, you can autocapture events and record sessions on your Webflow site. With a bit more setup, you can also use it to capture form submissions. In this tutorial, we show how to do this with a basic Webflow site, PostHog, and some JavaScript.

> Want a full tutorial on how to set up PostHog for Webflow? Check out "[How to set up Webflow analytics and session recordings](/tutorials/webflow)."

## Initial Webflow and PostHog setup

To start, you need a [Webflow](https://webflow.com/) site with a form. I used the portfolio starter, but any template works (or a site you already created). Once created, we can add the form block element and make some edits to the homepage like this:

![Site](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/webflow-form-submissions/site.png)

Once the basic site is set up, go to the site settings, upgrade to at least the "Basic" website plan (to unlock custom code), then go to the custom code tab. Once there, get your PostHog snippet from the getting started flow or [your project settings](https://app.posthog.com/project/settings) which looks like this:

```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',{api_host:'<ph_instance_address>'})
</script>
```

Paste this into the custom code "head code" section in Webflow and press save. Once you publish the site, this enables PostHog to autocapture events and makes it ready to capture form submissions.

## Setting up our form submit capture

To handle the submission of the form, we need to add some JavaScript to our page. This enables us to capture the details as a PostHog event.

To start, go back to the site designer and add IDs to the text field(s) and submit button. You do this by clicking on the element, then going to the element settings (gear icon on right side panel), and adding a value to the ID field. I used `form-name`, `form-email`, and `form-submit` for the name, email, and submit button respectively.

![Adding ID video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/webflow-form-submissions/id.mp4)

Next, we’ll add our code to capture events. To add code to the page, click "Pages" on the left side panel, hover over the "Home" page, click the gear that appears, then scroll down to custom code. In "Before body tag" section, set up a click event listener for the submit input with the ID of `form-submit` that captures a PostHog `form submitted` event with the values from both the `form-name` and `form-email` as properties.

```html
<script>
// Get the submit input element
const submitButton = document.getElementById('form-submit');

// Add event listener to the submit button
submitButton.addEventListener('click', function(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the input elements
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;

  // Capture the values in PostHog
  posthog.capture(
    'form_submitted', 
    {
      name: name, 
      email: email
    }
  );
});
</script>
```

> **Note:** make sure to include the `<script>` and `</script>` tags.

Once done, press save on the page settings and publish the site.

![Adding code video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/webflow-form-submissions/code.mp4)

Now, when users submit the form, it is captured as an event in PostHog.

![Event](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/webflow-form-submissions/event.png)

With this, you can set up alerts in Slack for email submissions with a [webhook](/docs/webhooks/slack), [identify users](/docs/data/identify) with the email they submit, and export [cohorts of users](/docs/data/cohorts) who submit emails.

## Further reading

- [How to run A/B tests in Webflow](/tutorials/webflow-ab-tests)
- [How to set up Webflow analytics and session recordings](/tutorials/webflow)
- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
