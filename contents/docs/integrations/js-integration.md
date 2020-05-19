---
title: JS Integration
sidebar: Docs
showTitle: true
---

NB. You can just use a [snippet](/Snippet-installation) to start capturing events with our JS.

This page of the docs refers to our [JS library](https://github.com/PostHog/posthog-js).

## Why does this exist?

The reason this exists is that whilst the default snippet captures every click on certain elements (like `a`, `button`, `input` etc.) and page views, it's often worth sending more context whenever a user does something, or you may have a one page app.


## Installation

You can either load the snippet as a script in your HTML:
```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('[your-token]', {api_host: 'https://[your-instance]'})
</script>
```

Or you can include it using npm, by doing either
```bash
yarn add posthog-js
```
or
```bash
npm install --save posthog-js
```

And then include it in your files
```js
import posthog from 'posthog-js';
posthog.init("[your-token]", {api_host: 'https://[your-instance]'});
```

If you don't want to send a bunch of test data while you're developing, you could do
```js
window.location.href.indexOf('127.0.0.1') === -1 && posthog.init("[your-token]", {api_host: 'https://[your-instance]'})
```

# Usage
## Autocapture

Just by calling `posthog.init` above, you're already automatically capturing
- **pageviews**, including the url
- **autocaptured events**, any click or change of input or submission of `a`, `button`, `form`, `input`, `select`, `textarea`, `label`

## Ignore/censure elements
PostHog does lots of things to make sure it doesn't capture any sensitive data from your website. If there are other elements you don't want to be captured, you can add the `ph-no-capture` class name.

```html
<button class='ph-no-capture'>Sensitive information here</button>
```

## Website vs App

We recommend putting PostHog both on your homepage and your application if applicable. That means you'll be able to follow a user from the moment they come onto your website, all the way through signup and actually using your product.

?> PostHog automatically sets a cross-domain cookie, so if your website is `yourapp.com` and your app is on `app.yourapp.com` users will be followed when they go from one to the other.

## Sending events

This allows you to send more context than the basic event info that PostHog captures whenever a user does something. In that case, you can send an event with any metadata you may have.

```javascript
posthog.capture('[event-name]', {property1: 'value', property2: 'another value'});
```

## Identifying users
To make sure you understand which user is performing actions within your app, you can identify users at any point. From the moment you make this call, all events will be identified with that distinct id.

The ID can by anything, but is usually the unique ID that you identify users by in the database. 
Normally, you would put this below `posthog.init` if you have the information there.

If a user was previously anonymous (because they hadn't signed up or logged in yet), we'll automatically alias their anonymous ID with their new unique ID. That means all their events from before and after they signed up will be shown under the same user.

```js
posthog.identify('[user unique id]');
```

Warning! You can't call identify straight after an .init (as .init sends a page view, probably with the user's anonymous id. To combat this, you can call .init with a callback, in which you can call identify.

```js
posthog.init('[your api key]', {
    api_host: 'https://posthog.[your-domain].com',
    loaded: function(posthog) { posthog.identify('[user unique id]'); }
});
```

## Sending user information
An ID alone might not be enough to work out which user is who within PostHog. That's why it's useful to send over more metadata of the user. At minimum, we recommend sending the `email` property, which is also what we use to display in PostHog.

You can make this call on every page view to make sure this information is up-to-date. Alternatively, you can also do this whenever a user first appears (afer signup) or when they change their information.

```js
posthog.people.set({email: 'john@gmail.com'});
```

*Note: you can call this function at any point, but it'll only be sent after the `posthog.identify` call*

## One-page apps and pageviews
This JS snippet automatically sends pageview events whenever it gets loaded. If you have a one-page app that means it'll only send a pageview once, when your app loads.

To make sure any navigating a user does within your app gets captured, you can make a pageview call manually.

```js
posthog.capture('$pageview');
```

This will automatically send the current URL.

## Super properties

You can register 'global' properties for a user, that will persist between sessions. Every `capture` call will include these properties. These are not to be confused with the `people.set` call, which stores properties against the User object (rather than against every event).

```js
posthog.register({
    "icecream pref": "vanilla",
    "team_id": 22
})
```

If you register a property multiple times, the next event will use the new value of that property. If you want to register a property once (for ad campaign properties for example) you can use `register_once`.

```js
posthog.register_once({
    "campaign source": "twitter"
})
```

## Opt users out

PostHog JS offers a function to opt users out based on the cookie dialog.

```js
posthog.opt_out_capturing();
```

The function call to see if a user has opted out

```js
posthog.has_opted_out_capturing();
```

To opt a user back in
```js
posthog.opt_in_capturing();
```

## Reset after logout

If a user is logged out, you probably want to call reset to unset any distinct_ids. This is especially important if your users are sharing a computer, as otherwise all of those users will be grouped together into 1 user.

```js
posthog.reset();
```

If you _also_ want to reset device_id, you can set true

```js
posthog.reset(true);
```

## Complete signup psuedocode

As an example, here is how to put some of the above concepts together.

```js
function signup(email) {
    // Your own internal logic for creating an account and getting a user_id
    let user_id = create_account(email);

    // Identify user with internal ID
    posthog.identify(user_id);
    // Set email or any other data
    posthog.people.set({email: email});
}
```


# Development

To develop, clone the repo and run
```bash
yarn start
```

To create a minified production version, run
```bash
yarn build
```
